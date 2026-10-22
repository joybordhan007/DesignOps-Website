import { trackingBody, trackingHead } from "../../server/tracking.js";
import type { Tracking } from "@/content/types";

// Sends page views and conversions to Google Tag Manager and the Meta Pixel,
// as set up under "Tracking & Analytics" in the dashboard. Only switched-on
// tools have their tags on the page, so the others simply aren't there to call.
//
// The server already puts the tags into the page (server/tracking.js); without
// the server (dev or static preview) installTracking() adds them here instead.
//
// GTM receives these dataLayer events, to use as Custom Event triggers:
//   page_view (path, title) · generate_lead · review_submitted · contact_click

declare global {
  interface Window {
    __DO_TRACKING__?: boolean;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

/** Adds HTML with working <script> tags (scripts set through innerHTML never run). */
function addHtml(parent: HTMLElement, html: string, atStart = false) {
  if (!html) return;
  const template = document.createElement("template");
  template.innerHTML = html;
  const nodes = Array.from(template.content.childNodes).map((node) => {
    if (!(node instanceof HTMLScriptElement)) return node;
    const script = document.createElement("script");
    for (const { name, value } of Array.from(node.attributes)) script.setAttribute(name, value);
    script.text = node.text;
    return script;
  });
  if (atStart) parent.prepend(...nodes);
  else parent.append(...nodes);
}

export function installTracking(tracking: Tracking) {
  if (window.__DO_TRACKING__) return;
  addHtml(document.head, trackingHead(tracking));
  addHtml(document.body, trackingBody(tracking), true);
}

/** Call after the website switches pages without a reload (the first page view is sent by the tags). */
export function trackPageView(path: string) {
  window.dataLayer?.push({ event: "page_view", page_path: path, page_title: document.title, page_location: window.location.href });
  window.fbq?.("track", "PageView");
}

const EVENTS = {
  lead: { gtm: "generate_lead", meta: ["track", "Lead"] },
  review: { gtm: "review_submitted", meta: ["trackCustom", "ReviewSubmitted"] },
  contactClick: { gtm: "contact_click", meta: ["track", "Contact"] },
} as const;

/** A conversion: contact form sent, review sent, phone/email/WhatsApp link clicked. */
export function trackEvent(name: keyof typeof EVENTS, data: Record<string, string> = {}) {
  const event = EVENTS[name];
  window.dataLayer?.push({ event: event.gtm, ...data });
  window.fbq?.(event.meta[0], event.meta[1], data);
}
