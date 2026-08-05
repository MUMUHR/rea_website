"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Star, Search, X, MessageSquare } from "lucide-react";

type Testimonial = {
  id: string;
  author_name: string;
  role?: string;
  company?: string;
  message: string;
  rating: number;
  avatar_url?: string;
  sort_order: number;
  is_active: boolean;
};

const empty: Omit<Testimonial, "id"> = {
  author_name: "",
  role: "",
  company: "",
  message: "",
  rating: 5,
  avatar_url: "",
  sort_order: 0,
  is_active: true,
};

function AvatarPreview({ url, name }: { url?: string; name: string }) {
  const [err, setErr] = useState(false);
  const initials = name ? name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() : "A";

  if (!url || err) {
    return (
      <div className="w-10 h-10 rounded-full bg-red-50 text-brand border border-red-100 flex items-center justify-center font-bold text-xs flex-shrink-0">
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={name}
      className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
      onError={() => setErr(true)}
    />
  );
}

export default function TestimonialAdminPage() {
  const [data, setData] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(empty);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);
    const { data: rows } = await supabase.from("testimonials").select("*").order("sort_order");
    setData(rows ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setShowModal(true); };
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    const { id, ...rest } = t; void id;
    setForm(rest);
    setShowModal(true);
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    const { error } = editing
      ? await supabase.from("testimonials").update(form).eq("id", editing.id)
      : await supabase.from("testimonials").insert(form);
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
    if (!confirm("Hapus testimonial ini?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    fetchData();
  };

  const toggle = async (id: string, val: boolean) => {
    await supabase.from("testimonials").update({ is_active: !val }).eq("id", id);
    fetchData();
  };

  const filtered = data.filter(t => t.author_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900">Testimonial</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola ulasan, rating, dan testimoni dari klien hasil kerja nyata</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#e11d2e] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#c41526] transition-colors shadow-sm flex-shrink-0 active:scale-95"
        >
          <Plus size={15} /> Tambah Testimonial
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari testimonial..."
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
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} testimonial</span>
      </div>

      {/* Testimonials List */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <div className="w-6 h-6 border-2 border-[#e11d2e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Memuat data...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <MessageSquare size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">{search ? "Tidak ada testimoni yang cocok" : "Belum ada testimoni. Tambahkan yang pertama!"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(t => (
            <div
              key={t.id}
              className={`bg-white border rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${!t.is_active ? "opacity-70 border-gray-100 bg-gray-50/50" : "border-gray-200 bg-white"}`}
            >
              {/* Header: Avatar, Name, Company, Rating */}
              <div className="flex items-start gap-3">
                <AvatarPreview url={t.avatar_url} name={t.author_name} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-1.5">
                    <h3 className="text-sm font-bold text-gray-800 truncate leading-snug">{t.author_name}</h3>
                    {(t.role || t.company) && (
                      <span className="text-[10px] text-gray-400 truncate">
                        — {t.role && t.company ? `${t.role} di ${t.company}` : t.role || t.company}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-xs text-gray-500 leading-relaxed my-4 italic">
                &ldquo;{t.message}&rdquo;
              </p>

              {/* Footer: Sort Order, Status, Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Urutan: {t.sort_order}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggle(t.id, t.is_active)}
                    title={t.is_active ? "Nonaktifkan" : "Aktifkan"}
                    className="w-8 h-8 flex items-center justify-center active:scale-95 text-gray-500 hover:text-gray-700"
                  >
                    {t.is_active ? (
                      <ToggleRight size={22} className="text-emerald-500" />
                    ) : (
                      <ToggleLeft size={22} className="text-gray-300" />
                    )}
                  </button>
                  <div className="h-4 w-px bg-gray-200" />
                  <button
                    onClick={() => openEdit(t)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors active:scale-95"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => remove(t.id)}
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
                  {editing ? "Edit Testimonial" : "Tambah Testimonial"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{editing ? "Perbarui testimonial klien" : "Buat ulasan testimonial baru"}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors w-8 h-8 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Header Preview in Modal */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <AvatarPreview url={form.avatar_url} name={form.author_name || "Preview"} />
                <div>
                  <p className="text-xs font-bold text-gray-800">{form.author_name || "Nama Pengarang"}</p>
                  <p className="text-[10px] text-gray-400">{form.role || "Jabatan"} {form.company ? `@ ${form.company}` : ""}</p>
                </div>
              </div>

              {[
                { key: "author_name", label: "Nama Pengarang", required: true, placeholder: "Contoh: John Doe" },
                { key: "role", label: "Jabatan / Jabatan Kerja", placeholder: "Contoh: CEO, Manager, Marketing..." },
                { key: "company", label: "Perusahaan / Brand", placeholder: "Contoh: PT. Sumber Sukses" },
                { key: "avatar_url", label: "URL Foto Profil / Avatar (opsional)", placeholder: "https://... atau /img/avatar.png" },
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

              <div>
                <label className="text-xs text-gray-500 font-semibold block mb-1.5">Rating (Bintang)</label>
                <div className="flex gap-2.5 p-2.5 bg-gray-50 border border-gray-200 rounded-lg w-fit">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, rating: n })}
                      className="transition-transform active:scale-90 hover:text-yellow-400 p-1"
                    >
                      <Star
                        size={22}
                        className={n <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-semibold block mb-1.5">Pesan Testimonial <span className="text-red-500">*</span></label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Ketik ulasan atau testimonial yang diberikan..."
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10 resize-none"
                />
              </div>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={e => setForm({ ...form, is_active: e.target.checked })}
                  className="accent-[#e11d2e] w-4.5 h-4.5"
                />
                <div>
                  <span className="text-xs font-semibold text-gray-700 block">Aktif</span>
                  <span className="text-[10px] text-gray-400">Tampilkan ulasan ini di landing page</span>
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
                disabled={saving || !form.author_name || !form.message}
                className="flex-1 py-3 rounded-lg bg-[#e11d2e] text-white text-sm font-semibold hover:bg-[#c41526] transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:border disabled:border-gray-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
              >
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                ) : (
                  editing ? "Simpan Perubahan" : "Tambah Testimonial"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
