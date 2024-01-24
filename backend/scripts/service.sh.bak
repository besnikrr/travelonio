#!/bin/bash
cd "$(dirname "$0")" || exit 1 #shell does not exit automatically if cd fails
echo "Starting Reze service..."

if [ "${MONGO_SERVERS}"   != "" ]; then JAVA_OPTS[1]="-Dmongo.servers=${MONGO_SERVERS}"; fi
if [ "${MONGO_DATABASE}"  != "" ]; then JAVA_OPTS[2]="-Dmongo.database=${MONGO_DATABASE}"; fi
if [ "${JAVA_XMX}"        != "" ]; then JAVA_OPTS[5]="-Xmx${JAVA_XMX}";  else echo "ERROR: ENV JAVA_XMX missing. Exiting..."; exit 1; fi

echo "Using JAVA_OPTS: '${JAVA_OPTS[@]}'"
exec java -XX:+ExitOnOutOfMemoryError -cp "conf:lib/*" "${JAVA_OPTS[@]}" backend.Server "$@"
