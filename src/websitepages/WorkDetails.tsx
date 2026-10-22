import ColorPalette from "@/components/ColorPalette";
import Footer from "@/components/Footer";
import { currentProject } from "@/content/route";
import { useContent } from "@/content/store";
import type { Project } from "@/content/types";
import CtaSection from "./sections/CtaSection";
import GrowthSection from "./sections/GrowthSection";
import Page from "./sections/Page";
import ReviewsSection from "./sections/ReviewsSection";

type Feature = Project["detail"]["solution"]["features"][number];

function Tag({ children }: { children: string }) {
  return (
    <div className="bg-[#00b6ca] flex items-center justify-center px-[16px] py-[8px] rounded-[999px] shrink-0">
      <p className="font-['Inter:Regular'] leading-[1.2] text-[14px] text-white whitespace-nowrap">{children}</p>
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="bg-[#f5f5f5] drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex flex-[1_0_0] flex-col gap-[24px] items-start justify-center min-h-px min-w-px p-[40px] rounded-[8px] w-full">
      <div className="bg-[rgba(214,140,19,0.1)] flex items-center px-[15px] py-[14px] rounded-[6px] shrink-0">
        <img alt="" className="block size-[28px]" src={feature.icon} />
      </div>
      <div className="flex flex-col gap-[8px] items-start text-[#2f2f2f] w-full">
        <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px]">{feature.title}</p>
        <p className="font-['Inter:Regular'] leading-[1.2] text-[18px]">{feature.text}</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="border-[rgba(34,34,34,0.2)] border-b border-dashed flex items-center px-[10px] py-[32px] w-full">
      <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[24px] whitespace-nowrap">{children}</p>
    </div>
  );
}

