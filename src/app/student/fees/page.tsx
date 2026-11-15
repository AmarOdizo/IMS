"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Download,
  Printer,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  HelpCircle,
  Search,
  Check,
  X,
  FileText,
  ShieldCheck,
  Building,
  ArrowRight
} from "lucide-react";

interface ReceiptVoucher {
  receiptNo: string;
  clearedDate: string;
  studentName: string;
  rollNo: string;
  program: string;
  semester: string;
  method: string;
  bankBranch: string;
  reference: string;
  items: { head: string; amount: string }[];
  subtotal: string;
}

export default function StudentFeesPage() {
  const [activeReceiptId, setActiveReceiptId] = useState("REC-2024-5120");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPayModal, setShowPayModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Payment Form State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UPI");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const receiptsData: Record<string, ReceiptVoucher> = {
    "REC-2024-5120": {
      receiptNo: "REC-2024-5120",
      clearedDate: "14 Nov 2024",
      studentName: "Rahul Sharma",
      rollNo: "23CS042",
      program: "B.Tech Computer Science & Engineering",
      semester: "Semester IV (Even Term 2024–25)",
      method: "Online NetBanking (HDFC Bank)",
      bankBranch: "Apex Campus NetGateway",
      reference: "TXN-88419204",
      items: [
        { head: "Tuition Fee (Semester IV)", amount: "₹32,000.00" },
        { head: "Computing & Lab Infrastructure", amount: "₹5,000.00" },
        { head: "Digital Library & Learning Resources", amount: "₹1,500.00" },
        { head: "Semester Examination Fee", amount: "₹1,500.00" },
      ],
      subtotal: "₹40,000.00",
    },
    "REC-2024-2104": {
      receiptNo: "REC-2024-2104",
      clearedDate: "22 Jul 2024",
      studentName: "Rahul Sharma",
      rollNo: "23CS042",
      program: "B.Tech Computer Science & Engineering",
      semester: "Semester III (Odd Term 2024–25)",
      method: "Online NEFT Transfer",
      bankBranch: "State Bank of India (SBI)",
      reference: "UTR-SBIN24072201",
      items: [
        { head: "Tuition Fee (Semester III)", amount: "₹35,000.00" },
        { head: "Annual Laboratory & Tech Levy", amount: "₹6,500.00" },
        { head: "Student Activity & Sports Council", amount: "₹2,000.00" },
        { head: "Medical Group Insurance", amount: "₹1,500.00" },
      ],
      subtotal: "₹45,000.00",
    },
    "REC-2024-0842": {
      receiptNo: "REC-2024-0842",
      clearedDate: "10 Jan 2024",
      studentName: "Rahul Sharma",
      rollNo: "23CS042",
      program: "B.Tech Computer Science & Engineering",
      semester: "Semester II (Even Term 2023–24)",
      method: "Bank Demand Draft",
      bankBranch: "HDFC Bank, K.G. Marg Branch",
      reference: "DD #098412",
      items: [
        { head: "Tuition Fee (Semester II)", amount: "₹35,000.00" },
        { head: "Lab Consumables & Systems Access", amount: "₹5,000.00" },
      ],
      subtotal: "₹40,000.00",
    },
    "REC-2023-0199": {
      receiptNo: "REC-2023-0199",
      clearedDate: "05 Aug 2023",
      studentName: "Rahul Sharma",
      rollNo: "23CS042",
      program: "B.Tech Computer Science & Engineering",
      semester: "Semester I (Admission 2023–24)",
      method: "Online Gateway",
      bankBranch: "ICICI Payment Portal",
      reference: "PAY-2023-99120",
      items: [
        { head: "One-Time Admission & Registration Fee", amount: "₹15,000.00" },
        { head: "Tuition Fee (Semester I)", amount: "₹35,000.00" },
        { head: "Refundable Caution Security Deposit", amount: "₹5,000.00" },
      ],
      subtotal: "₹55,000.00",
    },
  };

  const currentVoucher =
    receiptsData[activeReceiptId] || receiptsData["REC-2024-5120"];

  const ledgerList = [
    {
      date: "14 Nov 2024",
      receiptNo: "REC-2024-5120",
      head: "Semester IV Regular Fee",
      subHead: "Tuition + Lab + Exam",
      mode: "Online NetBanking",
      ref: "TXN-88419204",
      amount: "₹40,000.00",
      status: "Paid",
    },
    {
      date: "22 Jul 2024",
      receiptNo: "REC-2024-2104",
      head: "Semester III Regular Fee",
      subHead: "Tuition + Annual Tech Fee",
      mode: "NEFT Wire Transfer",
      ref: "UTR-SBIN24072201",
      amount: "₹45,000.00",
      status: "Paid",
    },
    {
      date: "10 Jan 2024",
      receiptNo: "REC-2024-0842",
      head: "Semester II Regular Fee",
      subHead: "Tuition + Lab Fee",
      mode: "Demand Draft",
      ref: "DD #098412",
      amount: "₹40,000.00",
      status: "Paid",
    },
    {
      date: "05 Aug 2023",
      receiptNo: "REC-2023-0199",
      head: "Admission & Semester I",
      subHead: "Registration + Tuition",
      mode: "Online Gateway",
      ref: "PAY-2023-99120",
      amount: "₹55,000.00",
      status: "Paid",
    },
  ];

  const filteredLedger = ledgerList.filter(
    (item) =>
      item.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.head.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ref.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Fees &amp; Receipts
            </h1>
            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold rounded-full">
              ₹25,000 Due
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Academic Year 2024–25 &bull; Rahul Sharma (23CS042)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => triggerToast("Generating complete fee statement (PDF)...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Statement</span>
          </button>

          <button
            onClick={() => setShowPayModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay Due Fee (₹25,000)</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Course Fee */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Annual Course Fee</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#3D405B] flex items-center justify-center shrink-0">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#3D405B] font-mono">₹1,10,000</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Tuition, Lab &amp; Assessment (AY 2024–25)
            </span>
          </div>
        </div>

        {/* Card 2: Total Paid to Date */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Paid</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600 font-mono">₹85,000</span>
              <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                77.3% Paid
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "77.3%" }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              2 of 3 installments cleared
            </span>
          </div>
        </div>

        {/* Card 3: Pending Balance Due */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Due Fee</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-600 font-mono">₹25,000</span>
              <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Installment 3
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="flex items-center justify-between mt-1 text-[11px]">
              <span className="text-slate-500">Due: May 02, 2025</span>
              <button
                onClick={() => setShowPayModal(true)}
                className="text-[#355C7D] font-bold hover:underline cursor-pointer"
              >
                Pay Now &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Card 4: Scholarship / Concession */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Scholarship / Waiver</span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-violet-700 font-mono">₹15,000</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Academic Merit Concession (15% applied)
            </span>
          </div>
        </div>
      </div>

      {/* Installment Disbursement Pipeline */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
          <div>
            <h2 className="text-sm font-bold text-[#3D405B]">
              Installment Schedule &bull; AY 2024–25
            </h2>
            <p className="text-[11px] text-slate-400">
              Semester fee distribution and settlement schedule
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            3 Equal Installments
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Installment 1 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  Installment 01 / 03
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Paid
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 mt-2">
                ₹45,000.00
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Semester III Regular &amp; Lab Fee
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs flex justify-between items-center text-slate-600">
              <span>Paid on: 22 Jul 2024</span>
              <button
                onClick={() => setActiveReceiptId("REC-2024-2104")}
                className="text-[#355C7D] font-mono font-semibold hover:underline cursor-pointer"
              >
                #REC-2024-2104
              </button>
            </div>
          </div>

          {/* Installment 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  Installment 02 / 03
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Paid
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 mt-2">
                ₹40,000.00
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Semester IV Mid-Term Fee
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 text-xs flex justify-between items-center text-slate-600">
              <span>Paid on: 14 Nov 2024</span>
              <button
                onClick={() => setActiveReceiptId("REC-2024-5120")}
                className="text-[#355C7D] font-mono font-semibold hover:underline cursor-pointer"
              >
                #REC-2024-5120
              </button>
            </div>
          </div>

          {/* Installment 3 */}
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800 uppercase">
                  Installment 03 / 03
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md border border-amber-300 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Due Soon
                </span>
              </div>
              <div className="text-xl font-bold font-mono text-amber-900 mt-2">
                ₹25,000.00
              </div>
              <p className="text-xs text-amber-700 mt-0.5">
                Final Term Closing &amp; Exam Assessment
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200 text-xs flex justify-between items-center text-amber-900">
              <span className="font-semibold">Due: May 02, 2025</span>
              <button
                onClick={() => setShowPayModal(true)}
                className="text-xs font-bold bg-[#355C7D] text-white px-2.5 py-1 rounded-md hover:opacity-90 cursor-pointer shadow-xs"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2 Columns: Payment Records (Left 7 Cols) & Receipt Preview (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Transaction Ledger Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#3D405B]">
                Payment Receipts History
              </h2>
              <p className="text-[11px] text-slate-400">
                Click any receipt to preview and print official voucher
              </p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search receipt # or fee..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 text-slate-800 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#355C7D] w-48"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200/80 text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4 font-mono">Receipt No</th>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
                  <th className="py-2.5 px-4 text-center">Status</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLedger.map((row) => {
                  const isSelected = activeReceiptId === row.receiptNo;
                  return (
                    <tr
                      key={row.receiptNo}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        isSelected ? "bg-violet-50/40" : ""
                      }`}
                    >
                      <td className="py-3 px-4 font-medium text-slate-700">
                        {row.date}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#355C7D]">
                        {row.receiptNo}
                      </td>
                      <td className="py-3 px-4">
                        <span className="block font-medium text-slate-900">
                          {row.head}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {row.mode}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                        {row.amount}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-md border border-emerald-200">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setActiveReceiptId(row.receiptNo);
                            triggerToast(`Loaded receipt #${row.receiptNo}`);
                          }}
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[#355C7D] text-white shadow-xs"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {isSelected ? "Viewing" : "View"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
            <span>{filteredLedger.length} verified receipts found</span>
            <button
              onClick={() => setShowQueryModal(true)}
              className="text-[#355C7D] font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Report a discrepancy</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Receipt Voucher Preview */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#355C7D]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#3D405B]">
                Receipt Preview &bull; {currentVoucher.receiptNo}
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => window.print()}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                title="Print Receipt"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  triggerToast(`Downloading PDF for receipt #${currentVoucher.receiptNo}...`)
                }
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                title="Download Receipt"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clean Receipt Slip Box */}
          <div className="p-5 font-sans text-xs space-y-4">
            {/* Header */}
            <div className="border-b border-slate-200 pb-3 text-center">
              <h3 className="font-bold text-sm text-slate-900 uppercase">
                Apex Institute of Technology
              </h3>
              <p className="text-[11px] text-slate-500">
                Office of the Accounts &amp; Finance Desk
              </p>
              <div className="mt-1.5 inline-block px-2.5 py-0.5 bg-[#355C7D] text-white text-[10px] font-bold uppercase rounded-md tracking-wider">
                Official Fee Receipt
              </div>
            </div>

            {/* Receipt Details Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-[10px]">Receipt No</span>
                <span className="font-mono font-bold text-[#355C7D]">
                  {currentVoucher.receiptNo}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Payment Date</span>
                <span className="font-medium text-slate-800">
                  {currentVoucher.clearedDate}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Student Name</span>
                <span className="font-semibold text-slate-900">
                  {currentVoucher.studentName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Roll Number</span>
                <span className="font-mono font-bold text-slate-800">
                  {currentVoucher.rollNo}
                </span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px]">Academic Program</span>
                <span className="text-slate-800 font-medium">
                  {currentVoucher.program} &bull; {currentVoucher.semester}
                </span>
              </div>
            </div>

            {/* Itemized Heads */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Particulars Breakdown
              </span>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 text-[10px] uppercase">
                    <th className="pb-1 font-semibold">Fee Particulars</th>
                    <th className="pb-1 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentVoucher.items.map((it) => (
                    <tr key={it.head}>
                      <td className="py-1.5 text-slate-700">{it.head}</td>
                      <td className="py-1.5 text-right font-mono font-semibold text-slate-900">
                        {it.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-300 font-bold text-xs">
                    <td className="py-2 text-[#3D405B] uppercase">Total Paid</td>
                    <td className="py-2 text-right font-mono text-sm text-[#355C7D]">
                      {currentVoucher.subtotal}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Payment Mode */}
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-medium text-slate-800">
                  {currentVoucher.method}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction Ref:</span>
                <span className="font-mono font-semibold text-slate-700">
                  {currentVoucher.reference}
                </span>
              </div>
            </div>

            {/* Receipt Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() =>
                  triggerToast(`Downloading PDF voucher ${currentVoucher.receiptNo}...`)
                }
                className="px-4 py-1.5 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Pay Due Fee Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#355C7D]" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Online Fee Payment
                </h3>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium block">
                  Pending Due &bull; Installment 3 (Final Term)
                </span>
                <span className="text-3xl font-bold font-mono text-[#3D405B] mt-1 block">
                  ₹25,000.00
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Due Date: May 02, 2025 &bull; Rahul Sharma (23CS042)
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Select Payment Option
                </label>
                <div className="space-y-2 text-xs">
                  <label
                    onClick={() => setSelectedPaymentMethod("UPI")}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedPaymentMethod === "UPI"
                        ? "border-[#355C7D] bg-violet-50/40"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-opt"
                      checked={selectedPaymentMethod === "UPI"}
                      onChange={() => setSelectedPaymentMethod("UPI")}
                      className="text-[#355C7D]"
                    />
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        Instant UPI / QR
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Google Pay, PhonePe, Paytm, BHIM UPI
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setSelectedPaymentMethod("CARD")}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedPaymentMethod === "CARD"
                        ? "border-[#355C7D] bg-violet-50/40"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-opt"
                      checked={selectedPaymentMethod === "CARD"}
                      onChange={() => setSelectedPaymentMethod("CARD")}
                      className="text-[#355C7D]"
                    />
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        Credit / Debit Card
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Visa, MasterCard, RuPay
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setSelectedPaymentMethod("NETBANKING")}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedPaymentMethod === "NETBANKING"
                        ? "border-[#355C7D] bg-violet-50/40"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="pay-opt"
                      checked={selectedPaymentMethod === "NETBANKING"}
                      onChange={() => setSelectedPaymentMethod("NETBANKING")}
                      className="text-[#355C7D]"
                    />
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        Internet Banking
                      </span>
                      <span className="text-[11px] text-slate-500">
                        All major Indian public &amp; private banks
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure payment gateway with instant receipt generation.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPayModal(false);
                  triggerToast("Redirecting to secure payment gateway for ₹25,000...");
                }}
                className="px-5 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Proceed to Pay ₹25,000
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Fee Discrepancy Query Modal */}
      {showQueryModal && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#355C7D]" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Report Fee Discrepancy
                </h3>
              </div>
              <button
                onClick={() => setShowQueryModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Select Issue Type
                </label>
                <select className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#355C7D]">
                  <option>Payment debited but receipt not generated</option>
                  <option>Scholarship / Fee concession not reflected</option>
                  <option>Duplicate deduction issue</option>
                  <option>Need Section 80C fee receipt duplicate</option>
                  <option>Other payment inquiry</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Transaction Reference / UTR
                </label>
                <input
                  type="text"
                  placeholder="e.g. UTR-24072201 or NetBanking Ref"
                  className="w-full border border-slate-300 rounded-xl p-2.5 font-mono text-slate-800 focus:outline-none focus:border-[#355C7D]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Explanation &amp; Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your payment details, date, and bank account deduction..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#355C7D] resize-none"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowQueryModal(false)}
                className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowQueryModal(false);
                  triggerToast("Discrepancy query registered. Support Ticket: #FEE-2025-042");
                }}
                className="px-5 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Submit Query
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
