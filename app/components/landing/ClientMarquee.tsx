"use client";

import { useState, useEffect } from "react";
import { ClientLogo } from "@/lib/data";

function getLogoSvg(name: string) {
  const norm = name.toLowerCase();
  if (norm.includes("spotify")) {
    return (
      <svg className="h-6 w-auto text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.67-.135-.746-.472-.076-.336.135-.67.472-.746 3.856-.88 7.15-.5 9.822 1.137.295.18.387.563.205.856zm1.224-2.722c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.67-1.114 8.243-.57 11.346 1.33.367.226.488.707.26 1.084zm.106-2.833C14.392 8.78 8.622 8.59 5.282 9.603a1.002 1.002 0 0 1-1.184-.716 1.002 1.002 0 0 1 .716-1.184c3.832-1.163 10.202-.943 14.28 1.478.413.245.55.776.305 1.19a.998.998 0 0 1-1.19.303l-.003.002z"/>
      </svg>
    );
  }
  if (norm.includes("stripe")) {
    return (
      <svg className="h-6 w-auto text-[#635BFF]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.962 10.37c0-.756-.566-1.037-1.393-1.037-1.29 0-2.617.433-3.666 1.005l-.545-2.637c1.392-.61 3.013-.935 4.605-.935 3.127 0 5.166 1.488 5.166 4.316 0 3.328-4.223 3.99-4.223 4.904 0 .43.342.664 1.08.664 1.332 0 2.8-.574 3.864-1.258l.542 2.658c-1.365.73-3.23 1.127-4.887 1.127-3.24 0-5.184-1.577-5.184-4.26 0-3.413 4.64-4.148 4.64-5.547zm-1.89-6.326c.928 0 1.68.752 1.68 1.68s-.752 1.68-1.68 1.68-1.68-.752-1.68-1.68.752-1.68 1.68-1.68z"/>
      </svg>
    );
  }
  if (norm.includes("slack")) {
    return (
      <svg className="h-6 w-auto text-[#4A154B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.043zm2.52-6.342a2.528 2.528 0 0 1-2.52-2.52 2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.52 2.522v2.52h-2.52zm0 1.26a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522v-5.043a2.528 2.528 0 0 1 2.52-2.52h5.042zm6.342-2.52a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.26 0a2.528 2.528 0 0 1-2.52 2.52H8.823a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.042zm-2.52 6.342a2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.52-2.522v-2.52h2.52zm0-1.26a2.528 2.528 0 0 1-2.52-2.52v-5.042a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.042a2.528 2.528 0 0 1-2.52 2.52h-5.043z"/>
      </svg>
    );
  }
  if (norm.includes("airbnb")) {
    return (
      <svg className="h-6 w-auto text-[#FF5A5F]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24c-1.39 0-2.61-.7-3.41-1.84L1.3 11.53c-1.74-2.48-1.74-5.83 0-8.31a6.027 6.027 0 0 1 8.52-.45c.81.74 1.43 1.69 1.8 2.76.38-1.07.99-2.02 1.8-2.76a6.027 6.027 0 0 1 8.52.45c1.74 2.48 1.74 5.83 0 8.31l-7.29 10.63c-.8.14-2.02.84-3.41.84zm0-20.91c-.42 0-.83.17-1.13.48-.48.49-.78 1.16-.78 1.93 0 .44.1.86.29 1.25.43.9 1.15 1.65 2.05 2.09.4.19.83.29 1.27.29s.87-.1 1.27-.29c.9-.44 1.62-1.19 2.05-2.09.19-.39.29-.81.29-1.25 0-.77-.3-1.44-.78-1.93a1.603 1.603 0 0 0-2.26 0l-.36.36-.36-.36a1.579 1.579 0 0 0-1.13-.48z"/>
      </svg>
    );
  }
  if (norm.includes("zoom")) {
    return (
      <svg className="h-5 w-auto text-[#2D8CFF]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 7.15c0-.47-.38-.85-.85-.85H3.85c-.47 0-.85.38-.85.85v9.7c0 .47.38.85.85.85h16.3c.47 0 .85-.38.85-.85V7.15zm3 2.15v5.4l-3-2.15v-1.1l3-2.15z"/>
      </svg>
    );
  }
  if (norm.includes("figma")) {
    return (
      <svg className="h-6 w-auto" viewBox="0 0 24 24">
        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.65.8 3.1 2.05 4-.62.45-1.15.98-1.55 1.6C7.15 11.9 7 11.45 7 11c0-2.76 2.24-5 5-5h2V2h-2zm0 10c-2.76 0-5 2.24-5 5s2.24 5 5 5h2v-4h-2zm0-4c2.76 0 5-2.24 5-5s-2.24-5-5-5H9.5v4H12zm0 4c-1.38 0-2.5.56-2.5 1.25s1.12 1.25 2.5 1.25h2.5v-2.5H12zm2.5-6.5V2H17c2.76 0 5 2.24 5 5s-2.24 5-5 5h-3v-4.5zM17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 7.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#F24E1E"/>
        <path d="M12 12c0-2.76 2.24-5 5-5v5h-5z" fill="#FF7262"/>
        <path d="M12 12c2.76 0 5 2.24 5 5s-2.24 5-5 5v-10z" fill="#1ABC9C"/>
        <path d="M7 17c0-2.76 2.24-5 5-5v10c-2.76 0-5-2.24-5-5z" fill="#A259FF"/>
        <path d="M7 7c0 2.76 2.24 5 5 5V2c-2.76 0-5 2.24-5 5z" fill="#F24E1E"/>
      </svg>
    );
  }
  return null;
}

