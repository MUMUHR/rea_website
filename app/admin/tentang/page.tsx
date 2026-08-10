"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { DEFAULT_SETTINGS } from "@/lib/data";

type Setting = { key: string; value: string; description?: string };

const DISPLAY_KEYS = [
  { key: "whatsapp_number", label: "Nomor WhatsApp", placeholder: "628971302817", desc: "Tanpa tanda +" },
  { key: "email_contact", label: "Email Kontak", placeholder: "reacreative.idn@gmail.com" },
  { key: "address", label: "Alamat Kantor" },
  { key: "office_hours", label: "Jam Operasional", placeholder: "Senin – Sabtu, 08.00 – 22.00 WIB" },
  { key: "instagram_url", label: "URL Instagram" },
  { key: "facebook_url", label: "URL Facebook" },
  { key: "linkedin_url", label: "URL LinkedIn" },
  { key: "youtube_url", label: "URL YouTube" },
  { key: "stats_projects", label: "Statistik: Proyek", placeholder: "120+" },
  { key: "stats_clients", label: "Statistik: Klien", placeholder: "80+" },
  { key: "stats_years", label: "Statistik: Tahun", placeholder: "3+" },
  { key: "founded_year", label: "Tahun Berdiri", placeholder: "2023" },
  { key: "hero_wa_text", label: "Pesan WA Hero (URL-encoded)" },
];

export default function TentangAdminPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchSettings = () => {
    setLoading(true);
    const saved = localStorage.getItem("rea_site_settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem("rea_site_settings", JSON.stringify(DEFAULT_SETTINGS));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const saveAll = async () => {
    setSaving(true);
    setMsg("");
    try {
      const updatedMap: Record<string, string> = {};
      DISPLAY_KEYS.forEach(({ key }) => {
        updatedMap[key] = settings[key] ?? "";
      });

      localStorage.setItem("rea_site_settings", JSON.stringify(updatedMap));

      // Simulate a small delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setMsg("✓ Semua pengaturan berhasil disimpan!");
      setTimeout(() => setMsg(""), 4000);
      fetchSettings();
    } catch (err: any) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-black text-gray-900">Site Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Kelola konfigurasi global website</p>
      </div>

      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <div className="w-6 h-6 border-2 border-[#e11d2e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Memuat pengaturan...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DISPLAY_KEYS.map(({ key, label, placeholder, desc }) => (
              <div key={key} className={key === "address" || key === "hero_wa_text" ? "md:col-span-2" : ""}>
                <label className="text-xs text-gray-500 font-semibold block mb-1.5">
                  {label}
                  {desc && <span className="normal-case font-normal ml-2 text-gray-400">— {desc}</span>}
                </label>
                <input
                  type="text"
                  value={settings[key] ?? ""}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10 transition-colors"
                />
              </div>
            ))}
          </div>

          {msg && (
            <div className={`text-sm px-4 py-2.5 rounded-lg font-medium ${msg.startsWith("Error") ? "bg-red-50 text-red-600 border border-red-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
              {msg}
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={saveAll}
              disabled={saving}
              className="flex items-center gap-2 bg-[#e11d2e] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#c41526] transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Simpan Semua Pengaturan
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
