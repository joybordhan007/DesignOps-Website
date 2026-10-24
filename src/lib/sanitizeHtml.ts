// Cleans formatted text from the dashboard's text editor before it is shown or
// saved: only simple formatting tags survive (paragraphs, bold, lists, links,
// headings, quotes, images), with no styles, classes or scripts. Links may only
// go to http(s), mailto, tel or site addresses; images only to http(s) or this site.

const ALLOWED: Record<string, string[]> = {
  p: [],
  br: [],
  strong: [],
  b: [],
  em: [],
  i: [],
  u: [],
  s: [],
  a: ["href"],
  ul: [],
  ol: [],
  li: [],
  h3: [],
  h4: [],
  blockquote: [],
  img: ["src", "alt"],
};

/** Tags whose contents are dropped along with them. */
const DROP = new Set(["script", "style", "iframe", "object", "embed", "template", "noscript", "svg", "math", "head", "title", "meta", "link"]);

const safeHref = (value: string) => /^(https?:|mailto:|tel:|\/(?!\/)|#)/i.test(value.trim());
const safeSrc = (value: string) => /^(https?:|\/(?!\/))/i.test(value.trim());

function clean(node: Node, doc: Document): Node[] {
  if (node.nodeType === Node.TEXT_NODE) return [doc.createTextNode(node.textContent ?? "")];
  if (node.nodeType !== Node.ELEMENT_NODE) return [];
  const element = node as Element;
  const tag = element.tagName.toLowerCase();
  if (DROP.has(tag)) return [];
  const children = Array.from(element.childNodes).flatMap((child) => clean(child, doc));
  // Unknown tags (div, span, font…) are unwrapped: their text is kept, the tag isn't.
  const mapped = tag === "div" ? "p" : tag === "h1" || tag === "h2" ? "h3" : tag;
  if (!(mapped in ALLOWED)) return children;
  const out = doc.createElement(mapped);
  for (const name of ALLOWED[mapped]) {
    const value = element.getAttribute(name);
    if (value == null) continue;
    if (name === "href" && !safeHref(value)) continue;
    if (name === "src" && !safeSrc(value)) continue;
    out.setAttribute(name, value);
  }
  if (mapped === "img" && !out.getAttribute("src")) return [];
  if (mapped === "a") {
    if (/^https?:/i.test(out.getAttribute("href") ?? "")) {
      out.setAttribute("target", "_blank");
      out.setAttribute("rel", "noopener noreferrer");
    }
  }
  out.append(...children);
  return [out];
}

/** Safe HTML for formatted text. Runs in the browser only (uses DOMParser). */
export default function sanitizeHtml(html: string): string {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const out = doc.createElement("div");
  out.append(...Array.from(doc.body.childNodes).flatMap((child) => clean(child, doc)));
  // An editor left with nothing but empty lines counts as empty.
  return out.textContent?.trim() || out.querySelector("img") ? out.innerHTML : "";
}
