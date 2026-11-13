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
  Printer
} from "lucide-react";

export default function AdminDashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("MAY");

  return (
    <div className="flex flex-col w-full pb-12">
      {/* 1. Command Strip & Operational Controls */}
      <div className="w-full bg-surface-container-lowest px-6 py-4 border-b border-outline-variant/30 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-white p-2.5 shadow-sm flex items-center justify-center rounded-sm">
              <span className="material-symbols-outlined text-[1.4rem]">terminal</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-secondary">
                <span className="font-semibold">SYS-NODE: REG-CORE-A</span>
                <span className="text-on-surface-variant/40">/</span>
                <span className="text-on-surface-variant font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  LIVE TELEMETRY
                </span>
              </div>
              <h1 className="font-headline text-lg text-primary tracking-tight font-bold">
                Institutional Command &amp; Operational Matrix
              </h1>
            </div>
          </div>

          {/* Quick Action Deck */}
          <div className="flex items-center flex-wrap gap-2">
            <Link
              href="/admin/students?action=new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-container text-white text-xs uppercase tracking-wider font-semibold hover:bg-primary transition-all shadow-sm rounded-sm"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ New Student Admission</span>
            </Link>
            <Link
              href="/admin/fees?action=record"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-low text-primary text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all border border-outline-variant/30 rounded-sm"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>+ Record Payment</span>
            </Link>
            <Link
              href="/admin/attendance"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-low text-primary text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all border border-outline-variant/30 rounded-sm"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>+ Mark Attendance</span>
            </Link>
            <Link
              href="/admin/notices?action=post"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-low text-primary text-xs uppercase tracking-wider font-semibold hover:bg-surface-container transition-all border border-outline-variant/30 rounded-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>+ Post Notice</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 space-y-6">
        {/* 2. KPI Metric Summary Tiles (5-Card Dense Strip) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* KPI 1 */}
          <div className="bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
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
              <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container-low text-secondary font-bold text-[10px]">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +8.4%
              </span>
              <span className="text-on-surface-variant text-[11px]">vs last term</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Active Staff &amp; Faculty
              </span>
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2">
              <div className="font-headline text-2xl font-bold text-primary tracking-tight">
                142
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container text-primary font-bold text-[10px]">
                98%
              </span>
              <span className="text-on-surface-variant text-[11px]">verified on duty today</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-container"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Today&apos;s Attendance
              </span>
              <CalendarCheck className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2">
              <div className="font-headline text-2xl font-bold text-primary tracking-tight">
                94.2%
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-on-surface-variant">
              <span className="text-primary font-bold">2,336 P</span>
              <span>|</span>
              <span className="text-error font-bold">108 A</span>
              <span>|</span>
              <span className="text-secondary font-bold">36 LV</span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Monthly Collection
              </span>
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2">
              <div className="font-headline text-2xl font-bold text-primary tracking-tight">
                $184,500
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 bg-surface-container-low text-primary font-bold text-[10px]">
                77%
              </span>
              <span className="text-on-surface-variant text-[11px]">of $240k target</span>
            </div>
          </div>

          {/* KPI 5 */}
          <div className="bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Pending Dues
              </span>
              <AlertTriangle className="w-5 h-5 text-error" />
            </div>
            <div className="my-2">
              <div className="font-headline text-2xl font-bold text-error tracking-tight">
                $55,500
              </div>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="inline-flex items-center px-1.5 py-0.5 bg-error-container text-error font-bold text-[10px]">
                142 ACCTS
              </span>
              <span className="text-on-surface-variant text-[11px]">pending clearance</span>
            </div>
          </div>
        </div>

        {/* 3. Interactive Analytics Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Monthly Fee Collection vs Targets (Col 7) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2 border-b border-outline-variant/20">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline text-base font-bold text-primary">
                    Monthly Collection vs Targets
                  </h2>
                  <span className="font-mono text-[10px] px-2 py-0.5 bg-surface-container text-secondary font-bold">
                    Q1-Q2 AY 24-25
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Comparative analysis of forecasted versus actual receipts (in thousands)
                </p>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-surface-container-high inline-block"></span>
                  <span className="text-on-surface-variant text-[11px]">Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-primary-container inline-block"></span>
                  <span className="text-on-surface text-[11px] font-semibold">Collected</span>
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
                <line className="text-surface-container" stroke="currentColor" strokeDasharray="2 2" x1="40" x2="600" y1="20" y2="20" />
                <line className="text-surface-container" stroke="currentColor" strokeDasharray="2 2" x1="40" x2="600" y1="65" y2="65" />
                <line className="text-surface-container" stroke="currentColor" strokeDasharray="2 2" x1="40" x2="600" y1="110" y2="110" />
                <line className="text-surface-container" stroke="currentColor" strokeDasharray="2 2" x1="40" x2="600" y1="155" y2="155" />
                <line className="text-outline-variant/40" stroke="currentColor" x1="40" x2="600" y1="190" y2="190" />

                {/* Y-Axis Labels */}
                <text className="text-[10px] font-mono fill-on-surface-variant" x="10" y="24">$250k</text>
                <text className="text-[10px] font-mono fill-on-surface-variant" x="10" y="69">$200k</text>
                <text className="text-[10px] font-mono fill-on-surface-variant" x="10" y="114">$150k</text>
                <text className="text-[10px] font-mono fill-on-surface-variant" x="10" y="159">$100k</text>
                <text className="text-[10px] font-mono fill-on-surface-variant" x="25" y="193">$0</text>

                {/* JAN */}
                <rect className="text-surface-container-high" fill="currentColor" height="120" width="20" x="70" y="70" />
                <rect className="text-secondary" fill="currentColor" height="105" width="20" x="94" y="85" />
                <text className="text-[11px] font-mono fill-on-surface-variant" textAnchor="middle" x="87" y="206">JAN</text>

                {/* FEB */}
                <rect className="text-surface-container-high" fill="currentColor" height="130" width="20" x="160" y="60" />
                <rect className="text-secondary" fill="currentColor" height="115" width="20" x="184" y="75" />
                <text className="text-[11px] font-mono fill-on-surface-variant" textAnchor="middle" x="177" y="206">FEB</text>

                {/* MAR */}
                <rect className="text-surface-container-high" fill="currentColor" height="140" width="20" x="250" y="50" />
                <rect className="text-secondary" fill="currentColor" height="128" width="20" x="274" y="62" />
                <text className="text-[11px] font-mono fill-on-surface-variant" textAnchor="middle" x="267" y="206">MAR</text>

                {/* APR */}
                <rect className="text-surface-container-high" fill="currentColor" height="145" width="20" x="340" y="45" />
                <rect className="text-secondary" fill="currentColor" height="132" width="20" x="364" y="58" />
                <text className="text-[11px] font-mono fill-on-surface-variant" textAnchor="middle" x="357" y="206">APR</text>

                {/* MAY (ACTIVE MONTH HIGHLIGHTED) */}
                <rect className="text-surface-container-low" fill="currentColor" height="185" opacity="0.8" width="70" x="424" y="10" />
                <rect className="text-surface-container-high" fill="currentColor" height="160" width="22" x="430" y="30" />
                <rect className="text-primary-container" fill="currentColor" height="142" width="22" x="456" y="48" />
                <text className="text-[11px] font-mono fill-primary font-bold" textAnchor="middle" x="447" y="206">
                  MAY (CURR)
                </text>

                {/* Hover / Callout Badge on MAY */}
                <g transform="translate(418, 6)">
                  <rect fill="#0D2545" height="30" width="94" x="0" y="0" rx="2" />
                  <text className="text-[9px] font-mono font-bold" fill="#FFFFFF" textAnchor="middle" x="47" y="13">
                    COLL: $184.5K
                  </text>
                  <text className="text-[8px] font-mono font-bold" fill="#99C0FE" textAnchor="middle" x="47" y="24">
                    77.0% OF TGT
                  </text>
                </g>

                {/* JUN (PROJECTED) */}
                <rect className="text-surface-container-high" fill="currentColor" height="160" width="20" x="520" y="30" />
                <rect className="text-secondary" fill="currentColor" height="50" stroke="currentColor" strokeDasharray="2 2" width="20" x="544" y="140" />
                <text className="text-[11px] font-mono fill-on-surface-variant" textAnchor="middle" x="537" y="206">JUN</text>
              </svg>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-on-surface-variant bg-surface-container-low px-4 py-2 border border-outline-variant/30">
              <span>
                Fiscal Progress: <strong className="text-primary">Day 26 of 31</strong>
              </span>
              <span className="text-primary font-bold">Remaining Target: $55,500</span>
              <span>
                Avg. Velocity: <strong className="text-secondary">$7.1k/day</strong>
              </span>
            </div>
          </div>

          {/* Chart 2: Real-time Attendance Analytics & Breakdown (Col 5) */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-5 shadow-sm border border-outline-variant/20 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div>
                <h2 className="font-headline text-base font-bold text-primary">
                  Department Attendance
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Real-time biometric validation across academic wings
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 bg-surface-container text-secondary font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                LIVE SYNC
              </span>
            </div>

            {/* Donut Visualization & Department Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 my-auto py-4">
              {/* Donut SVG */}
              <div className="sm:col-span-6 flex justify-center items-center relative">
                <svg className="w-44 h-44" viewBox="0 0 160 160">
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
                    strokeDasharray="105 389"
                    strokeDashoffset="0"
                    strokeWidth="16"
                  />
                  {/* B.Tech AI 95% */}
                  <circle
                    className="text-secondary"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="98 389"
                    strokeDashoffset="-108"
                    strokeWidth="16"
                  />
                  {/* MBA Tech 92% */}
                  <circle
                    className="text-secondary-container"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="88 389"
                    strokeDashoffset="-209"
                    strokeWidth="16"
                  />
                  {/* Diploma 91% */}
                  <circle
                    className="text-outline-variant"
                    cx="80"
                    cy="80"
                    fill="none"
                    r="62"
                    stroke="currentColor"
                    strokeDasharray="76 389"
                    strokeDashoffset="-300"
                    strokeWidth="16"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-mono text-xl text-primary font-bold">94.2%</span>
                  <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Campus Avg
                  </span>
                </div>
              </div>

              {/* Department Attendance Rows */}
              <div className="sm:col-span-6 space-y-2">
                <div className="p-2 bg-surface-container-low flex items-center justify-between border-l-2 border-primary">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-on-surface">B.Tech CS</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary">96.0%</span>
                </div>
                <div className="p-2 bg-surface-container-low flex items-center justify-between border-l-2 border-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-on-surface">B.Tech AI</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary">95.0%</span>
                </div>
                <div className="p-2 bg-surface-container-low flex items-center justify-between border-l-2 border-secondary-container">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-on-surface">MBA Tech</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary">92.0%</span>
                </div>
                <div className="p-2 bg-surface-container-low flex items-center justify-between border-l-2 border-outline-variant">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-on-surface">Diploma Eng.</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary">91.0%</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-on-surface-variant uppercase tracking-wider flex items-center justify-between border-t border-outline-variant/20">
              <span className="flex items-center gap-1 font-medium">
                <Radio className="w-3.5 h-3.5 text-secondary" />
                Synced: RFID Gateway North &amp; South
              </span>
              <span className="text-secondary font-mono font-bold">Sensor Latency 14ms</span>
            </div>
          </div>
        </div>

        {/* 4. Main Operational Split: Table Ledgers (Col 8) & Action Side Widgets (Col 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Tables & Operations (Col 8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Table 1: Recent Admissions & Applicant Stream */}
            <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/20">
              <div className="px-4 py-3 bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[1.25rem]">
                    how_to_reg
                  </span>
                  <h3 className="font-headline text-sm font-bold text-primary">
                    Recent Admissions &amp; Applicant Stream
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-on-surface-variant text-[11px]">BATCH:</span>
                  <span className="bg-surface-container text-primary px-2 py-0.5 font-bold text-[11px]">
                    2024 - 2028
                  </span>
                  <button className="text-secondary hover:underline font-bold ml-2 inline-flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-container text-[11px] uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/30">
                      <th className="py-2.5 px-4 font-semibold">Student Identifier</th>
                      <th className="py-2.5 px-4 font-semibold">Course / Batch</th>
                      <th className="py-2.5 px-4 font-semibold">Application Date</th>
                      <th className="py-2.5 px-4 font-semibold">Verification Status</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Ledger Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {/* Record 1 */}
                    <tr className="bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">
                            AS
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-primary">Ananya R. Sharma</span>
                            <span className="font-mono text-[10px] text-on-surface-variant">
                              APX-2024-0981
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-on-surface font-medium">B.Tech Computer Science</span>
                          <span className="font-mono text-[10px] text-on-surface-variant">
                            Batch 2024-28 (Sem 1)
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-on-surface">May 24, 2024</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-sm">
                          Approved
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href="/admin/students"
                          className="px-2.5 py-1 bg-surface-container-low text-primary hover:bg-primary hover:text-white font-mono text-[10px] font-bold uppercase transition-colors border border-outline-variant/30"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>

                    {/* Record 2 */}
                    <tr className="bg-surface hover:bg-surface-container-low/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xs">
                            DP
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-primary">Devendra Pratap</span>
                            <span className="font-mono text-[10px] text-on-surface-variant">
                              APX-2024-1004
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-on-surface font-medium">B.Tech Artificial Intel</span>
                          <span className="font-mono text-[10px] text-on-surface-variant">
                            Batch 2024-28 (Sem 1)
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-on-surface">May 25, 2024</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-100 text-blue-800 rounded-sm">
                          Doc Verified
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href="/admin/students"
                          className="px-2.5 py-1 bg-surface-container-low text-primary hover:bg-primary hover:text-white font-mono text-[10px] font-bold uppercase transition-colors border border-outline-variant/30"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>

                    {/* Record 3 */}
                    <tr className="bg-surface-container-lowest hover:bg-surface-container-low/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold text-xs">
                            KN
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-primary">Kavita Narang</span>
                            <span className="font-mono text-[10px] text-on-surface-variant">
                              APX-2024-1019
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-on-surface font-medium">MBA Technology Mgmt</span>
                          <span className="font-mono text-[10px] text-on-surface-variant">
                            Batch 2024-26 (Sem 1)
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-on-surface">May 25, 2024</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-sm">
                          Approved
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href="/admin/students"
                          className="px-2.5 py-1 bg-surface-container-low text-primary hover:bg-primary hover:text-white font-mono text-[10px] font-bold uppercase transition-colors border border-outline-variant/30"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>

                    {/* Record 4 */}
                    <tr className="bg-surface hover:bg-surface-container-low/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-xs">
                            RD
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-primary">Rohan Deshmukh</span>
                            <span className="font-mono text-[10px] text-on-surface-variant">
                              APX-2024-1033
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="text-on-surface font-medium">Diploma Electrical</span>
                          <span className="font-mono text-[10px] text-on-surface-variant">
                            Batch 2024-27 (Sem 1)
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-on-surface">May 26, 2024</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-800 rounded-sm">
                          Pending Review
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href="/admin/students"
                          className="px-2.5 py-1 bg-surface-container-low text-primary hover:bg-primary hover:text-white font-mono text-[10px] font-bold uppercase transition-colors border border-outline-variant/30"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Daily Counter Payments & Collection Register */}
            <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/20">
              <div className="px-4 py-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <h3 className="font-headline text-sm font-bold text-primary">
                    Today&apos;s Counter Collection Register
                  </h3>
                </div>
                <Link
                  href="/admin/fees"
                  className="text-xs text-secondary hover:underline font-bold flex items-center gap-1"
                >
                  View All Receipts
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-surface border border-outline-variant/30 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                      Receipt #REC-8841
                    </span>
                    <p className="font-bold text-primary text-sm">Ananya Sharma</p>
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      Tuition Fee (Sem 1) - UPI
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-700 text-base">+$1,450</span>
                    <p className="text-[9px] text-on-surface-variant font-mono">11:42 AM</p>
                  </div>
                </div>

                <div className="p-3 bg-surface border border-outline-variant/30 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                      Receipt #REC-8842
                    </span>
                    <p className="font-bold text-primary text-sm">Devendra Pratap</p>
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      Lab &amp; Library Dues - Cash
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-700 text-base">+$320</span>
                    <p className="text-[9px] text-on-surface-variant font-mono">12:15 PM</p>
                  </div>
                </div>

                <div className="p-3 bg-surface border border-outline-variant/30 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                      Receipt #REC-8843
                    </span>
                    <p className="font-bold text-primary text-sm">Kavita Narang</p>
                    <span className="text-[10px] text-on-surface-variant font-mono">
                      Hostel &amp; Mess Installment - NetBanking
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-emerald-700 text-base">+$980</span>
                    <p className="text-[9px] text-on-surface-variant font-mono">01:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Notices & Campus Telemetry (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Campus Bulletins & Active Notices */}
            <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/20 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[1.25rem]">
                    campaign
                  </span>
                  <h3 className="font-headline text-sm font-bold text-primary">
                    Campus Bulletins &amp; Notices
                  </h3>
                </div>
                <Link
                  href="/admin/notices"
                  className="text-[11px] text-secondary font-bold hover:underline"
                >
                  Manage
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-error-container/30 border-l-4 border-error">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-error">
                      URGENT EXAM BULLETIN
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">Today</span>
                  </div>
                  <h4 className="font-bold text-primary text-xs mt-1">
                    Mid-Term Examination Schedules Uploaded
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    All faculty departments must verify question paper submissions before May 28, 5:00 PM.
                  </p>
                </div>

                <div className="p-3 bg-surface-container-low border-l-4 border-secondary">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-secondary">
                      FACULTY CIRCULAR
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">Yesterday</span>
                  </div>
                  <h4 className="font-bold text-primary text-xs mt-1">
                    Biometric Portal Maintenance Tonight
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    RFID sensors on Gate 2 &amp; Gate 4 will undergo routine calibration between 10 PM to 1 AM.
                  </p>
                </div>

                <div className="p-3 bg-surface-container-low border-l-4 border-outline-variant">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-on-surface-variant">
                      FEES COUNTER
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant">2 days ago</span>
                  </div>
                  <h4 className="font-bold text-primary text-xs mt-1">
                    Late Fee Penalty Waiver for Sem 1
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Academic council has approved extension of last payment date till 31st May without penalty.
                  </p>
                </div>
              </div>
            </div>

            {/* Campus System Health & Telemetry */}
            <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/20 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <h3 className="font-headline text-sm font-bold text-primary">
                    Infrastructure Telemetry
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 font-bold">
                  99.98% OK
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2 bg-surface border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3.5 h-3.5 text-secondary" />
                    <span>RFID Gateway</span>
                  </div>
                  <span className="text-emerald-700 font-bold">12/12 ONLINE</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-surface border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-secondary" />
                    <span>Core SQL Database</span>
                  </div>
                  <span className="text-primary font-bold">18ms LATENCY</span>
                </div>

                <div className="flex items-center justify-between p-2 bg-surface border border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                    <span>Payment Gateway</span>
                  </div>
                  <span className="text-emerald-700 font-bold">CONNECTED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

