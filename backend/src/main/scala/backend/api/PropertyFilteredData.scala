/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertyFilteredData(
  propertyId: String,
  propertyType: String,
  propertyName: String,
  price: Double,
  primaryImageId: String,
  location: Location
)

object PropertyFilteredData {
  implicit val decoder: io.circe.Decoder[PropertyFilteredData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertyFilteredData] = io.circe.generic.semiauto.deriveEncoder
}

