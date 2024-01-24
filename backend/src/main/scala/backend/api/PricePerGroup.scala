/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PricePerGroup(
  discountForThree: Option[Int],
  discountForTwo: Option[Int],
  discountForOne: Option[Int],
  pricePerNight: Option[Double],
  discountPerGroup: Option[Boolean]
)

object PricePerGroup {
  implicit val decoder: io.circe.Decoder[PricePerGroup] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PricePerGroup] = io.circe.generic.semiauto.deriveEncoder
}

