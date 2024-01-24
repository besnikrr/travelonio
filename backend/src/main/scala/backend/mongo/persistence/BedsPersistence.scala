package backend.mongo.persistence

import scala.concurrent.{ExecutionContext, Future}

import backend.api.{InsertBed, UpdateBed}
import backend.mongo._
import backend.utils.ClassLogging
import backend.utils.Utils.promised
import org.mongodb.scala.bson.conversions.Bson
import org.mongodb.scala.bson.{BsonDocument, ObjectId}
import org.mongodb.scala.model.FindOneAndUpdateOptions
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.{MongoCollection, MongoWriteException}

trait BedsPersistence extends ClassLogging {
  val beds: MongoCollection[Bed]
  val findOneAndUpdateOption: FindOneAndUpdateOptions
  implicit val ec: ExecutionContext

  def insertBed(bed: InsertBed): Future[InsertBedResponses] = {
    val bedToInsert = Bed(
      new ObjectId(),
      bed.bedType,
      bed.adults,
      bed.children,
      bed.infants,
      bed.dimensions,
      bed.icon
    )
    promised[InsertBedResponses] { promise =>
      beds
        .insertOne(bedToInsert)
        .subscribe(
          onNext =>
            promise.success(
              BedTypeCreated(bedToInsert)
            ),
          onError =>
            onError match {
              case _: MongoWriteException =>
                log.info(s"Bed Type: ${bed.bedType} already exists")
                promise.success(DuplicateEntry)
              case error =>
                log.error(
                  s"Mongo error occurred while inserting bed type:${bed.bedType} ",
                  error.getMessage
                )
                promise.success(MongoError)
            }
        )
    }
  }
  def getBedTypes: Future[ReadBedsDatabaseResponses] =
    promised[ReadBedsDatabaseResponses] { promise =>
      beds
        .find()
        .collect()
        .subscribe(
          onNext => promise.success(Beds(onNext)),
          onError =>
            (
              log.error(s"Failed to get bed types -> ", onError.getMessage),
              promise.success(MongoError)
            )
        )
    }

  def getBedType(bedTypeId: String): Future[ReadBedDatabaseResponses] =
    promised[ReadBedDatabaseResponses] { promise =>
      beds.find(BsonDocument("_id" -> new ObjectId(bedTypeId))).headOption().map {
        case Some(bed) => promise.success(BedInfo(bed))
        case None      => promise.success(BedNotFound)
      }
    }

  def deleteBedType(bedTypeId: String): Future[DeletedBedResponses] =
    promised[DeletedBedResponses] { promise =>
      beds.findOneAndDelete(BsonDocument("_id" -> new ObjectId(bedTypeId))).headOption().map {
        case Some(_) => promise.success(BedDeleted)
        case None    => promise.success(BedNotFound)
      }
    }

  def updateBedType(
      bedTypeId: String,
      bedDataToUpdate: UpdateBed
  ): Future[UpdatedBedResponses] =
    promised[UpdatedBedResponses] { promise =>
      beds
        .findOneAndUpdate(
          BsonDocument("_id" -> new ObjectId(bedTypeId)),
          setUpdateValues(bedDataToUpdate),
          findOneAndUpdateOption
        )
        .subscribe(
          onNext => promise.success(BedDataUpdated(onNext)),
          onError => {
            log.error(onError.getMessage);
            promise.success(MongoError)
          }
        )
    }

  private def setUpdateValues(bedInfo: UpdateBed): Bson = bedInfo match {
    case UpdateBed(bedType, adults, children, infants, dimensions, icon) =>
      val fieldsToUpdate = List(
        bedType.map(newBedType => set("bedType", newBedType)),
        adults.map(newAdults => set("adults", newAdults)),
        children.map(newChildrens => set("children", newChildrens)),
        infants.map(newInfants => set("infants", newInfants)),
        dimensions.map(newDimensions => set("dimensions", newDimensions)),
        icon.map(newIcon => set("icon", newIcon))
      ).flatten
      combine(fieldsToUpdate: _*)
  }

}
