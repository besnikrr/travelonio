/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class CheckInAndOut(
  from: Option[String],
  to: Option[String]
)

object CheckInAndOut {
  implicit val decoder: io.circe.Decoder[CheckInAndOut] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[CheckInAndOut] = io.circe.generic.semiauto.deriveEncoder
}

