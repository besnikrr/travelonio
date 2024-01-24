package backend.mongo

import backend.mongo.collection.{CompaniesCollection, UsersCollection}
import backend.utils.ClassLogging
import com.typesafe.config.Config
import org.bson.codecs.configuration.CodecRegistries.{fromProviders, fromRegistries}
import org.bson.codecs.configuration.CodecRegistry
import org.mongodb.scala.MongoClient
import org.mongodb.scala.MongoClient.DEFAULT_CODEC_REGISTRY
import org.mongodb.scala.bson.codecs.Macros._

import scala.concurrent.ExecutionContext

object MongoConnection extends ClassLogging {
  private lazy val codecRegistry: CodecRegistry =
    fromRegistries(fromProviders(classOf[RezeDB]), DEFAULT_CODEC_REGISTRY)

  def apply(conf: Config, ec: ExecutionContext)(callBack: MongoCollections => Unit): Unit = {

    val server   = conf.getString("mongo.servers")
    val port     = conf.getString("mongo.port")
    val database = conf.getString("mongo.database")
    val user     = conf.getString("mongo.user")
    val password = conf.getString("mongo.password")

    val mongoClient   = MongoClient(s"mongodb://$user:$password@$server:$port")
    val mongoDatabase = mongoClient.getDatabase(database).withCodecRegistry(codecRegistry)

    UsersCollection.validate(mongoDatabase)
    CompaniesCollection.validate(mongoDatabase)

    callBack(new MongoCollections(mongoDatabase)(ec))
  }
}
