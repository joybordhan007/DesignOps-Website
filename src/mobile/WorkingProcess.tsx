import { useState } from "react";
import { steps } from "@/components/WorkingProcessSteps";
import SectionTitle from "./SectionTitle";

// "Our Working Process" on small screens. Tapping a step turns it cyan and
// shows its tilted picture, like hovering on desktop. The first step starts open.
export default function WorkingProcess() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-[8px] py-[24px]" data-name="Working Process">
      <div className="bg-[#191919] rounded-[8px]">
        <div className="flex flex-col gap-[32px] mx-auto px-[20px] py-[48px] max-w-[760px]">
          <SectionTitle lead="Our Working Process That Drives" muted="Growth With Clear Direction" dark />
          <ol className="flex flex-col">
            {steps.map((step, index) => {
              const open = active === index;
              return (
                <li key={step.title} className={index < steps.length - 1 ? "border-[rgba(255,255,255,0.2)] border-b" : ""}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setActive(index)}
                    className="cursor-pointer flex gap-[16px] items-start py-[22px] text-left w-full"
                  >
                    <span className="bg-[#10cfe0] flex font-['Outfit:SemiBold'] font-semibold items-center justify-center leading-none rounded-full shrink-0 size-[40px] text-[16px] text-white">
                      {index + 1}.
                    </span>
                    <span className="flex flex-col gap-[8px] pt-[4px]">
                      <span className={`font-['Inter:Medium'] font-medium leading-[1.2] text-[16px] transition-colors duration-300 ${open ? "text-[#10cfe0]" : "text-white"}`}>
                        {step.title}
                      </span>
                      <span className="font-['Inter:Regular'] leading-[1.4] text-[14px] text-white">
                        We take pride in our collaborative approach, working closely with clients to understand their challenges, goals.
                      </span>
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="flex justify-center pb-[28px] pt-[8px]">
                        <div
                          className={`aspect-[4/5] overflow-hidden rounded-[14px] shadow-[0px_18px_40px_rgba(0,0,0,0.45)] transition-[transform,opacity] duration-500 w-[62%] max-w-[300px] ${
                            open ? "opacity-100 rotate-[-6deg] scale-100" : "opacity-0 rotate-0 scale-75"
                          }`}
                        >
                          <img alt="" className="block object-cover size-full" src={step.image} loading="lazy" />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
