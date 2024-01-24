package backend.mongo.persistence

import java.time.Instant
import java.util.Date

import scala.concurrent.duration.DurationInt
import scala.concurrent.{Await, ExecutionContext, Future}

import backend.api.{BookingInfos, RoomBedInfo, RoomDataForPublic, RoomForBooking, UpdateRoom}
import backend.mongo._
import backend.utils.ClassLogging
import backend.utils.Utils.{parseDate, promised}
import org.bson.Document
import org.mongodb.scala.bson.{BsonDocument, ObjectId}
import org.mongodb.scala.model.Filters.{and, gte, lte}
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.model.{FindOneAndUpdateOptions, UpdateOneModel}
import org.mongodb.scala.{MongoCollection, MongoWriteException}

trait RoomsPersistence extends ClassLogging {
  val rooms: MongoCollection[Room]
  val users: MongoCollection[User]
  val properties: MongoCollection[Property]
  val bookings: MongoCollection[Booking]
  val beds: MongoCollection[Bed]
  val findOneAndUpdateOption: FindOneAndUpdateOptions
  implicit val ec: ExecutionContext

  def insertRoom(propertyId: String): Future[InsertRoomResponses] = {
    val roomToInsert = Room(
      propertyId,
      new ObjectId(),
      "",
      0,
      0,
      "",
      0,
      List.empty,
      List.empty,
      0,
      0,
      RoomDiscountPlan()
    )
    promised[InsertRoomResponses] { promise =>
      rooms
        .insertOne(roomToInsert)
        .subscribe(
          onNext =>
            promise.success(
              RoomCreated(onNext.getInsertedId.asObjectId().getValue.toString)
            ),
          onError =>
            onError match {
              case _: MongoWriteException =>
                log.info(s"Room type: roomType already exists")
                promise.success(DuplicateEntry)
              case error =>
                log.error(
                  s"Mongo error occurred while inserting room type: room type ",
                  error.getMessage
                )
                promise.success(MongoError)
            }
        )
    }
  }

  def getRooms(propertyId: String): Future[ReadRoomsDatabaseResponses] =
    promised[ReadRoomsDatabaseResponses] { promise =>
      rooms
        .find(BsonDocument("propertyId" -> propertyId))
        .collect()
        .subscribe(
          onNext => promise.success(Rooms(onNext)),
          onError =>
            (
              log.error(s"Failed to get rooms -> ", onError.getMessage),
              promise.success(MongoError)
            )
        )
    }

  def getRoom(propertyId: String, roomId: String): Future[ReadRoomDatabaseResponses] =
    promised[ReadRoomDatabaseResponses] { promise =>
      rooms
        .find(filterRooms(propertyId,roomId))
        .headOption()
        .map {
          case Some(room) => promise.success(RoomInfo(room))
          case None       => promise.success(RoomNotFound)
        }
    }

  def deleteRoom(propertyId: String, roomId: String): Future[DeletedRoomResponses] =
    promised[DeletedRoomResponses] { promise =>
      rooms
        .findOneAndDelete(filterRooms(propertyId,roomId))
        .headOption()
        .map {
          case Some(_) => promise.success(RoomDeleted)
          case None    => promise.success(RoomNotFound)
        }
    }

