/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class CompanyData(
  companyId: String,
  name: String
)

object CompanyData {
  implicit val decoder: io.circe.Decoder[CompanyData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[CompanyData] = io.circe.generic.semiauto.deriveEncoder
}

