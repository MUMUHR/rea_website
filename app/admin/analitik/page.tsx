import { createClient } from "@/lib/supabase/server";
import { Eye, MousePointerClick, Clock, Smartphone, Monitor } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalitikPage() {
  const supabase = await createClient();
  const since30 = new Date(Date.now() - 30 * 86400000).toISOString();
  const since7 = new Date(Date.now() - 7 * 86400000).toISOString();

  const [allViews, allEvents] = await Promise.all([
    supabase.from("page_views").select("*").gte("created_at", since30).order("created_at", { ascending: false }),
    supabase.from("visitor_events").select("*").gte("created_at", since30).order("created_at", { ascending: false }),
  ]);

  const views = allViews.data ?? [];
  const events = allEvents.data ?? [];

  const perDay: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
    perDay[key] = 0;
  }
  views.forEach((v: { created_at: string }) => {
    const key = new Date(v.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
    if (key in perDay) perDay[key]++;
  });
  const dayEntries = Object.entries(perDay);
  const maxDay = Math.max(...dayEntries.map((e) => e[1]), 1);

  type PageStat = { views: number; totalDuration: number; validDuration: number };
  const pageStats: Record<string, PageStat> = {};
  views.forEach((v: { page: string; duration_sec?: number }) => {
    if (!pageStats[v.page]) pageStats[v.page] = { views: 0, totalDuration: 0, validDuration: 0 };
    pageStats[v.page].views++;
    if (v.duration_sec && v.duration_sec > 0) {
      pageStats[v.page].totalDuration += v.duration_sec;
      pageStats[v.page].validDuration++;
    }
  });
  const sortedPageStats = Object.entries(pageStats).sort((a, b) => b[1].views - a[1].views);

  const eventTypes: Record<string, number> = {};
  events.forEach((e: { event_type: string }) => {
    eventTypes[e.event_type] = (eventTypes[e.event_type] || 0) + 1;
  });

  let mobile = 0, desktop = 0;
  views.forEach((v: { user_agent?: string }) => {
    if (!v.user_agent) return;
    if (/mobile|android|iphone|ipad/i.test(v.user_agent)) mobile++; else desktop++;
  });

  const uniqueSessions = new Set(views.map((v: { session_id: string }) => v.session_id)).size;
  const recentViews = views.filter((v: { created_at: string }) => v.created_at >= since7);
  const validDurations = recentViews.filter((v: { duration_sec?: number }) => v.duration_sec && v.duration_sec > 0);
  const avgSec = validDurations.length > 0
    ? Math.round(validDurations.reduce((a: number, b: { duration_sec: number }) => a + b.duration_sec, 0) / validDurations.length)
    : 0;
  const avgLabel = avgSec >= 60 ? `${Math.floor(avgSec / 60)}m ${avgSec % 60}s` : `${avgSec}s`;

  const eventBadge: Record<string, string> = {
    wa_click: "bg-emerald-100 text-emerald-700",
    cta_click: "bg-red-100 text-red-700",
    portfolio_click: "bg-blue-100 text-blue-700",
    service_click: "bg-violet-100 text-violet-700",
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analitik</h1>
        <p className="text-sm text-gray-500 mt-0.5">Data kunjungan & ketertarikan pengunjung — 30 hari terakhir</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Kunjungan (30h)", value: views.length, icon: Eye, bg: "bg-blue-50", color: "text-blue-600" },
          { label: "Unique Sessions", value: uniqueSessions, icon: Eye, bg: "bg-violet-50", color: "text-violet-600" },
          { label: "Total Event", value: events.length, icon: MousePointerClick, bg: "bg-red-50", color: "text-red-600" },
          { label: "Avg. Waktu (7h)", value: avgLabel, icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">{s.label}</p>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
                <s.icon size={16} className={s.color} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Daily chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">
          Kunjungan Per Hari (14 Hari Terakhir)
        </h2>
        <div className="flex items-end gap-1.5 h-36 px-2">
          {dayEntries.map(([day, count]) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1.5 group">
              <span className="text-[9px] text-transparent group-hover:text-gray-400 transition-colors font-semibold">{count}</span>
              <div
                className="w-full rounded-md bg-red-100 group-hover:bg-[#e11d2e] transition-colors"
                style={{ height: `${Math.max(4, (count / maxDay) * 100)}%` }}
              />
              <span className="text-[8px] text-gray-300 whitespace-nowrap">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Per-page stats */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Statistik Per Halaman</h2>
          {sortedPageStats.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Belum ada data.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-2 text-left text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Halaman</th>
                  <th className="pb-2 text-right text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Views</th>
                  <th className="pb-2 text-right text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Avg. Durasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sortedPageStats.map(([page, stat]) => {
                  const avg = stat.validDuration > 0 ? Math.round(stat.totalDuration / stat.validDuration) : 0;
                  return (
                    <tr key={page} className="hover:bg-gray-50/50">
                      <td className="py-2.5 pr-4 font-mono text-xs text-gray-600">{page}</td>
                      <td className="py-2.5 text-right font-bold text-gray-800">{stat.views}</td>
                      <td className="py-2.5 pl-4 text-right text-xs text-gray-400">
                        {avg >= 60 ? `${Math.floor(avg / 60)}m ${avg % 60}s` : `${avg}s`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="space-y-4">
          {/* Device */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Device</h2>
            <div className="flex gap-6">
              {[
                { label: "Desktop", count: desktop, icon: Monitor, bg: "bg-blue-50", color: "text-blue-600" },
                { label: "Mobile", count: mobile, icon: Smartphone, bg: "bg-violet-50", color: "text-violet-600" },
              ].map(({ label, count, icon: Icon, bg, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon size={15} className={color} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{count}</p>
                    <p className="text-xs text-gray-400">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            {(mobile + desktop) > 0 && (
              <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-violet-400" style={{ width: `${(desktop / (desktop + mobile)) * 100}%` }} />
              </div>
            )}
          </div>

          {/* Event types */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Jenis Event</h2>
            {Object.keys(eventTypes).length === 0 ? (
              <p className="text-sm text-gray-400">Belum ada event.</p>
            ) : (
              <div className="space-y-2.5">
                {Object.entries(eventTypes).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${eventBadge[type] ?? "bg-gray-100 text-gray-600"}`}>
                      {type.replace(/_/g, " ")}
                    </span>
                    <span className="text-sm font-bold text-gray-700">{count}x</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* All events */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Semua Event Terbaru (30 Hari)</h2>
        {events.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">Belum ada event.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Event", "Label", "Halaman", "Session", "Waktu"].map(h => (
                    <th key={h} className="pb-2.5 text-left text-[11px] uppercase tracking-wider text-gray-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {events.slice(0, 50).map((ev: { id: string; event_type: string; label?: string; page?: string; session_id: string; created_at: string }) => (
                  <tr key={ev.id} className="hover:bg-gray-50/50">
                    <td className="py-2.5 pr-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${eventBadge[ev.event_type] ?? "bg-gray-100 text-gray-600"}`}>
                        {ev.event_type.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-gray-600 text-xs">{ev.label ?? "—"}</td>
                    <td className="py-2.5 pr-4 text-gray-400 text-xs font-mono">{ev.page ?? "—"}</td>
                    <td className="py-2.5 pr-4 text-gray-300 text-xs font-mono">{ev.session_id.slice(0, 8)}…</td>
                    <td className="py-2.5 text-gray-400 text-xs whitespace-nowrap">
                      {new Date(ev.created_at).toLocaleString("id-ID", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
