import { useState, type ComponentType } from "react";
import SocialIcon, { SOCIAL_PLATFORMS, socialLabel } from "@/components/SocialIcon";
import { getContent, useContent } from "@/content/store";
import type { ProcessStep, Settings, SocialLink, SocialPlatform } from "@/content/types";
import type { PageProps } from "../AdminApp";
import { api } from "../api";
import { card, CollectionEditor, confirmLeave, ObjectEditor, PageHeader } from "../editor";
import { inputClass, newId, smallButton, type Field } from "../fields";
import { ClientIcon, ContactIcon, DashboardIcon, DownIcon, EditIcon, EyeIcon, MailIcon, PlusIcon, ProcessIcon, ReviewIcon, SearchIcon, TrashIcon, UpIcon } from "../icons";

// Website Settings: everything that isn't a list — SEO, contact details, page
// heroes and their videos, section headings and other page texts, the Home
// working-process steps, the footer, and the small labels and buttons.

/** Saves some top-level settings keys, keeping the rest as they are on the server. */
const saveSettings = (partial: Partial<Settings>) => api.save("settings", { ...getContent().settings, ...partial });

const heroFields = (key: string, label: string): Field => ({
  type: "group",
  collapsible: true,
  label,
  fields: [
    { type: "rich", path: `${key}.title`, label: "Title", rows: 2 },
    { type: "textarea", path: `${key}.text`, label: "Text", rows: 2 },
  ],
});

const titleField = (key: string, label: string): Field => ({
  type: "group",
  collapsible: true,
  label,
  fields: [
    { type: "text", path: `titles.${key}.lead`, label: "Dark part" },
    { type: "textarea", path: `titles.${key}.muted`, label: "Grey part", rows: 2, wide: false },
  ],
});

const texts = (label: string, items: [path: string, label: string][], hint?: string): Field => ({
  type: "group",
  collapsible: true,
  label,
  hint,
  fields: items.map(([path, itemLabel]) => ({ type: "text", path, label: itemLabel })),
});

