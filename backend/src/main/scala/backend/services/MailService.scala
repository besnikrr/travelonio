package backend.services

import backend.utils.ClassLogging
import org.apache.commons.mail._

import scala.concurrent.ExecutionContext

case class Session(accountId: String)

case class Mail(
    to: Seq[String],
    cc: Seq[String] = Seq.empty,
    bcc: Seq[String] = Seq.empty,
    subject: String,
    message: String,
    richMessage: Option[String] = None,
    attachments: Seq[(java.io.File)] = Seq.empty
)

object MailService extends ClassLogging {

  sealed abstract class MailType
  case object Plain     extends MailType
  case object Rich      extends MailType
  case object MultiPart extends MailType

  def send(mail: Mail)(implicit ec: ExecutionContext): Unit = {
    val emailName = "REZE"
    val email     = "justfortestingsoftware@gmail.com"
    val password  = "durimi328"

    val format =
      if (mail.attachments.nonEmpty) MultiPart
      else if (mail.richMessage.isDefined) Rich
      else Plain

    val commonsMail: Email = format match {
      case Plain => new SimpleEmail().setMsg(mail.message)
      case Rich  => new HtmlEmail().setHtmlMsg(mail.richMessage.get).setTextMsg(mail.message)
      case MultiPart =>
        val multipartEmail = new MultiPartEmail()
        mail.attachments.foreach { file =>
          val attachment = new EmailAttachment()
          attachment.setPath(file.getAbsolutePath)
          attachment.setDisposition(EmailAttachment.ATTACHMENT)
          attachment.setName(file.getName)
          multipartEmail.attach(attachment)
        }
        multipartEmail.setMsg(mail.message)
    }

    // TODO Set authentication from your configuration, sys properties or w/e

    // Can't add these via fluent API because it produces exceptions
    mail.to.foreach(commonsMail.addTo)
    mail.cc.foreach(commonsMail.addCc)
    mail.bcc.foreach(commonsMail.addBcc)

    // gmail config
    commonsMail.setHostName("smtp.gmail.com")
    commonsMail.setAuthentication(email, password)
    commonsMail.setSSLOnConnect(true)
    commonsMail.setSmtpPort(465)
    try commonsMail.setFrom(email, emailName).setSubject(mail.subject).send()
    catch {
      case e: IllegalStateException =>
        log.error("Error IllegalStateException: Email was not sent! \n" + e)
      case e: EmailException => log.error("Error EmailException: Email was not sent! \n" + e)
    }
  }
}
