import Footer from "@/components/Footer";

const imgLogo = "/assets/shared/logos/designops-logo.svg";
const imgArrowForwardLong = "/assets/shared/icons/arrow-forward-long.svg";
const imgArrowSubdirectoryForward = "/assets/shared/icons/arrow-subdirectory-light.svg";
const img404 = "/assets/not-found/404-illustration.jpg";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Company", href: "/company" },
  { label: "Contact Us", href: "/contact" },
];

const popularLinks = [
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Case Study", href: "/work/case-study" },
  { label: "Blog", href: "/blog" },
];

export default function NotFound() {
  return (
    <div className="bg-[#f5f5f5] figma-canvas relative w-[1920px] h-[1960px]" data-name="Not Found">
      <div className="-translate-x-1/2 absolute bg-[#f6f6f6] drop-shadow-[0px_2px_4px_rgba(0,0,0,0.06)] flex items-center justify-between left-1/2 px-[16px] py-[12px] rounded-[4px] top-[56px] w-[1560px]" data-name="Nav">
        <a href="/" className="block h-[40px] relative shrink-0 w-[175px]" data-name="Update Logo">
          <img alt="DesignOps" className="absolute block inset-0 max-w-none size-full" src={imgLogo} />
        </a>
        <div className="flex font-['Inter:Medium'] font-medium gap-[32px] items-center leading-[1.2] text-[#171717] text-[16px] uppercase whitespace-nowrap">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block hover:text-[#00b6ca]">
              {link.label}
            </a>
          ))}
        </div>
        <a href="/contact" className="bg-[#00b6ca] drop-shadow-[0px_2px_3px_rgba(0,0,0,0.1)] flex gap-[6px] items-center px-[26px] py-[14px] rounded-[4px] shrink-0">
          <span className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#f6f6f6] text-[16px] whitespace-nowrap">LET’S TALK</span>
          <img alt="" className="block size-[18px]" src={imgArrowSubdirectoryForward} />
        </a>
      </div>

      <div className="absolute flex gap-[80px] items-center justify-between left-[180px] top-[200px] w-[1560px]" data-name="Not Found Content">
        <div className="flex flex-col gap-[48px] items-start w-[680px]">
          <div className="flex flex-col gap-[24px] items-start">
            <p className="bg-[#00b6ca]/10 font-['Inter:Semi_Bold'] font-semibold leading-[1.2] px-[16px] py-[8px] rounded-[999px] text-[#00b6ca] text-[18px] tracking-[2px] uppercase">
              Error 404
            </p>
            <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.2] text-[#3e3e3e] text-[64px] tracking-[1.28px]">
              Oops! This page <span className="text-[#00b6ca]">took a wrong turn.</span>
            </h1>
            <p className="font-['Inter:Regular'] font-normal leading-[1.5] text-[#707070] text-[24px]">
              The page you’re looking for doesn’t exist, was moved, or the link is broken. Let’s get you back on track.
            </p>
          </div>

          <div className="flex gap-[16px] items-center">
            <a href="/" className="bg-[#00b6ca] flex gap-[10px] items-center pl-[18px] pr-[12px] py-[12px] rounded-[4px] hover:bg-[#009fb0]">
              <span className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#f6f6f6] text-[16px] whitespace-nowrap">BACK TO HOME</span>
              <span className="bg-[#f6f6f6] flex items-center p-[8px] rounded-[4px]">
                <img alt="" className="block size-[18px]" src={imgArrowForwardLong} />
              </span>
            </a>
            <a href="/contact" className="border border-[#3e3e3e] font-['Inter:Medium'] font-medium leading-[1.2] px-[24px] py-[20px] rounded-[4px] text-[#3e3e3e] text-[16px] whitespace-nowrap hover:border-[#00b6ca] hover:text-[#00b6ca]">
              CONTACT US
            </a>
          </div>

          <div className="border-[#dfdfdf] border-t flex flex-col gap-[16px] pt-[32px] w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#3e3e3e] text-[18px] uppercase">Popular pages</p>
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
          <img alt="404 error – page not found" className="block object-cover size-full" src={img404} />
        </div>
      </div>

      <Footer className="-translate-x-1/2 absolute bg-[#191919] bottom-[18px] h-[764px] left-1/2 overflow-clip rounded-[8px] w-[1872px]" />
    </div>
  );
}
