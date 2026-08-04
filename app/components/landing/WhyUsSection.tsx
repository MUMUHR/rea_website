import Image from "next/image";
import { Rocket, Code2, LifeBuoy, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <Rocket size={20} className="text-brand" />,
    title: "Pengerjaan Cepat & Terstruktur",
    desc: "Timeline jelas, milestone transparan. Kami kerja dengan sistem yang sudah terbukti menghemat waktu tanpa mengorbankan kualitas.",
  },
  {
    icon: <Code2 size={20} className="text-brand" />,
    title: "Teknologi Modern & Scalable",
    desc: "Dibangun dengan stack terkini — Next.js, React, dan sistem yang siap tumbuh bersama bisnis Anda.",
  },
  {
    icon: <LifeBuoy size={20} className="text-brand" />,
    title: "Support After-Launch",
    desc: "Kami tidak menghilang setelah launch. Ada tim support yang siap membantu revisi, update, dan maintenance.",
  },
  {
    icon: <BarChart3 size={20} className="text-brand" />,
    title: "Fokus pada Hasil Bisnis",
    desc: "Desain bukan sekadar cantik — setiap keputusan visual diarahkan untuk meningkatkan konversi dan kepercayaan pengunjung.",
  },
];

export default function WhyUsSection() {
  return (
    <section
      id="tentang"
      className="py-24 bg-[var(--bg-alt)]"
      aria-labelledby="whyus-heading"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Image with badge & L-frame ── */}
          <div className="relative reveal">
            {/* L-shape red corner frame (top-left) */}
            <div
              className="absolute -top-4 -left-4 w-16 h-16 border-l-4 border-t-4 border-brand rounded-tl-sm z-10"
              aria-hidden="true"
            />

            {/* Main image container */}
            <div className="relative rounded-lg overflow-hidden shadow-md aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=700&h=860&fit=crop"
                alt="Tim REACreative mengerjakan project digital yang real dan berdampak"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle dark vignette bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
            </div>

            {/* "Real / Project Focused" badge — overlap bottom-right */}
            <div
              className="absolute bottom-5 right-5 bg-brand text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md shadow-brand z-10"
              aria-label="Real Project Focused"
            >
              Real · Project Focused
            </div>

            {/* L-shape dark corner (bottom-right) */}
            <div
              className="absolute -bottom-4 -right-4 w-16 h-16 border-r-4 border-b-4 border-dayum rounded-br-sm z-0"
              aria-hidden="true"
            />
          </div>

          {/* ── Right: Feature List ── */}
          <div className="flex flex-col gap-8 reveal reveal-delay-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand block mb-3">
                Kenapa Memilih Kami
              </span>
              <h2
                id="whyus-heading"
                className="text-display-md font-bold text-[var(--text)] leading-tight"
              >
                Bukan Sekadar{" "}
                <span className="text-brand">Tampilan</span>
                ,{" "}
                <br />
                Tapi Solusi Nyata
              </h2>
              <p className="text-[var(--text-muted)] mt-3 leading-relaxed">
                Setiap project yang kami kerjakan dirancang untuk memberikan dampak
                nyata pada bisnis Anda — bukan sekadar memenuhi checklist.
              </p>
            </div>

            <ul className="flex flex-col gap-4" role="list">
              {features.map((feature, idx) => (
                <li
                  key={feature.title}
                  className="group flex items-start gap-4 bg-white border border-[var(--border-light)] rounded-md p-4 shadow-sm hover:border-brand hover:shadow-brand transition-all duration-250 cursor-default reveal"
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-md bg-red-50 flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text)] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
