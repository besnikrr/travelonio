/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UpdateProperty(
  name: Option[String],
  description: Option[String],
  propertyType: Option[String], // The type of the property. Valid values are: Hotel, Apartment, HomeVilla, Other.
  postalCode: Option[String],
  aminityIds: Option[AminityPropertyForUpdate],
  addKeyword: Option[String],
  removeKeyword: Option[String],
  propertyPoliciesData: Option[PropertyPoliciesDataForUpdate],
  ratePlan: Option[RatePlanForUpdate],
  paymentOptions: Option[PaymentOptionsForUpdate],
  discountForTheFirstFiveGuests: Option[Boolean],
  bankDetails: Option[BankDetails],
  readyForBooking: Option[Boolean],
  startBookingDate: Option[String],
  acceptedTermAndConditions: Option[Boolean],
  amenitiesDescription: Option[String],
  addTag: Option[String],
  removeTag: Option[String],
  location: Option[LocationForUpdate],
  businessInfo: Option[BusinessInfo],
  active: Option[Boolean],
  completed: Option[Boolean]
)

object UpdateProperty {
  implicit val decoder: io.circe.Decoder[UpdateProperty] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UpdateProperty] = io.circe.generic.semiauto.deriveEncoder
}

