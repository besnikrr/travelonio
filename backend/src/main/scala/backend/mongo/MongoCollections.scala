package backend.mongo

import scala.concurrent.ExecutionContext

import backend.mongo.collection.CollectionNames
import backend.mongo.persistence.{AttachmentsPersistence, BedsPersistence, CompaniesPersistence, PropertyPersistence, RoomsPersistence, UsersPersistence}
import org.mongodb.scala.model.{FindOneAndUpdateOptions, ReturnDocument, UpdateOptions}
import org.mongodb.scala.{MongoCollection, MongoDatabase}

class MongoCollections(mongoDatabase: MongoDatabase)(implicit executionContext: ExecutionContext)
    extends UsersPersistence
    with CompaniesPersistence
    with PropertyPersistence
    with RoomsPersistence
    with BedsPersistence
    with AttachmentsPersistence
     {
  override val users: MongoCollection[User] = mongoDatabase.getCollection(CollectionNames.users)
  override val companies: MongoCollection[Company] =
    mongoDatabase.getCollection(CollectionNames.companies)
  override val attachments: MongoCollection[Attachment] =
    mongoDatabase.getCollection(CollectionNames.attachments)
  override val rooms: MongoCollection[Room] =
    mongoDatabase.getCollection(CollectionNames.rooms)
  override val beds: MongoCollection[Bed] =
    mongoDatabase.getCollection(CollectionNames.beds)
  override val properties: MongoCollection[Property] =
    mongoDatabase.getCollection(CollectionNames.properties)
  override val bookings: MongoCollection[Booking] =
    mongoDatabase.getCollection(CollectionNames.bookings)

  implicit override val ec: ExecutionContext = executionContext

  val findOneAndUpdateOption: FindOneAndUpdateOptions =
    FindOneAndUpdateOptions().returnDocument(ReturnDocument.AFTER)
   val updateOptions: UpdateOptions =
         UpdateOptions()
}
