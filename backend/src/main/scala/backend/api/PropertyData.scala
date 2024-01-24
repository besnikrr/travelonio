/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertyData(
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
  bankDetails: BankDetails,
  readyForBooking: Option[Boolean],
  startBookingDate: String,
  acceptedTermAndConditions: Boolean,
  amenitiesDescription: String,
  tags: List[String],
  createdAt: String,
  updatedAt: String,
  location: Location,
  reviewed: Boolean,
  businessInfo: BusinessInfo,
  active: Option[Boolean],
  completed: Option[Boolean]
)

object PropertyData {
  implicit val decoder: io.circe.Decoder[PropertyData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertyData] = io.circe.generic.semiauto.deriveEncoder
}

