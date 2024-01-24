package backend.mongo.persistence

import java.util.UUID
import scala.concurrent.duration.DurationInt
import scala.concurrent.{Await, ExecutionContext, Future}
import backend.api.{InsertOtherUser, InsertUser, ResetPassword, UpdateOtherUser, UpdateYourself}
import backend.mongo._
import backend.utils.Utils.promised
import backend.utils.{ClassLogging, Languages, Roles, TokenGenerator}
import org.mindrot.jbcrypt.BCrypt
import org.mongodb.scala.bson.conversions.Bson
import org.mongodb.scala.bson.{BsonDocument, ObjectId}
import org.mongodb.scala.model.FindOneAndUpdateOptions
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.{MongoCollection, MongoWriteException}

trait UsersPersistence extends ClassLogging {
  val properties: MongoCollection[Property]
  val rooms: MongoCollection[Room]
  val users: MongoCollection[User]
  val findOneAndUpdateOption: FindOneAndUpdateOptions
  implicit val ec: ExecutionContext

  def getUsers(companyId: String, rolesFilter: Option[String]): Future[ReadUsersDatabaseResponses] =
    promised[ReadUsersDatabaseResponses] { promise =>
      users
        .find(BsonDocument("companyId" -> companyId))
        .collect()
        .subscribe(
          onNext =>
            promise.success(
              CompanyUsers(
                rolesFilter match {
                  case None         => onNext.map(_.toApiModel).toList
                  case Some(filter) => onNext.map(_.toApiModel).filter(_.role == filter).toList
                }
              )
            ),
          onError =>
            (
              log.error(s"Failed to get users for companyId:$companyId -> ", onError.getMessage),
              promise.success(MongoError)
            )
        )
    }

  def getUser(userId: String): Future[ReadUserDatabaseResponses] =
    promised[ReadUserDatabaseResponses] { promise =>
      users.find(BsonDocument("_id" -> new ObjectId(userId))).headOption().map {
        case Some(user) => promise.success(UserInfo(user.toApiModel))
        case None       => promise.success(UserNotFound)
      }
    }

  def getUserByEmail(email: String): Future[ReadUserDatabaseResponses] =
    promised[ReadUserDatabaseResponses] { promise =>
      users.find(BsonDocument("email" -> email.toLowerCase)).headOption().map {
        case Some(user) => promise.success(UserInfo(user.toApiModel))
        case None       => promise.success(UserNotFound)
      }
    }

  def getUserByCompanyId(companyId: String): Future[ReadUserDatabaseResponses] =
    promised[ReadUserDatabaseResponses] { promise =>
      users.find(BsonDocument("companyId" -> companyId)).headOption().map {
        case Some(user) => promise.success(UserInfo(user.toApiModel))
        case None => promise.success(UserNotFound)
      }
    }

  def insertUser(
      user: InsertUser,
      companyId: String,
      emailConfirmationToken: String
  ): Future[InsertUserDatabaseResponses] =
    promised[InsertUserDatabaseResponses] { promise =>
      val passwordHash = BCrypt.hashpw(user.password, BCrypt.gensalt());
      val newUser = User(
        companyId,
        new ObjectId(),
        user.email.toLowerCase,
        user.name,
        user.lastname,
        passwordHash,
        user.phone,
        user.role,
        1,
        List.empty,
        loggedInOneTime = false,
        Some(emailConfirmationToken)
      )
      users
        .insertOne(newUser)
        .subscribe(
          onNext =>
            (
              log.debug(s"inserted a new user: ${onNext.toString}"),
              promise.success(UserInfo(newUser.toApiModel))
            ),
          onError =>
            onError match {
              case _: MongoWriteException =>
                log.warn(s"Email: ${user.email} already exists")
                promise.success(DuplicateEntry)
              case error =>
                log.error("Mongo error occurred: ", error)
                promise.success(MongoError)
            }
        )
    }

