#!/bin/bash
TARGETFOLDER=/backups/


TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TARGET="${TARGETFOLDER}${TIMESTAMP}_travelonio_mongo.tar.gz"

echo "Starting backup creation ..."
docker exec mongo bash -c 'rm -rf /dump /mongodump.tar.gz'

docker exec mongo bash -c 'mongodump --username=mongodb-user --password=some-password && tar -acf mongodump.tar.gz dump' || "Backup failed!"
docker cp mongo:/mongodump.tar.gz ${TARGET} || "Copy backup failed!"


echo "$(date +%Y%m%d_%H%M%S) Finished successfully."
