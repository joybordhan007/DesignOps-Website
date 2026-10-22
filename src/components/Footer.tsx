// Site-wide footer, shared by every page. Contact details, social profiles,
// the intro text and the service links come from the admin content.

import { Fragment } from "react";
import { pageLinks, serviceUrl } from "@/content/helpers";
import { useContent } from "@/content/store";
import SocialIcon, { socialLabel } from "./SocialIcon";

/** Footer data shared by the desktop and mobile footers. */
export function useFooter() {
  const { settings, services } = useContent();
  const { contact, footer, labels } = settings;
  return {
    labels: labels.footer,
    quickLinks: pageLinks(labels.nav),
    supportLinks: [
      { label: labels.footer.contactUs, href: "/contact" },
      { label: labels.footer.faq, href: "/contact#faq" },
    ],
    text: footer.text,
    copyright: footer.copyright,
    serviceLinks: services.map((service) => ({ label: service.title, href: serviceUrl(service) })),
    socialLinks: (footer.socials ?? [])
      .filter((social) => social.url.trim())
      .map((social) => ({ id: social.id, platform: social.platform, label: socialLabel(social.platform), href: social.url.trim() })),
    contact: {
      phone: { label: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, "")}` },
      email: { label: contact.email, href: `mailto:${contact.email}` },
      address: contact.address,
    },
  };
}

const heading = "font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#dfdfdf] text-[20px] uppercase whitespace-nowrap";
const link = "font-['Inter:Medium'] font-medium leading-[1.2] text-[#dfdfdf] text-[18px] whitespace-nowrap transition-colors hover:text-[#00b6ca]";

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-[24px] items-start shrink-0">
      <p className={heading}>{title}</p>
      <div className="flex flex-col gap-[16px] items-start">
        {links.map((item) => (
          <a key={item.label} href={item.href} className={link}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Footer({ className }: { className?: string }) {
  const { labels, quickLinks, supportLinks, text, copyright, serviceLinks, socialLinks, contact } = useFooter();
  return (
    <div role="contentinfo" className={className || "bg-[#191919] h-[764px] overflow-clip relative rounded-[8px] w-[1872px]"} data-name="Footer">
      <div className="absolute flex h-[222px] items-start justify-between left-[156px] right-[156px] top-[40px] z-[1]">
        <div className="flex flex-col gap-[32px] items-start shrink-0 w-[523px]">
          <div className="flex flex-col gap-[24px] items-start w-full">
            <a href="/" className="block h-[40px] relative shrink-0 w-[175px]" aria-label="DesignOps home">
              <img alt="DesignOps" className="absolute block inset-0 max-w-none size-full" src="/assets/shared/logos/designops-logo-footer.svg" />
            </a>
            <p className="font-['Inter:Regular'] font-normal leading-[1.3] text-[#dfdfdf] text-[20px]">
              {text.split("\n").map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </p>
          </div>
          <div className="flex flex-wrap gap-[16px] items-center">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`DesignOps on ${social.label}`}
                className="border border-transparent flex items-center justify-center p-[10px] rounded-[999px] size-[40px] text-[#00b6ca] transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-[2px] hover:bg-[#00b6ca] hover:border-[#00b6ca] hover:text-white"
              >
                <SocialIcon platform={social.platform} size={20} className="block" />
              </a>
            ))}
          </div>
        </div>

        <LinkColumn title={labels.quickLinks} links={quickLinks} />
        <LinkColumn title={labels.support} links={supportLinks} />
        <LinkColumn title={labels.services} links={serviceLinks} />

        <div className="flex flex-col gap-[24px] items-start shrink-0 w-[306px]">
          <p className={heading}>{labels.contactInfo}</p>
          <div className="flex flex-col gap-[16px] items-start w-full">
            <div className="flex gap-[8px] items-start">
              <img alt="" className="block shrink-0 size-[20px]" src="/assets/shared/icons/phone.svg" />
              <a href={contact.phone.href} className={link}>
                {contact.phone.label}
              </a>
            </div>
            <div className="flex gap-[8px] items-start">
              <img alt="" className="block shrink-0 size-[20px]" src="/assets/shared/icons/email.svg" />
              <a href={contact.email.href} className={link}>
                {contact.email.label}
              </a>
            </div>
            <div className="flex gap-[8px] items-start w-full">
              <img alt="" className="block shrink-0 size-[20px]" src="/assets/shared/icons/location.svg" />
              <p className="flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[1.3] min-w-px text-[#dfdfdf] text-[18px]">{contact.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="-translate-x-1/2 absolute h-[905px] left-1/2 pointer-events-none top-[40px] w-[1616px]" aria-hidden="true">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src="/assets/shared/images/footer-background.webp" />
      </div>

      <div className="absolute bottom-[68px] flex flex-col gap-[32px] items-center justify-center left-[156px] right-[156px]">
        <div className="h-px w-full" />
        <div className="flex items-start justify-between text-[18px] text-white w-full whitespace-nowrap">
          <p className="font-['Inter:Regular'] font-normal leading-[1.2]">{copyright}</p>
          <div className="flex font-['Inter:Medium'] font-medium gap-[16px] items-center">
            <p className="leading-[1.2]">{labels.privacy}</p>
            <p className="leading-[1.2]">{labels.terms}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
