import type { Metadata } from "next";
import SubpageLayout from "@/app/components/landing/SubpageLayout";
import PortofolioClient from "./PortofolioClient";
import { getAllPortfolio, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portofolio Proyek — REACreative.idn",
  description:
    "Lihat hasil karya dan portofolio proyek REACreative — dari portal berita, e-commerce, company profile, sistem informasi akademik, hingga integrasi API.",
};

export const dynamic = "force-dynamic";

export default async function PortofolioPage() {
  const [items, settings] = await Promise.all([
    getAllPortfolio(),
    getSiteSettings(),
  ]);

  const stats = [
    { val: settings.stats_projects || "120+", label: "Proyek Selesai" },
    { val: settings.stats_clients || "80+", label: "Klien Nasional" },
    { val: settings.stats_years || "3+", label: "Tahun Pengalaman" },
  ];

  return (
    <SubpageLayout>
      {/* ── Page Header ── */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#fff5f5] to-white border-b border-[var(--border-light)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <p className="text-xs font-bold tracking-[3px] uppercase text-brand mb-3">
            Hasil Karya Kami
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text)] leading-none mb-6">
            Portofolio <span className="text-brand">Proyek</span>
          </h1>
          <p className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl leading-relaxed">
            Berikut adalah beberapa sistem informasi, aplikasi web, portal berita, dan website
            yang telah kami kerjakan untuk mendukung kelancaran operasional bisnis dan
            representasi digital klien kami.
          </p>
        </div>
      </section>

      {/* Client component handles filter + grid + stats + CTA */}
      <PortofolioClient initialItems={items} stats={stats} />
    </SubpageLayout>
  );
}
