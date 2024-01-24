/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class Places(
  countryId: Int,
  cityId: Int,
  villageId: Option[Int]
)

object Places {
  implicit val decoder: io.circe.Decoder[Places] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[Places] = io.circe.generic.semiauto.deriveEncoder
}

