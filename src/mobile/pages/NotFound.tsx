import ArrowButton from "@/components/ArrowButton";
import Rich from "@/components/Rich";
import { useContent } from "@/content/store";
import MobileFooter from "../MobileFooter";

const popularLinks = [
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Case Study", href: "/work/case-study" },
  { label: "Blog", href: "/blog" },
];

export default function NotFound() {
  const { notFound, buttons } = useContent().settings.labels;
  return (
    <>

      <section className="flex flex-col gap-[28px] mx-auto px-[20px] py-[40px] w-full max-w-[760px]" data-name="Not Found">
        <img alt="404 error – page not found" className="aspect-square block object-cover rounded-[20px] shadow-[0px_1px_3px_rgba(0,0,0,0.04)] w-full" src="/assets/not-found/404-illustration.webp" />
        <p className="bg-[#00b6ca]/10 font-['Inter:Semi_Bold'] font-semibold leading-[1.2] px-[14px] py-[6px] rounded-full self-start text-[#00b6ca] text-[14px] tracking-[2px] uppercase">
          {notFound.badge}
        </p>
        <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.2] text-[#3e3e3e] text-[20px]">
          <Rich text={notFound.title} breaks={false} />
        </h1>
        <p className="font-['Inter:Regular'] leading-[1.5] text-[#707070] text-[16px]">
          {notFound.text}
        </p>
        <div className="flex flex-wrap gap-[12px]">
          <ArrowButton href="/" label={buttons.backToHome} />
          <a href="/contact" className="border border-[#3e3e3e] font-['Inter:Medium'] font-medium leading-[1.2] px-[14px] py-[9px] rounded-[4px] text-[#3e3e3e] text-[10px] hover:border-[#00b6ca] hover:text-[#00b6ca]">
            {buttons.contactUs}
          </a>
        </div>
        <div className="border-[#dfdfdf] border-t flex flex-col gap-[14px] pt-[24px]">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#3e3e3e] text-[14px] uppercase">{notFound.popular}</p>
          <div className="flex flex-wrap gap-x-[24px] gap-y-[10px]">
            {popularLinks.map((link) => (
              <a key={link.href} href={link.href} className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#707070] text-[16px] underline underline-offset-4 hover:text-[#00b6ca]">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <MobileFooter />
    </>
  );
}
