// DesignOps website server.
//
// - Serves the built site (dist/) with the editable content embedded in the
//   page, so it renders without waiting for an API call.
// - /api/content           public: everything the site shows
// - /api/contact           public: stores contact-form messages
// - /api/reviews           public: stores reviews sent from the Reviews page (shown after approval)
// - /api/auth/*            admin login / logout / session
// - /api/admin/*           admin: save content, upload files, read messages, approve reviews
//
// Data lives in JSON files under DATA_DIR (default server/data) and uploads in
// UPLOAD_DIR (default server/uploads). See server/README.md for setup.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import multer from "multer";
import { DEFAULT_MAIL, mailReady, parseRecipients, publicMail, sendContactMail, sendTestMail } from "./mail.js";
import { migrate } from "./migrate.js";
import { pageSeo, seoHead } from "./seo.js";
import { trackingBody, trackingHead } from "./tracking.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

loadEnvFile(path.join(here, ".env"));

const PORT = Number(process.env.PORT || 3001);
const DATA_DIR = path.resolve(root, process.env.DATA_DIR || "server/data");
const UPLOAD_DIR = path.resolve(root, process.env.UPLOAD_DIR || "server/uploads");
const DIST_DIR = path.resolve(root, process.env.DIST_DIR || "dist");
const DEFAULT_CONTENT = path.join(root, "src/content/defaultContent.json");
const COOKIE = "do_admin";
/** Optional: the dashboard's own address, e.g. admin.designops.agency (see server/README.md). */
const ADMIN_HOST = (process.env.ADMIN_HOST || "").trim().toLowerCase();

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---------------------------------------------------------------- storage

const files = {
  content: path.join(DATA_DIR, "content.json"),
  messages: path.join(DATA_DIR, "messages.json"),
  pendingReviews: path.join(DATA_DIR, "pending-reviews.json"),
  visits: path.join(DATA_DIR, "visits.json"),
  mail: path.join(DATA_DIR, "mail.json"),
  admin: path.join(DATA_DIR, "admin.json"),
  secret: path.join(DATA_DIR, "session-secret"),
};

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

/** Writes via a temp file + rename so a crash never leaves half a file. */
function writeJson(file, value) {
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, file);
  seen[file] = modified(file);
}

// Hosting can run several copies of this server (e.g. one for the website and
// one for the admin subdomain). Each keeps the content and admin account in
// memory, so before every request it re-reads a file another copy has changed.
const seen = {};
const modified = (file) => {
  try {
    return fs.statSync(file).mtimeMs;
  } catch {
    return 0;
  }
};
/** `current` again, or the file's new value when it changed on disk since this copy last read or wrote it. */
function fresh(file, current) {
  const time = modified(file);
  if (!time || time === seen[file]) return current;
  seen[file] = time;
  return readJson(file, current);
}

if (!fs.existsSync(files.content)) {
  fs.copyFileSync(DEFAULT_CONTENT, files.content);
  console.log("Created", files.content, "from the default site content.");
}

let content = fresh(files.content, null);
if (!content) throw new Error(`Could not read ${files.content}`);
{
  const migrated = migrate(content, readJson(DEFAULT_CONTENT, {}));
  if (JSON.stringify(migrated) !== JSON.stringify(content)) {
    content = migrated;
    writeJson(files.content, content);
    console.log("Updated", files.content, "to the current content format.");
  }
}

/** What visitors get: inactive services, projects, posts and reviews are left out. */
function publicContent() {
  const shown = (items) => (items || []).filter((item) => item.active !== false);
  return { ...content, services: shown(content.services), projects: shown(content.projects), posts: shown(content.posts), reviews: shown(content.reviews) };
}

const sessionSecret =
  process.env.SESSION_SECRET ||
  (() => {
    if (!fs.existsSync(files.secret)) fs.writeFileSync(files.secret, crypto.randomBytes(32).toString("hex"));
    return fs.readFileSync(files.secret, "utf8").trim();
  })();

