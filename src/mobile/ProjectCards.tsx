import { projectUrl } from "@/content/helpers";
import { useContent } from "@/content/store";
import type { Project } from "@/content/types";
import SectionTitle from "./SectionTitle";

// "Turn your ideas into impactful solutions" project cards (Home and Work).
// Each card links to the case study.

function ViewCaseStudy() {
  const label = useContent().settings.labels.buttons.viewCaseStudy;
  return (
    <span className="bg-[#171717] flex gap-[6px] items-center pl-[12px] pr-[6px] py-[6px] rounded-[4px] self-start">
      <span className="block h-[12px] overflow-hidden">
        <span className="flex flex-col font-['Inter:Medium'] font-medium leading-[1.2] text-[#f6f6f6] text-[10px] transition-transform duration-[380ms] whitespace-nowrap group-hover:-translate-y-1/2">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </span>
      <span className="bg-[#f6f6f6] flex items-center justify-center p-[4px] rounded-[4px]">
        <img alt="" className="block size-[12px] transition-transform duration-[380ms] group-hover:-rotate-45" src="/assets/shared/icons/arrow-forward-long.svg" />
      </span>
    </span>
  );
}

export default function ProjectCards({ projects }: { projects: Project[] }) {
  const { settings } = useContent();
  if (!projects.length) return null;
  return (
    <section className="flex flex-col gap-[28px] mx-auto px-[20px] py-[48px] w-full max-w-[760px]" data-name="Projects">
      <SectionTitle title={settings.titles.projects} />
      <div className="flex flex-col gap-[20px]">
        {projects.map((project) => (
          <a
            key={project.id}
            href={projectUrl(project)}
            className="bg-white block group p-[12px] rounded-[20px] shadow-[0px_1px_5px_rgba(0,0,0,0.1)] sticky top-[84px]"
          >
            <div className="bg-[#f6f6f6] flex flex-col overflow-hidden rounded-[10px]">
              <div className="aspect-[16/11] overflow-hidden">
                <img alt={`${project.title} project preview`} className="block object-cover size-full transition-transform duration-700 group-hover:scale-105" src={project.cover} loading="lazy" />
              </div>
              <div className="flex flex-col gap-[20px] p-[18px]">
                <div className="flex flex-col gap-[10px]">
                  <p className="font-['Inter:Italic'] italic leading-[1.2] text-[#2f2f2f] text-[14px]">{project.category}</p>
                  <h3 className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[16px]">{project.title}</h3>
                  <p className="font-['Inter:Regular'] leading-[1.4] text-[#3e3e3e] text-[14px]">{project.summary}</p>
                </div>
                <div className="flex gap-[40px]">
                  <div className="flex flex-col gap-[6px]">
                    <p className="font-['Inter:Regular'] leading-[1.3] text-[#3e3e3e] text-[12px]">{settings.labels.projectCard.pages}</p>
                    <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[16px]">{project.pages}</p>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <p className="font-['Inter:Regular'] leading-[1.3] text-[#3e3e3e] text-[12px]">{settings.labels.projectCard.duration}</p>
                    <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[16px]">{project.duration}</p>
                  </div>
                </div>
                <ViewCaseStudy />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
