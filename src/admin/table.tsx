import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { createPortal } from "react-dom";
import { formatDate } from "@/content/helpers";
import type { Listed } from "@/content/types";
import { card, PageHeader, primaryButton, same, SaveButtons, secondaryButton, toast, useDirtyFlag } from "./editor";
import { Fields, missingFields, Switch, type Field } from "./fields";
import { BackIcon, DownIcon, EditIcon, ExternalIcon, MoreIcon, PlusIcon, SearchIcon, TrashIcon, UpIcon } from "./icons";

// List pages for services, work and blog: a table of every item (status
// switch and a ⋯ menu per row), and a details editor opened by clicking a row
// (/admin/<section>?item=<id>). Table actions save straight away; the details
// editor keeps a draft until "Save changes".

type Item = Listed & { id: string; slug: string; title: string };

export type ListConfig<T extends Item> = {
  title: string;
  singular: string;
  description?: string;
  /** e.g. "/admin/services" */
  basePath: string;
  /** Visibility settings shown above the form, next to the Active switch. */
  settings?: Field[];
  /** The details form, in the same order as the sections of the page design. */
  fields: Field[];
  /** A new, inactive item with a placeholder title. */
  newItem: () => T;
  summary: (item: T) => string;
  image?: (item: T) => string;
  /** Small line under the name in the table. */
  meta?: (item: T) => string;
  viewUrl: (item: T) => string;
};

const cell = "font-['Inter:Regular'] px-[16px] py-[14px] text-[#3e3e3e] text-[14px]";
const headCell = "font-['Inter:Semi_Bold'] font-semibold px-[16px] py-[12px] text-[#707070] text-[12px] text-left uppercase tracking-[0.4px] whitespace-nowrap";

export const today = () => new Date().toISOString().slice(0, 10);

export default function ListPage<T extends Item>({
  config,
  items,
  onSave,
  focusId,
  navigate,
}: {
  config: ListConfig<T>;
  items: T[];
  onSave: (items: T[]) => Promise<unknown>;
  focusId?: string;
  navigate: (to: string) => void;
}) {
  const editing = focusId ? items.find((item) => item.id === focusId) : undefined;
  if (editing) return <ItemEditor key={editing.id} config={config} item={editing} items={items} onSave={onSave} navigate={navigate} />;
  return <ItemTable config={config} items={items} onSave={onSave} navigate={navigate} />;
}

// ---------------------------------------------------------------- table

