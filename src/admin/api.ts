import { setContent } from "@/content/store";
import type { Content, Message, PendingReview } from "@/content/types";

// Calls to the admin API (server/index.js).

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      credentials: "same-origin",
      ...init,
      headers: { Accept: "application/json", ...(init.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}), ...init.headers },
    });
  } catch {
    throw new ApiError("Can't reach the server. Is it running?", 0);
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(data?.error || (response.status === 404 ? "The admin server is not running." : `Request failed (${response.status}).`), response.status);
  return data as T;
}

export type AdminUser = {
  /** Login ID; can't be changed from the dashboard. */
  email: string;
  name: string;
  /** Uploaded photo URL, or "" to show initials. */
  avatar: string;
};

/** One day of website visits (server/index.js, /api/visit). */
export type DayVisits = {
  views: number;
  visitors: number;
  pages: Record<string, number>;
  sources: Record<string, number>;
  devices: Record<string, number>;
};

/** Email notification settings (server/mail.js); the password is never sent back. */
export type MailSettings = {
  enabled: boolean;
  /** Comma-separated; empty = the contact email from Website Settings. */
  to: string;
  host: string;
  port: number;
  secure: boolean;
  user: string;
  from: string;
  passSet: boolean;
  lastResult: { ok: boolean; at: string; error?: string } | null;
};

export const api = {
  me: () => request<AdminUser>("/api/auth/me"),
  login: (email: string, password: string, remember: boolean) =>
    request<AdminUser>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password, remember }) }),
  logout: () => request<{ ok: true }>("/api/auth/logout", { method: "POST" }),
  updateProfile: (profile: Pick<AdminUser, "name" | "avatar">) => request<AdminUser>("/api/admin/profile", { method: "PUT", body: JSON.stringify(profile) }),
  changePassword: (current: string, next: string) => request<{ ok: true }>("/api/admin/password", { method: "POST", body: JSON.stringify({ current, next }) }),

  /** Everything, including inactive items the website doesn't show. */
  async loadContent() {
    const content = await request<Content>("/api/admin/content");
    setContent(content);
    return content;
  },

  /** Saves one section of the site content and updates the live site data. */
  async save<K extends keyof Content>(section: K, value: Content[K]) {
    const content = await request<Content>(`/api/admin/content/${section}`, { method: "PUT", body: JSON.stringify(value) });
    setContent(content);
    return content;
  },

  messages: () => request<Message[]>("/api/admin/messages"),
  markMessage: (id: string, read: boolean) => request<Message>(`/api/admin/messages/${id}`, { method: "PATCH", body: JSON.stringify({ read }) }),
  deleteMessage: (id: string) => request<{ ok: true }>(`/api/admin/messages/${id}`, { method: "DELETE" }),

  /** Visit counts per day (YYYY-MM-DD), for the dashboard reports. */
  visits: () => request<Record<string, DayVisits>>("/api/admin/visits"),

  mail: () => request<MailSettings>("/api/admin/mail"),
  /** `pass` empty keeps the saved password. */
  saveMail: (mail: Omit<MailSettings, "passSet" | "lastResult"> & { pass: string }) => request<MailSettings>("/api/admin/mail", { method: "PUT", body: JSON.stringify(mail) }),
  testMail: () => request<{ ok: true; to: string[] }>("/api/admin/mail/test", { method: "POST" }),

  pendingReviews: () => request<PendingReview[]>("/api/admin/reviews/pending"),
  /** Publishes a pending review on the website. */
  async approveReview(id: string) {
    setContent(await request<Content>(`/api/admin/reviews/pending/${id}/approve`, { method: "POST" }));
  },
  rejectReview: (id: string) => request<{ ok: true }>(`/api/admin/reviews/pending/${id}`, { method: "DELETE" }),
};

/** Uploads an image or video and reports progress (0-1). Resolves to its public URL. */
export function uploadFile(file: File, onProgress?: (fraction: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/upload");
    xhr.upload.onprogress = (event) => event.lengthComputable && onProgress?.(event.loaded / event.total);
    xhr.onload = () => {
      let data: { url?: string; error?: string } = {};
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        /* not JSON */
      }
      if (xhr.status >= 200 && xhr.status < 300 && data.url) resolve(data.url);
      else reject(new ApiError(data.error || `Upload failed (${xhr.status}).`, xhr.status));
    };
    xhr.onerror = () => reject(new ApiError("Upload failed: can't reach the server.", 0));
    const form = new FormData();
    form.append("file", file);
    xhr.send(form);
  });
}
