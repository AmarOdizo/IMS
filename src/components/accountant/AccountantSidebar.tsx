"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightLeft } from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/accountant", icon: "dashboard" },
  { name: "Student Fee Details", href: "/accountant/fee-details", icon: "manage_search" },
  { name: "Record Fee Payment", href: "/accountant/record-payment", icon: "payments" },
  { name: "Payment History", href: "/accountant/payment-history", icon: "history" },
  { name: "Fee Receipts", href: "/accountant/receipts", icon: "receipt_long" },
  { name: "Pending Dues", href: "/accountant/pending-dues", icon: "pending_actions" },
  { name: "Reports", href: "/accountant/reports", icon: "analytics" },
  { name: "My Profile", href: "/accountant/profile", icon: "badge" },
];

export default function AccountantSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-on-primary z-50 flex flex-col justify-between border-r border-[#0D2545] select-none shadow-[2px_0_0_0_#0D2545]">
      {/* Top Branding & Nav */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div className="h-16 flex flex-col justify-center px-5 bg-tertiary-container border-b border-[#19477e] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 bg-secondary-container text-primary font-bold flex items-center justify-center text-base rounded-sm shadow-sm">
              <span className="material-symbols-outlined text-lg text-primary">account_balance</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-sm font-bold uppercase tracking-tight text-on-primary leading-tight truncate">
                Apex IMS
              </span>
              <span className="text-[10px] uppercase tracking-widest text-secondary-container font-medium truncate">
                Financial Cadre
              </span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto py-2 flex flex-col">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/accountant"
                ? pathname === "/accountant"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-primary-container text-on-primary shadow-[inset_3px_0_0_0_#99c0fe]"
                    : "text-primary-fixed-dim hover:bg-primary-container hover:text-on-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
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
              href="/admin"
              className="py-1 px-1 bg-surface-container-lowest/10 border border-white/10 hover:border-secondary-container text-white/80 hover:text-white transition-colors"
            >
              Admin
            </Link>
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
          </div>
        </div>

        {/* Accountant Session & Sign Out */}
        <Link
          href="/login"
          className="flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-error-container hover:bg-error hover:text-on-error transition-colors rounded-xs"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out</span>
          </div>
          <span className="text-[9px] font-mono text-white/40">v4.2-ACC</span>
        </Link>
      </div>
    </aside>
  );
}
