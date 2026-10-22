import { useRef, useState, type ReactNode } from "react";
import { uploadFile } from "./api";
import { DownIcon, PlusIcon, TrashIcon, UpIcon, UploadIcon } from "./icons";

// Form fields for the admin editors. A form is described by a list of `Field`s
// whose `path` points into the item being edited (e.g. "detail.challenge.title").

/* eslint-disable @typescript-eslint/no-explicit-any */
type Value = any;

type Base = { label: string; hint?: string; required?: boolean; wide?: boolean };
export type Field =
  | (Base & { type: "text" | "url" | "date"; path: string; placeholder?: string })
  | (Base & { type: "textarea" | "rich"; path: string; rows?: number })
  | (Base & { type: "markdown"; path: string })
  | (Base & { type: "number"; path: string })
  | (Base & { type: "slug"; path: string; from: string })
  | (Base & { type: "lines"; path: string; rows?: number })
  | (Base & { type: "colors"; path: string })
  | (Base & { type: "toggle"; path: string })
  | (Base & { type: "image" | "video"; path: string })
  | (Base & { type: "group"; fields: Field[] })
  | (Base & { type: "objects"; path: string; fields: Field[]; newItem: () => Value; itemLabel: (item: Value, index: number) => string });

export function getPath(obj: Value, path: string): Value {
  return path.split(".").reduce((value, key) => (value == null ? undefined : value[key]), obj);
}

