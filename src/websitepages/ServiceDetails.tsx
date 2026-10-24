import Footer from "@/components/Footer";
import Rich from "@/components/Rich";
import { currentService } from "@/content/route";
import { useContent } from "@/content/store";
import type { ServiceDeliverables, ServiceIntro } from "@/content/types";
import CtaSection from "./sections/CtaSection";
import GrowthSection from "./sections/GrowthSection";
import Page from "./sections/Page";
import ProcessSection from "./sections/ProcessSection";
import ReviewsSection from "./sections/ReviewsSection";

function Intro({ intro, first }: { intro: ServiceIntro; first: boolean }) {
  const featureRows = Array.from({ length: Math.ceil(intro.features.length / 2) }, (_, i) => intro.features.slice(i * 2, i * 2 + 2));
  return (
    <div className={`flex gap-[24px] items-start shrink-0 w-[1560px] ${first ? "mt-[160px]" : "mt-[79px]"}`}>
      <p className="font-['Inter:Bold'] font-bold leading-[1.3] shrink-0 text-[#2f2f2f] text-[32px] w-[636px]">
        <Rich text={intro.heading} />
      </p>
      <div className="flex flex-col gap-[32px] items-start shrink-0 w-[901px]">
        {intro.text && <p className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#2f2f2f] text-[24px] w-full">{intro.text}</p>}
        {featureRows.length > 0 && (
          <div className="flex flex-col gap-[24px] items-start">
            {featureRows.map((row, i) => (
              <div key={i} className="flex gap-[24px] items-center">
                {row.map((feature) => (
                  <div key={feature} className="bg-[rgba(255,255,255,0.1)] flex gap-[8px] items-center px-[24px] py-[13px] rounded-[999px] shrink-0">
                    <img alt="" className="block shrink-0 size-[24px]" src="/assets/ui-ux-design/9e1bc.svg" />
                    <p className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#2f2f2f] text-[18px] whitespace-nowrap">{feature}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Deliverables({ section, first }: { section: ServiceDeliverables; first: boolean }) {
  return (
    <div className={`flex gap-[24px] items-start shrink-0 text-[#2f2f2f] w-[1560px] ${first ? "mt-[79px]" : "mt-[64px]"}`}>
      <p className="font-['Inter:Bold'] font-bold leading-[1.3] shrink-0 text-[32px] w-[636px]">
        <Rich text={section.heading} />
      </p>
      <ol className="flex flex-col gap-[24px] items-start justify-center shrink-0 w-[900px]">
        {section.items.map((item, i) => (
          <li key={i} className="flex flex-col gap-[6px] w-full">
            <p className="font-['Inter:Medium'] font-medium leading-[1.3] text-[24px]">
              <span className="inline-block w-[36px]">{i + 1}.</span>
              {item.title}
            </p>
            <p className="font-['Inter:Regular'] leading-[1.3] pl-[36px] text-[18px]">{item.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Service details page (/services/:slug), one layout for every service. The intro,
// deliverables and working process blocks repeat as many times as the admin adds them.
export default function ServiceDetails() {
  useContent(); // re-render when the content changes
  const service = currentService();
  const { detail } = service;

  return (
    <Page name="Service Details">
      <div className="flex items-start justify-between mt-[184px] shrink-0 w-[1560px]" data-name="Intro">
        <h1 className="flex font-['Inter:Bold'] font-bold gap-[20px] items-start leading-[1.2] text-[#171717] text-[72px] tracking-[8.64px] uppercase whitespace-nowrap">
          {service.title}
          <img alt="" className="block mt-[24px] rotate-[-41.58deg] w-[40px]" src="/assets/ui-ux-design/0d95e.svg" />
        </h1>
        <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] mt-[101px] text-[#171717] text-[32px] text-right tracking-[1.28px] whitespace-nowrap">
          <Rich text={detail.tagline} accent="text-[#33c5d5]" />
        </p>
      </div>

      {service.image && (
        <div className="bg-[#efece5] h-[800px] mt-[81px] overflow-hidden relative rounded-[24px] shrink-0 w-[1560px]">
          <img alt={service.title} className="absolute inset-0 max-w-none object-cover size-full" src={service.image} />
        </div>
      )}

      {detail.intros.map((intro, i) => (
        <Intro key={intro.id} intro={intro} first={i === 0} />
      ))}

      {detail.deliverableSections.map((section, i) => (
        <Deliverables key={section.id} section={section} first={i === 0} />
      ))}

      {detail.processSections.map((process) => (
        <ProcessSection key={process.id} title={process.title} steps={process.steps} />
      ))}
      <GrowthSection />
      <ReviewsSection />
      <CtaSection />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
