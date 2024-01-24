/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class Beds(
  bedId: String,
  bedQuantity: Int
)

object Beds {
  implicit val decoder: io.circe.Decoder[Beds] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[Beds] = io.circe.generic.semiauto.deriveEncoder
}

