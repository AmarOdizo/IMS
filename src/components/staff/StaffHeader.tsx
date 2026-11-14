"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Bell,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  FileText,
  X
} from "lucide-react";

interface StaffHeaderProps {
  breadcrumbTitle?: string;
}

export default function StaffHeader({
  breadcrumbTitle = "Faculty Workspace",
}: StaffHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotices = [
    {
      id: "MEMO-01",
      title: "Mid-Term Question Paper Submission Deadline (May 28)",
      time: "1 hour ago",
      priority: "urgent",
    },
    {
      id: "MEMO-02",
      title: "Final Exam Script Moderation Guidelines Ratified",
      time: "Yesterday",
      priority: "high",
    },
    {
      id: "MEMO-03",
      title: "NAAC Criterion 2 Data Verification Working Group",
      time: "3 days ago",
      priority: "normal",
    },
  ];

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-[#0D2545]/15 z-40 flex items-center justify-between px-6 shadow-xs">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2">
        <Link
          href="/staff"
          className="text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary font-semibold"
        >
          Faculty Portal
        </Link>
        <ChevronRight className="w-4 h-4 text-outline" />
        <span className="font-mono text-xs text-primary font-bold">
          {breadcrumbTitle}
        </span>
      </div>

      {/* Right: Session Info, Notifications, Faculty Profile */}
      <div className="flex items-center gap-4">
        {/* Academic Session Pill */}
        <div className="hidden lg:flex items-center px-3 py-1 bg-surface-container text-primary font-mono text-xs uppercase tracking-wider border border-[#d5e3fc] rounded-sm">
          <span className="w-1.5 h-1.5 bg-secondary mr-2 inline-block rounded-full"></span>
          AY 2025-26 • Even Term
        </div>

        {/* Biometric Status Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-mono text-[11px] uppercase font-bold rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#047857] animate-pulse"></span>
          Biometric In 08:42
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors rounded-sm"
            title="Faculty Memos & Notices"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border-2 border-primary shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <span className="font-headline text-xs font-bold uppercase text-primary">
                    Faculty Bulletins
                  </span>
                  <span className="px-1.5 py-0.2 bg-secondary text-on-secondary text-[10px] font-mono font-bold">
                    3 New
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-outline hover:text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-[#cbd5e1] mt-2">
                {mockNotices.map((n) => (
                  <Link
                    key={n.id}
                    href="/staff/notices"
                    onClick={() => setShowNotifications(false)}
                    className="py-2.5 flex flex-col gap-1 hover:bg-surface-container-low transition-colors block text-left"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-outline font-semibold">{n.id}</span>
                      <span
                        className={`px-1.5 py-0.2 uppercase font-bold tracking-tight text-[9px] ${
                          n.priority === "urgent"
                            ? "bg-error text-on-error"
                            : n.priority === "high"
                            ? "bg-secondary text-on-secondary"
                            : "bg-surface-container text-on-surface"
                        }`}
                      >
                        {n.priority}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-primary line-clamp-2">
                      {n.title}
                    </span>
                    <span className="text-[10px] text-on-surface-variant flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-secondary" /> {n.time}
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/staff/notices"
                onClick={() => setShowNotifications(false)}
                className="mt-3 block text-center py-1.5 bg-surface-container text-primary font-mono text-[11px] uppercase font-bold hover:bg-surface-container-high transition-colors"
              >
                View All Circulars &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Faculty Identity Chip */}
        <Link
          href="/staff/profile"
          className="flex items-center gap-2.5 pl-2 py-1 hover:bg-surface-container rounded-sm transition-colors border-l border-[#cbd5e1]"
        >
          <div className="w-8 h-8 rounded-sm bg-primary text-secondary-container flex items-center justify-center font-bold text-xs shadow-sm">
            AS
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-primary leading-tight">
              Mr. Amit Sharma
            </span>
            <span className="text-[10px] font-mono text-on-surface-variant leading-tight">
              EMP-CS-2018-842
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}

