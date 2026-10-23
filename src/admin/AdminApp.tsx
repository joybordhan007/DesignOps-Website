import { useCallback, useEffect, useRef, useState, type ComponentType, type FormEvent } from "react";
import type { Message, PendingReview } from "@/content/types";
import { api, ApiError, type AdminUser } from "./api";
import { confirmLeave, ToastHost, toast } from "./editor";
import { inputClass as inputClassName } from "./fields";
import AdminSearch from "./search";
import {
  AchievementIcon,
  AnalyticsIcon,
  BlogIcon,
  ChevronDown,
  ClientIcon,
  CloseIcon,
  DashboardIcon,
  ExternalIcon,
  EyeIcon,
  EyeOffIcon,
  FaqIcon,
  LogoutIcon,
  MenuIcon,
  MessageIcon,
  ReviewIcon,
  ServicesIcon,
  SettingsIcon,
  WorkIcon,
} from "./icons";
import Dashboard from "./pages/Dashboard";
import { AchievementsPage, BlogPage, ClientsPage, FaqPage, ReviewsPage, ServicesPage, WorkPage } from "./pages/Collections";
import MessagesPage from "./pages/Messages";
import SettingsPage from "./pages/Settings";
import ProfilePage, { AdminAvatar } from "./pages/Profile";
import TrackingPage from "./pages/Tracking";

// Admin dashboard at /admin. Signs in against the server, then shows the
// sidebar layout; each sidebar entry edits one part of the website.

// Old links to the former "Contact Management" page open Messages.
const ALIASES: Record<string, string> = { contact: "messages" };

export type PageProps = {
  messages: Message[];
  reloadMessages: () => void;
  pendingReviews: PendingReview[];
  reloadPendingReviews: () => void;
  focusId?: string;
  navigate: (to: string) => void;
};

type NavItem = { path: string; label: string; icon: ComponentType<{ size?: number }>; page: ComponentType<PageProps>; badge?: "messages" | "reviews" };

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  { title: "Overview", items: [{ path: "", label: "Dashboard", icon: DashboardIcon, page: Dashboard }] },
  {
    title: "Website content",
    items: [
      { path: "services", label: "Services", icon: ServicesIcon, page: ServicesPage },
      { path: "work", label: "Work", icon: WorkIcon, page: WorkPage },
      { path: "blog", label: "Blog Management", icon: BlogIcon, page: BlogPage },
      { path: "clients", label: "Client Management", icon: ClientIcon, page: ClientsPage },
      { path: "achievements", label: "Achievement Management", icon: AchievementIcon, page: AchievementsPage },
      { path: "faq", label: "FAQ Management", icon: FaqIcon, page: FaqPage },
    ],
  },
  {
    title: "Engagement",
    items: [
      { path: "messages", label: "Messages", icon: MessageIcon, page: MessagesPage, badge: "messages" },
      { path: "reviews", label: "Review Management", icon: ReviewIcon, page: ReviewsPage, badge: "reviews" },
    ],
  },
  {
    title: "Settings",
    items: [
      { path: "settings", label: "Website Settings", icon: SettingsIcon, page: SettingsPage },
      { path: "tracking", label: "Tracking & Analytics", icon: AnalyticsIcon, page: TrackingPage },
    ],
  },
];

const NAV = NAV_GROUPS.flatMap((group) => group.items);

const LOGO = "/assets/shared/logos/designops-logo.svg";
const LOGO_LIGHT = "/assets/shared/logos/designops-logo-footer.svg";

