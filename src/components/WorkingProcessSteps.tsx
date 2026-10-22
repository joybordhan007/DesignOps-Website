import { useState } from "react";
import type { ProcessStep } from "@/content/types";

// "Our Working Process" list. Hovering (or focusing) a step turns its title
// cyan and grows that step's tilted picture out of the centre of the picture
// area, as in the Figma prototype; leaving the list shrinks it away again.

export const ROW_PITCH = 178;

export default function WorkingProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="absolute left-0 top-[160px] w-[1560px]" style={{ height: steps.length * ROW_PITCH }} data-name="Steps" onMouseLeave={() => setActive(null)}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            tabIndex={0}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            className={`absolute flex gap-[32px] h-[160px] items-center left-0 outline-none px-[8px] py-[32px] w-[1560px] ${
              index < steps.length - 1 ? "border-[rgba(255,255,255,0.2)] border-b-[1.5px] border-solid" : ""
            }`}
            style={{ top: index * ROW_PITCH }}
          >
            <div className="bg-[#10cfe0] flex items-center justify-center px-[10px] py-[22px] rounded-[999px] shrink-0 w-[86px]">
              <p className="font-['Outfit:SemiBold'] font-semibold leading-[1.3] text-[32px] text-white whitespace-nowrap">{index + 1}.</p>
            </div>
            <div className="flex flex-col gap-[16px] items-start not-italic w-[516px]">
              <p
                className={`font-['Inter:Medium'] font-medium leading-[1.2] text-[28px] transition-colors duration-300 ${
                  active === index ? "text-[#10cfe0]" : "text-white"
                }`}
              >
                {step.title}
              </p>
              <div className="font-['Inter:Regular'] font-normal text-[18px] text-white">
                {step.text.split("\n").map((line, i) => (
                  <p key={i} className="leading-[1.3]">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute h-[759px] left-[844px] pointer-events-none top-[96px] w-[649px]" data-name="Picture" aria-hidden="true">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="absolute h-[600px] left-1/2 overflow-clip rounded-[16px] shadow-[0px_24px_60px_rgba(0,0,0,0.45)] top-1/2 w-[480px] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: active === index ? 1 : 0,
              transform: `translate(-50%, -50%) rotate(-11.36deg) scale(${active === index ? 1 : 0.08})`,
              zIndex: active === index ? 1 : 0,
            }}
          >
            <img alt="" className="block object-cover size-full" src={step.image} loading="lazy" />
          </div>
        ))}
      </div>
    </>
  );
}
