package backend.controllers

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.Route
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

import backend.Server.{ec, timeout}
import backend.api.{CompanyInsertedResponse, InsertCompany, UpdateCompany}
import backend.mongo._
import backend.services.Services
import backend.utils.Utils.{duplicate, notFound, onResponse, serviceUnavailable}

class CompaniesController(mongo: MongoCollections)(implicit services: Services) {
  def insertCompany(company: InsertCompany): Route =
    onResponse[InsertCompanyResponses](mongo.insertCompany(company.name)) {
      case CompanyCreated(id, name) =>
        complete(StatusCodes.Created -> CompanyInsertedResponse(id, name))
      case DuplicateEntry => complete(duplicate("company"))
      case MongoError     => complete(serviceUnavailable)
    }

  def getCompanies: Route =
    onResponse[ReadCompaniesDatabaseResponses](mongo.getCompanies) {
      case Companies(companies) => complete(StatusCodes.OK -> companies.map(_.toApiModel))
      case MongoError           => complete(serviceUnavailable)
    }

  def getCompany(companyId: String): Route =
    onResponse[ReadCompanyDatabaseResponses](mongo.getCompany(companyId)) {
      case CompanyInfo(c: Company) => complete(StatusCodes.OK -> c.toApiModel)
      case CompanyNotFound         => complete(notFound("company"))
      case MongoError              => complete(serviceUnavailable)
    }

  def deleteCompany(companyId: String): Route =
    onResponse[DeletedCompanyResponses](mongo.deleteCompany(companyId)) {
      case CompanyDeleted  => complete(StatusCodes.OK)
      case CompanyNotFound => complete(notFound("company"))
      case MongoError      => complete(serviceUnavailable)
    }

  def updateCompany(companyId: String, updateCompany: UpdateCompany): Route =
    onResponse[UpdatedCompanyResponses](mongo.updateCompany(companyId, updateCompany)) {
      case CompanyDataUpdated(company: Company) =>
        complete(StatusCodes.OK -> company.toApiModel)
      case RecordNotFound => complete(notFound("company"))
      case MongoError     => complete(serviceUnavailable)
    }

}

object CompaniesController {
  def apply(mongo: MongoCollections)(implicit services: Services) = new CompaniesController(mongo)
}