/** The current address (path, ?query and #section). */
const here = () => window.location.pathname + window.location.search + window.location.hash;

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

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="-right-[6px] -top-[6px] absolute bg-[#ff2d2d] border-2 border-[#f5f5f5] flex font-['Inter:Bold'] font-bold h-[18px] items-center justify-center min-w-[18px] px-[3px] rounded-full text-[9px] text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function TopBar({
  user,
  unread,
  messages,
  pendingReviews,
  navigate,
  onMenu,
  onSignOut,
}: {
  user: AdminUser;
  unread: number;
  messages: Message[];
  pendingReviews: PendingReview[];
  navigate: (to: string) => void;
  onMenu: () => void;
  onSignOut: () => void;
}) {
  const [menu, setMenu] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);
  const menuRef = useOutsideClose(menu, closeMenu);

  return (
    <header className="bg-[#f5f5f5] flex gap-[20px] items-center px-[50px] py-[32px] sticky top-0 z-[30] max-lg:px-[16px] max-lg:py-[16px]">
      <button type="button" aria-label="Open menu" className="cursor-pointer lg:hidden p-[6px]" onClick={onMenu}>
        <MenuIcon size={24} />
      </button>
      <AdminSearch navigate={navigate} messages={messages} pendingReviews={pendingReviews} />
      <div className="flex gap-[28px] items-center ml-auto max-sm:gap-[16px]">
        <button type="button" aria-label={`Messages (${unread} unread)`} className="cursor-pointer relative text-[#191919] hover:text-[#00b6ca]" onClick={() => navigate("/admin/messages")}>
          <MessageIcon size={28} />
          <Badge count={unread} />
        </button>
        <div ref={menuRef} className="relative">
          <button type="button" className="cursor-pointer flex gap-[12px] items-center" onClick={() => setMenu(!menu)}>
            <AdminAvatar user={user} size={40} />
            <span className="flex flex-col items-start max-sm:hidden">
              <span className="font-['Inter:Medium'] font-medium leading-[1.3] text-[#191919] text-[14px]">{user.name}</span>
              <span className="font-['Inter:Regular'] leading-[1.3] text-[#505050] text-[12px]">Super Admin</span>
            </span>
            <ChevronDown size={20} className="max-sm:hidden" />
          </button>
          {menu && (
            <div className="absolute bg-white mt-[10px] overflow-hidden py-[6px] right-0 rounded-[8px] shadow-[0px_8px_24px_rgba(0,0,0,0.14)] w-[220px] z-[40]">
              <p className="border-[#f0f0f0] border-b font-['Inter:Regular'] mb-[6px] px-[16px] pb-[10px] pt-[4px] text-[#8a8a8a] text-[12px] truncate">{user.email}</p>
              <button type="button" className="cursor-pointer flex font-['Inter:Medium'] font-medium gap-[10px] items-center px-[16px] py-[10px] text-[#222] text-[14px] w-full hover:bg-[#f4fbfc]" onClick={() => (setMenu(false), navigate("/admin/profile"))}>
                <ClientIcon size={18} /> Profile
              </button>
              <button type="button" className="cursor-pointer flex font-['Inter:Medium'] font-medium gap-[10px] items-center px-[16px] py-[10px] text-[#d93a3f] text-[14px] w-full hover:bg-[#fdf1f1]" onClick={onSignOut}>
                <LogoutIcon size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------- layout

function Sidebar({ section, navigate, open, onClose, counts }: { section: string; navigate: (to: string) => void; open: boolean; onClose: () => void; counts: Record<"messages" | "reviews", number> }) {
  return (
    <>
      {open && <div className="bg-[rgba(0,0,0,0.4)] fixed inset-0 lg:hidden z-[45]" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`bg-[#191919] fixed flex flex-col h-svh left-0 top-0 transition-transform w-[350px] z-[50] max-lg:w-[300px] ${open ? "translate-x-0" : "max-lg:-translate-x-full"}`}
      >
        <div className="flex items-center justify-between pb-[28px] pt-[36px] px-[24px] max-lg:pb-[20px] max-lg:pt-[24px]">
          <a href="/admin" onClick={(e) => (e.preventDefault(), navigate("/admin"))} className="block pl-[28px] max-lg:pl-[8px]">
            <img src={LOGO_LIGHT} alt="DesignOps" className="block h-[56px] w-auto max-lg:h-[44px]" />
          </a>
          <button type="button" aria-label="Close menu" className="cursor-pointer lg:hidden p-[6px] text-white" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Pages grouped by job; the active one is the cyan pill. */}
        <nav aria-label="Admin" className="[scrollbar-color:#3a3a3a_transparent] [scrollbar-width:thin] flex flex-1 flex-col gap-[22px] min-h-0 overflow-y-auto pb-[20px] px-[24px] max-lg:px-[16px]">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-[4px]">
              <p className="font-['Inter:Semi_Bold'] font-semibold pb-[6px] px-[14px] text-[#6f6f6f] text-[11px] tracking-[1.2px] uppercase">{group.title}</p>
              {group.items.map((item) => {
                const active = item.path === section;
                const Icon = item.icon;
                const count = item.badge ? counts[item.badge] : 0;
                const href = `/admin${item.path ? `/${item.path}` : ""}`;
                return (
                  <a
                    key={item.path}
                    href={href}
                    onClick={(e) => (e.preventDefault(), navigate(href))}
                    aria-current={active ? "page" : undefined}
                    className={`flex font-['Inter:Medium'] font-medium gap-[12px] group h-[50px] items-center pl-[10px] pr-[14px] rounded-[8px] text-[15px] transition-colors whitespace-nowrap ${
                      active ? "bg-[#00b6ca] shadow-[0px_6px_18px_rgba(0,182,202,0.28)] text-white" : "text-[#cfcfcf] hover:bg-[rgba(255,255,255,0.06)] hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center rounded-[8px] shrink-0 size-[34px] transition-colors ${
                        active ? "bg-[rgba(255,255,255,0.2)] text-white" : "bg-[rgba(255,255,255,0.05)] text-[#9a9a9a] group-hover:text-[#00b6ca]"
                      }`}
                    >
                      <Icon size={19} />
                    </span>
                    <span className="truncate">{item.label}</span>
                    {count > 0 && (
                      <span className={`flex font-['Inter:Bold'] font-bold h-[20px] items-center justify-center min-w-[20px] ml-auto px-[6px] rounded-full text-[11px] ${active ? "bg-white text-[#00a0b2]" : "bg-[#ff2d2d] text-white"}`}>
                        {count > 99 ? "99+" : count}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-[rgba(255,255,255,0.08)] border-t px-[24px] py-[18px] max-lg:px-[16px]">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="bg-[rgba(255,255,255,0.05)] flex font-['Inter:Medium'] font-medium gap-[12px] items-center px-[12px] py-[10px] rounded-[8px] text-[#e5e5e5] text-[14px] transition-colors hover:bg-[rgba(0,182,202,0.15)]"
          >
            <span className="bg-[rgba(0,182,202,0.15)] flex items-center justify-center rounded-[8px] shrink-0 size-[34px] text-[#00b6ca]">
              <ExternalIcon size={17} />
            </span>
            <span className="flex flex-col">
              View live website
              <span className="font-['Inter:Regular'] text-[#7a7a7a] text-[12px]">Opens in a new tab</span>
            </span>
          </a>
        </div>
      </aside>
    </>
  );
}

export default function AdminApp() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [serverDown, setServerDown] = useState(false);
  const [location, setLocation] = useState(here);
  // Bumped on every navigation, so opening a Website Settings section (#…) from the search works even when that page is already open.
  const [visit, setVisit] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Admin · DesignOps";
    api
      .me()
      .then(setUser)
      .catch((e: ApiError) => setServerDown(e.status === 0 || e.status === 404))
      .finally(() => setChecking(false));
    const onPop = () => setLocation(here());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const reloadMessages = useCallback(() => {
    api.messages().then(setMessages).catch(() => {});
  }, []);

  const reloadPendingReviews = useCallback(() => {
    api.pendingReviews().then(setPendingReviews).catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;
    // The page only carries what visitors see; the dashboard also needs inactive items.
    api
      .loadContent()
      .catch((e) => toast(`Couldn't load hidden items: ${(e as Error).message}`, true))
      .finally(() => setContentLoaded(true));
    const reload = () => (reloadMessages(), reloadPendingReviews());
    reload();
    const timer = setInterval(reload, 60_000);
    return () => clearInterval(timer);
  }, [user, reloadMessages, reloadPendingReviews]);

  const navigate = useCallback((to: string) => {
    if (to === here()) return;
    if (!confirmLeave()) return;
    window.history.pushState({}, "", to);
    setLocation(to);
    setVisit((n) => n + 1);
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

  if (!contentLoaded) return null;

  const [pathname, search] = location.split("#")[0].split("?");
  const rawSection = pathname.replace(/^\/admin\/?/, "").split("/")[0] || currentSection();
  const section = ALIASES[rawSection] ?? rawSection;
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
      <Sidebar section={section === "profile" ? "profile" : entry.path} navigate={navigate} open={menuOpen} onClose={() => setMenuOpen(false)} counts={{ messages: unread, reviews: pendingReviews.length }} />
      <div className="lg:pl-[350px]">
        <TopBar user={user} unread={unread} messages={messages} pendingReviews={pendingReviews} navigate={navigate} onMenu={() => setMenuOpen(true)} onSignOut={signOut} />
        <main className="pb-[60px] px-[50px] max-lg:px-[16px]">
          {/* The profile page is opened from the account menu, not the sidebar. */}
          {section === "profile" ? (
            <ProfilePage user={user} onChange={setUser} />
          ) : (
            <Page key={entry.path === "settings" ? `settings-${visit}` : entry.path} messages={messages} reloadMessages={reloadMessages} pendingReviews={pendingReviews} reloadPendingReviews={reloadPendingReviews} focusId={focusId} navigate={navigate} />
          )}
        </main>
      </div>
      <ToastHost />
    </div>
  );
}
