"use client";

import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import Image from "next/image";
import { Service } from "@/lib/data";

interface ServiceCardsProps {
  initialServices?: Service[];
}

const defaultServices = [
  {
    id: "1",
    number: "01",
    title: "Website",
    description: "Tampilan profesional untuk memperkuat kredibilitas bisnis, layanan, portofolio, dan identitas brand Anda di dunia digital.",
    items: [
      "Landing Page",
      "Website Artikel & Berita",
      "Sistem Terintegrasi Custom",
      "Website Company Profile",
      "Website E-Commerce",
      "Dashboard & Data Management",
    ],
    icon_name: "Globe",
    show_on_homepage: true,
    sort_order: 1,
    is_active: true,
  },
  {
    id: "2",
    number: "02",
    title: "Mobile App",
    description: "Aplikasi mobile yang memperkuat kredibilitas bisnis dan identitas brand Anda di dunia digital.",
    items: [
      "Aplikasi Mobile Android & iOS",
      "Aplikasi E-Commerce",
      "Aplikasi Bisnis & Manajemen",
      "Aplikasi Layanan",
      "Booking & Reservasi",
      "Aplikasi Custom",
    ],
    icon_name: "Smartphone",
    show_on_homepage: true,
    sort_order: 2,
    is_active: true,
  },
  {
    id: "3",
    number: "03",
    title: "Desktop App",
    description: "Aplikasi desktop yang memperkuat operasional bisnis Anda dengan sistem yang andal dan mudah digunakan.",
    items: [
      "Sistem Informasi Manajemen",
      "Aplikasi Administrasi",
      "Point of Sale",
      "Pengolahan Data",
      "Manajemen Bisnis",
      "Aplikasi Desktop Custom",
    ],
    icon_name: "Monitor",
    show_on_homepage: true,
    sort_order: 3,
    is_active: true,
  },
];

export default function ServiceCards({ initialServices = defaultServices }: ServiceCardsProps) {
  const [services, setServices] = useState<Service[]>(initialServices);

  useEffect(() => {
    const saved = localStorage.getItem("rea_services");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter homepage-only services to match layout
          setServices(parsed.filter((s: Service) => s.show_on_homepage));
        }
      } catch (e) {
        console.error("Failed to parse services from localStorage", e);
      }
    } else {
      localStorage.setItem("rea_services", JSON.stringify(initialServices));
    }
  }, []);
  return (
    <section
      id="layanan"
      className="relative bg-dayum overflow-hidden"
      aria-labelledby="layanan-heading"
    >
      {/* Subtle background decoration textures */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-[#e11d2e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#e11d2e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24">

        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16 reveal">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e11d2e] block mb-3">
              Layanan Utama
            </span>
            <h2
              id="layanan-heading"
              className="text-display-lg text-white leading-tight font-black"
            >
              Kami Mengubah Ide Menjadi <span className="text-[#e11d2e]">Produk Digital</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:pt-12">
            <p className="text-gray-400 font-semibold leading-relaxed text-sm">
              Kami merancang dan membangun produk digital yang bukan hanya menarik secara visual, tetapi juga fungsional, mudah digunakan, dan siap membantu kebutuhan operasional serta perkembangan bisnis Anda.
            </p>
            <a
              href="/layanan"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#e11d2e] hover:text-white transition-colors"
            >
              Lihat Semua Layanan <Icons.ArrowRight size={14} className="animate-pulse" />
            </a>
          </div>
        </div>

        {/* Dynamic Layout: Side-by-side illustration and cards grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Mockup Illustration Card (incorporating konten_gambar_1.png) */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-white/5 bg-[#121115]/80 shadow-2xl flex flex-col justify-between p-6 group/img min-h-[380px] lg:min-h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none transition-opacity group-hover/img:opacity-100 opacity-60" />
            
            <div className="relative z-10 space-y-1.5">
              <span className="text-[10px] font-bold tracking-widest text-[#e11d2e] uppercase block">
                Solusi Terintegrasi
              </span>
              <h4 className="text-sm font-black text-white leading-tight">
                Teknologi Andal Untuk Efisiensi & Skalabilitas Bisnis
              </h4>
            </div>

            {/* Clean Illustration Frame */}
            <div className="relative w-full h-48 lg:h-64 mt-6 rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-black">
              <Image
                src="/img/konten_gambar_1.png"
                alt="Solusi Digital REACreative"
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                sizes="(max-w-768px) 100vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121115]/50 to-transparent" />
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                Kami memastikan setiap platform memiliki desain responsif, arsitektur modular, dan kecepatan akses yang optimal.
              </p>
            </div>
          </div>

          {/* Right Column: Service Cards Grid */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {services.map((svc, idx) => {
              const IconComponent = (Icons as any)[svc.icon_name || "Globe"] || Icons.Globe;

              return (
                <article
                  key={svc.id}
                  className="group relative bg-[#121115]/65 border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Card Icon & Header */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-red-950/50 text-[#e11d2e] border border-red-900/30 flex items-center justify-center transition-colors group-hover:bg-[#e11d2e] group-hover:text-white">
                        <IconComponent size={20} />
                      </div>
                      <span className="text-xl font-black text-white/5 select-none pointer-events-none tabular-nums">
                        {svc.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#e11d2e] transition-colors">{svc.title}</h3>
                      <p className="text-xs text-gray-300 leading-relaxed font-semibold">
                        {svc.description}
                      </p>
                    </div>

                    {/* Items List */}
                    {svc.items && svc.items.length > 0 && (
                      <ul className="grid grid-cols-2 gap-1.5 pt-3 border-t border-white/5" role="list">
                        {svc.items.slice(0, 4).map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-1.5 text-[10px] text-gray-300 font-semibold"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#e11d2e]/70 flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 mt-4 border-t border-white/5">
                    <a
                      href="/layanan"
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#e11d2e] hover:text-white transition-colors"
                      aria-label={`Explore more tentang ${svc.title}`}
                    >
                      Explore More <Icons.ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                </article>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
