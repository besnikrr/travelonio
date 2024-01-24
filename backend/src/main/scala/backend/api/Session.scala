/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class Session(
  token: String,
  userId: String,
  companyId: String,
  email: String,
  role: String
)

object Session {
  implicit val decoder: io.circe.Decoder[Session] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[Session] = io.circe.generic.semiauto.deriveEncoder
}

