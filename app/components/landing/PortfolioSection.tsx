import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* 
  Portfolio items — image naming convention: /img/portofolio_[name].png
  Update with real project screenshots.
*/
const portfolioItems = [
  {
    id: "porto-1",
    title: "E-Commerce Fashion & Retail",
    category: "Website · E-Commerce",
    src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop",
    href: "#",
    large: true,
  },
  {
    id: "porto-2",
    title: "Sistem Kasir UMKM & Point of Sale",
    category: "Desktop App · POS",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    href: "#",
    large: false,
  },
  {
    id: "porto-3",
    title: "Booking Klinik Online & Telemedis",
    category: "Website · Reservasi",
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    href: "#",
    large: false,
  },
];

export default function PortfolioSection() {
  const large = portfolioItems.filter((p) => p.large);
  const small = portfolioItems.filter((p) => !p.large);

  return (
    <section
      id="portofolio"
      className="py-24 bg-white"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand block mb-3">
              Referensi Tampilan
            </span>
            <h2
              id="portfolio-heading"
              className="text-display-lg font-bold text-[var(--text)]"
            >
              Hasil Kerja <span className="text-brand">Nyata</span>
            </h2>
          </div>
          <a
            href="/#portofolio-semua"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover transition-colors group"
          >
            Lihat Semua Project
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </a>
        </div>

        {/* Asymmetric grid: 1 large left + 2 small right */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 reveal reveal-delay-1">

          {/* Large item */}
          {large.map((item) => (
            <a
              key={item.id}
              href={item.href}
              id={item.id}
              className="portfolio-img-wrapper relative block rounded-lg aspect-[4/3] lg:aspect-auto group"
              aria-label={`Lihat project ${item.title}`}
            >
              <Image
                src={item.src}
                alt={`Screenshot project ${item.title} — ${item.category} oleh REACreative.idn`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[var(--support)]/80 via-transparent to-transparent" aria-hidden="true" />
              {/* Label */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-1">
                  {item.category}
                </p>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>
              {/* Arrow icon on hover */}
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowUpRight size={16} className="text-white" />
              </div>
            </a>
          ))}

          {/* Small items column */}
          <div className="flex flex-col gap-5">
            {small.map((item) => (
              <a
                key={item.id}
                href={item.href}
                id={item.id}
                className="portfolio-img-wrapper relative block rounded-lg aspect-video group flex-1"
                aria-label={`Lihat project ${item.title}`}
              >
                <Image
                  src={item.src}
                  alt={`Screenshot project ${item.title} — ${item.category} oleh REACreative.idn`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[var(--support)]/80 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-brand mb-0.5">
                    {item.category}
                  </p>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
