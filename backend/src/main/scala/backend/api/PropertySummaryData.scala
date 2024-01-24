/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertySummaryData(
  propertyId: String,
  propertyPrimaryImageId: String,
  propertyType: String,
  description: String,
  location: Location,
  totalRooms: Int,
  cheapestRoomPrice: Double
)

object PropertySummaryData {
  implicit val decoder: io.circe.Decoder[PropertySummaryData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertySummaryData] = io.circe.generic.semiauto.deriveEncoder
}

