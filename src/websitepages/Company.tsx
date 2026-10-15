import HeroVideo from "@/components/HeroVideo";
import RollingNumber from "@/components/RollingNumber";
import Footer from "@/components/Footer";

const assetPathPrefix = "/assets/company";
const imgProperty1Up = "/assets/shared/icons/scroll-down.svg";
const imgArrowForwardLong = "/assets/shared/icons/arrow-forward-long.svg";
const imgRectangle3463663 = `${assetPathPrefix}/af589.png`;
const imgRectangle17 = "/assets/shared/images/reviewer-avatar.jpg";
const imgUpworkLogo1 = "/assets/shared/logos/upwork.svg";
const imgGroup2 = "/assets/shared/logos/fiverr-grey.svg";
const imgGoogleGLogo1 = "/assets/shared/logos/google.svg";
const imgStar1 = "/assets/shared/icons/star.svg";
const imgGroup3 = "/assets/shared/icons/star-half.svg";
const imgGroup4 = "/assets/shared/logos/fiverr.svg";
const imgArrowSubdirectoryForward = "/assets/shared/icons/arrow-subdirectory-light.svg";
const imgUpdateLogo1 = "/assets/shared/logos/designops-logo.svg";

type FrameProps = {
  className?: string;
  property1?: "View";
};

function Frame({ className, property1 = "View" }: FrameProps) {
  return (
    <div className={className || "h-[130px] relative w-[1920px]"} data-node-id="1:881">
      <div className="absolute content-stretch flex flex-col gap-[16px] h-[105px] items-center justify-center left-[180px] top-[12.5px] w-[389.25px]" data-node-id="1:882" data-name="Frame">
        <RollingNumber value={500} suffix="+" />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#707070] text-[24px] text-center w-[min-content]" data-node-id="1:885">
          <p className="leading-[1.2]">Projects Delivered</p>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.5)] h-[130px] left-[569.25px] top-0 w-px" data-node-id="1:886" />
      <div className="absolute content-stretch flex flex-col gap-[16px] h-[105px] items-center justify-center left-[570.25px] top-[12.5px] w-[389.25px]" data-node-id="1:887" data-name="Frame">
        <RollingNumber value={6} suffix="+" />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#707070] text-[24px] text-center whitespace-nowrap" data-node-id="1:890">
          <p className="leading-[1.2]">Years Experience</p>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.5)] h-[130px] left-[959.5px] top-0 w-px" data-node-id="1:891" />
      <div className="absolute content-stretch flex flex-col gap-[16px] h-[105px] items-center justify-center left-[960.5px] top-[12.5px] w-[389.25px]" data-node-id="1:892" data-name="Frame">
        <RollingNumber value={92} suffix="%" />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#707070] text-[24px] text-center w-[min-content]" data-node-id="1:895">
          <p className="leading-[1.2]">Client Satisfaction</p>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.5)] h-[130px] left-[1349.75px] top-0 w-px" data-node-id="1:896" />
      <div className="absolute content-stretch flex flex-col gap-[16px] h-[105px] items-center justify-center left-[1350.75px] top-[12.5px] w-[389.25px]" data-node-id="1:897" data-name="Frame">
        <RollingNumber value={20} suffix="+" />
        <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#707070] text-[24px] text-center w-[min-content]" data-node-id="1:900">
          <p className="leading-[1.2]">Team Members</p>
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