// ---------------------------------------------------------------- admin account

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function passwordMatches(password, { salt, hash }) {
  const candidate = Buffer.from(crypto.scryptSync(password, salt, 64).toString("hex"), "hex");
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

let admin = fresh(files.admin, null);
if (!admin && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
  admin = { email: process.env.ADMIN_EMAIL.trim().toLowerCase(), name: process.env.ADMIN_NAME || "Admin", ...hashPassword(process.env.ADMIN_PASSWORD) };
  writeJson(files.admin, admin);
  console.log("Created the admin account for", admin.email);
}
/** What the dashboard gets to know about the admin (never the password hash). */
const publicAdmin = () => ({ email: admin.email, name: admin.name, avatar: admin.avatar || "" });

if (!admin) console.warn("No admin account yet: set ADMIN_EMAIL and ADMIN_PASSWORD (see server/README.md).");

// ---------------------------------------------------------------- sessions

const b64 = (value) => Buffer.from(value).toString("base64url");
const sign = (value) => crypto.createHmac("sha256", sessionSecret).update(value).digest("base64url");

function makeToken(email, maxAgeMs) {
  const body = b64(JSON.stringify({ email, exp: Date.now() + maxAgeMs }));
  return `${body}.${sign(body)}`;
}

function readToken(token) {
  if (!token || !token.includes(".")) return null;
  const [body, mac] = token.split(".");
  const expected = sign(body);
  if (mac.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString());
    return data.exp > Date.now() && admin && data.email === admin.email ? data : null;
  } catch {
    return null;
  }
}

function cookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .map((part) => part.trim().split("="))
      .filter(([key]) => key)
      .map(([key, ...rest]) => [key, decodeURIComponent(rest.join("="))]),
  );
}

function setSessionCookie(req, res, token, maxAgeMs) {
  const secure = req.secure || req.headers["x-forwarded-proto"] === "https";
  const parts = [`${COOKIE}=${token}`, "Path=/", "HttpOnly", "SameSite=Lax"];
  if (maxAgeMs) parts.push(`Max-Age=${Math.floor(maxAgeMs / 1000)}`);
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

function requireAdmin(req, res, next) {
  if (readToken(cookies(req)[COOKIE])) return next();
  res.status(401).json({ error: "Please sign in." });
}

/** Tiny in-memory limiter: at most `limit` hits per key within `windowMs`. */
function limiter(limit, windowMs) {
  const hits = new Map();
  return (key) => {
    const now = Date.now();
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    // Forget visitors whose window has passed, so the map can't grow forever.
    if (hits.size > 5000) for (const [k, times] of hits) if (now - times[times.length - 1] >= windowMs) hits.delete(k);
    return recent.length <= limit;
  };
}
const loginLimit = limiter(8, 10 * 60 * 1000);
const contactLimit = limiter(5, 10 * 60 * 1000);
const reviewLimit = limiter(5, 10 * 60 * 1000);

// ---------------------------------------------------------------- app

const app = express();
app.set("trust proxy", true);
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
app.use((req, res, next) => {
  content = fresh(files.content, content);
  admin = fresh(files.admin, admin);
  const adminPage = /^\/admin(\/|$)/.test(req.path);
  const onAdminHost = Boolean(ADMIN_HOST) && req.hostname === ADMIN_HOST;
  if (adminPage || onAdminHost) res.setHeader("X-Robots-Tag", "noindex, nofollow");
  // With ADMIN_HOST set, the dashboard lives on its own address and the website on the other;
  // files and API calls work on both (the dashboard shows uploaded images from /uploads).
  if (!ADMIN_HOST || req.method !== "GET" || /^\/(api|uploads|assets|videos)\//.test(req.path) || /\.[a-z0-9]+$/i.test(req.path)) return next();
  if (onAdminHost && !adminPage) return res.redirect(302, "/admin");
  if (!onAdminHost && adminPage) return res.redirect(302, `${req.protocol}://${ADMIN_HOST}${req.originalUrl}`);
  next();
});
app.use(express.json({ limit: "8mb" }));

// Search engines: the website is listed, the dashboard and API are not.
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  if (ADMIN_HOST && req.hostname === ADMIN_HOST) return res.send("User-agent: *\nDisallow: /\n");
  res.send(`User-agent: *\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${req.protocol}://${req.get("host")}/sitemap.xml\n`);
});

