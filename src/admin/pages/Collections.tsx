import { useState } from "react";
import { formatDate, postUrl, projectUrl, ratingSummary, serviceUrl } from "@/content/helpers";
import { getContent, useContent } from "@/content/store";
import type { Client, Faq, PendingReview, Post, Project, Review, Service, Stat } from "@/content/types";
import type { PageProps } from "../AdminApp";
import { api } from "../api";
import { card, CollectionEditor, ObjectEditor, secondaryButton, toast, type CollectionConfig } from "../editor";
import { newId, type Field } from "../fields";
import { CheckIcon, MailIcon, TrashIcon } from "../icons";
import LogoEditor from "../LogoEditor";
import ListPage, { today, type ListConfig } from "../table";

// Admin pages for the website's lists. Services, work and blog are tables with
// a details editor per item (see ../table.tsx); clients, reviews, achievements
// and FAQ edit the whole list and save it in one go.

/** A new list item starts hidden, with a placeholder name and a unique page address. */
const newListed = (prefix: string, title: string) => {
  const id = newId(prefix);
  return { id, slug: id, title, active: false, createdAt: today() };
};

// ---------------------------------------------------------------- services

const newIntro = () => ({ id: newId("intro"), heading: "", text: "", features: [] });
const newDeliverables = () => ({ id: newId("deliverables"), heading: "What You Get From Our *End-to-End Digital* Expertise", items: [] });
const newProcess = () => ({ id: newId("process"), title: structuredClone(getContent().settings.titles.process), steps: [] });
const newStep = () => ({ id: newId("step"), title: "", text: "", image: "" });

const serviceFields: Field[] = [
  {
    type: "group",
    label: "Service card & picture",
    hint: "The Home page card, the Services page row and the top of the details page.",
    fields: [
      { type: "text", path: "title", label: "Service name", required: true, placeholder: "UI/UX Design" },
      { type: "slug", path: "slug", label: "Page address", from: "title", required: true },
      { type: "textarea", path: "summary", label: "Short description", rows: 3, hint: "The same text is shown on the Home page service card and on the Services page." },
      { type: "text", path: "eyebrow", label: "Small label (Services page)", placeholder: "Design" },
      { type: "text", path: "name", label: "Big title (Services page)", placeholder: "UI/UX" },
      { type: "image", path: "image", label: "Service picture", wide: true, hint: "One picture for both places: the Services page row and the big picture at the top of the details page." },
      { type: "image", path: "numberImage", label: "Big number artwork (Home card, optional)", wide: true, hint: "Leave empty to show a plain number instead." },
      { type: "rich", path: "detail.tagline", label: "Details page tagline (top right)" },
    ],
  },
  {
    type: "objects",
    cards: true,
    path: "detail.intros",
    label: "Intro sections",
    itemName: "Intro section",
    hint: "Heading on the left, text and the “what's included” list on the right. Add as many as you need; they appear in this order.",
    newItem: newIntro,
    itemLabel: (item) => String(item.heading ?? "").replace(/\*/g, ""),
    fields: [
      { type: "rich", path: "heading", label: "Intro heading" },
      { type: "textarea", path: "text", label: "Intro text", rows: 4 },
      { type: "lines", path: "features", label: "What's included (one per line)" },
    ],
  },
  {
    type: "objects",
    cards: true,
    path: "detail.deliverableSections",
    label: "Deliverables sections",
    itemName: "Deliverables section",
    hint: "A heading and a numbered list of deliverables.",
    newItem: newDeliverables,
    itemLabel: (item) => String(item.heading ?? "").replace(/\*/g, ""),
    fields: [
      { type: "rich", path: "heading", label: "Deliverables heading" },
      {
        type: "objects",
        path: "items",
        label: "Deliverables",
        itemName: "deliverable",
        newItem: () => ({ title: "", text: "" }),
        itemLabel: (item, i) => (item.title ? `${i + 1}. ${item.title}` : ""),
        fields: [
          { type: "text", path: "title", label: "Title" },
          { type: "text", path: "text", label: "Description" },
        ],
      },
    ],
  },
  {
    type: "objects",
    cards: true,
    path: "detail.processSections",
    label: "Working process sections",
    itemName: "Working process",
    hint: "This service's own “Our Working Process” blocks (the Home page has its own, under Website Settings).",
    newItem: newProcess,
    itemLabel: (item) => [item.title?.lead, String(item.title?.muted ?? "").replace(/\n/g, " ")].filter(Boolean).join(" "),
    fields: [
      { type: "text", path: "title.lead", label: "Heading: dark part" },
      { type: "textarea", path: "title.muted", label: "Heading: grey part", rows: 2, wide: false, hint: "Enter = line break on desktop." },
      {
        type: "objects",
        path: "steps",
        label: "Steps",
        itemName: "step",
        newItem: newStep,
        itemLabel: (step, i) => (step.title ? `${i + 1}. ${step.title}` : ""),
        fields: [
          { type: "text", path: "title", label: "Title" },
          { type: "textarea", path: "text", label: "Text", rows: 3, hint: "Press Enter for a line break on desktop." },
          { type: "image", path: "image", label: "Picture (shown on hover)", wide: true },
        ],
      },
    ],
  },
];

