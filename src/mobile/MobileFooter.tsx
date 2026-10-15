import { contact, quickLinks, serviceLinks, socialLinks, supportLinks } from "@/components/Footer";

// Mobile/tablet layout of the site footer. The links and contact details come
// from components/Footer.tsx, so editing them there updates both layouts.

const heading = "font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#dfdfdf] text-[14px] tracking-[0.5px] uppercase";
const link = "font-['Inter:Medium'] font-medium leading-[1.3] text-[#dfdfdf] text-[14px] transition-colors hover:text-[#00b6ca]";

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-[16px]">
      <p className={heading}>{title}</p>
      <ul className="flex flex-col gap-[12px]">
        {links.map((item) => (
          <li key={item.label}>
            <a href={item.href} className={link}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MobileFooter() {
  return (
    <footer className="px-[8px] pb-[8px]" data-name="Footer">
      <div className="bg-[#191919] isolate overflow-hidden relative rounded-[8px]">
        <img
          alt=""
          aria-hidden="true"
          className="-z-10 absolute bottom-0 left-1/2 max-w-none opacity-60 pointer-events-none -translate-x-1/2 w-[900px]"
          src="/assets/shared/images/footer-background.webp"
          loading="lazy"
        />

        <div className="flex flex-col gap-[36px] mx-auto pb-[28px] pt-[40px] px-[20px] max-w-[760px]">
          <div className="flex flex-col gap-[20px]">
            <a href="/" className="block h-[36px] w-[158px]" aria-label="DesignOps home">
              <img alt="DesignOps" className="block size-full" src="/assets/shared/logos/designops-logo-footer.svg" />
            </a>
            <p className="font-['Inter:Regular'] leading-[1.4] text-[#dfdfdf] text-[14px]">
              We design &amp; build software that sells. Full-stack digital product agency for ambitious brands.
            </p>
            <div className="flex gap-[12px]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`DesignOps on ${social.label}`}
                  className="border border-[rgba(255,255,255,0.25)] flex group items-center justify-center rounded-full size-[44px] transition-colors duration-300 hover:bg-[#00b6ca] hover:border-[#00b6ca]"
                >
                  <img alt="" className={`block transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert ${social.iconClass}`} src={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="gap-x-[24px] gap-y-[32px] grid grid-cols-2 md:grid-cols-3">
            <LinkColumn title="Quick Links" links={quickLinks} />
            <LinkColumn title="Support" links={supportLinks} />
            <div className="col-span-2 md:col-span-1">
              <LinkColumn title="Services" links={serviceLinks} />
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <p className={heading}>Contact Info</p>
            <a href={contact.phone.href} className={`flex gap-[10px] items-center ${link}`}>
              <img alt="" className="block shrink-0 size-[20px]" src="/assets/shared/icons/phone.svg" />
              {contact.phone.label}
            </a>
            <a href={contact.email.href} className={`flex gap-[10px] items-center break-all ${link}`}>
              <img alt="" className="block shrink-0 size-[20px]" src="/assets/shared/icons/email.svg" />
              {contact.email.label}
            </a>
            <p className="flex font-['Inter:Medium'] font-medium gap-[10px] items-start leading-[1.4] text-[#dfdfdf] text-[14px]">
              <img alt="" className="block mt-[1px] shrink-0 size-[20px]" src="/assets/shared/icons/location.svg" />
              {contact.address}
            </p>
          </div>

          <div className="border-[rgba(255,255,255,0.15)] border-t flex flex-col gap-[12px] pt-[20px] text-[12px] text-white md:flex-row md:justify-between">
            <p className="font-['Inter:Regular'] leading-[1.2]">© 2026 DesignOps. All rights reserved.</p>
            <div className="flex font-['Inter:Medium'] font-medium gap-[16px]">
              <p className="leading-[1.2]">Privacy Policy</p>
              <p className="leading-[1.2]">Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
