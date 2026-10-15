import WorkingProcessSteps from "@/components/WorkingProcessSteps";
import LatestBlogCards from "@/components/LatestBlogCards";
import Footer from "@/components/Footer";
import ArrowButton from "@/components/ArrowButton";

const assetPathPrefix = "/assets/ui-ux-design";
const imgRectangle17 = "/assets/shared/images/reviewer-avatar.jpg";
const imgRectangle24 = `${assetPathPrefix}/894da.webp`;
const imgUpworkLogo1 = "/assets/shared/logos/upwork.svg";
const imgGroup2 = "/assets/shared/logos/fiverr-grey.svg";
const imgGoogleGLogo1 = "/assets/shared/logos/google.svg";
const imgStar1 = "/assets/shared/icons/star.svg";
const imgGroup3 = "/assets/shared/icons/star-half.svg";
const imgGroup4 = "/assets/shared/logos/fiverr.svg";
const imgArrowSubdirectoryForward1 = "/assets/shared/icons/arrow-subdirectory-light.svg";
const imgArrow1 = `${assetPathPrefix}/0d95e.svg`;
const imgCheckDouble = `${assetPathPrefix}/9e1bc.svg`;

type FrameProps = {
  className?: string;
  property1?: "Default";
};

function Frame({ className, property1 = "Default" }: FrameProps) {
  return (
    <div className={className || "bg-[#191919] h-[1080px] overflow-clip relative rounded-[8px] w-[1872px]"} data-node-id="1:198">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[854px] left-1/2 top-1/2 w-[1560px]" data-node-id="1:199" data-name="Frame">
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-0 not-italic text-[#f9f9f9] text-[40px] top-[48px] tracking-[0.8px] w-[1560px] whitespace-pre-wrap" data-node-id="1:200">
          <p className="mb-0">
            <span className="leading-[1.2]">Our Working Process That Drives</span>
            <span className="leading-[1.2] text-[#a9a9a9]">{` Growth `}</span>
          </p>
          <p className="leading-[1.2] text-[#a9a9a9]">With Clear Direction</p>
        </div>
        <WorkingProcessSteps />
      </div>
    </div>
  );
}

export default function UiUxDesign() {
  return (
    <div className="bg-[#f5f5f5] figma-canvas relative w-[1920px] h-[6457px]" data-node-id="1:1368" data-name="Services">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[64px] items-center left-1/2 top-[3586px] w-[1560px]" data-node-id="1:1369" data-name="Frame">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3e3e3e] text-[40px] tracking-[0.8px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1370">
          <p className="mb-0">
            <span className="leading-[1.2]">{`Growth Insights That Drive `}</span>
            <span className="leading-[1.2] text-[#707070]">{`Measurable `}</span>
          </p>
          <p className="leading-[1.2] text-[#707070]">{`Business Success `}</p>
        </div>
        <LatestBlogCards />
        <ArrowButton href="/blog" label="ALL ARTICLES" />
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[64px] items-center left-1/2 top-[4378px] w-[1560px]" data-node-id="1:1376" data-name="Frame">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3e3e3e] text-[40px] tracking-[0.8px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1377">
          <p className="mb-0">
            <span className="leading-[1.2]">{`Find your best design into us. `}</span>
            <span className="leading-[1.2] text-[#707070]">{`We `}</span>
          </p>
          <p className="leading-[1.2] text-[#707070]">guarantee next success is yours!</p>
        </div>
        <div className="bg-white content-stretch flex h-[513px] items-center overflow-clip relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[1560px]" data-node-id="1:1378" data-name="Frame">
<div className="bg-white z-[1] border-[rgba(0,0,0,0.1)] border-r border-solid content-stretch flex flex-col h-full items-center justify-between px-[24px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1379" data-name="Frame">
            <div className="content-stretch flex items-center justify-between opacity-0 relative shrink-0 w-full" data-node-id="1:1380" data-name="Frame">
              <div className="h-[40px] relative shrink-0 w-[80px]" data-node-id="1:1381" data-name="Upwork-logo 1">
                <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgUpworkLogo1} />
              </div>
              <div className="h-[22px] relative shrink-0 w-[83.207px]" data-node-id="1:1384" data-name="Group">
                <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="1:1389" data-name="Google__G__logo 1">
                <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgGoogleGLogo1} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[200px]" data-node-id="1:1395" data-name="Frame">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[100px] text-center tracking-[2px] w-full" data-node-id="1:1396">
                <p className="leading-[1.2]">4.9</p>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:1397" data-name="Frame">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:1398" data-name="Star">
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1399">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" loading="lazy" decoding="async" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1400">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" loading="lazy" decoding="async" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1401">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" loading="lazy" decoding="async" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1402">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" loading="lazy" decoding="async" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1403">
                    <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgGroup3} />
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[28px] text-center w-full" data-node-id="1:1406">
                  <p className="leading-[1.2]">200+ reviews</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:1407" data-name="Frame">
              <div className="h-[40px] relative shrink-0 w-[80px]" data-node-id="1:1408" data-name="Upwork-logo 1">
                <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgUpworkLogo1} />
              </div>
              <div className="h-[22px] relative shrink-0 w-[83.207px]" data-node-id="1:1411" data-name="Group">
                <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="1:1416" data-name="Google__G__logo 1">
                <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgGoogleGLogo1} />
              </div>
            </div>
          </div>
