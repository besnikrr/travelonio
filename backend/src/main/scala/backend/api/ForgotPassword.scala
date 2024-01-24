/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class ForgotPassword(
  email: String
)

object ForgotPassword {
  implicit val decoder: io.circe.Decoder[ForgotPassword] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[ForgotPassword] = io.circe.generic.semiauto.deriveEncoder
}

