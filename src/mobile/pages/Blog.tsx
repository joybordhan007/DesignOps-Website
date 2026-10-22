import BlogGrid from "@/components/BlogGrid";
import { useContent } from "@/content/store";
import MobileHero from "../MobileHero";
import MobileFooter from "../MobileFooter";

export default function Blog() {
  const { settings } = useContent();
  return (
    <>
      <MobileHero hero={settings.heroes.blog} />
      <section className="mx-auto px-[20px] py-[48px] w-full max-w-[760px]" data-name="Blog Posts">
        <BlogGrid />
      </section>
      <MobileFooter />
    </>
  );
}