export function setPath<T>(obj: T, path: string, value: Value): T {
  const [key, ...rest] = path.split(".");
  const source = (obj ?? {}) as Record<string, Value>;
  const copy: Value = Array.isArray(source) ? [...source] : { ...source };
  copy[key] = rest.length ? setPath(source[key], rest.join("."), value) : value;
  return copy;
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** Fields marked `required` that are empty, as human labels. */
export function missingFields(fields: Field[], item: Value): string[] {
  return fields.flatMap((field) => {
    if (field.type === "group") return missingFields(field.fields, item);
    if (!field.required || field.type === "objects") return [];
    const value = getPath(item, field.path);
    return value === undefined || value === null || String(value).trim() === "" ? [field.label] : [];
  });
}

export const inputClass =
  "bg-[#fafafa] border border-[#e3e3e3] font-['Inter:Regular'] leading-[1.4] outline-none px-[12px] py-[10px] rounded-[6px] text-[#222] text-[14px] transition-colors w-full focus:bg-white focus:border-[#00b6ca]";
const smallButton =
  "border border-[#e3e3e3] cursor-pointer flex font-['Inter:Medium'] font-medium gap-[6px] items-center px-[12px] py-[8px] rounded-[6px] text-[#3e3e3e] text-[13px] transition-colors hover:border-[#00b6ca] hover:text-[#00b6ca] disabled:opacity-50";

function Label({ field, children }: { field: Base; children: ReactNode }) {
  return (
    <label className={`flex flex-col gap-[6px] ${field.wide ? "col-span-full" : ""}`}>
      <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">
        {field.label}
        {field.required && <span className="text-[#e5484d]"> *</span>}
      </span>
      {children}
      {field.hint && <span className="font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]">{field.hint}</span>}
    </label>
  );
}

function MediaField({ field, value, onChange }: { field: Base & { type: "image" | "video" }; value: string; onChange: (v: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const isVideo = field.type === "video";

  const pick = async (file?: File) => {
    if (!file) return;
    setError("");
    setProgress(0);
    try {
      onChange(await uploadFile(file, setProgress));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setProgress(null);
      if (input.current) input.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col gap-[6px] ${field.wide ? "col-span-full" : ""}`}>
      <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">
        {field.label}
        {field.required && <span className="text-[#e5484d]"> *</span>}
      </span>
      <div className="flex gap-[12px] items-start">
        <div className="bg-[repeating-conic-gradient(#eee_0_25%,#fff_0_50%)] bg-[length:16px_16px] border border-[#e3e3e3] flex h-[84px] items-center justify-center overflow-hidden rounded-[6px] shrink-0 w-[120px]">
          {value ? (
            isVideo ? (
              <video src={value} className="block object-cover size-full" muted />
            ) : (
              <img src={value} alt="" className="block max-h-full max-w-full object-contain" />
            )
          ) : (
            <span className="font-['Inter:Regular'] text-[#9a9a9a] text-[12px]">No {isVideo ? "video" : "image"}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-[8px] min-w-0">
          <div className="flex flex-wrap gap-[8px]">
            <button type="button" className={smallButton} onClick={() => input.current?.click()} disabled={progress !== null}>
              <UploadIcon size={16} />
              {progress !== null ? `Uploading ${Math.round(progress * 100)}%` : `Upload ${isVideo ? "video" : "image"}`}
            </button>
            {value && (
              <button type="button" className={smallButton} onClick={() => onChange("")}>
                Remove
              </button>
            )}
          </div>
          <input className={inputClass} value={value ?? ""} placeholder="…or paste a URL" onChange={(e) => onChange(e.target.value)} />
          {progress !== null && (
            <div className="bg-[#eee] h-[4px] overflow-hidden rounded-full">
              <div className="bg-[#00b6ca] h-full transition-[width]" style={{ width: `${progress * 100}%` }} />
            </div>
          )}
          {error && <span className="font-['Inter:Regular'] text-[#e5484d] text-[12px]">{error}</span>}
          {field.hint && <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">{field.hint}</span>}
        </div>
      </div>
      <input ref={input} type="file" hidden accept={isVideo ? "video/mp4,video/webm" : "image/*"} onChange={(e) => pick(e.target.files?.[0])} />
    </div>
  );
}

function MarkdownField({ field, value, onChange }: { field: Base; value: string; onChange: (v: string) => void }) {
  const area = useRef<HTMLTextAreaElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const insert = (text: string) => {
    const el = area.current;
    const at = el ? el.selectionStart : value.length;
    onChange(`${value.slice(0, at)}${text}${value.slice(at)}`);
  };
  const addImage = async (picked?: File) => {
    if (!picked) return;
    setBusy(true);
    try {
      insert(`\n\n![](${await uploadFile(picked)})\n\n`);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setBusy(false);
      if (file.current) file.current.value = "";
    }
  };

  return (
    <div className="col-span-full flex flex-col gap-[6px]">
      <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">{field.label}</span>
      <div className="flex flex-wrap gap-[8px]">
        <button type="button" className={smallButton} onClick={() => insert("\n\n## Heading\n\n")}>
          + Heading
        </button>
        <button type="button" className={smallButton} onClick={() => insert("\n\n### Sub-heading\n\n")}>
          + Sub-heading
        </button>
        <button type="button" className={smallButton} onClick={() => insert("\n\n- List item\n- List item\n\n")}>
          + List
        </button>
        <button type="button" className={smallButton} onClick={() => file.current?.click()} disabled={busy}>
          <UploadIcon size={16} />
          {busy ? "Uploading…" : "Insert image"}
        </button>
      </div>
      <textarea ref={area} className={`${inputClass} font-mono min-h-[420px] text-[13px]`} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      <span className="font-['Inter:Regular'] leading-[1.5] text-[#8a8a8a] text-[12px]">
        Leave an empty line between paragraphs. <code>## </code> starts a heading (shown in the table of contents), <code>### </code> a sub-heading, <code>- </code> a bullet.
      </span>
      <input ref={file} type="file" hidden accept="image/*" onChange={(e) => addImage(e.target.files?.[0])} />
    </div>
  );
}

function ColorsField({ field, value, onChange }: { field: Base; value: string[]; onChange: (v: string[]) => void }) {
  const colors = value ?? [];
  return (
    <div className="col-span-full flex flex-col gap-[6px]">
      <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">{field.label}</span>
      <div className="flex flex-wrap gap-[10px]">
        {colors.map((color, i) => (
          <div key={i} className="border border-[#e3e3e3] flex gap-[6px] items-center p-[6px] rounded-[6px]">
            <input type="color" className="cursor-pointer h-[32px] w-[40px]" value={/^#[0-9a-f]{6}$/i.test(color) ? color : "#000000"} onChange={(e) => onChange(colors.map((c, j) => (j === i ? e.target.value.toUpperCase() : c)))} />
            <input className={`${inputClass} !py-[6px] w-[96px]`} value={color} onChange={(e) => onChange(colors.map((c, j) => (j === i ? e.target.value : c)))} />
            <button type="button" aria-label="Remove colour" className="cursor-pointer p-[4px] text-[#9a9a9a] hover:text-[#e5484d]" onClick={() => onChange(colors.filter((_, j) => j !== i))}>
              <TrashIcon size={16} />
            </button>
          </div>
        ))}
        <button type="button" className={smallButton} onClick={() => onChange([...colors, "#00B6CA"])}>
          <PlusIcon size={16} /> Add colour
        </button>
      </div>
    </div>
  );
}

function ObjectsField({ field, value, onChange }: { field: Extract<Field, { type: "objects" }>; value: Value[]; onChange: (v: Value[]) => void }) {
  const items = value ?? [];
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div className="col-span-full flex flex-col gap-[10px]">
      <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">{field.label}</span>
      {items.map((item, i) => (
        <div key={i} className="border border-[#ececec] rounded-[8px]">
          <div className="bg-[#fafafa] border-[#ececec] border-b flex items-center justify-between px-[12px] py-[8px] rounded-t-[8px]">
            <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px] truncate">{field.itemLabel(item, i) || `Item ${i + 1}`}</span>
            <div className="flex gap-[2px] text-[#8a8a8a]">
              <button type="button" aria-label="Move up" disabled={i === 0} className="cursor-pointer p-[4px] disabled:opacity-30 hover:text-[#00b6ca]" onClick={() => move(i, -1)}>
                <UpIcon size={16} />
              </button>
              <button type="button" aria-label="Move down" disabled={i === items.length - 1} className="cursor-pointer p-[4px] disabled:opacity-30 hover:text-[#00b6ca]" onClick={() => move(i, 1)}>
                <DownIcon size={16} />
              </button>
              <button type="button" aria-label="Remove" className="cursor-pointer p-[4px] hover:text-[#e5484d]" onClick={() => onChange(items.filter((_, j) => j !== i))}>
                <TrashIcon size={16} />
              </button>
            </div>
          </div>
          <div className="gap-[14px] grid grid-cols-1 p-[12px] md:grid-cols-2">
            <Fields fields={field.fields} value={item} onChange={(next) => onChange(items.map((it, j) => (j === i ? next : it)))} />
          </div>
        </div>
      ))}
      <button type="button" className={`${smallButton} self-start`} onClick={() => onChange([...items, field.newItem()])}>
        <PlusIcon size={16} /> Add
      </button>
    </div>
  );
}

/** Renders a list of fields bound to `value` (the item being edited). */
export function Fields({ fields, value, onChange }: { fields: Field[]; value: Value; onChange: (next: Value) => void }) {
  return (
    <>
      {fields.map((field, index) => {
        if (field.type === "group") {
          return (
            <fieldset key={index} className="border-[#ececec] border-t col-span-full gap-[14px] grid grid-cols-1 pt-[16px] md:grid-cols-2">
              <legend className="font-['Inter:Semi_Bold'] font-semibold pr-[8px] text-[#222] text-[14px]">{field.label}</legend>
              {field.hint && <p className="col-span-full font-['Inter:Regular'] -mt-[6px] text-[#8a8a8a] text-[12px]">{field.hint}</p>}
              <Fields fields={field.fields} value={value} onChange={onChange} />
            </fieldset>
          );
        }
        const current = getPath(value, field.path);
        const set = (next: Value) => onChange(setPath(value, field.path, next));
        switch (field.type) {
          case "image":
          case "video":
            return <MediaField key={field.path} field={field} value={current ?? ""} onChange={set} />;
          case "markdown":
            return <MarkdownField key={field.path} field={field} value={current ?? ""} onChange={set} />;
          case "colors":
            return <ColorsField key={field.path} field={field} value={current} onChange={set} />;
          case "objects":
            return <ObjectsField key={field.path} field={field} value={current} onChange={set} />;
          case "toggle":
            return (
              <label key={field.path} className="cursor-pointer flex gap-[10px] items-center self-end py-[10px]">
                <input type="checkbox" className="accent-[#00b6ca] size-[18px]" checked={Boolean(current)} onChange={(e) => set(e.target.checked)} />
                <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[14px]">{field.label}</span>
              </label>
            );
          case "textarea":
          case "rich":
            return (
              <Label key={field.path} field={{ ...field, wide: field.wide ?? true, hint: field.hint ?? (field.type === "rich" ? "Wrap words in *stars* to highlight them. Press Enter for a line break (desktop only)." : undefined) }}>
                <textarea className={inputClass} rows={field.rows ?? 3} value={current ?? ""} onChange={(e) => set(e.target.value)} />
              </Label>
            );
          case "lines":
            return (
              <Label key={field.path} field={{ ...field, wide: field.wide ?? true, hint: field.hint ?? "One per line." }}>
                <textarea className={inputClass} rows={field.rows ?? 4} value={(current ?? []).join("\n")} onChange={(e) => set(e.target.value.split("\n"))} onBlur={(e) => set(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean))} />
              </Label>
            );
          case "number":
            return (
              <Label key={field.path} field={field}>
                <input type="number" className={inputClass} value={current ?? 0} onChange={(e) => set(Number(e.target.value))} />
              </Label>
            );
          case "slug":
            return (
              <Label key={field.path} field={{ ...field, hint: field.hint ?? "Used in the page address. Lowercase letters, numbers and dashes." }}>
                <div className="flex gap-[8px]">
                  <input className={inputClass} value={current ?? ""} onChange={(e) => set(e.target.value)} onBlur={(e) => set(slugify(e.target.value))} />
                  <button type="button" className={`${smallButton} shrink-0`} onClick={() => set(slugify(String(getPath(value, field.from) ?? "")))}>
                    From title
                  </button>
                </div>
              </Label>
            );
          default:
            return (
              <Label key={field.path} field={field}>
                <input type={field.type === "date" ? "date" : field.type === "url" ? "url" : "text"} className={inputClass} placeholder={"placeholder" in field ? field.placeholder : undefined} value={current ?? ""} onChange={(e) => set(e.target.value)} />
              </Label>
            );
        }
      })}
    </>
  );
}
