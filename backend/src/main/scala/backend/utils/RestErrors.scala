package backend.utils

import akka.http.scaladsl.model.StatusCode
import akka.http.scaladsl.model.StatusCodes._

trait RestErrors {
  case class RestFailure(failureType: String)
  object RestFailure {
    implicit val decoder: io.circe.Decoder[RestFailure] = io.circe.generic.semiauto.deriveDecoder
    implicit val encoder: io.circe.Encoder[RestFailure] = io.circe.generic.semiauto.deriveEncoder
  }
  private def e(code: StatusCode, failureType: String) =
    code -> RestFailure(failureType = failureType)

  val unauthorizedResponse: (StatusCode, RestFailure)       = e(Unauthorized, "Unauthorized")
  def notFound(element: String): (StatusCode, RestFailure)  = e(NotFound, s"$element NotFound")
  def duplicate(element: String): (StatusCode, RestFailure) = e(Conflict, s"$element Exists")
  def forbidden(cause: String): (StatusCode, RestFailure)   = e(Forbidden, cause)
  val internalServerError: (StatusCode, RestFailure)        = e(InternalServerError, "InternalServerError")
  val serviceUnavailable: (StatusCode, RestFailure)         = e(ServiceUnavailable, "ServiceUnavailable")
  val noRoles: (StatusCode, RestFailure)                    = e(Unauthorized, "NoRoles")
  val noPermissions: (StatusCode, RestFailure)              = e(Unauthorized, "NoPermissions")
  def unprocessableEntity(detail: String): (StatusCode, RestFailure) =
    e(UnprocessableEntity, s"UnprocessableEntity: $detail")
}
