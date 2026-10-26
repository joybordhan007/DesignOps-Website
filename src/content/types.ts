// Shape of everything the admin dashboard can edit. The server stores one
// object of this shape (server/data/content.json) and the site renders from it.
//
// Text fields marked "rich" accept two simple markers:
//   *words*  → highlighted (cyan, or muted grey in section titles)
//   a line break (\n) → forced line break

export type SectionTitle = {
  /** Dark part of the heading. */
  lead: string;
  /** Muted part that follows it. */
  muted: string;
};

export type Hero = {
  /** rich */
  title: string;
  text: string;
};

/** Fields every admin-managed list item (service, project, post, review) has. */
export type Listed = {
  /** Inactive items are hidden from the website but kept in the dashboard. */
  active: boolean;
  /** YYYY-MM-DD, set when the item is created in the dashboard. */
  createdAt: string;
};

/** Optional search-engine texts for one page; empty fields fall back to the page's own title and summary. */
export type PageSeo = {
  title: string;
  description: string;
  /** Picture shown when the page is shared (Facebook, LinkedIn, WhatsApp…). */
  image: string;
};

export type Service = Listed & {
  id: string;
  slug: string;
  /** Full name, e.g. "UI/UX Design". */
  title: string;
  /** Services page row: small label and big word, e.g. "Design" / "UI/UX". */
  eyebrow: string;
  name: string;
  /** Short description: the Home page card and the Services page row show the same text. */
  summary: string;
  /** Shown in the Home page "Our Services" section. */
  showOnHome: boolean;
  /** The service picture: Services page row and the big picture on the details page. */
  image: string;
  /** Big outlined number artwork on the Home card (optional). */
  numberImage: string;
  detail: {
    /** rich */
    tagline: string;
    /** Heading + text + "what's included" blocks, in order. */
    intros: ServiceIntro[];
    /** Numbered deliverables blocks, in order. */
    deliverableSections: ServiceDeliverables[];
    /** This service's own "Our Working Process" blocks (the Home page has its own). */
    processSections: ServiceProcess[];
  };
  seo: PageSeo;
};

export type ServiceIntro = {
  id: string;
  /** rich */
  heading: string;
  text: string;
  features: string[];
};

export type ServiceDeliverables = {
  id: string;
  /** rich */
  heading: string;
  items: { title: string; text: string }[];
};

export type ServiceProcess = {
  id: string;
  title: SectionTitle;
  steps: ProcessStep[];
};

/** Work page card style: wide image-beside-text card, or image-on-top grid card. */
export type CardLayout = "horizontal" | "vertical";

export type Project = Listed & {
  id: string;
  /** Page address. */
  slug: string;
  /** Project name: card title and the details page heading. */
  title: string;
  category: string;
  summary: string;
  pages: string;
  duration: string;
  website: string;
  /** Project image: the card on Home / Work and the big image on the details page. */
  cover: string;
  /** Shown on the Home page "Turn your ideas" section. */
  featured: boolean;
  layout: CardLayout;
  detail: {
    overview: string;
    goals: string;
    goalPoints: string[];
    challenges: ProjectChallenge[];
    solutions: ProjectSolution[];
    palettes: ProjectPalette[];
    toolSets: ProjectTools[];
  };
  seo: PageSeo;
};

export type ProjectChallenge = {
  id: string;
  title: string;
  text: string;
  points: string[];
  image: string;
  /** Which side the picture sits on (desktop); the text takes the other side. */
  imageSide: "left" | "right";
};

export type ProjectSolution = {
  id: string;
  title: string;
  text: string;
  image: string;
  imageTitle: string;
  imageText: string;
  features: { icon: string; title: string; text: string }[];
  stat: { value: string; title: string; text: string };
};

export type ProjectPalette = {
  id: string;
  /** Empty = the "Colour palette" label from Buttons & labels. */
  title: string;
  /** Empty = the palette text label ("… {n} color palette"). */
  text: string;
  colors: string[];
};