app.get("/sitemap.xml", (req, res) => {
  const site = `${req.protocol}://${req.get("host")}`;
  const shown = publicContent();
  const pages = [
    ...["/", "/services", "/work", "/blog", "/company", "/reviews", "/contact", "/privacy", "/terms"].map((loc) => ({ loc })),
    ...shown.services.map((s) => ({ loc: `/services/${s.slug}` })),
    ...shown.projects.map((p) => ({ loc: `/work/${p.slug}` })),
    ...shown.posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.date })),
  ];
  const urls = pages.map(({ loc, lastmod }) => `  <url><loc>${escapeHtml(site + loc)}</loc>${lastmod ? `<lastmod>${escapeHtml(lastmod)}</lastmod>` : ""}</url>`);
  res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
});

// Public content (everything the site renders).
app.get("/api/content", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.json(publicContent());
});

// Contact form.
const MESSAGE_FIELDS = ["first_name", "last_name", "email", "phone", "company", "preferred_time", "message"];
app.post("/api/contact", (req, res) => {
  if (!contactLimit(req.ip)) return res.status(429).json({ error: "Too many messages. Please try again later." });
  const body = req.body || {};
  const message = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), read: false };
  for (const field of MESSAGE_FIELDS) message[field] = String(body[field] ?? "").slice(0, field === "message" ? 5000 : 200).trim();
  if (!message.first_name || !/^\S+@\S+\.\S+$/.test(message.email)) return res.status(400).json({ error: "Please fill in your name and a valid email." });
  const messages = readJson(files.messages, []);
  messages.unshift(message);
  writeJson(files.messages, messages);
  res.json({ ok: true });
  // Emailed after answering, so a slow mail server never holds up the visitor.
  const mail = readJson(files.mail, DEFAULT_MAIL);
  if (!mailReady(mail, content.settings?.contact?.email)) return;
  sendContactMail(mail, content.settings?.contact?.email, message, siteName())
    .then(() => (lastMailResult = { ok: true, at: new Date().toISOString() }))
    .catch((error) => {
      lastMailResult = { ok: false, at: new Date().toISOString(), error: String(error.message || error) };
      console.error("Contact email failed:", lastMailResult.error);
    });
});

// Email notifications for the contact form (see mail.js).
let lastMailResult = null;
const siteName = () => content.settings?.seo?.title || "the website";

app.get("/api/admin/mail", requireAdmin, (req, res) => res.json(publicMail(readJson(files.mail, DEFAULT_MAIL), lastMailResult)));

app.put("/api/admin/mail", requireAdmin, (req, res) => {
  const body = req.body || {};
  const old = { ...DEFAULT_MAIL, ...readJson(files.mail, DEFAULT_MAIL) };
  const to = String(body.to ?? "").trim().slice(0, 500);
  if (to && parseRecipients(to).length !== to.split(/[,;\s]+/).filter(Boolean).length) return res.status(400).json({ error: "One of the email addresses isn't valid." });
  const port = Number(body.port) || 465;
  if (port < 1 || port > 65535) return res.status(400).json({ error: "The port should be a number like 465 or 587." });
  const mail = {
    enabled: Boolean(body.enabled),
    to,
    host: String(body.host ?? "").trim().slice(0, 200),
    port,
    secure: Boolean(body.secure),
    user: String(body.user ?? "").trim().slice(0, 200),
    // Left empty = keep the saved password.
    pass: typeof body.pass === "string" && body.pass !== "" ? body.pass.slice(0, 500) : old.pass,
    from: String(body.from ?? "").trim().slice(0, 200),
  };
  if (mail.enabled && !mail.host) return res.status(400).json({ error: "Enter the SMTP server (host) to send emails." });
  writeJson(files.mail, mail);
  res.json(publicMail(mail, lastMailResult));
});

