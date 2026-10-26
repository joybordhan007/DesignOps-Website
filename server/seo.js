// Search-engine data for every page: title, description, canonical address,
// share picture and structured data (schema.org JSON-LD), built from the
// content and Website Settings → SEO. The server writes it into each page it
// sends (so Google sees it without running scripts); the website updates the
// title and description itself when visitors move between pages.

/** Words without the dashboard's *highlight* stars and line breaks. */
const plain = (text) =>
  String(text ?? "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** At most `max` characters, cut at a word. */
function clip(text, max = 160) {
  const clean = plain(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length).replace(/[,.;:\s]+$/, "")}…`;
}

const absolute = (origin, url) => (!url ? "" : /^https?:\/\//i.test(url) ? url : `${origin}${url.startsWith("/") ? "" : "/"}${url}`);

const shown = (items) => (items || []).filter((item) => item.active !== false);

const STATIC_PAGES = { "/": "home", "/services": "services", "/work": "work", "/blog": "blog", "/company": "company", "/contact": "contact", "/reviews": "reviews" };

/** The business as schema.org data, shared by every page. */
function organization(content, origin) {
  const { settings } = content;
  const seo = settings.seo || {};
  const business = seo.business || {};
  const contact = settings.contact || {};
  return {
    "@type": business.type || "ProfessionalService",
    "@id": `${origin}/#organization`,
    name: business.name || "DesignOps",
    url: `${origin}/`,
    logo: absolute(origin, settings.favicons?.site?.split("?")[0] || "/favicon.svg"),
    ...(seo.image && { image: absolute(origin, seo.image) }),
    description: clip(seo.description, 300),
    ...(contact.phone && { telephone: contact.phone }),
    ...(contact.email && { email: contact.email }),
    ...((contact.address || business.city) && {
      address: { "@type": "PostalAddress", ...(contact.address && { streetAddress: plain(contact.address) }), ...(business.city && { addressLocality: business.city }), ...(business.country && { addressCountry: business.country }) },
    }),
    ...(business.foundingYear && { foundingDate: business.foundingYear }),
    ...(business.areaServed && { areaServed: business.areaServed }),
    ...(seo.keywords?.length && { knowsAbout: seo.keywords }),
    sameAs: (settings.footer?.socials || []).map((s) => s.url).filter((url) => /^https?:\/\//i.test(url)),
  };
}

