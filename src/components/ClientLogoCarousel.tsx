import { useContent } from "@/content/store";
import type { Client } from "@/content/types";

// Endless sideways loop of client logos (from the admin "Clients" list).

function LogoSet({ clients, duplicate = false }: { clients: Client[]; duplicate?: boolean }) {
  return (
    <div className="client-logo-set" aria-hidden={duplicate}>
      {clients.map((client) => (
        <div className="client-logo-item" key={client.id}>
          <img src={client.logo} alt={duplicate ? "" : client.name} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
}

export default function ClientLogoCarousel() {
  const { clients } = useContent();
  if (!clients.length) return null;
  // Repeat short lists so one set is wider than the carousel and the loop has no gap.
  const set = Array.from({ length: Math.max(1, Math.ceil(8 / clients.length)) }, () => clients).flat();
  return (
    <div className="client-logo-carousel" role="region" aria-label="Our clients">
      <div className="client-logo-track">
        <LogoSet clients={set} />
        <LogoSet clients={set} duplicate />
      </div>
    </div>
  );
}
