"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  CalendarCheck,
  CreditCard,
  FileSpreadsheet,
  Award,
  Contact,
  Bell,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  X,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Students", href: "/admin/students", icon: GraduationCap },
  { name: "Staff", href: "/admin/staff", icon: Users },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Batches", href: "/admin/batches", icon: Layers },
  { name: "Attendance", href: "/admin/attendance", icon: CalendarCheck },
  { name: "Fees", href: "/admin/fees", icon: CreditCard },
  { name: "Exams", href: "/admin/exams", icon: FileSpreadsheet },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "ID Cards", href: "/admin/id-cards", icon: Contact },
  { name: "Notices", href: "/admin/notices", icon: Bell },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({
  isMobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white text-slate-800 z-50 flex flex-col justify-between border-r border-slate-200 shadow-xl lg:shadow-sm select-none transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Branding & Nav */}
        <div className="flex flex-col min-h-0 flex-1">
          {/* Brand Header */}
          <div className="h-16 px-4 flex items-center justify-between bg-white text-[#3D405B] border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-[#3D405B]/10 text-[#3D405B] font-bold flex items-center justify-center rounded-xl shadow-xs shrink-0">
                <Shield className="w-5 h-5 text-[#3D405B]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline text-sm font-bold tracking-tight text-[#3D405B] leading-tight truncate">
                  Apex Institute
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#3D405B] font-semibold truncate">
                  Admin Console
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-2 cursor-pointer"
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation List (Scrollable for 13 items) */}
          <nav className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-1">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              const IconComponent = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onCloseMobile?.()}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold transition-all rounded-xl ${
                    isActive
                      ? "bg-[#3D405B] text-white font-bold shadow-sm"
                      : "text-slate-600 hover:bg-[#3D405B]/10 hover:text-[#3D405B]"
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

      {/* Bottom Controls: Terminate Session, Compliance */}
      <div className="p-3 bg-white border-t border-slate-200 flex flex-col gap-2.5 shrink-0">
        {/* Sign Out Button linking to /login */}
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 border border-rose-200 transition-colors rounded-xl"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out / Lock</span>
        </Link>

        {/* Compliance Seal */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2 px-1">
          <span>APEX-IMS CORE</span>
          <span>ISO-27001</span>
        </div>
      </div>
    </aside>
    </>
  );
}
