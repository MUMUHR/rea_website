"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Search, X, Check, Globe } from "lucide-react";
import * as Icons from "lucide-react";

type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  price_label?: string;
  items: string[];
  icon_name?: string;
  wa_text?: string;
  show_on_homepage: boolean;
  sort_order: number;
  is_active: boolean;
};

const empty: Omit<Service, "id"> = {
  number: "",
  title: "",
  description: "",
  price_label: "",
  items: [],
  icon_name: "Globe",
  wa_text: "",
  show_on_homepage: true,
  sort_order: 0,
  is_active: true,
};

function ResolveIcon({ name, size = 16, className }: { name?: string; size?: number; className?: string }) {
  const IconComponent = name && (Icons as any)[name] ? (Icons as any)[name] : Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
}

export default function LayananAdminPage() {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(empty);
  const [itemsText, setItemsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);
    const { data: rows } = await supabase.from("services").select("*").order("sort_order");
    setData(rows ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setItemsText("");
    setShowModal(true);
  };

  const openEdit = (svc: Service) => {
    setEditing(svc);
    const { id, ...rest } = svc; void id;
    setForm(rest);
    setItemsText((svc.items ?? []).join("\n"));
    setShowModal(true);
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const payload = { ...form, items: itemsText.split("\n").map(s => s.trim()).filter(Boolean) };
    const { error } = editing
      ? await supabase.from("services").update(payload).eq("id", editing.id)
      : await supabase.from("services").insert(payload);
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
    if (!confirm("Hapus layanan ini?")) return;
    await supabase.from("services").delete().eq("id", id);
    fetchData();
  };

  const toggle = async (id: string, field: "is_active" | "show_on_homepage", val: boolean) => {
    await supabase.from("services").update({ [field]: !val }).eq("id", id);
    fetchData();
  };

  const filtered = data.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900">Layanan</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola paket dan jenis layanan digital yang ditawarkan kepada klien</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#e11d2e] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#c41526] transition-colors shadow-sm flex-shrink-0 active:scale-95"
        >
          <Plus size={15} /> Tambah Layanan
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari layanan..."
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
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} layanan</span>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <div className="w-6 h-6 border-2 border-[#e11d2e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Memuat data...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <Globe size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">{search ? "Tidak ada layanan yang cocok" : "Belum ada layanan. Tambahkan yang pertama!"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(svc => (
            <div
              key={svc.id}
              className={`bg-white border rounded-xl shadow-sm flex flex-col p-5 relative transition-all hover:shadow-md ${!svc.is_active ? "opacity-70 border-gray-100" : "border-gray-200"}`}
            >
              {/* Number and Icon Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded">
                  {svc.number || "00"}
                </span>
                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-brand">
                  <ResolveIcon name={svc.icon_name} size={18} />
                </div>
              </div>

              {/* Title and Price */}
              <div className="mb-3">
                <h3 className="text-sm font-bold text-gray-800 leading-snug">{svc.title}</h3>
                {svc.price_label && (
                  <p className="text-xs font-bold text-[#e11d2e] mt-1">{svc.price_label}</p>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">
                {svc.description || "Tidak ada deskripsi."}
              </p>

              {/* Sub-items (Features list) */}
              {svc.items && svc.items.length > 0 && (
                <div className="space-y-1.5 mb-5 mt-auto pt-3 border-t border-gray-100">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Cakupan Layanan:</p>
                  <ul className="space-y-1">
                    {svc.items.slice(0, 4).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-500">
                        <Check size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                    {svc.items.length > 4 && (
                      <li className="text-[10px] text-gray-400 italic font-semibold">
                        + {svc.items.length - 4} item lainnya...
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Bottom Toggles and Actions */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggle(svc.id, "show_on_homepage", svc.show_on_homepage)}
                    className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 transition-all active:scale-95 hover:bg-gray-50"
                    title="Homepage"
                  >
                    {svc.show_on_homepage ? (
                      <ToggleRight size={22} className="text-[#e11d2e]" />
                    ) : (
                      <ToggleLeft size={22} className="text-gray-400" />
                    )}
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Home</span>
                  </button>
                  <button
                    onClick={() => toggle(svc.id, "is_active", svc.is_active)}
                    className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1 transition-all active:scale-95 hover:bg-gray-50"
                    title="Aktif"
                  >
                    {svc.is_active ? (
                      <ToggleRight size={22} className="text-emerald-500" />
                    ) : (
                      <ToggleLeft size={22} className="text-gray-400" />
                    )}
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Aktif</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(svc)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-95"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => remove(svc.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
                    title="Hapus"
                  >
                    <Trash2 size={15} />
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
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-black text-gray-900">
                  {editing ? "Edit Layanan" : "Tambah Layanan Baru"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{editing ? "Perbarui informasi layanan" : "Buat layanan digital baru"}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors w-8 h-8 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">No Urut (01, 02...)</label>
                  <input
                    type="text"
                    value={form.number}
                    onChange={e => setForm({ ...form, number: e.target.value })}
                    placeholder="Contoh: 01"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Urutan (Sort Order)</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Judul Layanan <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Contoh: Pembuatan Website E-Commerce"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Label Harga</label>
                  <input
                    type="text"
                    value={form.price_label ?? ""}
                    onChange={e => setForm({ ...form, price_label: e.target.value })}
                    placeholder="Mulai dari Rp 1.500.000"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Nama Icon Lucide</label>
                  <input
                    type="text"
                    value={form.icon_name ?? ""}
                    onChange={e => setForm({ ...form, icon_name: e.target.value })}
                    placeholder="Globe, Layers, Code, DeviceMobile..."
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Pesan WhatsApp Kustom (URL-encoded)</label>
                  <input
                    type="text"
                    value={form.wa_text ?? ""}
                    onChange={e => setForm({ ...form, wa_text: e.target.value })}
                    placeholder="Halo%20saya%20tertarik%20dengan%20layanan%20ini"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Deskripsi</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Deskripsi singkat layanan..."
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10 resize-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Sub-items (1 per baris)</label>
                  <textarea
                    rows={4}
                    value={itemsText}
                    onChange={e => setItemsText(e.target.value)}
                    placeholder={"Landing Page\nWebsite Company Profile\nIntegrasi Pembayaran"}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10 resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {[
                  { key: "show_on_homepage" as const, label: "Tampil di Homepage" },
                  { key: "is_active" as const, label: "Aktif" },
                ].map(({ key, label }) => (
                  <label key={key} className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors ${form[key] ? "border-[#e11d2e]/30 bg-[#e11d2e]/5" : "border-gray-200"}`}>
                    <input
                      type="checkbox"
                      checked={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.checked })}
                      className="accent-[#e11d2e] w-4.5 h-4.5"
                    />
                    <span className="text-xs font-semibold text-gray-700">{label}</span>
                  </label>
                ))}
              </div>

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
                disabled={saving || !form.title}
                className="flex-1 py-3 rounded-lg bg-[#e11d2e] text-white text-sm font-semibold hover:bg-[#c41526] transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:border disabled:border-gray-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
              >
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                ) : (
                  editing ? "Simpan Perubahan" : "Tambah Layanan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
