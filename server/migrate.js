// Brings content saved by an older version of the site up to the current shape
// (see src/content/types.ts). Safe to run on content that is already current.
// Used by the server when it starts and by the website itself (src/content/store.ts),
// so a page never breaks on content that is missing a newer field.

const today = () => new Date().toISOString().slice(0, 10);

/** Fills in fields an item doesn't have yet; existing values always win. */
const fill = (items, defaults) => (items || []).map((item, index) => ({ ...defaults(item, index), ...item }));

const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);

/** Deep version of `fill` for plain objects: missing keys come from `fallback`. */
function withDefaults(value, fallback) {
  if (!isObject(fallback)) return value === undefined ? fallback : value;
  if (!isObject(value)) return structuredClone(fallback);
  const result = { ...value };
  for (const key of Object.keys(fallback)) result[key] = withDefaults(value[key], fallback[key]);
  return result;
}

/** `defaults` is src/content/defaultContent.json; missing settings are taken from it. */
export function migrate(content, defaults) {
  const date = today();
  const listed = (item) => ({ active: true, createdAt: item.date || date });
  const old = content.settings || {};

  // Every hero used to have its own video; now Home has one and the other pages share one.
  const heroes = Object.fromEntries(Object.entries(old.heroes || {}).map(([key, { video, ...hero }]) => [key, hero]));
  const heroVideos = old.heroVideos || {
    home: old.heroes?.home?.video ?? defaults?.settings?.heroVideos?.home,
    pages: old.heroes?.services?.video ?? defaults?.settings?.heroVideos?.pages,
  };
  // The footer used to have one field per social network; now it is a list.
  let footer = old.footer;
  if (footer && !Array.isArray(footer.socials)) {
    const { linkedin, facebook, ...rest } = footer;
    const socials = [
      ["linkedin", linkedin],
      ["facebook", facebook],
    ].flatMap(([platform, url]) => (url ? [{ id: `social-${platform}`, platform, url }] : []));
    footer = { ...rest, socials };
  }
  // Tracking used to be one flat list of IDs and switches; now GTM and Meta each have their own.
  let tracking = old.tracking;
  if (tracking && !tracking.gtm && !tracking.meta) {
    const on = tracking.enabled !== false;
    tracking = {
      gtm: { enabled: on, containerId: tracking.gtmId || "" },
      meta: { enabled: on, pixelId: tracking.metaPixelId || "", domainVerification: tracking.verification?.meta || "" },
    };
  }
  // The rating card is now worked out from the reviews themselves.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { rating, ...current } = old;
  const settings = withDefaults({ ...current, heroes, heroVideos, ...(footer && { footer }), ...(tracking && { tracking }) }, defaults?.settings || {});

  const services = fill(content.services, (item) => ({ ...listed(item), showOnHome: true })).map(({ description, ...service }) => ({
    ...service,
    // Home card and Services page now share one short description.
    summary: service.summary || description || "",
    // The Services page picture and the details page picture are now one.
    image: service.image || service.detail?.image || "",
    detail: serviceDetail(service, settings, content.process),
  }));

  // The Work page used to show the first four projects as wide cards and the rest as a grid.
  const projects = fill(content.projects, (item, index) => ({ ...listed(item), layout: index < 4 ? "horizontal" : "vertical" })).map((project) => ({
    ...project,
    // The card image and the details page image are now one.
    cover: project.cover || project.detail?.heroImage || "",
    detail: projectDetail(project),
  }));

  const posts = fill(content.posts, (item) => ({ ...listed(item), showOnHome: true })).map(({ body, ...post }) => ({
    ...post,
    sections: Array.isArray(post.sections) ? post.sections : articleSections(body || "", post.id),
  }));

  const reviews = fill(content.reviews, (item) => ({ ...listed(item), rating: 5 }));

  // Achievements used to be two lists (Home and Company page); now it is one list and
  // each number says where it is shown. Only exact copies (same number and words) are merged.
  let achievements = content.achievements;
  if (achievements && !Array.isArray(achievements)) {
    const { home = [], company = [] } = achievements;
    const key = (s) => `${s.prefix}${s.value}${s.suffix}${s.after}|${s.label}`;
    achievements = [
      ...home.map((s) => ({ ...s, showOnHome: true, showOnCompany: company.some((c) => key(c) === key(s)) })),
      ...company.filter((c) => !home.some((s) => key(s) === key(c))).map((s) => ({ ...s, showOnHome: false, showOnCompany: true })),
    ];
  }
  achievements = fill(achievements, () => ({ showOnHome: true, showOnCompany: true }));

  return { ...content, settings, services, projects, posts, reviews, achievements };
}

