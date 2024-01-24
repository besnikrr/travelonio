/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class RoomDiscountData(
  hasDiscount: Option[Boolean],
  discountPercentage: Option[Double],
  validFrom: Option[String],
  validUntil: Option[String]
)

object RoomDiscountData {
  implicit val decoder: io.circe.Decoder[RoomDiscountData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[RoomDiscountData] = io.circe.generic.semiauto.deriveEncoder
}

