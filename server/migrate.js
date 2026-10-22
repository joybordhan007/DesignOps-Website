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
  const settings = withDefaults({ ...old, heroes, heroVideos, ...(footer && { footer }), ...(tracking && { tracking }) }, defaults?.settings || {});

  // Services used to share the Home page working process; each now starts with a copy of it.
  const services = fill(content.services, (item) => ({ ...listed(item), showOnHome: true })).map(({ description, ...service }) => ({
    ...service,
    // Home card and Services page now share one short description.
    summary: service.summary || description || "",
    detail: {
      ...service.detail,
      processTitle: service.detail?.processTitle || structuredClone(settings.titles.process),
      process: service.detail?.process || structuredClone(content.process || []),
    },
  }));

  // The Work page used to show the first four projects as wide cards and the rest as a grid.
  const projects = fill(content.projects, (item, index) => ({ ...listed(item), layout: index < 4 ? "horizontal" : "vertical" }));

  const posts = fill(content.posts, (item) => ({ ...listed(item), showOnHome: true }));

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
