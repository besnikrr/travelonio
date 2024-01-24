/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PaymentOptions(
  payWhenBooking: PayWhenBooking,
  payAtProperty: PayAtProperty
)

object PaymentOptions {
  implicit val decoder: io.circe.Decoder[PaymentOptions] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PaymentOptions] = io.circe.generic.semiauto.deriveEncoder
}

