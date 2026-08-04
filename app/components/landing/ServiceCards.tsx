import { Globe, Smartphone, Monitor, ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    num: "01",
    icon: <Globe size={20} className="text-white" />,
    title: "Website",
    desc: "Tampilan profesional untuk memperkuat kredibilitas bisnis, layanan, portofolio, dan identitas brand Anda di dunia digital.",
    items: [
      "Landing Page",
      "Website Artikel & Berita",
      "Sistem Terintegrasi Custom",
      "Website Company Profile",
      "Website E-Commerce",
      "Dashboard & Data Management",
    ],
    href: "/#layanan",
  },
  {
    num: "02",
    icon: <Smartphone size={20} className="text-white" />,
    title: "Mobile App",
    desc: "Aplikasi mobile yang memperkuat kredibilitas bisnis dan identitas brand Anda di dunia digital.",
    items: [
      "Aplikasi Mobile Android & iOS",
      "Aplikasi E-Commerce",
      "Aplikasi Bisnis & Manajemen",
      "Aplikasi Layanan",
      "Booking & Reservasi",
      "Aplikasi Custom",
    ],
    href: "/#layanan",
  },
  {
    num: "03",
    icon: <Monitor size={20} className="text-white" />,
    title: "Desktop App",
    desc: "Aplikasi desktop yang memperkuat operasional bisnis Anda dengan sistem yang andal dan mudah digunakan.",
    items: [
      "Sistem Informasi Manajemen",
      "Aplikasi Administrasi",
      "Point of Sale",
      "Pengolahan Data",
      "Manajemen Bisnis",
      "Aplikasi Desktop Custom",
    ],
    href: "/#layanan",
  },
];

export default function ServiceCards() {
  return (
    <section
      id="layanan"
      className="relative bg-dayum overflow-hidden"
      aria-labelledby="layanan-heading"
    >
      {/* Background image — subtle texture bottom-left */}
      <div
        className="absolute  left-0 top-0 w-1/3 h-full  pointer-events-none opacity-[0.12]"
        aria-hidden="true"
      >
        <Image
          src="/img/gambar_section_3.png"
          alt=""
          fill
          className="object-cover object-right-top"
          sizes="20vw"
        />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24">

        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16 reveal">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand block mb-3">
              Layanan Utama
            </span>
            <h2
              id="layanan-heading"
              className="text-display-lg font-bold text-white leading-tight"
            >
              Kami Mengubah Ide Menjadi{" "}
              <span className="text-brand">Produk Digital</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 lg:pt-12">
            <p className="text-[var(--text-inv-muted)] leading-relaxed">
              Kami merancang dan membangun produk digital yang bukan hanya
              menarik secara visual, tetapi juga fungsional, mudah digunakan,
              dan siap membantu kebutuhan bisnis Anda.
            </p>
            <a
              href="/#layanan-detail"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover transition-colors"
            >
              Lihat Semua Layanan <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <article
              key={svc.title}
              className="service-card group relative bg-[var(--support)] rounded-lg p-7 flex flex-col gap-5 reveal"
              style={{ "--reveal-delay": `${idx * 100}ms` } as React.CSSProperties}
            >
              {/* Card number — top right decorative */}
              <span
                className="absolute top-5 right-6 text-4xl font-black text-white/[0.06] select-none pointer-events-none leading-none tabular-nums"
                aria-hidden="true"
              >
                {svc.num}
              </span>

              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-brand flex items-center justify-center">
                {svc.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-bold text-white">{svc.title}</h3>
                <p className="text-sm text-[var(--text-inv-muted)] leading-relaxed">
                  {svc.desc}
                </p>

                <ul className="flex flex-col gap-1.5 mt-1" role="list">
                  {svc.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[var(--text-inv-muted)]"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand flex-shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a
                href={svc.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3 transition-all duration-200 group-hover:text-brand"
                aria-label={`Explore more tentang ${svc.title}`}
              >
                Explore More <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
