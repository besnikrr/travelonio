#!/bin/bash
TARGETFOLDER=/backups/


TARGET="$1"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "Extracting archive ..."
cd ${TARGETFOLDER} || fail "Failed to enter archive folder!"
docker exec mongo bash -c 'rm -rf data-to-restore'
docker cp $TARGETFOLDER mongo:data-to-restore || "Copy archive failed!"


docker exec mongo bash -c "tar -axf data-to-restore/${TARGET}" || "Extracting archive failed!"

echo "$(date +%Y%m%d_%H%M%S) Restoring dump ${TARGET} ..."
docker exec mongo bash -c 'mongorestore --username=mongodb-user --password=some-password /dump' || "Restore failed!"

echo "$(date +%Y%m%d_%H%M%S) Finished successfully."

cd -
