import { ComponentType, MouseEvent, Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { findPost, findProject, findService } from "./content/helpers";
import useScaledSticky from "./lib/useScaledSticky";
import useMediaQuery from "./lib/useMediaQuery";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./mobile/MobileNav";
import { trackEvent, trackPageView } from "./lib/tracking";
import { reportVisit } from "./lib/visits";

// Phones and tablets (below 1024px) get the responsive pages in src/mobile;
// larger screens get the 1920px Figma artboards in src/websitepages, scaled to fit.
const MOBILE_QUERY = "(max-width: 1023.98px)"

type PageModule = { default: ComponentType }

// Pages are split into their own chunks and loaded on demand, so a phone never
// downloads the desktop pages (and vice versa). `preload` fetches a chunk early.
function lazyPage(load: () => Promise<PageModule>) {
  let loaded: ComponentType | undefined

  const preload = () => load().then((module) => (loaded = module.default))

  const Lazy = lazy(() => preload().then((component) => ({ default: component })))

  function Page() {
    const Loaded = loaded

    return Loaded ? <Loaded /> : <Lazy />
  }

  return { Page, preload }
}

function page(desktop: () => Promise<PageModule>, mobile: () => Promise<PageModule>, height: number) {
  return { desktop: lazyPage(desktop), mobile: lazyPage(mobile), height }
}

type Route = keyof typeof pages

// `height` is only the first-paint estimate of a desktop page; the real height
// is measured from the rendered page (see onReady below).
const pages = {
  "/": page(() => import("./websitepages/Home"), () => import("./mobile/pages/Home"), 13878),

  "/services": page(() => import("./websitepages/Services"), () => import("./mobile/pages/Services"), 6085),

  "/services/:slug": page(() => import("./websitepages/ServiceDetails"), () => import("./mobile/pages/ServiceDetails"), 6457),

  "/work": page(() => import("./websitepages/Work"), () => import("./mobile/pages/Work"), 8769),

  "/work/:slug": page(() => import("./websitepages/WorkDetails"), () => import("./mobile/pages/WorkDetails"), 8007),

  "/blog": page(() => import("./websitepages/Blog"), () => import("./mobile/pages/Blog"), 4008),

  "/blog/:slug": page(() => import("./websitepages/BlogDetails"), () => import("./mobile/pages/BlogDetails"), 4940),

  "/company": page(() => import("./websitepages/Company"), () => import("./mobile/pages/Company"), 4523),

  "/reviews": page(() => import("./websitepages/Reviews"), () => import("./mobile/pages/Reviews"), 3400),

  "/contact": page(() => import("./websitepages/Contact"), () => import("./mobile/pages/Contact"), 5003),

  "/404": page(() => import("./websitepages/NotFound"), () => import("./mobile/pages/NotFound"), 1960),
}

// Pages that open with a video hero; the desktop navbar sits inside the hero there.
const heroRoutes = new Set<Route>(["/", "/services", "/work", "/blog", "/company"])

function matchRoute(path: string): Route {
  if (path in pages && !path.includes(":")) return path as Route

  const [, section, slug] = /^\/(services|work|blog)\/([^/]+)\/?$/.exec(path) ?? []

  const name = decodeURIComponent(slug ?? "")

  if (section === "services" && findService(name)) return "/services/:slug"

  // "/work/case-study" is the old single case-study URL; it opens the first project.
  if (section === "work" && (findProject(name) || name === "case-study")) return "/work/:slug"

  if (section === "blog" && findPost(name)) return "/blog/:slug"

  return "/404"
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

/** Rendered next to the page inside Suspense, so it only mounts once the page has loaded. */
function Ready({ onReady }: { onReady: () => void }) {
  useLayoutEffect(onReady, [onReady])

  return null
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  const route = matchRoute(path)

  const isMobile = useMediaQuery(MOBILE_QUERY)

  const [scale, setScale] = useState(1)

  const [height, setHeight] = useState<number>(pages[route].height)

  // Bumped every time a page finishes rendering; DOM-dependent effects key off it.
  const [readyCount, setReadyCount] = useState(0)

  const onReady = useRef(() => setReadyCount((count) => count + 1)).current

  const pageRef = useRef<HTMLDivElement>(null)

  const pendingHash = useRef(window.location.hash.slice(1))

  // The tracking tags count the first page; later page switches are reported here.
  const trackedPath = useRef(path)

  useEffect(() => {
    if (path === trackedPath.current) return

    trackedPath.current = path

    trackPageView(path)
  }, [path])

  // Our own visit counts for the dashboard (every page, the first one included).
  useEffect(() => {
    reportVisit(path)
  }, [path])

  useLayoutEffect(() => {
    const resize = () => setScale(Math.min(1, document.documentElement.clientWidth / 1920))

    resize()

    window.addEventListener("resize", resize)

    return () => window.removeEventListener("resize", resize)
  }, [])

  // Swaps to another page: waits for its code, then cross-fades to it at the
  // top of the page (no blank frame, no visible scroll jump).
  const showPage = (next: string, hash: string) => {
    pendingHash.current = hash

    const entry = pages[matchRoute(next)][isMobileRef.current ? "mobile" : "desktop"]

    const swap = () => {
      flushSync(() => setPath(next))

      if (!hash) window.scrollTo({ top: 0, behavior: "instant" })
    }

    entry.preload().then(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (document.startViewTransition && !reduceMotion) document.startViewTransition(swap)
      else swap()
    })
  }

  const isMobileRef = useRef(isMobile)

  isMobileRef.current = isMobile

  useEffect(() => {
    const update = () => showPage(window.location.pathname, "")

    window.addEventListener("popstate", update)

    return () => window.removeEventListener("popstate", update)
  }, [])

  // Measure the rendered desktop page so the viewport height follows the
  // content, e.g. when the Blog page grows with new posts.
  useLayoutEffect(() => {
    const pageRoot = pageRef.current?.firstElementChild as HTMLElement | null

    if (isMobile || !pageRoot) return

    const measure = () => setHeight(pageRoot.offsetHeight || pages[route].height)

    measure()

    const observer = new ResizeObserver(measure)

    observer.observe(pageRoot)

    return () => observer.disconnect()
  }, [readyCount, isMobile, route])

  useScaledSticky(`${readyCount}-${isMobile}`)

  useEffect(() => {
    if (!readyCount) return

    const hash = pendingHash.current

    pendingHash.current = ""

    if (hash) scrollToId(hash)
  }, [readyCount])

  // Once the first page is up, fetch the other pages in the background so
  // later navigation is instant.
  useEffect(() => {
    if (readyCount !== 1) return

    const preloadAll = () => Object.values(pages).forEach((entry) => (isMobile ? entry.mobile : entry.desktop).preload())

    const idle = window.requestIdleCallback?.(preloadAll, { timeout: 4000 }) ?? window.setTimeout(preloadAll, 2500)

    return () => (window.cancelIdleCallback ? window.cancelIdleCallback(idle) : window.clearTimeout(idle))
  }, [readyCount, isMobile])

  const navigate = (next: string, hash = "") => {
    window.history.pushState({}, "", hash ? `${next}#${hash}` : next)

    if (next === path) {
      if (hash) scrollToId(hash)
      else window.scrollTo({ top: 0, behavior: "smooth" })

      return
    }

    showPage(next, hash)
  }

  // In-site links switch pages without a full reload.
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[href]",
    )

    if (anchor && event.currentTarget.contains(anchor)) {
      const [target, hash = ""] = (anchor.getAttribute("href") || "").split("#")

      if (/^(tel:|mailto:|https:\/\/(wa\.me|api\.whatsapp\.com)\/)/.test(target)) {
        trackEvent("contactClick", { method: target.split(":")[0] === "https" ? "whatsapp" : target.split(":")[0] })
      }

      const modified =
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0

      if (target.startsWith("/") && !modified && anchor.target !== "_blank") {
        event.preventDefault()

        navigate(target, hash)
      }
    }
  }

  useLayoutEffect(() => {
    const pageRoot = document.querySelector(".figma-canvas")

    if (!pageRoot) return

    pageRoot.querySelectorAll("p").forEach((label) => {
      if (label.textContent?.trim() === "Scroll Down") {
        label.nextElementSibling?.classList.add("scroll-cue-icon")
      }
    })
  }, [readyCount])

  if (isMobile) {
    const { Page } = pages[route].mobile

    return (
      <div className="bg-[#f5f5f5] min-h-svh overflow-x-clip" onClick={handleClick}>
        <MobileNav path={path} />
        <Suspense fallback={<div className="min-h-svh" />}>
          <Page key={path} />
          <Ready key={`ready-${path}`} onReady={onReady} />
        </Suspense>
      </div>
    )
  }

  const { Page } = pages[route].desktop

  return (
    <div
      className="figma-page-viewport"
      style={{ height: height * scale }}
      onClick={handleClick}
    >
      <DesktopNav path={path} hero={heroRoutes.has(route)} scale={scale} />
      <div
        ref={pageRef}
        className="figma-page-scale"
        style={{
          height,

          transform: `scale(${scale})`,

          width: 1920,
        }}
      >
        <Suspense fallback={null}>
          <Page />
          <Ready key={`ready-${path}`} onReady={onReady} />
        </Suspense>
      </div>
    </div>
  )
}
