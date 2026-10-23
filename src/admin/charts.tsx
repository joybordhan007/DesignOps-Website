import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// Small SVG charts for the dashboard: line, stacked bars, donut and horizontal
// bars. Each has a legend (2+ series) and a hover tooltip; colours are passed in.

export type Series = { name: string; color: string; values: number[] };

const AXIS = "#8a8a8a";
const GRID = "#efefef";
const font = "font-['Inter:Regular']";

/** Width of an element, kept up to date, so SVG text stays at its real size. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/** A round axis maximum with 4 even steps. */
function niceMax(value: number) {
  const raw = Math.max(value, 4) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= raw) ?? raw;
  return Math.ceil(step) * 4;
}

export function Legend({ series }: { series: { name: string; color: string; value?: ReactNode }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-[16px] gap-y-[6px]">
      {series.map((s) => (
        <li key={s.name} className={`${font} flex gap-[6px] items-center text-[#505050] text-[13px]`}>
          <span className="rounded-[3px] shrink-0 size-[10px]" style={{ background: s.color }} />
          {s.name}
          {s.value !== undefined && <span className="font-['Inter:Semi_Bold'] font-semibold text-[#191919]">{s.value}</span>}
        </li>
      ))}
    </ul>
  );
}

function Tooltip({ x, width, title, rows }: { x: number; width: number; title: string; rows: { name: string; color: string; value: number }[] }) {
  const left = Math.min(Math.max(x, 80), width - 80);
  return (
    <div className="-translate-x-1/2 absolute bg-[#191919] flex flex-col gap-[4px] min-w-[140px] pointer-events-none px-[12px] py-[10px] rounded-[8px] shadow-[0px_6px_18px_rgba(0,0,0,0.18)] top-0 z-[2]" style={{ left }}>
      <span className="font-['Inter:Semi_Bold'] font-semibold text-[12px] text-white">{title}</span>
      {rows.map((row) => (
        <span key={row.name} className={`${font} flex gap-[8px] items-center text-[#dfdfdf] text-[12px]`}>
          <span className="rounded-[2px] shrink-0 size-[8px]" style={{ background: row.color }} />
          {row.name}
          <span className="font-['Inter:Semi_Bold'] font-semibold ml-auto pl-[10px] text-white">{row.value}</span>
        </span>
      ))}
    </div>
  );
}

const PAD = { top: 16, right: 12, bottom: 28, left: 34 };

function Axes({ width, height, max, labels, x }: { width: number; height: number; max: number; labels: string[]; x: (i: number) => number }) {
  const plotH = height - PAD.top - PAD.bottom;
  const every = Math.ceil(labels.length / Math.max(1, Math.floor((width - PAD.left) / 48)));
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => {
        const y = PAD.top + plotH - (plotH * i) / 4;
        return (
          <g key={i}>
            <line x1={PAD.left} x2={width - PAD.right} y1={y} y2={y} stroke={i ? GRID : "#d9d9d9"} />
            <text x={PAD.left - 8} y={y} dy="0.32em" textAnchor="end" fontSize={11} fill={AXIS}>
              {(max * i) / 4}
            </text>
          </g>
        );
      })}
      {labels.map((label, i) =>
        i % every === 0 || i === labels.length - 1 ? (
          <text key={i} x={x(i)} y={height - 8} textAnchor="middle" fontSize={11} fill={AXIS}>
            {label}
          </text>
        ) : null,
      )}
    </>
  );
}

/** Lines over time with a hover crosshair. `titles` name each point in the tooltip. */
export function LineChart({ labels, titles, series, height = 260 }: { labels: string[]; titles: string[]; series: Series[]; height?: number }) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const max = niceMax(Math.max(0, ...series.flatMap((s) => s.values)));
  const plotW = width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (labels.length > 1 ? (plotW * i) / (labels.length - 1) : plotW / 2);
  const y = (v: number) => PAD.top + plotH - (plotH * v) / max;

  return (
    <div ref={ref} className="relative w-full" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="block" role="img" aria-label={series.map((s) => `${s.name}: ${s.values.join(", ")}`).join(". ")}>
          <defs>
            {series.map((s, si) => (
              <linearGradient key={si} id={`${id}area-${si}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={s.color} stopOpacity={0.16} />
                <stop offset="1" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <Axes width={width} height={height} max={max} labels={labels} x={x} />
          {series.map((s, si) => {
            const line = s.values.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join("");
            return (
              <g key={s.name}>
                {si === 0 && <path d={`${line}L${x(s.values.length - 1)},${y(0)}L${x(0)},${y(0)}Z`} fill={`url(#${id}area-${si})`} />}
                <path d={line} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              </g>
            );
          })}
          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + plotH} stroke="#bdbdbd" strokeDasharray="3 3" />
              {series.map((s) => (
                <circle key={s.name} cx={x(hover)} cy={y(s.values[hover])} r={4.5} fill={s.color} stroke="#fff" strokeWidth={2} />
              ))}
            </g>
          )}
          <rect
            x={PAD.left}
            y={0}
            width={Math.max(0, plotW)}
            height={height}
            fill="transparent"
            onMouseMove={(e) => {
              const box = e.currentTarget.getBoundingClientRect();
              const i = Math.round(((e.clientX - box.left) / box.width) * (labels.length - 1));
              setHover(Math.min(labels.length - 1, Math.max(0, i)));
            }}
            onMouseLeave={() => setHover(null)}
          />
        </svg>
      )}
      {hover !== null && <Tooltip x={x(hover)} width={width} title={titles[hover]} rows={series.map((s) => ({ name: s.name, color: s.color, value: s.values[hover] }))} />}
    </div>
  );
}

