"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronRight,
  Clock,
  X,
  Menu,
} from "lucide-react";

interface StaffHeaderProps {
  breadcrumbTitle?: string;
  onOpenMobileNav?: () => void;
  onToggleMobileNav?: () => void;
  isMobileNavOpen?: boolean;
}

// Short tab names matching StaffSidebar exactly
const routeTitleMap: Record<string, string> = {
  "/staff": "Dashboard",
  "/staff/profile": "Profile",
  "/staff/batches": "Batches",
  "/staff/students": "Students",
  "/staff/attendance": "Attendance",
  "/staff/exams": "Marks Entry",
  "/staff/id-card": "ID Card",
  "/staff/notices": "Notices",
};

export default function StaffHeader({
  breadcrumbTitle,
  onOpenMobileNav,
  onToggleMobileNav,
  isMobileNavOpen = false,
}: StaffHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (breadcrumbTitle && breadcrumbTitle !== "Faculty Workspace") {
      return breadcrumbTitle;
    }
    if (routeTitleMap[pathname]) {
      return routeTitleMap[pathname];
    }
    const matched = Object.keys(routeTitleMap)
      .filter((k) => k !== "/staff")
      .find((k) => pathname.startsWith(k));
    if (matched) {
      return routeTitleMap[matched];
    }
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (last && last !== "staff") {
      return last
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
    return "Dashboard";
  };

  const currentTitle = getPageTitle();

  const mockNotices = [
    {
      id: "MEMO-01",
      title: "Mid-Term Question Paper Submission Deadline (May 25)",
      time: "1 hour ago",
      priority: "urgent",
    },
    {
      id: "MEMO-02",
      title: "Semester IV Theory Datesheet & Moderation Guidelines",
      time: "Yesterday",
      priority: "high",
    },
    {
      id: "MEMO-03",
      title: "Department Academic Review Committee Meeting at 3:30 PM",
      time: "2 days ago",
      priority: "normal",
    },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-3 sm:px-6 shadow-xs select-none">
      {/* Left: Hamburger & Faculty Portal / Short Tab Name from Sidebar */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
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
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          aria-label={isMobileNavOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        >
          {isMobileNavOpen ? (
            <X className="w-5 h-5 text-emerald-700" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        <Link
          href="/staff"
          className="hidden sm:inline-block text-xs uppercase tracking-wider text-slate-500 hover:text-slate-800 font-semibold transition-colors"
        >
          Faculty Portal
        </Link>
        <ChevronRight className="hidden sm:inline-block w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 sm:px-2.5 py-1 rounded-md border border-slate-200/80 truncate">
          {currentTitle}
        </span>
      </div>

      {/* Right: Notifications & Faculty Profile Chip */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Faculty Memos & Bulletins"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Faculty Bulletins
                  </span>
                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">
                    3 New
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 mt-2 max-h-72 overflow-y-auto">
                {mockNotices.map((n) => (
                  <Link
                    key={n.id}
                    href="/staff/notices"
                    onClick={() => setShowNotifications(false)}
                    className="py-2.5 px-1 flex flex-col gap-1 hover:bg-slate-50 rounded-xl transition-colors block text-left"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono text-slate-400 font-semibold">{n.id}</span>
                      <span
                        className={`px-1.5 py-0.5 uppercase font-bold tracking-tight text-[9px] rounded-full border ${
                          n.priority === "urgent"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : n.priority === "high"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {n.priority}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug">
                      {n.title}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{n.time}</span>
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/staff/notices"
                onClick={() => setShowNotifications(false)}
                className="mt-3 block text-center py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-200"
              >
                View All Circulars &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Faculty Identity Profile Chip */}
        <Link
          href="/staff/profile"
          className="flex items-center gap-2.5 pl-2.5 py-1 hover:bg-slate-100 rounded-xl transition-colors border-l border-slate-200 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            RS
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 leading-tight">
              Prof. Rajesh Sharma
            </span>
            <span className="text-[10px] text-slate-400 leading-tight">
              EMP-CS-2018-842
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
