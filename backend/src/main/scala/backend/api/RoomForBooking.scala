/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RoomForBooking(
  roomIds: List[String],
  startDate: String,
  endDate: String,
  adults: Int,
  children: Int,
  infants: Int,
  rooms: Option[Int]
)

object RoomForBooking {
  implicit val decoder: io.circe.Decoder[RoomForBooking] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RoomForBooking] = io.circe.generic.semiauto.deriveEncoder
}