/** Stacked columns with a 2px gap between segments and a per-column tooltip. */
export function StackedBars({ labels, titles, series, height = 280 }: { labels: string[]; titles: string[]; series: Series[]; height?: number }) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const totals = labels.map((_, i) => series.reduce((sum, s) => sum + s.values[i], 0));
  const max = niceMax(Math.max(0, ...totals));
  const plotW = width - PAD.left - PAD.right;
  const plotH = height - PAD.top - PAD.bottom;
  const slot = plotW / Math.max(1, labels.length);
  const barW = Math.min(44, slot * 0.56);
  const x = (i: number) => PAD.left + slot * i + slot / 2;
  const h = (v: number) => (plotH * v) / max;
  const base = PAD.top + plotH;

  return (
    <div ref={ref} className="relative w-full" style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} className="block" role="img" aria-label={labels.map((_, i) => `${titles[i]}: ${totals[i]}`).join(", ")}>
          <Axes width={width} height={height} max={max} labels={labels} x={x} />
          {labels.map((_, i) => {
            let top = base;
            const total = h(totals[i]);
            return (
              <g key={i} opacity={hover === null || hover === i ? 1 : 0.45}>
                <clipPath id={`${id}col-${i}`}>
                  <rect x={x(i) - barW / 2} y={base - total} width={barW} height={total + 6} rx={4} />
                </clipPath>
                <g clipPath={`url(#${id}col-${i})`}>
                  {series.map((s) => {
                    const segment = h(s.values[i]);
                    if (!segment) return null;
                    top -= segment;
                    // A 2px gap separates a segment from the one above it.
                    const isTop = top <= base - total + 0.5;
                    return <rect key={s.name} x={x(i) - barW / 2} y={top + (isTop ? 0 : 2)} width={barW} height={Math.max(0, segment - (isTop ? 0 : 2))} fill={s.color} />;
                  })}
                </g>
                {totals[i] > 0 && (
                  <text x={x(i)} y={base - total - 6} textAnchor="middle" fontSize={11} fill="#505050">
                    {totals[i]}
                  </text>
                )}
                <rect x={x(i) - slot / 2} y={PAD.top} width={slot} height={plotH} fill="transparent" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
              </g>
            );
          })}
        </svg>
      )}
      {hover !== null && (
        <Tooltip x={x(hover)} width={width} title={`${titles[hover]} · ${totals[hover]}`} rows={series.map((s) => ({ name: s.name, color: s.color, value: s.values[hover] }))} />
      )}
    </div>
  );
}

/** Ring of parts of a whole with the total in the middle. */
export function Donut({ parts, label, size = 168 }: { parts: { name: string; color: string; value: number }[]; label: string; size?: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const total = parts.reduce((sum, p) => sum + p.value, 0);
  const stroke = 22;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const gap = parts.filter((p) => p.value).length > 1 ? 3 : 0;
  let offset = 0;
  const shown = hover !== null ? parts[hover] : null;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 block" role="img" aria-label={parts.map((p) => `${p.name}: ${p.value}`).join(", ")}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f1f1" strokeWidth={stroke} />
        {total > 0 &&
          parts.map((part, i) => {
            const length = (part.value / total) * circumference;
            const dash = Math.max(0, length - gap);
            const el = (
              <circle
                key={part.name}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={part.color}
                strokeWidth={hover === i ? stroke + 4 : stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="cursor-default transition-[stroke-width]"
              />
            );
            offset += length;
            return part.value ? el : null;
          })}
      </svg>
      <div className="absolute flex flex-col inset-0 items-center justify-center pointer-events-none">
        <span className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[#191919] text-[28px]">{shown ? shown.value : total}</span>
        <span className={`${font} mt-[4px] text-[#8a8a8a] text-[12px]`}>{shown ? shown.name : label}</span>
      </div>
    </div>
  );
}

/** Labelled horizontal bars (one series), value at the end of each row. */
export function BarList({ rows, color, empty = "No data yet." }: { rows: { label: ReactNode; value: number; key: string }[]; color: string; empty?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (!rows.some((r) => r.value)) return <p className={`${font} text-[#8a8a8a] text-[14px]`}>{empty}</p>;
  return (
    <ul className="flex flex-col gap-[12px]">
      {rows.map((row) => (
        <li key={row.key} className="flex flex-col gap-[6px]" title={`${row.value}`}>
          <span className={`${font} flex justify-between text-[#3e3e3e] text-[13px]`}>
            <span className="min-w-0 truncate">{row.label}</span>
            <span className="font-['Inter:Semi_Bold'] font-semibold pl-[8px] text-[#191919]">{row.value}</span>
          </span>
          <span className="bg-[#f3f3f3] block h-[8px] overflow-hidden rounded-full">
            <span className="block h-full rounded-full transition-[width] duration-500" style={{ width: `${(row.value / max) * 100}%`, background: color }} />
          </span>
        </li>
      ))}
    </ul>
  );
}
