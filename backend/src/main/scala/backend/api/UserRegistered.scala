/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class UserRegistered(
  userId: String
)

object UserRegistered {
  implicit val decoder: io.circe.Decoder[UserRegistered] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[UserRegistered] = io.circe.generic.semiauto.deriveEncoder
}