export type ProjectTools = {
  id: string;
  /** Empty = the "Technologies & tools" label from Buttons & labels. */
  title: string;
  items: string[];
};

export type Post = Listed & {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  /** YYYY-MM-DD, set automatically the first time the post is published (made active). Not shown on the website. */
  date: string;
  image: string;
  /** Shown in the "Growth Insights" section (Home and other pages). */
  showOnHome: boolean;
  /** The article, one block per section; the headings make the table of contents. */
  sections: ArticleSection[];
  seo: PageSeo;
};

export type ArticleSection = {
  id: string;
  /** Listed in the table of contents. */
  heading: string;
  subheading: string;
  /** Formatted text (HTML from the dashboard's text editor, cleaned before it is shown). */
  html: string;
  /** Optional picture under the text. */
  image: string;
};

export type Client = {
  id: string;
  name: string;
  /** The logo the website shows (fitted into 220 × 100 px). */
  logo: string;
  /** The logo as uploaded, kept when its background was removed so it can be switched back. */
  logoOriginal?: string;
  /** Where in the original (in its own pixels) the edited logo was cut from, so edits can line up with it again. */
  logoCrop?: { x: number; y: number; w: number; h: number };
  /** Placement in the 220 × 100 box: offset in % of the box (0 = centred) and size (1 = fitted). */
  logoFit?: { x: number; y: number; scale: number };
};

export type Review = Listed & {
  id: string;
  company: string;
  quote: string;
  name: string;
  role: string;
  /** Optional; cards show the reviewer's initials without it. */
  avatar: string;
  /** 1-5 stars. */
  rating: number;
};

/** A review sent from the website's Reviews page, waiting for the admin's approval. */
export type PendingReview = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  avatar: string;
};

/** One achievement number; the same list feeds the Home and Company pages. */
export type Stat = {
  id: string;
  value: number;
  prefix: string;
  suffix: string;
  /** Words right after the number (Home cards), e.g. " global projects". */
  after: string;
  label: string;
  showOnHome: boolean;
  showOnCompany: boolean;
};

export type Faq = { id: string; question: string; answer: string };

export type ProcessStep = { id: string; title: string; text: string; image: string };

/**
 * Small fixed texts around the site: buttons, labels and headings that aren't
 * part of a list item. A line break (\n) in a label is a line break on desktop.
 */
export type Labels = {
  nav: { home: string; services: string; work: string; blog: string; company: string; reviews: string };
  buttons: {
    startProject: string;
    letsTalk: string;
    learnMore: string;
    viewCaseStudy: string;
    allArticles: string;
    allReviews: string;
    readNow: string;
    writeReview: string;
    backToHome: string;
    contactUs: string;
  };
  scrollDown: string;
  projectCard: { pages: string; duration: string };
  /** Home "Science · Technology · Design" animation. */
  science: { science: string; technology: string; design: string; research: string; digital: string; customer: string };
  workDetails: {
    overview: string;
    goals: string;
    challenge: string;
    solution: string;
    palette: string;
    /** Under the colour palette heading; {n} = number of colours. */
    paletteText: string;
    tools: string;
  };
  blogDetails: { newsletterTitle: string; newsletterText: string; newsletterLink: string; ctaTitle: string; toc: string };
  footer: { quickLinks: string; support: string; services: string; contactInfo: string; contactUs: string; faq: string; privacy: string; terms: string };
  notFound: {
    badge: string;
    /** rich: *words* in cyan */
    title: string;
    text: string;
    popular: string;
  };
  /** Privacy Policy and Terms of Service pages. */
  legal: { badge: string; updated: string; alsoRead: string };
  reviews: {
    empty: string;
    /** Under the rating card stars; {n} = number of published reviews. */
    countText: string;
    formTitle: string;
    formText: string;
    formSubmit: string;
    thanksTitle: string;
    thanksText: string;
    /** "Write a review" popup field labels. */
    rating: string;
    name: string;
    email: string;
    role: string;
    company: string;
    quote: string;
    photo: string;
    optional: string;
  };
  contactForm: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    time: string;
    timePlaceholder: string;
    times: string[];
    message: string;
    messagePlaceholder: string;
    submit: string;
    sent: string;
  };
};

