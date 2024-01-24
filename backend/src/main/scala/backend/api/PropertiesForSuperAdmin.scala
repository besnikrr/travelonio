/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertiesForSuperAdmin(
  userId: String,
  propertyId: String,
  propertyName: String,
  propertyType: String,
  createdAt: String,
  updatedAt: String,
  location: Location,
  ratePlan: RatePlan,
  paymentOptions: PaymentOptions,
  rooms: List[RoomData]
)

object PropertiesForSuperAdmin {
  implicit val decoder: io.circe.Decoder[PropertiesForSuperAdmin] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertiesForSuperAdmin] = io.circe.generic.semiauto.deriveEncoder
}

