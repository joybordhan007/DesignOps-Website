import { useEffect, useRef } from "react";
import { useContent } from "@/content/store";
import type { Labels } from "@/content/types";

// Scroll-scrubbed "Science · Technology · Design" scene for the Home page.
// Recreates the pinned image-sequence section from plabs.id in code: while the
// stage scrolls, the scene stays pinned and plays through these steps:
//   1. "Science" and "Design" scramble in near the centre
//   2. they drift apart while two arcs draw into a circle
//   3. the circle splits into two overlapping circles and "Technology" scrambles in
//   4. the connector lines draw, then the three annotations scramble in
// A pixel grid dissolves the card in as it enters the viewport.
// The words come from Website Settings → Labels; a line break splits a label in two lines.

const SCENE_WIDTH = 1872;
const SCENE_HEIGHT = 1080;
const FRAME = { width: 1560, height: 900 };
const RADIUS = 291.75;
const CENTER = { x: 781, y: 449.5 };
const SPLIT = 146.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GRID = { cols: 12, rows: 7 };
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/";

const imgScrollDown = "/assets/shared/icons/scroll-down.svg";

type Line = { text: string; start: number; end: number };

type Spot = {
  key: keyof Labels["science"];
  // When each line scrambles in (a later line reuses the last timing).
  timings: [number, number][];
  className: string;
  // Horizontal drift (px) applied before the label settles, and when it settles.
  drift?: { from: number; start: number; end: number };
};

const spots: Spot[] = [
  {
    key: "science",
    timings: [[0.02, 0.12]],
    className: "left-[357px] top-[437.5px] text-[44px] tracking-[-1.76px]",
    drift: { from: 130, start: 0.14, end: 0.42 },
  },
  {
    key: "design",
    timings: [[0.04, 0.14]],
    className: "left-[1069px] top-[437.5px] text-[44px] tracking-[-1.76px]",
    drift: { from: -130, start: 0.14, end: 0.42 },
  },
  {
    key: "technology",
    timings: [[0.4, 0.52]],
    className: "left-[667px] top-[437.5px] text-[44px] tracking-[-1.76px]",
  },
  {
    key: "research",
    timings: [
      [0.56, 0.68],
      [0.6, 0.72],
    ],
    className: "left-[79px] top-[664px] text-[24px] tracking-[-0.96px]",
  },
  {
    key: "digital",
    timings: [[0.62, 0.76]],
    className: "left-[886px] top-[113.5px] text-[24px] tracking-[-0.96px]",
  },
  {
    key: "customer",
    timings: [
      [0.68, 0.8],
      [0.72, 0.84],
    ],
    className: "-translate-x-1/2 left-[1376px] text-center top-[308px] text-[24px] tracking-[-0.96px]",
  },
];

function linesOf(text: string, timings: Spot["timings"]): Line[] {
  const parts = text.split("\n");
  return parts.map((part, i) => {
    const [start, end] = timings[Math.min(i, timings.length - 1)];
    return { text: i < parts.length - 1 ? `${part} ` : part, start, end };
  });
}

// Connector paths in frame coordinates, drawn from the circle outwards.
const connectors = [
  { d: "M384.5 628.2 L361 651.7 H324", start: 0.52, end: 0.6 },
  { d: "M803.2 137 L825.2 112.5 H876.7", start: 0.56, end: 0.64 },
  { d: "M1205.7 306 L1217.7 294.5 H1253.7", start: 0.62, end: 0.7 },
];

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function scramble(text: string, t: number) {
  if (t <= 0) return { shown: "", hidden: text };
  if (t >= 1) return { shown: text, hidden: "" };
  const revealed = Math.floor(text.length * t);
  const noisy = Math.min(text.length, revealed + 4);
  let shown = text.slice(0, revealed);
  for (let i = revealed; i < noisy; i += 1) {
    shown += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  }
  return { shown, hidden: text.slice(noisy) };
}

