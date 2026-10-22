import WorkingProcessSteps, { ROW_PITCH } from "@/components/WorkingProcessSteps";
import { useContent } from "@/content/store";
import Heading from "./Heading";

// Dark "Our Working Process" block (Home and service details). It grows with
// the number of steps; four steps match the Figma 1080px block.
export default function ProcessSection() {
  const { settings, process } = useContent();
  const inner = 160 + Math.max(process.length, 1) * ROW_PITCH - 18;
  return (
    <div className="bg-[#191919] mt-[160px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" style={{ height: inner + 226 }} data-name="Working Process">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 w-[1560px]" style={{ height: inner }}>
        <div className="-translate-y-1/2 absolute left-0 top-[48px] w-[1560px]">
          <Heading title={settings.titles.process} dark />
        </div>
        <WorkingProcessSteps steps={process} />
      </div>
    </div>
  );
}
