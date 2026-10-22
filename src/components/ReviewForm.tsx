import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useContent } from "@/content/store";
import { trackEvent } from "@/lib/tracking";

// "Write a review" popup on the Reviews page. The review is stored on the server
// and only shows on the website after the admin approves it. The photo is optional.
// Rendered into <body> so it isn't scaled with the desktop artboard.

type Status = "idle" | "sending" | "sent";

const label = "font-['Inter:Regular'] leading-[1.1] text-[#2f2f2f] text-[13px] uppercase";
const field =
  "bg-[#f6f6f6] border border-transparent font-['Inter:Regular'] leading-[1.3] outline-none px-[16px] py-[13px] rounded-[10px] text-[#2f2f2f] text-[15px] transition-colors w-full placeholder:text-[rgba(0,0,0,0.3)] focus:border-[#00b6ca]";
const MAX_PHOTO = 3 * 1024 * 1024;

function Label({ text, required = true, optional = "(optional)" }: { text: string; required?: boolean; optional?: string }) {
  return (
    <span className={label}>
      {text} {required ? <span className="text-[red]">*</span> : <span className="normal-case text-[#8a8a8a]">{optional}</span>}
    </span>
  );
}

function RatingInput({ value, onChange }: { value: number; onChange: (rating: number) => void }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div role="radiogroup" aria-label="Rating" className="flex gap-[6px]" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className="cursor-pointer p-[2px] rounded-[4px] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#00b6ca]"
          onMouseEnter={() => setHover(star)}
          onClick={() => onChange(star)}
        >
          <img alt="" className={`block size-[32px] transition-[filter,opacity] ${star <= shown ? "" : "grayscale opacity-25"}`} src="/assets/shared/icons/star.svg" />
        </button>
      ))}
    </div>
  );
}

