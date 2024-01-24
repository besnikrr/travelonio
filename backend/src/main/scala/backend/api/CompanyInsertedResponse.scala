/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class CompanyInsertedResponse(
  id: String,
  name: String
)

object CompanyInsertedResponse {
  implicit val decoder: io.circe.Decoder[CompanyInsertedResponse] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[CompanyInsertedResponse] = io.circe.generic.semiauto.deriveEncoder
}

