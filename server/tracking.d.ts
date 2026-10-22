import type { Tracking } from "../src/content/types";

/** See tracking.js. */
export function trackingIds(tracking: Tracking): { gtmId: string; metaPixelId: string };
export function trackingIdProblems(tracking: Tracking): { gtm: boolean; meta: boolean; verification: boolean };
export function trackingHead(tracking: Tracking): string;
export function trackingBody(tracking: Tracking): string;
