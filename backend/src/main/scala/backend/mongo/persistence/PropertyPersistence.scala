package backend.mongo.persistence

import backend.api.{PaymentMethodsForUpdate, PropertyFilters, RoomBedInfo, RoomDataForPublic, SortFilter, UpdateProperty}
import backend.mongo._
import backend.utils.Utils.{parseDate, promised}
import backend.utils.keywordMapper.mappedKeywords
import backend.utils.{ClassLogging, FilterKeywords, Keywords, PaymentMethodTypes}
import org.mongodb.scala.bson.{BsonDocument, ObjectId}
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.model.{Filters, FindOneAndUpdateOptions, UpdateOneModel, UpdateOptions}
import org.mongodb.scala.{MongoCollection, MongoWriteException}

import java.time.Instant
import java.util
import java.util.Date
import scala.concurrent.duration.DurationInt
import scala.concurrent.{Await, ExecutionContext, Future}

trait PropertyPersistence extends ClassLogging {
  val properties: MongoCollection[Property]
  val rooms: MongoCollection[Room]
  val beds: MongoCollection[Bed]
  val bookings: MongoCollection[Booking]
  val findOneAndUpdateOption: FindOneAndUpdateOptions
  val updateOptions: UpdateOptions
  implicit val ec: ExecutionContext

  def insertProperty(
      companyId: String
  ): Future[InsertPropertyResponses] = {
    val propertyId = new ObjectId()
    val propertyToInsert = Property(
      companyId = companyId,
      _id = propertyId,
      aminityIds = aminityValues,
      paymentOptions = PaymentOptions(PayWhenBooking(), PayAtProperty(None,listOfPaymentOptions)),
      active = Some(true),
      completed = Some(false)
    )
    promised[InsertPropertyResponses] { promise =>
      properties
        .insertOne(propertyToInsert)
        .subscribe(
          onNext =>
            promise.success(
              PropertyCreated(propertyId.toString)
            ),
          onError =>
            onError match {
              case _: MongoWriteException =>
                log.info(s"Property id: $propertyId already exists")
                promise.success(DuplicateEntry)
              case error =>
                log.error(
                  s"Mongo error occurred while inserting property id:$propertyId ",
                  error.getMessage
                )
                promise.success(MongoError)
            }
        )
    }
  }

