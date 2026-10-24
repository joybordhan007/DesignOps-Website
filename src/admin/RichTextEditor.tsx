import { useEffect, useRef, useState, type ClipboardEvent, type ReactNode } from "react";
import sanitizeHtml from "@/lib/sanitizeHtml";
import { uploadFile } from "./api";
import { ImageIcon, LinkIcon } from "./icons";

// The text editor for formatted text (blog article sections): type directly,
// format with the toolbar, add pictures. What it stores is cleaned HTML (see
// src/lib/sanitizeHtml.ts), so pasting from Word or a website keeps the words
// and simple formatting but not their colours, fonts or scripts.

type Format = "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList";

const button = "cursor-pointer flex h-[32px] items-center justify-center min-w-[32px] px-[8px] rounded-[6px] text-[#3e3e3e] text-[14px] transition-colors hover:bg-[#eef9fb] hover:text-[#00a0b2] disabled:opacity-40";

function ToolButton({ label, active, onClick, children, disabled }: { label: string; active?: boolean; onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // Keep the text selection: act on mouse down, before the editor loses focus.
      onMouseDown={(e) => (e.preventDefault(), onClick())}
      className={`${button} ${active ? "bg-[#e9f9fb] text-[#00a0b2]" : ""}`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder = "Write here…" }: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const editor = useRef<HTMLDivElement>(null);
  const file = useRef<HTMLInputElement>(null);
  // The last HTML this editor reported; the box is only rewritten when the value changes from outside.
  const last = useRef<string | null>(null);
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [block, setBlock] = useState("p");
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editor.current && value !== last.current) {
      editor.current.innerHTML = value || "";
      last.current = value;
    }
  }, [value]);

  const emit = () => {
    if (!editor.current) return;
    const html = sanitizeHtml(editor.current.innerHTML);
    last.current = html;
    onChange(html);
  };

  // Toolbar buttons light up for the formatting under the cursor.
  useEffect(() => {
    const update = () => {
      const selection = document.getSelection();
      if (!editor.current || !selection?.anchorNode || !editor.current.contains(selection.anchorNode)) return;
      const states: Record<string, boolean> = {};
      for (const cmd of ["bold", "italic", "underline", "insertUnorderedList", "insertOrderedList"]) states[cmd] = document.queryCommandState(cmd);
      setActive(states);
      setBlock(String(document.queryCommandValue("formatBlock") || "p").toLowerCase());
    };
    document.addEventListener("selectionchange", update);
    return () => document.removeEventListener("selectionchange", update);
  }, []);

  const run = (command: string, arg?: string) => {
    editor.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  const format = (cmd: Format) => run(cmd);

  const link = () => {
    const selection = document.getSelection();
    if (!selection || selection.isCollapsed) return setError("Select the words to turn into a link first.");
    const url = window.prompt("Link address (https://…)", "https://");
    if (!url || url === "https://") return;
    if (!/^(https?:\/\/|mailto:|tel:|\/)/i.test(url.trim())) return setError("Links must start with https://, mailto:, tel: or /.");
    setError("");
    run("createLink", url.trim());
  };

  const addImage = async (picked?: File) => {
    if (!picked) return;
    if (!picked.type.startsWith("image/")) return setError("Please choose an image.");
    setError("");
    // Remember where the cursor was, since the upload takes a moment.
    const selection = document.getSelection();
    const range = selection && selection.rangeCount && editor.current?.contains(selection.anchorNode) ? selection.getRangeAt(0).cloneRange() : null;
    setUploading(0);
    try {
      const url = await uploadFile(picked, setUploading);
      editor.current?.focus();
      if (range) {
        selection?.removeAllRanges();
        selection?.addRange(range);
      } else if (editor.current) {
        // No cursor in the text: add the picture at the end.
        const end = document.createRange();
        end.selectNodeContents(editor.current);
        end.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(end);
      }
      run("insertImage", url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(null);
      if (file.current) file.current.value = "";
    }
  };

  const paste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const html = event.clipboardData.getData("text/html");
    const text = event.clipboardData.getData("text/plain");
    const clean = html ? sanitizeHtml(html) : text.split(/\n{2,}/).map((para) => `<p>${para.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")}</p>`).join("");
    document.execCommand("insertHTML", false, clean);
    emit();
  };

  return (
    <div className="bg-white border border-[#e3e3e3] focus-within:border-[#00b6ca] rounded-[6px] transition-colors">
      <div className="bg-[#fafafa] border-[#ececec] border-b flex flex-wrap gap-[2px] items-center p-[6px] rounded-t-[6px]">
        <select
          aria-label="Text style"
          className="bg-white border border-[#e3e3e3] cursor-pointer font-['Inter:Regular'] h-[32px] mr-[4px] outline-none px-[8px] rounded-[6px] text-[#3e3e3e] text-[13px]"
          value={["h3", "h4", "blockquote"].includes(block) ? block : "p"}
          onMouseDown={() => editor.current?.focus()}
          onChange={(e) => run("formatBlock", e.target.value.toUpperCase())}
        >
          <option value="p">Paragraph</option>
          <option value="h3">Heading</option>
          <option value="h4">Small heading</option>
          <option value="blockquote">Quote</option>
        </select>
        <ToolButton label="Bold (Ctrl+B)" active={active.bold} onClick={() => format("bold")}>
          <b>B</b>
        </ToolButton>
        <ToolButton label="Italic (Ctrl+I)" active={active.italic} onClick={() => format("italic")}>
          <i className="font-serif">I</i>
        </ToolButton>
        <ToolButton label="Underline (Ctrl+U)" active={active.underline} onClick={() => format("underline")}>
          <u>U</u>
        </ToolButton>
        <span className="bg-[#e3e3e3] h-[20px] mx-[4px] w-px" aria-hidden="true" />
        <ToolButton label="Bullet list" active={active.insertUnorderedList} onClick={() => format("insertUnorderedList")}>
          • List
        </ToolButton>
        <ToolButton label="Numbered list" active={active.insertOrderedList} onClick={() => format("insertOrderedList")}>
          1. List
        </ToolButton>
        <span className="bg-[#e3e3e3] h-[20px] mx-[4px] w-px" aria-hidden="true" />
        <ToolButton label="Add link (select words first)" onClick={link}>
          <LinkIcon size={16} />
        </ToolButton>
        <ToolButton label="Remove link" onClick={() => run("unlink")}>
          <span className="line-through text-[12px]">link</span>
        </ToolButton>
        <ToolButton label="Add a picture" disabled={uploading !== null} onClick={() => file.current?.click()}>
          <ImageIcon size={16} />
          {uploading !== null && <span className="ml-[4px] text-[12px]">{Math.round(uploading * 100)}%</span>}
        </ToolButton>
        <span className="bg-[#e3e3e3] h-[20px] mx-[4px] w-px" aria-hidden="true" />
        <ToolButton label="Clear formatting" onClick={() => (run("removeFormat"), run("formatBlock", "P"))}>
          <span className="text-[12px]">Clear</span>
        </ToolButton>
      </div>
      <div
        ref={editor}
        role="textbox"
        aria-multiline="true"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onFocus={() => document.execCommand("defaultParagraphSeparator", false, "p")}
        onInput={emit}
        onBlur={emit}
        onPaste={paste}
        className="empty:before:content-[attr(data-placeholder)] empty:before:text-[#a0a0a0] font-['Inter:Regular'] leading-[1.6] max-h-[560px] min-h-[160px] outline-none overflow-y-auto px-[14px] py-[12px] text-[#222] text-[15px] [&_a]:text-[#00a0b2] [&_a]:underline [&_blockquote]:border-[#00b6ca] [&_blockquote]:border-l-4 [&_blockquote]:italic [&_blockquote]:pl-[12px] [&_h3]:font-semibold [&_h3]:mt-[8px] [&_h3]:text-[18px] [&_h4]:font-semibold [&_h4]:text-[16px] [&_img]:inline-block [&_img]:max-h-[320px] [&_img]:my-[6px] [&_img]:rounded-[6px] [&_ol]:list-decimal [&_ol]:pl-[22px] [&_p]:mb-[8px] [&_ul]:list-disc [&_ul]:pl-[22px]"
      />
      <input ref={file} type="file" accept="image/*" hidden onChange={(e) => addImage(e.target.files?.[0])} />
      {error && <p className="border-[#ececec] border-t font-['Inter:Regular'] px-[14px] py-[8px] text-[#e5484d] text-[12px]">{error}</p>}
    </div>
  );
}
