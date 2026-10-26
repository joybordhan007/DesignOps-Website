// Builds the files to upload to the hosting (see DEPLOY.md):
//
//   deploy/designops-app.zip   the program: built website, server, minimal package.json
//   deploy/designops-data.zip  your content and uploaded images from this computer
//                              (upload only the first time, or it replaces the live content)
//
// Run: npm run deploy

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "deploy");
const app = path.join(out, "designops-app");
const data = path.join(out, "designops-data");

const copy = (from, to) => fs.cpSync(path.join(root, from), path.join(to), { recursive: true });

console.log("1/4 Building the website…");
execSync("npx vite build", { cwd: root, stdio: "inherit" });

console.log("2/4 Collecting the program files…");
fs.rmSync(out, { recursive: true, force: true });
copy("dist", path.join(app, "dist"));
// Every server module (so a newly added one is never left out), plus the docs and example settings.
const serverFiles = fs.readdirSync(path.join(root, "server")).filter((file) => file.endsWith(".js"));
for (const file of [...serverFiles, "README.md", ".env.example"]) copy(`server/${file}`, path.join(app, "server", file));
copy("src/content/defaultContent.json", path.join(app, "src/content/defaultContent.json"));

// Only what the server needs, so "Run NPM Install" on the hosting is quick and small.
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const runtime = Object.fromEntries(["express", "multer", "nodemailer"].map((name) => [name, pkg.dependencies[name]]));
fs.writeFileSync(
  path.join(app, "package.json"),
  JSON.stringify({ name: "designops-site", private: true, type: "module", main: "server/index.js", scripts: { start: "node server/index.js" }, engines: { node: ">=18" }, dependencies: runtime }, null, 2) + "\n",
);

console.log("3/4 Collecting your content and uploads…");
// Not copied: admin.json (your local password), mail.json (email settings and password),
// messages, reviews waiting, visit counts and the session secret.
const localContent = path.join(root, "server/data/content.json");
if (fs.existsSync(localContent)) copy("server/data/content.json", path.join(data, "server/data/content.json"));
if (fs.existsSync(path.join(root, "server/uploads"))) copy("server/uploads", path.join(data, "server/uploads"));

console.log("4/4 Zipping…");
function zip(folder, file) {
  const target = path.join(out, file);
  if (!fs.existsSync(folder)) return console.log(`   (nothing for ${file})`);
  // Windows 10+ ships bsdtar, which writes zip files; elsewhere use zip.
  if (process.platform === "win32") execSync(`"${path.join(process.env.SystemRoot || "C:\\Windows", "System32", "tar.exe")}" -a -c -f "${target}" -C "${folder}" .`);
  else execSync(`cd "${folder}" && zip -qr "${target}" .`);
  console.log(`   ${path.relative(root, target)}  (${(fs.statSync(target).size / 1024 / 1024).toFixed(1)} MB)`);
}
zip(app, "designops-app.zip");
zip(data, "designops-data.zip");
console.log("\nDone. Follow DEPLOY.md to upload these to the hosting.");
