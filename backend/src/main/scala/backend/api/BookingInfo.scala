/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class BookingInfo(
  bookingId: String,
  propertyId: String,
  roomId: String,
  startDate: String,
  endDate: String,
  guestsInfo: String,
  guests: Guests,
  accessPin: Int,
  propertyFrozenData: PropertyFrozenData,
  createdAt: String,
  updatedAt: String
)

object BookingInfo {
  implicit val decoder: io.circe.Decoder[BookingInfo] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[BookingInfo] = io.circe.generic.semiauto.deriveEncoder
}

