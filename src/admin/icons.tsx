import type { ReactNode, SVGProps } from "react";

// Small inline icon set for the admin (24px grid, currentColor).

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

const solid = (d: string) => (props: IconProps) => (
  <Svg {...props} stroke="none" fill="currentColor">
    <path d={d} />
  </Svg>
);

export const DashboardIcon = solid("M4 4h7v7H4V4zm9 0h7v5h-7V4zM4 13h7v7H4v-7zm9-2h7v9h-7v-9z");
export const ServicesIcon = solid(
  "M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.3 0-7 1.7-7 4v2h10.5a6 6 0 0 1-.5-2.4c0-1.3.4-2.5 1.1-3.5-1.3-.1-2.6-.1-4.1-.1zm9.7 1.3.9-.5-.8-1.4-.9.5a3 3 0 0 0-1.1-.6V12h-1.6v1.3c-.4.1-.8.3-1.1.6l-.9-.5-.8 1.4.9.5a3 3 0 0 0 0 1.3l-.9.5.8 1.4.9-.5c.3.3.7.5 1.1.6V20h1.6v-1.3c.4-.1.8-.3 1.1-.6l.9.5.8-1.4-.9-.5a3 3 0 0 0 0-1.4zM17.2 17.2a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z",
);
export const WorkIcon = solid("M10 4h4a2 2 0 0 1 2 2v1h3a2 2 0 0 1 2 2v3H3V9a2 2 0 0 1 2-2h3V6a2 2 0 0 1 2-2zm0 3h4V6h-4v1zM3 14h7v1a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1h7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z");
export const BlogIcon = solid("M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm10-.5V9h4.5L14 4.5zM7 12v1.8h10V12H7zm0 4v1.8h7V16H7z");
export const ContactIcon = solid("M12 3c5 0 9 3.6 9 8s-4 8-9 8c-1.1 0-2.2-.2-3.2-.5L4 20l1.3-3.7C3.9 14.9 3 13 3 11c0-4.4 4-8 9-8zm-4 6.5v1.8h8V9.5H8zm0 3.4v1.8h5.5v-1.8H8z");
export const ClientIcon = solid("M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z");
export const ReviewIcon = solid("M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1zm8 2.6-1.1 2.3-2.5.3 1.9 1.7-.5 2.5 2.2-1.3 2.2 1.3-.5-2.5 1.9-1.7-2.5-.3L12 6.6z");
export const AchievementIcon = solid("M12 2a6 6 0 0 1 3.6 10.8L17 22l-5-2.6L7 22l1.4-9.2A6 6 0 0 1 12 2zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z");
export const FaqIcon = solid("M4 3h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H8l-4 4V4a1 1 0 0 1 1-1zm5.5 3C8.1 6 7 7 7 8.3h1.7c0-.4.4-.8.8-.8s.8.3.8.7c0 .9-1.6.9-1.6 2.6h1.6c0-1.1 1.7-1.3 1.7-2.7C12 7 10.9 6 9.5 6zm-.8 5.4v1.4h1.6v-1.4H8.7zM19 8h1a1 1 0 0 1 1 1v12l-3-3h-7a1 1 0 0 1-1-1v-1h8V8z");
export const SettingsIcon = solid(
  "M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.4 7.4 0 0 0-1.7-1L15 3.5h-4l-.4 2.5a7.4 7.4 0 0 0-1.7 1l-2.4-1-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.5h4l.4-2.5c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2.2-1.6zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z",
);
export const ProcessIcon = solid("M5 4h4v4H5V4zm10 0h4v4h-4V4zM10 5.2h4v1.6h-4V5.2zM5 10h4v4H5v-4zm10 6h4v4h-4v-4zm-8 0h4v4H7v-4zm-1-1.2h1.6V16H6v-1.2zm5.2 2h3.6v1.6h-3.6v-1.6z");

export const SearchIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);
export const MessageIcon = solid("M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4V5a2 2 0 0 1 1-2zm2.5 4.5v1.8h9V7.5h-9zm0 3.6v1.8h6v-1.8h-6z");
export const ChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);
export const PlusIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const TrashIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </Svg>
);
export const UpIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 15 6-6 6 6" />
  </Svg>
);
export const DownIcon = ChevronDown;
export const EyeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);
export const EyeOffIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.1M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.5 4.5-1.2M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </Svg>
);
export const UploadIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
  </Svg>
);
export const LogoutIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H3" />
  </Svg>
);
export const ExternalIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </Svg>
);
export const KeyIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 9-9M17 6l3 3M14 9l2 2" />
  </Svg>
);
export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Svg>
);
export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12 5 5 9-10" />
  </Svg>
);
export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Svg>
);
export const MoreIcon = solid("M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z");
export const EditIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" />
  </Svg>
);
export const CopyIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Svg>
);
export const ImageIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="m21 16-5-5-9 9" />
  </Svg>
);
export const LinkIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
  </Svg>
);
export const BackIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </Svg>
);
export const AnalyticsIcon = solid("M4 3h2v16h15v2H4V3zm4 9h3v5H8v-5zm5-4h3v9h-3V8zm5-3h3v12h-3V5z");
export const StarIcon = solid("M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.1l-5.6 3 1.1-6.3L2.9 9.4l6.3-.9L12 2.8z");
export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
  </Svg>
);
