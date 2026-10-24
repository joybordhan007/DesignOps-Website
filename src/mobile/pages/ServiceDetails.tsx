import Rich from "@/components/Rich";
import { currentService } from "@/content/route";
import { useContent } from "@/content/store";
import WorkingProcess from "../WorkingProcess";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

// Service details page (/services/:slug) on small screens. The intro, deliverables
// and working process blocks repeat as many times as the admin adds them.
export default function ServiceDetails() {
  useContent(); // re-render when the content changes
  const service = currentService();
  const { detail } = service;

  return (
    <>
      <section className="flex flex-col gap-[24px] mx-auto px-[20px] pb-[32px] pt-[40px] w-full max-w-[760px]" data-name="Intro">
        <h1 className="flex font-['Saira:SemiBold'] font-semibold gap-[12px] items-start leading-[1.1] text-[#2f2f2f] text-[20px] tracking-[3px] uppercase">
          {service.title}
          <img alt="" className="block mt-[2px] size-[18px]" src="/assets/ui-ux-design/0d95e.svg" />
        </h1>
        <p className="font-['Montserrat:SemiBold'] font-semibold leading-[1.3] text-[#2f2f2f] text-[16px] text-right uppercase">
          <Rich text={detail.tagline} breaks={false} />
        </p>
        {service.image && <img alt={service.title} className="aspect-[4/3] block object-cover rounded-[12px] w-full" src={service.image} />}
      </section>

      {detail.intros.map((intro) => (
        <section key={intro.id} className="flex flex-col gap-[24px] mx-auto px-[20px] py-[32px] w-full max-w-[760px]" data-name="Approach">
          <h2 className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#2f2f2f] text-[20px]">
            <Rich text={intro.heading} breaks={false} />
          </h2>
          {intro.text && <p className="font-['Inter:Regular'] leading-[1.6] text-[#3e3e3e] text-[14px]">{intro.text}</p>}
          {intro.features.length > 0 && (
            <ul className="gap-[14px] grid grid-cols-1 sm:grid-cols-2">
              {intro.features.map((feature) => (
                <li key={feature} className="flex font-['Inter:Regular'] gap-[10px] items-center leading-[1.3] text-[#2f2f2f] text-[14px]">
                  <img alt="" className="block shrink-0 size-[20px]" src="/assets/ui-ux-design/9e1bc.svg" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {detail.deliverableSections.map((section) => (
        <section key={section.id} className="flex flex-col gap-[24px] mx-auto px-[20px] py-[32px] w-full max-w-[760px]" data-name="Deliverables">
          <h2 className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#2f2f2f] text-[20px]">
            <Rich text={section.heading} breaks={false} />
          </h2>
          <ol className="flex flex-col gap-[18px]">
            {section.items.map((item, index) => (
              <li key={index} className="bg-white flex gap-[14px] p-[18px] rounded-[12px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
                <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[#00b6ca] text-[16px]">{index + 1}.</span>
                <span className="flex flex-col gap-[6px]">
                  <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[#2f2f2f] text-[16px]">{item.title}</span>
                  <span className="font-['Inter:Regular'] leading-[1.5] text-[#4e4e4e] text-[14px]">{item.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      ))}

      {detail.processSections.map((process) => (
        <WorkingProcess key={process.id} title={process.title} steps={process.steps} />
      ))}
      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
