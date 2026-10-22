import { useState } from "react";
import { getContent, useContent } from "@/content/store";
import type { ProcessStep, Settings } from "@/content/types";
import type { PageProps } from "../AdminApp";
import { api } from "../api";
import { CollectionEditor, ObjectEditor } from "../editor";
import { newId, type Field } from "../fields";

// Website Settings: everything that isn't a list — SEO, page heroes, section
// headings and other page texts, the working-process steps, and the footer.

/** Saves some top-level settings keys, keeping the rest as they are on the server. */
const saveSettings = (partial: Partial<Settings>) => api.save("settings", { ...getContent().settings, ...partial });

const heroFields = (key: string, label: string): Field => ({
  type: "group",
  label,
  fields: [
    { type: "rich", path: `${key}.title`, label: "Title", rows: 2 },
    { type: "textarea", path: `${key}.text`, label: "Text", rows: 2, hint: "Press Enter for a line break on desktop." },
    { type: "video", path: `${key}.video`, label: "Background video", wide: true, hint: "MP4 or WebM. Keep it short and small (2–5 MB) so pages load fast." },
  ],
});

const titleField = (key: string, label: string): Field => ({
  type: "group",
  label,
  fields: [
    { type: "text", path: `titles.${key}.lead`, label: "Dark part" },
    { type: "textarea", path: `titles.${key}.muted`, label: "Grey part", rows: 2, wide: false, hint: "Enter = line break on desktop." },
  ],
});

const TABS = [
  { key: "seo", label: "SEO" },
  { key: "heroes", label: "Page heroes" },
  { key: "home", label: "Home page texts" },
  { key: "process", label: "Working process" },
  { key: "company", label: "Company page" },
  { key: "footer", label: "Footer" },
] as const;

type Tab = (typeof TABS)[number]["key"];

export default function SettingsPage({ focusId }: PageProps) {
  const { settings, process } = useContent();
  const [tab, setTab] = useState<Tab>("seo");

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[4px]">
        <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#191919] text-[24px]">Website Settings</h1>
        <p className="font-['Inter:Regular'] text-[#707070] text-[14px]">Page texts, videos, search engine details and the footer.</p>
      </div>
      <div className="bg-white flex flex-wrap gap-[4px] p-[4px] rounded-[8px] self-start shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`cursor-pointer font-['Inter:Medium'] font-medium px-[16px] py-[8px] rounded-[6px] text-[14px] ${tab === item.key ? "bg-[#00b6ca] text-white" : "text-[#3e3e3e] hover:bg-[#f4fbfc]"}`}
            onClick={() => setTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "seo" && (
        <ObjectEditor
          embedded
          title="Search engines & sharing"
          description="The title shown in the browser tab and on Google, and the description under it."
          value={settings.seo}
          fields={[
            { type: "text", path: "title", label: "Site title", required: true, wide: true },
            { type: "textarea", path: "description", label: "Description", rows: 3, hint: "About 150 characters works best." },
          ]}
          onSave={(seo) => saveSettings({ seo })}
        />
      )}

      {tab === "heroes" && (
        <ObjectEditor
          embedded
          title="Page heroes"
          description="The big video banner at the top of each page."
          value={settings.heroes}
          fields={[heroFields("home", "Home"), heroFields("services", "Services"), heroFields("work", "Work"), heroFields("blog", "Blog"), heroFields("company", "Company")]}
          onSave={(heroes) => saveSettings({ heroes })}
        />
      )}

      {tab === "home" && (
        <ObjectEditor
          embedded
          title="Home page texts & section headings"
          description="Section headings are also used on other pages (e.g. Growth Insights, reviews, FAQ)."
          value={{ vision: settings.vision, titles: settings.titles, cta: settings.cta }}
          fields={[
            { type: "rich", path: "vision", label: "“We aspire…” statement", rows: 3 },
            titleField("clients", "Clients heading"),
            titleField("stats", "Numbers heading"),
            titleField("services", "Services heading"),
            titleField("projects", "Work heading"),
            titleField("process", "Working process heading"),
            titleField("insights", "Growth Insights heading"),
            titleField("reviews", "Reviews heading"),
            titleField("faq", "FAQ heading (Contact page)"),
            {
              type: "group",
              label: "Call to action (bottom of most pages)",
              fields: [
                { type: "rich", path: "cta.title", label: "Title", rows: 2 },
                { type: "textarea", path: "cta.text", label: "Text", rows: 2 },
              ],
            },
          ]}
          onSave={(value) => saveSettings(value)}
        />
      )}

      {tab === "process" && (
        <CollectionEditor<ProcessStep>
          config={{
            title: "Working process",
            singular: "Step",
            description: "The numbered steps on the Home page and service pages. Hovering a step shows its picture.",
            fields: [
              { type: "text", path: "title", label: "Title", required: true },
              { type: "textarea", path: "text", label: "Text", rows: 3, hint: "Press Enter for a line break on desktop." },
              { type: "image", path: "image", label: "Picture", wide: true },
            ],
            newItem: () => ({ id: newId("step"), title: "", text: "", image: "" }),
            itemTitle: (s) => s.title,
            itemImage: (s) => s.image,
          }}
          items={process}
          onSave={(items) => api.save("process", items)}
          focusId={focusId}
        />
      )}

      {tab === "company" && (
        <ObjectEditor
          embedded
          title="Company page"
          value={settings.company}
          fields={[
            { type: "textarea", path: "quote", label: "Quote", rows: 3, hint: "Press Enter for a line break on desktop." },
            { type: "text", path: "quoteAuthor", label: "Quote author" },
            { type: "text", path: "missionLabel", label: "Mission label" },
            { type: "rich", path: "missionTitle", label: "Mission heading", rows: 2, hint: "*Starred* words are shown in grey." },
            { type: "textarea", path: "missionText", label: "Mission text", rows: 5, hint: "Leave an empty line between paragraphs." },
            { type: "image", path: "missionImage", label: "Mission picture", wide: true },
          ]}
          onSave={(company) => saveSettings({ company })}
        />
      )}

      {tab === "footer" && (
        <ObjectEditor
          embedded
          title="Footer"
          description="Phone, email and address come from Contact Management; service links from Services."
          value={settings.footer}
          fields={[
            { type: "textarea", path: "text", label: "Intro text", rows: 2 },
            { type: "text", path: "copyright", label: "Copyright line" },
            { type: "url", path: "linkedin", label: "LinkedIn URL" },
            { type: "url", path: "facebook", label: "Facebook URL" },
          ]}
          onSave={(footer) => saveSettings({ footer })}
        />
      )}
    </div>
  );
}
