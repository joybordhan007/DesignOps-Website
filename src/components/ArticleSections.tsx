import { useMemo } from "react";
import type { ArticleSection } from "@/content/types";
import sanitizeHtml from "@/lib/sanitizeHtml";

// A blog post's article: one block per section (heading, sub-heading, formatted
// text, optional picture). Section headings make the table of contents.

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";

/** Sections with a unique page anchor each; headings become table-of-contents entries. */
export function useArticle(sections: ArticleSection[]) {
  return useMemo(() => {
    const used = new Map<string, number>();
    const items = sections.map((section) => {
      const base = slugify(section.heading);
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);
      return { ...section, anchor: count ? `${base}-${count + 1}` : base, html: sanitizeHtml(section.html) };
    });
    return { items, toc: items.filter((s) => s.heading.trim()).map((s) => ({ id: s.anchor, text: s.heading })) };
  }, [sections]);
}

export type ArticleSectionStyles = {
  /** Space between sections. */
  gap: string;
  section: string;
  h2: string;
  subheading: string;
  /** Typography for the formatted text (applied to its container). */
  body: string;
  image: string;
};

export default function ArticleSections({ items, styles }: { items: ReturnType<typeof useArticle>["items"]; styles: ArticleSectionStyles }) {
  return (
    <div className={`flex flex-col w-full ${styles.gap}`}>
      {items.map((section) => (
        <section key={section.id} id={section.anchor} className={styles.section}>
          {section.heading.trim() && <h2 className={styles.h2}>{section.heading}</h2>}
          {section.subheading.trim() && <p className={styles.subheading}>{section.subheading}</p>}
          {section.html && <div className={styles.body} dangerouslySetInnerHTML={{ __html: section.html }} />}
          {section.image && <img alt={section.heading} loading="lazy" decoding="async" className={styles.image} src={section.image} />}
        </section>
      ))}
    </div>
  );
}
