import { serviceUrl } from "@/content/helpers";
import { useContent } from "@/content/store";
import SectionTitle from "./SectionTitle";

// Home "Our Services" on small screens: the desktop hover cards become dark
// cards that always show their title and description, each linking to the
// service details page.
export default function ServicesList() {
  const { settings, services } = useContent();
  return (
    <section className="flex flex-col gap-[28px] mx-auto px-[20px] py-[48px] w-full max-w-[760px]" data-name="Services">
      <SectionTitle title={settings.titles.services} />
      <div className="gap-[16px] grid md:grid-cols-2">
        {services.map((service, index) => (
          <a
            key={service.id}
            href={serviceUrl(service)}
            className="bg-[#171717] flex flex-col gap-[20px] group min-h-[260px] overflow-hidden p-[24px] relative rounded-[20px]"
          >
            {service.numberImage && <img alt="" aria-hidden="true" className="absolute -bottom-[30px] h-[220px] opacity-80 pointer-events-none -right-[10px] w-auto" src={service.numberImage} />}
            <p className="font-['Inter:Medium'] font-medium leading-[1.2] relative text-[12px] text-white">/0{index + 1}</p>
            <h3 className="font-['Inter:Bold'] font-bold leading-[1.2] relative text-[16px] text-white">{service.title}</h3>
            <p className="font-['Inter:Regular'] leading-[1.45] relative text-[#dfdfdf] text-[14px]">{service.summary}</p>
            <span className="flex font-['Inter:Medium'] font-medium gap-[8px] items-center mt-auto relative text-[#00b6ca] text-[14px] tracking-[1px]">
              LEARN MORE
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-[4px]">→</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
