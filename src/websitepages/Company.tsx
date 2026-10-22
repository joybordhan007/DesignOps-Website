import { Fragment } from "react";
import Footer from "@/components/Footer";
import Rich from "@/components/Rich";
import RollingNumber from "@/components/RollingNumber";
import { useContent } from "@/content/store";
import CtaSection from "./sections/CtaSection";
import { Lines } from "./sections/Heading";
import Hero from "./sections/Hero";
import Page from "./sections/Page";
import ReviewsSection from "./sections/ReviewsSection";

export default function Company() {
  const { settings, achievements } = useContent();
  const { company } = settings;
  return (
    <Page name="Company">
      <Hero page="company" />

      <div className="flex flex-col gap-[40px] items-center mt-[160px] shrink-0 text-center w-[1560px]" data-name="Quote">
        <p className="capitalize font-['Poppins:SemiBold'] leading-[1.3] text-[#3e3e3e] text-[40px] w-full">
          <Lines text={company.quote} />
        </p>
        <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#00b6ca] text-[24px] w-full">{company.quoteAuthor}</p>
      </div>

      <div className="flex gap-[24px] items-center mt-[160px] shrink-0 w-[1560px]" data-name="Mission">
        <div className="h-[555px] overflow-hidden relative rounded-[16px] shrink-0 w-[768px]">
          <img alt="" loading="lazy" decoding="async" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={company.missionImage} />
        </div>
        <div className="flex flex-col gap-[24px] items-start shrink-0 w-[768px]">
          <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#00b6ca] text-[20px] tracking-[0.8px] uppercase w-full">{company.missionLabel}</p>
          <p className="font-['Poppins:SemiBold'] leading-[1.3] text-[#3e3e3e] text-[40px] tracking-[0.8px] w-full">
            <Rich text={company.missionTitle} accent="text-[#707070]" />
          </p>
          <div className="font-['Poppins:Regular'] text-[#2f2f2f] text-[20px] tracking-[0.4px] w-full">
            {company.missionText.split(/\n\s*\n/).map((paragraph, i) => (
              <p key={i} className="leading-[1.3] mb-[26px] last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-stretch min-h-[130px] mt-[160px] shrink-0 w-[1560px]" data-name="Achievements">
        {achievements.filter((stat) => stat.showOnCompany).map((stat, i) => (
          <Fragment key={stat.id}>
            {i > 0 && <div className="bg-[rgba(0,0,0,0.5)] shrink-0 w-px" />}
            <div className="flex flex-[1_0_0] flex-col gap-[16px] items-center justify-center min-w-px">
              <RollingNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <p className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#707070] text-[24px] text-center">{stat.label}</p>
            </div>
          </Fragment>
        ))}
      </div>

      <ReviewsSection />
      <CtaSection />
      <Footer className="bg-[#191919] h-[764px] mt-[80px] overflow-clip relative rounded-[8px] shrink-0 w-[1872px]" />
    </Page>
  );
}
