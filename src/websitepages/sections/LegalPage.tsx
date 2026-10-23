import { useMemo } from "react";
import ArticleBody, { parseArticle } from "@/components/ArticleBody";
import Footer from "@/components/Footer";
import { formatDate } from "@/content/helpers";
import { useContent } from "@/content/store";
import useActiveHeading from "@/lib/useActiveHeading";
import Page from "./Page";

const articleStyles = {
  gap: "gap-[28px]",
  p: "font-['Inter:Regular'] leading-[1.6] text-[#595959] text-[18px]",
  h2: "font-['Inter:Semi_Bold'] font-semibold leading-[1.2] mt-[24px] scroll-mt-[120px] text-[#222] text-[28px] first:mt-0",
  h3: "font-['Inter:Semi_Bold'] font-semibold leading-[1.4] -mb-[16px] text-[#272727] text-[20px]",
  list: "flex flex-col font-['Inter:Regular'] gap-[10px] leading-[1.6] list-disc marker:text-[#00b6ca] pl-[24px] text-[#595959] text-[18px]",
  image: "block h-[387px] object-cover rounded-[8px] w-full",
};

const OTHER = { privacy: { kind: "terms", href: "/terms" }, terms: { kind: "privacy", href: "/privacy" } } as const;

// Privacy Policy (/privacy) and Terms of Service (/terms), edited in the dashboard.
export default function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { settings } = useContent();
  const page = settings.legal[kind];
  const other = settings.legal[OTHER[kind].kind];
  const labels = settings.labels;
  const blocks = useMemo(() => parseArticle(page.body), [page.body]);
  const headings = blocks.flatMap((block) => (block.type === "h2" ? [block] : []));
  const ids = useMemo(() => headings.map((h) => h.id), [page.body]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = useActiveHeading(ids);

  return (
    <Page name={page.title}>
      <header className="flex flex-col gap-[28px] items-start mt-[208px] shrink-0 w-[1560px]" data-name="Hero">
        <p className="bg-[#00b6ca]/10 font-['Inter:Semi_Bold'] font-semibold leading-[1.2] px-[16px] py-[8px] rounded-[999px] text-[#00a0b2] text-[16px] tracking-[2px] uppercase">{labels.legal.badge}</p>
        <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.1] text-[#2f2f2f] text-[80px] tracking-[1.6px]">{page.title}</h1>
        <p className="font-['Inter:Regular'] leading-[1.5] max-w-[1040px] text-[#595959] text-[24px]">{page.intro}</p>
        {page.updated && (
          <p className="flex font-['Inter:Medium'] font-medium gap-[10px] items-center leading-[1.2] text-[#3e3e3e] text-[18px]">
            <span className="bg-[#3e3e3e] h-[1.5px] w-[38px]" aria-hidden="true" />
            {labels.legal.updated} {formatDate(page.updated)}
          </p>
        )}
      </header>

      <div className="flex gap-[24px] items-start mt-[96px] shrink-0 w-[1560px]">
        <aside className="flex flex-col gap-[16px] shrink-0 sticky top-[104px] w-[348px]">
          {headings.length > 0 && (
            <nav aria-label="Table of contents" className="bg-white flex flex-col gap-[8px] p-[20px] rounded-[8px]">
              <p className="font-['Inter:Bold'] font-bold leading-[1.2] pb-[8px] text-[#222] text-[22px]">{labels.blogDetails.toc}</p>
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`border-l-[3px] font-['Inter:Medium'] font-medium leading-[1.3] pl-[14px] py-[8px] text-[16px] transition-colors hover:text-[#00b6ca] ${
                    active === heading.id ? "border-[#00b6ca] text-[#00a0b2]" : "border-transparent text-[#3e3e3e]"
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          )}
          <a href={OTHER[kind].href} className="bg-[#191919] flex flex-col gap-[10px] group p-[24px] rounded-[8px] text-white">
            <span className="font-['Inter:Regular'] leading-[1.2] text-[#9a9a9a] text-[14px] uppercase tracking-[1px]">{labels.legal.alsoRead}</span>
            <span className="flex font-['Inter:Semi_Bold'] font-semibold gap-[10px] items-center justify-between leading-[1.2] text-[22px]">
              {other.title}
              <span className="bg-[#00b6ca] flex items-center p-[8px] rounded-[4px] transition-transform group-hover:translate-x-[4px]">
                <img alt="" className="block size-[18px] invert" src="/assets/shared/icons/arrow-forward-long.svg" />
              </span>
            </span>
          </a>
        </aside>

        <article className="bg-white flex-[1_0_0] min-w-px p-[64px] rounded-[24px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.06)]">
          <ArticleBody blocks={blocks} styles={articleStyles} />
        </article>
      </div>

      <Footer className="bg-[#191919] h-[764px] mt-[160px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
