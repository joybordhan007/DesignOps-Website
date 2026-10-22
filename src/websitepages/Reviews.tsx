import { useState } from "react";
import Footer from "@/components/Footer";
import Rich from "@/components/Rich";
import { ReviewAvatar, Stars } from "@/components/ReviewBits";
import ReviewForm from "@/components/ReviewForm";
import { useContent } from "@/content/store";
import type { Review } from "@/content/types";
import CtaSection from "./sections/CtaSection";
import Page from "./sections/Page";

// Reviews: the rating summary, every approved review as a card, and the
// "Write a review" popup (reviews go live after the admin approves them).

function WriteButton({ onClick }: { onClick: () => void }) {
  const label = useContent().settings.labels.buttons.writeReview;
  return (
    <button type="button" onClick={onClick} className="bg-[#00b6ca] cursor-pointer flex gap-[10px] group items-center px-[30px] py-[16px] rounded-[4px] shadow-[0px_2px_3px_rgba(0,0,0,0.1)] shrink-0 transition-colors hover:bg-[#00a3b5]">
      <span className="block h-[21.6px] overflow-hidden">
        <span className="flex flex-col font-['Inter:Medium'] font-medium leading-[1.2] text-[#f6f6f6] text-[18px] transition-transform duration-[380ms] ease-[cubic-bezier(0.2,0.75,0.3,1)] whitespace-nowrap group-hover:-translate-y-1/2">
          <span>{label}</span>
          <span aria-hidden="true">{label}</span>
        </span>
      </span>
      <img alt="" className="block size-[20px]" src="/assets/shared/icons/arrow-subdirectory-light.svg" />
    </button>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="bg-white flex flex-col gap-[28px] justify-between p-[36px] rounded-[24px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex gap-[16px] items-center justify-between">
          {review.company && <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[18px]">{review.company}</p>}
          <Stars rating={review.rating} className="size-[22px]" />
        </div>
        {review.quote && <blockquote className="font-['Inter:Medium'] font-medium leading-[1.35] text-[#222] text-[22px]">{review.quote}</blockquote>}
      </div>
      <figcaption className="flex gap-[12px] items-center">
        <ReviewAvatar review={review} className="size-[50px] text-[18px]" />
        <span className="flex flex-col gap-[6px]">
          <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[18px]">{review.name}</span>
          {review.role && <span className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#505050] text-[16px]">{review.role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const { settings, reviews } = useContent();
  const [writing, setWriting] = useState(false);
  const { score, count } = settings.rating;

  return (
    <Page name="Reviews">
      <div className="flex flex-col gap-[32px] items-center mt-[208px] shrink-0 text-center w-[1200px]" data-name="Hero">
        <h1 className="font-['Inter:Bold'] font-bold leading-[1.2] text-[#2f2f2f] text-[80px] tracking-[3.2px] uppercase">
          <Rich text={settings.reviewsPage.title} />
        </h1>
        <p className="font-['Inter:Regular'] leading-[1.3] text-[#3e3e3e] text-[32px] w-full">{settings.reviewsPage.subtitle}</p>
      </div>

      <div className="bg-white flex items-center justify-between mt-[120px] px-[48px] py-[40px] rounded-[24px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[1560px]" data-name="Rating">
        <div className="flex gap-[40px] items-center">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[#424242] text-[100px] tracking-[2px]">{score}</p>
          <div className="flex flex-col gap-[14px]">
            <Stars rating={Math.round(Number(score) || 5)} className="size-[36px]" />
            <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#424242] text-[28px]">{count}</p>
          </div>
          <div className="bg-[rgba(0,0,0,0.1)] h-[100px] mx-[16px] w-px" aria-hidden="true" />
          <div className="flex gap-[36px] items-center">
            <img alt="Upwork" className="block h-[40px] w-[80px]" src="/assets/shared/logos/upwork.svg" />
            <img alt="Fiverr" className="block h-[22px] w-[83.207px]" src="/assets/shared/logos/fiverr.svg" />
            <img alt="Google" className="block size-[24px]" src="/assets/shared/logos/google.svg" />
          </div>
        </div>
        <WriteButton onClick={() => setWriting(true)} />
      </div>

      {reviews.length ? (
        <div className="gap-[24px] grid grid-cols-3 items-stretch mt-[64px] shrink-0 w-[1560px]" data-name="Review Cards">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <p className="font-['Inter:Regular'] mt-[80px] text-[#707070] text-[24px]">{settings.labels.reviews.empty}</p>
      )}

      <CtaSection />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
      {writing && <ReviewForm onClose={() => setWriting(false)} />}
    </Page>
  );
}