  def getProperties(companyId: String): Future[ReadPropertiesDatabaseResponses] =
    promised[ReadPropertiesDatabaseResponses] { promise =>
      properties
        .find(BsonDocument("companyId" -> companyId))
        .collect()
        .subscribe(
          onNext => promise.success(Properties(onNext)),
          onError =>
            (
              log.error(s"Failed to get properties -> ", onError.getMessage),
              promise.success(MongoError)
            )
        )
    }
  def getProperty(companyId: String, propertyId: String): Future[ReadPropertyDatabaseResponses] =
    promised[ReadPropertyDatabaseResponses] { promise =>
      properties.find(filterProperties(propertyId, companyId)).headOption().map {
        case Some(property) => promise.success(PropertyInfo(property))
        case None           => promise.success(PropertyNotFound)
      }
    }
  def getPropertyForPublic (propertyId: String): Future[ReadPropertyPublicDatabaseResponses] =
    promised[ReadPropertyPublicDatabaseResponses] { promise =>
      properties.find( BsonDocument("_id" -> new ObjectId(propertyId))).headOption().map {
        case Some(property) =>
          val roomsData =
            Await.result(
            rooms
              .find(BsonDocument("propertyId" -> propertyId))
              .collect().headOption()
                         ,2.seconds).getOrElse(List.empty).toList
          val bedsData =
            roomsData.flatMap(_.beds.flatMap(bed=>
              Await.result(
                beds.find(BsonDocument("_id" -> new ObjectId(bed.bedId))).collect().headOption()
                ,2.seconds).getOrElse(List.empty).toList
            ))

          promise.success(PropertyForPublic(
            PropertyWithRoomsAndBeds(
              property,
              roomsData.map{roomInfo =>
                val bedData = bedsData.filter(bed=> roomInfo.beds.map(_.bedId).contains(bed._id.toString)).map(
                  bed =>
                    RoomBedInfo(
                      bed._id.toString,
                      roomInfo.beds.find(_.bedId == bed._id.toString).map(_.bedQuantity).getOrElse(0),
                      bed.bedType,
                      bed.adults,
                      bed.children,
                      bed.infants,
                      bed.dimensions,
                      bed.icon)).filter( b=> b.bedQuantity != 0)
                RoomDataForPublic(
                  propertyId,
                  roomInfo._id.toString,
                  roomInfo.roomType,roomInfo.totalRooms,
                  roomInfo.bookedRooms,roomInfo.description,
                  roomInfo.price,
                  bedData,
                  roomInfo.imageIds,
                  roomInfo.quantity,
                  roomInfo.peopleQuantity,
                  roomInfo.discountPlan.toApiModel,
                  roomInfo.tags)},
              bedsData.map(_.toApiModel))))
        case None           => promise.success(PropertyNotFound)
      }
    }
  def getSpecificPropertiesForPublic(propertyFilters: PropertyFilters): Future[ReadSpecificPropertiesForPublicDatabaseResponses] = {
    promised[ReadSpecificPropertiesForPublicDatabaseResponses] { promise =>
      val parseStartDateDefinition = parseDate(propertyFilters.startDate)
      val parseEndDateDefinition   = parseDate(propertyFilters.endDate)
      if(parseStartDateDefinition.isDefined && parseEndDateDefinition.isDefined){
      properties.find(and(filterPropertiesWhenSearch(propertyFilters): _*)).collect().subscribe (
        properties => {

          val formattedStartDate = parseStartDateDefinition.getOrElse(new Date)
          val formattedEndDate   = parseEndDateDefinition.getOrElse(new Date)

          val filteredProperties = properties.filter(property => {
            (propertyFilters.selectedSurroundings match {
              case Some(wantedAminities) if wantedAminities.nonEmpty =>
                val selectedAminities = property.aminityIds.flatMap(aminity => aminity.option.filter(option => option.selected).map(a => a.name))
                wantedAminities.toSet.intersect(selectedAminities.toSet).nonEmpty
              case _ => true
            }) && (propertyFilters.selectedTrips match {
              case Some(trips) if trips.nonEmpty =>
                val wantedKeywords = trips.flatMap(t => mappedKeywords.get(FilterKeywords.withName(t.replace(" ", "_")))).flatten.toSet
                property.keywords.map(k => Keywords.withName(k)).toSet.intersect(wantedKeywords).nonEmpty
              case _ => true
            })
          })
          val propertyIds = filteredProperties.map(_._id.toString)
          val allBeds = Await.result(
            beds.find().collect().headOption(),2.seconds).getOrElse(List.empty).toList
          val allRooms =  Await.result(
            rooms
              .find(and(
                List(
                Some(in("propertyId", propertyIds: _*)),
                propertyFilters.minPrice.map(price => gte("price", price)),
                propertyFilters.maxPrice.map(price => lte("price", price))
                ).flatten : _*
              ))
              .collect().headOption()
            , 2.seconds).getOrElse(List.empty).toList

          val validRooms = allRooms.flatMap{ room =>
            val bookedNTimes = Await.result(bookings.countDocuments(
              and(
                BsonDocument("roomId" -> room._id.toString),
                lte("startDate", formattedEndDate),
                gte("endDate", formattedStartDate)
              ),
            ).headOption(),2.seconds)
            bookedNTimes match {
              case Some(booked) if room.quantity > booked => Some(room.copy(quantity = room.quantity - booked.toInt))
              case Some(_) => None
              case None => None
            }
          }

          val availableRooms = validRooms.filter(room => {
            val (adults, children, infants) = room.beds.map(bed =>  (allBeds.find(b => b._id.toString == bed.bedId) match {
              case Some(value) => (value.adults, value.children, value.infants)
              case None => (0,0,0)
            }) match {
              case (a,c,i) => (a * bed.bedQuantity, c * bed.bedQuantity, i * bed.bedQuantity)
            }).foldLeft((0, 0, 0)) { case ((accA, accB, accC), (a, b, c)) => (accA + a, accB + b, accC + c) }
            adults >= propertyFilters.adults.getOrElse(0) && children >= propertyFilters.children.getOrElse(0) && infants >= propertyFilters.infants.getOrElse(0)
          })

          val roomsToShow = availableRooms.groupBy(room => room.propertyId).map{
            case (pId, rooms) =>
              val propertyData = filteredProperties.find(p => p._id.toString == pId)
              PropertyRoomData(
                pId,
                propertyData.map(p => p.propertyType).getOrElse("Undefined"),
                propertyData.map(p => p.name).getOrElse("Undefined"),
                rooms.map(_.price).min,
                propertyData.map(p => p.imageIds.headOption.getOrElse("undefinedImageId")).getOrElse("undefinedImageId"),
                Location(propertyData.flatMap(p => p.location.country),propertyData.flatMap(p => p.location.city), propertyData.flatMap(p => p.location.village), longitude = propertyData.flatMap(p => p.location.longitude), latitude = propertyData.flatMap(p => p.location.latitude))
              )
          }.toList


          val sortedRooms = propertyFilters.sort match {
            case Some(SortFilter(Some("asc"), _, _)) => roomsToShow.sortBy(_.price)
            case Some(SortFilter(Some("desc"), _, _)) => roomsToShow.sortBy(_.price).reverse

            case Some(SortFilter(_, Some(ratingNumber), _)) => roomsToShow.sortBy(_.price)

            case Some(SortFilter(_, _, Some(true))) => roomsToShow.sortBy(_.price)
            case Some(SortFilter(_, _, Some(false))) => roomsToShow.sortBy(_.price).reverse

            case None => roomsToShow
          }

          promise.success(PropertyWithFilterForPublic(sortedRooms))
          },
          onError=>log.error("\n\n ERROR \n\n"+onError)
      )
      }
      else promise.success(MongoError)
    }
  }

