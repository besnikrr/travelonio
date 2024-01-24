/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UserData(
  userId: String,
  companyId: String,
  name: String,
  lastname: String,
  email: String,
  phone: String,
  role: String,
  emailConfirmed: Boolean,
  accountActivated: Boolean,
  propertyAccess: List[PropertyIdAndAccess],
  language: String
)

object UserData {
  implicit val decoder: io.circe.Decoder[UserData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UserData] = io.circe.generic.semiauto.deriveEncoder
}

