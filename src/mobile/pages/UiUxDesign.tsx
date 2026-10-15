import { Accent } from "../MobileHero";
import WorkingProcess from "../WorkingProcess";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

const features = [
  "User research & testing",
  "Information architecture",
  "Wireframing & prototyping",
  "Visual design & branding",
  "Design systems",
  "Accessibility audits",
];

const deliverables = [
  { title: "Research Report", text: "User interviews, competitive analysis, and actionable insights." },
  { title: "Figma Design Files", text: "Fully annotated, developer-ready designs for every screen and state." },
  { title: "Design System", text: "A scalable component library with tokens, patterns, and guidelines." },
  { title: "Usability Report", text: "Validated designs with real user feedback and iteration notes." },
];

export default function UiUxDesign() {
  return (
    <>

      <section className="flex flex-col gap-[24px] mx-auto px-[20px] pb-[32px] pt-[40px] w-full max-w-[760px]" data-name="Intro">
        <h1 className="flex font-['Saira:SemiBold'] font-semibold gap-[12px] items-start leading-[1.1] text-[#2f2f2f] text-[20px] tracking-[3px]">
          UI/UX DESIGN
          <img alt="" className="block mt-[4px] size-[22px]" src="/assets/ui-ux-design/0d95e.svg" />
        </h1>
        <p className="font-['Montserrat:SemiBold'] font-semibold leading-[1.3] text-[#2f2f2f] text-[20px] text-right uppercase">
          WE offer <Accent>innovative solutions</Accent> that <Accent>captivate</Accent> customers.
        </p>
        <img alt="Mobile app UI design shown on two phones" className="aspect-[4/3] block object-cover rounded-[12px] w-full" src="/assets/ui-ux-design/894da.webp" />
      </section>

      <section className="flex flex-col gap-[24px] mx-auto px-[20px] py-[32px] w-full max-w-[760px]" data-name="Approach">
        <h2 className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#2f2f2f] text-[20px]">
          User-centered design that transforms complex problems <Accent>into intuitive, beautiful</Accent> interfaces.
        </h2>
        <p className="font-['Inter:Regular'] leading-[1.6] text-[#3e3e3e] text-[14px]">
          Great design is invisible — it guides users effortlessly toward their goals. Our design team combines deep user research with craft-level execution to create interfaces that are both beautiful and functional. We design systems, not just screens.
        </p>
        <ul className="gap-[14px] grid grid-cols-1 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature} className="flex font-['Inter:Regular'] gap-[10px] items-center leading-[1.3] text-[#2f2f2f] text-[14px]">
              <img alt="" className="block shrink-0 size-[20px]" src="/assets/ui-ux-design/9e1bc.svg" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-[24px] mx-auto px-[20px] py-[32px] w-full max-w-[760px]" data-name="Deliverables">
        <h2 className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#2f2f2f] text-[20px]">
          What You Get From Our <Accent>End-to-End Digital</Accent> Expertise
        </h2>
        <ol className="flex flex-col gap-[18px]">
          {deliverables.map((item, index) => (
            <li key={item.title} className="bg-white flex gap-[14px] p-[18px] rounded-[12px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
              <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[#00b6ca] text-[16px]">{index + 1}.</span>
              <span className="flex flex-col gap-[6px]">
                <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[#2f2f2f] text-[16px]">{item.title}</span>
                <span className="font-['Inter:Regular'] leading-[1.5] text-[#4e4e4e] text-[14px]">{item.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <WorkingProcess />
      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
