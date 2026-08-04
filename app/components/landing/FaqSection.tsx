"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: "faq-1",
    q: "Berapa lama proses pembuatan website?",
    a: "Tergantung kompleksitas. Landing page sederhana bisa selesai dalam 3–5 hari kerja. Website dengan fitur custom bisa memakan waktu 2–4 minggu. Kami akan memberikan estimasi tepat setelah konsultasi awal.",
  },
  {
    id: "faq-2",
    q: "Apakah harga Rp 800.000 sudah include domain dan hosting?",
    a: "Ya! Paket mulai Rp 800.000 sudah mencakup domain (.com/.id), hosting, SSL, dan konsultasi langsung. Tidak ada biaya tersembunyi.",
  },
  {
    id: "faq-3",
    q: "Bagaimana sistem pembayarannya?",
    a: "Sistem DP: bayar 50% di awal setelah approval desain, sisa 50% setelah website jadi dan siap launch. Kami tidak meminta full payment di depan.",
  },
  {
    id: "faq-4",
    q: "Apakah ada support setelah website selesai?",
    a: "Ada! Kami menyediakan support setelah launch untuk membantu jika ada bug, pertanyaan teknis, atau revisi minor. Untuk maintenance jangka panjang, tersedia paket terpisah.",
  },
  {
    id: "faq-5",
    q: "Apakah bisa minta revisi desain?",
    a: "Tentu. Kami menyediakan beberapa sesi revisi dalam proses pengerjaan. Jumlah revisi akan disepakati di awal kontrak sesuai paket yang dipilih.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="faq"
      className="py-24 bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl lg:max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="text-xs font-bold uppercase tracking-widest text-brand block mb-3">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-display-md font-bold text-[var(--text)]"
          >
            Pertanyaan yang <span className="text-brand">Sering Ditanya</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 reveal reveal-delay-1">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-md transition-all duration-250 ${
                  isOpen
                    ? "border-brand shadow-brand"
                    : "border-[var(--border-light)] hover:border-brand/30"
                }`}
              >
                <button
                  id={faq.id}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-answer`}
                >
                  <span className="text-sm font-semibold text-[var(--text)]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-brand transition-transform duration-250 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`${faq.id}-answer`}
                  role="region"
                  aria-labelledby={faq.id}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-[var(--text-muted)] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <p className="text-center text-sm text-[var(--text-muted)] mt-8 reveal reveal-delay-2">
          Masih ada pertanyaan?{" "}
          <a
            href="https://wa.me/6281234567890?text=Halo%20REACreative%2C%20saya%20punya%20pertanyaan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand hover:text-brand-hover underline-offset-2 hover:underline transition-colors"
          >
            Chat langsung via WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
