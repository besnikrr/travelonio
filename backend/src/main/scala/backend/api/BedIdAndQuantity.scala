/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class BedIdAndQuantity(
  bedId: String,
  bedQuantity: Int
)

object BedIdAndQuantity {
  implicit val decoder: io.circe.Decoder[BedIdAndQuantity] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[BedIdAndQuantity] = io.circe.generic.semiauto.deriveEncoder
}

