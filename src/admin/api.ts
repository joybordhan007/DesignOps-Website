import { setContent } from "@/content/store";
import type { Content, Message } from "@/content/types";

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

export type AdminUser = { email: string; name: string };

export const api = {
  me: () => request<AdminUser>("/api/auth/me"),
  login: (email: string, password: string, remember: boolean) =>
    request<AdminUser>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password, remember }) }),
  logout: () => request<{ ok: true }>("/api/auth/logout", { method: "POST" }),
  changePassword: (current: string, next: string) => request<{ ok: true }>("/api/admin/password", { method: "POST", body: JSON.stringify({ current, next }) }),

  /** Saves one section of the site content and updates the live site data. */
  async save<K extends keyof Content>(section: K, value: Content[K]) {
    const content = await request<Content>(`/api/admin/content/${section}`, { method: "PUT", body: JSON.stringify(value) });
    setContent(content);
    return content;
  },

  messages: () => request<Message[]>("/api/admin/messages"),
  markMessage: (id: string, read: boolean) => request<Message>(`/api/admin/messages/${id}`, { method: "PATCH", body: JSON.stringify({ read }) }),
  deleteMessage: (id: string) => request<{ ok: true }>(`/api/admin/messages/${id}`, { method: "DELETE" }),
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
