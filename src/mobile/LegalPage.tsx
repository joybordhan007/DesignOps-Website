import { useMemo } from "react";
import ArticleBody, { parseArticle } from "@/components/ArticleBody";
import { formatDate } from "@/content/helpers";
import { useContent } from "@/content/store";
import MobileFooter from "./MobileFooter";

const articleStyles = {
  gap: "gap-[18px]",
  p: "font-['Inter:Regular'] leading-[1.7] text-[#3e3e3e] text-[14px]",
  h2: "font-['Inter:Semi_Bold'] font-semibold leading-[1.3] mt-[12px] scroll-mt-[90px] text-[#2f2f2f] text-[18px] first:mt-0",
  h3: "font-['Inter:Semi_Bold'] font-semibold leading-[1.3] -mb-[10px] text-[#2f2f2f] text-[15px]",
  list: "flex flex-col font-['Inter:Regular'] gap-[6px] leading-[1.6] list-disc marker:text-[#00b6ca] pl-[20px] text-[#3e3e3e] text-[14px]",
  image: "aspect-[16/10] block object-cover rounded-[10px] w-full",
};

const OTHER = { privacy: { kind: "terms", href: "/terms" }, terms: { kind: "privacy", href: "/privacy" } } as const;

// Privacy Policy (/privacy) and Terms of Service (/terms) on small screens.
export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { settings } = useContent();
  const page = settings.legal[kind];
  const other = settings.legal[OTHER[kind].kind];
  const labels = settings.labels;
  const blocks = useMemo(() => parseArticle(page.body), [page.body]);
  const headings = blocks.flatMap((block) => (block.type === "h2" ? [block] : []));

  return (
    <>
      <header className="flex flex-col gap-[14px] items-start mx-auto px-[20px] pb-[24px] pt-[40px] w-full max-w-[760px]">
        <p className="bg-[#00b6ca]/10 font-['Inter:Semi_Bold'] font-semibold leading-[1.2] px-[12px] py-[6px] rounded-[999px] text-[#00a0b2] text-[12px] tracking-[1.5px] uppercase">{labels.legal.badge}</p>
        <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.15] text-[#2f2f2f] text-[28px]">{page.title}</h1>
        <p className="font-['Inter:Regular'] leading-[1.6] text-[#595959] text-[15px]">{page.intro}</p>
        {page.updated && (
          <p className="flex font-['Inter:Medium'] font-medium gap-[10px] items-center leading-[1.2] text-[#4e4e4e] text-[13px]">
            <span className="bg-[#4e4e4e] h-px w-[32px]" aria-hidden="true" />
            {labels.legal.updated} {formatDate(page.updated)}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-[16px] mx-auto px-[20px] pb-[48px] w-full max-w-[760px]">
        {headings.length > 0 && (
          <details className="bg-white group p-[18px] rounded-[10px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
            <summary className="cursor-pointer flex font-['Inter:Semi_Bold'] font-semibold items-center justify-between leading-[1.2] list-none text-[#2f2f2f] text-[16px]">
              {labels.blogDetails.toc}
              <span aria-hidden="true" className="text-[#00b6ca] text-[20px] transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <ol className="flex flex-col gap-[12px] mt-[16px]">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="font-['Inter:Regular'] leading-[1.4] text-[#3e3e3e] text-[14px] hover:text-[#00b6ca]">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}

        <article className="bg-white p-[20px] rounded-[12px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
          <ArticleBody blocks={blocks} styles={articleStyles} />
        </article>

        <a href={OTHER[kind].href} className="bg-[#191919] flex items-center justify-between p-[20px] rounded-[10px] text-white">
          <span className="flex flex-col gap-[6px]">
            <span className="font-['Inter:Regular'] leading-[1.2] text-[#9a9a9a] text-[12px] tracking-[1px] uppercase">{labels.legal.alsoRead}</span>
            <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[17px]">{other.title}</span>
          </span>
          <span className="bg-[#00b6ca] flex items-center p-[8px] rounded-[4px]">
            <img alt="" className="block size-[16px] invert" src="/assets/shared/icons/arrow-forward-long.svg" />
          </span>
        </a>
      </div>

      <MobileFooter />
    </>
  );
}
