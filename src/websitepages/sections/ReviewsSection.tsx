import ArrowButton from "@/components/ArrowButton";
import { ratingSummary } from "@/content/helpers";
import { useContent } from "@/content/store";
import { ReviewAvatar } from "@/components/ReviewBits";
import type { Review } from "@/content/types";
import Heading from "./Heading";

// "Find your best design into us": the rating card stays put while the review
// cards loop sideways (see .review-marquee in index.css).

const CARD_WIDTH = 390;
const MARQUEE_WIDTH = 1170;

function Stars({ score }: { score: number }) {
  const full = Math.floor(score);
  const half = score - full >= 0.25;
  return (
    <div className="flex items-center w-full" aria-label={`${score} out of 5 stars`}>
      {Array.from({ length: Math.min(5, full) }, (_, i) => (
        <div key={i} className="relative shrink-0 size-[40px]">
          <div className="absolute inset-[4.47%_6.6%_12.78%_6.6%]">
            <img alt="" className="block max-w-none size-full" src="/assets/shared/icons/star.svg" />
          </div>
        </div>
      ))}
      {half && full < 5 && (
        <div className="relative shrink-0 size-[40px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/shared/icons/star-half.svg" />
        </div>
      )}
    </div>
  );
}

function Logos({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={`flex items-center justify-between shrink-0 w-full ${hidden ? "opacity-0" : ""}`} aria-hidden={hidden || undefined}>
      <img alt="Upwork" className="block h-[40px] w-[80px]" src="/assets/shared/logos/upwork.svg" />
      <img alt="Fiverr" className="block h-[22px] w-[83.207px]" src={hidden ? "/assets/shared/logos/fiverr-grey.svg" : "/assets/shared/logos/fiverr.svg"} />
      <img alt="Google" className="block size-[24px]" src="/assets/shared/logos/google.svg" />
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex flex-col h-full items-start justify-between px-[32px] py-[40px] relative shrink-0 w-[390px]">
      {review.company && <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[18px]">{review.company}</p>}
      {review.quote && <p className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#222] text-[24px]">{review.quote}</p>}
      <div className="flex gap-[12px] items-start shrink-0">
        <ReviewAvatar review={review} className="size-[50px] text-[18px]" />
        <div className="flex flex-col gap-[8px] items-start w-[160px]">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[18px]">{review.name}</p>
          {review.role && <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#505050] text-[16px]">{review.role}</p>}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({ className = "mt-[160px]" }: { className?: string }) {
  const { settings, reviews } = useContent();
  const rating = ratingSummary(reviews, settings.labels.reviews.countText);
  // Each looping set must be at least as wide as the visible area to loop seamlessly.
  const repeats = reviews.length ? Math.ceil(MARQUEE_WIDTH / (reviews.length * CARD_WIDTH)) : 0;
  const set = Array.from({ length: repeats }, () => reviews).flat();

  return (
    <div className={`flex flex-col gap-[64px] items-center shrink-0 w-[1560px] ${className}`} data-name="Reviews">
      <div className="flex gap-[40px] items-end w-full">
        <Heading title={settings.titles.reviews} className="flex-1" />
        <ArrowButton href="/reviews" label={settings.labels.buttons.allReviews} />
      </div>
      <div className="bg-white flex h-[513px] items-center overflow-clip relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[1560px]">
        <div className="bg-white border-[rgba(0,0,0,0.1)] border-r border-solid flex flex-col h-full items-center justify-between px-[24px] py-[40px] relative shrink-0 w-[390px] z-[1]">
          <Logos hidden />
          <div className="flex flex-col gap-[24px] items-center shrink-0 w-[200px]">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#424242] text-[100px] text-center tracking-[2px] w-full">{rating.score}</p>
            <div className="flex flex-col gap-[16px] items-center w-full">
              <Stars score={rating.value} />
              <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#424242] text-[28px] text-center w-full">{rating.count}</p>
            </div>
          </div>
          <Logos />
        </div>
        {set.length > 0 && (
          <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative review-marquee">
            <div className="flex h-full review-marquee-track w-max">
              {[false, true].map((copy) => (
                <div key={String(copy)} className="flex h-full review-marquee-set shrink-0" aria-hidden={copy || undefined}>
                  {set.map((review, i) => (
                    <ReviewCard key={`${review.id}-${i}`} review={review} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
