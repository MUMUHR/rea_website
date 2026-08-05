import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
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

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Load count stats
  const [portfolio, layanan, klien, testimonial] = await Promise.all([
    supabase.from("portfolio_items").select("*"),
    supabase.from("services").select("*"),
    supabase.from("client_logos").select("*"),
    supabase.from("testimonials").select("*"),
  ]);

  const portfolioData = portfolio.data ?? [];
  const layananData = layanan.data ?? [];
  const testimonialData = testimonial.data ?? [];

  const activePortfolios = portfolioData.filter(i => i.is_active).length;
  const activeLayanan = layananData.filter(i => i.is_active).length;
  const activeTestimonials = testimonialData.filter(i => i.is_active).length;

  const pctPortfolio = portfolioData.length ? Math.round((activePortfolios / portfolioData.length) * 100) : 0;
  const pctLayanan = layananData.length ? Math.round((activeLayanan / layananData.length) * 100) : 0;
  const pctTestimonials = testimonialData.length ? Math.round((activeTestimonials / testimonialData.length) * 100) : 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [todayViews, weekViews, totalEvents, avgDuration] = await Promise.all([
    supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", today.toISOString()),
    supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 7 * 86400000).toISOString()),
    supabase.from("visitor_events").select("id", { count: "exact", head: true }).gte("created_at", today.toISOString()),
    supabase.from("page_views").select("duration_sec").gte("created_at", new Date(Date.now() - 7 * 86400000).toISOString()).gt("duration_sec", 0),
  ]);

  const avgSec = avgDuration.data?.length
    ? Math.round(avgDuration.data.reduce((a, b) => a + (b.duration_sec || 0), 0) / avgDuration.data.length)
    : 0;
  const avgLabel = avgSec >= 60 ? `${Math.floor(avgSec / 60)}m ${avgSec % 60}s` : `${avgSec}s`;

  const { data: recentEvents } = await supabase.from("visitor_events").select("*").order("created_at", { ascending: false }).limit(3);
  const { data: recentContacts } = await supabase.from("contacts").select("*").order("created_at", { ascending: false }).limit(4);

  const dateStr = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const eventColors: Record<string, { border: string; bg: string; text: string }> = {
    wa_click: { border: "border-emerald-500", bg: "bg-emerald-50", text: "text-emerald-700" },
    cta_click: { border: "border-rose-500", bg: "bg-rose-50", text: "text-rose-700" },
    portfolio_click: { border: "border-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
    service_click: { border: "border-violet-500", bg: "bg-violet-50", text: "text-violet-700" },
  };

  const contactColors = ["border-[#0d9488]", "border-[#f97316]", "border-[#7c3aed]", "border-rose-500"];

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
            <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all active:scale-95">
              <Search size={18} />
            </button>
            <Link
              href="/admin/portofolio"
              className="flex items-center gap-2 bg-[#0a0915] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-md active:scale-95"
            >
              <Plus size={14} /> Add New Project
            </Link>
          </div>
        </div>

        {/* Three Colorful Project Cards from the photo */}
        <div className="grid sm:grid-cols-3 gap-5">
          {/* Card 1: Purple (Portofolio) */}
          <div className="bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              {/* Stacked avatars or preview circles */}
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
          <div className="bg-gradient-to-br from-[#0d9488] to-[#0f766e] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
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
          <div className="bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
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

        {/* Lower Row: Tasks for today vs Statistics */}
        <div className="grid sm:grid-cols-2 gap-8">
          
          {/* Tasks for today style list -> Aktivitas Pengunjung Terbaru */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#0f172a]">Aktivitas Pengunjung</h2>
            <div className="space-y-3">
              {!recentEvents?.length ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm">
                  <p className="text-xs text-gray-400">Belum ada aktivitas terbaru</p>
                </div>
              ) : (
                recentEvents.map((ev: { id: string; event_type: string; label?: string; created_at: string }) => {
                  const style = eventColors[ev.event_type] ?? { border: "border-gray-300", bg: "bg-gray-50", text: "text-gray-600" };
                  return (
                    <div
                      key={ev.id}
                      className={`bg-white border-l-4 ${style.border} rounded-2xl px-5 py-4 shadow-[0_4px_20px_rgb(0,0,0,0.01)] border-t border-r border-b border-gray-100/50 flex items-center justify-between`}
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-800">{ev.label ?? "Pengunjung Klik Akses"}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">
                          {ev.event_type.replace(/_/g, " ")}
                        </p>
                      </div>
                      <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Statistics widgets */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#0f172a]">Statistik</h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Stat card 1 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.01)] text-center flex flex-col justify-center h-24">
                <p className="text-2xl font-black text-gray-900">{todayViews.count ?? 0}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Today Views</p>
              </div>
              {/* Stat card 2 */}
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.01)] text-center flex flex-col justify-center h-24">
                <p className="text-2xl font-black text-[#0d9488]">{avgLabel}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Avg. Duration</p>
              </div>
              {/* Dashed Add New Widget style card */}
              <Link
                href="/admin/tentang"
                className="col-span-2 border-2 border-dashed border-gray-200 rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.01)] text-center flex items-center justify-center gap-2 hover:bg-gray-50/50 hover:border-gray-300 transition-all h-14 group"
              >
                <Plus size={16} className="text-gray-400 group-hover:text-gray-600" />
                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-wider">Configure Site Settings</span>
              </Link>
            </div>

            {/* Pro Plan style banner card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] flex items-center justify-between relative overflow-hidden bg-gradient-to-r from-white to-red-50/30">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#e11d2e]">
                  <Sparkles size={13} />
                  <span>Premium Plan</span>
                </div>
                <p className="text-sm font-bold text-[#0f172a]">REACreative Admin</p>
                <p className="text-[10px] text-gray-400 font-medium">Sistem bisnis berjalan optimal</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-[#e11d2e] flex-shrink-0 animate-pulse">
                <Layers size={22} />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Right Column: Calendar / Message List (lg:col-span-4) */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Calendar Header matching photo */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-[#0f172a] tracking-tight">Pesan Masuk</h2>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all active:scale-95 relative">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e11d2e]" />
            </button>
          </div>
        </div>

        {/* Time-based schedule timeline matching photo calendar */}
        <div className="space-y-6 relative before:absolute before:left-14 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
          {!recentContacts || recentContacts.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm ml-16">
              <p className="text-xs text-gray-400">Belum ada pesan masuk</p>
            </div>
          ) : (
            recentContacts.map((c: { id: string; name: string; message: string; created_at: string }, idx) => {
              const border = contactColors[idx % contactColors.length];
              const date = new Date(c.created_at);
              const timeStr = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
              const dateStr = date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

              return (
                <div key={c.id} className="flex gap-4 items-start relative group">
                  {/* Time label on the left */}
                  <div className="w-10 text-right flex-shrink-0 pt-2">
                    <p className="text-xs font-bold text-gray-800 leading-none">{timeStr}</p>
                    <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">{dateStr}</p>
                  </div>

                  {/* Circle dot on the timeline indicator */}
                  <div className="w-4 h-4 rounded-full border-4 border-white bg-red-500 shadow-sm relative z-10 mt-2.5 flex-shrink-0 left-0.5" />

                  {/* Schedule item card */}
                  <div className={`flex-1 bg-white border-l-4 ${border} rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.01)] border-t border-r border-b border-gray-100 hover:shadow-md transition-shadow`}>
                    <div className="flex justify-between items-start gap-1">
                      <p className="text-xs font-bold text-[#0f172a] truncate">{c.name}</p>
                      <MessageSquare size={12} className="text-gray-300 flex-shrink-0" />
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{c.message}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
