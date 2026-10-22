import WorkingProcessSteps, { ROW_PITCH } from "@/components/WorkingProcessSteps";
import type { ProcessStep, SectionTitle } from "@/content/types";
import Heading from "./Heading";

// Dark "Our Working Process" block. The Home page shows its own steps and each
// service details page shows that service's steps. It grows with the number of
// steps; four steps match the Figma 1080px block.
export default function ProcessSection({ title, steps }: { title: SectionTitle; steps: ProcessStep[] }) {
  if (!steps.length) return null;
  const inner = 160 + steps.length * ROW_PITCH - 18;
  return (
    <div className="bg-[#191919] mt-[160px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" style={{ height: inner + 226 }} data-name="Working Process">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 w-[1560px]" style={{ height: inner }}>
        <div className="-translate-y-1/2 absolute left-0 top-[48px] w-[1560px]">
          <Heading title={title} dark />
        </div>
        <WorkingProcessSteps steps={steps} />
      </div>
    </div>
  );
}
