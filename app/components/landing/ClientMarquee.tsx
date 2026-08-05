"use client";

import { useState, useEffect } from "react";
import { ClientLogo } from "@/lib/data";

function LogoItem({ brand }: { brand: ClientLogo }) {
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(!brand.logo_url);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render image only after client-side mount to ensure onError is correctly bound
  const showImage = mounted && brand.logo_url && !imgError;

  return (
    <div className="group flex-shrink-0 flex items-center justify-center min-w-[140px] h-[52px] px-6 mx-4 bg-white border border-gray-200/80 rounded-xl shadow-sm hover:border-brand hover:shadow-brand transition-all duration-200 cursor-default">
      {brand.website_url ? (
        <a href={brand.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="max-h-8 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-xs font-extrabold tracking-widest text-[var(--text)] opacity-70 group-hover:opacity-100 group-hover:text-brand uppercase transition-colors">
              {brand.name}
            </span>
          )}
        </a>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="max-h-8 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-xs font-extrabold tracking-widest text-[var(--text)] opacity-70 group-hover:opacity-100 group-hover:text-brand uppercase transition-colors">
              {brand.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

interface ClientMarqueeProps {
  initialBrands?: ClientLogo[];
}

const defaultBrands = [
  { id: "1", name: "TechCorp", logo_url: "", sort_order: 1 },
  { id: "2", name: "NexaDigital", logo_url: "", sort_order: 2 },
  { id: "3", name: "Starlight Retail", logo_url: "", sort_order: 3 },
  { id: "4", name: "Aura Clinique", logo_url: "", sort_order: 4 },
  { id: "5", name: "Vanguard POS", logo_url: "", sort_order: 5 },
  { id: "6", name: "Kopi Nusantara", logo_url: "", sort_order: 6 },
];

export default function ClientMarquee({ initialBrands = defaultBrands }: ClientMarqueeProps) {
  const doubled = [...initialBrands, ...initialBrands];

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
