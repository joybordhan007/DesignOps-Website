// "START A PROJECT" hero button. The label roll and arrow turn on hover come
// from the [data-node-id="1:10"] rules in index.css.
export default function StartButton() {
  return (
    <a href="/contact" className="bg-[#00b6ca] flex gap-[10px] items-center pl-[18px] pr-[12px] py-[12px] relative rounded-[4px] shrink-0" data-node-id="1:10">
      <div className="h-[18px] overflow-clip relative shrink-0 w-[144px]">
        <div className="absolute font-['Inter:Medium'] font-medium leading-[0] left-0 text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap">
          <p className="leading-[1.2] mb-0">START A PROJECT</p>
          <p className="leading-[1.2]">START A PROJECT</p>
        </div>
      </div>
      <div className="bg-[#f6f6f6] flex items-center p-[8px] relative rounded-[4px] shrink-0">
        <div className="relative shrink-0 size-[18px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/shared/icons/arrow-forward-long.svg" />
        </div>
      </div>
    </a>
  );
}
