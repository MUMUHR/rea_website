"use client";

import { useEffect, useState } from "react";
import {
  Plus, Pencil, Trash2, Globe, Star, StarOff,
  ToggleLeft, ToggleRight, LayoutGrid, List, ExternalLink,
  Image as ImageIcon, Calendar, Tag, Layers, Search, X
} from "lucide-react";
import { DEFAULT_PORTFOLIO, PortfolioItem } from "@/lib/data";

const emptyItem: Omit<PortfolioItem, "id"> = {
  title: "",
  category: "",
  category_color: "bg-blue-600",
  image_url: "",
  project_url: "",
  description: "",
  year: new Date().getFullYear().toString(),
  tech_stack: "",
  status: "Aktif / Online",
  is_featured: false,
  show_on_homepage: false,
  sort_order: 0,
  is_active: true,
};

function StatusBadge({ status }: { status?: string }) {
  const s = status?.toLowerCase() ?? "";
  const isOnline = s.includes("online") || s.includes("aktif");
  const isDev = s.includes("terpasang") || s.includes("dev");
  const color = isOnline
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : isDev
    ? "bg-amber-50 text-amber-700 border-amber-200"
    : "bg-gray-50 text-gray-500 border-gray-200";
  const dot = isOnline ? "bg-emerald-500" : isDev ? "bg-amber-500" : "bg-gray-400";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status ?? "—"}
    </span>
  );
}

function ImagePreview({ url, title }: { url?: string; title: string }) {
  const [err, setErr] = useState(false);
  if (!url || err) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 gap-2">
        <ImageIcon size={22} className="text-gray-300" />
        <span className="text-[10px] text-gray-400 font-medium text-center px-2 leading-tight">{title}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={title}
      className="w-full h-full object-cover object-top"
      onError={() => setErr(true)}
    />
  );
}

