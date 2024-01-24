package backend

import java.util.concurrent.CountDownLatch
import scala.concurrent.duration.DurationInt
import scala.concurrent.{Await, ExecutionContext}
import akka.actor.typed.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.server.Directives._
import akka.util.Timeout
import backend.actors.ManagerActor
import backend.actors.ManagerActor.ManagerCommands
import backend.controllers._
import backend.mongo.{
  DatabaseSeeder, DuplicateEntry, InitialDataInputted, MongoCollections, MongoConnection, MongoError
}
import backend.routes._
import backend.services.Services
import backend.utils.ClassLogging
import backend.utils.Utils.{logResponseTime, waitForTermination}
import ch.megard.akka.http.cors.scaladsl.CorsDirectives.cors
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings
import com.sendgrid.{Request, SendGrid}
import com.typesafe.config.{Config, ConfigFactory}
object Server extends App with ClassLogging {
  lazy val isRunning              = new CountDownLatch(1)
  lazy val isFinished             = new CountDownLatch(1)
  val conf                        = ConfigFactory.load()
  implicit val baseUrl: String    = "https://travelonio.com"
  implicit val sendGrid: SendGrid = new SendGrid(conf.getString("api-key"))
  implicit val request: Request   = new Request()

  implicit val timeout: Timeout                           = Timeout(10.seconds)
  implicit val managerActor: ActorSystem[ManagerCommands] = ActorSystem(ManagerActor(), "reze")
  implicit val ec: ExecutionContext                       = managerActor.executionContext

  MongoConnection(conf, ec) { mongo =>
    new DatabaseSeeder().createInitialData(mongo) map {
      case InitialDataInputted => log.info("Initial data were created"); startServer(mongo)
      case MongoError | DuplicateEntry =>
        log.warn("Initial data could not be created"); startServer(mongo)
    }
  }

  private def startServer(collections: MongoCollections): Unit = {
    implicit val services: Services = Services(collections)

    val routes = concat(
      pathPrefix("doc" / "backend")(getFromDirectory("documentation/backend")),
      logResponseTime {
        pathPrefix("api") {
          concat(
            pathPrefix("users")(UsersRoutes(UsersController(collections))),
            pathPrefix("companies")(CompaniesRoutes(CompaniesController(collections))),
            pathPrefix("properties")(PropertyRoutes(PropertyController(collections))),
            pathPrefix("rooms")(RoomsRoutes(RoomsController(collections))),
            pathPrefix("beds")(BedsRoutes(BedsController(collections))),
            pathPrefix("attachments")(AttachmentsRoutes(AttachmentsController(collections)))
          )
        }
      }
    )

    val interface = conf.getString("interface")
    val port      = conf.getInt("port")
    val settings =
      CorsSettings.defaultSettings.withAllowedMethods(Seq(GET, POST, PATCH, DELETE, PUT))
    val bindingFuture = Http().newServerAt(interface, port).bind(cors(settings)(routes))
    log.info(s"Reze service started on http://$interface:$port.")
    Thread.sleep(200) // Allow logging to flush to console
    println("Press RETURN to stop service.\n")
    isRunning.countDown()
    val reason = waitForTermination(isFinished)
    log.info(s"Stopping Reze service after $reason.")
    Await.result(bindingFuture.flatMap(_.unbind())(ec), 10.seconds)
  }
}
