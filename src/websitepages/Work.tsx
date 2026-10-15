import HeroVideo from "@/components/HeroVideo";
import LatestBlogCards from "@/components/LatestBlogCards";
import Footer from "@/components/Footer";
import ArrowButton from "@/components/ArrowButton";

const assetPathPrefix = "/assets/work";
const imgArrowForwardLong = "/assets/shared/icons/arrow-forward-long.svg";
const imgProperty1Up = "/assets/shared/icons/scroll-down.svg";
const imgRectangle17 = "/assets/shared/images/reviewer-avatar.jpg";
const imgRectangle16 = "/assets/shared/images/case-study-cover.png";
const imgRectangle20 = `${assetPathPrefix}/c4c83.png`;
const imgRectangle21 = `${assetPathPrefix}/97fa0.png`;
const imgRectangle22 = `${assetPathPrefix}/5096b.png`;
const imgUpworkLogo1 = "/assets/shared/logos/upwork.svg";
const imgGroup2 = "/assets/shared/logos/fiverr-grey.svg";
const imgGoogleGLogo1 = "/assets/shared/logos/google.svg";
const imgStar1 = "/assets/shared/icons/star.svg";
const imgGroup3 = "/assets/shared/icons/star-half.svg";
const imgGroup4 = "/assets/shared/logos/fiverr.svg";
const imgArrowSubdirectoryForward = "/assets/shared/icons/arrow-subdirectory-light.svg";
const imgUpdateLogo1 = "/assets/shared/logos/designops-logo.svg";

type Component61Props = {
  className?: string;
  property1?: "View";
};

