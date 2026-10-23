import { useEffect, useState } from "react";

/** Id of the last heading scrolled past, for highlighting a table of contents. */
export default function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const update = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [ids]);
  return active;
}
