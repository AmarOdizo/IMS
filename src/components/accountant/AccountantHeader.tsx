"use client";

import { useState, useEffect } from "react";
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
  AlertTriangle
} from "lucide-react";

interface AccountantHeaderProps {
  breadcrumbTitle?: string;
}

export default function AccountantHeader({
  breadcrumbTitle = "Treasury & Collections",
}: AccountantHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

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

  const financialAlerts = [
    {
      id: "FIN-ALT-01",
      title: "Cheque Cleared: ₹40,000 (Priya Patel, HDFC #441092)",
      time: "15 min ago",
      type: "success",
    },
    {
      id: "FIN-ALT-02",
      title: "Exam Roll Hold Triggered: 4 accounts crossed ₹40k dues",
      time: "1 hour ago",
      type: "warning",
    },
    {
      id: "FIN-ALT-03",
      title: "Till #02 Cash Limit Approaching ₹1,50,000 threshold",
      time: "2 hours ago",
      type: "alert",
    },
  ];

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-md z-40 flex items-center justify-between px-6 border-b border-[#d5e3fc] shadow-xs select-none">
      {/* Left: Directorate Title & Badges */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="font-headline text-sm font-bold tracking-tight text-primary leading-tight">
            Apex Institute - Accounts &amp; Bursar Directorate
          </span>
          <span className="font-mono text-[11px] text-secondary font-semibold">
            NODE: BURSAR-FIN-01 • {breadcrumbTitle}
          </span>
        </div>

        <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-[#d5e3fc]">
          <div className="px-2 py-0.5 bg-surface-container-high text-on-surface font-mono text-[11px] font-semibold">
            AY 2024-25
          </div>
          <div className="px-2 py-0.5 bg-surface-container font-mono text-[11px] text-on-surface font-semibold">
            TERM II (EVEN)
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[11px] font-bold">
            <span className="w-2 h-2 bg-secondary inline-block rounded-xs animate-pulse"></span>
            <span>COUNTER REGISTER OPEN (Till #02)</span>
          </div>
        </div>
      </div>

      {/* Right: Clock, Notifications, Profile Chip */}
      <div className="flex items-center gap-4">
        {/* Real-time Clock */}
        <div className="hidden md:flex flex-col items-end font-mono">
          <span className="text-xs text-on-surface font-bold">
            {currentTime || "14:28:42 IST"}
          </span>
          <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">
            24 OCT 2024
          </span>
        </div>

        {/* Financial Alerts Dropdown */}
        <div className="relative pl-3 border-l border-[#d5e3fc]">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors rounded-xs"
            title="Fiscal Directives & Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error font-mono text-[9px] flex items-center justify-center font-bold rounded-xs">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-84 bg-surface-container-lowest border-2 border-primary shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <span className="font-headline text-xs font-bold uppercase text-primary">
                    Bursar Audit Notifications
                  </span>
                  <span className="px-1.5 py-0.5 bg-secondary text-on-secondary text-[9px] font-mono font-bold">
                    3 Active
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-outline hover:text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-surface-container mt-2 flex flex-col">
                {financialAlerts.map((alert) => (
                  <div key={alert.id} className="py-2.5 flex flex-col gap-1 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-primary text-[11px] leading-snug">
                        {alert.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-mono">
                      <span>{alert.id}</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#cbd5e1] mt-2 flex justify-between items-center text-[10px] font-mono">
                <Link
                  href="/accountant/reports"
                  onClick={() => setShowNotifications(false)}
                  className="text-secondary font-bold hover:underline"
                >
                  View Financial Audit Trail →
                </Link>
                <span className="text-outline">Live Sync</span>
              </div>
            </div>
          )}
        </div>

        {/* Accountant Identity Chip */}
        <Link
          href="/accountant/profile"
          className="flex items-center gap-2.5 pl-2 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-primary text-secondary-container font-mono font-bold text-xs flex items-center justify-center border border-[#0d2545] shadow-xs">
            RK
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs text-on-surface font-bold leading-tight">
              Mr. Rajesh Kumar
            </span>
            <span className="font-mono text-[10px] text-secondary font-semibold leading-tight">
              Chief Bursar (EMP-FIN-309)
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}

