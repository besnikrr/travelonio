/**
  * Reze
  *
  * This class is auto generated, see api/templates and
  * https://github.com/swagger-api/swagger-codegen.git
  * Do not edit the class manually.
  */
package backend.api

case class PropertyFilters(
    propertyType: Option[List[String]],
    location: Option[LocationForUpdate],
    startDate: String,
    endDate: String,
    adults: Option[Int],
    children: Option[Int],
    infants: Option[Int],
    minPrice: Option[Int],
    maxPrice: Option[Int],
    sort: Option[SortFilter],
    selectedSurroundings: Option[List[String]],
    selectedTrips: Option[List[String]],
    propertyIds: Option[List[String]]
)

object PropertyFilters {
  implicit val decoder: io.circe.Decoder[PropertyFilters] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertyFilters] = io.circe.generic.semiauto.deriveEncoder
}