const servicesConfig: ListConfig<Service> = {
  title: "Services",
  singular: "Service",
  description: "Shown on the Services page, the footer, each service's own details page and (if switched on) the Home page.",
  basePath: "/admin/services",
  settings: [{ type: "toggle", path: "showOnHome", label: "Show on the Home page", hint: "In the “Our Services” cards." }],
  fields: serviceFields,
  newItem: () => ({
    ...newListed("service", "New service"),
    showOnHome: false,
    eyebrow: "",
    name: "",
    summary: "",
    image: "",
    numberImage: "",
    detail: { tagline: "", intros: [newIntro()], deliverableSections: [newDeliverables()], processSections: [] },
  }),
  summary: (s) => s.summary,
  image: (s) => s.image,
  meta: (s) => `/services/${s.slug}${s.showOnHome ? " · on Home" : ""}`,
  viewUrl: serviceUrl,
};

export function ServicesPage({ focusId, navigate }: PageProps) {
  const { services } = useContent();
  return <ListPage config={servicesConfig} items={services} onSave={(items) => api.save("services", items)} focusId={focusId} navigate={navigate} />;
}

// ---------------------------------------------------------------- work

/** Tiny drawing of a challenge block: text on one side, picture on the other. */
const sidePreview = (imageLeft: boolean) => (
  <span className={`bg-[#f0f0f0] flex gap-[4px] h-[44px] p-[5px] rounded-[4px] w-[96px] ${imageLeft ? "flex-row-reverse" : ""}`} aria-hidden="true">
    <span className="flex flex-1 flex-col gap-[3px] justify-center">
      <span className="bg-[#9a9a9a] h-[3px] rounded-full w-3/4" />
      <span className="bg-[#c9c9c9] h-[3px] rounded-full w-full" />
      <span className="bg-[#c9c9c9] h-[3px] rounded-full w-2/3" />
    </span>
    <span className="bg-[#7fd9e3] rounded-[2px] w-1/2" />
  </span>
);

const newChallenge = () => ({ id: newId("challenge"), title: "", text: "", points: [], image: "", imageSide: "right" as const });
const newSolution = () => ({ id: newId("solution"), title: "", text: "", image: "", imageTitle: "", imageText: "", features: [], stat: { value: "", title: "", text: "" } });
const newPalette = () => ({ id: newId("palette"), title: "", text: "", colors: [] });
const newTools = () => ({ id: newId("tools"), title: "", items: [] });

