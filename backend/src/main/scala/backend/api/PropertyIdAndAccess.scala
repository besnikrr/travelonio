/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertyIdAndAccess(
  propertyId: String,
  permission: String
)

object PropertyIdAndAccess {
  implicit val decoder: io.circe.Decoder[PropertyIdAndAccess] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertyIdAndAccess] = io.circe.generic.semiauto.deriveEncoder
}

