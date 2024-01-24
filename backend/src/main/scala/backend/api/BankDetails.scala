/**
 * Reze
 *
 * This class is auto generated, see api/templates and
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
package backend.api



case class BankDetails(
  accountOwner: Option[String],
  accountNumber: Option[String],
  bankName: Option[String],
  swiftCode: Option[String]
)

object BankDetails {
  implicit val decoder: io.circe.Decoder[BankDetails] = io.circe.generic.semiauto.deriveDecoder
  implicit val encoder: io.circe.Encoder[BankDetails] = io.circe.generic.semiauto.deriveEncoder
}

