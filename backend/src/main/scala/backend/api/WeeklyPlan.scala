/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class WeeklyPlan(
  setWeeklyPlan: Option[Boolean],
  discount: Option[Int],
  pricePerNight: Option[Double]
)

object WeeklyPlan {
  implicit val decoder: io.circe.Decoder[WeeklyPlan] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[WeeklyPlan] = io.circe.generic.semiauto.deriveEncoder
}

