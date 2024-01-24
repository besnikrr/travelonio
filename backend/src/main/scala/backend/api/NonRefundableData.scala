/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class NonRefundableData(
  setNonRefundable: Option[Boolean],
  discount: Option[Int],
  pricePerNight: Option[Double]
)

object NonRefundableData {
  implicit val decoder: io.circe.Decoder[NonRefundableData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[NonRefundableData] = io.circe.generic.semiauto.deriveEncoder
}

