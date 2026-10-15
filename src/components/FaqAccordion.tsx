import { useState } from "react";

// Contact page FAQ. Clicking a question expands its answer; only one is open
// at a time so the section never grows into the section below it (the page
// layout uses fixed positions).

// Draft answers: review and adjust them to match how DesignOps actually works.
const faqs = [
  {
    q: "What happens after I submit this form?",
    a: "We reply within one business day to confirm the details and book a short discovery call about your goals, scope and timeline.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Yes. The first consultation is free, so we can understand your project and recommend the right approach before you commit.",
  },
  {
    q: "How quickly can you start on my project?",
    a: "Most projects kick off within one to two weeks. If you have a tight deadline, tell us and we will do our best to start sooner.",
  },
  {
    q: "What information should I include in my message?",
    a: "A short overview of your product, your goals, the scope you have in mind, any deadlines and a budget range. Links or files help too.",
  },
  {
    q: "What's your typical project timeline?",
    a: "Design-only projects usually take four to eight weeks; full design and development builds take two to four months, depending on scope.",
  },
  {
    q: "Can I hire you for just design or just development?",
    a: "Absolutely. You can hire us for UI/UX design, development or branding on its own, or for an end-to-end package.",
  },
];

export default function FaqAccordion({ plusIcon }: { plusIcon: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-[1560px]" data-name="FAQ">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div
            key={faq.q}
            className={`border border-solid px-[26px] py-[35.5px] rounded-[8px] transition-colors duration-300 w-full ${
              isOpen ? "bg-[rgba(255,255,255,0.14)] border-[rgba(0,182,202,0.7)]" : "bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.4)]"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
              className="cursor-pointer flex items-center justify-between text-left w-full"
            >
              <span className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[20px] text-white">{faq.q}</span>
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
              <p className="font-['Inter:Regular'] leading-[1.5] overflow-hidden text-[#d0d0d0] text-[18px]">
                <span className="block pt-[16px]">{faq.a}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