function ItemTable<T extends Item>({ config, items, onSave, navigate }: { config: ListConfig<T>; items: T[]; onSave: (items: T[]) => Promise<unknown>; navigate: (to: string) => void }) {
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const singular = config.singular.toLowerCase();
  const open = (item: T) => navigate(`${config.basePath}?item=${item.id}`);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.map((item, index) => ({ item, index })).filter(({ item }) => !q || `${item.id} ${item.title} ${config.summary(item)}`.toLowerCase().includes(q));
  }, [items, query, config]);

  const saveList = async (next: T[], done: string) => {
    setBusy(true);
    try {
      await onSave(next);
      toast(done);
      return true;
    } catch (e) {
      toast((e as Error).message, true);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const add = async () => {
    const item = config.newItem();
    if (await saveList([...items, item], `New ${singular} created. Add its details, then switch it on.`)) open(item);
  };
  const setActive = (item: T, active: boolean) =>
    saveList(
      items.map((other) => (other.id === item.id ? { ...other, active } : other)),
      `“${item.title}” is ${active ? "now shown on" : "hidden from"} the website.`,
    );
  const move = (index: number, delta: number) => {
    const next = [...items];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    saveList(next, "Order saved.");
  };
  const remove = (item: T) => {
    if (!window.confirm(`Delete “${item.title || config.singular}”? This can't be undone.`)) return;
    saveList(
      items.filter((other) => other.id !== item.id),
      `“${item.title}” deleted.`,
    );
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeader title={config.title} description={config.description}>
        <button type="button" className={primaryButton} onClick={add} disabled={busy}>
          <PlusIcon size={18} /> Add {singular}
        </button>
      </PageHeader>

      <div className={`${card} flex flex-col`}>
        <div className="border-[#f0f0f0] border-b flex gap-[8px] items-center px-[16px] py-[12px]">
          <SearchIcon size={16} className="shrink-0 text-[#9a9a9a]" />
          <input className="bg-transparent font-['Inter:Regular'] outline-none text-[14px] w-full" placeholder={`Search ${config.title.toLowerCase()}…`} value={query} onChange={(e) => setQuery(e.target.value)} />
          <span className="font-['Inter:Medium'] font-medium shrink-0 text-[#9a9a9a] text-[12px]">
            {items.filter((item) => item.active).length} active · {items.length} total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="border-collapse min-w-[960px] w-full">
            <thead>
              <tr className="bg-[#fafafa] border-[#f0f0f0] border-b">
                <th className={headCell}>{config.singular} ID</th>
                <th className={headCell}>{config.singular} name</th>
                <th className={headCell}>Short description</th>
                <th className={headCell}>Created</th>
                <th className={headCell}>Status</th>
                <th className={`${headCell} text-right`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(({ item, index }) => {
                const image = config.image?.(item);
                return (
                  <tr key={item.id} className="border-[#f3f3f3] border-b cursor-pointer last:border-b-0 hover:bg-[#f8fdfe]" onClick={() => open(item)}>
                    <td className={cell}>
                      <span className="bg-[#f2f2f2] font-mono px-[8px] py-[3px] rounded-[4px] text-[#505050] text-[12px] whitespace-nowrap">{item.id}</span>
                    </td>
                    <td className={`${cell} min-w-[220px]`}>
                      <span className="flex gap-[12px] items-center">
                        {config.image && (
                          <span className="bg-[#f0f0f0] flex h-[40px] items-center justify-center overflow-hidden rounded-[4px] shrink-0 w-[56px]">
                            {image && <img src={image} alt="" className="block object-cover size-full" />}
                          </span>
                        )}
                        <span className="flex flex-col min-w-0">
                          <span className="font-['Inter:Medium'] font-medium text-[#191919] text-[14px]">{item.title || `Untitled ${singular}`}</span>
                          {config.meta && <span className="text-[#8a8a8a] text-[12px]">{config.meta(item)}</span>}
                        </span>
                      </span>
                    </td>
                    <td className={`${cell} max-w-[420px]`}>
                      <span className="line-clamp-2 text-[#606060]">{config.summary(item) || <span className="text-[#b0b0b0]">No description yet</span>}</span>
                    </td>
                    <td className={`${cell} whitespace-nowrap`}>{item.createdAt ? formatDate(item.createdAt) : "—"}</td>
                    <td className={cell} onClick={(e) => e.stopPropagation()}>
                      <span className="flex gap-[10px] items-center">
                        <Switch checked={item.active} onChange={(active) => setActive(item, active)} label={`${item.title}: ${item.active ? "active" : "inactive"}`} disabled={busy} />
                        <span className={`font-['Inter:Medium'] font-medium text-[12px] ${item.active ? "text-[#0a8f4f]" : "text-[#9a9a9a]"}`}>{item.active ? "Active" : "Inactive"}</span>
                      </span>
                    </td>
                    <td className={`${cell} text-right`} onClick={(e) => e.stopPropagation()}>
                      <RowMenu
                        label={item.title}
                        actions={[
                          { label: "Edit", icon: EditIcon, run: () => open(item) },
                          ...(item.active ? [{ label: "View on website", icon: ExternalIcon, run: () => window.open(config.viewUrl(item), "_blank", "noopener") }] : []),
                          ...(!query && index > 0 ? [{ label: "Move up", icon: UpIcon, run: () => move(index, -1) }] : []),
                          ...(!query && index < items.length - 1 ? [{ label: "Move down", icon: DownIcon, run: () => move(index, 1) }] : []),
                          { label: "Delete", icon: TrashIcon, run: () => remove(item), danger: true },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!visible.length && (
          <div className="flex flex-col gap-[12px] items-center py-[48px] text-center">
            <p className="font-['Inter:Regular'] text-[#707070] text-[15px]">{query ? "No matches." : `No ${config.title.toLowerCase()} yet.`}</p>
            {!query && (
              <button type="button" className={primaryButton} onClick={add} disabled={busy}>
                <PlusIcon size={18} /> Add {singular}
              </button>
            )}
          </div>
        )}
      </div>
      <p className="font-['Inter:Regular'] text-[#8a8a8a] text-[13px]">The website lists {config.title.toLowerCase()} in this order. Use ⋯ → Move up / Move down to change it.</p>
    </div>
  );
}

type Action = { label: string; icon: ComponentType<{ size?: number }>; run: () => void; danger?: boolean };

/** ⋯ button with a small menu. The menu is fixed to the screen so the table's scroll area doesn't clip it. */
function RowMenu({ label, actions }: { label: string; actions: Action[] }) {
  const [at, setAt] = useState<{ top: number; right: number } | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!at) return;
    const close = (event: Event) => {
      if (event.type === "mousedown" && (menu.current?.contains(event.target as Node) || button.current?.contains(event.target as Node))) return;
      setAt(null);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setAt(null);
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [at]);

  const toggle = () => {
    if (at) return setAt(null);
    const rect = button.current!.getBoundingClientRect();
    // Open upwards when there is no room below.
    const height = actions.length * 38 + 12;
    const top = rect.bottom + 4 + height > window.innerHeight - 8 ? Math.max(8, rect.top - 4 - height) : rect.bottom + 4;
    setAt({ top, right: window.innerWidth - rect.right });
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-label={`Actions for ${label}`}
        aria-haspopup="menu"
        aria-expanded={Boolean(at)}
        className={`cursor-pointer inline-flex items-center justify-center rounded-[6px] size-[34px] text-[#505050] hover:bg-[#eef7f8] hover:text-[#00a0b2] ${at ? "bg-[#eef7f8] text-[#00a0b2]" : ""}`}
        onClick={toggle}
      >
        <MoreIcon size={20} />
      </button>
      {at &&
        createPortal(
          <div ref={menu} role="menu" className="bg-white fixed overflow-hidden py-[6px] rounded-[8px] shadow-[0px_8px_24px_rgba(0,0,0,0.16)] w-[190px] z-[80]" style={at}>
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  role="menuitem"
                  className={`cursor-pointer flex font-['Inter:Medium'] font-medium gap-[10px] items-center px-[14px] py-[9px] text-[14px] text-left w-full ${action.danger ? "text-[#d93a3f] hover:bg-[#fdf1f1]" : "text-[#222] hover:bg-[#f4fbfc]"}`}
                  onClick={() => (setAt(null), action.run())}
                >
                  <Icon size={16} /> {action.label}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </>
  );
}

// ---------------------------------------------------------------- details editor

function ItemEditor<T extends Item>({ config, item, items, onSave, navigate }: { config: ListConfig<T>; item: T; items: T[]; onSave: (items: T[]) => Promise<unknown>; navigate: (to: string) => void }) {
  const [draft, setDraft] = useState<T>(item);
  const [saving, setSaving] = useState(false);
  const [removed, setRemoved] = useState(false);
  const isDirty = !same(draft, item);
  useDirtyFlag(isDirty && !removed);

  // Pick up saved changes (e.g. after saving) unless there are edits in progress.
  useEffect(() => {
    if (!isDirty) setDraft(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const back = () => navigate(config.basePath);

  const save = async () => {
    const missing = missingFields(config.fields, draft);
    if (missing.length) return toast(`Please fill in: ${missing.join(", ")}`, true);
    if (items.some((other) => other.id !== draft.id && other.slug === draft.slug)) return toast(`Another ${config.singular.toLowerCase()} already uses the page address “${draft.slug}”. Change it.`, true);
    setSaving(true);
    try {
      await onSave(items.map((other) => (other.id === draft.id ? draft : other)));
      toast(`“${draft.title}” saved.${draft.active ? " The website is updated." : " It stays hidden until you make it active."}`);
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete “${item.title || config.singular}”? This can't be undone.`)) return;
    setRemoved(true);
    try {
      await onSave(items.filter((other) => other.id !== item.id));
      toast(`“${item.title}” deleted.`);
      navigate(config.basePath);
    } catch (e) {
      setRemoved(false);
      toast((e as Error).message, true);
    }
  };

  const settings: Field[] = [{ type: "toggle", path: "active", label: "Active", hint: "Off: hidden from the website, kept here." }, ...(config.settings ?? [])];

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-wrap gap-[16px] items-center justify-between">
        <div className="flex gap-[14px] items-center min-w-0">
          <button type="button" aria-label={`Back to ${config.title}`} className={`${secondaryButton} !px-[10px]`} onClick={back}>
            <BackIcon size={18} />
          </button>
          <div className="flex flex-col gap-[2px] min-w-0">
            <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[13px]">
              {config.title} / <span className="font-mono">{item.id}</span>
            </span>
            <h1 className="font-['Inter:Semi_Bold'] font-semibold leading-[1.2] text-[#191919] text-[24px] truncate">{draft.title || `Untitled ${config.singular.toLowerCase()}`}</h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-[10px]">
          {item.active && !isDirty && (
            <a className={secondaryButton} href={config.viewUrl(item)} target="_blank" rel="noreferrer">
              <ExternalIcon size={16} /> View on website
            </a>
          )}
          <button type="button" className={`${secondaryButton} hover:!border-[#e5484d] hover:!text-[#e5484d]`} onClick={remove} disabled={saving}>
            <TrashIcon size={16} /> Delete
          </button>
          <SaveButtons isDirty={isDirty} saving={saving} onSave={save} onDiscard={() => setDraft(item)} />
        </div>
      </div>

      <div className={`${card} gap-x-[32px] gap-y-[8px] grid grid-cols-1 p-[20px] md:grid-cols-2`}>
        <p className="col-span-full font-['Inter:Semi_Bold'] font-semibold text-[#222] text-[14px]">Visibility</p>
        <Fields fields={settings} value={draft} onChange={setDraft} />
      </div>

      <div className={`${card} flex flex-col gap-[16px] p-[20px]`}>
        <p className="font-['Inter:Regular'] text-[#707070] text-[13px]">Each section below fills one part of the page design, from top to bottom.</p>
        <div className="gap-[16px] grid grid-cols-1 md:grid-cols-2">
          <Fields fields={config.fields} value={draft} onChange={setDraft} />
        </div>
      </div>

      <div className="flex gap-[10px] justify-end">
        <SaveButtons isDirty={isDirty} saving={saving} onSave={save} onDiscard={() => setDraft(item)} />
      </div>
    </div>
  );
}
