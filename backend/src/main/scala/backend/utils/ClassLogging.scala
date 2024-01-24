package backend.utils

import org.slf4j.{Logger, LoggerFactory}

trait ClassLogging {
  implicit protected val log: Logger = LoggerFactory.getLogger(getClass.getName.stripSuffix("$"))
}