const projectFields: Field[] = [
  {
    type: "group",
    label: "Project card & page top",
    hint: "The card on the Home and Work pages, and the heading and big image at the top of the details page.",
    fields: [
      { type: "text", path: "title", label: "Project name", required: true, hint: "Card title and the details page heading." },
      { type: "slug", path: "slug", label: "Page address", from: "title", required: true },
      { type: "text", path: "category", label: "Category", placeholder: "Mobile App Design" },
      { type: "textarea", path: "summary", label: "Short description", rows: 3, hint: "Shown on the project card (Home and Work pages)." },
      { type: "text", path: "pages", label: "Pages in project", placeholder: "100+" },
      { type: "text", path: "duration", label: "Project duration", placeholder: "2 Months" },
      { type: "url", path: "website", label: "Website", placeholder: "https://" },
      { type: "image", path: "cover", label: "Project image", wide: true, hint: "One image for both places: the project card and the big image at the top of the details page." },
    ],
  },
  {
    type: "group",
    label: "Overview & goals",
    fields: [
      { type: "textarea", path: "detail.overview", label: "Project overview", rows: 4 },
      { type: "textarea", path: "detail.goals", label: "Goals", rows: 4 },
      { type: "lines", path: "detail.goalPoints", label: "Goal bullet points" },
    ],
  },
  {
    type: "objects",
    cards: true,
    path: "detail.challenges",
    label: "The Challenge",
    itemName: "Challenge",
    hint: "Text and a picture side by side. Choose which side the picture goes on.",
    newItem: newChallenge,
    itemLabel: (item) => item.title,
    fields: [
      {
        type: "choice",
        path: "imageSide",
        label: "Layout",
        wide: true,
        options: [
          { value: "right", label: "Text left, image right", preview: sidePreview(false) },
          { value: "left", label: "Image left, text right", preview: sidePreview(true) },
        ],
      },
      { type: "text", path: "title", label: "Title", wide: true },
      { type: "textarea", path: "text", label: "Text" },
      { type: "lines", path: "points", label: "Problems (one per line)" },
      { type: "image", path: "image", label: "Image", wide: true },
    ],
  },
  {
    type: "objects",
    cards: true,
    path: "detail.solutions",
    label: "The Solution",
    itemName: "Solution",
    hint: "Dark band with a large image, feature cards and a highlight number.",
    newItem: newSolution,
    itemLabel: (item) => item.title,
    fields: [
      { type: "text", path: "title", label: "Title" },
      { type: "text", path: "text", label: "Subtitle" },
      { type: "image", path: "image", label: "Large image", wide: true },
      { type: "text", path: "imageTitle", label: "Image caption title" },
      { type: "text", path: "imageText", label: "Image caption text" },
      {
        type: "objects",
        path: "features",
        label: "Feature cards",
        itemName: "feature card",
        newItem: () => ({ icon: "", title: "", text: "" }),
        itemLabel: (item) => item.title,
        fields: [
          { type: "text", path: "title", label: "Title" },
          { type: "text", path: "text", label: "Text" },
          { type: "image", path: "icon", label: "Icon", wide: true },
        ],
      },
      { type: "text", path: "stat.value", label: "Highlight number", placeholder: "10x" },
      { type: "text", path: "stat.title", label: "Highlight title" },
      { type: "text", path: "stat.text", label: "Highlight text", wide: true },
    ],
  },
  {
    type: "objects",
    cards: true,
    path: "detail.palettes",
    label: "Colour palettes",
    itemName: "Colour palette",
    newItem: newPalette,
    itemLabel: (item) => item.title || `${item.colors?.length ?? 0} colours`,
    fields: [
      { type: "text", path: "title", label: "Heading (optional)", hint: "Empty = the “Colour palette heading” from Website Settings → Buttons & labels." },
      { type: "text", path: "text", label: "Text (optional)", hint: "{n} becomes the number of colours. Empty = the standard text." },
      { type: "colors", path: "colors", label: "Colours" },
    ],
  },
  {
    type: "objects",
    cards: true,
    path: "detail.toolSets",
    label: "Technologies & tools",
    itemName: "Tools section",
    newItem: newTools,
    itemLabel: (item) => item.title || (item.items ?? []).slice(0, 4).join(", "),
    fields: [
      { type: "text", path: "title", label: "Heading (optional)", hint: "Empty = the “Tools heading” from Website Settings → Buttons & labels." },
      { type: "lines", path: "items", label: "Technologies & tools (one per line)" },
    ],
  },
];

