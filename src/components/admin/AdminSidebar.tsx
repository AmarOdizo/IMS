"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightLeft, LogOut } from "lucide-react";

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
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest text-on-surface z-50 flex flex-col justify-between border-r border-[#d5e3fc] shadow-[2px_0_0_0_#d5e3fc] select-none">
      {/* Top Branding & Nav */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-3 bg-primary-container text-on-primary border-b border-[#324769] shrink-0">
          <div className="h-8 w-8 bg-secondary-container text-primary font-bold flex items-center justify-center text-sm rounded-xs shadow-xs">
            <span className="material-symbols-outlined text-lg text-primary">admin_panel_settings</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-sm font-bold uppercase tracking-tight text-on-primary leading-tight truncate">
              Apex Institute
            </span>
            <span className="text-[10px] tracking-wider uppercase text-on-primary-container font-mono font-semibold truncate">
              Admin Console
            </span>
          </div>
        </div>

        {/* Substrip */}
        <div className="px-4 py-2 bg-surface-container-low flex items-center justify-between border-b border-[#d5e3fc] shrink-0">
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
            Administrative Grid
          </span>
          <span className="font-mono text-[10px] text-secondary font-bold">
            v4.2-ADM
          </span>
        </div>

        {/* Navigation List (Scrollable for 13 items) */}
        <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-colors rounded-xs ${
                  isActive
                    ? "bg-primary text-on-primary font-bold shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">
                  {item.icon}
                </span>
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls: Switcher, Terminate Session, Compliance */}
      <div className="p-3 bg-surface-container-lowest border-t border-[#d5e3fc] flex flex-col gap-2.5 shrink-0">
        {/* Role Portal Quick Switcher */}
        <div className="bg-surface-container-low p-2 rounded-xs border border-[#cbd5e1]">
          <div className="text-[9px] uppercase font-bold text-secondary tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono">
              <ArrowRightLeft className="w-2.5 h-2.5" /> Switch Portal
            </span>
            <span className="text-[8px] bg-secondary/15 text-secondary px-1 py-0.2 rounded-xs font-mono font-bold">
              ROLE MESH
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px] font-medium text-center font-mono">
            <Link
              href="/student"
              className="py-1 px-1 bg-surface-container-lowest border border-[#cbd5e1] hover:border-secondary text-on-surface hover:text-primary transition-colors font-semibold"
            >
              Student
            </Link>
            <Link
              href="/staff"
              className="py-1 px-1 bg-surface-container-lowest border border-[#cbd5e1] hover:border-secondary text-on-surface hover:text-primary transition-colors font-semibold"
            >
              Staff
            </Link>
            <Link
              href="/accountant"
              className="py-1 px-1 bg-surface-container-lowest border border-[#cbd5e1] hover:border-secondary text-on-surface hover:text-primary transition-colors font-semibold"
            >
              Accounts
            </Link>
          </div>
        </div>

        {/* Terminate Session Button */}
        <Link
          href="/login"
          className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-error text-on-error text-[11px] font-bold uppercase tracking-wider hover:bg-error/90 transition-colors rounded-xs shadow-xs"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Terminate Session</span>
        </Link>

        {/* Audit Compliance Seal */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[9px] uppercase tracking-wider text-on-surface-variant font-bold">
            Campus Grid Controller
          </span>
          <span className="font-mono text-[9px] text-secondary font-bold">
            CENTRAL NODE ACTIVE
          </span>
        </div>
      </div>
    </aside>
  );
}
