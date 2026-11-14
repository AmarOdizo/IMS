"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Download,
  Filter,
  PlusCircle,
  Receipt,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Printer,
  Search,
  ExternalLink,
  TrendingUp,
  CreditCard,
  Building,
  UserCheck,
  FileSpreadsheet,
  X,
  Share2,
  FileText,
  ShieldCheck,
  Send,
  HelpCircle,
  Sparkles
} from "lucide-react";

interface Transaction {
  id: string;
  timestamp: string;
  studentName: string;
  roll: string;
  course: string;
  amount: number;
  mode: string;
  reference: string;
  status: "Cleared" | "In Clearing" | "Failed";
}

const initialTransactions: Transaction[] = [
  {
    id: "REC-2025-0842",
    timestamp: "Today 11:20 AM",
    studentName: "Rahul Sharma",
    roll: "APX-2023-CS-042",
    course: "B.Tech CSE (Sem IV)",
    amount: 45000,
    mode: "UPI",
    reference: "AXIS/482019",
    status: "Cleared",
  },
  {
    id: "REC-2025-0841",
    timestamp: "Today 10:45 AM",
    studentName: "Priya Patel",
    roll: "APX-2023-CS-015",
    course: "B.Tech CSE (Sem IV)",
    amount: 40000,
    mode: "Cheque",
    reference: "#441092 HDFC",
    status: "In Clearing",
  },
  {
    id: "REC-2025-0840",
    timestamp: "Today 10:15 AM",
    studentName: "Rohan Verma",
    roll: "APX-2023-CS-078",
    course: "B.Tech CSE (Sem IV)",
    amount: 25000,
    mode: "Cash",
    reference: "Counter Till #02",
    status: "Cleared",
  },
  {
    id: "REC-2025-0839",
    timestamp: "Today 09:40 AM",
    studentName: "Sneha Kulkarni",
    roll: "APX-2023-CS-055",
    course: "B.Tech CSE (Sem IV)",
    amount: 50000,
    mode: "Bank Transfer",
    reference: "NEFT/N3409192",
    status: "Cleared",
  },
  {
    id: "REC-2025-0838",
    timestamp: "Yesterday 04:15 PM",
    studentName: "Vikramaditya Singh",
    roll: "APX-2023-CS-091",
    course: "B.Tech CSE (Sem IV)",
    amount: 35000,
    mode: "Card",
    reference: "POS Terminal 4",
    status: "Cleared",
  },
  {
    id: "REC-2025-0837",
    timestamp: "Yesterday 02:30 PM",
    studentName: "Ananya Iyer",
    roll: "APX-2023-CS-003",
    course: "B.Tech CSE (Sem IV)",
    amount: 50000,
    mode: "UPI",
    reference: "GPay/HDFC/902",
    status: "Cleared",
  },
];

