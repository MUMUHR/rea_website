import { Check } from "lucide-react";
import Button from "./Button";

const pricingFeatures = [
  "Domain aktif untuk identitas brand yang lebih meyakinkan.",
  "Hosting siap pakai agar website bisa langsung online",
  "SSL aktif untuk keamanan dan kepercayaan pengunjung.",
  "Konsultasi langsung agar fitur yang dibuat tepat sesuai kebutuhan",
];

export default function PricingSection() {
  return (
    <section
      id="harga"
      className="relative py-24 lg:py-32 bg-[#FAFAFA] overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      <div className="relative max-w-[1900px] mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
        {/* ── 2-Column Layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* ── Left Column: Middle Content Only (Shapes positioned absolutely at top & bottom section edges) ── */}
          <div className="relative flex flex-col items-start justify-center min-h-0 lg:min-h-[460px] py-0 lg:py-16 px-0 lg:px-8 mb-8 lg:mb-0 reveal">
            {/* Top Red Shape Block — attached to top edge of section */}
            <div
              className="hidden lg:block absolute -top-24 lg:-top-40 left-0 right-0 h-44 sm:h-56 bg-brand rounded-br-[2.5rem] rounded-bl-[2.5rem] shadow-sm pointer-events-none"
              aria-hidden="true"
            />

            {/* Middle Content — Clean text & button ONLY */}
            <div className="flex flex-col items-start gap-4 relative z-10 my-auto">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
                Mulai Dari <span className="text-brand">Rp 800.000</span>
              </h3>
              <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-lg">
                Mulai pembuatan website dari Rp 800.000 dan sudah include domain,
                hosting, serta SSL. Ceritakan kebutuhan Anda, lalu kami bantu arahkan
                solusi terbaik lewat konsultasi.
              </p>
              <div className="mt-2">
                <Button
                  variant="filled"
                  href="https://wa.me/6281234567890?text=Halo%20REACreative%2C%20saya%20ingin%20konsultasi%20harga"
                  id="pricing-cta-left"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 text-base rounded-xl"
                >
                  Konsultan sekarang
                </Button>
              </div>
            </div>

            {/* Bottom Red Shape Block — attached to bottom edge of section */}
            <div
              className="hidden lg:block absolute -bottom-24 lg:-bottom-44 left-0 right-0 h-44 sm:h-56 bg-brand rounded-tr-[2.5rem] rounded-tl-[2.5rem] shadow-sm pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* ── Right Column: Clean White Card ── */}
          <div className="relative bg-white border-t-2 border-red-600 rounded-[2rem] lg:rounded-[2.5rem] p-6 sm:p-12 xl:p-14 shadow-2xl reveal reveal-delay-2 flex flex-col gap-6 z-20">
            {/* Header row with Top Right Black Pill Badge */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <p className="text-base font-bold text-[var(--text)] mb-1">
                  Mulai Dari Rp 800.000
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[var(--text)] tracking-tight">
                    Rp 800.000
                  </span>
                  <span className="text-sm text-[var(--text-muted)] font-normal">
                    mulai dari
                  </span>
                </div>
              </div>
              <span className="bg-[#121115] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full self-start sm:self-auto flex-shrink-0 shadow-sm">
                Penawaran Terbatas
              </span>
            </div>

            {/* Highlighted Red Feature */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm sm:text-base font-bold text-brand">
                Sudah include domain, hosting, dan SSL
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Penawaran ini cocok untuk Anda yang ingin segera punya website profesional
              dengan alur yang simpel. Tinggal konsultasikan kebutuhan bisnis Anda, lalu
              kami bantu eksekusinya.
            </p>

            {/* Features Checklist */}
            <ul className="flex flex-col gap-3.5 my-2" role="list">
              {pricingFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check size={16} className="text-brand" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


         <div className="hidden lg:flex absolute bg-white/70 border border-gray-100 rounded-[2.5rem] -top-[30%] w-[33%] right-64 p-8 sm:p-12 xl:p-14 shadow-lg reveal reveal-delay-2 flex-col gap-6 z-10 opacity-40 pointer-events-none" aria-hidden="true">
            {/* Header row with Top Right Black Pill Badge */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-base font-bold text-[var(--text)] mb-1">
                  Mulai Dari Rp 800.000
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[var(--text)] tracking-tight">
                    Rp 800.000
                  </span>
                  <span className="text-sm text-[var(--text-muted)] font-normal">
                    mulai dari
                  </span>
                </div>
              </div>
              <span className="bg-[#121115] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full flex-shrink-0 shadow-sm">
                Penawaran Terbatas
              </span>
            </div>

            {/* Highlighted Red Feature */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm sm:text-base font-bold text-brand">
                Sudah include domain, hosting, dan SSL
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Penawaran ini cocok untuk Anda yang ingin segera punya website profesional
              dengan alur yang simpel. Tinggal konsultasikan kebutuhan bisnis Anda, lalu
              kami bantu eksekusinya.
            </p>

            {/* Features Checklist */}
            <ul className="flex flex-col gap-3.5 my-2" role="list">
              {pricingFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check size={16} className="text-brand" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="hidden lg:flex absolute bg-white/70 border border-gray-100 rounded-[2.5rem] -bottom-[3%] w-[33%] right-64 p-8 sm:p-12 xl:p-14 shadow-lg reveal reveal-delay-2 flex-col gap-6 z-10 opacity-40 pointer-events-none" aria-hidden="true">
            {/* Header row with Top Right Black Pill Badge */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-base font-bold text-[var(--text)] mb-1">
                  Mulai Dari Rp 800.000
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-[var(--text)] tracking-tight">
                    Rp 800.000
                  </span>
                  <span className="text-sm text-[var(--text-muted)] font-normal">
                    mulai dari
                  </span>
                </div>
              </div>
              <span className="bg-[#121115] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full flex-shrink-0 shadow-sm">
                Penawaran Terbatas
              </span>
            </div>

            {/* Highlighted Red Feature */}
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-sm sm:text-base font-bold text-brand">
                Sudah include domain, hosting, dan SSL
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
              Penawaran ini cocok untuk Anda yang ingin segera punya website profesional
              dengan alur yang simpel. Tinggal konsultasikan kebutuhan bisnis Anda, lalu
              kami bantu eksekusinya.
            </p>

            {/* Features Checklist */}
            <ul className="flex flex-col gap-3.5 my-2" role="list">
              {pricingFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check size={16} className="text-brand" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>


    </section>
  );
}
