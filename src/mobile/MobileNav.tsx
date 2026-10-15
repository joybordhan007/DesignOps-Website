import { useEffect, useState } from "react";
import TalkButton from "./TalkButton";

// Mobile/tablet header: logo + menu button in a bar that sticks to the top of
// the screen. The menu opens as a panel with every page and the LET'S TALK button.
// `brand` is the cyan bar used by pages without a hero (UI/UX, Case Study, Contact, Blog post).

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Company", href: "/company" },
  { label: "Contact Us", href: "/contact" },
];

export default function MobileNav({ path, brand = false }: { path: string; brand?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isCurrent = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 px-[12px] pt-[12px]" data-name="Mobile Nav">
      <div
        className={`flex h-[60px] items-center justify-between pl-[14px] pr-[8px] relative rounded-[6px] shadow-[0px_2px_10px_rgba(0,0,0,0.12)] ${
          brand ? "bg-[#00b6ca]" : "bg-[#f6f6f6]"
        }`}
      >
        <a href="/" className="block h-[34px] w-[149px]" aria-label="DesignOps home" onClick={() => setOpen(false)}>
          <img
            alt="DesignOps"
            className="block size-full"
            src={brand ? "/assets/shared/logos/designops-logo-light.svg" : "/assets/shared/logos/designops-logo.svg"}
          />
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className={`cursor-pointer flex items-center justify-center rounded-[4px] size-[44px] ${brand ? "text-white" : "text-[#171717]"}`}
        >
          <span className="relative block h-[14px] w-[22px]" aria-hidden="true">
            <span className={`absolute bg-current h-[2px] left-0 rounded-full transition-transform duration-300 w-full ${open ? "top-[6px] rotate-45" : "top-0"}`} />
            <span className={`absolute bg-current h-[2px] left-0 rounded-full top-[6px] transition-opacity duration-200 w-full ${open ? "opacity-0" : ""}`} />
            <span className={`absolute bg-current h-[2px] left-0 rounded-full transition-transform duration-300 w-full ${open ? "top-[6px] -rotate-45" : "top-[12px]"}`} />
          </span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main"
        className={`absolute bg-[#f6f6f6] left-[12px] mt-[8px] overflow-hidden right-[12px] rounded-[6px] shadow-[0px_12px_32px_rgba(0,0,0,0.18)] transition-[opacity,transform,visibility] duration-300 ${
          open ? "opacity-100 translate-y-0 visible" : "invisible opacity-0 -translate-y-[8px]"
        }`}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setOpen(false);
        }}
      >
        <ul className="flex flex-col px-[20px] py-[8px]">
          {links.map((link) => (
            <li key={link.href} className="border-[rgba(0,0,0,0.08)] border-b last:border-b-0">
              <a
                href={link.href}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                className={`block font-['Inter:Medium'] font-medium py-[16px] text-[16px] uppercase ${isCurrent(link.href) ? "text-[#00b6ca]" : "text-[#171717]"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-[20px] pb-[20px]">
          <TalkButton className="w-full justify-center" />
        </div>
      </nav>
      {open && <div className="fixed inset-0 -z-10 bg-[rgba(0,0,0,0.35)]" aria-hidden="true" onClick={() => setOpen(false)} />}
    </header>
  );
}
