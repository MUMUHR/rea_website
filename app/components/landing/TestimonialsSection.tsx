"use client";

import { useState, useEffect } from "react";
import { Testimonial } from "@/lib/data";
import { Star, MessageSquare } from "lucide-react";

interface TestimonialsSectionProps {
  initialTestimonials?: Testimonial[];
}

function AvatarPreview({ url, name }: { url?: string; name: string }) {
  const [err, setErr] = useState(false);
  const initials = name ? name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "A";

  if (!url || err) {
    return (
      <div className="w-10 h-10 rounded-full bg-red-950/50 text-[#e11d2e] border border-red-900/30 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={name}
      className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0 shadow-sm"
      onError={() => setErr(true)}
    />
  );
}

export default function TestimonialsSection({ initialTestimonials = [] }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([0, 1, 2]);
  const [fadingSlot, setFadingSlot] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rea_testimonials");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTestimonials(parsed);
        }
      } catch (e) {
        console.error("Failed to parse testimonials from localStorage", e);
      }
    } else {
      localStorage.setItem("rea_testimonials", JSON.stringify(initialTestimonials));
    }
  }, []);

  useEffect(() => {
    if (testimonials.length <= 3) return;

    const interval = setInterval(() => {
      // 1. Pick a random slot of the 3 visible positions to rotate
      const slotToRotate = Math.floor(Math.random() * 3);
      
      // 2. Identify indices of testimonials not currently visible
      const visibleIds = visibleIndices.map(idx => testimonials[idx]?.id);
      const inactiveIndices: number[] = [];
      testimonials.forEach((t, i) => {
        if (!visibleIds.includes(t.id)) {
          inactiveIndices.push(i);
        }
      });

      if (inactiveIndices.length === 0) return;

      // 3. Choose a random inactive testimonial
      const nextIndex = inactiveIndices[Math.floor(Math.random() * inactiveIndices.length)];

      // 4. Trigger fade-out for the chosen slot
      setFadingSlot(slotToRotate);

      // 5. Swap the testimonial and fade it back in after transition duration
      setTimeout(() => {
        setVisibleIndices(prev => {
          const next = [...prev];
          next[slotToRotate] = nextIndex;
          return next;
        });
        setFadingSlot(null);
      }, 500); // matches fade transition duration

    }, 4500); // Rotate every 4.5 seconds

    return () => clearInterval(interval);
  }, [testimonials, visibleIndices]);

  if (testimonials.length === 0) return null;

  // Make sure we have enough visible testimonials mapped
  const activeTestimonials = visibleIndices.map(idx => testimonials[idx]).filter(Boolean);

  return (
    <section
      id="testimoni"
      className="py-24 bg-[#121115] border-t border-white/5 relative overflow-hidden"
      aria-labelledby="testimonial-heading"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header (Dark theme style) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2.5 h-6 rounded-full bg-[#e11d2e] block animate-pulse"></span>
            <span className="w-2.5 h-5 rounded-full bg-[#f97316] block mt-1.5"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e11d2e] ml-1">
              Testimoni Klien
            </span>
          </div>
          <h2 id="testimonial-heading" className="text-display-sm font-black text-white leading-tight">
            Apa Kata <span className="text-[#e11d2e]">Klien</span> Kami
          </h2>
          <p className="text-sm text-gray-400 font-semibold mt-2">
            Ulasan jujur dari bisnis dan mitra yang telah tumbuh bersama solusi digital kami
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTestimonials.map((t, slotIdx) => {
            const isFading = fadingSlot === slotIdx;
            return (
              <div
                key={t.id}
                className={`bg-white/5 border border-white/10 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:border-white/20 transition-all duration-500 flex flex-col justify-between h-64 ${
                  isFading ? "opacity-0 scale-95 translate-y-2" : "opacity-100 scale-100 translate-y-0"
                }`}
              >
                {/* Star rating */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10"}
                    />
                  ))}
                </div>

                {/* Ulasan message */}
                <p className="text-sm text-gray-300 leading-relaxed italic mb-6 line-clamp-4">
                  &ldquo;{t.message}&rdquo;
                </p>

                {/* Author Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <AvatarPreview url={t.avatar_url} name={t.author_name} />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate leading-tight">
                      {t.author_name}
                    </h4>
                    {(t.role || t.company) && (
                      <p className="text-[10px] text-gray-400 font-semibold truncate mt-0.5">
                        {t.role} {t.company ? `@ ${t.company}` : ""}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
