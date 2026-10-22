import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Fields, missingFields, newId, type Field } from "./fields";
import { DownIcon, ExternalIcon, PlusIcon, SearchIcon, TrashIcon, UpIcon } from "./icons";

// Editors shared by the admin pages: a list editor for collections (services,
// projects, posts…) and a form editor for single settings objects. Both keep a
// local draft and only write to the server when "Save changes" is pressed.

/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------------------------------------------------------------- unsaved changes

// Editors with unsaved edits (a page can show more than one editor).
const dirtyEditors = new Set<symbol>();
export const confirmLeave = () => !dirtyEditors.size || window.confirm("You have unsaved changes. Leave without saving?");

export function useDirtyFlag(isDirty: boolean) {
  const [key] = useState(() => Symbol("editor"));
  useEffect(() => {
    if (isDirty) dirtyEditors.add(key);
    else dirtyEditors.delete(key);
    return () => {
      dirtyEditors.delete(key);
    };
  }, [isDirty, key]);
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", (event) => {
    if (dirtyEditors.size) event.preventDefault();
  });
}

// ---------------------------------------------------------------- toast

type Toast = { text: string; error?: boolean } | null;
let showToast: (toast: Toast) => void = () => {};
export const toast = (text: string, error = false) => showToast({ text, error });

export function ToastHost() {
  const [current, setCurrent] = useState<Toast>(null);
  useEffect(() => {
    showToast = setCurrent;
  }, []);
  useEffect(() => {
    if (!current) return;
    const timer = setTimeout(() => setCurrent(null), current.error ? 6000 : 3000);
    return () => clearTimeout(timer);
  }, [current]);
  if (!current) return null;
  return (
    <div role="status" className={`bottom-[24px] fixed font-['Inter:Medium'] font-medium px-[18px] py-[12px] right-[24px] rounded-[8px] shadow-[0px_8px_24px_rgba(0,0,0,0.18)] text-[14px] text-white z-[100] ${current.error ? "bg-[#d93a3f]" : "bg-[#191919]"}`}>
      {current.text}
    </div>
  );
}

// ---------------------------------------------------------------- shared bits

export function PageHeader({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-[16px] items-end justify-between">
      <div className="flex flex-col gap-[4px]">
        <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#191919] text-[24px]">{title}</h1>
        {description && <p className="font-['Inter:Regular'] leading-[1.4] max-w-[720px] text-[#707070] text-[14px]">{description}</p>}
      </div>
      <div className="flex flex-wrap gap-[10px]">{children}</div>
    </div>
  );
}

export const primaryButton =
  "bg-[#00b6ca] cursor-pointer flex font-['Inter:Semi_Bold'] font-semibold gap-[8px] items-center px-[18px] py-[10px] rounded-[6px] text-[14px] text-white transition-colors hover:bg-[#009fb0] disabled:cursor-not-allowed disabled:opacity-40";
export const secondaryButton =
  "bg-white border border-[#e3e3e3] cursor-pointer flex font-['Inter:Medium'] font-medium gap-[8px] items-center px-[16px] py-[10px] rounded-[6px] text-[#3e3e3e] text-[14px] transition-colors hover:border-[#00b6ca] hover:text-[#00b6ca] disabled:cursor-not-allowed disabled:opacity-40";
export const card = "bg-white rounded-[8px] shadow-[0px_1px_4px_rgba(0,0,0,0.06)]";

export function SaveButtons({ isDirty, saving, onSave, onDiscard }: { isDirty: boolean; saving: boolean; onSave: () => void; onDiscard: () => void }) {
  return (
    <>
      {isDirty && (
        <button type="button" className={secondaryButton} onClick={onDiscard} disabled={saving}>
          Discard
        </button>
      )}
      <button type="button" className={primaryButton} onClick={onSave} disabled={!isDirty || saving}>
        {saving ? "Saving…" : isDirty ? "Save changes" : "Saved"}
      </button>
    </>
  );
}

export const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

// ---------------------------------------------------------------- collection editor

export type CollectionConfig<T extends { id: string }> = {
  title: string;
  description?: string;
  singular: string;
  fields: Field[];
  newItem: () => T;
  itemTitle: (item: T) => string;
  itemSubtitle?: (item: T) => string;
  itemImage?: (item: T) => string | undefined;
  viewUrl?: (item: T) => string;
  /** Extra checks across the whole list; return an error message or null. */
  validate?: (items: T[]) => string | null;
};

