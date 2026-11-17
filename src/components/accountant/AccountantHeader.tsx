"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  Clock,
  ChevronRight,
  ShieldAlert,
  CreditCard,
  Receipt,
  X,
  CircleDollarSign,
  AlertTriangle,
  Menu,
} from "lucide-react";

interface AccountantHeaderProps {
  breadcrumbTitle?: string;
  onOpenMobileNav?: () => void;
  onToggleMobileNav?: () => void;
  isMobileNavOpen?: boolean;
}

export default function AccountantHeader({
  breadcrumbTitle = "Treasury & Collections",
  onOpenMobileNav,
  onToggleMobileNav,
  isMobileNavOpen = false,
}: AccountantHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close notifications on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const financialAlerts = [
    {
      id: "FIN-ALT-01",
      title: "Cheque Cleared: ₹40,000 (Priya Patel, HDFC #441092)",
      time: "15 min ago",
      type: "success",
    },
    {
      id: "FIN-ALT-02",
      title: "Till Limit Warning: Counter #02 cash exceeds ₹1,25,000",
      time: "40 min ago",
      type: "warning",
    },
    {
      id: "FIN-ALT-03",
      title: "Exam Clearance Deadline: 82 defaulters pending",
      time: "2 hours ago",
      type: "alert",
    },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/95 backdrop-blur-md z-40 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200/90 shadow-xs select-none transition-all">
      {/* Left: Hamburger & Directorate Title */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onToggleMobileNav) {
              onToggleMobileNav();
            } else if (onOpenMobileNav) {
              onOpenMobileNav();
            }
          }}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-[#3D405B] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          aria-label={isMobileNavOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        >
          {isMobileNavOpen ? (
            <X className="w-5 h-5 text-[#3D405B]" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-headline text-xs sm:text-sm font-bold tracking-tight text-[#3D405B] leading-tight truncate">
              Accounts Directorate
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold rounded-md border border-amber-200">
              Till #02
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium truncate">
            Apex Institute &bull; {breadcrumbTitle}
          </span>
        </div>

        {/* Desktop FY Badges */}
        <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-200">
          <div className="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold rounded-lg">
            AY 2025-26
          </div>
          <div className="px-2.5 py-1 bg-slate-100 text-slate-600 font-mono text-[11px] font-semibold rounded-lg">
            TERM II (EVEN)
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 font-mono text-[11px] font-bold rounded-lg border border-emerald-200/60">
            <span className="w-2 h-2 bg-emerald-500 inline-block rounded-full animate-pulse"></span>
            <span>COUNTER OPEN</span>
          </div>
        </div>
      </div>

      {/* Right: Clock, Notifications, Profile Chip */}
      <div className="flex items-center gap-3 sm:gap-4" ref={dropdownRef}>
        {/* Real-time Clock */}
        <div className="hidden md:flex flex-col items-end font-mono">
          <span className="text-xs text-slate-800 font-bold">
            {currentTime || "14:28:42 IST"}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            LIVE FY 2025-26
          </span>
        </div>

        {/* Financial Alerts Dropdown */}
        <div className="relative pl-2 sm:pl-3 border-l border-slate-200">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-[#3D405B] hover:bg-slate-100 transition-colors rounded-xl cursor-pointer"
            title="Fiscal Directives & Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white font-mono text-[9px] flex items-center justify-center font-bold rounded-full">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3D405B]">
                    Bursar Audit Notifications
                  </span>
                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md">
                    3 Active
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 mt-2 flex flex-col">
                {financialAlerts.map((alert) => (
                  <div key={alert.id} className="py-2.5 flex flex-col gap-1 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-[#3D405B] text-[11px] leading-snug">
                        {alert.title}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">
                        {alert.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2.5 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <Link
                  href="/accountant/reports"
                  onClick={() => setShowNotifications(false)}
                  className="font-semibold text-amber-700 hover:text-amber-800"
                >
                  View Full Audit Log &rarr;
                </Link>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Chip */}
        <Link
          href="/accountant/profile"
          className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-xs shadow-2xs">
            RK
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-[#3D405B] leading-tight">
              Rajesh Kumar
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Bursar Cashier
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
