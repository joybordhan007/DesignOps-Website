import type { Content } from "../src/content/types";

/** See seo.js. */
export type PageSeoResult = {
  status: 200 | 404;
  title: string;
  description: string;
  image: string;
  canonical: string;
  type: "website" | "article";
  noindex: boolean;
  jsonLd: object[];
};

export function pageSeo(content: Content, path: string, origin: string): PageSeoResult;
export function seoHead(page: PageSeoResult, content: Content): string;
