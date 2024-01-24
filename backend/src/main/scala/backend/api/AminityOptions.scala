/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class AminityOptions(
  name: String,
  selected: Boolean,
  distance: Option[Double]
)

object AminityOptions {
  implicit val decoder: io.circe.Decoder[AminityOptions] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[AminityOptions] = io.circe.generic.semiauto.deriveEncoder
}

