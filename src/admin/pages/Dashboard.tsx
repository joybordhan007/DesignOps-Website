import type { ComponentType } from "react";
import { formatDate, sortedPosts } from "@/content/helpers";
import { useContent } from "@/content/store";
import type { PageProps } from "../AdminApp";
import { card, secondaryButton } from "../editor";
import { BlogIcon, FaqIcon, PlusIcon, ServicesIcon, WorkIcon } from "../icons";

// Dashboard: totals, contact-form activity and the latest content.

function StatCard({ label, value, icon: Icon, tint, onClick }: { label: string; value: number; icon: ComponentType<{ size?: number }>; tint: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`${card} cursor-pointer flex h-[150px] items-center justify-between px-[28px] text-left transition-shadow hover:shadow-[0px_6px_20px_rgba(0,0,0,0.08)]`}>
      <span className="flex flex-col gap-[18px]">
        <span className="font-['Inter:Medium'] font-medium text-[#191919] text-[18px]">{label}</span>
        <span className="font-['Inter:Medium'] font-medium leading-none text-[#191919] text-[40px]">{String(value).padStart(2, "0")}</span>
      </span>
      <span className="flex items-center justify-center rounded-full size-[96px]" style={{ background: `${tint}1f`, color: tint }}>
        <Icon size={44} />
      </span>
    </button>
  );
}

const monthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;

function MessagesChart({ messages }: { messages: PageProps["messages"] }) {
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - 5 + i, 1));
  const counts = months.map((month) => messages.filter((m) => monthKey(new Date(m.createdAt)) === monthKey(month)).length);
  const max = Math.max(4, ...counts);

  return (
    <div className="flex flex-col gap-[16px] h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]">Contact form messages</h2>
        <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[13px]">Last 6 months · {messages.length} total</span>
      </div>
      <div className="flex flex-1 gap-[16px] items-end min-h-[240px] pt-[12px]">
        {months.map((month, i) => (
          <div key={i} className="flex flex-1 flex-col gap-[8px] h-full items-center justify-end">
            <span className="font-['Inter:Medium'] font-medium text-[#3e3e3e] text-[13px]">{counts[i]}</span>
            <div className="bg-[#00b6ca] min-h-[4px] rounded-t-[6px] transition-[height] w-full max-w-[64px]" style={{ height: `${(counts[i] / max) * 80}%`, opacity: counts[i] ? 1 : 0.25 }} />
            <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">{month.toLocaleDateString("en-US", { month: "short" })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ messages, navigate }: PageProps) {
  const content = useContent();
  const recentMessages = messages.slice(0, 6);
  const recentPosts = sortedPosts(content.posts).slice(0, 4);
  const recentProjects = content.projects.slice(-4).reverse();

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="gap-[24px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Services" value={content.services.length} icon={ServicesIcon} tint="#2f7df6" onClick={() => navigate("/admin/services")} />
        <StatCard label="Total Work" value={content.projects.length} icon={WorkIcon} tint="#d63aa8" onClick={() => navigate("/admin/work")} />
        <StatCard label="Total Blog" value={content.posts.length} icon={BlogIcon} tint="#5b4bdb" onClick={() => navigate("/admin/blog")} />
        <StatCard label="Total FAQ" value={content.faqs.length} icon={FaqIcon} tint="#e2533b" onClick={() => navigate("/admin/faq")} />
      </div>

      <div className="gap-[24px] grid grid-cols-1 xl:grid-cols-[3fr_1fr]">
        <div className={`${card} min-h-[400px] p-[28px]`}>
          <MessagesChart messages={messages} />
        </div>
        <div className={`${card} flex flex-col gap-[14px] min-h-[400px] p-[24px]`}>
          <div className="flex items-baseline justify-between">
            <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]">Recent messages</h2>
            <button type="button" className="cursor-pointer font-['Inter:Medium'] font-medium text-[#00a0b2] text-[13px] hover:underline" onClick={() => navigate("/admin/contact")}>
              View all
            </button>
          </div>
          {recentMessages.map((m) => (
            <button key={m.id} type="button" onClick={() => navigate(`/admin/contact?item=${m.id}`)} className="border-[#f3f3f3] border-b cursor-pointer flex flex-col gap-[2px] pb-[10px] text-left">
              <span className="flex gap-[8px] items-center">
                {!m.read && <span className="bg-[#00b6ca] rounded-full shrink-0 size-[8px]" />}
                <span className="font-['Inter:Medium'] font-medium text-[#222] text-[14px] truncate">
                  {m.first_name} {m.last_name}
                </span>
              </span>
              <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px] truncate">{m.message || m.email}</span>
            </button>
          ))}
          {!recentMessages.length && <p className="font-['Inter:Regular'] text-[#8a8a8a] text-[14px]">No messages yet.</p>}
        </div>
      </div>

      <div className={`${card} flex flex-col gap-[20px] p-[28px]`}>
        <div className="flex flex-wrap gap-[10px] items-center justify-between">
          <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[#191919] text-[18px]">Latest content</h2>
          <div className="flex flex-wrap gap-[10px]">
            <button type="button" className={secondaryButton} onClick={() => navigate("/admin/blog")}>
              <PlusIcon size={16} /> New blog post
            </button>
            <button type="button" className={secondaryButton} onClick={() => navigate("/admin/work")}>
              <PlusIcon size={16} /> New project
            </button>
            <button type="button" className={secondaryButton} onClick={() => navigate("/admin/settings")}>
              Edit page texts
            </button>
          </div>
        </div>
        <div className="gap-[24px] grid grid-cols-1 lg:grid-cols-2">
          {[
            { title: "Blog posts", items: recentPosts.map((p) => ({ id: p.id, image: p.image, name: p.title, meta: formatDate(p.date), to: `/admin/blog?item=${p.id}` })) },
            { title: "Projects", items: recentProjects.map((p) => ({ id: p.id, image: p.cover, name: p.title, meta: p.category, to: `/admin/work?item=${p.id}` })) },
          ].map((list) => (
            <div key={list.title} className="flex flex-col gap-[10px]">
              <h3 className="font-['Inter:Medium'] font-medium text-[#8a8a8a] text-[13px] uppercase">{list.title}</h3>
              {list.items.map((item) => (
                <button key={item.id} type="button" onClick={() => navigate(item.to)} className="cursor-pointer flex gap-[12px] items-center p-[6px] rounded-[6px] text-left hover:bg-[#f6f6f6]">
                  <span className="bg-[#f0f0f0] block h-[48px] overflow-hidden rounded-[4px] shrink-0 w-[72px]">{item.image && <img src={item.image} alt="" className="block object-cover size-full" />}</span>
                  <span className="flex flex-col min-w-0">
                    <span className="font-['Inter:Medium'] font-medium text-[#222] text-[14px] truncate">{item.name}</span>
                    <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px]">{item.meta}</span>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
