/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RegisterUser(
  email: String,
  name: String,
  lastname: String,
  password: String,
  phone: String
)

object RegisterUser {
  implicit val decoder: io.circe.Decoder[RegisterUser] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RegisterUser] = io.circe.generic.semiauto.deriveEncoder
}