function LogoItem({ brand }: { brand: ClientLogo }) {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(!brand.logo_url);

  useEffect(() => {
    setMounted(true);
  }, []);

  const norm = brand.name.toLowerCase();
  const hasSvg = norm.includes("spotify") || norm.includes("stripe") || norm.includes("slack") || norm.includes("airbnb") || norm.includes("zoom") || norm.includes("figma");

  const renderContent = () => {
    if (hasSvg) {
      return getLogoSvg(brand.name);
    }
    if (mounted && brand.logo_url && !imgError) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logo_url}
          alt={brand.name}
          className="max-h-8 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
          onError={() => setImgError(true)}
        />
      );
    }
    return (
      <span className="text-xs font-extrabold tracking-widest text-[var(--text)] opacity-70 group-hover:opacity-100 group-hover:text-brand uppercase transition-colors">
        {brand.name}
      </span>
    );
  };

  return (
    <div className="group flex-shrink-0 flex items-center justify-center min-w-[140px] h-[52px] px-6 mx-4 bg-white border border-gray-200/80 rounded-xl shadow-sm hover:border-brand hover:shadow-brand transition-all duration-200 cursor-default">
      {brand.website_url ? (
        <a href={brand.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
          {renderContent()}
        </a>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {renderContent()}
        </div>
      )}
    </div>
  );
}

interface ClientMarqueeProps {
  initialBrands?: ClientLogo[];
}

const defaultBrands = [
  { id: "1", name: "Spotify", logo_url: "https://logo.clearbit.com/spotify.com", website_url: "https://spotify.com", sort_order: 1 },
  { id: "2", name: "Stripe", logo_url: "https://logo.clearbit.com/stripe.com", website_url: "https://stripe.com", sort_order: 2 },
  { id: "3", name: "Slack", logo_url: "https://logo.clearbit.com/slack.com", website_url: "https://slack.com", sort_order: 3 },
  { id: "4", name: "Airbnb", logo_url: "https://logo.clearbit.com/airbnb.com", website_url: "https://airbnb.com", sort_order: 4 },
  { id: "5", name: "Zoom", logo_url: "https://logo.clearbit.com/zoom.us", website_url: "https://zoom.us", sort_order: 5 },
  { id: "6", name: "Figma", logo_url: "https://logo.clearbit.com/figma.com", website_url: "https://figma.com", sort_order: 6 },
];

export default function ClientMarquee({ initialBrands = defaultBrands }: ClientMarqueeProps) {
  const [brands, setBrands] = useState<ClientLogo[]>(initialBrands);

  useEffect(() => {
    const saved = localStorage.getItem("rea_client_logos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasEmpty = parsed.some((x: any) => !x.logo_url || x.logo_url.includes("/img/logo_") || x.name === "TechCorp");
          if (hasEmpty) {
            setBrands(initialBrands);
            localStorage.setItem("rea_client_logos", JSON.stringify(initialBrands));
          } else {
            setBrands(parsed);
          }
        }
      } catch (e) {
        console.error("Failed to parse client logos from localStorage", e);
      }
    } else {
      localStorage.setItem("rea_client_logos", JSON.stringify(initialBrands));
    }
  }, [initialBrands]);

  // Dynamically duplicate brands to ensure the marquee track is extremely wide
  // and has enough content to cover wide viewports and loop seamlessly.
  let doubled: ClientLogo[] = [...brands];
  if (doubled.length > 0) {
    while (doubled.length < 24) {
      doubled = [...doubled, ...brands];
    }
    // Duplicate one more time to have enough buffer for a seamless translateX(-50%) loop
    doubled = [...doubled, ...doubled];
  }

  return (
    <section
      id="klien"
      className="py-14 bg-[var(--bg-alt)] border-y border-[var(--border-light)] overflow-hidden"
      aria-labelledby="klien-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            Klien Kami
          </span>
          <span className="flex-1 h-px bg-[var(--border-light)]" aria-hidden="true" />
        </div>
        <h2 id="klien-heading" className="text-display-sm font-bold text-[var(--text)] mt-2">
          Diper<span className="text-brand">caya</span> Oleh
        </h2>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper" role="region" aria-label="Daftar klien REACreative">
        <div className="marquee-track">
          {doubled.map((brand, i) => (
            <LogoItem key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
