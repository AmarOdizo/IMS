"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  BadgeCheck,
  BookOpen,
  Users,
  CheckSquare,
  CreditCard,
  FileSpreadsheet,
  Award,
  Contact2,
  Bell,
  BarChart3,
  Settings,
  ChevronDown,
  Layers
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: "space_dashboard" },
  { name: "Students", href: "/admin/students", icon: "school" },
  { name: "Staff", href: "/admin/staff", icon: "badge" },
  { name: "Courses & Subjects", href: "/admin/courses", icon: "menu_book" },
  { name: "Batches", href: "/admin/batches", icon: "groups" },
  { name: "Attendance", href: "/admin/attendance", icon: "fact_check" },
  { name: "Fees Management", href: "/admin/fees", icon: "payments" },
  { name: "Exams & Results", href: "/admin/exams", icon: "assignment_turned_in" },
  { name: "Certificates", href: "/admin/certificates", icon: "verified" },
  { name: "ID Card Management", href: "/admin/id-cards", icon: "contact_emergency" },
  { name: "Notices", href: "/admin/notices", icon: "campaign" },
  { name: "Reports", href: "/admin/reports", icon: "analytics" },
  { name: "Settings", href: "/admin/settings", icon: "settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col border-r border-outline-variant/30 select-none">
      {/* Brand Header */}
      <div className="h-16 px-space-md border-b border-outline-variant/30 flex items-center gap-space-sm bg-surface-container-lowest">
        <div className="h-9 w-9 bg-primary-container text-white flex items-center justify-center font-headline font-bold text-lg rounded-sm shadow-sm">
          A
        </div>
        <div className="flex flex-col min-w-0 leading-tight">
          <span className="font-headline text-sm font-bold uppercase tracking-tight text-primary truncate">
            Apex Institute
          </span>
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant truncate font-medium">
            Tech &amp; Management ERP
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 px-1">
        <nav className="space-y-0.5">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2 text-xs uppercase tracking-wider transition-all duration-150 rounded-sm ${
                  isActive
                    ? "bg-primary-container text-white font-semibold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[1.15rem]">
                  {item.icon}
                </span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Role Switcher Quick Pill */}
      <div className="px-3 py-2 border-t border-outline-variant/20 bg-surface-container-low/50">
        <div className="text-[10px] uppercase font-bold text-on-surface-variant mb-1 flex items-center justify-between">
          <span>Role Portals</span>
          <span className="text-[9px] text-secondary font-mono">LIVE MATRIX</span>
        </div>
        <div className="grid grid-cols-3 gap-1 text-[10px] font-medium text-center">
          <Link
            href="/student"
            className="py-1 px-1 bg-surface border border-outline-variant/30 hover:border-primary text-on-surface-variant hover:text-primary transition-colors"
          >
            Student
          </Link>
          <Link
            href="/staff"
            className="py-1 px-1 bg-surface border border-outline-variant/30 hover:border-primary text-on-surface-variant hover:text-primary transition-colors"
          >
            Staff
          </Link>
          <Link
            href="/accountant"
            className="py-1 px-1 bg-surface border border-outline-variant/30 hover:border-primary text-on-surface-variant hover:text-primary transition-colors"
          >
            Account
          </Link>
        </div>
      </div>

      {/* Bottom Status Tile */}
      <div className="p-space-sm border-t border-outline-variant/30 bg-surface-container-lowest">
        <div className="p-2.5 bg-surface border border-outline-variant/40 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-on-surface-variant font-medium">
              Campus Grid
            </span>
            <span className="font-mono text-xs text-on-surface font-semibold">
              CAMPUS-01 NORTH
            </span>
          </div>
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
        </div>
      </div>
    </aside>
  );
}