app.post("/api/admin/mail/test", requireAdmin, async (req, res) => {
  const mail = { ...DEFAULT_MAIL, ...readJson(files.mail, DEFAULT_MAIL) };
  const fallback = content.settings?.contact?.email;
  if (!mail.host) return res.status(400).json({ error: "Save the SMTP settings first." });
  if (!parseRecipients(mail.to || fallback).length) return res.status(400).json({ error: "Add an email address to send to." });
  try {
    await sendTestMail(mail, fallback, siteName());
    lastMailResult = { ok: true, at: new Date().toISOString() };
    res.json({ ok: true, to: parseRecipients(mail.to || fallback) });
  } catch (error) {
    lastMailResult = { ok: false, at: new Date().toISOString(), error: String(error.message || error) };
    res.status(400).json({ error: `Couldn't send: ${lastMailResult.error}` });
  }
});

// Visit counts for the dashboard reports: per day, the page views, new visitors
// (counted once a day by the browser), pages, traffic sources and device types.
// No cookies, IPs or other personal data are stored.
// Counts not written yet; merged into the file (not replacing it), so several copies of the server add up.
let unsaved = {};
const visitLimit = limiter(120, 60 * 1000);
let visitsTimer = null;
const KEEP_DAYS = 400;
// Pages and sources come from the browser, so each day keeps at most this many
// different ones; the rest are counted as "Other" (keeps the file small).
const MAX_KEYS = 200;
const bump = (counts, key, by = 1) => {
  const name = key in counts || Object.keys(counts).length < MAX_KEYS ? key : "Other";
  counts[name] = (counts[name] || 0) + by;
};
const emptyDay = () => ({ views: 0, visitors: 0, pages: {}, sources: {}, devices: {} });

/** Adds the counts of `from` into `into` (both day → counts). */
function addVisits(into, from) {
  for (const [day, counts] of Object.entries(from)) {
    const target = (into[day] ||= emptyDay());
    target.views += counts.views;
    target.visitors += counts.visitors;
    for (const key of ["pages", "sources", "devices"]) for (const [name, n] of Object.entries(counts[key])) bump(target[key], name, n);
  }
  return into;
}

app.post("/api/visit", (req, res) => {
  res.status(204).end();
  if (!visitLimit(req.ip)) return;
  const body = req.body || {};
  const page = String(body.path || "").split(/[?#]/)[0].slice(0, 120);
  if (!page.startsWith("/") || page.startsWith("/admin")) return;
  const device = ["mobile", "tablet", "desktop"].includes(body.device) ? body.device : "desktop";
  const day = new Date().toISOString().slice(0, 10);
  const today = (unsaved[day] ||= emptyDay());
  today.views++;
  bump(today.pages, page);
  bump(today.devices, device);
  if (body.newVisitor) today.visitors++;
  if (body.newSession) {
    let source = "Direct";
    const utm = String(body.utmSource || "").toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 40);
    if (utm) {
      source = utm;
    } else {
      try {
        const host = new URL(String(body.referrer || "")).hostname.replace(/^www\./, "");
        if (host && host !== req.hostname) source = host.slice(0, 80);
      } catch {
        /* no referrer */
      }
    }
    bump(today.sources, source);
  }
  // Written at most every 10 seconds; old days are dropped.
  visitsTimer ||= setTimeout(() => {
    visitsTimer = null;
    const visits = addVisits(readJson(files.visits, {}), unsaved);
    unsaved = {};
    const oldest = new Date(Date.now() - KEEP_DAYS * 86_400_000).toISOString().slice(0, 10);
    for (const key of Object.keys(visits)) if (key < oldest) delete visits[key];
    writeJson(files.visits, visits);
  }, 10_000);
});

app.get("/api/admin/visits", requireAdmin, (req, res) => res.json(addVisits(readJson(files.visits, {}), unsaved)));

// Auth.
app.post("/api/auth/login", (req, res) => {
  if (!loginLimit(req.ip)) return res.status(429).json({ error: "Too many attempts. Please wait a few minutes." });
  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  if (!admin || email !== admin.email || !passwordMatches(password, admin)) {
    return res.status(401).json({ error: "Incorrect ID or password." });
  }
  const remember = Boolean(req.body?.remember);
  const maxAge = remember ? 30 * 24 * 3600 * 1000 : 12 * 3600 * 1000;
  setSessionCookie(req, res, makeToken(admin.email, maxAge), remember ? maxAge : 0);
  res.json(publicAdmin());
});

app.post("/api/auth/logout", (req, res) => {
  res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  res.json({ ok: true });
});

app.get("/api/auth/me", (req, res) => {
  if (!readToken(cookies(req)[COOKIE])) return res.status(401).json({ error: "Not signed in." });
  res.json(publicAdmin());
});

// Admin: content.
app.get("/api/admin/content", requireAdmin, (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json(content);
});

const LIST_SECTIONS = ["services", "projects", "posts", "clients", "reviews", "achievements", "process", "faqs"];
const OBJECT_SECTIONS = ["settings"];

app.put("/api/admin/content/:section", requireAdmin, (req, res) => {
  const { section } = req.params;
  const value = req.body;
  if (LIST_SECTIONS.includes(section)) {
    if (!Array.isArray(value) || value.some((item) => !item || typeof item !== "object" || !item.id)) {
      return res.status(400).json({ error: "Expected a list of items, each with an id." });
    }
  } else if (OBJECT_SECTIONS.includes(section)) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return res.status(400).json({ error: "Expected an object." });
  } else {
    return res.status(404).json({ error: "Unknown section." });
  }
  // Saved in the current shape even if an older dashboard tab sent it.
  content = migrate({ ...content, [section]: value }, readJson(DEFAULT_CONTENT, {}));
  writeJson(files.content, content);
  res.json(content);
});

