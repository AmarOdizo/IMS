"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Download,
  Lock,
  Printer,
  BarChart3,
  TrendingUp,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Filter,
  ArrowRight,
  ExternalLink,
  Building2,
  Eye,
  X,
  Clock,
  Layers,
  AlertCircle,
  CreditCard,
  Banknote,
  DollarSign,
  PieChart,
} from "lucide-react";

interface AuditReport {
  id: string;
  code: string;
  title: string;
  description: string;
  frequency: string;
  lastGenerated: string;
  recordsCount: number;
  format: string;
  category: string;
}

const mockReports: AuditReport[] = [
  {
    id: "rep-1",
    code: "FORM AC-01",
    title: "Daily Cashier Till & Counter Collection Register",
    description: "Itemized chronological transactions, denomination tallies, cashier reconciliation sheets, and physical cashbook closing balances.",
    frequency: "Daily EOD",
    lastGenerated: "Today, 11:30 IST",
    recordsCount: 48,
    format: "PDF / CSV",
    category: "Cashbook & Till Audit",
  },
  {
    id: "rep-2",
    code: "FORM AC-02",
    title: "Head-wise Academic Fee Realization Matrix",
    description: "Multidimensional breakdown across Tuition, Development, Lab & Cloud Infrastructure, Library, and University Exam funds.",
    frequency: "Monthly / Term",
    lastGenerated: "28 Mar 2025",
    recordsCount: 1842,
    format: "PDF / XLSX",
    category: "Head-wise Realization",
  },
  {
    id: "rep-3",
    code: "FORM AC-03",
    title: "Cumulative Defaulter Aging & Hall Ticket Hold Register",
    description: "Defaulter aging analysis (>60d, 30-60d, 15-30d, <15d), parent notification logs, and Controller of Examinations barred list.",
    frequency: "Weekly",
    lastGenerated: "28 Mar 2025",
    recordsCount: 342,
    format: "PDF / CSV",
    category: "Defaulters & Arrears",
  },
  {
    id: "rep-4",
    code: "FORM AC-04",
    title: "Bank Reconciliation Statement (BRS - Walker Chandiok Format)",
    description: "Inter-bank settlement matching HDFC A/c 50200084920 and ICICI A/c 003105002914 against institute ERP cashbooks with transit CTS logs.",
    frequency: "Bi-Weekly",
    lastGenerated: "25 Mar 2025",
    recordsCount: 612,
    format: "PDF / XLSX",
    category: "Bank Reconciliation (BRS)",
  },
  {
    id: "rep-5",
    code: "FORM AC-05",
    title: "Scholarship, Concession & Fee Waiver Sanction Register",
    description: "Statutory documentation of Institutional Merit Scholarships, EWS Waivers, Sports Quotas, and Board of Trustees discretionary grants.",
    frequency: "Quarterly",
    lastGenerated: "20 Mar 2025",
    recordsCount: 142,
    format: "PDF / CSV",
    category: "Statutory & Tax (12A/80G)",
  },
  {
    id: "rep-6",
    code: "FORM AC-06",
    title: "Advance & Caution Deposit Refund Ledger",
    description: "Historical registry of institutional security deposits, laboratory caution money, and alumni clearance settlements.",
    frequency: "Quarterly",
    lastGenerated: "15 Mar 2025",
    recordsCount: 88,
    format: "PDF / CSV",
    category: "Overview & Analytics",
  },
  {
    id: "rep-7",
    code: "FORM AC-07",
    title: "Annual Statutory Income & Expenditure Statement",
    description: "Formal audit schedule complying with Income Tax Act Section 12A / 80G and AICTE Mandated Form 10B financial disclosures.",
    frequency: "Annual / FY",
    lastGenerated: "AY 2024-25 Final",
    recordsCount: 3820,
    format: "PDF / Tally XML",
    category: "Statutory & Tax (12A/80G)",
  },
];

