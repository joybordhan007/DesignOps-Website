import HeroVideo from "@/components/HeroVideo";
import BlogGrid, { blogGridHeight } from "@/components/BlogGrid";
import Footer from "@/components/Footer";

const imgProperty1Up = "/assets/shared/icons/scroll-down.svg";
const imgArrowForwardLong = "/assets/shared/icons/arrow-forward-long.svg";

type Component2Props = {
  className?: string;
  property1?: "up";
};

function Component2({ className, property1 = "up" }: Component2Props) {
  return (
    <div className={className || "h-[24px] relative w-[12px]"} data-node-id="1:22">
      <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgProperty1Up} />
    </div>
  );
}

type Component58Props = {
  className?: string;
  property1?: "vIEW";
};

function Component58({ className, property1 = "vIEW" }: Component58Props) {
  return (
    <div className={className || "bg-[#00b6ca] content-stretch flex gap-[10px] items-center pl-[18px] pr-[12px] py-[12px] relative rounded-[4px]"} data-node-id="1:10">
      <div className="h-[18px] overflow-clip relative shrink-0 w-[144px]" data-node-id="1:11" data-name="Frame">
        <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="1:12">
          <p className="leading-[1.2] mb-0">START A PROJECT</p>
          <p className="leading-[1.2]">START A PROJECT</p>
        </div>
      </div>
      <div className="bg-[#f6f6f6] content-stretch flex items-center p-[8px] relative rounded-[4px] shrink-0" data-node-id="1:13" data-name="Frame">
        <div className="relative shrink-0 size-[18px]" data-node-id="1:14" data-name="arrow-forward-long">
          <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgArrowForwardLong} />
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  return (
    <div className="bg-[#f5f5f5] figma-canvas relative w-[1920px]" style={{ height: 1054 + blogGridHeight() + 64 + 782 }} data-node-id="1:2050" data-name="Blog">
      <div className="-translate-x-1/2 absolute bg-[#2b2b2b] h-[870px] left-1/2 overflow-clip rounded-[8px] top-[24px] w-[1872px]" data-node-id="1:2051" data-name="Hero">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(54.17%-66px)] top-[calc(50%+27.5px)]" data-node-id="1:2052" data-name="image">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[980px] left-1/2 top-1/2 w-[1920px]" data-node-id="1:2053" data-name="Video">
            <HeroVideo name="pages.mp4" />
          </div>
          <div className="absolute bg-gradient-to-r from-[16.438%] from-[rgba(0,0,0,0.74)] h-[980px] left-0 to-[rgba(0,0,0,0.2)] top-0 w-[1920px]" data-node-id="1:2054" data-name="Effects" />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[56px] items-start justify-center left-[156px] top-[306px]" data-node-id="1:2055" data-name="Frame">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-[#ededed] whitespace-nowrap" data-node-id="1:2056" data-name="Frame">
            <div className="flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center relative shrink-0 text-[64px] tracking-[1.28px]" data-node-id="1:2057">
              <p className="mb-0 whitespace-pre">
                <span className="leading-[1.24]">{`Our Blog on `}</span>
                <span className="leading-[1.24] text-[#00b6ca]">{`Design, `}</span>
              </p>
              <p className="whitespace-pre">
                <span className="leading-[1.24] text-[#00b6ca]">Strategy</span>
                <span className="leading-[1.24]">{` & Growth`}</span>
              </p>
            </div>
            <div className="flex flex-col font-['Montserrat:Regular'] font-normal justify-center relative shrink-0 text-[28px]" data-node-id="1:2058">
              <p className="leading-[1.2] mb-0 whitespace-pre">{`Exploring design, engineering, and the process of building digital products `}</p>
              <p className="leading-[1.2] whitespace-pre">that last and grow with modern businesses.</p>
            </div>
          </div>
          <Component58 className="bg-[#00b6ca] content-stretch flex gap-[10px] items-center pl-[18px] pr-[12px] py-[12px] relative rounded-[4px] shrink-0" />
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[16px] items-center left-1/2 top-[830px]" data-node-id="1:2060" data-name="Frame">
          <p className="[word-break:break-word] font-['Noto_Sans:Light'] font-light leading-[1.2] relative shrink-0 text-[16px] text-white tracking-[3.52px] uppercase whitespace-nowrap" data-node-id="1:2061" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
            Scroll Down
          </p>
          <Component2 className="h-[24px] relative shrink-0 w-[12px]" />
        </div>
      </div>
      <Footer className="-translate-x-1/2 absolute bg-[#191919] bottom-[18px] h-[764px] left-1/2 overflow-clip rounded-[8px] w-[1872px]" />
      <BlogGrid className="absolute left-[180px] top-[1054px]" />
    </div>
  );
}