import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { useContent } from "@/content/store";
import type { Content, Message, PendingReview } from "@/content/types";
import { SearchIcon } from "./icons";

// Search box in the dashboard's top bar. It looks through everything the
// dashboard holds: its pages and settings sections, services, work, blog posts,
// messages, reviews (published and waiting), FAQ, clients, numbers, working
// process steps, every text in Website Settings and the tracking IDs.
// ↑/↓ pick a result, Enter opens it, Esc closes; Ctrl+K or "/" jumps to the box.

type Entry = {
  group: string;
  title: string;
  /** Shown under the title; a snippet of the matching text replaces it when the title doesn't match. */
  detail?: string;
  /** Small tag after the title, e.g. "Hidden" or "Waiting". */
  tag?: string;
  /** Everything searchable for this entry. */
  fields: string[];
  to: string;
};

const GROUP_ORDER = ["Pages", "Services", "Work", "Blog", "Messages", "Reviews", "FAQ", "Clients", "Numbers", "Working process", "Settings"];
const PER_GROUP = 5;

/** Dashboard pages and settings sections, found by name or by what's in them. */
const PAGES: [title: string, to: string, keywords: string][] = [
  ["Dashboard", "/admin", "overview reports analytics visitors page views traffic sources devices"],
  ["Services", "/admin/services", "add service"],
  ["Work", "/admin/work", "projects case studies portfolio add work"],
  ["Blog Management", "/admin/blog", "posts articles add blog"],
  ["Client Management", "/admin/clients", "logos clients"],
  ["Achievement Management", "/admin/achievements", "numbers stats achievements"],
  ["FAQ Management", "/admin/faq", "questions answers"],
  ["Messages", "/admin/messages", "inbox contact form inquiries"],
  ["Review Management", "/admin/reviews", "ratings approve testimonials"],
  ["Tracking & Analytics", "/admin/tracking", "gtm google tag manager meta facebook pixel"],
  ["My profile", "/admin/profile", "account name photo avatar password change password"],
  ["Search & sharing", "/admin/settings#seo", "seo site title description google"],
  ["Contact details", "/admin/settings#contact", "phone email address contact page"],
  ["Footer & social", "/admin/settings#footer", "social media links copyright facebook linkedin instagram"],
  ["Email notifications", "/admin/settings#email", "smtp mail inbox recipients send test email"],
  ["Page banners", "/admin/settings#heroes", "hero video banner"],
  ["Home page texts", "/admin/settings#home", "headings statement call to action"],
  ["Home working process", "/admin/settings#process", "steps process"],
  ["Company page", "/admin/settings#company", "mission quote about"],
  ["Reviews page", "/admin/settings#reviews", "reviews heading"],
  ["Privacy Policy", "/admin/settings#privacy", "legal privacy"],
  ["Terms of Service", "/admin/settings#terms", "legal terms conditions"],
  ["Buttons & labels", "/admin/settings#labels", "texts buttons labels menu"],
];

/** Where a Website Settings text is edited, from its place in the settings object. */
function settingsPlace(path: string[]): { to: string; section: string } | null {
  const [top, second] = path;
  const settings = (key: string, section: string) => ({ to: `/admin/settings#${key}`, section });
  switch (top) {
    case "seo":
      return settings("seo", "Search & sharing");
    case "contact":
      return settings("contact", "Contact details");
    case "footer":
      return settings("footer", "Footer & social");
    case "heroes":
    case "heroVideos":
      return settings("heroes", "Page banners");
    case "titles":
      return second === "stats" ? { to: "/admin/achievements", section: "Achievement Management" } : settings("home", "Home page texts");
    case "vision":
    case "cta":
      return settings("home", "Home page texts");
    case "company":
      return settings("company", "Company page");
    case "reviewsPage":
      return settings("reviews", "Reviews page");
    case "labels":
      return settings("labels", "Buttons & labels");
    case "legal":
      return second === "terms" ? settings("terms", "Terms of Service") : settings("privacy", "Privacy Policy");
    case "tracking":
      return { to: "/admin/tracking", section: "Tracking & Analytics" };
    default:
      return null;
  }
}

