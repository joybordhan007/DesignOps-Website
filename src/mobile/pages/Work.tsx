import { useContent } from "@/content/store";
import MobileHero from "../MobileHero";
import ProjectCards from "../ProjectCards";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

export default function Work() {
  const { settings, projects } = useContent();
  return (
    <>
      <MobileHero hero={settings.heroes.work} />
      <ProjectCards projects={projects} />
      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
