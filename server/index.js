// DesignOps website server.
//
// - Serves the built site (dist/) with the editable content embedded in the
//   page, so it renders without waiting for an API call.
// - /api/content           public: everything the site shows
// - /api/contact           public: stores contact-form messages
// - /api/auth/*            admin login / logout / session
// - /api/admin/*           admin: save content, upload files, read messages
//
// Data lives in JSON files under DATA_DIR (default server/data) and uploads in
// UPLOAD_DIR (default server/uploads). See server/README.md for setup.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import multer from "multer";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

loadEnvFile(path.join(here, ".env"));

const PORT = Number(process.env.PORT || 3001);
const DATA_DIR = path.resolve(root, process.env.DATA_DIR || "server/data");
const UPLOAD_DIR = path.resolve(root, process.env.UPLOAD_DIR || "server/uploads");
const DIST_DIR = path.resolve(root, process.env.DIST_DIR || "dist");
const DEFAULT_CONTENT = path.join(root, "src/content/defaultContent.json");
const COOKIE = "do_admin";

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---------------------------------------------------------------- storage

const files = {
  content: path.join(DATA_DIR, "content.json"),
  messages: path.join(DATA_DIR, "messages.json"),
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
}

if (!fs.existsSync(files.content)) {
  fs.copyFileSync(DEFAULT_CONTENT, files.content);
  console.log("Created", files.content, "from the default site content.");
}

let content = readJson(files.content, null);
if (!content) throw new Error(`Could not read ${files.content}`);

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

let admin = readJson(files.admin, null);
if (!admin && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
  admin = { email: process.env.ADMIN_EMAIL.trim().toLowerCase(), name: process.env.ADMIN_NAME || "Admin", ...hashPassword(process.env.ADMIN_PASSWORD) };
  writeJson(files.admin, admin);
  console.log("Created the admin account for", admin.email);
}
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
    return recent.length <= limit;
  };
}
const loginLimit = limiter(8, 10 * 60 * 1000);
const contactLimit = limiter(5, 10 * 60 * 1000);

// ---------------------------------------------------------------- app

const app = express();
app.set("trust proxy", true);
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
app.use(express.json({ limit: "8mb" }));

// Public content (everything the site renders).
app.get("/api/content", (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.json(content);
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
});

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
  res.json({ email: admin.email, name: admin.name });
});

app.post("/api/auth/logout", (req, res) => {
  res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  res.json({ ok: true });
});

app.get("/api/auth/me", (req, res) => {
  if (!readToken(cookies(req)[COOKIE])) return res.status(401).json({ error: "Not signed in." });
  res.json({ email: admin.email, name: admin.name });
});

// Admin: content.
const LIST_SECTIONS = ["services", "projects", "posts", "clients", "reviews", "process", "faqs"];
const OBJECT_SECTIONS = ["settings", "achievements"];

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
  content = { ...content, [section]: value };
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

app.post("/api/admin/upload", requireAdmin, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Only images (JPG, PNG, WebP, GIF, SVG, AVIF) and videos (MP4, WebM) can be uploaded." });
  const rel = path.relative(UPLOAD_DIR, req.file.path).split(path.sep).join("/");
  res.json({ url: `/uploads/${rel}`, size: req.file.size, type: req.file.mimetype });
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
  if (!passwordMatches(current, admin)) return res.status(400).json({ error: "Current password is incorrect." });
  if (next.length < 8) return res.status(400).json({ error: "New password must be at least 8 characters." });
  admin = { ...admin, ...hashPassword(next) };
  writeJson(files.admin, admin);
  res.json({ ok: true });
});

app.use("/api", (req, res) => res.status(404).json({ error: "Not found." }));

// Files.
app.use("/uploads", express.static(UPLOAD_DIR, { maxAge: "30d", fallthrough: false }));
app.use(express.static(DIST_DIR, { index: false, maxAge: "1d" }));

// Every other GET is a site page: send index.html with the content embedded.
const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
app.get("*", (req, res) => {
  const indexFile = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexFile)) return res.status(503).send("Site not built yet. Run: npm run build");
  const seo = content.settings?.seo || {};
  const data = JSON.stringify(content).replace(/</g, "\\u003c");
  let html = fs.readFileSync(indexFile, "utf8");
  if (seo.title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
    html = html.replace(/(<meta property="og:title" content=")[^"]*/, `$1${escapeHtml(seo.title)}`);
  }
  if (seo.description) html = html.replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*/g, `$1${escapeHtml(seo.description)}`);
  html = html.replace("</head>", `<script>window.__SITE_CONTENT__=${data}</script></head>`);
  res.setHeader("Cache-Control", "no-cache");
  res.type("html").send(html);
});

app.use((err, req, res, next) => {
  if (err?.code === "LIMIT_FILE_SIZE") return res.status(413).json({ error: "File is too large (max 100 MB)." });
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
