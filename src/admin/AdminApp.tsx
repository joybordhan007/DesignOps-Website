import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType, type FormEvent } from "react";
import { useContent } from "@/content/store";
import type { Message } from "@/content/types";
import { api, ApiError, type AdminUser } from "./api";
import { confirmLeave, primaryButton, secondaryButton, ToastHost, toast } from "./editor";
import { inputClass as inputClassName } from "./fields";
import {
  AchievementIcon,
  BellIcon,
  BlogIcon,
  ChevronDown,
  ClientIcon,
  CloseIcon,
  ContactIcon,
  DashboardIcon,
  ExternalIcon,
  EyeIcon,
  EyeOffIcon,
  FaqIcon,
  KeyIcon,
  LogoutIcon,
  MenuIcon,
  MessageIcon,
  ReviewIcon,
  SearchIcon,
  ServicesIcon,
  SettingsIcon,
  WorkIcon,
} from "./icons";
import Dashboard from "./pages/Dashboard";
import { AchievementsPage, BlogPage, ClientsPage, FaqPage, ReviewsPage, ServicesPage, WorkPage } from "./pages/Collections";
import ContactPage from "./pages/Contact";
import SettingsPage from "./pages/Settings";

// Admin dashboard at /admin. Signs in against the server, then shows the
// sidebar layout; each sidebar entry edits one part of the website.

export type PageProps = { messages: Message[]; reloadMessages: () => void; focusId?: string; navigate: (to: string) => void };

const NAV: { path: string; label: string; icon: ComponentType<{ size?: number }>; page: ComponentType<PageProps> }[] = [
  { path: "", label: "Dashboard", icon: DashboardIcon, page: Dashboard },
  { path: "services", label: "Services", icon: ServicesIcon, page: ServicesPage },
  { path: "work", label: "Work", icon: WorkIcon, page: WorkPage },
  { path: "blog", label: "Blog Management", icon: BlogIcon, page: BlogPage },
  { path: "contact", label: "Contact Management", icon: ContactIcon, page: ContactPage },
  { path: "clients", label: "Client Management", icon: ClientIcon, page: ClientsPage },
  { path: "reviews", label: "Review Management", icon: ReviewIcon, page: ReviewsPage },
  { path: "achievements", label: "Achievement Management", icon: AchievementIcon, page: AchievementsPage },
  { path: "faq", label: "FAQ Management", icon: FaqIcon, page: FaqPage },
  { path: "settings", label: "Website Settings", icon: SettingsIcon, page: SettingsPage },
];

const LOGO = "/assets/shared/logos/designops-logo.svg";
const LOGO_LIGHT = "/assets/shared/logos/designops-logo-footer.svg";

function currentSection() {
  return window.location.pathname.replace(/^\/admin\/?/, "").split("/")[0];
}

// ---------------------------------------------------------------- login

