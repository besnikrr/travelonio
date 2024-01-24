package backend.services

import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.{Directive, Directive0}
import backend.api.Session
import backend.utils.RolesAndPermissions.rolePermissions
import backend.utils.Utils.noPermissions
import backend.utils.{Permissions, Roles}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._

trait Authorization {
  def checkPermissions(
      session: Session,
      allowedPermissions: Set[Permissions.Value]
  ): Directive0 =
    allowedPermissions.toList match {
      case Nil => Directive.Empty
      case permissions =>
        rolePermissions.get(Roles.withName(session.role)) match {
          case Some(userPermissions) if permissions.toSet.intersect(userPermissions).nonEmpty =>
            Directive.Empty
          case Some(_) => complete(noPermissions)
          case None    => complete(noPermissions)
        }
    }
}
