import HeroVideo from "@/components/HeroVideo";
import LatestBlogCards from "@/components/LatestBlogCards";
import Footer from "@/components/Footer";
import ArrowButton from "@/components/ArrowButton";

const imgProperty1Up = "/assets/shared/icons/scroll-down.svg";
const imgArrowForwardLong = "/assets/shared/icons/arrow-forward-long.svg";
const imgRectangle17 = "/assets/shared/images/reviewer-avatar.jpg";
const imgRectangle22 = "/assets/services/98189.png";
const imgRectangle23 = "/assets/services/2e9f2.png";
const imgRectangle24 = "/assets/services/55f86.png";
const imgRectangle25 = "/assets/services/51e90.png";
const imgUpworkLogo1 = "/assets/shared/logos/upwork.svg";
const imgGroup2 = "/assets/shared/logos/fiverr-grey.svg";
const imgGoogleGLogo1 = "/assets/shared/logos/google.svg";
const imgStar1 = "/assets/shared/icons/star.svg";
const imgGroup3 = "/assets/shared/icons/star-half.svg";
const imgGroup4 = "/assets/shared/logos/fiverr.svg";
const imgArrowSubdirectoryForward = "/assets/shared/icons/arrow-subdirectory-light.svg";
const imgUpdateLogo1 = "/assets/shared/logos/designops-logo.svg";

type Component10Props = {
  className?: string;
  property1?: "View";
};

