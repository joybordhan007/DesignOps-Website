// Every blog post on the site. The Blog page lists all of them (newest first)
// and the "Growth Insights" section on other pages shows the newest three.
// To publish a new post, add an entry here; `slug` becomes its URL: /blog/<slug>.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
  /** Publish date as YYYY-MM-DD; used for "newest first" ordering. */
  date: string;
  image: string;
};

// Placeholder posts carried over from the Figma Blog page.
export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-saas-needs-a-design-system",
    title: "Why Your SaaS Needs a Design System",
    excerpt:
      "At some point in every growing SaaS product, someone opens a pull request and notices that there are now four different shades of blue being used for primary buttons. Nobody made a decision to have four shades. It just happened, one component at a time, over 18 months of shipping.",
    categories: ["UI Design"],
    date: "2025-05-27",
    image: "/assets/blog-posts/design-system-1.jpg",
  },
  {
    slug: "design-system-consistency",
    title: "Why Your SaaS Needs a Design System",
    excerpt:
      "At some point in every growing SaaS product, someone opens a pull request and notices that there are now four different shades of blue being used for primary buttons. Nobody made a decision to have four shades. It just happened, one component at a time, over 18 months of shipping.",
    categories: ["UI Design"],
    date: "2025-05-20",
    image: "/assets/blog-posts/design-system-2.jpg",
  },
  {
    slug: "design-system-scaling",
    title: "Why Your SaaS Needs a Design System",
    excerpt:
      "At some point in every growing SaaS product, someone opens a pull request and notices that there are now four different shades of blue being used for primary buttons. Nobody made a decision to have four shades. It just happened, one component at a time, over 18 months of shipping.",
    categories: ["UI Design"],
    date: "2025-05-13",
    image: "/assets/blog-posts/design-system-3.jpg",
  },
];

export function sortedPosts() {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function latestPosts(count: number) {
  return sortedPosts().slice(0, count);
}

export function findPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function postUrl(post: BlogPost) {
  return `/blog/${post.slug}`;
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
