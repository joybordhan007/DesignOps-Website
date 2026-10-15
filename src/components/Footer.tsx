// Site-wide footer, shared by every page. Edit the lists below to change
// links, contact details or social profiles everywhere at once.

export const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Company", href: "/company" },
  { label: "Blog", href: "/blog" },
];

export const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/contact#faq" },
];

// Every service opens the service details page (the only one that exists so far).
export const serviceLinks = [
  { label: "Full-stack Development", href: "/services/ui-ux-design" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Brand Design", href: "/services/ui-ux-design" },
  { label: "Digital Marketing", href: "/services/ui-ux-design" },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/143894150", icon: "/assets/shared/icons/linkedin.svg", iconClass: "size-[20px]" },
  { label: "Facebook", href: "https://www.facebook.com/DesignOps.agency/", icon: "/assets/shared/icons/facebook.svg", iconClass: "h-[20px] w-[10.4px]" },
];

export const contact = {
  phone: { label: "+880 1568 295845", href: "tel:+8801568295845" },
  email: { label: "joybordhan223@gmail.com", href: "mailto:joybordhan223@gmail.com" },
  address: "Eastern Housing. Block: C, Road: W2, House: 105 Mirpur 12 Dhaka",
};

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
  return (
    <div role="contentinfo" className={className || "bg-[#191919] h-[764px] overflow-clip relative rounded-[8px] w-[1872px]"} data-name="Footer">
      <div className="absolute flex h-[222px] items-start justify-between left-[156px] right-[156px] top-[40px] z-[1]">
        <div className="flex flex-col gap-[32px] items-start shrink-0 w-[523px]">
          <div className="flex flex-col gap-[24px] items-start w-full">
            <a href="/" className="block h-[40px] relative shrink-0 w-[175px]" aria-label="DesignOps home">
              <img alt="DesignOps" className="absolute block inset-0 max-w-none size-full" src="/assets/shared/logos/designops-logo-footer.svg" />
            </a>
            <p className="font-['Inter:Regular'] font-normal leading-[1.3] text-[#dfdfdf] text-[20px]">
              We design &amp; build software that sells. Full-stack
              <br />
              digital product agency for ambitious brands.
            </p>
          </div>
          <div className="flex gap-[16px] items-center">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`DesignOps on ${social.label}`}
                className="border border-transparent flex group items-center justify-center p-[10px] rounded-[999px] size-[40px] transition-[background-color,border-color,transform] duration-300 hover:-translate-y-[2px] hover:bg-[#00b6ca] hover:border-[#00b6ca]"
              >
                <img
                  alt=""
                  className={`block transition-[filter] duration-300 group-hover:brightness-0 group-hover:invert ${social.iconClass}`}
                  src={social.icon}
                />
              </a>
            ))}
          </div>
        </div>

        <LinkColumn title="Quick Links" links={quickLinks} />
        <LinkColumn title="Support" links={supportLinks} />
        <LinkColumn title="Services" links={serviceLinks} />

        <div className="flex flex-col gap-[24px] items-start shrink-0 w-[306px]">
          <p className={heading}>Contact Info</p>
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
          <p className="font-['Inter:Regular'] font-normal leading-[1.2]">© 2026 DesignOps. All rights reserved.</p>
          <div className="flex font-['Inter:Medium'] font-medium gap-[16px] items-center">
            <p className="leading-[1.2]">Privacy Policy</p>
            <p className="leading-[1.2]">Terms of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}
