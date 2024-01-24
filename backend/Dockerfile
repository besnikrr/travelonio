FROM hseeberger/scala-sbt:eclipse-temurin-11.0.14.1_1.6.2_2.13.8 AS build

ARG NEXUS_SBT_OPTS

USER root
WORKDIR /var/src/app

COPY build.sbt ./
COPY project/build.properties project/plugins.sbt project/

ENV SBT_OPTS "-Xmx1g -Xss2M -Dfile.encoding=utf8 -Dsbt.log.noformat=true -Dsbt.log.noformat=true ${NEXUS_SBT_OPTS}"
ENV skipScalaFmt "true"

RUN echo "object X" > X.scala
RUN sbt collectJars
RUN rm X.scala

COPY src src
RUN sbt \;collectJars

### PRODUCTION IMAGE
FROM openjdk:11.0.8-jre as prod
RUN useradd -lMs /bin/bash docker
USER docker
COPY --chown=docker scripts/service.sh /opt/reze/backend/
COPY --chown=docker documentation      /opt/reze/backend/documentation
COPY --chown=docker --from=build /var/src/app/target/universal/jars /opt/reze/backend/lib


EXPOSE 5000
WORKDIR /opt/reze/backend

RUN chmod a+x /opt/reze/backend/service.sh
ENTRYPOINT ["/opt/reze/backend/service.sh"]
