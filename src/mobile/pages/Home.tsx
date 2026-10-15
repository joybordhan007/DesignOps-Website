import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import CountUp from "@/components/CountUp";
import MobileHero, { Accent } from "../MobileHero";
import SectionTitle from "../SectionTitle";
import ScienceTechDesignCard from "../ScienceTechDesignCard";
import ServicesList from "../ServicesList";
import ProjectCards, { homeProjects } from "../ProjectCards";
import WorkingProcess from "../WorkingProcess";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

const stats = [
  { label: "client satisfaction in post-project reviews.", value: <CountUp value={92} suffix="%" /> },
  { label: "valuation influenced by our design", value: <CountUp value={10} prefix="$" suffix="B+" /> },
  { label: "Founded, 6 years of experience", value: <CountUp value={2019} useGrouping={false} /> },
  { label: "monthly visits on client platforms", value: <CountUp value={25} suffix="M+" /> },
];

export default function Home() {
  return (
    <>
      <MobileHero
        video="home.mp4"
        title={
          <>
            We Design &amp; <Accent>Build High Converting</Accent> Digital Products
          </>
        }
        text="UI/UX & Full-stack digital agency combining editorial aesthetics with engineering rigor."
      />

      <section className="flex flex-col gap-[40px] isolate mx-auto px-[20px] py-[56px] relative w-full max-w-[760px]" data-name="Vision">
        <img alt="" aria-hidden="true" className="-z-10 absolute inset-x-0 object-contain opacity-15 top-[24px] w-full" src="/assets/home/e8b66.webp" />
        <p className="capitalize font-['Poppins:SemiBold'] font-semibold leading-[1.35] text-[#2f2f2f] text-[20px] text-center">
          We aspire to be a driving <Accent>force</Accent> behind a future where <Accent>design</Accent> is a powerful catalyst for positive change.
        </p>
        <SectionTitle lead="Our Clients We’re" muted="Proud to Collaborate With" />
      </section>
      <div className="-mt-[16px] pb-[24px]">
        <ClientLogoCarousel />
      </div>

      <section className="flex flex-col gap-[28px] mx-auto px-[20px] py-[48px] w-full max-w-[760px]" data-name="Impact">
        <SectionTitle lead="Bold UX design, billion-dollar proof." muted="We measure impact, not just ship pixels." />
        <div className="gap-[12px] grid grid-cols-2">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white flex flex-col gap-[40px] justify-between p-[18px] rounded-[18px] shadow-[0px_1px_3px_rgba(0,0,0,0.06)] text-[#3e3e3e]">
              <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[12px]">/0{index + 1}</p>
              <div className="flex flex-col gap-[8px]">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px]">{stat.value}</p>
                <p className="font-['Inter:Medium'] font-medium leading-[1.3] text-[12px]">{stat.label}</p>
              </div>
            </div>
          ))}
          <div className="bg-[#00b6ca] col-span-2 flex flex-col gap-[40px] justify-between p-[18px] rounded-[18px] text-white">
            <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[12px]">/05</p>
            <div className="flex flex-col gap-[8px]">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px]">
                <CountUp value={500} suffix="+" /> global projects
              </p>
              <p className="font-['Inter:Medium'] font-medium leading-[1.3] text-[12px]">
                <CountUp value={250} suffix="+" /> testimonials with trusted by google
              </p>
            </div>
          </div>
        </div>
      </section>

      <ScienceTechDesignCard />
      <ServicesList />
      <ProjectCards images={homeProjects} />
      <WorkingProcess />
      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
