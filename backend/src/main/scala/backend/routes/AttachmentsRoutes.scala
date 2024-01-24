package backend.routes

import akka.http.scaladsl.model.{EntityStreamSizeException, StatusCodes}
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.{ExceptionHandler, Route}
import backend.controllers.AttachmentsController
import backend.services.Services
import backend.utils.Permissions.{DeleteImages, InsertImages}
import backend.utils.Utils.failureMsg
import com.typesafe.config.{Config, ConfigFactory}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
class AttachmentsRoutes(controller: AttachmentsController)(implicit services: Services) {

  import services._
  val conf: Config = ConfigFactory.load()

  val sizeExceptionHandler: ExceptionHandler = ExceptionHandler {
    case _: EntityStreamSizeException =>
      complete(StatusCodes.Forbidden -> failureMsg("Unable to upload file: file size is to large."))
  }

  def routes: Route =
    pathPrefix("properties" / Segment / "images") { propertyId =>
      validMongoIds(propertyId) {
        concat(
          handleExceptions(sizeExceptionHandler) {
            pathEnd {
              // api/properties/{propertyId}/images
              (post & withSizeLimit(conf.getInt("image-size-limit"))) {
                authenticate()(session =>
                  parameters(Symbol("roomId").optional) { roomId =>
                    fileUpload("image") {
                      case (metadata, byteSource) =>
                        checkPermissions(session, Set(InsertImages))(
                          controller.insertImage(propertyId, roomId, metadata, byteSource)
                        )
                    }
                  }
                )
              }

            }
          },
          pathPrefix(Segment) { imageId =>
            validMongoId(imageId) {
              concat(
                delete { // api/properties/{propertyId}/images/{imageId}
                  authenticate()(session =>
                    parameters(Symbol("roomId").optional) { roomId =>
                      checkPermissions(session, Set(DeleteImages))(
                        controller.deleteImage(propertyId, roomId, imageId)
                      )
                    }
                  )
                },
                get { // api/properties/{propertyId}/images/{imageId}
                  parameters(Symbol("roomId").optional) { roomId =>
                    controller.downloadImage(propertyId, roomId, imageId)
                  }
                }
              )
            }
          }
        )

      }
    }
}

object AttachmentsRoutes {
  def apply(attachmentController: AttachmentsController)(implicit services: Services): Route =
    new AttachmentsRoutes(attachmentController).routes
}
