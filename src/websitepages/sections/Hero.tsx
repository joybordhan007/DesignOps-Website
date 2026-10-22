import HeroVideo from "@/components/HeroVideo";
import Rich from "@/components/Rich";
import type { Hero as HeroContent } from "@/content/types";
import { Lines } from "./Heading";
import StartButton from "./StartButton";

// Desktop video hero (Home, Services, Work, Blog, Company).
export default function Hero({ hero }: { hero: HeroContent }) {
  return (
    <div className="bg-[#2b2b2b] h-[870px] mt-[24px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" data-name="Hero">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[980px] left-1/2 top-1/2 w-[1920px]">
        <HeroVideo src={hero.video} />
      </div>
      <div className="absolute bg-gradient-to-r from-[16.438%] from-[rgba(0,0,0,0.74)] h-[980px] left-0 to-[rgba(0,0,0,0.2)] top-0 w-[1920px]" />

      <div className="absolute flex flex-col gap-[56px] items-start justify-center left-[156px] top-[306px]">
        <div className="flex flex-col gap-[16px] items-start text-[#ededed] whitespace-nowrap">
          <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.24] text-[64px] tracking-[1.28px]">
            <Rich text={hero.title} />
          </h1>
          <p className="font-['Montserrat:Regular'] font-normal leading-[1.2] text-[28px]">
            <Lines text={hero.text} />
          </p>
        </div>
        <StartButton />
      </div>

      <div className="-translate-x-1/2 absolute flex gap-[16px] items-center left-1/2 top-[830px]">
        <p className="font-['Noto_Sans:Light'] font-light leading-[1.2] text-[16px] text-white tracking-[3.52px] uppercase whitespace-nowrap">Scroll Down</p>
        <img alt="" className="block h-[24px] scroll-cue-icon w-[12px]" src="/assets/shared/icons/scroll-down.svg" />
      </div>
    </div>
  );
}
