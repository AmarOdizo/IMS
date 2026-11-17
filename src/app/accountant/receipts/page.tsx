"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Printer,
  Download,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
  Mail,
  MessageSquare,
  Copy,
  X,
  Building2,
  QrCode,
  AlertCircle,
  Calendar,
  User,
  CreditCard,
  Landmark,
  Coins,
  Send,
  Eye,
  Check,
  Share2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface FeeItem {
  sno: number;
  description: string;
  code: string;
  billed: number;
  realized: number;
}

interface ReceiptRecord {
  id: string;
  receiptNo: string;
  mode: "UPI" | "Cheque" | "Cash" | "NEFT" | "POS Card";
  amount: number;
  amountInWords: string;
  date: string;
  time: string;
  status: "Cleared" | "Clearing";
  student: {
    name: string;
    rollNo: string;
    course: string;
    batch: string;
    semester: string;
    guardian: string;
    phone: string;
    email: string;
  };
  fees: FeeItem[];
  paymentDetails: {
    modeFull: string;
    refNo: string;
    bankName: string;
    authCode: string;
    terminalId: string;
    clearingDate?: string;
  };
  balanceSummary: {
    totalFee: number;
    concession: number;
    previouslyPaid: number;
    currentRealized: number;
    balancePending: number;
    dueDate: string;
  };
  security: {
    hash: string;
    cashierName: string;
    cashierId: string;
    tillId: string;
  };
}

