import MobileHero, { Accent } from "../MobileHero";
import GrowthInsights from "../GrowthInsights";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

const description =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English";

const services = [
  { eyebrow: "Full-stack", title: "Development", image: "/assets/services/98189.webp" },
  { eyebrow: "Design", title: "UI/UX", image: "/assets/services/2e9f2.webp" },
  { eyebrow: "Design", title: "Brand", image: "/assets/services/55f86.webp" },
  { eyebrow: "Digital", title: "Marketing", image: "/assets/services/51e90.webp" },
];

export default function Services() {
  return (
    <>
      <MobileHero
        video="pages.mp4"
        title={
          <>
            Digital Services <Accent>Built for Real</Accent> Impact
          </>
        }
        text="We provide innovative solutions that attract customers, improve engagement, and help businesses grow with confidence, solve complex problems with elegant solutions."
      />

      <section className="gap-[16px] grid mx-auto px-[20px] py-[48px] w-full max-w-[760px] md:grid-cols-2" data-name="Services">
        {services.map((service) => (
          <a key={service.title} href="/services/ui-ux-design" className="bg-[#171717] flex flex-col group overflow-hidden rounded-[12px]">
            <div className="aspect-[4/3] overflow-hidden">
              <img alt="" className="block object-cover size-full transition-transform duration-700 group-hover:scale-105" src={service.image} loading="lazy" />
            </div>
            <div className="flex flex-1 flex-col gap-[16px] p-[22px]">
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[12px] text-white tracking-[1px] uppercase">{service.eyebrow}</p>
              <h2 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[16px] text-white">{service.title}</h2>
              <p className="font-['Inter:Regular'] leading-[1.5] text-[#dfdfdf] text-[14px]">{description}</p>
              <span className="flex font-['Inter:Medium'] font-medium items-center justify-between mt-auto pt-[8px] text-[#a9a9a9] text-[12px] tracking-[1.5px]">
                LEARN MORE
                <span aria-hidden="true" className="font-['Inter:Bold'] text-[#00b6ca] transition-transform duration-300 group-hover:translate-x-[4px]">
                  ///
                </span>
              </span>
            </div>
          </a>
        ))}
      </section>

      <GrowthInsights />
      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
