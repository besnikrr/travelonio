/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class InsertUser(
  email: String,
  name: String,
  lastname: String,
  password: String,
  phone: String,
  role: String
)

object InsertUser {
  implicit val decoder: io.circe.Decoder[InsertUser] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[InsertUser] = io.circe.generic.semiauto.deriveEncoder
}