  def updateRoom(
      propertyId: String,
      roomId: String,
      roomDataToUpdate: UpdateRoom
  ): Future[UpdatedRoomResponses] =
    promised[UpdatedRoomResponses] { promise =>
      rooms.bulkWrite(
                roomDataToUpdate.addBed
          .map(newBed =>
          List(
            UpdateOneModel(
            filterRooms(propertyId,roomId),
            pull("beds" , new Document("bedId", newBed.bedId))
          ),
            UpdateOneModel(
              filterRooms(propertyId,roomId),
                addToSet("beds", BedIdAndQuantity(newBed.bedId, newBed.bedQuantity)),
              )
            )
          )
          .getOrElse(Nil) ++
          roomDataToUpdate.roomType.map(newType =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
            set("roomType", newType))
      )).getOrElse(Nil) ++
          roomDataToUpdate.totalRooms.map(newTotalRoomValue =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              set("totalRooms", newTotalRoomValue)))) .getOrElse(Nil)++
          roomDataToUpdate.bookedRooms.map(newBookedRoomValue =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              set("bookedRooms", newBookedRoomValue)))).getOrElse(Nil) ++
          roomDataToUpdate.description.map(newDescription =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              set("description", newDescription)))).getOrElse(Nil) ++
          roomDataToUpdate.price.map(newPrice =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              set("price", newPrice)))).getOrElse(Nil) ++
          roomDataToUpdate.removeBed.map(bedData =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              pull("beds", BedIdAndQuantity(bedData.bedId, bedData.bedQuantity))))).getOrElse(Nil) ++
          roomDataToUpdate.addImageIds.map(newAddImageIds =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              addEachToSet("imageIds", newAddImageIds: _*)))).getOrElse(Nil) ++
          roomDataToUpdate.removeImageIds.map(newRemoveImageIds =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              pullAll("imageIds", newRemoveImageIds: _*)))).getOrElse(Nil) ++
          roomDataToUpdate.quantity.map(newQuantity =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              set("quantity", newQuantity)))).getOrElse(Nil) ++
          roomDataToUpdate.peopleQuantity.map(peopleQuantity =>
            List(UpdateOneModel(
              filterRooms(propertyId,roomId),
              set("peopleQuantity", peopleQuantity)))).getOrElse(Nil) 
                  ++ roomDataToUpdate.discountPlan
                  .map(_.hasDiscount.map(hasDiscount =>
                    List(
                      UpdateOneModel(
                        filterRooms(propertyId,roomId),
                        set("discountPlan.hasDiscount", hasDiscount)
                      )
                    )
                  ).getOrElse(Nil)).getOrElse(Nil)
                  ++ roomDataToUpdate.discountPlan
                  .map(_.discountPercentage.map(discountPercentage =>
                    List(
                      UpdateOneModel(
                        filterRooms(propertyId,roomId),
                        set("discountPlan.discountPercentage", discountPercentage)
                      )
                    )
                  ).getOrElse(Nil)).getOrElse(Nil)

                  ++ roomDataToUpdate.discountPlan
                  .map(_.validFrom.map(validFrom =>
                    List(
                      UpdateOneModel(
                        filterRooms(propertyId,roomId),
                        set("discountPlan.validFrom", validFrom)
                      )
                    )
                  ).getOrElse(Nil)).getOrElse(Nil)

                  ++ roomDataToUpdate.discountPlan
                  .map(_.validUntil.map(validUntil =>
                    List(
                      UpdateOneModel(
                        filterRooms(propertyId,roomId),
                        set("discountPlan.validUntil", validUntil)
                      )
                    )
                  ).getOrElse(Nil)).getOrElse(Nil)
                  ++ roomDataToUpdate.addTag
                  .map(addTag =>
                    List(
                      UpdateOneModel(
                        filterRooms(propertyId,roomId),
                        addToSet("tags", addTag)
                      )
                    )
                  )
                  .getOrElse(Nil)
                  ++ roomDataToUpdate.removeTag
                  .map(removeTag =>
                    List(
                      UpdateOneModel(
                        filterRooms(propertyId,roomId),
                        pull("tags", removeTag)
                      )
                    )
                  )
                  .getOrElse(Nil)
        ).subscribe(
        onNext =>
          if(onNext.getMatchedCount == 0) promise.success(MongoError)
          else
            rooms
              .find(filterRooms(propertyId,roomId))
              .headOption()
              .map {
                case Some(room) => promise.success(RoomDataUpdated(room))
                case None       => promise.success(RoomNotFound)
              },
             onError => {log.error("\n========\n"+onError);promise.success(MongoError)}

      )

    }

  def reorderRoomImageIds(
      propertyId: String,
      roomId: String,
      imageId: String
  ): Future[UpdatedRoomResponses] =
    promised[UpdatedRoomResponses] { promise =>
      rooms
        .find(filterRooms(propertyId,roomId))
        .subscribe(
          onNext => {
            val updatedList =
              onNext.imageIds
                .filter(oldPositionImage => oldPositionImage != imageId)
                .prepended(imageId)
            rooms
              .findOneAndUpdate(
                filterRooms(propertyId,roomId),
                set("imageIds", updatedList),
                findOneAndUpdateOption
              )
              .subscribe(
                onNext => promise.success(RoomDataUpdated(onNext)),
                onError => {
                  log.error(onError.getMessage);
                  promise.success(MongoError)
                }
              )
          },
          onError => {
            onError match {
              case _: MongoWriteException =>
                log.info(s"Room type: roomType already exists")
                promise.success(RoomNotFound)
              case error =>
                log.error(
                  s"Mongo error occurred while inserting room type: room type ",
                  error.getMessage
                )
                promise.success(MongoError)
            }
          }
        )

    }
  def bookingRoom(propertyId: String,
                  roomId: String,
                  userId: String,
                  bookingInfos: BookingInfos): Future[RoomBookingResponses] = {
    val randInteger = new scala.util.Random
    val accessPin = randInteger.between(123456,999999)
    val parseStartDateDefinition = parseDate(bookingInfos.startDate)
    val parseEndDateDefinition = parseDate(bookingInfos.endDate)
    val propertyData = Await.result(properties.find(BsonDocument("_id" -> new ObjectId(propertyId))).headOption(),2.seconds)
    val userData = Await.result(users.find(BsonDocument("_id" -> new ObjectId(userId))).headOption(),2.seconds)
    val roomData = Await.result(rooms.find(BsonDocument("_id" -> new ObjectId(roomId))).headOption(),2.seconds)

    if(propertyData.nonEmpty && roomData.nonEmpty && userData.nonEmpty &&
      parseStartDateDefinition.isDefined && parseEndDateDefinition.isDefined) {
      val ids =  List.tabulate(bookingInfos.rooms)(_ + 1).map(id => new ObjectId())

    val bookingData = ids.map(id => {
      Booking(
        id,
        propertyId,
        roomId,
        userId,
        parseStartDateDefinition.getOrElse(new Date()),
        parseEndDateDefinition.getOrElse(new Date()),
        bookingInfos.guestsInfo,
        Guests(bookingInfos.guests.adults, bookingInfos.guests.children, bookingInfos.guests.infants),
        accessPin,
        PropertyFrozenData(propertyData.get,roomData.get,userData.get, ""),
        Instant.now.toString,
        Instant.now.toString)
    })

    promised[RoomBookingResponses] { promise =>
      // TODO - check if room is available before booking
      bookings
        .insertMany(bookingData)
              .subscribe(
                _ => promise.success(RoomBooked(ids, bookingData)),
                onError =>
                  onError match {
                    case _: MongoWriteException =>
                      log.info(s"This record already exists")
                      promise.success(MongoError)
                    case error =>
                      println(s"\n $error \n")
                      log.error(
                        s"Mongo error occurred while booking room"+
                        error.getMessage
                      )
                      promise.success(MongoError)
                  }
              )
      }
    }

    else promised[RoomBookingResponses] { promise => promise.success(NoAvailableRooms)}
  }
  def getBookingInfo(propertyId: String,
                  roomId: String,
                  userId: String,
                  bookingId: String): Future[BookingInfoResponses] = {
    promised[BookingInfoResponses] { promise =>
      bookings
        .find(BsonDocument("propertyId" -> propertyId, "roomId" -> roomId, "userId" -> userId, "_id" -> new ObjectId(bookingId)))
        .headOption
        .map {
          case Some(bookingInfo) => promise.success(RoomBookingInfos(bookingInfo))
          case None => promise.success(NoAvailableBookings)
        }
  }}

  def availableRoomForBooking(propertyId: String, roomForBooking: RoomForBooking): Future[AvailableRoomResponses] =
  {
    promised[AvailableRoomResponses]{ promise =>

      val parseStartDateDefinition = parseDate(roomForBooking.startDate)
      val parseEndDateDefinition = parseDate(roomForBooking.endDate)
      if(parseStartDateDefinition.isDefined && parseEndDateDefinition.isDefined)
      {

      val propertyData = Await.result(properties.find(BsonDocument("_id" -> new ObjectId(propertyId))).headOption(),2.seconds)

      val allBeds = Await.result(
        beds.find().collect().headOption(),2.seconds).getOrElse(List.empty).toList

      val searchedRooms = roomForBooking.roomIds.flatMap{roomId => Await.result(
        rooms
          .find(BsonDocument("_id" -> new ObjectId(roomId)))
          .collect().headOption(),2.seconds).getOrElse(List.empty).toList}

      // TODO - check available rooms against roomForBooking.rooms count
      val validRooms = searchedRooms.flatMap{ room =>
        val bookedNTimes = Await.result(bookings.countDocuments(
          and(
            BsonDocument("roomId" -> room._id.toString),
            lte("startDate", parseStartDateDefinition.getOrElse(new Date())),
            gte("endDate", parseEndDateDefinition.getOrElse(new Date()))
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
        adults >= roomForBooking.adults && children >= roomForBooking.children && infants >= roomForBooking.infants
      })

      if(propertyData.nonEmpty) {
        val availRooms = availableRooms.map{roomInfo =>
          val beds = allBeds.filter(bed => {
            roomInfo.beds.filter(d => d.bedQuantity != 0).map(d => d.bedId).contains(bed._id.toString)
          })
          val bedData = beds.map(
            bed =>
              RoomBedInfo(
                bed._id.toString,
                roomInfo.beds.find(_.bedId == bed._id.toString).map(_.bedQuantity).getOrElse(0),
                bed.bedType,
                bed.adults,
                bed.children,
                bed.infants,
                bed.dimensions,
                bed.icon))
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
            roomInfo.tags)}

        promise.success(AvailableRoom(PropertyWithRoomsAndBeds(
            propertyData.get,
            availRooms,
          List.empty)))
      }
      else promise.success(NoAvailableRoom)
      }
      else promise.success(MongoError)
    }

  }

  private def filterRooms(propertyId: String, roomId: String): BsonDocument =
    BsonDocument("_id" -> new ObjectId(roomId), "propertyId" -> propertyId)
}
