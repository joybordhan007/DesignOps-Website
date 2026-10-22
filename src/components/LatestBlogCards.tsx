import { formatDate, latestPosts, postUrl } from "@/content/helpers";
import { useContent } from "@/content/store";

// "Growth Insights" row: the three newest posts switched on for it (admin "Show on the
// Home page") as image cards. Each card
// links to the post, and its image zooms in slightly on hover.
export default function LatestBlogCards() {
  const { posts } = useContent();
  return (
    <div className="flex gap-[24px] items-center relative shrink-0" data-name="Latest Blog Posts">
      {latestPosts(3, posts.filter((post) => post.showOnHome)).map((post) => (
        <a
          key={post.id}
          href={postUrl(post)}
          className="group flex flex-col h-[350px] isolate items-start overflow-clip p-[24px] relative rounded-[24px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[504px]"
        >
          <div aria-hidden="true" className="-z-10 absolute inset-0 overflow-clip pointer-events-none rounded-[24px]">
            <img
              alt=""
              className="absolute max-w-none object-cover size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              src={post.image}
              loading="lazy"
            />
            <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
          </div>
          <div className="flex flex-[1_0_0] flex-col items-start justify-between min-h-px w-full">
            <div className="flex gap-[8px] items-center">
              {post.categories.map((category) => (
                <p
                  key={category}
                  className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.5)] border-solid font-['Aileron:Regular'] leading-[1.2] px-[8px] py-[4px] rounded-[999px] text-[12px] text-white whitespace-nowrap"
                >
                  {category}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-[8px] items-start not-italic w-full">
              <p className="font-['Aileron:Bold'] leading-[1.2] text-[20px] text-white">{post.title}</p>
              <p className="font-['Aileron:Regular'] leading-[1.2] text-[#e8e8e8] text-[16px]">{formatDate(post.date)}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
