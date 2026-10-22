// Cyan "LET'S TALK" button; the roll on hover comes from the
// [data-name="Component 57"] rules in index.css.
export default function TalkButton() {
  return (
    <a href="/contact" className="bg-[#00b6ca] drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-name="Component 57">
      <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]">
        <div className="absolute font-['Inter:Medium'] font-medium leading-[0] left-0 text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap">
          <p className="leading-[1.2] mb-0">LET’S TALK</p>
          <p className="leading-[1.2]">LET’S TALK</p>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[18px]">
        <div className="absolute left-0 size-[18px] top-0">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/shared/icons/arrow-subdirectory-light.svg" />
        </div>
        <div className="absolute left-0 size-[18px] top-[20px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/shared/icons/arrow-subdirectory-light.svg" />
        </div>
      </div>
    </a>
  );
}
