"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Search, X, Image as ImageIcon, Link as LinkIcon, ArrowUpDown } from "lucide-react";

type Client = {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string;
  sort_order: number;
  is_active: boolean;
};

const empty: Omit<Client, "id"> = {
  name: "",
  logo_url: "",
  website_url: "",
  sort_order: 0,
  is_active: true,
};

function LogoPreview({ url, name }: { url?: string; name: string }) {
  const [err, setErr] = useState(false);
  if (!url || err) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg">
        <span className="text-[10px] font-black tracking-wider text-gray-400 uppercase text-center px-1 truncate">
          {name}
        </span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={name}
      className="max-w-full max-h-full object-contain p-2 opacity-75 group-hover:opacity-100 transition-opacity"
      onError={() => setErr(true)}
    />
  );
}

export default function KlienAdminPage() {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<Omit<Client, "id">>(empty);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);
    const { data: rows } = await supabase.from("client_logos").select("*").order("sort_order");
    setData(rows ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setShowModal(true); };
  const openEdit = (c: Client) => {
    setEditing(c);
    const { id, ...rest } = c; void id;
    setForm(rest);
    setShowModal(true);
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = editing
      ? await supabase.from("client_logos").update(form).eq("id", editing.id)
      : await supabase.from("client_logos").insert(form);
    setSaving(false);
    if (error) {
      setMsg(`Error: ${error.message}`);
      return;
    }
    setMsg("✓ Berhasil disimpan");
    setShowModal(false);
    fetchData();
    setTimeout(() => setMsg(""), 3000);
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus klien ini?")) return;
    await supabase.from("client_logos").delete().eq("id", id);
    fetchData();
  };

  const toggle = async (id: string, val: boolean) => {
    await supabase.from("client_logos").update({ is_active: !val }).eq("id", id);
    fetchData();
  };

  const filtered = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900">Logo Klien</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola daftar mitra dan logo klien yang tampil di marquee homepage</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#e11d2e] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#c41526] transition-colors shadow-sm flex-shrink-0 active:scale-95"
        >
          <Plus size={15} /> Tambah Klien
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari klien..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e11d2e]/20 focus:border-[#e11d2e]"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100">
              <X size={12} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} klien</span>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <div className="w-6 h-6 border-2 border-[#e11d2e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Memuat data...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <ImageIcon size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">{search ? "Tidak ada mitra yang cocok" : "Belum ada mitra. Tambahkan yang pertama!"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map(c => (
            <div
              key={c.id}
              className={`group bg-white border rounded-xl p-4 shadow-sm flex flex-col items-center justify-between text-center relative transition-all hover:shadow-md ${!c.is_active ? "opacity-70 border-gray-100 bg-gray-50/50" : "border-gray-200 bg-white"}`}
            >
              {/* Logo block */}
              <div className="w-full h-16 flex items-center justify-center mb-3">
                <LogoPreview url={c.logo_url} name={c.name} />
              </div>

              {/* Title & Actions */}
              <div className="w-full min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate" title={c.name}>{c.name}</p>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-[11px] text-gray-400">
                  <ArrowUpDown size={11} />
                  <span>Urutan: {c.sort_order}</span>
                </div>
              </div>

              {/* Hover actions & status toggles */}
              <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => toggle(c.id, c.is_active)}
                  title={c.is_active ? "Nonaktifkan" : "Aktifkan"}
                  className="w-8 h-8 flex items-center justify-center active:scale-95 text-gray-500 hover:text-gray-700"
                >
                  {c.is_active ? (
                    <ToggleRight size={22} className="text-emerald-500" />
                  ) : (
                    <ToggleLeft size={22} className="text-gray-300" />
                  )}
                </button>
                <div className="flex items-center gap-1.5">
                  {c.website_url && (
                    <a
                      href={c.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors active:scale-95"
                      title="Website Klien"
                    >
                      <LinkIcon size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => openEdit(c)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors active:scale-95"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => remove(c.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors active:scale-95"
                    title="Hapus"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-black text-gray-900">
                  {editing ? "Edit Klien" : "Tambah Klien"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{editing ? "Perbarui informasi klien" : "Isi detail logo klien"}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors w-8 h-8 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image preview in modal */}
              {form.logo_url && (
                <div className="w-full h-24 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <LogoPreview url={form.logo_url} name={form.name || "Preview"} />
                </div>
              )}

              {[
                { key: "name", label: "Nama Klien", required: true, placeholder: "Contoh: PT. Maju Bersama" },
                { key: "logo_url", label: "URL Logo", placeholder: "/img/logo_klien.png atau https://..." },
                { key: "website_url", label: "Website Klien (opsional)", placeholder: "https://klien.com" },
                { key: "sort_order", label: "Urutan Tampil", type: "number", placeholder: "0" },
              ].map(({ key, label, required, placeholder, type }) => (
                <div key={key}>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={type ?? "text"}
                    value={(form as Record<string, unknown>)[key] as string ?? ""}
                    onChange={e => setForm({ ...form, [key]: type === "number" ? parseInt(e.target.value) || 0 : e.target.value })}
                    placeholder={placeholder}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
              ))}

              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={e => setForm({ ...form, is_active: e.target.checked })}
                  className="accent-[#e11d2e] w-4.5 h-4.5"
                />
                <div>
                  <span className="text-xs font-semibold text-gray-700 block">Aktif</span>
                  <span className="text-[10px] text-gray-400">Tampilkan logo di marquee landing page</span>
                </div>
              </label>

              {msg && (
                <div className={`text-sm px-4 py-2.5 rounded-lg font-medium ${msg.startsWith("Error") ? "bg-red-50 text-red-600 border border-red-200" : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
                  {msg}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors font-medium active:scale-95"
              >
                Batal
              </button>
              <button
                onClick={save}
                disabled={saving || !form.name}
                className="flex-1 py-3 rounded-lg bg-[#e11d2e] text-white text-sm font-semibold hover:bg-[#c41526] transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:border disabled:border-gray-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
              >
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                ) : (
                  editing ? "Simpan Perubahan" : "Tambah Klien"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
