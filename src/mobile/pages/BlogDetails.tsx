import TalkButton from "../TalkButton";
import GrowthInsights from "../GrowthInsights";
import MobileFooter from "../MobileFooter";

// Mobile layout of the blog post page. The article content mirrors the desktop page.

const image = "/assets/blog-details/dbe4b.webp";

const toc = [
  "Logo Design Cost: At A Glance",
  "Why Logo Design is Important for a Brand?",
  "How Much Does It Cost to Design a Logo?",
  "Freelance Graphics Designer VS Agency: Which is the Better Option?",
  "Pricing Factors of Designing a Logo",
  "Final Discussion",
  "FAQs on Logo Design Cost",
];

const intro = [
  "Novel research material” refers to original, unexplored sources or data sets that offer fresh perspectives on a given topic, pushing the boundaries of existing knowledge and inviting rigorous scholarly inquiry. Unlike repurposed or derivative content, novel research material emerges from innovative methodologies—whether through cutting‑edge experiments, newly digitized archives, under‑studied communities, or interdisciplinary synthesis—that have not yet been subjected to extensive academic scrutiny. Its value lies not only in presenting previously hidden insights but also in challenging prevailing assumptions.",
  "Prompting researchers to refine theoretical frameworks and forge new avenues of investigation. To be truly “researchable,” such material must be accessible and well‑documented, with clear provenance, reliable metadata, and methodological transparency that allow others to replicate or build upon initial findings.",
  "Moreover, novel research material often catalyzes collaboration across fields—historians might mine geospatial data to reinterpret urban development, while sociologists leverage machine‑learning analyses of social media footprints to trace emergent cultural trends—ensuring that breakthroughs in one discipline reverberate widely. In an era defined by both information overload and accelerating technological change, the discovery and cultivation of novel research material remain indispensable for driving impactful scholarship and sustaining the continual evolution of human understanding.",
];

const teaching = [
  "To instruct aspiring learners in the principles of fiscal legislation, begin by crafting a well‑structured syllabus that balances theoretical frameworks with practical illustrations. Rather than merely lecturing, strive for participatory sessions: facilitate roundtable discussions on landmark statutes, organize mock hearings to explore regulatory compliance, and assign case analyses of real‑world monetary statutes. Introduce scholarly articles and judicial opinions as reading materials, then guide students through critical appraisal by highlighting how courts interpret securities laws, banking ordinances, or consumer protection mandates.",
  "To reinforce conceptual clarity, employ visual aids—flowcharts tracing the lifecycle of a financial instrument, infographics summarizing anti‑fraud provisions, or timelines of major regulatory reforms. Encourage collaborative projects in which small groups draft policy briefs or simulate legislative hearings, enabling each participant to articulate arguments, negotiate amendments, and defend their positions under peer review. Incorporate technology tools—legal databases, interactive quizzes, and virtual courtroom platforms—to foster self‑directed exploration and immediate feedback.",
  "Throughout the course, emphasize the importance of ethical considerations, professional responsibility, and ongoing legal developments, ensuring that every disciple of financial law cultivates not only a robust knowledge base but also the analytical skills and moral compass necessary to navigate the ever‑evolving landscape of fiscal governance.",
];

const points = [
  "Financial law establishes the rules governing markets, institutions, and transactions. When future lawyers, policymakers, or business leaders understand these regulations, they’re better equipped to prevent systemic failures—such as banking crises or securities collapses—by spotting weak spots in compliance frameworks and advising on sound risk‑management practices.",
  "Knowledge of consumer‑protection statutes, anti‑fraud measures, and disclosure requirements empowers students to champion transparency and fairness. Graduates who grasp these safeguards can advocate for vulnerable borrowers, ensure investors receive accurate information, and hold unscrupulous actors accountable, thereby fostering public trust in the financial system.",
  "Financial law courses emphasize not only what the rules are, but why they exist: to minimize conflicts of interest, curb market abuse, and uphold fiduciary duties. By internalizing these ethical foundations, students cultivate the professional integrity needed to resist shortcuts and to advise organizations in ways that balance profit with public interest.",
  "Global finance is subject to rapid change—new instruments, digital currencies, cross‑border transactions, and environmental, social, and governance (ESG) mandates all demand fresh legal responses. A solid grounding in current financial law gives students the analytical tools to interpret novel regulations, adapt to shifting compliance requirements, and contribute to future policy developments.",
];