/** Tiny drawings of the two Work page card styles. */
const layoutPreview = (horizontal: boolean) => (
  <span className={`bg-[#f0f0f0] flex gap-[4px] h-[54px] p-[5px] rounded-[4px] w-[96px] ${horizontal ? "" : "flex-col"}`} aria-hidden="true">
    <span className={`bg-[#c9c9c9] rounded-[2px] ${horizontal ? "order-2 w-1/2" : "h-[24px]"}`} />
    <span className={`flex flex-1 flex-col gap-[3px] justify-center ${horizontal ? "" : "px-[2px]"}`}>
      <span className="bg-[#9a9a9a] h-[3px] rounded-full w-3/4" />
      <span className="bg-[#c9c9c9] h-[3px] rounded-full w-full" />
      <span className="bg-[#c9c9c9] h-[3px] rounded-full w-2/3" />
    </span>
  </span>
);

const workConfig: ListConfig<Project> = {
  title: "Work",
  singular: "Work",
  description: "Projects on the Work page, each with its own details page, and (if switched on) the Home page.",
  basePath: "/admin/work",
  settings: [
    { type: "toggle", path: "featured", label: "Show on the Home page", hint: "In the “Turn your ideas…” stacked cards." },
    {
      type: "choice",
      path: "layout",
      label: "Card style on the Work page",
      wide: true,
      hint: "Horizontal cards stack up as you scroll; vertical cards sit two per row on a dark band. Mix them in any order — neighbouring cards of the same style are grouped together.",
      options: [
        { value: "horizontal", label: "Horizontal card", preview: layoutPreview(true) },
        { value: "vertical", label: "Vertical card", preview: layoutPreview(false) },
      ],
    },
  ],
  fields: projectFields,
  newItem: () => ({
    ...newListed("work", "New work"),
    layout: "vertical",
    category: "",
    summary: "",
    pages: "",
    duration: "",
    website: "",
    cover: "",
    featured: false,
    detail: { overview: "", goals: "", goalPoints: [], challenges: [newChallenge()], solutions: [newSolution()], palettes: [], toolSets: [] },
  }),
  summary: (p) => p.summary,
  image: (p) => p.cover,
  meta: (p) => [p.category, p.layout === "horizontal" ? "Horizontal card" : "Vertical card", p.featured && "on Home"].filter(Boolean).join(" · "),
  viewUrl: projectUrl,
};

export function WorkPage({ focusId, navigate }: PageProps) {
  const { projects } = useContent();
  return <ListPage config={workConfig} items={projects} onSave={(items) => api.save("projects", items)} focusId={focusId} navigate={navigate} />;
}

// ---------------------------------------------------------------- blog

const newArticleSection = () => ({ id: newId("section"), heading: "", subheading: "", html: "", image: "" });

const blogConfig: ListConfig<Post> = {
  title: "Blog Management",
  singular: "Blog",
  description: "Posts are listed newest first on the Blog page. A post's date is set automatically the first time it is published (made active).",
  basePath: "/admin/blog",
  settings: [{ type: "toggle", path: "showOnHome", label: "Show on the Home page", hint: "In “Growth Insights” (the three newest switched-on posts)." }],
  fields: [
    {
      type: "group",
      label: "Card (Blog page and Growth Insights)",
      fields: [
        { type: "text", path: "title", label: "Title", required: true, wide: true },
        { type: "slug", path: "slug", label: "Page address", from: "title", required: true },
        { type: "lines", path: "categories", label: "Categories (one per line)", rows: 2, wide: false },
        { type: "textarea", path: "excerpt", label: "Short description", rows: 3, hint: "Shown under the title on the Blog page." },
        { type: "image", path: "image", label: "Cover image", wide: true },
      ],
    },
    {
      type: "objects",
      cards: true,
      path: "sections",
      label: "Article sections",
      itemName: "Section",
      hint: "The article, section by section. Each section heading is listed in the post's “Table of Contents” and jumps to its section.",
      newItem: newArticleSection,
      itemLabel: (item) => item.heading,
      fields: [
        { type: "text", path: "heading", label: "Section heading", hint: "Listed in the table of contents." },
        { type: "text", path: "subheading", label: "Subheading (optional)" },
        { type: "html", path: "html", label: "Description", placeholder: "Write the section here. Use the toolbar for bold, lists, links and pictures." },
        { type: "image", path: "image", label: "Image (optional)", wide: true, hint: "Shown under the description." },
      ],
    },
  ],
  newItem: () => ({ ...newListed("blog", "New blog post"), showOnHome: true, excerpt: "", categories: ["UI Design"], date: "", image: "", sections: [newArticleSection()] }),
  summary: (p) => p.excerpt,
  image: (p) => p.image,
  meta: (p) => `${p.date ? `Published ${formatDate(p.date)}` : "Not published yet"}${p.showOnHome ? " · on Home" : ""}`,
  viewUrl: postUrl,
};

