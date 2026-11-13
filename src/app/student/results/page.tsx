"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Printer,
  ChevronRight,
  Award,
  CheckCircle,
  TrendingUp,
  FileText,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  X,
  ExternalLink,
  BookOpen
} from "lucide-react";

export default function StudentResultsPage() {
  const [selectedTerm, setSelectedTerm] = useState("sem3");
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(
      "https://apex.edu/verify/APX-2023-CS-042-S3"
    );
    setCopiedLink(true);
    triggerToast("Verification link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const subjectsSem3 = [
    {
      code: "CS301",
      title: "Data Structures & Algorithms",
      max: 100,
      ica: 37,
      ese: 54,
      total: 91,
      gp: "4.00",
      grade: "A+",
      cr: 4,
      result: "Pass",
    },
    {
      code: "CS302",
      title: "OOP with Java",
      max: 100,
      ica: 36,
      ese: 50,
      total: 86,
      gp: "3.80",
      grade: "A",
      cr: 4,
      result: "Pass",
    },
    {
      code: "CS303",
      title: "Computer Org. & Architecture",
      max: 100,
      ica: 35,
      ese: 51,
      total: 86,
      gp: "3.80",
      grade: "A",
      cr: 4,
      result: "Pass",
    },
    {
      code: "CS304",
      title: "Discrete Mathematics",
      max: 100,
      ica: 39,
      ese: 55,
      total: 94,
      gp: "4.00",
      grade: "A+",
      cr: 4,
      result: "Pass",
    },
    {
      code: "CS305L",
      title: "DSA Practical Laboratory",
      max: 100,
      ica: 39,
      ese: 58,
      total: 97,
      gp: "4.00",
      grade: "O",
      cr: 2,
      result: "Pass",
    },
    {
      code: "MA301",
      title: "Adv. Engineering Mathematics",
      max: 100,
      ica: 38,
      ese: 56,
      total: 94,
      gp: "3.90",
      grade: "A",
      cr: 4,
      result: "Pass",
    },
  ];

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 shadow-[2px_2px_0_0_#0D2545] border-l-4 border-secondary-container flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-secondary-container text-[20px]">
            info
          </span>
          <span className="font-mono text-xs">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-primary-fixed-dim hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Command Header & Scope Selector */}
      <section className="w-full bg-surface-container-lowest p-6 border-b border-[#d5e3fc] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1 text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
              <Link href="/student" className="hover:text-primary">
                Student Portal
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-outline" />
              <span className="text-secondary font-bold">My Results</span>
              <span className="font-mono text-[10px] text-outline-variant px-1.5 py-0.5 bg-surface-container ml-2">
                ID: REC-2024-SEM3-9912
              </span>
            </div>
            <h1 className="font-headline text-xl text-primary font-bold uppercase tracking-tight">
              Examination Results &amp; Academic Performance Gazette
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Autonomous Institutional Grade Registry • B.Tech Computer Science
              &amp; Engineering • Cohort 2023–2027
            </p>
          </div>

          {/* Action Cluster & Dropdown */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center bg-surface-container-low px-3 py-1.5 border border-[#c4c6cf]">
              <span className="material-symbols-outlined text-secondary text-[18px] mr-2">
                history_edu
              </span>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                aria-label="Select Examination Term"
                className="bg-transparent font-mono text-xs text-primary focus:outline-none cursor-pointer pr-4 uppercase tracking-wider font-semibold"
              >
                <option value="sem3">
                  Semester III (Fall 2024 - Declared)
                </option>
                <option value="sem2">
                  Semester II (Spring 2024 - Archival)
                </option>
                <option value="sem1">Semester I (Fall 2023 - Archival)</option>
                <option value="sem4" disabled>
                  Semester IV (Spring 2025 - In Session)
                </option>
              </select>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-surface-container text-primary hover:bg-surface-container-high px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border border-[#c4c6cf] shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Grade Card</span>
            </button>

            <button
              onClick={() =>
                triggerToast(
                  "Compiling official attested PDF Marksheet for Semester III..."
                )
              }
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary-container px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Marksheet (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Content Workspace */}
      <div className="p-6 space-y-6">
        {/* Academic Standing & Cumulative Telemetry (4 Dense Brutalist Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: CGPA */}
          <div className="relative bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Cumulative CGPA
                </span>
                <span className="bg-secondary-fixed text-on-secondary-fixed font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 tracking-wider">
                  Distinction
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl text-primary font-bold tracking-tight">
                  3.82
                </span>
                <span className="font-mono text-sm text-outline">/ 4.00</span>
              </div>
            </div>
            <div className="mt-4 pt-1 bg-surface-container-low p-2 border border-[#d5e3fc]">
              <p className="font-mono text-[11px] text-on-surface-variant leading-none">
                Scale Equiv:{" "}
                <span className="font-bold text-primary">91.4%</span> (10-Point
                Absolute)
              </p>
            </div>
          </div>

          {/* Card 2: SGPA */}
          <div className="relative bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Term SGPA (Sem III)
                </span>
                <span className="bg-surface-container text-primary font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 tracking-wider border border-[#c4c6cf]">
                  Term High
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl text-secondary font-bold tracking-tight">
                  3.88
                </span>
                <span className="font-mono text-sm text-outline">/ 4.00</span>
              </div>
            </div>
            <div className="mt-4 pt-1 bg-surface-container-low p-2 border border-[#d5e3fc]">
              <p className="font-mono text-[11px] text-on-surface-variant leading-none flex items-center justify-between">
                <span>Cohort Standing:</span>
                <span className="font-bold text-primary">Rank #3 of 120</span>
              </p>
            </div>
          </div>

          {/* Card 3: Earned Credits */}
          <div className="relative bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-tint"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Total Credits Earned
                </span>
                <span className="bg-surface-container text-on-surface font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 tracking-wider border border-[#c4c6cf]">
                  100% Rate
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-3xl text-primary font-bold tracking-tight">
                  68
                </span>
                <span className="font-mono text-sm text-outline">
                  / 68 Total
                </span>
              </div>
            </div>
            <div className="mt-4 pt-1 bg-surface-container-low p-2 border border-[#d5e3fc]">
              <p className="font-mono text-[11px] text-[#047857] leading-none flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Zero Active Arrears / Backlogs</span>
              </p>
            </div>
          </div>

          {/* Card 4: Evaluation Status */}
          <div className="relative bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#047857]"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Academic Standing
                </span>
                <span className="bg-[#ECFDF5] text-[#047857] font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 tracking-wider border border-[#a7f3d0]">
                  Verified
                </span>
              </div>
              <div className="font-headline text-base text-primary font-bold uppercase leading-tight mt-1">
                Dean&apos;s Honor List
              </div>
            </div>
            <div className="mt-4 pt-1 bg-[#ECFDF5] p-2 text-[#047857] border border-[#a7f3d0]">
              <p className="font-mono text-[11px] font-bold leading-none uppercase tracking-wider">
                Regular Pass • High Distinction
              </p>
            </div>
          </div>
        </div>

        {/* Main Results Interface: Left Split (60%) & Right Live Marksheet (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 of 12 cols ~= 60%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Detailed Marksheet Gazette Table Container */}
            <div className="bg-surface-container-lowest shadow-sm border border-[#d5e3fc] flex flex-col">
              {/* Table Functional Header */}
              <div className="p-4 bg-surface-container-low border-b border-[#d5e3fc] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-primary inline-block"></span>
                  <span className="font-headline text-sm uppercase text-primary font-bold tracking-tight">
                    Semester III Marks Gazette
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-on-surface-variant">
                    SY 2024-2025
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5 bg-surface-container font-semibold uppercase text-primary border border-[#c4c6cf]">
                    Status: Final Published
                  </span>
                </div>
              </div>

              {/* Academic Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-surface-container text-on-surface uppercase text-[11px] tracking-wider border-b border-[#d5e3fc]">
                      <th className="py-2.5 px-3 font-semibold">Course Code &amp; Title</th>
                      <th className="py-2.5 px-2 text-center font-semibold">Max</th>
                      <th className="py-2.5 px-2 text-center font-semibold">ICA (40)</th>
                      <th className="py-2.5 px-2 text-center font-semibold">ESE (60)</th>
                      <th className="py-2.5 px-2 text-center font-semibold">Total (100)</th>
                      <th className="py-2.5 px-2 text-center font-semibold">GP</th>
                      <th className="py-2.5 px-2 text-center font-semibold">Grade</th>
                      <th className="py-2.5 px-2 text-center font-semibold">Cr</th>
                      <th className="py-2.5 px-3 text-right font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d5e3fc]/60 text-on-surface">
                    {subjectsSem3.map((sub) => (
                      <tr
                        key={sub.code}
                        className="hover:bg-surface-container-low transition-colors"
                      >
                        <td className="py-3 px-3">
                          <div className="font-bold text-primary font-mono">
                            {sub.code}
                          </div>
                          <div className="font-sans text-[11px] text-on-surface-variant truncate max-w-[190px]">
                            {sub.title}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center text-outline">
                          {sub.max}
                        </td>
                        <td className="py-3 px-2 text-center text-primary font-semibold">
                          {sub.ica}
                        </td>
                        <td className="py-3 px-2 text-center text-primary font-semibold">
                          {sub.ese}
                        </td>
                        <td className="py-3 px-2 text-center font-bold text-primary">
                          {sub.total}
                        </td>
                        <td className="py-3 px-2 text-center font-semibold">
                          {sub.gp}
                        </td>
                        <td className="py-3 px-2 text-center font-bold text-secondary">
                          {sub.grade}
                        </td>
                        <td className="py-3 px-2 text-center text-primary font-semibold">
                          {sub.cr}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="inline-block bg-[#ECFDF5] text-[#047857] text-[10px] font-bold px-1.5 py-0.5 tracking-wider uppercase border border-[#a7f3d0]">
                            {sub.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Summary Bar */}
              <div className="bg-primary text-white p-4 grid grid-cols-2 sm:grid-cols-5 gap-2 text-center font-mono">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-primary-fixed-dim">
                    Max Aggregate
                  </span>
                  <span className="font-headline text-lg font-bold">600</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-primary-fixed-dim">
                    Obtained
                  </span>
                  <span className="font-headline text-lg font-bold text-secondary-container">
                    548
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-primary-fixed-dim">
                    Percentage
                  </span>
                  <span className="font-headline text-lg font-bold">
                    91.33%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-primary-fixed-dim">
                    Term SGPA
                  </span>
                  <span className="font-headline text-lg font-bold text-secondary-fixed">
                    3.88
                  </span>
                </div>
                <div className="flex flex-col col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-primary-fixed-dim">
                    Credits Earned
                  </span>
                  <span className="font-headline text-lg font-bold">
                    22 / 22
                  </span>
                </div>
              </div>
            </div>

            {/* Longitudinal Progression Trend */}
            <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-headline text-sm uppercase text-primary font-bold">
                    Academic Trajectory &amp; Cohort Progression
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Semester-on-Semester SGPA evolution versus minimum
                    Distinction threshold (3.60)
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-secondary inline-block"></span>
                    <span>Term SGPA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-outline inline-block"></span>
                    <span>Threshold (3.60)</span>
                  </div>
                </div>
              </div>

              {/* Structured Inline SVG Performance Graph */}
              <div className="w-full bg-surface-container-low p-4 border border-[#d5e3fc]">
                <svg
                  className="w-full h-32"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 540 130"
                >
                  {/* Grid lines */}
                  <line
                    stroke="#CBD5E1"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                    x1="40"
                    x2="520"
                    y1="20"
                    y2="20"
                  />
                  <line
                    stroke="#CBD5E1"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                    x1="40"
                    x2="520"
                    y1="60"
                    y2="60"
                  />
                  <line
                    stroke="#CBD5E1"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                    x1="40"
                    x2="520"
                    y1="100"
                    y2="100"
                  />

                  {/* Threshold marker line (3.60) */}
                  <line
                    stroke="#74777F"
                    strokeDasharray="4 4"
                    strokeWidth="1.5"
                    x1="40"
                    x2="520"
                    y1="52"
                    y2="52"
                  />
                  <text
                    fill="#74777F"
                    fontFamily="Geist"
                    fontSize="9"
                    fontWeight="600"
                    x="525"
                    y="55"
                  >
                    3.60
                  </text>

                  {/* Y-axis labels */}
                  <text fill="#64748B" fontFamily="Geist" fontSize="10" x="12" y="23">
                    4.00
                  </text>
                  <text fill="#64748B" fontFamily="Geist" fontSize="10" x="12" y="63">
                    3.75
                  </text>
                  <text fill="#64748B" fontFamily="Geist" fontSize="10" x="12" y="103">
                    3.50
                  </text>

                  {/* Trajectory Area */}
                  <polygon
                    fill="#D5E3FF"
                    opacity="0.6"
                    points="100,105 100,65 270,48 440,28 440,105"
                  />

                  {/* Trajectory Path */}
                  <polyline
                    points="100,65 270,48 440,28"
                    stroke="#365F97"
                    strokeLinecap="square"
                    strokeWidth="3"
                  />

                  {/* Node 1: Sem 1 */}
                  <circle
                    cx="100"
                    cy="65"
                    fill="#001028"
                    r="4.5"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    fill="#001028"
                    fontFamily="Geist"
                    fontSize="11"
                    fontWeight="700"
                    x="85"
                    y="53"
                  >
                    3.74
                  </text>
                  <text
                    fill="#44474E"
                    fontFamily="Geist"
                    fontSize="10"
                    fontWeight="600"
                    x="80"
                    y="122"
                  >
                    SEM I
                  </text>

                  {/* Node 2: Sem 2 */}
                  <circle
                    cx="270"
                    cy="48"
                    fill="#001028"
                    r="4.5"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    fill="#001028"
                    fontFamily="Geist"
                    fontSize="11"
                    fontWeight="700"
                    x="255"
                    y="37"
                  >
                    3.80
                  </text>
                  <text
                    fill="#44474E"
                    fontFamily="Geist"
                    fontSize="10"
                    fontWeight="600"
                    x="250"
                    y="122"
                  >
                    SEM II
                  </text>

                  {/* Node 3: Sem 3 */}
                  <circle
                    cx="440"
                    cy="28"
                    fill="#047857"
                    r="5"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    fill="#047857"
                    fontFamily="Geist"
                    fontSize="11"
                    fontWeight="700"
                    x="425"
                    y="16"
                  >
                    3.88
                  </text>
                  <text
                    fill="#001028"
                    fontFamily="Geist"
                    fontSize="10"
                    fontWeight="700"
                    x="420"
                    y="122"
                  >
                    SEM III (ACT)
                  </text>
                </svg>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-mono text-on-surface-variant">
                <span>
                  Delta:{" "}
                  <strong className="text-[#047857] font-bold">+0.08 SGPA</strong>{" "}
                  compared to Semester II
                </span>
                <span>
                  Cohort Percentile:{" "}
                  <strong className="text-primary font-bold">97.5%</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 of 12 cols ~= 40%) - Official Live Marksheet Replica */}
          <div className="lg:col-span-5 space-y-6">
            {/* Physical Document Skin */}
            <div className="bg-surface-container-lowest p-6 shadow-md border-2 border-primary/20 relative overflow-hidden">
              {/* Institutional Header Bar with Crest */}
              <div className="text-center pb-3 mb-3 border-b border-[#CBD5E1]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    account_balance
                  </span>
                  <span className="font-headline text-sm uppercase tracking-tight text-primary font-bold">
                    Apex Institute of Technology
                  </span>
                </div>
                <div className="font-mono text-[10px] uppercase text-on-surface-variant tracking-widest leading-none">
                  Autonomous Institution • Accredited Grade &apos;A++&apos; • New Delhi,
                  India
                </div>
                <div className="mt-2 inline-block bg-primary text-white px-3 py-0.5 font-headline text-xs tracking-wider uppercase font-bold">
                  Official Statement of Grades &amp; Marks
                </div>
              </div>

              {/* Document Record Block */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-xs bg-surface-container-low p-3 mb-4 border border-[#d5e3fc]">
                <div>
                  <span className="text-outline uppercase text-[9px] block">
                    Student Candidate
                  </span>
                  <span className="font-bold text-primary">RAHUL SHARMA</span>
                </div>
                <div>
                  <span className="text-outline uppercase text-[9px] block">
                    Institutional Roll No.
                  </span>
                  <span className="font-bold text-primary">
                    APX-2023-CS-042
                  </span>
                </div>
                <div>
                  <span className="text-outline uppercase text-[9px] block">
                    Academic Program
                  </span>
                  <span className="font-bold text-primary truncate block">
                    B.Tech Comp. Science &amp; Engg.
                  </span>
                </div>
                <div>
                  <span className="text-outline uppercase text-[9px] block">
                    Examination Term
                  </span>
                  <span className="font-bold text-primary">
                    Fall Semester 2024
                  </span>
                </div>
              </div>

              {/* Condensed Miniature Transcript Matrix */}
              <div className="overflow-hidden mb-4 border border-[#d5e3fc]">
                <table className="w-full text-left font-mono text-[10px]">
                  <thead className="bg-surface-container text-primary font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-1 px-2">Subj</th>
                      <th className="py-1 px-1 text-center">Marks</th>
                      <th className="py-1 px-1 text-center">Grade</th>
                      <th className="py-1 px-1 text-center">GP</th>
                      <th className="py-1 px-2 text-right">Cr</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d5e3fc]">
                    <tr>
                      <td className="py-1 px-2 font-semibold text-primary">
                        CS301
                      </td>
                      <td className="py-1 px-1 text-center">91/100</td>
                      <td className="py-1 px-1 text-center font-bold text-secondary">
                        A+
                      </td>
                      <td className="py-1 px-1 text-center">4.00</td>
                      <td className="py-1 px-2 text-right">4.0</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 font-semibold text-primary">
                        CS302
                      </td>
                      <td className="py-1 px-1 text-center">86/100</td>
                      <td className="py-1 px-1 text-center font-bold text-secondary">
                        A
                      </td>
                      <td className="py-1 px-1 text-center">3.80</td>
                      <td className="py-1 px-2 text-right">4.0</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 font-semibold text-primary">
                        CS303
                      </td>
                      <td className="py-1 px-1 text-center">86/100</td>
                      <td className="py-1 px-1 text-center font-bold text-secondary">
                        A
                      </td>
                      <td className="py-1 px-1 text-center">3.80</td>
                      <td className="py-1 px-2 text-right">4.0</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 font-semibold text-primary">
                        CS304
                      </td>
                      <td className="py-1 px-1 text-center">94/100</td>
                      <td className="py-1 px-1 text-center font-bold text-secondary">
                        A+
                      </td>
                      <td className="py-1 px-1 text-center">4.00</td>
                      <td className="py-1 px-2 text-right">4.0</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 font-semibold text-primary">
                        CS305L
                      </td>
                      <td className="py-1 px-1 text-center">97/100</td>
                      <td className="py-1 px-1 text-center font-bold text-[#047857]">
                        O
                      </td>
                      <td className="py-1 px-1 text-center">4.00</td>
                      <td className="py-1 px-2 text-right">2.0</td>
                    </tr>
                    <tr>
                      <td className="py-1 px-2 font-semibold text-primary">
                        MA301
                      </td>
                      <td className="py-1 px-1 text-center">94/100</td>
                      <td className="py-1 px-1 text-center font-bold text-secondary">
                        A
                      </td>
                      <td className="py-1 px-1 text-center">3.90</td>
                      <td className="py-1 px-2 text-right">4.0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Grade Key Reference Scale */}
              <div className="bg-surface-container-low p-2.5 mb-4 text-[10px] font-mono text-on-surface-variant border border-[#d5e3fc]">
                <span className="font-bold text-primary uppercase block mb-1">
                  Grading Metric Standard:
                </span>
                <div className="flex items-center justify-between text-[9px] uppercase">
                  <span>
                    <strong>O:</strong> 90-100 (Outst.)
                  </span>
                  <span>
                    <strong>A+:</strong> 80-89 (Excell.)
                  </span>
                  <span>
                    <strong>A:</strong> 70-79 (Very Good)
                  </span>
                  <span>
                    <strong>B+:</strong> 60-69 (Good)
                  </span>
                </div>
              </div>

              {/* Cryptographic Validation & Controller Attestation */}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#CBD5E1]">
                {/* Dynamic QR Code & Blockchain Ledger Signature */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary p-1 flex items-center justify-center shrink-0">
                    <svg
                      className="w-full h-full text-white"
                      fill="currentColor"
                      viewBox="0 0 44 44"
                    >
                      <path d="M0,0 h18 v18 h-18 z M4,4 v10 h10 v-10 z M6,6 h6 v6 h-6 z" />
                      <path d="M26,0 h18 v18 h-18 z M30,4 v10 h10 v-10 z M32,6 h6 v6 h-6 z" />
                      <path d="M0,26 h18 v18 h-18 z M4,30 v10 h10 v-10 z M6,32 h6 v6 h-6 z" />
                      <rect height="12" width="2" x="22" y="4" />
                      <rect height="4" width="6" x="26" y="22" />
                      <rect height="4" width="8" x="34" y="24" />
                      <rect height="10" width="4" x="22" y="32" />
                      <rect height="2" width="12" x="30" y="34" />
                      <rect height="4" width="6" x="36" y="38" />
                    </svg>
                  </div>
                  <div className="flex flex-col font-mono text-[9px] text-on-surface-variant leading-tight">
                    <span className="text-primary font-bold uppercase">
                      SHA-256 Ledger Digest:
                    </span>
                    <span className="text-outline truncate max-w-[120px]">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </span>
                    <span className="text-[#047857] font-semibold mt-0.5 flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Verified Node
                    </span>
                  </div>
                </div>

                {/* Controller Digital Signature Block */}
                <div className="text-right font-mono text-[10px]">
                  <div className="h-6 flex items-center justify-end">
                    <svg
                      className="w-20 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 100 30"
                    >
                      <path
                        d="M5,22 Q25,2 45,18 T75,10 Q85,15 95,8"
                        strokeLinecap="round"
                      />
                      <path d="M30,24 L60,20" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="font-bold text-primary uppercase text-[10px]">
                    Dr. S. Nair
                  </div>
                  <div className="text-[9px] text-on-surface-variant uppercase">
                    Controller of Exams
                  </div>
                </div>
              </div>

              {/* Document Card Dual Actions */}
              <div className="mt-4 grid grid-cols-2 gap-2 pt-2 border-t border-[#d5e3fc]">
                <button
                  onClick={() =>
                    triggerToast("Downloading official signed PDF Marksheet...")
                  }
                  className="bg-primary text-white hover:bg-primary-container text-xs font-semibold py-2 px-2 uppercase tracking-wider text-center transition-colors"
                >
                  Signed PDF Marksheet
                </button>
                <button
                  onClick={handleCopyLink}
                  className="bg-surface-container text-primary hover:bg-surface-container-high text-xs font-semibold py-2 px-2 uppercase tracking-wider text-center transition-colors border border-[#c4c6cf] flex items-center justify-center gap-1"
                >
                  {copiedLink ? (
                    <Check className="w-3.5 h-3.5 text-green-700" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedLink ? "Link Copied!" : "Copy Verification"}</span>
                </button>
              </div>
            </div>

            {/* Academic Regulatory Compliance Note & Grievance Trigger */}
            <div className="bg-surface-container-lowest p-4 shadow-sm border border-[#d5e3fc] flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div className="text-xs text-on-surface-variant leading-relaxed">
                  <strong className="text-primary font-bold">
                    Institutional Gazette Notice:
                  </strong>{" "}
                  This digital statement reflects results endorsed by the
                  Autonomous Academic Senate. Any grievance or re-evaluation
                  request for Term Fall 2024 must be lodged within 14 calendar
                  days of gazette publication.
                </div>
              </div>

              <button
                onClick={() => setShowGrievanceModal(true)}
                className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-primary text-xs uppercase tracking-wider font-semibold border border-[#c4c6cf] transition-colors text-center"
              >
                Apply for Re-Evaluation / Grievance Redressal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Re-Evaluation / Grievance Redressal Modal */}
      {showGrievanceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-headline text-base font-bold text-primary uppercase">
                  Re-Evaluation Application
                </h3>
              </div>
              <button
                onClick={() => setShowGrievanceModal(false)}
                className="text-on-surface-variant hover:text-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5">
              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Subject for Re-Evaluation
                </label>
                <select className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary">
                  <option>CS301 - Data Structures &amp; Algorithms</option>
                  <option>CS302 - OOP with Java</option>
                  <option>CS303 - Computer Org. &amp; Architecture</option>
                  <option>CS304 - Discrete Mathematics</option>
                  <option>MA301 - Adv. Engineering Mathematics</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Service Requested
                </label>
                <select className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary">
                  <option>Recounting of Answer Script Marks ($15.00)</option>
                  <option>Full Academic Re-Evaluation by External Reviewer ($35.00)</option>
                  <option>Certified Photocopy of Evaluated Answer Script ($20.00)</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Specific Query / Justification
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention question numbers or sections where discrepancy in total marks is noted..."
                  className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div className="p-2.5 bg-surface-container-low text-[11px] text-on-surface-variant font-mono border border-[#d5e3fc]">
                Fee will be adjusted against subsequent challan upon confirmation.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setShowGrievanceModal(false)}
                className="px-4 py-2 border border-[#c4c6cf] text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowGrievanceModal(false);
                  triggerToast(
                    "Re-evaluation dossier filed. Case Token: #REV-2025-042"
                  );
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container"
              >
                Submit Re-Evaluation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