export default function AccountantDashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("ALL");
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTillLockModalOpen, setIsTillLockModalOpen] = useState(false);
  const [tillLocked, setTillLocked] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchQuery.toLowerCase());
      const matchMode = modeFilter === "ALL" || t.mode.toLowerCase() === modeFilter.toLowerCase();
      return matchSearch && matchMode;
    });
  }, [transactions, searchQuery, modeFilter]);

  const handlePrintReceipt = (receipt: Transaction) => {
    showToast(`Thermal Receipt voucher ${receipt.id} dispatched to Counter Spooler!`);
  };

  const handleExportCSV = () => {
    const csvHeader = "Receipt ID,Timestamp,Student,Roll,Course,Amount,Mode,Reference,Status\n";
    const csvRows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.timestamp}","${t.studentName}","${t.roll}","${t.course}",${t.amount},"${t.mode}","${t.reference}","${t.status}"`
      )
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `apex_fee_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Transaction ledger exported as CSV file!");
  };

  const handleLockTill = () => {
    setTillLocked(true);
    setIsTillLockModalOpen(false);
    showToast("Counter Till #02 locked! Day-End scroll and physical tally printed.");
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto font-body text-on-surface select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded shadow-xl flex items-center gap-3 border border-secondary text-xs uppercase tracking-wider font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#047857]" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Operational Header & Breadcrumb Segment */}
      <div className="px-5 py-2.5 bg-surface-container-low border border-[#d5e3fc] flex flex-wrap items-center justify-between gap-3 rounded-sm shadow-xs font-mono text-xs">
        <div className="flex items-center gap-1.5 text-secondary uppercase">
          <span className="text-primary font-bold">ACCOUNTS &amp; BURSAR PORTAL</span>
          <span className="text-outline">/</span>
          <span>FINANCIAL COMMAND MATRIX</span>
          <span className="text-outline">/</span>
          <span className="text-primary font-bold">TREASURY &amp; COUNTER COLLECTIONS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-secondary inline-block rounded-full animate-pulse"></span>
          <span className="font-mono text-xs text-primary uppercase font-bold">
            LIVE COUNTER CLEARING FEED &bull; TILL #02 ACTIVE &bull; AY 2025-26
          </span>
        </div>
      </div>

      {/* Welcome & Operational Status Bar */}
      <div className="bg-surface-container-lowest p-6 border border-[#d5e3fc] shadow-xs relative overflow-hidden rounded-sm">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-primary/5 via-secondary/10 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-primary text-on-primary font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider font-semibold rounded-xs">
                BURSAR &amp; TREASURY
              </span>
              <span className="inline-flex items-center gap-1 bg-surface-container text-primary px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded-xs border border-[#d5e3fc]">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                Chief Accountant
              </span>
              <span className="bg-surface-container text-primary px-2 py-0.5 font-mono text-[10px] uppercase font-bold rounded-xs border border-[#d5e3fc]">
                EMP-FIN-2016-309
              </span>
              <div className="flex items-center gap-1.5 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] px-2 py-0.5 rounded-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#047857] animate-pulse"></span>
                <span className="font-mono text-[10px] uppercase font-bold">
                  TILL #02 ACTIVE &bull; CASH VAULT TALLIED
                </span>
              </div>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-primary font-headline mt-1">
              Welcome back, Mr. Rajesh Kumar!
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-on-surface-variant font-mono text-xs mt-0.5">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">point_of_sale</span>
                Active Terminal: <strong className="text-primary font-bold">Counter Till #02 (Main Block)</strong>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-secondary">inventory_2</span>
                Vault Audit: <span className="text-[#047857] font-bold">₹1,42,500 Physical Cash Tallied</span>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/accountant/record-payment"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold hover:bg-primary-container transition-colors shadow-xs rounded-xs"
            >
              <PlusCircle className="h-4 w-4 text-secondary-container" />
              <span>Record Fee Payment</span>
            </Link>
            <Link
              href="/accountant/receipts"
              className="inline-flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-primary px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold transition-colors border border-[#d5e3fc] shadow-xs rounded-xs"
            >
              <Receipt className="h-4 w-4 text-secondary" />
              <span>Receipts Register</span>
            </Link>
            <Link
              href="/accountant/pending-dues"
              className="inline-flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-error px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold transition-colors border border-[#d5e3fc] shadow-xs rounded-xs"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Pending Defaulters</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Financial KPI Summary Cards (5-up in INR ₹) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {/* KPI 1: Today's Collection */}
        <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-secondary rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
              Today&apos;s Fee Collection
            </span>
            <Calendar className="h-4 w-4 text-secondary" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-primary tracking-tight">₹3,85,000</div>
            <div className="flex items-center gap-1 mt-1 font-mono text-xs">
              <span className="inline-flex items-center font-bold bg-[#ecfdf5] text-[#047857] px-1 rounded-xs border border-[#a7f3d0]">
                ▲ +14.2%
              </span>
              <span className="text-on-surface-variant">vs yesterday</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#d5e3fc]/60 flex items-center justify-between font-mono text-xs text-on-surface-variant">
            <span>Counter &amp; Wire</span>
            <span className="text-primary font-bold">24 Txns Done</span>
          </div>
        </div>

        {/* KPI 2: Monthly Collection */}
        <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-primary rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
              Monthly (March 2025)
            </span>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-primary tracking-tight">₹48,60,000</div>
            <div className="flex items-center gap-1 mt-1 font-mono text-xs">
              <span className="text-secondary font-bold">Target: ₹55.00 Lakhs</span>
            </div>
          </div>
          <div className="space-y-1 pt-2 border-t border-[#d5e3fc]/60">
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: "88.4%" }}></div>
            </div>
            <div className="flex justify-between font-mono text-[11px] text-on-surface-variant">
              <span>Run Rate MTD</span>
              <span className="text-primary font-bold">88.4% Realized</span>
            </div>
          </div>
        </div>

        {/* KPI 3: AY 2025-26 Gross Billed */}
        <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-secondary-container rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
              AY 2025-26 Gross Billed
            </span>
            <Building className="h-4 w-4 text-secondary" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-primary tracking-tight">₹4,18,50,000</div>
            <div className="flex items-center gap-1 mt-1 font-mono text-xs text-on-surface-variant">
              <span>Billed Total: ₹4,65,00,000</span>
            </div>
          </div>
          <div className="space-y-1 pt-2 border-t border-[#d5e3fc]/60">
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: "90.0%" }}></div>
            </div>
            <div className="flex justify-between font-mono text-[11px] text-on-surface-variant">
              <span>Fiscal Progress</span>
              <span className="text-primary font-bold">90.0% Realized</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Pending Dues */}
        <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-error rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-error font-bold">
              Outstanding Dues
            </span>
            <AlertTriangle className="h-4 w-4 text-error" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-error tracking-tight">₹46,50,000</div>
            <div className="flex items-center gap-1 mt-1 font-mono text-xs text-error font-semibold">
              <span>342 Defaulter Accounts</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#d5e3fc]/60 flex items-center justify-between font-mono text-xs">
            <span className="text-on-surface-variant">Admit Card Hold</span>
            <span className="bg-error-container text-on-error-container px-1.5 py-0.2 rounded-xs font-bold text-[10px]">
              82 Critical Holds
            </span>
          </div>
        </div>

        {/* KPI 5: Receipts Issued */}
        <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-outline rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-bold">
              Receipts Issued
            </span>
            <Receipt className="h-4 w-4 text-secondary" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-primary tracking-tight">1,842</div>
            <div className="flex items-center gap-1 mt-1 font-mono text-xs text-on-surface-variant">
              <span>Reversals: 0 Nil</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#d5e3fc]/60 flex items-center justify-between font-mono text-xs">
            <span className="text-on-surface-variant">Ledger Audit</span>
            <span className="text-[#047857] font-bold">100% In Sync</span>
          </div>
        </div>
      </div>

      {/* Two-Column Analytical Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT COLUMN (8 cols on XL) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {/* Section 1: Monthly Fee Collection Bar Chart (Oct 2024 to Mar 2025) */}
          <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs rounded-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#d5e3fc]">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-bold">
                  Semester-Wise Fiscal Trajectory
                </span>
                <h2 className="text-base font-bold text-primary">
                  Monthly Fee Intake: Target vs. Actual (₹ Lakhs)
                </h2>
              </div>
              <div className="flex items-center gap-4 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-primary inline-block rounded-xs"></span>
                  <span className="text-on-surface font-semibold">Actual Intake</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-surface-container-high border border-[#d5e3fc] inline-block rounded-xs"></span>
                  <span className="text-on-surface-variant">Billed Target</span>
                </div>
                <div className="px-2 py-0.5 bg-surface-container font-mono text-[11px] text-secondary font-bold rounded-xs border border-[#d5e3fc]">
                  AY 2025-26
                </div>
              </div>
            </div>

            {/* Technical SVG Bar Chart */}
            <div className="pt-4">
              <div className="relative w-full h-64">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 680 220">
                  {/* Grid lines */}
                  <line stroke="#d5e3fc" strokeDasharray="2 2" strokeWidth="1" x1="40" x2="660" y1="20" y2="20" />
                  <text fill="#74777f" fontFamily="Geist" fontSize="10" textAnchor="end" x="32" y="24">₹90L</text>
                  <line stroke="#d5e3fc" strokeDasharray="2 2" strokeWidth="1" x1="40" x2="660" y1="70" y2="70" />
                  <text fill="#74777f" fontFamily="Geist" fontSize="10" textAnchor="end" x="32" y="74">₹60L</text>
                  <line stroke="#d5e3fc" strokeDasharray="2 2" strokeWidth="1" x1="40" x2="660" y1="120" y2="120" />
                  <text fill="#74777f" fontFamily="Geist" fontSize="10" textAnchor="end" x="32" y="124">₹30L</text>
                  <line stroke="#d5e3fc" strokeWidth="1" x1="40" x2="660" y1="170" y2="170" />
                  <text fill="#74777f" fontFamily="Geist" fontSize="10" textAnchor="end" x="32" y="174">₹0</text>

                  {/* OCT 2024 */}
                  <rect fill="#d5e3fc" height="59" width="28" x="70" y="111" rx="2" />
                  <rect fill="#001028" height="54" width="28" x="100" y="116" rx="2" />
                  <text fill="#0d1c2e" fontFamily="Geist" fontSize="11" fontWeight="600" textAnchor="middle" x="99" y="190">OCT &apos;24</text>
                  <text fill="#001028" fontFamily="Geist" fontSize="9" textAnchor="middle" x="114" y="110">₹32L</text>

                  {/* NOV 2024 */}
                  <rect fill="#d5e3fc" height="67" width="28" x="170" y="103" rx="2" />
                  <rect fill="#001028" height="64" width="28" x="200" y="106" rx="2" />
                  <text fill="#0d1c2e" fontFamily="Geist" fontSize="11" fontWeight="600" textAnchor="middle" x="199" y="190">NOV &apos;24</text>
                  <text fill="#001028" fontFamily="Geist" fontSize="9" textAnchor="middle" x="214" y="100">₹38L</text>

                  {/* DEC 2024 */}
                  <rect fill="#d5e3fc" height="50" width="28" x="270" y="120" rx="2" />
                  <rect fill="#001028" height="47" width="28" x="300" y="123" rx="2" />
                  <text fill="#0d1c2e" fontFamily="Geist" fontSize="11" fontWeight="600" textAnchor="middle" x="299" y="190">DEC &apos;24</text>
                  <text fill="#001028" fontFamily="Geist" fontSize="9" textAnchor="middle" x="314" y="117">₹28L</text>

                  {/* JAN 2025 (Peak Surge) */}
                  <rect fill="#d5e3fc" height="134" width="28" x="370" y="36" rx="2" />
                  <rect fill="#001028" height="140" width="28" x="400" y="30" rx="2" />
                  <text fill="#0d1c2e" fontFamily="Geist" fontSize="11" fontWeight="700" textAnchor="middle" x="399" y="190">JAN &apos;25*</text>
                  <text fill="#365f97" fontFamily="Geist" fontSize="10" fontWeight="bold" textAnchor="middle" x="414" y="24">₹84L 🔥</text>

                  {/* FEB 2025 */}
                  <rect fill="#d5e3fc" height="67" width="28" x="470" y="103" rx="2" />
                  <rect fill="#001028" height="70" width="28" x="500" y="100" rx="2" />
                  <text fill="#0d1c2e" fontFamily="Geist" fontSize="11" fontWeight="600" textAnchor="middle" x="499" y="190">FEB &apos;25</text>
                  <text fill="#001028" fontFamily="Geist" fontSize="9" textAnchor="middle" x="514" y="94">₹42L</text>

                  {/* MAR 2025 (Live) */}
                  <rect fill="#d5e3fc" height="92" width="28" x="570" y="78" rx="2" />
                  <rect fill="#365f97" height="81" width="28" x="600" y="89" rx="2" />
                  <text fill="#365f97" fontFamily="Geist" fontSize="11" fontWeight="700" textAnchor="middle" x="599" y="190">MAR &apos;25 (Live)</text>
                  <text fill="#365f97" fontFamily="Geist" fontSize="9" fontWeight="bold" textAnchor="middle" x="614" y="83">₹48.6L</text>
                </svg>
              </div>
              <div className="flex flex-wrap items-center justify-between text-on-surface-variant font-mono text-[11px] bg-surface-container-low px-3 py-1.5 rounded-xs mt-2 border border-[#d5e3fc]">
                <span>* Jan &amp; Mar signify Semester II &amp; IV Exam/Tuition Fee enrollment surges.</span>
                <span className="text-secondary font-bold">Surge Realization: 105% (Jan) | 88.4% (Mar MTD)</span>
              </div>
            </div>
          </div>

          {/* Section 2: Recent Fee Payments & Real-time Transactions Table */}
          <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs rounded-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#d5e3fc]">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-bold">
                  Audit Stream
                </span>
                <h3 className="text-base font-bold text-primary">
                  Recent Fee Payments &amp; Real-time Counter Transactions
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    type="text"
                    placeholder="Search student, receipt, roll..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 pl-8 pr-3 text-xs bg-surface-container-low border border-[#d5e3fc] rounded-xs text-primary focus:outline-none focus:border-secondary w-56 font-mono"
                  />
                </div>

                <div className="hidden lg:flex items-center gap-1 font-mono text-xs">
                  {["ALL", "UPI", "Cash", "Cheque", "Bank Transfer", "Card"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setModeFilter(mode)}
                      className={`px-2 py-1 text-[11px] font-bold rounded-xs transition-colors cursor-pointer border ${
                        modeFilter.toLowerCase() === mode.toLowerCase()
                          ? "bg-primary text-on-primary border-primary shadow-xs"
                          : "bg-surface-container text-on-surface-variant border-[#d5e3fc] hover:bg-surface-container-high"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <select
                  value={modeFilter}
                  onChange={(e) => setModeFilter(e.target.value)}
                  className="lg:hidden h-8 px-2.5 text-xs bg-surface-container-low border border-[#d5e3fc] rounded-xs font-mono text-on-surface font-semibold focus:outline-none"
                >
                  <option value="ALL">All Modes</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Card">Card</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="h-8 inline-flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high px-3 font-mono text-xs text-primary border border-[#d5e3fc] transition-colors rounded-xs font-bold cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase font-bold text-[11px] tracking-wider border-b border-[#d5e3fc]">
                  <tr>
                    <th className="py-2.5 px-3">Receipt #</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Roll / Enrollment</th>
                    <th className="py-2.5 px-3">Course &amp; Sem</th>
                    <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                    <th className="py-2.5 px-3">Mode &amp; Ref</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d5e3fc]/60">
                  {filteredTransactions.map((t, idx) => (
                    <tr
                      key={t.id}
                      className={`hover:bg-surface-container-low/60 transition-colors ${
                        idx % 2 === 1 ? "bg-surface-container-lowest" : "bg-surface-container-low/20"
                      }`}
                    >
                      <td className="py-2.5 px-3 font-bold text-primary">{t.id}</td>
                      <td className="py-2.5 px-3 text-on-surface-variant text-[11px]">{t.timestamp}</td>
                      <td className="py-2.5 px-3 text-on-surface font-sans font-semibold">{t.studentName}</td>
                      <td className="py-2.5 px-3 text-secondary">{t.roll}</td>
                      <td className="py-2.5 px-3 text-on-surface-variant text-[11px]">{t.course}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-primary text-sm">
                        ₹{t.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-primary">{t.mode}</span>
                          <span className="text-[10px] text-on-surface-variant">{t.reference}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-xs ${
                            t.status === "Cleared"
                              ? "bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]"
                              : t.status === "In Clearing"
                              ? "bg-[#fffbeb] text-[#b45309] border border-[#fde68a]"
                              : "bg-error-container text-on-error-container"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => setSelectedReceipt(t)}
                          className="text-secondary hover:text-primary underline font-bold text-[11px] cursor-pointer"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-on-surface-variant font-mono">
                        No transactions matching filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-2 border-t border-[#d5e3fc] font-mono text-xs">
              <span className="text-on-surface-variant">
                Showing {filteredTransactions.length} of {transactions.length} ledger entries across Term II
              </span>
              <div className="flex items-center gap-1 font-mono">
                <button className="px-2 py-0.5 bg-surface-container text-on-surface hover:bg-surface-variant rounded-xs border border-[#d5e3fc]">
                  Prev
                </button>
                <span className="px-2 py-0.5 bg-primary text-on-primary font-bold rounded-xs">1</span>
                <button className="px-2 py-0.5 bg-surface-container text-on-surface hover:bg-surface-variant rounded-xs border border-[#d5e3fc]">
                  2
                </button>
                <button className="px-2 py-0.5 bg-surface-container text-on-surface hover:bg-surface-variant rounded-xs border border-[#d5e3fc]">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols on XL) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Section A: Payment Mode Distribution */}
          <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs rounded-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#d5e3fc]">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-bold">
                  Gateway vs. Counter
                </span>
                <h3 className="text-base font-bold text-primary">Payment Mode Breakdown</h3>
              </div>
              <span className="font-mono text-xs text-on-surface-variant font-bold">MTD March</span>
            </div>

            <div className="pt-3 flex flex-col gap-3">
              {/* Stacked Bar representation */}
              <div className="w-full h-3 bg-surface-container flex overflow-hidden rounded-full">
                <div className="bg-primary h-full" style={{ width: "42%" }} title="UPI: 42%"></div>
                <div className="bg-secondary h-full" style={{ width: "28%" }} title="NEFT / Bank: 28%"></div>
                <div className="bg-secondary-container h-full" style={{ width: "15%" }} title="Counter Cash: 15%"></div>
                <div className="bg-surface-tint h-full" style={{ width: "10%" }} title="POS Card: 10%"></div>
                <div className="bg-outline h-full" style={{ width: "5%" }} title="Cheque / DD: 5%"></div>
              </div>

              {/* Channel List Breakdown */}
              <div className="flex flex-col gap-2 font-mono text-xs pt-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-primary inline-block rounded-xs"></span>
                    <span className="text-on-surface font-semibold">UPI (QR / VPA)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-bold">42%</span>
                    <span className="text-on-surface-variant text-[11px]">(₹20.41L)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-secondary inline-block rounded-xs"></span>
                    <span className="text-on-surface font-semibold">Bank / NEFT / RTGS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-bold">28%</span>
                    <span className="text-on-surface-variant text-[11px]">(₹13.60L)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-secondary-container inline-block rounded-xs"></span>
                    <span className="text-on-surface font-semibold">Counter Physical Cash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-bold">15%</span>
                    <span className="text-on-surface-variant text-[11px]">(₹7.29L)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-surface-tint inline-block rounded-xs"></span>
                    <span className="text-on-surface font-semibold">POS Debit / Credit Card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-bold">10%</span>
                    <span className="text-on-surface-variant text-[11px]">(₹4.86L)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-outline inline-block rounded-xs"></span>
                    <span className="text-on-surface font-semibold">Cheque / Demand Draft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-on-surface font-bold">5%</span>
                    <span className="text-on-surface-variant text-[11px]">(₹2.43L)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Exam Clearance Holds & Defaulter Students */}
          <div className="bg-surface-container-lowest p-5 border border-[#d5e3fc] shadow-xs rounded-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#d5e3fc]">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-error font-bold">
                  Imminent Action Required
                </span>
                <h3 className="text-base font-bold text-primary">Exam Clearance Holds</h3>
              </div>
              <span className="bg-error-container text-on-error-container font-mono text-[10px] font-bold px-2 py-0.5 rounded-xs">
                82 LOCKED
              </span>
            </div>

            <div className="flex flex-col gap-2.5 pt-3 font-mono text-xs">
              {/* Defaulter 1 */}
              <div className="p-2.5 bg-surface-container-low border border-[#d5e3fc] rounded-xs flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-primary">Rohan Verma</span>
                  <span className="font-bold text-error">₹45,000</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant text-[11px]">
                  <span>B.Tech CS-IV (Roll: 078)</span>
                  <span className="text-error font-bold">Deadline: 30 Mar</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#d5e3fc] mt-1">
                  <span className="bg-error-container text-on-error-container px-1.5 py-0.2 text-[9px] font-bold uppercase rounded-xs">
                    Critical Notice Sent
                  </span>
                  <button
                    onClick={() => showToast("SMS Alert dispatched to Rohan Verma & Father (+91 98765 43210)")}
                    className="text-secondary hover:text-primary font-bold text-[11px] underline cursor-pointer"
                  >
                    Send SMS Alert
                  </button>
                </div>
              </div>

              {/* Defaulter 2 */}
              <div className="p-2.5 bg-surface-container-low border border-[#d5e3fc] rounded-xs flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-primary">Sneha Kulkarni</span>
                  <span className="font-bold text-primary">₹35,000</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant text-[11px]">
                  <span>B.Tech CS-IV (Roll: 055)</span>
                  <span className="text-secondary font-bold">Deadline: 05 Apr</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#d5e3fc] mt-1">
                  <span className="bg-[#fffbeb] text-[#b45309] px-1.5 py-0.2 text-[9px] font-bold uppercase rounded-xs border border-[#fde68a]">
                    Partial Paid (₹15k rec)
                  </span>
                  <button
                    onClick={() => showToast("Challan Copy generated & saved to student dossier.")}
                    className="text-secondary hover:text-primary font-bold text-[11px] underline cursor-pointer"
                  >
                    Challan Copy
                  </button>
                </div>
              </div>

              {/* Defaulter 3 */}
              <div className="p-2.5 bg-surface-container-low border border-[#d5e3fc] rounded-xs flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-bold text-primary">Kunal Saxena</span>
                  <span className="font-bold text-error">₹50,000</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant text-[11px]">
                  <span>B.Tech CS-IV (Roll: 104)</span>
                  <span className="text-error font-bold">Deadline: 30 Mar</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#d5e3fc] mt-1">
                  <span className="bg-error-container text-on-error-container px-1.5 py-0.2 text-[9px] font-bold uppercase rounded-xs">
                    Hold Active
                  </span>
                  <span className="text-error font-bold text-[11px]">
                    Admit Card Blocked
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-1 text-center border-t border-[#d5e3fc]">
              <Link
                href="/accountant/pending-dues"
                className="inline-block text-secondary hover:text-primary font-mono text-xs font-bold uppercase tracking-wider"
              >
                View All 342 Defaulters Across Batches &rarr;
              </Link>
            </div>
          </div>

          {/* Section C: Daily Cash Till Reconciliation Panel */}
          <div className="bg-primary-container text-on-primary p-5 border border-[#324769] shadow-xs rounded-sm flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#324769]">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-secondary-container" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-on-primary-container font-bold">
                    Till Reconciliation #02
                  </span>
                  <span className="text-sm font-bold text-on-primary">Cash Register Audit</span>
                </div>
              </div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[10px] font-bold px-2 py-0.5 uppercase rounded-xs">
                {tillLocked ? "LOCKED & ARCHIVED" : "AUDIT PASSED"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
              <div className="bg-primary p-2.5 rounded-xs border border-white/10">
                <span className="text-[10px] uppercase text-on-primary-container block font-bold">Opening Float</span>
                <span className="text-base font-bold text-on-primary">₹25,000</span>
              </div>
              <div className="bg-primary p-2.5 rounded-xs border border-white/10">
                <span className="text-[10px] uppercase text-on-primary-container block font-bold">Day Cash Intake</span>
                <span className="text-base font-bold text-secondary-container">₹1,17,500</span>
              </div>
            </div>

            <div className="bg-primary p-2.5 rounded-xs border border-white/10 font-mono text-xs flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-on-primary-container text-[11px]">
                <span>Denomination Summary:</span>
                <span className="text-[#047857] font-bold">Count Check: 100% Verified</span>
              </div>
              <div className="text-[11px] text-on-primary leading-relaxed">
                ₹500 x 270 (₹1,35,000) &nbsp;|&nbsp; ₹200 x 30 (₹6,000) &nbsp;|&nbsp; ₹100 x 15 (₹1,500)
              </div>
              <div className="pt-1.5 border-t border-[#324769] flex justify-between font-bold text-on-primary">
                <span>Physical Cash Total:</span>
                <span className="text-secondary-fixed text-sm">₹1,42,500</span>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-on-primary-container">Vault Drop Scheduled:</span>
              <span className="font-bold text-on-primary">17:00 IST (Supervisor Custody)</span>
            </div>

            <button
              onClick={() => setIsTillLockModalOpen(true)}
              disabled={tillLocked}
              className="w-full py-2 bg-secondary hover:bg-on-secondary-container text-on-primary font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-xs rounded-xs cursor-pointer disabled:opacity-50"
            >
              {tillLocked ? "Till Locked for Today" : "Lock Counter & Print Day-End Scroll"}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: View Receipt Details Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-lg w-full border border-[#d5e3fc] shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 rounded-sm">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#d5e3fc] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 bg-primary-container text-secondary-container font-bold flex items-center justify-center rounded-xs">
                  <Receipt className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase text-primary">Fee Receipt Voucher</h3>
                  <span className="font-mono text-xs text-secondary font-bold">{selectedReceipt.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-on-surface-variant hover:text-primary p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Official Voucher Preview */}
            <div className="bg-surface-container-low p-4 border border-[#d5e3fc] rounded-xs font-mono text-xs flex flex-col gap-3">
              <div className="text-center border-b border-[#d5e3fc] pb-2">
                <span className="font-headline text-sm font-bold text-primary uppercase block">
                  Apex Institute of Technology
                </span>
                <span className="text-[10px] text-on-surface-variant block">
                  Accounts &amp; Treasury Directorate &bull; Official Fee Token
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-on-surface-variant block text-[9px] uppercase">Candidate Name:</span>
                  <span className="font-bold text-primary">{selectedReceipt.studentName}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[9px] uppercase">Roll / Enrolment:</span>
                  <span className="font-bold text-secondary">{selectedReceipt.roll}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[9px] uppercase">Programme &amp; Semester:</span>
                  <span className="text-on-surface">{selectedReceipt.course}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[9px] uppercase">Payment Timestamp:</span>
                  <span className="text-on-surface">{selectedReceipt.timestamp}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[9px] uppercase">Payment Mode:</span>
                  <span className="font-bold text-primary">{selectedReceipt.mode}</span>
                </div>
                <div>
                  <span className="text-on-surface-variant block text-[9px] uppercase">Bank Ref / Till:</span>
                  <span className="text-on-surface">{selectedReceipt.reference}</span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest border border-[#d5e3fc] flex items-center justify-between mt-1 rounded-xs">
                <span className="font-bold text-primary uppercase">Total Realized Amount:</span>
                <span className="text-xl font-bold font-mono text-primary">
                  ₹{selectedReceipt.amount.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-on-surface-variant pt-2 border-t border-[#d5e3fc]">
                <span>Status: <strong className="text-[#047857]">{selectedReceipt.status}</strong></span>
                <span>Authorized Cashier: EMP-FIN-309</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-2 border-t border-[#d5e3fc]">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 border border-[#d5e3fc] text-xs font-mono font-bold uppercase hover:bg-surface-container rounded-xs cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handlePrintReceipt(selectedReceipt);
                  setSelectedReceipt(null);
                }}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-primary-container rounded-xs cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print Thermal Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Lock Counter Till Modal */}
      {isTillLockModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full border border-[#d5e3fc] shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 rounded-sm">
            <div className="flex items-start justify-between border-b border-[#d5e3fc] pb-3">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">Confirm Till #02 Lock</h3>
              </div>
              <button
                onClick={() => setIsTillLockModalOpen(false)}
                className="text-on-surface-variant hover:text-primary p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Are you sure you want to lock <strong>Counter Till #02</strong>? This will freeze transaction intakes for today and generate the formal Day-End Cashier Scroll (Physical Cash: ₹1,42,500) for vault supervisor handover.
            </p>

            <div className="p-3 bg-surface-container-low border border-[#d5e3fc] font-mono text-xs space-y-1 rounded-xs">
              <div className="flex justify-between">
                <span>Total Cash Counted:</span>
                <span className="font-bold text-primary">₹1,42,500</span>
              </div>
              <div className="flex justify-between">
                <span>Supervisor on Duty:</span>
                <span className="text-secondary font-bold">Mr. V. Sundaram (Sr. Auditor)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#d5e3fc]">
              <button
                onClick={() => setIsTillLockModalOpen(false)}
                className="px-4 py-2 border border-[#d5e3fc] text-xs font-mono font-bold uppercase hover:bg-surface-container rounded-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLockTill}
                className="px-4 py-2 bg-error text-on-error text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-error/90 rounded-xs cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                <span>Confirm Lock &amp; Print Scroll</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
