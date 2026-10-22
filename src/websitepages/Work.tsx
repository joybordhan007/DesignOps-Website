import Footer from "@/components/Footer";
import { useContent } from "@/content/store";
import type { Project } from "@/content/types";
import CtaSection from "./sections/CtaSection";
import GrowthSection from "./sections/GrowthSection";
import Heading from "./sections/Heading";
import Hero from "./sections/Hero";
import Page from "./sections/Page";
import { ProjectGrid, StackedProjects } from "./sections/ProjectCards";
import ReviewsSection from "./sections/ReviewsSection";

/** Splits the projects into runs of neighbours with the same card style, keeping their order. */
function runs(projects: Project[]) {
  const groups: { layout: Project["layout"]; projects: Project[] }[] = [];
  for (const project of projects) {
    const last = groups[groups.length - 1];
    if (last && last.layout === project.layout) last.projects.push(project);
    else groups.push({ layout: project.layout, projects: [project] });
  }
  return groups;
}

// Work: each project as a horizontal (stacked) or vertical (grid) card, as chosen
// in the admin, in the admin's order.
export default function Work() {
  const { settings, projects } = useContent();
  const groups = runs(projects);
  return (
    <Page name="Work">
      <Hero page="work" />
      {groups[0]?.layout === "vertical" && (
        <div className="mt-[80px] shrink-0 w-[1560px]">
          <Heading title={settings.titles.projects} />
        </div>
      )}
      {groups.map((group, i) =>
        group.layout === "horizontal" ? (
          <StackedProjects key={group.projects[0].id} projects={group.projects} className={i === 0 ? "mt-[80px]" : "mt-[160px]"} heading={i === 0} />
        ) : (
          <ProjectGrid key={group.projects[0].id} projects={group.projects} />
        ),
      )}
      <GrowthSection />
      <ReviewsSection />
      <CtaSection />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
