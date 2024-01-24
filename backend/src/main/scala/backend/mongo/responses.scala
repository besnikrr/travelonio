package backend.mongo

import backend.api.UserData
import org.mongodb.scala.bson.ObjectId

sealed protected trait GeneralDatabaseResponses
case object MongoError
    extends GeneralDatabaseResponses
    with UpdateUserResponses
    with ReadUserDatabaseResponses
    with ReadUsersDatabaseResponses
    with ReadSuperAdminUsersDatabaseResponses
    with DeletedUserResponses
    with InsertUserDatabaseResponses
    with InsertCompanyResponses
    with InsertRoomResponses
    with InsertBedResponses
    with ReadCompaniesDatabaseResponses
    with ReadCompanyDatabaseResponses
    with ReadRoomsDatabaseResponses
    with ReadRoomDatabaseResponses
    with ReadBedsDatabaseResponses
    with ReadBedDatabaseResponses
    with InsertImageDatabaseResponses
    with UpdatedCompanyResponses
    with UpdatedRoomResponses
    with UpdatedBedResponses
    with DeletedCompanyResponses
    with DeletedRoomResponses
    with DeletedBedResponses
    with RegisterUsersDatabaseResponses
    with InsertPropertyResponses
    with ReadPropertiesDatabaseResponses
    with ReadPropertyDatabaseResponses
    with DeletedPropertyResponses
    with UpdatedPropertyResponses
    with ActivateAccountResponses
    with ForgotPasswordResponses
    with ResetPasswordResponses
    with InitialData
    with ReadPropertyPublicDatabaseResponses
    with ReadSpecificPropertiesForPublicDatabaseResponses
    with RoomBookingResponses
    with AvailableRoomResponses
case object DuplicateEntry
    extends GeneralDatabaseResponses
    with InsertUserDatabaseResponses
    with InsertCompanyResponses
    with InsertRoomResponses
    with InsertBedResponses
    with InsertPropertyResponses
    with InitialData
case class EntryCreated(id: String) extends GeneralDatabaseResponses

sealed trait InsertCompanyResponses
case class CompanyCreated(id: String, name: String) extends InsertCompanyResponses

sealed trait ReadCompaniesDatabaseResponses
case class Companies(companies: Seq[Company]) extends ReadCompaniesDatabaseResponses

sealed trait ReadCompanyDatabaseResponses
case class CompanyInfo(company: Company) extends ReadCompanyDatabaseResponses

sealed trait DeletedCompanyResponses
case object CompanyDeleted extends DeletedCompanyResponses

sealed trait UpdatedCompanyResponses
case class CompanyDataUpdated(company: Company) extends UpdatedCompanyResponses

sealed trait InsertRoomResponses
case class RoomCreated(id: String) extends InsertRoomResponses

sealed trait ReadRoomsDatabaseResponses
case class Rooms(rooms: Seq[Room]) extends ReadRoomsDatabaseResponses

sealed trait ReadRoomDatabaseResponses
case class RoomInfo(room: Room) extends ReadRoomDatabaseResponses

sealed trait DeletedRoomResponses
case object RoomDeleted extends DeletedRoomResponses

sealed trait UpdatedRoomResponses
case class RoomDataUpdated(room: Room) extends UpdatedRoomResponses

sealed trait RoomBookingResponses
case class RoomBooked(ids: List[ObjectId], bookingData: List[Booking]) extends RoomBookingResponses
case object NoAvailableRooms                                          extends RoomBookingResponses

sealed trait AvailableRoomResponses
case class AvailableRoom(propertyWithRoomsAndBeds: PropertyWithRoomsAndBeds)
    extends AvailableRoomResponses
case object NoAvailableRoom extends AvailableRoomResponses

sealed trait BookingInfoResponses
case class RoomBookingInfos(bookingInfos: Booking) extends BookingInfoResponses
case object NoAvailableBookings                    extends BookingInfoResponses

sealed trait InsertBedResponses
case class BedTypeCreated(bed: Bed) extends InsertBedResponses

sealed trait ReadBedsDatabaseResponses
case class Beds(beds: Seq[Bed]) extends ReadBedsDatabaseResponses

sealed trait ReadBedDatabaseResponses
case class BedInfo(bed: Bed) extends ReadBedDatabaseResponses

sealed trait DeletedBedResponses
case object BedDeleted extends DeletedBedResponses

sealed trait UpdatedBedResponses
case class BedDataUpdated(bed: Bed) extends UpdatedBedResponses

sealed trait InsertImageDatabaseResponses
case class ImageUploaded(id: String) extends InsertImageDatabaseResponses