function Component61({ className, property1 = "View" }: Component61Props) {
  return (
    <a href="/work/case-study" className={className || "bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px]"} data-node-id="1:154">
      <div className="h-[18px] overflow-clip relative shrink-0 w-[149px]" data-node-id="1:155" data-name="Frame">
        <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="1:156">
          <p className="leading-[1.2] mb-0">VIEW CASE STUDY</p>
          <p className="leading-[1.2]">VIEW CASE STUDY</p>
        </div>
      </div>
      <div className="bg-[#f6f6f6] content-stretch flex items-center p-[6px] relative rounded-[4px] shrink-0" data-node-id="1:157" data-name="Frame">
        <div className="relative shrink-0 size-[18px]" data-node-id="1:158" data-name="arrow-forward-long">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowForwardLong} />
        </div>
      </div>
    </a>
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

export default function Work() {
  return (
    <div className="bg-[#f5f5f5] figma-canvas relative w-[1920px] h-[8769px]" data-node-id="1:1533" data-name="Work">
      <div className="-translate-x-1/2 absolute bg-[#2b2b2b] h-[870px] left-1/2 overflow-clip rounded-[8px] top-[24px] w-[1872px]" data-node-id="1:1534" data-name="Hero">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(54.17%-66px)] top-[calc(50%+27.5px)]" data-node-id="1:1535" data-name="image">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[980px] left-1/2 top-1/2 w-[1920px]" data-node-id="1:1536" data-name="Video">
            <HeroVideo name="work.mp4" />
          </div>
          <div className="absolute bg-gradient-to-r from-[16.438%] from-[rgba(0,0,0,0.74)] h-[980px] left-0 to-[rgba(0,0,0,0.2)] top-0 w-[1920px]" data-node-id="1:1537" data-name="Effects" />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[56px] items-start justify-center left-[156px] top-[306px]" data-node-id="1:1538" data-name="Frame">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-[#ededed] whitespace-nowrap" data-node-id="1:1539" data-name="Frame">
            <div className="flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center relative shrink-0 text-[64px] tracking-[1.28px]" data-node-id="1:1540">
              <p className="mb-0 whitespace-pre">
                <span className="leading-[1.24]">{`Showcasing Our `}</span>
                <span className="leading-[1.24] text-[#00b6ca]">{`Digital `}</span>
              </p>
              <p className="whitespace-pre">
                <span className="leading-[1.24] text-[#00b6ca]">Product</span>
                <span className="leading-[1.24]">{` Design Work`}</span>
              </p>
            </div>
            <div className="flex flex-col font-['Montserrat:Regular'] font-normal justify-center relative shrink-0 text-[28px]" data-node-id="1:1541">
              <p className="leading-[1.2] mb-0">A collection of projects that define our approach to digital product design.</p>
              <p className="leading-[1.2]">We solve complex problems with elegant solutions.</p>
            </div>
          </div>
          <Component58 className="bg-[#00b6ca] content-stretch flex gap-[10px] items-center pl-[18px] pr-[12px] py-[12px] relative rounded-[4px] shrink-0" />
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[16px] items-center left-1/2 top-[830px]" data-node-id="1:1543" data-name="Frame">
          <p className="[word-break:break-word] font-['Noto_Sans:Light'] font-light leading-[1.2] relative shrink-0 text-[16px] text-white tracking-[3.52px] uppercase whitespace-nowrap" data-node-id="1:1544" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
            Scroll Down
          </p>
          <Component2 className="h-[24px] relative shrink-0 w-[12px]" />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[64px] items-center left-1/2 top-[5905px] w-[1560px]" data-node-id="1:1546" data-name="Frame">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3e3e3e] text-[40px] tracking-[0.8px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1547">
          <p className="mb-0">
            <span className="leading-[1.2]">{`Growth Insights That Drive `}</span>
            <span className="leading-[1.2] text-[#707070]">{`Measurable `}</span>
          </p>
          <p className="leading-[1.2] text-[#707070]">{`Business Success `}</p>
        </div>
        <LatestBlogCards />
        <ArrowButton href="/blog" label="ALL ARTICLES" />
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[64px] items-center left-1/2 top-[6690px] w-[1560px]" data-node-id="1:1553" data-name="Frame">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3e3e3e] text-[40px] tracking-[0.8px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1554">
          <p className="mb-0">
            <span className="leading-[1.2]">{`Find your best design into us. `}</span>
            <span className="leading-[1.2] text-[#707070]">{`We `}</span>
          </p>
          <p className="leading-[1.2] text-[#707070]">guarantee next success is yours!</p>
        </div>
        <div className="bg-white content-stretch flex h-[513px] items-center overflow-clip relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[1560px]" data-node-id="1:1555" data-name="Frame">
<div className="bg-white z-[1] border-[rgba(0,0,0,0.1)] border-r border-solid content-stretch flex flex-col h-full items-center justify-between px-[24px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1556" data-name="Frame">
            <div className="content-stretch flex items-center justify-between opacity-0 relative shrink-0 w-full" data-node-id="1:1557" data-name="Frame">
              <div className="h-[40px] relative shrink-0 w-[80px]" data-node-id="1:1558" data-name="Upwork-logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpworkLogo1} />
              </div>
              <div className="h-[22px] relative shrink-0 w-[83.207px]" data-node-id="1:1561" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="1:1566" data-name="Google__G__logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGoogleGLogo1} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[200px]" data-node-id="1:1572" data-name="Frame">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[100px] text-center tracking-[2px] w-full" data-node-id="1:1573">
                <p className="leading-[1.2]">4.9</p>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:1574" data-name="Frame">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:1575" data-name="Star">
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1576">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1577">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1578">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1579">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1580">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup3} />
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[28px] text-center w-full" data-node-id="1:1583">
                  <p className="leading-[1.2]">200+ reviews</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:1584" data-name="Frame">
              <div className="h-[40px] relative shrink-0 w-[80px]" data-node-id="1:1585" data-name="Upwork-logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpworkLogo1} />
              </div>
              <div className="h-[22px] relative shrink-0 w-[83.207px]" data-node-id="1:1588" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="1:1593" data-name="Google__G__logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGoogleGLogo1} />
              </div>
            </div>
          </div>
<div className="flex-[1_0_0] h-full min-w-px overflow-clip relative review-marquee">
<div className="flex h-full review-marquee-track w-max">
<div className="flex h-full review-marquee-set shrink-0">
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1599" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1600">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1601">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1602" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1603">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1604" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1605">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1606">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1607" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1608">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1609">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1610" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1611">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1612" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1613">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1614">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1615" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1616">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1617">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1618" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1619">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1620" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1621">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1622">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1623" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1624">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1625">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1626" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1627">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1628" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1629">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1630">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1631" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1632">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1633">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1634" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1635">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1636" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1637">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1638">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
</div>
<div className="flex h-full review-marquee-set shrink-0" aria-hidden="true">
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1599" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1600">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1601">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1602" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1603">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1604" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1605">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1606">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1607" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1608">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1609">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1610" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1611">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1612" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1613">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1614">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1615" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1616">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1617">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1618" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1619">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1620" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1621">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1622">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1623" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1624">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1625">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1626" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1627">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1628" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1629">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1630">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1631" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1632">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1633">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1634" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1635">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1636" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1637">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1638">
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
      <div className="absolute bg-[#191919] content-stretch flex flex-col gap-[32px] items-center left-[180px] py-[78px] rounded-[8px] top-[7523px] w-[1560px]" data-node-id="1:1639" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center leading-[0] not-italic relative shrink-0 text-center w-full" data-node-id="1:1640" data-name="Frame">
          <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-[40px] text-white w-[min-content] whitespace-pre-wrap" data-node-id="1:1641">
            <p className="mb-0">
              <span className="leading-[1.2]">{`Ready to Build `}</span>
              <span className="leading-[1.2] text-[#00b6ca]">{`Something `}</span>
            </p>
            <p>
              <span className="leading-[1.2] text-[#00b6ca]">{`Great `}</span>
              <span className="leading-[1.2]">and Scalable?</span>
            </p>
          </div>
          <div className="flex flex-col font-['Aileron:Regular'] justify-center relative shrink-0 text-[#e8e8e8] text-[20px] w-[1189px]" data-node-id="1:1642">
            <p className="leading-[1.5]">{`We're currently accepting new projects. Let's turn your vision into a high-performing digital product.`}</p>
          </div>
        </div>
        <div className="bg-[#00b6ca] content-stretch drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-node-id="1:1643" data-name="Component 57">
          <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]" data-node-id="I1:1643;40959:4952" data-name="Frame">
            <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="I1:1643;40959:4953">
              <p className="leading-[1.2] mb-0">LET’S TALK</p>
              <p className="leading-[1.2]">LET’S TALK</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="I1:1643;40959:5020" data-name="Frame">
            <div className="absolute left-0 size-[18px] top-0" data-node-id="I1:1643;40959:5021" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
            <div className="absolute left-0 size-[18px] top-[20px]" data-node-id="I1:1643;40959:5022" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
          </div>
        </div>
      </div>
      <Footer className="-translate-x-1/2 absolute bg-[#191919] bottom-[18px] h-[764px] left-1/2 overflow-clip rounded-[8px] w-[1872px]" />
      <div className="-translate-x-1/2 absolute block h-[2539px] left-1/2 pointer-events-none top-[974px] w-[1560px]" data-node-id="1:1645" data-name="Frame">
        <div className="absolute bottom-0 h-[2539px] left-0 top-0" data-node-id="1:1646">
          <div className="content-stretch flex flex-col gap-[64px] items-start pointer-events-auto pt-[60px] sticky top-0 w-[1560px]" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3e3e3e] text-[40px] text-left tracking-[0.8px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1647">
              <p className="mb-0">
                <span className="leading-[1.2]">{`Turn your ideas into `}</span>
                <span className="leading-[1.2] text-[#707070]">{`impactful `}</span>
              </p>
              <p className="leading-[1.2] text-[#707070]">solutions like them!</p>
            </div>
            <div className="bg-white content-stretch drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex h-[520px] items-center justify-center p-[24px] relative rounded-[24px] shrink-0 w-[1560px]" data-node-id="1:1648" data-name="Frame">
              <div className="bg-[#f6f6f6] content-stretch flex flex-[1_0_0] h-full items-center justify-between min-w-px relative rounded-[8px]" data-node-id="1:1649" data-name="Frame">
                <div className="content-stretch flex flex-col gap-[56px] h-[456px] items-start pb-[40px] pt-[10px] px-[24px] relative shrink-0 w-[708px]" data-node-id="1:1650" data-name="Frame">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-left w-full" data-node-id="1:1651" data-name="Frame">
                    <div className="flex flex-col font-['Inter:Italic'] font-normal italic justify-center relative shrink-0 text-[#2f2f2f] text-[16px] w-full" data-node-id="1:1652">
                      <p className="leading-[1.2]">Mobile App Design</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center not-italic relative shrink-0 text-[#2f2f2f] text-[28px] w-full" data-node-id="1:1653">
                      <p className="leading-[1.2]">Mighty School LMS</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1654">
                      <p className="leading-[1.3]">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px relative" data-node-id="1:1655" data-name="Frame">
                    <div className="[word-break:break-word] content-stretch flex gap-[59px] items-center leading-[0] not-italic relative shrink-0 text-left" data-node-id="1:1656" data-name="Frame">
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[147px]" data-node-id="1:1657" data-name="Frame">
                        <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1658">
                          <p className="leading-[1.3]">Pages in Projects</p>
                        </div>
                        <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#2f2f2f] text-[24px] w-full" data-node-id="1:1659">
                          <p className="leading-[1.2]">100+</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1:1660" data-name="Frame">
                        <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] whitespace-nowrap" data-node-id="1:1661">
                          <p className="leading-[1.3]">Project Duration</p>
                        </div>
                        <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1662">
                          <p className="leading-[1.2]">2 Months</p>
                        </div>
                      </div>
                    </div>
                    <Component61 className="bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" />
                  </div>
                </div>
                <div className="h-full relative rounded-[8px] shrink-0 w-[756px]" data-node-id="1:1664">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangle16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-[2016px] left-0 top-[523px]" data-node-id="1:1665">
          <div className="h-[816px] pointer-events-auto sticky top-0 w-[1560px]" data-name="Frame">
            <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex h-[520px] items-center justify-center left-0 p-[24px] rounded-[24px] top-[296px] w-[1560px]" data-node-id="1:1666" data-name="Frame">
              <div className="bg-[#f6f6f6] content-stretch flex flex-[1_0_0] h-full items-center justify-between min-w-px relative rounded-[8px]" data-node-id="1:1667" data-name="Frame">
                <div className="content-stretch flex flex-col gap-[56px] h-[456px] items-start pb-[40px] pt-[10px] px-[24px] relative shrink-0 w-[708px]" data-node-id="1:1668" data-name="Frame">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-left w-full" data-node-id="1:1669" data-name="Frame">
                    <div className="flex flex-col font-['Inter:Italic'] font-normal italic justify-center relative shrink-0 text-[#2f2f2f] text-[16px] w-full" data-node-id="1:1670">
                      <p className="leading-[1.2]">Mobile App Design</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center not-italic relative shrink-0 text-[#2f2f2f] text-[28px] w-full" data-node-id="1:1671">
                      <p className="leading-[1.2]">Mighty School LMS</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1672">
                      <p className="leading-[1.3]">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px relative" data-node-id="1:1673" data-name="Frame">
                    <div className="[word-break:break-word] content-stretch flex gap-[59px] items-center leading-[0] not-italic relative shrink-0 text-left" data-node-id="1:1674" data-name="Frame">
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[147px]" data-node-id="1:1675" data-name="Frame">
                        <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1676">
                          <p className="leading-[1.3]">Pages in Projects</p>
                        </div>
                        <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#2f2f2f] text-[24px] w-full" data-node-id="1:1677">
                          <p className="leading-[1.2]">100+</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1:1678" data-name="Frame">
                        <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] whitespace-nowrap" data-node-id="1:1679">
                          <p className="leading-[1.3]">Project Duration</p>
                        </div>
                        <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1680">
                          <p className="leading-[1.2]">2 Months</p>
                        </div>
                      </div>
                    </div>
                    <Component61 className="bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" />
                  </div>
                </div>
                <div className="h-full relative rounded-[8px] shrink-0 w-[756px]" data-node-id="1:1682">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangle16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-[1491px] left-0 top-[1048px]" data-node-id="1:1683">
          <div className="h-[891px] pointer-events-auto sticky top-0 w-[1560px]" data-name="Frame">
            <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex h-[520px] items-center justify-center left-0 p-[24px] rounded-[24px] top-[371px] w-[1560px]" data-node-id="1:1684" data-name="Frame">
              <div className="bg-[#f6f6f6] content-stretch flex flex-[1_0_0] h-full items-center justify-between min-w-px relative rounded-[8px]" data-node-id="1:1685" data-name="Frame">
                <div className="content-stretch flex flex-col gap-[56px] h-[456px] items-start pb-[40px] pt-[10px] px-[24px] relative shrink-0 w-[708px]" data-node-id="1:1686" data-name="Frame">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-left w-full" data-node-id="1:1687" data-name="Frame">
                    <div className="flex flex-col font-['Inter:Italic'] font-normal italic justify-center relative shrink-0 text-[#2f2f2f] text-[16px] w-full" data-node-id="1:1688">
                      <p className="leading-[1.2]">Mobile App Design</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center not-italic relative shrink-0 text-[#2f2f2f] text-[28px] w-full" data-node-id="1:1689">
                      <p className="leading-[1.2]">Mighty School LMS</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1690">
                      <p className="leading-[1.3]">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px relative" data-node-id="1:1691" data-name="Frame">
                    <div className="[word-break:break-word] content-stretch flex gap-[59px] items-center leading-[0] not-italic relative shrink-0 text-left" data-node-id="1:1692" data-name="Frame">
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[147px]" data-node-id="1:1693" data-name="Frame">
                        <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1694">
                          <p className="leading-[1.3]">Pages in Projects</p>
                        </div>
                        <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#2f2f2f] text-[24px] w-full" data-node-id="1:1695">
                          <p className="leading-[1.2]">100+</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1:1696" data-name="Frame">
                        <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] whitespace-nowrap" data-node-id="1:1697">
                          <p className="leading-[1.3]">Project Duration</p>
                        </div>
                        <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1698">
                          <p className="leading-[1.2]">2 Months</p>
                        </div>
                      </div>
                    </div>
                    <Component61 className="bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" />
                  </div>
                </div>
                <div className="h-full relative rounded-[8px] shrink-0 w-[756px]" data-node-id="1:1700">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangle16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-[979px] left-0 top-[1560px]" data-node-id="1:1701">
          <div className="h-[979px] pointer-events-auto sticky top-0 w-[1560px]" data-name="Frame">
            <div className="absolute bg-white content-stretch drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex h-[520px] items-center justify-center left-0 p-[24px] rounded-[24px] top-[459px] w-[1560px]" data-node-id="1:1702" data-name="Frame">
              <div className="bg-[#f6f6f6] content-stretch flex flex-[1_0_0] h-full items-center justify-between min-w-px relative rounded-[8px]" data-node-id="1:1703" data-name="Frame">
                <div className="content-stretch flex flex-col gap-[56px] h-[456px] items-start pb-[40px] pt-[10px] px-[24px] relative shrink-0 w-[708px]" data-node-id="1:1704" data-name="Frame">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-left w-full" data-node-id="1:1705" data-name="Frame">
                    <div className="flex flex-col font-['Inter:Italic'] font-normal italic justify-center relative shrink-0 text-[#2f2f2f] text-[16px] w-full" data-node-id="1:1706">
                      <p className="leading-[1.2]">Mobile App Design</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center not-italic relative shrink-0 text-[#2f2f2f] text-[28px] w-full" data-node-id="1:1707">
                      <p className="leading-[1.2]">Mighty School LMS</p>
                    </div>
                    <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1708">
                      <p className="leading-[1.3]">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px relative" data-node-id="1:1709" data-name="Frame">
                    <div className="[word-break:break-word] content-stretch flex gap-[59px] items-center leading-[0] not-italic relative shrink-0 text-left" data-node-id="1:1710" data-name="Frame">
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[147px]" data-node-id="1:1711" data-name="Frame">
                        <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1712">
                          <p className="leading-[1.3]">Pages in Projects</p>
                        </div>
                        <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#2f2f2f] text-[24px] w-full" data-node-id="1:1713">
                          <p className="leading-[1.2]">100+</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1:1714" data-name="Frame">
                        <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] whitespace-nowrap" data-node-id="1:1715">
                          <p className="leading-[1.3]">Project Duration</p>
                        </div>
                        <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1716">
                          <p className="leading-[1.2]">2 Months</p>
                        </div>
                      </div>
                    </div>
                    <Component61 className="bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" />
                  </div>
                </div>
                <div className="h-full relative rounded-[8px] shrink-0 w-[756px]" data-node-id="1:1718">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgRectangle16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#191919] block h-[2072px] left-1/2 overflow-clip rounded-[8px] top-[3673px] w-[1872px]" data-node-id="1:1719" data-name="Frame">
        <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[80px] items-start left-1/2 top-[130px] w-[1560px]" data-node-id="1:1720" data-name="Frame">
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-node-id="1:1721" data-name="Frame">
            <div className="bg-[#f5f5f5] content-stretch drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex flex-col gap-[32px] items-start relative rounded-[24px] shrink-0 w-[768px]" data-node-id="1:1722" data-name="Frame">
              <div className="h-[450px] relative rounded-[24px] shrink-0 w-full" data-node-id="1:1723">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgRectangle20} />
              </div>
              <div className="content-stretch flex flex-col gap-[56px] items-start pb-[32px] px-[32px] relative shrink-0 w-full" data-node-id="1:1724" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-left w-full" data-node-id="1:1725" data-name="Frame">
                  <div className="flex flex-col font-['Inter:Italic'] font-normal italic justify-center relative shrink-0 text-[#2f2f2f] text-[16px] w-full" data-node-id="1:1726">
                    <p className="leading-[1.2]">Mobile App Design</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center not-italic relative shrink-0 text-[#2f2f2f] text-[28px] w-full" data-node-id="1:1727">
                    <p className="leading-[1.2]">Mighty School LMS</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1728">
                    <p className="leading-[1.3]">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[149px] items-start justify-between relative shrink-0" data-node-id="1:1729" data-name="Frame">
                  <div className="[word-break:break-word] content-stretch flex gap-[59px] items-center leading-[0] not-italic relative shrink-0 text-left" data-node-id="1:1730" data-name="Frame">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[147px]" data-node-id="1:1731" data-name="Frame">
                      <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1732">
                        <p className="leading-[1.3]">Pages in Projects</p>
                      </div>
                      <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#2f2f2f] text-[24px] w-full" data-node-id="1:1733">
                        <p className="leading-[1.2]">100+</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1:1734" data-name="Frame">
                      <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] whitespace-nowrap" data-node-id="1:1735">
                        <p className="leading-[1.3]">Project Duration</p>
                      </div>
                      <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1736">
                        <p className="leading-[1.2]">2 Months</p>
                      </div>
                    </div>
                  </div>
                  <Component61 className="bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" />
                </div>
              </div>
            </div>
            <div className="bg-[#f5f5f5] content-stretch drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex flex-col gap-[32px] items-start relative rounded-[24px] shrink-0 w-[768px]" data-node-id="1:1738" data-name="Frame">
              <div className="h-[450px] relative rounded-[24px] shrink-0 w-full" data-node-id="1:1739">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgRectangle21} />
              </div>
              <div className="content-stretch flex flex-col gap-[56px] items-start pb-[32px] px-[32px] relative shrink-0 w-full" data-node-id="1:1740" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-left w-full" data-node-id="1:1741" data-name="Frame">
                  <div className="flex flex-col font-['Inter:Italic'] font-normal italic justify-center relative shrink-0 text-[#2f2f2f] text-[16px] w-full" data-node-id="1:1742">
                    <p className="leading-[1.2]">Mobile App Design</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center not-italic relative shrink-0 text-[#2f2f2f] text-[28px] w-full" data-node-id="1:1743">
                    <p className="leading-[1.2]">Mighty School LMS</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1744">
                    <p className="leading-[1.3]">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[149px] items-start justify-between relative shrink-0" data-node-id="1:1745" data-name="Frame">
                  <div className="[word-break:break-word] content-stretch flex gap-[59px] items-center leading-[0] not-italic relative shrink-0 text-left" data-node-id="1:1746" data-name="Frame">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[147px]" data-node-id="1:1747" data-name="Frame">
                      <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1748">
                        <p className="leading-[1.3]">Pages in Projects</p>
                      </div>
                      <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#2f2f2f] text-[24px] w-full" data-node-id="1:1749">
                        <p className="leading-[1.2]">100+</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1:1750" data-name="Frame">
                      <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] whitespace-nowrap" data-node-id="1:1751">
                        <p className="leading-[1.3]">Project Duration</p>
                      </div>
                      <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1752">
                        <p className="leading-[1.2]">2 Months</p>
                      </div>
                    </div>
                  </div>
                  <Component61 className="bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-node-id="1:1754" data-name="Frame">
            <div className="bg-[#f5f5f5] content-stretch drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex flex-col gap-[32px] items-start relative rounded-[24px] shrink-0 w-[768px]" data-node-id="1:1755" data-name="Frame">
              <div className="h-[450px] relative rounded-[24px] shrink-0 w-full" data-node-id="1:1756">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgRectangle22} />
              </div>
              <div className="content-stretch flex flex-col gap-[56px] items-start pb-[32px] px-[32px] relative shrink-0 w-full" data-node-id="1:1757" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-left w-full" data-node-id="1:1758" data-name="Frame">
                  <div className="flex flex-col font-['Inter:Italic'] font-normal italic justify-center relative shrink-0 text-[#2f2f2f] text-[16px] w-full" data-node-id="1:1759">
                    <p className="leading-[1.2]">Mobile App Design</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center not-italic relative shrink-0 text-[#2f2f2f] text-[28px] w-full" data-node-id="1:1760">
                    <p className="leading-[1.2]">Mighty School LMS</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1761">
                    <p className="leading-[1.3]">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[149px] items-start justify-between relative shrink-0" data-node-id="1:1762" data-name="Frame">
                  <div className="[word-break:break-word] content-stretch flex gap-[59px] items-center leading-[0] not-italic relative shrink-0 text-left" data-node-id="1:1763" data-name="Frame">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[147px]" data-node-id="1:1764" data-name="Frame">
                      <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1765">
                        <p className="leading-[1.3]">Pages in Projects</p>
                      </div>
                      <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#2f2f2f] text-[24px] w-full" data-node-id="1:1766">
                        <p className="leading-[1.2]">100+</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1:1767" data-name="Frame">
                      <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] whitespace-nowrap" data-node-id="1:1768">
                        <p className="leading-[1.3]">Project Duration</p>
                      </div>
                      <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1769">
                        <p className="leading-[1.2]">2 Months</p>
                      </div>
                    </div>
                  </div>
                  <Component61 className="bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" />
                </div>
              </div>
            </div>
            <div className="bg-[#f5f5f5] content-stretch drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex flex-col gap-[32px] items-start relative rounded-[24px] shrink-0 w-[768px]" data-node-id="1:1771" data-name="Frame">
              <div className="h-[450px] relative rounded-[24px] shrink-0 w-full" data-node-id="1:1772">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[24px] size-full" src={imgRectangle20} />
              </div>
              <div className="content-stretch flex flex-col gap-[56px] items-start pb-[32px] px-[32px] relative shrink-0 w-full" data-node-id="1:1773" data-name="Frame">
                <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[0] relative shrink-0 text-left w-full" data-node-id="1:1774" data-name="Frame">
                  <div className="flex flex-col font-['Inter:Italic'] font-normal italic justify-center relative shrink-0 text-[#2f2f2f] text-[16px] w-full" data-node-id="1:1775">
                    <p className="leading-[1.2]">Mobile App Design</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center not-italic relative shrink-0 text-[#2f2f2f] text-[28px] w-full" data-node-id="1:1776">
                    <p className="leading-[1.2]">Mighty School LMS</p>
                  </div>
                  <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center not-italic relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1777">
                    <p className="leading-[1.3]">{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[149px] items-start justify-between relative shrink-0" data-node-id="1:1778" data-name="Frame">
                  <div className="[word-break:break-word] content-stretch flex gap-[59px] items-center leading-[0] not-italic relative shrink-0 text-left" data-node-id="1:1779" data-name="Frame">
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[147px]" data-node-id="1:1780" data-name="Frame">
                      <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] w-full" data-node-id="1:1781">
                        <p className="leading-[1.3]">Pages in Projects</p>
                      </div>
                      <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#2f2f2f] text-[24px] w-full" data-node-id="1:1782">
                        <p className="leading-[1.2]">100+</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-node-id="1:1783" data-name="Frame">
                      <div className="flex flex-col font-['Inter:Regular'] font-normal justify-center relative shrink-0 text-[#3e3e3e] text-[18px] whitespace-nowrap" data-node-id="1:1784">
                        <p className="leading-[1.3]">Project Duration</p>
                      </div>
                      <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center min-w-full relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1785">
                        <p className="leading-[1.2]">2 Months</p>
                      </div>
                    </div>
                  </div>
                  <Component61 className="bg-[#171717] content-stretch flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#f6f6f6] content-stretch flex items-center justify-between left-1/2 px-[16px] py-[12px] rounded-[4px] top-[56px] w-[1560px]" data-node-id="1:1787" data-name="Nav">
        <a href="/" className="block cursor-pointer h-[40px] relative shrink-0 w-[175px]" data-node-id="1:1788" data-name="Update Logo">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpdateLogo1} />
        </a>
        <div className="[word-break:break-word] content-stretch flex gap-[32px] items-center justify-center not-italic relative shrink-0 text-[16px] uppercase whitespace-nowrap" data-node-id="1:1796" data-name="Frame">
          <a href="/services" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:1797">
            <p className="leading-[1.2]">Services</p>
          </a>
          <a href="/work" className="block font-['Inter:Semi_Bold'] font-semibold leading-[1.2] relative shrink-0 text-[#00b6ca]" data-node-id="1:1798" aria-current="page">Work</a>
          <a href="/blog" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:1799">
            <p className="leading-[1.2]">blog</p>
          </a>
          <a href="/company" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:1800">
            <p className="leading-[1.2]">Company</p>
          </a>
          <a href="/contact" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:1801">
            <p className="leading-[1.2]">Contact Us</p>
          </a>
        </div>
        <div className="bg-[#00b6ca] content-stretch drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-node-id="1:1802" data-name="Component 57">
          <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]" data-node-id="I1:1802;40959:4952" data-name="Frame">
            <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="I1:1802;40959:4953">
              <p className="leading-[1.2] mb-0">LET’S TALK</p>
              <p className="leading-[1.2]">LET’S TALK</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="I1:1802;40959:5020" data-name="Frame">
            <div className="absolute left-0 size-[18px] top-0" data-node-id="I1:1802;40959:5021" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
            <div className="absolute left-0 size-[18px] top-[20px]" data-node-id="I1:1802;40959:5022" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}