import { useState } from "react";
import { postUrl, projectUrl, serviceUrl } from "@/content/helpers";
import { getContent, useContent } from "@/content/store";
import type { Client, Faq, Post, Project, Review, Service, Stat } from "@/content/types";
import type { PageProps } from "../AdminApp";
import { api } from "../api";
import { CollectionEditor, ObjectEditor, type CollectionConfig } from "../editor";
import { newId, type Field } from "../fields";

// Admin pages for the website's lists (services, work, blog, clients, reviews,
// achievements, FAQ). Each one edits the list and saves it in one go.

// ---------------------------------------------------------------- services

const serviceFields: Field[] = [
  {
    type: "group",
    label: "Basics",
    fields: [
      { type: "text", path: "title", label: "Service name", required: true, placeholder: "UI/UX Design" },
      { type: "slug", path: "slug", label: "Page address", from: "title", required: true },
      { type: "text", path: "eyebrow", label: "Small label (Services page)", placeholder: "Design" },
      { type: "text", path: "name", label: "Big title (Services page)", placeholder: "UI/UX" },
      { type: "textarea", path: "summary", label: "Short text (Home page card)", rows: 3 },
      { type: "textarea", path: "description", label: "Text (Services page)", rows: 4 },
      { type: "image", path: "image", label: "Picture (Services page)", wide: true },
      { type: "image", path: "numberImage", label: "Big number artwork (Home card, optional)", wide: true, hint: "Leave empty to show a plain number instead." },
    ],
  },
  {
    type: "group",
    label: "Service details page",
    fields: [
      { type: "rich", path: "detail.tagline", label: "Tagline (top right)" },
      { type: "image", path: "detail.image", label: "Main picture", wide: true },
      { type: "rich", path: "detail.intro", label: "Intro heading" },
      { type: "textarea", path: "detail.body", label: "Intro text", rows: 4 },
      { type: "lines", path: "detail.features", label: "What's included (one per line)" },
      { type: "rich", path: "detail.deliverablesTitle", label: "Deliverables heading" },
      {
        type: "objects",
        path: "detail.deliverables",
        label: "Deliverables",
        newItem: () => ({ title: "", text: "" }),
        itemLabel: (item) => item.title,
        fields: [
          { type: "text", path: "title", label: "Title" },
          { type: "text", path: "text", label: "Description" },
        ],
      },
    ],
  },
];

const servicesConfig: CollectionConfig<Service> = {
  title: "Services",
  singular: "Service",
  description: "Shown on the Home page, the Services page, the footer, and each service's own details page.",
  fields: serviceFields,
  newItem: () => ({
    id: newId("service"),
    slug: "",
    title: "",
    eyebrow: "",
    name: "",
    summary: "",
    description: "",
    image: "",
    numberImage: "",
    detail: { tagline: "", image: "", intro: "", body: "", features: [], deliverablesTitle: "What You Get From Our *End-to-End Digital* Expertise", deliverables: [] },
  }),
  itemTitle: (s) => s.title,
  itemSubtitle: (s) => `/services/${s.slug}`,
  itemImage: (s) => s.image,
  viewUrl: serviceUrl,
};

export function ServicesPage({ focusId }: PageProps) {
  const { services } = useContent();
  return <CollectionEditor config={servicesConfig} items={services} onSave={(items) => api.save("services", items)} focusId={focusId} />;
}

// ---------------------------------------------------------------- work

