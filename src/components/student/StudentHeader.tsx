"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Bell,
  ChevronRight,
  User,
  ShieldCheck,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";

interface StudentHeaderProps {
  breadcrumbTitle?: string;
}

export default function StudentHeader({
  breadcrumbTitle = "Academic Operations",
}: StudentHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotices = [
    {
      id: "NTC-01",
      title: "Semester IV Mid-Term Examination Datesheet",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: "NTC-02",
      title: "Distinguished Lecture: AI & Kernel Architecture",
      time: "Yesterday",
      priority: "normal",
    },
    {
      id: "NTC-03",
      title: "Tuition Installment #3 Submission Window Open",
      time: "3 days ago",
      priority: "urgent",
    },
  ];

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-[#d5e3fc] z-40 flex items-center justify-between px-6">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2">
        <Link
          href="/student"
          className="text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary font-semibold"
        >
          Student Portal
        </Link>
        <ChevronRight className="w-4 h-4 text-outline" />
        <span className="font-mono text-xs text-primary font-bold">
          {breadcrumbTitle}
        </span>
      </div>

      {/* Right: Academic Year, Notifications, Profile */}
      <div className="flex items-center gap-5">
        {/* AY / Semester Pill */}
        <div className="hidden md:flex items-center px-3 py-1 bg-surface-container text-on-surface font-mono text-xs uppercase tracking-wider border border-[#d5e3fc]">
          <span className="w-1.5 h-1.5 bg-secondary mr-2 inline-block"></span>
          AY 2025-26 • Sem IV
        </div>

        {/* Academic Calendar Link */}
        <Link
          href="/student/attendance"
          className="relative p-1.5 text-on-surface-variant hover:text-primary transition-colors flex items-center"
          title="Academic Calendar"
        >
          <span className="material-symbols-outlined text-[22px]">
            calendar_month
          </span>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 text-on-surface-variant hover:text-primary transition-colors flex items-center"
            title="Institutional Bulletins"
          >
            <span className="material-symbols-outlined text-[22px]">
              notifications
            </span>
            <span className="absolute top-0 right-0 w-4 h-4 bg-error text-white text-[9px] flex items-center justify-center font-bold leading-none">
              2
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-[#d5e3fc] shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 bg-surface-container border-b border-[#d5e3fc] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Bulletins &amp; Alerts
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-error/10 text-error font-bold px-1.5 py-0.5">
                  2 NEW
                </span>
              </div>
              <div className="divide-y divide-[#d5e3fc]">
                {mockNotices.map((ntc) => (
                  <Link
                    key={ntc.id}
                    href="/student/notices"
                    onClick={() => setShowNotifications(false)}
                    className="p-3 hover:bg-surface-container-low transition-colors block text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[9px] uppercase font-bold px-1 py-0.2 ${
                          ntc.priority === "high" || ntc.priority === "urgent"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {ntc.priority}
                      </span>
                      <span className="text-[10px] font-mono text-on-surface-variant">
                        {ntc.time}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-primary line-clamp-2">
                      {ntc.title}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-2 text-center bg-surface-container-low border-t border-[#d5e3fc]">
                <Link
                  href="/student/notices"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs uppercase font-bold text-secondary hover:underline"
                >
                  View All Institutional Bulletins →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Identity Chip */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#d5e3fc]">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold leading-none text-on-surface">
              Rahul Sharma
            </div>
            <div className="font-mono text-[10px] text-on-surface-variant mt-1 leading-none font-medium">
              APX-2023-CS-042
            </div>
          </div>
          <Link
            href="/student/profile"
            className="relative group"
            title="View Student Profile"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm group-hover:ring-2 group-hover:ring-secondary transition-all">
              <span className="material-symbols-outlined text-[18px]">
                person
              </span>
            </div>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#047857] border-2 border-white rounded-full"
              title="Active & Enrolled"
            ></span>
          </Link>
        </div>
      </div>
    </header>
  );
}

