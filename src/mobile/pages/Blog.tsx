import BlogGrid from "@/components/BlogGrid";
import MobileHero, { Accent } from "../MobileHero";
import MobileFooter from "../MobileFooter";

export default function Blog() {
  return (
    <>
      <MobileHero
        video="pages.mp4"
        title={
          <>
            Our Blog on <Accent>Design, Strategy</Accent> &amp; Growth
          </>
        }
        text="Exploring design, engineering, and the process of building digital products that last and grow with modern businesses."
      />
      <section className="mx-auto px-[20px] py-[48px] w-full max-w-[760px]" data-name="Blog Posts">
        <BlogGrid />
      </section>
      <MobileFooter />
    </>
  );
}