export type Settings = {
  seo: SiteSeo;
  /** Browser-tab icons for the website and for the dashboard. */
  favicons: { site: string; admin: string };
  heroes: Record<"home" | "services" | "work" | "blog" | "company", Hero>;
  /**
   * Hero background videos: one for Home, one shared by every other page hero.
   * A still of the first frame can sit next to a video with the same name and .webp.
   */
  heroVideos: { home: string; pages: string };
  titles: Record<
    "clients" | "stats" | "services" | "projects" | "process" | "insights" | "reviews" | "faq",
    SectionTitle
  >;
  /** rich: Home "We aspire…" statement. */
  vision: string;
  cta: { title: string; text: string };
  company: {
    quote: string;
    quoteAuthor: string;
    missionLabel: string;
    /** rich: *muted* part */
    missionTitle: string;
    missionText: string;
    missionImage: string;
  };
  contact: {
    /** rich */
    title: string;
    subtitle: string;
    infoTitle: string;
    infoText: string;
    phone: string;
    email: string;
    address: string;
  };
  footer: {
    text: string;
    copyright: string;
    /** Social profile icons, in this order. */
    socials: SocialLink[];
  };
  /** rich: Reviews page heading. */
  reviewsPage: { title: string; subtitle: string };
  labels: Labels;
  tracking: Tracking;
  legal: Record<"privacy" | "terms", LegalPage>;
};

/** Privacy Policy / Terms of Service page. */
export type LegalPage = {
  title: string;
  /** YYYY-MM-DD, shown as "Last updated". */
  updated: string;
  intro: string;
  /** Same format as a blog article: "## " headings (listed in the contents), "- " list items. */
  body: string;
};

export type SeoPageKey = "home" | "services" | "work" | "blog" | "company" | "contact" | "reviews";

/** Search-engine settings (see server/seo.js). */
export type SiteSeo = {
  /** The Home page title, also the fallback for any page without its own. */
  title: string;
  /** The fallback description. */
  description: string;
  /** How page titles are built: %s is the page's own title, e.g. "%s | DesignOps". */
  titleTemplate: string;
  /** Search terms the site should rank for (one per line); used as a guide in the dashboard and in the site's structured data. */
  keywords: string[];
  /** Default share picture (1200 × 630). */
  image: string;
  /** Title and description per main page. */
  pages: Record<SeoPageKey, { title: string; description: string }>;
  /** The business, for Google's knowledge panel and local results. */
  business: { name: string; type: string; foundingYear: string; city: string; country: string; areaServed: string };
  /** Site verification codes (content="…" value only). */
  verification: { google: string; bing: string };
};

export type SocialPlatform =
  | "linkedin"
  | "facebook"
  | "instagram"
  | "x"
  | "youtube"
  | "tiktok"
  | "behance"
  | "dribbble"
  | "github"
  | "pinterest"
  | "whatsapp"
  | "telegram"
  | "threads"
  | "medium"
  | "website";

export type SocialLink = { id: string; platform: SocialPlatform; url: string };

/** Google Tag Manager and Meta Pixel (see server/tracking.js and src/lib/tracking.ts). */
export type Tracking = {
  gtm: {
    enabled: boolean;
    /** Container ID, e.g. GTM-ABC1234. */
    containerId: string;
  };
  meta: {
    enabled: boolean;
    /** Pixel (dataset) ID, digits only. */
    pixelId: string;
    /** content="…" value of Meta's domain-verification meta tag. */
    domainVerification: string;
  };
};

export type Content = {
  settings: Settings;
  services: Service[];
  projects: Project[];
  posts: Post[];
  clients: Client[];
  reviews: Review[];
  achievements: Stat[];
  /** Home page "Our Working Process" steps (each service has its own). */
  process: ProcessStep[];
  faqs: Faq[];
};

export type Message = {
  id: string;
  createdAt: string;
  read: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  preferred_time: string;
  message: string;
};