function Login({ onSignedIn }: { onSignedIn: (user: AdminUser) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      onSignedIn(await api.login(email, password, remember));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="bg-[#f8f9fb] flex items-center justify-center min-h-svh p-[16px]">
      <form onSubmit={submit} className="bg-white flex flex-col gap-[20px] max-w-[560px] p-[40px] rounded-[16px] shadow-[0px_2px_16px_rgba(0,0,0,0.06)] w-full max-sm:p-[24px]">
        <img src={LOGO} alt="DesignOps" className="block h-[56px] self-start w-auto" />
        <h1 className="font-['Saira:SemiBold'] font-semibold leading-[1.2] text-[#171717] text-[24px]">Welcome back</h1>
        <label className="flex flex-col gap-[8px]">
          <span className="font-['Inter:Medium'] font-medium text-[#171717] text-[14px]">
            ID <span className="text-[#e5484d]">*</span>
          </span>
          <input className={inputClassName} type="email" autoComplete="username" placeholder="Enter your ID" required value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
        </label>
        <label className="flex flex-col gap-[8px]">
          <span className="font-['Inter:Medium'] font-medium text-[#171717] text-[14px]">
            Password <span className="text-[#e5484d]">*</span>
          </span>
          <span className="relative">
            <input className={`${inputClassName} pr-[48px]`} type={show ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" aria-label={show ? "Hide password" : "Show password"} className="-translate-y-1/2 absolute cursor-pointer p-[6px] right-[8px] text-[#505050] top-1/2" onClick={() => setShow(!show)}>
              {show ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </span>
        </label>
        <label className="cursor-pointer flex gap-[10px] items-center">
          <input type="checkbox" className="accent-[#171717] size-[16px]" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          <span className="font-['Inter:Regular'] text-[#3e3e3e] text-[14px]">Remember me</span>
        </label>
        {error && (
          <p role="alert" className="bg-[#fdecec] font-['Inter:Regular'] px-[12px] py-[10px] rounded-[6px] text-[#c62828] text-[14px]">
            {error}
          </p>
        )}
        <button type="submit" disabled={busy} className="bg-[#171717] cursor-pointer font-['Saira:SemiBold'] font-semibold py-[15px] rounded-[4px] text-[16px] text-white tracking-[0.5px] transition-colors hover:bg-[#000] disabled:opacity-60">
          {busy ? "SIGNING IN…" : "SIGN IN"}
        </button>
      </form>
    </main>
  );
}

// ---------------------------------------------------------------- change password

function PasswordDialog({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (next !== repeat) return toast("The new passwords don't match.", true);
    setBusy(true);
    try {
      await api.changePassword(current, next);
      toast("Password changed.");
      onClose();
    } catch (e) {
      toast((e as Error).message, true);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="bg-[rgba(0,0,0,0.4)] fixed flex inset-0 items-center justify-center p-[16px] z-[90]" onClick={onClose}>
      <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="bg-white flex flex-col gap-[14px] max-w-[420px] p-[24px] rounded-[12px] w-full">
        <h2 className="font-['Inter:Semi_Bold'] font-semibold text-[18px]">Change password</h2>
        <input className={inputClassName} type="password" placeholder="Current password" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} />
        <input className={inputClassName} type="password" placeholder="New password (8+ characters)" autoComplete="new-password" minLength={8} required value={next} onChange={(e) => setNext(e.target.value)} />
        <input className={inputClassName} type="password" placeholder="Repeat new password" autoComplete="new-password" minLength={8} required value={repeat} onChange={(e) => setRepeat(e.target.value)} />
        <div className="flex gap-[10px] justify-end">
          <button type="button" className={secondaryButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={primaryButton} disabled={busy}>
            {busy ? "Saving…" : "Change password"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------- top bar

function useOutsideClose(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handle = (event: MouseEvent) => ref.current && !ref.current.contains(event.target as Node) && close();
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, close]);
  return ref;
}

function Search({ navigate }: { navigate: (to: string) => void }) {
  const content = useContent();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useOutsideClose(open, close);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const all = [
      ...content.services.map((s) => ({ section: "services", kind: "Service", id: s.id, title: s.title })),
      ...content.projects.map((p) => ({ section: "work", kind: "Work", id: p.id, title: `${p.title} · ${p.category}` })),
      ...content.posts.map((p) => ({ section: "blog", kind: "Blog", id: p.id, title: p.title })),
      ...content.faqs.map((f) => ({ section: "faq", kind: "FAQ", id: f.id, title: f.question })),
      ...content.clients.map((c) => ({ section: "clients", kind: "Client", id: c.id, title: c.name })),
      ...content.reviews.map((r) => ({ section: "reviews", kind: "Review", id: r.id, title: `${r.name} · ${r.company}` })),
    ];
    return all.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 8);
  }, [query, content]);

  return (
    <div ref={ref} className="flex-1 max-w-[1000px] relative">
      <label className="bg-white flex gap-[10px] h-[56px] items-center px-[16px] rounded-[8px]">
        <SearchIcon size={22} className="shrink-0 text-[#3e3e3e]" />
        <input
          className="bg-transparent font-['Inter:Regular'] outline-none text-[#222] text-[16px] w-full placeholder:text-[#9a9a9a]"
          placeholder="Search here..."
          value={query}
          onChange={(e) => (setQuery(e.target.value), setOpen(true))}
          onFocus={() => setOpen(true)}
        />
      </label>
      {open && query.trim().length >= 2 && (
        <ul className="absolute bg-white left-0 mt-[6px] overflow-hidden right-0 rounded-[8px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] z-[40]">
          {results.map((item) => (
            <li key={`${item.section}-${item.id}`}>
              <button
                type="button"
                className="cursor-pointer flex gap-[10px] items-center px-[16px] py-[10px] text-left w-full hover:bg-[#f4fbfc]"
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  navigate(`/admin/${item.section}?item=${item.id}`);
                }}
              >
                <span className="bg-[#e9f9fb] font-['Inter:Medium'] font-medium px-[8px] py-[2px] rounded-full shrink-0 text-[#00a0b2] text-[11px]">{item.kind}</span>
                <span className="font-['Inter:Regular'] text-[#222] text-[14px] truncate">{item.title}</span>
              </button>
            </li>
          ))}
          {!results.length && <li className="font-['Inter:Regular'] px-[16px] py-[12px] text-[#8a8a8a] text-[14px]">No matches.</li>}
        </ul>
      )}
    </div>
  );
}

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="-right-[6px] -top-[6px] absolute bg-[#ff2d2d] border-2 border-[#f5f5f5] flex font-['Inter:Bold'] font-bold h-[18px] items-center justify-center min-w-[18px] px-[3px] rounded-full text-[9px] text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function TopBar({ user, unread, messages, navigate, onMenu, onSignOut }: { user: AdminUser; unread: number; messages: Message[]; navigate: (to: string) => void; onMenu: () => void; onSignOut: () => void }) {
  const [menu, setMenu] = useState(false);
  const [bell, setBell] = useState(false);
  const [password, setPassword] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);
  const closeBell = useCallback(() => setBell(false), []);
  const menuRef = useOutsideClose(menu, closeMenu);
  const bellRef = useOutsideClose(bell, closeBell);
  const latest = messages.filter((m) => !m.read).slice(0, 5);
  const initials = user.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="bg-[#f5f5f5] flex gap-[20px] items-center px-[50px] py-[32px] sticky top-0 z-[30] max-lg:px-[16px] max-lg:py-[16px]">
      <button type="button" aria-label="Open menu" className="cursor-pointer lg:hidden p-[6px]" onClick={onMenu}>
        <MenuIcon size={24} />
      </button>
      <Search navigate={navigate} />
      <div className="flex gap-[28px] items-center ml-auto max-sm:gap-[16px]">
        <button type="button" aria-label={`Messages (${unread} unread)`} className="cursor-pointer relative text-[#191919] hover:text-[#00b6ca]" onClick={() => navigate("/admin/contact")}>
          <MessageIcon size={28} />
          <Badge count={unread} />
        </button>
        <div ref={bellRef} className="relative">
          <button type="button" aria-label="Notifications" className="cursor-pointer relative text-[#191919] hover:text-[#00b6ca]" onClick={() => setBell(!bell)}>
            <BellIcon size={28} />
            <Badge count={unread} />
          </button>
          {bell && (
            <div className="absolute bg-white mt-[10px] overflow-hidden right-0 rounded-[8px] shadow-[0px_8px_24px_rgba(0,0,0,0.14)] w-[320px] z-[40]">
              <p className="border-[#f0f0f0] border-b font-['Inter:Semi_Bold'] font-semibold px-[16px] py-[12px] text-[14px]">New messages</p>
              {latest.map((m) => (
                <button key={m.id} type="button" className="border-[#f6f6f6] border-b cursor-pointer flex flex-col gap-[2px] px-[16px] py-[10px] text-left w-full hover:bg-[#f4fbfc]" onClick={() => (setBell(false), navigate(`/admin/contact?item=${m.id}`))}>
                  <span className="font-['Inter:Medium'] font-medium text-[#222] text-[14px]">
                    {m.first_name} {m.last_name}
                  </span>
                  <span className="font-['Inter:Regular'] text-[#8a8a8a] text-[12px] truncate">{m.message || m.email}</span>
                </button>
              ))}
              {!latest.length && <p className="font-['Inter:Regular'] px-[16px] py-[14px] text-[#8a8a8a] text-[14px]">You're all caught up.</p>}
            </div>
          )}
        </div>
        <div ref={menuRef} className="relative">
          <button type="button" className="cursor-pointer flex gap-[12px] items-center" onClick={() => setMenu(!menu)}>
            <span className="bg-[#191919] flex font-['Inter:Semi_Bold'] font-semibold items-center justify-center rounded-full shrink-0 size-[40px] text-[14px] text-white">{initials}</span>
            <span className="flex flex-col items-start max-sm:hidden">
              <span className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#191919] text-[14px]">{user.name}</span>
              <span className="font-['Inter:Regular'] leading-[1.3] text-[#505050] text-[12px]">Super Admin</span>
            </span>
            <ChevronDown size={20} className="max-sm:hidden" />
          </button>
          {menu && (
            <div className="absolute bg-white mt-[10px] overflow-hidden py-[6px] right-0 rounded-[8px] shadow-[0px_8px_24px_rgba(0,0,0,0.14)] w-[220px] z-[40]">
              <p className="border-[#f0f0f0] border-b font-['Inter:Regular'] mb-[6px] px-[16px] pb-[10px] pt-[4px] text-[#8a8a8a] text-[12px] truncate">{user.email}</p>
              <a href="/" target="_blank" rel="noreferrer" className="flex font-['Inter:Medium'] font-medium gap-[10px] items-center px-[16px] py-[10px] text-[#222] text-[14px] hover:bg-[#f4fbfc]">
                <ExternalIcon size={18} /> View website
              </a>
              <button type="button" className="cursor-pointer flex font-['Inter:Medium'] font-medium gap-[10px] items-center px-[16px] py-[10px] text-[#222] text-[14px] w-full hover:bg-[#f4fbfc]" onClick={() => (setMenu(false), setPassword(true))}>
                <KeyIcon size={18} /> Change password
              </button>
              <button type="button" className="cursor-pointer flex font-['Inter:Medium'] font-medium gap-[10px] items-center px-[16px] py-[10px] text-[#d93a3f] text-[14px] w-full hover:bg-[#fdf1f1]" onClick={onSignOut}>
                <LogoutIcon size={18} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
      {password && <PasswordDialog onClose={() => setPassword(false)} />}
    </header>
  );
}

// ---------------------------------------------------------------- layout

function Sidebar({ section, navigate, open, onClose }: { section: string; navigate: (to: string) => void; open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="bg-[rgba(0,0,0,0.4)] fixed inset-0 lg:hidden z-[45]" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`bg-[#191919] fixed flex flex-col gap-[40px] h-svh left-0 overflow-y-auto px-[24px] py-[40px] top-0 transition-transform w-[350px] z-[50] max-lg:w-[300px] ${
          open ? "translate-x-0" : "max-lg:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="/admin" onClick={(e) => (e.preventDefault(), navigate("/admin"))} className="block pl-[28px] max-lg:pl-[8px]">
            <img src={LOGO_LIGHT} alt="DesignOps" className="block h-[56px] w-auto" />
          </a>
          <button type="button" aria-label="Close menu" className="cursor-pointer lg:hidden p-[6px] text-white" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Admin" className="flex flex-col gap-[12px]">
          {NAV.map((item) => {
            const active = item.path === section;
            const Icon = item.icon;
            return (
              <a
                key={item.path}
                href={`/admin${item.path ? `/${item.path}` : ""}`}
                onClick={(e) => (e.preventDefault(), navigate(`/admin${item.path ? `/${item.path}` : ""}`))}
                aria-current={active ? "page" : undefined}
                className={`flex font-['Inter:Medium'] font-medium gap-[12px] h-[60px] items-center px-[20px] rounded-[4px] text-[18px] transition-colors whitespace-nowrap max-lg:h-[52px] max-lg:text-[16px] ${
                  active ? "bg-[#00b6ca] text-white" : "text-white hover:bg-[rgba(255,255,255,0.08)]"
                }`}
              >
                <Icon size={22} />
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default function AdminApp() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [serverDown, setServerDown] = useState(false);
  const [location, setLocation] = useState(() => window.location.pathname + window.location.search);
  const [messages, setMessages] = useState<Message[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Admin · DesignOps";
    api
      .me()
      .then(setUser)
      .catch((e: ApiError) => setServerDown(e.status === 0 || e.status === 404))
      .finally(() => setChecking(false));
    const onPop = () => setLocation(window.location.pathname + window.location.search);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const reloadMessages = useCallback(() => {
    api.messages().then(setMessages).catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    reloadMessages();
    const timer = setInterval(reloadMessages, 60_000);
    return () => clearInterval(timer);
  }, [user, reloadMessages]);

  const navigate = useCallback((to: string) => {
    if (to === window.location.pathname + window.location.search) return;
    if (!confirmLeave()) return;
    window.history.pushState({}, "", to);
    setLocation(to);
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  if (checking) return null;

  if (!user) {
    return (
      <>
        {serverDown && (
          <p className="bg-[#fff4e5] fixed font-['Inter:Regular'] inset-x-0 px-[16px] py-[10px] text-[#8a5300] text-[14px] text-center top-0 z-[10]">
            The admin server isn't running, so you can't sign in. Start it with <code>npm run server</code> (see server/README.md).
          </p>
        )}
        <Login onSignedIn={setUser} />
        <ToastHost />
      </>
    );
  }

  const [pathname, search] = location.split("?");
  const section = pathname.replace(/^\/admin\/?/, "").split("/")[0] || currentSection();
  const entry = NAV.find((item) => item.path === section) ?? NAV[0];
  const Page = entry.page;
  const focusId = new URLSearchParams(search ?? "").get("item") ?? undefined;
  const unread = messages.filter((m) => !m.read).length;

  const signOut = async () => {
    if (!confirmLeave()) return;
    await api.logout().catch(() => {});
    setUser(null);
    window.history.pushState({}, "", "/admin");
    setLocation("/admin");
  };

  return (
    <div className="bg-[#f5f5f5] min-h-svh">
      <Sidebar section={entry.path} navigate={navigate} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-[350px]">
        <TopBar user={user} unread={unread} messages={messages} navigate={navigate} onMenu={() => setMenuOpen(true)} onSignOut={signOut} />
        <main className="pb-[60px] px-[50px] max-lg:px-[16px]">
          <Page key={entry.path} messages={messages} reloadMessages={reloadMessages} focusId={focusId} navigate={navigate} />
        </main>
      </div>
      <ToastHost />
    </div>
  );
}
