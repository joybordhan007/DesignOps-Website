import { useState } from "react";

type HeroVideoProps = {
  /** File name inside public/videos/hero, e.g. "home.mp4" */
  name: string;
};

// Background video for page heroes. A still of the first frame (the same name
// with .webp) shows instantly while the video loads, so the hero never flashes
// empty when a page opens.
export default function HeroVideo({ name }: HeroVideoProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <video
      className="absolute inset-0 object-cover pointer-events-none size-full"
      src={`/videos/hero/${name}`}
      poster={`/videos/hero/${name.replace(/\.mp4$/, ".webp")}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onError={() => setFailed(true)}
    />
  );
}
