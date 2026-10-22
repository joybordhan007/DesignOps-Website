import { useRef, useState, type FormEvent } from "react";
import { api, uploadFile, type AdminUser, type ApiError } from "../api";
import { card, PageHeader, primaryButton, secondaryButton, toast, useDirtyFlag } from "../editor";
import { inputClass } from "../fields";
import { EyeIcon, EyeOffIcon, KeyIcon, UploadIcon } from "../icons";

// The signed-in admin's own profile: name, photo and password. Opened from the
// account menu in the top bar (not listed in the sidebar).

const label = "font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]";

export function AdminAvatar({ user, size }: { user: Pick<AdminUser, "name" | "avatar">; size: number }) {
  if (user.avatar) return <img src={user.avatar} alt="" className="block object-cover rounded-full shrink-0" style={{ width: size, height: size }} />;
  const initials = user.name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span className="bg-[#191919] flex font-['Inter:Semi_Bold'] font-semibold items-center justify-center rounded-full shrink-0 text-white" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {initials}
    </span>
  );
}

function ProfileCard({ user, onChange }: { user: AdminUser; onChange: (user: AdminUser) => void }) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [uploading, setUploading] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const isDirty = name !== user.name || avatar !== user.avatar;
  useDirtyFlag(isDirty);

  const pick = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast("Please choose an image (JPG, PNG or WebP).", true);
    setUploading(0);
    try {
      setAvatar(await uploadFile(file, setUploading));
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setUploading(null);
      if (fileInput.current) fileInput.current.value = "";
    }
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return toast("Please enter your name.", true);
    setSaving(true);
    try {
      const next = await api.updateProfile({ name: name.trim(), avatar });
      onChange(next);
      setName(next.name);
      toast("Profile saved.");
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className={`${card} flex flex-col gap-[24px] p-[24px]`}>
      <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]">Profile</h2>

      <div className="flex flex-wrap gap-[20px] items-center">
        <AdminAvatar user={{ name: name || user.name, avatar }} size={88} />
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-wrap gap-[10px]">
            <button type="button" className={secondaryButton} disabled={uploading !== null} onClick={() => fileInput.current?.click()}>
              <UploadIcon size={16} /> {uploading !== null ? `Uploading ${Math.round(uploading * 100)}%` : avatar ? "Change photo" : "Upload photo"}
            </button>
            {avatar && (
              <button type="button" className={`${secondaryButton} hover:!border-[#e5484d] hover:!text-[#e5484d]`} onClick={() => setAvatar("")}>
                Remove
              </button>
            )}
          </div>
          <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">A square JPG or PNG works best. Without a photo your initials are shown.</span>
        </div>
        <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(e) => pick(e.target.files?.[0])} />
      </div>

      <div className="gap-[16px] grid grid-cols-1 md:grid-cols-2">
        <label className="flex flex-col gap-[6px]">
          <span className={label}>
            Name <span className="text-[#e5484d]">*</span>
          </span>
          <input className={inputClass} value={name} maxLength={80} autoComplete="name" onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="flex flex-col gap-[6px]">
          <span className={label}>Email (login ID)</span>
          <input className={`${inputClass} !bg-[#f0f0f0] cursor-not-allowed text-[#707070]`} value={user.email} readOnly />
        </label>
      </div>

      <div className="flex gap-[10px] justify-end">
        {isDirty && (
          <button type="button" className={secondaryButton} disabled={saving} onClick={() => (setName(user.name), setAvatar(user.avatar))}>
            Discard
          </button>
        )}
        <button type="submit" className={primaryButton} disabled={!isDirty || saving || uploading !== null}>
          {saving ? "Saving…" : isDirty ? "Save changes" : "Saved"}
        </button>
      </div>
    </form>
  );
}

/** Password box with a show/hide button and an error line under it. */
function PasswordInput({
  label: text,
  value,
  onChange,
  autoComplete,
  error,
  ok,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  error?: string;
  ok?: string;
}) {
  const [shown, setShown] = useState(false);
  return (
    <label className="flex flex-col gap-[6px]">
      <span className={label}>{text}</span>
      <span className="relative">
        <input
          className={`${inputClass} pr-[44px] ${error ? "!border-[#e5484d]" : ""}`}
          type={shown ? "text" : "password"}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          aria-label={shown ? "Hide password" : "Show password"}
          title={shown ? "Hide password" : "Show password"}
          className="-translate-y-1/2 absolute cursor-pointer p-[6px] right-[6px] rounded-[6px] text-[#8a8a8a] top-1/2 hover:text-[#00b6ca]"
          onClick={() => setShown(!shown)}
        >
          {shown ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
        </button>
      </span>
      {error ? (
        <span role="alert" className="font-['Inter:Regular'] text-[#e5484d] text-[12px]">
          {error}
        </span>
      ) : (
        ok && <span className="font-['Inter:Regular'] text-[#1a7f45] text-[12px]">{ok}</span>
      )}
    </label>
  );
}

function PasswordCard() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [busy, setBusy] = useState(false);
  const [wrongCurrent, setWrongCurrent] = useState(false);
  const [tried, setTried] = useState(false);

  const tooShort = next !== "" && next.length < 8;
  const mismatch = repeat !== "" && next !== repeat;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setTried(true);
    if (!current || !next || !repeat || tooShort || mismatch) return;
    setBusy(true);
    try {
      await api.changePassword(current, next);
      toast("Password changed.");
      setCurrent("");
      setNext("");
      setRepeat("");
      setTried(false);
    } catch (e) {
      if ((e as ApiError).status === 400 && /current password/i.test((e as Error).message)) setWrongCurrent(true);
      else toast((e as Error).message, true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className={`${card} flex flex-col gap-[20px] p-[24px]`}>
      <div className="flex flex-col gap-[4px]">
        <h2 className="flex font-['Inter:Semi_Bold'] font-semibold gap-[8px] items-center text-[#191919] text-[18px]">
          <KeyIcon size={18} /> Password
        </h2>
        <p className="font-['Inter:Regular'] text-[#707070] text-[14px]">At least 8 characters.</p>
      </div>
      <div className="gap-[16px] grid grid-cols-1 items-start md:grid-cols-3">
        <PasswordInput
          label="Current password"
          autoComplete="current-password"
          value={current}
          onChange={(value) => (setCurrent(value), setWrongCurrent(false))}
          error={wrongCurrent ? "Current password is incorrect." : tried && !current ? "Enter your current password." : undefined}
        />
        <PasswordInput
          label="New password"
          autoComplete="new-password"
          value={next}
          onChange={setNext}
          error={tooShort ? "Use at least 8 characters." : tried && !next ? "Enter a new password." : undefined}
        />
        <PasswordInput
          label="Repeat new password"
          autoComplete="new-password"
          value={repeat}
          onChange={setRepeat}
          error={mismatch ? "The new passwords don't match." : tried && !repeat ? "Repeat the new password." : undefined}
          ok={repeat !== "" && next === repeat && !tooShort ? "Passwords match." : undefined}
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className={primaryButton} disabled={busy}>
          {busy ? "Saving…" : "Change password"}
        </button>
      </div>
    </form>
  );
}

export default function ProfilePage({ user, onChange }: { user: AdminUser; onChange: (user: AdminUser) => void }) {
  return (
    <div className="flex flex-col gap-[20px] max-w-[900px]">
      <PageHeader title="My profile" description="Your name and photo are shown at the top of the dashboard." />
      <ProfileCard user={user} onChange={onChange} />
      <PasswordCard />
    </div>
  );
}