const breadcrumbs = (origin, trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${origin}${path}` })),
});

/**
 * Everything search engines need about one page. `content` is the public content
 * (inactive items left out); `origin` is e.g. https://designops.agency.
 */
export function pageSeo(content, rawPath, origin) {
  const { settings } = content;
  const seo = settings.seo || {};
  const pages = seo.pages || {};
  const template = seo.titleTemplate?.includes("%s") ? seo.titleTemplate : "%s";
  const nav = settings.labels?.nav || {};
  const path = rawPath.replace(/\/+$/, "") || "/";
  const org = organization(content, origin);
  const titled = (title) => template.replace("%s", plain(title));
  const page = {
    status: 200,
    title: plain(seo.title),
    description: clip(seo.description),
    image: absolute(origin, seo.image),
    canonical: `${origin}${path === "/" ? "/" : path}`,
    type: "website",
    noindex: false,
    jsonLd: [org],
  };

  const key = STATIC_PAGES[path];
  if (key) {
    const own = pages[key] || {};
    page.title = key === "home" ? plain(own.title || seo.title) : titled(own.title || nav[key] || key);
    page.description = clip(own.description || seo.description);
    if (key === "home") page.jsonLd.push({ "@type": "WebSite", "@id": `${origin}/#website`, url: `${origin}/`, name: org.name, publisher: { "@id": org["@id"] } });
    else page.jsonLd.push(breadcrumbs(origin, [[nav.home || "Home", "/"], [nav[key] || plain(own.title), path]]));
    if (key === "services")
      page.jsonLd.push({
        "@type": "ItemList",
        itemListElement: shown(content.services).map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${origin}/services/${s.slug}`, name: plain(s.title) })),
      });
    if (key === "contact") {
      page.jsonLd.push({ "@type": "ContactPage", url: page.canonical, about: { "@id": org["@id"] } });
      if (content.faqs?.length)
        page.jsonLd.push({
          "@type": "FAQPage",
          mainEntity: content.faqs.map((f) => ({ "@type": "Question", name: plain(f.question), acceptedAnswer: { "@type": "Answer", text: plain(f.answer) } })),
        });
    }
    return finish(page);
  }

  if (path === "/privacy" || path === "/terms") {
    const legal = settings.legal?.[path.slice(1)] || {};
    page.title = titled(legal.title || path.slice(1));
    page.description = clip(legal.intro || seo.description);
    return finish(page);
  }

  const [, section, rawSlug] = /^\/(services|work|blog)\/([^/]+)$/.exec(path) || [];
  const slug = decodeURIComponent(rawSlug || "");
  const own = (item) => item.seo || {};

  if (section === "services") {
    const service = shown(content.services).find((s) => s.slug === slug);
    if (service) {
      page.title = titled(own(service).title || service.title);
      page.description = clip(own(service).description || service.summary || service.detail?.intros?.[0]?.text);
      page.image = absolute(origin, own(service).image || service.image) || page.image;
      page.jsonLd.push(
        { "@type": "Service", name: plain(service.title), serviceType: plain(service.title), description: page.description, url: page.canonical, ...(page.image && { image: page.image }), provider: { "@id": org["@id"] }, areaServed: org.areaServed },
        breadcrumbs(origin, [[nav.home || "Home", "/"], [nav.services || "Services", "/services"], [plain(service.title), path]]),
      );
      return finish(page);
    }
  }

  if (section === "work") {
    const project = shown(content.projects).find((p) => p.slug === slug);
    if (project) {
      page.title = titled(own(project).title || `${project.title}${project.category ? ` – ${project.category}` : ""}`);
      page.description = clip(own(project).description || project.summary || project.detail?.overview);
      page.image = absolute(origin, own(project).image || project.cover) || page.image;
      page.type = "article";
      page.jsonLd.push(
        { "@type": "CreativeWork", name: plain(project.title), headline: plain(project.title), description: page.description, url: page.canonical, ...(page.image && { image: page.image }), ...(project.category && { genre: project.category }), creator: { "@id": org["@id"] } },
        breadcrumbs(origin, [[nav.home || "Home", "/"], [nav.work || "Work", "/work"], [plain(project.title), path]]),
      );
      return finish(page);
    }
  }

  if (section === "blog") {
    const post = shown(content.posts).find((p) => p.slug === slug);
    if (post) {
      page.title = titled(own(post).title || post.title);
      page.description = clip(own(post).description || post.excerpt || post.sections?.[0]?.html?.replace(/<[^>]+>/g, " "));
      page.image = absolute(origin, own(post).image || post.image) || page.image;
      page.type = "article";
      page.jsonLd.push(
        {
          "@type": "BlogPosting",
          headline: clip(post.title, 110),
          description: page.description,
          url: page.canonical,
          mainEntityOfPage: page.canonical,
          ...(page.image && { image: page.image }),
          ...(post.date && { datePublished: post.date }),
          ...(post.categories?.length && { keywords: post.categories.join(", ") }),
          author: { "@id": org["@id"] },
          publisher: { "@id": org["@id"] },
        },
        breadcrumbs(origin, [[nav.home || "Home", "/"], [nav.blog || "Blog", "/blog"], [plain(post.title), path]]),
      );
      return finish(page);
    }
  }

  // Anything else is the "page not found" page: a real 404, kept out of search results.
  page.status = 404;
  page.noindex = true;
  page.title = titled(settings.labels?.notFound?.badge || "Page not found");
  page.canonical = "";
  page.jsonLd = [];
  return page;
}

function finish(page) {
  page.jsonLd = page.jsonLd.length ? [{ "@context": "https://schema.org", "@graph": page.jsonLd }] : [];
  return page;
}

const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The <head> tags for a page (title and description are replaced in place by the server). */
export function seoHead(page, content) {
  const seo = content.settings.seo || {};
  const tags = [
    page.canonical && `<link rel="canonical" href="${attr(page.canonical)}" />`,
    page.noindex ? `<meta name="robots" content="noindex, follow" />` : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:type" content="${page.type}" />`,
    `<meta property="og:site_name" content="${attr(seo.business?.name || "DesignOps")}" />`,
    page.canonical && `<meta property="og:url" content="${attr(page.canonical)}" />`,
    page.image && `<meta property="og:image" content="${attr(page.image)}" />`,
    `<meta name="twitter:card" content="${page.image ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${attr(page.title)}" />`,
    `<meta name="twitter:description" content="${attr(page.description)}" />`,
    page.image && `<meta name="twitter:image" content="${attr(page.image)}" />`,
    seo.verification?.google && /^[\w-]{4,120}$/.test(seo.verification.google) && `<meta name="google-site-verification" content="${attr(seo.verification.google)}" />`,
    seo.verification?.bing && /^[\w-]{4,120}$/.test(seo.verification.bing) && `<meta name="msvalidate.01" content="${attr(seo.verification.bing)}" />`,
    ...page.jsonLd.map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.filter(Boolean).join("\n");
}
