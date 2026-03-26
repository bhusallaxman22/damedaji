#!/bin/sh
set -eu

if [ -n "${MARIADB_HOST:-}" ] && [ -n "${MARIADB_PORT:-}" ] && [ -n "${MARIADB_USER:-}" ] && [ -n "${MARIADB_PASSWORD:-}" ] && [ -n "${MARIADB_DATABASE:-}" ]; then
    echo "Initializing database schema and seed data..."
    node scripts/init-db.mjs
else
    echo "MariaDB environment variables not fully configured; skipping database initialization."
fi

exec npm start
