"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightLeft } from "lucide-react";

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
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-on-primary z-50 flex flex-col justify-between border-r border-[#0D2545] select-none shadow-[2px_0_0_0_#0D2545]">
      {/* Top Branding & Nav */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div className="h-16 flex flex-col justify-center px-5 bg-tertiary-container border-b border-[#19477e] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-secondary-container text-primary font-bold flex items-center justify-center text-base rounded-sm shadow-sm">
              A
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-sm font-bold uppercase tracking-tight text-on-primary leading-tight truncate">
                Apex Institute
              </span>
              <span className="text-[10px] uppercase tracking-widest text-secondary-container font-medium truncate">
                Admin Console
              </span>
            </div>
          </div>
        </div>

        {/* Navigation List (Scrollable for 13 items) */}
        <nav className="flex-1 overflow-y-auto py-2 flex flex-col">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-primary-container text-on-primary shadow-[inset_3px_0_0_0_#99c0fe]"
                    : "text-primary-fixed-dim hover:bg-primary-container hover:text-on-primary"
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

      {/* Bottom Switcher & Logout */}
      <div className="p-3 border-t border-[#19477e] flex flex-col gap-2 shrink-0">
        {/* Role Portal Quick Switcher */}
        <div className="bg-primary-container/60 p-2 rounded-xs border border-white/10">
          <div className="text-[9px] uppercase font-bold text-secondary-fixed-dim tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ArrowRightLeft className="w-2.5 h-2.5" /> Switch Portal
            </span>
            <span className="text-[8px] bg-secondary/40 text-secondary-container px-1 py-0.5 rounded-xs font-mono">
              ROLE MESH
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px] font-medium text-center">
            <Link
              href="/student"
              className="py-1 px-1 bg-surface-container-lowest/10 border border-white/10 hover:border-secondary-container text-white/80 hover:text-white transition-colors"
            >
              Student
            </Link>
            <Link
              href="/staff"
              className="py-1 px-1 bg-surface-container-lowest/10 border border-white/10 hover:border-secondary-container text-white/80 hover:text-white transition-colors"
            >
              Staff
            </Link>
            <Link
              href="/accountant"
              className="py-1 px-1 bg-surface-container-lowest/10 border border-white/10 hover:border-secondary-container text-white/80 hover:text-white transition-colors"
            >
              Accounts
            </Link>
          </div>
        </div>

        {/* Admin Session & Sign Out */}
        <Link
          href="/login"
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-error-container hover:bg-error hover:text-on-error transition-colors rounded-xs"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </div>
          <span className="text-[9px] font-mono text-white/40">v4.2-ADM</span>
        </Link>
      </div>
    </aside>
  );
}