  def insertOtherUser(
      user: InsertOtherUser,
      companyId: String,
      accountActivationToken: String
  ): Future[InsertUserDatabaseResponses] =
    promised[InsertUserDatabaseResponses] { promise =>
      val newUser = User(
        companyId,
        new ObjectId(),
        "not defined",
        user.email.toLowerCase,
        "not defined",
        "not defined",
        UUID.randomUUID().toString,
        user.role,
        1,
        List.empty,
        loggedInOneTime = false,
        None,
        Some(accountActivationToken)
      )
      users
        .insertOne(newUser)
        .subscribe(
          onNext =>
            (
              log.debug(s"inserted a new user: ${onNext.toString}"),
              promise.success(UserInfo(newUser.toApiModel))
            ),
          onError =>
            onError match {
              case _: MongoWriteException =>
                log.warn(s"Username: xyz already exists")
                promise.success(DuplicateEntry)
              case error =>
                log.error("Mongo error occurred: ", error)
                promise.success(MongoError)
            }
        )
    }

  def activateAccount(companyId: String, userId: String, tokenToActivate: String)(implicit
      ec: ExecutionContext
  ): Future[ActivateAccountResponses] =
    promised[ActivateAccountResponses] { promise =>
      users
        .findOneAndUpdate(
          BsonDocument(
            "_id"                    -> new ObjectId(userId),
            "companyId"              -> companyId,
            "emailConfirmationToken" -> Some(tokenToActivate)
          ),
          List(set("emailConfirmationToken", null)),
          findOneAndUpdateOption
        )
        .subscribe(
          onNext => promise.success(AccountActivated(onNext.toApiModel)),
          onError => {
            log.error(onError.getMessage)
            promise.success(MongoError)
          }
        )
    }

  def deleteUser(userId: String, companyId: String): Future[DeletedUserResponses] =
    promised[DeletedUserResponses] { promise =>
      users
        .findOneAndDelete(BsonDocument("_id" -> new ObjectId(userId), "companyId" -> companyId))
        .headOption()
        .map {
          case Some(_) => promise.success(UserDeleted)
          case None    => promise.success(DeletedUserUserNotFound)
        }
    }

  def updateYourself(
      userId: String,
      companyId: String,
      userDataToUpdate: UpdateYourself
  ): Future[UpdateUserResponses] =
    promised[UpdateUserResponses] { promise =>
      users
        .findOneAndUpdate(
          BsonDocument("_id" -> new ObjectId(userId), "companyId" -> companyId),
          setUpdateValues(userDataToUpdate),
          findOneAndUpdateOption
        )
        .subscribe(
          onNext => promise.success(DataUpdated(onNext.toApiModel)),
          onError => {
            log.error(onError.getMessage);
            promise.success(MongoError)
          }
        )
    }

  def updateOtherUser(
      userId: String,
      companyId: String,
      userDataToUpdate: UpdateOtherUser
  ): Future[UpdateUserResponses] =
    promised[UpdateUserResponses] { promise =>
      users
        .findOneAndUpdate(
          BsonDocument("_id" -> new ObjectId(userId), "companyId" -> companyId),
          List(userDataToUpdate.setRole.map(set("role", _))).flatten,
          findOneAndUpdateOption
        )
        .subscribe(
          onNext => promise.success(DataUpdated(onNext.toApiModel)),
          onError => {
            log.error(onError.getMessage);
            promise.success(MongoError)
          }
        )
    }

  def forgotPassword(email: String)(implicit
      ec: ExecutionContext
  ): Future[ForgotPasswordResponses] =
    promised[ForgotPasswordResponses] { promise =>
      val token = TokenGenerator().generateSHAToken()
      users
        .findOneAndUpdate(
          BsonDocument(
            "email" -> email.toLowerCase
          ),
          set("resetPasswordToken", token),
          findOneAndUpdateOption
        )
        .subscribe(
          user => promise.success(NewPasswordChance(user._id.toString, email, token)),
          onError => {
            log.error(onError.getMessage)
            promise.success(MongoError)
          }
        )
    }

