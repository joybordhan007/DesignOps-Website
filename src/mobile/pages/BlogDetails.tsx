import { useMemo } from "react";
import ArticleBody, { parseArticle } from "@/components/ArticleBody";
import { formatDate } from "@/content/helpers";
import { currentPost } from "@/content/route";
import { useContent } from "@/content/store";
import TalkButton from "../TalkButton";
import GrowthInsights from "../GrowthInsights";
import MobileFooter from "../MobileFooter";

const articleStyles = {
  gap: "gap-[20px]",
  p: "font-['Inter:Regular'] leading-[1.7] text-[#3e3e3e] text-[14px]",
  h2: "font-['Inter:Semi_Bold'] font-semibold leading-[1.3] mt-[8px] scroll-mt-[90px] text-[#d68c13] text-[16px]",
  h3: "font-['Inter:Semi_Bold'] font-semibold leading-[1.3] -mb-[12px] text-[#2f2f2f] text-[14px]",
  list: "flex flex-col font-['Inter:Regular'] gap-[6px] leading-[1.6] list-disc pl-[20px] text-[#3e3e3e] text-[14px]",
  image: "aspect-[16/10] block object-cover rounded-[10px] w-full",
};

// Blog post page (/blog/:slug) on small screens.
export default function BlogDetails() {
  useContent(); // re-render when the content changes
  const post = currentPost();
  const blocks = useMemo(() => parseArticle(post.body), [post.body]);
  const headings = blocks.flatMap((block) => (block.type === "h2" ? [block] : []));

  return (
    <>
      <article className="flex flex-col gap-[20px] mx-auto px-[20px] pb-[32px] pt-[36px] w-full max-w-[760px]">
        <p className="flex font-['Inter:Regular'] gap-[10px] items-center leading-[1.2] text-[#4e4e4e] text-[14px]">
          <span className="bg-[#4e4e4e] h-px w-[32px]" aria-hidden="true" />
          {formatDate(post.date)}
        </p>
        <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.25] text-[#2f2f2f] text-[20px]">{post.title}</h1>
        <img alt="" className="aspect-[16/10] block object-cover rounded-[10px] w-full" src={post.image} />

        {headings.length > 0 && (
          <details className="bg-white group p-[18px] rounded-[10px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
            <summary className="cursor-pointer flex font-['Inter:Semi_Bold'] font-semibold items-center justify-between leading-[1.2] list-none text-[#2f2f2f] text-[16px]">
              Table of Contents
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

        <ArticleBody blocks={blocks} styles={articleStyles} />
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
