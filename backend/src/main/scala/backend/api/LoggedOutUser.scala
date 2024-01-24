/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class LoggedOutUser(
  userId: String
)

object LoggedOutUser {
  implicit val decoder: io.circe.Decoder[LoggedOutUser] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[LoggedOutUser] = io.circe.generic.semiauto.deriveEncoder
}

