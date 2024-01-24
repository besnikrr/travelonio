/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RatePlan(
  refundable: RefundableData,
  nonRefundable: NonRefundableData,
  pricePerGroup: PricePerGroup,
  weeklyPlan: WeeklyPlan
)

object RatePlan {
  implicit val decoder: io.circe.Decoder[RatePlan] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RatePlan] = io.circe.generic.semiauto.deriveEncoder
}

