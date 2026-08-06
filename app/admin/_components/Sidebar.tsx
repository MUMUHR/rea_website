"use client";

import Link from "next/link";
import Image from "next/image";
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
  Receipt,
  PlusSquare,
  QrCode,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  exact?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Utama",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    title: "Keuangan",
    items: [
      { href: "/admin/invoice", label: "Manajemen Invoice", icon: Receipt },
      { href: "/admin/invoice/buat", label: "Buat Invoice", icon: PlusSquare },
      { href: "/admin/qrcode", label: "Dashboard QR Code", icon: QrCode },
    ],
  },
  {
    title: "Kelola Konten",
    items: [
      { href: "/admin/portofolio", label: "Portofolio", icon: Briefcase },
      { href: "/admin/layanan", label: "Layanan", icon: Layers },
      { href: "/admin/klien", label: "Logo Klien", icon: Users },
      { href: "/admin/testimonial", label: "Testimonial", icon: Star },
    ],
  },
  {
    title: "Sistem",
    items: [
      { href: "/admin/tentang", label: "Setting", icon: Settings },
    ],
  },
];

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="w-64 flex-shrink-0 h-screen sticky top-0 bg-[#232323] border-r border-white/5 flex flex-col overflow-hidden py-6">
      {/* Brand Logo */}
      <div className="px-6 mb-6 flex flex-col">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/img/logo/logo_rea.png"
            alt="REACreative Logo"
            width={28}
            height={28}
            className="object-contain flex-shrink-0"
          />
          <span className="text-xl font-black tracking-tight text-white">
            REA<span className="text-[#e11d2e]">Creative</span>
          </span>
        </Link>
        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[2px] mt-1 pl-1">
          Invoice Admin Panel
        </span>
      </div>

      {/* User Profile - Uses REACreative logo instead of Initials avatar */}
      <div className="px-6 mb-6 flex flex-col items-center text-center">
        <div className="relative mb-2.5 group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#e11d2e] to-[#f97316] opacity-75 blur-[1px] group-hover:opacity-100 transition-opacity" />
          <div className="relative w-14 h-14 rounded-full bg-white border-2 border-white overflow-hidden shadow flex items-center justify-center p-2.5">
            <Image
              src="/img/logo/logo_rea.png"
              alt="Admin Avatar Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="absolute bottom-0 right-1 block h-3 w-3 rounded-full bg-emerald-500 border-2 border-white shadow" />
        </div>
        <h3 className="text-xs font-bold text-white leading-tight">Admin REACreative</h3>
        <p className="text-[10px] text-gray-500 truncate w-full max-w-[180px] mt-0.5">{userEmail ?? "admin@reacreative.idn"}</p>
      </div>

      {/* Sidebar Navigation - Grouped & Clean Dark Styling */}
      <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-1.5">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest px-3 block mb-1">
              {group.title}
            </span>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 group ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon
                      size={15}
                      className={active ? "text-[#e11d2e]" : "text-gray-500 group-hover:text-gray-400"}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout button */}
      <div className="px-4 mt-auto pt-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-gray-400
            hover:text-red-500 hover:bg-red-950/20 transition-all duration-200"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
