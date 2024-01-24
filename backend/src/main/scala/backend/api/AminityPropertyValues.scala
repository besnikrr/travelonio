/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class AminityPropertyValues(
  name: String, // The aminity name.
  option: List[AminityOptions]
)

object AminityPropertyValues {
  implicit val decoder: io.circe.Decoder[AminityPropertyValues] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[AminityPropertyValues] = io.circe.generic.semiauto.deriveEncoder
}

