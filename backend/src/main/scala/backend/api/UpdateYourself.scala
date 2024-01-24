/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UpdateYourself(
  name: Option[String],
  lastname: Option[String],
  password: Option[String],
  language: Option[String]
)

object UpdateYourself {
  implicit val decoder: io.circe.Decoder[UpdateYourself] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UpdateYourself] = io.circe.generic.semiauto.deriveEncoder
}

