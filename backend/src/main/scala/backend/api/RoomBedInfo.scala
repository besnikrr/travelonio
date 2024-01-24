/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RoomBedInfo(
  bedId: String,
  bedQuantity: Int,
  bedType: String,
  adults: Int,
  children: Int,
  infants: Int,
  dimensions: String,
  icon: String
)

object RoomBedInfo {
  implicit val decoder: io.circe.Decoder[RoomBedInfo] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RoomBedInfo] = io.circe.generic.semiauto.deriveEncoder
}

