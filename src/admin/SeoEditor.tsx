import { useContent } from "@/content/store";
import type { PageSeo } from "@/content/types";
import { inputClass } from "./fields";

// Search-engine title and description for one page, with a live preview of how
// Google shows it and length counters. Empty fields fall back to the page's own
// title and summary, which the preview shows in grey.

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

const plain = (text: string) => text.replace(/\*/g, "").replace(/\s+/g, " ").trim();

function Counter({ length, max }: { length: number; max: number }) {
  const tone = !length ? "text-[#9a9a9a]" : length > max ? "text-[#c62828]" : length < max * 0.5 ? "text-[#8a5300]" : "text-[#1a7f45]";
  return (
    <span className={`font-['Inter:Medium'] font-medium text-[12px] ${tone}`}>
      {length} / {max}
    </span>
  );
}

/** How the page looks in Google's results. */
export function SerpPreview({ url, title, description }: { url: string; title: string; description: string }) {
  const shortTitle = title.length > TITLE_MAX + 5 ? `${title.slice(0, TITLE_MAX + 2)}…` : title;
  const shortDescription = description.length > DESCRIPTION_MAX ? `${description.slice(0, DESCRIPTION_MAX - 3)}…` : description;
  return (
    <div className="bg-white border border-[#ececec] flex flex-col gap-[4px] max-w-[640px] p-[14px] rounded-[6px]" aria-label="Google preview">
      <span className="font-['Inter:Regular'] text-[#202124] text-[13px] truncate">{url}</span>
      <span className="font-['Inter:Regular'] leading-[1.3] text-[#1a0dab] text-[19px]">{shortTitle || "—"}</span>
      <span className="font-['Inter:Regular'] leading-[1.5] text-[#4d5156] text-[13px]">{shortDescription || "—"}</span>
    </div>
  );
}

export default function SeoEditor({
  value,
  onChange,
  path,
  fallbackTitle,
  fallbackDescription,
  useTemplate = true,
}: {
  value: Pick<PageSeo, "title" | "description"> | undefined;
  onChange: (next: { title: string; description: string }) => void;
  /** The page address, e.g. /services/ui-ux-design. */
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  /** Add the site name from the title template (off for the Home page). */
  useTemplate?: boolean;
}) {
  const seo = useContent().settings.seo;
  const current = { title: value?.title ?? "", description: value?.description ?? "" };
  const template = seo.titleTemplate?.includes("%s") ? seo.titleTemplate : "%s";
  const baseTitle = plain(current.title || fallbackTitle);
  const fullTitle = useTemplate ? template.replace("%s", baseTitle) : baseTitle;
  const description = plain(current.description || fallbackDescription);
  const host = typeof window === "undefined" ? "designops.agency" : window.location.hostname.replace(/^admin\./, "");

  return (
    <div className="col-span-full flex flex-col gap-[14px]">
      <label className="flex flex-col gap-[6px]">
        <span className="flex font-['Inter:Medium'] font-medium items-center justify-between text-[#3e3e3e] text-[13px]">
          Search title
          <Counter length={fullTitle.length} max={TITLE_MAX} />
        </span>
        <input className={inputClass} value={current.title} placeholder={plain(fallbackTitle)} onChange={(e) => onChange({ ...current, title: e.target.value })} />
        <span className="font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]">
          {useTemplate ? `Shown as “${fullTitle}”. ` : ""}Put the main search words first, e.g. “UI/UX Design Agency in Bangladesh”. Empty = the page name.
        </span>
      </label>
      <label className="flex flex-col gap-[6px]">
        <span className="flex font-['Inter:Medium'] font-medium items-center justify-between text-[#3e3e3e] text-[13px]">
          Search description
          <Counter length={description.length} max={DESCRIPTION_MAX} />
        </span>
        <textarea className={inputClass} rows={3} value={current.description} placeholder={plain(fallbackDescription)} onChange={(e) => onChange({ ...current, description: e.target.value })} />
        <span className="font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]">One or two sentences (120–160 characters) that make people click: what you offer, for whom, and where. Empty = the short description.</span>
      </label>
      <SerpPreview url={`${host}${path === "/" ? "" : ` › ${path.split("/").filter(Boolean).join(" › ")}`}`} title={fullTitle} description={description} />
    </div>
  );
}
