package backend.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import backend.api.{InsertCompany, UpdateCompany}
import backend.controllers.CompaniesController
import backend.services.Services
import backend.utils.Permissions.{DeleteCompanies, InsertCompanies, ReadCompanies, UpdateCompanies}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class CompaniesRoutes(controller: CompaniesController)(implicit services: Services) {

  import services._

  def routes: Route =
    concat(
      pathEnd {
        authenticate()(session =>
          concat(
            post { // api/companies
              checkPermissions(session, Set(InsertCompanies))(
                entity(as[InsertCompany])(controller.insertCompany)
              )
            },
            get { // api/companies
              checkPermissions(session, Set(ReadCompanies))(controller.getCompanies)
            }
          )
        )
      },
      pathPrefix(Segment) { companyId =>
        validMongoId(companyId) {
          authenticate()(session =>
            concat(
              pathEnd {
                concat(
                  get { // api/companies/{companyId}
                    checkPermissions(session, Set(ReadCompanies))(
                      controller.getCompany(companyId)
                    )
                  },
                  delete { // api/companies/{companyId}
                    checkPermissions(session, Set(DeleteCompanies))(
                      controller.deleteCompany(companyId)
                    )
                  },
                  patch { // api/companies/{companyId}
                    checkPermissions(session, Set(UpdateCompanies))(
                      entity(as[UpdateCompany])(controller.updateCompany(companyId, _))
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

object CompaniesRoutes {
  def apply(companyController: CompaniesController)(implicit services: Services): Route =
    new CompaniesRoutes(companyController).routes
}
