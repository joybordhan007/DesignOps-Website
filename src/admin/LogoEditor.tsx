import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { Client } from "@/content/types";
import { uploadFile } from "./api";
import { primaryButton, secondaryButton } from "./editor";
import { inputClass, smallButton, Switch } from "./fields";
import { EditIcon, UploadIcon } from "./icons";
import LogoCanvasEditor from "./LogoCanvasEditor";
import { removeBackground, type Rect, type RemoveResult } from "./removeBackground";

// Client Management → logo:
// - upload, and place it in the website's 220 × 100 box by dragging (it snaps to
//   the centre) with a size slider;
// - remove its background automatically, then clean up by hand in a big editor
//   (click the logo). The uploaded logo is kept as `logoOriginal`, so the
//   background can be put back at any time, and `logoCrop` lines edits up with it.

const checker = "bg-[repeating-conic-gradient(#e9e9e9_0_25%,#fff_0_50%)] bg-[length:14px_14px]";
const SNAP = 3; // % of the box within which the logo snaps to the centre line

type Fit = NonNullable<Client["logoFit"]>;
const CENTRED: Fit = { x: 0, y: 0, scale: 1 };

/** The logo as the website shows it: fitted into 220 × 100, moved and sized by `fit`. */
export function LogoInBox({ src, fit, className = "" }: { src: string; fit?: Fit; className?: string }) {
  const f = fit ?? CENTRED;
  return <img src={src} alt="" draggable={false} className={`block object-contain pointer-events-none select-none size-full ${className}`} style={{ transform: `translate(${f.x}%, ${f.y}%) scale(${f.scale})` }} />;
}

/** The website's 220 × 100 box: drag the logo to place it; it snaps to the centre lines. */
function PlacementBox({ src, fit, onChange }: { src: string; fit: Fit; onChange: (fit: Fit) => void }) {
  const drag = useRef<{ x: number; y: number; start: Fit } | null>(null);
  const [snapped, setSnapped] = useState({ x: false, y: false, active: false });

  const down = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, start: fit };
    setSnapped({ x: fit.x === 0, y: fit.y === 0, active: true });
  };
  const move = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const box = e.currentTarget.getBoundingClientRect();
    let x = drag.current.start.x + ((e.clientX - drag.current.x) / box.width) * 100;
    let y = drag.current.start.y + ((e.clientY - drag.current.y) / box.height) * 100;
    const snapX = Math.abs(x) < SNAP;
    const snapY = Math.abs(y) < SNAP;
    if (snapX) x = 0;
    if (snapY) y = 0;
    setSnapped({ x: snapX, y: snapY, active: true });
    onChange({ ...fit, x: Math.round(Math.max(-60, Math.min(60, x)) * 10) / 10, y: Math.round(Math.max(-60, Math.min(60, y)) * 10) / 10 });
  };
  const up = () => {
    drag.current = null;
    setSnapped((s) => ({ ...s, active: false }));
  };

  return (
    <div
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      title="Drag to place the logo"
      className="bg-[#f5f5f5] border border-[#e3e3e3] cursor-grab h-[100px] overflow-hidden relative rounded-[6px] touch-none w-[220px] active:cursor-grabbing"
    >
      <LogoInBox src={src} fit={fit} />
      {/* Centre guides, shown while dragging; green when the logo sits on them. */}
      {snapped.active && (
        <>
          <span aria-hidden="true" className={`absolute h-full left-1/2 pointer-events-none top-0 w-px ${snapped.x ? "bg-[#1a7f45]" : "bg-[#00b6ca]/40"}`} />
          <span aria-hidden="true" className={`absolute h-px left-0 pointer-events-none top-1/2 w-full ${snapped.y ? "bg-[#1a7f45]" : "bg-[#00b6ca]/40"}`} />
        </>
      )}
    </div>
  );
}