export default function AccountantReportsPage() {
  const [reports, setReports] = useState<AuditReport[]>(mockReports);
  const [activeTab, setActiveTab] = useState<string>("All Domains");
  const [fiscalYear, setFiscalYear] = useState("AY 2025-26");
  const [termCycle, setTermCycle] = useState("ALL");
  const [programFilter, setProgramFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [selectedReportView, setSelectedReportView] = useState<AuditReport | null>(null);
  const [isConsolidatedModalOpen, setIsConsolidatedModalOpen] = useState(false);
  const [isCashbookLockModalOpen, setIsCashbookLockModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const domainTabs = [
    "All Domains",
    "Head-wise Realization",
    "Defaulters & Arrears",
    "Cashbook & Till Audit",
    "Statutory & Tax (12A/80G)",
    "Bank Reconciliation (BRS)",
  ];

  const filteredReports = reports.filter((r) => {
    if (activeTab === "All Domains") return true;
    return r.category === activeTab;
  });

  return (
    <div className="flex flex-col w-full pb-16 font-body text-on-surface">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary px-4 py-3 shadow-lg flex items-center gap-2 border border-secondary font-mono text-xs animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-secondary-container" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Command Hub Header & Scope Bar */}
      <div className="bg-surface-container-lowest p-4 mb-4 shadow-xs border border-[#d5e3fc]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-mono text-[11px] text-secondary uppercase tracking-wider mb-1">
              <span>Accounts &amp; Bursar Portal</span>
              <span className="text-outline-variant">/</span>
              <span>Executive Intelligence</span>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">Fiscal Reports &amp; Statutory Audits</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold font-headline text-primary tracking-tight">
                Financial Intelligence &amp; Statutory Fiscal Reports
              </h1>
              <span className="px-2 py-0.5 bg-secondary-container text-primary font-mono text-[11px] font-bold border border-[#a8c4f0]">
                SEC 12A / 80G AUDITED
              </span>
            </div>
          </div>

          {/* Quick Scope Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsConsolidatedModalOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs uppercase tracking-wider transition-colors border border-[#cbd5e1] font-semibold cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-secondary" />
              <span>Generate Audit Dossier (PDF)</span>
            </button>
            <button
              onClick={() => showToast("Archiving full fiscal year ledgers to ZIP (CSV format)...")}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs uppercase tracking-wider transition-colors border border-[#cbd5e1] font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-secondary" />
              <span>Export FY Ledgers (ZIP)</span>
            </button>
            <button
              onClick={() => setIsCashbookLockModalOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary hover:bg-primary/95 font-mono text-xs uppercase tracking-wider transition-colors font-bold shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Day-End Cashbook</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Domain Sub-Navigation Tabs */}
      <div className="bg-surface-container-lowest p-2 border border-[#d5e3fc] shadow-xs mb-4 flex flex-wrap items-center gap-1.5 font-mono text-xs">
        {domainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 uppercase font-bold tracking-wider transition-colors border cursor-pointer ${
              activeTab === tab
                ? "bg-primary text-on-primary border-primary shadow-xs"
                : "bg-surface-container-low text-on-surface-variant hover:text-on-surface border-[#cbd5e1]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Multi-Parameter Fiscal Filter Matrix */}
      <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs mb-4 grid grid-cols-1 md:grid-cols-4 gap-2 font-mono text-xs">
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
            Fiscal Year Range:
          </label>
          <select
            value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)}
            className="w-full bg-surface-container-low p-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
          >
            <option value="AY 2025-26">AY 2025-26 (Current Active FY)</option>
            <option value="AY 2024-25">AY 2024-25 (Audited Final)</option>
            <option value="AY 2023-24">AY 2023-24 (Statutory Archive)</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
            Academic Term Cycle:
          </label>
          <select
            value={termCycle}
            onChange={(e) => setTermCycle(e.target.value)}
            className="w-full bg-surface-container-low p-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
          >
            <option value="ALL">Full Academic Year (Annual)</option>
            <option value="EVEN">Even Semester (Sem II / IV / VI / VIII)</option>
            <option value="ODD">Odd Semester (Sem I / III / V / VII)</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-gray-500 block mb-1">
            Academic Discipline:
          </label>
          <select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="w-full bg-surface-container-low p-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
          >
            <option value="ALL">All Institute Departments</option>
            <option value="ENG">Faculty of Engineering &amp; Technology</option>
            <option value="MGMT">Faculty of Management Studies</option>
            <option value="CA">Department of Computer Applications</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setFiscalYear("AY 2025-26");
              setTermCycle("ALL");
              setProgramFilter("ALL");
              showToast("Fiscal filters refreshed to current baseline.");
            }}
            className="w-full py-2 bg-surface-container hover:bg-surface-container-high border border-[#cbd5e1] uppercase font-bold text-[11px] text-primary"
          >
            Apply Fiscal Parameters
          </button>
        </div>
      </div>

      {/* Key Financial Executive Cards (4 KPI metrics in ₹) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 font-mono">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Gross Annual Billed
            </span>
            <span className="text-xl font-bold text-primary">₹27,63,00,000</span>
            <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              94.2% Realization Target
            </span>
          </div>
          <div className="p-2.5 bg-surface-container text-secondary">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Cumulative Realized
            </span>
            <span className="text-xl font-bold text-emerald-800">₹24,86,50,000</span>
            <span className="text-[10px] text-gray-500 mt-0.5">Net Deposited in Bank</span>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Banknote className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Uncollected Arrears
            </span>
            <span className="text-xl font-bold text-error">₹2,76,50,000</span>
            <span className="text-[10px] text-rose-700 font-semibold mt-0.5">
              342 Student Defaulters
            </span>
          </div>
          <div className="p-2.5 bg-rose-50 text-error border border-rose-200">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Waivers &amp; Concessions
            </span>
            <span className="text-xl font-bold text-primary">₹48,20,000</span>
            <span className="text-[10px] text-secondary font-semibold mt-0.5">
              142 Merit/EWS Beneficiaries
            </span>
          </div>
          <div className="p-2.5 bg-surface-container text-secondary">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Analytical Visualizations Grid: 7 Cols (Daily Trend Graph) + 5 Cols (Course Realization Gauges) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        {/* Left Chart (60% ~ 7 cols): Daily Collection Trend */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-4 border border-[#d5e3fc] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2 mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-secondary" />
                <h3 className="font-headline font-bold text-xs uppercase tracking-tight text-primary">
                  March 2025 Daily Collection Trajectory vs Daily Target
                </h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500">
                Threshold: ₹15.0 Lakh / Day
              </span>
            </div>

            {/* SVG High-Density Brutalist Graph */}
            <div className="w-full h-48 relative border border-[#cbd5e1] bg-surface-container-low p-2">
              <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="30" x2="600" y2="30" stroke="#cbd5e1" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="600" y2="75" stroke="#cbd5e1" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#cbd5e1" strokeDasharray="3 3" />
                <line x1="0" y1="160" x2="600" y2="160" stroke="#94a3b8" />

                {/* Target threshold horizontal line (₹15 Lakh) */}
                <line x1="0" y1="65" x2="600" y2="65" stroke="#ba1a1a" strokeWidth="1.5" strokeDasharray="4 2" />

                {/* Daily Bars (28 representative days) */}
                {[
                  { d: 1, val: 40 }, { d: 2, val: 55 }, { d: 3, val: 65 }, { d: 4, val: 80 },
                  { d: 5, val: 140 }, // Spike 1: Salary day
                  { d: 6, val: 95 }, { d: 7, val: 70 }, { d: 8, val: 85 }, { d: 9, val: 110 },
                  { d: 10, val: 165 }, // Spike 2: Exam cutoff 1
                  { d: 11, val: 80 }, { d: 12, val: 75 }, { d: 13, val: 90 }, { d: 14, val: 85 },
                  { d: 15, val: 130 }, // Spike 3: Mid-month
                  { d: 16, val: 90 }, { d: 17, val: 85 }, { d: 18, val: 100 }, { d: 19, val: 115 },
                  { d: 20, val: 170 }, // Spike 4: Hall ticket cutoff
                  { d: 21, val: 95 }, { d: 22, val: 90 }, { d: 23, val: 80 }, { d: 24, val: 85 },
                  { d: 25, val: 110 }, { d: 26, val: 120 }, { d: 27, val: 105 }, { d: 28, val: 125 },
                ].map((item, idx) => {
                  const x = 15 + idx * 20.5;
                  const barHeight = item.val;
                  const y = 160 - barHeight;
                  const isSpike = item.val > 125;
                  return (
                    <g key={item.d}>
                      <rect
                        x={x}
                        y={y}
                        width="12"
                        height={barHeight}
                        fill={isSpike ? "#0d2545" : "#365f97"}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </g>
                  );
                })}

                {/* Polynomial Moving Avg Spline */}
                <path
                  d="M 15 130 Q 100 80 180 95 T 320 85 T 450 70 T 580 60"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>

          {/* Graph Legend & Summary */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 mt-2 border-t border-[#cbd5e1] font-mono text-[10px]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-primary" /> Daily Intake
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-error" /> Target (₹15L)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-0.5 bg-sky-600" /> Moving Average
              </span>
            </div>
            <div className="text-gray-600">
              Peak: <strong>₹24.5L (Day 20)</strong> &bull; Avg: <strong>₹11.8L/day</strong>
            </div>
          </div>
        </div>

        {/* Right Chart (40% ~ 5 cols): Course-Wise Realization */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-4 border border-[#d5e3fc] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2 mb-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-secondary" />
                <h3 className="font-headline font-bold text-xs uppercase tracking-tight text-primary">
                  Course-Wise Fee Realization Ratio
                </h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500">
                AY 2025-26 Target
              </span>
            </div>

            {/* Linear Gauge Progress Bars */}
            <div className="flex flex-col gap-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-primary">B.Tech Computer Science</span>
                  <span className="font-bold text-primary">₹11.20 Cr / ₹11.60 Cr (96.5%)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-low border border-[#cbd5e1] overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: "96.5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-primary">M.Tech Post-Graduate</span>
                  <span className="font-bold text-primary">₹3.80 Cr / ₹4.18 Cr (90.9%)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-low border border-[#cbd5e1] overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: "90.9%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-primary">MBA &amp; Management</span>
                  <span className="font-bold text-primary">₹4.20 Cr / ₹4.77 Cr (88.1%)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-low border border-[#cbd5e1] overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: "88.1%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-primary">B.Tech Electronics (ECE)</span>
                  <span className="font-bold text-primary">₹3.40 Cr / ₹4.00 Cr (85.0%)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-low border border-[#cbd5e1] overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: "85.0%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-primary">BCA &amp; Computer Apps</span>
                  <span className="font-bold text-primary">₹2.26 Cr / ₹2.75 Cr (82.2%)</span>
                </div>
                <div className="w-full h-2.5 bg-surface-container-low border border-[#cbd5e1] overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: "82.2%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 mt-3 border-t border-[#cbd5e1] font-mono text-[10px] text-gray-600 flex justify-between">
            <span>Engineering Cadre Realization: 92.4%</span>
            <span>Management: 88.1%</span>
          </div>
        </div>
      </div>

      {/* Detailed Audited Report Catalog & Download Center (The 7 Reports) */}
      <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-xs p-4 mb-4">
        <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-2 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-secondary" />
            <h3 className="font-headline font-bold text-xs uppercase tracking-tight text-primary">
              Institutional Statutory Audit &amp; Fiscal Report Catalog (7 Schedules)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-gray-500">
            Form 10B &amp; AICTE Mandated Disclosure Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-surface-container-low border border-[#cbd5e1] p-3 flex flex-col justify-between hover:border-secondary transition-colors"
            >
              <div>
                <div className="flex items-start justify-between mb-1.5">
                  <span className="px-1.5 py-0.5 bg-primary text-white font-mono text-[10px] font-bold uppercase">
                    {report.code}
                  </span>
                  <span className="text-[10px] font-mono text-secondary font-semibold">
                    {report.frequency}
                  </span>
                </div>

                <h4 className="font-bold text-primary text-xs uppercase font-headline tracking-tight mb-1">
                  {report.title}
                </h4>

                <p className="text-[11px] text-gray-600 font-sans leading-relaxed mb-3">
                  {report.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#cbd5e1] font-mono text-[10px]">
                <div className="flex justify-between text-gray-500 mb-2">
                  <span>Last Generated: {report.lastGenerated}</span>
                  <span className="font-bold text-primary">{report.recordsCount} Records</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setSelectedReportView(report)}
                    className="py-1 px-2 bg-surface-container-high hover:bg-surface-container-highest border border-[#cbd5e1] text-primary font-bold uppercase text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-secondary" />
                    <span>View Dossier</span>
                  </button>
                  <button
                    onClick={() =>
                      showToast(`Downloaded ${report.code} in ${report.format} format`)
                    }
                    className="py-1 px-2 bg-primary hover:bg-primary/95 text-white font-bold uppercase text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Verification & Audit Sign-Off Banner */}
      <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-xs p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono text-xs">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-primary text-white shrink-0">
            <ShieldCheck className="w-6 h-6 text-secondary-container" />
          </div>
          <div>
            <div className="font-bold text-primary text-sm uppercase">
              Walker Chandiok &amp; Co LLP Annual Statutory Audit Synchronization
            </div>
            <div className="text-[11px] text-gray-600 font-sans mt-0.5">
              General Ledger SHA-256 fingerprint: <code className="bg-gray-100 px-1 font-mono text-[10px]">b99a8201...9914fe</code> &bull; All 1,842 counter realization vouchers locked with statutory co-signatory seal.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px] uppercase">
            AUDIT SEAL ACTIVE
          </span>
          <button
            onClick={() => showToast("Bursar co-signatory digital cert verified.")}
            className="px-3 py-1.5 bg-surface-container-high border border-[#cbd5e1] font-bold uppercase text-[10px] text-primary cursor-pointer"
          >
            Verify Cert
          </button>
        </div>
      </div>

      {/* Regulatory Audit Footer */}
      <div className="p-3 bg-surface-container-low border border-[#cbd5e1] text-[10px] text-gray-500 font-mono text-center space-y-1">
        <div>
          Apex Institute of Technology &amp; Management &bull; Registered Educational Trust under Indian Trusts Act, 1882.
        </div>
        <div>
          Income Tax Act Section 12A / 80G Certified | AICTE Mandated Fee Transparency &amp; Disclosure Compliance AY 2025-26.
        </div>
      </div>

      {/* Modal: View Report Dossier */}
      {selectedReportView && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-primary w-full max-w-2xl p-5 shadow-2xl animate-in zoom-in-95 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-tight">
                  {selectedReportView.code}: {selectedReportView.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReportView(null)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[10px]">Statutory Code:</span>
                    <span className="font-bold text-primary">{selectedReportView.code}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Generation Frequency:</span>
                    <span className="font-bold text-primary">{selectedReportView.frequency}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Audit Cycle:</span>
                    <span className="font-bold text-primary">{fiscalYear}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">Audited Records:</span>
                    <span className="font-bold text-primary">{selectedReportView.recordsCount} Items</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-gray-700 font-sans leading-relaxed border border-[#cbd5e1] p-3 bg-white">
                <h5 className="font-bold text-primary uppercase mb-1 font-mono text-[10px]">
                  Executive Regulatory Description:
                </h5>
                <p>{selectedReportView.description}</p>
                <p className="mt-2 text-gray-500 text-[10px] font-mono">
                  Sealed with SHA-256 Ledger Fingerprint by Praveen Sharma, FCA (CASHIER-409) under statutory authority of Bursar &amp; Finance Committee.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#cbd5e1]">
              <span className="text-[10px] text-gray-500">
                Format: {selectedReportView.format}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedReportView(null)}
                  className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface uppercase font-semibold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedReportView(null);
                    showToast(`Dispatched ${selectedReportView.code} to official download stream.`);
                  }}
                  className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary/95 uppercase font-bold tracking-wider cursor-pointer shadow-xs flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Audited PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Consolidated Audit Dossier */}
      {isConsolidatedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-primary w-full max-w-md p-5 shadow-2xl animate-in zoom-in-95 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-tight">
                  Compile Consolidated Audit Dossier
                </h3>
              </div>
              <button
                onClick={() => setIsConsolidatedModalOpen(false)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-on-surface-variant leading-relaxed mb-3">
              Bundles all 7 institutional financial schedules, cashier reconciliations, bank statements, and tax exemptions into a single certified PDF archive.
            </p>

            <div className="p-2.5 bg-surface-container-low border border-[#cbd5e1] mb-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Fiscal Session:</span>
                <span className="font-bold text-primary">{fiscalYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gross Realization:</span>
                <span className="font-bold text-primary">₹24,86,50,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">External Auditor:</span>
                <span className="font-bold text-primary">Walker Chandiok &amp; Co LLP</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#cbd5e1]">
              <button
                onClick={() => setIsConsolidatedModalOpen(false)}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface uppercase font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsConsolidatedModalOpen(false);
                  showToast("Compiling and downloading Consolidated_Audit_Dossier_AY2025-26.pdf...");
                }}
                className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary/95 uppercase font-bold tracking-wider cursor-pointer shadow-xs"
              >
                Compile &amp; Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Lock Day-End Cashbook */}
      {isCashbookLockModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-primary w-full max-w-md p-5 shadow-2xl animate-in zoom-in-95 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-tight">
                  Lock &amp; Seal Day-End Cashbook
                </h3>
              </div>
              <button
                onClick={() => setIsCashbookLockModalOpen(false)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-900 text-[11px] mb-3 leading-relaxed">
              <strong>Statutory Closure:</strong> Locking the Day-End cashbook freezes all counter tills for today (28 Mar 2025). No additional fee entries may be recorded until tomorrow's morning vault verification.
            </div>

            <div className="p-2.5 bg-surface-container-low border border-[#cbd5e1] mb-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Till #02 Intake:</span>
                <span className="font-bold text-primary">₹1,77,500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Till #01 Intake:</span>
                <span className="font-bold text-primary">₹2,07,500.00</span>
              </div>
              <div className="flex justify-between font-bold border-t border-gray-300 pt-1">
                <span>Total Vault Deposit:</span>
                <span className="text-primary">₹3,85,000.00</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#cbd5e1]">
              <button
                onClick={() => setIsCashbookLockModalOpen(false)}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface uppercase font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsCashbookLockModalOpen(false);
                  showToast("Cashbook locked & sealed. Vault deposit manifest transmitted to Bank.");
                }}
                className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary/95 uppercase font-bold tracking-wider cursor-pointer shadow-xs"
              >
                Confirm Lock &amp; Seal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

