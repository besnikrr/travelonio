/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class InsertOtherUser(
  email: String,
  role: String
)

object InsertOtherUser {
  implicit val decoder: io.circe.Decoder[InsertOtherUser] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[InsertOtherUser] = io.circe.generic.semiauto.deriveEncoder
}

