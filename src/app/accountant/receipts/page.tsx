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
  Banknote,
  Send,
  Eye,
  Check,
  Share2,
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
      cashierName: "Praveen Sharma, FCA",
      cashierId: "CASHIER-409",
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
      cashierName: "Praveen Sharma, FCA",
      cashierId: "CASHIER-409",
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
      cashierName: "Praveen Sharma, FCA",
      cashierId: "CASHIER-409",
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
      cashierName: "Praveen Sharma, FCA",
      cashierId: "CASHIER-409",
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
      cashierName: "Praveen Sharma, FCA",
      cashierId: "CASHIER-409",
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
      cashierName: "Praveen Sharma, FCA",
      cashierId: "CASHIER-409",
      tillId: "TILL-02",
    },
  },
];

export default function AccountantFeeReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptRecord[]>(mockReceipts);
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

  return (
    <div className="flex flex-col w-full pb-16 font-body text-on-surface">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary px-4 py-3 shadow-lg flex items-center gap-2 border border-secondary font-mono text-xs animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-4 h-4 text-secondary-container" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Command Header & Financial Breadcrumb */}
      <div className="bg-surface-container-lowest p-4 mb-4 shadow-xs border border-[#d5e3fc]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-mono text-[11px] text-secondary uppercase tracking-wider mb-1">
              <span>Accounts &amp; Bursar Portal</span>
              <span className="text-outline-variant">/</span>
              <span>Receipts &amp; Counter Vouchers</span>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">Fee Receipts Vault</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold font-headline text-primary tracking-tight">
                Official Fee Receipts &amp; Voucher Studio
              </h1>
              <span className="px-2 py-0.5 bg-secondary-container text-primary font-mono text-[11px] font-bold border border-[#a8c4f0]">
                TILL #02 ACTIVE
              </span>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsBatchPrintModalOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs uppercase tracking-wider transition-colors border border-[#cbd5e1] font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-secondary" />
              <span>Batch Print Today's Vouchers</span>
            </button>
            <button
              onClick={() => showToast("Downloading Manifest PDF for 6 Today's Vouchers...")}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs uppercase tracking-wider transition-colors border border-[#cbd5e1] font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-secondary" />
              <span>Export Manifest (PDF)</span>
            </button>
            <button
              onClick={() => {
                setVerifyInputHash(selectedReceipt.security.hash.substring(0, 16));
                setVerifyResult(null);
                setIsVerifyHashModalOpen(true);
              }}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary hover:bg-primary/95 font-mono text-xs uppercase tracking-wider transition-colors font-bold shadow-xs cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Receipt Hash</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operational Telemetry Bar (4 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-surface-container-lowest p-3 flex items-center justify-between border border-[#d5e3fc] shadow-xs">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
              Today's Realized
            </span>
            <span className="text-xl font-bold font-mono text-primary">₹1,77,500</span>
          </div>
          <div className="p-2 bg-surface-container text-secondary">
            <Banknote className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3 flex items-center justify-between border border-[#d5e3fc] shadow-xs">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
              Receipts Stamped
            </span>
            <span className="text-xl font-bold font-mono text-primary">6 Vouchers</span>
          </div>
          <div className="p-2 bg-surface-container text-secondary">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3 flex items-center justify-between border border-[#d5e3fc] shadow-xs">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
              Avg Realization / Slip
            </span>
            <span className="text-xl font-bold font-mono text-primary">₹29,583</span>
          </div>
          <div className="p-2 bg-surface-container text-secondary">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3 flex items-center justify-between border border-[#d5e3fc] shadow-xs">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
              Pending Clearing (CTS)
            </span>
            <span className="text-xl font-bold font-mono text-error">₹40,000 (1 Chq)</span>
          </div>
          <div className="p-2 bg-surface-container text-error">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Master Workspace: Two-Column Split (Catalog Left 42% / Master Document Right 58%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: Receipt Registry & Filtering (5 Cols / 42%) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Search Box */}
          <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex flex-col gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Receipt No, Roll, or Student..."
                className="w-full bg-surface-container-low pl-9 pr-3 py-2 text-xs border border-[#cbd5e1] focus:border-secondary focus:outline-none font-mono"
              />
            </div>

            {/* Segmented Filter Tabs */}
            <div className="flex items-center gap-1 border-b border-[#cbd5e1] pt-1">
              {(["All", "Cleared", "Clearing"] as const).map((tab) => {
                const count =
                  tab === "All"
                    ? receipts.length
                    : tab === "Cleared"
                    ? receipts.filter((r) => r.status === "Cleared").length
                    : receipts.filter((r) => r.status === "Clearing").length;
                return (
                  <button
                    key={tab}
                    onClick={() => setFilterTab(tab)}
                    className={`flex-1 py-1.5 text-[11px] font-mono uppercase font-bold tracking-wider transition-colors border-b-2 -mb-[2px] ${
                      filterTab === tab
                        ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                        : "border-transparent text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* High Density Receipt Items List */}
          <div className="flex flex-col gap-2">
            {filteredReceipts.map((receipt) => {
              const isSelected = receipt.id === selectedReceipt.id;
              return (
                <div
                  key={receipt.id}
                  onClick={() => setSelectedReceiptId(receipt.id)}
                  className={`p-3 bg-surface-container-lowest shadow-xs cursor-pointer border transition-all ${
                    isSelected
                      ? "border-primary bg-surface-container-lowest shadow-md border-l-4 border-l-primary"
                      : "border-[#d5e3fc] hover:border-secondary hover:bg-surface-container-low"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        {receipt.receiptNo}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 font-mono text-[10px] uppercase font-bold tracking-wider ${
                          receipt.mode === "UPI"
                            ? "bg-secondary-container text-primary"
                            : receipt.mode === "Cash"
                            ? "bg-emerald-100 text-emerald-800"
                            : receipt.mode === "NEFT"
                            ? "bg-indigo-100 text-indigo-800"
                            : receipt.mode === "POS Card"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {receipt.mode}
                      </span>
                      {receipt.status === "Clearing" && (
                        <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 font-mono text-[9px] uppercase font-bold">
                          CTS IN CLEARING
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs font-bold text-primary">
                      ₹{receipt.amount.toLocaleString("en-IN")}.00
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-on-surface-variant mb-2">
                    <span className="font-semibold text-on-surface">{receipt.student.name}</span>
                    <span className="font-mono text-[11px]">{receipt.student.rollNo}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#e2e8f0] text-on-surface-variant font-mono text-[10px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-secondary" />
                      {receipt.date}, {receipt.time}
                    </span>
                    <span className="text-secondary font-semibold">
                      {receipt.student.course.split(" - ")[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Catalog Pagination */}
          <div className="bg-surface-container-lowest p-2 border border-[#d5e3fc] flex items-center justify-between text-xs font-mono">
            <span className="text-on-surface-variant text-[11px]">
              Showing 1-6 of 1,842 receipts
            </span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-0.5 border border-[#cbd5e1] text-[10px] font-bold uppercase hover:bg-surface-container">
                Prev
              </button>
              <button className="px-2 py-0.5 bg-primary text-on-primary text-[10px] font-bold">
                1
              </button>
              <button className="px-2 py-0.5 border border-[#cbd5e1] text-[10px] font-bold uppercase hover:bg-surface-container">
                2
              </button>
              <button className="px-2 py-0.5 border border-[#cbd5e1] text-[10px] font-bold uppercase hover:bg-surface-container">
                3
              </button>
              <button className="px-2 py-0.5 border border-[#cbd5e1] text-[10px] font-bold uppercase hover:bg-surface-container">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Master Printable Receipt Document & Studio Controls (7 Cols / 58%) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Studio Top Action Bar */}
          <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="font-bold text-primary">Inspecting Voucher:</span>
              <span className="px-2 py-0.5 bg-surface-container text-primary font-bold border border-[#cbd5e1]">
                {selectedReceipt.receiptNo}
              </span>
              <span
                className={`px-2 py-0.5 font-bold text-[10px] uppercase ${
                  selectedReceipt.status === "Cleared"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {selectedReceipt.status === "Cleared" ? "STATUS: CLEARED" : "STATUS: CLEARING"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1 px-3 py-1.5 bg-primary text-on-primary hover:bg-primary/90 text-xs font-mono uppercase font-bold tracking-wider shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Receipt</span>
              </button>
              <button
                onClick={() =>
                  showToast(`Downloading PDF for ${selectedReceipt.receiptNo}...`)
                }
                className="flex items-center gap-1 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-mono uppercase font-bold tracking-wider border border-[#cbd5e1] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-secondary" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* MASTER PRINTABLE RECEIPT CONTAINER (Institutional Brutalist Layout) */}
          <div
            id="printable-receipt"
            className="bg-white p-6 border-2 border-primary text-[#001028] shadow-md relative select-text"
          >
            {/* Optional Duplicate Watermark */}
            {isDuplicateStamp && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
                <span className="text-7xl font-extrabold uppercase font-mono text-error/15 -rotate-45 border-4 border-error/20 px-8 py-4">
                  DUPLICATE VOUCHER
                </span>
              </div>
            )}

            {/* 1. Institutional Document Header */}
            <div className="flex items-start gap-4 pb-4 border-b-2 border-primary mb-4">
              <div className="w-14 h-14 bg-primary text-white flex flex-col items-center justify-center font-bold font-serif text-xl border border-primary shrink-0">
                <span>APX</span>
                <span className="text-[8px] font-mono tracking-widest font-normal">INST</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold uppercase tracking-tight text-primary font-headline">
                    Apex Institute of Technology &amp; Management
                  </h2>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 bg-gray-100 border border-gray-300 font-bold">
                    FORM F-04 / REV 2025
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 uppercase font-sans tracking-wide leading-tight mt-0.5">
                  Approved by AICTE, New Delhi &bull; Affiliated to State Technological University &bull; Accredited NAAC 'A+'
                </p>
                <p className="text-[10px] text-gray-500 font-mono leading-tight mt-0.5">
                  Knowledge Park III, Institutional Area, Greater Noida, UP - 201306 | accounts@apexinstitute.edu.in
                </p>
                <div className="mt-2 inline-block px-2.5 py-0.5 bg-primary text-white font-mono text-[10px] font-bold uppercase tracking-widest">
                  OFFICIAL FEE REALIZATION VOUCHER &amp; COUNTER RECEIPT
                </div>
              </div>
            </div>

            {/* 2. Receipt Meta Coordinates (Bento Strip) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 bg-gray-50 border border-gray-300 mb-4 font-mono text-xs">
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Voucher No.</span>
                <span className="font-bold text-primary">{selectedReceipt.receiptNo}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Issue Date &amp; Time</span>
                <span className="font-bold text-primary">
                  {selectedReceipt.date}, {selectedReceipt.time}
                </span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Academic Session</span>
                <span className="font-bold text-primary">AY 2025-26 (Sem {selectedReceipt.student.semester.split(" ")[0]})</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Counter &amp; Terminal</span>
                <span className="font-bold text-primary">
                  {selectedReceipt.security.tillId} ({selectedReceipt.security.cashierId})
                </span>
              </div>
            </div>

            {/* 3. Student Particulars Card */}
            <div className="border border-gray-300 p-3 mb-4 bg-white">
              <div className="text-[10px] uppercase font-bold text-secondary font-mono tracking-wider mb-2 border-b border-gray-200 pb-1">
                Candidate &amp; Academic Particulars
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 text-[10px] block font-mono">Student Name:</span>
                  <span className="font-bold text-primary uppercase">{selectedReceipt.student.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] block font-mono">Roll / Enrollment No:</span>
                  <span className="font-bold font-mono text-primary">{selectedReceipt.student.rollNo}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] block font-mono">Course &amp; Discipline:</span>
                  <span className="font-semibold">{selectedReceipt.student.course}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] block font-mono">Academic Batch:</span>
                  <span className="font-mono">{selectedReceipt.student.batch} ({selectedReceipt.student.semester})</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] block font-mono">Father / Guardian:</span>
                  <span>{selectedReceipt.student.guardian}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] block font-mono">Registered Contact:</span>
                  <span className="font-mono">{selectedReceipt.student.phone}</span>
                </div>
              </div>
            </div>

            {/* 4. Itemized Fee Assessment & Realization Table */}
            <div className="mb-4">
              <div className="text-[10px] uppercase font-bold text-secondary font-mono tracking-wider mb-1">
                Itemized Fee Head Assessment &amp; Realization
              </div>
              <table className="w-full text-xs border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left font-mono text-[10px] uppercase text-gray-700 border-b border-gray-300">
                    <th className="p-2 border-r border-gray-300 w-10 text-center">#</th>
                    <th className="p-2 border-r border-gray-300">Fee Head Description</th>
                    <th className="p-2 border-r border-gray-300 w-32 font-mono">Ledger Code</th>
                    <th className="p-2 border-r border-gray-300 w-28 text-right font-mono">Assessed</th>
                    <th className="p-2 w-28 text-right font-mono">Realized (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedReceipt.fees.map((f) => (
                    <tr key={f.sno} className="hover:bg-gray-50 font-sans">
                      <td className="p-2 border-r border-gray-300 text-center font-mono text-[11px] text-gray-600">
                        {f.sno}
                      </td>
                      <td className="p-2 border-r border-gray-300 font-medium">
                        {f.description}
                      </td>
                      <td className="p-2 border-r border-gray-300 font-mono text-[10px] text-gray-600">
                        {f.code}
                      </td>
                      <td className="p-2 border-r border-gray-300 text-right font-mono text-gray-600">
                        ₹{f.billed.toLocaleString("en-IN")}.00
                      </td>
                      <td className="p-2 text-right font-mono font-bold text-primary">
                        ₹{f.realized.toLocaleString("en-IN")}.00
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold border-t-2 border-primary">
                    <td colSpan={4} className="p-2 text-right uppercase font-mono text-[11px]">
                      Net Amount Realized This Voucher:
                    </td>
                    <td className="p-2 text-right font-mono text-sm text-primary">
                      ₹{selectedReceipt.amount.toLocaleString("en-IN")}.00
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Amount in words */}
              <div className="mt-1.5 p-2 bg-gray-50 border border-gray-300 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] uppercase text-gray-500">In Words:</span>
                <span className="font-bold text-primary uppercase font-mono tracking-wide text-[11px]">
                  {selectedReceipt.amountInWords}
                </span>
              </div>
            </div>

            {/* 5. Payment Instrument & Gateway Verification Matrix */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2.5 bg-gray-50 border border-gray-300 mb-4 font-mono text-[11px]">
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Tender Mode</span>
                <span className="font-bold text-primary">{selectedReceipt.paymentDetails.modeFull}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Bank / UTR / Chq Ref</span>
                <span className="font-bold text-primary">{selectedReceipt.paymentDetails.refNo}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Bank / Gateway Pool</span>
                <span className="font-medium text-gray-700">{selectedReceipt.paymentDetails.bankName}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-gray-500 block">Clearing / Auth Code</span>
                <span className="font-bold text-emerald-700">{selectedReceipt.paymentDetails.authCode}</span>
              </div>
            </div>

            {/* 6. Cumulative Financial Balance Summary */}
            <div className="grid grid-cols-5 gap-2 p-2 bg-primary text-white mb-4 text-center font-mono text-xs">
              <div className="border-r border-white/20 px-1">
                <span className="text-[9px] uppercase text-gray-300 block">Total Assessed</span>
                <span className="font-bold">₹{selectedReceipt.balanceSummary.totalFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-r border-white/20 px-1">
                <span className="text-[9px] uppercase text-gray-300 block">Concession</span>
                <span className="font-bold">-₹{selectedReceipt.balanceSummary.concession.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-r border-white/20 px-1">
                <span className="text-[9px] uppercase text-gray-300 block">Previously Paid</span>
                <span className="font-bold">₹{selectedReceipt.balanceSummary.previouslyPaid.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-r border-white/20 px-1 bg-white/10">
                <span className="text-[9px] uppercase text-secondary-container block font-bold">This Voucher</span>
                <span className="font-bold text-amber-300">₹{selectedReceipt.balanceSummary.currentRealized.toLocaleString("en-IN")}</span>
              </div>
              <div className="px-1">
                <span className="text-[9px] uppercase text-gray-300 block">Pending Dues</span>
                <span className="font-bold text-rose-300">₹{selectedReceipt.balanceSummary.balancePending.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* 7. Security Hash, Dynamic QR Code, and Bursar Execution Stamps */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end pt-2 border-t border-gray-300">
              {/* Left QR & SHA256 */}
              <div className="md:col-span-7 flex items-center gap-3">
                <div className="w-16 h-16 border-2 border-primary bg-white p-1 flex items-center justify-center shrink-0">
                  {/* Vector simulated QR Code */}
                  <div className="grid grid-cols-4 gap-0.5 w-full h-full p-0.5">
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-white"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-white"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-white"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-white"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-white"></div>
                    <div className="bg-primary rounded-none"></div>
                    <div className="bg-primary rounded-none"></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-gray-500 uppercase font-semibold">
                    Cryptographic Ledger Fingerprint (SHA-256)
                  </span>
                  <span className="font-mono text-[9px] text-gray-700 break-all select-all leading-tight">
                    {selectedReceipt.security.hash}
                  </span>
                  <span className="text-[8px] font-mono text-emerald-700 font-bold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED BY CENTRAL BURSAR NODE #02
                  </span>
                </div>
              </div>

              {/* Right: Cashier Signature Block */}
              <div className="md:col-span-5 flex justify-end gap-3 text-right">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-28 border-b border-dashed border-gray-400 flex items-end justify-center pb-1">
                    <span className="font-serif italic text-sm text-primary tracking-wider">
                      P. Sharma
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold uppercase text-primary mt-0.5">
                    Authorized Cashier
                  </span>
                  <span className="text-[8px] font-mono text-gray-500">
                    {selectedReceipt.security.cashierName}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="h-12 w-14 border border-primary/40 text-primary flex flex-col items-center justify-center p-0.5 text-center">
                    <span className="text-[6px] font-mono uppercase font-bold">SEAL OF BURSAR</span>
                    <span className="text-[8px] font-bold">APEX</span>
                    <span className="text-[6px] font-mono">ACCOUNTS</span>
                  </div>
                  <span className="text-[8px] font-mono text-gray-500 mt-0.5">Official Stamp</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 pt-2 border-t border-gray-200 text-[8px] text-gray-400 font-mono text-center">
              This is a computer-generated institutional receipt issued under Apex Institute Financial Ordinance Rule §12. Cheque / DD receipts are valid subject to CTS clearing realization. Dues must be settled within the grace window to prevent academic examination barring.
            </div>
          </div>

          {/* Action Bar Beneath Master Receipt Voucher */}
          <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  showToast(
                    `Receipt ${selectedReceipt.receiptNo} emailed to ${selectedReceipt.student.email} & Guardian`
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-mono text-xs uppercase tracking-wider font-semibold border border-[#cbd5e1] cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-secondary" />
                <span>Email to Student &amp; Guardian</span>
              </button>

              <button
                onClick={() =>
                  showToast(
                    `SMS notification dispatched to registered mobile: ${selectedReceipt.student.phone}`
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-mono text-xs uppercase tracking-wider font-semibold border border-[#cbd5e1] cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-secondary" />
                <span>Send SMS Acknowledgement</span>
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
              className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider font-bold border transition-colors cursor-pointer ${
                isDuplicateStamp
                  ? "bg-error text-on-error border-error"
                  : "bg-surface-container-highest text-primary border-[#cbd5e1] hover:bg-surface-container-high"
              }`}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{isDuplicateStamp ? "Remove Duplicate Stamp" : "Duplicate Voucher Stamp"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Verify Hash Modal */}
      {isVerifyHashModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-primary w-full max-w-lg p-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#d5e3fc] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-base text-primary uppercase tracking-tight">
                  Cryptographic Voucher Verification
                </h3>
              </div>
              <button
                onClick={() => setIsVerifyHashModalOpen(false)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-on-surface-variant font-mono mb-3">
              Enter any SHA-256 voucher fingerprint hash or Receipt Number to cross-validate against the central institutional ledger.
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[11px] font-mono uppercase font-bold text-secondary">
                Ledger Hash or Receipt No:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verifyInputHash}
                  onChange={(e) => setVerifyInputHash(e.target.value)}
                  placeholder="Paste SHA-256 hash or REC-2025-XXXX..."
                  className="flex-1 bg-surface-container-low p-2 text-xs font-mono border border-[#cbd5e1] focus:border-secondary focus:outline-none"
                />
                <button
                  onClick={handleVerifyHash}
                  className="px-4 py-2 bg-primary text-on-primary font-mono text-xs font-bold uppercase cursor-pointer"
                >
                  Verify
                </button>
              </div>
            </div>

            {verifyResult === "success" && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold uppercase">MATCH CONFIRMED &amp; AUTHENTICATED</div>
                  <div>
                    This hash corresponds to genuine voucher <strong>{selectedReceipt.receiptNo}</strong> issued to {selectedReceipt.student.name} on {selectedReceipt.date}. Central ledger state: UNMODIFIED.
                  </div>
                </div>
              </div>
            )}

            {verifyResult === "fail" && (
              <div className="p-3 bg-rose-50 border border-rose-300 text-rose-900 text-xs font-mono flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold uppercase">HASH MISMATCH / UNVERIFIED RECORD</div>
                  <div>
                    The entered hash does not match any sealed receipt record in the bursar registry. Possibility of tampering or invalid reference.
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-[#d5e3fc] flex justify-end">
              <button
                onClick={() => setIsVerifyHashModalOpen(false)}
                className="px-4 py-1.5 bg-surface-container text-on-surface font-mono text-xs uppercase font-bold hover:bg-surface-container-high cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Print Modal */}
      {isBatchPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-primary w-full max-w-md p-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#d5e3fc] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-base text-primary uppercase tracking-tight">
                  Batch Print Counter Vouchers
                </h3>
              </div>
              <button
                onClick={() => setIsBatchPrintModalOpen(false)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs font-mono mb-4">
              <div className="p-2.5 bg-surface-container-low border border-[#cbd5e1]">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Selected Till:</span>
                  <span className="font-bold text-primary">TILL-02 (CASHIER-409)</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Date Range:</span>
                  <span className="font-bold text-primary">Today (28 Mar 2025)</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Total Vouchers:</span>
                  <span className="font-bold text-primary">6 Receipts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Gross Realization:</span>
                  <span className="font-bold text-primary">₹1,77,500.00</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-on-surface">
                <input type="checkbox" id="includeAuditSummary" defaultChecked className="rounded-none" />
                <label htmlFor="includeAuditSummary" className="text-[11px] cursor-pointer">
                  Include Day-End Cashier Settlement Sheet
                </label>
              </div>

              <div className="flex items-center gap-2 text-on-surface">
                <input type="checkbox" id="twoPerPage" defaultChecked className="rounded-none" />
                <label htmlFor="twoPerPage" className="text-[11px] cursor-pointer">
                  Print 2 Vouchers Per A4 Page (Institutional Eco Mode)
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setIsBatchPrintModalOpen(false)}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-mono text-xs uppercase font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBatchPrintModalOpen(false);
                  showToast("Spooling 6 vouchers to thermal / network printer...");
                  setTimeout(() => window.print(), 300);
                }}
                className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary/95 font-mono text-xs uppercase font-bold tracking-wider cursor-pointer shadow-xs"
              >
                Send to Printer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

