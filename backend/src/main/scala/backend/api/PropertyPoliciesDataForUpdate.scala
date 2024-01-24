/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertyPoliciesDataForUpdate(
  breakfastIncluded: Option[Boolean],
  buyBreakfastPossibility: Option[Boolean],
  breakfastPricePerPerson: Option[Double],
  potentialGuestNumber: Option[Int],
  propertySquareSize: Option[Double],
  isRoomInsideApartment: Option[Boolean],
  staffLanguages: Option[List[String]],
  smokingAllowed: Option[Boolean],
  eventsAllowed: Option[Boolean],
  petsAllowed: Option[Boolean],
  checkIn: Option[CheckInAndOut],
  checkOut: Option[CheckInAndOut],
  lateCheckout: Option[Boolean]
)

object PropertyPoliciesDataForUpdate {
  implicit val decoder: io.circe.Decoder[PropertyPoliciesDataForUpdate] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertyPoliciesDataForUpdate] = io.circe.generic.semiauto.deriveEncoder
}

