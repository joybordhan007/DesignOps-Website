import type { SocialPlatform } from "@/content/types";

// Social network icons for the footers and the dashboard (currentColor, so the
// footer's hover colour applies). Add a network here and to SocialPlatform in
// src/content/types.ts to offer it in the dashboard.

type Glyph = { viewBox?: string; fill?: string[]; stroke?: string[]; circles?: [number, number, number][] };

const GLYPHS: Record<SocialPlatform, Glyph> = {
  linkedin: {
    viewBox: "0 0 19.76 19.72",
    fill: [
      "M0.32 6.55H4.42V19.72H0.32V6.55ZM2.37 0C3.68 0 4.75 1.06 4.75 2.38C4.75 3.69 3.68 4.75 2.37 4.75C1.06 4.75 0 3.69 0 2.38C0 1.06 1.06 0 2.37 0Z",
      "M6.99 6.55H10.92V8.35H10.97C11.52 7.31 12.85 6.22 14.85 6.22C18.99 6.22 19.76 8.95 19.76 12.5V19.72H15.67V13.32C15.67 11.79 15.64 9.82 13.54 9.82C11.41 9.82 11.08 11.49 11.08 13.21V19.72H6.99V6.55Z",
    ],
  },
  facebook: {
    viewBox: "0 0 10.25 19.76",
    fill: ["M6.66 19.76V10.76H9.69L10.15 7.24H6.66V4.99C6.66 3.98 6.94 3.28 8.4 3.28H10.25V0.14C9.35 0.04 8.45 0 7.54 0C4.86 0 3.03 1.63 3.03 4.64V7.24H0V10.76H3.03V19.76H6.66Z"],
  },
  instagram: { stroke: ["M7 2.5h10A4.5 4.5 0 0 1 21.5 7v10a4.5 4.5 0 0 1-4.5 4.5H7A4.5 4.5 0 0 1 2.5 17V7A4.5 4.5 0 0 1 7 2.5z"], circles: [[12, 12, 4.2]], fill: ["M17.4 5.4a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z"] },
  x: { fill: ["M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"] },
  youtube: {
    fill: ["M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8A26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3-5.2 3z"],
  },
  tiktok: { fill: ["M16.6 2.5c.3 2.3 1.7 3.9 4 4.1v3.2c-1.5 0-2.9-.4-4-1.2v6.3a6.2 6.2 0 1 1-6.2-6.2v3.3a2.9 2.9 0 1 0 2.9 2.9V2.5h3.3z"] },
  behance: { stroke: ["M2.5 6.5h5a2.4 2.4 0 0 1 0 4.8h-5V6.5zm0 4.8h5.6a2.9 2.9 0 0 1 0 5.8H2.5v-5.8z", "M15 7.5h5", "M14.6 14h6.6a3.3 3.3 0 1 0-1 2.4"] },
  dribbble: { circles: [[12, 12, 9.5]], stroke: ["M2.7 10c6.2.6 11.3-1 15.6-5.4", "M5.2 18.8c3.1-4.8 8.3-6.6 16.2-5.2", "M8.4 3.2c3.2 4.2 5.6 9.7 6.9 17.8"] },
  github: {
    fill: [
      "M12 1.5a10.5 10.5 0 0 0-3.3 20.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.7 0-.6 0-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.3.1-2.8 0 0 .9-.3 2.9 1.1a9.8 9.8 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.7 1.1 1.7 1.1 2.8 0 4-2.5 4.9-4.8 5.2.4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A10.5 10.5 0 0 0 12 1.5z",
    ],
  },
  pinterest: { circles: [[12, 12, 9.5]], stroke: ["M10.6 21.3l2-8.3", "M9 13.5a4 4 0 0 1-.6-2.2 4 4 0 1 1 4.5 4c-.7 0-1.3-.2-1.8-.6"] },
  whatsapp: {
    stroke: ["M3.2 20.8l1.4-4.4a8.8 8.8 0 1 1 3.4 3.4l-4.8 1z"],
    fill: ["M9.1 7.6c.3 0 .5 0 .7.5l.8 1.8c.1.3 0 .5-.1.7l-.6.7c.6 1.2 1.6 2.2 2.8 2.8l.7-.7c.2-.2.4-.2.7-.1l1.8.8c.4.2.5.4.4.8-.2.9-1 1.7-2 1.7-3.4 0-6.6-3.2-6.6-6.6 0-1 .8-1.8 1.7-2l.4-.4z"],
  },
  telegram: { stroke: ["M21.5 3.5 2.5 11l6.2 2.4M21.5 3.5l-3 16.5-6.6-4.7M21.5 3.5 8.7 13.4l.6 6.1 2.6-4.2"] },
  threads: {
    stroke: ["M17 11.3c-.5-2.7-2.4-3.8-4.6-3.8-2.6 0-4.3 1.7-4.3 4.2 0 2.6 1.8 4.1 4 4.1 2.5 0 4-1.8 4-4.6M16.2 11.6c2.6.8 4 2.6 3.4 5.1-.8 3-3.8 4.8-7.5 4.8-5.3 0-8.6-3.8-8.6-9.5S6.8 2.5 12.1 2.5c4.1 0 6.8 1.9 7.9 5.2"],
  },
  medium: { fill: ["M7 6a6 6 0 1 1 0 12A6 6 0 0 1 7 6zm9.6.6c1.6 0 2.9 2.4 2.9 5.4s-1.3 5.4-2.9 5.4-2.9-2.4-2.9-5.4 1.3-5.4 2.9-5.4zM22 7.3c.6 0 1 2.1 1 4.7s-.4 4.7-1 4.7-1-2.1-1-4.7.4-4.7 1-4.7z"] },
  website: { circles: [[12, 12, 9.5]], stroke: ["M2.5 12h19M12 2.5c2.8 2.6 4 6 4 9.5s-1.2 6.9-4 9.5M12 2.5c-2.8 2.6-4 6-4 9.5s1.2 6.9 4 9.5"] },
};

/** Networks offered in the dashboard, in menu order. */
export const SOCIAL_PLATFORMS: { value: SocialPlatform; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "x", label: "X (Twitter)" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "behance", label: "Behance" },
  { value: "dribbble", label: "Dribbble" },
  { value: "github", label: "GitHub" },
  { value: "pinterest", label: "Pinterest" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "threads", label: "Threads" },
  { value: "medium", label: "Medium" },
  { value: "website", label: "Other website" },
];

export const socialLabel = (platform: SocialPlatform) => SOCIAL_PLATFORMS.find((p) => p.value === platform)?.label ?? "Website";

export default function SocialIcon({ platform, size = 20, className }: { platform: SocialPlatform; size?: number; className?: string }) {
  const glyph = GLYPHS[platform] ?? GLYPHS.website;
  return (
    <svg width={size} height={size} viewBox={glyph.viewBox ?? "0 0 24 24"} className={className} aria-hidden="true">
      {glyph.fill?.map((d, i) => <path key={`f${i}`} d={d} fill="currentColor" fillRule="evenodd" />)}
      <g fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {glyph.stroke?.map((d, i) => <path key={`s${i}`} d={d} />)}
        {glyph.circles?.map(([cx, cy, r], i) => <circle key={`c${i}`} cx={cx} cy={cy} r={r} />)}
      </g>
    </svg>
  );
}
