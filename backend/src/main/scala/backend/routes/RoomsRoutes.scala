package backend.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route

import backend.api.{BookingInfos, RoomForBooking, UpdateRoom}
import backend.controllers.RoomsController
import backend.services.Services
import backend.utils.Permissions.{DeleteRooms, InsertRooms, ReadRooms, UpdateRooms}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class RoomsRoutes(controller: RoomsController)(implicit services: Services) {

  import services._

  def routes: Route =
    concat(
      pathPrefix("properties" / Segment / "rooms" / Segment / "booking") { (propertyId, roomId) =>
        validMongoIds(propertyId, roomId) {
          authenticate()(session =>
              post {
                checkPermissions(session, Set()) {
                  entity(as[BookingInfos]) { bookingDates =>
                    controller.roomBooking(propertyId, roomId, session.userId, bookingDates)
                  }
                }
            }
          )
        }
      },
      pathPrefix("bookings" / "properties" / Segment /  "booking" ) { propertyId =>
        validMongoId(propertyId) {
            post {
                entity(as[RoomForBooking]) { roomForBooking =>
                  controller.availableRoomForBooking(propertyId, roomForBooking)
                }
            }
          }},
      pathPrefix("properties" / Segment / "rooms" / Segment / "booking" / Segment) { (propertyId, roomId, bookingId) =>
        validMongoIds(propertyId, roomId) {
          authenticate()(session =>
            get {
              checkPermissions(session, Set()) {
                  controller.getRoomBooking(propertyId, roomId, session.userId, bookingId)
              }
            }
          )
        }
      },
      pathPrefix("properties" / Segment / "rooms") { propertyId =>
        validMongoId(propertyId) {
          authenticate()(session =>
            concat(
              post { // api/rooms/properties/{propertyId}/rooms
                checkPermissions(session, Set(InsertRooms))(
                  controller.insertRoom(propertyId)
                )
              },
              get { // api/rooms/properties/{propertyId}/rooms
                checkPermissions(session, Set(ReadRooms))(
                  controller.getRooms(propertyId)
                )
              }
            )
          )
        }
      },
      pathPrefix("properties" / Segment / "rooms" / Segment) { (propertyId, roomId) =>
        validMongoIds(propertyId, roomId) {
          authenticate()(session =>
            concat(
              path("images" / Segment) { imageId =>
                validMongoIds(propertyId, roomId, imageId) {
                  patch {
                    checkPermissions(session, Set()) {
                      controller.reorderImageIds(propertyId, roomId, imageId)
                    }
                  }
                }
              },
              pathEnd {
                concat(
                  get { // /api/properties/{propertyId}/rooms/{roomId}
                    checkPermissions(session, Set(ReadRooms))(
                      controller.getRoom(propertyId, roomId)
                    )
                  },
                  delete { // /api/properties/{propertyId}/rooms/{roomId}
                    checkPermissions(session, Set(DeleteRooms))(
                      controller.deleteRoom(propertyId, roomId)
                    )
                  },
                  patch { // /api/properties/{propertyId}/rooms/{roomId}
                    checkPermissions(session, Set(UpdateRooms))(
                      entity(as[UpdateRoom])(controller.updateRoom(propertyId, roomId, _))
                    )
                  }
                )
              }
            )
          )
        }
      }
    )
}

object RoomsRoutes {
  def apply(roomController: RoomsController)(implicit services: Services): Route =
    new RoomsRoutes(roomController).routes
}
