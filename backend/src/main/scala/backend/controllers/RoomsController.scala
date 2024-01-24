package backend.controllers

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.Route
import backend.Server.{baseUrl, ec, timeout}
import backend.api.{BookingInfos, RoomForBooking, RoomInsertedResponse, UpdateRoom}
import backend.mongo._
import backend.services.Services
import backend.utils.EmailTemplates.{emailOwnerBookedRoomTemplate, emailUserBookedRoomTemplate}
import backend.utils.Utils.{duplicate, notFound, onResponse, sendEmail, serviceUnavailable}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class RoomsController(mongo: MongoCollections)(implicit services: Services) {
  def insertRoom(propertyId: String): Route =
    onResponse[InsertRoomResponses](mongo.insertRoom(propertyId)) {
      case RoomCreated(id) =>
        complete(StatusCodes.Created -> RoomInsertedResponse(id))
      case DuplicateEntry => complete(duplicate("room"))
      case MongoError     => complete(serviceUnavailable)
    }

  def getRooms(propertyId: String): Route =
    onResponse[ReadRoomsDatabaseResponses](mongo.getRooms(propertyId)) {
      case Rooms(rooms) => complete(StatusCodes.OK -> rooms.map(_.toApiModel))
      case MongoError   => complete(serviceUnavailable)
    }

  def getRoom(propertyId: String, roomId: String): Route =
    onResponse[ReadRoomDatabaseResponses](mongo.getRoom(propertyId, roomId)) {
      case RoomInfo(r: Room) => complete(StatusCodes.OK -> r.toApiModel)
      case RoomNotFound      => complete(notFound("room"))
      case MongoError        => complete(serviceUnavailable)
    }

  def deleteRoom(propertyId: String, roomId: String): Route =
    onResponse[DeletedRoomResponses](mongo.deleteRoom(propertyId, roomId)) {
      case RoomDeleted  => complete(StatusCodes.NoContent -> "")
      case RoomNotFound => complete(notFound("room"))
      case MongoError   => complete(serviceUnavailable)
    }

  def updateRoom(propertyId: String, roomId: String, updateRoom: UpdateRoom): Route =
    onResponse[UpdatedRoomResponses](mongo.updateRoom(propertyId, roomId, updateRoom)) {
      case RoomDataUpdated(room: Room) =>
        complete(StatusCodes.OK -> room.toApiModel)
      case RoomNotFound => complete(notFound("room"))
      case MongoError   => complete(serviceUnavailable)
    }

  def reorderImageIds(
      propertyId: String,
      roomId: String,
      imageId: String
  ): Route =
    onResponse[UpdatedRoomResponses](mongo.reorderRoomImageIds(propertyId, roomId, imageId)) {
      case RoomDataUpdated(room: Room) =>
        complete(StatusCodes.OK -> room.toApiModel)
      case RoomNotFound => complete(notFound("room"))
      case MongoError   => complete(serviceUnavailable)
    }
  def roomBooking(
      propertyId: String,
      roomId: String,
      userId: String,
      bookingInfos: BookingInfos
  ): Route =
    onResponse[RoomBookingResponses](mongo.bookingRoom(propertyId, roomId, userId, bookingInfos)) {
      case RoomBooked(ids, bookings) =>
        sendEmail(
          bookings.head.propertyFrozenData.user.email,
          "Your room is booked",
          emailUserBookedRoomTemplate(baseUrl, bookings),
          services.request,
          services.sendGrid
        )

        mongo.getUserByCompanyId(bookings.head.propertyFrozenData.property.companyId).map {
          case UserInfo(user) =>
            sendEmail(
              user.email,
              "New bookings from Travelonio.com",
              emailOwnerBookedRoomTemplate(baseUrl, bookings, user.name + " " + user.lastname, user.language),
              services.request,
              services.sendGrid
            )

          case MongoError   =>
          case UserNotFound =>
        }

        complete(StatusCodes.Created -> RoomInsertedResponse(ids.head.toString))
      case NoAvailableRooms => complete(StatusCodes.UnprocessableEntity -> "No available rooms")
      case MongoError       => complete(serviceUnavailable)
    }
  def getRoomBooking(propertyId: String, roomId: String, userId: String, bookingId: String): Route =
    onResponse[BookingInfoResponses](mongo.getBookingInfo(propertyId, roomId, userId, bookingId)) {
      case RoomBookingInfos(bookingInfos) =>
        complete(StatusCodes.Created -> bookingInfos.toApiModel)
      case NoAvailableBookings =>
        complete(StatusCodes.UnprocessableEntity -> "No available bookings")
    }

  def availableRoomForBooking(propertyId: String, roomForBooking: RoomForBooking): Route =
    onResponse[AvailableRoomResponses](mongo.availableRoomForBooking(propertyId, roomForBooking)) {
      case AvailableRoom(property: PropertyWithRoomsAndBeds) =>
        complete(StatusCodes.OK -> property.toApiModel)
      case NoAvailableRoom => complete(StatusCodes.Forbidden -> "No available rooms")
      case MongoError => complete(StatusCodes.UnprocessableEntity -> "Unprocessable Entity")
    }
}
object RoomsController {
  def apply(mongo: MongoCollections)(implicit services: Services) = new RoomsController(mongo)
}
