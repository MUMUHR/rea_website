"use client";

import { useEffect, useState } from "react";
import { ImageIcon, Trash2, Upload, RefreshCw } from "lucide-react";
import { DEFAULT_CLIENT_LOGOS, ClientLogo } from "@/lib/data";

export default function LogoClientPage() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [clientName, setClientName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState({ text: "", isError: false });

  const fetchLogos = () => {
    setLoading(true);
    const saved = localStorage.getItem("rea_client_logos");
    if (saved) {
      try {
        setLogos(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setLogos(DEFAULT_CLIENT_LOGOS);
      localStorage.setItem("rea_client_logos", JSON.stringify(DEFAULT_CLIENT_LOGOS));
    }
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
        
        const newLogo: ClientLogo = {
          id: Math.random().toString(36).substring(2, 9),
          name: clientName,
          logo_url: base64Data,
          website_url: "",
          sort_order: nextOrder
        };

        const updatedList = [...logos, newLogo];
        localStorage.setItem("rea_client_logos", JSON.stringify(updatedList));

        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 600));

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
      const updatedList = logos.filter(l => l.id !== id);
      localStorage.setItem("rea_client_logos", JSON.stringify(updatedList));
      fetchLogos();
    } catch (err: any) {
      alert(`Gagal menghapus logo: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Logo Klien Marquee</h1>
        <p className="text-xs font-semibold text-gray-400 mt-1">
          Kelola logo mitra bisnis dan klien yang tampil berputar (marquee) di halaman beranda.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Kolom Kiri: Form Upload Logo */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-5">
          <div className="space-y-1">
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Unggah Logo Baru</h3>
            <p className="text-[10px] text-gray-400 font-semibold">Gunakan gambar dengan format PNG transparan untuk hasil terbaik.</p>
          </div>

          <form onSubmit={handleUpload} className="space-y-4">
            
            {/* Nama Instansi */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Nama Instansi / Klien
              </label>
              <input
                type="text"
                placeholder="Contoh: STIKes Aceh"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-red-500 transition-colors bg-[#FAF9F6]"
                required
              />
            </div>

            {/* File Picker */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Berkas Gambar Logo
              </label>
              <div className="border border-dashed border-gray-300 hover:border-red-500 rounded-lg p-5 text-center cursor-pointer transition-colors relative bg-[#FAF9F6]">
                <input
                  id="file-logo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required={!file}
                />
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-[#e11d2e] flex items-center justify-center mx-auto">
                    <Upload size={18} />
                  </div>
                  <p className="text-xs font-bold text-gray-700">
                    {file ? file.name : "Pilih atau Drag Berkas Gambar"}
                  </p>
                  <p className="text-[9px] text-gray-400 font-semibold">
                    PNG, JPG, SVG hingga 4MB (Disarankan latar belakang transparan)
                  </p>
                </div>
              </div>
            </div>

            {/* Feedback message */}
            {msg.text && (
              <div className={`p-3 rounded-lg border text-xs font-semibold ${msg.isError ? "bg-red-50 border-red-150 text-red-700" : "bg-emerald-50 border-emerald-150 text-emerald-700"}`}>
                {msg.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-[#e11d2e] hover:bg-[#c41526] hover:shadow text-white font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Mengunggah Logo...</span>
                </>
              ) : (
                <>
                  <Upload size={14} />
                  <span>Unggah Logo Klien</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Kolom Kanan: Daftar Grid Logo Aktif */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Daftar Logo Aktif</h3>
            <span className="text-[10px] bg-red-50 text-[#e11d2e] border border-red-100 font-black px-2 py-0.5 rounded-full">
              {logos.length} Klien
            </span>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <RefreshCw className="animate-spin text-gray-400 mx-auto" />
            </div>
          ) : logos.length === 0 ? (
            <div className="text-center py-12 text-gray-400 space-y-2">
              <ImageIcon size={32} className="mx-auto text-gray-300" />
              <p className="text-xs">Belum ada logo klien yang diunggah.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-3 gap-4">
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="group relative bg-[#FAF9F6] border border-gray-200/80 rounded-xl p-4 flex flex-col justify-between items-center h-32 hover:border-[#e11d2e] hover:shadow transition-all"
                >
                  
                  {/* Preview image */}
                  <div className="flex-1 flex items-center justify-center w-full h-16 relative">
                    {logo.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo.logo_url}
                        alt={logo.name}
                        className="max-h-12 max-w-full object-contain filter group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <ImageIcon size={24} className="text-gray-300" />
                    )}
                  </div>

                  {/* Client title */}
                  <div className="w-full text-center mt-2 pt-2 border-t border-gray-200/50 flex justify-between items-center">
                    <p className="text-[10px] font-bold text-gray-700 truncate flex-1 text-left pr-2">{logo.name}</p>
                    <button
                      onClick={() => handleDelete(logo.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Hapus Logo"
                    >
                      <Trash2 size={12} />
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
