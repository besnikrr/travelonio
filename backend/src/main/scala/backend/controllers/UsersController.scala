package backend.controllers

import akka.actor.typed.ActorRef
import akka.actor.typed.scaladsl.AskPattern.Askable
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.Route
import backend.Server.{ec, managerActor, timeout}
import backend.actors.ManagerActor._
import backend.api._
import backend.mongo._
import backend.services.Services
import backend.utils.EmailTemplates.{
  emailConfirmationTemplate, emailResetPasswordTemplate, emailUserInviteTemplate
}
import backend.utils.Utils.{
  duplicate, forbidden, notFound, onResponse, sendEmail, serviceUnavailable
}
import backend.utils.{Roles, TokenGenerator}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

import java.util.UUID

class UsersController(mongo: MongoCollections)(implicit services: Services) {

  def register(newUser: RegisterUser): Route =
    onResponse[ReadUserDatabaseResponses](
      mongo.getUserByEmail(newUser.email.toLowerCase)
    ) {
      case UserInfo(_) => complete(duplicate("email"))
      case UserNotFound =>
        val companyName = newUser.email + UUID.randomUUID().toString
        onResponse[InsertCompanyResponses](mongo.insertCompany(companyName)) {
          case CompanyCreated(companyId, _) =>
            insertUser(
              InsertUser(
                newUser.email.toLowerCase,
                newUser.name,
                newUser.lastname,
                newUser.password,
                newUser.phone,
                Roles.PropertyOwner.toString
              ),
              companyId
            )
          case DuplicateEntry => complete(duplicate("company"))
          case MongoError     => complete(serviceUnavailable)
        }
      case MongoError => complete(serviceUnavailable)
    }

  def activateAccount(companyId: String, userId: String, tokenToActivate: String): Route =
    onResponse[ActivateAccountResponses](
      mongo.activateAccount(companyId, userId, tokenToActivate)
    ) {
      case AccountActivated(user) =>
        managerActor ! UpdateUserCommand(user)
        complete(StatusCodes.OK -> user)
      case MongoError => complete(serviceUnavailable)
    }

  def login(login: LoginUser): Route =
    onResponse[PropertyUserLoginResponses](
      mongo.login(login.email, login.password)
    ) {
      case UserAndToken(user, token) =>
        managerActor ! UserLoggedIn(user, token)
        complete(StatusCodes.OK -> LoggedInUser(token, user))
      case PasswordIncorrect => complete(forbidden("IncorrectCredentials"))
      case EmailNotConfirmed => complete(forbidden("EmailNotConfirmed"))
    }

  def logout(token: String): Route = {
    managerActor ! UserLoggedOut(token)
    complete(StatusCodes.OK -> "OK")
  }

  def getUserSession(token: String): Route = onResponse[ManagerResponses](services.system.ask {
    replyTo: ActorRef[ManagerResponses] => RequestUserSession(token, replyTo)
  }(services.timeout, services.scheduler)) {
    case s: UserSession => complete(StatusCodes.OK -> LoggedInUser(token, s.user))
    case TokenNotFound  => complete(StatusCodes.NotFound -> "Session invalid")
  }
  def getAllUsersDataForSuperAdmin: Route =
    onResponse[ReadSuperAdminUsersDatabaseResponses](mongo.getAllUsersDataForSuperAdmin) {
      case UserAndPropertySummaryData(usersAndPropertyData) =>
        complete(StatusCodes.OK -> usersAndPropertyData.map(_.toApiModel))
      case UserNotFound => complete(forbidden("UserNotFound"))
      case MongoError   => complete(serviceUnavailable)
    }

  def getUsers(companyId: String, rolesFilter: Option[String]): Route =
    onResponse[ReadUsersDatabaseResponses](mongo.getUsers(companyId, rolesFilter)) {
      case CompanyUsers(users) => complete(StatusCodes.OK -> users)
      case CompanyNotFound     => complete(notFound("company"))
      case MongoError          => complete(serviceUnavailable)
    }

  def getUser(userId: String): Route =
    onResponse[ReadUserDatabaseResponses](mongo.getUser(userId)) {
      case UserInfo(user: UserData) => complete(StatusCodes.OK -> user)
      case UserNotFound             => complete(notFound("user"))
      case MongoError               => complete(serviceUnavailable)
    }

