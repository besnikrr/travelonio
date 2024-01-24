package backend.services

import akka.actor.typed.scaladsl.AskPattern.Askable
import akka.actor.typed.{ActorRef, ActorSystem, Scheduler}
import akka.http.scaladsl.model.headers.Authorization
import akka.http.scaladsl.server.Directive1
import akka.http.scaladsl.server.Directives.{complete, provide}
import akka.http.scaladsl.server.directives.HeaderDirectives.optionalHeaderValueByName
import akka.util.Timeout
import backend.actors.ManagerActor._
import backend.api.Session
import backend.mongo.{MongoCollections}
import backend.utils.Utils.{awaitBlocking, unauthorizedResponse}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

import scala.util.matching.Regex

trait Authentication {
  implicit val timeout: Timeout
  implicit val system: ActorSystem[ManagerCommands]
  implicit val scheduler: Scheduler
  val mongo: MongoCollections

  private val bearerPattern: Regex = """(?:[Bb]earer )?(\S*)""".r

  def authenticate(tokenFromUrl: Option[String] = None): Directive1[Session] =
    optionalHeaderValueByName(Authorization.name).flatMap {
      case Some(bearerPattern(token)) => checkToken(token)
      case Some(_)                    => complete(unauthorizedResponse)
      case None =>
        tokenFromUrl match { // This is only useful when starting a WebSocket, since the token is in the URL then!
          case Some(token) => checkToken(token)
          case None        => complete(unauthorizedResponse)
        }
    }

  private def checkToken(token: String): Directive1[Session] =
    awaitBlocking(system ? { replyTo: ActorRef[ManagerResponses] =>
      RequestUserSession(token, replyTo)
    }) match {
      case s: UserSession =>
        provide(
          Session(token, s.user.userId, s.user.companyId, s.user.email, s.user.role)
        )
      case TokenNotFound => complete(unauthorizedResponse)
    }

}
