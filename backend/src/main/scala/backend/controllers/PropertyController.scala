package backend.controllers

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.Route
import backend.Server.{ec, timeout}
import backend.api._
import backend.mongo._
import backend.services.Services
import backend.utils.EmailTemplates.emailPropertyRegistrationEmail
import backend.utils.Utils.{duplicate, notFound, onResponse, sendEmail, serviceUnavailable}
import backend.utils.{AllPlaces, Countries}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class PropertyController(mongo: MongoCollections)(implicit services: Services) {
  def insertProperty(companyId: String): Route =
    onResponse[ReadPropertiesDatabaseResponses](mongo.getProperties(companyId)) {
      case Properties(properties) if properties.length >= 20 =>
        complete(StatusCodes.Forbidden -> "Forbidden")
      case Properties(_) =>
        onResponse[InsertPropertyResponses](mongo.insertProperty(companyId)) {
          case PropertyCreated(id) =>
            complete(StatusCodes.Created -> PropertyInsertedResponse(id))
          case DuplicateEntry => complete(duplicate("property"))
          case MongoError     => complete(serviceUnavailable)
        }
      case MongoError => complete(StatusCodes.InternalServerError -> "Failed to get properties")
    }

  def getProperties(companyId: String): Route =
    onResponse[ReadPropertiesDatabaseResponses](mongo.getProperties(companyId)) {
      case Properties(properties) => complete(StatusCodes.OK -> properties.map(_.toApiModel))
      case MongoError             => complete(StatusCodes.InternalServerError -> "Failed to get properties")
    }

  def getProperty(companyId: String, propertyId: String): Route =
    onResponse[ReadPropertyDatabaseResponses](mongo.getProperty(companyId, propertyId)) {
      case PropertyInfo(property: Property) => complete(StatusCodes.OK -> property.toApiModel)
      case PropertyNotFound                 => complete(notFound("company"))
      case MongoError                       => complete(serviceUnavailable)
    }

  def getPropertyForPublic(propertyId: String): Route =
    onResponse[ReadPropertyPublicDatabaseResponses](mongo.getPropertyForPublic(propertyId)) {
      case PropertyForPublic(property) =>
        complete(StatusCodes.OK -> property.toApiModel)
      case PropertyNotFound => complete(notFound("property"))
      case MongoError       => complete(serviceUnavailable)
    }

  def getSpecificProperties(
      propertyFilters: PropertyFilters
  ): Route =
    onResponse[ReadSpecificPropertiesForPublicDatabaseResponses](
      mongo.getSpecificPropertiesForPublic(propertyFilters)
    ) {
      case PropertyWithFilterForPublic(property) =>
        complete(StatusCodes.OK -> property.map(_.toApiModel))
      case PropertyNotFound => complete(notFound("property"))
      case MongoError       => complete(StatusCodes.UnprocessableEntity -> "Unprocessable Entity")
    }

  def getAllCountries(place: Option[String]): Route = {
    val allVillages = AllPlaces.allPlaces
      .flatMap(country =>
        country._2.flatMap(city =>
          city._2.map { village =>
            val villageCity = if (village.toString == city._1.toString) None else Some(village.id)
            MunicipalityInfo(
              villageCity,
              village.toString.replace("_", " "),
              city._1.id,
              city._1.toString.replace("_", " "),
              country._1.id,
              country._1.toString
            )
          }
        )
      )
      .toList
      .sortBy(_.villageName)
    if (place.isEmpty)
      complete(
        StatusCodes.OK -> allVillages
          .filter(d => d.villageId.isEmpty)
          .sortBy(f => (f.countryId, f.villageName))
      )
    else if (Countries.isValid(place.getOrElse("")))
      complete(
        StatusCodes.OK -> allVillages
          .filter(_.countryName == place.getOrElse(""))
          .sortBy(_.countryName)
      )
    else
      complete(
        StatusCodes.OK -> allVillages
          .filter(
            _.villageName.toLowerCase().startsWith(place.getOrElse("").toLowerCase)
          )
          .sortBy(_.villageName)
      )
  }

  def deleteProperty(companyId: String, propertyId: String): Route =
    onResponse[DeletedPropertyResponses](mongo.deleteProperty(companyId, propertyId)) {
      case PropertyDeleted  => complete(StatusCodes.NoContent -> "")
      case PropertyNotFound => complete(notFound("company"))
      case MongoError       => complete(serviceUnavailable)
    }

  def updateProperty(
      companyId: String,
      userId: String,
      propertyId: String,
      updateProperty: UpdateProperty
  ): Route =
    onResponse[UpdatedPropertyResponses](
      mongo.updateProperty(companyId, propertyId, updateProperty)
    ) {
      case PropertyDataUpdated(property: Property) =>
        if (updateProperty.completed.isDefined)
          mongo.getUser(userId) map {
            case UserInfo(user: UserData) =>
              sendEmail(
                user.email,
                "Welcome to Travelonio",
                emailPropertyRegistrationEmail(
                  services.baseUrl,
                  property.startBookingDate,
                  user.name + ' ' + user.lastname,
                  user.language
                ),
                services.request,
                services.sendGrid
              )
              complete(StatusCodes.OK -> property.toApiModel)
            case UserNotFound => complete(notFound("user"))
            case MongoError   => complete(serviceUnavailable)
          }
        complete(StatusCodes.OK -> property.toApiModel)
      case RecordNotFound => complete(notFound("company"))
      case MongoError     => complete(serviceUnavailable)
    }
  def reorderImageIds(companyId: String, propertyId: String, imageId: String): Route =
    onResponse[UpdatedPropertyResponses](
      mongo.reorderImageIds(companyId, propertyId, imageId)
    ) {
      case PropertyDataUpdated(property: Property) =>
        complete(StatusCodes.OK -> property.toApiModel)
      case RecordNotFound => complete(notFound("company"))
      case MongoError     => complete(serviceUnavailable)
    }

}
object PropertyController {
  def apply(mongo: MongoCollections)(implicit services: Services) = new PropertyController(mongo)
}
