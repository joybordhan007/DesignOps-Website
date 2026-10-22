import { useContent } from "@/content/store";
import useInView from "@/lib/useInView";

// Mobile version of the Home "Science · Technology · Design" scene: when the
// card scrolls into view the two circles draw in, the words fade up, and the
// three focus areas appear underneath. The words come from Website Settings → Labels.

const R = 100;
const CIRCUMFERENCE = 2 * Math.PI * R;
const flat = (text: string) => text.replace(/\s*\n\s*/g, " ");

export default function ScienceTechDesignCard() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const words = useContent().settings.labels.science;
  const areas = [words.research, words.digital, words.customer].map(flat);
  const ease = "transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <section className="px-[8px] py-[24px]" data-name="Science Technology Design">
      <div ref={ref} className="bg-[#171717] flex flex-col gap-[32px] items-center overflow-hidden px-[20px] py-[48px] rounded-[8px]">
        <div className="relative w-full max-w-[420px]">
          <svg viewBox="0 0 360 240" className="block overflow-visible w-full" fill="none" aria-hidden="true">
            {[128, 232].map((cx, i) => (
              <circle
                key={cx}
                cx={cx}
                cy={120}
                r={R}
                stroke="white"
                strokeWidth={1.2}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={inView ? 0 : CIRCUMFERENCE}
                className={ease}
                style={{ transitionDelay: `${i * 250}ms`, transformOrigin: `${cx}px 120px`, transform: "rotate(-90deg)" }}
              />
            ))}
          </svg>
          {[
            { word: words.science, left: "21.5%", delay: 500 },
            { word: words.technology, left: "50%", delay: 900, accent: true },
            { word: words.design, left: "78.5%", delay: 700 },
          ].map(({ word, left, delay, accent }) => (
            <p
              key={left}
              className={`-translate-x-1/2 absolute font-['Inter:Regular'] leading-[1.2] text-[14px] top-1/2 tracking-[-0.3px] ${ease} ${
                inView ? "-translate-y-1/2 opacity-100" : "opacity-0 translate-y-[0%]"
              } ${accent ? "text-[#00b6ca]" : "text-white"}`}
              style={{ left, transitionDelay: `${delay}ms` }}
            >
              {word}
            </p>
          ))}
        </div>

        <ul className="flex flex-col gap-[14px] w-full max-w-[420px]">
          {areas.map((area, i) => (
            <li
              key={i}
              className={`border-[rgba(255,255,255,0.15)] border-t flex font-['Inter:Regular'] gap-[12px] items-start leading-[1.3] pt-[14px] text-[16px] text-white ${ease} ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[12px]"
              }`}
              style={{ transitionDelay: `${1200 + i * 200}ms` }}
            >
              <span className="bg-[#00b6ca] h-[2px] mt-[11px] shrink-0 w-[20px]" aria-hidden="true" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
