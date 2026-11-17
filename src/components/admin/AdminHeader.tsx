"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Calendar,
  Plus,
  Bell,
  ChevronDown,
  ChevronRight,
  UserCheck,
  CreditCard,
  UserPlus,
  FileText,
  X,
  Layers,
  Award,
  Settings,
  BarChart3,
  LogOut,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Menu,
} from "lucide-react";

// Route title mapping for admin sections
const routeTitleMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/students": "Students",
  "/admin/staff": "Staff Directory",
  "/admin/courses": "Courses & Syllabus",
  "/admin/batches": "Batches & Cohorts",
  "/admin/attendance": "Attendance Register",
  "/admin/fees": "Fee Accounting",
  "/admin/exams": "Examination Matrix",
  "/admin/certificates": "Certificates & Degrees",
  "/admin/id-cards": "Identity Cards",
  "/admin/notices": "Notices & Circulars",
  "/admin/reports": "Operational Reports",
  "/admin/settings": "System Settings",
};

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "admission" | "fee" | "alert" | "exam";
  href: string;
}

const notificationsData: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Admission Application",
    desc: "Kavita Narang applied for B.Tech CS (Lateral Entry)",
    time: "10 mins ago",
    type: "admission",
    href: "/admin/students",
  },
  {
    id: "notif-2",
    title: "Fee Payment Recorded",
    desc: "₹48,500 received via UPI for Tranche 2 (Receipt #8492)",
    time: "25 mins ago",
    type: "fee",
    href: "/admin/fees",
  },
  {
    id: "notif-3",
    title: "Attendance Deficit Alert",
    desc: "B.Tech ME 4th Sem Section B dropped below 75% threshold",
    time: "1 hour ago",
    type: "alert",
    href: "/admin/attendance",
  },
  {
    id: "notif-4",
    title: "Exam Marks Finalized",
    desc: "Continuous assessment marks committed for CS-401 cohort",
    time: "2 hours ago",
    type: "exam",
    href: "/admin/exams",
  },
];

interface AdminHeaderProps {
  onOpenMobileNav?: () => void;
}

export default function AdminHeader({ onOpenMobileNav }: AdminHeaderProps) {
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setShowQuickModal(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    if (routeTitleMap[pathname]) {
      return routeTitleMap[pathname];
    }
    const matched = Object.keys(routeTitleMap)
      .filter((k) => k !== "/admin")
      .find((k) => pathname.startsWith(k));
    if (matched) {
      return routeTitleMap[matched];
    }
    const segments = pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1];
    if (last && last !== "admin") {
      return last
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
    return "Dashboard";
  };

  const currentTitle = getPageTitle();

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/90 z-40 flex items-center justify-between px-3 sm:px-6 select-none shadow-2xs"
    >
      {/* Left: Hamburger & Dynamic Breadcrumbs */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-[#3D405B] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs truncate">
          <Link
            href="/admin"
            className="hidden sm:inline-block font-semibold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider"
          >
            Admin Console
          </Link>
          <ChevronRight className="hidden sm:inline-block w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-bold text-[#3D405B] bg-slate-100/90 px-2 sm:px-2.5 py-1 rounded-lg border border-slate-200/80 truncate text-[11px] sm:text-xs">
            {currentTitle}
          </span>
        </nav>

        {/* Global Search Bar */}
        <div className="relative hidden xl:flex items-center w-72">
          <Search className="absolute left-3 text-slate-400 w-4 h-4 pointer-events-none" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 pl-9 pr-12 py-1.5 text-xs text-slate-800 rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
            placeholder="Search students, roll no, records..."
            type="text"
          />
          <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded shadow-2xs pointer-events-none">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Right: Academic Year, Quick Actions, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Academic Year Badge */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-xl font-mono text-xs text-[#3D405B] shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold">AY 2025–26</span>
        </div>

        {/* Quick Create Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowQuickModal(!showQuickModal);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3D405B] hover:bg-[#2E3046] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quick Create</span>
          </button>

          {showQuickModal && (
            <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                Administrative Actions
              </div>

              <Link
                href="/admin/students"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#3D405B] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span>New Student Admission</span>
              </Link>

              <Link
                href="/admin/fees"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#3D405B] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span>Record Fee Payment</span>
              </Link>

              <Link
                href="/admin/attendance"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#3D405B] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span>Daily Attendance Sync</span>
              </Link>

              <Link
                href="/admin/batches"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#3D405B] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <span>Create Batch Cohort</span>
              </Link>

              <Link
                href="/admin/notices"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#3D405B] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span>Broadcast Circular</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowQuickModal(false);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 flex items-center justify-center h-4 w-4 bg-rose-500 text-white text-[10px] leading-none font-bold rounded-full">
              4
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Administrative Alerts
                  </span>
                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">
                    4 New
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
                {notificationsData.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setShowNotifications(false)}
                    className="py-2.5 px-1.5 flex flex-col gap-1 hover:bg-slate-50 rounded-xl transition-colors block text-left"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-[#3D405B]">
                        {item.title}
                      </span>
                      <span className="text-slate-400 font-mono">{item.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="pt-3 mt-1 border-t border-slate-100 text-center">
                <Link
                  href="/admin/notices"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  <span>View All Circulars &amp; Directives</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200"></div>

        {/* Profile Chip & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowQuickModal(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 hover:bg-slate-100/80 rounded-xl transition-all cursor-pointer text-left"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#3D405B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                MV
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-xs font-semibold text-slate-800">
                Dr. Margaret Vance
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Super Admin &bull; Dean
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 border-b border-slate-100 mb-1 bg-slate-50/70 rounded-xl">
                <p className="text-xs font-bold text-[#3D405B]">Dr. Margaret Vance</p>
                <p className="text-[11px] text-slate-400 font-mono">dean.office@apex.edu</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-full border border-emerald-200">
                    <Shield className="w-3 h-3" />
                    Central Admin
                  </span>
                </div>
              </div>

              <Link
                href="/admin/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#3D405B] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>System Configuration</span>
              </Link>

              <Link
                href="/admin/reports"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#3D405B] hover:bg-slate-50 rounded-xl transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-slate-500" />
                <span>Executive Reports</span>
              </Link>

              <div className="h-px bg-slate-100 my-1"></div>

              <Link
                href="/login"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
