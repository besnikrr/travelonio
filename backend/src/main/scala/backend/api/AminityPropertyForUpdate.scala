/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class AminityPropertyForUpdate(
  name: String, // The aminity name.
  option: AminityOptions
)

object AminityPropertyForUpdate {
  implicit val decoder: io.circe.Decoder[AminityPropertyForUpdate] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[AminityPropertyForUpdate] = io.circe.generic.semiauto.deriveEncoder
}