// Row by row from the top (the edge that scrolls into view first), shuffled
// within each row like plabs.id, seeded so the pattern is stable between renders.
function pixelOrder() {
  let seed = 7;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const order: number[] = [];
  for (let row = 0; row < GRID.rows; row += 1) {
    const cells = Array.from({ length: GRID.cols }, (_, col) => row * GRID.cols + col);
    for (let i = cells.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    order.push(...cells);
  }
  const rank = new Array<number>(order.length);
  order.forEach((cell, index) => (rank[cell] = index));
  return rank;
}

const pixelRank = pixelOrder();
const PIXEL_STAGGER = 0.2;
const PIXEL_TOTAL = (pixelRank.length - 1) * PIXEL_STAGGER + 1;

export default function ScienceTechDesign() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { science: words, scrollDown } = useContent().settings.labels;
  const labels = spots.map((spot) => ({ ...spot, lines: linesOf(words[spot.key], spot.timings) }));
  // The scroll effect below reads the rendered lines, so it restarts when a word changes.
  const wordsKey = JSON.stringify(words);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = scene?.parentElement;
    if (!scene || !stage) return;

    const q = <T extends Element>(selector: string) => [...scene.querySelectorAll<T>(selector)];
    const circles = q<SVGCircleElement>("[data-circle]");
    const paths = q<SVGPathElement>("[data-connector]");
    const labelEls = q<HTMLElement>("[data-label]");
    const lineEls = q<HTMLElement>("[data-line]");
    const pixels = q<HTMLElement>("[data-pixel]");
    const cue = scene.querySelector<HTMLElement>("[data-scroll-cue]");
    const lengths = paths.map((path) => path.getTotalLength());
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const render = () => {
      const stageRect = stage.getBoundingClientRect();
      const scale = stageRect.width / SCENE_WIDTH || 1;
      const travel = stage.offsetHeight - SCENE_HEIGHT;
      const still = reducedMotion.matches;
      const offset = still ? 0 : clamp(-stageRect.top / scale, 0, travel);
      const progress = still ? 1 : offset / travel;

      scene.style.top = `${offset}px`;

      // 1–2: two arcs grow into a circle while rotating, then split apart.
      const draw = easeInOut(range(progress, 0.12, 0.34));
      const split = easeInOut(range(progress, 0.32, 0.48));
      const spin = (1 - draw) * 140;
      circles.forEach((circle, index) => {
        const side = index === 0 ? -1 : 1;
        const startAngle = index === 0 ? -90 : 90;
        circle.style.strokeDasharray = `${CIRCUMFERENCE * Math.max(draw, 0.0001)} ${CIRCUMFERENCE}`;
        circle.style.opacity = progress > 0.1 ? "1" : "0";
        circle.style.transform = `translateX(${side * SPLIT * split}px) rotate(${startAngle + side * spin}deg)`;
      });

      // 4: connector lines.
      paths.forEach((path, index) => {
        const { start, end } = connectors[index];
        const t = easeInOut(range(progress, start, end));
        path.style.strokeDasharray = `${lengths[index]}`;
        path.style.strokeDashoffset = `${lengths[index] * (1 - t)}`;
        path.style.opacity = t > 0 ? "1" : "0";
      });

      // Text scramble for every line, plus the Science/Design drift.
      lineEls.forEach((el) => {
        const t = range(progress, Number(el.dataset.start), Number(el.dataset.end));
        const { shown, hidden } = scramble(el.dataset.text || "", t);
        const [shownEl, hiddenEl] = el.children as HTMLCollectionOf<HTMLElement>;
        if (shownEl.textContent !== shown) shownEl.textContent = shown;
        if (hiddenEl.textContent !== hidden) hiddenEl.textContent = hidden;
      });
      labelEls.forEach((el) => {
        const from = Number(el.dataset.driftFrom || 0);
        if (!from) return;
        const t = easeInOut(range(progress, Number(el.dataset.driftStart), Number(el.dataset.driftEnd)));
        el.style.translate = `${from * (1 - t)}px -50%`;
      });

      if (cue) cue.style.opacity = `${1 - range(progress, 0.02, 0.1)}`;

      // Pixel dissolve: cells fade away (top row first) as the card enters the viewport.
      const viewport = window.innerHeight;
      const enter = still ? 1 : clamp((viewport - scene.getBoundingClientRect().top) / viewport);
      pixels.forEach((pixel, index) => {
        const covered = 1 - clamp(enter * PIXEL_TOTAL - pixelRank[index] * PIXEL_STAGGER);
        pixel.style.opacity = `${covered}`;
        pixel.style.visibility = covered > 0 ? "visible" : "hidden";
      });
    };

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, [wordsKey]);

  return (
    <div
      ref={sceneRef}
      className="-translate-x-1/2 absolute bg-[#171717] h-[1080px] left-1/2 overflow-clip rounded-[8px] top-0 w-[1872px]"
      data-node-id="1:1035"
      data-name="Science Technology Design"
    >
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[900px] left-1/2 top-1/2 w-[1560px]" data-node-id="1:1036">
        <svg
          className="absolute inset-0 overflow-visible"
          width={FRAME.width}
          height={FRAME.height}
          viewBox={`0 0 ${FRAME.width} ${FRAME.height}`}
          fill="none"
          aria-hidden="true"
        >
          {[0, 1].map((index) => (
            <circle
              key={index}
              data-circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={RADIUS}
              stroke="white"
              strokeWidth={1.5}
              style={{ transformBox: "view-box", transformOrigin: `${CENTER.x}px ${CENTER.y}px`, opacity: 0 }}
            />
          ))}
          {connectors.map((connector) => (
            <path key={connector.d} data-connector d={connector.d} stroke="#00B6CA" strokeWidth={2} style={{ opacity: 0 }} />
          ))}
        </svg>

        {labels.map((label) => (
          <div
            key={label.key}
            data-label
            data-drift-from={label.drift?.from}
            data-drift-start={label.drift?.start}
            data-drift-end={label.drift?.end}
            className={`-translate-y-1/2 absolute font-['Inter:Regular'] font-normal leading-[1.2] not-italic text-white whitespace-pre ${label.className}`}
            aria-label={label.lines.map((line) => line.text).join("")}
          >
            {label.lines.map((line, i) => (
              <p key={i} data-line data-text={line.text} data-start={line.start} data-end={line.end} aria-hidden="true">
                <span />
                <span className="opacity-0">{line.text}</span>
              </p>
            ))}
          </div>
        ))}
      </div>

      <div data-scroll-cue className="-translate-x-1/2 absolute flex gap-[16px] items-center left-1/2 top-[974px]" data-node-id="1:1048">
        <p
          className="font-['Noto_Sans:Light'] font-light leading-[1.2] text-[16px] text-white tracking-[3.52px] uppercase whitespace-nowrap"
          style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100' }}
        >
          {scrollDown}
        </p>
        <img alt="" className="block h-[24px] w-[12px]" src={imgScrollDown} />
      </div>

      <div className="absolute inset-0 grid pointer-events-none" style={{ gridTemplateColumns: `repeat(${GRID.cols}, 1fr)`, gridTemplateRows: `repeat(${GRID.rows}, 1fr)` }} aria-hidden="true">
        {pixelRank.map((_, index) => (
          <div key={index} data-pixel className="bg-[#f5f5f5] shadow-[0_0_0_1px_#f5f5f5]" />
        ))}
      </div>
    </div>
  );
}