// IDs made from the item's own id, so running the migration again gives the same result.
const blockId = (owner, kind, index) => `${owner}-${kind}-${index + 1}`;
const hasText = (...values) => values.some((value) => (Array.isArray(value) ? value.length : String(value ?? "").trim()));

/**
 * A service's details page used to have one intro, one deliverables list and one
 * working process; now each is a list of blocks.
 */
function serviceDetail(service, settings, homeProcess) {
  const old = service.detail || {};
  if (Array.isArray(old.intros) && Array.isArray(old.deliverableSections) && Array.isArray(old.processSections)) {
    const { image, ...detail } = old; // eslint-disable-line @typescript-eslint/no-unused-vars
    return detail;
  }
  // Services that predate their own working process started from the Home page one.
  const steps = old.process || structuredClone(homeProcess || []);
  return {
    tagline: old.tagline || "",
    intros: hasText(old.intro, old.body, old.features) ? [{ id: blockId(service.id, "intro", 0), heading: old.intro || "", text: old.body || "", features: old.features || [] }] : [],
    deliverableSections: hasText(old.deliverablesTitle, old.deliverables) ? [{ id: blockId(service.id, "deliverables", 0), heading: old.deliverablesTitle || "", items: old.deliverables || [] }] : [],
    processSections: steps.length ? [{ id: blockId(service.id, "process", 0), title: old.processTitle || structuredClone(settings.titles.process), steps }] : [],
  };
}

/** A project's challenge, solution, colour palette and tools used to appear once; now each is a list of blocks. */
function projectDetail(project) {
  const old = project.detail || {};
  if (Array.isArray(old.challenges)) {
    const { heading, heroImage, ...detail } = old; // eslint-disable-line @typescript-eslint/no-unused-vars
    return detail;
  }
  const challenge = old.challenge || {};
  const solution = old.solution || {};
  return {
    overview: old.overview || "",
    goals: old.goals || "",
    goalPoints: old.goalPoints || [],
    challenges: hasText(challenge.title, challenge.text, challenge.points, challenge.image)
      ? [{ id: blockId(project.id, "challenge", 0), title: challenge.title || "", text: challenge.text || "", points: challenge.points || [], image: challenge.image || "", imageSide: "right" }]
      : [],
    solutions: hasText(solution.title, solution.text, solution.image, solution.features)
      ? [
          {
            id: blockId(project.id, "solution", 0),
            title: solution.title || "",
            text: solution.text || "",
            image: solution.image || "",
            imageTitle: solution.imageTitle || "",
            imageText: solution.imageText || "",
            features: solution.features || [],
            stat: solution.stat || { value: "", title: "", text: "" },
          },
        ]
      : [],
    palettes: old.palette?.length ? [{ id: blockId(project.id, "palette", 0), title: "", text: "", colors: old.palette }] : [],
    toolSets: old.tags?.length ? [{ id: blockId(project.id, "tools", 0), title: "", items: old.tags }] : [],
  };
}

const escapeHtml = (text) => String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Turns an article written in the old text format ("## " headings, "### " sub-headings,
 * "- " lists, "![caption](url)" images, blank lines between paragraphs) into sections:
 * every "## " heading starts one, and the text under it becomes formatted text.
 */
function articleSections(body, postId) {
  const sections = [];
  let current = null;
  const start = (heading) => {
    current = { id: blockId(postId, "section", sections.length), heading, subheading: "", html: "", image: "" };
    sections.push(current);
  };
  const blocks = body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
  for (const block of blocks) {
    if (block.startsWith("## ")) {
      start(block.slice(3).trim());
      continue;
    }
    if (!current) start("");
    const image = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    const lines = block.split("\n");
    if (block.startsWith("### ")) current.html += `<h3>${escapeHtml(block.slice(4).trim())}</h3>`;
    else if (image) current.html += `<p><img src="${escapeHtml(image[2])}" alt="${escapeHtml(image[1])}"></p>`;
    else if (lines.every((line) => /^[-*] /.test(line.trim()))) current.html += `<ul>${lines.map((line) => `<li>${escapeHtml(line.trim().slice(2))}</li>`).join("")}</ul>`;
    else current.html += `<p>${lines.map(escapeHtml).join("<br>")}</p>`;
  }
  return sections;
}
