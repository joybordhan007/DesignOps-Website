import { useState } from "react";

// "Our Working Process" list. Hovering (or focusing) a step turns its title
// cyan and grows that step's tilted picture out of the centre of the picture
// area, as in the Figma prototype; leaving the list shrinks it away again.

const steps = [
  { title: "Discovery", image: "/assets/working-process/discovery.jpg" },
  { title: "Creative idea", image: "/assets/working-process/creative-idea.jpg" },
  { title: "Best features", image: "/assets/working-process/best-features.jpg" },
  { title: "Easy solutions", image: "/assets/working-process/easy-solutions.jpg" },
];

const ROW_PITCH = 178;

export default function WorkingProcessSteps() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="absolute h-[694px] left-0 top-[160px] w-[1560px]" data-name="Steps" onMouseLeave={() => setActive(null)}>
        {steps.map((step, index) => (
          <div
            key={step.title}
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
                <p className="leading-[1.3]">We take pride in our collaborative approach, working closely</p>
                <p className="leading-[1.3]">with clients to understand their challenges, goals.</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute h-[759px] left-[844px] pointer-events-none top-[96px] w-[649px]" data-name="Picture" aria-hidden="true">
        {steps.map((step, index) => (
          <div
            key={step.title}
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
