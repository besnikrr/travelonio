/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PaymentMethods(
  name: String,
  selected: Boolean,
  value: Option[String]
)

object PaymentMethods {
  implicit val decoder: io.circe.Decoder[PaymentMethods] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PaymentMethods] = io.circe.generic.semiauto.deriveEncoder
}

