import Button from "./Button";

export default function CtaSection() {
  return (
    <section
      id="kontak"
      className="py-24 bg-dayum relative overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Decorative background circles */}
      <div
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-brand/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full bg-brand/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl lg:max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 reveal">
          <span className="w-4 h-0.5 bg-brand" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand">
            Mulai Sekarang
          </span>
          <span className="w-4 h-0.5 bg-brand" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h2
          id="cta-heading"
          className="text-display-lg font-bold text-white leading-tight mb-4 reveal reveal-delay-1"
        >
          Siap Membangun{" "}
          <span className="text-brand">Digital Presence</span>{" "}
          Bisnis Anda?
        </h2>

        {/* Description */}
        <p className="text-[var(--text-inv-muted)] leading-relaxed mb-8 max-w-lg mx-auto reveal reveal-delay-2">
          Konsultasikan kebutuhan bisnis Anda bersama tim kami. Gratis, tanpa
          komitmen — cukup ceritakan, kami bantu temukan solusi terbaik.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center reveal reveal-delay-3">
          <Button
            variant="filled"
            href="https://wa.me/6281234567890?text=Halo%20REACreative%2C%20saya%20ingin%20diskusi%20project"
            id="cta-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.524 5.849L0 24l6.335-1.652A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.803a9.79 9.79 0 01-4.988-1.362l-.358-.212-3.716.969.99-3.619-.234-.371A9.795 9.795 0 012.197 12C2.197 6.579 6.579 2.197 12 2.197c5.42 0 9.803 4.382 9.803 9.803 0 5.42-4.383 9.803-9.803 9.803z" />
              </svg>
            }
          >
            Chat via WhatsApp
          </Button>
          <Button
            variant="ghost-dark"
            href="/#kontak-form"
            id="cta-hubungi-kami"
          >
            Hubungi Kami
          </Button>
        </div>

        {/* Trust note */}
        <p className="text-xs text-[var(--text-inv-subtle)] mt-6 reveal reveal-delay-3">
          ✓ Gratis konsultasi &nbsp;·&nbsp; ✓ Respon dalam 1×24 jam &nbsp;·&nbsp; ✓ Tanpa komitmen
        </p>
      </div>
    </section>
  );
}
