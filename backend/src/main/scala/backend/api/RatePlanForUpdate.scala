/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RatePlanForUpdate(
  refundable: Option[RefundableData],
  nonRefundable: Option[NonRefundableData],
  pricePerGroup: Option[PricePerGroup],
  weeklyPlan: Option[WeeklyPlan]
)

object RatePlanForUpdate {
  implicit val decoder: io.circe.Decoder[RatePlanForUpdate] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RatePlanForUpdate] = io.circe.generic.semiauto.deriveEncoder
}