// Admin: uploads.
const ALLOWED_TYPES = /^(image\/(jpeg|png|webp|gif|svg\+xml|avif)|video\/(mp4|webm))$/;
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      const dir = path.join(UPLOAD_DIR, new Date().toISOString().slice(0, 7));
      fs.mkdirSync(dir, { recursive: true });
      done(null, dir);
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, "") || "";
      const base = path.basename(file.originalname, path.extname(file.originalname)).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) || "file";
      done(null, `${base}-${crypto.randomBytes(4).toString("hex")}${ext}`);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, done) => done(null, ALLOWED_TYPES.test(file.mimetype)),
});

const uploadUrl = (file) => `/uploads/${path.relative(UPLOAD_DIR, file.path).split(path.sep).join("/")}`;

app.post("/api/admin/upload", requireAdmin, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Only images (JPG, PNG, WebP, GIF, SVG, AVIF) and videos (MP4, WebM) can be uploaded." });
  res.json({ url: uploadUrl(req.file), size: req.file.size, type: req.file.mimetype });
});

// Reviews sent by visitors: kept apart from the site content until approved.
// Photos are optional, raster images only (no SVG from the public), max 3 MB.
const REVIEW_PHOTO_TYPES = /^image\/(jpeg|png|webp|avif)$/;
const REVIEW_DIR = path.join(UPLOAD_DIR, "reviews");
const reviewUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      fs.mkdirSync(REVIEW_DIR, { recursive: true });
      done(null, REVIEW_DIR);
    },
    filename: (req, file, done) => done(null, `${crypto.randomUUID()}${{ "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/avif": ".avif" }[file.mimetype]}`),
  }),
  limits: { fileSize: 3 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, done) => {
    if (REVIEW_PHOTO_TYPES.test(file.mimetype)) return done(null, true);
    req.badPhoto = true;
    done(null, false);
  },
});

const REVIEW_FIELDS = { name: 100, email: 200, role: 100, company: 120, quote: 1000 };

function removeUpload(url) {
  if (!url?.startsWith("/uploads/reviews/")) return;
  fs.rm(path.join(REVIEW_DIR, path.basename(url)), { force: true }, () => {});
}

