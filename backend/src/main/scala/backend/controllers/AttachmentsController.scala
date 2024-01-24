package backend.controllers

import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.server.directives.FileInfo
import akka.stream.scaladsl.Source
import akka.util.ByteString
import backend.Server.{ec, managerActor, timeout}
import backend.mongo._
import backend.services.Services
import backend.utils.Utils.{failureMsg, onResponse}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class AttachmentsController(mongo: MongoCollections)(implicit services: Services) {
  def insertImage(
      propertyId: String,
      roomId: Option[String],
      metadata: FileInfo,
      byteSource: Source[ByteString, Any]
  ): Route =
    complete(
      if (
        metadata.contentType.mediaType.isImage && (metadata.getContentType.mediaType.subType == "png"
        || metadata.getContentType.mediaType.subType == "jpeg"
        || metadata.getContentType.mediaType.subType == "gif")
      )
        byteSource.runFold(ByteString.empty)((a, b) => a ++ b).map(_.toArray) flatMap { image =>
          mongo.insertImage(propertyId, roomId, image.array, metadata.contentType.value).map {
            case ImageUploaded(id) => StatusCodes.OK                  -> id
            case MongoError        => StatusCodes.InternalServerError -> "InternalServerError"
          }
        }
      else StatusCodes.UnprocessableEntity -> failureMsg("UnprocessableEntity")
    )

  def deleteImage(propertyId: String, roomId: Option[String], imageId: String): Route =
    onResponse[DeletedImageDatabaseResponses](mongo.deleteImage(propertyId, roomId, imageId)) {
      case ImageDeleted =>
        complete(StatusCodes.NoContent -> "")
      case ImageNotFound =>
        complete(StatusCodes.NotFound -> "ImageNotFound")
    }

  def downloadImage(propertyId: String, roomId: Option[String], imageId: String): Route =
    onResponse[DownloadImageDatabaseResponses](mongo.downloadImage(propertyId, roomId, imageId)) {
      case Image(_, _, _, content, cType) =>
        val contentType: ContentType =
          ContentType.parse(cType).getOrElse(MediaTypes.`multipart/form-data`)
        complete(
          HttpResponse(entity = HttpEntity.Strict(contentType, ByteString(content)))
        )
      case ImageNotFound =>
        complete(StatusCodes.NotFound -> "ImageNotFound")
    }

}
object AttachmentsController {
  def apply(mongo: MongoCollections)(implicit services: Services) = new AttachmentsController(mongo)
}
