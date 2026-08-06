"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer, RefreshCw, CheckCircle, Mail, Clock, ShieldCheck } from "lucide-react";

interface InvoiceItem {
  description: string;
  qty: number;
  price: number;
}

interface Invoice {
  id: string;
  invoiceNo: string;
  clientName: string;
  date: string;
  total: number;
  status: "Draft" | "Terkirim" | "Lunas";
  items?: InvoiceItem[];
}

export default function InvoiceDetail() {
  const params = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rea_invoices");
    if (saved) {
      try {
        const list: Invoice[] = JSON.parse(saved);
        const match = list.find(inv => inv.id === params.id);
        if (match) {
          setInvoice(match);
        } else {
          // Fallback static matches
          if (params.id === "inv-1") {
            setInvoice({
              id: "inv-1",
              invoiceNo: "2026/07/C-02",
              clientName: "STIKes Muhammadiyah Lhokseumawe",
              date: "30 Jul 2026",
              total: 8700000,
              status: "Lunas",
              items: [
                { description: "Jasa Pembuatan Sistem Informasi Akademik (SIAKAD)", qty: 1, price: 5500000 },
                { description: "Lisensi Server & Maintenance Bulan Pertama", qty: 1, price: 3200000 }
              ]
            });
          } else if (params.id === "inv-2") {
            setInvoice({
              id: "inv-2",
              invoiceNo: "2026/07/C-01",
              clientName: "STIKes Muhammadiyah Lhokseumawe",
              date: "21 Jul 2026",
              total: 3250000,
              status: "Lunas",
              items: [
                { description: "Jasa Pembuatan Landing Page Kampus", qty: 1, price: 3250000 }
              ]
            });
          } else {
            router.push("/admin/invoice");
          }
        }
      } catch (e) {
        router.push("/admin/invoice");
      }
    }
  }, [params.id, router]);

  const updateStatus = (newStatus: "Draft" | "Terkirim" | "Lunas") => {
    if (!invoice) return;
    const saved = localStorage.getItem("rea_invoices");
    if (saved) {
      const list: Invoice[] = JSON.parse(saved);
      const updated = list.map(inv => {
        if (inv.id === invoice.id) {
          return { ...inv, status: newStatus };
        }
        return inv;
      });
      localStorage.setItem("rea_invoices", JSON.stringify(updated));
      setInvoice({ ...invoice, status: newStatus });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw size={24} className="text-brand animate-spin" />
      </div>
    );
  }

  const items = invoice.items || [
    { description: "Pekerjaan Layanan IT / Sistem Integrasi", qty: 1, price: invoice.total }
  ];

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Action Header - Hidden when printing */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/invoice")}
            className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-[#0f172a] tracking-tight">{invoice.invoiceNo}</h1>
            <p className="text-xs font-semibold text-gray-400 mt-1">Detail rincian tagihan klien</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Status selector */}
          <div className="flex bg-gray-100 rounded-lg p-1 text-[10px] font-bold">
            <button
              onClick={() => updateStatus("Draft")}
              className={`px-3 py-1.5 rounded-md transition-colors ${invoice.status === "Draft" ? "bg-white text-amber-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              Draft
            </button>
            <button
              onClick={() => updateStatus("Terkirim")}
              className={`px-3 py-1.5 rounded-md transition-colors ${invoice.status === "Terkirim" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              Terkirim
            </button>
            <button
              onClick={() => updateStatus("Lunas")}
              className={`px-3 py-1.5 rounded-md transition-colors ${invoice.status === "Lunas" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              Lunas
            </button>
          </div>

          {/* Print button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-[11px] font-bold px-4 py-2 rounded-lg transition-colors shadow-sm active:scale-95"
          >
            <Printer size={13} /> Print / PDF
          </button>
        </div>
      </div>

      {/* Invoice Paper matching clean branding design */}
      <div className="bg-white border border-gray-100 rounded-lg shadow-xl p-8 sm:p-12 relative overflow-hidden print:border-none print:shadow-none print:p-0">
        
        {/* Status watermark corner - hidden on print */}
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none overflow-hidden print:hidden">
          <div className={`absolute top-6 -right-10 w-32 py-1 transform rotate-45 text-center text-[9px] font-black uppercase tracking-wider text-white ${
            invoice.status === "Lunas" ? "bg-emerald-500" : invoice.status === "Terkirim" ? "bg-indigo-500" : "bg-amber-500"
          }`}>
            {invoice.status}
          </div>
        </div>

        {/* Paper Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 border-b border-gray-100 pb-8">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-6 rounded-md bg-[#e11d2e] block"></span>
              <span className="w-2.5 h-5 rounded-md bg-[#f97316] block mt-1.5"></span>
              <span className="text-lg font-black text-[#0f172a] ml-1">REA<span className="text-[#e11d2e]">Creative</span></span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[2px] mt-1 pl-6">Sistem Bisnis & Teknologi</p>
            <div className="text-[10px] text-gray-400 font-semibold mt-4 pl-6 space-y-0.5">
              <p>Kampung Jawa Lama, Lhokseumawe, Aceh</p>
              <p>reacreative.idn@gmail.com</p>
              <p>+62 897 130 2817</p>
            </div>
          </div>
          <div className="sm:text-right space-y-2">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">INVOICE</h2>
            <div className="text-[10px] space-y-1 text-gray-400 font-bold uppercase">
              <p className="text-gray-800">No: <span className="font-black text-black">{invoice.invoiceNo}</span></p>
              <p>Tanggal: <span className="text-gray-800">{invoice.date}</span></p>
              <p>Jatuh Tempo: <span className="text-gray-800">{invoice.date}</span></p>
            </div>
          </div>
        </div>

        {/* Bill To / Details */}
        <div className="grid sm:grid-cols-2 gap-8 py-8 border-b border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Ditagihkan Kepada:</p>
            <p className="text-sm font-black text-gray-900">{invoice.clientName}</p>
            <p className="text-xs text-gray-400 font-semibold mt-1">Mitra Bisnis / Klien Instansi</p>
          </div>
          <div className="sm:text-right space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Metode Pembayaran:</p>
            <p className="text-xs font-bold text-gray-800">Transfer Bank Syariah Indonesia (BSI)</p>
            <p className="text-xs text-gray-400 font-semibold">No. Rekening: 1042-8971-30</p>
            <p className="text-xs text-gray-400 font-semibold">A.n REACreative.idn</p>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="py-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider pb-3">
                <th className="py-3 font-bold">Deskripsi Pekerjaan</th>
                <th className="py-3 text-center w-20 font-bold">Qty</th>
                <th className="py-3 text-right w-36 font-bold">Harga</th>
                <th className="py-3 text-right w-36 font-bold">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs font-semibold text-gray-800">
              {items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/10">
                  <td className="py-4 text-gray-900">{item.description}</td>
                  <td className="py-4 text-center text-gray-500">{item.qty}</td>
                  <td className="py-4 text-right text-gray-500">{formatRupiah(item.price)}</td>
                  <td className="py-4 text-right font-bold text-gray-900">{formatRupiah(item.qty * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Block */}
        <div className="border-t border-gray-100 pt-8 flex justify-end">
          <div className="w-full sm:w-80 space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
              <span>Subtotal</span>
              <span className="text-gray-900 font-bold">{formatRupiah(invoice.total)}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
              <span>Pajak (PPN 0%)</span>
              <span>Rp 0</span>
            </div>
            <div className="flex justify-between items-center text-sm font-black text-gray-900 border-t border-gray-100 pt-3">
              <span>Total Akhir</span>
              <span className="text-brand text-base">{formatRupiah(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Thank you note / Footer */}
        <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <ShieldCheck size={16} />
            <span>Terimakasih atas kerjasamanya! Invoice ini sah & diterbitkan secara digital.</span>
          </div>
          <div className="text-[10px] text-gray-400 font-semibold">
            Pertanyaan? Hubungi admin di reacreative.idn@gmail.com
          </div>
        </div>

      </div>
    </div>
  );
}