export function BlogPage({ focusId, navigate }: PageProps) {
  const { posts } = useContent();
  // The publish date is set the first time a post is saved as active.
  const save = (items: Post[]) => api.save("posts", items.map((post) => (post.active && !post.date ? { ...post, date: today() } : post)));
  return <ListPage config={blogConfig} items={posts} onSave={save} focusId={focusId} navigate={navigate} />;
}

// ---------------------------------------------------------------- clients

const clientsConfig: CollectionConfig<Client> = {
  title: "Client Management",
  singular: "Client",
  description: "Logos in the “Our Clients” carousel on the Home page. Each logo is fitted into a 220 × 100 px box.",
  fields: [
    { type: "text", path: "name", label: "Client name", required: true },
    {
      type: "custom",
      path: "logo",
      label: "Logo",
      required: true,
      render: (_, __, client, setClient) => <LogoEditor client={client} onChange={setClient} />,
    },
  ],
  newItem: () => ({ id: newId("client"), name: "", logo: "" }),
  itemTitle: (c) => c.name,
  itemImage: (c) => c.logo,
  validate: (items) => (items.some((c) => !c.logo.trim()) ? "Every client needs a logo." : null),
};

export function ClientsPage({ focusId }: PageProps) {
  const { clients } = useContent();
  return <CollectionEditor config={clientsConfig} items={clients} onSave={(items) => api.save("clients", items)} focusId={focusId} />;
}

// ---------------------------------------------------------------- reviews

const reviewsConfig: CollectionConfig<Review> = {
  title: "Published reviews",
  singular: "Review",
  description: "Shown on the Reviews page and in the reviews strip beside the rating card. Approved visitor reviews land here.",
  fields: [
    { type: "toggle", path: "active", label: "Show on the website", wide: true },
    { type: "text", path: "name", label: "Reviewer name", required: true },
    { type: "text", path: "role", label: "Role", placeholder: "CTO" },
    { type: "text", path: "company", label: "Company" },
    { type: "number", path: "rating", label: "Rating (1–5 stars)", required: true },
    { type: "image", path: "avatar", label: "Photo (optional)", wide: true, hint: "Without a photo the reviewer's initials are shown." },
    { type: "textarea", path: "quote", label: "Review (optional)", rows: 4 },
  ],
  newItem: () => ({ id: newId("review"), active: true, createdAt: today(), company: "", quote: "", name: "", role: "", avatar: "", rating: 5 }),
  itemTitle: (r) => r.name,
  itemSubtitle: (r) => `${"★".repeat(Math.max(0, Math.min(5, r.rating)))} ${r.company}${r.active ? "" : " · hidden"}`.trim(),
  itemImage: (r) => r.avatar,
  validate: (items) => (items.some((r) => !(r.rating >= 1 && r.rating <= 5)) ? "Ratings must be between 1 and 5." : null),
};

