"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  CreditCard,
  Building,
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
  FileSpreadsheet
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
  status: "Cleared" | "In Clearing" | "Reconciled";
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
    showToast(`Receipt voucher ${receipt.id} sent to counter printer!`);
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
    link.setAttribute("download", `fee_transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Transaction register exported as CSV!");
  };

  const handleLockTill = () => {
    setTillLocked(true);
    setIsTillLockModalOpen(false);
    showToast("Counter Till #02 locked! Day-End scroll generated.");
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-50/60 via-blue-50/30 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Counter Till #02 Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60">
                Staff ID: EMP-FIN-309
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                AY 2025–26
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back, Mr. Rajesh Kumar! 💳
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Chief Accountant &bull; Bursar Office (Main Administration Block)
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <Link
              href="/accountant/record-payment"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Record Fee Payment</span>
            </Link>
            <Link
              href="/accountant/receipts"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <Receipt className="w-4 h-4 text-slate-500" />
              <span>Receipts Register</span>
            </Link>
            <Link
              href="/accountant/pending-dues"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-amber-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Pending Dues (342)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5 Financial KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Today's Collection */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Today's Collection</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">₹3,85,000</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-semibold">+14.2%</span>
              <span>vs yesterday</span>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>24 Transactions</span>
            <span className="text-emerald-600 font-medium">Verified</span>
          </div>
        </div>

        {/* Card 2: Monthly Collection */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Month Realized (Mar)</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">₹48.60 L</div>
            <div className="text-xs text-slate-500 mt-1">Target: ₹55.00 Lakhs</div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Progress: 88.4%</span>
            <span className="text-blue-600 font-medium">On Track</span>
          </div>
        </div>

        {/* Card 3: Year Billed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Annual Gross Intake</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">₹4.18 Cr</div>
            <div className="text-xs text-slate-500 mt-1">Total Billed: ₹4.65 Cr</div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Realized: 90.0%</span>
            <span className="text-purple-600 font-medium">AY 2025–26</span>
          </div>
        </div>

        {/* Card 4: Outstanding Dues */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Outstanding Dues</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-amber-600 tracking-tight font-mono">₹46.50 L</div>
            <div className="text-xs text-amber-700 mt-1">342 Defaulter Accounts</div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Admit Card Holds</span>
            <span className="text-amber-700 font-medium">82 Students</span>
          </div>
        </div>

        {/* Card 5: Receipts Issued */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Receipts Issued</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">1,842</div>
            <div className="text-xs text-slate-500 mt-1">Reversals: 0 Nil</div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Ledger Audit</span>
            <span className="text-emerald-600 font-medium">100% In Sync</span>
          </div>
        </div>
      </div>

      {/* Two-Column Layout: Left (8 Cols) / Right (4 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Monthly Trajectory Chart */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Monthly Fee Intake: Target vs. Actual
                </h2>
                <p className="text-xs text-slate-500">Figures in Lakhs (INR)</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-blue-600 rounded-sm"></span>
                  <span className="text-slate-800 font-medium">Actual Realized</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-slate-200 rounded-sm"></span>
                  <span className="text-slate-500">Billed Target</span>
                </div>
              </div>
            </div>

            <div className="relative w-full h-64 pt-4">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 680 220">
                {/* Grid lines */}
                <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="660" y1="20" y2="20" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="24">₹90L</text>
                <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="660" y1="70" y2="70" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="74">₹60L</text>
                <line stroke="#f1f5f9" strokeDasharray="3 3" strokeWidth="1" x1="40" x2="660" y1="120" y2="120" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="124">₹30L</text>
                <line stroke="#e2e8f0" strokeWidth="1" x1="40" x2="660" y1="170" y2="170" />
                <text fill="#94a3b8" fontSize="10" textAnchor="end" x="32" y="174">₹0</text>

                {/* OCT */}
                <rect fill="#e2e8f0" height="59" width="28" x="70" y="111" rx="4" />
                <rect fill="#3b82f6" height="54" width="28" x="100" y="116" rx="4" />
                <text fill="#64748b" fontSize="11" fontWeight="500" textAnchor="middle" x="99" y="190">OCT &apos;24</text>
                <text fill="#3b82f6" fontSize="10" fontWeight="600" textAnchor="middle" x="114" y="110">₹32L</text>

                {/* NOV */}
                <rect fill="#e2e8f0" height="67" width="28" x="170" y="103" rx="4" />
                <rect fill="#3b82f6" height="64" width="28" x="200" y="106" rx="4" />
                <text fill="#64748b" fontSize="11" fontWeight="500" textAnchor="middle" x="199" y="190">NOV &apos;24</text>
                <text fill="#3b82f6" fontSize="10" fontWeight="600" textAnchor="middle" x="214" y="100">₹38L</text>

                {/* DEC */}
                <rect fill="#e2e8f0" height="50" width="28" x="270" y="120" rx="4" />
                <rect fill="#3b82f6" height="47" width="28" x="300" y="123" rx="4" />
                <text fill="#64748b" fontSize="11" fontWeight="500" textAnchor="middle" x="299" y="190">DEC &apos;24</text>
                <text fill="#3b82f6" fontSize="10" fontWeight="600" textAnchor="middle" x="314" y="117">₹28L</text>

                {/* JAN (Peak) */}
                <rect fill="#e2e8f0" height="134" width="28" x="370" y="36" rx="4" />
                <rect fill="#2563eb" height="140" width="28" x="400" y="30" rx="4" />
                <text fill="#1e293b" fontSize="11" fontWeight="700" textAnchor="middle" x="399" y="190">JAN &apos;25</text>
                <text fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle" x="414" y="24">₹84L</text>

                {/* FEB */}
                <rect fill="#e2e8f0" height="67" width="28" x="470" y="103" rx="4" />
                <rect fill="#3b82f6" height="70" width="28" x="500" y="100" rx="4" />
                <text fill="#64748b" fontSize="11" fontWeight="500" textAnchor="middle" x="499" y="190">FEB &apos;25</text>
                <text fill="#3b82f6" fontSize="10" fontWeight="600" textAnchor="middle" x="514" y="94">₹42L</text>

                {/* MAR (Live) */}
                <rect fill="#eff6ff" height="110" width="68" x="566" y="66" rx="8" />
                <rect fill="#e2e8f0" height="92" width="28" x="570" y="78" rx="4" />
                <rect fill="#2563eb" height="81" width="28" x="600" y="89" rx="4" />
                <text fill="#2563eb" fontSize="11" fontWeight="700" textAnchor="middle" x="599" y="190">MAR (Live)</text>
                <text fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle" x="614" y="83">₹48.6L</text>
              </svg>
            </div>
          </div>

          {/* Fee Transactions Register */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Recent Fee Transactions &amp; Receipts
                </h3>
                <p className="text-xs text-slate-500">Audit trail of verified student vouchers</p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search student, receipt, roll..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 w-56"
                  />
                </div>

                <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {["ALL", "UPI", "Cash", "Cheque", "Bank Transfer", "Card"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setModeFilter(mode)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                        modeFilter.toLowerCase() === mode.toLowerCase()
                          ? "bg-emerald-600 text-white shadow-xs font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleExportCSV}
                  className="h-9 inline-flex items-center gap-1.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-100">
                    <th className="py-3 px-4 font-semibold">Receipt #</th>
                    <th className="py-3 px-4 font-semibold">Student Name</th>
                    <th className="py-3 px-4 font-semibold">Roll</th>
                    <th className="py-3 px-4 font-semibold">Course</th>
                    <th className="py-3 px-4 text-right font-semibold">Amount</th>
                    <th className="py-3 px-4 font-semibold">Mode</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-semibold text-blue-600 font-mono">{t.id}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{t.studentName}</td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{t.roll}</td>
                      <td className="py-3 px-4 text-slate-600">{t.course}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">
                        ₹{t.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700">
                          {t.mode}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${
                            t.status === "Cleared"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedReceipt(t)}
                          className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No transactions matching search filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredTransactions.length} of {transactions.length} records</span>
              <span className="font-medium text-slate-700">Counter Till #02 Active</span>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Payment Mode Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Payment Channels (March)</h3>
              <span className="text-xs text-slate-500">MTD Realized</span>
            </div>

            <div className="w-full h-3 bg-slate-100 flex overflow-hidden rounded-full">
              <div className="bg-blue-600 h-full" style={{ width: "42%" }} title="UPI: 42%"></div>
              <div className="bg-indigo-500 h-full" style={{ width: "28%" }} title="Bank: 28%"></div>
              <div className="bg-emerald-500 h-full" style={{ width: "15%" }} title="Cash: 15%"></div>
              <div className="bg-purple-500 h-full" style={{ width: "10%" }} title="Card: 10%"></div>
              <div className="bg-slate-400 h-full" style={{ width: "5%" }} title="Cheque: 5%"></div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <span className="text-slate-700">UPI (QR / VPA)</span>
                </div>
                <span className="font-semibold text-slate-900">42% (₹20.41L)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-slate-700">Direct Bank Wire (NEFT)</span>
                </div>
                <span className="font-semibold text-slate-900">28% (₹13.60L)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-700">Counter Physical Cash</span>
                </div>
                <span className="font-semibold text-slate-900">15% (₹7.29L)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <span className="text-slate-700">POS Debit / Credit Card</span>
                </div>
                <span className="font-semibold text-slate-900">10% (₹4.86L)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  <span className="text-slate-700">Cheque / Demand Draft</span>
                </div>
                <span className="font-semibold text-slate-900">5% (₹2.43L)</span>
              </div>
            </div>
          </div>

          {/* Exam Clearance Holds */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Exam Clearance Holds</h3>
                <p className="text-xs text-slate-500">Pending fee clearance</p>
              </div>
              <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-full border border-rose-200">
                82 Students
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-xs">Rohan Verma</span>
                  <span className="font-bold text-rose-600 font-mono text-xs">₹45,000</span>
                </div>
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>B.Tech CS-IV (Roll: 078)</span>
                  <span className="text-rose-600 font-medium">Due Mar 30</span>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast("SMS reminder sent to Rohan Verma!")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Send SMS Reminder
                  </button>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900 text-xs">Sneha Kulkarni</span>
                  <span className="font-bold text-amber-600 font-mono text-xs">₹35,000</span>
                </div>
                <div className="text-xs text-slate-500 flex justify-between">
                  <span>B.Tech CS-IV (Roll: 055)</span>
                  <span className="text-amber-600 font-medium">Due Apr 05</span>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showToast("Challan copy dispatched to student dossier.")}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Generate Challan
                  </button>
                </div>
              </div>
            </div>

            <Link
              href="/accountant/pending-dues"
              className="block text-center text-xs font-semibold text-blue-600 hover:text-blue-700 pt-1"
            >
              View All 342 Defaulters &rarr;
            </Link>
          </div>

          {/* Daily Cash Till Reconciliation Panel */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold">Counter Till #02 Audit</h3>
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {tillLocked ? "Locked" : "Active"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Opening Float</span>
                <span className="text-base font-bold font-mono">₹25,000</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Cash Intake</span>
                <span className="text-base font-bold font-mono text-emerald-400">₹1,17,500</span>
              </div>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Denomination Count:</span>
                <span className="text-emerald-400 font-medium">100% Verified</span>
              </div>
              <div className="text-[11px] text-slate-300">
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
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {tillLocked ? "Till Locked for Today" : "Lock Counter & Print Day-End Scroll"}
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: View Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Fee Receipt Voucher</h3>
                  <span className="text-xs text-blue-600 font-mono font-semibold">{selectedReceipt.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-3">
              <div className="text-center border-b border-slate-200 pb-2">
                <div className="text-sm font-bold text-slate-900">Apex Institute of Technology</div>
                <div className="text-slate-500 text-[11px]">Accounts Directorate &bull; Official Receipt</div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Student Name:</span>
                  <span className="font-semibold text-slate-900">{selectedReceipt.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Roll Number:</span>
                  <span className="font-semibold text-blue-600 font-mono">{selectedReceipt.roll}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Course:</span>
                  <span className="text-slate-700">{selectedReceipt.course}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Timestamp:</span>
                  <span className="text-slate-700">{selectedReceipt.timestamp}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Payment Mode:</span>
                  <span className="font-semibold text-slate-900">{selectedReceipt.mode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Reference:</span>
                  <span className="text-slate-700 font-mono text-[11px]">{selectedReceipt.reference}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-900">Total Amount:</span>
                <span className="text-xl font-bold font-mono text-emerald-600">
                  ₹{selectedReceipt.amount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handlePrintReceipt(selectedReceipt);
                  setSelectedReceipt(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Lock Till Modal */}
      {isTillLockModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">Confirm Counter Till Lock</h3>
              </div>
              <button
                onClick={() => setIsTillLockModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to lock <strong>Counter Till #02</strong>? This will generate the formal Day-End Cashier Scroll (Physical Cash: ₹1,42,500) for vault supervisor handover.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Cash Counted:</span>
                <span className="font-bold text-slate-900 font-mono">₹1,42,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Supervisor on Duty:</span>
                <span className="font-semibold text-slate-700">Mr. V. Sundaram (Sr. Auditor)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsTillLockModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLockTill}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm Lock &amp; Print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
