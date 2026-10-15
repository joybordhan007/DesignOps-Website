import { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import Home from "./websitepages/Home";
import Services from "./websitepages/Services";
import UiUxDesign from "./websitepages/UiUxDesign";
import Work from "./websitepages/Work";
import CaseStudy from "./websitepages/CaseStudy";
import Blog from "./websitepages/Blog";
import BlogDetails from "./websitepages/BlogDetails";
import Company from "./websitepages/Company";
import Contact from "./websitepages/Contact";
import NotFound from "./websitepages/NotFound";
import { findPost, latestPosts, postUrl } from "./data/blogPosts";
import useScaledSticky from "./lib/useScaledSticky";

type Route = keyof typeof pages

// `height` is only the first-paint estimate; the real height is measured
// from the rendered page (see the ResizeObserver below).
const pages = {
  "/": { component: Home, height: 13878 },

  "/services": { component: Services, height: 6085 },

  "/services/ui-ux-design": { component: UiUxDesign, height: 6457 },

  "/work": { component: Work, height: 8769 },

  "/work/case-study": { component: CaseStudy, height: 8007 },

  "/blog": { component: Blog, height: 4008 },

  "/blog/:slug": { component: BlogDetails, height: 4940 },

  "/company": { component: Company, height: 4523 },

  "/contact": { component: Contact, height: 5003 },

  "/404": { component: NotFound, height: 1960 },
} as const;

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

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  const route = matchRoute(path)

  const [scale, setScale] = useState(1)

  const [height, setHeight] = useState<number>(pages[route].height)

  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const resize = () => setScale(Math.min(1, window.innerWidth / 1920))

    resize()

    window.addEventListener("resize", resize)

    return () => window.removeEventListener("resize", resize)
  }, [])

  useEffect(() => {
    const update = () => setPath(window.location.pathname)

    window.addEventListener("popstate", update)

    return () => window.removeEventListener("popstate", update)
  }, [])

  // Measure the rendered page so the viewport height follows the content,
  // e.g. when the Blog page grows with new posts.
  useLayoutEffect(() => {
    const pageRoot = pageRef.current?.firstElementChild as HTMLElement | null

    if (!pageRoot) return

    const measure = () => setHeight(pageRoot.offsetHeight || pages[route].height)

    measure()

    const observer = new ResizeObserver(measure)

    observer.observe(pageRoot)

    return () => observer.disconnect()
  }, [path, route])

  useScaledSticky(path)

  const pendingHash = useRef(window.location.hash.slice(1))

  useEffect(() => {
    const hash = pendingHash.current

    pendingHash.current = ""

    if (hash) scrollToId(hash)
  }, [path])

  const navigate = (next: string, hash = "") => {
    window.history.pushState({}, "", hash ? `${next}#${hash}` : next)

    if (next === path) {
      if (hash) scrollToId(hash)
      else window.scrollTo({ top: 0, behavior: "smooth" })

      return
    }

    pendingHash.current = hash

    if (!hash) window.scrollTo({ top: 0 })

    setPath(next)
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
    if (target.closest("button, input, select, textarea, label, form")) return

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
  }, [path])

  const Page = pages[route].component

  return (
    <div
      className="figma-page-viewport"
      style={{ height: height * scale }}
      onClick={handleClick}
    >
      <div
        ref={pageRef}
        className="figma-page-scale"
        style={{
          height,

          transform: `scale(${scale})`,

          width: 1920,
        }}
      >
        <Page />
      </div>
    </div>
  )
}
