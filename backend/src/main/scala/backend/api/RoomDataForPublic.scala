/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RoomDataForPublic(
  propertyId: String,
  id: String,
  roomType: String,
  totalRooms: Int,
  bookedRooms: Int,
  description: String,
  price: Double,
  beds: List[RoomBedInfo],
  imageIds: List[String],
  quantity: Int,
  peopleQuantity: Int,
  discountPlan: RoomDiscountData,
  tags: List[String]
)

object RoomDataForPublic {
  implicit val decoder: io.circe.Decoder[RoomDataForPublic] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RoomDataForPublic] = io.circe.generic.semiauto.deriveEncoder
}

