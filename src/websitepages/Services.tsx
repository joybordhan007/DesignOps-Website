import Footer from "@/components/Footer";
import { serviceUrl } from "@/content/helpers";
import { useContent } from "@/content/store";
import type { Service } from "@/content/types";
import CtaSection from "./sections/CtaSection";
import GrowthSection from "./sections/GrowthSection";
import Hero from "./sections/Hero";
import Page from "./sections/Page";
import ReviewsSection from "./sections/ReviewsSection";

// One service: dark text block beside its picture; rows alternate sides.
function ServiceRow({ service, flip }: { service: Service; flip: boolean }) {
  const text = (
    <div className="bg-[#191919] flex flex-col h-[500px] items-start justify-between p-[40px] relative shrink-0 w-[780px]">
      <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[16px] text-left text-white tracking-[1.28px] uppercase w-full">{service.eyebrow}</p>
      <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[40px] text-left text-white w-full">{service.name}</p>
      <p className="font-['Inter:Regular'] leading-[1.3] line-clamp-4 text-[18px] text-left text-white w-full">{service.description}</p>
      <div className="flex items-center justify-between w-full">
        <span className="block h-[19.2px] overflow-clip relative w-[120px]">
          <span className="absolute flex flex-col font-['Inter:Regular'] leading-[1.2] left-0 text-[#bebebe] text-[16px] top-0 tracking-[1.92px] transition-transform duration-[380ms] whitespace-nowrap group-hover:-translate-y-1/2">
            <span>LEARN MORE</span>
            <span aria-hidden="true" className="text-[#bfd613]">
              LEARN MORE
            </span>
          </span>
        </span>
        <p className="font-['Inter:Regular'] leading-[1.2] text-[16px] text-white transition-transform duration-300 group-hover:translate-x-[4px]">{`///`}</p>
      </div>
    </div>
  );
  const picture = (
    <div className="h-[500px] overflow-hidden relative shrink-0 w-[780px]" aria-hidden="true">
      <div className="absolute bg-[#aaa] inset-0" />
      <img alt="" loading="lazy" decoding="async" className="absolute max-w-none object-cover size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" src={service.image} />
    </div>
  );
  return (
    <a href={serviceUrl(service)} className="flex group items-center relative shrink-0 w-full" aria-label={`${service.title}: view service details`}>
      {flip ? picture : text}
      {flip ? text : picture}
    </a>
  );
}

export default function Services() {
  const { settings, services } = useContent();
  return (
    <Page name="Services">
      <Hero hero={settings.heroes.services} />
      <div className="flex flex-col items-start mt-[160px] shrink-0 w-[1560px]" data-name="Service List">
        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} flip={i % 2 === 1} />
        ))}
      </div>
      <GrowthSection />
      <ReviewsSection />
      <CtaSection />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
