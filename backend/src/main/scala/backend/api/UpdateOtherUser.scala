/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UpdateOtherUser(
  setRole: Option[String]
)

object UpdateOtherUser {
  implicit val decoder: io.circe.Decoder[UpdateOtherUser] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UpdateOtherUser] = io.circe.generic.semiauto.deriveEncoder
}

