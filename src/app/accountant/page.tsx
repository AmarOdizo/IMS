"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  CreditCard,
  Building2,
  TrendingUp,
  AlertTriangle,
  Receipt,
  Download,
  Search,
  PlusCircle,
  CheckCircle2,
  Lock,
  Printer,
  ShieldCheck,
  X,
  FileSpreadsheet,
  Coins,
  Send,
  FileText,
  Clock,
  Sparkles,
  QrCode,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Filter,
} from "lucide-react";

interface Transaction {
  id: string;
  timestamp: string;
  studentName: string;
  roll: string;
  course: string;
  amount: number;
  mode: "UPI" | "Cash" | "Cheque" | "Bank Transfer" | "Card";
  reference: string;
  status: "Cleared" | "In Clearing" | "Reconciled";
}

interface Defaulter {
  id: string;
  name: string;
  roll: string;
  course: string;
  dueAmount: number;
  dueDate: string;
  phone: string;
  challanNo: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "REC-2025-0842",
    timestamp: "Today 11:20 AM",
    studentName: "Rahul Sharma",
    roll: "APX-2023-CS-042",
    course: "B.Tech CSE (Sem IV)",
    amount: 27500,
    mode: "UPI",
    reference: "UPI/508492019/HDFC",
    status: "Cleared",
  },
  {
    id: "REC-2025-0841",
    timestamp: "Today 10:45 AM",
    studentName: "Priya Patel",
    roll: "APX-2022-EC-019",
    course: "B.Tech ECE (Sem VII)",
    amount: 40000,
    mode: "Cheque",
    reference: "Chq #441092 / AXIS",
    status: "In Clearing",
  },
  {
    id: "REC-2025-0840",
    timestamp: "Today 10:15 AM",
    studentName: "Rohan Verma",
    roll: "APX-2024-ME-058",
    course: "B.Tech Mech (Sem II)",
    amount: 25000,
    mode: "Cash",
    reference: "Till #02 Counter Cash",
    status: "Cleared",
  },
  {
    id: "REC-2025-0839",
    timestamp: "Today 09:30 AM",
    studentName: "Sneha Kulkarni",
    roll: "APX-2023-CS-055",
    course: "B.Tech CSE (Sem IV)",
    amount: 15000,
    mode: "Bank Transfer",
    reference: "NEFT/ICIC/84920",
    status: "Cleared",
  },
  {
    id: "REC-2025-0838",
    timestamp: "Yesterday 04:15 PM",
    studentName: "Kunal Saxena",
    roll: "APX-2021-CS-104",
    course: "B.Tech CSE (Sem VIII)",
    amount: 35000,
    mode: "Card",
    reference: "POS/HDFC/T8291",
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

const defaultersList: Defaulter[] = [
  {
    id: "DEF-01",
    name: "Rohan Verma",
    roll: "APX-2024-ME-058",
    course: "B.Tech ME (Sem II)",
    dueAmount: 45000,
    dueDate: "30 Mar 2025",
    phone: "+91 98765 43210",
    challanNo: "CHL-2025-092",
  },
  {
    id: "DEF-02",
    name: "Sneha Kulkarni",
    roll: "APX-2023-CS-055",
    course: "B.Tech CSE (Sem IV)",
    dueAmount: 35000,
    dueDate: "05 Apr 2025",
    phone: "+91 98450 11223",
    challanNo: "CHL-2025-093",
  },
  {
    id: "DEF-03",
    name: "Aryan Saxena",
    roll: "APX-2022-EC-031",
    course: "B.Tech ECE (Sem VI)",
    dueAmount: 52000,
    dueDate: "28 Mar 2025",
    phone: "+91 97112 33445",
    challanNo: "CHL-2025-094",
  },
];

export default function AccountantDashboardPage() {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isTillLockModalOpen, setIsTillLockModalOpen] = useState(false);
  const [tillLocked, setTillLocked] = useState(false);

  // Defaulters action modals
  const [smsModalDefaulter, setSmsModalDefaulter] = useState<Defaulter | null>(null);
  const [challanModalDefaulter, setChallanModalDefaulter] = useState<Defaulter | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const modeCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: transactions.length };
    transactions.forEach((t) => {
      counts[t.mode] = (counts[t.mode] || 0) + 1;
    });
    return counts;
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.course.toLowerCase().includes(searchQuery.toLowerCase());

      const matchMode =
        modeFilter === "ALL" || t.mode.toLowerCase() === modeFilter.toLowerCase();

      const matchStatus =
        statusFilter === "ALL" || t.status.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchMode && matchStatus;
    });
  }, [transactions, searchQuery, modeFilter, statusFilter]);

  const handlePrintReceipt = (receipt: Transaction) => {
    showToast(`Receipt voucher ${receipt.id} sent to counter thermal printer!`);
    window.print();
  };

  const handleDownloadReceipt = (receipt: Transaction) => {
    const content = `APEX INSTITUTE OF TECHNOLOGY & MANAGEMENT
ACCOUNTS DIRECTORATE - FEE RECEIPT VOUCHER
==================================================
Receipt ID: ${receipt.id}
Date/Time:  ${receipt.timestamp}
Student:    ${receipt.studentName}
Roll No:    ${receipt.roll}
Course:     ${receipt.course}
Payment Mode: ${receipt.mode}
Reference:  ${receipt.reference}
Amount:     INR ₹${receipt.amount.toLocaleString("en-IN")}
Status:     ${receipt.status}
Verified:   Yes (Counter Till #02 Cashier EMP-FIN-309)
==================================================`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${receipt.id}_slip.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Voucher ${receipt.id} downloaded successfully!`);
  };

  const handleExportCSV = () => {
    const csvHeader =
      "Receipt ID,Timestamp,Student,Roll,Course,Amount (INR),Mode,Reference,Status\n";
    const csvRows = filteredTransactions
      .map(
        (t) =>
          `"${t.id}","${t.timestamp}","${t.studentName}","${t.roll}","${t.course}",${t.amount},"${t.mode}","${t.reference}","${t.status}"`
      )
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `fee_transactions_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Transaction register exported as CSV!");
  };

  const handleLockTill = () => {
    setTillLocked(true);
    setIsTillLockModalOpen(false);
    showToast("Counter Till #02 locked! Day-End Cashier Handover Scroll generated.");
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-600 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-amber-50/70 via-blue-50/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                {tillLocked ? "Counter Till #02 Locked" : "Counter Till #02 Active"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                Staff ID: EMP-FIN-309
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                AY 2025–26 &bull; Term II (Even)
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Ledger In Sync
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#3D405B] tracking-tight">
                Welcome back, Mr. Rajesh Kumar! 💳
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Chief Accountant &amp; Bursar Cashier &bull; Accounts Directorate, Admin Block
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <Link
              href="/accountant/record-payment"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Fee Payment</span>
            </Link>
            <Link
              href="/accountant/receipts"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all"
            >
              <Receipt className="w-4 h-4 text-slate-500" />
              <span>Receipts Register</span>
            </Link>
            <Link
              href="/accountant/pending-dues"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-xl border border-amber-200/80 shadow-2xs transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Pending Dues (342)</span>
            </Link>
            <button
              onClick={() => setIsTillLockModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#3D405B] hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Till Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Financial KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Today's Collection */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Today&apos;s Collection</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              ₹3,85,000
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-bold">+14.2%</span>
              <span>vs yesterday</span>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>24 Transactions</span>
            <span className="text-emerald-600 font-semibold">100% Verified</span>
          </div>
        </div>

        {/* Card 2: Month Realized */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Month Realized (Mar)</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              ₹48.60 L
            </div>
            <div className="text-xs text-slate-500 mt-1">Target: ₹55.00 Lakhs</div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Progress: 88.4%</span>
            <span className="text-blue-600 font-semibold">On Track</span>
          </div>
        </div>

        {/* Card 3: Annual Intake */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Annual Gross Intake</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              ₹4.18 Cr
            </div>
            <div className="text-xs text-slate-500 mt-1">Total Billed: ₹4.65 Cr</div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Realized: 90.0%</span>
            <span className="text-purple-600 font-semibold">AY 2025–26</span>
          </div>
        </div>

        {/* Card 4: Outstanding Dues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Outstanding Dues</span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-rose-600 tracking-tight font-mono">
              ₹46.50 L
            </div>
            <div className="text-xs text-rose-700 mt-1">342 Defaulter Accounts</div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Admit Card Holds</span>
            <span className="text-rose-600 font-semibold">82 Students</span>
          </div>
        </div>

        {/* Card 5: Receipts Issued */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Receipts Issued</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              1,842
            </div>
            <div className="text-xs text-slate-500 mt-1">Reversals: 0 Nil</div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Ledger Audit</span>
            <span className="text-emerald-600 font-semibold">100% In Sync</span>
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Left (8 Cols) / Right (4 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Monthly Trajectory Chart */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#3D405B]">
                  Monthly Fee Intake: Target vs. Actual Realized
                </h2>
                <p className="text-xs text-slate-500">Academic Year 2024-25 &bull; Figures in Lakhs (INR)</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-blue-600 rounded-xs"></span>
                  <span className="text-slate-800 font-semibold">Actual Realized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-slate-200 rounded-xs"></span>
                  <span className="text-slate-500 font-medium">Billed Target</span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-56 pt-2">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 680 200">
                {/* Horizontal Grid lines */}
                <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="660" y1="20" y2="20" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="24">₹90L</text>
                <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="660" y1="65" y2="65" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="69">₹60L</text>
                <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="660" y1="110" y2="110" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="114">₹30L</text>
                <line stroke="#e2e8f0" strokeWidth="1" x1="40" x2="660" y1="155" y2="155" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="159">₹0</text>

                {/* OCT */}
                <rect fill="#e2e8f0" height="54" width="24" x="72" y="101" rx="4" />
                <rect fill="#3b82f6" height="49" width="24" x="100" y="106" rx="4" />
                <text fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" x="98" y="176">OCT &apos;24</text>
                <text fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle" x="112" y="99">₹32L</text>

                {/* NOV */}
                <rect fill="#e2e8f0" height="62" width="24" x="172" y="93" rx="4" />
                <rect fill="#3b82f6" height="58" width="24" x="200" y="97" rx="4" />
                <text fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" x="198" y="176">NOV &apos;24</text>
                <text fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle" x="212" y="91">₹38L</text>

                {/* DEC */}
                <rect fill="#e2e8f0" height="46" width="24" x="272" y="109" rx="4" />
                <rect fill="#3b82f6" height="43" width="24" x="300" y="112" rx="4" />
                <text fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" x="298" y="176">DEC &apos;24</text>
                <text fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle" x="312" y="106">₹28L</text>

                {/* JAN (Peak) */}
                <rect fill="#e2e8f0" height="124" width="24" x="372" y="31" rx="4" />
                <rect fill="#2563eb" height="129" width="24" x="400" y="26" rx="4" />
                <text fill="#1e293b" fontSize="11" fontWeight="700" textAnchor="middle" x="398" y="176">JAN &apos;25</text>
                <text fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle" x="412" y="20">₹84L</text>

                {/* FEB */}
                <rect fill="#e2e8f0" height="62" width="24" x="472" y="93" rx="4" />
                <rect fill="#3b82f6" height="65" width="24" x="500" y="90" rx="4" />
                <text fill="#64748b" fontSize="11" fontWeight="600" textAnchor="middle" x="498" y="176">FEB &apos;25</text>
                <text fill="#3b82f6" fontSize="10" fontWeight="bold" textAnchor="middle" x="512" y="84">₹42L</text>

                {/* MAR (Live) */}
                <rect fill="#eff6ff" height="100" width="64" x="568" y="60" rx="8" />
                <rect fill="#e2e8f0" height="85" width="24" x="572" y="70" rx="4" />
                <rect fill="#2563eb" height="75" width="24" x="600" y="80" rx="4" />
                <text fill="#2563eb" fontSize="11" fontWeight="700" textAnchor="middle" x="598" y="176">MAR (Live)</text>
                <text fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle" x="612" y="74">₹48.6L</text>
              </svg>
            </div>
          </div>

          {/* Fee Transactions Register */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-[#3D405B]">
                  Recent Fee Transactions &amp; Receipts
                </h3>
                <p className="text-xs text-slate-500">
                  Live audit trail of verified vouchers for Counter Till #02
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Search Bar */}
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search student, receipt, roll..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-amber-600 w-full sm:w-56 transition-colors"
                  />
                </div>

                {/* Status Dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-9 px-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-amber-600"
                >
                  <option value="ALL">All Status</option>
                  <option value="Cleared">Cleared</option>
                  <option value="In Clearing">In Clearing</option>
                  <option value="Reconciled">Reconciled</option>
                </select>

                {/* CSV Export Button */}
                <button
                  onClick={handleExportCSV}
                  className="h-9 inline-flex items-center gap-1.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  title="Export filtered records as CSV"
                >
                  <Download className="h-3.5 w-3.5 text-slate-600" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Quick Filter Channel Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(["ALL", "UPI", "Cash", "Cheque", "Bank Transfer", "Card"] as const).map(
                (mode) => {
                  const count = modeCounts[mode] || 0;
                  const isActive = modeFilter.toLowerCase() === mode.toLowerCase();
                  return (
                    <button
                      key={mode}
                      onClick={() => setModeFilter(mode)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? "bg-amber-600 text-white shadow-xs"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-slate-200"
                      }`}
                    >
                      <span>{mode}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive
                            ? "bg-white/25 text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200/80">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="py-3 px-4 font-bold">Receipt #</th>
                    <th className="py-3 px-4 font-bold">Student Name</th>
                    <th className="py-3 px-4 font-bold">Roll</th>
                    <th className="py-3 px-4 font-bold">Course</th>
                    <th className="py-3 px-4 text-right font-bold">Amount</th>
                    <th className="py-3 px-4 font-bold">Mode</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 text-right font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3 px-4 font-semibold text-blue-600 font-mono">
                        {t.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#3D405B]">
                        {t.studentName}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                        {t.roll}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{t.course}</td>
                      <td className="py-3 px-4 text-right font-bold text-[#3D405B] font-mono">
                        ₹{t.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-700">
                          {t.mode}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
                            t.status === "Cleared"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : t.status === "In Clearing"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              t.status === "Cleared"
                                ? "bg-emerald-600"
                                : t.status === "In Clearing"
                                ? "bg-amber-600 animate-pulse"
                                : "bg-blue-600"
                            }`}
                          ></span>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedReceipt(t)}
                          className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          View Voucher
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="py-10 text-center text-slate-400 font-medium"
                      >
                        No transactions matching search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing {filteredTransactions.length} of {transactions.length} records
              </span>
              <span className="font-semibold text-slate-700">
                Counter Till #02 Active
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Payment Mode Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-[#3D405B]">
                Payment Channels (March)
              </h3>
              <span className="text-xs text-slate-500 font-medium">MTD Realized</span>
            </div>

            <div className="w-full h-3 bg-slate-100 flex overflow-hidden rounded-full">
              <div
                className="bg-blue-600 h-full"
                style={{ width: "42%" }}
                title="UPI: 42%"
              ></div>
              <div
                className="bg-indigo-500 h-full"
                style={{ width: "28%" }}
                title="Bank: 28%"
              ></div>
              <div
                className="bg-emerald-500 h-full"
                style={{ width: "15%" }}
                title="Cash: 15%"
              ></div>
              <div
                className="bg-purple-500 h-full"
                style={{ width: "10%" }}
                title="Card: 10%"
              ></div>
              <div
                className="bg-slate-400 h-full"
                style={{ width: "5%" }}
                title="Cheque: 5%"
              ></div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-slate-700 font-medium">UPI (QR / VPA)</span>
                </div>
                <span className="font-bold text-[#3D405B] font-mono">
                  42% (₹20.41L)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-slate-700 font-medium">
                    Direct Bank Wire (NEFT)
                  </span>
                </div>
                <span className="font-bold text-[#3D405B] font-mono">
                  28% (₹13.60L)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-700 font-medium">
                    Counter Physical Cash
                  </span>
                </div>
                <span className="font-bold text-[#3D405B] font-mono">
                  15% (₹7.29L)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <span className="text-slate-700 font-medium">
                    POS Debit / Credit Card
                  </span>
                </div>
                <span className="font-bold text-[#3D405B] font-mono">
                  10% (₹4.86L)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  <span className="text-slate-700 font-medium">
                    Cheque / Demand Draft
                  </span>
                </div>
                <span className="font-bold text-[#3D405B] font-mono">
                  5% (₹2.43L)
                </span>
              </div>
            </div>
          </div>

          {/* Exam Clearance Holds */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-[#3D405B]">
                  Exam Clearance Holds
                </h3>
                <p className="text-xs text-slate-500">Pending fee clearance</p>
              </div>
              <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-full border border-rose-200">
                82 Students
              </span>
            </div>

            <div className="space-y-3">
              {defaultersList.map((d) => (
                <div
                  key={d.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#3D405B] text-xs">
                      {d.name}
                    </span>
                    <span className="font-bold text-rose-600 font-mono text-xs">
                      ₹{d.dueAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>
                      {d.course} &bull; {d.roll}
                    </span>
                    <span className="text-rose-600 font-semibold">
                      Due {d.dueDate}
                    </span>
                  </div>
                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200/60">
                    <button
                      onClick={() => setSmsModalDefaulter(d)}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send SMS</span>
                    </button>
                    <span className="text-slate-300">&bull;</span>
                    <button
                      onClick={() => setChallanModalDefaulter(d)}
                      className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-semibold cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>Challan</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/accountant/pending-dues"
              className="block text-center text-xs font-semibold text-amber-700 hover:text-amber-800 pt-1"
            >
              View All 342 Defaulters &rarr;
            </Link>
          </div>

          {/* Daily Cash Till Reconciliation Panel */}
          <div className="bg-[#3D405B] text-white rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-600">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold">Counter Till #02 Audit</h3>
              </div>
              <span
                className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  tillLocked
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                }`}
              >
                {tillLocked ? "Till Locked" : "Counter Active"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Opening Float</span>
                <span className="text-base font-bold font-mono">₹25,000</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Cash Intake</span>
                <span className="text-base font-bold font-mono text-emerald-400">
                  ₹1,17,500
                </span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Denomination Count:</span>
                <span className="text-emerald-400 font-semibold">100% Verified</span>
              </div>
              <div className="text-[11px] text-slate-300 font-mono">
                ₹500 x 270 (₹1,35,000) &bull; ₹200 x 30 (₹6,000) &bull; ₹100 x 15 (₹1,500)
              </div>
              <div className="pt-2 border-t border-slate-700 flex justify-between font-bold">
                <span>Total Cash in Till:</span>
                <span className="text-emerald-400 font-mono text-sm">₹1,42,500</span>
              </div>
            </div>

            <button
              onClick={() => setIsTillLockModalOpen(true)}
              disabled={tillLocked}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>
                {tillLocked
                  ? "Till Locked for Today"
                  : "Lock Counter & Print Day-End Scroll"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: View Receipt Thermal Voucher Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">
                    Fee Receipt Voucher
                  </h3>
                  <span className="text-xs text-blue-600 font-mono font-semibold">
                    {selectedReceipt.id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Voucher Body (Thermal Stylized) */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 text-xs space-y-3.5">
              <div className="text-center border-b border-slate-200 pb-2.5">
                <div className="text-sm font-bold text-[#3D405B] tracking-tight">
                  Apex Institute of Technology &amp; Management
                </div>
                <div className="text-slate-500 text-[11px] font-medium">
                  Central Accounts &amp; Bursar Directorate &bull; Official Voucher
                </div>
                <div className="text-slate-400 text-[10px] font-mono mt-0.5">
                  GSTIN: 07AAAAA0000A1Z5 &bull; Till Counter #02
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Student Name:
                  </span>
                  <span className="font-bold text-[#3D405B]">
                    {selectedReceipt.studentName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Roll Number:
                  </span>
                  <span className="font-bold text-blue-600 font-mono">
                    {selectedReceipt.roll}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Program &amp; Term:
                  </span>
                  <span className="text-slate-700 font-semibold">
                    {selectedReceipt.course}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Timestamp:
                  </span>
                  <span className="text-slate-700 font-mono">
                    {selectedReceipt.timestamp}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Payment Mode:
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedReceipt.mode}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Transaction Ref:
                  </span>
                  <span className="text-slate-700 font-mono text-[11px] truncate block">
                    {selectedReceipt.reference}
                  </span>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Tuition &amp; Academic Fee:</span>
                  <span className="font-mono">
                    ₹{(selectedReceipt.amount * 0.75).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Laboratory &amp; Library Development:</span>
                  <span className="font-mono">
                    ₹{(selectedReceipt.amount * 0.15).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Student Activity &amp; Exam Cess:</span>
                  <span className="font-mono">
                    ₹{(selectedReceipt.amount * 0.1).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
                  <span className="text-[#3D405B]">Total Realized:</span>
                  <span className="text-emerald-700 font-mono">
                    ₹{selectedReceipt.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Verification Stamp */}
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-[11px]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Digitally Reconciled by Bursar Cashier</span>
                </div>
                <span className="font-mono font-bold text-[10px]">VERIFIED</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleDownloadReceipt(selectedReceipt)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Slip</span>
              </button>
              <button
                onClick={() => handlePrintReceipt(selectedReceipt)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Lock Till Modal */}
      {isTillLockModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Confirm Counter Till Lock &amp; Audit
                </h3>
              </div>
              <button
                onClick={() => setIsTillLockModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to lock <strong>Counter Till #02</strong>? This will generate the formal Day-End Cashier Handover Scroll for supervisor vault transfer.
            </p>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Opening Float:</span>
                <span className="font-bold text-[#3D405B] font-mono">₹25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Cash Counted in Till:</span>
                <span className="font-bold text-emerald-700 font-mono">₹1,42,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Digital Intakes (UPI/Card/NEFT):</span>
                <span className="font-bold text-blue-600 font-mono">₹2,42,500</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold">
                <span className="text-[#3D405B]">Total Realized Day Collection:</span>
                <span className="text-amber-700 font-mono">₹3,85,000</span>
              </div>
              <div className="pt-1 flex justify-between text-[11px] text-slate-500">
                <span>Supervisor on Duty:</span>
                <span className="font-semibold text-slate-800">
                  Mr. V. Sundaram (Sr. Auditor)
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsTillLockModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLockTill}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm Lock &amp; Print Scroll</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Send SMS Modal */}
      {smsModalDefaulter && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Send Fee Clearance Alert
                </h3>
              </div>
              <button
                onClick={() => setSmsModalDefaulter(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-bold text-[#3D405B]">
                  {smsModalDefaulter.name} ({smsModalDefaulter.roll})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-mono text-slate-700">
                  {smsModalDefaulter.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pending Amount:</span>
                <span className="font-bold text-rose-600 font-mono">
                  ₹{smsModalDefaulter.dueAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80 text-xs text-blue-900 leading-relaxed">
              <span className="font-semibold block mb-1">SMS &amp; WhatsApp Message Preview:</span>
              &ldquo;Dear {smsModalDefaulter.name}, please clear your outstanding fee dues of INR ₹{smsModalDefaulter.dueAmount.toLocaleString("en-IN")} on or before {smsModalDefaulter.dueDate} to prevent hall ticket hold. — Apex Bursar Directorate&rdquo;
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSmsModalDefaulter(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast(
                    `SMS & WhatsApp alert dispatched to ${smsModalDefaulter.name} (${smsModalDefaulter.phone})`
                  );
                  setSmsModalDefaulter(null);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Alert</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Bank Challan Modal */}
      {challanModalDefaulter && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Bank Fee Challan (3-Fold)
                </h3>
              </div>
              <button
                onClick={() => setChallanModalDefaulter(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="font-bold text-[#3D405B]">
                  HDFC Bank &bull; Apex Fee Collection A/C #00291040082
                </span>
                <span className="font-mono text-xs font-bold text-amber-700">
                  {challanModalDefaulter.challanNo}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Student:</span>
                  <span className="font-semibold text-slate-800">
                    {challanModalDefaulter.name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Roll:</span>
                  <span className="font-mono font-semibold text-blue-600">
                    {challanModalDefaulter.roll}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Course:</span>
                  <span className="font-semibold text-slate-800">
                    {challanModalDefaulter.course}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Valid Till:</span>
                  <span className="font-semibold text-rose-600">
                    {challanModalDefaulter.dueDate}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
                <span>Challan Payable Amount:</span>
                <span className="text-rose-700 font-mono">
                  ₹{challanModalDefaulter.dueAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 italic">
                * Includes 3 counterfoils: Student Copy, Bank Copy, College Copy.
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setChallanModalDefaulter(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(
                    `Challan ${challanModalDefaulter.challanNo} printed and added to student dossier.`
                  );
                  setChallanModalDefaulter(null);
                  window.print();
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print 3-Fold Challan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
