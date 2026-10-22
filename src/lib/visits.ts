// Reports each page view to the site's own server for the dashboard reports
// (POST /api/visit, see server/index.js). Nothing personal is sent: the page,
// the device size, where the visit came from, and whether this browser is new
// today or starting a new visit.

const today = () => new Date().toISOString().slice(0, 10);

/** Reads and updates a storage flag; false when storage is blocked. */
function firstTime(storage: () => Storage, key: string, value: string) {
  try {
    const store = storage();
    if (store.getItem(key) === value) return false;
    store.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

const device = () => {
  const width = window.innerWidth;
  return width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";
};

export function reportVisit(path: string) {
  const newSession = firstTime(() => sessionStorage, "do-visit-session", "1");
  const body = JSON.stringify({
    path,
    device: device(),
    newVisitor: firstTime(() => localStorage, "do-visit-day", today()),
    newSession,
    referrer: newSession ? document.referrer : "",
  });
  try {
    if (navigator.sendBeacon?.("/api/visit", new Blob([body], { type: "application/json" }))) return;
  } catch {
    /* fall back to fetch */
  }
  fetch("/api/visit", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
}
