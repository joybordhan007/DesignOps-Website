import { getContent } from "./store";
import type { Labels, Post, Project, Service } from "./types";

// Lookups and URLs for the editable content.

export function sortedPosts(posts: Post[] = getContent().posts) {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function latestPosts(count: number, posts?: Post[]) {
  return sortedPosts(posts).slice(0, count);
}

export const findPost = (slug: string) => getContent().posts.find((post) => post.slug === slug);
export const findService = (slug: string) => getContent().services.find((service) => service.slug === slug);
export const findProject = (slug: string) => getContent().projects.find((project) => project.slug === slug);

export const postUrl = (post: Pick<Post, "slug">) => `/blog/${post.slug}`;
export const serviceUrl = (service: Pick<Service, "slug">) => `/services/${service.slug}`;
export const projectUrl = (project: Pick<Project, "slug">) => `/work/${project.slug}`;

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** Video poster: the first-frame still saved next to bundled hero videos. */
export function posterFor(video: string) {
  return video.startsWith("/videos/") ? video.replace(/\.(mp4|webm)$/i, ".webp") : undefined;
}

/** Years like 2019 read better without a thousands separator. */
export const grouping = (value: number) => !(value >= 1900 && value <= 2100);

/** The site's main pages, named by the nav labels in Website Settings. */
export const pageLinks = (nav: Labels["nav"]) => [
  { label: nav.home, href: "/" },
  { label: nav.services, href: "/services" },
  { label: nav.work, href: "/work" },
  { label: nav.blog, href: "/blog" },
  { label: nav.company, href: "/company" },
  { label: nav.reviews, href: "/reviews" },
];
