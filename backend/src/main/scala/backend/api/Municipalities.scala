/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class Municipalities(
  municipalities: List[MunicipalityInfo]
)

object Municipalities {
  implicit val decoder: io.circe.Decoder[Municipalities] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[Municipalities] = io.circe.generic.semiauto.deriveEncoder
}

