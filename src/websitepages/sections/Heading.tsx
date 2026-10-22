import { Fragment } from "react";
import type { SectionTitle } from "@/content/types";

/** Text with line breaks kept. */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

// Desktop section heading: dark lead text followed by a muted part (40px bold).
export default function Heading({
  title,
  dark = false,
  muted,
  className = "",
}: {
  title: SectionTitle;
  dark?: boolean;
  /** Muted colour class; defaults to the light/dark design colour. */
  muted?: string;
  className?: string;
}) {
  return (
    <h2 className={`font-['Inter:Bold'] font-bold leading-[1.2] text-[40px] tracking-[0.8px] w-full ${dark ? "text-[#f9f9f9]" : "text-[#3e3e3e]"} ${className}`}>
      <Lines text={title.lead} />{" "}
      <span className={muted ?? (dark ? "text-[#a9a9a9]" : "text-[#707070]")}>
        <Lines text={title.muted} />
      </span>
    </h2>
  );
}
