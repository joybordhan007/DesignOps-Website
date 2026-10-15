import { useEffect, useRef, useState } from "react";

// A number that rolls up from 0 to `value` like a slot-machine reel the first
// time it scrolls into view. Used by the Company page achievement stats.

type RollingNumberProps = {
  value: number;
  suffix?: string;
  /** How many intermediate numbers the reel shows on its way up. */
  steps?: number;
  /** Font size in px (48 on desktop). */
  size?: number;
};

export default function RollingNumber({ value, suffix = "", steps = 12, size = 48 }: RollingNumberProps) {
  const line = size * 1.2;
  const ref = useRef<HTMLDivElement>(null);
  const [rolled, setRolled] = useState(false);

  // Reel from the target down to 0, so it starts on "0" (bottom) and slides up to the target.
  const count = Math.min(steps, value);
  const reel = Array.from({ length: count + 1 }, (_, i) => Math.round((value * (count - i)) / count));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRolled(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setRolled(true);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-clip relative shrink-0" style={{ height: line, width: size * 3.4 }} aria-label={`${value}${suffix}`}>
      <div
        aria-hidden="true"
        className="absolute flex flex-col font-['Inter:Semi_Bold'] font-semibold inset-x-0 not-italic text-[#2f2f2f] text-center top-0 transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ fontSize: size, transform: `translateY(${rolled ? 0 : -(reel.length - 1) * line}px)` }}
      >
        {reel.map((n, i) => (
          <p key={i} className="leading-[1.2] whitespace-nowrap">
            {n}
            {suffix}
          </p>
        ))}
      </div>
    </div>
  );
}
