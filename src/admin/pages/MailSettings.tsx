import { useEffect, useState, type ReactNode } from "react";
import { useContent } from "@/content/store";
import { api, type MailSettings } from "../api";
import { card, primaryButton, same, secondaryButton, toast, useDirtyFlag } from "../editor";
import { inputClass, Switch } from "../fields";
import { CheckIcon, EyeIcon, EyeOffIcon, MailIcon } from "../icons";

// Website Settings → Email notifications: where contact form messages are
// emailed, and the account (SMTP) that sends them. Stored on the server only
// (server/mail.js), never in the website content.

type Draft = Omit<MailSettings, "passSet" | "lastResult"> & { pass: string };

const label = "font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]";
const hint = "font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]";

function Field({ title, help, children, wide }: { title: string; help?: ReactNode; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`flex flex-col gap-[6px] ${wide ? "col-span-full" : ""}`}>
      <span className={label}>{title}</span>
      {children}
      {help && <span className={hint}>{help}</span>}
    </label>
  );
}

const toDraft = (mail: MailSettings): Draft => ({ enabled: mail.enabled, to: mail.to, host: mail.host, port: mail.port, secure: mail.secure, user: mail.user, from: mail.from, pass: "" });

export default function MailSettingsEditor() {
  const contactEmail = useContent().settings.contact.email;
  const [saved, setSaved] = useState<MailSettings | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState<"save" | "test" | null>(null);
  const [showPass, setShowPass] = useState(false);
  const isDirty = Boolean(saved && draft && (!same(toDraft(saved), { ...draft, pass: "" }) || draft.pass !== ""));
  useDirtyFlag(isDirty);

  useEffect(() => {
    api
      .mail()
      .then((mail) => (setSaved(mail), setDraft(toDraft(mail))))
      .catch((e) => toast((e as Error).message, true));
  }, []);

  if (!saved || !draft) return <div className={`${card} font-['Inter:Regular'] p-[24px] text-[#8a8a8a] text-[14px]`}>Loading…</div>;

  const set = (patch: Partial<Draft>) => setDraft({ ...draft, ...patch });
  const recipients = draft.to.trim() || contactEmail;

  const save = async () => {
    setBusy("save");
    try {
      const next = await api.saveMail(draft);
      setSaved(next);
      setDraft(toDraft(next));
      toast("Email settings saved.");
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setBusy(null);
    }
  };

  const test = async () => {
    setBusy("test");
    try {
      const { to } = await api.testMail();
      toast(`Test email sent to ${to.join(", ")}. Check the inbox (and spam folder).`);
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setBusy(null);
      api.mail().then((mail) => setSaved((current) => (current ? { ...current, lastResult: mail.lastResult } : mail)));
    }
  };

  const last = saved.lastResult;

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex flex-wrap gap-[10px] items-center justify-between">
        <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]">Email notifications</h2>
        <div className="flex gap-[10px]">
          {isDirty && (
            <button type="button" className={secondaryButton} disabled={busy !== null} onClick={() => setDraft(toDraft(saved))}>
              Discard
            </button>
          )}
          <button type="button" className={primaryButton} disabled={!isDirty || busy !== null} onClick={save}>
            {busy === "save" ? "Saving…" : isDirty ? "Save changes" : "Saved"}
          </button>
        </div>
      </div>
      <p className="font-['Inter:Regular'] -mt-[6px] text-[#707070] text-[14px]">Every contact form message is saved under Messages and also emailed to the address below.</p>

      <div className={`${card} gap-[16px] grid grid-cols-1 p-[20px] md:grid-cols-2`}>
        <div className="col-span-full flex flex-col gap-[6px]">
          <Switch checked={draft.enabled} onChange={(enabled) => set({ enabled })} label="Email me new contact form messages" />
        </div>

        <Field title="Send to" wide help={`Separate several addresses with commas. Empty = the contact email (${contactEmail}).`}>
          <input className={inputClass} type="text" inputMode="email" placeholder={contactEmail} value={draft.to} onChange={(e) => set({ to: e.target.value })} />
        </Field>

        <details className="border border-[#ececec] col-span-full group/fold rounded-[6px] open:bg-[#fcfcfc]" open={!saved.host}>
          <summary className="cursor-pointer flex flex-col gap-[2px] list-none px-[16px] py-[13px] rounded-[6px] select-none hover:bg-[#f7fbfc] [&::-webkit-details-marker]:hidden">
            <span className="font-['Inter:Semi_Bold'] font-semibold text-[#222] text-[14px]">Sending account (SMTP)</span>
            <span className={hint}>{saved.host ? `${saved.user || "No login"} via ${saved.host}:${saved.port}` : "The email account the messages are sent from, e.g. your hosting email (cPanel → Email Accounts → Connect Devices)."}</span>
          </summary>
          <div className="border-[#ececec] border-t gap-[16px] grid grid-cols-1 p-[16px] md:grid-cols-2">
            <Field title="SMTP server" help="e.g. mail.yourdomain.com or smtp.gmail.com">
              <input className={inputClass} placeholder="mail.yourdomain.com" value={draft.host} onChange={(e) => set({ host: e.target.value })} />
            </Field>
            <Field title="Port & security" help="465 with SSL, or 587 without (STARTTLS).">
              <span className="flex gap-[10px]">
                <input className={`${inputClass} !w-[110px]`} type="number" min={1} max={65535} value={draft.port} onChange={(e) => set({ port: Number(e.target.value), secure: Number(e.target.value) === 465 })} />
                <select className={`${inputClass} cursor-pointer`} value={draft.secure ? "ssl" : "starttls"} onChange={(e) => set({ secure: e.target.value === "ssl" })}>
                  <option value="ssl">SSL/TLS</option>
                  <option value="starttls">STARTTLS</option>
                </select>
              </span>
            </Field>
            <Field title="Username" help="Usually the full email address.">
              <input className={inputClass} autoComplete="off" placeholder="info@yourdomain.com" value={draft.user} onChange={(e) => set({ user: e.target.value })} />
            </Field>
            <Field title="Password" help={saved.passSet ? "Saved. Leave empty to keep it." : "For Gmail, use an app password."}>
              <span className="relative">
                <input
                  className={`${inputClass} pr-[44px]`}
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder={saved.passSet ? "••••••••" : ""}
                  value={draft.pass}
                  onChange={(e) => set({ pass: e.target.value })}
                />
                <button
                  type="button"
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="-translate-y-1/2 absolute cursor-pointer p-[6px] right-[6px] rounded-[6px] text-[#8a8a8a] top-1/2 hover:text-[#00b6ca]"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </span>
            </Field>
            <Field title="From address (optional)" wide help="Empty = the username. Many servers only allow their own address here.">
              <input className={inputClass} placeholder={draft.user || "info@yourdomain.com"} value={draft.from} onChange={(e) => set({ from: e.target.value })} />
            </Field>
          </div>
        </details>

        <div className="col-span-full flex flex-wrap gap-[12px] items-center justify-between">
          <span className={`flex font-['Inter:Regular'] gap-[6px] items-center text-[13px] ${last ? (last.ok ? "text-[#1a7f45]" : "text-[#c62828]") : "text-[#8a8a8a]"}`}>
            {last ? (
              last.ok ? (
                <>
                  <CheckIcon size={15} /> Last email sent {new Date(last.at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </>
              ) : (
                <>Last email failed: {last.error}</>
              )
            ) : draft.enabled ? (
              `Messages will be emailed to ${recipients}.`
            ) : (
              "Emails are off: messages are only saved under Messages."
            )}
          </span>
          <button type="button" className={secondaryButton} disabled={busy !== null || isDirty || !saved.host} title={isDirty ? "Save first" : undefined} onClick={test}>
            <MailIcon size={16} /> {busy === "test" ? "Sending…" : "Send test email"}
          </button>
        </div>
      </div>
    </div>
  );
}