// Work details page (/work/:slug), one layout for every project.
export default function WorkDetails() {
  const labels = useContent().settings.labels.workDetails;
  const project = currentProject();
  const { detail } = project;
  const { solution } = detail;
  const sideFeatures = solution.features.slice(0, 2);
  const bottomFeatures = solution.features.slice(2);

  return (
    <Page name="Work Details">
      <div className="flex flex-col gap-[40px] items-start mt-[184px] shrink-0 w-[1560px]">
        <h1 className="font-['Inter:Bold'] font-bold leading-[1.2] text-[#2f2f2f] text-[48px] w-full">{detail.heading}</h1>
        <div className="h-[780px] overflow-hidden relative rounded-[24px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0 w-full">
          <img alt={project.title} className="absolute inset-0 max-w-none object-cover size-full" src={detail.heroImage} />
        </div>
      </div>

      <div className="flex flex-col gap-[56px] items-start mt-[80px] shrink-0 text-[20px] w-[1560px]">
        <p className="font-['Inter:Regular'] leading-[1.4] text-[#2f2f2f] w-full">
          <span className="font-['Inter:Semi_Bold'] font-semibold">{labels.overview}</span> {detail.overview}
        </p>
        <div className="flex gap-[80px] items-start w-full">
          {[
            ["Pages in Projects", project.pages],
            ["Project Duration", project.duration],
            ["Website", project.website],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] uppercase w-full">{label}</p>
              {label === "Website" && value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="font-['Inter:Regular'] leading-[1.4] text-[#222] break-all hover:text-[#00b6ca]">
                  {value}
                </a>
              ) : (
                <p className="font-['Inter:Regular'] leading-[1.4] text-[#222] w-full">{value}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[20px] items-start mt-[80px] shrink-0 w-[1560px]">
        <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[24px] w-full">{labels.goals}</p>
        <div className="flex flex-col font-['Inter:Regular'] gap-[20px] items-start text-[18px] w-full">
          <p className="leading-[1.4] text-[#333] w-full">{detail.goals}</p>
          {detail.goalPoints.length > 0 && (
            <ul className="flex flex-col gap-[16px] list-disc text-[#222] w-[932px]">
              {detail.goalPoints.map((point, i) => (
                <li key={i} className="leading-[1.4] ms-[27px]">
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex gap-[24px] items-center min-h-[619px] mt-[159px] shrink-0 w-[1560px]">
        <div className="flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px">
          <Tag>{labels.challenge}</Tag>
          <div className="flex flex-col gap-[20px] items-start w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[24px] w-full">{detail.challenge.title}</p>
            <div className="flex flex-col font-['Inter:Regular'] gap-[20px] items-start text-[18px] w-full">
              <p className="leading-[1.4] text-[#2f2f2f] w-full">{detail.challenge.text}</p>
              <div className="border-[#00b6ca] border-l border-solid flex flex-col gap-[16px] items-start pl-[24px] text-black w-full">
                {detail.challenge.points.map((point, i) => (
                  <p key={i} className="leading-[1.2]">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] h-[619px] min-w-px overflow-hidden relative rounded-[24px]">
          <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover size-full" src={detail.challenge.image} />
        </div>
      </div>

      <div className="bg-[#191919] flex flex-col gap-[32px] items-start mt-[160px] px-[180px] py-[64px] shrink-0 w-[1920px]">
        <div className="flex flex-col gap-[16px] items-start w-[852px]">
          <Tag>{labels.solution}</Tag>
          <div className="flex flex-col gap-[16px] items-start text-white w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[24px] w-full">{solution.title}</p>
            <p className="font-['Inter:Regular'] leading-[1.2] text-[18px] w-full">{solution.text}</p>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-start w-full">
          <div className="flex gap-[24px] items-stretch w-full">
            <div className="drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] h-[538px] overflow-clip relative rounded-[8px] shrink-0 w-[1035px]">
              <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover size-full" src={solution.image} />
              <div className="absolute bottom-0 h-[171px] inset-x-0" style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0) 0.85%, rgb(0,0,0) 99%)" }} />
              <div className="absolute bottom-[56px] flex flex-col gap-[12px] items-start left-[51px] right-[51px] text-white">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px]">{solution.imageTitle}</p>
                <p className="font-['Inter:Regular'] leading-[1.2] text-[18px]">{solution.imageText}</p>
              </div>
            </div>
            {sideFeatures.length > 0 && (
              <div className="flex flex-[1_0_0] flex-col gap-[24px] min-w-px">
                {sideFeatures.map((feature, i) => (
                  <FeatureCard key={i} feature={feature} />
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-[24px] items-stretch w-full">
            {bottomFeatures.map((feature, i) => (
              <div key={i} className="flex flex-[1_0_0] min-w-px">
                <FeatureCard feature={feature} />
              </div>
            ))}
            {solution.stat.value && (
              <div className="bg-[#00b6ca] drop-shadow-[0px_1px_5px_rgba(0,0,0,0.1)] flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px p-[40px] rounded-[8px] text-white">
                <p className="font-['Inter:Bold'] font-bold leading-[1.2] text-[60px] whitespace-nowrap">{solution.stat.value}</p>
                <div className="flex flex-col gap-[8px] items-start w-full">
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px]">{solution.stat.title}</p>
                  <p className="font-['Inter:Regular'] leading-[1.2] text-[18px]">{solution.stat.text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {detail.palette.length > 0 && (
        <div className="flex flex-col gap-[64px] items-start mt-[81px] shrink-0 w-[1560px]">
          <div className="flex flex-col gap-[40px] items-start w-full">
            <SectionLabel>{labels.palette}</SectionLabel>
            <p className="font-['Inter:Regular'] leading-[1.2] text-[#2f2f2f] text-[18px] w-full">This website uses a {detail.palette.length} color palette.</p>
          </div>
          <ColorPalette colors={detail.palette} />
        </div>
      )}

      {detail.tags.length > 0 && (
        <div className="flex flex-col gap-[56px] items-start mt-[79px] shrink-0 w-[1560px]">
          <SectionLabel>{labels.tools}</SectionLabel>
          <div className="flex flex-wrap gap-[24px] items-center w-full">
            {detail.tags.map((tag) => (
              <div key={tag} className="border border-[#2f2f2f] border-solid flex items-center justify-center px-[32px] py-[13.5px] rounded-[9999px] shrink-0">
                <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[18px] text-center whitespace-nowrap">{tag}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <GrowthSection className="mt-[157px]" />
      <ReviewsSection className="mt-[153px]" />
      <CtaSection />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
