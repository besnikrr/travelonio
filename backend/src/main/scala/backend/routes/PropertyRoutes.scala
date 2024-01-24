package backend.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import backend.api.{LocationForUpdate, Places, PropertyFilters, UpdateProperty}
import backend.controllers.PropertyController
import backend.services.Services
import backend.utils.{Countries, PropertyTypes}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

import scala.language.postfixOps

class PropertyRoutes(controller: PropertyController)(implicit services: Services) {
  import services._
  def routes: Route =
    concat(
      pathPrefix(Segment / "review") { propertyId =>
        validMongoIds(propertyId) {
          get {
            controller.getPropertyForPublic(propertyId)
          }
        }
      },
      pathPrefix("locations") {
        get {
          parameters("place".optional) { place =>
            controller.getAllCountries(place)
          }
        }
      },
      pathPrefix("search") {
        post {
          entity(as[PropertyFilters]) { propertyFilters =>
            controller.getSpecificProperties(propertyFilters) // checkPropertyFilters
          }
        }
      },
      authenticate()(session =>
        concat(
          pathPrefix(Segment) { propertyId =>
            validMongoId(propertyId) {
              concat(
                path("images" / Segment) { imageId =>
                  validMongoIds(propertyId, imageId) {
                    patch {
                      checkPermissions(session, Set()) {
                        controller.reorderImageIds(session.companyId, propertyId, imageId)
                      }
                    }
                  }
                },
                patch { // api/properties/{propertyId}
                  checkPermissions(session, Set())(
                    entity(as[UpdateProperty]) { property =>
                      validEnum(property.propertyType, PropertyTypes)(
                        controller
                          .updateProperty(session.companyId, session.userId, propertyId, property)
                      )
                    }
                  )
                },
                get { // api/properties/{propertyId}
                  checkPermissions(session, Set())(
                    controller.getProperty(session.companyId, propertyId)
                  )
                },
                delete { // api/properties/{propertyId}
                  checkPermissions(session, Set())(
                    controller.deleteProperty(session.companyId, propertyId)
                  )
                }
              )
            }
          },
          post { // api/properties
            checkPermissions(session, Set())(
              controller.insertProperty(session.companyId)
            )
          },
          get { // api/properties
            checkPermissions(session, Set())(
              controller.getProperties(session.companyId)
            )
          }
        )
      )
    )

}

object PropertyRoutes {
  def apply(propertyController: PropertyController)(implicit services: Services): Route =
    new PropertyRoutes(propertyController).routes
}
