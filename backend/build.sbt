name := "reze Backend"
version := "current"

ThisBuild / scalacOptions ++= Seq(
  "-deprecation",
  "-feature",
  "-unchecked"
)

ThisBuild / scalaVersion := "2.13.6"
val AkkaVersion     = "2.6.16"
val AkkaHttpVersion = "10.2.6"
val circeVersion    = "0.14.1"
ThisBuild / libraryDependencies ++= Seq(
  "ch.qos.logback"     % "logback-classic"    % "1.2.5",
  "com.typesafe.akka" %% "akka-stream"        % AkkaVersion,
  "com.typesafe.akka" %% "akka-http"          % AkkaHttpVersion,
  "com.typesafe.akka" %% "akka-actor-typed"   % AkkaVersion,
  "com.typesafe.akka" %% "akka-stream-typed"  % AkkaVersion,
  "io.circe"          %% "circe-core"         % circeVersion,
  "io.circe"          %% "circe-generic"      % circeVersion,
  "io.circe"          %% "circe-parser"       % circeVersion,
  "de.heikoseeberger" %% "akka-http-circe"    % "1.37.0",
  "org.mongodb.scala" %% "mongo-scala-driver" % "4.3.1",
  "ch.megard"         %% "akka-http-cors"     % "1.1.2",
  "org.apache.commons" % "commons-email"      % "1.5",
  "org.mindrot"        % "jbcrypt"            % "0.3m",
  "com.sendgrid"       % "sendgrid-java"      % "4.9.2"
)

lazy val collectJars = taskKey[Unit]("Collects required JARs.")
collectJars := {
  val jars    = (Runtime / fullClasspathAsJars).value.map(_.data)
  val jarsDir = baseDirectory.value / "target" / "universal" / "jars"
  IO.delete(jarsDir)
  jars.foreach(file => IO.copyFile(file, jarsDir / file.name))
}