/** Footer social icons: add, reorder and remove links; each shows its icon. */
function SocialLinksEditor({ value, onChange }: { value: SocialLink[] | undefined; onChange: (next: SocialLink[]) => void }) {
  const links = value ?? [];
  const update = (i: number, patch: Partial<SocialLink>) => onChange(links.map((link, j) => (j === i ? { ...link, ...patch } : link)));
  const move = (i: number, d: number) => {
    const next = [...links];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const unused = SOCIAL_PLATFORMS.find((p) => !links.some((link) => link.platform === p.value))?.value ?? "website";

  return (
    <div className="flex flex-col gap-[10px]">
      {links.map((link, i) => {
        const badUrl = link.url.trim() !== "" && !/^(https?:\/\/|mailto:|tel:)/i.test(link.url.trim());
        return (
          <div key={link.id} className="bg-[#fafafa] border border-[#ececec] flex flex-wrap gap-[10px] items-center p-[10px] rounded-[8px]">
            <span className="bg-[#191919] flex items-center justify-center rounded-full shrink-0 size-[40px] text-[#00b6ca]">
              <SocialIcon platform={link.platform} size={18} />
            </span>
            <select
              aria-label="Network"
              className={`${inputClass} !w-[170px] cursor-pointer`}
              value={link.platform}
              onChange={(e) => update(i, { platform: e.target.value as SocialPlatform })}
            >
              {SOCIAL_PLATFORMS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="flex flex-[1_1_260px] flex-col gap-[4px] min-w-0">
              <input
                type="url"
                aria-label={`${socialLabel(link.platform)} link`}
                className={`${inputClass} ${badUrl ? "!border-[#e5484d]" : ""}`}
                placeholder={link.platform === "whatsapp" ? "https://wa.me/8801XXXXXXXXX" : "https://…"}
                value={link.url}
                onChange={(e) => update(i, { url: e.target.value })}
              />
              {badUrl && <span className="font-['Inter:Regular'] text-[#e5484d] text-[12px]">Start the link with https://</span>}
            </div>
            <div className="flex gap-[2px] ml-auto text-[#8a8a8a]">
              <button type="button" aria-label="Move up" disabled={i === 0} className="cursor-pointer p-[6px] rounded-[6px] disabled:opacity-30 hover:bg-white hover:text-[#00b6ca]" onClick={() => move(i, -1)}>
                <UpIcon size={18} />
              </button>
              <button type="button" aria-label="Move down" disabled={i === links.length - 1} className="cursor-pointer p-[6px] rounded-[6px] disabled:opacity-30 hover:bg-white hover:text-[#00b6ca]" onClick={() => move(i, 1)}>
                <DownIcon size={18} />
              </button>
              <button
                type="button"
                aria-label={`Delete ${socialLabel(link.platform)}`}
                className="cursor-pointer p-[6px] rounded-[6px] hover:bg-[#fdecec] hover:text-[#e5484d]"
                onClick={() => (!link.url.trim() || confirm(`Delete the ${socialLabel(link.platform)} link?`)) && onChange(links.filter((_, j) => j !== i))}
              >
                <TrashIcon size={18} />
              </button>
            </div>
          </div>
        );
      })}
      {!links.length && <p className="border border-[#e3e3e3] border-dashed font-['Inter:Regular'] px-[14px] py-[16px] rounded-[8px] text-[#8a8a8a] text-[14px]">No social links yet. The footer shows no icons until you add one.</p>}
      <button type="button" className={`${smallButton} self-start`} onClick={() => onChange([...links, { id: newId("social"), platform: unused, url: "" }])}>
        <PlusIcon size={16} /> Add social link
      </button>
    </div>
  );
}

const labelFields: Field[] = [
  texts("Menu & footer page links", [
    ["nav.home", "Home"],
    ["nav.services", "Services"],
    ["nav.work", "Work"],
    ["nav.blog", "Blog"],
    ["nav.company", "Company"],
    ["nav.reviews", "Reviews"],
  ]),
  texts("Buttons", [
    ["buttons.startProject", "Start a project (heroes)"],
    ["buttons.letsTalk", "Let's talk (menu, blog)"],
    ["buttons.learnMore", "Learn more (Services page)"],
    ["buttons.viewCaseStudy", "View case study (project cards)"],
    ["buttons.allArticles", "All articles (Growth Insights)"],
    ["buttons.allReviews", "All reviews (reviews strip)"],
    ["buttons.readNow", "Read now (blog cards)"],
    ["buttons.writeReview", "Write a review (Reviews page)"],
    ["buttons.backToHome", "Back to home (404 page)"],
    ["buttons.contactUs", "Contact us (404 page)"],
  ]),
  texts("Page heroes & project cards", [
    ["scrollDown", "“Scroll down” hint"],
    ["projectCard.pages", "Project card: pages label"],
    ["projectCard.duration", "Project card: duration label"],
  ]),
  {
    type: "group",
    collapsible: true,
    label: "Science · Technology · Design animation (Home page)",
    fields: [
      { type: "text", path: "science.science", label: "Left word" },
      { type: "text", path: "science.technology", label: "Middle word" },
      { type: "text", path: "science.design", label: "Right word" },
      { type: "textarea", path: "science.research", label: "Bottom-left note", rows: 2, wide: false },
      { type: "textarea", path: "science.digital", label: "Top note", rows: 2, wide: false },
      { type: "textarea", path: "science.customer", label: "Right note", rows: 2, wide: false },
    ],
  },
  texts("Work details page", [
    ["workDetails.overview", "Overview label"],
    ["workDetails.goals", "Goals heading"],
    ["workDetails.challenge", "Challenge tag"],
    ["workDetails.solution", "Solution tag"],
    ["workDetails.palette", "Colour palette heading"],
    ["workDetails.tools", "Tools heading"],
  ]),
  texts("Blog article page", [
    ["blogDetails.newsletterTitle", "Cyan card title"],
    ["blogDetails.newsletterText", "Cyan card text"],
    ["blogDetails.newsletterLink", "Cyan card underlined words"],
    ["blogDetails.ctaTitle", "Black card title"],
    ["blogDetails.toc", "Table of contents heading"],
  ]),
  texts("Footer", [
    ["footer.quickLinks", "Page links heading"],
    ["footer.support", "Support heading"],
    ["footer.contactUs", "Contact link"],
    ["footer.faq", "FAQ link"],
    ["footer.services", "Services heading"],
    ["footer.contactInfo", "Contact info heading"],
    ["footer.privacy", "Privacy policy"],
    ["footer.terms", "Terms of service"],
  ]),
  {
    type: "group",
    collapsible: true,
    label: "404 page",
    fields: [
      { type: "text", path: "notFound.badge", label: "Badge" },
      { type: "rich", path: "notFound.title", label: "Heading", rows: 2, hint: "*Starred* words are shown in cyan." },
      { type: "textarea", path: "notFound.text", label: "Text", rows: 2 },
      { type: "text", path: "notFound.popular", label: "Links heading" },
    ],
  },
  {
    type: "group",
    collapsible: true,
    label: "Reviews page & “Write a review” popup",
    fields: [
      { type: "text", path: "reviews.empty", label: "Text when there are no reviews", wide: true },
      { type: "text", path: "reviews.countText", label: "Rating card count", hint: "{n} becomes the number of published reviews." },
      { type: "text", path: "reviews.formTitle", label: "Popup title" },
      { type: "text", path: "reviews.formSubmit", label: "Submit button" },
      { type: "textarea", path: "reviews.formText", label: "Popup text", rows: 2 },
      { type: "text", path: "reviews.thanksTitle", label: "Thank-you title" },
      { type: "textarea", path: "reviews.thanksText", label: "Thank-you text", rows: 2 },
      { type: "text", path: "reviews.rating", label: "Field: rating" },
      { type: "text", path: "reviews.name", label: "Field: name" },
      { type: "text", path: "reviews.email", label: "Field: email" },
      { type: "text", path: "reviews.role", label: "Field: role" },
      { type: "text", path: "reviews.company", label: "Field: company" },
      { type: "text", path: "reviews.quote", label: "Field: review" },
      { type: "text", path: "reviews.photo", label: "Field: photo" },
      { type: "text", path: "reviews.optional", label: "“Optional” tag" },
    ],
  },
  {
    type: "group",
    collapsible: true,
    label: "Contact form",
    fields: [
      { type: "text", path: "contactForm.firstName", label: "First name label" },
      { type: "text", path: "contactForm.lastName", label: "Last name label" },
      { type: "text", path: "contactForm.email", label: "Email label" },
      { type: "text", path: "contactForm.phone", label: "Phone label" },
      { type: "text", path: "contactForm.company", label: "Company label" },
      { type: "text", path: "contactForm.time", label: "Contact time label" },
      { type: "text", path: "contactForm.timePlaceholder", label: "Contact time placeholder" },
      { type: "lines", path: "contactForm.times", label: "Contact time choices (one per line)", rows: 4, wide: false },
      { type: "text", path: "contactForm.message", label: "Message label" },
      { type: "text", path: "contactForm.messagePlaceholder", label: "Message placeholder" },
      { type: "text", path: "contactForm.submit", label: "Send button" },
      { type: "textarea", path: "contactForm.sent", label: "Message after sending", rows: 2 },
    ],
  },
];

type Section = {
  key: string;
  label: string;
  note: string;
  icon: ComponentType<{ size?: number }>;
};

const GROUPS: { title: string; sections: Section[] }[] = [
  {
    title: "General",
    sections: [
      { key: "seo", label: "Search & sharing", note: "Site title and description", icon: SearchIcon },
      { key: "contact", label: "Contact details", note: "Phone, email, address", icon: ContactIcon },
      { key: "footer", label: "Footer & social", note: "Footer text and social links", icon: MailIcon },
    ],
  },
  {
    title: "Pages",
    sections: [
      { key: "heroes", label: "Page banners", note: "Hero videos and texts", icon: EyeIcon },
      { key: "home", label: "Home page", note: "Headings and statement", icon: DashboardIcon },
      { key: "process", label: "Home working process", note: "Steps on the Home page", icon: ProcessIcon },
      { key: "company", label: "Company page", note: "Quote and mission", icon: ClientIcon },
      { key: "reviews", label: "Reviews page", note: "Page heading", icon: ReviewIcon },
    ],
  },
  {
    title: "Texts",
    sections: [{ key: "labels", label: "Buttons & labels", note: "Small texts around the site", icon: EditIcon }],
  },
];

const SECTIONS = GROUPS.flatMap((group) => group.sections);

/** The open section is kept in the address (#contact…) so a reload stays put. */
const sectionFromHash = () => SECTIONS.find((s) => `#${s.key}` === window.location.hash)?.key;

export default function SettingsPage({ focusId }: PageProps) {
  const { settings, process } = useContent();
  const [section, setSection] = useState(() => (focusId && process.some((step) => step.id === focusId) ? "process" : (sectionFromHash() ?? "seo")));
  const open = (key: string) => {
    if (key === section || !confirmLeave()) return;
    setSection(key);
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#${key}`);
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeader title="Website Settings" description="Texts, videos and details used across the website. Changes go live when you save." />

      <div className="gap-[24px] grid grid-cols-1 items-start lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Phones: a simple dropdown. */}
        <select aria-label="Settings section" className={`${inputClass} cursor-pointer lg:hidden`} value={section} onChange={(e) => open(e.target.value)}>
          {GROUPS.map((group) => (
            <optgroup key={group.title} label={group.title}>
              {group.sections.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <nav aria-label="Settings sections" className={`${card} flex-col gap-[16px] hidden p-[12px] sticky top-[124px] lg:flex`}>
          {GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-[2px]">
              <p className="font-['Inter:Semi_Bold'] font-semibold pb-[4px] pt-[4px] px-[10px] text-[#9a9a9a] text-[11px] tracking-[1px] uppercase">{group.title}</p>
              {group.sections.map((item) => {
                const active = item.key === section;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    type="button"
                    aria-current={active ? "page" : undefined}
                    className={`cursor-pointer flex gap-[12px] items-center px-[10px] py-[9px] rounded-[8px] text-left transition-colors ${active ? "bg-[#e9f9fb]" : "hover:bg-[#f6f6f6]"}`}
                    onClick={() => open(item.key)}
                  >
                    <span className={`flex items-center justify-center rounded-[8px] shrink-0 size-[34px] ${active ? "bg-[#00b6ca] text-white" : "bg-[#f2f2f2] text-[#707070]"}`}>
                      <Icon size={18} />
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className={`font-['Inter:Medium'] font-medium text-[14px] truncate ${active ? "text-[#007f8d]" : "text-[#222]"}`}>{item.label}</span>
                      <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px] truncate">{item.note}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div key={section} className="min-w-0">
          {section === "seo" && (
            <ObjectEditor
              embedded
              title="Search & sharing"
              description="How the website appears on Google and when a link is shared."
              value={settings.seo}
              fields={[
                { type: "text", path: "title", label: "Site title", required: true, wide: true },
                { type: "textarea", path: "description", label: "Description", rows: 3, hint: "About 150 characters works best." },
              ]}
              onSave={(seo) => saveSettings({ seo })}
            />
          )}

          {section === "contact" && (
            <ObjectEditor
              embedded
              title="Contact details"
              description="Shown on the Contact page and in the footer. Form messages are under Messages."
              value={settings.contact}
              fields={[
                { type: "text", path: "phone", label: "Phone", required: true },
                { type: "text", path: "email", label: "Email", required: true },
                { type: "textarea", path: "address", label: "Address", rows: 2 },
                {
                  type: "group",
                  collapsible: true,
                  label: "Contact page texts",
                  hint: "Title, subtitle and the info card",
                  fields: [
                    { type: "rich", path: "title", label: "Title", rows: 1 },
                    { type: "textarea", path: "subtitle", label: "Subtitle", rows: 2 },
                    { type: "text", path: "infoTitle", label: "Info card title" },
                    { type: "textarea", path: "infoText", label: "Info card text", rows: 3 },
                  ],
                },
              ]}
              onSave={(contact) => saveSettings({ contact })}
            />
          )}

          {section === "footer" && (
            <ObjectEditor
              embedded
              title="Footer & social"
              description="Phone, email and address come from Contact details; service links from Services."
              value={settings.footer}
              fields={[
                { type: "textarea", path: "text", label: "Intro text", rows: 2 },
                { type: "text", path: "copyright", label: "Copyright line" },
                {
                  type: "custom",
                  path: "socials",
                  label: "Social media links",
                  hint: "Shown as icons in this order. Empty links are hidden.",
                  render: (value, onChange) => <SocialLinksEditor value={value} onChange={onChange} />,
                },
              ]}
              onSave={(footer) => saveSettings({ footer })}
            />
          )}

          {section === "heroes" && (
            <ObjectEditor
              embedded
              title="Page banners"
              description="The video banner at the top of each page. Home has its own video; the other pages share one."
              value={{ heroes: settings.heroes, heroVideos: settings.heroVideos }}
              fields={[
                {
                  type: "group",
                  label: "Videos",
                  hint: "MP4 or WebM, ideally 2–5 MB.",
                  fields: [
                    { type: "video", path: "heroVideos.home", label: "Home page" },
                    { type: "video", path: "heroVideos.pages", label: "All other pages" },
                  ],
                },
                heroFields("heroes.home", "Home"),
                heroFields("heroes.services", "Services"),
                heroFields("heroes.work", "Work"),
                heroFields("heroes.blog", "Blog"),
                heroFields("heroes.company", "Company"),
              ]}
              onSave={(value) => saveSettings(value)}
            />
          )}

          {section === "home" && (
            <ObjectEditor
              embedded
              title="Home page"
              description="Section headings are reused on other pages too (Growth Insights, reviews, FAQ)."
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
                  collapsible: true,
                  label: "Call to action",
                  hint: "The banner at the bottom of most pages",
                  fields: [
                    { type: "rich", path: "cta.title", label: "Title", rows: 2 },
                    { type: "textarea", path: "cta.text", label: "Text", rows: 2 },
                  ],
                },
              ]}
              onSave={(value) => saveSettings(value)}
            />
          )}

          {section === "process" && (
            <CollectionEditor<ProcessStep>
              config={{
                title: "Home working process",
                singular: "Step",
                description: "The numbered steps on the Home page. Each service has its own steps under Services.",
                fields: [
                  { type: "text", path: "title", label: "Title", required: true },
                  { type: "textarea", path: "text", label: "Text", rows: 3 },
                  { type: "image", path: "image", label: "Picture (shown on hover)", wide: true },
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

          {section === "company" && (
            <ObjectEditor
              embedded
              title="Company page"
              value={settings.company}
              fields={[
                { type: "textarea", path: "quote", label: "Quote", rows: 3 },
                { type: "text", path: "quoteAuthor", label: "Quote author" },
                { type: "text", path: "missionLabel", label: "Mission label" },
                { type: "rich", path: "missionTitle", label: "Mission heading", rows: 2 },
                { type: "textarea", path: "missionText", label: "Mission text", rows: 5, hint: "Leave an empty line between paragraphs." },
                { type: "image", path: "missionImage", label: "Mission picture", wide: true },
              ]}
              onSave={(company) => saveSettings({ company })}
            />
          )}

          {section === "reviews" && (
            <ObjectEditor
              embedded
              title="Reviews page"
              description="The heading of the Reviews page. Reviews themselves are in Review Management."
              value={settings.reviewsPage}
              fields={[
                { type: "rich", path: "title", label: "Title", rows: 2 },
                { type: "textarea", path: "subtitle", label: "Text", rows: 2 },
              ]}
              onSave={(reviewsPage) => saveSettings({ reviewsPage })}
            />
          )}

          {section === "labels" && (
            <ObjectEditor
              embedded
              title="Buttons & labels"
              description="Small fixed texts around the site. Only the words change; sizes and styles stay as designed."
              value={settings.labels}
              fields={labelFields}
              onSave={(labels) => saveSettings({ labels })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
