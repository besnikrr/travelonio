package backend.actors

import akka.actor.typed.scaladsl.{ActorContext, Behaviors}
import akka.actor.typed.{ActorRef, Behavior, Scheduler}
import backend.actors.ManagerActor.ManagerCommands
import backend.api.UserData
import backend.utils.ClassLogging

object ManagerActor {
  def apply(): Behavior[ManagerCommands] =
    Behaviors.setup[ManagerCommands](new ManagerActor(_).entry())

  sealed trait ManagerCommands
  case class UserLoggedIn(user: UserData, token: String) extends ManagerCommands
  case class RequestUserSession(token: String, replyTo: ActorRef[ManagerResponses])
      extends ManagerCommands
  case class UserLoggedOut(token: String)                             extends ManagerCommands
  case class UpdateUserCommand(user: UserData)                        extends ManagerCommands
  case class TerminateSessionsAndLogin(user: UserData, token: String) extends ManagerCommands

  sealed trait ManagerResponses
  case class UserSession(user: UserData) extends ManagerResponses
  case object TokenNotFound              extends ManagerResponses

}

class ManagerActor(context: ActorContext[ManagerCommands]) extends ClassLogging {

  import ManagerActor._

  implicit val scheduler: Scheduler         = context.system.scheduler
  private var tokens: Map[String, UserData] = Map.empty

  def entry(): Behavior[ManagerCommands] =
    Behaviors.receiveMessage[ManagerCommands] {
      case UserLoggedIn(user: UserData, token: String) =>
        tokens = tokens + (token -> user)
        Behaviors.same

      case RequestUserSession(token, replyTo) =>
        tokens.get(token) match {
          case Some(user) => replyTo ! UserSession(user)
          case None       => replyTo ! TokenNotFound
        }
        Behaviors.same

      case UserLoggedOut(token) =>
        tokens = tokens - token
        Behaviors.same

      case UpdateUserCommand(newUser) =>
        tokens = tokens map {
          case (token, oldUser) =>
            if (oldUser.userId == newUser.userId) token -> newUser else token -> oldUser
        }
        Behaviors.same

      case TerminateSessionsAndLogin(user, token) =>
        tokens = tokens filter {
          case (_, userData) => userData.userId != user.userId
        }
        this.context.self ! UserLoggedIn(user, token)
        Behaviors.same
    }
}
