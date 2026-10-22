import { useState } from "react";
import Rich from "@/components/Rich";
import { ReviewAvatar, Stars } from "@/components/ReviewBits";
import ReviewForm from "@/components/ReviewForm";
import { useContent } from "@/content/store";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

export default function Reviews() {
  const { settings, reviews } = useContent();
  const [writing, setWriting] = useState(false);
  const { score, count } = settings.rating;

  return (
    <>
      <section className="flex flex-col gap-[12px] items-center mx-auto px-[20px] pb-[32px] pt-[48px] text-center w-full max-w-[760px]" data-name="Intro">
        <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.15] text-[#2f2f2f] text-[20px] uppercase">
          <Rich text={settings.reviewsPage.title} breaks={false} />
        </h1>
        <p className="font-['Inter:Regular'] leading-[1.5] text-[#3e3e3e] text-[16px]">{settings.reviewsPage.subtitle}</p>
      </section>

      <section className="flex flex-col gap-[16px] mx-auto px-[20px] pb-[48px] w-full max-w-[760px]" data-name="Reviews">
        <div className="bg-white flex flex-col gap-[18px] items-center px-[24px] py-[24px] rounded-[12px] shadow-[0px_1px_6px_rgba(0,0,0,0.1)]">
          <div className="flex gap-[20px] items-center">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-none text-[#424242] text-[40px]">{score}</p>
            <div className="flex flex-col gap-[8px]">
              <Stars rating={Math.round(Number(score) || 5)} className="size-[22px]" />
              <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#424242] text-[15px]">{count}</p>
            </div>
          </div>
          <button type="button" onClick={() => setWriting(true)} className="bg-[#00b6ca] cursor-pointer font-['Inter:Medium'] font-medium px-[22px] py-[13px] rounded-[4px] shadow-[0px_2px_3px_rgba(0,0,0,0.1)] text-[#f6f6f6] text-[14px] w-full">
            {settings.labels.buttons.writeReview}
          </button>
        </div>

        <div className="gap-[16px] grid md:grid-cols-2">
          {reviews.map((review) => (
            <figure key={review.id} className="bg-white flex flex-col gap-[18px] justify-between p-[22px] rounded-[12px] shadow-[0px_1px_6px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col gap-[14px]">
                <div className="flex gap-[12px] items-center justify-between">
                  {review.company && <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#2f2f2f] text-[14px]">{review.company}</p>}
                  <Stars rating={review.rating} className="size-[16px]" />
                </div>
                {review.quote && <blockquote className="font-['Inter:Medium'] font-medium leading-[1.4] text-[#222] text-[16px]">{review.quote}</blockquote>}
              </div>
              <figcaption className="flex gap-[12px] items-center">
                <ReviewAvatar review={review} className="size-[44px] text-[15px]" />
                <span className="flex flex-col gap-[4px]">
                  <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[14px]">{review.name}</span>
                  {review.role && <span className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#505050] text-[12px]">{review.role}</span>}
                </span>
              </figcaption>
            </figure>
          ))}
          {!reviews.length && <p className="font-['Inter:Regular'] py-[24px] text-center text-[#707070] text-[15px]">{settings.labels.reviews.empty}</p>}
        </div>
      </section>

      <CtaBanner />
      <MobileFooter />
      {writing && <ReviewForm onClose={() => setWriting(false)} />}
    </>
  );
}
