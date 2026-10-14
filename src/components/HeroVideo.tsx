import { useState } from "react";

type HeroVideoProps = {
  /** File name inside public/videos/hero, e.g. "home.mp4" */
  name: string;
};

export default function HeroVideo({ name }: HeroVideoProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <video
      className="absolute inset-0 object-cover pointer-events-none size-full"
      src={`/videos/hero/${name}`}
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
