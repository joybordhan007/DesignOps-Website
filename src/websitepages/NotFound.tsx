import Footer from "@/components/Footer";
import Rich from "@/components/Rich";
import { useContent } from "@/content/store";

const imgArrowForwardLong = "/assets/shared/icons/arrow-forward-long.svg";
const img404 = "/assets/not-found/404-illustration.webp";


const popularLinks = [
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Case Study", href: "/work/case-study" },
  { label: "Blog", href: "/blog" },
];

export default function NotFound() {
  const { notFound, buttons } = useContent().settings.labels;
  return (
    <div className="bg-[#f5f5f5] figma-canvas relative w-[1920px] h-[1960px]" data-name="Not Found">

      <div className="absolute flex gap-[80px] items-center justify-between left-[180px] top-[200px] w-[1560px]" data-name="Not Found Content">
        <div className="flex flex-col gap-[48px] items-start w-[680px]">
          <div className="flex flex-col gap-[24px] items-start">
            <p className="bg-[#00b6ca]/10 font-['Inter:Semi_Bold'] font-semibold leading-[1.2] px-[16px] py-[8px] rounded-[999px] text-[#00b6ca] text-[18px] tracking-[2px] uppercase">
              {notFound.badge}
            </p>
            <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.2] text-[#3e3e3e] text-[64px] tracking-[1.28px]">
              <Rich text={notFound.title} />
            </h1>
            <p className="font-['Inter:Regular'] font-normal leading-[1.5] text-[#707070] text-[24px]">
              {notFound.text}
            </p>
          </div>

          <div className="flex gap-[16px] items-center">
            <a href="/" className="bg-[#00b6ca] flex gap-[10px] items-center pl-[18px] pr-[12px] py-[12px] rounded-[4px] hover:bg-[#009fb0]">
              <span className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#f6f6f6] text-[16px] whitespace-nowrap">{buttons.backToHome}</span>
              <span className="bg-[#f6f6f6] flex items-center p-[8px] rounded-[4px]">
                <img alt="" loading="lazy" decoding="async" className="block size-[18px]" src={imgArrowForwardLong} />
              </span>
            </a>
            <a href="/contact" className="border border-[#3e3e3e] font-['Inter:Medium'] font-medium leading-[1.2] px-[24px] py-[20px] rounded-[4px] text-[#3e3e3e] text-[16px] whitespace-nowrap hover:border-[#00b6ca] hover:text-[#00b6ca]">
              {buttons.contactUs}
            </a>
          </div>

          <div className="border-[#dfdfdf] border-t flex flex-col gap-[16px] pt-[32px] w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#3e3e3e] text-[18px] uppercase">{notFound.popular}</p>
            <div className="flex gap-[32px]">
              {popularLinks.map((link) => (
                <a key={link.href} href={link.href} className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#707070] text-[18px] underline underline-offset-4 hover:text-[#00b6ca]">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white drop-shadow-[0px_1px_3px_rgba(0,0,0,0.04)] overflow-clip rounded-[24px] shrink-0 size-[800px]">
          <img alt="404 error – page not found" loading="lazy" decoding="async" className="block object-cover size-full" src={img404} />
        </div>
      </div>

      <Footer className="-translate-x-1/2 absolute bg-[#191919] bottom-[18px] h-[764px] left-1/2 overflow-clip rounded-[8px] w-[1872px]" />
    </div>
  );
}
