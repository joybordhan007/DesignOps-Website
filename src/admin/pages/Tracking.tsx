import { useEffect, useState, type ReactNode } from "react";
import { trackingIdProblems, trackingIds } from "../../../server/tracking.js";
import { getContent, useContent } from "@/content/store";
import type { Tracking } from "@/content/types";
import type { PageProps } from "../AdminApp";
import { api } from "../api";
import { card, PageHeader, same, SaveButtons, toast, useDirtyFlag } from "../editor";
import { Fields, type Field } from "../fields";
import { CheckIcon, ExternalIcon } from "../icons";

// Tracking & Analytics: Google Tag Manager and the Meta Pixel, each in its own
// card with its own on/off switch and Save. The tags themselves are built by
// server/tracking.js; the website sends the events (src/lib/tracking.ts).

type Tool = "gtm" | "meta";

const saveTool = <K extends Tool>(key: K, value: Tracking[K]) => {
  const settings = getContent().settings;
  return api.save("settings", { ...settings, tracking: { ...settings.tracking, [key]: value } });
};

function StatusBadge({ state }: { state: "on" | "off" | "bad" | "paused" }) {
  const tone = { on: "bg-[#e7f7ee] text-[#1a7f45]", off: "bg-[#f1f1f1] text-[#6a6a6a]", paused: "bg-[#fff4e5] text-[#8a5300]", bad: "bg-[#fdecec] text-[#c62828]" }[state];
  return (
    <span className={`flex font-['Inter:Medium'] font-medium gap-[4px] items-center px-[10px] py-[3px] rounded-full shrink-0 text-[12px] ${tone}`}>
      {state === "on" && <CheckIcon size={14} />}
      {{ on: "Connected", off: "Not set up", paused: "Switched off", bad: "Check the ID" }[state]}
    </span>
  );
}

