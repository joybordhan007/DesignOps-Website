import { useEffect, useRef, useState } from "react";
import type { Client } from "@/content/types";
import { uploadFile } from "./api";
import { primaryButton, secondaryButton } from "./editor";
import { inputClass, smallButton, Switch } from "./fields";
import { UploadIcon } from "./icons";
import { removeBackground, type RemoveResult } from "./removeBackground";

// Client Management → logo: upload, see it the way the website shows it (fitted
// into 220 × 100 px), and optionally remove its background. The uploaded logo
// is kept as `logoOriginal`, so the background can be put back at any time.

const checker = "bg-[repeating-conic-gradient(#e9e9e9_0_25%,#fff_0_50%)] bg-[length:14px_14px]";

function Box({ src, label, note, checkered }: { src?: string; label: string; note?: string; checkered?: boolean }) {
  return (
    <figure className="flex flex-col gap-[6px]">
      <div className={`border border-[#e3e3e3] flex h-[100px] items-center justify-center overflow-hidden rounded-[6px] w-[220px] ${checkered ? checker : "bg-[#f5f5f5]"}`}>
        {src ? <img src={src} alt="" className="block object-contain size-full" /> : <span className="font-['Inter:Regular'] text-[#9a9a9a] text-[12px]">No logo yet</span>}
      </div>
      <figcaption className="font-['Inter:Regular'] text-[#707070] text-[12px]">
        {label}
        {note && <span className="block text-[#9a9a9a]">{note}</span>}
      </figcaption>
    </figure>
  );
}

