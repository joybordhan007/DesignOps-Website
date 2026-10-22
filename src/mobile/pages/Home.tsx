import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import CountUp from "@/components/CountUp";
import Rich from "@/components/Rich";
import { useContent } from "@/content/store";
import { grouping } from "@/content/helpers";
import MobileHero from "../MobileHero";
import SectionTitle from "../SectionTitle";
import ScienceTechDesignCard from "../ScienceTechDesignCard";
import ServicesList from "../ServicesList";
import ProjectCards from "../ProjectCards";
import WorkingProcess from "../WorkingProcess";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

const flat = (text: string) => text.replace(/\s*\n\s*/g, " ");

export default function Home() {
  const { settings, achievements, projects, process } = useContent();
  const stats = achievements.filter((stat) => stat.showOnHome);

  return (
    <>
      <MobileHero page="home" />

      <section className="flex flex-col gap-[40px] isolate mx-auto px-[20px] py-[56px] relative w-full max-w-[760px]" data-name="Vision">
        <img alt="" aria-hidden="true" className="-z-10 absolute inset-x-0 object-contain opacity-15 top-[24px] w-full" src="/assets/home/e8b66.webp" />
        <p className="capitalize font-['Poppins:SemiBold'] font-semibold leading-[1.35] text-[#2f2f2f] text-[20px] text-center">
          <Rich text={settings.vision} breaks={false} />
        </p>
        <SectionTitle title={settings.titles.clients} />
      </section>
      <div className="-mt-[16px] pb-[24px]">
        <ClientLogoCarousel />
      </div>

      <section className="flex flex-col gap-[28px] mx-auto px-[20px] py-[48px] w-full max-w-[760px]" data-name="Impact">
        <SectionTitle title={settings.titles.stats} />
        <div className="gap-[12px] grid grid-cols-2">
          {stats.map((stat, index) => {
            const highlight = index === stats.length - 1;
            return (
              <div
                key={stat.id}
                className={`flex flex-col gap-[40px] justify-between p-[18px] rounded-[18px] ${
                  highlight ? `bg-[#00b6ca] text-white ${index % 2 === 0 ? "col-span-2" : ""}` : "bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.06)] text-[#3e3e3e]"
                }`}
              >
                <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[12px]">/{String(index + 1).padStart(2, "0")}</p>
                <div className="flex flex-col gap-[8px]">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px]">
                    <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} useGrouping={grouping(stat.value)} />
                    {stat.after}
                  </p>
                  <p className="font-['Inter:Medium'] font-medium leading-[1.3] text-[12px]">{flat(stat.label)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ScienceTechDesignCard />
      <ServicesList />
      <ProjectCards projects={projects.filter((project) => project.featured)} />
      <WorkingProcess title={settings.titles.process} steps={process} />
      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
