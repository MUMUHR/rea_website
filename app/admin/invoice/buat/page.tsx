"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/router";
import { Plus, Trash2, ArrowLeft, Save, PlusCircle } from "lucide-react";
import { useRouter as useNextRouter } from "next/navigation";

interface InvoiceItem {
  description: string;
  qty: number;
  price: number;
}

export default function CreateInvoice() {
  const router = useNextRouter();

  const [invoiceNo, setInvoiceNo] = useState(() => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const rand = Math.floor(Math.random() * 90) + 10;
    return `${year}/${month}/C-${rand}`;
  });

  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState(() => {
    return new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  });
  const [status, setStatus] = useState<"Draft" | "Terkirim" | "Lunas">("Draft");
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "Jasa Pembuatan Landing Page", qty: 1, price: 3250000 }
  ]);

  const handleAddItem = () => {
    setItems([...items, { description: "", qty: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const next = [...items];
    if (field === "qty") {
      next[index].qty = Math.max(1, parseInt(value) || 1);
    } else if (field === "price") {
      next[index].price = Math.max(0, parseFloat(value) || 0);
    } else {
      next[index].description = value;
    }
    setItems(next);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      alert("Nama klien wajib diisi!");
      return;
    }

    const newInvoice = {
      id: "inv-" + Date.now(),
      invoiceNo,
      clientName,
      date,
      total: calculateSubtotal(),
      status,
      items
    };

    const saved = localStorage.getItem("rea_invoices");
    const currentList = saved ? JSON.parse(saved) : [];
    const updatedList = [newInvoice, ...currentList];

    localStorage.setItem("rea_invoices", JSON.stringify(updatedList));
    router.push("/admin/invoice");
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/invoice")}
            className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">Buat Invoice Baru</h1>
            <p className="text-xs font-semibold text-gray-400 mt-1">Isi formulir berikut untuk menerbitkan invoice baru</p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgb(0,0,0,0.01)] p-6 space-y-6">
        
        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* No. Invoice */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">No. Invoice</label>
            <input
              type="text"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand transition-colors bg-gray-50/50"
              required
            />
          </div>

          {/* Klien */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nama Klien / Instansi</label>
            <input
              type="text"
              placeholder="Contoh: STIKes Muhammadiyah Lhokseumawe"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand transition-colors"
              required
            />
          </div>

          {/* Tanggal */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Invoice</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand transition-colors bg-gray-50/50"
              required
            />
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status Pembayaran</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand transition-colors bg-white"
            >
              <option value="Draft">Draft</option>
              <option value="Terkirim">Terkirim</option>
              <option value="Lunas">Lunas (Paid)</option>
            </select>
          </div>
        </div>

        {/* Invoice Items Section */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rincian Pekerjaan / Item</h3>
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-1.5 text-xs font-bold text-[#e11d2e] hover:text-[#c41526] transition-colors"
            >
              <PlusCircle size={14} /> Tambah Baris
            </button>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end sm:items-center bg-gray-50/30 border border-gray-100 p-3 rounded-lg relative">
                
                {/* Description */}
                <div className="flex-1 w-full space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase sm:hidden">Deskripsi Pekerjaan</label>
                  <input
                    type="text"
                    placeholder="Nama Layanan / Pekerjaan"
                    value={item.description}
                    onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none focus:border-brand bg-white"
                    required
                  />
                </div>

                {/* Qty */}
                <div className="w-full sm:w-20 space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase sm:hidden">Qty</label>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none focus:border-brand text-center bg-white"
                    required
                  />
                </div>

                {/* Price */}
                <div className="w-full sm:w-36 space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase sm:hidden">Harga Satuan</label>
                  <input
                    type="number"
                    placeholder="Harga Satuan"
                    value={item.price}
                    onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-800 focus:outline-none focus:border-brand bg-white"
                    required
                  />
                </div>

                {/* Subtotal preview */}
                <div className="w-full sm:w-32 text-right pt-2 sm:pt-0">
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Subtotal</p>
                  <p className="text-xs font-bold text-gray-900 mt-0.5">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.qty * item.price)}
                  </p>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  disabled={items.length <= 1}
                  className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Hapus baris"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Total Calculations */}
        <div className="pt-6 border-t border-gray-50 flex justify-end">
          <div className="w-full sm:w-72 bg-gray-50/50 border border-gray-100 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
              <span>Subtotal</span>
              <span className="text-gray-700 font-bold">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(calculateSubtotal())}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-gray-400 border-t border-gray-200/50 pt-2">
              <span>Pajak (0%)</span>
              <span>Rp 0</span>
            </div>
            <div className="flex justify-between items-center text-sm font-black text-gray-900 border-t border-gray-200/50 pt-2">
              <span>Total Akhir</span>
              <span className="text-brand">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(calculateSubtotal())}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/invoice")}
            className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#e11d2e] hover:bg-[#c41526] text-white text-xs font-bold px-5 py-2 rounded-lg transition-colors shadow-md"
          >
            <Save size={14} /> Simpan Invoice
          </button>
        </div>

      </form>
    </div>
  );
}
