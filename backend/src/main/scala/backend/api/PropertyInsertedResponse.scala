/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertyInsertedResponse(
  id: String
)

object PropertyInsertedResponse {
  implicit val decoder: io.circe.Decoder[PropertyInsertedResponse] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertyInsertedResponse] = io.circe.generic.semiauto.deriveEncoder
}

