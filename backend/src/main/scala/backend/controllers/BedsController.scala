package backend.controllers

import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.Route
import backend.Server.{ec, timeout}
import backend.api.{BedTypeInsertedResponse, InsertBed, UpdateBed}
import backend.mongo._
import backend.services.Services
import backend.utils.Utils.{duplicate, notFound, onResponse, serviceUnavailable}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class BedsController(mongo: MongoCollections)(implicit services: Services) {

  def insertBed(bed: InsertBed): Route =
    onResponse[InsertBedResponses](mongo.insertBed(bed)) {
      case BedTypeCreated(bed) =>
        complete(StatusCodes.Created -> BedTypeInsertedResponse(bed.toApiModel))
      case DuplicateEntry => complete(duplicate("bed"))
      case MongoError     => complete(serviceUnavailable)
    }
  def getBedTypes: Route =
    onResponse[ReadBedsDatabaseResponses](mongo.getBedTypes) {
      case Beds(beds) => complete(StatusCodes.OK -> beds.map(_.toApiModel))
      case MongoError => complete(serviceUnavailable)
    }

  def getBedType(bedTypeId: String): Route =
    onResponse[ReadBedDatabaseResponses](mongo.getBedType(bedTypeId)) {
      case BedInfo(b: Bed) => complete(StatusCodes.OK -> b.toApiModel)
      case BedNotFound     => complete(notFound("bedType"))
      case MongoError      => complete(serviceUnavailable)
    }

  def deleteBedType(bedTypeId: String): Route =
    onResponse[DeletedBedResponses](mongo.deleteBedType(bedTypeId)) {
      case BedDeleted  => complete(StatusCodes.OK)
      case BedNotFound => complete(notFound("bedType"))
      case MongoError  => complete(serviceUnavailable)
    }

  def updateBedType(bedTypeId: String, updateBed: UpdateBed): Route =
    onResponse[UpdatedBedResponses](mongo.updateBedType(bedTypeId, updateBed)) {
      case BedDataUpdated(bed: Bed) =>
        complete(StatusCodes.OK -> bed.toApiModel)
      case MongoError => complete(serviceUnavailable)
    }
}
object BedsController {
  def apply(mongo: MongoCollections)(implicit services: Services) = new BedsController(mongo)
}
