/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class PropertyFrozenData(
  property: PropertyData,
  room: RoomData,
  user: UserData,
  termsAndConditions: String
)

object PropertyFrozenData {
  implicit val decoder: io.circe.Decoder[PropertyFrozenData] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[PropertyFrozenData] = io.circe.generic.semiauto.deriveEncoder
}

