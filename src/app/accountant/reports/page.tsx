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
  Sparkles,
  Check,
  FileDown,
  Search,
  Share2,
  RefreshCw,
  SlidersHorizontal,
  BadgeCheck,
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
  totalVolume: string;
  auditorRemarks: string;
  sampleRows?: {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
  }[];
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
    totalVolume: "₹3,85,000",
    auditorRemarks: "Tills #01 and #02 balanced against currency denomination counter with zero discrepancy.",
    sampleRows: [
      { col1: "TXN-9021", col2: "Aarav Sharma (APX-2024-CS-001)", col3: "Tuition + Lab Fee", col4: "₹45,000", col5: "Cash (Till 01)" },
      { col1: "TXN-9022", col2: "Priya Nair (APX-2024-EC-015)", col3: "Semester Exam Fee", col4: "₹3,500", col5: "UPI (HDFC)" },
      { col1: "TXN-9023", col2: "Kunal Saxena (APX-2022-CS-014)", col3: "Arrear Realization", col4: "₹52,500", col5: "POS Card" },
      { col1: "TXN-9024", col2: "Sneha Kulkarni (APX-2023-CS-088)", col3: "Tuition Installment 2", col4: "₹25,000", col5: "UPI (ICICI)" },
    ],
  },
  {
    id: "rep-2",
    code: "FORM AC-02",
    title: "Head-wise Academic Fee Realization Matrix",
    description: "Multidimensional breakdown across Tuition, Development, Lab & Cloud Infrastructure, Library, and University Exam funds.",
    frequency: "Monthly / Term",
    lastGenerated: "15 Nov 2026",
    recordsCount: 1842,
    format: "PDF / XLSX",
    category: "Head-wise Realization",
    totalVolume: "₹18,45,20,000",
    auditorRemarks: "Tuition fee collections represent 71.4% of aggregate receipts, matching statutory budget targets.",
    sampleRows: [
      { col1: "FEE-HD-01", col2: "Tuition Fee Fund", col3: "Budget: ₹14.50 Cr", col4: "₹13.18 Cr", col5: "90.9% Realized" },
      { col1: "FEE-HD-02", col2: "Laboratory & High-Compute", col3: "Budget: ₹3.20 Cr", col4: "₹2.95 Cr", col5: "92.2% Realized" },
      { col1: "FEE-HD-03", col2: "Institutional Development", col3: "Budget: ₹2.00 Cr", col4: "₹1.88 Cr", col5: "94.0% Realized" },
      { col1: "FEE-HD-04", col2: "Library & Digital Journals", col3: "Budget: ₹75.0 Lakh", col4: "₹72.4 Lakh", col5: "96.5% Realized" },
    ],
  },
  {
    id: "rep-3",
    code: "FORM AC-03",
    title: "Cumulative Defaulter Aging & Hall Ticket Hold Register",
    description: "Defaulter aging analysis (>60d, 30-60d, 15-30d, <15d), parent notification logs, and Controller of Examinations barred list.",
    frequency: "Weekly",
    lastGenerated: "17 Nov 2026",
    recordsCount: 342,
    format: "PDF / CSV",
    category: "Defaulters & Arrears",
    totalVolume: "₹2,32,20,000",
    auditorRemarks: "82 candidates currently withheld from End-Sem hall ticket generation pursuant to Council Ordinance §14.2.",
    sampleRows: [
      { col1: "APX-2022-CS-014", col2: "Kunal Saxena (B.Tech CS VII)", col3: "Overdue 78 Days", col4: "₹52,500", col5: "BARRED (COE Hold)" },
      { col1: "APX-2022-ME-045", col2: "Manav Gupta (B.Tech ME VII)", col3: "Overdue 84 Days", col4: "₹64,000", col5: "BARRED (COE Hold)" },
      { col1: "APX-2024-ME-058", col2: "Rohan Verma (B.Tech ME III)", col3: "Overdue 48 Days", col4: "₹35,000", col5: "BARRED (COE Hold)" },
      { col1: "APX-2024-EC-031", col2: "Tanmay Joshi (B.Tech EC III)", col3: "Overdue 42 Days", col4: "₹38,000", col5: "BARRED (COE Hold)" },
    ],
  },
  {
    id: "rep-4",
    code: "FORM AC-04",
    title: "Bank Reconciliation Statement (BRS - Walker Chandiok Format)",
    description: "Inter-bank settlement matching HDFC A/c 50200084920 and ICICI A/c 003105002914 against institute ERP cashbooks with transit CTS logs.",
    frequency: "Bi-Weekly",
    lastGenerated: "14 Nov 2026",
    recordsCount: 612,
    format: "PDF / XLSX",
    category: "Bank Reconciliation (BRS)",
    totalVolume: "₹8,45,00,000",
    auditorRemarks: "Unreconciled difference: ₹0.00. All clearing cheques cleared within standard T+2 clearance window.",
    sampleRows: [
      { col1: "HDFC-TREASURY", col2: "A/c 50200084920 (Main Ops)", col3: "ERP Book: ₹6.42 Cr", col4: "Passbook: ₹6.42 Cr", col5: "Matched (0 Diff)" },
      { col1: "ICICI-COLLECT", col2: "A/c 003105002914 (Student POS)", col3: "ERP Book: ₹2.03 Cr", col4: "Passbook: ₹2.03 Cr", col5: "Matched (0 Diff)" },
      { col1: "SBI-PROJECT", col2: "A/c 30911847101 (R&D Grants)", col3: "ERP Book: ₹1.85 Cr", col4: "Passbook: ₹1.85 Cr", col5: "Matched (0 Diff)" },
      { col1: "CHQ-TRANSIT", col2: "CTS Cheque Clearing Pool", col3: "Pending Realization", col4: "₹45,000", col5: "Clearing T+1" },
    ],
  },
  {
    id: "rep-5",
    code: "FORM AC-05",
    title: "Scholarship, Concession & Fee Waiver Sanction Register",
    description: "Statutory documentation of Institutional Merit Scholarships, EWS Waivers, Sports Quotas, and Board of Trustees discretionary grants.",
    frequency: "Quarterly",
    lastGenerated: "01 Nov 2026",
    recordsCount: 142,
    format: "PDF / CSV",
    category: "Statutory & Tax (12A/80G)",
    totalVolume: "₹58,40,000",
    auditorRemarks: "Complies with Income Tax Section 12A educational exemptions; certified by Bursar & Finance Committee.",
    sampleRows: [
      { col1: "SCH-EWS-01", col2: "Economically Weaker Section", col3: "48 Beneficiaries", col4: "₹21,60,000", col5: "100% Waived" },
      { col1: "SCH-MRT-02", col2: "Apex Academic Merit Scholarship", col3: "62 Beneficiaries", col4: "₹24,80,000", col5: "50% Concession" },
      { col1: "SCH-SPT-03", col2: "National Sports & Athletics Quota", col3: "18 Beneficiaries", col4: "₹7,20,000", col5: "Approved by Dean" },
      { col1: "SCH-TRT-04", col2: "Trustee Special Endowment", col3: "14 Beneficiaries", col4: "₹4,80,000", col5: "Board Sanctioned" },
    ],
  },
  {
    id: "rep-6",
    code: "FORM AC-06",
    title: "Advance & Caution Deposit Refund Ledger",
    description: "Historical registry of institutional security deposits, laboratory caution money, and alumni clearance settlements.",
    frequency: "Quarterly",
    lastGenerated: "28 Oct 2026",
    recordsCount: 88,
    format: "PDF / CSV",
    category: "Caution Money & Refunds",
    totalVolume: "₹14,50,000",
    auditorRemarks: "All alumni clearances verified against No-Dues certificates from Library, Hostel, and Departmental Labs.",
    sampleRows: [
      { col1: "REF-2026-081", col2: "Aditya Roy (ME Batch 2022-26)", col3: "Lab Caution Money", col4: "₹10,000", col5: "Refunded via NEFT" },
      { col1: "REF-2026-082", col2: "Megha Sen (CS Batch 2022-26)", col3: "Hostel Security Deposit", col4: "₹15,000", col5: "Refunded via NEFT" },
      { col1: "REF-2026-083", col2: "Kavita Rao (EC Batch 2022-26)", col3: "Library Caution Money", col4: "₹5,000", col5: "Refunded via NEFT" },
      { col1: "REF-2026-084", col2: "Sameer Patil (BT Batch 2022-26)", col3: "Comprehensive Deposit", col4: "₹20,000", col5: "Audited & Disbursed" },
    ],
  },
  {
    id: "rep-7",
    code: "FORM AC-07",
    title: "Annual Statutory Income & Expenditure Statement",
    description: "Formal audit schedule complying with Income Tax Act Section 12A / 80G and AICTE Mandated Form 10B financial disclosures.",
    frequency: "Annual / FY",
    lastGenerated: "AY 2025-26 Final",
    recordsCount: 3820,
    format: "PDF / Tally XML",
    category: "Statutory & Tax (12A/80G)",
    totalVolume: "₹26,12,80,000",
    auditorRemarks: "Annual statutory audit statement co-signed by Walker Chandiok & Co LLP; filing completed on IT Portal.",
    sampleRows: [
      { col1: "REV-AGG-01", col2: "Aggregate Student Academic Fee", col3: "Schedule A (Income)", col4: "₹26,12,80,000", col5: "Net Realized" },
      { col1: "EXP-FAC-02", col2: "Academic Faculty & Staff Payroll", col3: "Schedule B (Expenditure)", col4: "₹14,80,00,000", col5: "Disbursed" },
      { col1: "EXP-INF-03", col2: "Laboratory, Compute & AI Campus", col3: "Schedule C (Capital)", col4: "₹4,20,00,000", col5: "Depreciated" },
      { col1: "SUR-OPR-04", col2: "Surplus Reinvested in Trust Fund", col3: "Sec 11(1)(a) Exemption", col4: "₹7,12,80,000", col5: "Tax Exempt" },
    ],
  },
];

