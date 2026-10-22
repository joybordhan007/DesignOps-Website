import { useEffect, useMemo, useState } from "react";
import ArticleBody, { parseArticle } from "@/components/ArticleBody";
import Footer from "@/components/Footer";
import { formatDate } from "@/content/helpers";
import { currentPost } from "@/content/route";
import { useContent } from "@/content/store";
import GrowthSection from "./sections/GrowthSection";
import Page from "./sections/Page";
import TalkButton from "./sections/TalkButton";

const articleStyles = {
  gap: "gap-[32px]",
  p: "font-['Inter:Regular'] leading-[1.5] text-[#595959] text-[18px]",
  h2: "font-['Aileron:SemiBold'] font-semibold leading-[1.2] mt-[16px] scroll-mt-[120px] text-[#222] text-[24px]",
  h3: "font-['Aileron:SemiBold'] font-semibold leading-[1.5] -mb-[20px] text-[#272727] text-[18px]",
  list: "flex flex-col font-['Inter:Regular'] gap-[8px] leading-[1.5] list-disc pl-[24px] text-[#595959] text-[18px]",
  image: "block h-[387px] object-cover rounded-[8px] w-full",
};

/** Id of the last heading scrolled past, for highlighting the table of contents. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const update = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids]);
  return active;
}

// Blog post page (/blog/:slug).
export default function BlogDetails() {
  useContent(); // re-render when the content changes
  const post = currentPost();
  const blocks = useMemo(() => parseArticle(post.body), [post.body]);
  const headings = blocks.flatMap((block) => (block.type === "h2" ? [block] : []));
  const ids = useMemo(() => headings.map((h) => h.id), [post.body]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = useActiveHeading(ids);

  return (
    <Page name="Blog Details">
      <div className="flex gap-[24px] items-start mt-[172px] shrink-0 w-[1560px]">
        <aside className="flex flex-col gap-[16px] items-end shrink-0 sticky top-[104px] w-[348px]">
          <div className="bg-[#00b6ca] flex flex-col gap-[26px] items-start px-[20px] py-[28px] rounded-[8px] text-white w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[24px] w-full">UI UX design Inspiration right in your inbox</p>
            <p className="font-['Aileron:Regular'] leading-[1.5] text-[16px] w-full">
              By entering your email, you are agreeing to our <span className="underline">privacy policy.</span>
            </p>
          </div>
          <div className="bg-black flex flex-col gap-[26px] items-start overflow-clip px-[20px] py-[28px] relative rounded-[8px] w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[24px] text-white w-full">Want a site that sells, Not just sits?</p>
            <TalkButton />
            <img alt="" className="absolute h-[184px] left-[254px] max-w-none top-[108px] w-[175.5px]" src="/assets/blog-details/2494e.svg" />
          </div>
        </aside>

        <article className="flex flex-col gap-[61px] items-start shrink-0 w-[816px]">
          <div className="flex flex-col gap-[49px] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <div className="flex gap-[4px] items-center">
                <span className="bg-[#222] h-[1.5px] w-[38px]" aria-hidden="true" />
                <p className="font-['Inter:Regular'] leading-[1.2] text-[#222] text-[18px] whitespace-nowrap">{formatDate(post.date)}</p>
              </div>
              <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#222] text-[48px] w-full">{post.title}</h1>
            </div>
            <div className="h-[432px] overflow-hidden relative rounded-[8px] shrink-0 w-full">
              <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={post.image} />
            </div>
          </div>
          <ArticleBody blocks={blocks} styles={articleStyles} />
        </article>

        {headings.length > 0 && (
          <nav aria-label="Table of contents" className="bg-white flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[20px] rounded-[8px] sticky top-[104px]">
            <p className="font-['Inter:Bold'] font-bold leading-[1.2] text-[#222] text-[24px] w-full">Table of Contents</p>
            <div className="flex flex-col w-full">
              {headings.map((heading, i) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block font-['Inter:Medium'] font-medium leading-[1.2] py-[18px] text-[16px] transition-colors hover:text-[#00b6ca] ${
                    i < headings.length - 1 ? "border-[rgba(0,0,0,0.1)] border-b" : ""
                  } ${active === heading.id ? "text-[#00b6ca]" : "text-[#222]"}`}
                >
                  {heading.text}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>

      <GrowthSection button={false} className="mt-[239px]" />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
