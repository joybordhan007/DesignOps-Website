import { useContent } from "@/content/store";

// Cyan "LET'S TALK" button: on hover/focus the label and the arrow roll up and
// a copy rolls in from below, like the desktop button.
export default function TalkButton({ className = "" }: { className?: string }) {
  const label = useContent().settings.labels.buttons.letsTalk;
  const roll = "flex flex-col transition-transform duration-[380ms] ease-[cubic-bezier(0.2,0.75,0.3,1)] group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2";

  return (
    <a
      href="/contact"
      className={`bg-[#00b6ca] flex gap-[6px] group items-center outline-none px-[14px] py-[10px] rounded-[4px] shadow-[0px_2px_3px_rgba(0,0,0,0.1)] focus-visible:ring-2 focus-visible:ring-[#171717] ${className}`}
    >
      <span className="block h-[12px] overflow-hidden">
        <span className={`${roll} font-['Inter:Medium'] font-medium leading-[1.2] text-[#f6f6f6] text-[10px] whitespace-nowrap`}>
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </span>
      <span className="block overflow-hidden size-[12px]" aria-hidden="true">
        <span className={roll}>
          <img alt="" className="block size-[12px]" src="/assets/shared/icons/arrow-subdirectory-light.svg" />
          <img alt="" className="block size-[12px]" src="/assets/shared/icons/arrow-subdirectory-light.svg" />
        </span>
      </span>
    </a>
  );
}