  def resetPassword(userData: ResetPassword)(implicit
      ec: ExecutionContext
  ): Future[ResetPasswordResponses] =
    promised[ResetPasswordResponses] { promise =>
      val token = TokenGenerator().generateSHAToken()
      val passwordHash = BCrypt.hashpw(userData.newPassword, BCrypt.gensalt());
      users
        .findOneAndUpdate(
          BsonDocument(
            "_id"                -> new ObjectId(userData.userId),
            "resetPasswordToken" -> userData.resetPasswordToken
          ),
          combine(set("password", passwordHash), set("resetPasswordToken", token)),
          findOneAndUpdateOption
        )
        .subscribe(
          user => promise.success(PasswordUpdated(user.toApiModel)),
          onError => {
            log.error(onError.getMessage)
            promise.success(MongoError)
          }
        )
    }

  def login(
      email: String,
      password: String
  ): Future[PropertyUserLoginResponses] =
    promised[PropertyUserLoginResponses] { promise =>
      users.find(BsonDocument("email" -> email.toLowerCase)).headOption().map {
        case Some(user) =>
          val passwordIsValid = BCrypt.checkpw(password, user.password)
          user match {
            case _: User if !passwordIsValid => promise.success(PasswordIncorrect)
//            case user: User if user.loggedInOneTime && user.emailConfirmationToken.isDefined =>
//              promise.success(EmailNotConfirmed)
            case user: User =>
              users
                .findOneAndUpdate(
                  BsonDocument("_id" -> user._id),
                  List(set("loggedInOneTime", true)),
                  findOneAndUpdateOption
                )
                .subscribe(
                  user => log.debug("loggedInOneTime updated to true"),
                  onError => log.error("error updating loggedInOneTime")
                )
              val sessionToken = TokenGenerator().generateSHAToken()
              promise.success(UserAndToken(user.toApiModel, sessionToken))
            case _ => promise.success(PasswordIncorrect)
          }
        case None => promise.success(PasswordIncorrect)
      }
    }

  def getAllUsersDataForSuperAdmin: Future[ReadSuperAdminUsersDatabaseResponses] =
    promised[ReadSuperAdminUsersDatabaseResponses] { promise =>
      users
        .find()
        .collect()
        .subscribe(
          onNext => {
            val propertyData = onNext.flatMap(user =>
              Await.result(
                properties.find(BsonDocument("companyId"->user.companyId)).map {
                  property =>
                    val roomsData =
                      Await
                        .result(
                          rooms
                            .find(
                              BsonDocument(
                                "propertyId" -> property._id.toString
                              )
                            )
                            .collect()
                            .headOption(),
                          2.seconds
                        )
                        .getOrElse(List.empty)
                        .toList

                      backend.mongo.PropertiesForSuperAdmin(
                        user._id.toString,
                        property._id.toString,
                        property.name,
                        property.propertyType,
                        property.createdAt,
                        property.updatedAt,
                        property.location,
                        property.ratePlan,
                        property.paymentOptions,
                        roomsData.map(_.toApiModel)
                      )

                }.collect().headOption(),
                1.minute
              )
            ).toList.flatten

            promise.success(
              UserAndPropertySummaryData(
                onNext
                  .map(user =>
                    backend.mongo.UsersAndPropertyData(
                      user.name,
                      user.email,
                      user.companyId,
                      propertyData.filter(prp=> user._id.toString == prp.userId)
                    )
                  )
                  .toList
              )
            )
          },
          onError =>
            (
              log.error(s"Failed to get users ", onError.getMessage),
              promise.success(MongoError)
            )
        )
    }

  private def setUpdateValues(userInfo: UpdateYourself): List[Bson] = userInfo match {
    case UpdateYourself(
          setName,
          setLastname,
          setPassword,
          language
        ) =>
      List(
        setName.map(set("name", _)),
        setLastname.map(set("lastname", _)),
        setPassword.map(set("password", _)),
        language.flatMap {
          case "AL" => Some(set("language", Languages.Albanian.id))
          case "EN" => Some(set("language", Languages.English.id))
          case _ => None
        },
      ).flatten
  }
}
