/**
  * Reze
  *
  * This class is auto generated, see api/templates and
  * https://github.com/swagger-api/swagger-codegen.git
  * Do not edit the class manually.
  */
package backend.api

case class SortFilter(
    price: Option[String],
    rating: Option[Int],
    bestValue: Option[Boolean]
)

object SortFilter {
  implicit val decoder: io.circe.Decoder[SortFilter] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[SortFilter] = io.circe.generic.semiauto.deriveEncoder
}
