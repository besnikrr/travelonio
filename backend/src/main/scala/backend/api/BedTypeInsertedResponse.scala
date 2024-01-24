/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class BedTypeInsertedResponse(
  bed: BedData
)

object BedTypeInsertedResponse {
  implicit val decoder: io.circe.Decoder[BedTypeInsertedResponse] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[BedTypeInsertedResponse] = io.circe.generic.semiauto.deriveEncoder
}

