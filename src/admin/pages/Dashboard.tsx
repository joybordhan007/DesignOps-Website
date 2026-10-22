import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react";
import { trackingIds } from "../../../server/tracking.js";
import { formatDate, sortedPosts } from "@/content/helpers";
import { useContent } from "@/content/store";
import type { PageProps } from "../AdminApp";
import { api, type DayVisits } from "../api";
import { BarList, Donut, Legend, LineChart, StackedBars } from "../charts";
import { card, secondaryButton } from "../editor";
import { ArrowRightIcon, BlogIcon, CheckIcon, FaqIcon, PlusIcon, ServicesIcon, StarIcon, WorkIcon } from "../icons";

// Dashboard: totals, visitors, activity charts, inbox, content reports, setup
// checklist and the latest messages and content. One time filter (7 days up to
// 12 months) applies to every chart and report.

// Validated categorical palette (identity, fixed order); cyan is the brand colour.
const C = {
  messages: "#00a0b2",
  reviews: "#eb6834",
  views: "#2a78d6",
  visitors: "#00a0b2",
  blog: "#2a78d6",
  work: "#eb6834",
  services: "#1baf7a",
  reviewsBar: "#6250d6",
  read: "#d4d4d4",
  mobile: "#00a0b2",
  tablet: "#eda100",
  desktop: "#2a78d6",
};

const heading = "font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]";
const sub = "font-['Inter:Regular'] text-[#8a8a8a] text-[13px]";
const linkButton = "cursor-pointer flex font-['Inter:Medium'] font-medium gap-[4px] items-center shrink-0 text-[#00a0b2] text-[13px] hover:underline";

function StatCard({ label, value, note, icon: Icon, tint, onClick }: { label: string; value: number; note: string; icon: ComponentType<{ size?: number }>; tint: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`${card} cursor-pointer flex group h-[112px] items-center justify-between px-[24px] text-left transition-shadow hover:shadow-[0px_6px_20px_rgba(0,0,0,0.08)]`}>
      <span className="flex flex-col gap-[8px] min-w-0">
        <span className="font-['Inter:Medium'] font-medium text-[#191919] text-[16px]">{label}</span>
        <span className="font-['Inter:Medium'] font-medium leading-none text-[#191919] text-[34px]">{String(value).padStart(2, "0")}</span>
        <span className={`${sub} !text-[12px] truncate`}>{note}</span>
      </span>
      <span className="flex items-center justify-center rounded-full shrink-0 size-[64px] transition-transform group-hover:scale-105" style={{ background: `${tint}1a`, color: tint }}>
        <Icon size={30} />
      </span>
    </button>
  );
}

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

