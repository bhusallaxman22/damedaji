# Research Portfolio Web App (Next.js + Ant Design)

A professional publication portfolio built with:
- Next.js (App Router)
- Ant Design UI system
- Atomic design component structure (atoms, molecules, organisms, templates)
- MariaDB persistence
- Google Scholar scraping/sync pipeline

## Features

- Home page with searchable and filterable publication project cards
- Dedicated full-page detail route for each research project: `/research/[slug]`
- API endpoints for listing and reading publications
- Admin sync API to ingest from Google Scholar
- MariaDB table bootstrap and seed scripts
- Fallback publication dataset when DB is not configured

## Project Structure

- `src/components/atoms`
- `src/components/molecules`
- `src/components/organisms`
- `src/components/templates`
- `src/lib` (db, scraper, service, fallback data)
- `src/app` (pages and API routes)
- `scripts` (db init + scholar sync)

## Environment Variables

Copy `.env.example` to `.env.local` and set values:

```bash
MARIADB_HOST=127.0.0.1
MARIADB_PORT=3306
MARIADB_USER=root
MARIADB_PASSWORD=your_password
MARIADB_DATABASE=research_portfolio

SCHOLAR_USER_ID=o_zl-E8AAAAJ
ADMIN_SYNC_TOKEN=change_me
```

## Run

```bash
npm run dev
```

## Docker Deployment

Build the image:

```bash
docker build -t dame-daji .
```

Run only the web app with the built-in fallback publications:

```bash
docker run -p 3000:3000 \
  -e ADMIN_SYNC_TOKEN=change_me \
  -e SCHOLAR_USER_ID=o_zl-E8AAAAJ \
  dame-daji
```

Run the full app with MariaDB using Docker Compose:

```bash
docker compose up --build -d
```

Stop the stack:

```bash
docker compose down
```

The compose stack will:
- start MariaDB
- wait for the database health check
- initialize the publications table and seed data
- start the Next.js app on `http://localhost:3000`

Notes:
- Use the single-container command when you want the app to run without MariaDB.
- Use `docker compose` when you want the app connected to MariaDB with seeded publications.

## Initialize DB and Seed

```bash
npm run db:init
```

## Sync Publications from Google Scholar

```bash
npm run scholar:sync -- --user=o_zl-E8AAAAJ
```

Notes:
- Google Scholar can rate-limit or challenge requests with CAPTCHA. If this happens, run the sync later or use a proxy/manual import strategy.
- The app still works with fallback publications if DB is unavailable.

## API Endpoints

- `GET /api/publications?query=&type=`
- `GET /api/publications/[slug]`
- `POST /api/admin/sync` (requires `x-admin-token` header)

Example sync request:

```bash
curl -X POST http://localhost:3000/api/admin/sync \
  -H "Content-Type: application/json" \
  -H "x-admin-token: change_me" \
  -d '{"userId":"o_zl-E8AAAAJ"}'
```