  def deleteProperty(companyId: String, propertyId: String): Future[DeletedPropertyResponses] =
    promised[DeletedPropertyResponses] { promise =>
      properties.findOneAndDelete(filterProperties(propertyId, companyId)).headOption().map {
        case Some(_) => promise.success(PropertyDeleted)
        case None    => promise.success(PropertyNotFound)
      }
    }

  def updateProperty(
      companyId: String,
      propertyId: String,
      propertyDataToUpdate: UpdateProperty
  ): Future[UpdatedPropertyResponses] =
    promised[UpdatedPropertyResponses] { promise =>
      properties
        .bulkWrite(
          propertyDataToUpdate.aminityIds
            .map(newAminity =>
              List(
              UpdateOneModel(
                Filters.and(
                  BsonDocument("companyId"              -> companyId),
                  BsonDocument("_id"                   -> new ObjectId(propertyId)),
                  BsonDocument("aminityIds.name" -> newAminity.name)),
                if(newAminity.option.distance.isDefined)
                combine(
                  set("aminityIds.$[i].option.$[j].selected" ,  newAminity.option.selected),
                  set("aminityIds.$[i].option.$[j].distance" ,  newAminity.option.distance.getOrElse(0))
                )
                else
                  set("aminityIds.$[i].option.$[j].selected" ,  newAminity.option.selected),
                UpdateOptions()
                  .arrayFilters(
                    util.Arrays.asList( Filters.and(BsonDocument("i.name" -> newAminity.name)),
                      Filters.and(BsonDocument("j.name" -> newAminity.option.name)) )
                  )),
              )
              ).getOrElse(Nil)
            ++ propertyDataToUpdate.name
            .map(newName =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("name", newName)
                )
              )
            )
            .getOrElse(Nil) ++ propertyDataToUpdate.description
            .map(newDescription =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("description", newDescription)
                )
              )
            )
            .getOrElse(Nil)

            ++ propertyDataToUpdate.propertyType
              .map(newPropertyType =>
                List(
                  UpdateOneModel(
                   filterProperties(propertyId,companyId),
                    set("propertyType", newPropertyType)
                  )
                )
              )
              .getOrElse(Nil) ++ propertyDataToUpdate.propertyPoliciesData.map(_.staffLanguages
            .map(newStaffLanguages =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.staffLanguages", newStaffLanguages)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil) ++ propertyDataToUpdate.location.map(_.places
            .map(place =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("location.places", Places(place.countryId,place.cityId,place.villageId))
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil)   ++ propertyDataToUpdate.location.map(_.address
            .map(newAddress =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("location.address", newAddress)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil) ++ propertyDataToUpdate.location.map(_.zipCode
            .map(zipCode =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("location.zipCode", zipCode)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil) ++
            propertyDataToUpdate.location.map(_.longitude
        .map(longitude =>
          List(
            UpdateOneModel(
              filterProperties(propertyId,companyId),
              set("location.longitude", longitude)
            )
          )
        ).getOrElse(Nil))
        .getOrElse(Nil) ++
            propertyDataToUpdate.location.map(_.latitude
              .map(latitude =>
                List(
                  UpdateOneModel(
                    filterProperties(propertyId,companyId),
                    set("location.latitude", latitude)
                  )
                )
              ).getOrElse(Nil))
              .getOrElse(Nil) ++
            propertyDataToUpdate.postalCode
            .map(newPostalCode =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("postalCode", newPostalCode)
                )
              )
            )
            .getOrElse(Nil) ++ propertyDataToUpdate.addKeyword
            .map(keywordToBeAdded =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  addToSet("keywords", keywordToBeAdded)
                )
              )
            )
            .getOrElse(Nil) ++ propertyDataToUpdate.removeKeyword
            .map(keywordToBeRemoved =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  pull("keywords", keywordToBeRemoved)
                )
              )
            )
            .getOrElse(Nil)
            ++ propertyDataToUpdate.propertyPoliciesData.map(_.breakfastPricePerPerson
            .map(newBreakfastPricePerPerson =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.breakfastPricePerPerson", newBreakfastPricePerPerson)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil)
            ++ propertyDataToUpdate.propertyPoliciesData.map(_.breakfastIncluded
            .map(newBreakfastIncluded =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.breakfastIncluded", newBreakfastIncluded)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil)
            ++ propertyDataToUpdate.propertyPoliciesData.map(_.buyBreakfastPossibility
            .map(newBuyBreakFastPossibility =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.buyBreakfastPossibility", newBuyBreakFastPossibility)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil) ++ propertyDataToUpdate.propertyPoliciesData.map(_.potentialGuestNumber
            .map(newPotentialGuestNumber =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.potentialGuestNumber", newPotentialGuestNumber)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil) ++ propertyDataToUpdate.propertyPoliciesData.map(_.propertySquareSize
            .map(newPropertySquareSize =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.propertySquareSize", newPropertySquareSize)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil) ++ propertyDataToUpdate.propertyPoliciesData.map(_.isRoomInsideApartment
            .map(newIsRoomInsideAppartment =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.isRoomInsideApartment", newIsRoomInsideAppartment)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil)

            ++ propertyDataToUpdate.propertyPoliciesData.map(_.lateCheckout.map(newLateCheckout =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("propertyPoliciesData.lateCheckout", newLateCheckout)
              )
            )
          ).getOrElse(Nil)).getOrElse(Nil)
            ++ propertyDataToUpdate.propertyPoliciesData.map(_.petsAllowed.map(newPetsAllowed =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.petsAllowed", newPetsAllowed)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil) ++ propertyDataToUpdate.propertyPoliciesData.map(_.eventsAllowed.map(newEventsAllowed =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("propertyPoliciesData.eventsAllowed", newEventsAllowed)
              )
            )
          ).getOrElse(Nil))
            .getOrElse(Nil)
            ++ propertyDataToUpdate.propertyPoliciesData.map(_.smokingAllowed.map(newSmokingAllowed =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("propertyPoliciesData.smokingAllowed", newSmokingAllowed)
              )
            )
          ).getOrElse(Nil))
            .getOrElse(Nil) ++ propertyDataToUpdate.propertyPoliciesData.map(_.checkIn.map(_.from.map( checkInFrom =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("propertyPoliciesData.checkIn.from", checkInFrom)
              )
            )).getOrElse(Nil)).getOrElse(Nil)
          ).getOrElse(Nil)
            ++ propertyDataToUpdate.propertyPoliciesData.map(_.checkIn.map(_.to.map( checkInTo =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                    set("propertyPoliciesData.checkIn.to", checkInTo)
                )
              )).getOrElse(Nil)).getOrElse(Nil)
          ).getOrElse(Nil)
            ++ propertyDataToUpdate.propertyPoliciesData.map(_.checkOut.map(_.from.map( checkOutFrom =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.checkOut.from", checkOutFrom)
                )
              )).getOrElse(Nil)).getOrElse(Nil)
          ).getOrElse(Nil)
            ++ propertyDataToUpdate.propertyPoliciesData.map(_.checkOut.map(_.to.map( checkOutTo =>
              List(
                UpdateOneModel(
                 filterProperties(propertyId,companyId),
                  set("propertyPoliciesData.checkOut.to",checkOutTo)
                )
              )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)
            ++ propertyDataToUpdate.ratePlan.map(_.refundable.map(_.fullyRefundable.map( fullyRefundable =>
            List(
              UpdateOneModel(
                filterProperties(propertyId,companyId),
                set("ratePlan.refundable.fullyRefundable",fullyRefundable)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.refundable.map(_.cancellationPolicy.map( cancellationPolicy =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.refundable.cancellationPolicy", cancellationPolicy)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.refundable.map(_.pricePerNight.map( pricePerNight =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.refundable.pricePerNight", pricePerNight))
              )
            ).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.nonRefundable.map(_.setNonRefundable.map( setNonRefundable =>
            List(
              UpdateOneModel(
                filterProperties(propertyId,companyId),
                set("ratePlan.nonRefundable.setNonRefundable", setNonRefundable)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.nonRefundable.map(_.discount.map( discount =>
            List(
              UpdateOneModel(
                filterProperties(propertyId,companyId),
                set("ratePlan.nonRefundable.discount", discount)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.nonRefundable.map(_.pricePerNight.map( pricePerNight =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.nonRefundable.pricePerNight", pricePerNight))
              )
            ).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.pricePerGroup.map(_.discountForThree.map( discountForThree =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.pricePerGroup.discountForThree", discountForThree)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.pricePerGroup.map(_.discountForTwo.map( discountForTwo =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.pricePerGroup.discountForTwo", discountForTwo)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.pricePerGroup.map(_.discountForOne.map( discountForOne =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.pricePerGroup.discountForOne", discountForOne)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.pricePerGroup.map(_.pricePerNight.map( pricePerNight =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.pricePerGroup.pricePerNight", pricePerNight)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.pricePerGroup.map(_.discountPerGroup.map( discountPerGroup =>
            List(
              UpdateOneModel(
                filterProperties(propertyId,companyId),
                set("ratePlan.pricePerGroup.discountPerGroup", discountPerGroup)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.weeklyPlan.map(_.setWeeklyPlan.map( setWeeklyPlan =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.weeklyPlan.setWeeklyPlan", setWeeklyPlan)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.weeklyPlan.map(_.discount.map( discount =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.weeklyPlan.discount", discount)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.ratePlan.map(_.weeklyPlan.map(_.pricePerNight.map( pricePerNight =>
            List(
              UpdateOneModel(
               filterProperties(propertyId,companyId),
                set("ratePlan.weeklyPlan.pricePerNight",pricePerNight)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.paymentOptions.map(_.payWhenBooking.map(_.selected.map( selected =>
            List(
              UpdateOneModel(
                filterProperties(propertyId,companyId),
                set("paymentOptions.payWhenBooking.selected",selected)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.paymentOptions.map(_.payWhenBooking.map(_.upFrontPayPercentage.map( upFrontPayPercentage =>
            List(
              UpdateOneModel(
                filterProperties(propertyId,companyId),
                set("paymentOptions.payWhenBooking.upFrontPayPercentage",upFrontPayPercentage)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.paymentOptions.map(_.payAtProperty.map(_.selected.map( selected =>
            List(
              UpdateOneModel(
                filterProperties(propertyId,companyId),
                set("paymentOptions.payAtProperty.selected",selected)
              )
            )).getOrElse(Nil)).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.discountForTheFirstFiveGuests
            .map(discountForTheFirstFiveGuests =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("discountForTheFirstFiveGuests", discountForTheFirstFiveGuests)
                )
              )
            )
            .getOrElse(Nil)

            ++ propertyDataToUpdate.bankDetails
            .map(_.bankName.map(bankName =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("bankDetails.bankName", bankName)
                )
              )
            ).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.bankDetails
            .map(_.swiftCode.map(swiftCode =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("bankDetails.swiftCode", swiftCode)
                )
              )
            ).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.bankDetails
            .map(_.accountOwner.map(accountOwner =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("bankDetails.accountOwner", accountOwner)
                )
              )
            ).getOrElse(Nil)).getOrElse(Nil)

            ++ propertyDataToUpdate.bankDetails
            .map(_.accountNumber.map(accountNumber =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("bankDetails.accountNumber", accountNumber)
                )
              )
            ).getOrElse(Nil)).getOrElse(Nil) ++
            propertyDataToUpdate.paymentOptions.map(_.payAtProperty.map(_.paymentMethods.map(
              methods =>
                List(
                  UpdateOneModel(
                    Filters.and(
                      BsonDocument("companyId"              -> companyId),
                      BsonDocument("_id"                   -> new ObjectId(propertyId)),
                      BsonDocument("paymentOptions.payAtProperty.paymentMethod.name" -> methods.name)),
                    methods match {
                      case PaymentMethodsForUpdate(_, Some(selected), Some(value)) =>
                        combine(
                          set("paymentOptions.payAtProperty.paymentMethod.$.value" ,  value),
                          set("paymentOptions.payAtProperty.paymentMethod.$.selected" ,  selected))
                      case PaymentMethodsForUpdate(_, Some(selected), None) =>
                        set("paymentOptions.payAtProperty.paymentMethod.$.selected" ,  selected)
                      case PaymentMethodsForUpdate(_, None, Some(value)) =>
                        set("paymentOptions.payAtProperty.paymentMethod.$.value" ,  value)
                      case _ => BsonDocument()
                    }

                  )
            )
            ).getOrElse(Nil)).getOrElse(Nil)
        ).getOrElse(Nil)

      ++ propertyDataToUpdate.businessInfo
      .map(_.name.map(name =>
        List(
          UpdateOneModel(
            filterProperties(propertyId,companyId),
            set("businessInfo.name", name)
          )
        )
      ).getOrElse(Nil)).getOrElse(Nil)

      ++ propertyDataToUpdate.businessInfo.map(_.address
        .map(address =>
          List(
            UpdateOneModel(
              filterProperties(propertyId,companyId),
              set("businessInfo.address", address)
            )
          )
        ).getOrElse(Nil))
        .getOrElse(Nil)

            ++ propertyDataToUpdate.businessInfo.map(_.licenseNumber
            .map(licenseNumber =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("businessInfo.licenseNumber", licenseNumber)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil)
            ++ propertyDataToUpdate.businessInfo.map(_.vatNumber
            .map(vatNumber =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("businessInfo.vatNumber", vatNumber)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil)

            ++ propertyDataToUpdate.businessInfo.map(_.businessRegistrationNumber
            .map(businessRegistrationNumber =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("businessInfo.businessRegistrationNumber", businessRegistrationNumber)
                )
              )
            ).getOrElse(Nil))
            .getOrElse(Nil)

            ++ propertyDataToUpdate.readyForBooking
      .map(readyForBooking =>
        List(
          UpdateOneModel(
            filterProperties(propertyId,companyId),
            set("readyForBooking", readyForBooking)
          )
        )
      )
      .getOrElse(Nil)
            ++ propertyDataToUpdate.active
            .map(active =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("active", active)
                )
              )
            )
            .getOrElse(Nil)

            ++ propertyDataToUpdate.completed
            .map(completed =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("completed", completed)
                )
              )
            )
            .getOrElse(Nil)

            ++ propertyDataToUpdate.startBookingDate
            .map(startBookingDate =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("startBookingDate", startBookingDate)
                )
              )
            )
            .getOrElse(Nil)

            ++ propertyDataToUpdate.acceptedTermAndConditions
            .map(acceptedTermAndConditions =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("acceptedTermAndConditions", acceptedTermAndConditions)
                )
              )
            )
            .getOrElse(Nil)

            ++ propertyDataToUpdate.amenitiesDescription
            .map(amenitiesDescription =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  set("amenitiesDescription", amenitiesDescription)
                )
              )
            )
            .getOrElse(Nil)
            ++ propertyDataToUpdate.addTag
            .map(addTag =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  addToSet("tags", addTag)
                )
              )
            )
            .getOrElse(Nil)
            ++ propertyDataToUpdate.removeTag
            .map(removeTag =>
              List(
                UpdateOneModel(
                  filterProperties(propertyId,companyId),
                  pull("tags", removeTag)
                )
              )
            )
            .getOrElse(Nil)
        )
        .subscribe(
          onNext =>
            if (onNext.getMatchedCount == 0) promise.success(MongoError)
            else {
              properties.findOneAndUpdate(filterProperties(propertyId, companyId),
                set("updatedAt", Instant.now().toString),findOneAndUpdateOption).subscribe(
                onNext => log.info("Updated field in property"),
                onError => {log.error("\n========\n" + onError); promise.success(MongoError)}
              )
              properties.find(filterProperties(propertyId, companyId)).headOption().map {
                case Some(property) => promise.success(PropertyDataUpdated(property))
                case None           => promise.success(RecordNotFound)
              }},
          onError => { log.error("\n========\n" + onError); promise.success(MongoError) }
        )
    }

  def reorderImageIds(
      companyId: String,
      propertyId: String,
      imageId: String
  ): Future[UpdatedPropertyResponses] =
    promised[UpdatedPropertyResponses] { promise =>
      properties
        .find(filterProperties(propertyId, companyId))
        .subscribe(
          onNext => {
            val updatedList =
              onNext.imageIds
                .filter(oldPositionImage => oldPositionImage != imageId)
                .prepended(imageId)
            properties
              .findOneAndUpdate(
                filterProperties(propertyId, companyId),
                set("imageIds", updatedList),
                findOneAndUpdateOption
              )
              .subscribe(
                onNext => promise.success(PropertyDataUpdated(onNext)),
                onError => {
                  log.error(onError.getMessage)
                  promise.success(MongoError)
                }
              )
          },
          onError => {
            log.error(onError.getMessage)
            promise.success(MongoError)
          }
        )

    }


  def filterProperties(propertyId: String, companyId: String): BsonDocument =
    BsonDocument("_id" -> new ObjectId(propertyId), "companyId" -> companyId)

  private def listOfPaymentOptions: List[PaymentMethods] = List(PaymentMethods(PaymentMethodTypes.Paysera.toString),
    PaymentMethods(PaymentMethodTypes.Paypal.toString),
    PaymentMethods(PaymentMethodTypes.Cash.toString),
    PaymentMethods(PaymentMethodTypes.Other.toString),
    PaymentMethods(PaymentMethodTypes.BankTransfer.toString),
    PaymentMethods(PaymentMethodTypes.DebitCreditCard.toString))

  private def aminityValues: List[AminityPropertyValues] =
    List(
      AminityPropertyValues(
        "Accessbility",
        List(
          AminityOptions("Elevator", selected = false, None),
          AminityOptions(
            "Ramps (accessible with wheelchair or stroller)",
            selected = false,
            None
          )
        )
      ),
      AminityPropertyValues(
        "Children & Family Entertainment",
        List(
          AminityOptions("Outdoor playground", selected = false, None),
          AminityOptions("Indoor playground", selected = false, None),
          AminityOptions("Sport facilities", selected = false, None),
          AminityOptions("Child Care", selected = false, None)
        )
      ),
      AminityPropertyValues(
        "Dining and Drinking",
        List(
          AminityOptions("Restaurant", selected = false, None),
          AminityOptions("Bar", selected = false, None),
          AminityOptions("Room service", selected = false, None)
        )
      ),
      AminityPropertyValues(
        "Entertainment and Leisure",
        List(
          AminityOptions("Swimming pool", selected = false, None),
          AminityOptions("Outdoor sitting area, park in property", selected = false, None),
          AminityOptions("Hiking, jogging routes", selected = false, None)
        )
      ),
      AminityPropertyValues(
        "Parking",
        List(
          AminityOptions("Free parking at property", selected = false, None),
          AminityOptions(
            "Parking against a fee - Add hourly/ Daily rate",
            selected = false,
            None
          ),
          AminityOptions("Private parking near by", selected = false, None),
          AminityOptions("Public parking near by", selected = false, None)
        )
      ),
      AminityPropertyValues(
        "Surroundings",
        List(
          AminityOptions("Beach front", selected = false, None),
          AminityOptions(
            "Beach close by",
            selected = false,
            Some(0)
          ),
          AminityOptions("Mountains", selected = false, Some(0)),
          AminityOptions("City center close by", selected = false, Some(0)),
          AminityOptions("Other monuments (please specify)", selected = false, Some(0)),
        )
      )
      )
  private def filterPropertiesWhenSearch(filters: PropertyFilters) = filters match {
    case PropertyFilters(propertyType, location, _, _, _,_,_, _, _, _, _, _, propertyIds) =>
      List(
        Some(equal("completed", true)),
        propertyType.map(types => in("propertyType", types: _*)),
        propertyIds.map(ids => in("_id", ids.map(new ObjectId(_)): _*)),
        location.flatMap(loc => loc.places.map(place=>equal("location.places.cityId", place.cityId))),
        location.flatMap(loc => loc.places.map(place=>equal("location.places.countryId", place.countryId))),
        location.flatMap(loc => loc.places.flatMap(place=>place.villageId.map(equal("location.places.villageId", _)))),
      ).flatten
  }
}
