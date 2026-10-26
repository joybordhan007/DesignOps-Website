import ArticleSections, { useArticle } from "@/components/ArticleSections";
import { currentPost } from "@/content/route";
import { useContent } from "@/content/store";
import TalkButton from "../TalkButton";
import GrowthInsights from "../GrowthInsights";
import MobileFooter from "../MobileFooter";

const articleStyles = {
  gap: "gap-[32px]",
  section: "flex flex-col gap-[14px] scroll-mt-[90px]",
  h2: "font-['Inter:Semi_Bold'] font-semibold leading-[1.3] text-[#2f2f2f] text-[18px]",
  subheading: "font-['Inter:Medium'] font-medium leading-[1.4] -mt-[4px] text-[#4e4e4e] text-[15px]",
  body: "flex flex-col font-['Inter:Regular'] gap-[12px] leading-[1.7] text-[#3e3e3e] text-[14px] [&_a]:text-[#00a0b2] [&_a]:underline [&_b]:font-semibold [&_b]:text-[#2f2f2f] [&_blockquote]:border-[#00b6ca] [&_blockquote]:border-l-4 [&_blockquote]:italic [&_blockquote]:pl-[12px] [&_h3]:font-['Inter:Semi_Bold'] [&_h3]:font-semibold [&_h3]:mt-[4px] [&_h3]:text-[#2f2f2f] [&_h3]:text-[15px] [&_h4]:font-semibold [&_h4]:text-[#2f2f2f] [&_img]:block [&_img]:rounded-[10px] [&_img]:w-full [&_li]:mb-[4px] [&_ol]:list-decimal [&_ol]:pl-[20px] [&_strong]:font-semibold [&_strong]:text-[#2f2f2f] [&_ul]:list-disc [&_ul]:pl-[20px]",
  image: "aspect-[16/10] block object-cover rounded-[10px] w-full",
};

// Blog post page (/blog/:slug) on small screens.
export default function BlogDetails() {
  const labels = useContent().settings.labels.blogDetails;
  const post = currentPost();
  const { items, toc: headings } = useArticle(post.sections);

  return (
    <>
      <article className="flex flex-col gap-[20px] mx-auto px-[20px] pb-[32px] pt-[36px] w-full max-w-[760px]">
        <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.25] text-[#2f2f2f] text-[20px]">{post.title}</h1>
        <img alt={post.title} className="aspect-[16/10] block object-cover rounded-[10px] w-full" src={post.image} />

        {headings.length > 0 && (
          <details className="bg-white group p-[18px] rounded-[10px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
            <summary className="cursor-pointer flex font-['Inter:Semi_Bold'] font-semibold items-center justify-between leading-[1.2] list-none text-[#2f2f2f] text-[16px]">
              {labels.toc}
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

        <ArticleSections items={items} styles={articleStyles} />
      </article>

      <aside className="gap-[16px] grid mx-auto px-[20px] pb-[16px] w-full max-w-[760px] md:grid-cols-2">
        <div className="bg-[#00b6ca] flex flex-col gap-[16px] p-[24px] rounded-[8px] text-white">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px]">{labels.newsletterTitle}</p>
          <p className="font-['Inter:Regular'] leading-[1.5] text-[14px]">
            {labels.newsletterText} <span className="underline">{labels.newsletterLink}</span>
          </p>
        </div>
        <div className="bg-black flex flex-col gap-[20px] items-start p-[24px] rounded-[8px]">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px] text-white">{labels.ctaTitle}</p>
          <TalkButton />
        </div>
      </aside>

      <GrowthInsights showButton={false} />
      <MobileFooter />
    </>
  );
}
