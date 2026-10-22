// Work details "Color Palette": the colour cards sit stacked with a 130px
// offset. Hovering (or keyboard-focusing) the section fans them out side by
// side around the centre, and the hidden HEX labels fade in once they are apart.

const CARD_WIDTH = 462;
const STACK_OFFSET = 130;
const GAP = 16;
const FRAME_WIDTH = 1560;
// How far each card moves per step away from the centre when fanned out.
const SPREAD = CARD_WIDTH + GAP - STACK_OFFSET;

const ease = "duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function ColorPalette({ colors }: { colors: string[] }) {
  const stackWidth = CARD_WIDTH + STACK_OFFSET * (colors.length - 1);
  const firstLeft = (FRAME_WIDTH - stackWidth) / 2;
  const middle = (colors.length - 1) / 2;

  return (
    <div
      tabIndex={0}
      aria-label={`Colour palette: ${colors.join(", ")}`}
      className="group h-[644px] outline-none relative shrink-0 w-[1560px]"
      data-name="Color"
    >
      {colors.map((hex, index) => {
        const isTop = index === colors.length - 1;
        return (
          <div
            key={`${hex}-${index}`}
            className={`absolute flex flex-col h-[636px] justify-between p-[24px] rounded-[16px] shadow-[0px_1px_5px_rgba(0,0,0,0.1)] text-white top-[4px] w-[462px] transition-transform ${ease} [transform:translateX(0)] group-hover:[transform:translateX(var(--spread))] group-focus-visible:[transform:translateX(var(--spread))]`}
            style={{ left: firstLeft + index * STACK_OFFSET, backgroundColor: hex, ["--spread" as string]: `${(index - middle) * SPREAD}px` }}
          >
            <p
              className={`flex gap-[8px] leading-[1.2] text-[32px] whitespace-nowrap transition-opacity ${ease} ${
                isTop ? "" : "opacity-0 group-hover:opacity-100 group-hover:delay-150 group-focus-visible:opacity-100 group-focus-visible:delay-150"
              }`}
            >
              <span className="font-['Inter:Medium'] font-medium">HEX</span>
              <span className="font-['Inter:Regular'] font-normal">{hex.toUpperCase()}</span>
            </p>
            <p className="font-['Inter:Medium'] font-medium leading-[1.2] self-end text-[80px]">Aa</p>
          </div>
        );
      })}
    </div>
  );
}
