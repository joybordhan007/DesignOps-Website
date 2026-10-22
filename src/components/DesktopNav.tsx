import { useEffect, useState } from "react";

// Desktop navbar, shared by every page and fixed to the top of the screen.
// It lives in its own layer outside the scaled page (see App.tsx) and is
// scaled with the same factor, so it lines up with the 1920px artboard.
// `hero` means the page opens with a video hero, where the bar sits lower,
// inside the hero. Contact is reached through the LET’S TALK button.

const links = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Company", href: "/company" },
];

const roll = "flex flex-col transition-transform duration-[380ms] ease-[cubic-bezier(0.2,0.75,0.3,1)] group-hover:-translate-y-1/2 group-focus-visible:-translate-y-1/2";

function isCurrent(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}

export default function DesktopNav({ path, hero, scale }: { path: string; hero: boolean; scale: number }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Sits where the Figma design puts it (inside the hero, or near the top on
  // other pages) and tucks up closer to the edge once the page scrolls.
  const top = scrolled ? 16 : hero ? 56 : 24;

  return (
    <div className="desktop-nav-layer" style={{ transform: `scale(${scale})` }}>
      <nav
        aria-label="Main"
        data-name="Desktop Nav"
        className={`flex items-center justify-between mx-auto px-[16px] py-[12px] rounded-[4px] transition-[transform,box-shadow] duration-300 ease-out w-[1560px] bg-[#f6f6f6] ${scrolled ? "shadow-[0px_6px_24px_rgba(0,0,0,0.14)]" : hero ? "" : "shadow-[0px_2px_4px_rgba(0,0,0,0.1)]"}`}
        style={{ transform: `translateY(${top}px)` }}
      >
        <a href="/" className="block h-[40px] shrink-0 w-[175px]" aria-label="DesignOps home">
          <img
            alt="DesignOps"
            className="block size-full"
            src="/assets/shared/logos/designops-logo.svg"
          />
        </a>

        <div className="flex gap-[32px] items-center leading-[1.2] text-[16px] uppercase whitespace-nowrap">
          {links.map((link) => {
            const current = isCurrent(path, link.href);
            const color = current ? "text-[#00b6ca]" : "text-[#171717] hover:text-[#00b6ca]";
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`transition-colors ${color} ${current ? "font-['Inter:Semi_Bold'] font-semibold" : "font-['Inter:Medium'] font-medium"}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <a
          href="/contact"
          className="flex gap-[6px] group items-center outline-none px-[26px] py-[14px] rounded-[4px] shadow-[0px_2px_3px_rgba(0,0,0,0.1)] shrink-0 focus-visible:ring-2 focus-visible:ring-[#171717] bg-[#00b6ca]"
        >
          <span className="block h-[19.2px] overflow-hidden">
            <span className={`${roll} font-['Inter:Medium'] font-medium leading-[1.2] text-[#f6f6f6] text-[16px] whitespace-nowrap`}>
              <span>LET’S TALK</span>
              <span aria-hidden="true">LET’S TALK</span>
            </span>
          </span>
          <span className="block overflow-hidden size-[18px]" aria-hidden="true">
            <span className={roll}>
              {[0, 1].map((i) => (
                <img
                  key={i}
                  alt=""
                  className="block size-[18px]"
                  src="/assets/shared/icons/arrow-subdirectory-light.svg"
                />
              ))}
            </span>
          </span>
        </a>
      </nav>
    </div>
  );
}
