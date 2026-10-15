import { ComponentType, MouseEvent, Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { findPost, latestPosts, postUrl } from "./data/blogPosts";
import useScaledSticky from "./lib/useScaledSticky";
import useMediaQuery from "./lib/useMediaQuery";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./mobile/MobileNav";

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

  "/services/ui-ux-design": page(() => import("./websitepages/UiUxDesign"), () => import("./mobile/pages/UiUxDesign"), 6457),

  "/work": page(() => import("./websitepages/Work"), () => import("./mobile/pages/Work"), 8769),

  "/work/case-study": page(() => import("./websitepages/CaseStudy"), () => import("./mobile/pages/CaseStudy"), 8007),

  "/blog": page(() => import("./websitepages/Blog"), () => import("./mobile/pages/Blog"), 4008),

  "/blog/:slug": page(() => import("./websitepages/BlogDetails"), () => import("./mobile/pages/BlogDetails"), 4940),

  "/company": page(() => import("./websitepages/Company"), () => import("./mobile/pages/Company"), 4523),

  "/contact": page(() => import("./websitepages/Contact"), () => import("./mobile/pages/Contact"), 5003),

  "/404": page(() => import("./websitepages/NotFound"), () => import("./mobile/pages/NotFound"), 1960),
}

// Pages without a video hero use the cyan navbar.
const brandRoutes = new Set<Route>(["/services/ui-ux-design", "/work/case-study", "/blog/:slug", "/contact"])

function matchRoute(path: string): Route {
  if (path in pages && path !== "/blog/:slug") return path as Route

  const post = /^\/blog\/([^/]+)\/?$/.exec(path)

  if (post && findPost(post[1])) return "/blog/:slug"

  return "/404"
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function routeForLabel(label: string): string | undefined {
  const text = label.replace(/\s+/g, " ").trim().toLowerCase()

  if (text.includes("view case study")) return "/work/case-study"

  if (text.includes("read now")) return postUrl(latestPosts(1)[0])

  if (text.includes("all articles")) return "/blog"

  if (text.includes("ui/ux design") || text.includes("ui ux design"))
    return "/services/ui-ux-design"

  if (
    text.includes("contact us") ||
    text.includes("let’s talk") ||
    text.includes("start a project")
  ) {
    return "/contact"
  }

  if (text === "services") return "/services"

  if (text === "work") return "/work"

  if (text === "blog") return "/blog"

  if (text === "company") return "/company"

  if (text === "home") return "/"
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

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[href]",
    )

    if (anchor && event.currentTarget.contains(anchor)) {
      const [target, hash = ""] = (anchor.getAttribute("href") || "").split("#")

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

      return
    }

    const target = event.target as HTMLElement

    // Interactive controls (form fields, FAQ toggles) handle their own clicks.
    if (target.closest("button, input, select, textarea, label, form, summary")) return

    if (
      target.closest('[data-name="Nav"]') &&
      !target.closest('[data-name="Component 57"], [data-node-id="1:681"]')
    ) {
      return
    }

    let element: HTMLElement | null = target

    for (
      let depth = 0;
      element && element !== event.currentTarget && depth < 7;
      depth += 1
    ) {
      const label = element.textContent || ""

      if (label.trim().length <= 100) {
        const next = routeForLabel(label)

        if (next) {
          event.preventDefault()

          navigate(next)

          return
        }
      }

      element = element.parentElement
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
        <MobileNav path={path} brand={brandRoutes.has(route)} />
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
      <DesktopNav path={path} brand={brandRoutes.has(route)} scale={scale} />
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
