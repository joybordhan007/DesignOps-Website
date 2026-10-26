import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { primaryButton, secondaryButton } from "./editor";
import { CloseIcon } from "./icons";
import { autoRemove, exportTrimmed, loadImage, loadWorkImage, magicErase, pixels, toNatural, trimRect, type Rect, type RemoveOptions } from "./removeBackground";

// Big view of a logo for cleaning up its background by hand, after (or instead
// of) the automatic removal:
//   Erase    brush that clears pixels (leftover background)
//   Restore  brush that paints the original back (parts of the logo removed by mistake)
//   Magic    click an area to clear everything of a similar colour around it
//   Move     drag to scroll (or hold Space with any tool)
// Zoom with the buttons or Ctrl + mouse wheel; undo with Ctrl+Z.

type Tool = "erase" | "restore" | "magic" | "pan";
type Backdrop = "checker" | "white" | "black";

const HISTORY = 12;

const backdrops: Record<Backdrop, string> = {
  checker: "bg-[repeating-conic-gradient(#e2e2e2_0_25%,#fff_0_50%)] bg-[length:18px_18px]",
  white: "bg-white",
  black: "bg-[#111]",
};

function ToolButton({ active, label, shortcut, onClick, children }: { active: boolean; label: string; shortcut: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      title={`${label} (${shortcut})`}
      onClick={onClick}
      className={`cursor-pointer flex font-['Inter:Medium'] font-medium gap-[6px] items-center px-[12px] py-[8px] rounded-[6px] text-[13px] transition-colors ${active ? "bg-[#00b6ca] text-white" : "bg-white text-[#3e3e3e] hover:bg-[#eef9fb]"}`}
    >
      {children}
      <span className={`text-[11px] ${active ? "text-white/80" : "text-[#9a9a9a]"}`}>{shortcut}</span>
    </button>
  );
}

