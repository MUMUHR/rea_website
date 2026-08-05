"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, MessageCircle } from "lucide-react";
import { PortfolioItem } from "@/lib/data";

interface PortofolioClientProps {
  initialItems: PortfolioItem[];
  stats: { val: string; label: string }[];
}

export default function PortofolioClient({ initialItems, stats }: PortofolioClientProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = [
    "Semua",
    ...Array.from(new Set(initialItems.map((item) => item.category))).filter(Boolean),
  ];

  const filtered =
    activeCategory === "Semua"
      ? initialItems
      : initialItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* ── Category Filter Chips ── */}
      <section className="py-8 border-b border-[var(--border-light)] bg-white sticky top-16 z-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-brand text-white shadow-[0_4px_14px_rgba(225,29,46,0.3)]"
                    : "bg-[var(--bg-alt)] text-[var(--text-muted)] hover:bg-brand/10 hover:text-brand"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Grid ── */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          {filtered.length === 0 ? (
            <p className="text-center text-[var(--text-muted)] py-16">Belum ada proyek di kategori ini.</p>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white border border-[var(--border-light)] rounded-2xl overflow-hidden flex flex-col
                    hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(18,17,21,0.10)] hover:border-transparent
                    transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-alt)]">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <span
                      className={`absolute top-3.5 left-3.5 ${
                        item.category_color || "bg-brand"
                      } text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded`}
                    >
                      {item.category}
                    </span>
                    {item.project_url && (
                      <div className="absolute inset-0 bg-[var(--support)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a
                          href={item.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-[var(--text)] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-brand hover:text-white transition-all duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} />
                          Buka Website
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <h2 className="text-base font-bold text-[var(--text)] leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
                      {item.description}
                    </p>
                    <div className="flex flex-col gap-1.5 border-t border-dashed border-[var(--border-light)] pt-4 mt-auto">
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--text-muted)]">Tahun</span>
                        <span className="font-semibold text-[var(--text)]">{item.year || "—"}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--text-muted)]">Teknologi</span>
                        <span className="font-semibold text-[var(--text)] text-right max-w-[60%]">
                          {item.tech_stack || "—"}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--text-muted)]">Status</span>
                        <span className="font-semibold text-emerald-600">{item.status || "—"}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Stats Band — Dark theme split layout ── */}
      <section className="bg-[var(--support)] border-y border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-[7fr_5fr] items-stretch min-h-[320px]">

          {/* Left: description + stats */}
          <div className="flex flex-col justify-center gap-7 px-6 lg:px-16 py-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-[3px] uppercase text-brand flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                Pencapaian Kami
              </span>
              <p className="text-white/70 text-base leading-relaxed max-w-md">
                Kami bangga telah dipercaya oleh puluhan klien di berbagai sektor untuk membangun solusi digital yang berdampak nyata bagi bisnis mereka.
              </p>
              <a
                href="/layanan"
                className="inline-flex items-center gap-2 text-xs font-bold text-white/70 border border-white/20 rounded-full px-5 py-2.5 w-fit
                  hover:border-brand hover:bg-brand hover:text-white transition-all duration-300 mt-1"
              >
                Lihat Semua Layanan
                <ArrowRight size={13} />
              </a>
            </div>

            {/* Stat numbers */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-7">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-4xl lg:text-5xl font-black text-white leading-none mb-1">
                    {s.val}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: full image anchored bottom-right, slightly larger */}
          <div className="hidden lg:flex items-end justify-end pb-0 pr-0 overflow-hidden">
            <div className="relative w-full max-w-[440px] aspect-[3/4] -mb-1 -mr-1">
              <div className="absolute inset-0 bg-[var(--support)]/10 z-10" />
              <Image
                src="/img/konten_gambar_2.png"
                alt="REACreative.idn — Hasil Karya Digital"
                fill
                className="object-contain object-right-bottom grayscale contrast-[1.1] opacity-75"
                sizes="440px"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[var(--support)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Tertarik Proyek Serupa?
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] mb-8 max-w-xl mx-auto leading-relaxed">
            Konsultasikan kebutuhan Anda dan kami akan memetakan solusi terbaik sesuai budget dan timeline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/628971302817?text=Halo%20REACreative%2C%20saya%20ingin%20konsultasi%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand text-white font-semibold px-7 py-3.5 rounded-lg
                hover:bg-[#c41526] transition-colors duration-200 shadow-[0_8px_30px_rgba(225,29,46,0.35)]"
            >
              <MessageCircle size={18} />
              Konsultasi via WhatsApp
            </a>
            <Link
              href="/layanan"
              className="inline-flex items-center gap-2 text-white/70 font-medium text-sm border border-white/20 px-6 py-3.5 rounded-lg
                hover:text-white hover:border-white/40 transition-all duration-200"
            >
              Lihat Semua Layanan
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