app.post(
  "/api/reviews",
  (req, res, next) => (reviewLimit(req.ip) ? next() : res.status(429).json({ error: "Too many reviews. Please try again later." })),
  reviewUpload.single("avatar"),
  (req, res) => {
    const body = req.body || {};
    const review = { id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    for (const [field, max] of Object.entries(REVIEW_FIELDS)) review[field] = String(body[field] ?? "").trim().slice(0, max);
    review.rating = Math.round(Number(body.rating));
    review.avatar = req.file ? uploadUrl(req.file) : "";
    const problem = req.badPhoto
      ? "The photo must be a JPG, PNG, WebP or AVIF image."
      : !review.name
        ? "Please enter your name."
        : review.email && !/^\S+@\S+\.\S+$/.test(review.email)
          ? "Please enter a valid email."
          : !(review.rating >= 1 && review.rating <= 5)
            ? "Please choose a rating from 1 to 5 stars."
            : "";
    if (problem) {
      removeUpload(review.avatar);
      return res.status(400).json({ error: problem });
    }
    const pending = readJson(files.pendingReviews, []);
    pending.unshift(review);
    writeJson(files.pendingReviews, pending);
    res.json({ ok: true });
  },
);

app.get("/api/admin/reviews/pending", requireAdmin, (req, res) => res.json(readJson(files.pendingReviews, [])));

app.post("/api/admin/reviews/pending/:id/approve", requireAdmin, (req, res) => {
  const pending = readJson(files.pendingReviews, []);
  const review = pending.find((r) => r.id === req.params.id);
  if (!review) return res.status(404).json({ error: "Review not found." });
  const quote = !review.quote || /^[“"]/.test(review.quote) ? review.quote : `“${review.quote}”`;
  const published = { id: `review-${review.id.slice(0, 8)}`, active: true, createdAt: review.createdAt.slice(0, 10), company: review.company, quote, name: review.name, role: review.role, avatar: review.avatar, rating: review.rating };
  content = { ...content, reviews: [published, ...(content.reviews || [])] };
  writeJson(files.content, content);
  writeJson(files.pendingReviews, pending.filter((r) => r.id !== review.id));
  res.json(content);
});

app.delete("/api/admin/reviews/pending/:id", requireAdmin, (req, res) => {
  const pending = readJson(files.pendingReviews, []);
  removeUpload(pending.find((r) => r.id === req.params.id)?.avatar);
  writeJson(files.pendingReviews, pending.filter((r) => r.id !== req.params.id));
  res.json({ ok: true });
});

// Admin: messages.
app.get("/api/admin/messages", requireAdmin, (req, res) => res.json(readJson(files.messages, [])));

app.patch("/api/admin/messages/:id", requireAdmin, (req, res) => {
  const messages = readJson(files.messages, []);
  const message = messages.find((m) => m.id === req.params.id);
  if (!message) return res.status(404).json({ error: "Message not found." });
  if (typeof req.body?.read === "boolean") message.read = req.body.read;
  writeJson(files.messages, messages);
  res.json(message);
});

app.delete("/api/admin/messages/:id", requireAdmin, (req, res) => {
  const messages = readJson(files.messages, []);
  writeJson(files.messages, messages.filter((m) => m.id !== req.params.id));
  res.json({ ok: true });
});

// Admin: change password.
app.post("/api/admin/password", requireAdmin, (req, res) => {
  const current = String(req.body?.current || "");
  const next = String(req.body?.next || "");
  if (!loginLimit(req.ip)) return res.status(429).json({ error: "Too many attempts. Please wait a few minutes." });
  if (!passwordMatches(current, admin)) return res.status(400).json({ error: "Current password is incorrect." });
  if (next.length < 8) return res.status(400).json({ error: "New password must be at least 8 characters." });
  admin = { ...admin, ...hashPassword(next) };
  writeJson(files.admin, admin);
  res.json({ ok: true });
});

app.put("/api/admin/profile", requireAdmin, (req, res) => {
  const name = String(req.body?.name || "").trim().slice(0, 80);
  const avatar = String(req.body?.avatar || "").trim();
  if (!name) return res.status(400).json({ error: "Please enter your name." });
  if (avatar && !avatar.startsWith("/uploads/")) return res.status(400).json({ error: "Upload the photo from your computer." });
  admin = { ...admin, name, avatar };
  writeJson(files.admin, admin);
  res.json(publicAdmin());
});

app.use("/api", (req, res) => res.status(404).json({ error: "Not found." }));

// Files.
app.use("/uploads", express.static(UPLOAD_DIR, { maxAge: "30d", fallthrough: false }));
app.use(express.static(DIST_DIR, { index: false, maxAge: "1d" }));

// Every other GET is a site page: send index.html with the content embedded.
const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** The address visitors use, e.g. https://designops.agency (the admin host maps to the website). */
const siteOrigin = (req) => `${req.protocol}://${ADMIN_HOST && req.hostname === ADMIN_HOST ? req.get("host").replace(/^admin\./, "") : req.get("host")}`;

app.get("*", (req, res) => {
  const indexFile = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexFile)) return res.status(503).send("Site not built yet. Run: npm run build");
  const isAdmin = /^\/admin(\/|$)/.test(req.path);
  const shown = publicContent();

  // One address per page: no trailing slash, and the old single case-study URL points at the first project.
  if (!isAdmin && req.path.length > 1 && req.path.endsWith("/")) return res.redirect(301, req.originalUrl.replace(/\/+(?=\?|$)/, ""));
  if (req.path === "/work/case-study" && shown.projects[0]) return res.redirect(301, `/work/${shown.projects[0].slug}`);

  const page = isAdmin ? null : pageSeo(shown, req.path, siteOrigin(req));
  const title = page ? page.title : "Admin · DesignOps";
  const description = page ? page.description : "";
  const data = JSON.stringify(shown).replace(/</g, "\\u003c");
  let html = fs.readFileSync(indexFile, "utf8");
  // Replacer functions, so a "$" in the content or pasted code is kept as it is.
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*/, (_, start) => `${start}${escapeHtml(title)}`);
  html = html.replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*/g, (_, start) => `${start}${escapeHtml(description)}`);
  // Browser-tab icon: the website's or the dashboard's (Website Settings → Favicons).
  const favicon = (isAdmin ? content.settings?.favicons?.admin : content.settings?.favicons?.site) || "/favicon.svg";
  html = html.replace(/<link rel="icon"[^>]*>/, () => `<link rel="icon" href="${escapeHtml(favicon)}" />\n<link rel="apple-touch-icon" href="${escapeHtml(favicon)}" />`);
  html = html.replace("</head>", () => `<script>window.__SITE_CONTENT__=${data}</script></head>`);
  if (page) {
    html = html.replace("</head>", () => `${seoHead(page, shown)}\n</head>`);
    // Marketing tags (GTM, Meta Pixel) on the website only, never in the dashboard.
    const tracking = content.settings?.tracking;
    html = html.replace("</head>", () => `${trackingHead(tracking)}\n</head>`);
    html = html.replace(/<body([^>]*)>/, (body) => `${body}\n${trackingBody(tracking)}`);
  }
  res.setHeader("Cache-Control", "no-cache");
  res.status(page?.status || 200).type("html").send(html);
});

app.use((err, req, res, next) => {
  if (err?.code === "LIMIT_FILE_SIZE") return res.status(413).json({ error: req.path === "/api/reviews" ? "The photo is too large (max 3 MB)." : "File is too large (max 100 MB)." });
  const status = err?.status || err?.statusCode;
  if (status >= 400 && status < 500) return res.status(status === 403 ? 404 : status).send("Not found");
  console.error(err);
  res.status(500).json({ error: "Server error." });
});

app.listen(PORT, () => console.log(`DesignOps server running on http://localhost:${PORT}`));

// ---------------------------------------------------------------- helpers

/** Minimal .env loader (KEY=value per line, # comments), without overriding real env vars. */
function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || line.trim().startsWith("#")) continue;
    const value = match[2].replace(/^(['"])(.*)\1$/, "$2");
    if (process.env[match[1]] === undefined) process.env[match[1]] = value;
  }
}
