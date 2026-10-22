import { useState } from "react";
import { posterFor } from "@/content/helpers";

// Background video for page heroes. For the bundled videos a still of the
// first frame (same name, .webp) shows instantly while the video loads, so the
// hero never flashes empty when a page opens.
export default function HeroVideo({ src }: { src: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || failedSrc === src) return null;

  return (
    <video
      key={src}
      className="absolute inset-0 object-cover pointer-events-none size-full"
      src={src}
      poster={posterFor(src)}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onError={() => setFailedSrc(src)}
    />
  );
}
