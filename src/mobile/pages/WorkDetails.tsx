import { currentProject } from "@/content/route";
import { useContent } from "@/content/store";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

const container = "mx-auto px-[20px] w-full max-w-[760px]";
const body = "font-['Inter:Regular'] leading-[1.6] text-[#3e3e3e] text-[14px]";

function Tag({ children }: { children: string }) {
  return <span className="bg-[#00b6ca] font-['Inter:Medium'] font-medium leading-[1.2] px-[12px] py-[6px] rounded-full self-start text-[12px] text-white">{children}</span>;
}

// Work details page (/work/:slug) on small screens.
export default function WorkDetails() {
  useContent(); // re-render when the content changes
  const project = currentProject();
  const { detail } = project;
  const { solution } = detail;

  return (
    <>
      <section className={`${container} flex flex-col gap-[24px] pb-[24px] pt-[40px]`} data-name="Intro">
        <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.25] text-[#2f2f2f] text-[20px]">{detail.heading}</h1>
        <img alt={project.title} className="aspect-[16/10] block object-cover rounded-[12px] w-full" src={detail.heroImage} />
        <p className={body}>
          <span className="font-['Inter:Semi_Bold'] font-semibold text-[#2f2f2f]">Project overview:</span> {detail.overview}
        </p>
        <dl className="border-[rgba(0,0,0,0.1)] border-y gap-[16px] grid grid-cols-2 py-[18px] md:grid-cols-3">
          {[
            ["Pages in Projects", project.pages],
            ["Project Duration", project.duration],
            ["Website", project.website],
          ].map(([term, value]) => (
            <div key={term} className="flex flex-col gap-[6px]">
              <dt className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[12px] uppercase">{term}</dt>
              <dd className="break-all font-['Inter:Regular'] leading-[1.3] text-[#4e4e4e] text-[14px]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${container} flex flex-col gap-[16px] py-[24px]`} data-name="Goals">
        <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">Goals</h2>
        <p className={body}>{detail.goals}</p>
        {detail.goalPoints.length > 0 && (
          <ul className="flex flex-col gap-[10px] list-disc pl-[20px]">
            {detail.goalPoints.map((point, i) => (
              <li key={i} className={body}>
                {point}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={`${container} flex flex-col gap-[20px] py-[32px]`} data-name="Challenge">
        <Tag>The Challenge</Tag>
        <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">{detail.challenge.title}</h2>
        <p className={body}>{detail.challenge.text}</p>
        <ul className="flex flex-col gap-[10px]">
          {detail.challenge.points.map((item, i) => (
            <li key={i} className="flex font-['Inter:Regular'] gap-[10px] items-start leading-[1.4] text-[#2f2f2f] text-[14px]">
              <span className="bg-[#00b6ca] mt-[7px] rounded-full shrink-0 size-[7px]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <img alt="" className="aspect-[4/3] block object-cover rounded-[12px] w-full" src={detail.challenge.image} loading="lazy" />
      </section>

      <section className="px-[8px] py-[24px]" data-name="Solution">
        <div className="bg-[#191919] rounded-[8px]">
          <div className={`${container} flex flex-col gap-[20px] py-[48px]`}>
            <Tag>The Solution</Tag>
            <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px] text-white">{solution.title}</h2>
            <p className="font-['Inter:Regular'] leading-[1.5] text-[#dfdfdf] text-[14px]">{solution.text}</p>
            <figure className="bg-[#2a2a2a] overflow-hidden rounded-[10px]">
              <img alt="" className="aspect-[4/3] block object-cover w-full" src={solution.image} loading="lazy" />
              <figcaption className="flex flex-col gap-[4px] p-[16px]">
                <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[16px] text-white">{solution.imageTitle}</span>
                <span className="font-['Inter:Regular'] leading-[1.3] text-[#dfdfdf] text-[14px]">{solution.imageText}</span>
              </figcaption>
            </figure>
            <div className="gap-[12px] grid grid-cols-2">
              {solution.features.map((feature, i) => (
                <div key={i} className="bg-[#f6f6f6] flex flex-col gap-[12px] p-[16px] rounded-[10px]">
                  <img alt="" className="block size-[32px]" src={feature.icon} />
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[14px]">{feature.title}</p>
                    <p className="font-['Inter:Regular'] leading-[1.3] text-[#4e4e4e] text-[12px]">{feature.text}</p>
                  </div>
                </div>
              ))}
              {solution.stat.value && (
                <div className="bg-[#00b6ca] col-span-2 flex flex-col gap-[6px] p-[20px] rounded-[10px] text-white">
                  <p className="font-['Inter:Bold'] font-bold leading-none text-[20px]">{solution.stat.value}</p>
                  <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[16px]">{solution.stat.title}</p>
                  <p className="font-['Inter:Regular'] leading-[1.3] text-[12px]">{solution.stat.text}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {detail.palette.length > 0 && (
        <section className={`${container} flex flex-col gap-[16px] py-[32px]`} data-name="Color Palette">
          <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">Color Palette</h2>
          <p className={body}>This website uses a {detail.palette.length} color palette.</p>
          <div className="flex h-[220px] overflow-hidden rounded-[12px]">
            {detail.palette.map((hex, i) => (
              <div key={`${hex}-${i}`} className="flex flex-1 flex-col justify-between p-[14px] text-white" style={{ backgroundColor: hex }}>
                <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[12px] uppercase">HEX {hex}</p>
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[20px] text-right">Aa</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {detail.tags.length > 0 && (
        <section className={`${container} flex flex-col gap-[16px] py-[24px]`} data-name="Technologies">
          <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">Technologies &amp; Tools</h2>
          <div className="flex flex-wrap gap-[10px]">
            {detail.tags.map((tag) => (
              <span key={tag} className="border border-[#2f2f2f] font-['Inter:Regular'] leading-[1.2] px-[14px] py-[8px] rounded-full text-[#2f2f2f] text-[12px]">
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
