/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RefundableData(
  fullyRefundable: Option[Boolean],
  cancellationPolicy: Option[Int],
  pricePerNight: Option[Double]
)

object RefundableData {
  implicit val decoder: io.circe.Decoder[RefundableData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RefundableData] = io.circe.generic.semiauto.deriveEncoder
}

