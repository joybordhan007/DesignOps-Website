# DesignOps — server & admin dashboard

The website and its admin dashboard run from one small Node.js server
(`server/index.js`). It serves the built site (`dist/`), stores everything the
dashboard edits, and keeps uploaded images/videos.

| What | Where |
|---|---|
| Admin dashboard | `https://your-domain/admin` |
| Site content (texts, lists, settings) | `server/data/content.json` |
| Contact-form messages | `server/data/messages.json` |
| Reviews waiting for approval | `server/data/pending-reviews.json` |
| Photos sent with visitor reviews | `server/uploads/reviews/` |
| Admin account (password is hashed) | `server/data/admin.json` |
| Email settings for contact messages (incl. SMTP password) | `server/data/mail.json` |
| Visit counts for the dashboard reports | `server/data/visits.json` |
| Uploaded images & videos | `server/uploads/` |

`server/data/` and `server/uploads/` are created automatically on the first
start (the content starts as a copy of `src/content/defaultContent.json`).
They are **not** in git — back them up, and never overwrite them when you
upload a new version of the site.

**Tracking (Google Tag Manager, Meta Pixel):** set the IDs in the
dashboard under *Tracking & Analytics*. The server writes the tags into every
website page it sends (`server/tracking.js`), never into `/admin`; the site
then reports page changes and conversions (`src/lib/tracking.ts`).

**Contact form email:** every message is saved for the dashboard and, when
switched on, emailed (`server/mail.js`). Set the recipients and the sending
account (SMTP, e.g. your hosting email) in the dashboard under *Website
Settings → Email notifications*, then use *Send test email* to check it.

## Run it on your computer

```bash
pnpm install          # or: npm install
cp server/.env.example server/.env   # then put your admin email/password in it
npm run build         # builds the site into dist/
npm run server        # http://localhost:3001  (site + /admin)
```

While developing, `npm run dev` (Vite, port 8443) forwards `/api` and
`/uploads` to the server, so run `npm run server` next to it.

## Put it on cPanel hosting (Node.js)

Step-by-step guide (Bangla), including the admin subdomain: **[DEPLOY.md](../DEPLOY.md)**.

1. On your computer run `npm run deploy`. It builds the site and writes
   `deploy/designops-app.zip` (the program) and `deploy/designops-data.zip`
   (your local content and uploads — upload that one only the first time).
2. Upload and extract them in a folder outside `public_html`, e.g. `designops-app`.
3. cPanel → **Setup Node.js App** → **Create Application**
   - Node.js version: **20** or newer
   - Application mode: Production
   - Application root: `designops`
   - Application URL: your domain
   - Application startup file: `server/index.js`
4. In the same screen add **Environment variables**:
   - `ADMIN_EMAIL` = your login email
   - `ADMIN_PASSWORD` = your login password
   - `ADMIN_NAME` = the name shown in the dashboard
   - `SESSION_SECRET` = any long random text (optional but recommended)
   - `ADMIN_HOST` = the dashboard's own address, e.g. `admin.designops.agency` (optional;
     point that subdomain at the same app, see DEPLOY.md step 7)
5. Click **Run NPM Install**, then **Restart**.
6. Open `https://your-domain/admin` and sign in.

The admin account is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` on the very
first start. After that the password lives (hashed) in `server/data/admin.json`
and is changed from the dashboard (profile menu → Change password). To reset a
forgotten password, delete `server/data/admin.json` and restart the app — it is
recreated from the environment variables.

### Updating the site later

Run `npm run deploy` again, upload and extract only `designops-app.zip`, then
click **Restart** in Setup Node.js App. Your content, messages and uploads stay
as they are.

### Search engines

The server answers `/robots.txt` (dashboard and API excluded) and builds
`/sitemap.xml` from the content. `.figma/make/site.json` → `robots.index` must
stay `true`, or the built pages tell search engines not to list the site.
