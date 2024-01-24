/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class MunicipalityInfo(
  villageId: Option[Int],
  villageName: String,
  cityId: Int,
  cityName: String,
  countryId: Int,
  countryName: String
)

object MunicipalityInfo {
  implicit val decoder: io.circe.Decoder[MunicipalityInfo] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[MunicipalityInfo] = io.circe.generic.semiauto.deriveEncoder
}

