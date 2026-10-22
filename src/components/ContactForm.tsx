import { FormEvent, useState } from "react";
import { useContent } from "@/content/store";
import { trackEvent } from "@/lib/tracking";

// Contact page inquiry form. The site has no backend, so submissions are sent
// through FormSubmit (https://formsubmit.co), which emails them to INBOX.
// The very first submission triggers a one-time activation email to INBOX;
// after the link in it is clicked, every inquiry is delivered.
const INBOX = "joybordhan224@gmail.com";
const ENDPOINT = `https://formsubmit.co/ajax/${INBOX}`;

type Status = "idle" | "sending" | "sent" | "error";

const label = "font-['Inter:Regular'] font-normal leading-[1.1] not-italic text-[#2f2f2f] text-[16px] uppercase max-lg:text-[12px]";
const field =
  "bg-[#f6f6f6] border border-transparent font-['Inter:Regular'] font-normal leading-[1.2] outline-none p-[20px] rounded-[10px] text-[#2f2f2f] text-[16px] w-full placeholder:text-[rgba(0,0,0,0.3)] focus:border-[#00b6ca] transition-colors";

function Label({ text, required = true }: { text: string; required?: boolean }) {
  return (
    <span className={label}>
      {text} {required && <span className="text-[red]">*</span>}
    </span>
  );
}

export default function ContactForm() {
  const labels = useContent().settings.labels.contactForm;
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    // Saved on our server (shown in the admin dashboard) and emailed via FormSubmit;
    // the inquiry counts as sent if either one succeeds. Both requests start right away.
    const saved = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.ok)
      .catch(() => false);
    const emailed = fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data,
        _subject: `New inquiry from ${data.first_name} ${data.last_name} (DesignOps website)`,
        _replyto: data.email,
        _template: "table",
        _captcha: "false",
      }),
    })
      .then(async (response) => response.ok && String((await response.json().catch(() => ({}))).success) !== "false")
      .catch(() => false);
    // Don't keep the visitor waiting on the email service once the server has it.
    const ok = (await saved) || (await emailed);
    if (ok) {
      setStatus("sent");
      trackEvent("lead", { form: "contact" });
      form.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white flex flex-[1_0_0] flex-col gap-[56px] items-center min-w-px overflow-clip p-[32px] relative max-lg:flex-none max-lg:gap-[32px] max-lg:p-[20px] max-lg:w-full rounded-[8px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)]"
      data-name="Contact Form"
    >
      <div className="flex flex-col gap-[40px] items-start w-full max-lg:gap-[24px]">
        <div className="flex gap-[48px] items-start w-full max-lg:flex-col max-lg:gap-[24px]">
          <label className="flex flex-[1_0_0] flex-col gap-[16px] min-w-px px-[4px] max-lg:flex-none max-lg:gap-[10px] max-lg:w-full">
            <Label text={labels.firstName} />
            <input className={field} name="first_name" placeholder="Jane" required autoComplete="given-name" />
          </label>
          <label className="flex flex-[1_0_0] flex-col gap-[16px] min-w-px px-[4px] max-lg:flex-none max-lg:gap-[10px] max-lg:w-full">
            <Label text={labels.lastName} />
            <input className={field} name="last_name" placeholder="Doe" required autoComplete="family-name" />
          </label>
        </div>
        <div className="flex gap-[48px] items-start w-full max-lg:flex-col max-lg:gap-[24px]">
          <label className="flex flex-[1_0_0] flex-col gap-[16px] min-w-px px-[4px] max-lg:flex-none max-lg:gap-[10px] max-lg:w-full">
            <Label text={labels.email} />
            <input className={field} name="email" type="email" placeholder="jane@example.com" required autoComplete="email" />
          </label>
          <label className="flex flex-[1_0_0] flex-col gap-[16px] min-w-px px-[4px] max-lg:flex-none max-lg:gap-[10px] max-lg:w-full">
            <Label text={labels.phone} />
            <input className={field} name="phone" type="tel" placeholder="(555) 555-1234" required autoComplete="tel" />
          </label>
        </div>
        <div className="flex gap-[48px] items-start w-full max-lg:flex-col max-lg:gap-[24px]">
          <label className="flex flex-[1_0_0] flex-col gap-[16px] min-w-px px-[4px] max-lg:flex-none max-lg:gap-[10px] max-lg:w-full">
            <Label text={labels.company} />
            <input className={field} name="company" placeholder="Enter your company name" required autoComplete="organization" />
          </label>
          <label className="flex flex-[1_0_0] flex-col gap-[16px] min-w-px px-[4px] max-lg:flex-none max-lg:gap-[10px] max-lg:w-full">
            <Label text={labels.time} />
            <span className="relative w-full">
              <select className={`${field} appearance-none cursor-pointer invalid:text-[rgba(0,0,0,0.3)] pr-[48px]`} name="preferred_time" required defaultValue="">
                <option value="" disabled>
                  {labels.timePlaceholder}
                </option>
                {labels.times.map((time) => (
                  <option key={time} value={time} className="text-[#2f2f2f]">
                    {time}
                  </option>
                ))}
              </select>
              <img alt="" className="-translate-y-1/2 absolute pointer-events-none right-[20px] size-[18px] top-1/2" src="/assets/contact/5ab61.svg" />
            </span>
          </label>
        </div>
        <label className="flex flex-col gap-[16px] px-[4px] w-full max-lg:gap-[10px]">
          <Label text={labels.message} required={false} />
          <textarea className={`${field} h-[168px] resize-none`} name="message" placeholder={labels.messagePlaceholder} />
        </label>
      </div>

      <div className="flex flex-col gap-[16px] items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-[#00b6ca] cursor-pointer disabled:cursor-wait disabled:opacity-70 font-['Inter:Medium'] font-medium leading-[1.2] px-[55px] py-[16px] rounded-[6px] text-[18px] text-white transition-colors hover:bg-[#009fb0] max-lg:px-[24px] max-lg:py-[10px] max-lg:text-[10px]"
        >
          {status === "sending" ? "Sending…" : labels.submit}
        </button>
        <p role="status" className="font-['Inter:Regular'] leading-[1.3] min-h-[21px] text-[16px] text-center max-lg:text-[14px]">
          {status === "sent" && <span className="text-[#0a8a4a]">{labels.sent}</span>}
          {status === "error" && (
            <span className="text-[#c62828]">
              Sorry, something went wrong. Please try again or email us at{" "}
              <a className="underline" href={`mailto:${INBOX}`}>
                {INBOX}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
