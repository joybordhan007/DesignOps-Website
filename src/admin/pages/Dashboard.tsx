import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { trackingIds } from "../../../server/tracking.js";
import SocialIcon from "@/components/SocialIcon";
import { formatDate, sortedPosts } from "@/content/helpers";
import { useContent } from "@/content/store";
import type { Content, SocialPlatform } from "@/content/types";
import type { PageProps } from "../AdminApp";
import { api, type DayVisits } from "../api";
import { BarList, Donut, Legend, LineChart, Sparkline, StackedBars } from "../charts";
import { secondaryButton } from "../editor";
import { AnalyticsIcon, ArrowRightIcon, BlogIcon, CheckIcon, ClientIcon, EyeIcon, FaqIcon, MessageIcon, PlusIcon, ReviewIcon, ServicesIcon, StarIcon, WorkIcon } from "../icons";

// Dashboard: website traffic first (page views, visitors, pages, sources,
// devices), then messages, content and setup. One time filter (7 days up to
// 12 months) applies to every chart and report.

// Validated categorical palette (fixed order: blue, orange, aqua, yellow), see the dataviz skill.
const SERIES = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100"] as const;
const ACCENT = "#00a0b2";
const NEUTRAL = "#d4d4d4";

const panel = "bg-white border border-[#ebebeb] rounded-[6px]";
const heading = "font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[16px]";
const sub = "font-['Inter:Regular'] text-[#8a8a8a] text-[13px]";
const linkButton = "cursor-pointer flex font-['Inter:Medium'] font-medium gap-[4px] items-center shrink-0 text-[#00a0b2] text-[13px] hover:underline";

