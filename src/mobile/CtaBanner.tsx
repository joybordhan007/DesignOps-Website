import TalkButton from "./TalkButton";

// "Ready to Build Something Great and Scalable?" call to action.
export default function CtaBanner() {
  return (
    <section className="mx-auto px-[20px] py-[24px] w-full max-w-[760px]" data-name="Call To Action">
      <div className="bg-[#191919] flex flex-col gap-[24px] items-center px-[24px] py-[48px] rounded-[8px] text-center">
        <h2 className="font-['Inter:Bold'] font-bold leading-[1.2] text-[20px] text-white">
          Ready to Build <span className="text-[#00b6ca]">Something Great</span> and Scalable?
        </h2>
        <p className="font-['Inter:Regular'] leading-[1.5] text-[#e8e8e8] text-[14px]">
          We're currently accepting new projects. Let's turn your vision into a high-performing digital product.
        </p>
        <TalkButton />
      </div>
    </section>
  );
}
