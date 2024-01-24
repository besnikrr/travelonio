package backend.mongo.persistence

import scala.concurrent.{ExecutionContext, Future}

import backend.mongo._
import backend.utils.ClassLogging
import backend.utils.Utils.promised
import org.mongodb.scala.MongoCollection
import org.mongodb.scala.bson.{BsonDocument, ObjectId}
import org.mongodb.scala.model.FindOneAndUpdateOptions
import org.mongodb.scala.model.Updates.{addToSet, pull}

trait AttachmentsPersistence extends ClassLogging {
  val attachments: MongoCollection[Attachment]
  val rooms: MongoCollection[Room]
  val properties: MongoCollection[Property]
  val findOneAndUpdateOption: FindOneAndUpdateOptions
  implicit val ec: ExecutionContext

  def insertImage(
      propertyId: String,
      roomId: Option[String],
      metadata: Array[Byte],
      contentType: String
  ): Future[InsertImageDatabaseResponses] = {
    val imageId = new ObjectId()
    val imageToUpload = Attachment(
      propertyId,
      roomId,
      imageId,
      metadata,
      contentType
    )
    promised[InsertImageDatabaseResponses] { promise =>
      attachments
        .insertOne(imageToUpload)
        .subscribe(
          _ =>
            if (roomId.isDefined)
              rooms
                .findOneAndUpdate(
                  BsonDocument("propertyId" -> propertyId, "_id" -> new ObjectId(roomId.get)),
                  addToSet("imageIds", imageId.toString),
                  findOneAndUpdateOption
                )
                .subscribe(
                  _ => {
                    log.info("Image id was added in room table.");
                    promise.success(ImageUploaded(imageId.toString))
                  },
                  onError => {
                    log.error(onError.getMessage);
                    promise.success(MongoError)
                  }
                )
            else
              properties
                .findOneAndUpdate(
                  BsonDocument("_id" -> new ObjectId(propertyId)),
                  addToSet("imageIds", imageId.toString),
                  findOneAndUpdateOption
                )
                .subscribe(
                  _ => {
                    log.info("Image id was added in property table.");
                    promise.success(ImageUploaded(imageId.toString))
                  },
                  onError => { log.error(onError.getMessage); promise.success(MongoError) }
                ),
          onError => { log.error(onError.getMessage); promise.success(MongoError) }
        )
    }
  }

  def deleteImage(
      propertyId: String,
      roomId: Option[String],
      imageId: String
  ): Future[DeletedImageDatabaseResponses] =
    promised[DeletedImageDatabaseResponses] { promise =>
      if (roomId.isDefined)
        attachments
          .findOneAndDelete(
            BsonDocument(
              "propertyId" -> propertyId,
              "roomId"     -> roomId,
              "_id"        -> new ObjectId(imageId)
            )
          )
          .subscribe(
            _ =>
              rooms
                .findOneAndUpdate(
                  BsonDocument("propertyId" -> propertyId, "_id" -> new ObjectId(roomId.get)),
                  pull("imageIds", imageId)
                )
                .subscribe(
                  _ => {
                    log.info("Image id was deleted in property table.");
                    promise.success(ImageDeleted)
                  },
                  onError => { log.error(onError.getMessage); promise.success(ImageNotFound) }
                ),
            onError => { log.error(onError.getMessage); promise.success(ImageNotFound) }
          )
      else
        attachments
          .findOneAndDelete(
            BsonDocument(
              "propertyId" -> propertyId,
              "_id"        -> new ObjectId(imageId)
            )
          )
          .subscribe(
            _ =>
              properties
                .findOneAndUpdate(
                  BsonDocument("_id" -> new ObjectId(propertyId)),
                  pull("imageIds", imageId)
                )
                .subscribe(
                  _ => {
                    log.info("Image id was deleted in property table.");
                    promise.success(ImageDeleted)
                  },
                  onError => { log.error(onError.getMessage); promise.success(ImageNotFound) }
                ),
            onError => { log.error(onError.getMessage); promise.success(ImageNotFound) }
          )
    }

  def downloadImage(
      propertyId: String,
      roomId: Option[String],
      imageId: String
  ): Future[DownloadImageDatabaseResponses] =
    promised[DownloadImageDatabaseResponses] { promise =>
      if (roomId.isDefined)
        attachments
          .find(
            BsonDocument(
              "propertyId" -> propertyId,
              "roomId"     -> roomId,
              "_id"        -> new ObjectId(imageId)
            )
          )
          .headOption()
          .map {
            case Some(attachment) =>
              promise.success(
                Image(
                  attachment.propertyId,
                  attachment.roomId,
                  attachment._id.toString,
                  attachment.content,
                  attachment.contentType
                )
              )
            case None => promise.success(ImageNotFound)
          }
      else
        attachments
          .find(
            BsonDocument(
              "propertyId" -> propertyId,
              "_id"        -> new ObjectId(imageId)
            )
          )
          .headOption()
          .map {
            case Some(attachment) =>
              promise.success(
                Image(
                  attachment.propertyId,
                  attachment.roomId,
                  attachment._id.toString,
                  attachment.content,
                  attachment.contentType
                )
              )
            case None => promise.success(ImageNotFound)
          }
    }
}
