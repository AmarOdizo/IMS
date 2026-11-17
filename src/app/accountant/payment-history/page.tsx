"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  History,
  Download,
  FileSpreadsheet,
  FileCode,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  X,
  CreditCard,
  Building2,
  Check,
  AlertCircle,
  Copy,
  Mail,
  ShieldCheck,
  QrCode,
  Calendar,
  Layers,
  ChevronRight,
  Coins,
  FileText,
  User,
  ExternalLink,
} from "lucide-react";

interface TransactionRecord {
  id: string;
  receiptNo: string;
  timestamp: string;
  date: string;
  studentName: string;
  rollNo: string;
  course: string;
  feeHeads: string;
  amount: number;
  tenderMode: "UPI" | "Cheque" | "Cash" | "NEFT" | "POS Card" | "RTGS";
  refNo: string;
  cashierTill: string;
  status: "Cleared" | "Clearing" | "Reconciled";
  details: {
    tuition: number;
    lab: number;
    exam: number;
    terminalId: string;
    ipAddress: string;
    shaHash: string;
    phone: string;
    guardian: string;
  };
}

const mockTransactions: TransactionRecord[] = [
  {
    id: "1",
    receiptNo: "REC-2025-0842",
    timestamp: "28 Mar 2025, 11:20:14 IST",
    date: "28 Mar 2025",
    studentName: "Rahul Sharma",
    rollNo: "APX-2023-CS-042",
    course: "B.Tech CSE (Sem V)",
    feeHeads: "Tuition ₹20k, Lab ₹5k, Exam ₹2.5k",
    amount: 27500,
    tenderMode: "UPI",
    refNo: "UPI-REF-90281923",
    cashierTill: "Till #02 (R. Kumar)",
    status: "Cleared",
    details: {
      tuition: 20000,
      lab: 5000,
      exam: 2500,
      terminalId: "COUNTER-POS-02",
      ipAddress: "192.168.1.104",
      shaHash: "a89f3e498172bc901e8234fa889210ecb772d148be92381274910293847120fe",
      phone: "+91 98765 43210",
      guardian: "Rajendra Sharma",
    },
  },
  {
    id: "2",
    receiptNo: "REC-2025-0841",
    timestamp: "28 Mar 2025, 10:45:02 IST",
    date: "28 Mar 2025",
    studentName: "Priya Patel",
    rollNo: "APX-2022-EC-019",
    course: "B.Tech ECE (Sem VII)",
    feeHeads: "Tuition ₹35k, Lab ₹5k",
    amount: 40000,
    tenderMode: "Cheque",
    refNo: "CHQ-778901 (SBI)",
    cashierTill: "Till #02 (R. Kumar)",
    status: "Clearing",
    details: {
      tuition: 35000,
      lab: 5000,
      exam: 0,
      terminalId: "COUNTER-TILL-02",
      ipAddress: "192.168.1.104",
      shaHash: "b72e11947209afb34710123cb9948210fe912384712039487120398471294801",
      phone: "+91 98234 56789",
      guardian: "Kiritbhai Patel",
    },
  },
  {
    id: "3",
    receiptNo: "REC-2025-0840",
    timestamp: "28 Mar 2025, 10:15:40 IST",
    date: "28 Mar 2025",
    studentName: "Rohan Verma",
    rollNo: "APX-2024-ME-058",
    course: "B.Tech ME (Sem III)",
    feeHeads: "Tuition Installment 1",
    amount: 25000,
    tenderMode: "Cash",
    refNo: "CASH-TILL02-5509",
    cashierTill: "Till #02 (R. Kumar)",
    status: "Cleared",
    details: {
      tuition: 25000,
      lab: 0,
      exam: 0,
      terminalId: "CASH-DESK-02",
      ipAddress: "192.168.1.104",
      shaHash: "c33140abfe782910398471203984712039487120938471209384712093847120",
      phone: "+91 97123 45678",
      guardian: "Sunil Verma",
    },
  },
  {
    id: "4",
    receiptNo: "REC-2025-0839",
    timestamp: "28 Mar 2025, 09:50:22 IST",
    date: "28 Mar 2025",
    studentName: "Sneha Kulkarni",
    rollNo: "APX-2023-CS-088",
    course: "B.Tech CSE (Sem V)",
    feeHeads: "Tuition ₹45k, Lab ₹5k",
    amount: 50000,
    tenderMode: "NEFT",
    refNo: "NEFT-N2842019",
    cashierTill: "Online Gateway Pool",
    status: "Cleared",
    details: {
      tuition: 45000,
      lab: 5000,
      exam: 0,
      terminalId: "BANK-NET-01",
      ipAddress: "10.0.4.12",
      shaHash: "d4481290fe372910398471209384712093847120938471209384712093847120",
      phone: "+91 98450 11223",
      guardian: "Dhananjay Kulkarni",
    },
  },
  {
    id: "5",
    receiptNo: "REC-2025-0838",
    timestamp: "27 Mar 2025, 16:30:11 IST",
    date: "27 Mar 2025",
    studentName: "Vikramaditya Singh",
    rollNo: "APX-2022-EE-012",
    course: "B.Tech EE (Sem VII)",
    feeHeads: "Tuition ₹30k, Lab ₹5k",
    amount: 35000,
    tenderMode: "POS Card",
    refNo: "POS-TXN-8829",
    cashierTill: "Till #01 (A. Mehta)",
    status: "Cleared",
    details: {
      tuition: 30000,
      lab: 5000,
      exam: 0,
      terminalId: "POS-TERM-04",
      ipAddress: "192.168.1.102",
      shaHash: "e559103984712093847120938471209384712093847120938471209384712093",
      phone: "+91 99887 76655",
      guardian: "Pratap Singh",
    },
  },
  {
    id: "6",
    receiptNo: "REC-2025-0837",
    timestamp: "27 Mar 2025, 15:45:50 IST",
    date: "27 Mar 2025",
    studentName: "Ananya Iyer",
    rollNo: "APX-2024-BT-005",
    course: "B.Tech Biotech (Sem III)",
    feeHeads: "Tuition ₹45k, Lab ₹5k",
    amount: 50000,
    tenderMode: "UPI",
    refNo: "UPI-REF-90281144",
    cashierTill: "Till #02 (R. Kumar)",
    status: "Cleared",
    details: {
      tuition: 45000,
      lab: 5000,
      exam: 0,
      terminalId: "COUNTER-POS-02",
      ipAddress: "192.168.1.104",
      shaHash: "f660192830192830192830192830192830192830192830192830192830192830",
      phone: "+91 97654 32109",
      guardian: "Subramanian Iyer",
    },
  },
  {
    id: "7",
    receiptNo: "REC-2025-0836",
    timestamp: "27 Mar 2025, 14:10:18 IST",
    date: "27 Mar 2025",
    studentName: "Kunal Saxena",
    rollNo: "APX-2022-CS-014",
    course: "B.Tech CSE (Sem VII)",
    feeHeads: "Tuition Tranche 1",
    amount: 32500,
    tenderMode: "Cheque",
    refNo: "CHQ-112049 (PNB)",
    cashierTill: "Till #01 (A. Mehta)",
    status: "Reconciled",
    details: {
      tuition: 32500,
      lab: 0,
      exam: 0,
      terminalId: "COUNTER-TILL-01",
      ipAddress: "192.168.1.102",
      shaHash: "9982310fe372910398471209384712093847120938471209384712093847120",
      phone: "+91 98112 33445",
      guardian: "Alok Saxena",
    },
  },
  {
    id: "8",
    receiptNo: "REC-2025-0835",
    timestamp: "27 Mar 2025, 12:35:09 IST",
    date: "27 Mar 2025",
    studentName: "Manav Gupta",
    rollNo: "APX-2022-ME-045",
    course: "B.Tech ME (Sem VII)",
    feeHeads: "Tuition Tranche 1",
    amount: 30000,
    tenderMode: "RTGS",
    refNo: "RTGS-CMS-4491",
    cashierTill: "Online Gateway Pool",
    status: "Reconciled",
    details: {
      tuition: 30000,
      lab: 0,
      exam: 0,
      terminalId: "BANK-NET-01",
      ipAddress: "10.0.4.12",
      shaHash: "1122334455667788990011223344556677889900112233445566778899001122",
      phone: "+91 98711 99887",
      guardian: "Vinod Gupta",
    },
  },
];

