/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RoomData(
  propertyId: String,
  id: String,
  roomType: String,
  totalRooms: Int,
  bookedRooms: Int,
  description: String,
  price: Double,
  beds: List[Beds],
  imageIds: List[String],
  quantity: Int,
  peopleQuantity: Int,
  discountPlan: RoomDiscountData,
  tags: List[String]
)

object RoomData {
  implicit val decoder: io.circe.Decoder[RoomData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RoomData] = io.circe.generic.semiauto.deriveEncoder
}

