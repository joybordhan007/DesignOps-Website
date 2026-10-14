import { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from "react"

import Home from "./generated/Home"

import Services from "./generated/Services"

import UiUxDesign from "./generated/UiUxDesign"

import Work from "./generated/Work"

import CaseStudy from "./generated/CaseStudy"

import Blog from "./generated/Blog"

import BlogArticle from "./generated/BlogArticle"

import Company from "./generated/Company"

import Contact from "./generated/Contact"

type Route = keyof typeof pages

const pages = {
  "/": { component: Home, height: 13878 },

  "/services": { component: Services, height: 6085 },

  "/services/ui-ux-design": { component: UiUxDesign, height: 6457 },

  "/work": { component: Work, height: 8769 },

  "/work/case-study": { component: CaseStudy, height: 8007 },

  "/blog": { component: Blog, height: 4008 },

  "/blog/design-system": { component: BlogArticle, height: 4940 },

  "/company": { component: Company, height: 4523 },

  "/contact": { component: Contact, height: 5003 },
} as const

function currentRoute(): Route {
  return (
    window.location.pathname in pages ? window.location.pathname : "/"
  ) as Route
}

function isRoute(path: string): path is Route {
  return path in pages
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function routeForLabel(label: string): Route | undefined {
  const text = label.replace(/\s+/g, " ").trim().toLowerCase()

  if (text.includes("view case study")) return "/work/case-study"

  if (
    text.includes("why your saas needs a design system") ||
    text.includes("read now")
  ) {
    return "/blog/design-system"
  }

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
  const [route, setRoute] = useState<Route>(currentRoute)

  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const resize = () => setScale(Math.min(1, window.innerWidth / 1920))

    resize()

    window.addEventListener("resize", resize)

    return () => window.removeEventListener("resize", resize)
  }, [])

  useEffect(() => {
    const update = () => setRoute(currentRoute())

    window.addEventListener("popstate", update)

    return () => window.removeEventListener("popstate", update)
  }, [])

  const pendingHash = useRef(window.location.hash.slice(1))

  useEffect(() => {
    const hash = pendingHash.current

    pendingHash.current = ""

    if (hash) scrollToId(hash)
  }, [route])

  const navigate = (next: Route, hash = "") => {
    window.history.pushState({}, "", hash ? `${next}#${hash}` : next)

    if (next === route) {
      if (hash) scrollToId(hash)
      else window.scrollTo({ top: 0, behavior: "smooth" })

      return
    }

    pendingHash.current = hash

    if (!hash) window.scrollTo({ top: 0 })

    setRoute(next)
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[href]",
    )

    if (anchor && event.currentTarget.contains(anchor)) {
      const [path, hash = ""] = (anchor.getAttribute("href") || "").split("#")

      const modified =
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0

      if (isRoute(path) && !modified && anchor.target !== "_blank") {
        event.preventDefault()

        navigate(path, hash)
      }

      return
    }

    const target = event.target as HTMLElement

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
  }, [route])

  const page = pages[route]

  const Page = page.component

  return (
    <div
      className="figma-page-viewport"
      style={{ height: page.height * scale }}
      onClick={handleClick}
    >
      <div
        className="figma-page-scale"
        style={{
          height: page.height,

          transform: `scale(${scale})`,

          width: 1920,
        }}
      >
        <Page />
      </div>
    </div>
  )
}
