// Home page "Our Services" cards. All four cards share the row equally; the
// hovered (or keyboard-focused) card grows from 372px to 570px wide while the
// others shrink to 306px, and swaps its vertical title for a description.
// Each card links to its service details page. Services come from the admin content.

import { serviceUrl } from "@/content/helpers";
import type { Service } from "@/content/types";

const fade = "transition-opacity duration-300 ease-out";

export default function ServiceCards({ services, className }: { services: Service[]; className?: string }) {
  return (
    <div className={`flex gap-[24px] h-[650px] w-[1560px] ${className ?? ""}`} data-node-id="1:47" data-name="Service Cards">
      {services.map((service, index) => (
        <a
          key={service.id}
          href={serviceUrl(service)}
          aria-label={`${service.title}: view service details`}
          className="group basis-0 bg-[#171717] drop-shadow-[0px_1px_3px_rgba(0,0,0,0.04)] grow h-[650px] min-w-0 outline-none overflow-clip relative rounded-[24px] transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:grow-[1.8627] focus-visible:grow-[1.8627] focus-visible:ring-2 focus-visible:ring-[#00b6ca]"
          data-name="Service Card"
        >
          {/* Collapsed: big number + vertical title */}
          <div className={`absolute inset-0 ${fade} group-hover:opacity-0 group-focus-visible:opacity-0`} aria-hidden="true">
            {service.numberImage ? (
              <img alt="" className="-translate-x-1/2 -translate-y-1/2 absolute block h-[340px] left-[calc(50%+120px)] max-w-none top-1/2 w-auto" src={service.numberImage} />
            ) : (
              <p className="-translate-y-1/2 absolute font-['Inter:Bold'] font-bold leading-none left-[calc(50%+20px)] opacity-25 text-[#00b6ca] text-[340px] top-1/2">{index + 1}</p>
            )}
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
            <p className="font-['Inter:Regular'] font-normal leading-[1.4] mt-[28px] text-[#dfdfdf] text-[18px]">{service.summary}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
