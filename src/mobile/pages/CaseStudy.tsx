import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

const overview =
  "A brief summary of what your project covers, and what kind of impact it had on the company. If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated.";

const goals =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.";

const challenges = [
  "Fragmented data across 15+ sources",
  "Manual reporting taking 40+ hours weekly",
  "No real-time visibility into KPIs",
  "Complex queries requiring technical expertise",
];

const features = [
  { icon: "/assets/case-study/9a55c.svg", title: "Universal Connector", text: "Connect any data source" },
  { icon: "/assets/case-study/1f314.svg", title: "AI Insights", text: "Automated predictions" },
  { icon: "/assets/case-study/9bb03.svg", title: "Real-Time", text: "Live data updates" },
  { icon: "/assets/case-study/01dfe.svg", title: "Enterprise Security", text: "SOC 2 compliant" },
];

const palette = [
  { color: "#191919", text: "#ffffff" },
  { color: "#00b6ca", text: "#ffffff" },
  { color: "#bfd613", text: "#2f2f2f" },
];

const tags = ["Business & Corporate", "Technology", "Web & Interactive", "Fullscreen", "Video", "Transitions", "Storytelling", "UI design"];

const container = "mx-auto px-[20px] w-full max-w-[760px]";
const body = "font-['Inter:Regular'] leading-[1.6] text-[#3e3e3e] text-[14px]";

function Tag({ children }: { children: string }) {
  return <span className="bg-[#00b6ca] font-['Inter:Medium'] font-medium leading-[1.2] px-[12px] py-[6px] rounded-full self-start text-[12px] text-white">{children}</span>;
}

export default function CaseStudy() {
  return (
    <>

      <section className={`${container} flex flex-col gap-[24px] pb-[24px] pt-[40px]`} data-name="Intro">
        <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.25] text-[#2f2f2f] text-[20px]">Lorem ipsum is a dummy or placeholder text commonly.</h1>
        <img alt="Project screens on several phones" className="aspect-[16/10] block object-cover rounded-[12px] w-full" src="/assets/case-study/4bc93.webp" />
        <p className={body}>
          <span className="font-['Inter:Semi_Bold'] font-semibold text-[#2f2f2f]">Project overview:</span> {overview}
        </p>
        <dl className="border-[rgba(0,0,0,0.1)] border-y gap-[16px] grid grid-cols-2 py-[18px] md:grid-cols-3">
          {[
            ["Pages in Projects", "100+"],
            ["Project Duration", "2 Months"],
            ["Website", "https://designops.agency"],
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
        <p className={body}>{goals}</p>
        <ul className="flex flex-col gap-[10px] list-disc pl-[20px]">
          {[0, 1, 2].map((i) => (
            <li key={i} className={body}>
              If you have additional information (business, product, etc), you may also
            </li>
          ))}
        </ul>
      </section>

      <section className={`${container} flex flex-col gap-[20px] py-[32px]`} data-name="Challenge">
        <Tag>The Challenge</Tag>
        <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">Data Overload Without Insights</h2>
        <p className={body}>
          Enterprise teams were drowning in data but starving for insights. Legacy systems couldn't handle real-time processing, and visualization tools were disconnected from data sources.
        </p>
        <ul className="flex flex-col gap-[10px]">
          {challenges.map((item) => (
            <li key={item} className="flex font-['Inter:Regular'] gap-[10px] items-start leading-[1.4] text-[#2f2f2f] text-[14px]">
              <span className="bg-[#00b6ca] mt-[8px] rounded-full shrink-0 size-[7px]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <img alt="Phone showing the product dashboard" className="aspect-[4/3] block object-cover rounded-[12px] w-full" src="/assets/case-study/0ecaf.webp" loading="lazy" />
      </section>

      <section className="px-[8px] py-[24px]" data-name="Solution">
        <div className="bg-[#191919] rounded-[8px]">
          <div className={`${container} flex flex-col gap-[20px] py-[48px]`}>
            <Tag>The Solution</Tag>
            <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px] text-white">Unified Intelligence Platform</h2>
            <p className="font-['Inter:Regular'] leading-[1.5] text-[#dfdfdf] text-[14px]">A real-time analytics engine that transforms raw data into beautiful, actionable insights</p>
            <figure className="bg-[#2a2a2a] overflow-hidden rounded-[10px]">
              <img alt="Forgot password flow mobile UI design" className="aspect-[4/3] block object-cover w-full" src="/assets/case-study/9a514.webp" loading="lazy" />
              <figcaption className="flex flex-col gap-[4px] p-[16px]">
                <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[14px] text-white">Forgot Password Flow Mobile UI Design</span>
                <span className="font-['Inter:Regular'] leading-[1.3] text-[#dfdfdf] text-[12px]">Live data updates every 100ms with zero latency</span>
              </figcaption>
            </figure>
            <div className="gap-[12px] grid grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="bg-[#f6f6f6] flex flex-col gap-[12px] p-[16px] rounded-[10px]">
                  <img alt="" className="block size-[32px]" src={feature.icon} />
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[14px]">{feature.title}</p>
                    <p className="font-['Inter:Regular'] leading-[1.3] text-[#4e4e4e] text-[12px]">{feature.text}</p>
                  </div>
                </div>
              ))}
              <div className="bg-[#00b6ca] col-span-2 flex flex-col gap-[6px] p-[20px] rounded-[10px] text-white">
                <p className="font-['Inter:Bold'] font-bold leading-none text-[20px]">10x</p>
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[16px]">Faster Insights</p>
                <p className="font-['Inter:Regular'] leading-[1.3] text-[12px]">From days to minutes with automated analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${container} flex flex-col gap-[16px] py-[32px]`} data-name="Color Palette">
        <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">Color Palette</h2>
        <p className={body}>This website uses a 3 color palette.</p>
        <div className="flex h-[220px] overflow-hidden rounded-[12px]">
          {palette.map((swatch) => (
            <div key={swatch.color} className="flex flex-1 flex-col justify-between p-[14px]" style={{ backgroundColor: swatch.color, color: swatch.text }}>
              <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[12px] uppercase">HEX {swatch.color}</p>
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[20px] text-right">Aa</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${container} flex flex-col gap-[16px] py-[24px]`} data-name="Technologies">
        <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">Technologies &amp; Tools</h2>
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <span key={tag} className="border border-[#2f2f2f] font-['Inter:Regular'] leading-[1.2] px-[14px] py-[8px] rounded-full text-[#2f2f2f] text-[12px]">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
