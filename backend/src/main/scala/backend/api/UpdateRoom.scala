/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UpdateRoom(
  roomType: Option[String],
  totalRooms: Option[Int],
  bookedRooms: Option[Int],
  description: Option[String],
  price: Option[Double],
  addBed: Option[BedIdAndQuantity],
  removeBed: Option[BedIdAndQuantity],
  addImageIds: Option[List[String]],
  removeImageIds: Option[List[String]],
  quantity: Option[Int],
  peopleQuantity: Option[Int],
  discountPlan: Option[RoomDiscountData],
  addTag: Option[String],
  removeTag: Option[String]
)

object UpdateRoom {
  implicit val decoder: io.circe.Decoder[UpdateRoom] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UpdateRoom] = io.circe.generic.semiauto.deriveEncoder
}

