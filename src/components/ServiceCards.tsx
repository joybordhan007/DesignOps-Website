// Home page "Our Services" cards. All four cards share the row equally; the
// hovered (or keyboard-focused) card grows from 372px to 570px wide while the
// others shrink to 306px, and swaps its vertical title for a description.

export const services = [
  {
    title: "Full-stack Development",
    description:
      "We build fast, secure and scalable web and mobile products end to end, from front-end interfaces to APIs, databases and cloud infrastructure.",
    number: { src: "/assets/home/b93e2.svg", className: "h-[349.5px] left-[calc(50%+126.5px)] top-[calc(50%-0.25px)] w-[215px]" },
  },
  {
    title: "UI/UX Design",
    description:
      "Research-led interface design that turns complex flows into intuitive experiences: user research, wireframes, prototypes and polished, developer-ready UI.",
    number: { src: "/assets/home/6e5ec.svg", className: "h-[335px] left-[calc(50%+119.5px)] top-[calc(50%-0.5px)] w-[238px]" },
  },
  {
    title: "Brand Design",
    description:
      "Distinct brand identities that stay consistent everywhere: logo, typography, colour systems and guidelines built to grow with your business.",
    number: { src: "/assets/home/b314f.svg", className: "h-[339.164px] left-[calc(50%+116.5px)] top-[calc(50%-0.42px)] w-[225.203px]" },
  },
  {
    title: "Digital Marketing",
    description:
      "Data-driven campaigns that bring the right people to your product: SEO, paid ads, social media and conversion optimisation with measurable results.",
    number: { src: "/assets/home/518d1.svg", className: "h-[324.8px] left-[calc(50%+106.5px)] top-[calc(50%-0.6px)] w-[294.176px]" },
  },
];

const fade = "transition-opacity duration-300 ease-out";

export default function ServiceCards({ className }: { className?: string }) {
  return (
    <div className={`flex gap-[24px] h-[650px] w-[1560px] ${className ?? ""}`} data-node-id="1:47" data-name="Service Cards">
      {services.map((service, index) => (
        <div
          key={service.title}
          tabIndex={0}
          className="group basis-0 bg-[#171717] drop-shadow-[0px_1px_3px_rgba(0,0,0,0.04)] grow h-[650px] min-w-0 outline-none overflow-clip relative rounded-[24px] transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:grow-[1.8627] focus-visible:grow-[1.8627] focus-visible:ring-2 focus-visible:ring-[#00b6ca]"
          data-name="Service Card"
        >
          {/* Collapsed: big number + vertical title */}
          <div className={`absolute inset-0 ${fade} group-hover:opacity-0 group-focus-visible:opacity-0`} aria-hidden="true">
            <img alt="" className={`-translate-x-1/2 -translate-y-1/2 absolute block max-w-none ${service.number.className}`} src={service.number.src} />
            <p className="absolute font-['Inter:Medium'] font-medium leading-[1.2] left-[34px] text-[16px] text-white top-[38px]">
              /0{index + 1}
            </p>
            <p className="[writing-mode:vertical-rl] absolute font-['Inter:Bold'] font-bold leading-[1.2] left-[calc(50%-29px)] text-[48px] text-white top-[38px] whitespace-nowrap">
              {service.title}
            </p>
          </div>

          {/* Expanded: horizontal title + description */}
          <div
            className={`absolute left-[34px] opacity-0 top-[38px] w-[502px] ${fade} group-hover:opacity-100 group-hover:delay-150 group-focus-visible:opacity-100 group-focus-visible:delay-150`}
          >
            <div className="flex gap-[12px] items-start">
              <p className="font-['Inter:Medium'] font-medium leading-[1.2] pt-[4px] text-[16px] text-white">/0{index + 1}</p>
              <h3 className="font-['Inter:Medium'] font-medium leading-[1.2] text-[32px] text-white whitespace-nowrap">{service.title}</h3>
            </div>
            <p className="font-['Inter:Regular'] font-normal leading-[1.4] mt-[28px] text-[#dfdfdf] text-[18px]">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
