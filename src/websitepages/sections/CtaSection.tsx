import Rich from "@/components/Rich";
import { useContent } from "@/content/store";
import TalkButton from "./TalkButton";

// "Ready to Build Something Great and Scalable?" call to action.
export default function CtaSection() {
  const { cta } = useContent().settings;
  return (
    <div className="bg-[#191919] flex flex-col gap-[32px] items-center mt-[160px] py-[78px] rounded-[8px] shrink-0 w-[1560px]" data-name="Call To Action">
      <div className="flex flex-col gap-[24px] items-center text-center w-full">
        <h2 className="font-['Inter:Bold'] font-bold leading-[1.2] text-[40px] text-white">
          <Rich text={cta.title} />
        </h2>
        <p className="font-['Aileron:Regular'] leading-[1.5] text-[#e8e8e8] text-[20px] w-[1189px]">{cta.text}</p>
      </div>
      <TalkButton />
    </div>
  );
}
