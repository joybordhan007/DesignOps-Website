// Cyan button with a rolling label and an arrow that turns 45° on hover,
// e.g. the "ALL ARTICLES" button under Growth Insights. The arrow only
// rotates in place, so it stays centred in its box.
export default function ArrowButton({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      data-name="Arrow Button"
      className={`bg-[#00b6ca] flex gap-[10px] group items-center outline-none pl-[18px] pr-[12px] py-[12px] relative rounded-[4px] shrink-0 max-lg:gap-[6px] max-lg:pl-[12px] max-lg:pr-[6px] max-lg:py-[6px] focus-visible:ring-2 focus-visible:ring-[#171717] ${className}`}
    >
      <span className="block h-[19.2px] overflow-clip relative max-lg:h-[12px]">
        <span className="flex flex-col font-['Inter:Medium'] font-medium leading-[1.2] not-italic text-[#f6f6f6] text-[16px] transition-transform max-lg:text-[10px] duration-[380ms] ease-[cubic-bezier(0.2,0.75,0.3,1)] whitespace-nowrap group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </span>
      <span className="bg-[#f6f6f6] flex items-center justify-center p-[8px] rounded-[4px] shrink-0 max-lg:p-[4px]">
        <img
          alt=""
          className="block size-[18px] transition-transform max-lg:size-[12px] duration-[380ms] ease-[cubic-bezier(0.2,0.75,0.3,1)] group-hover:-rotate-45 group-focus-visible:-rotate-45"
          src="/assets/shared/icons/arrow-forward-long.svg"
        />
      </span>
    </a>
  );
}
