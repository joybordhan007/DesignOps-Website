// Section heading in the site's two-tone style: the first part in dark text,
// the rest muted (light variants for dark sections).
export default function SectionTitle({
  lead,
  muted,
  dark = false,
  className = "",
}: {
  lead: string;
  muted?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-['Inter:Bold'] font-bold leading-[1.2] text-[20px] tracking-[0.4px] ${dark ? "text-[#f9f9f9]" : "text-[#3e3e3e]"} ${className}`}
    >
      {lead}
      {muted && <span className={dark ? "text-[#a9a9a9]" : "text-[#707070]"}> {muted}</span>}
    </h2>
  );
}