// Portfolio card (grid view)
function PortfolioCard({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: PortfolioItem;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, field: "is_active" | "is_featured" | "show_on_homepage", val: boolean) => void;
}) {
  return (
    <div className={`group relative bg-white rounded-xl border shadow-sm flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${!item.is_active ? "opacity-70" : "border-gray-200"}`}>
      {/* Preview thumbnail */}
      <div className="relative h-40 overflow-hidden bg-gray-100 flex-shrink-0">
        <ImagePreview url={item.image_url} title={item.title} />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          {item.project_url && (
            <a
              href={item.project_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/35 backdrop-blur-sm text-xs font-semibold px-3.5 py-2 rounded-lg border border-white/30 transition-all active:scale-95"
            >
              <ExternalLink size={14} /> Lihat
            </a>
          )}
          <button
            onClick={() => onEdit(item)}
            className="flex items-center gap-2 text-white bg-white/20 hover:bg-white/35 backdrop-blur-sm text-xs font-semibold px-3.5 py-2 rounded-lg border border-white/30 transition-all active:scale-95"
          >
            <Pencil size={14} /> Edit
          </button>
        </div>
        {/* Badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {item.is_featured && (
            <span className="text-[9px] font-bold bg-amber-400 text-amber-900 px-2 py-0.5 rounded shadow uppercase tracking-wide">★ Featured</span>
          )}
          {item.show_on_homepage && (
            <span className="text-[9px] font-bold bg-[#e11d2e] text-white px-2 py-0.5 rounded shadow uppercase tracking-wide">Homepage</span>
          )}
        </div>
        {/* Active toggle top-right */}
        <button
          onClick={() => onToggle(item.id, "is_active", item.is_active)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow flex items-center justify-center transition-all active:scale-95"
          title={item.is_active ? "Nonaktifkan" : "Aktifkan"}
        >
          {item.is_active
            ? <ToggleRight size={22} className="text-emerald-500" />
            : <ToggleLeft size={22} className="text-gray-400" />}
        </button>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <div>
          <p className="text-sm font-bold text-gray-800 leading-tight line-clamp-1">{item.title}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Tag size={11} className="text-gray-400 flex-shrink-0" />
            <span className="text-[11px] font-medium text-gray-500 truncate">{item.category}</span>
            {item.year && (
              <>
                <span className="text-gray-300">·</span>
                <Calendar size={11} className="text-gray-400 flex-shrink-0" />
                <span className="text-[11px] font-medium text-gray-400">{item.year}</span>
              </>
            )}
          </div>
        </div>

        {item.description && (
          <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
        )}

        {item.tech_stack && (
          <div className="flex items-center gap-1.5">
            <Layers size={11} className="text-gray-400 flex-shrink-0" />
            <span className="text-[10px] font-medium text-gray-500 truncate">{item.tech_stack}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <StatusBadge status={item.status} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggle(item.id, "is_featured", item.is_featured)}
              title={item.is_featured ? "Hapus dari Featured" : "Jadikan Featured"}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all active:scale-95 ${item.is_featured ? "bg-amber-50 border-amber-200 text-amber-500 hover:bg-amber-100" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
            >
              {item.is_featured
                ? <Star size={15} className="fill-amber-400 text-amber-400" />
                : <StarOff size={15} />}
            </button>
            <button
              onClick={() => onToggle(item.id, "show_on_homepage", item.show_on_homepage)}
              title={item.show_on_homepage ? "Sembunyikan dari Homepage" : "Tampilkan di Homepage"}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all active:scale-95 ${item.show_on_homepage ? "bg-red-50 border-red-200 text-[#e11d2e] hover:bg-red-100" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
            >
              <Globe size={15} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              title="Hapus"
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Portfolio row (list view)
function PortfolioRow({
  item,
  onEdit,
  onDelete,
  onToggle,
}: {
  item: PortfolioItem;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, field: "is_active" | "is_featured" | "show_on_homepage", val: boolean) => void;
}) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${!item.is_active ? "opacity-70" : ""}`}>
      {/* Thumbnail */}
      <div className="w-16 h-11 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
        <ImagePreview url={item.image_url} title={item.title} />
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 truncate">{item.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[11px] text-gray-400 font-medium">{item.category}</span>
          {item.year && <span className="text-[11px] text-gray-300">·</span>}
          {item.year && <span className="text-[11px] text-gray-400 font-medium">{item.year}</span>}
        </div>
      </div>
      {/* Tech */}
      <span className="hidden md:block text-[11px] text-gray-400 w-32 truncate flex-shrink-0">{item.tech_stack ?? "—"}</span>
      {/* Status */}
      <div className="flex-shrink-0 w-36"><StatusBadge status={item.status} /></div>
      {/* Toggles */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={() => onToggle(item.id, "is_featured", item.is_featured)}
          title="Featured"
          className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all active:scale-95 ${item.is_featured ? "bg-amber-50 border-amber-200 text-amber-500" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"}`}
        >
          {item.is_featured ? <Star size={15} className="text-amber-400 fill-amber-400" /> : <StarOff size={15} />}
        </button>
        <button
          onClick={() => onToggle(item.id, "show_on_homepage", item.show_on_homepage)}
          title="Homepage"
          className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all active:scale-95 ${item.show_on_homepage ? "bg-red-50 border-red-200 text-[#e11d2e]" : "bg-white border-gray-200 text-gray-400 hover:text-gray-600"}`}
        >
          <Globe size={15} />
        </button>
        <button
          onClick={() => onToggle(item.id, "is_active", item.is_active)}
          title="Aktif"
          className="w-8 h-8 flex items-center justify-center active:scale-95"
        >
          {item.is_active ? <ToggleRight size={22} className="text-emerald-500" /> : <ToggleLeft size={22} className="text-gray-300" />}
        </button>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {item.project_url && (
          <a
            href={item.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all active:scale-95"
          >
            <ExternalLink size={14} />
          </a>
        )}
        <button
          onClick={() => onEdit(item)}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all active:scale-95"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all active:scale-95"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

export default function PortofolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<PortfolioItem | null>(null);
  const [form, setForm] = useState<Omit<PortfolioItem, "id">>(emptyItem);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const fetchData = () => {
    setLoading(true);
    const saved = localStorage.getItem("rea_portfolio");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    } else {
      setItems(DEFAULT_PORTFOLIO);
      localStorage.setItem("rea_portfolio", JSON.stringify(DEFAULT_PORTFOLIO));
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm(emptyItem); setShowModal(true); };
  const openEdit = (item: PortfolioItem) => {
    setEditing(item);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = item;
    setForm(rest);
    setShowModal(true);
  };

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      let updatedList: PortfolioItem[];
      if (editing) {
        updatedList = items.map(item => item.id === editing.id ? { ...item, ...form } : item);
      } else {
        const newItem: PortfolioItem = {
          ...form,
          id: Math.random().toString(36).substring(2, 9)
        };
        updatedList = [...items, newItem];
      }

      localStorage.setItem("rea_portfolio", JSON.stringify(updatedList));

      // Simulate a small delay
      await new Promise(resolve => setTimeout(resolve, 500));

      setMsg(editing ? "✓ Disimpan" : "✓ Ditambahkan");
      setShowModal(false);
      fetchData();
    } catch (err: any) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(""), 3000);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus proyek ini?")) return;
    const updatedList = items.filter(item => item.id !== id);
    localStorage.setItem("rea_portfolio", JSON.stringify(updatedList));
    fetchData();
  };

  const toggle = async (id: string, field: "is_active" | "is_featured" | "show_on_homepage", val: boolean) => {
    const updatedList = items.map(item => item.id === id ? { ...item, [field]: !val } : item);
    localStorage.setItem("rea_portfolio", JSON.stringify(updatedList));
    fetchData();
  };

  const filtered = items.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: items.length,
    active: items.filter(i => i.is_active).length,
    featured: items.filter(i => i.is_featured).length,
    homepage: items.filter(i => i.show_on_homepage).length,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-900">Portofolio</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola proyek dan tampilan di halaman publik</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#e11d2e] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#c41526] transition-colors shadow-sm flex-shrink-0 active:scale-95"
        >
          <Plus size={15} /> Tambah Proyek
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Proyek", value: stats.total, color: "text-gray-800" },
          { label: "Aktif", value: stats.active, color: "text-emerald-600" },
          { label: "Featured", value: stats.featured, color: "text-amber-500" },
          { label: "Di Homepage", value: stats.homepage, color: "text-[#e11d2e]" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari proyek..."
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
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} proyek</span>
        <div className="flex items-center bg-gray-100 rounded-lg p-1 gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-gray-700" : "text-gray-400 hover:text-gray-600"}`}
            title="Grid View"
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-gray-700" : "text-gray-400 hover:text-gray-600"}`}
            title="List View"
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <div className="w-6 h-6 border-2 border-[#e11d2e] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-400">Memuat data...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
          <ImageIcon size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-400">{search ? "Tidak ada proyek yang cocok" : "Belum ada proyek. Tambahkan yang pertama!"}</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(item => (
            <PortfolioCard key={item.id} item={item} onEdit={openEdit} onDelete={remove} onToggle={toggle} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
          {/* List header */}
          <div className="min-w-[768px] grid grid-cols-[64px_1fr_128px_144px_140px_132px] gap-4 px-4 py-3 border-b border-gray-100 bg-gray-50">
            {["Preview", "Judul & Kategori", "Tech Stack", "Status", "Pengaturan Tampil", "Aksi"].map(h => (
              <p key={h} className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{h}</p>
            ))}
          </div>
          <div className="min-w-[768px]">
            {filtered.map(item => (
              <PortfolioRow key={item.id} item={item} onEdit={openEdit} onDelete={remove} onToggle={toggle} />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-base font-black text-gray-900">
                  {editing ? "Edit Proyek" : "Tambah Proyek Baru"}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">{editing ? "Perbarui informasi proyek" : "Isi detail proyek baru"}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors w-8 h-8 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Preview image */}
              {form.image_url && (
                <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form.image_url} alt="Preview" className="w-full h-full object-cover object-top" onError={() => {}} />
                </div>
              )}

              {/* Two-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Judul Proyek <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="Contoh: Website Profil PT. Abadi"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Kategori</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    placeholder="Portal Berita"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Tahun</label>
                  <input
                    type="text"
                    value={form.year ?? ""}
                    onChange={e => setForm({ ...form, year: e.target.value })}
                    placeholder="2025"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">URL Gambar / Screenshot</label>
                  <input
                    type="text"
                    value={form.image_url}
                    onChange={e => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://... atau /img/nama.jpg"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">URL Project (opsional)</label>
                  <input
                    type="text"
                    value={form.project_url ?? ""}
                    onChange={e => setForm({ ...form, project_url: e.target.value })}
                    placeholder="https://namaproject.id"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Tech Stack</label>
                  <input
                    type="text"
                    value={form.tech_stack ?? ""}
                    onChange={e => setForm({ ...form, tech_stack: e.target.value })}
                    placeholder="Laravel & MySQL"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Status</label>
                  <select
                    value={form.status ?? ""}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10 bg-white"
                  >
                    <option value="Aktif / Online">Aktif / Online</option>
                    <option value="Aktif / Terpasang">Aktif / Terpasang</option>
                    <option value="Dalam Pengembangan">Dalam Pengembangan</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Urutan Tampil</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 font-semibold block mb-1.5">Deskripsi Singkat</label>
                  <textarea
                    value={form.description ?? ""}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    placeholder="Ceritakan singkat tentang proyek ini..."
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e11d2e] focus:ring-2 focus:ring-[#e11d2e]/10 resize-none"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {[
                  { key: "is_featured" as const, label: "Featured", desc: "Ditandai bintang" },
                  { key: "show_on_homepage" as const, label: "Tampil di Homepage", desc: "Muncul di landing page" },
                  { key: "is_active" as const, label: "Aktif", desc: "Tersedia di publik" },
                ].map(({ key, label, desc }) => (
                  <label key={key} className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all active:scale-[0.98] ${form[key] ? "border-[#e11d2e]/30 bg-[#e11d2e]/5" : "border-gray-200 hover:border-gray-300"}`}>
                    <input
                      type="checkbox"
                      checked={form[key] as boolean}
                      onChange={e => setForm({ ...form, [key]: e.target.checked })}
                      className="accent-[#e11d2e] w-4.5 h-4.5 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-700">{label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
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
                  editing ? "Perbarui Proyek" : "Tambah Proyek"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
