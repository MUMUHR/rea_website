import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Handshake,
  Lightbulb,
  Users,
  ArrowRight,
  MessageCircle,
  Eye,
  Target,
  MapPin,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import SubpageLayout from "@/app/components/landing/SubpageLayout";
import { getSiteSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tentang Kami — REACreative.idn",
  description:
    "Pelajari lebih lanjut tentang REACreative.idn — profil perusahaan, visi & misi, nilai-nilai, dan tim kami sebagai mitra teknologi digital terpercaya di Indonesia.",
};

export const dynamic = "force-dynamic";

const values = [
  {
    icon: Shield,
    title: "Keamanan & Kepatuhan",
    desc: "Sistem kami dibangun mengikuti standar industri, aman dari serangan siber, dan terintegrasi payment gateway resmi.",
  },
  {
    icon: Handshake,
    title: "Kepercayaan Klien",
    desc: "Membangun transparansi kerja, tanpa biaya tersembunyi, dengan dukungan DP aman 50% di awal.",
  },
  {
    icon: Lightbulb,
    title: "Inovasi Kreatif",
    desc: "Memilih arsitektur teknologi paling pas agar performa website andal dan responsif bagi target pasar Anda.",
  },
  {
    icon: Users,
    title: "Profesional Terarah",
    desc: "Menjaga tenggat waktu proyek secara konsisten dan menjaga jalur komunikasi yang mudah dipahami.",
  },
];

const misi = [
  "Mengembangkan aplikasi web dan mobile berkualitas dengan performa optimal dan desain antarmuka modern.",
  "Menyediakan integrasi sistem (API) yang aman dan andal untuk menyederhanakan alur operasional klien.",
  "Menjamin proses KYC/KYB dan kepatuhan pembayaran melalui platform payment gateway resmi.",
  "Memberikan dukungan teknis (maintenance) berkelanjutan demi menjamin kelancaran sistem digital mitra.",
];

