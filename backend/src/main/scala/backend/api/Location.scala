/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class Location(
  country: Option[String],
  city: Option[String],
  village: Option[String],
  address: Option[String],
  zipCode: Option[String],
  longitude: Option[Double],
  latitude: Option[Double]
)

object Location {
  implicit val decoder: io.circe.Decoder[Location] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[Location] = io.circe.generic.semiauto.deriveEncoder
}