export default function LogoEditor({ client, onChange }: { client: Client; onChange: (next: Client) => void }) {
  const file = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<RemoveResult | null>(null);
  const [working, setWorking] = useState(false);
  const [strength, setStrength] = useState(30);
  const [inside, setInside] = useState(false);
  const [editing, setEditing] = useState(false);
  const [handEdit, setHandEdit] = useState(false);

  const original = client.logoOriginal || client.logo;
  const removed = Boolean(client.logoOriginal && client.logo && client.logo !== client.logoOriginal);
  const isSvg = /\.svg(\?|$)/i.test(original) || original.startsWith("data:image/svg");
  const fit = client.logoFit ?? CENTRED;
  const setFit = (next: Fit) => onChange({ ...client, logoFit: next });

  // Work out the automatic-removal preview again when the settings change (short pause so the slider stays smooth).
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

  // Free each preview image once it is replaced or the panel closes.
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
    setNote("");
    setEditing(false);
    setPreview(null);
    setUploading(0);
    try {
      const url = await uploadFile(picked, setUploading, setNote);
      onChange({ ...client, logo: url, logoOriginal: url, logoCrop: undefined, logoFit: undefined });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(null);
      if (file.current) file.current.value = "";
    }
  };

  /** Uploads an edited logo (cut from the original at `crop`) and uses it. */
  const saveEdited = async (blob: Blob, crop: Rect) => {
    const name = (client.name || "logo").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const url = await uploadFile(new File([blob], `${name}-transparent.png`, { type: "image/png" }));
    onChange({ ...client, logo: url, logoOriginal: original, logoCrop: crop });
  };

  const apply = async () => {
    if (!preview) return;
    setWorking(true);
    try {
      await saveEdited(preview.blob, preview.crop);
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
    if (removed) onChange({ ...client, logo: original, logoOriginal: original, logoCrop: undefined });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex flex-wrap gap-[16px] items-start">
        {client.logo ? (
          <figure className="flex flex-col gap-[6px]">
            <PlacementBox src={client.logo} fit={fit} onChange={setFit} />
            <figcaption className="font-['Inter:Regular'] text-[#707070] text-[12px]">
              On the website (220 × 100)
              <span className="block text-[#9a9a9a]">Drag to place it; it snaps to the centre</span>
            </figcaption>
          </figure>
        ) : (
          <div className="bg-[#f5f5f5] border border-[#e3e3e3] flex font-['Inter:Regular'] h-[100px] items-center justify-center rounded-[6px] text-[#9a9a9a] text-[12px] w-[220px]">No logo yet</div>
        )}
        {client.logo && !isSvg && (
          <figure className="flex flex-col gap-[6px]">
            <button
              type="button"
              onClick={() => setHandEdit(true)}
              title="Click to open the big editor"
              className={`border border-[#e3e3e3] cursor-zoom-in flex group h-[100px] items-center justify-center overflow-hidden relative rounded-[6px] w-[220px] ${checker}`}
            >
              <img src={client.logo} alt="" className="block object-contain size-full" />
              <span className="absolute bg-[#191919]/75 bottom-[6px] flex font-['Inter:Medium'] font-medium gap-[4px] items-center opacity-0 px-[8px] py-[3px] right-[6px] rounded-[6px] text-[11px] text-white transition-opacity group-hover:opacity-100">
                <EditIcon size={12} /> Edit by hand
              </span>
            </button>
            <figcaption className="font-['Inter:Regular'] text-[#707070] text-[12px]">
              Transparent parts
              <span className="block text-[#9a9a9a]">Click to view big and edit</span>
            </figcaption>
          </figure>
        )}
        <div className="flex flex-1 flex-col gap-[8px] min-w-[220px]">
          <div className="flex flex-wrap gap-[8px]">
            <button type="button" className={smallButton} onClick={() => file.current?.click()} disabled={uploading !== null}>
              <UploadIcon size={16} />
              {uploading !== null ? `Uploading ${Math.round(uploading * 100)}%` : client.logo ? "Upload a new logo" : "Upload logo"}
            </button>
          </div>
          <input className={inputClass} value={client.logo} placeholder="…or paste a URL" onChange={(e) => onChange({ ...client, logo: e.target.value, logoOriginal: e.target.value, logoCrop: undefined })} />
          <span className="font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]">PNG, JPG, WebP or SVG. A wide logo with little empty space around it looks best.</span>
          {note && <span className="font-['Inter:Regular'] text-[#1a7f45] text-[12px]">{note}</span>}
        </div>
      </div>

      {client.logo && (
        <div className="flex flex-wrap gap-[16px] items-center">
          <label className="flex font-['Inter:Medium'] font-medium gap-[10px] items-center text-[#3e3e3e] text-[13px]">
            Size
            <input type="range" min={30} max={200} value={Math.round(fit.scale * 100)} onChange={(e) => setFit({ ...fit, scale: Number(e.target.value) / 100 })} className="accent-[#00b6ca] cursor-pointer w-[160px]" />
            <span className="font-['Inter:Regular'] text-[#8a8a8a] w-[40px]">{Math.round(fit.scale * 100)}%</span>
          </label>
          <button type="button" className={smallButton} disabled={fit.x === 0 && fit.y === 0} onClick={() => setFit({ ...fit, x: 0, y: 0 })}>
            Center
          </button>
          <button type="button" className={smallButton} disabled={fit.x === 0 && fit.y === 0 && fit.scale === 1} onClick={() => setFit(CENTRED)}>
            Reset placement
          </button>
        </div>
      )}

      {client.logo && (
        <div className="border border-[#ececec] flex flex-col gap-[14px] p-[14px] rounded-[6px]">
          <div className="flex flex-wrap gap-[12px] items-center">
            <Switch checked={removed || editing} onChange={toggle} label="Remove background" disabled={isSvg || working || uploading !== null} />
            <span className="flex flex-1 flex-col gap-[2px] min-w-[200px]">
              <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[14px]">Remove background</span>
              <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">
                {isSvg
                  ? "SVG logos are usually transparent already, so this isn't needed."
                  : removed && !editing
                    ? "The background is removed. Switch off to put the original back, or click the logo to touch it up by hand."
                    : "For logos on a plain or gradient background. You can fix any leftovers by hand afterwards."}
              </span>
            </span>
            {!isSvg && !editing && (
              <button type="button" className={smallButton} onClick={() => setHandEdit(true)}>
                <EditIcon size={14} /> Edit by hand…
              </button>
            )}
            {removed && !editing && (
              <button type="button" className={smallButton} onClick={() => setEditing(true)}>
                Redo automatically
              </button>
            )}
          </div>

          {editing && (
            <div className="flex flex-col gap-[14px]">
              <div className="flex flex-wrap gap-[16px] items-start">
                <figure className="flex flex-col gap-[6px]">
                  <div className={`border border-[#e3e3e3] flex h-[100px] items-center justify-center overflow-hidden rounded-[6px] w-[220px] ${checker}`}>
                    <img src={original} alt="" className="block object-contain size-full" />
                  </div>
                  <figcaption className="font-['Inter:Regular'] text-[#707070] text-[12px]">Before</figcaption>
                </figure>
                <figure className="flex flex-col gap-[6px]">
                  <button
                    type="button"
                    disabled={!preview}
                    onClick={() => setHandEdit(true)}
                    title="Click to touch up by hand"
                    className={`border border-[#e3e3e3] cursor-zoom-in flex h-[100px] items-center justify-center overflow-hidden relative rounded-[6px] w-[220px] disabled:cursor-wait ${checker}`}
                  >
                    {preview && <img src={preview.url} alt="" className="block object-contain size-full" />}
                    {working && <span className="absolute bg-white/60 inset-0" aria-hidden="true" />}
                  </button>
                  <figcaption className="font-['Inter:Regular'] text-[#707070] text-[12px]">
                    {working ? "Working…" : "After"}
                    {preview && <span className="block text-[#9a9a9a]">Click to touch up by hand</span>}
                  </figcaption>
                </figure>
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
                <button type="button" className={secondaryButton} disabled={!preview || working} onClick={() => setHandEdit(true)}>
                  <EditIcon size={14} /> Touch up by hand…
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

      {handEdit && (
        <LogoCanvasEditor
          originalSrc={original}
          currentSrc={client.logo}
          crop={client.logoCrop}
          start={editing ? preview?.image : null}
          options={{ strength, inside }}
          onCancel={() => setHandEdit(false)}
          onSave={async (blob, crop) => {
            await saveEdited(blob, crop);
            setHandEdit(false);
            setEditing(false);
            setPreview(null);
          }}
        />
      )}
    </div>
  );
}
