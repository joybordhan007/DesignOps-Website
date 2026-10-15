import HeroVideo from "@/components/HeroVideo";
import BlogGrid, { blogGridHeight } from "@/components/BlogGrid";

const assetPathPrefix = "/assets/blog";
const imgGroup = `${assetPathPrefix}/937ae.svg`;
const imgGroup1 = `${assetPathPrefix}/c25f8.svg`;
const imgSwitzerlandTourismDestinationShowcasingEuropeanTravelBeauty1 = `${assetPathPrefix}/1fe35.png`;
const imgUpdateLogo = `${assetPathPrefix}/fb85d.svg`;
const imgFrame = `${assetPathPrefix}/f9265.svg`;
const imgFrame1 = `${assetPathPrefix}/f06eb.svg`;
const imgFrame2 = `${assetPathPrefix}/da245.svg`;
const imgProperty1Up = `${assetPathPrefix}/4798c.svg`;
const imgArrowForwardLong = `${assetPathPrefix}/5f243.svg`;
const imgUpdateLogo1 = `${assetPathPrefix}/944c7.svg`;
const imgArrowSubdirectoryForward = `${assetPathPrefix}/84338.svg`;

type FrameProps = {
  className?: string;
  property1?: "Default";
};

function Frame({ className, property1 = "Default" }: FrameProps) {
  return (
    <div className={className || "content-stretch flex items-center p-[10px] relative rounded-[999px]"} data-node-id="1:427">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="1:428" data-name="facebook-logo-108 1">
        <div className="absolute inset-[0.55%_24.43%_0.66%_24.32%]" data-node-id="1:429" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
        </div>
      </div>
    </div>
  );
}

type Frame1Props = {
  className?: string;
  property1?: "Default";
};

function Frame1({ className, property1 = "Default" }: Frame1Props) {
  return (
    <div className={className || "content-stretch flex items-center p-[10px] relative rounded-[999px]"} data-node-id="1:412">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-node-id="1:413" data-name="linkedin-112 1">
        <div className="absolute inset-[0.64%_0.66%_0.75%_0.55%]" data-node-id="1:414" data-name="Group">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
        </div>
      </div>
    </div>
  );
}

function Footer({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#191919] h-[764px] overflow-clip relative rounded-[8px] w-[1872px]"} data-node-id="1:432" data-name="Footer">
      <div className="absolute content-stretch flex h-[222px] items-start justify-between left-[156px] right-[156px] top-[40px]" data-node-id="1:433" data-name="Frame">
        <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[523px]" data-node-id="1:434" data-name="Frame">
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="1:435" data-name="Frame">
            <a href="/" className="block h-[40px] relative shrink-0 w-[175px]" data-node-id="1:436" data-name="Update Logo">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpdateLogo} />
            </a>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#dfdfdf] text-[20px] w-[min-content] whitespace-pre-wrap" data-node-id="1:444">
              <p className="leading-[1.3] mb-0">{`We design & build software that sells. Full-stack `}</p>
              <p className="leading-[1.3]">digital product agency for ambitious brands.</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="1:445" data-name="Frame">
            <Frame1 className="content-stretch flex items-center p-[10px] relative rounded-[999px] shrink-0" />
            <Frame className="content-stretch flex items-center p-[10px] relative rounded-[999px] shrink-0" />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-node-id="1:448" data-name="Frame">
          <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:449" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[20px] uppercase whitespace-nowrap" data-node-id="1:450">
              <p className="leading-[1.2]">Quick Links</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Medium'] font-medium gap-[16px] items-start leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[18px] w-full whitespace-nowrap" data-node-id="1:451" data-name="Frame">
            <a href="/" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:452">
              <p className="leading-[1.2]">Home</p>
            </a>
            <a href="/services" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:453">
              <p className="leading-[1.2]">Services</p>
            </a>
            <a href="/work" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:454">
              <p className="leading-[1.2]">Work</p>
            </a>
            <a href="/company" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:455">
              <p className="leading-[1.2]">Company</p>
            </a>
            <a href="/blog" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:456">
              <p className="leading-[1.2]">Blog</p>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-node-id="1:457" data-name="Frame">
          <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:458" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[20px] uppercase whitespace-nowrap" data-node-id="1:459">
              <p className="leading-[1.2]">Support</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Medium'] font-medium gap-[16px] items-start leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[18px] w-full whitespace-nowrap" data-node-id="1:460" data-name="Frame">
            <a href="/contact" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:461">
              <p className="leading-[1.2]">Contact Us</p>
            </a>
            <a href="/contact#faq" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:462">
              <p className="leading-[1.2]">FAQ</p>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-node-id="1:463" data-name="Frame">
          <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:464" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[20px] uppercase whitespace-nowrap" data-node-id="1:465">
              <p className="leading-[1.2]">Services</p>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter:Medium'] font-medium gap-[16px] items-start leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[18px] w-full whitespace-nowrap" data-node-id="1:466" data-name="Frame">
            <a href="/services" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:467">
              <p className="leading-[1.2]">Full-stack Development</p>
            </a>
            <a href="/services/ui-ux-design" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:468">
              <p className="leading-[1.2]">UI/UX Design</p>
            </a>
            <a href="/services" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:469">
              <p className="leading-[1.2]">Brand Design</p>
            </a>
            <a href="/services" className="flex flex-col justify-center relative shrink-0 hover:text-[#00b6ca]" data-node-id="1:470">
              <p className="leading-[1.2]">Digital Marketing</p>
            </a>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[306px]" data-node-id="1:471" data-name="Frame">
          <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="1:472" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[20px] uppercase whitespace-nowrap" data-node-id="1:473">
              <p className="leading-[1.2]">Contact Info</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="1:474" data-name="Frame">
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[273px]" data-node-id="1:475" data-name="Frame">
              <div className="relative shrink-0 size-[20px]" data-node-id="1:476" data-name="Frame">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame} />
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[18px] w-[245px]" data-node-id="1:478">
                <a href="tel:+8801568295845" className="block leading-[1.2] hover:text-[#00b6ca]">+880 1568 295845</a>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[273px]" data-node-id="1:479" data-name="Frame">
              <div className="relative shrink-0 size-[20px]" data-node-id="1:480" data-name="Frame">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1} />
              </div>
              <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#dfdfdf] text-[18px] w-[245px]" data-node-id="1:483">
                <a href="mailto:joybordhan223@gmail.com" className="block leading-[1.2] hover:text-[#00b6ca]">joybordhan223@gmail.com</a>
              </div>
            </div>
            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:484" data-name="Frame">
              <div className="relative shrink-0 size-[20px]" data-node-id="1:485" data-name="Frame">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2} />
              </div>
              <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-px not-italic relative text-[#dfdfdf] text-[18px]" data-node-id="1:488">
                <p className="leading-[1.3]">Eastern Housing. Block: C, Road: W2, House: 105 Mirpur 12 Dhaka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[905px] left-1/2 top-[40px] w-[1616px]" data-node-id="1:489" data-name="switzerland-tourism-destination-showcasing-european-travel-beauty 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSwitzerlandTourismDestinationShowcasingEuropeanTravelBeauty1} />
      </div>
      <div className="absolute bottom-[68px] content-stretch flex flex-col gap-[32px] items-center justify-center left-[156px] right-[156px]" data-node-id="1:490" data-name="Frame">
        <div className="h-px relative shrink-0 w-full" data-node-id="1:491" />
        <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[0] not-italic relative shrink-0 text-[18px] text-white w-full whitespace-nowrap" data-node-id="1:492" data-name="Frame">
          <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0" data-node-id="1:493">
            <p className="leading-[1.2]">© 2026 DesignOps. All rights reserved.</p>
          </div>
          <div className="content-stretch flex font-['Inter:Medium'] font-medium gap-[16px] items-center justify-end relative shrink-0" data-node-id="1:494" data-name="Frame">
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="1:495">
              <p className="leading-[1.2]">Privacy Policy</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0" data-node-id="1:496">
              <p className="leading-[1.2]">Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Component2Props = {
  className?: string;
  property1?: "up";
};

