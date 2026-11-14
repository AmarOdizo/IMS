"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Radio,
  Wifi,
  Database,
  ShieldCheck,
  ChevronRight,
  CreditCard,
  UserPlus,
  FileText,
  Printer,
  Sparkles,
  Building2,
  Bell,
  CheckCheck,
  X,
  Banknote,
  Search,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("MAR");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto font-body text-on-surface select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary px-4 py-3 shadow-lg flex items-center gap-2 border border-secondary font-mono text-xs animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-secondary-container" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Executive Command Header Banner */}
      <div className="bg-surface-container-lowest p-6 border border-[#d5e3fc] shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-primary/5 via-secondary/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-primary text-on-primary font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider font-semibold rounded-xs">
                CAMPUS GOVERNANCE
              </span>
              <span className="bg-secondary-container text-primary font-mono text-[10px] px-2 py-0.5 uppercase font-bold border border-[#a8c4f0] rounded-xs">
                SYS-NODE: REG-CORE-A
              </span>
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="font-mono text-[10px] uppercase font-bold">
                  CENTRAL GRID LIVE &bull; 99.98% TELEMETRY
                </span>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-primary font-headline mt-1">
              Institutional Command &amp; Operational Matrix
            </h1>
            <p className="text-xs text-on-surface-variant flex items-center gap-2 flex-wrap font-sans">
              <span className="font-semibold text-primary">Apex Institute of Technology &amp; Management</span>
              <span>&bull;</span>
              <span>Academic Year 2025-26 (Even Term)</span>
              <span>&bull;</span>
              <span className="font-mono text-secondary font-bold">Main Campus 01 (North Node)</span>
            </p>
          </div>

          {/* Quick Action Deck */}
          <div className="flex items-center flex-wrap gap-2">
            <Link
              href="/admin/students"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary text-on-primary text-xs uppercase tracking-wider font-mono font-bold hover:bg-primary/95 transition-all shadow-xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5 text-secondary-container" />
              <span>+ New Admission</span>
            </Link>
            <Link
              href="/admin/fees"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs uppercase tracking-wider font-mono font-bold transition-all border border-[#d5e3fc] cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5 text-secondary" />
              <span>+ Fees &amp; Receipts</span>
            </Link>
            <Link
              href="/admin/attendance"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs uppercase tracking-wider font-mono font-bold transition-all border border-[#d5e3fc] cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-secondary" />
              <span>+ Mark Attendance</span>
            </Link>
            <Link
              href="/admin/notices"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-high hover:bg-surface-container-highest text-primary text-xs uppercase tracking-wider font-mono font-bold transition-all border border-[#d5e3fc] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-secondary" />
              <span>+ Broadcast Circular</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. KPI Metric Summary Tiles (5-Card Dense Strip in INR) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* KPI 1 */}
        <div className="bg-surface-container-lowest p-4 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between border-l-4 border-l-primary">
          <div className="flex items-start justify-between">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-mono font-bold">
              Total Enrolled Students
            </span>
            <GraduationCap className="w-5 h-5 text-secondary" />
          </div>
          <div className="my-2">
            <div className="font-headline text-2xl font-bold text-primary tracking-tight">
              2,480
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              +8.4%
            </span>
            <span className="text-on-surface-variant text-[11px]">vs last academic term</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-lowest p-4 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between border-l-4 border-l-secondary">
          <div className="flex items-start justify-between">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-mono font-bold">
              Active Faculty &amp; Staff
            </span>
            <Users className="w-5 h-5 text-secondary" />
          </div>
          <div className="my-2">
            <div className="font-headline text-2xl font-bold text-primary tracking-tight">
              142
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container text-primary font-bold text-[10px] border border-[#d5e3fc]">
              98.6%
            </span>
            <span className="text-on-surface-variant text-[11px]">verified on duty today</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface-container-lowest p-4 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between border-l-4 border-l-secondary-container">
          <div className="flex items-start justify-between">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-mono font-bold">
              Today's Attendance
            </span>
            <CalendarCheck className="w-5 h-5 text-secondary" />
          </div>
          <div className="my-2">
            <div className="font-headline text-2xl font-bold text-primary tracking-tight">
              94.2%
            </div>
          </div>
          <div className="flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
            <span className="text-primary font-bold">2,336 Present</span>
            <span>|</span>
            <span className="text-error font-bold">108 Absent</span>
            <span>|</span>
            <span className="text-secondary font-bold">36 Leave</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-surface-container-lowest p-4 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between border-l-4 border-l-primary-container">
          <div className="flex items-start justify-between">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-mono font-bold">
              Monthly Fee Realization
            </span>
            <Banknote className="w-5 h-5 text-secondary" />
          </div>
          <div className="my-2">
            <div className="font-headline text-2xl font-bold text-primary tracking-tight">
              ₹48.60 L
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container-low text-primary font-bold text-[10px] border border-[#d5e3fc]">
              81.0%
            </span>
            <span className="text-on-surface-variant text-[11px]">of ₹60.0 L target</span>
          </div>
        </div>

        {/* KPI 5 */}
        <div className="bg-surface-container-lowest p-4 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between border-l-4 border-l-error">
          <div className="flex items-start justify-between">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-mono font-bold">
              Pending Dues &amp; Arrears
            </span>
            <AlertTriangle className="w-5 h-5 text-error" />
          </div>
          <div className="my-2">
            <div className="font-headline text-2xl font-bold text-error tracking-tight">
              ₹46.50 L
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="inline-flex items-center px-1.5 py-0.5 bg-rose-100 text-rose-800 font-bold text-[10px] border border-rose-300">
              342 DEFAULTERS
            </span>
            <span className="text-on-surface-variant text-[11px]">82 exam holds</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Analytics Grid: Monthly Realization vs Target + Department Attendance Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Monthly Fee Collection vs Targets (Col 7) */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-5 shadow-xs border border-[#d5e3fc] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 border-b border-[#d5e3fc]">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline text-base font-bold text-primary uppercase tracking-tight">
                  Monthly Realization vs Targets (₹ Lakhs)
                </h2>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-surface-container text-secondary font-bold border border-[#d5e3fc]">
                  AY 2025-26
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 font-sans">
                Comparative analysis of forecasted versus actual realized fee intake
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 font-mono">
                {["OCT", "NOV", "DEC", "JAN", "FEB", "MAR"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-xs transition-colors cursor-pointer border ${
                      selectedMonth === m
                        ? "bg-primary text-on-primary border-primary shadow-xs"
                        : "bg-surface-container text-on-surface-variant border-[#d5e3fc] hover:bg-surface-container-high"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-3 font-mono text-xs pl-2 border-l border-[#d5e3fc]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-surface-container-high border border-[#d5e3fc] inline-block rounded-xs"></span>
                  <span className="text-on-surface-variant text-[10px]">Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-primary inline-block rounded-xs"></span>
                  <span className="text-on-surface text-[10px] font-semibold">Realized</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical SVG Bar Graph with Tooltip Indicator */}
          <div className="relative w-full pt-4 pb-2">
            <svg
              className="w-full h-56"
              fill="none"
              viewBox="0 0 620 220"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Lines */}
              <line className="text-[#e2e8f0]" stroke="currentColor" strokeDasharray="2 2" x1="40" x2="600" y1="20" y2="20" />
              <line className="text-[#e2e8f0]" stroke="currentColor" strokeDasharray="2 2" x1="40" x2="600" y1="65" y2="65" />
              <line className="text-[#e2e8f0]" stroke="currentColor" strokeDasharray="2 2" x1="40" x2="600" y1="110" y2="110" />
              <line className="text-[#e2e8f0]" stroke="currentColor" strokeDasharray="2 2" x1="40" x2="600" y1="155" y2="155" />
              <line className="text-[#94a3b8]" stroke="currentColor" x1="40" x2="600" y1="190" y2="190" />

              {/* Y-Axis Labels in INR */}
              <text className="text-[10px] font-mono fill-gray-500" x="10" y="24">₹80L</text>
              <text className="text-[10px] font-mono fill-gray-500" x="10" y="69">₹60L</text>
              <text className="text-[10px] font-mono fill-gray-500" x="10" y="114">₹40L</text>
              <text className="text-[10px] font-mono fill-gray-500" x="10" y="159">₹20L</text>
              <text className="text-[10px] font-mono fill-gray-500" x="22" y="193">₹0</text>

              {/* NOV */}
              <rect fill="#d5e3fc" height="120" width="20" x="70" y="70" />
              <rect fill="#365f97" height="105" width="20" x="94" y="85" />
              <text className="text-[11px] font-mono fill-gray-600" textAnchor="middle" x="87" y="206">NOV</text>

              {/* DEC */}
              <rect fill="#d5e3fc" height="130" width="20" x="160" y="60" />
              <rect fill="#365f97" height="115" width="20" x="184" y="75" />
              <text className="text-[11px] font-mono fill-gray-600" textAnchor="middle" x="177" y="206">DEC</text>

              {/* JAN */}
              <rect fill="#d5e3fc" height="140" width="20" x="250" y="50" />
              <rect fill="#365f97" height="128" width="20" x="274" y="62" />
              <text className="text-[11px] font-mono fill-gray-600" textAnchor="middle" x="267" y="206">JAN</text>

              {/* FEB */}
              <rect fill="#d5e3fc" height="145" width="20" x="340" y="45" />
              <rect fill="#365f97" height="132" width="20" x="364" y="58" />
              <text className="text-[11px] font-mono fill-gray-600" textAnchor="middle" x="357" y="206">FEB</text>

              {/* MAR (ACTIVE MONTH HIGHLIGHTED) */}
              <rect fill="#f1f5f9" height="185" opacity="0.9" width="70" x="424" y="10" />
              <rect fill="#94a3b8" height="160" width="22" x="430" y="30" />
              <rect fill="#001028" height="142" width="22" x="456" y="48" />
              <text className="text-[11px] font-mono fill-primary font-bold" textAnchor="middle" x="447" y="206">
                MAR (CURR)
              </text>

              {/* Hover / Callout Badge on MAR */}
              <g transform="translate(418, 6)">
                <rect fill="#001028" height="30" width="94" x="0" y="0" rx="2" />
                <text className="text-[9px] font-mono font-bold" fill="#FFFFFF" textAnchor="middle" x="47" y="13">
                  REAL: ₹48.60L
                </text>
                <text className="text-[8px] font-mono font-bold" fill="#a8c4f0" textAnchor="middle" x="47" y="24">
                  81.0% OF TGT
                </text>
              </g>

              {/* APR (PROJECTED) */}
              <rect fill="#d5e3fc" height="160" width="20" x="520" y="30" />
              <rect fill="#365f97" height="50" stroke="#001028" strokeDasharray="2 2" width="20" x="544" y="140" />
              <text className="text-[11px] font-mono fill-gray-600" textAnchor="middle" x="537" y="206">APR</text>
            </svg>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-on-surface-variant bg-surface-container-low px-4 py-2 border border-[#d5e3fc]">
            <span>
              Fiscal Pace: <strong className="text-primary font-bold">Day 28 of 31</strong>
            </span>
            <span className="text-primary font-bold">Remaining Target: ₹11,40,000</span>
            <span>
              Daily Intake Velocity: <strong className="text-secondary font-bold">₹1.73L / day</strong>
            </span>
          </div>
        </div>

        {/* Chart 2: Real-time Attendance Analytics & Breakdown (Col 5) */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-5 shadow-xs border border-[#d5e3fc] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
            <div>
              <h2 className="font-headline text-base font-bold text-primary uppercase tracking-tight">
                Department Attendance
              </h2>
              <p className="text-xs text-on-surface-variant font-sans">
                Real-time biometric validation across academic faculties
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 bg-surface-container text-secondary font-bold border border-[#d5e3fc]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              LIVE SYNC
            </span>
          </div>

          {/* Donut Visualization & Department Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 my-auto py-4">
            {/* Donut SVG */}
            <div className="sm:col-span-6 flex justify-center items-center relative">
              <svg className="w-40 h-40" viewBox="0 0 160 160">
                <circle
                  className="text-surface-container-low"
                  cx="80"
                  cy="80"
                  fill="none"
                  r="62"
                  stroke="currentColor"
                  strokeWidth="16"
                />
                {/* B.Tech CS 96% */}
                <circle
                  className="text-primary"
                  cx="80"
                  cy="80"
                  fill="none"
                  r="62"
                  stroke="currentColor"
                  strokeDasharray="140 389"
                  strokeDashoffset="0"
                  strokeWidth="16"
                />
                {/* B.Tech ECE */}
                <circle
                  className="text-secondary"
                  cx="80"
                  cy="80"
                  fill="none"
                  r="62"
                  stroke="currentColor"
                  strokeDasharray="100 389"
                  strokeDashoffset="-140"
                  strokeWidth="16"
                />
                {/* MBA */}
                <circle
                  className="text-secondary-container"
                  cx="80"
                  cy="80"
                  fill="none"
                  r="62"
                  stroke="#365f97"
                  strokeDasharray="80 389"
                  strokeDashoffset="-240"
                  strokeWidth="16"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold font-mono text-primary">94.2%</span>
                <span className="text-[9px] font-mono uppercase text-gray-500 font-bold">Institute Avg</span>
              </div>
            </div>

            {/* Department Attendance Rows */}
            <div className="sm:col-span-6 space-y-2 font-mono">
              <div className="p-2 bg-surface-container-low flex items-center justify-between border-l-3 border-primary">
                <span className="text-xs font-semibold text-on-surface">B.Tech Computer Science</span>
                <span className="text-xs font-bold text-primary">96.0%</span>
              </div>
              <div className="p-2 bg-surface-container-low flex items-center justify-between border-l-3 border-secondary">
                <span className="text-xs font-semibold text-on-surface">B.Tech Electronics</span>
                <span className="text-xs font-bold text-secondary">93.5%</span>
              </div>
              <div className="p-2 bg-surface-container-low flex items-center justify-between border-l-3 border-secondary-container">
                <span className="text-xs font-semibold text-on-surface">MBA &amp; Management</span>
                <span className="text-xs font-bold text-primary">91.8%</span>
              </div>
              <div className="p-2 bg-surface-container-low flex items-center justify-between border-l-3 border-outline-variant">
                <span className="text-xs font-semibold text-on-surface">Mechanical &amp; Civil</span>
                <span className="text-xs font-bold text-gray-700">89.4%</span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-on-surface-variant font-mono uppercase tracking-wider flex items-center justify-between border-t border-[#d5e3fc]">
            <span className="flex items-center gap-1 font-medium">
              <Radio className="w-3.5 h-3.5 text-secondary" />
              Synced: RFID Gateway North &amp; South Gates
            </span>
            <span className="text-secondary font-bold">Latency: 14ms</span>
          </div>
        </div>
      </div>

      {/* 4. Operational Split: Admissions Stream Table + Today's Daybook + Directives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols): Tables */}
        <div className="lg:col-span-8 space-y-6">
          {/* Table 1: Recent Admissions Stream */}
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc]">
            <div className="px-4 py-3 bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <h3 className="font-headline text-sm font-bold text-primary uppercase tracking-tight">
                  Recent Enrolled Scholars &amp; Admission Stream
                </h3>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-on-surface-variant text-[11px]">ACTIVE SESSION:</span>
                <span className="bg-surface-container text-primary px-2 py-0.5 font-bold text-[11px] border border-[#d5e3fc]">
                  AY 2025 - 2029
                </span>
                <Link
                  href="/admin/students"
                  className="text-secondary hover:underline font-bold ml-2 inline-flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View All (2,480)
                </Link>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="bg-surface-container font-mono text-[10px] uppercase tracking-wider text-on-surface-variant border-b border-[#d5e3fc]">
                    <th className="py-2.5 px-4 font-semibold">Student Particulars</th>
                    <th className="py-2.5 px-4 font-semibold">Course &amp; Semester</th>
                    <th className="py-2.5 px-4 font-semibold font-mono">Admission Date</th>
                    <th className="py-2.5 px-4 font-semibold font-mono text-center">Status</th>
                    <th className="py-2.5 px-4 font-semibold font-mono text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0]">
                  {/* Record 1 */}
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                          RS
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">Rahul Sharma</span>
                          <span className="font-mono text-[10px] text-secondary font-bold">
                            APX-2023-CS-042
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-on-surface font-medium">B.Tech Computer Science</span>
                        <span className="font-mono text-[10px] text-gray-500">Semester IV (Batch 2023-27)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">28 Mar 2025</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Enrolled
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href="/admin/students"
                        className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-[10px] font-bold uppercase transition-colors border border-[#d5e3fc]"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>

                  {/* Record 2 */}
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-secondary text-white flex items-center justify-center font-bold text-xs shrink-0">
                          PP
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">Priya Patel</span>
                          <span className="font-mono text-[10px] text-secondary font-bold">
                            APX-2022-EC-019
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-on-surface font-medium">B.Tech Electronics &amp; Comm.</span>
                        <span className="font-mono text-[10px] text-gray-500">Semester VII (Batch 2022-26)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">28 Mar 2025</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Enrolled
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href="/admin/students"
                        className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-[10px] font-bold uppercase transition-colors border border-[#d5e3fc]"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>

                  {/* Record 3 */}
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-indigo-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          RV
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">Rohan Verma</span>
                          <span className="font-mono text-[10px] text-secondary font-bold">
                            APX-2024-ME-058
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-on-surface font-medium">B.Tech Mechanical Engineering</span>
                        <span className="font-mono text-[10px] text-gray-500">Semester III (Batch 2024-28)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">28 Mar 2025</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                        Fee Dues (Hold)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href="/admin/students"
                        className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-[10px] font-bold uppercase transition-colors border border-[#d5e3fc]"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>

                  {/* Record 4 */}
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-slate-700 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          SK
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">Sneha Kulkarni</span>
                          <span className="font-mono text-[10px] text-secondary font-bold">
                            APX-2023-CS-088
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="text-on-surface font-medium">B.Tech Computer Science</span>
                        <span className="font-mono text-[10px] text-gray-500">Semester V (Batch 2023-27)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">27 Mar 2025</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Enrolled
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href="/admin/students"
                        className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-[10px] font-bold uppercase transition-colors border border-[#d5e3fc]"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Today's Counter Collection Daybook */}
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc]">
            <div className="px-4 py-3 bg-surface-container-low flex items-center justify-between border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <h3 className="font-headline text-sm font-bold text-primary uppercase tracking-tight">
                  Today's Counter Realization Register (₹ INR)
                </h3>
              </div>
              <Link
                href="/admin/fees"
                className="text-xs text-secondary hover:underline font-bold flex items-center gap-1 font-mono"
              >
                View Fees Vault
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-surface-container-low border border-[#d5e3fc] flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 font-mono">
                    Receipt #REC-2025-0842
                  </span>
                  <p className="font-bold text-primary text-xs mt-0.5">Rahul Sharma</p>
                  <span className="text-[10px] text-gray-600 font-mono">
                    Tuition &bull; UPI Ref
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-700 text-sm block">+₹27,500</span>
                  <p className="text-[9px] text-gray-500">11:20 AM</p>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#d5e3fc] flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 font-mono">
                    Receipt #REC-2025-0841
                  </span>
                  <p className="font-bold text-primary text-xs mt-0.5">Priya Patel</p>
                  <span className="text-[10px] text-gray-600 font-mono">
                    Tuition &bull; Chq In Clearing
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-amber-700 text-sm block">+₹40,000</span>
                  <p className="text-[9px] text-gray-500">10:45 AM</p>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#d5e3fc] flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-500 font-mono">
                    Receipt #REC-2025-0840
                  </span>
                  <p className="font-bold text-primary text-xs mt-0.5">Rohan Verma</p>
                  <span className="text-[10px] text-gray-600 font-mono">
                    Tuition Tranche 1 &bull; Cash
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-emerald-700 text-sm block">+₹25,000</span>
                  <p className="text-[9px] text-gray-500">10:15 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Circulars & Telemetry */}
        <div className="lg:col-span-4 space-y-6">
          {/* Campus Bulletins & Active Notices */}
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc] p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc] mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="font-headline text-sm font-bold text-primary uppercase tracking-tight">
                  Campus Bulletins &amp; Directives
                </h3>
              </div>
              <Link
                href="/admin/notices"
                className="text-[11px] text-secondary font-bold hover:underline font-mono"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-3 font-mono">
              <div className="p-3 bg-rose-50 border-l-3 border-error border border-rose-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-rose-900">
                    EXAM CELL DIRECTIVE
                  </span>
                  <span className="text-[10px] text-gray-500">Today</span>
                </div>
                <h4 className="font-bold text-primary text-xs mt-1 font-headline">
                  End-Semester Examination Schedules Released
                </h4>
                <p className="text-xs text-gray-700 mt-1 font-sans leading-relaxed">
                  Hall tickets issued to eligible candidates with fee clearance &ge; 75% attendance.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low border-l-3 border-secondary border border-[#d5e3fc]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-secondary">
                    FACULTY NOTICE
                  </span>
                  <span className="text-[10px] text-gray-500">Yesterday</span>
                </div>
                <h4 className="font-bold text-primary text-xs mt-1 font-headline">
                  Internal Marks Upload Deadline: 31st March
                </h4>
                <p className="text-xs text-gray-700 mt-1 font-sans leading-relaxed">
                  Continuous assessment grading portal closes for all B.Tech branches on Tuesday.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low border-l-3 border-primary border border-[#d5e3fc]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-primary">
                    BURSAR &amp; ACCOUNTS
                  </span>
                  <span className="text-[10px] text-gray-500">2 days ago</span>
                </div>
                <h4 className="font-bold text-primary text-xs mt-1 font-headline">
                  Grace Window for Tranche 2 Settlement
                </h4>
                <p className="text-xs text-gray-700 mt-1 font-sans leading-relaxed">
                  Final fee reconciliation window open at Counter Till #02 without overdue surcharges.
                </p>
              </div>
            </div>
          </div>

          {/* Campus Infrastructure Telemetry */}
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc] p-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc] mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                <h3 className="font-headline text-sm font-bold text-primary uppercase tracking-tight">
                  Infrastructure Telemetry
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-bold">
                99.98% OK
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-surface-container-low border border-[#d5e3fc]">
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-secondary" />
                  <span>Biometric RFID Gates</span>
                </div>
                <span className="text-emerald-700 font-bold">12/12 ONLINE</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-surface-container-low border border-[#d5e3fc]">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-secondary" />
                  <span>Central SQL Ledger</span>
                </div>
                <span className="text-primary font-bold">14ms LATENCY</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-surface-container-low border border-[#d5e3fc]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                  <span>Bursar Counter Tills</span>
                </div>
                <span className="text-emerald-700 font-bold">TILL #01 &amp; #02 ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
