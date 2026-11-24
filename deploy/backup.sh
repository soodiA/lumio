#!/bin/bash
# Lumio daily backup: pg_dump (custom format) -> /srv/lumio/backups, keeps the newest 14.
# Local only: it protects against bad edits / dropped rows, NOT against losing the VM or its disk.
# Restore:  docker exec -i lumio-db-1 pg_restore -U lumio -d lumio --clean --if-exists < lumio-YYYYmmdd-HHMMSS.dump
set -euo pipefail
umask 077
OUT=/srv/lumio/backups; KEEP=14
mkdir -p "$OUT"
f="$OUT/lumio-$(date -u +%Y%m%d-%H%M%S).dump"
docker exec lumio-db-1 pg_dump -U lumio -d lumio -Fc > "$f"
[ -s "$f" ] || { echo "empty dump" >&2; rm -f "$f"; exit 1; }
ls -1t "$OUT"/lumio-*.dump | tail -n +$((KEEP+1)) | xargs -r rm -f
echo "backup ok: $f ($(stat -c %s "$f") bytes)"