function Component10({ className, property1 = "View" }: Component10Props) {
  return (
    <div className={className || "h-[18px] overflow-clip relative w-[120px]"} data-node-id="1:591">
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] left-0 not-italic text-[#bebebe] text-[16px] top-[19px] tracking-[1.92px] whitespace-nowrap" data-node-id="1:592">
        <p className="leading-[1.2] mb-0">LEARN MORE</p>
        <p className="leading-[1.2] text-[#bfd613]">LEARN MORE</p>
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

export default function Services() {
  return (
    <div className="bg-[#f5f5f5] figma-canvas relative w-[1920px] h-[6085px]" data-node-id="1:1235" data-name="Services">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[64px] items-center left-1/2 top-[3214px] w-[1560px]" data-node-id="1:1236" data-name="Frame">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3e3e3e] text-[40px] tracking-[0.8px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1237">
          <p className="mb-0">
            <span className="leading-[1.2]">{`Growth Insights That Drive `}</span>
            <span className="leading-[1.2] text-[#707070]">{`Measurable `}</span>
          </p>
          <p className="leading-[1.2] text-[#707070]">{`Business Success `}</p>
        </div>
        <LatestBlogCards />
        <ArrowButton href="/blog" label="ALL ARTICLES" />
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[64px] items-center left-1/2 top-[4006px] w-[1560px]" data-node-id="1:1243" data-name="Frame">
        <div className="[word-break:break-word] flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#3e3e3e] text-[40px] tracking-[0.8px] w-[min-content] whitespace-pre-wrap" data-node-id="1:1244">
          <p className="mb-0">
            <span className="leading-[1.2]">{`Find your best design into us. `}</span>
            <span className="leading-[1.2] text-[#707070]">{`We `}</span>
          </p>
          <p className="leading-[1.2] text-[#707070]">guarantee next success is yours!</p>
        </div>
        <div className="bg-white content-stretch flex h-[513px] items-center overflow-clip relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[1560px]" data-node-id="1:1245" data-name="Frame">
<div className="bg-white z-[1] border-[rgba(0,0,0,0.1)] border-r border-solid content-stretch flex flex-col h-full items-center justify-between px-[24px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1246" data-name="Frame">
            <div className="content-stretch flex items-center justify-between opacity-0 relative shrink-0 w-full" data-node-id="1:1247" data-name="Frame">
              <div className="h-[40px] relative shrink-0 w-[80px]" data-node-id="1:1248" data-name="Upwork-logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpworkLogo1} />
              </div>
              <div className="h-[22px] relative shrink-0 w-[83.207px]" data-node-id="1:1251" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="1:1256" data-name="Google__G__logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGoogleGLogo1} />
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-[200px]" data-node-id="1:1262" data-name="Frame">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[100px] text-center tracking-[2px] w-full" data-node-id="1:1263">
                <p className="leading-[1.2]">4.9</p>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-node-id="1:1264" data-name="Frame">
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="1:1265" data-name="Star">
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1266">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1267">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1268">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1269">
                    <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
                      <img alt="" className="block max-w-none size-full" src={imgStar1} />
                    </div>
                  </div>
                  <div className="relative shrink-0 size-[40px]" data-node-id="1:1270">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup3} />
                  </div>
                </div>
                <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[28px] text-center w-full" data-node-id="1:1273">
                  <p className="leading-[1.2]">200+ reviews</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:1274" data-name="Frame">
              <div className="h-[40px] relative shrink-0 w-[80px]" data-node-id="1:1275" data-name="Upwork-logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpworkLogo1} />
              </div>
              <div className="h-[22px] relative shrink-0 w-[83.207px]" data-node-id="1:1278" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
              </div>
              <div className="relative shrink-0 size-[24px]" data-node-id="1:1283" data-name="Google__G__logo 1">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGoogleGLogo1} />
              </div>
            </div>
          </div>
<div className="flex-[1_0_0] h-full min-w-px overflow-clip relative review-marquee">
<div className="flex h-full review-marquee-track w-max">
<div className="flex h-full review-marquee-set shrink-0">
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1289" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1290">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1291">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1292" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1293">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1294" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1295">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1296">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1297" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1298">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1299">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1300" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1301">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1302" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1303">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1304">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1305" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1306">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1307">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1308" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1309">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1310" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1311">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1312">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1313" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1314">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1315">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1316" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1317">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1318" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1319">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1320">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1321" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1322">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1323">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1324" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1325">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1326" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1327">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1328">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
</div>
<div className="flex h-full review-marquee-set shrink-0" aria-hidden="true">
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1289" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1290">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1291">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1292" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1293">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1294" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1295">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1296">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1297" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1298">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1299">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1300" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1301">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1302" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1303">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1304">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1305" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1306">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1307">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1308" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1309">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1310" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1311">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1312">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1313" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1314">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1315">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1316" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1317">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1318" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1319">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1320">
                  <p className="leading-[1.2]">CTO</p>
                </div>
              </div>
            </div>
          </div>
<div className="content-stretch flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]" data-node-id="1:1321" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#2f2f2f] text-[18px] w-[min-content]" data-node-id="1:1322">
              <p className="leading-[1.2]">TechFlow Inc.</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#222] text-[24px] w-[min-content]" data-node-id="1:1323">
              <p className="leading-[1.3]">{`"DesignOps didn't just build our platform; they redefined our entire brand strategy. The attention to detail is unmatched."`}</p>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-node-id="1:1324" data-name="Frame">
              <div className="relative rounded-[999px] shrink-0 size-[50px]" data-node-id="1:1325">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[999px] size-full" src={imgRectangle17} />
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-[123px]" data-node-id="1:1326" data-name="Frame">
                <div className="flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center relative shrink-0 text-[#2f2f2f] text-[18px] text-center w-full" data-node-id="1:1327">
                  <p className="leading-[1.2]">Sarah Jenkins</p>
                </div>
                <div className="flex flex-col font-['Inter:Medium'] font-medium justify-center relative shrink-0 text-[#505050] text-[16px] w-full" data-node-id="1:1328">
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
      <div className="absolute bg-[#191919] content-stretch flex flex-col gap-[32px] items-center left-[180px] py-[78px] rounded-[8px] top-[4839px] w-[1560px]" data-node-id="1:1329" data-name="Frame">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-center leading-[0] not-italic relative shrink-0 text-center w-full" data-node-id="1:1330" data-name="Frame">
          <div className="flex flex-col font-['Inter:Bold'] font-bold justify-center min-w-full relative shrink-0 text-[40px] text-white w-[min-content] whitespace-pre-wrap" data-node-id="1:1331">
            <p className="mb-0">
              <span className="leading-[1.2]">{`Ready to Build `}</span>
              <span className="leading-[1.2] text-[#00b6ca]">{`Something `}</span>
            </p>
            <p>
              <span className="leading-[1.2] text-[#00b6ca]">{`Great `}</span>
              <span className="leading-[1.2]">and Scalable?</span>
            </p>
          </div>
          <div className="flex flex-col font-['Aileron:Regular'] justify-center relative shrink-0 text-[#e8e8e8] text-[20px] w-[1189px]" data-node-id="1:1332">
            <p className="leading-[1.5]">{`We're currently accepting new projects. Let's turn your vision into a high-performing digital product.`}</p>
          </div>
        </div>
        <div className="bg-[#00b6ca] content-stretch drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-node-id="1:1333" data-name="Component 57">
          <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]" data-node-id="I1:1333;40959:4952" data-name="Frame">
            <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="I1:1333;40959:4953">
              <p className="leading-[1.2] mb-0">LET’S TALK</p>
              <p className="leading-[1.2]">LET’S TALK</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="I1:1333;40959:5020" data-name="Frame">
            <div className="absolute left-0 size-[18px] top-0" data-node-id="I1:1333;40959:5021" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
            <div className="absolute left-0 size-[18px] top-[20px]" data-node-id="I1:1333;40959:5022" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
          </div>
        </div>
      </div>
      <Footer className="-translate-x-1/2 absolute bg-[#191919] bottom-[18px] h-[764px] left-1/2 overflow-clip rounded-[8px] w-[1872px]" />
      <div className="-translate-x-1/2 absolute bg-[#2b2b2b] h-[870px] left-1/2 overflow-clip rounded-[8px] top-[24px] w-[1872px]" data-node-id="1:1335" data-name="Hero">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(54.17%-66px)] top-[calc(50%+27.5px)]" data-node-id="1:1336" data-name="image">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[980px] left-1/2 top-1/2 w-[1920px]" data-node-id="1:1337" data-name="Video">
            <HeroVideo name="services.mp4" />
          </div>
          <div className="absolute bg-gradient-to-r from-[16.438%] from-[rgba(0,0,0,0.74)] h-[980px] left-0 to-[rgba(0,0,0,0.2)] top-0 w-[1920px]" data-node-id="1:1338" data-name="Effects" />
        </div>
        <div className="absolute content-stretch flex flex-col gap-[56px] items-start justify-center left-[156px] top-[306px]" data-node-id="1:1339" data-name="Frame">
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[0] relative shrink-0 text-[#ededed] whitespace-nowrap" data-node-id="1:1340" data-name="Frame">
            <div className="flex flex-col font-['Montserrat:SemiBold'] font-semibold justify-center relative shrink-0 text-[64px] tracking-[1.28px]" data-node-id="1:1341">
              <p className="mb-0 whitespace-pre">
                <span className="leading-[1.24]">{`Digital Services `}</span>
                <span className="leading-[1.24] text-[#00b6ca]">{`Built `}</span>
              </p>
              <p className="whitespace-pre">
                <span className="leading-[1.24] text-[#00b6ca]">for Real</span>
                <span className="leading-[1.24]">{` Impact`}</span>
              </p>
            </div>
            <div className="flex flex-col font-['Montserrat:Regular'] font-normal justify-center relative shrink-0 text-[28px]" data-node-id="1:1342">
              <p className="leading-[1.2] mb-0 whitespace-pre">{`We provide innovative solutions that attract customers, improve engagement, `}</p>
              <p className="leading-[1.2] whitespace-pre">and help businesses grow with confidence, solve complex problems with elegant solutions.</p>
            </div>
          </div>
          <Component58 className="bg-[#00b6ca] content-stretch flex gap-[10px] items-center pl-[18px] pr-[12px] py-[12px] relative rounded-[4px] shrink-0" />
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[16px] items-center left-1/2 top-[830px]" data-node-id="1:1344" data-name="Frame">
          <p className="[word-break:break-word] font-['Noto_Sans:Light'] font-light leading-[1.2] relative shrink-0 text-[16px] text-white tracking-[3.52px] uppercase whitespace-nowrap" data-node-id="1:1345" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}>
            Scroll Down
          </p>
          <Component2 className="h-[24px] relative shrink-0 w-[12px]" />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-start left-1/2 top-[1054px] w-[1560px]" data-node-id="1:1347" data-name="Frame">
        <a href="/services/ui-ux-design" className="content-stretch cursor-pointer flex items-center relative shrink-0 w-full" data-node-id="1:1348" data-name="Component 11">
          <div className="bg-[#191919] content-stretch flex flex-col h-[500px] items-start justify-between p-[40px] relative shrink-0 w-[780px]" data-node-id="I1:1348;40393:1206" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white tracking-[1.28px] uppercase w-full" data-node-id="I1:1348;40393:1207">
              <p className="leading-[1.2]">{`Full-stack `}</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[40px] text-left text-white w-full" data-node-id="I1:1348;40393:1208">
              <p className="leading-[1.2]">Development</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal h-[93px] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[18px] text-ellipsis text-left text-white w-full" data-node-id="I1:1348;40393:1209">
              <p className="leading-[1.3]">{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`}</p>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I1:1348;40393:1210" data-name="Frame">
              <Component10 className="h-[18px] overflow-clip relative shrink-0 w-[120px]" />
              <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I1:1348;40393:1212">
                <p className="leading-[1.2]">{`///`}</p>
              </div>
            </div>
          </div>
          <div className="h-[500px] relative shrink-0 w-[780px]" data-node-id="I1:1348;40393:1213">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-[#aaa] inset-0" />
              <img alt="" className="absolute max-w-none object-cover size-full" src={imgRectangle22} />
            </div>
          </div>
        </a>
        <a href="/services/ui-ux-design" className="content-stretch cursor-pointer flex items-center relative shrink-0 w-full" data-node-id="1:1349" data-name="Component 13">
          <div className="h-[500px] relative shrink-0 w-[780px]" data-node-id="I1:1349;40393:1289">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-[#aaa] inset-0" />
              <img alt="" className="absolute max-w-none object-cover size-full" src={imgRectangle23} />
            </div>
          </div>
          <div className="bg-[#191919] content-stretch flex flex-col h-[500px] items-start justify-between p-[40px] relative shrink-0 w-[780px]" data-node-id="I1:1349;40393:1290" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white tracking-[1.28px] uppercase w-full" data-node-id="I1:1349;40393:1291">
              <p className="leading-[1.2]">Design</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[40px] text-left text-white w-full" data-node-id="I1:1349;40393:1292">
              <p className="leading-[1.2]">UI/UX</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal h-[93px] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[18px] text-ellipsis text-left text-white w-full" data-node-id="I1:1349;40393:1293">
              <p className="leading-[1.3]">{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`}</p>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I1:1349;40393:1294" data-name="Frame">
              <Component10 className="h-[18px] overflow-clip relative shrink-0 w-[120px]" />
              <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I1:1349;40393:1296">
                <p className="leading-[1.2]">{`///`}</p>
              </div>
            </div>
          </div>
        </a>
        <a href="/services/ui-ux-design" className="content-stretch cursor-pointer flex items-center relative shrink-0 w-full" data-node-id="1:1350" data-name="Component 14">
          <div className="bg-[#191919] content-stretch flex flex-col h-[500px] items-start justify-between p-[40px] relative shrink-0 w-[780px]" data-node-id="I1:1350;40393:1383" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white tracking-[1.28px] uppercase w-full" data-node-id="I1:1350;40393:1384">
              <p className="leading-[1.2]">Design</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[40px] text-left text-white w-full" data-node-id="I1:1350;40393:1385">
              <p className="leading-[1.2]">{`Brand `}</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal h-[93px] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[18px] text-ellipsis text-left text-white w-full" data-node-id="I1:1350;40393:1386">
              <p className="leading-[1.3]">{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`}</p>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I1:1350;40393:1387" data-name="Frame">
              <Component10 className="h-[18px] overflow-clip relative shrink-0 w-[120px]" />
              <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I1:1350;40393:1389">
                <p className="leading-[1.2]">{`///`}</p>
              </div>
            </div>
          </div>
          <div className="h-[500px] relative shrink-0 w-[780px]" data-node-id="I1:1350;40393:1390">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-[#aaa] inset-0" />
              <img alt="" className="absolute max-w-none object-cover size-full" src={imgRectangle24} />
            </div>
          </div>
        </a>
        <a href="/services/ui-ux-design" className="content-stretch cursor-pointer flex items-center relative shrink-0 w-full" data-node-id="1:1351" data-name="Component 15">
          <div className="h-[500px] relative shrink-0 w-[780px]" data-node-id="I1:1351;40393:1449">
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute bg-[#aaa] inset-0" />
              <img alt="" className="absolute max-w-none object-cover size-full" src={imgRectangle25} />
            </div>
          </div>
          <div className="bg-[#191919] content-stretch flex flex-col h-[500px] items-start justify-between p-[40px] relative shrink-0 w-[780px]" data-node-id="I1:1351;40393:1450" data-name="Frame">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Medium'] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white tracking-[1.28px] uppercase w-full" data-node-id="I1:1351;40393:1451">
              <p className="leading-[1.2]">{`Digital `}</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Semi_Bold'] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[40px] text-left text-white w-full" data-node-id="I1:1351;40393:1452">
              <p className="leading-[1.2]">Marketing</p>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal h-[93px] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[18px] text-ellipsis text-left text-white w-full" data-node-id="I1:1351;40393:1453">
              <p className="leading-[1.3]">{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`}</p>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I1:1351;40393:1454" data-name="Frame">
              <Component10 className="h-[18px] overflow-clip relative shrink-0 w-[120px]" />
              <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I1:1351;40393:1456">
                <p className="leading-[1.2]">{`///`}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#f6f6f6] content-stretch flex items-center justify-between left-1/2 px-[16px] py-[12px] rounded-[4px] top-[56px] w-[1560px]" data-node-id="1:1352" data-name="Nav">
        <a href="/" className="block cursor-pointer h-[40px] relative shrink-0 w-[175px]" data-node-id="1:1353" data-name="Update Logo">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgUpdateLogo1} />
        </a>
        <div className="[word-break:break-word] content-stretch flex gap-[32px] items-center justify-center not-italic relative shrink-0 text-[16px] uppercase whitespace-nowrap" data-node-id="1:1361" data-name="Frame">
          <a href="/services" className="block font-['Inter:Semi_Bold'] font-semibold leading-[1.2] relative shrink-0 text-[#00b6ca]" data-node-id="1:1362" aria-current="page">Services</a>
          <a href="/work" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:1363">
            <p className="leading-[1.2]">Work</p>
          </a>
          <a href="/blog" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:1364">
            <p className="leading-[1.2]">blog</p>
          </a>
          <a href="/company" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:1365">
            <p className="leading-[1.2]">Company</p>
          </a>
          <a href="/contact" className="block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] relative shrink-0 text-[#171717]" data-node-id="1:1366">
            <p className="leading-[1.2]">Contact Us</p>
          </a>
        </div>
        <div className="bg-[#00b6ca] content-stretch drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] relative rounded-[4px] shrink-0" data-node-id="1:1367" data-name="Component 57">
          <div className="h-[18px] overflow-clip relative shrink-0 w-[86px]" data-node-id="I1:1367;40959:4952" data-name="Frame">
            <div className="[word-break:break-word] absolute font-['Inter:Medium'] font-medium leading-[0] left-0 not-italic text-[#f6f6f6] text-[16px] top-0 whitespace-nowrap" data-node-id="I1:1367;40959:4953">
              <p className="leading-[1.2] mb-0">LET’S TALK</p>
              <p className="leading-[1.2]">LET’S TALK</p>
            </div>
          </div>
          <div className="overflow-clip relative shrink-0 size-[18px]" data-node-id="I1:1367;40959:5020" data-name="Frame">
            <div className="absolute left-0 size-[18px] top-0" data-node-id="I1:1367;40959:5021" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
            <div className="absolute left-0 size-[18px] top-[20px]" data-node-id="I1:1367;40959:5022" data-name="arrow-subdirectory-forward">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowSubdirectoryForward} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}