function ToolCard<K extends Tool>({
  tool,
  name,
  logo,
  intro,
  link,
  fields,
  events,
}: {
  tool: K;
  name: string;
  logo: ReactNode;
  intro: string;
  link: { href: string; label: string };
  fields: Field[];
  events: [label: string, name: string][];
}) {
  const tracking = useContent().settings.tracking;
  const value = tracking[tool];
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const isDirty = !same(draft, value);
  useDirtyFlag(isDirty);

  useEffect(() => {
    if (!isDirty) setDraft(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Status follows what is saved, not the draft.
  const connected = Boolean(trackingIds(tracking)[tool === "gtm" ? "gtmId" : "metaPixelId"]);
  const problem = trackingIdProblems(tracking)[tool];
  const state = problem ? "bad" : connected ? "on" : value.enabled === false && (tool === "gtm" ? tracking.gtm.containerId : tracking.meta.pixelId).trim() ? "paused" : "off";

  const save = async () => {
    const problems = trackingIdProblems({ ...tracking, [tool]: draft });
    if (problems[tool]) return toast(tool === "gtm" ? "The container ID should look like GTM-ABC1234." : "The Pixel ID should be digits only.", true);
    if (tool === "meta" && problems.verification) return toast("The verification code should be only the content=\"…\" value.", true);
    setSaving(true);
    try {
      await saveTool(tool, draft);
      toast(`${name} saved. The website is updated.`);
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={`${card} flex flex-col`}>
      <header className="border-[#efefef] border-b flex flex-wrap gap-[14px] items-center p-[20px]">
        <span className="flex items-center justify-center rounded-[10px] shrink-0 size-[44px]">{logo}</span>
        <div className="flex flex-[1_1_180px] flex-col gap-[2px] min-w-0">
          <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[17px]">{name}</h2>
          <p className="font-['Inter:Regular'] leading-[1.4] text-[#707070] text-[13px]">{intro}</p>
        </div>
        <StatusBadge state={state} />
      </header>

      <div className="gap-[16px] grid grid-cols-1 p-[20px]">
        <Fields fields={fields} value={draft} onChange={setDraft} />
      </div>

      <div className="flex flex-col gap-[8px] px-[20px] pb-[20px]">
        <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">Sent automatically</span>
        <ul className="flex flex-wrap gap-[6px]">
          {events.map(([label, event]) => (
            <li key={event} title={label} className="bg-[#f4fbfc] border border-[#d6f1f4] flex gap-[6px] items-center px-[8px] py-[3px] rounded-[4px] text-[12px]">
              <span className="font-['Inter:Regular'] text-[#505050]">{label}</span>
              <span className="font-mono text-[#007f8d]">{event}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-[#efefef] border-t flex flex-wrap gap-[10px] items-center justify-between mt-auto px-[20px] py-[14px]">
        <a href={link.href} target="_blank" rel="noreferrer" className="flex font-['Inter:Medium'] font-medium gap-[4px] items-center text-[#00a0b2] text-[13px] hover:underline">
          {link.label} <ExternalIcon size={13} />
        </a>
        <div className="flex gap-[10px]">
          <SaveButtons isDirty={isDirty} saving={saving} onSave={save} onDiscard={() => setDraft(value)} />
        </div>
      </footer>
    </section>
  );
}

const GtmLogo = (
  <span className="bg-[#e8f0fe] flex items-center justify-center rounded-[10px] size-[44px]">
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path fill="#4285f4" d="M12 2.5 21.5 12 12 21.5 2.5 12z" />
      <path fill="#fff" d="M12 8 16 12 12 16 8 12z" />
    </svg>
  </span>
);

const MetaLogo = (
  <span className="bg-[#e7f0ff] flex items-center justify-center rounded-[10px] size-[44px]">
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#0866ff" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M3 12c0-2.8 1.5-5 3.6-5 3.4 0 7.4 10 10.8 10 2.1 0 3.6-2.2 3.6-5s-1.5-5-3.6-5c-3.4 0-7.4 10-10.8 10C4.5 17 3 14.8 3 12z" />
    </svg>
  </span>
);

const gtmFields: Field[] = [
  { type: "toggle", path: "enabled", label: "Add Tag Manager to the website" },
  { type: "text", path: "containerId", label: "Container ID", placeholder: "GTM-XXXXXXX", hint: "Tag Manager → your container → the ID at the top." },
];

const metaFields: Field[] = [
  { type: "toggle", path: "enabled", label: "Add the Meta Pixel to the website" },
  { type: "text", path: "pixelId", label: "Pixel ID", placeholder: "123456789012345", hint: "Events Manager → Data sources → your pixel (digits only)." },
  {
    type: "text",
    path: "domainVerification",
    label: "Domain verification (optional)",
    placeholder: "abc123def456…",
    hint: "Business settings → Domains → Meta-tag: paste only the content=\"…\" value.",
  },
];

export default function TrackingPage(_: PageProps) {
  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeader title="Tracking & Analytics" description="Connect Google Tag Manager and the Meta Pixel. Tags are added to the public website only, never to this dashboard." />

      <div className="gap-[20px] grid grid-cols-1 items-stretch xl:grid-cols-2">
        <ToolCard
          tool="gtm"
          name="Google Tag Manager"
          logo={GtmLogo}
          intro="Add GA4, Google Ads and other tags from inside Tag Manager."
          link={{ href: "https://tagmanager.google.com/", label: "Open Tag Manager" }}
          fields={gtmFields}
          events={[
            ["Page view", "page_view"],
            ["Contact form", "generate_lead"],
            ["Phone / email click", "contact_click"],
            ["Review sent", "review_submitted"],
          ]}
        />
        <ToolCard
          tool="meta"
          name="Meta Pixel"
          logo={MetaLogo}
          intro="Measure Facebook and Instagram ads and build audiences."
          link={{ href: "https://business.facebook.com/events_manager2", label: "Open Events Manager" }}
          fields={metaFields}
          events={[
            ["Page view", "PageView"],
            ["Contact form", "Lead"],
            ["Phone / email click", "Contact"],
            ["Review sent", "ReviewSubmitted"],
          ]}
        />
      </div>
    </div>
  );
}
