"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  CreditCard,
  History,
  Receipt,
  AlertTriangle,
  BarChart3,
  User,
  Building2,
  LogOut,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/accountant", icon: LayoutDashboard },
  { name: "Fee Ledgers", href: "/accountant/fee-details", icon: Search },
  { name: "Record Payment", href: "/accountant/record-payment", icon: CreditCard },
  { name: "Payment History", href: "/accountant/payment-history", icon: History },
  { name: "Receipts", href: "/accountant/receipts", icon: Receipt },
  { name: "Pending Dues", href: "/accountant/pending-dues", icon: AlertTriangle },
  { name: "Reports", href: "/accountant/reports", icon: BarChart3 },
  { name: "Profile", href: "/accountant/profile", icon: User },
];

export default function AccountantSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white text-slate-800 z-50 flex flex-col justify-between border-r border-slate-200 shadow-sm select-none">
      {/* Top Branding & Nav */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center gap-3 bg-white text-slate-900 border-b border-slate-200 shrink-0">
          <div className="w-9 h-9 bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center rounded-xl shadow-xs shrink-0">
            <Building2 className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline text-sm font-bold tracking-tight text-slate-900 leading-tight truncate">
              Apex Institute
            </span>
            <span className="text-[10px] tracking-wider uppercase text-emerald-700 font-semibold truncate">
              Accountant Portal
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/accountant"
                ? pathname === "/accountant"
                : pathname.startsWith(item.href);

            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold transition-all rounded-xl ${
                  isActive
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
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
  );
}
