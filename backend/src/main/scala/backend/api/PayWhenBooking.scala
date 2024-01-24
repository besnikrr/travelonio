/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PayWhenBooking(
  selected: Option[Boolean],
  upFrontPayPercentage: Option[Int]
)

object PayWhenBooking {
  implicit val decoder: io.circe.Decoder[PayWhenBooking] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PayWhenBooking] = io.circe.generic.semiauto.deriveEncoder
}

