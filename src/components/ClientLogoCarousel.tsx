const clientLogos = [
  { src: "/assets/client-logos/mamother.png", alt: "Mamother" },

  { src: "/assets/client-logos/speed.png", alt: "Speed" },

  { src: "/assets/client-logos/bangla-travel.png", alt: "Bangla Travel" },

  {
    src: "/assets/client-logos/imagine-interiors.png",
    alt: "Imagine Interiors",
  },

  { src: "/assets/client-logos/client-mark.png", alt: "Client logo" },

  { src: "/assets/client-logos/blucheez.svg", alt: "Blucheez" },
]

function LogoSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="client-logo-set" aria-hidden={duplicate}>
      {clientLogos.map((logo) => (
        <div className="client-logo-item" key={logo.src}>
          <img src={logo.src} alt={duplicate ? "" : logo.alt} />
        </div>
      ))}
    </div>
  )
}

export default function ClientLogoCarousel() {
  return (
    <div
      className="client-logo-carousel"
      role="region"
      aria-label="Our clients"
    >
      <div className="client-logo-track">
        <LogoSet />
        <LogoSet duplicate />
      </div>
    </div>
  )
}