function CardHeader({ title, note, children }: { title: string; note?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-[10px] items-start justify-between">
      <div className="flex flex-col gap-[2px]">
        <h2 className={heading}>{title}</h2>
        {note && <span className={sub}>{note}</span>}
      </div>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="font-['Inter:Semi_Bold'] font-semibold pt-[8px] text-[#9a9a9a] text-[12px] tracking-[1.2px] uppercase">{children}</h2>;
}

/** Change against the period before, as a small coloured pill. */
function Delta({ value, previous }: { value: number; previous: number }) {
  if (!previous) return <span className="bg-[#f3f3f3] font-['Inter:Medium'] font-medium px-[8px] py-[2px] rounded-full text-[#8a8a8a] text-[12px]">New</span>;
  const change = Math.round(((value - previous) / previous) * 100);
  const up = change >= 0;
  return (
    <span className={`font-['Inter:Semi_Bold'] font-semibold px-[8px] py-[2px] rounded-full text-[12px] ${up ? "bg-[#e7f7ee] text-[#1a7f45]" : "bg-[#fdecec] text-[#c62828]"}`}>
      {up ? "↑" : "↓"} {Math.abs(change)}%
    </span>
  );
}

/** "+3 new" (or "No new") for totals, instead of a percentage change. */
function NewBadge({ count }: { count: number }) {
  return (
    <span className={`font-['Inter:Semi_Bold'] font-semibold px-[8px] py-[2px] rounded-full text-[12px] ${count ? "bg-[#e7f7ee] text-[#1a7f45]" : "bg-[#f3f3f3] text-[#8a8a8a]"}`}>
      {count ? `+${count} new` : "No new"}
    </span>
  );
}

/** Headline card (150px): label, the number with its change, and a small trend line. Clickable when `onClick` is given. */
function KpiCard({
  label,
  value,
  trend,
  icon: Icon,
  tint,
  badge,
  note,
  format = (n) => n.toLocaleString("en-US"),
  onClick,
}: {
  label: string;
  value: number;
  trend: number[];
  icon: ComponentType<{ size?: number }>;
  /** Icon colour (background is a light tint of it). */
  tint: string;
  badge: ReactNode;
  note: string;
  format?: (n: number) => string;
  onClick?: () => void;
}) {
  const body = (
    <>
      <span className="flex gap-[10px] items-center">
        <span className="flex items-center justify-center rounded-[6px] shrink-0 size-[32px]" style={{ background: `${tint}1a`, color: tint }}>
          <Icon size={17} />
        </span>
        <span className="font-['Inter:Medium'] font-medium min-w-0 text-[#505050] text-[14px] truncate">{label}</span>
        {onClick && <ArrowRightIcon size={15} className="ml-auto shrink-0 text-[#c4c4c4] transition-colors group-hover:text-[#00a0b2]" />}
      </span>
      <span className="flex gap-[12px] items-end justify-between">
        <span className="flex flex-col gap-[8px] min-w-0">
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[#191919] text-[28px] tracking-[-0.3px]">{format(value)}</span>
          <span className="flex flex-wrap gap-[6px] items-center">
            {badge}
            <span className={`${sub} !text-[12px] truncate`}>{note}</span>
          </span>
        </span>
        <span className="shrink-0 w-[42%] max-w-[120px]">
          <Sparkline values={trend} color={tint} height={40} />
        </span>
      </span>
    </>
  );
  const box = `${panel} flex flex-col group h-[150px] justify-between overflow-hidden p-[16px] text-left`;
  return onClick ? (
    <button type="button" onClick={onClick} className={`${box} cursor-pointer transition-[border-color,box-shadow] hover:border-[#bfe9ee] hover:shadow-[0px_4px_14px_rgba(0,0,0,0.06)]`}>
      {body}
    </button>
  ) : (
    <div className={box}>{body}</div>
  );
}

/** Totals of the website's content, small and clickable. */
function ContentCard({ label, value, note, icon: Icon, onClick }: { label: string; value: number; note: string; icon: ComponentType<{ size?: number }>; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`${panel} cursor-pointer flex gap-[14px] group items-center p-[16px] text-left transition-colors hover:border-[#bfe9ee]`}>
      <span className="bg-[#f4f4f4] flex items-center justify-center rounded-[6px] shrink-0 size-[44px] text-[#3e3e3e] transition-colors group-hover:bg-[#e9f9fb] group-hover:text-[#00a0b2]">
        <Icon size={22} />
      </span>
      <span className="flex flex-col gap-[2px] min-w-0">
        <span className="flex gap-[8px] items-baseline">
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[#191919] text-[22px]">{value}</span>
          <span className="font-['Inter:Medium'] font-medium text-[#505050] text-[14px]">{label}</span>
        </span>
        <span className={`${sub} !text-[12px] truncate`}>{note}</span>
      </span>
      <ArrowRightIcon size={16} className="ml-auto shrink-0 text-[#c4c4c4] transition-colors group-hover:text-[#00a0b2]" />
    </button>
  );
}

// ---------------------------------------------------------------- time range

type Range = { key: string; label: string; unit: "day" | "month"; count: number };

const RANGES: Range[] = [
  { key: "7d", label: "7 days", unit: "day", count: 7 },
  { key: "30d", label: "30 days", unit: "day", count: 30 },
  { key: "3m", label: "3 months", unit: "month", count: 3 },
  { key: "6m", label: "6 months", unit: "month", count: 6 },
  { key: "12m", label: "12 months", unit: "month", count: 12 },
];

const RANGE_KEY = "admin-dashboard-range";

function RangeFilter({ value, onChange }: { value: Range; onChange: (range: Range) => void }) {
  return (
    <div className="bg-white border border-[#ebebeb] flex flex-wrap gap-[2px] p-[4px] rounded-full" role="group" aria-label="Time range">
      {RANGES.map((range) => (
        <button
          key={range.key}
          type="button"
          aria-pressed={value.key === range.key}
          className={`cursor-pointer font-['Inter:Medium'] font-medium px-[14px] py-[6px] rounded-full text-[13px] transition-colors ${value.key === range.key ? "bg-[#191919] text-white" : "text-[#505050] hover:bg-[#f4f4f4]"}`}
          onClick={() => onChange(range)}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}

const parseDate = (date: string) => new Date(date.length === 10 ? `${date}T00:00:00` : date);

/** The buckets (days or months) of a range, oldest first, plus the period just before it. */
function useBuckets(range: Range) {
  return useMemo(() => {
    const now = new Date();
    const byDay = range.unit === "day";
    const starts = Array.from({ length: range.count }, (_, i) =>
      byDay ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - range.count + 1 + i) : new Date(now.getFullYear(), now.getMonth() - range.count + 1 + i, 1),
    );
    const start = starts[0];
    const previousStart = byDay ? new Date(start.getFullYear(), start.getMonth(), start.getDate() - range.count) : new Date(start.getFullYear(), start.getMonth() - range.count, 1);

    const index = (date: string) => {
      const d = parseDate(date);
      if (Number.isNaN(d.getTime()) || d < start) return -1;
      if (byDay) {
        const i = Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() - start.getTime()) / 86_400_000);
        return i < range.count ? i : -1;
      }
      return starts.findIndex((m) => m.getFullYear() === d.getFullYear() && m.getMonth() === d.getMonth());
    };
    const inPrevious = (date: string) => {
      const d = parseDate(date);
      return d >= previousStart && d < start;
    };
    const countBy = (dates: string[]) => {
      const counts = starts.map(() => 0);
      for (const date of dates) {
        const i = date ? index(date) : -1;
        if (i >= 0) counts[i]++;
      }
      return counts;
    };
    const short = { month: "short", day: "numeric" } as const;
    return {
      labels: starts.map((d) => d.toLocaleDateString("en-US", byDay ? short : { month: "short" })),
      titles: starts.map((d) => d.toLocaleDateString("en-US", byDay ? { weekday: "short", month: "long", day: "numeric" } : { month: "long", year: "numeric" })),
      span: `${start.toLocaleDateString("en-US", short)} – ${now.toLocaleDateString("en-US", { ...short, year: "numeric" })}`,
      index,
      inPrevious,
      countBy,
      countPrevious: (dates: string[]) => dates.filter((date) => date && inPrevious(date)).length,
    };
  }, [range]);
}

/** Adds up the visit counts per bucket, plus the totals of the period before. */
function sumVisits(visits: Record<string, DayVisits>, buckets: ReturnType<typeof useBuckets>) {
  const views = buckets.labels.map(() => 0);
  const visitors = buckets.labels.map(() => 0);
  const pages: Record<string, number> = {};
  const sources: Record<string, number> = {};
  const devices: Record<string, number> = {};
  const previous = { views: 0, visitors: 0 };
  const add = (into: Record<string, number>, from: Record<string, number> = {}) => {
    for (const [key, value] of Object.entries(from)) into[key] = (into[key] ?? 0) + value;
  };
  for (const [day, data] of Object.entries(visits)) {
    const i = buckets.index(day);
    if (i >= 0) {
      views[i] += data.views;
      visitors[i] += data.visitors;
      add(pages, data.pages);
      add(sources, data.sources);
      add(devices, data.devices);
    } else if (buckets.inPrevious(day)) {
      previous.views += data.views;
      previous.visitors += data.visitors;
    }
  }
  return { views, visitors, pages, sources, devices, previous };
}

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

// ---------------------------------------------------------------- names for pages and sources

/** "/services/ui-ux-design" → "UI/UX Design" (falls back to the address). */
function pageNamer(content: Content) {
  const { nav } = content.settings.labels;
  const names: Record<string, string> = {
    "/": nav.home,
    "/services": nav.services,
    "/work": nav.work,
    "/blog": nav.blog,
    "/company": nav.company,
    "/reviews": nav.reviews,
    "/contact": content.settings.labels.footer.contactUs,
    "/privacy": content.settings.legal.privacy.title,
    "/terms": content.settings.legal.terms.title,
  };
  for (const s of content.services) names[`/services/${s.slug}`] = s.title;
  for (const p of content.projects) names[`/work/${p.slug}`] = p.title;
  for (const p of content.posts) names[`/blog/${p.slug}`] = p.title;
  return (path: string) => names[path.replace(/\/$/, "") || "/"] ?? path;
}

/** Referrer hosts and utm_source values grouped under one friendly name. */
const SOURCES: [RegExp, string, SocialPlatform?][] = [
  [/^direct$/, "Direct"],
  [/(^|\.)google\.|^google$|^adwords$|^gads$/, "Google"],
  [/facebook|^fb$|^fb\.|^meta$/, "Facebook", "facebook"],
  [/instagram|^ig$/, "Instagram", "instagram"],
  [/linkedin|^lnkd\.in$/, "LinkedIn", "linkedin"],
  [/^t\.co$|twitter|^x\.com$|^x$/, "X (Twitter)", "x"],
  [/youtube|^youtu\.be$/, "YouTube", "youtube"],
  [/tiktok/, "TikTok", "tiktok"],
  [/whatsapp|^wa\.me$/, "WhatsApp", "whatsapp"],
  [/pinterest/, "Pinterest", "pinterest"],
  [/behance/, "Behance", "behance"],
  [/dribbble/, "Dribbble", "dribbble"],
  [/github/, "GitHub", "github"],
  [/telegram|^t\.me$/, "Telegram", "telegram"],
  [/(^|\.)medium\.com$|^medium$/, "Medium", "medium"],
  [/(^|\.)bing\.|^bing$/, "Bing"],
  [/duckduckgo/, "DuckDuckGo"],
  [/(^|\.)yahoo\./, "Yahoo"],
  [/chatgpt|openai/, "ChatGPT"],
];

function sourceInfo(key: string) {
  const match = SOURCES.find(([pattern]) => pattern.test(key.toLowerCase()));
  return match ? { name: match[1], platform: match[2] } : { name: key, platform: undefined };
}

function SourceIcon({ name, platform }: { name: string; platform?: SocialPlatform }) {
  return (
    <span className="bg-[#f4f4f4] flex font-['Inter:Semi_Bold'] font-semibold items-center justify-center rounded-[6px] shrink-0 size-[32px] text-[#3e3e3e] text-[13px]">
      {platform ? <SocialIcon platform={platform} size={16} /> : name === "Direct" ? <ArrowRightIcon size={15} /> : name.slice(0, 1).toUpperCase()}
    </span>
  );
}

// ---------------------------------------------------------------- page

export default function Dashboard({ messages, pendingReviews, navigate }: PageProps) {
  const content = useContent();
  const [range, setRange] = useState<Range>(() => {
    try {
      return RANGES.find((r) => r.key === localStorage.getItem(RANGE_KEY)) ?? RANGES[1];
    } catch {
      return RANGES[1];
    }
  });
  const pickRange = (next: Range) => {
    setRange(next);
    try {
      localStorage.setItem(RANGE_KEY, next.key);
    } catch {
      /* storage blocked */
    }
  };
  const buckets = useBuckets(range);

  const [visits, setVisits] = useState<Record<string, DayVisits> | null>(null);
  useEffect(() => {
    api
      .visits()
      .then(setVisits)
      .catch(() => setVisits({}));
  }, []);
  const traffic = useMemo(() => sumVisits(visits ?? {}, buckets), [visits, buckets]);
  const pageName = useMemo(() => pageNamer(content), [content]);

  const unread = messages.filter((m) => !m.read).length;
  const recentMessages = messages.slice(0, 5);
  const recentPosts = sortedPosts(content.posts).slice(0, 3);
  const recentProjects = content.projects.slice(-3).reverse();
  const period = range.label;

  // Traffic.
  const totalViews = sum(traffic.views);
  const totalVisitors = sum(traffic.visitors);
  const perVisitor = (views: number, people: number) => (people ? views / people : 0);
  const messageDates = messages.map((m) => m.createdAt);
  const messageCounts = buckets.countBy(messageDates);
  const noVisitsYet = visits !== null && !Object.keys(visits).length;

  const deviceTotal = sum(Object.values(traffic.devices));
  const devices = (["desktop", "mobile", "tablet"] as const).map((key, i) => ({ name: key[0].toUpperCase() + key.slice(1), color: SERIES[i], value: traffic.devices[key] ?? 0 }));

  const pageRows = Object.entries(traffic.pages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, value]) => ({ key: path, label: pageName(path), detail: path, value }));

  const sourceTotals: Record<string, { value: number; platform?: SocialPlatform }> = {};
  for (const [key, value] of Object.entries(traffic.sources)) {
    const { name, platform } = sourceInfo(key);
    sourceTotals[name] = { value: (sourceTotals[name]?.value ?? 0) + value, platform };
  }
  const sessions = sum(Object.values(sourceTotals).map((s) => s.value));
  const sourceRows = Object.entries(sourceTotals)
    .sort((a, b) => b[1].value - a[1].value)
    .slice(0, 8)
    .map(([name, { value, platform }]) => ({ key: name, label: name, value, icon: <SourceIcon name={name} platform={platform} /> }));

  // Messages and reviews (published + waiting).
  const reviewDates = [...content.reviews.map((r) => r.createdAt), ...pendingReviews.map((r) => r.createdAt)];
  const reviewCounts = buckets.countBy(reviewDates);

  const contentSeries = [
    { name: "Blog posts", color: SERIES[0], values: buckets.countBy(content.posts.map((p) => p.date || p.createdAt)) },
    { name: "Projects", color: SERIES[1], values: buckets.countBy(content.projects.map((p) => p.createdAt)) },
    { name: "Services", color: SERIES[2], values: buckets.countBy(content.services.map((s) => s.createdAt)) },
    { name: "Reviews", color: SERIES[3], values: buckets.countBy(content.reviews.map((r) => r.createdAt)) },
  ];
  const contentTotal = contentSeries.reduce((total, s) => total + sum(s.values), 0);

  const ratings = [5, 4, 3, 2, 1].map((stars) => ({ key: String(stars), value: content.reviews.filter((r) => Math.round(r.rating) === stars).length, label: `${stars} star${stars > 1 ? "s" : ""}` }));
  const average = content.reviews.length ? content.reviews.reduce((total, r) => total + r.rating, 0) / content.reviews.length : 0;

  const categories = Object.entries(content.posts.flatMap((p) => p.categories).reduce<Record<string, number>>((all, c) => ({ ...all, [c]: (all[c] ?? 0) + 1 }), {}))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, value]) => ({ key: label, label, value }));

  /** How many items existed at the end of each bucket in the range. */
  const growth = (items: { createdAt: string }[]) => {
    const added = buckets.countBy(items.map((item) => item.createdAt));
    let running = items.length - sum(added);
    return added.map((n) => (running += n));
  };
  const hidden = (items: { active: boolean }[]) => items.filter((item) => !item.active).length;
  const note = (items: { active: boolean; createdAt: string }[]) => {
    const parts = [hidden(items) ? `${hidden(items)} hidden` : "All visible"];
    return parts.filter(Boolean).join(" · ");
  };

  const ids = trackingIds(content.settings.tracking);
  const socials = content.settings.footer.socials.filter((s) => s.url.trim()).length;
  const checklist = [
    { done: Boolean(ids.gtmId), label: "Google Tag Manager connected", to: "/admin/tracking" },
    { done: Boolean(ids.metaPixelId), label: "Meta Pixel connected", to: "/admin/tracking" },
    { done: Boolean(content.settings.seo.description.trim()), label: "Search description written", to: "/admin/settings#seo" },
    { done: socials >= 3, label: `Social links in the footer (${socials})`, to: "/admin/settings#footer" },
    { done: pendingReviews.length === 0, label: pendingReviews.length ? `${pendingReviews.length} review${pendingReviews.length > 1 ? "s" : ""} waiting for approval` : "No reviews waiting", to: "/admin/reviews" },
    { done: unread === 0, label: unread ? `${unread} unread message${unread > 1 ? "s" : ""}` : "Inbox is clear", to: "/admin/messages" },
  ];
  const doneCount = checklist.filter((c) => c.done).length;

  return (
    <div className="flex flex-col gap-[16px]">
      {/* Title + time filter */}
      <div className="flex flex-wrap gap-[16px] items-end justify-between">
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#191919] text-[26px]">Dashboard</h1>
          <p className={sub}>
            Last {period} · {buckets.span}
          </p>
        </div>
        <RangeFilter value={range} onChange={pickRange} />
      </div>

      {/* ---------------- Traffic */}
      <SectionTitle>Website traffic</SectionTitle>

      {noVisitsYet && (
        <p className="bg-[#e9f9fb] border border-[#bfe9ee] font-['Inter:Regular'] leading-[1.5] px-[16px] py-[12px] rounded-[6px] text-[#00687a] text-[14px]">
          Visit counting is on. Page views, visitors, pages, sources and devices appear here as soon as people open the website.
        </p>
      )}

      <div className="gap-[16px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-[1760px]:grid-cols-6">
        <KpiCard label="Page views" value={totalViews} trend={traffic.views} icon={EyeIcon} tint={SERIES[0]} badge={<Delta value={totalViews} previous={traffic.previous.views} />} note={`vs previous ${period}`} />
        <KpiCard label="Visitors" value={totalVisitors} trend={traffic.visitors} icon={ClientIcon} tint={SERIES[1]} badge={<Delta value={totalVisitors} previous={traffic.previous.visitors} />} note={`vs previous ${period}`} />
        <KpiCard
          label="Pages per visitor"
          value={perVisitor(totalViews, totalVisitors)}
          trend={traffic.views.map((v, i) => perVisitor(v, traffic.visitors[i]))}
          icon={AnalyticsIcon}
          tint={SERIES[2]}
          badge={<Delta value={perVisitor(totalViews, totalVisitors)} previous={perVisitor(traffic.previous.views, traffic.previous.visitors)} />}
          note={`vs previous ${period}`}
          format={(n) => n.toFixed(1)}
        />
        <KpiCard label="Messages" value={sum(messageCounts)} trend={messageCounts} icon={MessageIcon} tint={ACCENT} badge={<Delta value={sum(messageCounts)} previous={buckets.countPrevious(messageDates)} />} note={`vs previous ${period}`} onClick={() => navigate("/admin/messages")} />
        <KpiCard label="Total Services" value={content.services.length} trend={growth(content.services)} icon={ServicesIcon} tint="#6250d6" badge={<NewBadge count={sum(buckets.countBy(content.services.map((x) => x.createdAt)))} />} note={note(content.services)} onClick={() => navigate("/admin/services")} />
        <KpiCard label="Total Work" value={content.projects.length} trend={growth(content.projects)} icon={WorkIcon} tint="#d63aa8" badge={<NewBadge count={sum(buckets.countBy(content.projects.map((x) => x.createdAt)))} />} note={note(content.projects)} onClick={() => navigate("/admin/work")} />
      </div>

      <div className="gap-[16px] grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Traffic overview" note={range.unit === "day" ? "Per day" : "Per month"}>
            <Legend
              series={[
                { name: "Page views", color: SERIES[0], value: totalViews.toLocaleString("en-US") },
                { name: "Visitors", color: SERIES[1], value: totalVisitors.toLocaleString("en-US") },
              ]}
            />
          </CardHeader>
          <LineChart
            labels={buckets.labels}
            titles={buckets.titles}
            height={280}
            series={[
              { name: "Page views", color: SERIES[0], values: traffic.views },
              { name: "Visitors", color: SERIES[1], values: traffic.visitors },
            ]}
          />
        </section>

        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Devices" note="Page views by screen size" />
          <div className="flex flex-1 flex-col gap-[16px] items-center justify-center">
            <Donut label="page views" parts={devices} size={176} />
            <ul className="flex flex-col gap-[10px] w-full">
              {devices.map((d) => (
                <li key={d.name} className="flex font-['Inter:Regular'] gap-[10px] items-center text-[#3e3e3e] text-[13px]">
                  <span className="rounded-[3px] shrink-0 size-[10px]" style={{ background: d.color }} />
                  {d.name}
                  <span className="font-['Inter:Semi_Bold'] font-semibold ml-auto text-[#191919]">{d.value.toLocaleString("en-US")}</span>
                  <span className="text-[#8a8a8a] text-right w-[40px]">{deviceTotal ? Math.round((d.value / deviceTotal) * 100) : 0}%</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div className="gap-[16px] grid grid-cols-1 lg:grid-cols-2">
        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Top pages" note="Most opened pages · share of all page views" />
          <BarList rows={pageRows} total={totalViews} color={SERIES[0]} empty="No page views in this period yet." />
        </section>
        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Traffic sources" note="Where visits came from · Direct = typed or bookmarked" />
          <BarList rows={sourceRows} total={sessions} color={SERIES[2]} empty="No visits in this period yet." />
        </section>
      </div>

      {/* ---------------- Messages & content */}
      <SectionTitle>Messages & content</SectionTitle>

      <div className="gap-[16px] grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4">
        <ContentCard label="Blog posts" value={content.posts.length} note={note(content.posts)} icon={BlogIcon} onClick={() => navigate("/admin/blog")} />
        <ContentCard label="Clients" value={content.clients.length} note="Logos on the Home page" icon={ClientIcon} onClick={() => navigate("/admin/clients")} />
        <ContentCard label="Reviews" value={content.reviews.length} note={pendingReviews.length ? `${pendingReviews.length} waiting for approval` : "None waiting"} icon={ReviewIcon} onClick={() => navigate("/admin/reviews")} />
        <ContentCard label="FAQ" value={content.faqs.length} note="Questions on the Contact page" icon={FaqIcon} onClick={() => navigate("/admin/faq")} />
      </div>

      <div className="gap-[16px] grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Messages & reviews" note="Received through the website">
            <Legend
              series={[
                { name: "Messages", color: SERIES[0], value: sum(messageCounts) },
                { name: "Reviews", color: SERIES[1], value: sum(reviewCounts) },
              ]}
            />
          </CardHeader>
          <LineChart
            labels={buckets.labels}
            titles={buckets.titles}
            series={[
              { name: "Messages", color: SERIES[0], values: messageCounts },
              { name: "Reviews", color: SERIES[1], values: reviewCounts },
            ]}
          />
        </section>

        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Inbox">
            <button type="button" className={linkButton} onClick={() => navigate("/admin/messages")}>
              Open <ArrowRightIcon size={14} />
            </button>
          </CardHeader>
          <div className="flex flex-col gap-[14px] items-center">
            <Donut
              label="messages"
              size={150}
              parts={[
                { name: "Unread", color: SERIES[0], value: unread },
                { name: "Read", color: NEUTRAL, value: messages.length - unread },
              ]}
            />
            <Legend
              series={[
                { name: "Unread", color: SERIES[0], value: unread },
                { name: "Read", color: NEUTRAL, value: messages.length - unread },
              ]}
            />
          </div>
          <button type="button" onClick={() => navigate("/admin/reviews")} className="bg-[#fff6ef] cursor-pointer flex gap-[12px] items-center mt-auto p-[14px] rounded-[6px] text-left transition-colors hover:bg-[#ffeedf]">
            <span className="bg-white flex items-center justify-center rounded-full shrink-0 size-[36px] text-[#eb6834]">
              <StarIcon size={18} />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[14px]">
                {pendingReviews.length} review{pendingReviews.length === 1 ? "" : "s"} waiting
              </span>
              <span className={`${sub} !text-[12px]`}>{pendingReviews.length ? "Approve them to show on the website" : "Nothing to approve"}</span>
            </span>
            <ArrowRightIcon size={16} className="ml-auto shrink-0 text-[#8a8a8a]" />
          </button>
        </section>
      </div>

      <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
        <CardHeader title="Content added" note={`New blog posts, projects, services and reviews · ${contentTotal} in the last ${period}`}>
          <Legend series={contentSeries.map((s) => ({ name: s.name, color: s.color, value: sum(s.values) }))} />
        </CardHeader>
        <StackedBars labels={buckets.labels} titles={buckets.titles} series={contentSeries} height={280} />
      </section>

      <div className="gap-[16px] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Review ratings" note={`${content.reviews.length} published reviews`}>
            <span className="flex font-['Inter:Semi_Bold'] font-semibold gap-[4px] items-center text-[#191919] text-[20px]">
              <StarIcon size={18} className="text-[#eda100]" />
              {average ? average.toFixed(1) : "–"}
            </span>
          </CardHeader>
          <BarList rows={ratings} total={content.reviews.length} color={SERIES[3]} empty="No reviews yet." />
        </section>

        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Blog topics" note="Posts per category (top 5)">
            <button type="button" className={linkButton} onClick={() => navigate("/admin/blog")}>
              Blog <ArrowRightIcon size={14} />
            </button>
          </CardHeader>
          <BarList rows={categories} color={SERIES[0]} empty="No categories yet." />
        </section>

        <section className={`${panel} flex flex-col gap-[14px] p-[22px] lg:col-span-2 2xl:col-span-1`}>
          <CardHeader title="Website checklist" note={`${doneCount} of ${checklist.length} done`} />
          <span className="bg-[#f1f1f1] block h-[6px] overflow-hidden rounded-full">
            <span className="bg-[#1a7f45] block h-full rounded-full transition-[width] duration-500" style={{ width: `${(doneCount / checklist.length) * 100}%` }} />
          </span>
          <ul className="flex flex-col">
            {checklist.map((item) => (
              <li key={item.label}>
                <button type="button" onClick={() => navigate(item.to)} className="cursor-pointer flex gap-[10px] items-center px-[4px] py-[8px] rounded-[6px] text-left w-full hover:bg-[#f6f6f6]">
                  <span className={`flex items-center justify-center rounded-full shrink-0 size-[22px] ${item.done ? "bg-[#e7f7ee] text-[#1a7f45]" : "border-[#d4d4d4] border-[1.5px] border-dashed"}`}>{item.done && <CheckIcon size={14} />}</span>
                  <span className={`font-['Inter:Regular'] text-[14px] ${item.done ? "text-[#707070]" : "text-[#191919]"}`}>{item.label}</span>
                  {!item.done && <ArrowRightIcon size={14} className="ml-auto shrink-0 text-[#8a8a8a]" />}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="gap-[16px] grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <section className={`${panel} flex flex-col gap-[12px] p-[22px]`}>
          <CardHeader title="Recent messages">
            <button type="button" className={linkButton} onClick={() => navigate("/admin/messages")}>
              View all <ArrowRightIcon size={14} />
            </button>
          </CardHeader>
          {recentMessages.map((m) => (
            <button key={m.id} type="button" onClick={() => navigate(`/admin/messages?item=${m.id}`)} className="cursor-pointer flex gap-[12px] items-center p-[6px] rounded-[6px] text-left hover:bg-[#f6f6f6]">
              <span className="bg-[#e9f9fb] flex font-['Inter:Semi_Bold'] font-semibold items-center justify-center rounded-full shrink-0 size-[36px] text-[#00a0b2] text-[13px] uppercase">
                {(m.first_name[0] ?? "") + (m.last_name[0] ?? "")}
              </span>
              <span className="flex flex-col min-w-0">
                <span className="flex gap-[8px] items-center">
                  <span className={`font-['Inter:Medium'] font-medium text-[#222] text-[14px] truncate ${m.read ? "" : "!font-semibold"}`}>
                    {m.first_name} {m.last_name}
                  </span>
                  {!m.read && <span className="bg-[#00b6ca] rounded-full shrink-0 size-[7px]" aria-label="Unread" />}
                </span>
                <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px] truncate">{m.message || m.email}</span>
              </span>
              <span className="font-['Inter:Regular'] ml-auto shrink-0 text-[#9a9a9a] text-[11px]">{new Date(m.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </button>
          ))}
          {!recentMessages.length && <p className="font-['Inter:Regular'] text-[#8a8a8a] text-[14px]">No messages yet.</p>}
        </section>

        <section className={`${panel} flex flex-col gap-[16px] p-[22px]`}>
          <CardHeader title="Latest content">
            <div className="flex flex-wrap gap-[8px]">
              <button type="button" className={`${secondaryButton} !py-[7px] !text-[13px]`} onClick={() => navigate("/admin/blog")}>
                <PlusIcon size={15} /> Blog post
              </button>
              <button type="button" className={`${secondaryButton} !py-[7px] !text-[13px]`} onClick={() => navigate("/admin/work")}>
                <PlusIcon size={15} /> Project
              </button>
            </div>
          </CardHeader>
          <div className="gap-[16px] grid grid-cols-1 md:grid-cols-2">
            {[
              { title: "Blog posts", items: recentPosts.map((p) => ({ id: p.id, image: p.image, name: p.title, meta: formatDate(p.date), active: p.active, to: `/admin/blog?item=${p.id}` })) },
              { title: "Projects", items: recentProjects.map((p) => ({ id: p.id, image: p.cover, name: p.title, meta: p.category, active: p.active, to: `/admin/work?item=${p.id}` })) },
            ].map((list) => (
              <div key={list.title} className="flex flex-col gap-[8px]">
                <h3 className="font-['Inter:Medium'] font-medium text-[#8a8a8a] text-[12px] tracking-[0.4px] uppercase">{list.title}</h3>
                {list.items.map((item) => (
                  <button key={item.id} type="button" onClick={() => navigate(item.to)} className="cursor-pointer flex gap-[12px] items-center p-[6px] rounded-[6px] text-left hover:bg-[#f6f6f6]">
                    <span className="bg-[#f0f0f0] block h-[48px] overflow-hidden rounded-[6px] shrink-0 w-[72px]">{item.image && <img src={item.image} alt="" className="block object-cover size-full" />}</span>
                    <span className="flex flex-col min-w-0">
                      <span className="font-['Inter:Medium'] font-medium text-[#222] text-[14px] truncate">{item.name}</span>
                      <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">
                        {item.meta}
                        {!item.active && " · Hidden"}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