export default function AccountantPaymentHistoryPage() {
  const [transactions] = useState<TransactionRecord[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [tillFilter, setTillFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Drawer / Modal state
  const [drawerTxn, setDrawerTxn] = useState<TransactionRecord | null>(null);
  const [isTallyModalOpen, setIsTallyModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (modeFilter !== "ALL" && t.tenderMode !== modeFilter) return false;
    if (tillFilter !== "ALL" && !t.cashierTill.includes(tillFilter)) return false;
    if (dateFilter === "TODAY" && !t.date.includes("28 Mar")) return false;

    return true;
  });

  const handleExportCSV = () => {
    const csvHeader =
      "Voucher ID,Timestamp,Candidate,Roll No,Course,Fee Heads,Amount (INR),Tender Mode,Ref No,Cashier Till,Status\n";
    const csvRows = filteredTransactions
      .map(
        (t) =>
          `"${t.receiptNo}","${t.timestamp}","${t.studentName}","${t.rollNo}","${t.course}","${t.feeHeads}",${t.amount},"${t.tenderMode}","${t.refNo}","${t.cashierTill}","${t.status}"`
      )
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `transaction_journal_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Daybook transaction journal exported as CSV!");
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
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/accountant" className="text-amber-700 hover:underline">
                Accounts Directorate
              </Link>
              <span>/</span>
              <span>Transaction Auditing</span>
              <span>/</span>
              <span className="text-[#3D405B] font-bold">Cashier Daybook Journal</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#3D405B] tracking-tight">
                  Transaction Journal &amp; Fee Collection Daybook 📊
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-full border border-amber-200">
                  1,842 Vouchers Recorded
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Audited financial log of physical and electronic fee intakes, clearance timestamps, and ledger realization hashes.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsTallyModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-amber-700" />
              <span>Export Tally XML</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Download CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Daybook</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Gross Realized</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              ₹4,18,45,000
            </div>
            <div className="text-xs text-purple-700 font-semibold mt-1">
              FY 2025-26 to Date
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Annual Billed Target</span>
            <span className="font-semibold text-slate-700">90.0% Realized</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Today&apos;s Counter Intake</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              ₹3,85,000
            </div>
            <div className="text-xs text-emerald-600 font-bold mt-1">
              +14.2% vs yesterday
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Active Session</span>
            <span className="font-semibold text-emerald-700">Till #02 Open</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Reconciled Transactions</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              1,842 Slips
            </div>
            <div className="text-xs text-blue-700 font-semibold mt-1">
              98.6% Settlement Rate
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Bursar Audit</span>
            <span className="font-semibold text-blue-700">100% In Sync</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cheques in Clearing</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-700 tracking-tight font-mono">
              ₹1,40,000
            </div>
            <div className="text-xs text-amber-800 font-semibold mt-1">
              3 Under CTS-2010
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Bank Clearing</span>
            <span className="font-semibold text-amber-800">Pending Value Date</span>
          </div>
        </div>
      </div>

      {/* Advanced Query Toolbar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="lg:col-span-5 relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search voucher #, candidate name, roll, UTR reference..."
              className="w-full h-10 pl-10 pr-3 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600 transition-colors"
            />
          </div>

          {/* Date Selector */}
          <div className="lg:col-span-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 text-xs text-slate-700 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
            >
              <option value="ALL">All Dates (AY 2025-26)</option>
              <option value="TODAY">Today (28 Mar 2025)</option>
            </select>
          </div>

          {/* Mode Selector */}
          <div className="lg:col-span-2">
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 text-xs text-slate-700 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
            >
              <option value="ALL">All Tender Modes</option>
              <option value="UPI">UPI Gateway</option>
              <option value="Cash">Cash Currency</option>
              <option value="Cheque">Cheque / DD</option>
              <option value="POS Card">POS Card</option>
              <option value="NEFT">NEFT Transfer</option>
              <option value="RTGS">RTGS Transfer</option>
            </select>
          </div>

          {/* Till / Counter Selector */}
          <div className="lg:col-span-3">
            <select
              value={tillFilter}
              onChange={(e) => setTillFilter(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 text-xs text-slate-700 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
            >
              <option value="ALL">All Cashier Counters</option>
              <option value="Till #02">Till #02 (R. Kumar)</option>
              <option value="Till #01">Till #01 (A. Mehta)</option>
              <option value="Online">Online Gateway Pool</option>
            </select>
          </div>
        </div>

        {/* Active Filters Tag & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">Active Filter:</span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-semibold">
              Mode: {modeFilter}
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-semibold">
              Counter: {tillFilter}
            </span>
            {searchQuery && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg font-semibold border border-amber-200">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

          <button
            onClick={() => {
              setSearchQuery("");
              setModeFilter("ALL");
              setDateFilter("ALL");
              setTillFilter("ALL");
            }}
            className="text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Primary Transaction Journal Table */}
      <div className="bg-white border border-slate-200 shadow-xs rounded-2xl overflow-hidden space-y-0">
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <History className="h-4 w-4 text-amber-700" />
            <span className="text-sm font-bold text-[#3D405B]">
              Daybook Realization Ledger
            </span>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px] rounded-full">
              Live Sync Active
            </span>
          </div>
          <span className="text-slate-500 font-medium">
            Displaying {filteredTransactions.length} of {transactions.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-3 px-4">Voucher #</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Candidate Particulars</th>
                <th className="py-3 px-3">Fee Heads Realized</th>
                <th className="py-3 px-3 text-right">Amount (₹)</th>
                <th className="py-3 px-3 text-center">Tender Mode</th>
                <th className="py-3 px-3">Gateway / Chq Ref</th>
                <th className="py-3 px-3">Counter / Till</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((txn) => (
                <tr
                  key={txn.id}
                  onClick={() => setDrawerTxn(txn)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">
                    {txn.receiptNo}
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {txn.timestamp}
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-bold text-[#3D405B] block">{txn.studentName}</span>
                    <span className="font-mono text-[11px] text-slate-500">{txn.rollNo}</span>
                    <span className="text-[10px] text-slate-400 block">{txn.course}</span>
                  </td>

                  <td className="py-3 px-3 text-slate-600">
                    {txn.feeHeads}
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-[#3D405B] font-mono text-sm">
                    ₹{txn.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                        txn.tenderMode === "UPI"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : txn.tenderMode === "Cash"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : txn.tenderMode === "POS Card"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : txn.tenderMode === "Cheque"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      }`}
                    >
                      {txn.tenderMode}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    {txn.refNo}
                  </td>

                  <td className="py-3 px-3 text-slate-600 text-[11px]">
                    {txn.cashierTill}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
                        txn.status === "Cleared"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : txn.status === "Reconciled"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          txn.status === "Cleared"
                            ? "bg-emerald-600"
                            : txn.status === "Reconciled"
                            ? "bg-blue-600"
                            : "bg-amber-600 animate-pulse"
                        }`}
                      ></span>
                      {txn.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDrawerTxn(txn);
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-[#3D405B]">Daybook Realized Today: ₹1,77,500.00</span>
            <span>&bull;</span>
            <span>6 Receipts Processed</span>
            <span>&bull;</span>
            <span className="text-emerald-700 font-semibold">Tally Ledger Sync: OK</span>
          </div>

          <div className="flex items-center gap-1 font-semibold">
            <button className="px-3 py-1 bg-white text-slate-400 border border-slate-200 rounded-lg cursor-not-allowed">
              Prev
            </button>
            <button className="px-3 py-1 bg-amber-600 text-white rounded-lg shadow-2xs">
              1
            </button>
            <button className="px-3 py-1 bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Slideout Modal: Transaction Audit Voucher */}
      {drawerTxn && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">
                    Transaction Audit Dossier: {drawerTxn.receiptNo}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {drawerTxn.timestamp}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDrawerTxn(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-3.5 text-xs">
              {/* Banner */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Settlement Status</span>
                  <span className="font-bold text-[#3D405B] text-sm uppercase">
                    {drawerTxn.status === "Cleared" ? "CLEARING REALIZED & SEALED" : drawerTxn.status}
                  </span>
                  <span className="text-[11px] text-slate-500 block">Counter: {drawerTxn.cashierTill}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Amount Realized</span>
                  <span className="text-xl font-bold font-mono text-emerald-700">
                    ₹{drawerTxn.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Student Details */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-[#3D405B] pb-1 border-b border-slate-100 flex justify-between">
                  <span>Candidate Credentials</span>
                  <span className="text-blue-600 font-mono">{drawerTxn.rollNo}</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Student Name:</span>
                    <span className="font-bold text-slate-800">{drawerTxn.studentName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Program:</span>
                    <span className="text-slate-700">{drawerTxn.course}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Father / Guardian:</span>
                    <span className="text-slate-700">{drawerTxn.details.guardian}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Contact Tel:</span>
                    <span className="font-mono text-slate-800">{drawerTxn.details.phone}</span>
                  </div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-[#3D405B] pb-1 border-b border-slate-100">
                  Itemized Fee Breakdown
                </div>
                <div className="space-y-1.5 text-slate-600">
                  <div className="flex justify-between">
                    <span>Tuition Fee Assessment:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ₹{drawerTxn.details.tuition.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab &amp; Computing Infrastructure:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ₹{drawerTxn.details.lab.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exam Assessment:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ₹{drawerTxn.details.exam.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-[#3D405B]">
                    <span>Total Realized:</span>
                    <span className="font-mono text-emerald-700">
                      ₹{drawerTxn.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Audit Metadata */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-[11px]">
                <div className="text-xs font-bold text-[#3D405B] pb-1 border-b border-slate-200">
                  Cryptographic Telemetry
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tender Instrument:</span>
                  <span className="font-bold text-slate-800">{drawerTxn.tenderMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ref / UTR Number:</span>
                  <span className="font-mono text-slate-800 font-semibold">{drawerTxn.refNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Counter Terminal:</span>
                  <span className="font-mono text-slate-700">{drawerTxn.details.terminalId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">SHA-256 Ledger Hash:</span>
                  <span className="font-mono text-[9px] text-slate-600 break-all select-all block bg-white p-1.5 rounded-lg border border-slate-200 mt-1">
                    {drawerTxn.details.shaHash}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  showToast(`Receipt ${drawerTxn.receiptNo} dispatched to ${drawerTxn.studentName} via SMS & Email!`);
                }}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Resend Slips</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDrawerTxn(null)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    showToast(`Printing voucher ${drawerTxn.receiptNo}...`);
                    window.print();
                  }}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tally XML Export Modal */}
      {isTallyModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <FileCode className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">
                    Export TallyPrime ERP XML
                  </h3>
                  <span className="text-xs text-slate-500">
                    Standardized Ledger Schema
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsTallyModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Export standardized institutional daybook vouchers formatted for automated ingestion into TallyPrime / Tally ERP 9 ledger books.
            </p>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Tally Company:</span>
                <span className="font-bold text-[#3D405B]">APEX INST TECH &amp; MGMT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Voucher Type:</span>
                <span className="font-bold text-amber-800">Receipt Voucher (F6)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Range:</span>
                <span className="font-semibold text-slate-700">Today (28 Mar 2025)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
                <span className="text-slate-600">Gross Export Amount:</span>
                <span className="text-emerald-700 font-mono">₹1,77,500.00</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsTallyModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>All Masters</REPORTNAME>
      </REQUESTDESC>
      <REQUESTDATA>
        <TALLYMESSAGE xmlns:UDF="TallyUDF">
          <VOUCHER VCHTYPE="Receipt" ACTION="Create">
            <DATE>20250328</DATE>
            <NARRATION>Daybook Realization - Apex Institute Till #02</NARRATION>
            <VOUCHERNUMBER>REC-2025-0842</VOUCHERNUMBER>
            <AMOUNT>27500.00</AMOUNT>
          </VOUCHER>
        </TALLYMESSAGE>
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>`;
                  const blob = new Blob([xmlContent], { type: "application/xml;charset=utf-8;" });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", "Apex_Tally_Vouchers_28Mar2025.xml");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  setIsTallyModalOpen(false);
                  showToast("Apex_Tally_Vouchers_28Mar2025.xml downloaded successfully!");
                }}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download XML Schema</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