/** "missionTitle" → "mission title". */
const words = (key: string) => key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_.]/g, " ").toLowerCase();

/** Every text in the settings, with its path (file paths of images and videos left out). */
function settingTexts(value: unknown, path: string[] = []): { path: string[]; text: string }[] {
  if (typeof value === "string") return value.trim() && !/^\/(uploads|assets|videos)\//.test(value) ? [{ path, text: value }] : [];
  if (Array.isArray(value)) return value.flatMap((item, i) => settingTexts(item, [...path, String(i)]));
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => settingTexts(item, [...path, key]));
  return [];
}

const plain = (text: string) => text.replace(/[*#]/g, "").replace(/\s+/g, " ").trim();

function buildIndex(content: Content, messages: Message[], pending: PendingReview[]): Entry[] {
  const entries: Entry[] = PAGES.map(([title, to, keywords]) => ({ group: "Pages", title, detail: to.includes("#") ? "Website Settings" : "Dashboard page", fields: [title, keywords], to }));
  const hidden = (active: boolean) => (active ? undefined : "Hidden");

  for (const s of content.services)
    entries.push({ group: "Services", title: s.title, detail: plain(s.summary), tag: hidden(s.active), to: `/admin/services?item=${s.id}`, fields: [s.title, s.summary, s.eyebrow, s.name, s.slug, s.detail.tagline, s.detail.intro, s.detail.body, ...s.detail.features, ...s.detail.deliverables.flatMap((d) => [d.title, d.text]), ...s.detail.process.flatMap((p) => [p.title, p.text])] });
  for (const p of content.projects)
    entries.push({ group: "Work", title: p.title, detail: p.category, tag: hidden(p.active), to: `/admin/work?item=${p.id}`, fields: [p.title, p.category, p.summary, p.slug, p.website, p.detail.heading, p.detail.overview, p.detail.goals, ...p.detail.goalPoints, p.detail.challenge.title, p.detail.challenge.text, p.detail.solution.title, p.detail.solution.text, ...p.detail.tags] });
  for (const p of content.posts) entries.push({ group: "Blog", title: p.title, detail: p.categories.join(", "), tag: hidden(p.active), to: `/admin/blog?item=${p.id}`, fields: [p.title, p.excerpt, p.slug, ...p.categories, p.body] });
  for (const m of messages)
    entries.push({ group: "Messages", title: `${m.first_name} ${m.last_name}`.trim() || m.email, detail: [m.email, m.company].filter(Boolean).join(" · "), tag: m.read ? undefined : "Unread", to: `/admin/messages?item=${m.id}`, fields: [m.first_name, m.last_name, m.email, m.phone, m.company, m.message] });
  for (const r of pending) entries.push({ group: "Reviews", title: r.name, detail: [r.role, r.company].filter(Boolean).join(" · "), tag: "Waiting", to: "/admin/reviews", fields: [r.name, r.email, r.role, r.company, r.quote] });
  for (const r of content.reviews) entries.push({ group: "Reviews", title: r.name, detail: [r.role, r.company].filter(Boolean).join(" · "), tag: hidden(r.active), to: `/admin/reviews?item=${r.id}`, fields: [r.name, r.role, r.company, r.quote] });
  for (const f of content.faqs) entries.push({ group: "FAQ", title: f.question, to: `/admin/faq?item=${f.id}`, fields: [f.question, f.answer] });
  for (const c of content.clients) entries.push({ group: "Clients", title: c.name, to: `/admin/clients?item=${c.id}`, fields: [c.name] });
  for (const s of content.achievements) {
    const number = `${s.prefix}${s.value}${s.suffix}`;
    entries.push({ group: "Numbers", title: `${number}${s.after}`, detail: plain(s.label), to: `/admin/achievements?item=${s.id}`, fields: [number, s.after, s.label] });
  }
  for (const step of content.process) entries.push({ group: "Working process", title: step.title, detail: "Home page", to: `/admin/settings?item=${step.id}`, fields: [step.title, step.text] });

  for (const { path, text } of settingTexts(content.settings)) {
    const place = settingsPlace(path);
    if (!place) continue;
    const field = words(path.filter((part) => !/^\d+$/.test(part)).slice(-1)[0] ?? "");
    const short = plain(text);
    const where = `${place.section} · ${field}`;
    // Short texts are their own title; long ones (articles, paragraphs) are named by where they live.
    entries.push(short.length <= 70 ? { group: "Settings", title: short, detail: where, to: place.to, fields: [text] } : { group: "Settings", title: where, to: place.to, fields: [text] });
  }
  return entries;
}

/** A short piece of `text` around the first matching word. */
function snippet(text: string, terms: string[]) {
  const clean = plain(text);
  const lower = clean.toLowerCase();
  const at = Math.min(...terms.map((t) => lower.indexOf(t)).filter((i) => i >= 0));
  if (!Number.isFinite(at)) return clean.slice(0, 90);
  const start = Math.max(0, at - 36);
  return `${start ? "…" : ""}${clean.slice(start, at + 70)}${at + 70 < clean.length ? "…" : ""}`;
}

/** Text with the search words in bold. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return (
    <>
      {text.split(pattern).map((part, i) =>
        i % 2 ? (
          <mark key={i} className="bg-[#d9f4f7] px-[1px] rounded-[2px] text-inherit">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

type Result = Entry & { line?: string };

function search(entries: Entry[], query: string): { group: string; results: Result[]; more: number }[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const matches = entries.flatMap((entry) => {
    const all = entry.fields.join(" \n ").toLowerCase();
    if (!terms.every((t) => all.includes(t))) return [];
    const title = entry.title.toLowerCase();
    const inTitle = terms.every((t) => title.includes(t));
    // Title matches first, then titles starting with the query, then matches in the text.
    const score = inTitle ? (title.startsWith(terms[0]) ? 0 : 1) : 2;
    // Pages match on hidden keywords, which aren't worth showing.
    const hit = inTitle || entry.group === "Pages" ? undefined : entry.fields.find((field) => terms.some((t) => field.toLowerCase().includes(t)));
    return [{ ...entry, score, line: hit && hit !== entry.title ? snippet(hit, terms) : undefined }];
  });
  return GROUP_ORDER.map((group) => {
    const inGroup = matches.filter((m) => m.group === group).sort((a, b) => a.score - b.score);
    return { group, results: inGroup.slice(0, PER_GROUP), more: Math.max(0, inGroup.length - PER_GROUP) };
  }).filter((g) => g.results.length);
}

export default function AdminSearch({ navigate, messages, pendingReviews }: { navigate: (to: string) => void; messages: Message[]; pendingReviews: PendingReview[] }) {
  const content = useContent();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const index = useMemo(() => buildIndex(content, messages, pendingReviews), [content, messages, pendingReviews]);
  const groups = useMemo(() => search(index, query.trim()), [index, query]);
  const flat = groups.flatMap((g) => g.results);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const showing = open && query.trim().length > 0;

  const close = useCallback(() => setOpen(false), []);
  const go = (result: Result) => {
    setOpen(false);
    setQuery("");
    input.current?.blur();
    navigate(result.to);
  };

  useEffect(() => setActive(0), [query]);

  // Close on a click outside; Ctrl+K or "/" (when not typing) jumps to the box.
  useEffect(() => {
    const onDown = (event: MouseEvent) => box.current && !box.current.contains(event.target as Node) && close();
    const onKey = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLElement && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName));
      if ((event.key === "k" && (event.ctrlKey || event.metaKey)) || (event.key === "/" && !typing)) {
        event.preventDefault();
        input.current?.focus();
        setOpen(true);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [close]);

  // Keep the picked result in view while moving with the arrow keys.
  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") return (setOpen(false), input.current?.blur());
    if (!flat.length) return;
    if (event.key === "ArrowDown") (event.preventDefault(), setActive((active + 1) % flat.length));
    else if (event.key === "ArrowUp") (event.preventDefault(), setActive((active - 1 + flat.length) % flat.length));
    else if (event.key === "Enter") (event.preventDefault(), go(flat[active]));
  };

  let position = -1;
  const row = (result: Result): ReactNode => {
    position += 1;
    const i = position;
    return (
      <li key={`${result.group}-${result.to}-${result.title}-${i}`}>
        <button
          type="button"
          id={`admin-search-${i}`}
          data-index={i}
          className={`cursor-pointer flex flex-col gap-[2px] px-[16px] py-[9px] text-left w-full ${i === active ? "bg-[#f0fafb]" : "hover:bg-[#f7f7f7]"}`}
          onMouseEnter={() => setActive(i)}
          onClick={() => go(result)}
        >
          <span className="flex gap-[8px] items-center min-w-0">
            <span className="font-['Inter:Medium'] font-medium text-[#191919] text-[14px] truncate">
              <Highlight text={result.title} terms={terms} />
            </span>
            {result.tag && <span className={`font-['Inter:Medium'] font-medium px-[6px] py-[1px] rounded-full shrink-0 text-[11px] ${result.tag === "Hidden" ? "bg-[#f1f1f1] text-[#707070]" : "bg-[#fff4e5] text-[#8a5300]"}`}>{result.tag}</span>}
          </span>
          {(result.line || result.detail) && (
            <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px] truncate">
              {result.line ? <Highlight text={result.line} terms={terms} /> : result.detail}
            </span>
          )}
        </button>
      </li>
    );
  };

  return (
    <div ref={box} className="flex-1 max-w-[1000px] relative">
      <label className={`bg-white border flex gap-[10px] h-[56px] items-center px-[16px] rounded-[10px] transition-colors ${showing ? "border-[#00b6ca]" : "border-transparent"}`}>
        <SearchIcon size={22} className="shrink-0 text-[#3e3e3e]" />
        <input
          ref={input}
          role="combobox"
          aria-expanded={showing}
          aria-controls="admin-search-results"
          aria-activedescendant={showing && flat.length ? `admin-search-${active}` : undefined}
          className="bg-transparent font-['Inter:Regular'] outline-none text-[#222] text-[16px] w-full placeholder:text-[#9a9a9a]"
          placeholder="Search services, work, blog, messages, settings…"
          value={query}
          onChange={(e) => (setQuery(e.target.value), setOpen(true))}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        {query ? (
          <button type="button" aria-label="Clear search" className="cursor-pointer font-['Inter:Regular'] px-[6px] text-[#9a9a9a] text-[18px] hover:text-[#191919]" onClick={() => (setQuery(""), input.current?.focus())}>
            ×
          </button>
        ) : (
          <kbd className="border border-[#e3e3e3] font-['Inter:Medium'] font-medium hidden px-[6px] py-[1px] rounded-[4px] shrink-0 text-[#9a9a9a] text-[11px] sm:block">Ctrl K</kbd>
        )}
      </label>

      {showing && (
        <div ref={list} id="admin-search-results" className="absolute bg-white border border-[#ebebeb] left-0 max-h-[min(70vh,560px)] mt-[6px] overflow-y-auto py-[6px] right-0 rounded-[12px] shadow-[0px_12px_32px_rgba(0,0,0,0.14)] z-[40]">
          {groups.map((g) => (
            <section key={g.group} className="py-[4px]">
              <h3 className="font-['Inter:Semi_Bold'] font-semibold px-[16px] py-[6px] text-[#9a9a9a] text-[11px] tracking-[1px] uppercase">{g.group}</h3>
              <ul>{g.results.map(row)}</ul>
              {g.more > 0 && <p className="font-['Inter:Regular'] px-[16px] py-[4px] text-[#9a9a9a] text-[12px]">+{g.more} more — add a word to narrow it down</p>}
            </section>
          ))}
          {!groups.length && (
            <p className="font-['Inter:Regular'] px-[16px] py-[18px] text-[#707070] text-[14px]">
              Nothing found for “{query.trim()}”. Try another word.
            </p>
          )}
          {groups.length > 0 && <p className="border-[#f0f0f0] border-t font-['Inter:Regular'] mt-[4px] px-[16px] pt-[8px] text-[#9a9a9a] text-[11px]">↑ ↓ to move · Enter to open · Esc to close</p>}
        </div>
      )}
    </div>
  );
}
