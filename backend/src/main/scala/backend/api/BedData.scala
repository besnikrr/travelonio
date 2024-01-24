/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class BedData(
  bedId: String,
  bedType: String,
  adults: Int,
  children: Int,
  infants: Int,
  dimensions: String,
  icon: String
)

object BedData {
  implicit val decoder: io.circe.Decoder[BedData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[BedData] = io.circe.generic.semiauto.deriveEncoder
}

