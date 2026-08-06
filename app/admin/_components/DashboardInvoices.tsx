"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Receipt, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Plus
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

export default function DashboardInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

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

  const totalPaid = invoices
    .filter(inv => inv.status === "Lunas")
    .reduce((sum, inv) => sum + inv.total, 0);

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(value);
  };

  const recentInvoices = invoices.slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* 2 Invoice Mini-Stats Cards to display alongside general stats */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Total Invoices */}
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tagihan Diterbitkan</p>
            <p className="text-xl font-black text-gray-900">{invoices.length} Invoice</p>
            <p className="text-[10px] text-gray-400 font-semibold">Tercatat di sistem panel</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <FileSpreadsheet size={18} />
          </div>
        </div>

        {/* Total Revenue/Terbayar */}
        <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Pembayaran Lunas</p>
            <p className="text-sm font-black text-emerald-600">{formatRupiah(totalPaid)}</p>
            <p className="text-[10px] text-gray-450 font-semibold flex items-center gap-1">
              <TrendingUp size={12} /> Status: Lunas
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
            <CheckCircle size={18} />
          </div>
        </div>
      </div>

      {/* Invoice Table Section */}
      <div className="bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Receipt size={16} className="text-brand" />
            <h3 className="text-xs font-black text-[#0f172a] uppercase tracking-wider">Invoice Terbaru</h3>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              href="/admin/invoice/buat" 
              className="text-[10px] font-bold text-[#e11d2e] hover:text-[#c41526] flex items-center gap-1"
            >
              <Plus size={12} /> Buat
            </Link>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
            <Link 
              href="/admin/invoice" 
              className="text-[10px] font-bold text-gray-400 hover:text-gray-600 flex items-center gap-0.5"
            >
              Semua <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[9px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                <th className="px-4 py-2.5">No. Invoice</th>
                <th className="px-4 py-2.5">Klien</th>
                <th className="px-4 py-2.5">Total</th>
                <th className="px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[11px] font-semibold text-gray-800">
              {recentInvoices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-450">
                    Belum ada data invoice
                  </td>
                </tr>
              ) : (
                recentInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/20 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-900">
                      <Link href={`/admin/invoice/detail/${inv.id}`} className="hover:underline hover:text-brand">
                        {inv.invoiceNo}
                      </Link>
                    </td>
                    <td className="px-4 py-3 truncate max-w-[120px]">{inv.clientName}</td>
                    <td className="px-4 py-3 font-bold">{formatRupiah(inv.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                        inv.status === "Lunas" 
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                          : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}>
                        {inv.status}
                      </span>
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
