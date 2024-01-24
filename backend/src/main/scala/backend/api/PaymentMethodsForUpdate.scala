/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PaymentMethodsForUpdate(
  name: String,
  selected: Option[Boolean],
  value: Option[String]
)

object PaymentMethodsForUpdate {
  implicit val decoder: io.circe.Decoder[PaymentMethodsForUpdate] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PaymentMethodsForUpdate] = io.circe.generic.semiauto.deriveEncoder
}

