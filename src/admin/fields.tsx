import { useRef, useState, type ReactNode } from "react";
import { uploadFile } from "./api";
import RichTextEditor from "./RichTextEditor";
import { CopyIcon, DownIcon, PlusIcon, TrashIcon, UpIcon, UploadIcon } from "./icons";

// Form fields for the admin editors. A form is described by a list of `Field`s
// whose `path` points into the item being edited (e.g. "detail.challenge.title").

/* eslint-disable @typescript-eslint/no-explicit-any */
type Value = any;

type Base = { label: string; hint?: string; required?: boolean; wide?: boolean };
export type Field =
  | (Base & { type: "text" | "url" | "date"; path: string; placeholder?: string })
  | (Base & { type: "textarea" | "rich"; path: string; rows?: number })
  | (Base & { type: "markdown"; path: string })
  /** Formatted text (bold, lists, links, images…) edited in place; stored as clean HTML. */
  | (Base & { type: "html"; path: string; placeholder?: string })
  | (Base & { type: "number"; path: string })
  | (Base & { type: "slug"; path: string; from: string })
  | (Base & { type: "lines"; path: string; rows?: number })
  | (Base & { type: "colors"; path: string })
  | (Base & { type: "toggle"; path: string })
  | (Base & { type: "choice"; path: string; options: { value: string; label: string; preview?: ReactNode }[] })
  | (Base & { type: "image" | "video"; path: string })
  | (Base & { type: "group"; fields: Field[]; /** Folded away until clicked (for long lists of small texts). */ collapsible?: boolean })
  /** A one-off editor written for one setting; it gets the value at `path` and a setter, plus the whole item. */
  | (Base & { type: "custom"; path: string; render: (value: Value, onChange: (next: Value) => void, item: Value, onItemChange: (next: Value) => void) => ReactNode })
  | (Base & {
      type: "objects";
      path: string;
      fields: Field[];
      newItem: () => Value;
      itemLabel: (item: Value, index: number) => string;
      /** Show each item as its own card (for repeatable page sections). */
      cards?: boolean;
      /** What one item is called, e.g. "Intro section" (cards) or "deliverable". */
      itemName?: string;
    });

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
    if (!field.required || field.type === "objects" || field.type === "custom") return [];
    const value = getPath(item, field.path);
    return value === undefined || value === null || String(value).trim() === "" ? [field.label] : [];
  });
}

export const inputClass =
  "bg-[#fafafa] border border-[#e3e3e3] font-['Inter:Regular'] leading-[1.4] outline-none px-[12px] py-[10px] rounded-[6px] text-[#222] text-[14px] transition-colors w-full focus:bg-white focus:border-[#00b6ca]";
export const smallButton =
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

/** On/off switch. */
export function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange: (next: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={(e) => (e.stopPropagation(), onChange(!checked))}
      className={`cursor-pointer h-[24px] relative rounded-full shrink-0 transition-colors w-[44px] disabled:cursor-wait disabled:opacity-60 ${checked ? "bg-[#00b6ca]" : "bg-[#d4d4d4]"}`}
    >
      <span className={`absolute bg-white left-[3px] rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.2)] size-[18px] top-[3px] transition-transform ${checked ? "translate-x-[20px]" : ""}`} />
    </button>
  );
}

