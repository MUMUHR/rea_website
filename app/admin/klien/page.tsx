"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ImageIcon, Trash2, Upload, RefreshCw } from "lucide-react";

type ClientLogo = {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export default function LogoClientPage() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [clientName, setClientName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState({ text: "", isError: false });

  const supabase = createClient();

  const fetchLogos = async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from("client_logos")
      .select("*")
      .order("sort_order");
    setLogos(rows ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 4 * 1024 * 1024) {
        setMsg({ text: "File terlalu besar. Maksimal 4MB.", isError: true });
        return;
      }
      setFile(selectedFile);
      setMsg({ text: "", isError: false });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMsg({ text: "Pilih file logo terlebih dahulu.", isError: true });
      return;
    }
    if (!clientName.trim()) {
      setMsg({ text: "Nama klien wajib diisi.", isError: true });
      return;
    }

    setUploading(true);
    setMsg({ text: "", isError: false });

    // Convert file to Base64
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;

      try {
        const nextOrder = logos.length ? Math.max(...logos.map(l => l.sort_order)) + 1 : 1;
        
        const { error } = await supabase
          .from("client_logos")
          .insert({
            name: clientName,
            logo_url: base64Data,
            website_url: "",
            sort_order: nextOrder,
            is_active: true
          });

        if (error) throw error;

        setMsg({ text: "Logo berhasil diunggah!", isError: false });
        setClientName("");
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById("file-logo-input") as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        fetchLogos();
      } catch (err: any) {
        setMsg({ text: `Gagal mengunggah: ${err.message}`, isError: true });
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      setMsg({ text: "Gagal membaca file gambar.", isError: true });
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus logo client ini?")) return;

    try {
      const { error } = await supabase
        .from("client_logos")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setMsg({ text: "Logo berhasil dihapus.", isError: false });
      fetchLogos();
    } catch (err: any) {
      setMsg({ text: `Gagal menghapus: ${err.message}`, isError: true });
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "31 Jul 2026 15:50"; // Mock default fallback
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }) + " " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header matching old web style */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Logo Client</h1>
          <p className="text-xs font-semibold text-gray-400 mt-1">Kelola logo klien utama yang tampil di bagian Marquee beranda</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload Form (lg:col-span-4) */}
        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-lg p-6 shadow-[0_4px_20px_rgb(0,0,0,0.01)] space-y-5">
          <div>
            <h2 className="text-sm font-black text-gray-900 leading-none">Upload Logo Baru</h2>
            <p className="text-[10px] text-gray-400 font-semibold mt-1.5 leading-relaxed">
              Unggah satu atau beberapa logo client untuk otomatis tampil di marquee halaman utama.
            </p>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            {/* Client Name Field */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Nama Klien / Instansi</label>
              <input
                type="text"
                placeholder="Contoh: Logo Pii"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand transition-colors bg-white"
                required
              />
            </div>

            {/* File Logo Picker */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">File Logo</label>
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 flex flex-col items-center justify-center text-center relative hover:bg-gray-50 transition-colors group">
                <input
                  id="file-logo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <Upload size={16} className="text-gray-400 group-hover:text-brand transition-colors mb-1.5" />
                <span className="text-[10px] text-gray-400 font-bold truncate max-w-[200px]">
                  {file ? file.name : "Choose File"}
                </span>
                <span className="text-[8px] text-gray-400 font-medium mt-0.5">Format: JPG, PNG, WEBP, atau SVG. Max 4MB.</span>
              </div>
            </div>

            {/* Message alert */}
            {msg.text && (
              <div className={`text-[10px] p-2.5 rounded-lg font-bold border ${
                msg.isError ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
              }`}>
                {msg.text}
              </div>
            )}

            {/* Upload Button */}
            <button
              type="submit"
              disabled={uploading || !file || !clientName}
              className="w-full py-2.5 bg-[#e11d2e] hover:bg-[#c41526] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-150 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md active:scale-95"
            >
              {uploading ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  <span>Mengunggah...</span>
                </>
              ) : (
                <span>Upload Logo</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Active Logos Grid (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-lg p-6 shadow-[0_4px_20px_rgb(0,0,0,0.01)] space-y-6">
          <div>
            <h2 className="text-sm font-black text-gray-900 leading-none">Daftar Logo Client</h2>
            <p className="text-[10px] text-gray-400 font-semibold mt-1.5 leading-relaxed">
              Total {logos.filter(l => l.is_active).length} logo aktif di halaman utama.
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-400 flex flex-col items-center gap-2">
              <RefreshCw size={20} className="animate-spin text-brand" />
              <span className="text-xs font-semibold">Memuat logo client...</span>
            </div>
          ) : logos.length === 0 ? (
            <div className="py-12 text-center text-gray-400 flex flex-col items-center gap-3">
              <ImageIcon size={32} className="text-gray-200" />
              <span className="text-xs font-semibold">Belum ada logo klien yang diunggah.</span>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {logos.map((logo) => (
                <div 
                  key={logo.id} 
                  className="bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  {/* Image Display */}
                  <div className="h-32 bg-gray-50/50 flex items-center justify-center p-6 border-b border-gray-50 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.logo_url}
                      alt={logo.name}
                      className="max-h-full max-w-full object-contain transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>

                  {/* Details & Delete Button */}
                  <div className="p-4 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{logo.name}</p>
                      <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">{formatDate(logo.created_at)}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(logo.id)}
                      className="text-red-500 hover:text-white border border-red-200 hover:bg-red-500 hover:border-red-500 text-[10px] font-bold px-3 py-1.5 rounded-md transition-all active:scale-95 flex-shrink-0"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
