"use client";

import { useState } from "react";
import { QrCode, Download, Share2, Copy, Check, Printer } from "lucide-react";

export default function QRCodeDashboard() {
  const [text, setText] = useState("https://reacreative.web.id");
  const [size, setSize] = useState(250);
  const [copied, setCopied] = useState(false);

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Dashboard QR Code</h1>
        <p className="text-xs font-semibold text-gray-400 mt-1">Buat, cetak, dan bagikan QR Code untuk tautan bisnis REACreative</p>
      </div>

      {/* Grid: Generator Controls vs QR Code Display */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left: Controls Card */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-[0_4px_20px_rgb(0,0,0,0.01)] space-y-6 print:hidden">
          <h2 className="text-base font-black text-gray-800">Pengaturan QR Code</h2>
          
          {/* URL / Text Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tautan / Isi Konten QR</label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Masukkan tautan website atau teks..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand transition-colors resize-none"
            />
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Preset Cepat</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setText("https://reacreative.web.id")}
                className="px-2.5 py-1.5 bg-gray-50 border border-gray-150 hover:bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 transition-colors"
              >
                Website REA
              </button>
              <button
                type="button"
                onClick={() => setText("https://wa.me/628971302817?text=Halo%20REACreative")}
                className="px-2.5 py-1.5 bg-gray-50 border border-gray-150 hover:bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 transition-colors"
              >
                WhatsApp Chat
              </button>
              <button
                type="button"
                onClick={() => setText("https://reacreative.web.id/portofolio")}
                className="px-2.5 py-1.5 bg-gray-50 border border-gray-150 hover:bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 transition-colors"
              >
                Portofolio Page
              </button>
            </div>
          </div>

          {/* Size range */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <span>Ukuran Gambar</span>
              <span className="text-gray-700">{size}x{size} px</span>
            </div>
            <input
              type="range"
              min={150}
              max={400}
              step={50}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full accent-brand cursor-pointer"
            />
          </div>

          {/* Tips */}
          <div className="bg-red-50/50 border border-red-100/50 p-4 rounded-lg text-[11px] text-gray-500 leading-relaxed font-semibold">
            Tips: QR Code ini dinamis dan akan diperbarui secara otomatis setiap kali Anda mengetik teks baru di atas. Gunakan preset di atas untuk konfigurasi cepat.
          </div>
        </div>

        {/* Right: Display Panel */}
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex flex-col items-center justify-center text-center space-y-6 print:border-none print:shadow-none print:p-0">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider print:hidden">Pratinjau QR Code</p>
          
          {/* QR Container */}
          <div className="relative p-6 bg-white border border-gray-100 rounded-lg shadow-sm print:border-none print:shadow-none">
            {/* Logo watermark center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-md shadow border border-gray-50 flex items-center justify-center w-10 h-10 print:bg-white print:border-none">
              <span className="text-[9px] font-black text-brand leading-none">REA</span>
            </div>
            
            {/* QR Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="REACreative QR Code"
              className="w-48 h-48 sm:w-60 sm:h-60"
            />
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-xs font-bold text-gray-900 truncate max-w-xs">{text}</h3>
            <p className="text-[10px] text-gray-400 font-semibold">Arahkan kamera HP Anda untuk memindai</p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 print:hidden">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-lg transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              <span>{copied ? "Tersalin!" : "Salin Link"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              <Printer size={14} />
              <span>Cetak QR</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
