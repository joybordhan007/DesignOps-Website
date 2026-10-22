import HeroVideo from "@/components/HeroVideo";
import ArrowButton from "@/components/ArrowButton";
import Rich from "@/components/Rich";
import type { Hero } from "@/content/types";

// Dark video hero shared by Home, Services, Work, Blog and Company. It slides
// up underneath the sticky nav, so the nav floats over the video like on desktop.
export default function MobileHero({ hero }: { hero: Hero }) {
  return (
    <section className="-mt-[72px] px-[8px] pt-[8px]" data-name="Hero">
      <div className="bg-[#2b2b2b] flex flex-col h-[40svh] max-h-[400px] min-h-[340px] overflow-hidden relative rounded-[8px]">
        <HeroVideo src={hero.video} />
        <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.85)] inset-0 to-[rgba(0,0,0,0.35)] via-[rgba(0,0,0,0.55)]" aria-hidden="true" />

        <div className="flex flex-1 flex-col gap-[16px] justify-end pb-[44px] pt-[84px] px-[20px] relative md:px-[48px]">
          <div className="flex flex-col gap-[8px] text-[#ededed]">
            <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.2] text-[20px] tracking-[0.5px]">
              <Rich text={hero.title} breaks={false} />
            </h1>
            <p className="font-['Montserrat:Regular'] leading-[1.5] text-[14px] text-[#dedede]">{hero.text.replace(/\s*\n\s*/g, " ")}</p>
          </div>
          <ArrowButton href="/contact" label="START A PROJECT" className="self-start" />
        </div>

        <div className="-translate-x-1/2 absolute bottom-[14px] flex gap-[8px] items-center left-1/2" aria-hidden="true">
          <p className="font-['Noto_Sans:Light'] font-light leading-[1.2] text-[10px] text-white tracking-[3px] uppercase whitespace-nowrap">Scroll Down</p>
          <img alt="" className="block h-[16px] scroll-cue-icon w-[8px]" src="/assets/shared/icons/scroll-down.svg" />
        </div>
      </div>
    </section>
  );
}
