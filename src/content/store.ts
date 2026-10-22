import { useSyncExternalStore } from "react";
import type { Content } from "./types";

// The site's editable content. On the real server it is embedded in the page
// (window.__SITE_CONTENT__); otherwise it is fetched from /api/content, and if
// there is no server at all (e.g. a static preview) the bundled defaults are used.

declare global {
  interface Window {
    __SITE_CONTENT__?: Content;
  }
}

let current: Content | null = typeof window !== "undefined" ? window.__SITE_CONTENT__ ?? null : null;
const listeners = new Set<() => void>();

export async function loadContent(): Promise<Content> {
  if (current) return current;
  try {
    const response = await fetch("/api/content", { headers: { Accept: "application/json" } });
    if (!response.ok || !response.headers.get("content-type")?.includes("json")) throw new Error("no api");
    current = (await response.json()) as Content;
  } catch {
    current = (await import("./defaultContent.json")).default as unknown as Content;
  }
  return current;
}

/** Content for code outside React; only valid after loadContent() resolved. */
export function getContent(): Content {
  if (!current) throw new Error("Content not loaded yet");
  return current;
}

/** Replaces the content (after the admin saves) and re-renders the site. */
export function setContent(next: Content) {
  current = next;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useContent(): Content {
  return useSyncExternalStore(subscribe, getContent, getContent);
}
