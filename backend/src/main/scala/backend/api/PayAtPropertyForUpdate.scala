/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PayAtPropertyForUpdate(
  selected: Option[Boolean],
  paymentMethods: Option[PaymentMethodsForUpdate]
)

object PayAtPropertyForUpdate {
  implicit val decoder: io.circe.Decoder[PayAtPropertyForUpdate] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PayAtPropertyForUpdate] = io.circe.generic.semiauto.deriveEncoder
}

