import Image from "next/image";

const clientBrands = [
  "TechCorp",
  "NexaDigital",
  "Starlight Retail",
  "Aura Clinique",
  "Vanguard POS",
  "Kopi Nusantara",
];

const doubledBrands = [...clientBrands, ...clientBrands];

function LogoItem({ name }: { name: string }) {
  return (
    <div className="group flex-shrink-0 flex items-center justify-center min-w-[140px] h-[52px] px-6 mx-4 bg-white border border-gray-200/80 rounded-xl shadow-sm hover:border-brand hover:shadow-brand transition-all duration-200 cursor-default">
      <span className="text-xs font-extrabold tracking-widest text-[var(--text)] opacity-70 group-hover:opacity-100 group-hover:text-brand uppercase transition-colors">
        {name}
      </span>
    </div>
  );
}

export default function ClientMarquee() {
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
          {doubledBrands.map((brand, i) => (
            <LogoItem key={`${brand}-${i}`} name={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
