# Lumio deploy (VM tichiweb, 176.65.243.212)

Layout: `/srv/lumio/{postgres,web,backups,bin}`, secrets in `/srv/lumio/.env` (0600: POSTGRES_PASSWORD, TOKEN_SECRET, ADMIN_KEY, CORS_ORIGINS, LUMIO_VERSION).
Containers `lumio-db-1` (127.0.0.1:5433) and `lumio-api-1` (127.0.0.1:8090); only host nginx listens publicly (:80, CDN origin; vhost `nginx-lumio.conf`).

- Backend: `cd deploy && sudo docker compose --env-file /srv/lumio/.env -f compose.yml up -d --build` (source synced to `~/lumio-build/backend`).
- Frontend: `deploy/release-web.sh`.
- Seed (empty questions table only; refuses otherwise): `lumio-seed /q.json` using `migration/export/questions.json`.
- nginx: copy `nginx-lumio.conf` to `/etc/nginx/sites-available/lumio`, symlink into sites-enabled, `nginx -t && systemctl reload nginx`.
- Backup: `install -m755 backup.sh /srv/lumio/bin/backup.sh; cp cron-lumio-backup /etc/cron.d/lumio-backup`.
- Admin panel: `/admin/questions`, asks for `ADMIN_KEY`.
- DNS: `lumio.tichikids.ir` must point at the same CDN/origin as tichikids.ir (not done by us).
