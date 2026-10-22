import type { Review } from "@/content/types";

// Small pieces shared by every review card (desktop, mobile and the Reviews page).

/** The reviewer's photo, or their initials when they didn't add one. */
export function ReviewAvatar({ review, className }: { review: Pick<Review, "avatar" | "name">; className: string }) {
  if (review.avatar) return <img alt="" className={`block object-cover rounded-full shrink-0 ${className}`} src={review.avatar} loading="lazy" decoding="async" />;
  const initials = review.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span aria-hidden="true" className={`bg-[#00b6ca] flex font-['Inter:Semi_Bold'] font-semibold items-center justify-center rounded-full shrink-0 text-white ${className}`}>
      {initials}
    </span>
  );
}

/** Five stars, the first `rating` of them filled. */
export function Stars({ rating, className }: { rating: number; className: string }) {
  return (
    <span className="flex gap-[2px]" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <img key={i} alt="" className={`block ${className} ${i < rating ? "" : "grayscale opacity-25"}`} src="/assets/shared/icons/star.svg" />
      ))}
    </span>
  );
}
