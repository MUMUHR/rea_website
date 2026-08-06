"use client";

import { Map } from "@/components/ui/map";

export default function MapSection() {
  return (
    <section
      id="jangkauan"
      className="py-24 bg-[#121115] border-t border-white/5 relative overflow-hidden"
      aria-labelledby="map-heading"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#e11d2e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2.5 h-6 rounded-full bg-[#e11d2e] block animate-pulse"></span>
            <span className="w-2.5 h-5 rounded-full bg-[#f97316] block mt-1.5"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e11d2e] ml-1">
              Jangkauan Layanan
            </span>
          </div>
          <h2 id="map-heading" className="text-display-sm font-black text-white leading-tight">
            Wilayah Mitra <span className="text-[#e11d2e]">REACreative</span>
          </h2>
          <p className="text-sm text-gray-400 font-semibold mt-2">
            Kami melayani pembangunan sistem digital, branding, dan aplikasi bisnis di seluruh wilayah Indonesia
          </p>
        </div>

        {/* Interactive Map Component */}
        <div className="w-full">
          <Map />
        </div>

      </div>
    </section>
  );
}
