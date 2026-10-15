import { useEffect } from "react";

// The Figma pages are rendered on a 1920px artboard and shrunk with
// `transform: scale()`, inside a wrapper with `overflow: hidden`. Native
// `position: sticky` does not work in that setup, so `.sticky` elements are
// switched to `position: relative` in CSS and pinned here instead: each one is
// shifted down just enough to stay at its `top` offset, without leaving its
// parent box, exactly like browser sticky positioning.
export default function useScaledSticky(key: unknown) {
  useEffect(() => {
    const items = [...document.querySelectorAll<HTMLElement>(".figma-page-scale .sticky")]
      .filter((el) => el.parentElement)
      .map((el) => ({ el, parent: el.parentElement!, top: parseFloat(getComputedStyle(el).top) || 0 }));
    if (!items.length) return;

    let frame = 0;
    const render = () => {
      for (const { el, parent, top } of items) {
        const parentRect = parent.getBoundingClientRect();
        const scale = parentRect.height / parent.offsetHeight || 1;
        el.style.transform = "";
        const natural = (el.getBoundingClientRect().top - parentRect.top) / scale;
        const room = parent.clientHeight - natural - el.offsetHeight;
        const shift = Math.min(Math.max(top - parentRect.top / scale - natural, 0), Math.max(room, 0));
        el.style.transform = shift ? `translateY(${shift}px)` : "";
      }
    };
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      items.forEach(({ el }) => (el.style.transform = ""));
    };
  }, [key]);
}
