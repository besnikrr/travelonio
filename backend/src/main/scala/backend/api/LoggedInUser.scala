/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class LoggedInUser(
  sessionToken: String,
  userData: UserData
)

object LoggedInUser {
  implicit val decoder: io.circe.Decoder[LoggedInUser] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[LoggedInUser] = io.circe.generic.semiauto.deriveEncoder
}

