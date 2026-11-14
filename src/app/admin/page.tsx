"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  Eye,
  CheckCircle2,
  Database,
  ChevronRight,
  CreditCard,
  UserPlus,
  FileText,
  Building2,
  X,
  Banknote,
  AlertTriangle,
  Wifi,
  Sparkles,
  ArrowUpRight,
  Clock
} from "lucide-react";

export default function AdminDashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("MAR");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/60 via-indigo-50/30 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Academic Year 2025–26
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                All Systems Operational
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Institutional Overview &amp; Control
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Apex Institute of Technology &amp; Management &bull; Central Campus
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <Link
              href="/admin/students"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>New Admission</span>
            </Link>
            <Link
              href="/admin/fees"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <CreditCard className="w-4 h-4 text-slate-500" />
              <span>Record Fees</span>
            </Link>
            <Link
              href="/admin/attendance"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <CalendarCheck className="w-4 h-4 text-slate-500" />
              <span>Attendance</span>
            </Link>
            <Link
              href="/admin/notices"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Circulars</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Tiles (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Students</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">2,480</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                +8.4%
              </span>
              <span>vs last term</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Faculty &amp; Staff</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">142</div>
            <div className="text-xs text-slate-500 mt-1">Across 18 Departments</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Today's Attendance</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">94.2%</div>
            <div className="text-xs text-emerald-600 font-medium mt-1">2,336 Present today</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Fee Intake (Mar)</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">₹48.60 L</div>
            <div className="text-xs text-slate-500 mt-1">81% of monthly target</div>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Dues</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-amber-600 tracking-tight">₹11.40 L</div>
            <div className="text-xs text-slate-500 mt-1">128 Students Pending</div>
          </div>
        </div>
      </div>

      {/* 3. Analytics Section: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Monthly Realization vs Target */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Monthly Fee Realization vs Target
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Target vs realized collection in Lakhs (INR)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                {["OCT", "NOV", "DEC", "JAN", "FEB", "MAR"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(m)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                      selectedMonth === m
                        ? "bg-white text-blue-600 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs pl-2 border-l border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-slate-200 rounded-sm"></span>
                  <span className="text-slate-500 text-xs">Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-blue-600 rounded-sm"></span>
                  <span className="text-slate-800 text-xs font-medium">Realized</span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="relative w-full pt-6 pb-2">
            <svg
              className="w-full h-56"
              fill="none"
              viewBox="0 0 620 220"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Lines */}
              <line className="text-slate-100" stroke="currentColor" strokeDasharray="3 3" x1="40" x2="600" y1="20" y2="20" />
              <line className="text-slate-100" stroke="currentColor" strokeDasharray="3 3" x1="40" x2="600" y1="65" y2="65" />
              <line className="text-slate-100" stroke="currentColor" strokeDasharray="3 3" x1="40" x2="600" y1="110" y2="110" />
              <line className="text-slate-100" stroke="currentColor" strokeDasharray="3 3" x1="40" x2="600" y1="155" y2="155" />
              <line className="text-slate-200" stroke="currentColor" x1="40" x2="600" y1="190" y2="190" />

              {/* Y-Axis */}
              <text className="text-[10px] font-sans fill-slate-400" x="10" y="24">₹80L</text>
              <text className="text-[10px] font-sans fill-slate-400" x="10" y="69">₹60L</text>
              <text className="text-[10px] font-sans fill-slate-400" x="10" y="114">₹40L</text>
              <text className="text-[10px] font-sans fill-slate-400" x="10" y="159">₹20L</text>
              <text className="text-[10px] font-sans fill-slate-400" x="22" y="193">₹0</text>

              {/* NOV */}
              <rect fill="#e2e8f0" height="120" rx="3" width="22" x="70" y="70" />
              <rect fill="#3b82f6" height="105" rx="3" width="22" x="96" y="85" />
              <text className="text-[11px] font-sans fill-slate-500 font-medium" textAnchor="middle" x="94" y="208">NOV</text>

              {/* DEC */}
              <rect fill="#e2e8f0" height="130" rx="3" width="22" x="160" y="60" />
              <rect fill="#3b82f6" height="115" rx="3" width="22" x="186" y="75" />
              <text className="text-[11px] font-sans fill-slate-500 font-medium" textAnchor="middle" x="184" y="208">DEC</text>

              {/* JAN */}
              <rect fill="#e2e8f0" height="140" rx="3" width="22" x="250" y="50" />
              <rect fill="#3b82f6" height="128" rx="3" width="22" x="276" y="62" />
              <text className="text-[11px] font-sans fill-slate-500 font-medium" textAnchor="middle" x="274" y="208">JAN</text>

              {/* FEB */}
              <rect fill="#e2e8f0" height="145" rx="3" width="22" x="340" y="45" />
              <rect fill="#3b82f6" height="132" rx="3" width="22" x="366" y="58" />
              <text className="text-[11px] font-sans fill-slate-500 font-medium" textAnchor="middle" x="364" y="208">FEB</text>

              {/* MAR (Active) */}
              <rect fill="#eff6ff" height="185" rx="8" width="76" x="420" y="10" />
              <rect fill="#94a3b8" height="160" rx="3" width="22" x="428" y="30" />
              <rect fill="#2563eb" height="142" rx="3" width="22" x="454" y="48" />
              <text className="text-[11px] font-sans fill-blue-700 font-bold" textAnchor="middle" x="452" y="208">MAR</text>

              {/* Hover Badge */}
              <g transform="translate(412, 4)">
                <rect fill="#1e293b" height="30" rx="6" width="102" x="0" y="0" />
                <text className="text-[9px] font-sans font-bold" fill="#FFFFFF" textAnchor="middle" x="51" y="13">
                  REAL: ₹48.60L
                </text>
                <text className="text-[8px] font-sans font-semibold" fill="#93c5fd" textAnchor="middle" x="51" y="24">
                  81% OF TARGET
                </text>
              </g>

              {/* APR (Projected) */}
              <rect fill="#e2e8f0" height="160" rx="3" width="22" x="520" y="30" />
              <rect fill="#93c5fd" height="50" rx="3" stroke="#2563eb" strokeDasharray="3 3" width="22" x="546" y="140" />
              <text className="text-[11px] font-sans fill-slate-500 font-medium" textAnchor="middle" x="544" y="208">APR</text>
            </svg>
          </div>

          <div className="mt-3 pt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
            <span>Fiscal Progress: <strong className="text-slate-800">Day 28 of 31</strong></span>
            <span>Remaining Target: <strong className="text-blue-600">₹11,40,000</strong></span>
            <span>Daily Intake Velocity: <strong className="text-emerald-600">₹1.73L / day</strong></span>
          </div>
        </div>

        {/* Chart 2: Department Attendance */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Department Attendance</h2>
              <p className="text-xs text-slate-500">Live biometric attendance breakdown</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Live Sync
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-6 my-auto py-5">
            {/* Donut SVG */}
            <div className="sm:col-span-5 flex justify-center items-center relative">
              <svg className="w-40 h-40" viewBox="0 0 160 160">
                <circle className="text-slate-100" cx="80" cy="80" fill="none" r="60" stroke="currentColor" strokeWidth="16" />
                {/* CS 96% */}
                <circle className="text-blue-600" cx="80" cy="80" fill="none" r="60" stroke="currentColor" strokeDasharray="140 377" strokeDashoffset="0" strokeWidth="16" />
                {/* ECE 93% */}
                <circle className="text-indigo-500" cx="80" cy="80" fill="none" r="60" stroke="currentColor" strokeDasharray="100 377" strokeDashoffset="-140" strokeWidth="16" />
                {/* MBA 91% */}
                <circle className="text-purple-500" cx="80" cy="80" fill="none" r="60" stroke="currentColor" strokeDasharray="80 377" strokeDashoffset="-240" strokeWidth="16" />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-slate-900">94.2%</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Overall Avg</span>
              </div>
            </div>

            {/* Department Breakdown */}
            <div className="sm:col-span-7 space-y-2.5">
              <div className="p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl flex items-center justify-between transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-xs font-medium text-slate-700">Computer Science</span>
                </div>
                <span className="text-xs font-bold text-blue-700">96.0%</span>
              </div>
              <div className="p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl flex items-center justify-between transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-xs font-medium text-slate-700">Electronics (ECE)</span>
                </div>
                <span className="text-xs font-bold text-indigo-700">93.5%</span>
              </div>
              <div className="p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl flex items-center justify-between transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <span className="text-xs font-medium text-slate-700">MBA &amp; Business</span>
                </div>
                <span className="text-xs font-bold text-purple-700">91.8%</span>
              </div>
              <div className="p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl flex items-center justify-between transition-colors border border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  <span className="text-xs font-medium text-slate-700">Mechanical &amp; Civil</span>
                </div>
                <span className="text-xs font-bold text-slate-700">89.4%</span>
              </div>
            </div>
          </div>

          <div className="pt-3 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
              RFID Attendance Gateways Synced
            </span>
            <span className="text-slate-400">Response time: 14ms</span>
          </div>
        </div>
      </div>

      {/* 4. Split: Recent Admissions Table + Collections & Bulletins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols): Tables */}
        <div className="lg:col-span-8 space-y-6">
          {/* Table: Recent Enrolled Students */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Recent Enrolled Students
                  </h3>
                  <p className="text-xs text-slate-500">Latest admissions stream</p>
                </div>
              </div>
              <Link
                href="/admin/students"
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
              >
                <span>View All (2,480)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-100">
                    <th className="py-3 px-6 font-semibold">Student Name</th>
                    <th className="py-3 px-6 font-semibold">Course &amp; Semester</th>
                    <th className="py-3 px-6 font-semibold">Admission Date</th>
                    <th className="py-3 px-6 font-semibold text-center">Status</th>
                    <th className="py-3 px-6 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                          RS
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Rahul Sharma</div>
                          <div className="text-[11px] text-slate-400 font-mono">APX-2023-CS-042</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="text-slate-800 font-medium">B.Tech Computer Science</div>
                      <div className="text-[11px] text-slate-400">Semester IV (2023–27)</div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">28 Mar 2025</td>
                    <td className="py-3.5 px-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Enrolled
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href="/admin/students"
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs shrink-0">
                          PP
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Priya Patel</div>
                          <div className="text-[11px] text-slate-400 font-mono">APX-2022-EC-019</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="text-slate-800 font-medium">B.Tech Electronics &amp; Comm.</div>
                      <div className="text-[11px] text-slate-400">Semester VII (2022–26)</div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">28 Mar 2025</td>
                    <td className="py-3.5 px-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Enrolled
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href="/admin/students"
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs shrink-0">
                          AK
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Amit Kumar</div>
                          <div className="text-[11px] text-slate-400 font-mono">APX-2024-ME-058</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <div className="text-slate-800 font-medium">B.Tech Mechanical Engg</div>
                      <div className="text-[11px] text-slate-400">Semester II (2024–28)</div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">27 Mar 2025</td>
                    <td className="py-3.5 px-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Enrolled
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href="/admin/students"
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Today's Fee Receipts */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Today's Fee Collections
                  </h3>
                  <p className="text-xs text-slate-500">Live transaction receipts</p>
                </div>
              </div>
              <Link
                href="/admin/fees"
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
              >
                <span>View Fee Ledger</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono">#REC-2025-0842</span>
                  <p className="font-semibold text-slate-900 text-xs mt-0.5">Rahul Sharma</p>
                  <span className="text-[11px] text-slate-500">Tuition &bull; UPI</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600 text-sm block font-mono">+₹27,500</span>
                  <span className="text-[10px] text-slate-400">11:20 AM</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono">#REC-2025-0841</span>
                  <p className="font-semibold text-slate-900 text-xs mt-0.5">Priya Patel</p>
                  <span className="text-[11px] text-slate-500">Tuition &bull; Cheque</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-amber-600 text-sm block font-mono">+₹40,000</span>
                  <span className="text-[10px] text-slate-400">10:45 AM</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono">#REC-2025-0840</span>
                  <p className="font-semibold text-slate-900 text-xs mt-0.5">Rohan Verma</p>
                  <span className="text-[11px] text-slate-500">Tranche 1 &bull; Cash</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600 text-sm block font-mono">+₹25,000</span>
                  <span className="text-[10px] text-slate-400">10:15 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Bulletins & System Services */}
        <div className="lg:col-span-4 space-y-6">
          {/* Campus Bulletins & Directives */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Campus Circulars
                </h3>
              </div>
              <Link
                href="/admin/notices"
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-rose-50/70 border border-rose-200/60 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-rose-700 tracking-wider">
                    Exam Cell Directive
                  </span>
                  <span className="text-[10px] text-slate-400">Today</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs mt-1">
                  End-Semester Examination Schedules Released
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Hall tickets issued to eligible candidates with fee clearance &ge; 75% attendance.
                </p>
              </div>

              <div className="p-3.5 bg-blue-50/50 border border-blue-200/60 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-blue-700 tracking-wider">
                    Faculty Notice
                  </span>
                  <span className="text-[10px] text-slate-400">Yesterday</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs mt-1">
                  Internal Marks Upload Deadline: 31st March
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Continuous assessment grading portal closes for all B.Tech branches on Tuesday.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">
                    Accounts Office
                  </span>
                  <span className="text-[10px] text-slate-400">2 days ago</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xs mt-1">
                  Grace Window for Tranche 2 Settlement
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Fee reconciliation window open at Counter Till #02 without overdue surcharges.
                </p>
              </div>
            </div>
          </div>

          {/* System Services Status */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Campus Services Status
                </h3>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                All Good
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <Wifi className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">Biometric RFID Gates</span>
                </div>
                <span className="text-emerald-600 font-semibold">12/12 Online</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <Database className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">Central Database Server</span>
                </div>
                <span className="text-blue-600 font-semibold font-mono">14ms latency</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="font-medium">Fee Collection Counters</span>
                </div>
                <span className="text-emerald-600 font-semibold">Tills #1 &amp; #2 Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