function Component2({ className, property1 = "up" }: Component2Props) {
  return (
    <div className={className || "h-[24px] relative w-[12px]"} data-node-id="1:22">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1Up} />
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
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowForwardLong} />
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
            <HeroVideo name="blog.mp4" />
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
      <div className="-translate-x-1/2 absolute bg-[#f6f6f6] content-stretch flex items-center justify-between left-1/2 px-[16px] py-[12px] rounded-[4px] top-[56px] w-[1560px]" data-node-id="1:2081" data-name="Nav">
        <a href="/" className="block cursor-pointer h-[40px] relative shrink-0 w-[175px]" data-node-id="1:2082" data-name="Update Logo">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpdateLogo1} />
        </a>
        <div className="[word-break:break-word] content-stretch flex gap-[32px] items-center justify-center not-italic relative shrink-0 text-[16px] uppercase whitespace-nowrap" data-node-id="1:2090" data-name="Frame">
          <a href="/services" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:2091">
            <p className="leading-[1.2]">Services</p>
          </a>
          <a href="/work" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:2092">
            <p className="leading-[1.2]">Work</p>
          </a>
          <a href="/blog" className="block font-['Inter:Semi_Bold'] font-semibold leading-[1.2] relative shrink-0 text-[#00b6ca]" data-node-id="1:2093" aria-current="page">blog</a>
          <a href="/company" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:2094">
            <p className="leading-[1.2]">Company</p>
          </a>
          <a href="/contact" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:2095">
            <p className="leading-[1.2]">Contact Us</p>
          </a>
        </div>
        <div className="bg-[#00b6ca] content-stretch drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-node-id="1:2096" data-name="Component 57">
          <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]" data-node-id="I1:2096;40959:4952" data-name="Frame">
            <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="I1:2096;40959:4953">
              <p className="leading-[1.2] mb-0">LET’S TALK</p>
              <p className="leading-[1.2]">LET’S TALK</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="I1:2096;40959:5020" data-name="Frame">
            <div className="absolute left-0 size-[18px] top-0" data-node-id="I1:2096;40959:5021" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
            <div className="absolute left-0 size-[18px] top-[20px]" data-node-id="I1:2096;40959:5022" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}