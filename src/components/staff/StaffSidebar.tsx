"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Layers,
  Users,
  CalendarCheck,
  FileSpreadsheet,
  Bell,
  GraduationCap,
  LogOut,
  Sparkles,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/staff", icon: LayoutDashboard },
  { name: "My Batches", href: "/staff/batches", icon: Layers },
  { name: "Attendance", href: "/staff/attendance", icon: CalendarCheck },
  { name: "Marks Entry", href: "/staff/exams", icon: FileSpreadsheet },
  { name: "Students", href: "/staff/students", icon: Users },
  { name: "Notices", href: "/staff/notices", icon: Bell },
  { name: "Profile", href: "/staff/profile", icon: User },
];

export default function StaffSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white text-slate-800 z-50 flex flex-col justify-between border-r border-slate-200/90 shadow-xs select-none">
      {/* Top Branding & Nav */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-3 bg-white text-[#3D405B] border-b border-slate-200 shrink-0">
          <div className="w-9 h-9 bg-blue-50 text-[#355C7D] font-bold flex items-center justify-center rounded-xl shadow-xs shrink-0 border border-blue-200/60">
            <GraduationCap className="w-5 h-5 text-[#355C7D]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-sm font-bold tracking-tight text-[#3D405B] leading-tight truncate">
              Apex Institute
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#355C7D] font-bold truncate">
              Faculty Portal
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/staff"
                ? pathname === "/staff"
                : pathname.startsWith(item.href);

            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold transition-all rounded-xl ${
                  isActive
                    ? "bg-[#355C7D] text-white font-bold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#355C7D]"
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-white" : "text-slate-400"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls: Sign Out & Profile Quick info */}
      <div className="p-3 bg-white border-t border-slate-200 flex flex-col gap-2.5 shrink-0">
        {/* Sign Out Button */}
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 border border-rose-200 transition-colors rounded-xl"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </Link>

        {/* Institutional Academic Tag */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2 px-1">
          <span>Even Sem 2024–25</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
          </span>
        </div>
      </div>
    </aside>
  );
}
