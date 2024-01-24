/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UpdateBed(
  bedType: Option[String],
  adults: Option[Int],
  children: Option[Int],
  infants: Option[Int],
  dimensions: Option[String],
  icon: Option[String]
)

object UpdateBed {
  implicit val decoder: io.circe.Decoder[UpdateBed] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UpdateBed] = io.circe.generic.semiauto.deriveEncoder
}

