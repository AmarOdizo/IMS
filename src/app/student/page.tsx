"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Calendar,
  CreditCard,
  Award,
  BadgeCheck,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  FileText,
  Mail,
  Phone,
  QrCode,
  Printer,
  Sparkles,
  X,
  Check,
  Building2,
  Copy,
  Receipt,
  ShieldCheck,
  Info
} from "lucide-react";

export default function StudentDashboard() {
  const [studentTab, setStudentTab] = useState<"all" | "exams" | "fees">("all");
  const [showHallTicketModal, setShowHallTicketModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAttestationModal, setShowAttestationModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const upcomingExams = [
    {
      date: "Apr 15, 2025",
      time: "09:30 AM – 12:30 PM",
      code: "CS-401",
      subject: "Database Management Systems",
      type: "Theory Examination • 100 Marks",
      room: "AUD-B / Desk 42",
      status: "Seat Locked",
      statusColor: "bg-[#ECFDF5] text-[#047857] border border-[#a7f3d0]",
    },
    {
      date: "Apr 17, 2025",
      time: "09:30 AM – 12:30 PM",
      code: "CS-402",
      subject: "Operating Systems & Kernel Architecture",
      type: "Theory Examination • 100 Marks",
      room: "AUD-B / Desk 42",
      status: "Seat Locked",
      statusColor: "bg-[#ECFDF5] text-[#047857] border border-[#a7f3d0]",
    },
    {
      date: "Apr 21, 2025",
      time: "02:00 PM – 05:00 PM",
      code: "CS-403",
      subject: "Design & Analysis of Algorithms",
      type: "Theory Examination • 100 Marks",
      room: "HALL-402 / Desk 18",
      status: "Seat Locked",
      statusColor: "bg-[#ECFDF5] text-[#047857] border border-[#a7f3d0]",
    },
    {
      date: "Apr 24, 2025",
      time: "09:30 AM – 12:30 PM",
      code: "CS-404",
      subject: "Formal Languages & Automata Theory",
      type: "Theory Examination • 100 Marks",
      room: "AUD-B / Desk 42",
      status: "Scheduled",
      statusColor: "bg-surface-container text-on-surface-variant border border-[#d5e3fc]",
    },
    {
      date: "Apr 27, 2025",
      time: "09:30 AM – 12:30 PM",
      code: "CS-405L",
      subject: "Database & OS Systems Engineering Laboratory",
      type: "Practical Viva • 50 Marks",
      room: "LAB-TURING-3",
      status: "Scheduled",
      statusColor: "bg-surface-container text-on-surface-variant border border-[#d5e3fc]",
    },
  ];

  const recentTransactions = [
    {
      date: "Jan 10, 2025",
      receiptNo: "#REC-2025-0842",
      allocation: "Semester IV Tuition Fee - Inst 1",
      reg: "Apex Academic Core • Reg: 84920",
      instrument: "Counter Till #02 (Cash)",
      amount: "₹27,500.00",
      status: "Cleared",
    },
    {
      date: "Oct 15, 2024",
      receiptNo: "#REC-2024-5120",
      allocation: "Semester III Tuition Fee - Final",
      reg: "Apex Academic Core • Reg: 72109",
      instrument: "Bank Wire NEFT (AXIS/48201)",
      amount: "₹40,000.00",
      status: "Cleared",
    },
    {
      date: "Jul 22, 2024",
      receiptNo: "#REC-2024-2104",
      allocation: "Annual Campus Tech & Lab Levy",
      reg: "Infra Fund • Ref: INF-883",
      instrument: "Demand Draft (#441092 HDFC)",
      amount: "₹15,000.00",
      status: "Cleared",
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto font-body text-on-surface select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 shadow-lg flex items-center gap-3 border-l-4 border-secondary-container animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-secondary-container" />
          <span className="font-mono text-xs">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-primary-fixed-dim hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SECTION 1: Welcome Header Banner */}
      <div className="relative bg-gradient-to-r from-primary via-primary-container to-secondary text-white p-6 md:p-8 rounded-sm shadow-sm overflow-hidden">
        {/* Subtle architectural linear vector grid watermark */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div className="flex flex-col max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-0.5 bg-surface-container-lowest text-on-surface text-[11px] uppercase tracking-wider font-semibold rounded-xs">
                <span className="w-2 h-2 bg-[#047857] rounded-full mr-1.5 inline-block animate-pulse"></span>
                Enrolled &amp; Active
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-tertiary-container/80 text-secondary-container font-mono text-[11px] tracking-wider rounded-xs font-bold">
                UID: APX-2023-CS-042
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-white/10 text-white/90 font-mono text-[11px] tracking-wider rounded-xs">
                ROLL: 23CS042
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-white/10 text-white/90 font-mono text-[11px] tracking-wider rounded-xs">
                AY 2025-26
              </span>
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl text-white font-bold tracking-tight">
              Welcome back, Rahul Sharma!
            </h1>
            <p className="text-xs sm:text-sm text-secondary-fixed-dim mt-1 font-medium">
              B.Tech Computer Science &amp; Engineering &bull; 4th Semester (Batch 2023&ndash;27) &bull; School of Computing
            </p>
          </div>

          {/* Quick Action Utilities */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <Link
              href="/student/id-card"
              className="flex items-center justify-center gap-2 px-3 py-2 bg-surface-container-lowest text-primary text-xs uppercase tracking-wider font-semibold hover:bg-surface-container-low transition-colors shadow-xs rounded-xs"
            >
              <BadgeCheck className="w-4 h-4 text-secondary" />
              <span>Download ID Card</span>
            </Link>
            <Link
              href="/student/results"
              className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary text-white text-xs uppercase tracking-wider font-semibold hover:bg-secondary/90 transition-colors shadow-xs rounded-xs"
            >
              <Award className="w-4 h-4" />
              <span>View Latest Results</span>
            </Link>
            <Link
              href="/student/fees"
              className="flex items-center justify-center gap-2 px-3 py-2 bg-white/20 text-white text-xs uppercase tracking-wider font-semibold hover:bg-white/30 transition-colors rounded-xs"
            >
              <Receipt className="w-4 h-4" />
              <span>Fee Receipts</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2: Student KPI Performance Cards (4-Col Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* KPI 1: Course Completion */}
        <div className="bg-surface-container-lowest p-5 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between rounded-sm">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-secondary"></div>
          <div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
                Course Progress
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                school
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-headline text-2xl font-bold text-on-surface">
                68.0%
              </span>
              <span className="text-[11px] text-on-surface-variant uppercase font-medium">
                Completed
              </span>
            </div>
            <div className="w-full bg-surface-container h-1.5 mt-3 overflow-hidden rounded-full">
              <div
                className="bg-secondary h-full transition-all duration-500 rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-[#d5e3fc]/60 flex justify-between items-center text-on-surface-variant">
            <span className="font-mono text-xs text-on-surface font-semibold">
              108 / 160 Credits
            </span>
            <span className="text-[10px] uppercase bg-surface-container px-1.5 py-0.5 text-on-surface-variant font-medium rounded-xs">
              4 Sems Left
            </span>
          </div>
        </div>

        {/* KPI 2: Attendance Rate */}
        <div className="bg-surface-container-lowest p-5 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between rounded-sm">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#047857]"></div>
          <div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
                Attendance Rate
              </span>
              <span className="material-symbols-outlined text-[#047857] text-[20px]">
                fact_check
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-headline text-2xl font-bold text-on-surface">
                88.4%
              </span>
              <span className="text-[10px] uppercase text-[#047857] bg-[#ECFDF5] px-1.5 py-0.5 font-bold border border-[#a7f3d0] rounded-xs">
                Good Standing
              </span>
            </div>
            <div className="w-full bg-surface-container h-1.5 mt-3 overflow-hidden rounded-full">
              <div
                className="bg-[#047857] h-full transition-all duration-500 rounded-full"
                style={{ width: "88.4%" }}
              ></div>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-[#d5e3fc]/60 flex justify-between items-center text-on-surface-variant">
            <span className="font-mono text-xs text-on-surface font-semibold">
              114 / 129 Sessions
            </span>
            <span className="text-xs text-[#047857] font-semibold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +2.1%
            </span>
          </div>
        </div>

        {/* KPI 3: Academic Fees Status (INR ₹) */}
        <div className="bg-surface-container-lowest p-5 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between rounded-sm">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-secondary"></div>
          <div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
                Tuition &amp; Fees Ledger
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                account_balance_wallet
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-headline text-2xl font-bold text-error">
                ₹25,000
              </span>
              <span className="text-[10px] uppercase text-error bg-red-50 border border-red-200 px-1.5 py-0.5 font-bold rounded-xs">
                Pending Due
              </span>
            </div>
            <div className="w-full bg-surface-container h-1.5 mt-3 overflow-hidden rounded-full">
              <div
                className="bg-secondary h-full transition-all duration-500 rounded-full"
                style={{ width: "68.75%" }}
              ></div>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-[#d5e3fc]/60 flex justify-between items-center text-on-surface-variant">
            <span className="font-mono text-xs text-on-surface font-semibold">
              Paid: ₹55,000 / ₹80,000
            </span>
            <span className="text-[10px] uppercase bg-[#FFFBEB] text-[#B45309] px-1.5 py-0.5 font-bold border border-[#fde68a] rounded-xs">
              Due in 18d
            </span>
          </div>
        </div>

        {/* KPI 4: Upcoming Exams */}
        <div className="bg-surface-container-lowest p-5 shadow-xs border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between rounded-sm">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary"></div>
          <div>
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
                Term Evaluation
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">
                event_repeat
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="font-headline text-2xl font-bold text-on-surface">
                Mid-Term IV
              </span>
              <span className="text-[10px] uppercase bg-surface-container text-on-surface-variant px-1.5 py-0.5 font-bold rounded-xs">
                5 Modules
              </span>
            </div>
            <p className="font-mono text-xs text-secondary font-medium mt-2">
              Starts: April 15, 2025
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-[#d5e3fc]/60 flex justify-between items-center text-on-surface-variant">
            <span className="font-mono text-xs text-on-surface-variant">
              Admit Card: Generated
            </span>
            <span className="text-[10px] uppercase bg-primary text-white px-1.5 py-0.5 font-bold rounded-xs">
              T-12 Days
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 3: Dual Column Academic Layout (8 cols / 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Examination Manifest & Transaction Records (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Navigation Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs pb-1">
            <button
              onClick={() => setStudentTab("all")}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
                studentTab === "all"
                  ? "bg-primary text-on-primary border-primary shadow-xs"
                  : "bg-surface-container-lowest text-on-surface-variant border-[#d5e3fc] hover:bg-surface-container-low"
              }`}
            >
              Academic Overview (All)
            </button>
            <button
              onClick={() => setStudentTab("exams")}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
                studentTab === "exams"
                  ? "bg-primary text-on-primary border-primary shadow-xs"
                  : "bg-surface-container-lowest text-on-surface-variant border-[#d5e3fc] hover:bg-surface-container-low"
              }`}
            >
              Exams &amp; Datesheet ({upcomingExams.length})
            </button>
            <button
              onClick={() => setStudentTab("fees")}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer border ${
                studentTab === "fees"
                  ? "bg-primary text-on-primary border-primary shadow-xs"
                  : "bg-surface-container-lowest text-on-surface-variant border-[#d5e3fc] hover:bg-surface-container-low"
              }`}
            >
              Fee Receipts &amp; Ledger ({recentTransactions.length})
            </button>
          </div>

          {/* Section A: Upcoming Examination Schedule */}
          {(studentTab === "all" || studentTab === "exams") && (
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc] rounded-sm overflow-hidden">
            <div className="px-5 py-3.5 bg-surface-container-low border-b border-[#d5e3fc] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  calendar_month
                </span>
                <h2 className="font-headline text-sm font-bold text-primary uppercase tracking-tight">
                  Mid-Semester Assessment Schedule &bull; Semester IV
                </h2>
              </div>
              <button
                onClick={() => setShowHallTicketModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-xs rounded-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-secondary-container" />
                <span>Download Admit Card</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant text-[11px] uppercase tracking-wider border-b border-[#d5e3fc]">
                    <th className="py-2.5 px-4 font-semibold">Exam Date &amp; Time</th>
                    <th className="py-2.5 px-4 font-semibold">Code</th>
                    <th className="py-2.5 px-4 font-semibold">Subject Description</th>
                    <th className="py-2.5 px-4 font-semibold">Room Venue</th>
                    <th className="py-2.5 px-4 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d5e3fc]/60 text-on-surface text-xs">
                  {upcomingExams.map((exam, i) => (
                    <tr
                      key={exam.code}
                      className={`hover:bg-surface-container-low/60 transition-colors ${
                        i % 2 === 1 ? "bg-surface-container-lowest" : "bg-surface-container-low/20"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-mono font-semibold text-on-surface">
                          {exam.date}
                        </div>
                        <div className="text-on-surface-variant font-mono text-[11px]">
                          {exam.time}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">
                        {exam.code}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-on-surface">
                          {exam.subject}
                        </div>
                        <div className="text-on-surface-variant text-[11px]">
                          {exam.type}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-xs bg-surface-container px-2 py-0.5 text-on-surface border border-[#d5e3fc] rounded-xs">
                          {exam.room}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold rounded-xs ${exam.statusColor}`}
                        >
                          {exam.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-2.5 bg-surface-container-low flex flex-wrap justify-between items-center text-on-surface-variant font-mono text-[11px] border-t border-[#d5e3fc]">
              <span>
                Institutional Protocol: Physical biometric verification mandatory at hall gate 20 mins prior.
              </span>
              <span className="font-semibold text-primary">
                Total Registered: 5 Courses
              </span>
            </div>
          </div>
          )}

          {/* Section B: Recent Fee Payments & Transaction Ledger */}
          {(studentTab === "all" || studentTab === "fees") && (
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc] rounded-sm overflow-hidden">
            <div className="px-5 py-3.5 bg-surface-container-low border-b border-[#d5e3fc] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  receipt_long
                </span>
                <h2 className="font-headline text-sm font-bold text-primary uppercase tracking-tight">
                  Academic Fee Ledger &amp; Counter Receipts
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase text-on-surface-variant font-semibold">
                  Active Term: Sem IV
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant text-[11px] uppercase tracking-wider border-b border-[#d5e3fc]">
                    <th className="py-2.5 px-4 font-semibold">Date</th>
                    <th className="py-2.5 px-4 font-semibold">Receipt No.</th>
                    <th className="py-2.5 px-4 font-semibold">Allocation Description</th>
                    <th className="py-2.5 px-4 font-semibold">Instrument</th>
                    <th className="py-2.5 px-4 font-semibold">Amount (₹)</th>
                    <th className="py-2.5 px-4 font-semibold">Audit Status</th>
                    <th className="py-2.5 px-4 text-right font-semibold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d5e3fc]/60 text-on-surface text-xs">
                  {recentTransactions.map((tx, idx) => (
                    <tr
                      key={tx.receiptNo}
                      className={`hover:bg-surface-container-low/60 transition-colors ${
                        idx % 2 === 1 ? "bg-surface-container-lowest" : "bg-surface-container-low/20"
                      }`}
                    >
                      <td className="py-3 px-4 font-mono text-on-surface">
                        {tx.date}
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-primary">
                        {tx.receiptNo}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold">{tx.allocation}</div>
                        <div className="text-on-surface-variant text-[11px]">
                          {tx.reg}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-on-surface-variant">
                        {tx.instrument}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-primary">
                        {tx.amount}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 bg-[#ECFDF5] text-[#047857] text-[10px] uppercase font-bold border border-[#a7f3d0] rounded-xs">
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() =>
                            triggerToast(
                              `Downloading verified receipt ${tx.receiptNo}...`
                            )
                          }
                          className="p-1 hover:bg-surface-container text-primary transition-colors cursor-pointer"
                          title="Download PDF Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3.5 bg-surface-container-low border-t border-[#d5e3fc] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase text-on-surface-variant font-semibold">
                  Outstanding Balance:
                </span>
                <span className="font-mono text-xs text-error font-bold">
                  ₹25,000.00 (Due: May 02, 2025)
                </span>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-4 py-2 bg-primary text-white text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-xs rounded-xs flex items-center gap-1.5 cursor-pointer"
              >
                <CreditCard className="w-3.5 h-3.5 text-secondary-container" />
                <span>Pay Slip / Bank Challan Advice</span>
              </button>
            </div>
          </div>
          )}
        </div>

        {/* RIGHT COLUMN: Bulletins, Digital ID Pass, Credentials (4 cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          {/* Section C: Urgent Notices & Campus Dispatch */}
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc] rounded-sm overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 bg-surface-container-low border-b border-[#d5e3fc] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  campaign
                </span>
                <h2 className="font-headline text-sm font-bold text-primary uppercase tracking-tight">
                  Institutional Bulletins
                </h2>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
            </div>

            <div className="p-4 space-y-3 flex flex-col">
              {/* Notice 1 */}
              <div className="p-3 bg-surface-container-low hover:bg-surface-container transition-colors border-l-3 border-red-500 flex flex-col rounded-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-1.5 py-0.5 bg-[#FEF2F2] text-[#B91C1C] text-[10px] uppercase font-bold tracking-wider rounded-xs border border-red-200">
                    High Priority
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    2 hours ago
                  </span>
                </div>
                <Link
                  href="/student/notices"
                  className="font-headline text-xs font-bold text-primary hover:underline mt-1"
                >
                  Semester IV Mid-Term Examination Datesheet Released
                </Link>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                  Examination Control Board has published final hall allocations and seated rosters for computing modules.
                </p>
              </div>

              {/* Notice 2 */}
              <div className="p-3 bg-surface-container-low hover:bg-surface-container transition-colors border-l-3 border-secondary flex flex-col rounded-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-1.5 py-0.5 bg-surface-container text-on-surface text-[10px] uppercase font-semibold rounded-xs border border-[#d5e3fc]">
                    Department Event
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    Yesterday
                  </span>
                </div>
                <Link
                  href="/student/notices"
                  className="font-headline text-xs font-bold text-primary hover:underline mt-1"
                >
                  Distinguished Lecture: AI &amp; Kernel Architecture
                </Link>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                  Keynote session by Dr. Elena Rostova on Distributed OS Memory Models. Turing Hall &bull; 03:00 PM.
                </p>
              </div>

              {/* Notice 3 */}
              <div className="p-3 bg-surface-container-low hover:bg-surface-container transition-colors border-l-3 border-amber-500 flex flex-col rounded-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="px-1.5 py-0.5 bg-[#FFFBEB] text-[#B45309] text-[10px] uppercase font-semibold rounded-xs border border-[#fde68a]">
                    Bursar Office
                  </span>
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    3 days ago
                  </span>
                </div>
                <Link
                  href="/student/notices"
                  className="font-headline text-xs font-bold text-primary hover:underline mt-1"
                >
                  Tuition Installment #2 Submission Counter Active
                </Link>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">
                  Counter Till #01 and #02 accepting Challans and NEFT reconciliations for Term IV without penalty till May 02.
                </p>
              </div>
            </div>

            <div className="p-2.5 bg-surface-container-low border-t border-[#d5e3fc] text-center">
              <Link
                href="/student/notices"
                className="text-xs uppercase font-bold text-primary hover:text-secondary inline-flex items-center gap-1"
              >
                <span>Access Bulletin Archive</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Section D: Digital Credential & ID Validation Card */}
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc] p-5 rounded-sm flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-wider font-bold text-primary">
                  Digital Student ID Pass
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#047857] font-semibold bg-[#ECFDF5] px-1.5 py-0.5 border border-[#a7f3d0] rounded-xs">
                VALID (QR-Active)
              </span>
            </div>

            {/* Rendered Mini CR80 Student Identity Layout */}
            <div className="relative bg-gradient-to-br from-primary via-primary-container to-secondary text-white p-4 mt-3 rounded-sm shadow-inner overflow-hidden border border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-secondary-container font-semibold">
                    Apex Institute of Technology
                  </div>
                  <div className="font-headline text-base font-bold mt-1 text-white">
                    Rahul Sharma
                  </div>
                  <div className="font-mono text-xs text-secondary-fixed-dim">
                    APX-2023-CS-042
                  </div>
                </div>
                <div className="w-12 h-14 bg-white/10 border border-white/20 rounded-xs flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-[36px] text-white/80">
                    person
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-2 flex justify-between items-end bg-black/30 -mx-4 -mb-4 px-4 py-2 border-t border-white/10">
                <div>
                  <div className="text-[8px] uppercase text-surface-variant font-medium">
                    Validity Epoch
                  </div>
                  <div className="font-mono text-xs font-bold text-white">
                    EXP: JUN 2027
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-secondary-container" />
                  <span className="font-mono text-[10px] text-white/80">
                    CR80 SMARTPASS
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/student/id-card"
              className="mt-4 w-full py-2 bg-primary text-white text-xs uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-xs text-center rounded-xs"
            >
              <Printer className="w-3.5 h-3.5 text-secondary-container" />
              <span>Print / Export CR80 Card</span>
            </Link>
          </div>

          {/* Section E: Academic Certificates Available */}
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc] p-5 rounded-sm flex flex-col">
            <div className="flex items-center justify-between pb-2 border-b border-[#d5e3fc]">
              <span className="text-xs uppercase tracking-wider font-bold text-primary">
                Verified Certificates
              </span>
              <span className="px-1.5 py-0.5 bg-surface-container font-mono text-[11px] font-bold text-primary rounded-xs border border-[#d5e3fc]">
                2 Ready
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <div className="p-2.5 bg-surface-container-low border border-[#d5e3fc]/80 rounded-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-semibold truncate text-on-surface">
                      Bonafide Certificate
                    </div>
                    <div className="font-mono text-[10px] text-on-surface-variant">
                      Issued: Feb 12, 2025
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    triggerToast("Downloading official Bonafide Certificate...")
                  }
                  className="p-1 hover:bg-surface-container text-primary transition-colors cursor-pointer"
                  title="Download Document"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2.5 bg-surface-container-low border border-[#d5e3fc]/80 rounded-xs flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-semibold truncate text-on-surface">
                      Sem III Grade Transcript
                    </div>
                    <div className="font-mono text-[10px] text-on-surface-variant">
                      GPA: 8.72 &bull; Verified
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    triggerToast("Downloading official Sem III Transcript...")
                  }
                  className="p-1 hover:bg-surface-container text-primary transition-colors cursor-pointer"
                  title="Download Document"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowAttestationModal(true)}
              className="mt-4 w-full py-2 bg-surface-container text-primary text-xs uppercase tracking-wider font-semibold hover:bg-surface-container-high transition-colors text-center border border-[#d5e3fc] rounded-xs cursor-pointer"
            >
              Request Attestation / Transcript
            </button>
          </div>

          {/* Section F: Designated Faculty Mentor & Helpdesk */}
          <div className="bg-surface-container-lowest shadow-xs border border-[#d5e3fc] p-5 rounded-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-[#d5e3fc]">
              <span className="material-symbols-outlined text-primary text-[20px]">
                support_agent
              </span>
              <span className="text-xs uppercase tracking-wider font-bold text-primary">
                Faculty Mentor Liaison
              </span>
            </div>

            <div className="flex items-start gap-3 mt-3">
              <div className="w-10 h-10 bg-primary-container text-white flex items-center justify-center shrink-0 rounded-xs">
                <span className="material-symbols-outlined text-[24px]">
                  school
                </span>
              </div>
              <div>
                <div className="font-headline text-sm font-bold text-primary">
                  Prof. Rajesh K. Sharma
                </div>
                <div className="text-[11px] uppercase tracking-wide text-on-surface-variant">
                  Associate Chair &bull; Dept of CSE
                </div>
                <a
                  href="mailto:r.sharma@apex.ac.in"
                  className="font-mono text-xs text-secondary mt-1 hover:underline block font-semibold"
                >
                  r.sharma@apex.ac.in
                </a>
              </div>
            </div>

            <div className="mt-3 pt-2 bg-surface-container-low p-2.5 text-on-surface-variant font-mono text-[11px] flex justify-between border border-[#d5e3fc]/80 rounded-xs">
              <span>Office: Tech Block 4, Rm 212</span>
              <span>Hours: Mon/Wed 2-4 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Hall Ticket Preview & Print Modal */}
      {showHallTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-2xl max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 duration-150 rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  assignment_turned_in
                </span>
                <h3 className="font-headline text-base font-bold text-primary uppercase">
                  Official Examination Admit Card &bull; Hall Ticket
                </h3>
              </div>
              <button
                onClick={() => setShowHallTicketModal(false)}
                className="text-on-surface-variant hover:text-primary p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hall Ticket Card Sheet */}
            <div className="my-4 p-5 border-2 border-primary/20 bg-surface/30 space-y-4 rounded-xs">
              <div className="flex items-center justify-between border-b pb-3 border-dashed border-[#d5e3fc]">
                <div>
                  <div className="font-headline text-lg font-bold text-primary">
                    APEX INSTITUTE OF TECHNOLOGY
                  </div>
                  <div className="text-xs uppercase text-on-surface-variant font-medium">
                    Office of the Controller of Examinations
                  </div>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="font-bold text-primary">ADMIT CARD #HT-2025-042</div>
                  <div className="text-emerald-700 font-semibold">SEAT VERIFIED &bull; AY 2025-26</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase">
                    Student Name
                  </span>
                  <div className="font-bold text-primary">Rahul Sharma</div>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase">
                    Roll Number
                  </span>
                  <div className="font-mono font-bold text-primary">23CS042</div>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase">
                    Program / Sem
                  </span>
                  <div className="font-bold text-primary">B.Tech CSE / Sem IV</div>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase">
                    Center Allocation
                  </span>
                  <div className="font-mono font-bold text-primary">AUD-B / North Campus</div>
                </div>
              </div>

              <div className="border border-[#d5e3fc] rounded-xs overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container font-semibold uppercase text-[10px] border-b border-[#d5e3fc]">
                    <tr>
                      <th className="p-2">Code</th>
                      <th className="p-2">Subject</th>
                      <th className="p-2">Date &amp; Slot</th>
                      <th className="p-2 text-right">Seat Desk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d5e3fc]">
                    <tr>
                      <td className="p-2 font-mono font-bold text-primary">CS-401</td>
                      <td className="p-2 font-medium">Database Management Systems</td>
                      <td className="p-2 font-mono text-on-surface-variant">15-Apr-2025 (09:30 AM)</td>
                      <td className="p-2 font-mono text-right font-bold text-primary">Desk 42</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-primary">CS-402</td>
                      <td className="p-2 font-medium">Operating Systems &amp; Kernel Arch</td>
                      <td className="p-2 font-mono text-on-surface-variant">17-Apr-2025 (09:30 AM)</td>
                      <td className="p-2 font-mono text-right font-bold text-primary">Desk 42</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-mono font-bold text-primary">CS-403</td>
                      <td className="p-2 font-medium">Design &amp; Analysis of Algorithms</td>
                      <td className="p-2 font-mono text-on-surface-variant">21-Apr-2025 (02:00 PM)</td>
                      <td className="p-2 font-mono text-right font-bold text-primary">Desk 18</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-blue-50 text-blue-900 text-[11px] leading-relaxed border border-blue-200 rounded-xs">
                <strong>Important Instructions:</strong> Candidate must present their physical Institutional Smartcard along with this admit card. Electronic gadgets and smart wearables are strictly prohibited inside the examination center.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setShowHallTicketModal(false)}
                className="px-4 py-2 border border-[#d5e3fc] text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container rounded-xs cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowHallTicketModal(false);
                  triggerToast("Printing official Hall Ticket PDF...");
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container flex items-center gap-1.5 rounded-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-secondary-container" />
                <span>Print Admit Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Offline Fee Payment Advice & Counter Challan (SRS FR-6.2 Compliant) */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150 rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                <h3 className="font-headline text-base font-bold text-primary uppercase">
                  Counter Fee Payment Advice &amp; Bank Challan
                </h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-on-surface-variant hover:text-primary p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="bg-surface-container-low p-3.5 border border-[#d5e3fc] rounded-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[11px] uppercase text-on-surface-variant font-semibold">
                      Outstanding Tuition Installment #2
                    </div>
                    <div className="text-2xl font-bold font-headline text-primary mt-1">
                      ₹25,000.00
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 rounded-xs uppercase">
                    Due: May 02, 2025
                  </span>
                </div>
                <div className="text-[10px] text-on-surface-variant font-mono mt-2 pt-2 border-t border-[#d5e3fc]/60">
                  Student UID: APX-2023-CS-042 &bull; Name: Rahul Sharma &bull; Sem IV
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-primary block mb-2">
                  Offline Payment Modes (SRS FR-6.2 Standard)
                </label>
                <div className="space-y-2 text-xs">
                  {/* Mode 1 */}
                  <div className="p-3 border border-secondary/40 bg-surface-container-low/50 rounded-xs space-y-1">
                    <div className="font-bold text-primary flex items-center justify-between">
                      <span>1. Cash / Cheque / DD at Accounts Desk</span>
                      <span className="text-[10px] font-mono text-secondary bg-surface-container px-1.5 py-0.5 rounded-xs font-bold">
                        Till #01 / #02
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">
                      Visit Main Campus Administrative Block, Window 2. Immediate printed thermal receipt will be issued.
                    </p>
                  </div>

                  {/* Mode 2 */}
                  <div className="p-3 border border-[#d5e3fc] bg-surface-container-low/30 rounded-xs space-y-1">
                    <div className="font-bold text-primary flex items-center justify-between">
                      <span>2. Direct Bank Wire (NEFT / RTGS / IMPS)</span>
                      <span className="text-[10px] font-mono text-primary font-bold">
                        HDFC Bank
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-on-surface-variant grid grid-cols-2 gap-1 pt-1">
                      <div>A/C Name: <strong>APEX INSTITUTE</strong></div>
                      <div>A/C No: <strong>50200049281092</strong></div>
                      <div>IFSC: <strong>HDFC0001092</strong></div>
                      <div>Branch: <strong>Connaught Place</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50 text-blue-900 border border-blue-200 text-[11px] flex items-center gap-2 rounded-xs">
                <Info className="w-4 h-4 text-secondary shrink-0" />
                <span>
                  After bank wire or counter deposit, quote your UTR or submit receipt copy at Counter Till #02 for instant ledger reconciliation.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-[#d5e3fc] text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container rounded-xs cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  triggerToast("Bank Deposit Challan Slip PDF generated for ₹25,000.00!");
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container flex items-center gap-1.5 rounded-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-secondary-container" />
                <span>Download / Print Bank Challan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Attestation Request Modal */}
      {showAttestationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150 rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-headline text-base font-bold text-primary uppercase">
                  Request Document Attestation
                </h3>
              </div>
              <button
                onClick={() => setShowAttestationModal(false)}
                className="text-on-surface-variant hover:text-primary p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div>
                <label className="text-xs uppercase font-bold text-primary block mb-1">
                  Document Type
                </label>
                <select className="w-full border border-[#d5e3fc] p-2 text-xs bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary rounded-xs">
                  <option>Official Transcript (All Semesters)</option>
                  <option>Bonafide &amp; Character Certificate</option>
                  <option>Medium of Instruction Certificate</option>
                  <option>Fee Structure &amp; Clearance Dossier</option>
                  <option>No Objection Certificate (NOC)</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-primary block mb-1">
                  Purpose of Request
                </label>
                <input
                  type="text"
                  placeholder="e.g. Higher Education, Internship, Visa Verification"
                  className="w-full border border-[#d5e3fc] p-2 text-xs bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary rounded-xs"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-primary block mb-1">
                  Delivery Mode
                </label>
                <select className="w-full border border-[#d5e3fc] p-2 text-xs bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary rounded-xs">
                  <option>Digital Signed PDF (Free, 24-48 hrs)</option>
                  <option>Physical Stamped Copy (Registrar Desk pickup)</option>
                  <option>Speed Post to Registered Residence Address</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setShowAttestationModal(false)}
                className="px-4 py-2 border border-[#d5e3fc] text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container rounded-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAttestationModal(false);
                  triggerToast(
                    "Attestation ticket submitted. Reference: #ATT-2025-081"
                  );
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container rounded-xs cursor-pointer"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
