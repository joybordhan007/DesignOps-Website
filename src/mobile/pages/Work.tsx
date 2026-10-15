import MobileHero, { Accent } from "../MobileHero";
import ProjectCards, { workProjects } from "../ProjectCards";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

export default function Work() {
  return (
    <>
      <MobileHero
        video="pages.mp4"
        title={
          <>
            Showcasing Our <Accent>Digital Product</Accent> Design Work
          </>
        }
        text="A collection of projects that define our approach to digital product design. We solve complex problems with elegant solutions."
      />
      <ProjectCards images={workProjects} />
      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