const mockReceipts: ReceiptRecord[] = [
  {
    id: "1",
    receiptNo: "REC-2025-0842",
    mode: "UPI",
    amount: 27500,
    amountInWords: "Rupees Twenty-Seven Thousand Five Hundred Only",
    date: "28 Mar 2025",
    time: "11:20 IST",
    status: "Cleared",
    student: {
      name: "Rahul Sharma",
      rollNo: "APX-2023-CS-042",
      course: "B.Tech - Computer Science & Engineering",
      batch: "2023-2027",
      semester: "5th Semester",
      guardian: "Rajendra Sharma",
      phone: "+91 98765 43210",
      email: "rahul.sharma@apex.edu.in",
    },
    fees: [
      { sno: 1, description: "Tuition Fee (Sem V) Tranche 2", code: "LEDGER-TUI-01", billed: 45000, realized: 20000 },
      { sno: 2, description: "Advanced Computing Lab & Cloud Infrastructure", code: "LEDGER-LAB-02", billed: 5000, realized: 5000 },
      { sno: 3, description: "University Examination & Continuous Assessment", code: "LEDGER-EXAM-03", billed: 2500, realized: 2500 },
    ],
    paymentDetails: {
      modeFull: "UPI (Unified Payments Interface)",
      refNo: "UPI-REF-902819238472",
      bankName: "HDFC Bank (Aggregator Gateway)",
      authCode: "AUTH-991204",
      terminalId: "COUNTER-POS-02",
    },
    balanceSummary: {
      totalFee: 52500,
      concession: 0,
      previouslyPaid: 0,
      currentRealized: 27500,
      balancePending: 25000,
      dueDate: "15 Apr 2025",
    },
    security: {
      hash: "a89f3e498172bc901e8234fa889210ecb772d148be92381274910293847120fe",
      cashierName: "Rajesh Kumar (Chief Cashier)",
      cashierId: "EMP-FIN-309",
      tillId: "TILL-02",
    },
  },
  {
    id: "2",
    receiptNo: "REC-2025-0841",
    mode: "Cheque",
    amount: 40000,
    amountInWords: "Rupees Forty Thousand Only",
    date: "28 Mar 2025",
    time: "10:45 IST",
    status: "Clearing",
    student: {
      name: "Priya Patel",
      rollNo: "APX-2022-EC-019",
      course: "B.Tech - Electronics & Communication",
      batch: "2022-2026",
      semester: "7th Semester",
      guardian: "Kiritbhai Patel",
      phone: "+91 98234 56789",
      email: "priya.patel@apex.edu.in",
    },
    fees: [
      { sno: 1, description: "Tuition Fee (Sem VII)", code: "LEDGER-TUI-01", billed: 40000, realized: 35000 },
      { sno: 2, description: "VLSI Design & Embedded Lab", code: "LEDGER-LAB-02", billed: 5000, realized: 5000 },
    ],
    paymentDetails: {
      modeFull: "Cheque / Demand Draft (CTS-2010)",
      refNo: "CHQ-778901 (SBI)",
      bankName: "State Bank of India - Greater Noida",
      authCode: "CTS-INW-4401",
      terminalId: "COUNTER-TILL-02",
      clearingDate: "Expected: 30 Mar 2025",
    },
    balanceSummary: {
      totalFee: 45000,
      concession: 0,
      previouslyPaid: 5000,
      currentRealized: 40000,
      balancePending: 0,
      dueDate: "Settled",
    },
    security: {
      hash: "b72e11947209afb34710123cb9948210fe912384712039487120398471294801",
      cashierName: "Rajesh Kumar (Chief Cashier)",
      cashierId: "EMP-FIN-309",
      tillId: "TILL-02",
    },
  },
  {
    id: "3",
    receiptNo: "REC-2025-0840",
    mode: "Cash",
    amount: 25000,
    amountInWords: "Rupees Twenty-Five Thousand Only",
    date: "28 Mar 2025",
    time: "10:15 IST",
    status: "Cleared",
    student: {
      name: "Rohan Verma",
      rollNo: "APX-2024-ME-058",
      course: "B.Tech - Mechanical Engineering",
      batch: "2024-2028",
      semester: "3rd Semester",
      guardian: "Sunil Verma",
      phone: "+91 97123 45678",
      email: "rohan.verma@apex.edu.in",
    },
    fees: [
      { sno: 1, description: "Tuition Fee Installment 1", code: "LEDGER-TUI-01", billed: 35000, realized: 25000 },
    ],
    paymentDetails: {
      modeFull: "Cash Currency (Till #02 Realized)",
      refNo: "CASH-TILL02-5509",
      bankName: "Vault Cash (Daily Banking Pool)",
      authCode: "VAULT-OK",
      terminalId: "CASH-DESK-02",
    },
    balanceSummary: {
      totalFee: 35000,
      concession: 0,
      previouslyPaid: 0,
      currentRealized: 25000,
      balancePending: 10000,
      dueDate: "10 Apr 2025",
    },
    security: {
      hash: "c33140abfe782910398471203984712039487120938471209384712093847120",
      cashierName: "Rajesh Kumar (Chief Cashier)",
      cashierId: "EMP-FIN-309",
      tillId: "TILL-02",
    },
  },
  {
    id: "4",
    receiptNo: "REC-2025-0839",
    mode: "NEFT",
    amount: 50000,
    amountInWords: "Rupees Fifty Thousand Only",
    date: "28 Mar 2025",
    time: "09:50 IST",
    status: "Cleared",
    student: {
      name: "Sneha Kulkarni",
      rollNo: "APX-2023-CS-088",
      course: "B.Tech - Computer Science & Engineering",
      batch: "2023-2027",
      semester: "5th Semester",
      guardian: "Dhananjay Kulkarni",
      phone: "+91 98450 11223",
      email: "sneha.k@apex.edu.in",
    },
    fees: [
      { sno: 1, description: "Tuition Fee Full Settlement", code: "LEDGER-TUI-01", billed: 45000, realized: 45000 },
      { sno: 2, description: "Cloud Lab Infrastructure", code: "LEDGER-LAB-02", billed: 5000, realized: 5000 },
    ],
    paymentDetails: {
      modeFull: "National Electronic Funds Transfer (NEFT)",
      refNo: "NEFT-N28420194812",
      bankName: "ICICI Bank - CMS Inward",
      authCode: "CMS-NEFT-991",
      terminalId: "BANK-NET-01",
    },
    balanceSummary: {
      totalFee: 50000,
      concession: 0,
      previouslyPaid: 0,
      currentRealized: 50000,
      balancePending: 0,
      dueDate: "Settled",
    },
    security: {
      hash: "d4481290fe372910398471209384712093847120938471209384712093847120",
      cashierName: "Rajesh Kumar (Chief Cashier)",
      cashierId: "EMP-FIN-309",
      tillId: "TILL-02",
    },
  },
  {
    id: "5",
    receiptNo: "REC-2025-0838",
    mode: "POS Card",
    amount: 35000,
    amountInWords: "Rupees Thirty-Five Thousand Only",
    date: "27 Mar 2025",
    time: "16:30 IST",
    status: "Cleared",
    student: {
      name: "Vikramaditya Singh",
      rollNo: "APX-2022-EE-012",
      course: "B.Tech - Electrical Engineering",
      batch: "2022-2026",
      semester: "7th Semester",
      guardian: "Pratap Singh",
      phone: "+91 99887 76655",
      email: "vikram.singh@apex.edu.in",
    },
    fees: [
      { sno: 1, description: "Tuition Fee Tranche 1", code: "LEDGER-TUI-01", billed: 30000, realized: 30000 },
      { sno: 2, description: "Power Electronics Lab", code: "LEDGER-LAB-02", billed: 5000, realized: 5000 },
    ],
    paymentDetails: {
      modeFull: "Debit Card (Pin Verified POS)",
      refNo: "POS-TXN-88291024",
      bankName: "HDFC POS Merchant Terminal #4",
      authCode: "RRN-771290",
      terminalId: "POS-TERM-04",
    },
    balanceSummary: {
      totalFee: 42000,
      concession: 0,
      previouslyPaid: 0,
      currentRealized: 35000,
      balancePending: 7000,
      dueDate: "12 Apr 2025",
    },
    security: {
      hash: "e559103984712093847120938471209384712093847120938471209384712093",
      cashierName: "Rajesh Kumar (Chief Cashier)",
      cashierId: "EMP-FIN-309",
      tillId: "TILL-02",
    },
  },
  {
    id: "6",
    receiptNo: "REC-2025-0837",
    mode: "UPI",
    amount: 50000,
    amountInWords: "Rupees Fifty Thousand Only",
    date: "27 Mar 2025",
    time: "15:45 IST",
    status: "Cleared",
    student: {
      name: "Ananya Iyer",
      rollNo: "APX-2024-BT-005",
      course: "B.Tech - Biotechnology",
      batch: "2024-2028",
      semester: "3rd Semester",
      guardian: "Subramanian Iyer",
      phone: "+91 97654 32109",
      email: "ananya.iyer@apex.edu.in",
    },
    fees: [
      { sno: 1, description: "Tuition Fee Semester III", code: "LEDGER-TUI-01", billed: 45000, realized: 45000 },
      { sno: 2, description: "Biochemistry & Genetics Lab", code: "LEDGER-LAB-02", billed: 5000, realized: 5000 },
    ],
    paymentDetails: {
      modeFull: "UPI / PhonePe Merchant QR",
      refNo: "UPI-REF-902811442019",
      bankName: "Yes Bank Gateway Pool",
      authCode: "AUTH-882109",
      terminalId: "COUNTER-POS-02",
    },
    balanceSummary: {
      totalFee: 50000,
      concession: 0,
      previouslyPaid: 0,
      currentRealized: 50000,
      balancePending: 0,
      dueDate: "Settled",
    },
    security: {
      hash: "f660192830192830192830192830192830192830192830192830192830192830",
      cashierName: "Rajesh Kumar (Chief Cashier)",
      cashierId: "EMP-FIN-309",
      tillId: "TILL-02",
    },
  },
];

