/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class BedsDataForRoom(
  bedId: String,
  bedQuantity: Int,
  bedType: String
)

object BedsDataForRoom {
  implicit val decoder: io.circe.Decoder[BedsDataForRoom] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[BedsDataForRoom] = io.circe.generic.semiauto.deriveEncoder
}

