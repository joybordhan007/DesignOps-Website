import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import Footer from "@/components/Footer";
import Rich from "@/components/Rich";
import { useContent } from "@/content/store";
import GrowthSection from "./sections/GrowthSection";
import Heading from "./sections/Heading";
import Page from "./sections/Page";
import ReviewsSection from "./sections/ReviewsSection";

const asset = (name: string) => `/assets/contact/${name}`;

export default function Contact() {
  const { settings, faqs } = useContent();
  const { contact } = settings;
  const details = [
    { icon: asset("0c56f.svg"), text: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, "")}` },
    { icon: asset("23d52.svg"), text: contact.email, href: `mailto:${contact.email}` },
    { icon: asset("b8ff3.svg"), text: contact.address },
  ];

  return (
    <Page name="Contact Us">
      <div className="flex flex-col gap-[32px] items-center mt-[208px] shrink-0 text-center w-[1100px]" data-name="Hero">
        <h1 className="font-['Inter:Bold'] font-bold leading-[1.2] text-[#2f2f2f] text-[80px] tracking-[3.2px] uppercase whitespace-nowrap">
          <Rich text={contact.title} />
        </h1>
        <p className="font-['Inter:Regular'] leading-[1.3] text-[#3e3e3e] text-[32px] w-full">{contact.subtitle}</p>
      </div>

      <div className="flex gap-[24px] items-stretch mt-[160px] px-[180px] shrink-0 w-[1920px]">
        <div className="bg-white flex flex-col gap-[100px] items-start overflow-clip p-[32px] relative rounded-[8px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] shrink-0 w-[565px]" data-name="contact">
          <img alt="" className="absolute left-[322px] max-w-none size-[138px] top-[537px]" src={asset("d78d4.svg")} />
          <img alt="" className="absolute left-[-75px] max-w-none size-[286px] top-[-54px]" src={asset("7e41b.svg")} />
          <div className="flex flex-col gap-[16px] items-start relative w-full">
            <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#3e3e3e] text-[24px] whitespace-nowrap">{contact.infoTitle}</p>
            <p className="font-['Inter:Regular'] leading-[1.3] text-[#505050] text-[18px] w-full">{contact.infoText}</p>
          </div>
          <div className="-translate-x-1/2 absolute h-[400px] left-[calc(50%+0.5px)] pointer-events-none top-0 w-[234px]" aria-hidden="true">
            <div className="absolute inset-0 opacity-10 overflow-hidden">
              <img alt="" loading="lazy" decoding="async" className="absolute h-[161.57%] left-[-42.97%] max-w-none top-[-0.01%] w-[195.38%]" src={asset("9aeb0.webp")} />
            </div>
          </div>
          <img alt="" className="absolute left-[341px] max-w-none size-[269px] top-[563px]" src={asset("c8215.svg")} />
          <div className="flex flex-col gap-[30px] items-start relative w-full">
            {details.map((item) => (
              <div key={item.icon} className="flex gap-[20px] items-start w-full">
                <img alt="" className="block shrink-0 size-[24px]" src={item.icon} />
                {item.href ? (
                  <a href={item.href} className="font-['Aileron:Regular'] leading-[1.5] text-[#3e3e3e] text-[18px] hover:text-[#00b6ca]">
                    {item.text}
                  </a>
                ) : (
                  <p className="font-['Aileron:Regular'] leading-[1.5] text-[#3e3e3e] text-[18px] w-[392px]">{item.text}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>

      <div className="bg-[#191919] flex flex-col gap-[64px] items-start mt-[102px] px-[180px] py-[100px] shrink-0 w-[1920px]" id="faq">
        <Heading title={settings.titles.faq} dark muted="text-[#bdbdbd]" />
        <FaqAccordion faqs={faqs} plusIcon={asset("e1cdc.svg")} />
      </div>

      <GrowthSection className="mt-[148px]" />
      <ReviewsSection className="mt-[153px]" />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
