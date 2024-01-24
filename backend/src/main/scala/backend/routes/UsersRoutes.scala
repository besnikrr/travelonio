package backend.routes

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import backend.api._
import backend.controllers.UsersController
import backend.services.Services
import backend.utils.Permissions.{DeleteUsers, InsertUsers, ReadAllUsersData, ReadUsers, UpdateUsers}
import backend.utils.Roles
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

class UsersRoutes(controller: UsersController)(implicit services: Services) {

  import services._

  def routes: Route =
    concat(
      path("register") { // api/users/register
        post(entity(as[RegisterUser]) { userData =>
          validEmail(userData.email)(controller.register(userData))
        })
      },
      path("login") { // api/users/login
        post {
          entity(as[LoginUser]) { userData =>
            validEmail(userData.email)(controller.login(userData))
          }
        }
      },
      path("activate" / Segment / Segment / Segment) { (companyId, userId, activationToken) =>
        get {
          validMongoId(companyId)(
            validMongoId(userId)(
              get(controller.activateAccount(companyId, userId, activationToken))
            )
          )
        }
      },
      path("forgotPassword") {
        post {
          entity(as[ForgotPassword]) { userData =>
            controller.forgotPassword(userData)
          }
        }
      },
      path("resetPassword") {
        post {
          entity(as[ResetPassword]) { userData =>
            controller.resetPassword(userData)
          }
        }
      },
      authenticate() { session =>
        concat(
          path("superAdmin") { // api/users/superAdmin/
            checkPermissions(session, Set(ReadAllUsersData))(
              get {
                controller.getAllUsersDataForSuperAdmin
              }
            )
          },
          path("session") { // api/users/session
            get(controller.getUserSession(session.token))
          },
          path("logout") { // api/users/logout
            post(controller.logout(session.token))
          },
          pathEnd {
            concat(
              post { // api/users
                checkPermissions(session, Set(InsertUsers))(
                  entity(as[InsertUser]) { user =>
                    validEnum(user.role, Roles)(
                      eligibility(session, session.companyId, Some(user.role))(
                        controller.insertUser(user, session.companyId)
                      )
                    )
                  }
                )
              },
              get { // api/users
                parameters("role".optional) { roleFilter =>
                  validEnum(roleFilter, Roles)(
                    checkPermissions(session, Set(ReadUsers))(
                      controller.getUsers(session.companyId, roleFilter)
                    )
                  )
                }
              }
            )
          },
          pathPrefix("self") {
            patch { // api/users/self
              checkPermissions(session, Set(UpdateUsers))(
                entity(as[UpdateYourself]) { updateUser =>
                  controller.updateYourself(session.userId, session.companyId, updateUser)
                }
              )
            }
          },
          pathPrefix(Segment) {
            userIdToUpdate =>
              validMongoId(userIdToUpdate)(
                concat(
                  patch { // api/users/{userId}
                    checkPermissions(session, Set(UpdateUsers))(
                      entity(as[UpdateOtherUser]) { updateUser =>
                        validEnum(
                          updateUser.setRole,
                          Roles
                        )(
                          eligibility(session, session.companyId, updateUser.setRole)(
                            controller
                              .updateOtherUser(userIdToUpdate, session.companyId, updateUser)
                          )
                        )
                      }
                    )
                  },
                  delete { // api/users/{userId}
                    checkPermissions(session, Set(DeleteUsers))(
                      controller.deleteUser(userIdToUpdate, session.companyId, session.token)
                    )
                  }
                )
              )
          }
        )
      }
    )
}

object UsersRoutes {
  def apply(usersController: UsersController)(implicit services: Services): Route =
    new UsersRoutes(usersController).routes
}
