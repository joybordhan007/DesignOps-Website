// Email for contact form messages. The sending account (SMTP) and the
// recipients are set in the dashboard (Website Settings → Email notifications)
// and kept in server/data/mail.json, apart from the site content, so the
// password never reaches the website. Messages are stored for the dashboard
// whether or not the email goes out.

import nodemailer from "nodemailer";

/** Splits "a@x.com, b@y.com" into valid addresses. */
export const parseRecipients = (value) =>
  String(value || "")
    .split(/[,;\s]+/)
    .map((address) => address.trim())
    .filter((address) => /^\S+@\S+\.\S+$/.test(address));

export const DEFAULT_MAIL = { enabled: false, to: "", host: "", port: 465, secure: true, user: "", pass: "", from: "" };

/** What the dashboard may see: everything but the password. */
export const publicMail = (mail, lastResult) => {
  const { pass, ...rest } = { ...DEFAULT_MAIL, ...mail };
  return { ...rest, passSet: Boolean(pass), lastResult };
};

/** Ready to send: switched on, an SMTP server, and somewhere to send to. */
export const mailReady = (mail, fallbackTo) => Boolean(mail?.enabled && mail.host && parseRecipients(mail.to || fallbackTo).length);

function transport(mail) {
  return nodemailer.createTransport({
    host: mail.host,
    port: Number(mail.port) || 465,
    secure: Boolean(mail.secure),
    auth: mail.user ? { user: mail.user, pass: mail.pass } : undefined,
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
  });
}

const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const FIELDS = [
  ["Name", (m) => `${m.first_name} ${m.last_name}`.trim()],
  ["Email", (m) => m.email],
  ["Phone", (m) => m.phone],
  ["Company", (m) => m.company],
  ["Preferred time", (m) => m.preferred_time],
];

/** Sends one contact form message; resolves when delivered, rejects with the SMTP error. */
export function sendContactMail(mail, fallbackTo, message, siteName) {
  const rows = FIELDS.map(([label, get]) => [label, get(message)]).filter(([, value]) => value);
  const name = `${message.first_name} ${message.last_name}`.trim() || message.email;
  const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", message.message || "(no message)"].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#222;max-width:600px">
<h2 style="font-size:20px;margin:0 0 16px">New inquiry from ${escapeHtml(name)}</h2>
<table style="border-collapse:collapse;margin-bottom:16px">${rows
    .map(([label, value]) => `<tr><td style="color:#707070;padding:4px 16px 4px 0;vertical-align:top">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`)
    .join("")}</table>
<div style="background:#f5f5f5;border-radius:8px;padding:16px;white-space:pre-wrap">${escapeHtml(message.message || "(no message)")}</div>
<p style="color:#9a9a9a;font-size:12px;margin-top:16px">Sent from the contact form on ${escapeHtml(siteName)}. Reply to this email to answer ${escapeHtml(name)}.</p>
</div>`;
  return transport(mail).sendMail({
    from: mail.from || mail.user,
    to: parseRecipients(mail.to || fallbackTo),
    replyTo: message.email,
    subject: `New inquiry from ${name}`,
    text,
    html,
  });
}

/** A short email to check the settings work. */
export function sendTestMail(mail, fallbackTo, siteName) {
  return transport(mail).sendMail({
    from: mail.from || mail.user,
    to: parseRecipients(mail.to || fallbackTo),
    subject: `Test email from ${siteName}`,
    text: `Email notifications are working. Contact form messages from ${siteName} will arrive at this address.`,
  });
}
