/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class InsertCompany(
  name: String
)

object InsertCompany {
  implicit val decoder: io.circe.Decoder[InsertCompany] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[InsertCompany] = io.circe.generic.semiauto.deriveEncoder
}

