/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class BookingInfos(
  startDate: String,
  endDate: String,
  guestsInfo: String,
  rooms: Int,
  guests: Guests
)

object BookingInfos {
  implicit val decoder: io.circe.Decoder[BookingInfos] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[BookingInfos] = io.circe.generic.semiauto.deriveEncoder
}

