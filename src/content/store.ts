import { useSyncExternalStore } from "react";
import { migrate } from "../../server/migrate.js";
import type { Content } from "./types";

// The site's editable content. On the real server it is embedded in the page
// (window.__SITE_CONTENT__); otherwise it is fetched from /api/content, and if
// there is no server at all (e.g. a static preview) the bundled defaults are used.
// Content from the server is brought up to the current shape first (see
// server/migrate.js), so an older saved file can't leave a page without a field.
//
// The website only sees active services, projects, posts and reviews; the admin
// dashboard loads and edits everything.

declare global {
  interface Window {
    __SITE_CONTENT__?: Content;
  }
}

let current: Content | null = null;
let defaults: Content | null = null;
let adminMode = false;
const listeners = new Set<() => void>();

const upToDate = (content: Content) => (defaults ? migrate(content, defaults) : content);

export async function loadContent(): Promise<Content> {
  if (current) return current;
  const loadDefaults = import("./defaultContent.json").then((module) => (defaults = module.default as unknown as Content));
  let loaded = typeof window !== "undefined" ? window.__SITE_CONTENT__ ?? null : null;
  if (!loaded) {
    try {
      const response = await fetch("/api/content", { headers: { Accept: "application/json" } });
      if (!response.ok || !response.headers.get("content-type")?.includes("json")) throw new Error("no api");
      loaded = (await response.json()) as Content;
    } catch {
      loaded = null;
    }
  }
  await loadDefaults;
  current = upToDate(loaded ?? defaults!);
  return current;
}

/** The dashboard sees inactive items too; call before rendering it. */
export function enableAdminMode() {
  adminMode = true;
}

const shown = <T extends { active?: boolean }>(items: T[]) => items.filter((item) => item.active !== false);

// Cached so React gets the same object until the content changes.
let publicFor: Content | null = null;
let publicView: Content | null = null;

/** Content for code outside React; only valid after loadContent() resolved. */
export function getContent(): Content {
  if (!current) throw new Error("Content not loaded yet");
  if (adminMode) return current;
  if (publicFor !== current) {
    publicFor = current;
    publicView = { ...current, services: shown(current.services), projects: shown(current.projects), posts: shown(current.posts), reviews: shown(current.reviews) };
  }
  return publicView!;
}

/** Replaces the content (after the admin saves) and re-renders the site. */
export function setContent(next: Content) {
  current = upToDate(next);
  listeners.forEach((listener) => listener());
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useContent(): Content {
  return useSyncExternalStore(subscribe, getContent, getContent);
}
