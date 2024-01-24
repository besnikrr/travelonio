/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class ResetPassword(
  userId: String,
  resetPasswordToken: String,
  newPassword: String
)

object ResetPassword {
  implicit val decoder: io.circe.Decoder[ResetPassword] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[ResetPassword] = io.circe.generic.semiauto.deriveEncoder
}

