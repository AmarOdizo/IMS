"use client";

import { useState } from "react";
import {
  CreditCard,
  Receipt,
  Download,
  Search,
  Filter,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Building,
  Smartphone,
  Landmark,
  X,
  Printer,
  MessageSquare,
  FileSpreadsheet,
  Check,
  ChevronRight,
  ExternalLink,
  Plus,
  Coins,
  TrendingUp,
  FileText,
  Calendar,
  Send,
  ArrowUpRight,
  ShieldCheck,
  SlidersHorizontal
} from "lucide-react";

interface FeeTransaction {
  id: string;
  receiptNo: string;
  date: string;
  time: string;
  studentName: string;
  rollId: string;
  course: string;
  batch: string;
  feeHead: string;
  amount: number;
  mode: string;
  modeType: "upi" | "cash" | "cheque" | "card" | "neft";
  collector: string;
  status: "Cleared" | "Pending Bank Clearance";
}

const INITIAL_TRANSACTIONS: FeeTransaction[] = [
  {
    id: "tx-1",
    receiptNo: "REC-2026-1049",
    date: "17 Nov 2026",
    time: "14:28",
    studentName: "Aarav Sharma",
    rollId: "APX-CS-2024-001",
    course: "B.Tech Computer Science",
    batch: "Batch 2024-28 • Sec-B",
    feeHead: "Sem 3 Tuition Fee",
    amount: 42500,
    mode: "UPI (UTR-8491)",
    modeType: "upi",
    collector: "R. Hendricks (Desk-01)",
    status: "Cleared"
  },
  {
    id: "tx-2",
    receiptNo: "REC-2026-1048",
    date: "17 Nov 2026",
    time: "13:50",
    studentName: "Priya S. Nambiar",
    rollId: "APX-MGT-2025-018",
    course: "MBA Executive Strategy",
    batch: "Batch 2025-27 • Div-A",
    feeHead: "Lab & Digital Library",
    amount: 11000,
    mode: "Counter Cash",
    modeType: "cash",
    collector: "Dr. Margaret Vance",
    status: "Cleared"
  },
  {
    id: "tx-3",
    receiptNo: "REC-2026-1047",
    date: "17 Nov 2026",
    time: "11:15",
    studentName: "Devon Lee Sharma",
    rollId: "APX-ENG-2023-304",
    course: "B.Tech Mechanical Robotics",
    batch: "Batch 2023-27 • Sec-C",
    feeHead: "Semester 5 Tuition",
    amount: 58000,
    mode: "Cheque #492811",
    modeType: "cheque",
    collector: "R. Hendricks (Desk-01)",
    status: "Pending Bank Clearance"
  },
  {
    id: "tx-4",
    receiptNo: "REC-2026-1046",
    date: "17 Nov 2026",
    time: "09:40",
    studentName: "Kavita R. Nair",
    rollId: "APX-DES-2024-012",
    course: "B.Des Interaction Architecture",
    batch: "Batch 2024-28 • Div-A",
    feeHead: "Examination & Studio",
    amount: 6500,
    mode: "POS Terminal #04",
    modeType: "card",
    collector: "S. Jenkins (Bursar Aux)",
    status: "Cleared"
  },
  {
    id: "tx-5",
    receiptNo: "REC-2026-1045",
    date: "16 Nov 2026",
    time: "16:45",
    studentName: "Rohan Verma",
    rollId: "APX-ENG-2024-149",
    course: "B.Tech Civil Engineering",
    batch: "Batch 2024-28 • Sec-A",
    feeHead: "Sem 3 Tuition",
    amount: 24000,
    mode: "NEFT / RTGS Transfer",
    modeType: "neft",
    collector: "R. Hendricks (Desk-01)",
    status: "Cleared"
  },
  {
    id: "tx-6",
    receiptNo: "REC-2026-1044",
    date: "16 Nov 2026",
    time: "14:10",
    studentName: "Devina Mukherjee",
    rollId: "APX-CS-2023-002",
    course: "B.Tech Computer Science",
    batch: "Batch 2023-27 • Sec-A",
    feeHead: "Sem 5 Tuition & Exam",
    amount: 43500,
    mode: "UPI (UTR-9912)",
    modeType: "upi",
    collector: "R. Hendricks (Desk-01)",
    status: "Cleared"
  },
  {
    id: "tx-7",
    receiptNo: "REC-2026-1043",
    date: "15 Nov 2026",
    time: "11:30",
    studentName: "Kiran Kumar",
    rollId: "APX-CS-2023-004",
    course: "B.Tech Computer Science",
    batch: "Batch 2023-27 • Sec-A",
    feeHead: "Sports Levy & Hostel",
    amount: 18500,
    mode: "Cheque #881290",
    modeType: "cheque",
    collector: "M. Vance (Dean Bursar)",
    status: "Pending Bank Clearance"
  }
];

