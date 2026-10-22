import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import Rich from "@/components/Rich";
import { useContent } from "@/content/store";
import SectionTitle from "../SectionTitle";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import MobileFooter from "../MobileFooter";

export default function Contact() {
  const { settings, faqs } = useContent();
  const { contact } = settings;
  const details = [
    { icon: "/assets/contact/0c56f.svg", text: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, "")}` },
    { icon: "/assets/contact/23d52.svg", text: contact.email, href: `mailto:${contact.email}` },
    { icon: "/assets/contact/b8ff3.svg", text: contact.address },
  ];

  return (
    <>
      <section className="flex flex-col gap-[12px] items-center mx-auto px-[20px] pb-[32px] pt-[48px] text-center w-full max-w-[760px]" data-name="Intro">
        <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.15] text-[#2f2f2f] text-[20px] uppercase">
          <Rich text={contact.title} breaks={false} />
        </h1>
        <p className="font-['Inter:Regular'] leading-[1.5] text-[#3e3e3e] text-[16px]">{contact.subtitle}</p>
      </section>

      <section className="flex flex-col gap-[16px] mx-auto px-[20px] pb-[48px] w-full max-w-[760px]" data-name="Contact">
        <div className="bg-white isolate overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_2px_6px_rgba(0,0,0,0.1)]">
          <span className="-right-[60px] -top-[60px] -z-10 absolute bg-[#00b6ca] opacity-90 rounded-full size-[120px]" aria-hidden="true" />
          <span className="-bottom-[36px] -right-[36px] -z-10 absolute bg-[#8e8e8e] opacity-60 rounded-full size-[72px]" aria-hidden="true" />
          <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">{contact.infoTitle}</h2>
          <p className="font-['Inter:Regular'] leading-[1.5] mt-[10px] text-[#4e4e4e] text-[14px]">{contact.infoText}</p>
          <ul className="flex flex-col gap-[18px] mt-[24px] pr-[60px]">
            {details.map((item) => (
              <li key={item.icon} className="flex font-['Inter:Regular'] gap-[12px] items-start leading-[1.4] text-[#2f2f2f] text-[14px]">
                <img alt="" className="block shrink-0 size-[22px]" src={item.icon} />
                {item.href ? (
                  <a href={item.href} className="break-words min-w-0 hover:text-[#00b6ca]">
                    {item.text}
                  </a>
                ) : (
                  <span className="break-words min-w-0">{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </section>

      <section id="faq" className="px-[8px] py-[24px] scroll-mt-[80px]" data-name="FAQ">
        <div className="bg-[#191919] rounded-[8px]">
          <div className="flex flex-col gap-[28px] mx-auto px-[20px] py-[48px] max-w-[760px]">
            <SectionTitle title={settings.titles.faq} dark />
            <FaqAccordion faqs={faqs} plusIcon="/assets/contact/e1cdc.svg" />
          </div>
        </div>
      </section>

      <GrowthInsights />
      <Reviews />
      <MobileFooter />
    </>
  );
}
