/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PayAtProperty(
  selected: Option[Boolean],
  paymentMethods: List[PaymentMethods]
)

object PayAtProperty {
  implicit val decoder: io.circe.Decoder[PayAtProperty] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PayAtProperty] = io.circe.generic.semiauto.deriveEncoder
}

