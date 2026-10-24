import { useMemo } from "react";
import ArticleSections, { useArticle } from "@/components/ArticleSections";
import Footer from "@/components/Footer";
import { currentPost } from "@/content/route";
import { useContent } from "@/content/store";
import useActiveHeading from "@/lib/useActiveHeading";
import GrowthSection from "./sections/GrowthSection";
import Page from "./sections/Page";
import TalkButton from "./sections/TalkButton";

const articleStyles = {
  gap: "gap-[48px]",
  section: "flex flex-col gap-[20px] scroll-mt-[120px]",
  h2: "font-['Aileron:SemiBold'] font-semibold leading-[1.2] text-[#222] text-[28px]",
  subheading: "font-['Inter:Medium'] font-medium leading-[1.4] -mt-[8px] text-[#3e3e3e] text-[20px]",
  body: "flex flex-col font-['Inter:Regular'] gap-[16px] leading-[1.6] text-[#595959] text-[18px] [&_a]:text-[#00a0b2] [&_a]:underline [&_b]:font-semibold [&_b]:text-[#222] [&_blockquote]:border-[#00b6ca] [&_blockquote]:border-l-4 [&_blockquote]:italic [&_blockquote]:pl-[16px] [&_h3]:font-['Aileron:SemiBold'] [&_h3]:font-semibold [&_h3]:mt-[8px] [&_h3]:text-[#272727] [&_h3]:text-[20px] [&_h4]:font-semibold [&_h4]:text-[#272727] [&_img]:block [&_img]:my-[8px] [&_img]:rounded-[8px] [&_img]:w-full [&_li]:mb-[6px] [&_ol]:list-decimal [&_ol]:pl-[24px] [&_strong]:font-semibold [&_strong]:text-[#222] [&_ul]:list-disc [&_ul]:pl-[24px]",
  image: "block max-h-[480px] object-cover rounded-[8px] w-full",
};

// Blog post page (/blog/:slug).
export default function BlogDetails() {
  const labels = useContent().settings.labels.blogDetails;
  const post = currentPost();
  const { items, toc: headings } = useArticle(post.sections);
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const active = useActiveHeading(ids);

  return (
    <Page name="Blog Details">
      <div className="flex gap-[24px] items-start mt-[172px] shrink-0 w-[1560px]">
        <aside className="flex flex-col gap-[16px] items-end shrink-0 sticky top-[104px] w-[348px]">
          <div className="bg-[#00b6ca] flex flex-col gap-[26px] items-start px-[20px] py-[28px] rounded-[8px] text-white w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[24px] w-full">{labels.newsletterTitle}</p>
            <p className="font-['Aileron:Regular'] leading-[1.5] text-[16px] w-full">
              {labels.newsletterText} <span className="underline">{labels.newsletterLink}</span>
            </p>
          </div>
          <div className="bg-black flex flex-col gap-[26px] items-start overflow-clip px-[20px] py-[28px] relative rounded-[8px] w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[24px] text-white w-full">{labels.ctaTitle}</p>
            <TalkButton />
            <img alt="" className="absolute h-[184px] left-[254px] max-w-none top-[108px] w-[175.5px]" src="/assets/blog-details/2494e.svg" />
          </div>
        </aside>

        <article className="flex flex-col gap-[61px] items-start shrink-0 w-[816px]">
          <div className="flex flex-col gap-[49px] items-start w-full">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#222] text-[48px] w-full">{post.title}</h1>
            </div>
            <div className="h-[432px] overflow-hidden relative rounded-[8px] shrink-0 w-full">
              <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={post.image} />
            </div>
          </div>
          <ArticleSections items={items} styles={articleStyles} />
        </article>

        {headings.length > 0 && (
          <nav aria-label="Table of contents" className="bg-white flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px p-[20px] rounded-[8px] sticky top-[104px]">
            <p className="font-['Inter:Bold'] font-bold leading-[1.2] text-[#222] text-[24px] w-full">{labels.toc}</p>
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