export default function AccountantReportsPage() {
  const [reports, setReports] = useState<AuditReport[]>(mockReports);
  const [activeTab, setActiveTab] = useState<string>("All Schedules");
  const [fiscalYear, setFiscalYear] = useState("AY 2026-27");
  const [termCycle, setTermCycle] = useState("ALL");
  const [programFilter, setProgramFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [selectedReportView, setSelectedReportView] = useState<AuditReport | null>(null);
  const [isConsolidatedModalOpen, setIsConsolidatedModalOpen] = useState(false);
  const [isCashbookLockModalOpen, setIsCashbookLockModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const domainTabs = [
    { label: "All Schedules", count: 7 },
    { label: "Cashbook & Till Audit", count: 1 },
    { label: "Head-wise Realization", count: 1 },
    { label: "Defaulters & Arrears", count: 1 },
    { label: "Bank Reconciliation (BRS)", count: 1 },
    { label: "Statutory & Tax (12A/80G)", count: 2 },
    { label: "Caution Money & Refunds", count: 1 },
  ];

  const filteredReports = reports.filter((r) => {
    // Tab Filter
    if (activeTab !== "All Schedules" && r.category !== activeTab) {
      return false;
    }
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        r.code.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Download Individual Report CSV
  const handleDownloadCSV = (report: AuditReport) => {
    const header = ["Statutory Code", "Title", "Frequency", "Category", "Records", "Total Volume", "Last Generated"];
    const row = [
      report.code,
      `"${report.title}"`,
      report.frequency,
      `"${report.category}"`,
      report.recordsCount,
      `"${report.totalVolume}"`,
      `"${report.lastGenerated}"`,
    ];

    let csvContent = "data:text/csv;charset=utf-8," + [header.join(","), row.join(",")].join("\n");

    if (report.sampleRows && report.sampleRows.length > 0) {
      csvContent += "\n\nSCHEDULE BREAKDOWN PARTICULARS\n";
      csvContent += "Particular ID,Title / Description,Reference / Budget,Realized Amount,Audited Status\n";
      report.sampleRows.forEach((sr) => {
        csvContent += `"${sr.col1}","${sr.col2}","${sr.col3}","${sr.col4}","${sr.col5}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${report.code.replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded official CSV schedule for ${report.code}!`);
  };

  // Download Comprehensive Ledger Export
  const handleDownloadFullLedger = () => {
    const header = ["Code", "Title", "Frequency", "Category", "Audited Records", "Volume (INR)", "Last Generated", "Auditor Remarks"];
    const rows = reports.map((r) => [
      r.code,
      `"${r.title}"`,
      `"${r.frequency}"`,
      `"${r.category}"`,
      r.recordsCount,
      `"${r.totalVolume}"`,
      `"${r.lastGenerated}"`,
      `"${r.auditorRemarks}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `apex_annual_financial_schedules_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded master fiscal ledger with all 7 statutory audit schedules!");
  };

  return (
    <div className="flex flex-col w-full pb-16 font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Header Context Ribbon */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
              <Link href="/accountant" className="hover:text-[#3D405B] transition-colors">
                Bursar Portal
              </Link>
              <span>/</span>
              <span>Executive Intelligence</span>
              <span>/</span>
              <span className="text-[#3D405B] font-bold">Fiscal Reports &amp; Statutory Audits</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl lg:text-2xl font-bold text-[#3D405B] tracking-tight">
                Financial Intelligence &amp; Statutory Fiscal Reports
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                SEC 12A / 80G AUDITED
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                AICTE FORM 10B
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Statutory institutional audit schedules, daily cashier reconciliations, bank balance statements, and university fee disclosures.
            </p>
          </div>

          {/* Quick Scope Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsConsolidatedModalOpen(true)}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Audit Dossier</span>
            </button>
            <button
              onClick={handleDownloadFullLedger}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export FY Schedules (CSV)</span>
            </button>
            <button
              onClick={() => setIsCashbookLockModalOpen(true)}
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Day-End Cashbook</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Financial KPI Cards in Authentic Indian Rupee (₹) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Card 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Gross Annual Billed
            </span>
            <span className="text-2xl font-bold text-slate-900 mt-1">
              ₹28,45,00,000
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              94.8% Realization Rate
            </span>
          </div>
          <div className="p-3 bg-slate-100 text-[#3D405B] rounded-xl border border-slate-200">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Cumulative Realized
            </span>
            <span className="text-2xl font-bold text-emerald-700 mt-1">
              ₹26,12,80,000
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Net Deposited Across Vault &amp; Treasury
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <Banknote className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Uncollected Arrears
            </span>
            <span className="text-2xl font-bold text-rose-600 mt-1">
              ₹2,32,20,000
            </span>
            <span className="text-[11px] text-rose-600 font-semibold mt-0.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              342 Student Defaulters
            </span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Waivers &amp; Concessions
            </span>
            <span className="text-2xl font-bold text-[#3D405B] mt-1">
              ₹58,40,000
            </span>
            <span className="text-[11px] text-[#3D405B] font-medium mt-0.5">
              142 Merit &amp; EWS Beneficiaries
            </span>
          </div>
          <div className="p-3 bg-blue-50 text-blue-700 rounded-xl border border-blue-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Operational Domain Sub-Navigation Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm mb-5 flex flex-wrap items-center gap-2 text-xs">
        {domainTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === tab.label
                ? "bg-[#3D405B] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === tab.label
                  ? "bg-white/20 text-white"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Multi-Parameter Fiscal Filter Matrix */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="text-[11px] uppercase font-bold text-slate-500 block mb-1">
            Fiscal Session:
          </label>
          <select
            value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)}
            className="w-full bg-slate-50 p-2 rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none font-medium text-slate-800"
          >
            <option value="AY 2026-27">AY 2026-27 (Current Active Fiscal Year)</option>
            <option value="AY 2025-26">AY 2025-26 (Audited Final Closure)</option>
            <option value="AY 2024-25">AY 2024-25 (Statutory Archive)</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] uppercase font-bold text-slate-500 block mb-1">
            Academic Term Cycle:
          </label>
          <select
            value={termCycle}
            onChange={(e) => setTermCycle(e.target.value)}
            className="w-full bg-slate-50 p-2 rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none font-medium text-slate-800"
          >
            <option value="ALL">Full Academic Year (Annual)</option>
            <option value="EVEN">Even Semester (Sem II / IV / VI / VIII)</option>
            <option value="ODD">Odd Semester (Sem I / III / V / VII)</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] uppercase font-bold text-slate-500 block mb-1">
            Academic Discipline:
          </label>
          <select
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
            className="w-full bg-slate-50 p-2 rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none font-medium text-slate-800"
          >
            <option value="ALL">All Institute Departments</option>
            <option value="ENG">Faculty of Engineering &amp; Technology</option>
            <option value="MGMT">Faculty of Management Studies</option>
            <option value="CA">Department of Computer Applications</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] uppercase font-bold text-slate-500 block mb-1">
            Search Schedules:
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Code, Form, or Keyword..."
              className="w-full bg-slate-50 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analytical Visualizations Grid: 7 Cols (Daily Trend Graph) + 5 Cols (Course Realization Gauges) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
        {/* Left Chart (7 cols): Daily Collection Trajectory */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs uppercase tracking-wide text-[#3D405B]">
                  November 2026 Daily Realization Trajectory vs Target
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">
                Daily Benchmark: ₹15.0 Lakh / Day
              </span>
            </div>

            {/* SVG High-Density Graphic */}
            <div className="w-full h-48 relative border border-slate-200 bg-slate-50/70 rounded-xl p-2.5 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 600 180" preserveAspectRatio="none">
                {/* Horizontal Grid lines */}
                <line x1="0" y1="30" x2="600" y2="30" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="600" y2="75" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />
                <line x1="0" y1="160" x2="600" y2="160" stroke="#cbd5e1" strokeWidth="1.5" />

                {/* Target threshold horizontal line (₹15 Lakh) */}
                <line x1="0" y1="65" x2="600" y2="65" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 2" />

                {/* Daily Bars (28 representative days) */}
                {[
                  { d: 1, val: 40 }, { d: 2, val: 55 }, { d: 3, val: 65 }, { d: 4, val: 80 },
                  { d: 5, val: 140 }, // Salary spike
                  { d: 6, val: 95 }, { d: 7, val: 70 }, { d: 8, val: 85 }, { d: 9, val: 110 },
                  { d: 10, val: 165 }, // Exam cutoff 1
                  { d: 11, val: 80 }, { d: 12, val: 75 }, { d: 13, val: 90 }, { d: 14, val: 85 },
                  { d: 15, val: 130 }, // Mid-month
                  { d: 16, val: 90 }, { d: 17, val: 85 }, { d: 18, val: 100 }, { d: 19, val: 115 },
                  { d: 20, val: 170 }, // Hall ticket cutoff
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
                        width="13"
                        height={barHeight}
                        rx="2"
                        fill={isSpike ? "#3D405B" : "#64748b"}
                        className="hover:opacity-80 transition-opacity cursor-pointer"
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
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#3D405B]" /> Daily Intake
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-0.5 bg-rose-600" /> Target (₹15L)
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-3 h-0.5 bg-sky-600" /> 7-Day Moving Avg
              </span>
            </div>
            <div className="text-slate-600 font-medium">
              Peak: <strong className="text-slate-900">₹24.50L (Day 20)</strong> &bull; Month Avg: <strong className="text-slate-900">₹12.40L/day</strong>
            </div>
          </div>
        </div>

        {/* Right Chart (5 cols): Course-Wise Realization */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
                  <PieChart className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-xs uppercase tracking-wide text-[#3D405B]">
                  Discipline-Wise Fee Realization Ratio
                </h3>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">
                AY 2026-27 Benchmarks
              </span>
            </div>

            {/* Linear Gauge Progress Bars */}
            <div className="flex flex-col gap-3.5 text-xs">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">B.Tech Computer Science</span>
                  <span className="font-bold text-[#3D405B]">₹11.20 Cr / ₹11.60 Cr (96.5%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  <div className="bg-[#3D405B] h-full rounded-full" style={{ width: "96.5%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">M.Tech Post-Graduate</span>
                  <span className="font-bold text-slate-700">₹3.80 Cr / ₹4.18 Cr (90.9%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  <div className="bg-slate-600 h-full rounded-full" style={{ width: "90.9%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">MBA &amp; Management</span>
                  <span className="font-bold text-slate-700">₹4.20 Cr / ₹4.77 Cr (88.1%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  <div className="bg-slate-600 h-full rounded-full" style={{ width: "88.1%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">B.Tech Electronics (ECE)</span>
                  <span className="font-bold text-slate-700">₹3.40 Cr / ₹4.00 Cr (85.0%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  <div className="bg-slate-600 h-full rounded-full" style={{ width: "85.0%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">BCA &amp; Computer Apps</span>
                  <span className="font-bold text-slate-700">₹2.26 Cr / ₹2.75 Cr (82.2%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                  <div className="bg-slate-600 h-full rounded-full" style={{ width: "82.2%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-600 flex justify-between font-medium">
            <span>Engineering Cadre Realization: 92.4%</span>
            <span>Management Cadre: 88.1%</span>
          </div>
        </div>
      </div>

      {/* Detailed Audited Report Catalog & Download Center (The 7 Reports) */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-xs uppercase tracking-wide text-[#3D405B]">
              Institutional Statutory Audit &amp; Fiscal Schedules Catalog ({filteredReports.length} Active Schedules)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            AICTE Mandated Disclosure &bull; Form 10B Compliance Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col justify-between hover:border-[#3D405B] hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2 py-0.5 bg-[#3D405B] text-white rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {report.code}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {report.frequency}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm tracking-tight mb-1.5 leading-snug">
                  {report.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {report.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs">
                <div className="flex justify-between items-center text-slate-600 mb-1">
                  <span>Audited Volume:</span>
                  <span className="font-bold text-[#3D405B]">{report.totalVolume}</span>
                </div>
                <div className="flex justify-between items-center text-slate-500 text-[11px] mb-3">
                  <span>Last Refreshed: {report.lastGenerated}</span>
                  <span className="font-semibold text-slate-700">{report.recordsCount} Records</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedReportView(report)}
                    className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>View Dossier</span>
                  </button>
                  <button
                    onClick={() => handleDownloadCSV(report)}
                    className="py-1.5 px-3 bg-[#3D405B] hover:bg-[#2d3043] text-white font-bold uppercase text-[10px] rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Verification & Audit Sign-Off Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-3 bg-[#3D405B] text-white rounded-xl shrink-0 shadow-xs">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="font-bold text-[#3D405B] text-sm uppercase">
              Walker Chandiok &amp; Co LLP Annual Statutory Audit Synchronization
            </div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">
              General Ledger SHA-256 fingerprint: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-700">b99a8201fa649811...9914fe</code> &bull; All 1,842 counter realization vouchers co-signed under statutory authority of Bursar &amp; Finance Committee.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-full uppercase">
            AUDIT SEAL ACTIVE
          </span>
          <button
            onClick={() => showToast("Bursar co-signatory digital certificate verified: VALID (Exp: 2027).")}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-bold uppercase text-xs text-slate-700 rounded-xl cursor-pointer transition-colors"
          >
            Verify Cert
          </button>
        </div>
      </div>

      {/* Regulatory Institutional Footer */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center space-y-1">
        <div>
          Apex Institute of Technology &amp; Management &bull; Registered Educational Trust under Indian Trusts Act, 1882.
        </div>
        <div>
          Income Tax Act Section 12A / 80G Certified | AICTE Mandated Fee Transparency &amp; Public Financial Disclosure Compliance AY 2026-27.
        </div>
      </div>

      {/* Modal 1: View Detailed Report Dossier */}
      {selectedReportView && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#3D405B]">
                    {selectedReportView.code}: {selectedReportView.title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Statutory Schedule Audit Dossier &bull; {selectedReportView.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedReportView(null)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto pr-1 space-y-4">
              {/* Meta Grid */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Code:</span>
                  <span className="font-bold text-[#3D405B]">{selectedReportView.code}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Frequency:</span>
                  <span className="font-bold text-slate-800">{selectedReportView.frequency}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Volume:</span>
                  <span className="font-bold text-emerald-700">{selectedReportView.totalVolume}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Audited Items:</span>
                  <span className="font-bold text-slate-800">{selectedReportView.recordsCount} Records</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <h5 className="font-bold text-[#3D405B] uppercase text-[11px] mb-1">
                  Regulatory &amp; Accounting Scope:
                </h5>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {selectedReportView.description}
                </p>
                <div className="mt-2 text-xs text-slate-500 p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <strong>Auditor Note:</strong> {selectedReportView.auditorRemarks}
                </div>
              </div>

              {/* Sample Data Table */}
              {selectedReportView.sampleRows && (
                <div>
                  <h5 className="font-bold text-[#3D405B] uppercase text-[11px] mb-2">
                    Audited Particulars Sample:
                  </h5>
                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-[11px]">
                        <tr>
                          <th className="p-2.5">Identifier</th>
                          <th className="p-2.5">Particulars</th>
                          <th className="p-2.5">Ref / Head</th>
                          <th className="p-2.5 text-right">Amount (₹)</th>
                          <th className="p-2.5 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedReportView.sampleRows.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/60">
                            <td className="p-2.5 font-mono font-bold text-slate-700">{row.col1}</td>
                            <td className="p-2.5 text-slate-800 font-medium">{row.col2}</td>
                            <td className="p-2.5 text-slate-500">{row.col3}</td>
                            <td className="p-2.5 text-right font-bold text-slate-900">{row.col4}</td>
                            <td className="p-2.5 text-center">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                                {row.col5}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-200">
              <span className="text-xs text-slate-500 font-medium">
                Official Export Format: {selectedReportView.format}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedReportView(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl uppercase font-semibold text-xs cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadCSV(selectedReportView)}
                  className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl uppercase font-bold text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV Schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Consolidated Institutional Audit Dossier (Printable A4) */}
      {isConsolidatedModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#3D405B]">
                    Consolidated Institutional Audit Dossier
                  </h3>
                  <span className="text-xs text-slate-500">
                    Form 10B Statutory Audit Schedule &bull; {fiscalYear}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsConsolidatedModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Body */}
            <div className="overflow-y-auto pr-1 space-y-4">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#3D405B]">APEX INSTITUTE OF TECHNOLOGY</h4>
                    <p className="text-[11px] text-slate-500">
                      Office of the Chief Bursar &bull; Division of Academic Finance
                    </p>
                  </div>
                  <div className="text-right text-[11px] font-mono text-slate-500">
                    <div>Audit Reference: AIT/AUD/{fiscalYear.replace(/\s+/g, "")}</div>
                    <div>Statutory Exemption: Section 12A / 80G</div>
                  </div>
                </div>

                <div className="text-xs text-slate-700 leading-relaxed">
                  Certified summary of all 7 financial schedules for {fiscalYear}. All receipts have been audited against bank clearing logs, cashier till closing manifests, and scholarship disbursements.
                </div>

                <table className="w-full text-left text-xs bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-2">Code</th>
                      <th className="p-2">Schedule Particulars</th>
                      <th className="p-2">Frequency</th>
                      <th className="p-2 text-right">Cumulative Volume (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports.map((r) => (
                      <tr key={r.id}>
                        <td className="p-2 font-mono font-bold text-slate-800">{r.code}</td>
                        <td className="p-2 text-slate-800">{r.title}</td>
                        <td className="p-2 text-slate-500">{r.frequency}</td>
                        <td className="p-2 text-right font-bold text-[#3D405B]">{r.totalVolume}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold border-t border-slate-300">
                      <td colSpan={3} className="p-2 text-slate-800">Aggregate Gross Realized:</td>
                      <td className="p-2 text-right text-emerald-700 text-sm">₹26,12,80,000.00</td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-between items-center pt-4 mt-3 text-[11px] text-slate-500 border-t border-slate-200">
                  <div className="text-center">
                    <div className="h-6 font-script font-bold text-slate-800">R. K. Verma</div>
                    <div className="font-semibold text-slate-700">Accounts &amp; Cashier Officer</div>
                  </div>
                  <div className="text-center">
                    <div className="h-6 font-script font-bold text-slate-800">Walker Chandiok &amp; Co LLP</div>
                    <div className="font-semibold text-slate-700">Statutory Auditor &amp; Partner</div>
                  </div>
                  <div className="text-center">
                    <div className="h-6 font-script font-bold text-slate-800">Dr. S. Mukherjee</div>
                    <div className="font-semibold text-slate-700">Chief Bursar &amp; Dean Academic Finance</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 mt-3 border-t border-slate-200">
              <button
                onClick={() => setIsConsolidatedModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl uppercase font-semibold text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl uppercase font-bold text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Dossier</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Lock Day-End Cashbook */}
      {isCashbookLockModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#3D405B]">
                    Lock &amp; Seal Day-End Cashbook
                  </h3>
                  <span className="text-xs text-slate-500">
                    EOD Till Reconcile &bull; Vault Manifest Sealing
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCashbookLockModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs mb-3.5 leading-relaxed">
              <strong>Statutory Closure:</strong> Locking the Day-End cashbook freezes all counter tills for today. No additional fee entries may be recorded until tomorrow morning's vault verification.
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-4 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Till #01 (Cash Desk):</span>
                <span className="font-bold text-slate-800">₹2,07,500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Till #02 (Electronic / POS):</span>
                <span className="font-bold text-slate-800">₹1,77,500.00</span>
              </div>
              <div className="flex justify-between font-bold border-t border-slate-200 pt-1.5 text-slate-900">
                <span>Total Vault Closing Balance:</span>
                <span className="text-emerald-700 text-sm">₹3,85,000.00</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
              <button
                onClick={() => setIsCashbookLockModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl uppercase font-semibold text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsCashbookLockModalOpen(false);
                  showToast("Cashbook locked & sealed. Vault deposit manifest transmitted to HDFC Treasury.");
                }}
                className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl uppercase font-bold text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Lock &amp; Seal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