export default function Company() {
  return (
    <div className="bg-[#f5f5f5] figma-canvas relative w-[1920px] h-[4523px]" data-node-id="1:2170" data-name="Company">
      <div className="-translate-x-1/2 absolute bg-[#2b2b2b] h-[870px] left-1/2 overflow-clip rounded-[8px] top-[24px] w-[1872px]" data-node-id="1:2171" data-name="Hero">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(54.17%-66px)] top-[calc(50%+27.5px)]" data-node-id="1:2172" data-name="image">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[980px] left-1/2 top-1/2 w-[1920px]" data-node-id="1:2173" data-name="Video">
            <HeroVideo name="company.mp4" />
          </div>
          <div className="absolute bg-gradient-to-r from-[16.438%] from-[rgba(0,0,0,0.74)] h-[980px] left-0 to-[rgba(0,0,0,0.2)] top-0 w-[1920px]" data-node-id="1:2174" data-name="Effects" />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[56px] items-start justify-center left-[156px] top-[306px]" data-node-id="1:2175" data-name="Frame">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-[#ededed] whitespace-nowrap" data-node-id="1:2176" data-name="Frame">
            <div className="flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center relative shrink-0 text-[64px] tracking-[1.28px]" data-node-id="1:2177">
              <p className="mb-0 whitespace-pre">
                <span className="leading-[1.24]">{`We Are `}</span>
                <span className="leading-[1.24] text-[#00b6ca]">{`DesignOps `}</span>
              </p>
              <p className="whitespace-pre">
                <span className="leading-[1.24] text-[#00b6ca]">Creative</span>
                <span className="leading-[1.24]">{` Studio`}</span>
              </p>
            </div>
            <div className="flex flex-col font-['Montserrat:Regular'] font-normal justify-center relative shrink-0 text-[28px]" data-node-id="1:2178">
              <p className="leading-[1.2] mb-0 whitespace-pre">{`A team of passionate designers and developers dedicated to building `}</p>
              <p className="leading-[1.2] whitespace-pre">digital products that matter. We bridge the gap between creative vision and technical reality.</p>
            </div>
          </div>
          <Component58 className="bg-[#00b6ca] content-stretch flex gap-[10px] items-center pl-[18px] pr-[12px] py-[12px] relative rounded-[4px] shrink-0" />
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[16px] items-center left-1/2 top-[830px]" data-node-id="1:2180" data-name="Frame">
          <p className="[word-break:break-word] font-['Noto_Sans:Light'] font-light leading-[1.2] relative shrink-0 text-[16px] text-white tracking-[3.52px] uppercase whitespace-nowrap" data-node-id="1:2181" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
            Scroll Down
          </p>
          <Component2 className="h-[24px] relative shrink-0 w-[12px]" />
        </div>
      </div>
      <Footer className="-translate-x-1/2 absolute bg-[#191919] bottom-[18px] h-[764px] left-1/2 overflow-clip rounded-[8px] w-[1872px]" />
      <div className="[word-break:break-word] absolute content-stretch flex flex-col gap-[40px] items-center left-[180px] not-italic text-center top-[1054px] w-[1560px]" data-node-id="1:2184" data-name="Frame">
        <div className="capitalize flex flex-col font-['Poppins:SemiBold'] justify-center leading-[0] relative shrink-0 text-[#3e3e3e] text-[40px] w-full whitespace-pre-wrap" data-node-id="1:2185">
          <p className="leading-[1.3] mb-0">{`"Too many projects fail due to poor `}</p>
          <p className="leading-[1.3] mb-0">{`communication, bloated scope, or bad code. `}</p>
          <p className="leading-[1.3]">{`We're here to change that."`}</p>
        </div>
        <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] relative shrink-0 text-[#00b6ca] text-[24px] w-full" data-node-id="1:2186">
          — The DesignOps Team
        </p>
      </div>
      <div className="absolute content-stretch flex gap-[24px] items-center left-[180px] top-[1439px]" data-node-id="1:2187" data-name="Frame">
        <div className="h-[555px] relative rounded-[16px] shrink-0 w-[768px]" data-node-id="1:2188">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgRectangle3463663} />
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] not-italic relative shrink-0 w-[768px]" data-node-id="1:2189" data-name="Frame">
          <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#00b6ca] text-[20px] tracking-[0.8px] uppercase w-full" data-node-id="1:2190">
            <p className="leading-[1.2]">Our Mission</p>
          </div>
          <div className="flex flex-col font-['Poppins:SemiBold'] justify-center relative shrink-0 text-[#3e3e3e] text-[40px] tracking-[0.8px] w-full whitespace-pre-wrap" data-node-id="1:2191">
            <p className="mb-0">
              <span className="leading-[1.3]">{`Building the future, `}</span>
              <span className="leading-[1.3] text-[#707070]">{`one `}</span>
            </p>
            <p className="leading-[1.3] text-[#707070]">product at a time</p>
          </div>
          <div className="flex flex-col font-['Poppins:Regular'] justify-center relative shrink-0 text-[#2f2f2f] text-[20px] tracking-[0.4px] w-full whitespace-pre-wrap" data-node-id="1:2192">
            <p className="leading-[1.3] mb-0">We founded DesignOps with a simple goal: to help founders and businesses navigate the complex world of software development.</p>
            <p className="leading-[1.3] mb-0">​</p>
            <p className="leading-[1.3]">We believe in transparency, craftsmanship, and results. Every line of code we write, every pixel we push, is in service of your business goals.</p>
          </div>
        </div>
      </div>
      <Frame className="-translate-x-1/2 absolute h-[130px] left-1/2 top-[2154px] w-[1920px]" />
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[64px] items-center left-1/2 top-[2444px] w-[1560px]" data-node-id="1:2194" data-name="Frame">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3e3e3e] text-[40px] tracking-[0.8px] w-[min-content] whitespace-pre-wrap" data-node-id="1:2195">
          <p className="mb-0">
            <span className="leading-[1.2]">{`Find your best design into us. `}</span>
            <span className="leading-[1.2] text-[#707070]">{`We `}</span>
          </p>
          <p className="leading-[1.2] text-[#707070]">guarantee next success is yours!</p>
        </div>
        <div className="bg-white content-stretch flex h-[513px] items-center overflow-clip relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[1560px]" data-node-id="1:2196" data-name="Frame">
