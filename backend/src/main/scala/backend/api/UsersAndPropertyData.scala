/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UsersAndPropertyData(
  username: String,
  email: String,
  companyId: String,
  listOfProperties: List[PropertiesForSuperAdmin]
)

object UsersAndPropertyData {
  implicit val decoder: io.circe.Decoder[UsersAndPropertyData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UsersAndPropertyData] = io.circe.generic.semiauto.deriveEncoder
}

