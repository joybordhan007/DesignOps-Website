import ArrowButton from "@/components/ArrowButton";
import { formatDate, latestPosts, postUrl } from "@/content/helpers";
import { useContent } from "@/content/store";
import SectionTitle from "./SectionTitle";

// "Growth Insights" block: the newest posts as swipeable cards, then ALL ARTICLES.
export default function GrowthInsights({ showButton = true }: { showButton?: boolean }) {
  const { settings, posts } = useContent();
  return (
    <section className="flex flex-col gap-[28px] py-[48px]" data-name="Growth Insights">
      <div className="mx-auto px-[20px] w-full max-w-[760px]">
        <SectionTitle title={settings.titles.insights} />
      </div>

      <div className="flex gap-[16px] mx-auto overflow-x-auto pb-[8px] px-[20px] scroll-px-[20px] snap-mandatory snap-x w-full max-w-[760px] [scrollbar-width:none]">
        {latestPosts(3, posts).map((post) => (
          <a
            key={post.id}
            href={postUrl(post)}
            className="flex flex-col group h-[300px] isolate justify-between overflow-hidden p-[20px] relative rounded-[20px] shadow-[0px_2px_6px_rgba(0,0,0,0.1)] shrink-0 snap-start w-[82%] max-w-[340px]"
          >
            <span aria-hidden="true" className="-z-10 absolute inset-0">
              <img
                alt=""
                className="absolute object-cover size-full transition-transform duration-700 group-hover:scale-110"
                src={post.image}
                loading="lazy"
              />
              <span className="absolute bg-[rgba(0,0,0,0.42)] inset-0" />
            </span>
            <span className="flex gap-[8px]">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.5)] font-['Inter:Regular'] leading-[1.2] px-[8px] py-[4px] rounded-full text-[10px] text-white"
                >
                  {category}
                </span>
              ))}
            </span>
            <span className="flex flex-col gap-[8px]">
              <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.25] text-[16px] text-white">{post.title}</span>
              <span className="font-['Inter:Regular'] leading-[1.2] text-[#e8e8e8] text-[14px]">{formatDate(post.date)}</span>
            </span>
          </a>
        ))}
      </div>

      {showButton && <ArrowButton href="/blog" label="ALL ARTICLES" className="self-center" />}
    </section>
  );
}