export function CollectionEditor<T extends { id: string }>({
  config,
  items,
  onSave,
  focusId,
}: {
  config: CollectionConfig<T>;
  items: T[];
  onSave: (items: T[]) => Promise<unknown>;
  focusId?: string;
}) {
  const [draft, setDraft] = useState<T[]>(items);
  const [selectedId, setSelectedId] = useState<string | undefined>(focusId ?? items[0]?.id);
  const [query, setQuery] = useState("");
  const [saving, setSaving] = useState(false);
  const isDirty = !same(draft, items);
  useDirtyFlag(isDirty);

  useEffect(() => {
    if (focusId) setSelectedId(focusId);
  }, [focusId]);

  const selectedIndex = draft.findIndex((item) => item.id === selectedId);
  const selected = draft[selectedIndex];
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return draft.map((item, index) => ({ item, index })).filter(({ item }) => !q || `${config.itemTitle(item)} ${config.itemSubtitle?.(item) ?? ""}`.toLowerCase().includes(q));
  }, [draft, query, config]);

  const update = (next: T) => setDraft(draft.map((item) => (item.id === next.id ? next : item)));
  const move = (index: number, delta: number) => {
    const next = [...draft];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    setDraft(next);
  };
  const add = () => {
    const item = config.newItem();
    setDraft([...draft, item]);
    setSelectedId(item.id);
  };
  const duplicate = () => {
    if (!selected) return;
    const copy = { ...structuredClone(selected), id: newId(config.singular.toLowerCase()) } as T;
    if ("slug" in copy) (copy as any).slug = `${(copy as any).slug}-copy`;
    const next = [...draft];
    next.splice(selectedIndex + 1, 0, copy);
    setDraft(next);
    setSelectedId(copy.id);
  };
  const remove = () => {
    if (!selected || !window.confirm(`Delete “${config.itemTitle(selected) || config.singular}”? This can't be undone after you save.`)) return;
    const next = draft.filter((item) => item.id !== selected.id);
    setDraft(next);
    setSelectedId(next[Math.min(selectedIndex, next.length - 1)]?.id);
  };
  const save = async () => {
    for (const item of draft) {
      const missing = missingFields(config.fields, item);
      if (missing.length) {
        setSelectedId(item.id);
        return toast(`“${config.itemTitle(item) || config.singular}” is missing: ${missing.join(", ")}`, true);
      }
    }
    if (draft.some((item) => "slug" in item)) {
      const slugs = draft.map((item) => (item as any).slug as string);
      const dupe = slugs.find((slug, i) => slugs.indexOf(slug) !== i);
      if (dupe) return toast(`Two ${config.title.toLowerCase()} use the same page address “${dupe}”. Change one of them.`, true);
    }
    const problem = config.validate?.(draft);
    if (problem) return toast(problem, true);
    setSaving(true);
    try {
      await onSave(draft);
      toast(`${config.title} saved. The website is updated.`);
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setSaving(false);
    }
  };

  // Keep the draft in sync when the saved data changes (e.g. after saving).
  useEffect(() => {
    setDraft((current) => (same(current, items) ? current : isDirty ? current : items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeader title={config.title} description={config.description}>
        <button type="button" className={secondaryButton} onClick={add}>
          <PlusIcon size={18} /> Add {config.singular.toLowerCase()}
        </button>
        <SaveButtons isDirty={isDirty} saving={saving} onSave={save} onDiscard={() => setDraft(items)} />
      </PageHeader>

      <div className="gap-[20px] grid grid-cols-1 items-start lg:grid-cols-[320px_1fr]">
        <div className={`${card} flex flex-col lg:max-h-[calc(100vh-220px)] lg:sticky lg:top-[112px]`}>
          <div className="border-[#f0f0f0] border-b flex gap-[8px] items-center px-[14px] py-[10px]">
            <SearchIcon size={16} className="shrink-0 text-[#9a9a9a]" />
            <input className="bg-transparent font-['Inter:Regular'] outline-none text-[14px] w-full" placeholder={`Search ${config.title.toLowerCase()}…`} value={query} onChange={(e) => setQuery(e.target.value)} />
            <span className="font-['Inter:Medium'] font-medium shrink-0 text-[#9a9a9a] text-[12px]">{draft.length}</span>
          </div>
          <ul className="flex flex-col overflow-y-auto p-[8px]">
            {visible.map(({ item, index }) => {
              const image = config.itemImage?.(item);
              const active = item.id === selectedId;
              return (
                <li key={item.id}>
                  <div
                    className={`border-l-[3px] cursor-pointer flex gap-[10px] group items-center px-[10px] py-[8px] rounded-[6px] ${active ? "bg-[#e9f9fb] border-[#00b6ca]" : "border-transparent hover:bg-[#f6f6f6]"}`}
                    onClick={() => setSelectedId(item.id)}
                  >
                    {config.itemImage && (
                      <span className="bg-[#f0f0f0] flex h-[40px] items-center justify-center overflow-hidden rounded-[4px] shrink-0 w-[52px]">
                        {image && <img src={image} alt="" className="block max-h-full max-w-full object-cover" />}
                      </span>
                    )}
                    <span className="flex flex-1 flex-col min-w-0">
                      <span className="font-['Inter:Medium'] font-medium text-[#222] text-[14px] truncate">{config.itemTitle(item) || `Untitled ${config.singular.toLowerCase()}`}</span>
                      {config.itemSubtitle && <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px] truncate">{config.itemSubtitle(item)}</span>}
                    </span>
                    {!query && (
                      <span className="flex flex-col opacity-0 text-[#8a8a8a] group-hover:opacity-100">
                        <button type="button" aria-label="Move up" disabled={index === 0} className="cursor-pointer disabled:opacity-30 hover:text-[#00b6ca]" onClick={(e) => (e.stopPropagation(), move(index, -1))}>
                          <UpIcon size={16} />
                        </button>
                        <button type="button" aria-label="Move down" disabled={index === draft.length - 1} className="cursor-pointer disabled:opacity-30 hover:text-[#00b6ca]" onClick={(e) => (e.stopPropagation(), move(index, 1))}>
                          <DownIcon size={16} />
                        </button>
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
            {!visible.length && <li className="font-['Inter:Regular'] p-[16px] text-center text-[#9a9a9a] text-[14px]">Nothing here yet.</li>}
          </ul>
        </div>

        <div className={`${card} p-[20px]`}>
          {selected ? (
            <div className="flex flex-col gap-[18px]">
              <div className="border-[#f0f0f0] border-b flex flex-wrap gap-[10px] items-center justify-between pb-[14px]">
                <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]">{config.itemTitle(selected) || `New ${config.singular.toLowerCase()}`}</h2>
                <div className="flex gap-[8px]">
                  {config.viewUrl && !isDirty && (
                    <a className={secondaryButton} href={config.viewUrl(selected)} target="_blank" rel="noreferrer">
                      <ExternalIcon size={16} /> View
                    </a>
                  )}
                  <button type="button" className={secondaryButton} onClick={duplicate}>
                    Duplicate
                  </button>
                  <button type="button" className={`${secondaryButton} hover:!border-[#e5484d] hover:!text-[#e5484d]`} onClick={remove}>
                    <TrashIcon size={16} /> Delete
                  </button>
                </div>
              </div>
              <div className="gap-[16px] grid grid-cols-1 md:grid-cols-2">
                <Fields fields={config.fields} value={selected} onChange={update} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[12px] items-center py-[60px] text-center">
              <p className="font-['Inter:Regular'] text-[#707070] text-[15px]">No {config.title.toLowerCase()} yet.</p>
              <button type="button" className={primaryButton} onClick={add}>
                <PlusIcon size={18} /> Add {config.singular.toLowerCase()}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- object editor

export function ObjectEditor<T>({
  title,
  description,
  value,
  fields,
  onSave,
  embedded = false,
}: {
  title: string;
  description?: string;
  value: T;
  fields: Field[];
  onSave: (value: T) => Promise<unknown>;
  /** Render as a card inside another page instead of a full page. */
  embedded?: boolean;
}) {
  const [draft, setDraft] = useState<T>(value);
  const [saving, setSaving] = useState(false);
  const isDirty = !same(draft, value);
  useDirtyFlag(isDirty);

  useEffect(() => {
    if (!isDirty) setDraft(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const save = async () => {
    const missing = missingFields(fields, draft);
    if (missing.length) return toast(`Please fill in: ${missing.join(", ")}`, true);
    setSaving(true);
    try {
      await onSave(draft);
      toast(`${title} saved. The website is updated.`);
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setSaving(false);
    }
  };

  const form = (
    <div className={`${card} gap-[16px] grid grid-cols-1 p-[20px] md:grid-cols-2`}>
      <Fields fields={fields} value={draft} onChange={setDraft} />
    </div>
  );

  if (embedded) {
    return (
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-wrap gap-[10px] items-center justify-between">
          <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]">{title}</h2>
          <div className="flex gap-[10px]">
            <SaveButtons isDirty={isDirty} saving={saving} onSave={save} onDiscard={() => setDraft(value)} />
          </div>
        </div>
        {description && <p className="font-['Inter:Regular'] -mt-[6px] text-[#707070] text-[14px]">{description}</p>}
        {form}
        {/* Long forms: keep Save in reach while there are changes. */}
        {isDirty && (
          <div className="bg-[#191919] bottom-[16px] flex flex-wrap gap-[10px] items-center justify-between px-[16px] py-[10px] rounded-[8px] shadow-[0px_8px_24px_rgba(0,0,0,0.2)] sticky z-[20]">
            <span className="font-['Inter:Medium'] font-medium text-[14px] text-white">You have unsaved changes</span>
            <div className="flex gap-[8px]">
              <SaveButtons isDirty={isDirty} saving={saving} onSave={save} onDiscard={() => setDraft(value)} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeader title={title} description={description}>
        <SaveButtons isDirty={isDirty} saving={saving} onSave={save} onDiscard={() => setDraft(value)} />
      </PageHeader>
      {form}
    </div>
  );
}
