import Image from "next/image";
import { Zap, Headphones, ArrowRight } from "lucide-react";
import Button from "./Button";

const stats = [
  { value: "120+", label: "Project Ditangani" },
  { value: "80+", label: "Klien Aktif" },
  { value: "3+", label: "Tahun Pengalaman" },
];

const trustBadges = [
  {
    icon: <Zap size={16} className="text-brand" />,
    title: "Proses Cepat",
    desc: "Bayar DP 50% setelah approval desain, sisanya setelah jadi.",
  },
  {
    icon: <Headphones size={16} className="text-brand" />,
    title: "Support 24/7",
    desc: "Konsultasi di setiap tahap project, siap bantu kapan saja.",
  },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Subtle background accent — top right */}
      <div
        className="absolute top-0 right-0 w-[55%] h-full pointer-events-none"
        aria-hidden="true"
      >
        {/* Red diagonal accent shape behind everything */}
        <div className="absolute top-0 right-0 w-full h-full">
          <svg
            viewBox="0 0 600 900"
            className="absolute top-0 right-0 h-full w-auto"
            preserveAspectRatio="xMaxYMid slice"
            aria-hidden="true"
          >
            <polygon
              points="200,0 600,0 600,900 0,900"
              fill="#E11D2E"
              opacity="0.06"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-[52%_48%] gap-12 lg:gap-16 items-center">

          {/* ── Left Column: Text ── */}
          <div className="flex flex-col gap-6 reveal">
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 self-start">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                Custom Website · Sistem · Mobile App
              </span>
            </div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="text-display-xl font-bold text-[var(--text)] leading-[1.1]"
            >
              Bangun Website dan{" "}
              <br className="hidden sm:block" />
              Sistem{" "}
              <span className="text-brand">Lebih Cepat</span>{" "}
              untuk{" "}
              <br className="hidden sm:block" />
              Bisnis yang Ingin{" "}
              <span className="text-brand">Naik Level</span>
            </h1>

            {/* Description */}
            <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-[520px]">
              Kami membantu Anda membangun website, e-commerce, sistem kasir,
              hingga aplikasi mobile yang siap jualan dan operasional. Tampilan
              menarik, loading cepat, dan fokus pada konversi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                variant="filled"
                href="https://wa.me/6281234567890?text=Halo%20REACreative%2C%20saya%20ingin%20konsultasi%20gratis"
                id="hero-cta-primary"
                target="_blank"
                rel="noopener noreferrer"
                icon={<span className="text-xs">💬</span>}
              >
                Start From 800k
              </Button>
              <Button
                variant="ghost"
                href="/#layanan"
                id="hero-cta-secondary"
                icon={<ArrowRight size={15} />}
              >
                Jelajahi Layanan
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              {trustBadges.map((badge) => (
                <div
                  key={badge.title}
                  className="flex items-start gap-3 bg-white border border-[var(--border-light)] rounded-md p-3 flex-1 shadow-sm"
                >
                  <div className="flex-shrink-0 mt-0.5 bg-red-50 rounded p-1.5">
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text)]">
                      {badge.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-0.5">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-8 pt-4 border-t border-[var(--border-light)]">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-brand leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[var(--text-subtle)] uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Shape Composition ── */}
          <div
            className="relative flex items-center justify-center min-h-[480px] lg:min-h-[560px] reveal reveal-delay-2"
            aria-label="Visual komposisi hero REACreative"
          >
            {/* Layer 1 (back): --dayum shape, offset right-bottom, rotated */}
            <div
              className="absolute bg-dayum rounded-sm"
              style={{
                width: "88%",
                height: "85%",
                top: "7%",
                left: "8%",
                transform: "translate(20px, 20px) rotate(2.5deg)",
                zIndex: 1,
              }}
              aria-hidden="true"
            />

            {/* Layer 2 (mid): --brand red shape */}
            <div
              className="absolute bg-brand rounded-sm"
              style={{
                width: "88%",
                height: "85%",
                top: "7%",
                left: "2%",
                transform: "rotate(-1.5deg)",
                zIndex: 2,
              }}
              aria-hidden="true"
            />

            {/* Layer 3 (front): Building photo — overlaps both shapes */}
            <div
              className="absolute"
              style={{
                 width: "88%",
                height: "155%",
                top: "7%",
                left: "2%",
                zIndex: 3,
                transform: "rotate(-0.5deg)",
              }}
            >
              <Image
                src="/img/gambar_hero_section.png"
                alt="Gedung arsitektur modern — representasi produk digital REACreative yang kuat dan presisi"
                fill
                priority
                className="object-cover rounded-sm grayscale contrast-110 "
                sizes="(max-width: 768px) 90vw, 45vw"
              />
              {/* Duotone overlay — brand tint */}
              <div
                className="absolute inset-0 rounded-sm mix-blend-multiply opacity-20 bg-brand"
                aria-hidden="true"
              />
            </div>

            {/* Decorative corner accent */}
            {/* <div
              className="absolute bottom-3 left-0 z-10"
              aria-hidden="true"
            >
              <div className="w-10 h-10 border-l-4 border-b-4 border-brand rounded-bl-sm" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
