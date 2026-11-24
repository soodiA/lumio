#!/bin/bash
# Build the static frontend and publish it to the VM (run from the repo root on a machine with node + ssh access).
# Serves from "/" on lumio.tichikids.ir, so no basePath is set. API calls are same-origin (/api/...).
set -euo pipefail
HOST=${HOST:-ubuntu@176.65.243.212}
npm ci
npx next build
rsync -a --delete out/ "$HOST:lumio-build/web/"
ssh "$HOST" 'sudo rsync -a --delete ~/lumio-build/web/ /srv/lumio/web/'
