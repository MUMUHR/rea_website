"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Eye, 
  Send, 
  CheckCircle, 
  Edit3, 
  Receipt,
  FileSpreadsheet
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNo: string;
  clientName: string;
  date: string;
  total: number;
  status: "Lunas" | "Draft" | "Terkirim";
}

const DEFAULT_INVOICES: Invoice[] = [
  {
    id: "inv-1",
    invoiceNo: "2026/07/C-02",
    clientName: "STIKes Muhammadiyah Lhokseumawe",
    date: "30 Jul 2026",
    total: 8700000,
    status: "Lunas",
  },
  {
    id: "inv-2",
    invoiceNo: "2026/07/C-01",
    clientName: "STIKes Muhammadiyah Lhokseumawe",
    date: "21 Jul 2026",
    total: 3250000,
    status: "Lunas",
  },
];

export default function InvoiceManagement() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("rea_invoices");
    if (saved) {
      try {
        setInvoices(JSON.parse(saved));
      } catch (e) {
        setInvoices(DEFAULT_INVOICES);
      }
    } else {
      setInvoices(DEFAULT_INVOICES);
      localStorage.setItem("rea_invoices", JSON.stringify(DEFAULT_INVOICES));
    }
  }, []);

  const saveInvoices = (newInvoices: Invoice[]) => {
    setInvoices(newInvoices);
    localStorage.setItem("rea_invoices", JSON.stringify(newInvoices));
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus invoice ini?")) {
      const updated = invoices.filter(inv => inv.id !== id);
      saveInvoices(updated);
    }
  };

  // Calculations
  const totalInvoice = invoices.length;
  const draftCount = invoices.filter(inv => inv.status === "Draft").length;
  const sentCount = invoices.filter(inv => inv.status === "Terkirim").length;
  const totalPaid = invoices
    .filter(inv => inv.status === "Lunas")
    .reduce((sum, inv) => sum + inv.total, 0);

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
    inv.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header matching mock */}
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Manajemen Invoice</h1>
          <p className="text-xs font-semibold text-gray-400 mt-1">Kelola tagihan, invoice, dan lunas pembayaran klien</p>
        </div>
        <Link
          href="/admin/invoice/buat"
          className="flex items-center gap-2 bg-[#e11d2e] hover:bg-[#c41526] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-md active:scale-95"
        >
          <Plus size={14} /> Buat Invoice
        </Link>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Invoice */}
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
            <FileSpreadsheet size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Total Invoice</p>
            <p className="text-xl font-black text-gray-900 mt-1">{totalInvoice}</p>
          </div>
        </div>

        {/* Card 2: Draft */}
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 flex-shrink-0">
            <Edit3 size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Draft</p>
            <p className="text-xl font-black text-gray-900 mt-1">{draftCount}</p>
          </div>
        </div>

        {/* Card 3: Terkirim */}
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 flex-shrink-0">
            <Send size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Terkirim</p>
            <p className="text-xl font-black text-gray-900 mt-1">{sentCount}</p>
          </div>
        </div>

        {/* Card 4: Total Terbayar */}
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 flex-shrink-0">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Total Terbayar</p>
            <p className="text-md font-black text-gray-900 mt-1">{formatRupiah(totalPaid)}</p>
          </div>
        </div>
      </div>

      {/* Search and Table Container */}
      <div className="bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden">
        {/* Table Search Header */}
        <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-base font-black text-gray-800 self-start sm:self-center">Invoice Terbaru</h2>
          
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Cari nomor invoice atau klien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand transition-colors"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                <th className="px-6 py-4">No. Invoice</th>
                <th className="px-6 py-4">Klien</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-800">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Tidak ada data invoice ditemukan
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{inv.invoiceNo}</td>
                    <td className="px-6 py-4 max-w-[200px] truncate">{inv.clientName}</td>
                    <td className="px-6 py-4 text-gray-500">{inv.date}</td>
                    <td className="px-6 py-4 font-bold">{formatRupiah(inv.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                        inv.status === "Lunas" 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                          : inv.status === "Terkirim"
                          ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                          : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Link
                        href={`/admin/invoice/detail/${inv.id}`}
                        className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 hover:text-brand hover:border-red-100 hover:bg-red-50/30 transition-all"
                        title="Detail Invoice"
                      >
                        <Eye size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(inv.id)}
                        className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50/30 transition-all"
                        title="Hapus Invoice"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
