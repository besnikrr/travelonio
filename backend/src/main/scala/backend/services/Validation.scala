package backend.services

import akka.http.scaladsl.server.Directives.complete
import akka.http.scaladsl.server.{Directive, Directive0}
import backend.api.Session
import backend.utils.Roles.{PropertyManager, PropertyOwner}
import backend.utils.Utils.{forbidden, noRoles, unprocessableEntity}
import backend.utils.{Enums, Roles}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import org.bson.types.ObjectId

trait Validation {

  def eligibility(session: Session, companyId: String, setRole: Option[String]): Directive0 = {
    //FIXME - Other roles can update Admin role
    val initiatorRole           = Roles.withName(session.role)
    val initiatorCompanyId      = session.companyId
    val newAdminCreationRequest = setRole.contains(Roles.PropertyOwner.toString)

    initiatorRole match {
      case PropertyOwner =>
        if (initiatorCompanyId != companyId && newAdminCreationRequest)
          complete(unprocessableEntity("OnlyCompanyUsersCanHaveAdminRights"))
        else Directive.Empty
      case PropertyManager =>
        if (initiatorCompanyId != companyId)
          complete(forbidden("OnlyAdminUsersHaveAccessToOtherCompanies"))
        else if (newAdminCreationRequest) complete(forbidden("OnlyAdminUsersCanSetAdminRoles"))
        else Directive.Empty
      case _ => complete(noRoles)
    }
  }

  def validEnum(value: String, enum: Enums): Directive0 =
    if (enum.isValid(value)) Directive.Empty
    else complete(unprocessableEntity(s"WrongValueForType:${enum.toString()}"))

  def validEnum(maybeValue: Option[String], enum: Enums): Directive0 =
    maybeValue match {
      case Some(value) => validEnum(value, enum)
      case None        => Directive.Empty
    }

  def validMongoId(id: String): Directive0 =
    if (ObjectId.isValid(id)) Directive.Empty
    else complete(unprocessableEntity("NoValidMongoIdProvided"))

  def validMongoIds(ids: String*): Directive0 =
    if (ids.forall(id => ObjectId.isValid(id))) Directive.Empty
    else complete(unprocessableEntity("NoValidMongoIdProvided"))

  val emailRegex = """^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$""".r
  def validEmail(email: String): Directive0 = email match{
    case null                                           => complete(unprocessableEntity("EmailIsNotValid"))
    case e if e.trim.isEmpty                            => complete(unprocessableEntity("EmailIsNotValid"))
    case e if emailRegex.findFirstMatchIn(e).isDefined  => Directive.Empty
    case _                                              => complete(unprocessableEntity("EmailIsNotValid"))
  }
}
