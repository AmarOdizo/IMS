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
  Banknote,
  Building2,
  Check,
  AlertCircle,
  Copy,
  Mail,
  MessageSquare,
  ShieldCheck,
  QrCode,
  Calendar,
  Layers,
  ChevronRight,
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
    cashierTill: "Till #02 (P. Sharma)",
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
    cashierTill: "Till #02 (P. Sharma)",
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
    cashierTill: "Till #02 (P. Sharma)",
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
    cashierTill: "Till #02 (P. Sharma)",
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
  const [transactions, setTransactions] = useState<TransactionRecord[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [tillFilter, setTillFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Slideout drawer state
  const [drawerTxn, setDrawerTxn] = useState<TransactionRecord | null>(null);

  // Tally export modal state
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

  return (
    <div className="flex flex-col w-full pb-16 font-body text-on-surface">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary px-4 py-3 shadow-lg flex items-center gap-2 border border-secondary font-mono text-xs animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-secondary-container" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Executive Actions */}
      <div className="bg-surface-container-lowest p-4 mb-4 shadow-xs border border-[#d5e3fc]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-mono text-[11px] text-secondary uppercase tracking-wider mb-1">
              <span>Accounts &amp; Bursar Portal</span>
              <span className="text-outline-variant">/</span>
              <span>Transaction Auditing</span>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">Cashier Daybook Journal</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold font-headline text-primary tracking-tight">
                Transaction Journal &amp; Fee Collection Daybook
              </h1>
              <span className="px-2 py-0.5 bg-secondary-container text-primary font-mono text-[11px] font-bold border border-[#a8c4f0]">
                1,842 VOUCHERS RECORDED
              </span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsTallyModalOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs uppercase tracking-wider transition-colors border border-[#cbd5e1] font-semibold cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-secondary" />
              <span>Export to Tally XML</span>
            </button>
            <button
              onClick={() => showToast("Exported 1,842 ledger lines to Excel (.xlsx)")}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs uppercase tracking-wider transition-colors border border-[#cbd5e1] font-semibold cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-secondary" />
              <span>Download Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => window.print()}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary hover:bg-primary/95 font-mono text-xs uppercase tracking-wider transition-colors font-bold shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Daybook Journal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Telemetry Metrics (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4 font-mono">
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Total Gross Realized
            </span>
            <span className="text-xl font-bold text-primary">₹4,18,45,000</span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">FY 2025-26 to Date</span>
          </div>
          <div className="p-2.5 bg-surface-container text-secondary">
            <Banknote className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Today's Counter Intake
            </span>
            <span className="text-xl font-bold text-primary">₹3,85,000</span>
            <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">Till Session Active</span>
          </div>
          <div className="p-2.5 bg-surface-container text-secondary">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Reconciled Transactions
            </span>
            <span className="text-xl font-bold text-primary">1,842 Slips</span>
            <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">98.6% Settlement</span>
          </div>
          <div className="p-2.5 bg-surface-container text-secondary">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              Cheques in Clearing
            </span>
            <span className="text-xl font-bold text-amber-700">₹1,40,000</span>
            <span className="text-[10px] text-amber-800 font-semibold mt-0.5">3 Under CTS-2010</span>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-800 border border-amber-200">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Advanced Query Console / Filters Matrix */}
      <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs mb-4 flex flex-col gap-2 font-mono text-xs">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Voucher, Candidate, Roll, Ref..."
              className="w-full bg-surface-container-low pl-8 pr-3 py-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
            />
          </div>

          {/* Date Selector */}
          <div>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-surface-container-low p-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
            >
              <option value="ALL">All Dates (AY 2025-26)</option>
              <option value="TODAY">Today (28 Mar 2025)</option>
            </select>
          </div>

          {/* Mode Filter */}
          <div>
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="w-full bg-surface-container-low p-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
            >
              <option value="ALL">All Payment Modes</option>
              <option value="UPI">UPI Gateway</option>
              <option value="Cash">Cash Currency</option>
              <option value="Cheque">Cheque / DD</option>
              <option value="POS Card">POS Card</option>
              <option value="NEFT">NEFT Transfer</option>
              <option value="RTGS">RTGS Transfer</option>
            </select>
          </div>

          {/* Cashier Till Filter */}
          <div>
            <select
              value={tillFilter}
              onChange={(e) => setTillFilter(e.target.value)}
              className="w-full bg-surface-container-low p-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
            >
              <option value="ALL">All Cashier Counters</option>
              <option value="Till #02">Till #02 (P. Sharma)</option>
              <option value="Till #01">Till #01 (A. Mehta)</option>
              <option value="Online">Online Gateway Pool</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tags & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#e2e8f0] text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500 font-semibold uppercase">Active Filters:</span>
            <span className="px-2 py-0.2 bg-surface-container text-primary border border-[#cbd5e1]">
              Mode: {modeFilter}
            </span>
            <span className="px-2 py-0.2 bg-surface-container text-primary border border-[#cbd5e1]">
              Counter: {tillFilter}
            </span>
            {searchQuery && (
              <span className="px-2 py-0.2 bg-secondary-container text-primary border border-[#a8c4f0]">
                Query: "{searchQuery}"
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
            className="text-secondary hover:underline font-bold uppercase cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Primary Transaction Journal Ledger Table */}
      <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-xs overflow-x-auto mb-4">
        {/* Sub-header Bar */}
        <div className="p-2.5 bg-surface-container-low border-b border-[#cbd5e1] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary uppercase">Daybook Realization Ledger</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px]">
              &bull; LIVE SYNC ACTIVE
            </span>
          </div>
          <span className="text-on-surface-variant text-[11px]">
            Displaying {filteredTransactions.length} of 1,842 Realized Records
          </span>
        </div>

        <table className="w-full text-left text-xs font-sans border-collapse">
          <thead>
            <tr className="bg-surface-container font-mono text-[10px] uppercase text-on-surface-variant border-b border-[#cbd5e1]">
              <th className="p-2.5">Voucher / Txn ID</th>
              <th className="p-2.5 font-mono">Timestamp</th>
              <th className="p-2.5">Candidate Particulars</th>
              <th className="p-2.5">Fee Heads Realized</th>
              <th className="p-2.5 font-mono text-right">Amount (₹)</th>
              <th className="p-2.5 text-center font-mono">Tender Mode</th>
              <th className="p-2.5 font-mono">Gateway / Chq Ref</th>
              <th className="p-2.5">Counter / Till</th>
              <th className="p-2.5 text-center font-mono">Status</th>
              <th className="p-2.5 text-right font-mono">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0]">
            {filteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                onClick={() => setDrawerTxn(txn)}
                className="hover:bg-surface-container-low transition-colors cursor-pointer group"
              >
                <td className="p-2.5 font-mono font-bold text-primary">
                  <div className="flex items-center gap-1">
                    <span className="group-hover:text-secondary underline-offset-2">
                      {txn.receiptNo}
                    </span>
                  </div>
                </td>

                <td className="p-2.5 font-mono text-[11px] text-gray-600">
                  {txn.timestamp}
                </td>

                <td className="p-2.5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary">{txn.studentName}</span>
                    <span className="font-mono text-[10px] text-secondary font-bold">
                      {txn.rollNo}
                    </span>
                    <span className="text-[10px] text-gray-500">{txn.course}</span>
                  </div>
                </td>

                <td className="p-2.5 text-[11px] text-gray-700">
                  {txn.feeHeads}
                </td>

                <td className="p-2.5 text-right font-mono font-bold text-primary text-sm">
                  ₹{txn.amount.toLocaleString("en-IN")}.00
                </td>

                <td className="p-2.5 text-center">
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider ${
                      txn.tenderMode === "UPI"
                        ? "bg-secondary-container text-primary"
                        : txn.tenderMode === "Cash"
                        ? "bg-emerald-100 text-emerald-800"
                        : txn.tenderMode === "POS Card"
                        ? "bg-amber-100 text-amber-800"
                        : txn.tenderMode === "Cheque"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-indigo-100 text-indigo-800"
                    }`}
                  >
                    {txn.tenderMode}
                  </span>
                </td>

                <td className="p-2.5 font-mono text-[10px] text-gray-600">
                  {txn.refNo}
                </td>

                <td className="p-2.5 text-[11px] font-mono text-gray-600">
                  {txn.cashierTill}
                </td>

                <td className="p-2.5 text-center">
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
                      txn.status === "Cleared"
                        ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        : txn.status === "Reconciled"
                        ? "bg-blue-100 text-blue-900 border border-blue-300"
                        : "bg-amber-100 text-amber-900 border border-amber-300"
                    }`}
                  >
                    {txn.status === "Cleared" && <Check className="w-2.5 h-2.5" />}
                    {txn.status}
                  </span>
                </td>

                <td className="p-2.5 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDrawerTxn(txn);
                    }}
                    className="p-1 bg-surface-container hover:bg-surface-container-high border border-[#cbd5e1] text-secondary cursor-pointer"
                    title="Audit Voucher Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination & Daybook Reconciliation Summary Footer */}
        <div className="bg-surface-container-low p-2.5 border-t border-[#cbd5e1] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="font-bold text-primary">Daybook Total Realized: ₹1,77,500.00</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">6 Receipts Today</span>
            <span className="text-gray-500">|</span>
            <span className="text-emerald-700 font-semibold">Tally Ledger Sync: OK</span>
          </div>

          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-on-surface-variant mr-2">Showing 1-8 of 1,842</span>
            <button className="px-2 py-0.5 border border-[#cbd5e1] uppercase font-bold hover:bg-surface-container">
              Prev
            </button>
            <button className="px-2 py-0.5 bg-primary text-on-primary font-bold">1</button>
            <button className="px-2 py-0.5 border border-[#cbd5e1] font-bold hover:bg-surface-container">
              2
            </button>
            <button className="px-2 py-0.5 border border-[#cbd5e1] font-bold hover:bg-surface-container">
              3
            </button>
            <button className="px-2 py-0.5 border border-[#cbd5e1] uppercase font-bold hover:bg-surface-container">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Slideout Modal: Detailed Transaction Audit Voucher */}
      {drawerTxn && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-surface-container-lowest border-l-2 border-primary w-full max-w-xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right font-mono text-xs">
            {/* Drawer Header */}
            <div>
              <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-[#324769]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-secondary-container" />
                  <div>
                    <h3 className="font-bold uppercase tracking-tight text-sm font-headline">
                      Transaction Audit Dossier: {drawerTxn.receiptNo}
                    </h3>
                    <span className="text-[10px] text-gray-300 font-mono">
                      Timestamp: {drawerTxn.timestamp}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerTxn(null)}
                  className="p-1 hover:bg-white/10 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-4 flex flex-col gap-4">
                {/* Barcode & Status Banner */}
                <div className="p-3 bg-surface-container-low border border-[#cbd5e1] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-gray-500 font-bold">
                      Settlement Status
                    </span>
                    <span className="text-sm font-bold text-primary uppercase">
                      {drawerTxn.status === "Cleared"
                        ? "CLEARING REALIZED & SEALED"
                        : drawerTxn.status}
                    </span>
                    <span className="text-[10px] text-gray-600 mt-0.5">
                      Counter: {drawerTxn.cashierTill}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase text-gray-500 font-bold block">
                      Amount Realized
                    </span>
                    <span className="text-xl font-bold text-primary font-mono">
                      ₹{drawerTxn.amount.toLocaleString("en-IN")}.00
                    </span>
                  </div>
                </div>

                {/* Student Particulars */}
                <div className="border border-[#cbd5e1] p-3 bg-white">
                  <div className="text-[10px] uppercase font-bold text-secondary mb-2 border-b border-gray-200 pb-1 flex items-center justify-between">
                    <span>Candidate Credentials</span>
                    <span className="text-primary font-mono">{drawerTxn.rollNo}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500 text-[10px] block">Student Name:</span>
                      <span className="font-bold text-primary font-sans">
                        {drawerTxn.studentName}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] block">Program:</span>
                      <span className="font-medium font-sans">{drawerTxn.course}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] block">Father / Guardian:</span>
                      <span className="font-sans">{drawerTxn.details.guardian}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-[10px] block">Contact Phone:</span>
                      <span className="font-mono">{drawerTxn.details.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Fee Head Breakdown */}
                <div className="border border-[#cbd5e1] p-3 bg-white">
                  <div className="text-[10px] uppercase font-bold text-secondary mb-2 border-b border-gray-200 pb-1">
                    Itemized Allocation of Tender
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tuition Fee Assessment:</span>
                      <span className="font-bold text-primary">
                        ₹{drawerTxn.details.tuition.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lab &amp; Computing Infrastructure:</span>
                      <span className="font-bold text-primary">
                        ₹{drawerTxn.details.lab.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Exam Assessment:</span>
                      <span className="font-bold text-primary">
                        ₹{drawerTxn.details.exam.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-1.5 flex justify-between font-bold text-sm text-primary">
                      <span>Total Realized:</span>
                      <span>₹{drawerTxn.amount.toLocaleString("en-IN")}.00</span>
                    </div>
                  </div>
                </div>

                {/* Technical Audit Metadata */}
                <div className="border border-[#cbd5e1] p-3 bg-surface-container-low text-[11px] space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-secondary mb-1">
                    Statutory &amp; Cryptographic Telemetry
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tender Instrument:</span>
                    <span className="font-bold text-primary">{drawerTxn.tenderMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Instrument Reference / UTR:</span>
                    <span className="font-bold text-primary">{drawerTxn.refNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Counter Terminal ID:</span>
                    <span className="font-mono text-gray-700">{drawerTxn.details.terminalId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Internal IP Node:</span>
                    <span className="font-mono text-gray-700">{drawerTxn.details.ipAddress}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 text-[10px] block">SHA-256 Ledger Hash:</span>
                    <span className="font-mono text-[9px] text-gray-700 break-all select-all block bg-white p-1 border border-gray-300 mt-0.5">
                      {drawerTxn.details.shaHash}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-4 bg-surface-container border-t border-[#cbd5e1] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    showToast(`Receipt ${drawerTxn.receiptNo} re-sent via SMS & Email!`);
                  }}
                  className="px-3 py-1.5 bg-surface-container-high border border-[#cbd5e1] uppercase font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  <Mail className="w-3 h-3 text-secondary" />
                  <span>Resend Slips</span>
                </button>
                <Link
                  href={`/accountant/receipts`}
                  className="px-3 py-1.5 bg-surface-container-high border border-[#cbd5e1] uppercase font-bold text-[10px] flex items-center gap-1 text-primary"
                >
                  <Printer className="w-3 h-3 text-secondary" />
                  <span>Official Receipt</span>
                </Link>
              </div>

              <button
                onClick={() => setDrawerTxn(null)}
                className="px-4 py-1.5 bg-primary text-on-primary uppercase font-bold text-xs tracking-wider cursor-pointer"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tally XML Export Modal */}
      {isTallyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-primary w-full max-w-md p-5 shadow-2xl animate-in zoom-in-95 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-tight">
                  Export TallyPrime ERP XML Schema
                </h3>
              </div>
              <button
                onClick={() => setIsTallyModalOpen(false)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-on-surface-variant leading-relaxed mb-3">
              Export standardized institutional voucher XML formatted for automated ingestion into TallyPrime / Tally ERP 9 ledger books.
            </p>

            <div className="p-2.5 bg-surface-container-low border border-[#cbd5e1] mb-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Tally Company:</span>
                <span className="font-bold text-primary">APEX INST TECH &amp; MGMT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Voucher Type:</span>
                <span className="font-bold text-primary">Receipt Voucher (F6)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Selected Range:</span>
                <span className="font-bold text-primary">Today (28 Mar 2025)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gross Export Amount:</span>
                <span className="font-bold text-primary">₹1,77,500.00</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#cbd5e1]">
              <button
                onClick={() => setIsTallyModalOpen(false)}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface uppercase font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsTallyModalOpen(false);
                  showToast("Generated Apex_Tally_Vouchers_28Mar2025.xml successfully!");
                }}
                className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary/95 uppercase font-bold tracking-wider cursor-pointer shadow-xs"
              >
                Download XML Schema
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

