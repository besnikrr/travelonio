/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertyWithRoomsAndBeds(
  companyId: String,
  propertyId: String,
  name: String,
  description: String,
  propertyType: String,
  postalCode: String,
  aminityIds: List[AminityPropertyValues],
  imageIds: List[String],
  keywords: List[String],
  propertyPoliciesData: PropertyPoliciesData,
  ratePlan: RatePlan,
  paymentOptions: PaymentOptions,
  discountForTheFirstFiveGuests: Boolean,
  readyForBooking: Option[Boolean],
  startBookingDate: String,
  acceptedTermAndConditions: Boolean,
  amenitiesDescription: String,
  tags: List[String],
  location: Location,
  rooms: List[RoomDataForPublic],
  beds: List[BedData]
)

object PropertyWithRoomsAndBeds {
  implicit val decoder: io.circe.Decoder[PropertyWithRoomsAndBeds] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertyWithRoomsAndBeds] = io.circe.generic.semiauto.deriveEncoder
}

