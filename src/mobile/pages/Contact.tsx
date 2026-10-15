import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import SectionTitle from "../SectionTitle";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import MobileFooter from "../MobileFooter";

const details = [
  { icon: "/assets/contact/0c56f.svg", text: "+880 0000 000000" },
  { icon: "/assets/contact/23d52.svg", text: "contact@designops.agency.com" },
  { icon: "/assets/contact/b8ff3.svg", text: "Eastern Housing. Block: C, Road: W2, House: 105 Mirpur 12 Dhaka" },
];

export default function Contact() {
  return (
    <>

      <section className="flex flex-col gap-[12px] items-center mx-auto px-[20px] pb-[32px] pt-[48px] text-center w-full max-w-[760px]" data-name="Intro">
        <h1 className="font-['Montserrat:SemiBold'] font-semibold leading-[1.15] text-[#2f2f2f] text-[20px] uppercase">
          Get in <span className="text-[#00b6ca]">Touch</span>
        </h1>
        <p className="font-['Inter:Regular'] leading-[1.5] text-[#3e3e3e] text-[16px]">Ready to start your project? Fill out the form below or reach out directly.</p>
      </section>

      <section className="flex flex-col gap-[16px] mx-auto px-[20px] pb-[48px] w-full max-w-[760px]" data-name="Contact">
        <div className="bg-white isolate overflow-hidden p-[24px] relative rounded-[8px] shadow-[0px_2px_6px_rgba(0,0,0,0.1)]">
          <span className="-right-[60px] -top-[60px] -z-10 absolute bg-[#00b6ca] opacity-90 rounded-full size-[120px]" aria-hidden="true" />
          <span className="-bottom-[36px] -right-[36px] -z-10 absolute bg-[#8e8e8e] opacity-60 rounded-full size-[72px]" aria-hidden="true" />
          <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[20px]">Contact Information</h2>
          <p className="font-['Inter:Regular'] leading-[1.5] mt-[10px] text-[#4e4e4e] text-[14px]">
            Find all the ways to reach us, including email, phone, and our office address, so you can get the support and answers you need quickly and easily.
          </p>
          <ul className="flex flex-col gap-[18px] mt-[24px] pr-[60px]">
            {details.map((item) => (
              <li key={item.text} className="flex font-['Inter:Regular'] gap-[12px] items-start leading-[1.4] text-[#2f2f2f] text-[14px]">
                <img alt="" className="block shrink-0 size-[22px]" src={item.icon} />
                <span className="break-words min-w-0">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </section>

      <section id="faq" className="px-[8px] py-[24px] scroll-mt-[80px]" data-name="FAQ">
        <div className="bg-[#191919] rounded-[8px]">
          <div className="flex flex-col gap-[28px] mx-auto px-[20px] py-[48px] max-w-[760px]">
            <SectionTitle lead="Our Most Frequently Asked" muted="Questions Answered Clearly" dark />
            <FaqAccordion plusIcon="/assets/contact/e1cdc.svg" />
          </div>
        </div>
      </section>

      <GrowthInsights />
      <Reviews />
      <MobileFooter />
    </>
  );
}