<div className="flex-[1_0_0] h-full min-w-px overflow-clip relative review-marquee">
<div className="flex h-full review-marquee-track w-max">
<div className="flex h-full review-marquee-set shrink-0">
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1422" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1423">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1424">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1425" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1426">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1427" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1428">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1429">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1430" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1431">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1432">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1433" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1434">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1435" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1436">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1437">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1438" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1439">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1440">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1441" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1442">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1443" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1444">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1445">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1446" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1447">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1448">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1449" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1450">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1451" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1452">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1453">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1454" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1455">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1456">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1457" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1458">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1459" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1460">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1461">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
</div>
<div className="flex h-full review-marquee-set shrink-0" aria-hidden="true">
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1422" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1423">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1424">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1425" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1426">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1427" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1428">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1429">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1430" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1431">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1432">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1433" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1434">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1435" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1436">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1437">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1438" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1439">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1440">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1441" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1442">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1443" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1444">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1445">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1446" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1447">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1448">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1449" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1450">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1451" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1452">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1453">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1454" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1455">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1456">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1457" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1458">
                <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1459" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1460">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1461">
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
      <div className="-translate-x-1/2 absolute bg-[#191919] content-stretch flex flex-col gap-[32px] items-center left-1/2 py-[78px] rounded-[8px] top-[5211px] w-[1560px]" data-node-id="1:1462" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center leading-[0] not-italic relative shrink-0 text-center w-full" data-node-id="1:1463" data-name="Frame">
          <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-[40px] text-white w-[min-content] whitespace-pre-wrap" data-node-id="1:1464">
            <p className="mb-0">
              <span className="leading-[1.2]">{`Ready to Build `}</span>
              <span className="leading-[1.2] text-[#00b6ca]">{`Something `}</span>
            </p>
            <p>
              <span className="leading-[1.2] text-[#00b6ca]">{`Great `}</span>
              <span className="leading-[1.2]">and Scalable?</span>
            </p>
          </div>
          <div className="flex flex-col font-['Aileron:Regular'] justify-center relative shrink-0 text-[#e8e8e8] text-[20px] w-[1189px]" data-node-id="1:1465">
            <p className="leading-[1.5]">{`We're currently accepting new projects. Let's turn your vision into a high-performing digital product.`}</p>
          </div>
        </div>
        <div className="bg-[#00b6ca] content-stretch drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-node-id="1:1466" data-name="Component 57">
          <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]" data-node-id="I1:1466;40959:4952" data-name="Frame">
            <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="I1:1466;40959:4953">
              <p className="leading-[1.2] mb-0">LET’S TALK</p>
              <p className="leading-[1.2]">LET’S TALK</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="I1:1466;40959:5020" data-name="Frame">
            <div className="absolute left-0 size-[18px] top-0" data-node-id="I1:1466;40959:5021" data-name="arrow-subdirectory-forward">
              <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward1} />
            </div>
            <div className="absolute left-0 size-[18px] top-[20px]" data-node-id="I1:1466;40959:5022" data-name="arrow-subdirectory-forward">
              <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward1} />
            </div>
          </div>
        </div>
      </div>
      <Footer className="-translate-x-1/2 absolute bg-[#191919] bottom-[18px] h-[764px] left-1/2 overflow-clip rounded-[8px] w-[1872px]" />
      <div className="absolute h-[223px] left-[180px] top-[184px] w-[1560px]" data-node-id="1:1468" data-name="Frame">
        <p className="-translate-x-full [word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-[1560px] not-italic text-[#171717] text-[0px] text-right top-[101px] tracking-[1.28px] whitespace-nowrap" data-node-id="1:1469">
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[32px]">{`WE offer `}</span>
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#33c5d5] text-[32px]">innovative</span>
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[32px]">
            <br aria-hidden />
          </span>
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#33c5d5] text-[32px]">solutions</span>
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[32px]">
            {` that`}
            <br aria-hidden />
          </span>
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#33c5d5] text-[32px]">captivate</span>
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[32px]">{` customers.`}</span>
        </p>
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[1.2] left-0 not-italic text-[#171717] text-[72px] top-0 tracking-[8.64px] whitespace-nowrap" data-node-id="1:1470">
          UI/UX DESIGN
        </p>
        <div className="absolute flex h-[26.548px] items-center justify-center left-[628.22px] top-[21.96px] w-[29.92px]" data-node-id="1:1471">
          <div className="flex-none rotate-[-41.58deg]">
            <div className="h-0 relative w-[40px]">
              <div className="absolute inset-[-14.73px_-5%_-14.73px_0]">
                <img alt="" loading="lazy" decoding="async" className="block max-w-none size-full" src={imgArrow1} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute contents left-1/2 top-[488px]" data-node-id="1:1472" data-name="Group">
        <div className="-translate-x-1/2 absolute bg-[#efece5] h-[800px] left-1/2 rounded-[24px] top-[488px] w-[1560px]" data-node-id="1:1473" />
        <div className="-translate-x-1/2 absolute h-[800px] left-1/2 rounded-[24px] top-[488px] w-[1560px]" data-node-id="1:1474">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[24px]">
            <img alt="" loading="lazy" decoding="async" className="absolute h-[129.97%] left-[-0.02%] max-w-none top-[-15.04%] w-full" src={imgRectangle24} />
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex gap-[24px] items-start left-1/2 top-[1448px] w-[1560px]" data-node-id="1:1475" data-name="Frame">
        <div className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[0] not-italic relative shrink-0 text-[#2f2f2f] text-[32px] w-[636px] whitespace-pre-wrap" data-node-id="1:1476">
          <p className="leading-[1.3] mb-0">{`User-centered design that transforms `}</p>
          <p className="mb-0">
            <span className="leading-[1.3]">{`complex problems `}</span>
            <span className="leading-[1.3] text-[#00b6ca]">{`into intuitive, `}</span>
          </p>
          <p>
            <span className="leading-[1.3] text-[#00b6ca]">beautiful</span>
            <span className="leading-[1.3]">{` interfaces.`}</span>
          </p>
        </div>
        <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[901px]" data-node-id="1:1477" data-name="Frame">
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.3] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[24px] w-[min-content]" data-node-id="1:1478">
            Great design is invisible — it guides users effortlessly toward their goals. Our design team combines deep user research with craft-level execution to create interfaces that are both beautiful and functional. We design systems, not just screens.
          </p>
          <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[683px]" data-node-id="1:1479" data-name="Frame">
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-node-id="1:1480" data-name="Frame">
              <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[8px] items-center px-[24px] py-[13px] relative rounded-[999px] shrink-0" data-node-id="1:1481" data-name="Frame">
                <div className="relative shrink-0 size-[24px]" data-node-id="1:1482" data-name="check-double">
                  <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgCheckDouble} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.3] not-italic relative shrink-0 text-[#2f2f2f] text-[18px] whitespace-nowrap" data-node-id="1:1483">{`User research & testing`}</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[8px] items-center px-[24px] py-[13px] relative rounded-[999px] shrink-0" data-node-id="1:1484" data-name="Frame">
                <div className="relative shrink-0 size-[24px]" data-node-id="1:1485" data-name="check-double">
                  <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgCheckDouble} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.3] not-italic relative shrink-0 text-[#2f2f2f] text-[18px] whitespace-nowrap" data-node-id="1:1486">{`Information architecture `}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-node-id="1:1487" data-name="Frame">
              <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[8px] items-center px-[24px] py-[13px] relative rounded-[999px] shrink-0" data-node-id="1:1488" data-name="Frame">
                <div className="relative shrink-0 size-[24px]" data-node-id="1:1489" data-name="check-double">
                  <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgCheckDouble} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.3] not-italic relative shrink-0 text-[#2f2f2f] text-[18px] whitespace-nowrap" data-node-id="1:1490">{`Wireframing & prototyping `}</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[8px] items-center px-[24px] py-[13px] relative rounded-[999px] shrink-0" data-node-id="1:1491" data-name="Frame">
                <div className="relative shrink-0 size-[24px]" data-node-id="1:1492" data-name="check-double">
                  <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgCheckDouble} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.3] not-italic relative shrink-0 text-[#2f2f2f] text-[18px] whitespace-nowrap" data-node-id="1:1493">{`Visual design & branding `}</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-node-id="1:1494" data-name="Frame">
              <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[8px] items-center px-[24px] py-[13px] relative rounded-[999px] shrink-0" data-node-id="1:1495" data-name="Frame">
                <div className="relative shrink-0 size-[24px]" data-node-id="1:1496" data-name="check-double">
                  <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgCheckDouble} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.3] not-italic relative shrink-0 text-[#2f2f2f] text-[18px] whitespace-nowrap" data-node-id="1:1497">{`Design systems `}</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[8px] items-center px-[24px] py-[13px] relative rounded-[999px] shrink-0" data-node-id="1:1498" data-name="Frame">
                <div className="relative shrink-0 size-[24px]" data-node-id="1:1499" data-name="check-double">
                  <img alt="" loading="lazy" decoding="async" className="absolute block inset-0 max-w-none size-full" src={imgCheckDouble} />
                </div>
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.3] not-italic relative shrink-0 text-[#2f2f2f] text-[18px] whitespace-nowrap" data-node-id="1:1500">{`Accessibility audits `}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute content-stretch flex gap-[24px] items-start left-1/2 not-italic text-[#2f2f2f] top-[1882px] w-[1560px]" data-node-id="1:1501" data-name="Frame">
        <p className="font-['Inter:Bold'] font-bold leading-[0] relative shrink-0 text-[32px] w-[636px]" data-node-id="1:1502">
          <span className="leading-[1.3]">{`What You Get From Our `}</span>
          <span className="leading-[1.3] text-[#00b6ca]">End-to-End Digital</span>
          <span className="leading-[1.3]">{` Expertise`}</span>
        </p>
        <div className="content-stretch flex flex-col gap-[24px] items-start justify-center relative shrink-0 w-[900px]" data-node-id="1:1503" data-name="Frame">
          <div className="content-stretch flex flex-col gap-[6px] h-[58px] items-start relative shrink-0 w-full" data-node-id="1:1504" data-name="Frame">
            <ol className="block font-['Inter:Medium'] font-medium leading-[0] list-decimal relative shrink-0 text-[24px] w-[503px]" data-node-id="1:1505" start={1}>
              <li className="ms-[36px]">
                <span className="leading-[1.3]">{`Research Report `}</span>
              </li>
            </ol>
            <p className="font-['Inter:Regular'] font-normal leading-[1.3] min-w-full relative shrink-0 text-[18px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1506">{`       User interviews, competitive analysis, and actionable insights.`}</p>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] h-[58px] items-start relative shrink-0 w-full" data-node-id="1:1507" data-name="Frame">
            <ol className="block font-['Inter:Medium'] font-medium leading-[0] list-decimal relative shrink-0 text-[24px] w-[503px]" data-node-id="1:1508" start={2}>
              <li className="ms-[36px]">
                <span className="leading-[1.3]">Figma Design Files</span>
              </li>
            </ol>
            <p className="font-['Inter:Regular'] font-normal leading-[1.3] min-w-full relative shrink-0 text-[18px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1509">{`       Fully annotated, developer-ready designs for every screen and state. `}</p>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] h-[58px] items-start relative shrink-0 w-full" data-node-id="1:1510" data-name="Frame">
            <ol className="block font-['Inter:Medium'] font-medium leading-[0] list-decimal relative shrink-0 text-[24px] w-[503px]" data-node-id="1:1511" start={3}>
              <li className="ms-[36px]">
                <span className="leading-[1.3]">Design System</span>
              </li>
            </ol>
            <p className="font-['Inter:Regular'] font-normal leading-[1.3] min-w-full relative shrink-0 text-[18px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1512">{`       A scalable component library with tokens, patterns, and guidelines. `}</p>
          </div>
          <div className="content-stretch flex flex-col gap-[6px] h-[58px] items-start relative shrink-0 w-full" data-node-id="1:1513" data-name="Frame">
            <ol className="block font-['Inter:Medium'] font-medium leading-[0] list-decimal relative shrink-0 text-[24px] w-[503px]" data-node-id="1:1514" start={4}>
              <li className="ms-[36px]">
                <span className="leading-[1.3]">Usability Report</span>
              </li>
            </ol>
            <p className="font-['Inter:Regular'] font-normal leading-[1.3] min-w-full relative shrink-0 text-[18px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1515">{`       Validated designs with real user feedback and iteration notes. `}</p>
          </div>
        </div>
      </div>
      <Frame className="-translate-x-1/2 absolute bg-[#191919] h-[1080px] left-1/2 overflow-clip rounded-[8px] top-[2346px] w-[1872px]" />
    </div>
  );
}