export default function LogoEditor({ client, onChange }: { client: Client; onChange: (next: Client) => void }) {
  const file = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<RemoveResult | null>(null);
  const [working, setWorking] = useState(false);
  const [strength, setStrength] = useState(30);
  const [inside, setInside] = useState(false);
  const [editing, setEditing] = useState(false);

  const original = client.logoOriginal || client.logo;
  const removed = Boolean(client.logoOriginal && client.logo && client.logo !== client.logoOriginal);
  const isSvg = /\.svg(\?|$)/i.test(original) || original.startsWith("data:image/svg");

  // Work out the preview again when the settings change (short pause so the slider stays smooth).
  useEffect(() => {
    if (!editing || !original) return;
    let cancelled = false;
    setWorking(true);
    const timer = setTimeout(() => {
      removeBackground(original, { strength, inside })
        .then((result) => {
          if (cancelled) return URL.revokeObjectURL(result.url);
          setPreview(result);
          setError("");
        })
        .catch((e) => !cancelled && (setError((e as Error).message), setPreview(null)))
        .finally(() => !cancelled && setWorking(false));
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [editing, original, strength, inside]);

  // Free each preview image once it is replaced or the editor closes.
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview.url);
    },
    [preview],
  );

  const upload = async (picked?: File) => {
    if (!picked) return;
    if (!picked.type.startsWith("image/")) return setError("Please choose an image (PNG, JPG, WebP or SVG).");
    setError("");
    setEditing(false);
    setPreview(null);
    setUploading(0);
    try {
      const url = await uploadFile(picked, setUploading);
      onChange({ ...client, logo: url, logoOriginal: url });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(null);
      if (file.current) file.current.value = "";
    }
  };

  const apply = async () => {
    if (!preview) return;
    setWorking(true);
    try {
      const name = (client.name || "logo").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const url = await uploadFile(new File([preview.blob], `${name}-transparent.png`, { type: "image/png" }));
      onChange({ ...client, logo: url, logoOriginal: original });
      setEditing(false);
      setPreview(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setWorking(false);
    }
  };

  const toggle = (on: boolean) => {
    setError("");
    if (on) return setEditing(true);
    setEditing(false);
    setPreview(null);
    if (removed) onChange({ ...client, logo: original, logoOriginal: original });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-wrap gap-[16px] items-start">
        <Box src={client.logo} label="On the website" note="Fitted into 220 × 100 px" />
        <Box src={client.logo} label="Transparent parts" note="Checkered = see-through" checkered />
        <div className="flex flex-1 flex-col gap-[8px] min-w-[220px]">
          <div className="flex flex-wrap gap-[8px]">
            <button type="button" className={smallButton} onClick={() => file.current?.click()} disabled={uploading !== null}>
              <UploadIcon size={16} />
              {uploading !== null ? `Uploading ${Math.round(uploading * 100)}%` : client.logo ? "Upload a new logo" : "Upload logo"}
            </button>
          </div>
          <input className={inputClass} value={client.logo} placeholder="…or paste a URL" onChange={(e) => onChange({ ...client, logo: e.target.value, logoOriginal: e.target.value })} />
          <span className="font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]">PNG, JPG, WebP or SVG. A wide logo with little empty space around it looks best.</span>
        </div>
      </div>

      {client.logo && (
        <div className="border border-[#ececec] flex flex-col gap-[14px] p-[14px] rounded-[6px]">
          <div className="flex gap-[12px] items-center">
            <Switch checked={removed || editing} onChange={toggle} label="Remove background" disabled={isSvg || working || uploading !== null} />
            <span className="flex flex-col gap-[2px]">
              <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[14px]">Remove background</span>
              <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">
                {isSvg
                  ? "SVG logos are usually transparent already, so this isn't needed."
                  : removed && !editing
                    ? "The background is removed. Switch off to put the original back."
                    : "For logos on a plain white or coloured background."}
              </span>
            </span>
            {removed && !editing && (
              <button type="button" className={`${smallButton} ml-auto`} onClick={() => setEditing(true)}>
                Adjust
              </button>
            )}
          </div>

          {editing && (
            <div className="flex flex-col gap-[14px]">
              <div className="flex flex-wrap gap-[16px] items-start">
                <Box src={original} label="Before" checkered />
                <div className="relative">
                  <Box src={preview?.url} label={working ? "Working…" : "After"} note={preview ? `${preview.width} × ${preview.height} px, edges trimmed` : undefined} checkered />
                  {working && <span className="absolute bg-white/60 h-[100px] left-0 rounded-[6px] top-0 w-[220px]" aria-hidden="true" />}
                </div>
              </div>
              <label className="flex flex-col gap-[6px] max-w-[460px]">
                <span className="flex font-['Inter:Medium'] font-medium justify-between text-[#3e3e3e] text-[13px]">
                  Strength <span className="font-['Inter:Regular'] text-[#8a8a8a]">{strength}</span>
                </span>
                <input type="range" min={1} max={100} value={strength} onChange={(e) => setStrength(Number(e.target.value))} className="accent-[#00b6ca] cursor-pointer" />
                <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">Raise it if some background is left; lower it if parts of the logo disappear.</span>
              </label>
              <label className="cursor-pointer flex gap-[8px] items-start">
                <input type="checkbox" checked={inside} onChange={(e) => setInside(e.target.checked)} className="accent-[#00b6ca] mt-[3px]" />
                <span className="flex flex-col gap-[2px]">
                  <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">Also remove it inside the logo</span>
                  <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">For gaps inside letters like O and A. Leave off if the logo itself uses the background colour.</span>
                </span>
              </label>
              <div className="flex flex-wrap gap-[10px]">
                <button type="button" className={primaryButton} disabled={!preview || working} onClick={apply}>
                  {working && preview ? "Saving…" : "Use this logo"}
                </button>
                {/* Closes the panel and keeps the logo as it is (original or already-cleaned). */}
                <button type="button" className={secondaryButton} disabled={working} onClick={() => (setEditing(false), setPreview(null), setError(""))}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="font-['Inter:Regular'] text-[#e5484d] text-[13px]">{error}</p>}
      <input ref={file} type="file" hidden accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif" onChange={(e) => upload(e.target.files?.[0])} />
    </div>
  );
}