function MediaField({ field, value, onChange }: { field: Base & { type: "image" | "video" }; value: string; onChange: (v: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const isVideo = field.type === "video";

  const pick = async (file?: File) => {
    if (!file) return;
    setError("");
    setProgress(0);
    try {
      setNote("");
      onChange(await uploadFile(file, setProgress, setNote));
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
          {note && <span className="font-['Inter:Regular'] text-[#1a7f45] text-[12px]">{note}</span>}
          {field.hint && <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">{field.hint}</span>}
          {!isVideo && <span className="font-['Inter:Regular'] text-[#9a9a9a] text-[11px]">Images over 10 MB are made smaller automatically and stay HD.</span>}
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

/** A copy of a list item with fresh ids (its own and its sub-items'), so the copy is independent. */
function duplicate(item: Value): Value {
  const copy = structuredClone(item);
  const renew = (value: Value) => {
    if (Array.isArray(value)) value.forEach(renew);
    else if (value && typeof value === "object") {
      if (typeof value.id === "string") value.id = newId(value.id.split("-")[0] || "item");
      Object.values(value).forEach(renew);
    }
  };
  renew(copy);
  return copy;
}

function ObjectsField({ field, value, onChange }: { field: Extract<Field, { type: "objects" }>; value: Value[]; onChange: (v: Value[]) => void }) {
  const items = value ?? [];
  const move = (i: number, d: number) => {
    const next = [...items];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  const add = () => onChange([...items, field.newItem()]);

  if (field.cards) {
    const name = field.itemName ?? "Section";
    const remove = (i: number) => window.confirm(`Delete ${name.toLowerCase()} ${i + 1}? Click Save afterwards to keep the change.`) && onChange(items.filter((_, j) => j !== i));
    const iconButton = "cursor-pointer p-[6px] rounded-[6px] disabled:opacity-30 hover:bg-[#f2f2f2] hover:text-[#00b6ca]";
    return (
      <div className="col-span-full flex flex-col gap-[16px]">
        <div className="flex flex-wrap gap-[12px] items-end justify-between">
          <div className="flex flex-col gap-[2px]">
            <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[16px]">
              {field.label} <span className="font-['Inter:Regular'] font-normal text-[#9a9a9a] text-[13px]">({items.length})</span>
            </h2>
            {field.hint && <p className="font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]">{field.hint}</p>}
          </div>
          <button type="button" className={smallButton} onClick={add}>
            <PlusIcon size={16} /> Add {name.toLowerCase()}
          </button>
        </div>
        {!items.length && (
          <button type="button" onClick={add} className="border-2 border-[#e3e3e3] border-dashed cursor-pointer font-['Inter:Regular'] p-[20px] rounded-[6px] text-[#8a8a8a] text-[14px] hover:border-[#9adfe7] hover:text-[#00a0b2]">
            No {name.toLowerCase()} yet, so this part of the page is hidden. Click to add one.
          </button>
        )}
        {items.map((item, i) => (
          <section key={item?.id ?? i} className="bg-white border border-[#e6e6e6] rounded-[6px]">
            <header className="border-[#efefef] border-b flex gap-[10px] items-center px-[16px] py-[10px]">
              <span className="bg-[#e9f9fb] font-['Inter:Semi_Bold'] font-semibold px-[8px] py-[2px] rounded-[6px] shrink-0 text-[#00a0b2] text-[12px]">
                {name} {i + 1}
              </span>
              <span className="font-['Inter:Medium'] font-medium min-w-0 text-[#3e3e3e] text-[14px] truncate">{field.itemLabel(item, i)}</span>
              <div className="flex gap-[2px] ml-auto shrink-0 text-[#8a8a8a]">
                <button type="button" title="Move up" aria-label="Move up" disabled={i === 0} className={iconButton} onClick={() => move(i, -1)}>
                  <UpIcon size={16} />
                </button>
                <button type="button" title="Move down" aria-label="Move down" disabled={i === items.length - 1} className={iconButton} onClick={() => move(i, 1)}>
                  <DownIcon size={16} />
                </button>
                <button type="button" title="Duplicate" aria-label="Duplicate" className={iconButton} onClick={() => onChange([...items.slice(0, i + 1), duplicate(item), ...items.slice(i + 1)])}>
                  <CopyIcon size={16} />
                </button>
                <button type="button" title="Delete" aria-label="Delete" className="cursor-pointer p-[6px] rounded-[6px] hover:bg-[#fdecec] hover:text-[#e5484d]" onClick={() => remove(i)}>
                  <TrashIcon size={16} />
                </button>
              </div>
            </header>
            <div className="gap-[16px] grid grid-cols-1 p-[16px] md:grid-cols-2">
              <Fields fields={field.fields} value={item} onChange={(next) => onChange(items.map((it, j) => (j === i ? next : it)))} />
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className="col-span-full flex flex-col gap-[10px]">
      <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">{field.label}</span>
      {items.map((item, i) => (
        <div key={i} className="border border-[#ececec] rounded-[6px]">
          <div className="bg-[#fafafa] border-[#ececec] border-b flex items-center justify-between px-[12px] py-[8px] rounded-t-[6px]">
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
      <button type="button" className={`${smallButton} self-start`} onClick={add}>
        <PlusIcon size={16} /> Add {field.itemName ?? ""}
      </button>
    </div>
  );
}

/** Renders a list of fields bound to `value` (the item being edited). */
export function Fields({ fields, value, onChange }: { fields: Field[]; value: Value; onChange: (next: Value) => void }) {
  return (
    <>
      {fields.map((field, index) => {
        if (field.type === "group" && field.collapsible) {
          return (
            <details key={index} className="border border-[#ececec] col-span-full group/fold rounded-[6px] open:bg-[#fcfcfc]">
              <summary className="cursor-pointer flex gap-[10px] items-center justify-between list-none px-[16px] py-[13px] rounded-[6px] select-none hover:bg-[#f7fbfc] [&::-webkit-details-marker]:hidden">
                <span className="flex flex-col gap-[2px]">
                  <span className="font-['Inter:Semi_Bold'] font-semibold text-[#222] text-[14px]">{field.label}</span>
                  {field.hint && <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">{field.hint}</span>}
                </span>
                <span className="shrink-0 text-[#9a9a9a] transition-transform group-open/fold:rotate-180">
                  <DownIcon size={18} />
                </span>
              </summary>
              <div className="border-[#ececec] border-t gap-[14px] grid grid-cols-1 p-[16px] md:grid-cols-2">
                <Fields fields={field.fields} value={value} onChange={onChange} />
              </div>
            </details>
          );
        }
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
          case "html":
            return (
              <div key={field.path} className="col-span-full flex flex-col gap-[6px]">
                <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">
                  {field.label}
                  {field.required && <span className="text-[#e5484d]"> *</span>}
                </span>
                <RichTextEditor value={current ?? ""} onChange={set} placeholder={field.placeholder} />
                {field.hint && <span className="font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]">{field.hint}</span>}
              </div>
            );
          case "colors":
            return <ColorsField key={field.path} field={field} value={current} onChange={set} />;
          case "objects":
            return <ObjectsField key={field.path} field={field} value={current} onChange={set} />;
          case "custom":
            return (
              <div key={field.path} className={`flex flex-col gap-[6px] ${field.wide === false ? "" : "col-span-full"}`}>
                <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">{field.label}</span>
                {field.render(current, set, value, onChange)}
                {field.hint && <span className="font-['Inter:Regular'] leading-[1.4] text-[#8a8a8a] text-[12px]">{field.hint}</span>}
              </div>
            );
          case "toggle":
            return (
              <div key={field.path} className={`flex gap-[12px] items-center self-end py-[10px] ${field.wide ? "col-span-full" : ""}`}>
                <Switch checked={Boolean(current)} onChange={set} label={field.label} />
                <span className="flex flex-col gap-[2px]">
                  <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[14px]">{field.label}</span>
                  {field.hint && <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">{field.hint}</span>}
                </span>
              </div>
            );
          case "choice":
            return (
              <div key={field.path} role="radiogroup" aria-label={field.label} className={`flex flex-col gap-[6px] ${field.wide ? "col-span-full" : ""}`}>
                <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">{field.label}</span>
                <div className="flex flex-wrap gap-[10px]">
                  {field.options.map((option) => {
                    const selected = current === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => set(option.value)}
                        className={`border-2 cursor-pointer flex flex-col gap-[8px] items-start p-[10px] rounded-[6px] transition-colors ${selected ? "bg-[#e9f9fb] border-[#00b6ca]" : "bg-white border-[#e3e3e3] hover:border-[#9adfe7]"}`}
                      >
                        {option.preview}
                        <span className={`font-['Inter:Medium'] font-medium text-[13px] ${selected ? "text-[#00a0b2]" : "text-[#3e3e3e]"}`}>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
                {field.hint && <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">{field.hint}</span>}
              </div>
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
