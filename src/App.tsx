import { MouseEvent, useEffect, useLayoutEffect, useState } from "react";
import Home from "./generated/Page1_976";
import Services from "./generated/Page1_1235";
import UiUxDesign from "./generated/Page1_1368";
import Work from "./generated/Page1_1533";
import CaseStudy from "./generated/Page1_1803";
import Blog from "./generated/Page1_2050";
import Article from "./generated/Page1_2097";
import Company from "./generated/Page1_2170";
import Contact from "./generated/Page1_2301";

type Route = keyof typeof pages;

const pages = {
  "/": { component: Home, height: 12078 },
  "/services": { component: Services, height: 6085 },
  "/services/ui-ux-design": { component: UiUxDesign, height: 6457 },
  "/work": { component: Work, height: 8769 },
  "/work/case-study": { component: CaseStudy, height: 8007 },
  "/blog": { component: Blog, height: 4008 },
  "/blog/design-system": { component: Article, height: 4940 },
  "/company": { component: Company, height: 4523 },
  "/contact": { component: Contact, height: 5003 },
} as const;

function currentRoute(): Route {
  return (window.location.pathname in pages ? window.location.pathname : "/") as Route;
}

function routeForLabel(label: string): Route | undefined {
  const text = label.replace(/\s+/g, " ").trim().toLowerCase();
  if (text.includes("view case study")) return "/work/case-study";
  if (text.includes("why your saas needs a design system") || text.includes("read now")) {
    return "/blog/design-system";
  }
  if (text.includes("ui/ux design") || text.includes("ui ux design")) return "/services/ui-ux-design";
  if (text.includes("contact us") || text.includes("let’s talk") || text.includes("start a project")) {
    return "/contact";
  }
  if (text === "services") return "/services";
  if (text === "work") return "/work";
  if (text === "blog") return "/blog";
  if (text === "company") return "/company";
  if (text === "home") return "/";
}

export default function App() {
  const [route, setRoute] = useState<Route>(currentRoute);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const resize = () => setScale(Math.min(1, window.innerWidth / 1920));
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const update = () => setRoute(currentRoute());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  const navigate = (next: Route) => {
    window.history.pushState({}, "", next);
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    let element = event.target as HTMLElement | null;
    for (let depth = 0; element && element !== event.currentTarget && depth < 7; depth += 1) {
      const label = element.textContent || "";
      if (label.trim().length <= 100) {
        const next = routeForLabel(label);
        if (next) {
          event.preventDefault();
          navigate(next);
          return;
        }
      }
      element = element.parentElement;
    }
  };

  const page = pages[route];
  const Page = page.component;

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
  );
}