const text = "font-['Inter:Regular'] leading-[1.7] text-[#3e3e3e] text-[14px]";
const subheading = "font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[#d68c13] text-[16px]";

export default function BlogDetails() {
  return (
    <>

      <article className="flex flex-col gap-[20px] mx-auto px-[20px] pb-[32px] pt-[36px] w-full max-w-[760px]">
        <p className="flex font-['Inter:Regular'] gap-[10px] items-center leading-[1.2] text-[#4e4e4e] text-[14px]">
          <span className="bg-[#4e4e4e] h-px w-[32px]" aria-hidden="true" />
          May 30,2026
        </p>
        <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.25] text-[#2f2f2f] text-[20px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .
        </h1>
        <img alt="" className="aspect-[16/10] block object-cover rounded-[10px] w-full" src={image} />

        <details className="bg-white group p-[18px] rounded-[10px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
          <summary className="cursor-pointer flex font-['Inter:Semi_Bold'] font-semibold items-center justify-between leading-[1.2] list-none text-[#2f2f2f] text-[16px]">
            Table of Contents
            <span aria-hidden="true" className="text-[#00b6ca] text-[20px] transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <ol className="flex flex-col gap-[12px] mt-[16px]">
            {toc.map((item, index) => (
              <li key={item} className={`font-['Inter:Regular'] leading-[1.4] text-[14px] ${index === 0 ? "text-[#00b6ca]" : "text-[#3e3e3e]"}`}>
                {item}
              </li>
            ))}
          </ol>
        </details>

        {intro.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className={text}>
            {paragraph}
          </p>
        ))}

        <h2 className={subheading}>Lorem ipsum dolor sit amet.</h2>
        <img alt="" className="aspect-[16/10] block object-cover rounded-[10px] w-full" src={image} loading="lazy" />

        <h2 className={subheading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        {teaching.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className={text}>
            {paragraph}
          </p>
        ))}

        <h2 className={subheading}>Lorem ipsum dolor sit amet, consectetur.</h2>
        <ol className="flex flex-col gap-[18px]">
          {points.map((paragraph, index) => (
            <li key={index} className="flex flex-col gap-[6px]">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[#2f2f2f] text-[14px]">
                {index + 1}. Lorem ipsum dolor sit amet, consectetur.
              </p>
              <p className={text}>{paragraph}</p>
            </li>
          ))}
        </ol>
        <p className={text}>
          In sum, teaching financial law cultivates a generation of professionals who understand the legal architecture underpinning economic activity, can safeguard the rights of individuals and markets alike, and are prepared to navigate—and even guide—the ever‑shifting terrain of global finance.
        </p>
      </article>

      <aside className="gap-[16px] grid mx-auto px-[20px] pb-[16px] w-full max-w-[760px] md:grid-cols-2">
        <div className="bg-[#00b6ca] flex flex-col gap-[16px] p-[24px] rounded-[8px] text-white">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px]">UI UX design Inspiration right in your inbox</p>
          <p className="font-['Inter:Regular'] leading-[1.5] text-[14px]">
            By entering your email, you are agreeing to our <span className="underline">privacy policy.</span>
          </p>
        </div>
        <div className="bg-black flex flex-col gap-[20px] items-start p-[24px] rounded-[8px]">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px] text-white">Want a site that sells, Not just sits?</p>
          <TalkButton />
        </div>
      </aside>

      <GrowthInsights showButton={false} />
      <MobileFooter />
    </>
  );
}
