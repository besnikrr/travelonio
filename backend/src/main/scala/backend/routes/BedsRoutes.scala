package backend.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import backend.api.{InsertBed, UpdateBed}
import backend.controllers.BedsController
import backend.services.Services
import backend.utils.Permissions.{DeleteBedTypes, InsertBedTypes, ReadBedTypes, UpdateBedTypes}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class BedsRoutes(controller: BedsController)(implicit services: Services) {

  import services._

  def routes: Route =
    concat(
      pathEnd {
        authenticate()(session =>
          concat(
            post { // api/beds
              checkPermissions(session, Set(InsertBedTypes))(
                entity(as[InsertBed])(controller.insertBed)
              )
            },
            get { // api/beds
              checkPermissions(session, Set(ReadBedTypes))(
                controller.getBedTypes
              )
            }
          )
        )
      },
      pathPrefix(Segment) { bedTypeId =>
        validMongoId(bedTypeId) {
          authenticate()(session =>
            concat(
              pathEnd {
                concat(
                  get { // api/beds/{bedId}
                    checkPermissions(session, Set(ReadBedTypes))(
                      controller.getBedType(bedTypeId)
                    )
                  },
                  delete { // api/beds/{bedId}
                    checkPermissions(session, Set(DeleteBedTypes))(
                      controller.deleteBedType(bedTypeId)
                    )
                  },
                  patch { // api/beds/{bedId}
                    checkPermissions(session, Set(UpdateBedTypes))(
                      entity(as[UpdateBed])(
                        controller.updateBedType(bedTypeId, _)
                      )
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

object BedsRoutes {
  def apply(bedsController: BedsController)(implicit services: Services): Route =
    new BedsRoutes(bedsController).routes
}