sealed trait DeletedImageDatabaseResponses
case object ImageDeleted  extends DeletedImageDatabaseResponses
case object ImageNotFound extends DeletedImageDatabaseResponses with DownloadImageDatabaseResponses

sealed trait DownloadImageDatabaseResponses
case class Image(
    propertyId: String,
    roomId: Option[String],
    imageId: String,
    content: Array[Byte],
    contentType: String
) extends DownloadImageDatabaseResponses

sealed trait InsertUserDatabaseResponses
case class UserInfo(user: UserData)
    extends InsertUserDatabaseResponses
    with ReadUserDatabaseResponses

sealed trait ReadUserDatabaseResponses
case object UserNotFound
    extends ReadUserDatabaseResponses
    with ForgotPasswordResponses
    with ResetPasswordResponses
    with ReadSuperAdminUsersDatabaseResponses

sealed trait ReadUsersDatabaseResponses
case class CompanyUsers(users: List[UserData]) extends ReadUsersDatabaseResponses
case object CompanyNotFound
    extends ReadUsersDatabaseResponses
    with ReadCompanyDatabaseResponses
    with DeletedCompanyResponses
    with ForgotPasswordResponses

case object PropertyNotFound
    extends ReadPropertyDatabaseResponses
    with DeletedPropertyResponses
    with ReadPropertyPublicDatabaseResponses
    with ReadSpecificPropertiesForPublicDatabaseResponses

sealed trait InsertPropertyResponses

case class PropertyCreated(id: String) extends InsertPropertyResponses

sealed trait ReadPropertiesDatabaseResponses

case class Properties(properties: Seq[Property]) extends ReadPropertiesDatabaseResponses

sealed trait ReadPropertyDatabaseResponses

case class PropertyInfo(property: Property) extends ReadPropertyDatabaseResponses

sealed trait ReadPropertyPublicDatabaseResponses
case class PropertyForPublic(property: PropertyWithRoomsAndBeds)
    extends ReadPropertyPublicDatabaseResponses

sealed trait ReadSpecificPropertiesForPublicDatabaseResponses
case class PropertyWithFilterForPublic(property: List[PropertyRoomData])
    extends ReadSpecificPropertiesForPublicDatabaseResponses

sealed trait ReadSuperAdminUsersDatabaseResponses
case class UserAndPropertySummaryData(
    usersAndPropertyData: List[UsersAndPropertyData]
) extends ReadSuperAdminUsersDatabaseResponses

sealed trait DeletedPropertyResponses

case object PropertyDeleted extends DeletedPropertyResponses

sealed trait UpdatedPropertyResponses

case class PropertyDataUpdated(property: Property) extends UpdatedPropertyResponses

sealed trait RegisterUsersDatabaseResponses

case class UserRegisteredResponse(user: User) extends RegisterUsersDatabaseResponses

case object UsernameDuplicateResponse extends RegisterUsersDatabaseResponses

case object CompanyDuplicateResponse extends RegisterUsersDatabaseResponses

case object EmailDuplicateResponse extends RegisterUsersDatabaseResponses

case object RoomNotFound
    extends ReadRoomDatabaseResponses
    with DeletedRoomResponses
    with UpdatedRoomResponses

case object BedNotFound extends ReadBedDatabaseResponses with DeletedBedResponses

sealed trait DeletedUserResponses
case object UserDeleted             extends DeletedUserResponses
case object DeletedUserUserNotFound extends DeletedUserResponses

sealed trait UpdateUserResponses
case class DataUpdated(user: UserData) extends UpdateUserResponses
case object RecordNotFound
    extends UpdateUserResponses
    with UpdatedCompanyResponses
    with UpdatedPropertyResponses

sealed trait PropertyUserLoginResponses
case object PasswordIncorrect                          extends PropertyUserLoginResponses
case object EmailNotConfirmed                          extends PropertyUserLoginResponses
case class UserAndToken(user: UserData, token: String) extends PropertyUserLoginResponses

sealed trait ActivateAccountResponses
case class AccountActivated(user: UserData) extends ActivateAccountResponses

sealed trait ForgotPasswordResponses
case class NewPasswordChance(userId: String, email: String, token: String)
    extends ForgotPasswordResponses
case object AccountNotActivated extends ForgotPasswordResponses

sealed trait ResetPasswordResponses
case class PasswordUpdated(userData: UserData) extends ResetPasswordResponses
case object InvalidToken                       extends ResetPasswordResponses
case object PasswordNotValid                   extends ResetPasswordResponses

sealed trait InitialData
case object InitialDataInputted extends InitialData