const projectFields: Field[] = [
  {
    type: "group",
    label: "Card",
    fields: [
      { type: "text", path: "title", label: "Project name", required: true },
      { type: "slug", path: "slug", label: "Page address", from: "title", required: true },
      { type: "text", path: "category", label: "Category", placeholder: "Mobile App Design" },
      { type: "toggle", path: "featured", label: "Show on the Home page" },
      { type: "textarea", path: "summary", label: "Short description", rows: 3 },
      { type: "text", path: "pages", label: "Pages in project", placeholder: "100+" },
      { type: "text", path: "duration", label: "Project duration", placeholder: "2 Months" },
      { type: "url", path: "website", label: "Website", placeholder: "https://" },
      { type: "image", path: "cover", label: "Card image", wide: true },
    ],
  },
  {
    type: "group",
    label: "Work details page",
    fields: [
      { type: "text", path: "detail.heading", label: "Page heading", wide: true },
      { type: "image", path: "detail.heroImage", label: "Main image", wide: true },
      { type: "textarea", path: "detail.overview", label: "Project overview", rows: 4 },
      { type: "textarea", path: "detail.goals", label: "Goals", rows: 4 },
      { type: "lines", path: "detail.goalPoints", label: "Goal bullet points" },
    ],
  },
  {
    type: "group",
    label: "The Challenge",
    fields: [
      { type: "text", path: "detail.challenge.title", label: "Title", wide: true },
      { type: "textarea", path: "detail.challenge.text", label: "Text" },
      { type: "lines", path: "detail.challenge.points", label: "Problems (one per line)" },
      { type: "image", path: "detail.challenge.image", label: "Image", wide: true },
    ],
  },
  {
    type: "group",
    label: "The Solution",
    fields: [
      { type: "text", path: "detail.solution.title", label: "Title" },
      { type: "text", path: "detail.solution.text", label: "Subtitle" },
      { type: "image", path: "detail.solution.image", label: "Large image", wide: true },
      { type: "text", path: "detail.solution.imageTitle", label: "Image caption title" },
      { type: "text", path: "detail.solution.imageText", label: "Image caption text" },
      {
        type: "objects",
        path: "detail.solution.features",
        label: "Feature cards",
        newItem: () => ({ icon: "", title: "", text: "" }),
        itemLabel: (item) => item.title,
        fields: [
          { type: "text", path: "title", label: "Title" },
          { type: "text", path: "text", label: "Text" },
          { type: "image", path: "icon", label: "Icon", wide: true },
        ],
      },
      { type: "text", path: "detail.solution.stat.value", label: "Highlight number", placeholder: "10x" },
      { type: "text", path: "detail.solution.stat.title", label: "Highlight title" },
      { type: "text", path: "detail.solution.stat.text", label: "Highlight text", wide: true },
    ],
  },
  {
    type: "group",
    label: "Colours & tools",
    fields: [
      { type: "colors", path: "detail.palette", label: "Colour palette" },
      { type: "lines", path: "detail.tags", label: "Technologies & tools (one per line)" },
    ],
  },
];

const workConfig: CollectionConfig<Project> = {
  title: "Work",
  singular: "Project",
  description: "Projects on the Home page (featured ones) and the Work page — the first four are stacked cards, the rest a grid — each with its own details page.",
  fields: projectFields,
  newItem: () => {
    const sample = structuredClone(getContent().projects[0]?.detail);
    return {
      id: newId("project"),
      slug: "",
      title: "",
      category: "",
      summary: "",
      pages: "",
      duration: "",
      website: "",
      cover: "",
      featured: false,
      detail: sample ?? {
        heading: "",
        heroImage: "",
        overview: "",
        goals: "",
        goalPoints: [],
        challenge: { title: "", text: "", points: [], image: "" },
        solution: { title: "", text: "", image: "", imageTitle: "", imageText: "", features: [], stat: { value: "", title: "", text: "" } },
        palette: [],
        tags: [],
      },
    };
  },
  itemTitle: (p) => p.title,
  itemSubtitle: (p) => `${p.category}${p.featured ? " · on Home" : ""}`,
  itemImage: (p) => p.cover,
  viewUrl: projectUrl,
};

export function WorkPage({ focusId }: PageProps) {
  const { projects } = useContent();
  return <CollectionEditor config={workConfig} items={projects} onSave={(items) => api.save("projects", items)} focusId={focusId} />;
}

// ---------------------------------------------------------------- blog

const today = () => new Date().toISOString().slice(0, 10);

const blogConfig: CollectionConfig<Post> = {
  title: "Blog Management",
  singular: "Post",
  description: "Posts are listed newest first on the Blog page; the three newest also appear in “Growth Insights”.",
  fields: [
    { type: "text", path: "title", label: "Title", required: true, wide: true },
    { type: "slug", path: "slug", label: "Page address", from: "title", required: true },
    { type: "date", path: "date", label: "Publish date", required: true },
    { type: "lines", path: "categories", label: "Categories (one per line)", rows: 2, wide: false },
    { type: "image", path: "image", label: "Cover image", wide: true },
    { type: "textarea", path: "excerpt", label: "Excerpt (shown on the Blog page)", rows: 3 },
    { type: "markdown", path: "body", label: "Article" },
  ],
  newItem: () => ({ id: newId("post"), slug: "", title: "", excerpt: "", categories: ["UI Design"], date: today(), image: "", body: "" }),
  itemTitle: (p) => p.title,
  itemSubtitle: (p) => p.date,
  itemImage: (p) => p.image,
  viewUrl: postUrl,
};

export function BlogPage({ focusId }: PageProps) {
  const { posts } = useContent();
  return <CollectionEditor config={blogConfig} items={posts} onSave={(items) => api.save("posts", items)} focusId={focusId} />;
}

// ---------------------------------------------------------------- clients

const clientsConfig: CollectionConfig<Client> = {
  title: "Client Management",
  singular: "Client",
  description: "Logos in the “Our Clients” carousel on the Home page.",
  fields: [
    { type: "text", path: "name", label: "Client name", required: true },
    { type: "image", path: "logo", label: "Logo", required: true, wide: true, hint: "PNG or SVG with a transparent background looks best." },
  ],
  newItem: () => ({ id: newId("client"), name: "", logo: "" }),
  itemTitle: (c) => c.name,
  itemImage: (c) => c.logo,
};