<div className="bg-white z-[1] border-[rgba(0,0,0,0.1)] border-r border-solid content-stretch flex flex-col h-full items-center justify-between px-[24px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2197" data-name="Frame">
            <div className="content-stretch flex items-center justify-between opacity-0 relative shrink-0 w-full" data-node-id="1:2198" data-name="Frame">
              <div className="h-[40px] relative shrink-0 w-[80px]" data-node-id="1:2199" data-name="Upwork-logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpworkLogo1} />
              </div>
              <div className="h-[22px] relative shrink-0 w-[83.207px]" data-node-id="1:2202" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="1:2207" data-name="Google__G__logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGoogleGLogo1} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[200px]" data-node-id="1:2213" data-name="Frame">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[100px] text-center tracking-[2px] w-full" data-node-id="1:2214">
                <p className="leading-[1.2]">4.9</p>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:2215" data-name="Frame">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:2216" data-name="Star">
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:2217">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:2218">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:2219">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:2220">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:2221">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup3} />
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[28px] text-center w-full" data-node-id="1:2224">
                  <p className="leading-[1.2]">200+ reviews</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:2225" data-name="Frame">
              <div className="h-[40px] relative shrink-0 w-[80px]" data-node-id="1:2226" data-name="Upwork-logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpworkLogo1} />
              </div>
              <div className="h-[22px] relative shrink-0 w-[83.207px]" data-node-id="1:2229" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="1:2234" data-name="Google__G__logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGoogleGLogo1} />
              </div>
            </div>
          </div>
