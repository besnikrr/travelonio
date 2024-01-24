/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class Guests(
  adults: Int,
  children: Int,
  infants: Int
)

object Guests {
  implicit val decoder: io.circe.Decoder[Guests] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[Guests] = io.circe.generic.semiauto.deriveEncoder
}

