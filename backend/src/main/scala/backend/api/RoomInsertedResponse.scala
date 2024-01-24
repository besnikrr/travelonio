/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RoomInsertedResponse(
  id: String
)

object RoomInsertedResponse {
  implicit val decoder: io.circe.Decoder[RoomInsertedResponse] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RoomInsertedResponse] = io.circe.generic.semiauto.deriveEncoder
}

