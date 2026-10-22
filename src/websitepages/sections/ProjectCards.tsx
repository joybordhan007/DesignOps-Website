import { useContent } from "@/content/store";
import { projectUrl } from "@/content/helpers";
import type { Project } from "@/content/types";
import Heading from "./Heading";

// Project cards that link to the work details page, as stacked sticky cards
// (Home and the top of Work) or as a two-column grid (rest of Work).

function ViewCaseStudy() {
  return (
    <span className="bg-[#171717] flex gap-[10px] items-center pl-[18px] pr-[8px] py-[8px] relative rounded-[4px] shrink-0">
      <span className="block h-[19.2px] overflow-clip relative">
        <span className="flex flex-col font-['Inter:Medium'] font-medium leading-[1.2] text-[#f6f6f6] text-[16px] transition-transform duration-[380ms] ease-[cubic-bezier(0.2,0.75,0.3,1)] whitespace-nowrap group-hover:-translate-y-1/2">
          <span>VIEW CASE STUDY</span>
          <span aria-hidden="true">VIEW CASE STUDY</span>
        </span>
      </span>
      <span className="bg-[#f6f6f6] flex items-center p-[6px] relative rounded-[4px] shrink-0">
        <img alt="" className="block size-[18px] transition-transform duration-[380ms] group-hover:-rotate-45" src="/assets/shared/icons/arrow-forward-long.svg" />
      </span>
    </span>
  );
}

function Facts({ project }: { project: Project }) {
  return (
    <div className="flex gap-[59px] items-center text-left">
      <div className="flex flex-col gap-[8px] items-start w-[147px]">
        <p className="font-['Inter:Regular'] leading-[1.3] text-[#3e3e3e] text-[18px] w-full">Pages in Projects</p>
        <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[24px] w-full">{project.pages}</p>
      </div>
      <div className="flex flex-col gap-[8px] items-start">
        <p className="font-['Inter:Regular'] leading-[1.3] text-[#3e3e3e] text-[18px] whitespace-nowrap">Project Duration</p>
        <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[24px]">{project.duration}</p>
      </div>
    </div>
  );
}

function Intro({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-[24px] items-start text-left w-full">
      <p className="font-['Inter:Italic'] italic leading-[1.2] text-[#2f2f2f] text-[16px] w-full">{project.category}</p>
      <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[28px] w-full">{project.title}</p>
      <p className="font-['Inter:Regular'] leading-[1.3] line-clamp-3 text-[#3e3e3e] text-[18px] w-full">{project.summary}</p>
    </div>
  );
}

const cardMotion = "group transition-transform duration-300 ease-out hover:-translate-y-[4px]";

// Geometry of the stacked cards (from the Figma prototype): each card scrolls in
// 600px after the previous one and comes to rest 80px lower than it, so the
// cards pile up with their tops showing.
const CARD_HEIGHT = 520;
const FIRST_OFFSET = 220;
const PILE_STEP = 80;
const SPACING = 600;
const STICKY_TOP = 64; // keeps the pinned heading clear of the fixed navbar

export function StackedProjects({ projects, className = "mt-[160px]" }: { projects: Project[]; className?: string }) {
  const { settings } = useContent();
  if (!projects.length) return null;
  const height = FIRST_OFFSET + SPACING * (projects.length - 1) + CARD_HEIGHT;

  return (
    <div className={`pointer-events-none relative shrink-0 w-[1560px] ${className}`} style={{ height }} data-name="Projects">
      {projects.map((project, i) => {
        const offset = FIRST_OFFSET + PILE_STEP * i;
        const wrapperTop = FIRST_OFFSET + SPACING * i - offset;
        return (
          <div key={project.id} className="absolute bottom-0 left-0 w-[1560px]" style={{ top: wrapperTop }}>
            <div className="pointer-events-none sticky w-[1560px]" style={{ top: STICKY_TOP, height: offset + CARD_HEIGHT }}>
              {i === 0 && (
                <div className="pointer-events-auto pt-[60px]">
                  <Heading title={settings.titles.projects} />
                </div>
              )}
              <a
                href={projectUrl(project)}
                aria-label={`${project.title} case study`}
                className={`absolute bg-white drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex h-[520px] items-center justify-center left-0 p-[24px] pointer-events-auto rounded-[24px] w-[1560px] ${cardMotion}`}
                style={{ top: offset }}
              >
                <div className="bg-[#f6f6f6] flex flex-[1_0_0] h-full items-center justify-between min-w-px relative rounded-[8px]">
                  <div className="flex flex-col gap-[56px] h-[456px] items-start pb-[40px] pt-[10px] px-[24px] relative shrink-0 w-[708px]">
                    <Intro project={project} />
                    <div className="flex flex-[1_0_0] flex-col items-start justify-between min-h-px">
                      <Facts project={project} />
                      <ViewCaseStudy />
                    </div>
                  </div>
                  <div className="h-full overflow-hidden relative rounded-[8px] shrink-0 w-[756px]">
                    <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={project.cover} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  return (
    <div className="bg-[#191919] mt-[160px] rounded-[8px] shrink-0 w-[1872px]" data-name="Project Grid">
      <div className="gap-x-[24px] gap-y-[80px] grid grid-cols-2 mx-auto py-[130px] w-[1560px]">
        {projects.map((project) => (
          <a
            key={project.id}
            href={projectUrl(project)}
            aria-label={`${project.title} case study`}
            className={`bg-[#f5f5f5] drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex flex-col gap-[32px] items-start relative rounded-[24px] w-[768px] ${cardMotion}`}
          >
            <div className="h-[450px] overflow-hidden relative rounded-[24px] shrink-0 w-full">
              <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={project.cover} />
            </div>
            <div className="flex flex-col gap-[56px] items-start pb-[32px] px-[32px] w-full">
              <Intro project={project} />
              <div className="flex flex-col h-[149px] items-start justify-between">
                <Facts project={project} />
                <ViewCaseStudy />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
