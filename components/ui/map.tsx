"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Globe, MapPin } from "lucide-react";

interface MarkerData {
  name: string;
  city: string;
  project: string;
  coordinates: [number, number]; // [lng, lat]
  fallbackPos: { x: number; y: number };
}

const CLIENT_LOCATIONS: MarkerData[] = [
  {
    name: "PII Lhokseumawe",
    city: "Lhokseumawe, Aceh",
    project: "Website Profil Organisasi",
    coordinates: [97.1804, 5.1804],
    fallbackPos: { x: 7.2, y: 18.5 },
  },
  {
    name: "STIKes Aceh",
    city: "Banda Aceh",
    project: "Sistem Informasi Akademik (SIAKAD)",
    coordinates: [95.3193, 5.5483],
    fallbackPos: { x: 3.5, y: 15.5 },
  },
  {
    name: "Nangro.id",
    city: "Banda Aceh",
    project: "Portal Berita Digital",
    coordinates: [95.3210, 5.5510],
    fallbackPos: { x: 3.8, y: 15.2 },
  },
  {
    name: "Pandawa Store",
    city: "Jakarta",
    project: "E-Commerce System",
    coordinates: [106.8272, -6.1751],
    fallbackPos: { x: 26.5, y: 78.5 },
  },
  {
    name: "Reacreative POS",
    city: "Medan, Sumatra Utara",
    project: "Sistem Kasir & Point of Sale",
    coordinates: [98.6722, 3.5952],
    fallbackPos: { x: 10.5, y: 28.5 },
  },
  {
    name: "Kopi Nusantara",
    city: "Yogyakarta",
    project: "Website & Digital Branding",
    coordinates: [110.3705, -7.7956],
    fallbackPos: { x: 34.5, y: 84.5 },
  },
];

export function Map({ showMarkers = false }: { showMarkers?: boolean }) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [activeClient, setActiveClient] = useState<MarkerData | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (!(maplibregl as any).supported || !(maplibregl as any).supported()) {
      setUseFallback(true);
      return;
    }

    if (!mapContainer.current) return;

    try {
      const mapStyle = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [113.9213, -0.7893], // Center of Indonesia
        zoom: 4.6,
        minZoom: 3.5,
        maxZoom: 9,
        attributionControl: false,
        scrollZoom: false,
      });

      map.current.addControl(
        new maplibregl.NavigationControl({
          showCompass: false,
          showZoom: true,
        }),
        "bottom-right"
      );

      if (showMarkers) {
        CLIENT_LOCATIONS.forEach((client) => {
          const el = document.createElement("div");
          el.className = "group relative cursor-pointer flex items-center justify-center";
          el.style.width = "20px";
          el.style.height = "20px";

          const ring = document.createElement("div");
          ring.className = "absolute inset-0 rounded-full bg-red-500 opacity-60 animate-ping";
          el.appendChild(ring);

          const dot = document.createElement("div");
          dot.className = "relative w-3.5 h-3.5 rounded-full bg-[#e11d2e] border-2 border-white shadow-md group-hover:scale-125 transition-transform duration-200";
          el.appendChild(dot);

          new maplibregl.Marker({ element: el })
            .setLngLat(client.coordinates)
            .addTo(map.current!);

          el.addEventListener("click", () => {
            setActiveClient(client);
            map.current?.flyTo({
              center: client.coordinates,
              zoom: 6.5,
              speed: 1.2,
              essential: true,
            });
          });
        });
      }

      map.current.on("error", () => {
        setUseFallback(true);
      });

    } catch (err) {
      console.warn("Failed to initialize WebGL map, switching to dark fallback map asset:", err);
      setUseFallback(true);
    }

    return () => {
      map.current?.remove();
    };
  }, [showMarkers]);

  const resetView = () => {
    setActiveClient(null);
    if (map.current) {
      map.current.flyTo({
        center: [113.9213, -0.7893],
        zoom: 4.6,
        speed: 1.2,
      });
    }
  };

  return (
    <div className="bg-[#1a191d] border border-white/5 rounded-3xl p-5 shadow-2xl flex flex-col lg:flex-row gap-6 h-auto lg:h-[550px] relative overflow-hidden">
      
      {/* 1. Map Canvas Wrapper */}
      <div className="flex-1 h-[350px] lg:h-full relative bg-black border border-white/5 rounded-2xl overflow-hidden group/map select-none">
        {useFallback ? (
          <div 
            className="w-full h-full relative bg-cover bg-center"
            style={{ backgroundImage: `url('/img/map_indonesia_fallback_dark.png')` }}
          >
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
            {showMarkers && CLIENT_LOCATIONS.map((client) => {
              const isActive = activeClient?.name === client.name;
              return (
                <button
                  key={client.name}
                  onClick={() => setActiveClient(client)}
                  className="absolute transition-transform active:scale-90 group/marker cursor-pointer"
                  style={{ 
                    left: `${client.fallbackPos.x}%`, 
                    top: `${client.fallbackPos.y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <span className={`absolute -inset-2 rounded-full bg-red-500/30 animate-ping duration-1000 ${isActive ? "opacity-100" : "opacity-0 group-hover/marker:opacity-60"}`} />
                  <span className={`block w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-300 ${isActive ? "bg-[#e11d2e] scale-125" : "bg-red-500 group-hover/marker:scale-110"}`} />
                </button>
              );
            })}
          </div>
        ) : (
          <div ref={mapContainer} className="w-full h-full" />
        )}
        
        {/* Floating Zoom status hint inside map */}
        <div className="absolute bottom-4 left-4 z-10 bg-black/75 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg shadow text-[10px] font-semibold text-gray-400">
          {useFallback ? "Mode Basemap Ringan" : "Gunakan tombol +/- untuk zoom"}
        </div>
      </div>

      {/* 2. Side Details Panel */}
      <div className="w-full lg:w-80 bg-black/40 border border-white/10 p-5 rounded-2xl flex flex-col justify-between text-white space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-950/50 border border-red-900/30 flex items-center justify-center text-[#e11d2e] flex-shrink-0">
              <Globe size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Jangkauan Kami</h4>
              <p className="text-[9px] text-gray-400 font-semibold">Proyek REACreative di Indonesia</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4">
            {showMarkers ? (
              activeClient ? (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Klien</p>
                    <p className="text-sm font-black text-white leading-tight mt-0.5">{activeClient.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-550 font-bold uppercase tracking-wider">Lokasi</p>
                    <p className="text-xs text-gray-300 font-semibold flex items-center gap-1 mt-0.5">
                      <MapPin size={12} className="text-[#e11d2e]" />
                      {activeClient.city}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Proyek</p>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium mt-0.5">{activeClient.project}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-450 leading-relaxed font-medium">
                  Klik salah satu pin merah di peta wilayah Indonesia untuk melihat detail informasi klien dan proyek nyata yang telah selesai kami bangun.
                </p>
              )
            ) : (
              <p className="text-xs text-gray-450 leading-relaxed font-medium">
                Peta interaktif wilayah Indonesia menampilkan jangkauan layanan digital REACreative secara nasional.
              </p>
            )}
          </div>
        </div>

        {showMarkers && activeClient && (
          <button
            onClick={resetView}
            className="w-full py-2 bg-white/10 hover:bg-white/15 text-white text-[10px] font-bold rounded-lg transition-colors border border-white/5 active:scale-95"
          >
            Reset Tampilan Peta
          </button>
        )}
      </div>

    </div>
  );
}
