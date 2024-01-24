/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class BusinessInfo(
  name: Option[String],
  address: Option[String],
  licenseNumber: Option[String],
  vatNumber: Option[String],
  businessRegistrationNumber: Option[String]
)

object BusinessInfo {
  implicit val decoder: io.circe.Decoder[BusinessInfo] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[BusinessInfo] = io.circe.generic.semiauto.deriveEncoder
}

