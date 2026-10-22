import { useState } from "react";
import type { Faq } from "@/content/types";

// Contact page FAQ (questions come from the admin content). Clicking a
// question expands its answer; only one is open at a time.

export default function FaqAccordion({ faqs, plusIcon }: { faqs: Faq[]; plusIcon: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-[1560px] max-lg:gap-[12px] max-lg:w-full" data-name="FAQ">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div
            key={faq.id}
            className={`border border-solid px-[26px] py-[35.5px] rounded-[8px] max-lg:px-[16px] max-lg:py-[18px] transition-colors duration-300 w-full ${
              isOpen ? "bg-[rgba(255,255,255,0.14)] border-[rgba(0,182,202,0.7)]" : "bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.4)]"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
              className="cursor-pointer flex gap-[16px] items-center justify-between text-left w-full"
            >
              <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px] text-white max-lg:leading-[1.35] max-lg:text-[14px]">{faq.question}</span>
              <img
                alt=""
                className={`block shrink-0 size-[24px] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                src={plusIcon}
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <p className="font-['Inter:Regular'] leading-[1.5] overflow-hidden text-[#d0d0d0] text-[18px] max-lg:text-[14px]">
                <span className="block pt-[16px]">{faq.answer}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
