import { Fragment } from "react";

// Renders a blog post body written in the admin editor. Blocks are separated
// by blank lines:
//   ## Heading        → section heading (listed in the table of contents)
//   ### Sub-heading   → smaller heading
//   - item            → bullet list (one item per line)
//   ![caption](url)   → image
//   anything else     → paragraph (single line breaks are kept)

export type ArticleBlock =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; url: string; alt: string }
  | { type: "p"; text: string };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";

export function parseArticle(body: string): ArticleBlock[] {
  const used = new Map<string, number>();
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block): ArticleBlock => {
      if (block.startsWith("## ")) {
        const text = block.slice(3).trim();
        const base = slugify(text);
        const count = used.get(base) ?? 0;
        used.set(base, count + 1);
        return { type: "h2", text, id: count ? `${base}-${count + 1}` : base };
      }
      if (block.startsWith("### ")) return { type: "h3", text: block.slice(4).trim() };
      const image = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
      if (image) return { type: "image", alt: image[1], url: image[2] };
      const lines = block.split("\n");
      if (lines.every((line) => /^[-*] /.test(line.trim()))) return { type: "list", items: lines.map((line) => line.trim().slice(2)) };
      return { type: "p", text: block };
    });
}

export type ArticleStyles = { p: string; h2: string; h3: string; list: string; image: string; gap: string };

export default function ArticleBody({ blocks, styles }: { blocks: ArticleBlock[]; styles: ArticleStyles }) {
  return (
    <div className={`flex flex-col w-full ${styles.gap}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} id={block.id} className={styles.h2}>
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className={styles.h3}>
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className={styles.list}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "image":
            return <img key={i} alt={block.alt} loading="lazy" decoding="async" className={styles.image} src={block.url} />;
          default:
            return (
              <p key={i} className={styles.p}>
                {block.text.split("\n").map((line, j) => (
                  <Fragment key={j}>
                    {j > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
            );
        }
      })}
    </div>
  );
}
