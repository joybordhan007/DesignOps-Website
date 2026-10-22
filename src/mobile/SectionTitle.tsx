import type { SectionTitle as Title } from "@/content/types";

const flat = (text: string) => text.replace(/\s*\n\s*/g, " ");

// Section heading in the site's two-tone style: the first part in dark text,
// the rest muted (light variants for dark sections). Desktop line breaks are ignored.
export default function SectionTitle({ title, dark = false, className = "" }: { title: Title; dark?: boolean; className?: string }) {
  return (
    <h2 className={`font-['Inter:Bold'] font-bold leading-[1.2] text-[20px] tracking-[0.4px] ${dark ? "text-[#f9f9f9]" : "text-[#3e3e3e]"} ${className}`}>
      {flat(title.lead)}
      {title.muted && <span className={dark ? "text-[#a9a9a9]" : "text-[#707070]"}> {flat(title.muted)}</span>}
    </h2>
  );
}
