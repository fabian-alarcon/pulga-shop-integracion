#!/bin/bash
set -e

# Restore MongoDB collections from the dumped BSON files on first container start.
# The official mongo image executes scripts in /docker-entrypoint-initdb.d only when the data directory is empty.

BACKUP_DIR="/backups"

if [ -d "${BACKUP_DIR}" ]; then
  echo "Restoring MongoDB data from ${BACKUP_DIR}..."
  mongorestore --drop "${BACKUP_DIR}"
  echo "MongoDB restore completed."
else
  echo "Backup directory ${BACKUP_DIR} not found; skipping restore."
fi