/** A number with its change against the period before. */
function Kpi({ label, value, previous, format = String }: { label: string; value: number; previous: number | null; format?: (n: number) => string }) {
  const change = previous ? Math.round(((value - previous) / previous) * 100) : null;
  return (
    <div className="flex flex-col gap-[4px] min-w-[120px]">
      <span className={sub}>{label}</span>
      <span className="flex flex-wrap gap-x-[8px] items-baseline">
        <span className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[#191919] text-[26px]">{format(value)}</span>
        {change !== null && (
          <span className={`font-['Inter:Medium'] font-medium text-[12px] ${change >= 0 ? "text-[#1a7f45]" : "text-[#c62828]"}`} title="Compared with the period before">
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </span>
        )}
      </span>
    </div>
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
    <div className="bg-white flex flex-wrap gap-[2px] p-[4px] rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]" role="group" aria-label="Time range">
      {RANGES.map((range) => (
        <button
          key={range.key}
          type="button"
          aria-pressed={value.key === range.key}
          className={`cursor-pointer font-['Inter:Medium'] font-medium px-[12px] py-[6px] rounded-[6px] text-[13px] ${value.key === range.key ? "bg-[#00b6ca] text-white" : "text-[#3e3e3e] hover:bg-[#f4fbfc]"}`}
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
    return {
      labels: starts.map((d) => d.toLocaleDateString("en-US", byDay ? { month: "short", day: "numeric" } : { month: "short" })),
      titles: starts.map((d) => d.toLocaleDateString("en-US", byDay ? { weekday: "short", month: "long", day: "numeric" } : { month: "long", year: "numeric" })),
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

const top = (counts: Record<string, number>, n: number, label: (key: string) => string = (key) => key) =>
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ key, label: label(key), value }));

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

const daysAgo = (date: string, days: number) => Boolean(date) && Date.now() - parseDate(date).getTime() <= days * 86_400_000;

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

  const unread = messages.filter((m) => !m.read).length;
  const recentMessages = messages.slice(0, 5);
  const recentPosts = sortedPosts(content.posts).slice(0, 3);
  const recentProjects = content.projects.slice(-3).reverse();

  // Visitors.
  const totalViews = sum(traffic.views);
  const totalVisitors = sum(traffic.visitors);
  const messageDates = messages.map((m) => m.createdAt);
  const messagesInRange = sum(buckets.countBy(messageDates));
  const messagesBefore = buckets.countPrevious(messageDates);
  const conversion = totalVisitors ? (messagesInRange / totalVisitors) * 100 : 0;
  const conversionBefore = traffic.previous.visitors ? (messagesBefore / traffic.previous.visitors) * 100 : null;
  const devices = (["mobile", "tablet", "desktop"] as const).map((key) => ({ name: key[0].toUpperCase() + key.slice(1), color: C[key], value: traffic.devices[key] ?? 0 }));
  const pageName = (path: string) => (path === "/" ? "Home" : path);

  // Activity: messages and reviews (published + waiting).
  const reviewDates = [...content.reviews.map((r) => r.createdAt), ...pendingReviews.map((r) => r.createdAt)];
  const messageCounts = buckets.countBy(messageDates);
  const reviewCounts = buckets.countBy(reviewDates);

  const contentSeries = [
    { name: "Blog posts", color: C.blog, values: buckets.countBy(content.posts.map((p) => p.date || p.createdAt)) },
    { name: "Projects", color: C.work, values: buckets.countBy(content.projects.map((p) => p.createdAt)) },
    { name: "Services", color: C.services, values: buckets.countBy(content.services.map((s) => s.createdAt)) },
    { name: "Reviews", color: C.reviewsBar, values: buckets.countBy(content.reviews.map((r) => r.createdAt)) },
  ];
  const contentTotal = contentSeries.reduce((total, s) => total + sum(s.values), 0);

  const ratings = [5, 4, 3, 2, 1].map((stars) => ({ key: String(stars), value: content.reviews.filter((r) => Math.round(r.rating) === stars).length, label: `${stars} star${stars > 1 ? "s" : ""}` }));
  const average = content.reviews.length ? content.reviews.reduce((total, r) => total + r.rating, 0) / content.reviews.length : 0;

  const categories = top(
    content.posts.flatMap((p) => p.categories).reduce<Record<string, number>>((all, c) => ({ ...all, [c]: (all[c] ?? 0) + 1 }), {}),
    5,
  );

  const hidden = (items: { active: boolean }[]) => items.filter((item) => !item.active).length;
  const newThisMonth = (items: { createdAt: string }[]) => items.filter((item) => daysAgo(item.createdAt, 30)).length;
  const note = (items: { active: boolean; createdAt: string }[]) => {
    const parts = [hidden(items) ? `${hidden(items)} hidden` : "All visible", newThisMonth(items) ? `+${newThisMonth(items)} in 30 days` : ""];
    return parts.filter(Boolean).join(" · ");
  };

  const ids = trackingIds(content.settings.tracking);
  const socials = content.settings.footer.socials.filter((s) => s.url.trim()).length;
  const checklist = [
    { done: Boolean(ids.gtmId), label: "Google Tag Manager connected", to: "/admin/tracking" },
    { done: Boolean(ids.metaPixelId), label: "Meta Pixel connected", to: "/admin/tracking" },
    { done: Boolean(content.settings.seo.description.trim()), label: "Search description written", to: "/admin/settings" },
    { done: socials >= 3, label: `Social links in the footer (${socials})`, to: "/admin/settings" },
    { done: pendingReviews.length === 0, label: pendingReviews.length ? `${pendingReviews.length} review${pendingReviews.length > 1 ? "s" : ""} waiting for approval` : "No reviews waiting", to: "/admin/reviews" },
    { done: unread === 0, label: unread ? `${unread} unread message${unread > 1 ? "s" : ""}` : "Inbox is clear", to: "/admin/messages" },
  ];
  const doneCount = checklist.filter((c) => c.done).length;
  const period = `last ${range.label}`;

  return (
    <div className="flex flex-col gap-[24px]">
      {/* Title + time filter */}
      <div className="flex flex-wrap gap-[16px] items-end justify-between">
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#191919] text-[24px]">Dashboard</h1>
          <p className={sub}>Reports for the {period}.</p>
        </div>
        <RangeFilter value={range} onChange={pickRange} />
      </div>

      {/* Totals */}
      <div className="gap-[24px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Services" value={content.services.length} note={note(content.services)} icon={ServicesIcon} tint="#2f7df6" onClick={() => navigate("/admin/services")} />
        <StatCard label="Total Work" value={content.projects.length} note={note(content.projects)} icon={WorkIcon} tint="#d63aa8" onClick={() => navigate("/admin/work")} />
        <StatCard label="Total Blog" value={content.posts.length} note={note(content.posts)} icon={BlogIcon} tint="#5b4bdb" onClick={() => navigate("/admin/blog")} />
        <StatCard label="Total FAQ" value={content.faqs.length} note="Questions on the Contact page" icon={FaqIcon} tint="#e2533b" onClick={() => navigate("/admin/faq")} />
      </div>

      {/* Visitors + devices */}
      <div className="gap-[24px] grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <section className={`${card} flex flex-col gap-[18px] min-h-[400px] p-[24px]`}>
          <CardHeader title="Website visitors" note={`Page views and visitors · ${period}`}>
            <Legend
              series={[
                { name: "Page views", color: C.views },
                { name: "Visitors", color: C.visitors },
              ]}
            />
          </CardHeader>
          <div className="flex flex-wrap gap-x-[40px] gap-y-[16px]">
            <Kpi label="Page views" value={totalViews} previous={traffic.previous.views || null} />
            <Kpi label="Visitors" value={totalVisitors} previous={traffic.previous.visitors || null} />
            <Kpi label="Messages" value={messagesInRange} previous={messagesBefore || null} />
            <Kpi label="Visitors who wrote" value={conversion} previous={conversionBefore || null} format={(n) => `${n.toFixed(1)}%`} />
          </div>
          {visits && !Object.keys(visits).length ? (
            <p className="bg-[#f7f7f7] font-['Inter:Regular'] mt-auto px-[16px] py-[40px] rounded-[8px] text-[#707070] text-[14px] text-center">Visits are counted from now on; the chart fills in as people visit the website.</p>
          ) : (
            <LineChart
              labels={buckets.labels}
              titles={buckets.titles}
              series={[
                { name: "Page views", color: C.views, values: traffic.views },
                { name: "Visitors", color: C.visitors, values: traffic.visitors },
              ]}
            />
          )}
        </section>

        <section className={`${card} flex flex-col gap-[18px] min-h-[400px] p-[24px]`}>
          <CardHeader title="Devices" note="Page views by screen size" />
          <div className="flex flex-col flex-1 gap-[16px] items-center justify-center">
            <Donut label="views" parts={devices} />
            <Legend series={devices} />
          </div>
        </section>
      </div>

      {/* Pages + sources */}
      <div className="gap-[24px] grid grid-cols-1 lg:grid-cols-2">
        <section className={`${card} flex flex-col gap-[18px] p-[24px]`}>
          <CardHeader title="Top pages" note="Most viewed pages" />
          <BarList rows={top(traffic.pages, 7, pageName)} color={C.views} empty="No page views in this period." />
        </section>
        <section className={`${card} flex flex-col gap-[18px] p-[24px]`}>
          <CardHeader title="Traffic sources" note="Where visits came from (Direct = typed or bookmarked)" />
          <BarList rows={top(traffic.sources, 7)} color={C.services} empty="No visits in this period." />
        </section>
      </div>

      {/* Activity + inbox */}
      <div className="gap-[24px] grid grid-cols-1 xl:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <section className={`${card} flex flex-col gap-[18px] min-h-[400px] p-[24px]`}>
          <CardHeader title="Messages & reviews" note={`Contact form messages and reviews received · ${period}`}>
            <Legend
              series={[
                { name: "Messages", color: C.messages, value: sum(messageCounts) },
                { name: "Reviews", color: C.reviews, value: sum(reviewCounts) },
              ]}
            />
          </CardHeader>
          <LineChart
            labels={buckets.labels}
            titles={buckets.titles}
            series={[
              { name: "Messages", color: C.messages, values: messageCounts },
              { name: "Reviews", color: C.reviews, values: reviewCounts },
            ]}
          />
        </section>

        <section className={`${card} flex flex-col gap-[18px] min-h-[400px] p-[24px]`}>
          <CardHeader title="Inbox">
            <button type="button" className={linkButton} onClick={() => navigate("/admin/messages")}>
              Open <ArrowRightIcon size={14} />
            </button>
          </CardHeader>
          <div className="flex flex-col gap-[16px] items-center">
            <Donut
              label="messages"
              parts={[
                { name: "Unread", color: C.messages, value: unread },
                { name: "Read", color: C.read, value: messages.length - unread },
              ]}
            />
            <Legend
              series={[
                { name: "Unread", color: C.messages, value: unread },
                { name: "Read", color: C.read, value: messages.length - unread },
              ]}
            />
          </div>
          <button
            type="button"
            onClick={() => navigate("/admin/reviews")}
            className="bg-[#fff6ef] cursor-pointer flex gap-[12px] items-center mt-auto p-[14px] rounded-[8px] text-left transition-colors hover:bg-[#ffeedf]"
          >
            <span className="bg-white flex items-center justify-center rounded-full shrink-0 size-[38px] text-[#eb6834]">
              <StarIcon size={18} />
            </span>
            <span className="flex flex-col min-w-0">
              <span className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[15px]">
                {pendingReviews.length} review{pendingReviews.length === 1 ? "" : "s"} waiting
              </span>
              <span className={`${sub} !text-[12px]`}>{pendingReviews.length ? "Approve them to show on the website" : "Nothing to approve"}</span>
            </span>
            <ArrowRightIcon size={16} className="ml-auto shrink-0 text-[#8a8a8a]" />
          </button>
        </section>
      </div>

      {/* Content published */}
      <section className={`${card} flex flex-col gap-[18px] min-h-[400px] p-[24px]`}>
        <CardHeader title="Content added" note={`New blog posts, projects, services and reviews · ${contentTotal} in the ${period}`}>
          <Legend series={contentSeries.map((s) => ({ name: s.name, color: s.color, value: sum(s.values) }))} />
        </CardHeader>
        <StackedBars labels={buckets.labels} titles={buckets.titles} series={contentSeries} height={300} />
      </section>

      {/* Reports */}
      <div className="gap-[24px] grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        <section className={`${card} flex flex-col gap-[18px] p-[24px]`}>
          <CardHeader title="Review ratings" note={`${content.reviews.length} published reviews`}>
            <span className="flex font-['Inter:Semi_Bold'] font-semibold gap-[4px] items-center text-[#191919] text-[20px]">
              <StarIcon size={18} className="text-[#eda100]" />
              {average ? average.toFixed(1) : "–"}
            </span>
          </CardHeader>
          <BarList rows={ratings} color="#eda100" empty="No reviews yet." />
        </section>

        <section className={`${card} flex flex-col gap-[18px] p-[24px]`}>
          <CardHeader title="Blog topics" note="Posts per category (top 5)">
            <button type="button" className={linkButton} onClick={() => navigate("/admin/blog")}>
              Blog <ArrowRightIcon size={14} />
            </button>
          </CardHeader>
          <BarList rows={categories} color={C.blog} empty="No categories yet." />
        </section>

        <section className={`${card} flex flex-col gap-[14px] p-[24px] lg:col-span-2 2xl:col-span-1`}>
          <CardHeader title="Website checklist" note={`${doneCount} of ${checklist.length} done`} />
          <span className="bg-[#f1f1f1] block h-[6px] overflow-hidden rounded-full">
            <span className="bg-[#1baf7a] block h-full rounded-full transition-[width] duration-500" style={{ width: `${(doneCount / checklist.length) * 100}%` }} />
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

      {/* Latest */}
      <div className="gap-[24px] grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <section className={`${card} flex flex-col gap-[12px] p-[24px]`}>
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

        <section className={`${card} flex flex-col gap-[18px] p-[24px]`}>
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
          <div className="gap-[24px] grid grid-cols-1 md:grid-cols-2">
            {[
              { title: "Blog posts", items: recentPosts.map((p) => ({ id: p.id, image: p.image, name: p.title, meta: formatDate(p.date), active: p.active, to: `/admin/blog?item=${p.id}` })) },
              { title: "Projects", items: recentProjects.map((p) => ({ id: p.id, image: p.cover, name: p.title, meta: p.category, active: p.active, to: `/admin/work?item=${p.id}` })) },
            ].map((list) => (
              <div key={list.title} className="flex flex-col gap-[8px]">
                <h3 className="font-['Inter:Medium'] font-medium text-[#8a8a8a] text-[12px] tracking-[0.4px] uppercase">{list.title}</h3>
                {list.items.map((item) => (
                  <button key={item.id} type="button" onClick={() => navigate(item.to)} className="cursor-pointer flex gap-[12px] items-center p-[6px] rounded-[6px] text-left hover:bg-[#f6f6f6]">
                    <span className="bg-[#f0f0f0] block h-[48px] overflow-hidden rounded-[4px] shrink-0 w-[72px]">{item.image && <img src={item.image} alt="" className="block object-cover size-full" />}</span>
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
