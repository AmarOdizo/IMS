"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Printer,
  ChevronRight,
  CreditCard,
  CheckCircle,
  Clock,
  Calendar,
  AlertCircle,
  HelpCircle,
  Search,
  ExternalLink,
  Shield,
  ShieldCheck,
  QrCode,
  FileText,
  X,
  Check,
  Send,
  Building
} from "lucide-react";

interface VoucherData {
  receiptNo: string;
  clearedDate: string;
  studentName: string;
  rollNo: string;
  program: string;
  semester: string;
  method: string;
  bankBranch: string;
  reference: string;
  operator: string;
  sha256: string;
  items: { head: string; amount: string }[];
  subtotal: string;
}

export default function StudentFeesPage() {
  const [activeReceiptId, setActiveReceiptId] = useState("REC-2024-4821");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPayModal, setShowPayModal] = useState(false);
  const [showDiscrepancyModal, setShowDiscrepancyModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const receiptsData: Record<string, VoucherData> = {
    "REC-2024-4821": {
      receiptNo: "REC-2024-4821",
      clearedDate: "14-Nov-2024",
      studentName: "Rahul Sharma",
      rollNo: "APX-2023-CS-042",
      program: "B.Tech Computer Science & Eng.",
      semester: "Sem IV (AY 2024–25)",
      method: "Bank Demand Draft (Counter Received)",
      bankBranch: "HDFC Bank, K.G. Marg Branch",
      reference: "DD #098412",
      operator: "APX-ACT-04",
      sha256:
        "9b2d88a1e2f41c4800e998a4d701ecda551328014582fcc02e096417fae2981b",
      items: [
        { head: "Tuition Fee (Semester IV Academic)", amount: "$3,800.00" },
        {
          head: "Advanced Computing Lab & Cloud Infra",
          amount: "$650.00",
        },
        {
          head: "Library & Digital Research Repositories",
          amount: "$150.00",
        },
        {
          head: "Semester End Examination & Assessment",
          amount: "$150.00",
        },
      ],
      subtotal: "$4,750.00",
    },
    "REC-2024-1109": {
      receiptNo: "REC-2024-1109",
      clearedDate: "22-Jul-2024",
      studentName: "Rahul Sharma",
      rollNo: "APX-2023-CS-042",
      program: "B.Tech Computer Science & Eng.",
      semester: "Sem III (AY 2024–25)",
      method: "NEFT/RTGS Online Wire",
      bankBranch: "State Bank of India (SBI Core)",
      reference: "UTR: SBIN2420391840",
      operator: "APX-ACT-02",
      sha256:
        "4a7c88b2e1f41d9900e888a4c701ecda441328014582faa02e096417fae1209a",
      items: [
        { head: "Tuition Fee (Semester III Academic)", amount: "$3,800.00" },
        { head: "Annual Campus Tech & Infrastructure Levy", amount: "$650.00" },
        { head: "Students Activity & Sports Council", amount: "$150.00" },
        { head: "Medical Health Group Insurance", amount: "$150.00" },
      ],
      subtotal: "$4,750.00",
    },
    "REC-2023-9031": {
      receiptNo: "REC-2023-9031",
      clearedDate: "18-Jan-2024",
      studentName: "Rahul Sharma",
      rollNo: "APX-2023-CS-042",
      program: "B.Tech Computer Science & Eng.",
      semester: "Sem II (AY 2023–24)",
      method: "Counter Cash Slip",
      bankBranch: "Apex Treasury Cash Window #2",
      reference: "SLIP: CS-CTR-8812",
      operator: "APX-ACT-01",
      sha256:
        "3d1f88c3e1e21b8800e777b4d701ebda331328014582fbb02e096417fae8901c",
      items: [
        { head: "Tuition Fee (Semester II Academic)", amount: "$3,700.00" },
        { head: "Lab Consumables & Workstation Access", amount: "$500.00" },
        { head: "Annual Security & ID Badge Replacement", amount: "$300.00" },
      ],
      subtotal: "$4,500.00",
    },
    "REC-2023-0182": {
      receiptNo: "REC-2023-0182",
      clearedDate: "05-Aug-2023",
      studentName: "Rahul Sharma",
      rollNo: "APX-2023-CS-042",
      program: "B.Tech Computer Science & Eng.",
      semester: "Sem I (AY 2023–24)",
      method: "Banker's Cheque",
      bankBranch: "ICICI Bank, Connaught Place",
      reference: "CHQ #441092",
      operator: "APX-REG-03",
      sha256:
        "1c8e99a4e2f31a7700e666a4c701eada221328014582fcc02e096417fae4567d",
      items: [
        { head: "One-time Admission & Matriculation Fee", amount: "$1,500.00" },
        { head: "Tuition Fee (Semester I Academic)", amount: "$3,500.00" },
        { head: "Refundable Caution Security Deposit", amount: "$500.00" },
      ],
      subtotal: "$5,500.00",
    },
  };

  const currentVoucher = receiptsData[activeReceiptId] || receiptsData["REC-2024-4821"];

  const ledgerList = [
    {
      date: "14-Nov-2024",
      receiptNo: "REC-2024-4821",
      head: "Term IV Regular Fees",
      subHead: "Tuition + Lab + Exams",
      mode: "Bank Demand Draft",
      ref: "DD #098412 (HDFC)",
      amount: "$4,750.00",
      status: "Verified",
    },
    {
      date: "22-Jul-2024",
      receiptNo: "REC-2024-1109",
      head: "Term III Regular Fees",
      subHead: "Tuition + Campus Levy",
      mode: "NEFT/RTGS Transfer",
      ref: "UTR: SBIN2420391840",
      amount: "$4,750.00",
      status: "Verified",
    },
    {
      date: "18-Jan-2024",
      receiptNo: "REC-2023-9031",
      head: "Term II Regular Fees",
      subHead: "Tuition + Annual Security",
      mode: "Counter Cash Slip",
      ref: "SLIP: CS-CTR-8812",
      amount: "$4,500.00",
      status: "Verified",
    },
    {
      date: "05-Aug-2023",
      receiptNo: "REC-2023-0182",
      head: "Admission & Term I",
      subHead: "Registration + Tuition",
      mode: "Banker's Cheque",
      ref: "CHQ #441092 (ICICI)",
      amount: "$5,500.00",
      status: "Verified",
    },
  ];

  const filteredLedger = ledgerList.filter(
    (item) =>
      item.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.head.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ref.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 shadow-[2px_2px_0_0_#0D2545] border-l-4 border-secondary-container flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-secondary-container text-[20px]">
            info
          </span>
          <span className="font-mono text-xs">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-primary-fixed-dim hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Command Banner / Header */}
      <div className="px-6 py-4 bg-surface-container-lowest border-b border-[#d5e3fc] shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            <Link href="/student" className="hover:text-primary">
              Student Portal
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <span className="text-primary font-bold">My Fees &amp; Receipts</span>
          </div>
          <h1 className="font-headline text-xl text-primary font-bold tracking-tight">
            Tuition Fees &amp; Financial Receipts Register
          </h1>
          <p className="text-xs text-on-surface-variant max-w-3xl">
            Official campus ledger for academic year fees, installment schedule,
            and digital receipt registry. Maintained directly by the Office of
            the Bursar.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-2 bg-surface-container text-on-surface text-xs font-semibold uppercase tracking-wider hover:bg-surface-container-high transition-colors border border-[#c4c6cf] shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Ledger</span>
          </button>
          <button
            onClick={() =>
              triggerToast(
                "Compiling certified complete financial ledger statement (PDF)..."
              )
            }
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Statement (PDF)</span>
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Financial Telemetry 4-Metric Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1: Total Course Fees */}
          <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex flex-col pl-1">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                Total Course Fees • AY 2024-25
              </span>
              <div className="font-headline text-2xl font-bold text-on-surface mt-2 tabular-nums">
                $12,500.00
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-[#d5e3fc]/60 flex flex-wrap gap-1 pl-1">
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-medium">
                Tuition
              </span>
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-medium">
                Lab Fee
              </span>
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-medium">
                Campus Ops
              </span>
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-medium">
                Exam Assess
              </span>
            </div>
          </div>

          {/* Card 2: Total Paid to Date */}
          <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#047857]"></div>
            <div className="flex flex-col pl-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Paid To Date
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-1.5 py-0.5 uppercase tracking-wider border border-[#a7f3d0]">
                  <CheckCircle className="w-3 h-3" />
                  76.0% Cleared
                </span>
              </div>
              <div className="font-headline text-2xl font-bold text-on-surface mt-2 tabular-nums">
                $9,500.00
              </div>
            </div>
            <div className="pl-1 pt-2 flex items-center gap-2">
              <div className="w-full bg-surface-container h-1.5 overflow-hidden">
                <div className="bg-[#047857] h-full" style={{ width: "76%" }}></div>
              </div>
              <span className="font-mono text-[11px] text-on-surface-variant shrink-0 font-medium">
                2/3 Installments
              </span>
            </div>
          </div>

          {/* Card 3: Pending Balance Due */}
          <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#B45309]"></div>
            <div className="flex flex-col pl-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Pending Balance Due
                </span>
                <span className="text-[10px] font-bold text-[#B45309] bg-[#FFFBEB] px-1.5 py-0.5 uppercase tracking-wider border border-[#fde68a]">
                  Installment #3 of 3
                </span>
              </div>
              <div className="font-headline text-2xl font-bold text-error mt-2 tabular-nums">
                $3,000.00
              </div>
            </div>
            <div className="pl-1 pt-2 flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
              <span className="flex items-center gap-1 text-[#B45309] font-semibold">
                <Clock className="w-3.5 h-3.5" /> Due: Apr 30, 2025
              </span>
              <button
                onClick={() => setShowPayModal(true)}
                className="text-xs uppercase font-bold text-primary hover:underline"
              >
                Pay Now →
              </button>
            </div>
          </div>

          {/* Card 4: Concession & Scholarship */}
          <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex flex-col pl-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Applied Concession
                </span>
                <span className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">
                  BURSAR ID #8841
                </span>
              </div>
              <div className="font-headline text-base font-bold text-primary mt-2 leading-tight">
                Academic Merit (15% Waiver)
              </div>
            </div>
            <div className="pl-1 pt-2 flex items-center gap-1.5 font-mono text-[11px] text-on-surface-variant">
              <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
              <span>Reconciled • Official Dean Waiver</span>
            </div>
          </div>
        </section>

        {/* Payment Schedule & Installment Breakdown Pipeline */}
        <section className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d5e3fc] pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                calendar_view_week
              </span>
              <h2 className="font-headline text-sm font-bold text-on-surface uppercase tracking-tight">
                Official AY 2024-25 Installment Disbursement Track
              </h2>
            </div>
            <span className="font-mono text-xs text-on-surface-variant">
              Currency Base: USD ($) • Policy Rev: 2024.03
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Installment 1 */}
            <div className="p-4 bg-surface-container-low border border-[#d5e3fc] flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Installment 01 / 03
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-1.5 py-0.5 uppercase border border-[#a7f3d0]">
                    <Check className="w-3 h-3" /> Paid
                  </span>
                </div>
                <div className="font-headline text-xl font-bold text-on-surface mt-1 tabular-nums">
                  $4,750.00
                </div>
                <p className="text-xs text-on-surface-variant">
                  Term Initiation &amp; Core Lab Operations
                </p>
              </div>

              <div className="mt-4 pt-3 bg-surface-container-lowest p-2.5 border border-[#d5e3fc] flex flex-col gap-1">
                <div className="flex items-center justify-between font-mono text-xs text-on-surface">
                  <span className="text-on-surface-variant">Cleared Date:</span>
                  <span className="font-semibold">Jul 22, 2024</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-on-surface">
                  <span className="text-on-surface-variant">Receipt ID:</span>
                  <button
                    onClick={() => setActiveReceiptId("REC-2024-1109")}
                    className="text-secondary font-bold hover:underline"
                  >
                    REC-2024-1109
                  </button>
                </div>
              </div>
            </div>

            {/* Installment 2 */}
            <div className="p-4 bg-surface-container-low border border-[#d5e3fc] flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Installment 02 / 03
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#047857] bg-[#ECFDF5] px-1.5 py-0.5 uppercase border border-[#a7f3d0]">
                    <Check className="w-3 h-3" /> Paid
                  </span>
                </div>
                <div className="font-headline text-xl font-bold text-on-surface mt-1 tabular-nums">
                  $4,750.00
                </div>
                <p className="text-xs text-on-surface-variant">
                  Mid-Term Infrastructure &amp; Exam Overhead
                </p>
              </div>

              <div className="mt-4 pt-3 bg-surface-container-lowest p-2.5 border border-[#d5e3fc] flex flex-col gap-1">
                <div className="flex items-center justify-between font-mono text-xs text-on-surface">
                  <span className="text-on-surface-variant">Cleared Date:</span>
                  <span className="font-semibold">Nov 14, 2024</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-on-surface">
                  <span className="text-on-surface-variant">Receipt ID:</span>
                  <button
                    onClick={() => setActiveReceiptId("REC-2024-4821")}
                    className="text-secondary font-bold hover:underline"
                  >
                    REC-2024-4821
                  </button>
                </div>
              </div>
            </div>

            {/* Installment 3 */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 flex flex-col justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#B45309] font-bold">
                    Installment 03 / 03
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B45309] bg-[#FFFBEB] px-1.5 py-0.5 uppercase border border-[#fde68a]">
                    <Clock className="w-3 h-3" /> Scheduled
                  </span>
                </div>
                <div className="font-headline text-xl font-bold text-[#B45309] mt-1 tabular-nums">
                  $3,000.00
                </div>
                <p className="text-xs text-on-surface-variant">
                  Final Term Closing &amp; Assessment Ledger
                </p>
              </div>

              <div className="mt-4 pt-3 bg-surface-container-lowest p-2.5 border border-[#d5e3fc] flex flex-col gap-1">
                <div className="flex items-center justify-between font-mono text-xs text-on-surface">
                  <span className="text-on-surface-variant">Due Date:</span>
                  <span className="font-bold text-[#B45309]">Apr 30, 2025</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
                  <span>Method:</span>
                  <button
                    onClick={() => setShowPayModal(true)}
                    className="text-xs uppercase font-bold text-primary hover:underline"
                  >
                    Pay Online Now →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container p-3 flex items-start gap-2 border border-[#d5e3fc]">
            <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface font-semibold">
                Institutional Compliance Notice:
              </strong>{" "}
              Per Apex Institute Financial Governance Policy, all final semester
              settlement transactions can be cleared via online verified gateway
              or stamped at the central Registrar Accounts Desk via physical Bank
              Demand Draft / Treasury Cash.
            </p>
          </div>
        </section>

        {/* Asymmetric Two-Column Ledger and Real-Time Voucher Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 7 cols Ledger Registry */}
          <section className="lg:col-span-7 flex flex-col gap-4">
            <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#d5e3fc]">
                <div>
                  <h2 className="font-headline text-sm font-bold text-on-surface uppercase tracking-tight">
                    Transaction Ledger &amp; Cleared Slips
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Showing audited institutional receipts for student
                    #APX-2023-CS-042
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-surface-container px-2.5 py-1 flex items-center gap-1.5 font-mono text-xs border border-[#c4c6cf]">
                    <Search className="w-3.5 h-3.5 text-on-surface-variant" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter receipt or UTR..."
                      className="bg-transparent border-0 outline-none text-on-surface w-36 placeholder:text-on-surface-variant/50"
                    />
                  </div>
                </div>
              </div>

              {/* Tabular Ledger */}
              <div className="overflow-x-auto w-full mt-3">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-[#d5e3fc]">
                      <th className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                        Date
                      </th>
                      <th className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                        Receipt No
                      </th>
                      <th className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                        Fee Head
                      </th>
                      <th className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                        Instrument
                      </th>
                      <th className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-on-surface-variant text-right font-semibold">
                        Amount
                      </th>
                      <th className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-on-surface-variant text-center font-semibold">
                        Status
                      </th>
                      <th className="py-2.5 px-3 text-[11px] uppercase tracking-wider text-on-surface-variant text-right font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-xs">
                    {filteredLedger.map((row) => {
                      const isSelected = activeReceiptId === row.receiptNo;
                      return (
                        <tr
                          key={row.receiptNo}
                          className={`border-b border-[#e6eeff] transition-colors ${
                            isSelected
                              ? "bg-primary-container/10 font-medium"
                              : "hover:bg-surface-container"
                          }`}
                        >
                          <td className="py-3 px-3 text-on-surface font-semibold">
                            {row.date}
                          </td>
                          <td className="py-3 px-3 text-secondary font-bold">
                            {row.receiptNo}
                          </td>
                          <td className="py-3 px-3">
                            <span className="block font-sans font-medium text-xs text-on-surface">
                              {row.head}
                            </span>
                            <span className="text-[10px] text-on-surface-variant uppercase">
                              {row.subHead}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-on-surface">
                            <span className="block">{row.mode}</span>
                            <span className="text-[10px] text-on-surface-variant">
                              {row.ref}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-on-surface tabular-nums">
                            {row.amount}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="inline-block text-[10px] uppercase px-1.5 py-0.5 bg-[#ECFDF5] text-[#047857] font-bold border border-[#a7f3d0]">
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => {
                                setActiveReceiptId(row.receiptNo);
                                triggerToast(
                                  `Inspecting voucher ${row.receiptNo} on preview deck`
                                );
                              }}
                              className={`px-2.5 py-1 text-xs uppercase font-semibold transition-colors ${
                                isSelected
                                  ? "bg-primary text-white"
                                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                              }`}
                            >
                              {isSelected ? "Viewing" : "Inspect"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Ledger Table Footer */}
              <div className="mt-4 pt-3 border-t border-[#d5e3fc] flex flex-col sm:flex-row sm:items-center justify-between text-on-surface-variant gap-2 font-mono text-xs">
                <span>
                  Cumulative Verified Receipts:{" "}
                  <strong className="text-on-surface font-bold">
                    04 Ledger Postings
                  </strong>
                </span>
                <div className="flex items-center gap-4">
                  <span>
                    Audited Historical Gross:{" "}
                    <strong className="text-primary font-bold">
                      $19,500.00
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions & Tax Notice */}
            <div className="p-4 bg-surface-container-low border border-[#d5e3fc] flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[18px]">
                  gavel
                </span>
                <span className="text-xs uppercase tracking-wider font-bold">
                  Financial Regulation &amp; Tax Deduction Notice
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All tuition charges qualify under Section 80C Higher Educational
                Exemption norms. Official digital stamp hashes can be scanned via
                government audit scanners. To request physical wet-ink duplicate
                vouchers for employer sponsorship verification, present this
                register at Room 104, Admin Wing.
              </p>
            </div>
          </section>

          {/* Right Column: 5 cols Live Voucher Preview */}
          <section className="lg:col-span-5 flex flex-col gap-4 sticky top-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#047857] inline-block"></span>
                <span className="text-xs uppercase tracking-wider text-on-surface font-bold">
                  Live Receipt Voucher Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-1 text-on-surface-variant hover:text-primary transition-colors"
                  title="Print this receipt"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    triggerToast(
                      `Downloading official vector PDF for ${currentVoucher.receiptNo}...`
                    )
                  }
                  className="p-1 text-on-surface-variant hover:text-primary transition-colors"
                  title="Download PDF format"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Realistic A4 Voucher Canvas */}
            <div className="bg-surface-container-lowest p-6 shadow-md border-2 border-primary/20 relative overflow-hidden flex flex-col">
              {/* Top Watermark Bar */}
              <div className="bg-primary text-white px-3 py-1.5 flex items-center justify-between text-[11px] font-mono">
                <span className="uppercase tracking-widest font-semibold">
                  Official Payment Voucher
                </span>
                <span className="text-secondary-fixed-dim">
                  DUPLICATE FOR STUDENT FILE
                </span>
              </div>

              {/* Institutional Header Block */}
              <div className="pt-4 pb-3 border-b border-[#e6eeff] flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-headline text-base uppercase tracking-tight text-primary font-bold block">
                      Apex Institute
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block font-medium">
                      Of Technology &amp; Management
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-on-surface-variant uppercase block">
                      Treasury Division
                    </span>
                    <span className="font-mono text-xs font-bold text-on-surface block">
                      Office of the Bursar
                    </span>
                  </div>
                </div>
                <p className="font-mono text-[9px] text-on-surface-variant mt-1">
                  Sector 12, Academic District, New Delhi • GSTIN:
                  07AAAAP8812C1Z4
                </p>
              </div>

              {/* Receipt Primary Meta Grid */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-3 border-b border-[#e6eeff] font-mono text-xs">
                <div>
                  <span className="text-on-surface-variant uppercase text-[9px] block">
                    Receipt Number
                  </span>
                  <span className="text-primary font-bold text-sm leading-tight">
                    {currentVoucher.receiptNo}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-on-surface-variant uppercase text-[9px] block">
                    Clearing Date
                  </span>
                  <span className="text-on-surface font-bold text-sm leading-tight">
                    {currentVoucher.clearedDate}
                  </span>
                </div>
                <div>
                  <span className="text-on-surface-variant uppercase text-[9px] block">
                    Student Name
                  </span>
                  <span className="text-on-surface font-semibold">
                    {currentVoucher.studentName}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-on-surface-variant uppercase text-[9px] block">
                    Roll / Reg Number
                  </span>
                  <span className="text-on-surface font-semibold">
                    {currentVoucher.rollNo}
                  </span>
                </div>
                <div className="col-span-2 bg-surface-container-low px-2 py-1 text-[11px] flex justify-between border border-[#d5e3fc]">
                  <span>
                    Program:{" "}
                    <strong className="text-on-surface">
                      {currentVoucher.program}
                    </strong>
                  </span>
                  <span>
                    Semester:{" "}
                    <strong className="text-on-surface">
                      {currentVoucher.semester}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Itemized Breakdown Table */}
              <div className="py-3">
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold mb-2 block">
                  Fee Heads Breakdown
                </span>
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#d5e3fc] text-on-surface-variant text-[10px] uppercase">
                      <th className="py-1">Head Particulars</th>
                      <th className="py-1 text-right">Amount (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6eeff]">
                    {currentVoucher.items.map((it) => (
                      <tr key={it.head}>
                        <td className="py-1.5 text-on-surface">{it.head}</td>
                        <td className="py-1.5 text-right text-on-surface tabular-nums">
                          {it.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-primary font-bold text-on-surface">
                      <td className="py-2 uppercase text-xs tracking-wider">
                        Subtotal Cleared
                      </td>
                      <td className="py-2 text-right tabular-nums text-sm text-primary">
                        {currentVoucher.subtotal}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Instrument Specification */}
              <div className="bg-surface-container-low p-2.5 border border-[#d5e3fc] flex flex-col gap-1 font-mono text-[11px] text-on-surface mt-1">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">
                    Settlement Method:
                  </span>
                  <span className="font-bold">{currentVoucher.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Drawn On:</span>
                  <span>{currentVoucher.bankBranch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Reference:</span>
                  <span className="font-bold text-secondary">
                    {currentVoucher.reference}
                  </span>
                </div>
              </div>

              {/* Cryptographic Validation & Stamp Area */}
              <div className="mt-4 pt-3 border-t border-[#e6eeff] grid grid-cols-12 gap-2 items-center">
                {/* QR Code */}
                <div className="col-span-3 flex flex-col items-center">
                  <div className="w-14 h-14 bg-surface-container-high p-1 border border-[#c4c6cf] flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-primary" />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-tighter text-on-surface-variant mt-0.5">
                    SCAN TO VERIFY
                  </span>
                </div>

                {/* Hash String & Stamp */}
                <div className="col-span-9 flex flex-col gap-1 pl-1">
                  <div className="flex items-center justify-between">
                    <div className="border-2 border-[#047857] px-2 py-0.5 text-center transform -rotate-1">
                      <span className="font-mono text-[9px] uppercase font-bold text-[#047857] block tracking-wider leading-none">
                        BURSAR ACCOUNTS DESK
                      </span>
                      <span className="font-mono text-[8px] uppercase text-[#047857] font-semibold leading-none">
                        FEES CLEARED &amp; RECONCILED
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-on-surface-variant font-bold">
                      OPERATOR: {currentVoucher.operator}
                    </span>
                  </div>
                  <div className="font-mono text-[8px] text-on-surface-variant truncate mt-1">
                    SHA256: {currentVoucher.sha256}
                  </div>
                </div>
              </div>

              {/* Bottom Action Deck */}
              <div className="mt-4 pt-3 border-t border-[#d5e3fc] flex items-center justify-end gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-surface-container text-on-surface text-xs font-semibold uppercase tracking-wider hover:bg-surface-container-high transition-colors flex items-center gap-1.5 border border-[#c4c6cf]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>
                <button
                  onClick={() =>
                    triggerToast(
                      `Downloaded official signed PDF voucher ${currentVoucher.receiptNo}`
                    )
                  }
                  className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Bursar Desk Help Box */}
            <div className="bg-surface-container p-3 flex items-center justify-between text-on-surface-variant font-mono text-xs border border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-secondary" />
                <span className="text-xs">Encountered a payment discrepancy?</span>
              </div>
              <button
                onClick={() => setShowDiscrepancyModal(true)}
                className="text-secondary font-bold text-xs uppercase hover:underline"
              >
                Raise Ledger Query →
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* MODAL 1: Make Installment Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="font-headline text-base font-bold text-primary uppercase">
                  Institutional Fee Clearance
                </h3>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="text-on-surface-variant hover:text-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="bg-surface-container-low p-3.5 border border-[#d5e3fc]">
                <div className="text-[11px] uppercase text-on-surface-variant font-semibold">
                  Pending Installment #03 (Final Term)
                </div>
                <div className="text-2xl font-bold font-headline text-primary mt-1">
                  $3,000.00
                </div>
                <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">
                  Due: April 30, 2025 • Student: Rahul Sharma (APX-2023-CS-042)
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-2">
                  Payment Channel
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-3 p-2.5 border border-primary bg-primary/5 cursor-pointer">
                    <input
                      type="radio"
                      name="payment-method"
                      defaultChecked
                      className="text-primary"
                    />
                    <div>
                      <div className="font-semibold text-primary">
                        HDFC Integrated Campus Gateway
                      </div>
                      <div className="text-[11px] text-on-surface-variant">
                        Credit / Debit Card, NetBanking, Instant UPI
                      </div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-2.5 border border-[#c4c6cf] hover:border-primary cursor-pointer">
                    <input
                      type="radio"
                      name="payment-method"
                      className="text-primary"
                    />
                    <div>
                      <div className="font-semibold text-primary">
                        Generate Bank Demand Draft Challan
                      </div>
                      <div className="text-[11px] text-on-surface-variant">
                        Download pre-filled challan slip for counter deposit
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="text-[11px] text-on-surface-variant flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#047857]" />
                <span>256-bit SSL encrypted institutional payment pipeline</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setShowPayModal(false)}
                className="px-4 py-2 border border-[#c4c6cf] text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPayModal(false);
                  triggerToast(
                    "Connecting to HDFC Payment Gateway for $3,000.00..."
                  );
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container"
              >
                Proceed to Pay $3,000.00
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Raise Ledger Query / Discrepancy Ticket Modal */}
      {showDiscrepancyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h3 className="font-headline text-base font-bold text-primary uppercase">
                  Raise Ledger Query to Bursar Desk
                </h3>
              </div>
              <button
                onClick={() => setShowDiscrepancyModal(false)}
                className="text-on-surface-variant hover:text-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5">
              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Query Type
                </label>
                <select className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary">
                  <option>Payment Debited but Receipt Not Generated</option>
                  <option>Concession / Scholarship Not Reflected</option>
                  <option>Duplicate Transaction Dispute</option>
                  <option>Request for Section 80C Tax Exemption Dossier</option>
                  <option>Bank Demand Draft Reconciliation Delay</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Transaction Reference / UTR (if any)
                </label>
                <input
                  type="text"
                  placeholder="e.g. UTR: SBIN2420391840 or DD #098412"
                  className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Detailed Explanation
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the discrepancy with payment date, bank account debit timestamp, and amount..."
                  className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setShowDiscrepancyModal(false)}
                className="px-4 py-2 border border-[#c4c6cf] text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDiscrepancyModal(false);
                  triggerToast(
                    "Ledger query lodged with Bursar. Ticket: #BUR-2025-089"
                  );
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container"
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