export default function FeesManagementPage() {
  const [transactions, setTransactions] = useState<FeeTransaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<"all" | "defaulters" | "schedule" | "reconcile">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<FeeTransaction | null>(null);

  // Drawer Payment Form State
  const [drawerMode, setDrawerMode] = useState<"cash" | "upi" | "card" | "neft" | "cheque">("cash");
  const [selectedHeads, setSelectedHeads] = useState<{ [key: string]: boolean }>({
    tuition: true,
    lab: true,
    exam: true
  });
  const [discount, setDiscount] = useState(0);
  const [fine, setFine] = useState(0);
  const [autoOpenReceipt, setAutoOpenReceipt] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const headPrices = {
    tuition: 38000,
    lab: 3500,
    exam: 1000
  };

  const calculateTotal = () => {
    let sub = 0;
    if (selectedHeads.tuition) sub += headPrices.tuition;
    if (selectedHeads.lab) sub += headPrices.lab;
    if (selectedHeads.exam) sub += headPrices.exam;
    return Math.max(0, sub - discount + fine);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleCommitPayment = () => {
    const netAmount = calculateTotal();
    const newTx: FeeTransaction = {
      id: `tx-${Date.now()}`,
      receiptNo: `REC-2026-${1050 + transactions.length}`,
      date: "17 Nov 2026",
      time: "15:02",
      studentName: "Aarav Sharma",
      rollId: "APX-CS-2024-001",
      course: "B.Tech Computer Science",
      batch: "Batch 2024-28 • Sec-B",
      feeHead: "Sem 3 Tuition & Labs",
      amount: netAmount,
      mode: drawerMode.toUpperCase(),
      modeType: drawerMode,
      collector: "R. Hendricks (Desk-01)",
      status: "Cleared"
    };

    setTransactions([newTx, ...transactions]);
    setIsDrawerOpen(false);
    showToast(`Payment recorded to fiscal ledger. Voucher #${newTx.receiptNo}`);

    if (autoOpenReceipt) {
      setTimeout(() => {
        setActiveReceipt(newTx);
        setIsReceiptModalOpen(true);
      }, 400);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "defaulters") {
      if (tx.status !== "Pending Bank Clearance") return false;
    }
    if (modeFilter !== "all" && tx.modeType !== modeFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tx.receiptNo.toLowerCase().includes(q) ||
        tx.studentName.toLowerCase().includes(q) ||
        tx.rollId.toLowerCase().includes(q) ||
        tx.course.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        {/* Header Hero Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Fees &amp; Fiscal Ledger</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Clearing Active
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Multi-head fee collection, statutory receipts, fee structures, and bank reconciliation ledger.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsStructureModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Fee Structures</span>
            </button>
            <button
              onClick={() => showToast("Consolidated Tally XML & Ledger Excel (.xlsx) prepared.")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Export Tally / CSV</span>
            </button>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Record Manual Payment</span>
            </button>
          </div>
        </div>

        {/* 4 Standard Redesigned KPI Cards in Indian Rupee (₹) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Projected Revenue */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Projected Revenue
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                ₹3,85,00,000
              </div>
              <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <span className="font-semibold text-slate-900">1,420</span>
                <span>candidates</span>
              </div>
            </div>
          </div>

          {/* Card 2: Collected To Date */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Collected
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                  ₹3,21,00,000
                </span>
                <span className="text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  83.4%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "83.4%" }} />
              </div>
            </div>
          </div>

          {/* Card 3: Overdue Outstanding */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Outstanding Overdue
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="flex items-baseline gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-rose-600 tabular-nums">
                  ₹64,00,000
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                  210 Due
                </span>
              </div>
              <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Past cutoff</span>
                <button
                  onClick={() => setActiveTab("defaulters")}
                  className="font-semibold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                >
                  Defaulters
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Today's Collection */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Today&apos;s Receipts
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                ₹1,42,000
              </div>
              <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="text-indigo-600 font-semibold">18 Slips</span>
                <span>Till #02</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger Console Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Subtabs & Search Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-medium overflow-x-auto max-w-full no-scrollbar">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Transactions (1,842)
              </button>
              <button
                onClick={() => {
                  setActiveTab("defaulters");
                  showToast("Filtered 210 overdue fee defaulters.");
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === "defaulters"
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Pending Dues / Defaulters (210)
              </button>
              <button
                onClick={() => {
                  setActiveTab("schedule");
                  showToast("Installment schedules loaded.");
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === "schedule"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Installment Schedule
              </button>
              <button
                onClick={() => {
                  setActiveTab("reconcile");
                  showToast("Bank Reconciliation matched: 99.4% cleared.");
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTab === "reconcile"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Bank Reconciliation
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
              {/* Mode filter dropdown */}
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="all">All Modes</option>
                <option value="upi">UPI Transfers</option>
                <option value="cash">Counter Cash</option>
                <option value="card">Card POS</option>
                <option value="neft">NEFT / RTGS</option>
                <option value="cheque">Cheque Deposit</option>
              </select>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Receipt, Roll ID, or student..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-xs min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  <th className="py-3 px-4">Receipt No</th>
                  <th className="py-3 px-4">Date &amp; Time</th>
                  <th className="py-3 px-4">Student Details</th>
                  <th className="py-3 px-4">Program &amp; Batch</th>
                  <th className="py-3 px-4">Fee Head</th>
                  <th className="py-3 px-4 text-right">Amount Paid</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4">Collector Staff</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Receipt No */}
                    <td className="py-3 px-4 font-mono font-bold text-indigo-700 whitespace-nowrap">
                      #{tx.receiptNo}
                    </td>

                    {/* Date & Time */}
                    <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                      <div>{tx.date}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{tx.time}</div>
                    </td>

                    {/* Student Info */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{tx.studentName}</div>
                      <div className="font-mono text-[11px] text-slate-500">{tx.rollId}</div>
                    </td>

                    {/* Course & Batch */}
                    <td className="py-3 px-4">
                      <div className="text-slate-800">{tx.course}</div>
                      <div className="text-[11px] text-slate-500">{tx.batch}</div>
                    </td>

                    {/* Fee Head */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {tx.feeHead}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-3 px-4 text-right font-bold text-slate-900 tabular-nums font-mono whitespace-nowrap">
                      ₹{tx.amount.toLocaleString("en-IN")}
                    </td>

                    {/* Mode */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {tx.modeType === "upi" && <Smartphone className="w-3 h-3 text-emerald-600" />}
                        {tx.modeType === "cash" && <Coins className="w-3 h-3 text-amber-600" />}
                        {tx.modeType === "card" && <CreditCard className="w-3 h-3 text-indigo-600" />}
                        {tx.modeType === "neft" && <Landmark className="w-3 h-3 text-blue-600" />}
                        {tx.modeType === "cheque" && <Receipt className="w-3 h-3 text-purple-600" />}
                        <span>{tx.mode}</span>
                      </span>
                    </td>

                    {/* Collector */}
                    <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {tx.collector}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                          tx.status === "Cleared"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {tx.status === "Cleared" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{tx.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => {
                            setActiveReceipt(tx);
                            setIsReceiptModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Print Receipt Slip"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            showToast(`Payment SMS alert dispatched to ${tx.studentName}.`)
                          }
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Send SMS Receipt"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-3">
              <span>Showing {filteredTransactions.length} of 1,842 audited transactions</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-semibold">Tally XML Synchronized</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer">
                Previous
              </button>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                1
              </span>
              <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DRAWER: Record Manual Payment Entry Slip */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white shadow-2xl border-l border-slate-200 h-full flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Record Counter Payment</h2>
                  <p className="text-xs text-slate-500">Counter Desk Terminal #01 • Treasury Slip</p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700">
              {/* Student Lookup */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  1. Student Identification
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    defaultValue="APX-CS-2024-001"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                {/* Populated Candidate Card */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Aarav Sharma</div>
                    <div className="text-slate-500 text-[11px]">B.Tech Computer Science • Batch 2024-28 (Sem 3)</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">Guardian: Sunil Sharma • +91 98112 44920</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                      Pending Dues
                    </span>
                    <div className="text-sm font-bold text-rose-600 mt-1">₹42,500.00</div>
                  </div>
                </div>
              </div>

              {/* Fee Head Allocation */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  2. Fee Heads &amp; Installments
                </label>
                <div className="space-y-1.5">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedHeads.tuition}
                        onChange={(e) =>
                          setSelectedHeads({ ...selectedHeads, tuition: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">Semester 3 Tuition Fee (Core)</div>
                        <div className="text-[11px] text-slate-500">Statutory syllabus fee</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">₹{headPrices.tuition.toLocaleString("en-IN")}</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedHeads.lab}
                        onChange={(e) =>
                          setSelectedHeads({ ...selectedHeads, lab: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">Advanced Computer Lab &amp; Cloud Sandbox</div>
                        <div className="text-[11px] text-slate-500">High performance computing allocation</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">₹{headPrices.lab.toLocaleString("en-IN")}</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedHeads.exam}
                        onChange={(e) =>
                          setSelectedHeads({ ...selectedHeads, exam: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">Mid-Term Examination &amp; Evaluation</div>
                        <div className="text-[11px] text-slate-500">Autonomous evaluation levy</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">₹{headPrices.exam.toLocaleString("en-IN")}</span>
                  </label>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  3. Payment Instrument Mode
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {(["cash", "upi", "card", "neft", "cheque"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDrawerMode(mode)}
                      className={`py-2 px-1 text-center rounded-xl font-semibold uppercase text-[11px] transition-all border cursor-pointer ${
                        drawerMode === mode
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Conditional Fields */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  {drawerMode === "cash" && (
                    <div className="flex items-center justify-between text-xs text-slate-700">
                      <span>Physical Cash Handover at Counter</span>
                      <span className="font-semibold text-indigo-600 font-mono">DRAWER: #01</span>
                    </div>
                  )}
                  {drawerMode === "upi" && (
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Bank UPI Reference / UTR Number
                      </label>
                      <input
                        type="text"
                        defaultValue="429188201948"
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  )}
                  {drawerMode === "card" && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          POS Slip Number
                        </label>
                        <input
                          type="text"
                          defaultValue="POS-TX-9901"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">
                          Card Last 4 Digits
                        </label>
                        <input
                          type="text"
                          maxLength={4}
                          defaultValue="4821"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-900"
                        />
                      </div>
                    </div>
                  )}
                  {drawerMode === "cheque" && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">Cheque No</label>
                        <input
                          type="text"
                          defaultValue="649281"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">Bank</label>
                        <input
                          type="text"
                          defaultValue="HDFC Bank"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-slate-500 mb-1">Date</label>
                        <input
                          type="date"
                          defaultValue="2026-11-17"
                          className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs"
                        />
                      </div>
                    </div>
                  )}
                  {drawerMode === "neft" && (
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        NEFT / RTGS Transfer Reference Number
                      </label>
                      <input
                        type="text"
                        defaultValue="CMS29481029471"
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold text-slate-900"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Adjustments: Discount & Late Fee in ₹ */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  4. Waivers &amp; Fine Charges (₹)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Merit Scholarship / Waiver (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Late Fine Surcharge (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={fine}
                      onChange={(e) => setFine(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-900"
                    />
                  </div>
                </div>

                {/* Total Summary Box */}
                <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="drawer-receipt-check"
                      checked={autoOpenReceipt}
                      onChange={(e) => setAutoOpenReceipt(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                    />
                    <label htmlFor="drawer-receipt-check" className="font-semibold text-indigo-900 cursor-pointer">
                      Instantly generate printable receipt
                    </label>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-indigo-700 font-semibold uppercase">Net Settled</div>
                    <div className="text-xl font-bold text-indigo-900 font-mono">
                      ₹{calculateTotal().toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-white">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="py-2 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCommitPayment}
                className="py-2 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Commit to Fiscal Ledger</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Official Receipt Preview */}
      {isReceiptModalOpen && activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2 text-indigo-700 font-semibold">
                <Receipt className="w-5 h-5 shrink-0" />
                <span>Official Fee Receipt Slip</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") window.print();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Receipt Body in Indian Rupee (₹) */}
            <div className="p-6 space-y-4 text-xs font-mono text-slate-700">
              {/* Institution Title */}
              <div className="text-center pb-3 border-b border-slate-200 space-y-1">
                <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                  APEX INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT
                </h3>
                <p className="text-[11px] text-slate-500">Central Campus • Bursar Financial Treasury</p>
                <div className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mt-1 border border-emerald-200">
                  Paid &amp; Cleared Voucher
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400">VOUCHER NO:</span>
                  <div className="font-bold text-slate-900">#{activeReceipt.receiptNo}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400">DATE &amp; TIME:</span>
                  <div className="font-bold text-slate-900">{activeReceipt.date} {activeReceipt.time}</div>
                </div>
                <div>
                  <span className="text-slate-400">STUDENT:</span>
                  <div className="font-bold text-slate-900">{activeReceipt.studentName}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400">ROLL NO:</span>
                  <div className="font-bold text-slate-900">{activeReceipt.rollId}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">COURSE / BATCH:</span>
                  <div className="font-bold text-slate-900">{activeReceipt.course} ({activeReceipt.batch})</div>
                </div>
              </div>

              {/* Breakdown Table */}
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-1">Fee Description</th>
                    <th className="py-1 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-1.5 font-medium text-slate-800">{activeReceipt.feeHead}</td>
                    <td className="py-1.5 text-right font-bold text-slate-900">
                      ₹{activeReceipt.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-900 font-bold text-slate-900">
                    <td className="pt-2 uppercase">Total Settled</td>
                    <td className="pt-2 text-right text-sm">
                      ₹{activeReceipt.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Footer Stamp */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <div>
                  <div className="text-slate-400">PAYMENT MODE:</div>
                  <div className="font-bold text-slate-900">{activeReceipt.mode}</div>
                  <div className="text-slate-400 mt-1">CASHIER:</div>
                  <div className="font-medium text-slate-800">{activeReceipt.collector}</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                  <div className="font-black tracking-widest text-[11px]">CLEARED</div>
                  <div className="text-[9px] text-emerald-600 mt-0.5">APEX TREASURY SEAL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Fee Structure Master Catalog in Indian Rupee (₹) */}
      {isStructureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Master Fee Structures</h3>
              </div>
              <button
                onClick={() => setIsStructureModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">B.Tech Engineering Programs</div>
                  <div className="text-slate-500 mt-0.5">8 Semesters • ₹38,000 Base Tuition / Sem + ₹4,500 Labs</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ACTIVE
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">MBA Master of Management</div>
                  <div className="text-slate-500 mt-0.5">4 Semesters • ₹52,000 Base Tuition / Sem + ₹3,000 Library</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ACTIVE
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">B.Des Interaction Design</div>
                  <div className="text-slate-500 mt-0.5">8 Semesters • ₹41,000 Base Tuition / Sem + ₹6,500 Studio</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ACTIVE
                </span>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsStructureModalOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
                >
                  Close Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
