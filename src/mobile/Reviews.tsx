import { useContent } from "@/content/store";
import type { Review } from "@/content/types";
import SectionTitle from "./SectionTitle";

// "Find your best design into us" block: the 4.9 rating card, then the client
// reviews looping sideways underneath it.

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="bg-white flex flex-col gap-[20px] justify-between mr-[12px] p-[24px] rounded-[12px] shadow-[0px_1px_6px_rgba(0,0,0,0.08)] shrink-0 w-[290px]">
      <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[14px]">{review.company}</p>
      <blockquote className="font-['Inter:Medium'] font-medium leading-[1.35] text-[#222] text-[16px]">{review.quote}</blockquote>
      <figcaption className="flex gap-[12px] items-center">
        <img alt="" className="block object-cover rounded-full size-[44px]" src={review.avatar} loading="lazy" />
        <span className="flex flex-col gap-[4px]">
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[14px]">{review.name}</span>
          <span className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#505050] text-[12px]">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const { settings, reviews } = useContent();
  const full = Math.floor(Number(settings.rating.score) || 5);
  return (
    <section className="flex flex-col gap-[28px] py-[48px]" data-name="Reviews">
      <div className="mx-auto px-[20px] w-full max-w-[760px]">
        <SectionTitle title={settings.titles.reviews} />
      </div>

      <div className="mx-auto px-[20px] w-full max-w-[760px]">
        <div className="bg-white flex flex-col gap-[20px] items-center px-[24px] py-[28px] rounded-[12px] shadow-[0px_1px_6px_rgba(0,0,0,0.1)]">
          <div className="flex gap-[20px] items-center">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[#424242] text-[20px]">{settings.rating.score}</p>
            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[2px]" aria-label={`${settings.rating.score} out of 5 stars`}>
                {Array.from({ length: Math.min(full, 5) }, (_, i) => (
                  <img key={i} alt="" className="block size-[24px]" src="/assets/shared/icons/star.svg" />
                ))}
                {full < 5 && <img alt="" className="block size-[24px]" src="/assets/shared/icons/star-half.svg" />}
              </div>
              <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#424242] text-[16px]">{settings.rating.count}</p>
            </div>
          </div>
          <div className="border-[rgba(0,0,0,0.08)] border-t flex gap-[32px] items-center justify-center pt-[18px] w-full">
            <img alt="Upwork" className="block h-[32px] w-[64px]" src="/assets/shared/logos/upwork.svg" />
            <img alt="Fiverr" className="block h-[18px] w-[68px]" src="/assets/shared/logos/fiverr.svg" />
            <img alt="Google" className="block size-[22px]" src="/assets/shared/logos/google.svg" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden py-[4px] review-marquee">
        <div className="flex review-marquee-track w-max">
          {[false, true].map((copy) => (
            <div key={String(copy)} className="flex pl-[12px] shrink-0" aria-hidden={copy || undefined}>
              {reviews.map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
