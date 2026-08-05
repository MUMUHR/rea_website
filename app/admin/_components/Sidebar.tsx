"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Users,
  Star,
  BarChart3,
  LogOut,
  Layers,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/analitik", label: "Analytics", icon: BarChart3 },
  { href: "/admin/portofolio", label: "Portofolio", icon: Briefcase },
  { href: "/admin/layanan", label: "Layanan", icon: Layers },
  { href: "/admin/klien", label: "Logo Klien", icon: Users },
  { href: "/admin/testimonial", label: "Testimonial", icon: Star },
  { href: "/admin/tentang", label: "Setting", icon: Settings },
];

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  // Get initials for avatar
  const initials = userEmail ? userEmail.split("@")[0].substring(0, 2).toUpperCase() : "AD";

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col overflow-hidden py-6">
      {/* Brand Logo matching 'Chaart' style in the photo */}
      <div className="px-6 mb-8 flex flex-col">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo Pills */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="w-2.5 h-6 rounded-full bg-[#e11d2e] block animate-pulse"></span>
            <span className="w-2.5 h-5 rounded-full bg-[#f97316] block mt-2"></span>
          </div>
          <span className="text-xl font-black tracking-tight text-[#0f172a]">
            REA<span className="text-[#e11d2e]">Creative</span>
          </span>
        </Link>
        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-[3px] mt-1 pl-4">
          Admin Area
        </span>
      </div>

      {/* User Profile matching photo */}
      <div className="px-6 mb-8 flex flex-col items-center text-center">
        <div className="relative mb-3 group">
          {/* Avatar Ring */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#e11d2e] to-[#f97316] opacity-75 blur-[1px] group-hover:opacity-100 transition-opacity" />
          <div className="relative w-16 h-16 rounded-full bg-white border-2 border-white overflow-hidden shadow flex items-center justify-center font-black text-gray-800 text-lg">
            {/* If there's an avatar we can use it, else initials */}
            <span className="bg-gradient-to-br from-red-50 to-orange-50 w-full h-full flex items-center justify-center text-brand font-black">
              {initials}
            </span>
          </div>
          {/* Active status bubble */}
          <span className="absolute bottom-0 right-1 block h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white shadow" />
        </div>
        <h3 className="text-sm font-bold text-[#0f172a] leading-tight">Admin REACreative</h3>
        <p className="text-xs text-gray-400 truncate w-full max-w-[180px] mt-0.5">{userEmail ?? "admin@reacreative.idn"}</p>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group ${
                active
                  ? "bg-gray-50 text-[#0f172a]"
                  : "text-gray-400 hover:text-[#0f172a] hover:bg-gray-50/50"
              }`}
            >
              <Icon
                size={18}
                className={active ? "text-brand" : "text-gray-300 group-hover:text-gray-400"}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className="px-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-400
            hover:text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
