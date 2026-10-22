import Rich from "@/components/Rich";
import RollingNumber from "@/components/RollingNumber";
import { useContent } from "@/content/store";
import MobileHero from "../MobileHero";
import Reviews from "../Reviews";
import CtaBanner from "../CtaBanner";
import MobileFooter from "../MobileFooter";

const flat = (text: string) => text.replace(/\s*\n\s*/g, " ");

export default function Company() {
  const { settings, achievements } = useContent();
  const { company } = settings;
  return (
    <>
      <MobileHero page="company" />

      <section className="flex flex-col gap-[16px] items-center mx-auto px-[20px] py-[56px] text-center w-full max-w-[760px]" data-name="Quote">
        <p className="capitalize font-['Poppins:SemiBold'] font-semibold leading-[1.4] text-[#2f2f2f] text-[20px]">{flat(company.quote)}</p>
        <p className="font-['Poppins:Regular'] leading-[1.4] text-[#00b6ca] text-[14px]">{company.quoteAuthor}</p>
      </section>

      <section className="flex flex-col gap-[28px] mx-auto px-[20px] py-[24px] w-full max-w-[760px]" data-name="Mission">
        <img alt="The DesignOps team at work" className="aspect-[4/3] block object-cover rounded-[10px] w-full" src={company.missionImage} loading="lazy" />
        <div className="flex flex-col gap-[16px]">
          <p className="font-['Poppins:Regular'] leading-[1.3] text-[#00b6ca] text-[14px] tracking-[1px] uppercase">{company.missionLabel}</p>
          <h2 className="font-['Poppins:SemiBold'] font-semibold leading-[1.25] text-[#2f2f2f] text-[20px]">
            <Rich text={company.missionTitle} accent="text-[#707070]" breaks={false} />
          </h2>
          {company.missionText.split(/\n\s*\n/).map((paragraph, i) => (
            <p key={i} className="font-['Poppins:Regular'] leading-[1.6] text-[#4e4e4e] text-[14px]">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto px-[20px] py-[40px] w-full max-w-[760px]" data-name="Achievements">
        <div className="gap-y-[32px] grid grid-cols-2 md:grid-cols-4">
          {achievements.filter((stat) => stat.showOnCompany).map((item) => (
            <div key={item.id} className="flex flex-col gap-[8px] items-center">
              <RollingNumber value={item.value} prefix={item.prefix} suffix={item.suffix} size={20} />
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
