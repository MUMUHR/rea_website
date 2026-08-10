"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DashboardInvoices from "@/app/admin/_components/DashboardInvoices";
import {
  Briefcase,
  Layers,
  Users,
  Star,
  Eye,
  TrendingUp,
  MousePointerClick,
  Clock,
  ArrowRight,
  Search,
  MessageSquare,
  Plus,
  CheckCircle2,
  MoreVertical,
  Bell,
  Sparkles,
} from "lucide-react";
import {
  DEFAULT_PORTFOLIO,
  DEFAULT_SERVICES,
  DEFAULT_TESTIMONIALS,
  PortfolioItem,
  Service,
  Testimonial
} from "@/lib/data";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [layananData, setLayananData] = useState<Service[]>([]);
  const [testimonialData, setTestimonialData] = useState<Testimonial[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setMounted(true);

    // Hydrate data from localStorage
    const savedPortfolio = localStorage.getItem("rea_portfolio");
    if (savedPortfolio) {
      try { setPortfolioData(JSON.parse(savedPortfolio)); } catch (e) { console.error(e); }
    } else {
      setPortfolioData(DEFAULT_PORTFOLIO);
      localStorage.setItem("rea_portfolio", JSON.stringify(DEFAULT_PORTFOLIO));
    }

    const savedServices = localStorage.getItem("rea_services");
    if (savedServices) {
      try { setLayananData(JSON.parse(savedServices)); } catch (e) { console.error(e); }
    } else {
      setLayananData(DEFAULT_SERVICES);
      localStorage.setItem("rea_services", JSON.stringify(DEFAULT_SERVICES));
    }

    const savedTestimonials = localStorage.getItem("rea_testimonials");
    if (savedTestimonials) {
      try { setTestimonialData(JSON.parse(savedTestimonials)); } catch (e) { console.error(e); }
    } else {
      setTestimonialData(DEFAULT_TESTIMONIALS);
      localStorage.setItem("rea_testimonials", JSON.stringify(DEFAULT_TESTIMONIALS));
    }

    const savedMessages = localStorage.getItem("rea_messages");
    if (savedMessages) {
      try { setRecentContacts(JSON.parse(savedMessages).slice(0, 4)); } catch (e) { console.error(e); }
    } else {
      // Setup some default inbox messages if none exist
      const defaultMsgs: ContactMessage[] = [
        {
          id: "m-1",
          name: "Rizky Pratama",
          email: "rizky@gmail.com",
          phone: "081234567890",
          message: "Halo REACreative, saya ingin menanyakan mengenai penawaran jasa pembuatan SIAKAD kesehatan untuk kampus kami.",
          created_at: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        },
        {
          id: "m-2",
          name: "Siti Rahma",
          email: "siti@indocoffee.com",
          phone: "089876543210",
          message: "Tertarik dengan layanan company profile website. Apakah ada opsi cicilan pembayaran?",
          created_at: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
        }
      ];
      setRecentContacts(defaultMsgs);
      localStorage.setItem("rea_messages", JSON.stringify(defaultMsgs));
    }
  }, []);

  const activePortfolios = portfolioData.length;
  const activeLayanan = layananData.length;
  const activeTestimonials = testimonialData.length;

  const pctPortfolio = 100;
  const pctLayanan = 100;
  const pctTestimonials = 100;

  const dateStr = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const contactColors = ["border-[#0d9488]", "border-[#f97316]", "border-[#7c3aed]", "border-rose-500"];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-4 border-red-200 border-t-red-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      {/* Left + Center Main Area (lg:col-span-8) */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Header Block matching photo */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">Hello, Admin</h1>
            <p className="text-xs font-semibold text-gray-400 mt-1">Hari ini adalah {dateStr}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all active:scale-95">
              <Search size={18} />
            </button>
            <Link
              href="/admin/invoice/buat"
              className="flex items-center gap-2 bg-[#e11d2e] hover:bg-[#c41526] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-md active:scale-95"
            >
              <Plus size={14} /> Buat Invoice
            </Link>
          </div>
        </div>

        {/* Three Colorful Project Cards from the photo */}
        <div className="grid sm:grid-cols-3 gap-5">
          {/* Card 1: Purple (Portofolio) */}
          <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="w-6 h-6 rounded-full border border-[#7c3aed] bg-white/20 flex items-center justify-center text-[9px] font-bold">1</div>
                <div className="w-6 h-6 rounded-full border border-[#7c3aed] bg-white/20 flex items-center justify-center text-[9px] font-bold">2</div>
                <div className="w-6 h-6 rounded-full border border-[#7c3aed] bg-white/25 flex items-center justify-center text-[9px] font-bold">+3</div>
              </div>
              <button className="text-white/70 hover:text-white p-1 rounded-full"><MoreVertical size={16} /></button>
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight leading-tight">Web Development</h2>
              <p className="text-[10px] text-white/75 font-semibold mt-1">Portofolio & Proyek</p>
            </div>
            <div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${pctPortfolio}%` }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-white/90 font-bold mt-2">
                <span>{portfolioData.length} items</span>
                <span>{pctPortfolio}% aktif</span>
              </div>
            </div>
          </div>

          {/* Card 2: Mint Green (Layanan) */}
          <div className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="w-6 h-6 rounded-full border border-[#0d9488] bg-white/20 flex items-center justify-center text-[9px] font-bold">W</div>
                <div className="w-6 h-6 rounded-full border border-[#0d9488] bg-white/20 flex items-center justify-center text-[9px] font-bold">A</div>
                <div className="w-6 h-6 rounded-full border border-[#0d9488] bg-white/25 flex items-center justify-center text-[9px] font-bold">+4</div>
              </div>
              <button className="text-white/70 hover:text-white p-1 rounded-full"><MoreVertical size={16} /></button>
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight leading-tight">Mobile App Design</h2>
              <p className="text-[10px] text-white/75 font-semibold mt-1">Layanan Utama</p>
            </div>
            <div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${pctLayanan}%` }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-white/90 font-bold mt-2">
                <span>{layananData.length} items</span>
                <span>{pctLayanan}% aktif</span>
              </div>
            </div>
          </div>

          {/* Card 3: Coral/Orange (Testimonial) */}
          <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="w-6 h-6 rounded-full border border-[#f97316] bg-white/20 flex items-center justify-center text-[9px] font-bold">★</div>
                <div className="w-6 h-6 rounded-full border border-[#f97316] bg-white/20 flex items-center justify-center text-[9px] font-bold">★</div>
                <div className="w-6 h-6 rounded-full border border-[#f97316] bg-white/25 flex items-center justify-center text-[9px] font-bold">+1</div>
              </div>
              <button className="text-white/70 hover:text-white p-1 rounded-full"><MoreVertical size={16} /></button>
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight leading-tight">Client Feedback</h2>
              <p className="text-[10px] text-white/75 font-semibold mt-1">Ulasan Testimonial</p>
            </div>
            <div>
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${pctTestimonials}%` }} />
              </div>
              <div className="flex justify-between items-center text-[10px] text-white/90 font-bold mt-2">
                <span>{testimonialData.length} items</span>
                <span>{pctTestimonials}% aktif</span>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Summary and Table Section */}
        <DashboardInvoices />

      </div>

      {/* Right Column: Calendar / Message List (lg:col-span-4) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Calendar Header matching photo */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-[#0f172a] tracking-tight">Pesan Masuk</h2>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all active:scale-95 relative">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e11d2e]" />
            </button>
          </div>
        </div>

        {/* Time-based schedule timeline matching photo calendar */}
        <div className="space-y-6 relative before:absolute before:left-14 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
          {!recentContacts || recentContacts.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-lg p-8 text-center shadow-sm ml-16">
              <p className="text-xs text-gray-400">Belum ada pesan masuk</p>
            </div>
          ) : (
            recentContacts.map((c: ContactMessage, idx) => {
              const border = contactColors[idx % contactColors.length];
              const date = new Date(c.created_at);
              const timeStr = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
              const dateStr = date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

              return (
                <div key={c.id} className="flex gap-4 items-start relative group">
                  {/* Left Column: Date & Time in calendar list layout */}
                  <div className="w-10 flex-shrink-0 text-right pt-1">
                    <p className="text-[10px] font-black text-[#e11d2e]">{timeStr}</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tight mt-0.5">{dateStr}</p>
                  </div>

                  {/* Bullet node on vertical timeline line */}
                  <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#e11d2e] mt-1.5 flex-shrink-0 -ml-1.5" />

                  {/* Message Detail Card */}
                  <div className={`flex-1 bg-white border ${border} border-l-4 rounded-xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-md transition-all`}>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-[#0f172a]">{c.name}</h4>
                      <Link 
                        href={`mailto:${c.email}`}
                        className="text-[9px] font-semibold text-gray-400 hover:text-[#e11d2e] transition-colors"
                      >
                        Balas via Email
                      </Link>
                    </div>
                    {c.phone && (
                      <p className="text-[9px] text-gray-450 mt-0.5">WhatsApp/Tel: {c.phone}</p>
                    )}
                    <p className="text-[10px] text-gray-500 font-semibold leading-relaxed mt-2 italic">
                      &ldquo;{c.message}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Static Visitor stats mimicking analytics panel */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider">Statistik Pengunjung</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Hari Ini</p>
              <p className="text-xl font-black text-gray-800">23</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Avg Duration</p>
              <p className="text-xl font-black text-gray-800">2m 45s</p>
            </div>
          </div>
          <div className="bg-[#FAF9F6] p-3 rounded-lg border border-gray-100 text-[9px] text-gray-500 font-medium">
            Status server frontend berjalan lancar tanpa database eksternal.
          </div>
        </div>

      </div>
    </div>
  );
}
