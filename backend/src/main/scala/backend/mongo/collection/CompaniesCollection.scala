package backend.mongo.collection

import com.mongodb.MongoCommandException
import org.mongodb.scala.MongoDatabase
import org.mongodb.scala.model.{IndexModel, IndexOptions, Indexes}

import backend.utils.ClassLogging

object CompaniesCollection extends ClassLogging {
  val collectionName: String = CollectionNames.companies
  def validate(mongoDatabase: MongoDatabase): Unit =
    mongoDatabase
      .createCollection(collectionName)
      .subscribe(
        _ => log.info(s"Collection $collectionName created."),
        onError =>
          onError match {
            case e: MongoCommandException if e.getErrorCodeName == "NamespaceExists" =>
              log.debug(s"$collectionName collection already exists") // do nothing
            case onError =>
              log.error(
                s"Db error: ${onError.getMessage}, on operation: Create $collectionName collection"
              )
              System.exit(0) // restart service
          },
        () =>
          mongoDatabase // create indexes after collection creation
            .getCollection(collectionName)
            .createIndexes(
              Seq(
                IndexModel(
                  Indexes.ascending("name"),
                  IndexOptions().background(false).unique(true)
                )
              )
            )
            .subscribe(
              onNext => log.info(s"Db operation completed: Create $collectionName indexes"),
              onError => {
                log.error(
                  s"Db error: ${onError.getMessage}, on operation: Create $collectionName indexes"
                )
                System.exit(0) // restart service
              }
            )
      )
}
