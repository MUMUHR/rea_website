import type { Metadata } from "next";
import Link from "next/link";
import * as Icons from "lucide-react";
import SubpageLayout from "@/app/components/landing/SubpageLayout";
import { getAllServices, getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Layanan Kami — REACreative.idn",
  description:
    "Layanan digital REACreative meliputi pembuatan website, aplikasi web, sistem akademik, landing page, company profile, integrasi API, dan custom software. Mulai dari Rp 800.000.",
};

export const dynamic = "force-dynamic";

const guarantees = [
  { icon: "ShieldCheck", title: "Garansi Revisi", desc: "Revisi bebas hingga kamu puas dengan hasilnya" },
  { icon: "Zap", title: "Proses Cepat", desc: "Estimasi pengerjaan sesuai kesepakatan di awal" },
  { icon: "Handshake", title: "DP Aman 50%", desc: "Bayar separuh di awal, sisanya setelah selesai" },
  { icon: "Headphones", title: "Support 24/7", desc: "Tim siap membantu di setiap tahap pengerjaan" },
  { icon: "FileText", title: "Full Documentation", desc: "Dokumen teknis dan panduan lengkap diberikan" },
];

export default async function LayananPage() {
  const [services, settings] = await Promise.all([
    getAllServices(),
    getSiteSettings(),
  ]);

  const waNumber = settings.whatsapp_number || "628971302817";

  return (
    <SubpageLayout>
      {/* ── Page Header ── */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-[#fff5f5] to-white border-b border-[var(--border-light)] overflow-hidden">
        <div
            className="hidden lg:block absolute bg-brand rounded-sm"
            style={{
              width: "50%",
              height: "180%",
              top: "-40%",
              left: "60%",
              transform: "rotate(-20deg)",
              zIndex: 2,
            }}
            aria-hidden="true"
          />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <p className="text-xs font-bold tracking-[3px] uppercase text-brand mb-3">
            Solusi Teknologi Terintegrasi
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text)] leading-none mb-6">
            Layanan <span className="text-brand">Kami</span>
          </h1>
          <p className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl leading-relaxed">
            Reacreative menyediakan berbagai layanan pengembangan produk digital untuk
            mendigitalkan proses bisnis, meningkatkan penjualan, serta memperkuat identitas
            brand Anda di pasar nasional.
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {services.map((svc) => {
              // Resolve Lucide Icon dynamically
              const IconComponent = (Icons as any)[svc.icon_name || "Globe"] || Icons.Globe;
              const waText = svc.wa_text || `Halo%20REACreative.idn%2C%20saya%20tertarik%20dengan%20Jasa%20${encodeURIComponent(svc.title)}.`;
              const waLink = `https://wa.me/${waNumber}?text=${waText}`;

              return (
                <div
                  key={svc.id}
                  className="group relative bg-white border border-[var(--border-light)] rounded-2xl p-8 flex flex-col gap-5 overflow-hidden
                    hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(18,17,21,0.10)] hover:border-transparent
                    transition-all duration-300"
                >
                  {/* top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand to-[#ff5a67] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-t-2xl" />

                  {/* number */}
                  <span className="absolute top-5 right-6 text-5xl font-black text-[var(--border-light)] select-none group-hover:text-[rgba(225,29,46,0.08)] transition-colors duration-300">
                    {svc.number}
                  </span>

                  {/* icon */}
                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 flex-shrink-0">
                    <IconComponent size={24} />
                  </div>

                  {/* content */}
                  <div className="flex flex-col flex-1 gap-3">
                    <h2 className="text-lg font-bold text-[var(--text)] leading-snug">
                      {svc.title}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
                      {svc.description}
                    </p>

                    {/* Sub-items bullet list */}
                    {svc.items && svc.items.length > 0 && (
                      <ul className="flex flex-col gap-1.5 my-2 border-t border-gray-100 pt-3" role="list">
                        {svc.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                            <span className="w-1 h-1 rounded-full bg-brand flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {svc.price_label && (
                      <p className="flex items-center gap-1.5 text-sm font-bold text-brand mt-auto pt-1">
                        <Icons.Tag size={13} />
                        {svc.price_label}
                      </p>
                    )}
                  </div>

                  {/* cta */}
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 self-start inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)] border border-[var(--border-light)] rounded-lg px-4 py-2.5
                      hover:bg-brand hover:border-brand hover:text-white transition-all duration-200"
                  >
                    Pesan Layanan
                    <Icons.ArrowRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Guarantees Strip ── */}
      <section className="py-16 bg-[var(--bg-alt)] border-y border-[var(--border-light)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {guarantees.map((g) => {
              const GuaranteeIcon = (Icons as any)[g.icon] || Icons.Shield;
              return (
                <div
                  key={g.title}
                  className="bg-white border border-[var(--border-light)] rounded-xl p-5 text-center hover:border-brand/30 hover:shadow-sm transition-all duration-200 flex flex-col items-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-50 text-brand flex items-center justify-center mb-3">
                    <GuaranteeIcon size={20} />
                  </div>
                  <p className="text-sm font-bold text-[var(--text)] mb-1">{g.title}</p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{g.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 bg-[var(--support)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <span className="inline-block bg-brand text-white text-xs font-black tracking-[3px] uppercase px-4 py-1.5 rounded-full mb-6">
            Mulai Sekarang
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Butuh Layanan Custom atau <br className="hidden md:block" />
            <span className="text-[#ff5a67]">Konsultasi Terlebih Dahulu?</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Beri tahu kami tantangan bisnis Anda. Tim analis dan pengembang kami siap membantu
            memetakan solusi teknologi yang tepat sasaran dengan budget terukur.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${waNumber}?text=Halo%20REACreative%2C%20saya%20ingin%20konsultasi%20layanan%20digital.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand text-white font-semibold px-7 py-3.5 rounded-lg
                hover:bg-[#c41526] transition-colors duration-200 shadow-[0_8px_30px_rgba(225,29,46,0.35)]"
            >
              <Icons.MessageCircle size={18} />
              Konsultasi via WhatsApp
            </a>
            <Link
              href="/portofolio"
              className="inline-flex items-center gap-2 text-white/70 font-medium text-sm border border-white/20 px-6 py-3.5 rounded-lg
                hover:text-white hover:border-white/40 transition-all duration-200"
            >
              Lihat Portofolio
              <Icons.ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