export default async function TentangPage() {
  const settings = await getSiteSettings();

  const stats = [
    { val: settings.stats_projects || "120+", label: "Proyek Selesai" },
    { val: settings.stats_clients || "80+", label: "Klien Nasional" },
    { val: settings.stats_years || "3+", label: "Tahun Pengalaman" },
  ];

  const waNumber = settings.whatsapp_number || "628971302817";
  const emailContact = settings.email_contact || "reacreative.idn@gmail.com";
  const address = settings.address || "Kota Lhokseumawe, Aceh, Indonesia";
  const officeHours = settings.office_hours || "Senin – Sabtu, 08.00 – 22.00 WIB";

  return (
    <SubpageLayout>
      {/* ── Page Header ── */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-[#fff5f5] to-white border-b border-[var(--border-light)] overflow-hidden">
          <div
            className="hidden lg:block absolute bg-brand rounded-sm"
            style={{
              width: "50%",
              height: "170%",
              top: "-40%",
              left: "60%",
              transform: "rotate(-20deg)",
              zIndex: 2,
            }}
            aria-hidden="true"
          />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <p className="text-xs font-bold tracking-[3px] uppercase text-brand mb-3">
            Profil Perusahaan
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text)] leading-none mb-6">
            Tentang <span className="text-brand">Reacreative</span>
          </h1>
          <p className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl leading-relaxed">
            Agensi penyedia solusi digital komprehensif yang bergerak di bidang pembuatan
            website, pengembangan sistem informasi, dan aplikasi mobile kustom.
          </p>
        </div>
      </section>

      {/* ── About Grid (Photo + Text) ── */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Photo */}
            <div className="relative">
              {/* corner accents */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-4 border-l-4 border-brand rounded-tl-lg" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-4 border-r-4 border-brand rounded-br-lg" />
              
              <div className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] w-full rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(18,17,21,0.14)] bg-white">
                <Image
                  src="/img/gambar_2.png"
                  alt="Tim REACreative.idn"
                  fill
                  className="object-contain object-top p-2"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* badge */}
                <div className="absolute bottom-5 left-5 bg-brand text-white px-5 py-3 rounded-xl text-sm font-bold shadow-[0_8px_24px_rgba(225,29,46,0.4)] z-10">
                  Sejak {settings.founded_year || "2023"}
                </div>
              </div>

              {/* Stat pills floating */}
              <div className="absolute -right-6 top-1/3 hidden xl:flex flex-col gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white shadow-[0_4px_20px_rgba(18,17,21,0.12)] border border-[var(--border-light)] rounded-xl px-5 py-3 text-center min-w-[110px]"
                  >
                    <p className="text-2xl font-black text-brand leading-none">{s.val}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <p className="text-xs font-bold tracking-[3px] uppercase text-brand mb-3 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-brand" />
                Siapa Kami
              </p>
              <h2 className="text-3xl lg:text-4xl font-black text-[var(--text)] tracking-tight leading-tight mb-6">
                Kemitraan Teknologi Andal untuk Menjawab{" "}
                <span className="text-brand">Tantangan Bisnis</span> Anda
              </h2>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                <strong className="text-[var(--text)]">REACreative</strong> (reacreative.idn) adalah
                agensi penyedia solusi digital komprehensif yang bergerak di bidang pembuatan website,
                pengembangan sistem informasi, dan aplikasi mobile kustom.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                Didirikan dengan tekad untuk mempermudah digitalisasi bagi UMKM, instansi pendidikan,
                dan korporasi, kami menghadirkan layanan berkualitas tinggi, berorientasi hasil, serta
                mengedepankan keamanan transaksi data.
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                Kami melayani klien dari berbagai sektor di seluruh penjuru Indonesia dari markas
                operasional kami di Kota Lhokseumawe, Aceh.
              </p>

              {/* Stats row (mobile / non-xl) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 xl:hidden mb-8">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="border border-[var(--border-light)] rounded-xl p-3 sm:p-4 text-center hover:border-brand/40 hover:shadow-sm transition-all"
                  >
                    <p className="text-xl sm:text-2xl font-black text-brand leading-none">{s.val}</p>
                    <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div className="flex flex-col gap-3">
                {[
                  { icon: MapPin, text: address },
                  { icon: Phone, text: waNumber.startsWith("62") ? `+${waNumber.slice(0, 2)} ${waNumber.slice(2, 5)}-${waNumber.slice(5, 9)}-${waNumber.slice(9)}` : waNumber },
                  { icon: Mail, text: emailContact },
                  { icon: Clock, text: officeHours },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.text} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                      <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-brand flex-shrink-0">
                        <Icon size={14} />
                      </span>
                      {c.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section className="py-20 bg-[var(--bg-alt)] border-y border-[var(--border-light)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[3px] uppercase text-brand mb-3">
              Arah Perusahaan
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-[var(--text)] tracking-tight">
              Visi & Misi Kami
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Visi */}
            <div className="bg-white border border-[var(--border-light)] rounded-2xl p-10 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(18,17,21,0.08)] transition-all duration-300">
              <Eye size={32} className="text-brand mb-5" />
              <h3 className="text-xl font-bold text-[var(--text)] mb-4">Visi Perusahaan</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Menjadi mitra teknologi terpercaya di Indonesia yang menghasilkan solusi digital
                inovatif, aman, dan berdaya saing global demi mendukung pertumbuhan ekosistem bisnis
                digital dan profesional di tanah air.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white border border-[var(--border-light)] rounded-2xl p-10 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(18,17,21,0.08)] transition-all duration-300">
              <Target size={32} className="text-brand mb-5" />
              <h3 className="text-xl font-bold text-[var(--text)] mb-4">Misi Perusahaan</h3>
              <ul className="flex flex-col gap-3">
                {misi.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-[var(--text-muted)] text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-red-50 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nilai-Nilai ── */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-[3px] uppercase text-brand mb-3">
              Nilai-Nilai Kami
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-[var(--text)] tracking-tight">
              Fondasi Kerja Reacreative
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group bg-white border border-[var(--border-light)] rounded-2xl p-7 text-center
                    hover:border-brand/30 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(18,17,21,0.08)]
                    transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-brand mx-auto mb-5 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text)] mb-3">{v.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── High-Res Photo Section ── */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[440px] lg:aspect-[21/8] w-full flex items-center">
          <Image
            src="/img/team_banner_dark.png"
            alt="REACreative.idn — Tim & Suasana Kerja Studio"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121115] via-[#121115]/85 to-transparent" />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 w-full py-16">
            <p className="text-brand text-xs font-bold tracking-[3px] uppercase mb-3">Tim Kami</p>
            <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-xl">
              Developer & Designer yang <span className="text-[#ff5a67]">Berpengalaman</span>
            </h2>
            <p className="text-white/70 max-w-md text-base leading-relaxed mb-8">
              Tim kami terdiri dari developer full-stack, UI/UX designer, dan konsultan teknologi
              yang berpengalaman di berbagai domain industri.
            </p>
            <Link
              href="/hubungi"
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-6 py-3.5 rounded-lg
                hover:bg-[#c41526] transition-colors duration-200 shadow-[0_8px_24px_rgba(225,29,46,0.35)]"
            >
              Hubungi Kami
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[var(--support)]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Siap Berkolaborasi?
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] mb-8 max-w-xl mx-auto leading-relaxed">
            Hubungi kami untuk konsultasi gratis dan mulai bangun solusi digital terbaik untuk bisnis Anda.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${waNumber}?text=Halo%20REACreative%2C%20saya%20ingin%20konsultasi%20gratis.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand text-white font-semibold px-7 py-3.5 rounded-lg
                hover:bg-[#c41526] transition-colors duration-200 shadow-[0_8px_30px_rgba(225,29,46,0.35)]"
            >
              <MessageCircle size={18} />
              Konsultasi Gratis
            </a>
            <Link
              href="/layanan"
              className="inline-flex items-center gap-2 text-white/70 font-medium text-sm border border-white/20 px-6 py-3.5 rounded-lg
                hover:text-white hover:border-white/40 transition-all duration-200"
            >
              Lihat Layanan
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
