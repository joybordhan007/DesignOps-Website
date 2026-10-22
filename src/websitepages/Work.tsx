import Footer from "@/components/Footer";
import { useContent } from "@/content/store";
import CtaSection from "./sections/CtaSection";
import GrowthSection from "./sections/GrowthSection";
import Hero from "./sections/Hero";
import Page from "./sections/Page";
import { ProjectGrid, StackedProjects } from "./sections/ProjectCards";
import ReviewsSection from "./sections/ReviewsSection";

// Work: the first four projects as stacked cards, the rest in a grid.
export default function Work() {
  const { settings, projects } = useContent();
  return (
    <Page name="Work">
      <Hero hero={settings.heroes.work} />
      <StackedProjects projects={projects.slice(0, 4)} className="mt-[80px]" />
      <ProjectGrid projects={projects.slice(4)} />
      <GrowthSection />
      <ReviewsSection />
      <CtaSection />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
