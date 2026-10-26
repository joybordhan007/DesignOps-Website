@AGENTS.md

# DesignOps website — project notes

> **Keep this file current.** After every feature or change, update the
> relevant sections below and add a line to the [Changelog](#changelog)
> (newest first, with the date). Record *why* a decision was made, not just what.

## What this is

The website of **DesignOps**, a design and software studio (Dhaka, Bangladesh), plus
an admin dashboard where the owner edits every text, image and list on the site
without touching code.

| | |
|---|---|
| Website | https://designops.agency |
| Dashboard | https://admin.designops.agency (also `designops.agency/admin`, which forwards there) |
| Hosting | arhostbd shared cPanel (LiteSpeed, CloudLinux "Setup Node.js App", Node 20). The same account also hosts the owner's older site `suchhandamondol.com` in `public_html` — never touch it. |
| Domain | Namecheap, nameservers `ns1/ns2.arhostbd.com` |
| Owner | Joybordhan Sarkar — a new developer; talk to him in **Bangla**, step by step, with screenshots-level detail for anything on the hosting. |

## Stack

- **Frontend:** React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 (`@tailwindcss/vite`). Started in Figma Make (see AGENTS.md).
- **Server:** Node + Express 4 (`server/index.js`), Multer (uploads), Nodemailer (contact emails). No database: JSON files.
- **Formatting:** oxfmt. The code uses long lines (≈200+ chars); run it with a temporary `.oxfmtrc` containing `{ "printWidth": 260 }` (delete it after) or the default 80-column wrap will reflow files.
- **Package manager:** pnpm (`.mise.toml`); `npm run …` scripts also work.

## How it fits together

- **Content model** — `src/content/types.ts`. One `Content` object: `settings` (all page texts, labels, heroes, legal pages, tracking…), `services`, `projects`, `posts`, `clients`, `reviews`, `achievements`, `process` (Home working process), `faqs`.
- **Storage** — the server keeps it in `server/data/content.json`; other files there: `admin.json` (login, hashed), `messages.json`, `pending-reviews.json`, `visits.json`, `mail.json` (SMTP incl. password), `session-secret`. Uploads go to `server/uploads/`. `server/data` and `server/uploads` are **not in git and not in the deploy zip**.
- **Migrations** — `server/migrate.js` brings any older saved content up to the current shape. It runs on server start, after every dashboard save, and in the browser for fetched content. It must be **idempotent** (running twice = same result) and generate **deterministic ids** (`<owner id>-<kind>-<n>`), because it runs repeatedly.
- **SEO** — `server/seo.js` builds each page's title, description, canonical URL, share image and schema.org JSON-LD (business, website, services, case studies, blog posts, FAQ, breadcrumbs) from the content + `settings.seo`. The server writes it into every page (and answers unknown URLs with a real 404 + noindex); `App.tsx` updates title/description on in-app navigation. `server/seo.d.ts` types it for the client.
- **Rendering** — the server embeds the public content in `index.html` (`window.__SITE_CONTENT__`); the site reads it via `useContent()` (`src/content/store.ts`). Inactive items are filtered out for visitors. Desktop pages: `src/websitepages/` (1920px artboard, scaled); phone/tablet: `src/mobile/` (below 1024px).
- **Dashboard** — `src/admin/`. Form fields are declared as data (`src/admin/fields.tsx` `Field` types); list pages use `src/admin/table.tsx` (table + item editor), simple lists use `CollectionEditor` (`src/admin/editor.tsx`).
- **Several server copies** — the hosting runs the website and the admin subdomain as separate processes on the same folder. The server re-reads `content.json`/`admin.json` when their mtime changes (`fresh()`), and visit counts are merged into `visits.json` instead of overwritten.

## Key decisions

- **Everything editable from the dashboard, nothing hard-coded in pages** — including small labels/buttons (`settings.labels`); font sizes stay as designed, only words change.
- **JSON files instead of a database** — shared hosting, one editor, small data; easy to back up (download `server/data` + `server/uploads`).
- **Admin on its own subdomain** via `ADMIN_HOST` env: admin host serves `/admin`, main host forwards `/admin` there; uploads/API work on both. Admin is `noindex` and excluded in `robots.txt`.
- **Privacy-friendly visit counting** (`/api/visit`, `src/lib/visits.ts`): daily totals only, no cookies/IPs; uses `utm_source` when present. Per-day caps (200 pages/sources) keep the file small.
- **Tracking** is only Google Tag Manager + Meta Pixel (each with its own on/off); GA4 and custom code were dropped (add GA4 inside GTM).
- **Contact messages** are always saved; email is optional (SMTP set in Website Settings → Email notifications). The SMTP password lives only in `server/data/mail.json`, never in content.
- **Reviews** from visitors need approval; only name + rating are required. The rating card is computed from published reviews.
- **One image / one name instead of duplicates** — a service has one `image` (Services row + details hero); a project has one `cover` and its `title` is the page heading.
- **Repeatable page sections** — service intros/deliverables/working-process blocks, project challenges/solutions/palettes/tools, blog article sections are all lists of blocks edited as separate cards.
- **Blog article text** is HTML from the dashboard's rich text editor; it is always cleaned with `src/lib/sanitizeHtml.ts` (allow-list) before saving and showing. Blog dates are set automatically on first publish and not shown on the site.
- **Client logos** are shown in a fixed 220 × 100 px box (`object-fit: contain`), placed by `logoFit` (drag + size in the dashboard). Background removal runs in the browser (`src/admin/removeBackground.ts`: multi-colour edge detection, gradient-following flood fill, speck/island cleanup, soft edges); `LogoCanvasEditor.tsx` is the big hand editor (erase / restore / magic erase, zoom, undo). The uploaded original is kept in `logoOriginal`, and `logoCrop` records where the edited logo was cut from so later edits line up.
- **Uploads over 10 MB** are shrunk in the browser before sending (`src/admin/compressImage.ts`, called by `uploadFile`): WebP, long side 4K → 2560 → 1920 (never below Full HD).
- **SEO** — technical SEO is automatic (per-page meta, canonical, JSON-LD, sitemap, robots, real 404s, alt texts on content images); the words are editable: site and per-page titles/descriptions, title pattern, target keywords, business details and verification in Website Settings → SEO, and an SEO card (with Google preview and length counters) in every service, project and post. Default texts target software development / UI/UX / web & app / ERP / AI / digital marketing searches in Bangladesh.
- **Favicons** — website and dashboard each have their own (`settings.favicons`), injected by the server; the dashboard tab updates as soon as it is saved.
- **Dashboard design rules** — every card has a 6px corner radius; gaps between sections/cards are 16px; main content has 24px side margins.
- **Deploying never touches data** — only `deploy/designops-app.zip` is uploaded for code updates; `designops-data.zip` is for the very first upload only.

## Built so far

**Website:** Home, Services + service details, Work + work details (horizontal/vertical cards), Blog + article page with table of contents, Company, Contact (form + FAQ), Reviews page with "write a review" popup, Privacy Policy, Terms of Service, 404 (real 404 status); per-page SEO and structured data; hero videos (one for Home, one shared); `robots.txt`, automatic `sitemap.xml`; http/www → https redirect (in `.htaccess` on the host).

**Dashboard:** login + profile (name, photo, password with show/hide and clear errors); Dashboard reports (6 headline cards, traffic chart, devices, top pages, traffic sources, messages & reviews, content added, ratings, blog topics, checklist; time filter 7 days–12 months); global search (Ctrl+K) over everything; Services / Work / Blog (table with status toggle and ⋯ menu, item editor with section cards); Clients (logo placement by drag, automatic background removal, hand editor); SEO card in service/work/blog editors; big image uploads shrunk automatically; Achievements (one list, Home/Company switches, section title); FAQ; Messages; Review Management (approve/reject); Website Settings (section menu: SEO (Google), favicons, contact, footer & socials, email notifications, page banners, Home texts, Home process, Company, Reviews page, Privacy, Terms, buttons & labels); Tracking & Analytics (GTM, Meta Pixel).

## Working on it

- **Checks before finishing:** `npx tsc --noEmit -p . --noUnusedLocals --noUnusedParameters`, `npx vite build`, `node --check server/*.js`.
- **Changing the content shape:** update `types.ts`, add a migration in `server/migrate.js`, convert `src/content/defaultContent.json`, and test the migration on the live content (`https://designops.agency/api/content`, public items only) — nothing may be lost, and running it twice must give the same result.
- **Local run:** `npm run build` then `npm run server` → http://localhost:3001 (site) and `/admin`. Admin login comes from `server/.env` on first start.
- **Before every upload, test the zip itself:** extract `deploy/designops-app.zip` into an empty folder, `npm install --omit=dev`, copy a `content.json` into `server/data/`, start it with `PORT`/`ADMIN_HOST`/`ADMIN_*` env vars and check pages answer 200. (2026-10-27: a new `server/seo.js` was missing from the zip and the live site went down with 503 — `make-deploy.mjs` now includes every `server/*.js`.)
- **Deploy:** `npm run deploy` → upload `deploy/designops-app.zip` to `/home/suchhand/designops-app`, extract, Restart in Setup Node.js App. Full Bangla guide: `DEPLOY.md`. If env vars change, the admin subdomain's `.htaccess` needs the Passenger + env block copied again.

## Changelog

- **2026-10-27** — Fixed the deploy zip (it left out the new `server/seo.js`, so the live server stopped with 503); every `server/*.js` is now included automatically.
- **2026-10-26** — Full SEO (per-page titles/descriptions/canonical, JSON-LD, 404s, redirects, alt texts, SEO settings + per-item SEO cards with Google preview); favicons for website and dashboard; uploads over 10 MB shrunk in the browser (still HD); logo background removal rebuilt (gradients, two-tone backgrounds, JPEG noise) plus a hand editor and drag-to-place in the 220 × 100 box.
- **2026-10-26** — Added this file.
- **2026-10-24** — Service sections (intros, deliverables, working process) and project sections (challenges with image left/right, solutions, palettes, tools) became repeatable card lists; one service image and one project image/name; blog article sections with a rich text editor (auto publish date, no date on site); client logos 220 × 100 with background removal; 6 headline dashboard cards (added Total Services/Work); dashboard design rules (6px radius, 16px gaps, 24px margins). Live content migrated with nothing lost.
- **2026-10-23** — Went live on arhostbd (website + admin subdomain, SSL, redirects, Search Console + sitemap). Server made safe for several processes; robots/sitemap; deploy script and `DEPLOY.md`.
- **2026-10-22/23** — Privacy & Terms pages; contact emails via SMTP; dashboard search; traffic reports and visit counting; profile page; Website Settings redesign; GTM/Meta tracking; automatic rating card; reviews page with approval; achievements merged into one list.
- **Earlier** — Content-driven site and admin dashboard built from the Figma Make design.
