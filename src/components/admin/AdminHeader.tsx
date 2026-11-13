"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Plus,
  Bell,
  ChevronDown,
  UserCheck,
  CreditCard,
  UserPlus,
  FileText
} from "lucide-react";

export default function AdminHeader() {
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant/30 z-40 flex items-center justify-between px-6">
      {/* Left: Breadcrumbs & Search */}
      <div className="flex items-center gap-6">
        <nav className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-on-surface-variant font-medium">
          <span className="hover:text-on-surface cursor-pointer">IMS Core</span>
          <span className="material-symbols-outlined text-[0.875rem]">
            chevron_right
          </span>
          <span className="text-primary font-bold">Academic Console</span>
        </nav>

        <div className="relative hidden xl:flex items-center w-72">
          <Search className="absolute left-3 text-on-surface-variant w-4 h-4" />
          <input
            className="w-full bg-surface border border-outline-variant/40 pl-9 pr-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary-container placeholder:text-on-surface-variant/60"
            placeholder="Search students, ID, records..."
            type="text"
          />
        </div>
      </div>

      {/* Right: Academic Year, Quick Actions, Profile */}
      <div className="flex items-center gap-4">
        {/* Academic Year Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container border border-outline-variant/40 font-mono text-xs text-primary">
          <Calendar className="w-3.5 h-3.5 text-secondary" />
          <span className="font-semibold">AY 2024-25</span>
        </div>

        {/* Quick Create Dropdown / Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowQuickModal(!showQuickModal)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-container text-white text-xs uppercase tracking-wider font-semibold hover:bg-primary transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Quick Create</span>
          </button>

          {showQuickModal && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant/40 shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1">
              <Link
                href="/admin/students"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <UserPlus className="w-4 h-4 text-secondary" />
                <span>+ New Student Admission</span>
              </Link>
              <Link
                href="/admin/fees"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <CreditCard className="w-4 h-4 text-secondary" />
                <span>+ Record Fee Payment</span>
              </Link>
              <Link
                href="/admin/attendance"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <UserCheck className="w-4 h-4 text-secondary" />
                <span>+ Mark Attendance</span>
              </Link>
              <Link
                href="/admin/notices"
                onClick={() => setShowQuickModal(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container-low transition-colors"
              >
                <FileText className="w-4 h-4 text-secondary" />
                <span>+ Broadcast Notice</span>
              </Link>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-0.5 right-0.5 flex items-center justify-center h-4 w-4 bg-error text-white text-[10px] leading-none font-bold rounded-sm">
              4
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant/40 shadow-xl py-2 z-50 text-xs">
              <div className="px-3 py-1 font-bold text-primary border-b border-outline-variant/20 flex justify-between">
                <span>Recent Alerts</span>
                <span className="text-[10px] text-secondary">4 new</span>
              </div>
              <div className="divide-y divide-outline-variant/10 max-h-60 overflow-y-auto">
                <div className="px-3 py-2 hover:bg-surface-container-low cursor-pointer">
                  <p className="font-semibold text-primary">New Admission Applied</p>
                  <p className="text-on-surface-variant text-[11px]">Kavita Narang (MBA Tech Sem 1)</p>
                  <span className="text-[9px] text-secondary font-mono">10 mins ago</span>
                </div>
                <div className="px-3 py-2 hover:bg-surface-container-low cursor-pointer">
                  <p className="font-semibold text-primary">Fee Payment Recorded</p>
                  <p className="text-on-surface-variant text-[11px]">$2,450 received via UPI (Receipt #9042)</p>
                  <span className="text-[9px] text-secondary font-mono">25 mins ago</span>
                </div>
                <div className="px-3 py-2 hover:bg-surface-container-low cursor-pointer">
                  <p className="font-semibold text-error">Low Attendance Alert</p>
                  <p className="text-on-surface-variant text-[11px]">Diploma Mech Batch 23 dropped below 75%</p>
                  <span className="text-[9px] text-secondary font-mono">1 hr ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-outline-variant/40"></div>

        {/* Profile Card */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-90">
          <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs border border-outline-variant/40">
            MV
          </div>
          <div className="hidden md:flex flex-col text-left leading-tight">
            <span className="text-xs uppercase text-on-surface font-semibold">
              Dr. Margaret Vance
            </span>
            <span className="text-[10px] uppercase text-on-surface-variant">
              Super Admin (Dean)
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-on-surface-variant" />
        </div>
      </div>
    </header>
  );
}

