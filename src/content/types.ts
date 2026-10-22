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
  /** Video URL; its first frame should exist as the same name with .webp (optional). */
  video: string;
};

export type Service = {
  id: string;
  slug: string;
  /** Full name, e.g. "UI/UX Design". */
  title: string;
  /** Services page row: small label and big word, e.g. "Design" / "UI/UX". */
  eyebrow: string;
  name: string;
  /** Short text on the Home page service card. */
  summary: string;
  /** Longer text on the Services page row. */
  description: string;
  /** Services page row image. */
  image: string;
  /** Big outlined number artwork on the Home card (optional). */
  numberImage: string;
  detail: {
    /** rich */
    tagline: string;
    image: string;
    /** rich */
    intro: string;
    body: string;
    features: string[];
    /** rich */
    deliverablesTitle: string;
    deliverables: { title: string; text: string }[];
  };
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  pages: string;
  duration: string;
  website: string;
  /** Card image on Home / Work. */
  cover: string;
  /** Shown on the Home page "Turn your ideas" section. */
  featured: boolean;
  detail: {
    heading: string;
    heroImage: string;
    overview: string;
    goals: string;
    goalPoints: string[];
    challenge: { title: string; text: string; points: string[]; image: string };
    solution: {
      title: string;
      text: string;
      image: string;
      imageTitle: string;
      imageText: string;
      features: { icon: string; title: string; text: string }[];
      stat: { value: string; title: string; text: string };
    };
    palette: string[];
    tags: string[];
  };
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  /** YYYY-MM-DD */
  date: string;
  image: string;
  /**
   * Article text. Blank lines separate paragraphs; "## " starts a heading (also
   * listed in the table of contents), "### " a sub-heading, "- " a list item,
   * and "![caption](url)" an image.
   */
  body: string;
};

export type Client = { id: string; name: string; logo: string };

export type Review = { id: string; company: string; quote: string; name: string; role: string; avatar: string };

export type Stat = {
  id: string;
  value: number;
  prefix: string;
  suffix: string;
  /** Words right after the number (Home cards), e.g. " global projects". */
  after: string;
  label: string;
};

export type Faq = { id: string; question: string; answer: string };

export type ProcessStep = { id: string; title: string; text: string; image: string };

export type Settings = {
  seo: { title: string; description: string };
  heroes: Record<"home" | "services" | "work" | "blog" | "company", Hero>;
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
  footer: { text: string; copyright: string; linkedin: string; facebook: string };
  rating: { score: string; count: string };
};

export type Content = {
  settings: Settings;
  services: Service[];
  projects: Project[];
  posts: Post[];
  clients: Client[];
  reviews: Review[];
  achievements: { home: Stat[]; company: Stat[] };
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
