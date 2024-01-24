/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UpdateCompany(
  name: Option[String]
)

object UpdateCompany {
  implicit val decoder: io.circe.Decoder[UpdateCompany] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UpdateCompany] = io.circe.generic.semiauto.deriveEncoder
}

