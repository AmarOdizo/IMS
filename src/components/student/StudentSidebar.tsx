"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  CreditCard,
  Award,
  ShieldCheck,
  Contact,
  Bell,
  GraduationCap,
  LogOut,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "Profile", href: "/student/profile", icon: User },
  { name: "Attendance", href: "/student/attendance", icon: CalendarCheck },
  { name: "Fees", href: "/student/fees", icon: CreditCard },
  { name: "Results", href: "/student/results", icon: Award },
  { name: "Certificates", href: "/student/certificates", icon: ShieldCheck },
  { name: "ID Card", href: "/student/id-card", icon: Contact },
  { name: "Notices", href: "/student/notices", icon: Bell },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest text-on-surface z-50 flex flex-col justify-between border-r border-[#d5e3fc] shadow-[2px_0_0_0_#d5e3fc] select-none">
      {/* Top Branding & Nav */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-3 bg-primary-container text-on-primary border-b border-[#324769] shrink-0">
          <div className="h-8 w-8 bg-secondary-container text-primary font-bold flex items-center justify-center text-sm rounded-xs shadow-xs">
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-sm font-bold uppercase tracking-tight text-on-primary leading-tight truncate">
              Apex Institute
            </span>
            <span className="text-[10px] tracking-wider uppercase text-on-primary-container font-mono font-semibold truncate">
              Student Portal
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/student"
                ? pathname === "/student"
                : pathname.startsWith(item.href);

            const IconComponent = item.icon;

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
                <IconComponent
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-on-primary" : "text-secondary"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Controls: Terminate Session, Compliance */}
      <div className="p-3 bg-surface-container-lowest border-t border-[#d5e3fc] flex flex-col gap-2.5 shrink-0">
        {/* Sign Out Button linking to /login */}
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs uppercase tracking-wider font-semibold text-error hover:bg-error-container hover:text-on-error-container border border-error/30 transition-colors rounded-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out / Lock</span>
        </Link>

        {/* Compliance Seal */}
        <div className="flex items-center justify-between text-[9px] font-mono text-on-surface-variant/70 border-t border-[#d5e3fc]/60 pt-1.5">
          <span>APEX-IMS CORE</span>
          <span>ISO-27001</span>
        </div>
      </div>
    </aside>
  );
}
