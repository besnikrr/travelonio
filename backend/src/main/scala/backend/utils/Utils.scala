package backend.utils

import java.util.Date

import akka.event.LoggingAdapter
import akka.http.scaladsl.model.HttpRequest
import akka.http.scaladsl.server.Directives.{complete, onComplete}
import akka.http.scaladsl.server.RouteResult.{Complete, Rejected}
import akka.http.scaladsl.server.directives.{DebuggingDirectives, LoggingMagnet}
import akka.http.scaladsl.server.{Directive0, Route, RouteResult}
import akka.util.Timeout
import backend.services.Services
import com.sendgrid.{Method, Request, SendGrid}
import com.sendgrid.helpers.mail.Mail
import com.sendgrid.helpers.mail.objects.{Content, Email}
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
import java.util.concurrent.atomic.AtomicBoolean
import java.util.concurrent.{CountDownLatch, TimeUnit}

import scala.concurrent._
import scala.concurrent.duration.DurationInt
import scala.reflect.ClassTag
import scala.util.{Failure, Success}

import io.circe.Json

object Utils extends ClassLogging with RestErrors {
  def onResponse[T](
      future: Future[Any]
  )(f: Function[T, Route])(implicit timeout: Timeout, ec: ExecutionContext, c: ClassTag[T]): Route =
    onComplete(future) {
      case Success(t: T) => f(t)
      case Success(other) =>
        log.error(
          s"Expected response of type ${c.runtimeClass.getName} instead of ${other.getClass.getName}."
        )
        complete(internalServerError)
      case Failure(_: TimeoutException) =>
        log.error(s"A request for a ${c.runtimeClass.getName} did not produce a timely response")
        complete(serviceUnavailable)
      case Failure(e) =>
        log.error(
          s"A request for a ${c.runtimeClass.getName} could not be completed as expected: $e"
        )
        complete(internalServerError)
    }

  def waitForTermination(isFinished: CountDownLatch): String = {
    val waitingThread             = Thread.currentThread()
    val interruptedByShutdownHook = new AtomicBoolean(false)
    val shutdownHook = new Thread(() => {
      interruptedByShutdownHook.set(true)
      waitingThread.interrupt()
      isFinished.await(30, TimeUnit.SECONDS)
    })
    Runtime.getRuntime.addShutdownHook(shutdownHook)
    try {
      while (System.in.available() == 0) Thread.sleep(200)
      Runtime.getRuntime.removeShutdownHook(shutdownHook)
      while (System.in.available() > 0) System.in.readNBytes(System.in.available())
      "stdin input"
    } catch {
      case _: InterruptedException =>
        if (interruptedByShutdownHook.get()) "shutdown hook" else "interrupt"
    }
  }

  def awaitBlocking[T](f: Future[T], time: Int = 5): T = Await.result(f, time.seconds)

  def promised[T](f: Promise[T] => Unit): Future[T] = {
    val promise = Promise[T]()
    f(promise)
    promise.future
  }

  val logResponseTime: Directive0 = {
    import java.lang.System.{currentTimeMillis => now}
    def doLogging(start: Long)(q: HttpRequest): RouteResult => Unit = {
      case Complete(r) =>
        log.info(s"REST: ${now - start}ms ${q.method.value} ${q.uri.path} -> ${r.status}")
      case Rejected(r) =>
        log.info(
          s"REJECT: ${q.method.value} : ${q.uri.path} : ${q.entity.toString} -> ${r.toString()}"
        )
    }

    DebuggingDirectives.logRequestResult(LoggingMagnet { _: LoggingAdapter => doLogging(now) })
  }
  def failureMsg(msg: String): Json = Json.obj("failureType" -> Json.fromString(msg))

  def sendEmail(
      emailTo: String,
      subject: String,
      message: String,
      request: Request,
      sendGrid: SendGrid
  ): Unit = {
    val content = new Content("text/html", message)
    val mail    = new Mail(new Email("hello@travelonio.com"), subject, new Email(emailTo), content)
    request.setMethod(Method.POST);
    request.setEndpoint("mail/send");
    request.setBody(mail.build())
    //TODO - handle response in case of bad case in response
    sendGrid.api(request)
  }

   def parseDate(dateEntry: String): Option[Date] = {
    val format = new java.text.SimpleDateFormat("dd-MM-yyyy")
    try {
      Some(format.parse(s"$dateEntry"))
    } catch {
      case e: Throwable => None
    }
  }

}
