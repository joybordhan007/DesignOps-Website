import { useEffect, useState } from "react";
import type { Message } from "@/content/types";
import type { PageProps } from "../AdminApp";
import { api } from "../api";
import { card, PageHeader, secondaryButton, toast } from "../editor";
import { MailIcon, TrashIcon } from "../icons";

// Messages sent through the contact form. (The contact details shown on the
// website are edited in Website Settings → Contact info.)

const when = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function MessageView({ message, onChanged }: { message: Message; onChanged: () => void }) {
  const rows: [string, string][] = [
    ["Email", message.email],
    ["Phone", message.phone],
    ["Company", message.company],
    ["Preferred contact time", message.preferred_time],
  ];
  const remove = async () => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await api.deleteMessage(message.id);
      toast("Message deleted.");
      onChanged();
    } catch (e) {
      toast((e as Error).message, true);
    }
  };
  const toggleRead = async () => {
    await api.markMessage(message.id, !message.read).catch((e) => toast((e as Error).message, true));
    onChanged();
  };

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="border-[#f0f0f0] border-b flex flex-wrap gap-[10px] items-start justify-between pb-[14px]">
        <div>
          <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]">
            {message.first_name} {message.last_name}
          </h2>
          <p className="font-['Inter:Regular'] text-[#8a8a8a] text-[13px]">{when(message.createdAt)}</p>
        </div>
        <div className="flex flex-wrap gap-[8px]">
          <a className={secondaryButton} href={`mailto:${message.email}?subject=${encodeURIComponent("Re: your inquiry to DesignOps")}`}>
            <MailIcon size={16} /> Reply
          </a>
          <button type="button" className={secondaryButton} onClick={toggleRead}>
            Mark as {message.read ? "unread" : "read"}
          </button>
          <button type="button" className={`${secondaryButton} hover:!border-[#e5484d] hover:!text-[#e5484d]`} onClick={remove}>
            <TrashIcon size={16} /> Delete
          </button>
        </div>
      </div>
      <dl className="gap-[14px] grid grid-cols-1 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-[4px]">
            <dt className="font-['Inter:Medium'] font-medium text-[#8a8a8a] text-[12px] uppercase">{label}</dt>
            <dd className="break-words font-['Inter:Regular'] text-[#222] text-[15px]">{value || "—"}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-[6px]">
        <span className="font-['Inter:Medium'] font-medium text-[#8a8a8a] text-[12px] uppercase">Message</span>
        <p className="bg-[#fafafa] font-['Inter:Regular'] leading-[1.6] p-[14px] rounded-[6px] text-[#222] text-[15px] whitespace-pre-wrap">{message.message || "—"}</p>
      </div>
    </div>
  );
}

function Inbox({ messages, reloadMessages, focusId }: PageProps) {
  const [selectedId, setSelectedId] = useState<string | undefined>(focusId ?? messages[0]?.id);
  const selected = messages.find((m) => m.id === selectedId) ?? messages[0];

  // Opening a message marks it as read.
  useEffect(() => {
    if (selected && !selected.read) api.markMessage(selected.id, true).then(reloadMessages, () => {});
  }, [selected, reloadMessages]);

  if (!messages.length) {
    return <div className={`${card} font-['Inter:Regular'] p-[40px] text-center text-[#707070] text-[15px]`}>No messages yet. Inquiries sent through the contact form will appear here.</div>;
  }

  return (
    <div className="gap-[20px] grid grid-cols-1 items-start lg:grid-cols-[340px_1fr]">
      <ul className={`${card} flex flex-col lg:max-h-[calc(100vh-260px)] overflow-y-auto p-[8px]`}>
        {messages.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={() => setSelectedId(m.id)}
              className={`border-l-[3px] cursor-pointer flex flex-col gap-[2px] px-[12px] py-[10px] rounded-[6px] text-left w-full ${m.id === selected?.id ? "bg-[#e9f9fb] border-[#00b6ca]" : "border-transparent hover:bg-[#f6f6f6]"}`}
            >
              <span className="flex gap-[8px] items-center">
                {!m.read && <span className="bg-[#00b6ca] rounded-full shrink-0 size-[8px]" aria-label="Unread" />}
                <span className={`text-[#222] text-[14px] truncate ${m.read ? "font-['Inter:Regular']" : "font-['Inter:Semi_Bold'] font-semibold"}`}>
                  {m.first_name} {m.last_name}
                </span>
                <span className="font-['Inter:Regular'] ml-auto shrink-0 text-[#9a9a9a] text-[11px]">{new Date(m.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
              </span>
              <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px] truncate">{m.message || m.email}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={`${card} p-[20px]`}>{selected && <MessageView message={selected} onChanged={reloadMessages} />}</div>
    </div>
  );
}

export default function MessagesPage(props: PageProps) {
  const unread = props.messages.filter((m) => !m.read).length;
  return (
    <div className="flex flex-col gap-[20px]">
      <PageHeader title="Messages" description={`Inquiries sent through the website's contact form${unread ? ` · ${unread} unread` : ""}.`} />
      <Inbox {...props} />
    </div>
  );
}
