import RollingNumber from "@/components/RollingNumber";
import MobileHero, { Accent } from "../MobileHero";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

const achievements = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 92, suffix: "%", label: "Client Satisfaction" },
  { value: 20, suffix: "+", label: "Team Members" },
];

export default function Company() {
  return (
    <>
      <MobileHero
        video="pages.mp4"
        title={
          <>
            We Are <Accent>DesignOps Creative</Accent> Studio
          </>
        }
        text="A team of passionate designers and developers dedicated to building digital products that matter. We bridge the gap between creative vision and technical reality."
      />

      <section className="flex flex-col gap-[16px] items-center mx-auto px-[20px] py-[56px] text-center w-full max-w-[760px]" data-name="Quote">
        <p className="capitalize font-['Poppins:SemiBold'] font-semibold leading-[1.4] text-[#2f2f2f] text-[20px]">
          “Too many projects fail due to poor communication, bloated scope, or bad code. We're here to change that.”
        </p>
        <p className="font-['Poppins:Regular'] leading-[1.4] text-[#00b6ca] text-[14px]">— The DesignOps Team</p>
      </section>

      <section className="flex flex-col gap-[28px] mx-auto px-[20px] py-[24px] w-full max-w-[760px]" data-name="Mission">
        <img alt="The DesignOps team at work" className="aspect-[4/3] block object-cover rounded-[10px] w-full" src="/assets/company/af589.webp" loading="lazy" />
        <div className="flex flex-col gap-[16px]">
          <p className="font-['Poppins:Regular'] leading-[1.3] text-[#00b6ca] text-[14px] tracking-[1px] uppercase">Our Mission</p>
          <h2 className="font-['Poppins:SemiBold'] font-semibold leading-[1.25] text-[#2f2f2f] text-[20px]">
            Building the future, <span className="text-[#707070]">one product at a time</span>
          </h2>
          <p className="font-['Poppins:Regular'] leading-[1.6] text-[#4e4e4e] text-[14px]">
            We founded DesignOps with a simple goal: to help founders and businesses navigate the complex world of software development.
          </p>
          <p className="font-['Poppins:Regular'] leading-[1.6] text-[#4e4e4e] text-[14px]">
            We believe in transparency, craftsmanship, and results. Every line of code we write, every pixel we push, is in service of your business goals.
          </p>
        </div>
      </section>

      <section className="mx-auto px-[20px] py-[40px] w-full max-w-[760px]" data-name="Achievements">
        <div className="gap-y-[32px] grid grid-cols-2 md:grid-cols-4">
          {achievements.map((item) => (
            <div key={item.label} className="flex flex-col gap-[8px] items-center">
              <RollingNumber value={item.value} suffix={item.suffix} size={20} />
              <p className="font-['Inter:Medium'] font-medium leading-[1.2] text-[#707070] text-[14px] text-center">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Reviews />
      <CtaBanner />
      <MobileFooter />
    </>
  );
}
