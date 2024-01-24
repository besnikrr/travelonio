/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PaymentOptionsForUpdate(
  payWhenBooking: Option[PayWhenBooking],
  payAtProperty: Option[PayAtPropertyForUpdate]
)

object PaymentOptionsForUpdate {
  implicit val decoder: io.circe.Decoder[PaymentOptionsForUpdate] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PaymentOptionsForUpdate] = io.circe.generic.semiauto.deriveEncoder
}

