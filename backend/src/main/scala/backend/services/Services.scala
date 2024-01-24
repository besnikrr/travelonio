package backend.services

import akka.actor.typed.{ActorSystem, Scheduler}
import akka.util.Timeout
import backend.actors.ManagerActor.ManagerCommands
import backend.mongo.MongoCollections
import com.sendgrid.{Request, SendGrid}

class Services(collections: MongoCollections)(implicit
    timeOut: Timeout,
    context: ActorSystem[ManagerCommands],
    sg: SendGrid,
    sgr: Request,
    url: String
) extends Authentication
    with Authorization
    with Validation {

  implicit override val timeout: Timeout                     = timeOut
  implicit override val system: ActorSystem[ManagerCommands] = context
  implicit override val scheduler: Scheduler                 = system.scheduler
  override val mongo: MongoCollections                       = collections
  implicit val sendGrid: SendGrid                            = sg
  implicit val request: Request                              = sgr
  implicit val baseUrl: String                               = url
}

object Services {
  def apply(
      mongo: MongoCollections
  )(implicit
      timeout: Timeout,
      context: ActorSystem[ManagerCommands],
      sendGrid: SendGrid,
      request: Request,
      baseUrl: String
  ): Services =
    new Services(mongo)
}