export function ClientsPage({ focusId }: PageProps) {
  const { clients } = useContent();
  return <CollectionEditor config={clientsConfig} items={clients} onSave={(items) => api.save("clients", items)} focusId={focusId} />;
}

// ---------------------------------------------------------------- reviews

const reviewsConfig: CollectionConfig<Review> = {
  title: "Review Management",
  singular: "Review",
  description: "Client reviews that scroll beside the rating card.",
  fields: [
    { type: "text", path: "name", label: "Reviewer name", required: true },
    { type: "text", path: "role", label: "Role", placeholder: "CTO" },
    { type: "text", path: "company", label: "Company" },
    { type: "image", path: "avatar", label: "Photo", wide: true },
    { type: "textarea", path: "quote", label: "Review", required: true, rows: 4 },
  ],
  newItem: () => ({ id: newId("review"), company: "", quote: "", name: "", role: "", avatar: "" }),
  itemTitle: (r) => r.name,
  itemSubtitle: (r) => r.company,
  itemImage: (r) => r.avatar,
};

export function ReviewsPage({ focusId }: PageProps) {
  const { reviews, settings } = useContent();
  return (
    <div className="flex flex-col gap-[32px]">
      <CollectionEditor config={reviewsConfig} items={reviews} onSave={(items) => api.save("reviews", items)} focusId={focusId} />
      <ObjectEditor
        embedded
        title="Rating card"
        description="The big score next to the reviews."
        value={settings.rating}
        fields={[
          { type: "text", path: "score", label: "Score", placeholder: "4.9", hint: "Stars are drawn from this number." },
          { type: "text", path: "count", label: "Text under the stars", placeholder: "200+ reviews" },
        ]}
        onSave={(rating) => api.save("settings", { ...getContent().settings, rating })}
      />
    </div>
  );
}

// ---------------------------------------------------------------- achievements

const statFields = (home: boolean): Field[] => [
  { type: "number", path: "value", label: "Number", required: true, hint: "Counts up from 0 when it scrolls into view." },
  { type: "text", path: "prefix", label: "Before the number", placeholder: "$" },
  { type: "text", path: "suffix", label: "After the number", placeholder: "+ or % or M+" },
  ...(home ? [{ type: "text", path: "after", label: "Words after it (optional)", placeholder: " global projects" } as Field] : []),
  { type: "textarea", path: "label", label: "Label", required: true, rows: 2, hint: home ? "Press Enter for a line break on desktop." : undefined },
];

const statConfig = (home: boolean): CollectionConfig<Stat> => ({
  title: home ? "Home page numbers" : "Company page numbers",
  singular: "Number",
  description: home ? "The “Bold UX design, billion-dollar proof” cards. The last card is highlighted in cyan." : "The row of numbers on the Company page.",
  fields: statFields(home),
  newItem: () => ({ id: newId("stat"), value: 0, prefix: "", suffix: "+", after: "", label: "" }),
  itemTitle: (s) => `${s.prefix}${s.value}${s.suffix}${s.after}`,
  itemSubtitle: (s) => s.label.replace(/\n/g, " "),
});

export function AchievementsPage({ focusId }: PageProps) {
  const { achievements } = useContent();
  const [tab, setTab] = useState<"home" | "company">(() => (focusId && achievements.company.some((s) => s.id === focusId) ? "company" : "home"));
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="bg-white flex gap-[4px] p-[4px] rounded-[8px] self-start shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
        {(["home", "company"] as const).map((key) => (
          <button
            key={key}
            type="button"
            className={`cursor-pointer font-['Inter:Medium'] font-medium px-[16px] py-[8px] rounded-[6px] text-[14px] ${tab === key ? "bg-[#00b6ca] text-white" : "text-[#3e3e3e] hover:bg-[#f4fbfc]"}`}
            onClick={() => setTab(key)}
          >
            {key === "home" ? "Home page" : "Company page"}
          </button>
        ))}
      </div>
      <CollectionEditor
        key={tab}
        config={statConfig(tab === "home")}
        items={achievements[tab]}
        onSave={(items) => api.save("achievements", { ...getContent().achievements, [tab]: items })}
        focusId={focusId}
      />
    </div>
  );
}

// ---------------------------------------------------------------- faq

const faqConfig: CollectionConfig<Faq> = {
  title: "FAQ Management",
  singular: "Question",
  description: "Questions on the Contact page. Visitors click a question to open its answer.",
  fields: [
    { type: "text", path: "question", label: "Question", required: true, wide: true },
    { type: "textarea", path: "answer", label: "Answer", required: true, rows: 5 },
  ],
  newItem: () => ({ id: newId("faq"), question: "", answer: "" }),
  itemTitle: (f) => f.question,
};

export function FaqPage({ focusId }: PageProps) {
  const { faqs } = useContent();
  return <CollectionEditor config={faqConfig} items={faqs} onSave={(items) => api.save("faqs", items)} focusId={focusId} />;
}
