import { Fragment } from "react";

// Renders admin-edited text with two simple markers: *words* are highlighted
// with `accent` (a class, e.g. a colour) and line breaks become <br>.
// With `breaks={false}` line breaks are ignored (e.g. on small screens).
export default function Rich({ text, accent = "text-[#00b6ca]", breaks = true }: { text: string; accent?: string; breaks?: boolean }) {
  const lines = breaks ? text.split("\n") : [text.replace(/\s*\n\s*/g, " ")];
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.split(/(\*[^*]+\*)/g).map((part, j) =>
            part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
              <span key={j} className={accent}>
                {part.slice(1, -1)}
              </span>
            ) : (
              <Fragment key={j}>{part}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}
