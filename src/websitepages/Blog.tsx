import BlogGrid from "@/components/BlogGrid";
import Footer from "@/components/Footer";
import { useContent } from "@/content/store";
import Hero from "./sections/Hero";
import Page from "./sections/Page";

export default function Blog() {
  const { settings } = useContent();
  return (
    <Page name="Blog">
      <Hero hero={settings.heroes.blog} />
      <BlogGrid className="mt-[160px] shrink-0" />
      <Footer className="bg-[#191919] h-[764px] mt-[64px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