<div className="flex-[1_0_0] h-full min-w-px overflow-clip relative review-marquee">
<div className="flex h-full review-marquee-track w-max">
<div className="flex h-full review-marquee-set shrink-0">
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2240" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2241">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2242">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2243" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2244">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2245" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2246">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2247">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2248" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2249">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2250">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2251" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2252">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2253" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2254">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2255">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2256" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2257">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2258">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2259" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2260">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2261" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2262">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2263">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2264" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2265">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2266">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2267" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2268">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2269" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2270">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2271">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2272" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2273">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2274">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2275" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2276">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2277" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2278">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2279">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
</div>
<div className="flex h-full review-marquee-set shrink-0" aria-hidden="true">
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2240" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2241">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2242">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2243" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2244">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2245" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2246">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2247">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2248" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2249">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2250">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2251" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2252">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2253" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2254">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2255">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2256" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2257">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2258">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2259" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2260">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2261" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2262">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2263">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2264" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2265">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2266">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2267" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2268">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2269" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2270">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2271">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:2272" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:2273">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:2274">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:2275" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:2276">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:2277" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:2278">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:2279">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
</div>
</div>
</div>
</div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#191919] content-stretch flex flex-col gap-[32px] items-center left-1/2 py-[78px] rounded-[8px] top-[3277px] w-[1560px]" data-node-id="1:2280" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center leading-[0] not-italic relative shrink-0 text-center w-full" data-node-id="1:2281" data-name="Frame">
          <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-[40px] text-white w-[min-content] whitespace-pre-wrap" data-node-id="1:2282">
            <p className="mb-0">
              <span className="leading-[1.2]">{`Ready to Build `}</span>
              <span className="leading-[1.2] text-[#00b6ca]">{`Something `}</span>
            </p>
            <p>
              <span className="leading-[1.2] text-[#00b6ca]">{`Great `}</span>
              <span className="leading-[1.2]">and Scalable?</span>
            </p>
          </div>
          <div className="flex flex-col font-['Aileron:Regular'] justify-center relative shrink-0 text-[#e8e8e8] text-[20px] w-[1189px]" data-node-id="1:2283">
            <p className="leading-[1.5]">{`We're currently accepting new projects. Let's turn your vision into a high-performing digital product.`}</p>
          </div>
        </div>
        <div className="bg-[#00b6ca] content-stretch drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-node-id="1:2284" data-name="Component 57">
          <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]" data-node-id="I1:2284;40959:4952" data-name="Frame">
            <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="I1:2284;40959:4953">
              <p className="leading-[1.2] mb-0">LET’S TALK</p>
              <p className="leading-[1.2]">LET’S TALK</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="I1:2284;40959:5020" data-name="Frame">
            <div className="absolute left-0 size-[18px] top-0" data-node-id="I1:2284;40959:5021" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
            <div className="absolute left-0 size-[18px] top-[20px]" data-node-id="I1:2284;40959:5022" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#f6f6f6] content-stretch flex items-center justify-between left-1/2 px-[16px] py-[12px] rounded-[4px] top-[56px] w-[1560px]" data-node-id="1:2285" data-name="Nav">
        <a href="/" className="block cursor-pointer h-[40px] relative shrink-0 w-[175px]" data-node-id="1:2286" data-name="Update Logo">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpdateLogo1} />
        </a>
        <div className="[word-break:break-word] content-stretch flex gap-[32px] items-center justify-center not-italic relative shrink-0 text-[16px] uppercase whitespace-nowrap" data-node-id="1:2294" data-name="Frame">
          <a href="/services" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:2295">
            <p className="leading-[1.2]">Services</p>
          </a>
          <a href="/work" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:2296">
            <p className="leading-[1.2]">Work</p>
          </a>
          <a href="/blog" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:2297">
            <p className="leading-[1.2]">blog</p>
          </a>
          <a href="/company" className="block font-['Inter:Semi_Bold'] font-semibold leading-[1.2] relative shrink-0 text-[#00b6ca]" data-node-id="1:2298" aria-current="page">Company</a>
          <a href="/contact" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:2299">
            <p className="leading-[1.2]">Contact Us</p>
          </a>
        </div>
        <div className="bg-[#00b6ca] content-stretch drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-node-id="1:2300" data-name="Component 57">
          <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]" data-node-id="I1:2300;40959:4952" data-name="Frame">
            <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="I1:2300;40959:4953">
              <p className="leading-[1.2] mb-0">LET’S TALK</p>
              <p className="leading-[1.2]">LET’S TALK</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="I1:2300;40959:5020" data-name="Frame">
            <div className="absolute left-0 size-[18px] top-0" data-node-id="I1:2300;40959:5021" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
            <div className="absolute left-0 size-[18px] top-[20px]" data-node-id="I1:2300;40959:5022" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}