import ArrowButton from "@/components/ArrowButton";
import LatestBlogCards from "@/components/LatestBlogCards";
import { useContent } from "@/content/store";
import Heading from "./Heading";

// "Growth Insights": the three newest blog posts and the ALL ARTICLES button.
export default function GrowthSection({ button = true, className = "mt-[160px]" }: { button?: boolean; className?: string }) {
  const { settings } = useContent();
  return (
    <div className={`flex flex-col gap-[64px] items-center shrink-0 w-[1560px] ${className}`} data-name="Growth Insights">
      <Heading title={settings.titles.insights} />
      <LatestBlogCards />
      {button && <ArrowButton href="/blog" label={settings.labels.buttons.allArticles} />}
    </div>
  );
}