export default function LogoCanvasEditor({
  originalSrc,
  currentSrc,
  crop,
  start,
  options,
  onCancel,
  onSave,
}: {
  /** The logo as uploaded. */
  originalSrc: string;
  /** The logo as it is now (may already have its background removed). */
  currentSrc: string;
  /** Where `currentSrc` sits in the original, if it was cut from it. */
  crop?: Rect;
  /** Begin from this automatic-removal result (same size as the work image), if given. */
  start?: ImageData | null;
  /** Settings for the automatic removal when there is nothing better to start from. */
  options: RemoveOptions;
  onCancel: () => void;
  onSave: (blob: Blob, crop: Rect) => Promise<void>;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const base = useRef<HTMLCanvasElement | null>(null);
  const scale = useRef(1);
  const undo = useRef<ImageData[]>([]);
  const redo = useRef<ImageData[]>([]);
  const stroke = useRef<{ x: number; y: number } | null>(null);
  const panning = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [tool, setTool] = useState<Tool>("erase");
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [brush, setBrush] = useState(24);
  const [tolerance, setTolerance] = useState(30);
  const [zoom, setZoom] = useState(1);
  const [backdrop, setBackdrop] = useState<Backdrop>("checker");
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [preview, setPreview] = useState("");
  const [changed, setChanged] = useState(false);
  const [saving, setSaving] = useState(false);
  const [, setHistoryVersion] = useState(0);

  const ctx = () => canvas.current?.getContext("2d", { willReadFrequently: true }) ?? null;
  const refreshPreview = useCallback(() => canvas.current && setPreview(canvas.current.toDataURL("image/png")), []);

  /** Zoom that fits the whole logo in the view. */
  const fitZoom = useCallback(() => {
    const el = viewport.current;
    const c = canvas.current;
    if (!el || !c) return 1;
    return Math.min(4, Math.max(0.05, Math.min((el.clientWidth - 32) / c.width, (el.clientHeight - 32) / c.height)));
  }, []);

  // Load the original, then the starting point: the given result, the current logo lined up with the original, or a fresh automatic removal.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const work = await loadWorkImage(originalSrc);
        if (cancelled || !canvas.current) return;
        base.current = work.canvas;
        scale.current = work.scale;
        canvas.current.width = work.canvas.width;
        canvas.current.height = work.canvas.height;
        const c = ctx()!;
        if (start && start.width === work.canvas.width && start.height === work.canvas.height) c.putImageData(start, 0, 0);
        else if (currentSrc && currentSrc !== originalSrc && crop) {
          const img = await loadImage(currentSrc);
          c.drawImage(img, crop.x * work.scale, crop.y * work.scale, crop.w * work.scale, crop.h * work.scale);
        } else if (currentSrc && currentSrc !== originalSrc) c.putImageData(autoRemove(pixels(work.canvas), options).image, 0, 0);
        else c.drawImage(work.canvas, 0, 0);
        setBrush(Math.max(4, Math.round(Math.max(work.canvas.width, work.canvas.height) / 40)));
        setZoom(fitZoom());
        refreshPreview();
        setReady(true);
      } catch (e) {
        setError((e as Error).message);
      }
    })();
    return () => {
      cancelled = true;
    };
    // Loaded once when the editor opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remember = () => {
    const c = ctx();
    if (!c || !canvas.current) return;
    undo.current.push(c.getImageData(0, 0, canvas.current.width, canvas.current.height));
    if (undo.current.length > HISTORY) undo.current.shift();
    redo.current = [];
    setHistoryVersion((v) => v + 1);
  };

  const step = useCallback(
    (from: ImageData[], to: ImageData[]) => {
      const c = ctx();
      const snapshot = from.pop();
      if (!c || !canvas.current || !snapshot) return;
      to.push(c.getImageData(0, 0, canvas.current.width, canvas.current.height));
      c.putImageData(snapshot, 0, 0);
      setChanged(true);
      setHistoryVersion((v) => v + 1);
      refreshPreview();
    },
    [refreshPreview],
  );

  /** Image pixel under the mouse. */
  const at = (e: { clientX: number; clientY: number }) => {
    const box = canvas.current!.getBoundingClientRect();
    return { x: (e.clientX - box.left) / zoom, y: (e.clientY - box.top) / zoom };
  };

  const stamp = (x: number, y: number) => {
    const c = ctx();
    if (!c) return;
    const r = brush / 2;
    c.save();
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    if (tool === "erase") {
      c.globalCompositeOperation = "destination-out";
      c.fill();
    } else if (base.current) {
      c.clip();
      c.clearRect(x - r, y - r, brush, brush);
      c.drawImage(base.current, 0, 0);
    }
    c.restore();
  };

  const line = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(1, Math.ceil(distance / Math.max(1, brush / 4)));
    for (let i = 1; i <= steps; i++) stamp(from.x + ((to.x - from.x) * i) / steps, from.y + ((to.y - from.y) * i) / steps);
  };

  const panMode = tool === "pan" || spaceHeld;

  const down = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!ready) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (panMode || e.button === 1) {
      const el = viewport.current!;
      panning.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
      return;
    }
    const point = at(e);
    if (tool === "magic") {
      const c = ctx()!;
      remember();
      const image = c.getImageData(0, 0, canvas.current!.width, canvas.current!.height);
      if (magicErase(image, Math.floor(point.x), Math.floor(point.y), tolerance)) {
        c.putImageData(image, 0, 0);
        setChanged(true);
        refreshPreview();
      } else {
        undo.current.pop();
        setHistoryVersion((v) => v + 1);
      }
      return;
    }
    remember();
    stroke.current = point;
    stamp(point.x, point.y);
    setChanged(true);
  };

  const move = (e: ReactPointerEvent<HTMLCanvasElement>) => {
    const point = at(e);
    setCursor(point);
    if (panning.current) {
      const el = viewport.current!;
      el.scrollLeft = panning.current.left - (e.clientX - panning.current.x);
      el.scrollTop = panning.current.top - (e.clientY - panning.current.y);
      return;
    }
    if (stroke.current) {
      line(stroke.current, point);
      stroke.current = point;
    }
  };

  const up = () => {
    if (stroke.current) refreshPreview();
    stroke.current = null;
    panning.current = null;
  };

  const close = useCallback(() => {
    if (!changed || window.confirm("Close without saving your edits?")) onCancel();
  }, [changed, onCancel]);

  // Keyboard: tools, brush size, undo/redo, Space to move, Esc to close.
  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === "z") {
        e.preventDefault();
        if (e.shiftKey) step(redo.current, undo.current);
        else step(undo.current, redo.current);
      } else if ((e.ctrlKey || e.metaKey) && key === "y") {
        e.preventDefault();
        step(redo.current, undo.current);
      } else if (key === " ") {
        e.preventDefault();
        setSpaceHeld(true);
      } else if (key === "escape") close();
      else if (key === "e") setTool("erase");
      else if (key === "r") setTool("restore");
      else if (key === "m") setTool("magic");
      else if (key === "h") setTool("pan");
      else if (key === "[") setBrush((b) => Math.max(2, Math.round(b * 0.8)));
      else if (key === "]") setBrush((b) => Math.min(400, Math.round(b * 1.25) + 1));
    };
    const keyUp = (e: KeyboardEvent) => e.key === " " && setSpaceHeld(false);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [close, step]);

  // Ctrl + wheel zooms (the page itself doesn't).
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const wheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setZoom((z) => Math.min(8, Math.max(0.05, z * (e.deltaY < 0 ? 1.15 : 1 / 1.15))));
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  }, []);

  const save = async () => {
    const c = ctx();
    if (!c || !canvas.current) return;
    const rect = trimRect(c.getImageData(0, 0, canvas.current.width, canvas.current.height));
    if (!rect) return setError("Nothing is left of the logo. Use Restore or Undo.");
    setSaving(true);
    try {
      await onSave(await exportTrimmed(canvas.current, rect), toNatural(rect, scale.current));
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  };

  const cursorStyle = panMode ? (panning.current ? "grabbing" : "grab") : tool === "magic" ? "crosshair" : "none";
  const zoomBy = (factor: number) => setZoom((z) => Math.min(8, Math.max(0.05, z * factor)));

  return createPortal(
    <div className="bg-[rgba(0,0,0,0.6)] fixed flex inset-0 items-center justify-center p-[16px] z-[300]" role="dialog" aria-modal="true" aria-label="Edit logo">
      <div className="bg-[#f5f5f5] flex flex-col h-full max-h-[920px] max-w-[1400px] overflow-hidden rounded-[6px] shadow-[0px_20px_60px_rgba(0,0,0,0.35)] w-full">
        <header className="bg-white border-[#e6e6e6] border-b flex flex-wrap gap-[16px] items-center px-[16px] py-[12px]">
          <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[16px]">Edit logo by hand</h2>
          <div className="flex flex-wrap gap-[6px]">
            <ToolButton active={tool === "erase"} label="Erase: brush away leftover background" shortcut="E" onClick={() => setTool("erase")}>
              Erase
            </ToolButton>
            <ToolButton active={tool === "restore"} label="Restore: paint the original back" shortcut="R" onClick={() => setTool("restore")}>
              Restore
            </ToolButton>
            <ToolButton active={tool === "magic"} label="Magic erase: click an area to clear its colour" shortcut="M" onClick={() => setTool("magic")}>
              Magic erase
            </ToolButton>
            <ToolButton active={tool === "pan"} label="Move the view (or hold Space)" shortcut="H" onClick={() => setTool("pan")}>
              Move
            </ToolButton>
          </div>
          <button type="button" aria-label="Close" className="cursor-pointer ml-auto p-[6px] rounded-[6px] text-[#505050] hover:bg-[#f2f2f2]" onClick={close}>
            <CloseIcon size={20} />
          </button>
        </header>

        <div className="bg-white border-[#e6e6e6] border-b flex flex-wrap gap-x-[24px] gap-y-[10px] items-center px-[16px] py-[10px]">
          {tool === "magic" ? (
            <label className="flex font-['Inter:Medium'] font-medium gap-[10px] items-center text-[#3e3e3e] text-[13px]">
              Colour range
              <input type="range" min={1} max={100} value={tolerance} onChange={(e) => setTolerance(Number(e.target.value))} className="accent-[#00b6ca] cursor-pointer w-[160px]" />
              <span className="text-[#8a8a8a] w-[28px]">{tolerance}</span>
            </label>
          ) : (
            <label className="flex font-['Inter:Medium'] font-medium gap-[10px] items-center text-[#3e3e3e] text-[13px]">
              Brush size
              <input type="range" min={2} max={400} value={brush} onChange={(e) => setBrush(Number(e.target.value))} className="accent-[#00b6ca] cursor-pointer w-[160px]" />
              <span className="text-[#8a8a8a] w-[44px]">{brush}px</span>
            </label>
          )}
          <div className="flex gap-[4px] items-center">
            <span className="font-['Inter:Medium'] font-medium mr-[4px] text-[#3e3e3e] text-[13px]">Zoom</span>
            <button type="button" className={`${secondaryButton} !px-[10px] !py-[4px]`} onClick={() => zoomBy(1 / 1.25)}>
              −
            </button>
            <span className="font-['Inter:Regular'] text-[#505050] text-[13px] text-center w-[48px]">{Math.round(zoom * 100)}%</span>
            <button type="button" className={`${secondaryButton} !px-[10px] !py-[4px]`} onClick={() => zoomBy(1.25)}>
              +
            </button>
            <button type="button" className={`${secondaryButton} !px-[10px] !py-[4px]`} onClick={() => setZoom(fitZoom())}>
              Fit
            </button>
            <button type="button" className={`${secondaryButton} !px-[10px] !py-[4px]`} onClick={() => setZoom(1)}>
              100%
            </button>
          </div>
          <div className="flex gap-[4px] items-center">
            <span className="font-['Inter:Medium'] font-medium mr-[4px] text-[#3e3e3e] text-[13px]">View on</span>
            {(["checker", "white", "black"] as const).map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={backdrop === b}
                title={b === "checker" ? "Checkered (see-through)" : b}
                onClick={() => setBackdrop(b)}
                className={`border-2 cursor-pointer rounded-[6px] size-[26px] ${backdrops[b]} ${backdrop === b ? "border-[#00b6ca]" : "border-[#d4d4d4]"}`}
              />
            ))}
          </div>
          <div className="flex gap-[6px] ml-auto">
            <button type="button" className={`${secondaryButton} !py-[6px]`} disabled={!undo.current.length} onClick={() => step(undo.current, redo.current)} title="Undo (Ctrl+Z)">
              Undo
            </button>
            <button type="button" className={`${secondaryButton} !py-[6px]`} disabled={!redo.current.length} onClick={() => step(redo.current, undo.current)} title="Redo (Ctrl+Y)">
              Redo
            </button>
          </div>
        </div>

        <div ref={viewport} className={`flex-1 min-h-0 overflow-auto relative ${backdrops[backdrop]}`}>
          <div className="flex items-center justify-center min-h-full min-w-full p-[16px] w-max">
            <div className="relative">
              <canvas
                ref={canvas}
                onPointerDown={down}
                onPointerMove={move}
                onPointerUp={up}
                onPointerCancel={up}
                onPointerLeave={() => setCursor(null)}
                className="block shadow-[0_0_0_1px_rgba(0,0,0,0.12)] touch-none"
                style={{ width: (canvas.current?.width ?? 0) * zoom, height: (canvas.current?.height ?? 0) * zoom, cursor: cursorStyle, imageRendering: zoom > 2 ? "pixelated" : "auto" }}
              />
              {/* Brush outline that follows the mouse. */}
              {cursor && !panMode && tool !== "magic" && (
                <span
                  aria-hidden="true"
                  className="-translate-x-1/2 -translate-y-1/2 absolute border border-white pointer-events-none rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.6)]"
                  style={{ left: cursor.x * zoom, top: cursor.y * zoom, width: brush * zoom, height: brush * zoom }}
                />
              )}
            </div>
          </div>
          {!ready && !error && <p className="absolute font-['Inter:Medium'] font-medium inset-0 m-auto size-fit text-[#505050] text-[14px]">Loading…</p>}
        </div>

        <footer className="bg-white border-[#e6e6e6] border-t flex flex-wrap gap-[16px] items-center px-[16px] py-[12px]">
          <div className="bg-[#f5f5f5] border border-[#e3e3e3] flex h-[60px] items-center justify-center overflow-hidden rounded-[6px] shrink-0 w-[132px]" title="How it looks on the website">
            {preview && <img src={preview} alt="" className="block object-contain size-full" />}
          </div>
          <p className="flex-1 font-['Inter:Regular'] leading-[1.4] min-w-[200px] text-[#707070] text-[12px]">
            {error ? (
              <span className="text-[#e5484d]">{error}</span>
            ) : (
              <>
                Brush away leftover background with <b>Erase</b>, click a whole patch with <b>Magic erase</b>, and use <b>Restore</b> where part of the logo went missing. Switch the view to black or white to spot leftovers. Empty edges
                are trimmed when you save.
              </>
            )}
          </p>
          <div className="flex gap-[10px]">
            <button type="button" className={secondaryButton} onClick={close} disabled={saving}>
              Cancel
            </button>
            <button type="button" className={primaryButton} onClick={save} disabled={!ready || saving}>
              {saving ? "Saving…" : "Save logo"}
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
