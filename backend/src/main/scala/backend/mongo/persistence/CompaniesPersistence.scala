package backend.mongo.persistence

import scala.concurrent.duration.DurationInt
import scala.concurrent.{Await, ExecutionContext, Future}

import backend.api.UpdateCompany
import backend.mongo._
import backend.utils.ClassLogging
import backend.utils.Utils.promised
import org.mongodb.scala.bson.conversions.Bson
import org.mongodb.scala.bson.{BsonDocument, ObjectId}
import org.mongodb.scala.model.Filters.in
import org.mongodb.scala.model.FindOneAndUpdateOptions
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.{MongoCollection, MongoWriteException}

trait CompaniesPersistence extends ClassLogging {
  val companies: MongoCollection[Company]
  val properties: MongoCollection[Property]
  val rooms: MongoCollection[Room]
  val users: MongoCollection[User]
  val attachments: MongoCollection[Attachment]
  val findOneAndUpdateOption: FindOneAndUpdateOptions
  implicit val ec: ExecutionContext

  def insertCompany(companyName: String): Future[InsertCompanyResponses] = {
    val companyToInsert = Company(
      new ObjectId(),
      companyName
    )
    promised[InsertCompanyResponses] { promise =>
      companies
        .insertOne(companyToInsert)
        .subscribe(
          onNext =>
            promise.success(
              CompanyCreated(onNext.getInsertedId.asObjectId().getValue.toString, companyName)
            ),
          onError =>
            onError match {
              case _: MongoWriteException =>
                log.info(s"Company: $companyName already exists")
                promise.success(DuplicateEntry)
              case error =>
                log.error(
                  s"Mongo error occurred while inserting company:$companyName ",
                  error.getMessage
                )
                promise.success(MongoError)
            }
        )
    }
  }

  def getCompanies: Future[ReadCompaniesDatabaseResponses] =
    promised[ReadCompaniesDatabaseResponses] { promise =>
      companies
        .find()
        .collect()
        .subscribe(
          onNext => promise.success(Companies(onNext)),
          onError =>
            (
              log.error(s"Failed to get companies -> ", onError.getMessage),
              promise.success(MongoError)
            )
        )
    }

  def getCompany(companyId: String): Future[ReadCompanyDatabaseResponses] =
    promised[ReadCompanyDatabaseResponses] { promise =>
      companies.find(BsonDocument("_id" -> new ObjectId(companyId))).headOption().map {
        case Some(company) => promise.success(CompanyInfo(company))
        case None          => promise.success(CompanyNotFound)
      }
    }

  def getCompanyByName(companyName: String): Future[ReadCompanyDatabaseResponses] =
    promised[ReadCompanyDatabaseResponses] { promise =>
      companies.find(BsonDocument("name" -> companyName)).headOption().map {
        case Some(company) => promise.success(CompanyInfo(company))
        case None          => promise.success(CompanyNotFound)
      }
    }

  def deleteCompany(companyId: String): Future[DeletedCompanyResponses] =
    promised[DeletedCompanyResponses] { promise =>
      companies.findOneAndDelete(BsonDocument("_id" -> new ObjectId(companyId))).headOption().map {
        case Some(_) =>
          val propertiesToBeDeleted = Await
            .result(
              properties.find(BsonDocument("companyId" -> companyId)).collect().headOption(),
              2.seconds
            )
            .getOrElse(List.empty)
            .toList

          //Delete all users of given company
          Await.result(
            users.deleteMany(BsonDocument("companyId" -> companyId)).collect().headOption(),
            2.seconds
          )
          //Delete all properties of company
          Await.result(
            properties.deleteMany(BsonDocument("companyId" -> companyId)).headOption(),
            2.seconds
          )
          // Delete all rooms of given property
          val resultOfDeletedROoms = Await.result(
            rooms
              .deleteMany(in("propertyId", propertiesToBeDeleted.map(_._id.toString): _*))
              .headOption(),
            2.seconds
          )
          val resultOfDeletedAttachments = Await.result(
            attachments
              .deleteMany(in("propertyId", propertiesToBeDeleted.map(_._id.toString): _*))
              .headOption(),
            2.seconds
          )
          promise.success(CompanyDeleted)
        case None => promise.success(CompanyNotFound)
      }
    }

  def updateCompany(
      companyId: String,
      companyDataToUpdate: UpdateCompany
  ): Future[UpdatedCompanyResponses] =
    promised[UpdatedCompanyResponses] { promise =>
      companies
        .findOneAndUpdate(
          BsonDocument("_id" -> new ObjectId(companyId)),
          setUpdateValues(companyDataToUpdate),
          findOneAndUpdateOption
        )
        .subscribe(
          onNext => promise.success(CompanyDataUpdated(onNext)),
          onError => {
            log.error(onError.getMessage);
            promise.success(MongoError)
          }
        )
    }

  private def setUpdateValues(companyInfo: UpdateCompany): List[Bson] = companyInfo match {
    case UpdateCompany(setName) =>
      List(
        setName.map(newName => set("name", newName))
      ).flatten
  }
}