export default function AccountantFeeReceiptsPage() {
  const [receipts] = useState<ReceiptRecord[]>(mockReceipts);
  const [selectedReceiptId, setSelectedReceiptId] = useState<string>("1");
  const [filterTab, setFilterTab] = useState<"All" | "Cleared" | "Clearing">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDuplicateStamp, setIsDuplicateStamp] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isVerifyHashModalOpen, setIsVerifyHashModalOpen] = useState(false);
  const [verifyInputHash, setVerifyInputHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<"success" | "fail" | null>(null);
  const [isBatchPrintModalOpen, setIsBatchPrintModalOpen] = useState(false);

  const selectedReceipt = receipts.find((r) => r.id === selectedReceiptId) || receipts[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredReceipts = receipts.filter((r) => {
    const matchesTab =
      filterTab === "All"
        ? true
        : filterTab === "Cleared"
        ? r.status === "Cleared"
        : r.status === "Clearing";
    const matchesSearch =
      r.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleVerifyHash = () => {
    if (!verifyInputHash.trim()) return;
    const found = receipts.some(
      (r) =>
        r.security.hash.toLowerCase().includes(verifyInputHash.trim().toLowerCase()) ||
        r.receiptNo.toLowerCase() === verifyInputHash.trim().toLowerCase()
    );
    setVerifyResult(found ? "success" : "fail");
  };

  const handleExportManifestCSV = () => {
    const csvHeader =
      "Receipt No,Date,Time,Candidate,Roll No,Course,Payment Mode,Reference,Amount (INR),Status\n";
    const csvRows = filteredReceipts
      .map(
        (r) =>
          `"${r.receiptNo}","${r.date}","${r.time}","${r.student.name}","${r.student.rollNo}","${r.student.course}","${r.mode}","${r.paymentDetails.refNo}",${r.amount},"${r.status}"`
      )
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `receipts_manifest_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Receipts manifest exported as CSV!");
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
              <span>Receipts &amp; Counter Vouchers</span>
              <span>/</span>
              <span className="text-[#3D405B] font-bold">Fee Receipts Vault</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#3D405B] tracking-tight">
                  Official Fee Receipts &amp; Voucher Studio 🧾
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  Till #02 Active &bull; Cashier Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Official institutional receipts vault. Generate, inspect, cryptographically verify, and print authenticated fee vouchers.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsBatchPrintModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Batch Print Today</span>
            </button>
            <button
              onClick={handleExportManifestCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Export Manifest</span>
            </button>
            <button
              onClick={() => {
                setVerifyInputHash(selectedReceipt.security.hash.substring(0, 16));
                setVerifyResult(null);
                setIsVerifyHashModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Hash</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Today&apos;s Realized</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              ₹1,77,500
            </div>
            <div className="text-xs text-emerald-600 font-bold mt-1">
              +14.2% vs yesterday
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Till Session</span>
            <span className="font-semibold text-emerald-700">Till #02 Open</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Receipts Stamped</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              6 Vouchers
            </div>
            <div className="text-xs text-blue-700 font-semibold mt-1">
              Series REC-2025
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Audit Status</span>
            <span className="font-semibold text-blue-700">100% In Sync</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Avg Intake / Slip</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              ₹29,583
            </div>
            <div className="text-xs text-purple-700 font-semibold mt-1">
              Median Realization
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Realization Range</span>
            <span className="font-semibold text-slate-700">₹25k - ₹50k</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Clearing (CTS)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-700 tracking-tight font-mono">
              ₹40,000
            </div>
            <div className="text-xs text-amber-800 font-semibold mt-1">
              1 Cheque in Transit
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Bank Clearing</span>
            <span className="font-semibold text-amber-800">CTS-2010 Value Date</span>
          </div>
        </div>
      </div>

      {/* Master Workspace: Two-Column Split (Left 5 Cols / Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Receipt Registry & Filtering (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search Box & Segmented Tabs */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Receipt No, Roll, or Student..."
                className="w-full bg-slate-50 pl-10 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:border-amber-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Segmented Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(["All", "Cleared", "Clearing"] as const).map((tab) => {
                const count =
                  tab === "All"
                    ? receipts.length
                    : tab === "Cleared"
                    ? receipts.filter((r) => r.status === "Cleared").length
                    : receipts.filter((r) => r.status === "Clearing").length;
                const isActive = filterTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setFilterTab(tab)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? "bg-amber-600 text-white shadow-xs font-bold"
                        : "text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Receipt Card List */}
          <div className="space-y-2.5">
            {filteredReceipts.map((receipt) => {
              const isSelected = receipt.id === selectedReceipt.id;
              return (
                <div
                  key={receipt.id}
                  onClick={() => setSelectedReceiptId(receipt.id)}
                  className={`p-4 bg-white rounded-2xl cursor-pointer border transition-all ${
                    isSelected
                      ? "border-amber-600 shadow-sm ring-2 ring-amber-600/20"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-2xs"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600">
                        {receipt.receiptNo}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                          receipt.mode === "UPI"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : receipt.mode === "Cash"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : receipt.mode === "NEFT"
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                            : receipt.mode === "POS Card"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {receipt.mode}
                      </span>
                      {receipt.status === "Clearing" && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-bold text-[9px] rounded-full">
                          CTS IN CLEARING
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs font-bold text-[#3D405B]">
                      ₹{receipt.amount.toLocaleString("en-IN")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#3D405B]">{receipt.student.name}</span>
                    <span className="font-mono text-[11px] text-slate-500">{receipt.student.rollNo}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {receipt.date}, {receipt.time}
                    </span>
                    <span className="font-medium text-slate-600 truncate max-w-[150px]">
                      {receipt.student.course.split(" - ")[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Catalog Pagination Footer */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {filteredReceipts.length} of {receipts.length} vouchers
            </span>
            <div className="flex items-center gap-1 font-semibold">
              <button className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed">
                Prev
              </button>
              <button className="px-2.5 py-1 bg-amber-600 text-white rounded-lg shadow-2xs">
                1
              </button>
              <button className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Master Printable Receipt Document & Studio Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Studio Top Action Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#3D405B]">Inspecting:</span>
              <span className="px-2.5 py-1 bg-slate-100 text-blue-600 font-mono font-bold rounded-lg">
                {selectedReceipt.receiptNo}
              </span>
              <span
                className={`px-2.5 py-0.5 font-bold text-[11px] rounded-full border ${
                  selectedReceipt.status === "Cleared"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {selectedReceipt.status === "Cleared" ? "Cleared & Verified" : "CTS Clearing"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() =>
                  showToast(`Downloading PDF slip for ${selectedReceipt.receiptNo}...`)
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>PDF Slip</span>
              </button>
            </div>
          </div>

          {/* MASTER PRINTABLE RECEIPT CONTAINER */}
          <div
            id="printable-receipt"
            className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#3D405B] text-[#3D405B] shadow-sm relative select-text space-y-5"
          >
            {/* Optional Duplicate Watermark */}
            {isDuplicateStamp && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
                <span className="text-6xl sm:text-7xl font-extrabold uppercase font-mono text-rose-500/15 -rotate-45 border-4 border-rose-500/20 px-8 py-4 rounded-2xl">
                  DUPLICATE VOUCHER
                </span>
              </div>
            )}

            {/* 1. Document Header */}
            <div className="flex items-start gap-4 pb-4 border-b-2 border-slate-200">
              <div className="w-14 h-14 bg-[#3D405B] text-white flex flex-col items-center justify-center font-bold text-xl rounded-2xl shadow-xs shrink-0">
                <span>APX</span>
                <span className="text-[8px] tracking-widest font-normal">INST</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#3D405B]">
                    Apex Institute of Technology &amp; Management
                  </h2>
                  <span className="font-mono text-[9px] uppercase px-2 py-0.5 bg-slate-100 border border-slate-200 font-bold rounded-md">
                    FORM F-04 / REV 2025
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wide leading-tight mt-0.5">
                  Approved by AICTE, New Delhi &bull; State Technological University &bull; NAAC &apos;A+&apos;
                </p>
                <p className="text-[10px] text-slate-400 font-mono leading-tight mt-0.5">
                  Knowledge Park III, Institutional Area, Greater Noida, UP - 201306 | accounts@apexinstitute.edu.in
                </p>
                <div className="mt-2 inline-block px-3 py-1 bg-amber-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-lg">
                  OFFICIAL FEE REALIZATION VOUCHER &amp; COUNTER RECEIPT
                </div>
              </div>
            </div>

            {/* 2. Receipt Meta Coordinates (Bento Strip) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs">
              <div>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Voucher No.</span>
                <span className="font-bold text-blue-600">{selectedReceipt.receiptNo}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Issue Date &amp; Time</span>
                <span className="font-bold text-slate-800">
                  {selectedReceipt.date}, {selectedReceipt.time}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Academic Session</span>
                <span className="font-bold text-slate-800">AY 2025-26 ({selectedReceipt.student.semester})</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Counter &amp; Terminal</span>
                <span className="font-bold text-slate-800">
                  {selectedReceipt.security.tillId} ({selectedReceipt.security.cashierId})
                </span>
              </div>
            </div>

            {/* 3. Student Particulars Card */}
            <div className="border border-slate-200 p-4 rounded-xl bg-white space-y-2">
              <div className="text-[10px] uppercase font-bold text-amber-800 font-mono tracking-wider pb-1 border-b border-slate-100">
                Candidate &amp; Academic Particulars
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Student Name:</span>
                  <span className="font-bold text-[#3D405B] uppercase">{selectedReceipt.student.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Roll / Enrollment No:</span>
                  <span className="font-bold font-mono text-blue-600">{selectedReceipt.student.rollNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Course &amp; Discipline:</span>
                  <span className="font-semibold text-slate-700">{selectedReceipt.student.course}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Academic Batch:</span>
                  <span className="font-mono text-slate-700">{selectedReceipt.student.batch}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Father / Guardian:</span>
                  <span className="text-slate-700">{selectedReceipt.student.guardian}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Registered Contact:</span>
                  <span className="font-mono text-slate-700">{selectedReceipt.student.phone}</span>
                </div>
              </div>
            </div>

            {/* 4. Itemized Fee Assessment & Realization Table */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold text-amber-800 font-mono tracking-wider">
                Itemized Fee Head Assessment &amp; Realization
              </div>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-left font-mono text-[10px] uppercase text-slate-600 border-b border-slate-200">
                      <th className="p-2.5 w-10 text-center">#</th>
                      <th className="p-2.5">Fee Head Description</th>
                      <th className="p-2.5 w-32 font-mono">Ledger Code</th>
                      <th className="p-2.5 w-28 text-right font-mono">Assessed</th>
                      <th className="p-2.5 w-28 text-right font-mono">Realized (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedReceipt.fees.map((f) => (
                      <tr key={f.sno} className="hover:bg-slate-50/60 font-sans">
                        <td className="p-2.5 text-center font-mono text-[11px] text-slate-500">
                          {f.sno}
                        </td>
                        <td className="p-2.5 font-medium text-slate-800">
                          {f.description}
                        </td>
                        <td className="p-2.5 font-mono text-[10px] text-slate-500">
                          {f.code}
                        </td>
                        <td className="p-2.5 text-right font-mono text-slate-600">
                          ₹{f.billed.toLocaleString("en-IN")}.00
                        </td>
                        <td className="p-2.5 text-right font-mono font-bold text-[#3D405B]">
                          ₹{f.realized.toLocaleString("en-IN")}.00
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-300">
                      <td colSpan={4} className="p-2.5 text-right uppercase font-mono text-[11px] text-slate-700">
                        Net Amount Realized This Voucher:
                      </td>
                      <td className="p-2.5 text-right font-mono text-sm text-emerald-700">
                        ₹{selectedReceipt.amount.toLocaleString("en-IN")}.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Amount in words */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="font-mono text-[10px] uppercase text-slate-400 font-bold">In Words:</span>
                <span className="font-bold text-[#3D405B] uppercase font-mono tracking-wide text-[11px]">
                  {selectedReceipt.amountInWords}
                </span>
              </div>
            </div>

            {/* 5. Payment Instrument Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px]">
              <div>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Tender Mode</span>
                <span className="font-bold text-[#3D405B]">{selectedReceipt.paymentDetails.modeFull}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Bank / UTR / Chq Ref</span>
                <span className="font-bold text-blue-600">{selectedReceipt.paymentDetails.refNo}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Gateway Pool</span>
                <span className="font-medium text-slate-700">{selectedReceipt.paymentDetails.bankName}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Auth Code</span>
                <span className="font-bold text-emerald-700">{selectedReceipt.paymentDetails.authCode}</span>
              </div>
            </div>

            {/* 6. Financial Balance Summary */}
            <div className="grid grid-cols-5 gap-2 p-3 bg-[#3D405B] text-white rounded-xl text-center font-mono text-xs">
              <div className="border-r border-white/10 px-1">
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Total Assessed</span>
                <span className="font-bold">₹{selectedReceipt.balanceSummary.totalFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-r border-white/10 px-1">
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Concession</span>
                <span className="font-bold">-₹{selectedReceipt.balanceSummary.concession.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-r border-white/10 px-1">
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Previously Paid</span>
                <span className="font-bold">₹{selectedReceipt.balanceSummary.previouslyPaid.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-r border-white/10 px-1 bg-white/10 rounded-lg">
                <span className="text-[9px] uppercase text-amber-300 block font-bold">This Voucher</span>
                <span className="font-bold text-amber-300">₹{selectedReceipt.balanceSummary.currentRealized.toLocaleString("en-IN")}</span>
              </div>
              <div className="px-1">
                <span className="text-[9px] uppercase text-slate-400 block font-bold">Pending Dues</span>
                <span className="font-bold text-rose-300">₹{selectedReceipt.balanceSummary.balancePending.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* 7. Security Hash & Cashier Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-3 border-t border-slate-200">
              <div className="md:col-span-7 flex items-center gap-3">
                <div className="w-16 h-16 border-2 border-[#3D405B] rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                  <div className="grid grid-cols-4 gap-0.5 w-full h-full p-0.5">
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-white"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                    <div className="bg-[#3D405B] rounded-xs"></div>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">
                    Cryptographic Ledger Hash (SHA-256)
                  </span>
                  <span className="font-mono text-[9px] text-slate-700 break-all select-all leading-tight block">
                    {selectedReceipt.security.hash}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-700 font-bold flex items-center gap-1 pt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED BY CENTRAL BURSAR NODE #02
                  </span>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-end gap-3 text-right">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-28 border-b border-dashed border-slate-300 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-sm text-[#3D405B] tracking-wider">
                      R. Kumar
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase text-[#3D405B] mt-1">
                    Chief Cashier
                  </span>
                  <span className="text-[8px] font-mono text-slate-400">
                    {selectedReceipt.security.cashierName}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-12 w-14 border border-[#3D405B]/30 rounded-lg text-[#3D405B] flex flex-col items-center justify-center p-0.5 text-center">
                    <span className="text-[6px] font-mono uppercase font-bold">SEAL OF BURSAR</span>
                    <span className="text-[8px] font-bold">APEX</span>
                    <span className="text-[6px] font-mono">ACCOUNTS</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-400 mt-1">Official Stamp</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[9px] text-slate-400 font-mono text-center">
              This is an official computer-generated institutional receipt issued under Apex Institute Financial Regulations. Cheque / DD receipts are valid subject to CTS clearing.
            </div>
          </div>

          {/* Action Bar Beneath Master Receipt */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  showToast(
                    `Receipt ${selectedReceipt.receiptNo} emailed to ${selectedReceipt.student.email} & Parent`
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>Email to Student &amp; Parent</span>
              </button>

              <button
                onClick={() =>
                  showToast(
                    `SMS notification dispatched to mobile: ${selectedReceipt.student.phone}`
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Send SMS Alert</span>
              </button>
            </div>

            <button
              onClick={() => {
                setIsDuplicateStamp(!isDuplicateStamp);
                showToast(
                  isDuplicateStamp
                    ? "Duplicate stamp removed from voucher."
                    : "Duplicate voucher watermark applied."
                );
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                isDuplicateStamp
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{isDuplicateStamp ? "Remove Duplicate Stamp" : "Apply Duplicate Stamp"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verify Hash Modal */}
      {isVerifyHashModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">
                    Cryptographic Voucher Verification
                  </h3>
                  <span className="text-xs text-slate-500">
                    Bursar Central Ledger Cross-Check
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsVerifyHashModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Enter any SHA-256 voucher fingerprint hash or Receipt Number to cross-validate against the central institutional ledger.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3D405B]">
                Ledger Hash or Receipt No:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verifyInputHash}
                  onChange={(e) => setVerifyInputHash(e.target.value)}
                  placeholder="Paste SHA-256 hash or REC-2025-XXXX..."
                  className="flex-1 bg-slate-50 p-2.5 text-xs font-mono border border-slate-200 rounded-xl focus:border-amber-600 focus:outline-none"
                />
                <button
                  onClick={handleVerifyHash}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Verify
                </button>
              </div>
            </div>

            {verifyResult === "success" && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">MATCH CONFIRMED &amp; AUTHENTICATED</div>
                  <div className="text-[11px] mt-0.5">
                    This hash corresponds to genuine voucher <strong>{selectedReceipt.receiptNo}</strong> issued to {selectedReceipt.student.name} on {selectedReceipt.date}. Central ledger state: UNMODIFIED.
                  </div>
                </div>
              </div>
            )}

            {verifyResult === "fail" && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-xl flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">HASH MISMATCH / UNVERIFIED RECORD</div>
                  <div className="text-[11px] mt-0.5">
                    The entered hash does not match any sealed receipt record in the bursar registry. Possibility of tampering or invalid reference.
                  </div>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsVerifyHashModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Print Modal */}
      {isBatchPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Printer className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">
                    Batch Print Counter Vouchers
                  </h3>
                  <span className="text-xs text-slate-500">
                    Day-End Cashier Spooler
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBatchPrintModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Till:</span>
                  <span className="font-bold text-[#3D405B]">TILL-02 (CASHIER-309)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date Range:</span>
                  <span className="font-semibold text-slate-700">Today (28 Mar 2025)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Vouchers:</span>
                  <span className="font-bold text-blue-600">6 Receipts</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
                  <span className="text-slate-600">Gross Realization:</span>
                  <span className="text-emerald-700 font-mono">₹1,77,500.00</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-600 rounded" />
                  <span>Include Day-End Cashier Settlement Sheet</span>
                </label>

                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber-600 rounded" />
                  <span>Print 2 Vouchers Per A4 Page (Eco Mode)</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsBatchPrintModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBatchPrintModalOpen(false);
                  showToast("Spooling 6 vouchers to thermal / network printer...");
                  setTimeout(() => window.print(), 300);
                }}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Send to Printer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
