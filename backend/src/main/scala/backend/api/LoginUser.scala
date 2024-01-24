/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class LoginUser(
  email: String,
  password: String
)

object LoginUser {
  implicit val decoder: io.circe.Decoder[LoginUser] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[LoginUser] = io.circe.generic.semiauto.deriveEncoder
}

