import { postUrl, sortedPosts } from "@/content/helpers";
import { useContent } from "@/content/store";

// Blog page list: every post, newest first, three per row. The image zooms in
// slightly on hover and the whole card links to the post.

export default function BlogGrid({ className }: { className?: string }) {
  const { posts, settings } = useContent();
  return (
    <div className={`grid grid-cols-3 gap-x-[24px] gap-y-[32px] w-[1560px] max-lg:grid-cols-1 max-lg:gap-y-[20px] max-lg:w-full md:max-lg:grid-cols-2 ${className ?? ""}`} data-name="Blog Posts">
      {sortedPosts(posts).map((post) => (
        <a key={post.id} href={postUrl(post)} className="bg-white flex flex-col gap-[24px] group items-center overflow-hidden rounded-[8px] w-[504px] max-lg:gap-[18px] max-lg:w-full">
          <div className="h-[300px] overflow-clip relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full max-lg:h-auto max-lg:aspect-[16/10]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              src={post.image}
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-[16px] items-start pb-[24px] px-[24px] w-full max-lg:pb-[20px] max-lg:px-[20px]">
            <div className="flex flex-col gap-[16px] items-start w-full">
              <div className="flex gap-[8px] items-start">
                {post.categories.map((category) => (
                  <p
                    key={category}
                    className="bg-[rgba(214,140,19,0.1)] border border-[rgba(214,140,19,0.2)] border-solid font-['Inter:Medium'] font-medium leading-[1.2] px-[6px] py-[4px] rounded-[9999px] text-[#d68c13] text-[12px] whitespace-nowrap max-lg:text-[10px]"
                  >
                    {category}
                  </p>
                ))}
              </div>
              <div className="flex flex-col gap-[8px] items-start not-italic w-full">
                <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px] max-lg:text-[16px]">{post.title}</p>
                <p className="font-['Inter:Regular'] font-normal h-[47px] leading-[1.3] line-clamp-2 overflow-hidden text-[#4e4e4e] text-[18px] max-lg:h-auto max-lg:text-[14px]">{post.excerpt}</p>
              </div>
            </div>
            <div className="flex gap-[8px] items-center">
              <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#d68c13] text-[16px] group-hover:underline max-lg:text-[14px] underline-offset-4">{settings.labels.buttons.readNow}</p>
              <img alt="" className="block size-[20px] transition-transform duration-300 group-hover:translate-x-[4px]" src="/assets/blog-posts/arrow-forward.svg" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
