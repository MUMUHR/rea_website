import Link from "next/link";
import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";

// currentYear must be computed client-side in Next.js App Router
// to avoid "used new Date() before accessing uncached data" error
const CURRENT_YEAR = 2026; // Update annually, or use a client component

const footerLinks = {
  layanan: [
    { label: "Website", href: "/#layanan" },
    { label: "Mobile App", href: "/#layanan" },
    { label: "Desktop App", href: "/#layanan" },
    { label: "E-Commerce", href: "/#layanan" },
    { label: "Sistem Custom", href: "/#layanan" },
  ],
  bisnis: [
    { label: "Tentang Kami", href: "/#tentang" },
    { label: "Portofolio", href: "/#portofolio" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
    { label: "QR Generator", href: "/qr-generator" },
  ],
  kontak: [
    { label: "reacreative.idn@gmail.com", href: "mailto:reacreative.idn@gmail.com" },
    { label: "WhatsApp: +62 812 3456 7890", href: "https://wa.me/6281234567890" },
    { label: "Instagram @reacreative.idn", href: "https://instagram.com/reacreative.idn" },
  ],
};

const socials = [
  { icon: <Instagram size={16} />, href: "https://instagram.com/reacreative.idn", label: "Instagram REACreative" },
  { icon: <Facebook size={16} />, href: "https://facebook.com/reacreative", label: "Facebook REACreative" },
  { icon: <Youtube size={16} />, href: "https://youtube.com/reacreative", label: "YouTube REACreative" },
  { icon: <Twitter size={16} />, href: "https://twitter.com/reacreative", label: "Twitter REACreative" },
];

export default function Footer() {
  const currentYear = CURRENT_YEAR;

  return (
    <footer className="bg-[var(--support)] text-[var(--text-inv)]" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Main Footer Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-[var(--border-dark)]">

          {/* Column 1: Brand + Desc */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-4"
              aria-label="REACreative.idn — Kembali ke beranda"
            >
              <span className="text-xl font-bold text-white">
                REA<span className="text-brand">CREATIVE</span>
                <span className="text-white/40 font-normal">.idn</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-inv-muted)] leading-relaxed mb-6 max-w-[260px]">
              Membantu bisnis Indonesia tumbuh secara digital melalui website,
              aplikasi, dan sistem yang fungsional dan menarik.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2" role="list" aria-label="Social media REACreative">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-[var(--border-dark)] flex items-center justify-center text-[var(--text-inv-subtle)] hover:bg-brand hover:border-brand hover:text-white transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Layanan */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand mb-4">
              Layanan
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {footerLinks.layanan.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-inv-muted)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tautan Bisnis */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand mb-4">
              Tautan Bisnis
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {footerLinks.bisnis.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-inv-muted)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Kontak */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand mb-4">
              Kontak
            </h3>
            <ul className="flex flex-col gap-2.5" role="list">
              {footerLinks.kontak.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-inv-muted)] hover:text-white transition-colors duration-200 break-words"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6">
          <p className="text-xs text-[var(--text-inv-subtle)]">
            &copy; {currentYear} REACreative.idn — All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="text-xs text-[var(--text-inv-subtle)] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/refund-policy"
              className="text-xs text-[var(--text-inv-subtle)] hover:text-white transition-colors"
            >
              Kebijakan Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