  def insertUser(insertUser: InsertUser, companyId: String): Route = {

    val emailConfirmationToken = TokenGenerator().generateSHAToken()
    onResponse[InsertUserDatabaseResponses](
      mongo.insertUser(insertUser, companyId, emailConfirmationToken)
    ) {
      case UserInfo(user: UserData) =>
        val link =
          s"${services.baseUrl}/al/email-confirmation?link=${services.baseUrl}/api/users/activate/$companyId/${user.userId}/$emailConfirmationToken"

        sendEmail(
          user.email,
          "Activate your account",
          emailConfirmationTemplate(services.baseUrl, link, user.language),
          services.request,
          services.sendGrid
        )

        complete(StatusCodes.Created -> user)
      case DuplicateEntry => complete(duplicate("email"))
      case MongoError     => complete(serviceUnavailable)
    }
  }

  def insertOtherUser(insertOtherUser: InsertOtherUser, companyId: String): Route = {
    val accountActivationToken = TokenGenerator().generateSHAToken()
    onResponse[InsertUserDatabaseResponses](
      mongo.insertOtherUser(insertOtherUser, companyId, accountActivationToken)
    ) {
      case UserInfo(user: UserData) =>
        val link =
          s"${services.baseUrl}/al/users/activate?link=${services.baseUrl}/api/users/activate/$companyId/${user.userId}/$accountActivationToken"
        sendEmail(
          user.email,
          "You have been invited to join Reze",
          emailUserInviteTemplate(link),
          services.request,
          services.sendGrid
        )
        complete(StatusCodes.Created -> user)
      case DuplicateEntry => complete(duplicate("email"))
      case MongoError     => complete(serviceUnavailable)
    }
  }

  def deleteUser(userId: String, companyId: String, token: String): Route =
    onResponse[DeletedUserResponses](mongo.deleteUser(userId, companyId)) { // TODO Better message: T for delete
      case UserDeleted             => logout(token)
      case DeletedUserUserNotFound => complete(notFound("user"))
      case MongoError              => complete(serviceUnavailable)
    }

  def updateYourself(userId: String, companyId: String, userInfo: UpdateYourself): Route =
    onResponse[UpdateUserResponses](mongo.updateYourself(userId, companyId, userInfo)) {
      case DataUpdated(user: UserData) =>
        managerActor ! UpdateUserCommand(user)
        complete(StatusCodes.OK -> user)
      case RecordNotFound => complete(notFound("User"))
      case MongoError     => complete(serviceUnavailable)
    }

  def updateOtherUser(userId: String, companyId: String, userInfo: UpdateOtherUser): Route =
    onResponse[UpdateUserResponses](mongo.updateOtherUser(userId, companyId, userInfo)) {
      case DataUpdated(user: UserData) =>
        managerActor ! UpdateUserCommand(user)
        complete(StatusCodes.OK -> user)
      case RecordNotFound => complete(notFound("User"))
      case MongoError     => complete(serviceUnavailable)
    }

  def forgotPassword(userData: ForgotPassword): Route =
    onResponse[ForgotPasswordResponses](
      mongo.forgotPassword(userData.email)
    ) {
      case NewPasswordChance(userId, email, token) =>
        val link =
          s"${services.baseUrl}/al/change-password?userId=$userId&token=$token"
        sendEmail(
          email,
          "Reze - Reset your password",
          emailResetPasswordTemplate(services.baseUrl, link),
          services.request,
          services.sendGrid
        )
        complete(StatusCodes.OK -> "ok")
      case AccountNotActivated => complete(forbidden("AccountNotActivated"))
      case UserNotFound        => complete(notFound("Account"))
      case CompanyNotFound     => complete(notFound("Account"))
      case MongoError          => complete(serviceUnavailable)
    }

  def resetPassword(userData: ResetPassword): Route =
    onResponse[ResetPasswordResponses](
      mongo.resetPassword(userData)
    ) {
      case PasswordUpdated(user) =>
        onResponse[PropertyUserLoginResponses](
          mongo.login(user.email, userData.newPassword)
        ) {
          case UserAndToken(user, token) =>
            managerActor ! TerminateSessionsAndLogin(user, token)
            complete(StatusCodes.OK -> LoggedInUser(token, user))
          case EmailNotConfirmed => complete(forbidden("EmailNotConfirmed"))
          case PasswordIncorrect => complete(forbidden("IncorrectCredentials"))
        }
      case MongoError       => complete(serviceUnavailable)
      case UserNotFound     => complete(notFound("User"))
      case InvalidToken     => complete(forbidden("InvalidToken"))
      case PasswordNotValid => complete(forbidden("PasswordNotValid"))
    }
}

object UsersController {
  def apply(mongo: MongoCollections)(implicit services: Services): UsersController =
    new UsersController(mongo)
}
