package backend.mongo

import scala.concurrent.Future
import backend.Server.ec
import backend.utils.Utils.promised
import backend.utils.{ClassLogging, Roles}
import org.mindrot.jbcrypt.BCrypt
import org.mongodb.scala.bson.{BsonDocument, ObjectId}
import org.mongodb.scala.model.Updates.set
import org.mongodb.scala.{MongoBulkWriteException, MongoWriteException}

case class DatabaseSeeder() extends ClassLogging {
  import DatabaseSeeder._

  def createInitialData(mongo: MongoCollections): Future[InitialData] =
    promised[InitialData] { promise =>
      val passwordHash = BCrypt.hashpw("TravelOniO123!", BCrypt.gensalt());

      val newUser = User(
        "root",
        new ObjectId(),
        "rafetbojaj@gmail.com",
        "Rafet",
        "Bojaj",
        passwordHash,
        "noPhoneNumber",
        Roles.SuperAdmin.toString,
        1,
        List.empty
      )

      mongo.users
        .insertOne(newUser)
        .subscribe(
          _ => continueWithUserData(mongo).map(promise.success),
          onError =>
            onError match {
              case _: MongoWriteException =>
                log.info(s"Super Admin: `${newUser.name}` already exists")
                promise.success(DuplicateEntry)
              case error =>
                log.error("Mongo error occurred: ", error)
                promise.success(MongoError)
            }
        )
    }
  private def continueWithUserData(mongo: MongoCollections): Future[InitialData] =
    promised[InitialData] { promise =>
      mongo.beds
        .countDocuments()
        .subscribe(onNext =>
          if (onNext == 0)
            mongo.beds
              .insertMany(bedToInsert)
              .subscribe(
                _ => promise.success(InitialDataInputted),
                onError =>
                  onError match {
                    case _: MongoBulkWriteException => promise.success(DuplicateEntry)
                    case error =>
                      (
                        log.error("Mongo error occurred: ", error.getMessage),
                        promise.success(MongoError)
                      )
                  }
              )
          else promise.success(DuplicateEntry)
        )

    }
}

object DatabaseSeeder {

  private def bedToInsert: List[Bed] =
    List(
      Bed(new ObjectId(), "Single bed", 1, 0, 0, "90x200", "single-bed"),
      Bed(new ObjectId(), "Double bed ", 2, 0, 0, "140x200", "double-bed"),
      Bed(new ObjectId(), "Large double bed (King Size)", 2, 0, 0, "160x200", "king-bed"),
      Bed(
        new ObjectId(),
        "Extra-large double bed (Super King Size)",
        2,
        0,
        0,
        "180x200",
        "extra-large-bed"
      ),
      Bed(new ObjectId(), "Bunk bed", 2, 0, 0, "120x200", "bunk-bed"),
      Bed(new ObjectId(), "Sofa bed", 1, 0, 0, "200x200", "sofa-bed"),
      Bed(new ObjectId(), "Baby bed", 1, 0, 0, "70x140", "baby-bed")
    )

}