export default function ReviewForm({ onClose }: { onClose: () => void }) {
  const labels = useContent().settings.labels.reviews;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const photoInput = useRef<HTMLInputElement>(null);
  // Only a click that starts and ends on the backdrop closes the popup (not a text-selection drag).
  const backdropPress = useRef(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
    };
  }, [onClose]);

  useEffect(() => {
    if (!photo) return setPreview("");
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const pickPhoto = (file?: File) => {
    setError("");
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|avif)$/.test(file.type)) return setError("The photo must be a JPG, PNG or WebP image.");
    if (file.size > MAX_PHOTO) return setError("The photo is too large (max 3 MB).");
    setPhoto(file);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rating) return setError("Please choose a star rating.");
    const data = new FormData(event.currentTarget);
    data.set("rating", String(rating));
    data.delete("avatar");
    if (photo) data.set("avatar", photo);
    setError("");
    setStatus("sending");
    try {
      const response = await fetch("/api/reviews", { method: "POST", body: data, headers: { Accept: "application/json" } });
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(body?.error || "Your review couldn't be sent. Please try again later.");
      setStatus("sent");
      trackEvent("review", { rating: String(rating) });
    } catch (e) {
      setStatus("idle");
      setError(e instanceof TypeError ? "Your review couldn't be sent. Please check your connection and try again." : (e as Error).message);
    }
  };

  return createPortal(
    <div
      className="bg-[rgba(0,0,0,0.55)] fixed flex inset-0 items-center justify-center overflow-y-auto p-[16px] z-[200]"
      onMouseDown={(e) => (backdropPress.current = e.target === e.currentTarget)}
      onClick={(e) => e.target === e.currentTarget && backdropPress.current && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="review-form-title" className="bg-white max-h-full max-w-[640px] overflow-y-auto relative rounded-[12px] shadow-[0px_20px_60px_rgba(0,0,0,0.3)] w-full">
        <button type="button" aria-label="Close" className="absolute cursor-pointer flex items-center justify-center right-[12px] rounded-full size-[40px] text-[#505050] top-[12px] hover:bg-[#f2f2f2]" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {status === "sent" ? (
          <div className="flex flex-col gap-[16px] items-center px-[32px] py-[56px] text-center max-sm:px-[20px]">
            <span className="bg-[#e9f9fb] flex items-center justify-center rounded-full size-[64px] text-[#00b6ca]">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 5 5 9-10" />
              </svg>
            </span>
            <h2 id="review-form-title" className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[24px]">
              {labels.thanksTitle}
            </h2>
            <p className="font-['Inter:Regular'] leading-[1.5] max-w-[420px] text-[#505050] text-[16px]">{labels.thanksText}</p>
            <button type="button" className="bg-[#171717] cursor-pointer font-['Inter:Medium'] font-medium mt-[8px] px-[26px] py-[13px] rounded-[4px] text-[#f6f6f6] text-[15px] hover:bg-black" onClick={onClose}>
              CLOSE
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-[20px] p-[32px] max-sm:p-[20px]">
            <div className="flex flex-col gap-[6px] pr-[40px]">
              <h2 id="review-form-title" className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#2f2f2f] text-[24px] max-sm:text-[20px]">
                {labels.formTitle}
              </h2>
              <p className="font-['Inter:Regular'] leading-[1.4] text-[#707070] text-[14px]">{labels.formText}</p>
            </div>

            <div className="flex flex-col gap-[8px]">
              <Label text={labels.rating} />
              <RatingInput value={rating} onChange={(next) => (setRating(next), setError(""))} />
            </div>

            <div className="gap-[16px] grid grid-cols-2 max-sm:grid-cols-1">
              <label className="flex flex-col gap-[8px]">
                <Label text={labels.name} />
                <input className={field} name="name" placeholder="Jane Doe" required maxLength={100} autoComplete="name" />
              </label>
              <label className="flex flex-col gap-[8px]">
                <Label text={labels.email} required={false} optional={labels.optional} />
                <input className={field} name="email" type="email" placeholder="jane@company.com" maxLength={200} autoComplete="email" />
              </label>
              <label className="flex flex-col gap-[8px]">
                <Label text={labels.role} required={false} optional={labels.optional} />
                <input className={field} name="role" placeholder="CTO" maxLength={100} autoComplete="organization-title" />
              </label>
              <label className="flex flex-col gap-[8px]">
                <Label text={labels.company} required={false} optional={labels.optional} />
                <input className={field} name="company" placeholder="Company Inc." maxLength={120} autoComplete="organization" />
              </label>
            </div>

            <label className="flex flex-col gap-[8px]">
              <Label text={labels.quote} required={false} optional={labels.optional} />
              <textarea className={`${field} min-h-[120px] resize-y`} name="quote" placeholder="What did we do for you, and how did it go?" maxLength={1000} />
            </label>

            <div className="flex flex-col gap-[8px]">
              <Label text={labels.photo} required={false} optional={labels.optional} />
              <div className="flex gap-[14px] items-center">
                {preview ? (
                  <img src={preview} alt="" className="block object-cover rounded-full shrink-0 size-[56px]" />
                ) : (
                  <span className="bg-[#f0f0f0] border border-[#dcdcdc] border-dashed rounded-full shrink-0 size-[56px]" aria-hidden="true" />
                )}
                <button type="button" className="border border-[#dcdcdc] cursor-pointer font-['Inter:Medium'] font-medium px-[14px] py-[9px] rounded-[6px] text-[#2f2f2f] text-[14px] hover:border-[#00b6ca] hover:text-[#00a0b2]" onClick={() => photoInput.current?.click()}>
                  {photo ? "Change photo" : "Add photo"}
                </button>
                {photo && (
                  <button type="button" className="cursor-pointer font-['Inter:Regular'] text-[#707070] text-[14px] underline hover:text-[#d93a3f]" onClick={() => (setPhoto(null), photoInput.current && (photoInput.current.value = ""))}>
                    Remove
                  </button>
                )}
              </div>
              <input ref={photoInput} type="file" name="avatar" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(e) => pickPhoto(e.target.files?.[0])} />
            </div>

            {error && (
              <p role="alert" className="bg-[#fdecec] font-['Inter:Regular'] px-[12px] py-[10px] rounded-[6px] text-[#c62828] text-[14px]">
                {error}
              </p>
            )}

            <button type="submit" disabled={status === "sending"} className="bg-[#00b6ca] cursor-pointer font-['Inter:Medium'] font-medium py-[15px] rounded-[4px] shadow-[0px_2px_3px_rgba(0,0,0,0.1)] text-[#f6f6f6] text-[16px] transition-colors hover:bg-[#00a3b5] disabled:cursor-wait disabled:opacity-60">
              {status === "sending" ? "SENDING…" : labels.formSubmit}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
