import { findPost, findProject, findService } from "./helpers";
import { getContent } from "./store";

/** The slug in /services/:slug, /work/:slug or /blog/:slug. */
export function currentSlug() {
  return decodeURIComponent(window.location.pathname.split("/")[2] ?? "");
}

export const currentService = () => findService(currentSlug()) ?? getContent().services[0];
export const currentProject = () => findProject(currentSlug()) ?? getContent().projects[0];
export const currentPost = () => findPost(currentSlug()) ?? getContent().posts[0];
