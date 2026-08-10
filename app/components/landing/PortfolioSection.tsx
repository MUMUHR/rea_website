"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PortfolioItem } from "@/lib/data";

interface PortfolioSectionProps {
  initialPortfolio?: PortfolioItem[];
}

const defaultPortfolio = [
  {
    id: "porto-1",
    title: "E-Commerce Fashion & Retail",
    category: "Website · E-Commerce",
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop",
    project_url: "#",
    is_featured: true,
    show_on_homepage: true,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "porto-2",
    title: "Sistem Kasir UMKM & Point of Sale",
    category: "Desktop App · POS",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    project_url: "#",
    is_featured: false,
    show_on_homepage: true,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "porto-3",
    title: "Booking Klinik Online & Telemedis",
    category: "Website · Reservasi",
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    project_url: "#",
    is_featured: false,
    show_on_homepage: true,
    sort_order: 3,
    is_active: true,
  },
];

export default function PortfolioSection({ initialPortfolio = defaultPortfolio }: PortfolioSectionProps) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);

  useEffect(() => {
    const saved = localStorage.getItem("rea_portfolio");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPortfolio(parsed.filter((p: PortfolioItem) => p.is_featured));
        }
      } catch (e) {
        console.error("Failed to parse portfolio from localStorage", e);
      }
    } else {
      localStorage.setItem("rea_portfolio", JSON.stringify(initialPortfolio));
    }
  }, []);

  // Use first item as large, next 2 as small to fit the layout perfectly
  const largeItem = portfolio[0] || initialPortfolio[0];
  const smallItems = portfolio.length > 1 ? portfolio.slice(1, 3) : initialPortfolio.slice(1, 3);

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
            href="/portofolio"
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
        {largeItem ? (
          <div className="grid lg:grid-cols-[3fr_2fr] gap-8 reveal reveal-delay-1">

            {/* Large item */}
            <a
              href={largeItem.project_url || "/portofolio"}
              className="portfolio-img-wrapper relative block rounded-lg aspect-[4/3] lg:aspect-auto group"
              aria-label={`Lihat project ${largeItem.title}`}
            >
              <Image
                src={largeItem.image_url}
                alt={`Screenshot project ${largeItem.title} — ${largeItem.category} oleh REACreative.idn`}
                fill
                priority
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
              {/* Label */}
              <div className="absolute bottom-5 left-5 right-5">
                <span
                  className={`inline-block ${
                    largeItem.category_color || "bg-brand"
                  } text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-[4px] mb-2`}
                >
                  {largeItem.category}
                </span>
                <h3 className="text-lg font-bold text-white">{largeItem.title}</h3>
              </div>
              {/* Arrow icon on hover */}
              <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowUpRight size={16} className="text-white" />
              </div>
            </a>

            {/* Small items column */}
            <div className="flex flex-col gap-5">
              {smallItems.map((item) => (
                <a
                  key={item.id}
                  href={item.project_url || "/portofolio"}
                  className="portfolio-img-wrapper relative block rounded-lg aspect-video group flex-1"
                  aria-label={`Lihat project ${item.title}`}
                >
                  <Image
                    src={item.image_url}
                    alt={`Screenshot project ${item.title} — ${item.category} oleh REACreative.idn`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span
                      className={`inline-block ${
                        item.category_color || "bg-brand"
                      } text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-[4px] mb-1.5`}
                    >
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400 py-12">Belum ada portofolio yang aktif.</p>
        )}
      </div>
    </section>
  );
}
