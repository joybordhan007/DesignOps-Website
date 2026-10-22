import type { ReactNode } from "react";

// Root of a desktop page: the 1920px Figma artboard (scaled to fit by App.tsx).
// Sections stack top to bottom, so lists of any length push the rest down.
export default function Page({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="bg-[#f5f5f5] figma-canvas flex flex-col items-center pb-[18px] relative w-[1920px]" data-name={name}>
      {children}
    </div>
  );
}