/** The website's rating card, worked out from the published reviews (nothing to type in). */
function RatingSummary({ reviews, countText }: { reviews: Review[]; countText: string }) {
  const { value, score, count } = ratingSummary(reviews, countText);
  return (
    <section className={`${card} flex flex-wrap gap-[16px] items-center p-[20px]`}>
      <span className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[#191919] text-[40px]">{score}</span>
      <span className="flex flex-col gap-[4px]">
        <span className="text-[#f5a623] text-[20px] tracking-[2px]" aria-label={`${score} out of 5 stars`}>
          {"★".repeat(Math.round(value))}
          <span className="text-[#dcdcdc]">{"★".repeat(5 - Math.round(value))}</span>
        </span>
        <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[14px]">{count}</span>
      </span>
      <p className="font-['Inter:Regular'] leading-[1.5] max-w-[440px] ml-auto text-[#707070] text-[13px]">
        The rating card on the website updates by itself: the average of the published reviews and how many there are. Hidden reviews aren't counted.
      </p>
    </section>
  );
}

function PendingCard({ review, onDone }: { review: PendingReview; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const act = async (approve: boolean) => {
    if (!approve && !window.confirm(`Reject and delete the review from ${review.name}?`)) return;
    setBusy(true);
    try {
      if (approve) await api.approveReview(review.id);
      else await api.rejectReview(review.id);
      toast(approve ? `Review from ${review.name} is now on the website.` : "Review rejected.");
      onDone();
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <li className={`${card} flex flex-col gap-[14px] p-[20px]`}>
      <div className="flex flex-wrap gap-[12px] items-start justify-between">
        <div className="flex gap-[12px] items-center">
          {review.avatar ? (
            <img src={review.avatar} alt="" className="block object-cover rounded-full shrink-0 size-[48px]" />
          ) : (
            <span className="bg-[#e9f9fb] flex font-['Inter:Semi_Bold'] font-semibold items-center justify-center rounded-full shrink-0 size-[48px] text-[#00a0b2] text-[16px]">{review.name.slice(0, 1).toUpperCase()}</span>
          )}
          <div className="flex flex-col gap-[2px]">
            <span className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[16px]">{review.name}</span>
            {(review.role || review.company) && <span className="font-['Inter:Regular'] text-[#707070] text-[13px]">{[review.role, review.company].filter(Boolean).join(" · ")}</span>}
          </div>
        </div>
        <div className="flex flex-col gap-[2px] items-end">
          <span className="text-[#f5a623] text-[18px] tracking-[2px]" aria-label={`${review.rating} out of 5 stars`}>
            {"★".repeat(review.rating)}
            <span className="text-[#dcdcdc]">{"★".repeat(5 - review.rating)}</span>
          </span>
          <span className="font-['Inter:Regular'] text-[#9a9a9a] text-[12px]">{new Date(review.createdAt).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
      {review.quote ? (
        <p className="bg-[#fafafa] font-['Inter:Regular'] leading-[1.6] p-[14px] rounded-[6px] text-[#222] text-[15px] whitespace-pre-wrap">{review.quote}</p>
      ) : (
        <p className="font-['Inter:Regular'] italic text-[#9a9a9a] text-[14px]">Rating only, no written review.</p>
      )}
      <div className="flex flex-wrap gap-[10px] items-center">
        <button type="button" className="bg-[#00b6ca] cursor-pointer flex font-['Inter:Semi_Bold'] font-semibold gap-[8px] items-center px-[16px] py-[9px] rounded-[6px] text-[14px] text-white hover:bg-[#009fb0] disabled:opacity-50" onClick={() => act(true)} disabled={busy}>
          <CheckIcon size={16} /> Approve
        </button>
        <button type="button" className={`${secondaryButton} hover:!border-[#e5484d] hover:!text-[#e5484d]`} onClick={() => act(false)} disabled={busy}>
          <TrashIcon size={16} /> Reject
        </button>
        {review.email && (
          <a className={`${secondaryButton} ml-auto`} href={`mailto:${review.email}`}>
            <MailIcon size={16} /> {review.email}
          </a>
        )}
      </div>
    </li>
  );
}

function PendingReviews({ pending, reload }: { pending: PendingReview[]; reload: () => void }) {
  if (!pending.length) return <div className={`${card} font-['Inter:Regular'] p-[40px] text-center text-[#707070] text-[15px]`}>No reviews waiting. Reviews sent from the website's Reviews page appear here for approval.</div>;
  return (
    <ul className="flex flex-col gap-[16px]">
      {pending.map((review) => (
        <PendingCard key={review.id} review={review} onDone={reload} />
      ))}
    </ul>
  );
}

export function ReviewsPage({ focusId, pendingReviews, reloadPendingReviews }: PageProps) {
  const { reviews, settings } = useContent();
  // Waiting reviews load after the page opens, so the tab follows them until the admin picks one.
  const [picked, setPicked] = useState<"pending" | "published" | null>(null);
  const tab = picked ?? (pendingReviews.length && !focusId ? "pending" : "published");
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#191919] text-[24px]">Review Management</h1>
          <p className="font-['Inter:Regular'] text-[#707070] text-[14px]">Visitors send reviews from the website's Reviews page; they go live only after you approve them.</p>
        </div>
        <div className="bg-white flex gap-[4px] p-[4px] rounded-[6px] self-start shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
          {(
            [
              ["pending", `Waiting for approval${pendingReviews.length ? ` (${pendingReviews.length})` : ""}`],
              ["published", "Published reviews"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`cursor-pointer font-['Inter:Medium'] font-medium px-[16px] py-[8px] rounded-[6px] text-[14px] ${tab === key ? "bg-[#00b6ca] text-white" : "text-[#3e3e3e] hover:bg-[#f4fbfc]"}`}
              onClick={() => setPicked(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {tab === "pending" ? (
        <PendingReviews pending={pendingReviews} reload={reloadPendingReviews} />
      ) : (
        <CollectionEditor config={reviewsConfig} items={reviews} onSave={(items) => api.save("reviews", items)} focusId={focusId} />
      )}
      <RatingSummary reviews={reviews} countText={settings.labels.reviews.countText} />
    </div>
  );
}

// ---------------------------------------------------------------- achievements

const achievementsConfig: CollectionConfig<Stat> = {
  title: "Numbers",
  singular: "Number",
  description: "One list for the Home page cards and the Company page row. Switch on where each number is shown; on Home the last card is highlighted in cyan.",
  fields: [
    { type: "toggle", path: "showOnHome", label: "Show on the Home page" },
    { type: "toggle", path: "showOnCompany", label: "Show on the Company page" },
    { type: "number", path: "value", label: "Number", required: true, hint: "Counts up from 0 when it scrolls into view." },
    { type: "text", path: "prefix", label: "Before the number", placeholder: "$" },
    { type: "text", path: "suffix", label: "After the number", placeholder: "+ or % or M+" },
    { type: "text", path: "after", label: "Words after it (Home only, optional)", placeholder: " global projects" },
    { type: "textarea", path: "label", label: "Label", required: true, rows: 2, hint: "Press Enter for a line break on the Home page." },
  ],
  newItem: () => ({ id: newId("stat"), value: 0, prefix: "", suffix: "+", after: "", label: "", showOnHome: true, showOnCompany: true }),
  itemTitle: (s) => `${s.prefix}${s.value}${s.suffix}${s.after}`,
  itemSubtitle: (s) => [s.label.replace(/\n/g, " "), [s.showOnHome && "Home", s.showOnCompany && "Company"].filter(Boolean).join(" + ") || "Hidden"].join(" · "),
};

export function AchievementsPage({ focusId }: PageProps) {
  const { achievements, settings } = useContent();
  return (
    <div className="flex flex-col gap-[16px]">
      <ObjectEditor
        embedded
        title="Section title"
        description="The heading above the numbers on the Home page."
        value={settings.titles.stats}
        fields={[
          { type: "text", path: "lead", label: "Dark part", required: true, wide: true },
          { type: "textarea", path: "muted", label: "Grey part", rows: 2, hint: "Press Enter for a line break on desktop." },
        ]}
        onSave={(stats) => {
          const current = getContent().settings;
          return api.save("settings", { ...current, titles: { ...current.titles, stats } });
        }}
      />
      <CollectionEditor config={achievementsConfig} items={achievements} onSave={(items) => api.save("achievements", items)} focusId={focusId} />
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
