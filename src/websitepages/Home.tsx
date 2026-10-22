import ClientLogoCarousel from "@/components/ClientLogoCarousel";
import CountUp from "@/components/CountUp";
import Footer from "@/components/Footer";
import Rich from "@/components/Rich";
import ScienceTechDesign from "@/components/ScienceTechDesign";
import ServiceCards from "@/components/ServiceCards";
import { grouping } from "@/content/helpers";
import { useContent } from "@/content/store";
import type { Stat } from "@/content/types";
import CtaSection from "./sections/CtaSection";
import GrowthSection from "./sections/GrowthSection";
import Heading, { Lines } from "./sections/Heading";
import Hero from "./sections/Hero";
import Page from "./sections/Page";
import ProcessSection from "./sections/ProcessSection";
import { StackedProjects } from "./sections/ProjectCards";
import ReviewsSection from "./sections/ReviewsSection";

function StatCard({ stat, index, highlight }: { stat: Stat; index: number; highlight: boolean }) {
  return (
    <div
      className={`drop-shadow-[0px_1px_3px_rgba(0,0,0,0.04)] flex flex-[1_0_0] flex-col gap-[146px] items-start min-w-px px-[32px] py-[36px] rounded-[24px] ${
        highlight ? "bg-[#00b6ca] text-white" : "bg-white text-[#3e3e3e]"
      }`}
    >
      <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[16px] w-full">/{String(index + 1).padStart(2, "0")}</p>
      <div className="flex flex-col gap-[16px] items-start w-full">
        <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[36px] w-full">
          <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} useGrouping={grouping(stat.value)} />
          {stat.after}
        </p>
        <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[18px] w-full">
          <Lines text={stat.label} />
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const { settings, achievements, services, projects } = useContent();
  const stats = achievements.home;
  const rows = Array.from({ length: Math.ceil(stats.length / 3) }, (_, r) => stats.slice(r * 3, r * 3 + 3));

  return (
    <Page name="Home">
      <Hero hero={settings.heroes.home} />

      <div className="h-[900px] mt-[80px] relative shrink-0 w-[1920px]" data-name="Vision">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[846px] left-[calc(50%-2px)] top-[calc(50%+88px)] w-[1582px]">
          <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-bottom opacity-15 pointer-events-none size-full" src="/assets/home/e8b66.webp" />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col gap-[180px] items-center left-1/2 top-1/2 w-[1560px]">
          <p className="capitalize font-['Poppins:SemiBold'] font-semibold leading-[1.3] text-[#2f2f2f] text-[48px] text-center tracking-[0.96px] w-[1560px]">
            <Rich text={settings.vision} />
          </p>
          <div className="flex flex-col gap-[64px] items-start w-full">
            <Heading title={settings.titles.clients} className="font-['Inter:Semi_Bold'] font-semibold" />
            <ClientLogoCarousel />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[64px] items-start mt-[160px] shrink-0 w-[1560px]" data-name="Impact">
        <Heading title={settings.titles.stats} />
        <div className="flex flex-col gap-[24px] items-start w-full">
          {rows.map((row, r) => (
            <div key={r} className="flex gap-[24px] items-stretch w-full">
              {row.map((stat, i) => {
                const index = r * 3 + i;
                return <StatCard key={stat.id} stat={stat} index={index} highlight={index === stats.length - 1} />;
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="h-[3000px] mt-[161px] relative shrink-0 w-[1872px] science-scroll-stage">
        <ScienceTechDesign />
      </div>

      <div className="flex flex-col gap-[64px] items-center mt-[40px] shrink-0 w-[1560px]" data-name="Services">
        <Heading title={settings.titles.services} />
        <ServiceCards services={services} className="relative shrink-0" />
      </div>

      <StackedProjects projects={projects.filter((project) => project.featured)} />
      <ProcessSection />
      <GrowthSection />
      <ReviewsSection />
      <CtaSection />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
