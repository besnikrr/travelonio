/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class InsertRoom(
  roomType: String
)

object InsertRoom {
  implicit val decoder: io.circe.Decoder[InsertRoom] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[InsertRoom] = io.circe.generic.semiauto.deriveEncoder
}

