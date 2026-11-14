"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  CalendarCheck,
  CreditCard,
  Award,
  Bell,
  Clock,
  Download,
  Receipt,
  BadgeCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  FileText,
  User,
  Headphones,
  Printer,
  QrCode,
  ShieldCheck,
  Info,
  X
} from "lucide-react";

export default function StudentDashboardPage() {
  const [studentTab, setStudentTab] = useState<"all" | "exams" | "fees">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showHallTicketModal, setShowHallTicketModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showAttestationModal, setShowAttestationModal] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const upcomingExams = [
    {
      date: "Apr 15, 2025",
      time: "09:30 AM – 12:30 PM",
      code: "CS-401",
      subject: "Database Management Systems",
      type: "Theory Examination • 100 Marks",
      room: "AUD-B / Desk 42",
      status: "Scheduled",
      statusColor: "bg-blue-50 text-blue-700 border border-blue-200",
    },
    {
      date: "Apr 17, 2025",
      time: "09:30 AM – 12:30 PM",
      code: "CS-402",
      subject: "Operating Systems & Kernel Architecture",
      type: "Theory Examination • 100 Marks",
      room: "AUD-B / Desk 42",
      status: "Admit Ready",
      statusColor: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    {
      date: "Apr 21, 2025",
      time: "02:00 PM – 05:00 PM",
      code: "CS-403",
      subject: "Design & Analysis of Algorithms",
      type: "Theory Examination • 100 Marks",
      room: "HALL-3 / Desk 18",
      status: "Admit Ready",
      statusColor: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    {
      date: "Apr 24, 2025",
      time: "09:30 AM – 12:30 PM",
      code: "CS-404",
      subject: "Formal Languages & Automata Theory",
      type: "Theory Examination • 100 Marks",
      room: "AUD-B / Desk 42",
      status: "Scheduled",
      statusColor: "bg-slate-50 text-slate-700 border border-slate-200",
    },
    {
      date: "Apr 27, 2025",
      time: "09:30 AM – 12:30 PM",
      code: "CS-405L",
      subject: "Database & OS Systems Engineering Laboratory",
      type: "Practical Viva • 50 Marks",
      room: "LAB-TURING-3",
      status: "Scheduled",
      statusColor: "bg-slate-50 text-slate-700 border border-slate-200",
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
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/60 via-indigo-50/30 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Enrolled &bull; Active
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60">
                Roll: 23CS042
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                UID: APX-2023-CS-042
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back, Rahul Sharma! 🎓
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                B.Tech Computer Science &amp; Engineering &bull; Semester IV (Batch 2023–27)
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <Link
              href="/student/id-card"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition-all"
            >
              <BadgeCheck className="w-4 h-4" />
              <span>Download ID Card</span>
            </Link>
            <button
              onClick={() => setShowHallTicketModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Admit Card</span>
            </button>
            <Link
              href="/student/fees"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <Receipt className="w-4 h-4 text-slate-500" />
              <span>Fee Receipts</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Degree Progress</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">68.0%</span>
              <span className="text-xs text-slate-500">Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span>108 / 160 Credits</span>
            <span className="font-medium text-blue-600">4 Sems Left</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Attendance Rate</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">88.4%</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Good Standing
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "88.4%" }}></div>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span>114 / 129 Sessions</span>
            <span className="text-emerald-600 font-semibold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +2.1%
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Fees Balance</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-600 tracking-tight font-mono">₹25,000</span>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Installment 2
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: "68.75%" }}></div>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span className="font-mono">Paid: ₹55k / ₹80k</span>
            <span className="text-amber-700 font-medium">Due May 02</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Term Evaluation</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">Mid-Term IV</span>
              <span className="text-xs text-slate-500">5 Papers</span>
            </div>
            <p className="text-xs text-blue-600 font-medium mt-3">
              Starts: April 15, 2025
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span>Hall Ticket: Generated</span>
            <span className="font-semibold text-purple-600">In 12 Days</span>
          </div>
        </div>
      </div>

      {/* Dual Column Layout: Left (8 Cols) / Right (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols): Tables */}
        <div className="lg:col-span-8 space-y-6">
          {/* Navigation Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setStudentTab("all")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                studentTab === "all"
                  ? "bg-emerald-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Academic Records
            </button>
            <button
              onClick={() => setStudentTab("exams")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                studentTab === "exams"
                  ? "bg-emerald-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Exams &amp; Datesheet ({upcomingExams.length})
            </button>
            <button
              onClick={() => setStudentTab("fees")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                studentTab === "fees"
                  ? "bg-emerald-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Fee Receipts ({recentTransactions.length})
            </button>
          </div>

          {/* Section: Upcoming Examination Schedule */}
          {(studentTab === "all" || studentTab === "exams") && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Mid-Semester Examination Schedule
                    </h2>
                    <p className="text-xs text-slate-500">Semester IV &bull; Seated Hall Allocations</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHallTicketModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Admit Card</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-100">
                      <th className="py-3 px-6 font-semibold">Date &amp; Time</th>
                      <th className="py-3 px-6 font-semibold">Code</th>
                      <th className="py-3 px-6 font-semibold">Subject</th>
                      <th className="py-3 px-6 font-semibold">Room Venue</th>
                      <th className="py-3 px-6 text-right font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {upcomingExams.map((exam) => (
                      <tr key={exam.code} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-6">
                          <div className="font-semibold text-slate-900">{exam.date}</div>
                          <div className="text-[11px] text-slate-400">{exam.time}</div>
                        </td>
                        <td className="py-3.5 px-6 font-bold text-blue-600">
                          {exam.code}
                        </td>
                        <td className="py-3.5 px-6">
                          <div className="font-semibold text-slate-800">{exam.subject}</div>
                          <div className="text-[11px] text-slate-400">{exam.type}</div>
                        </td>
                        <td className="py-3.5 px-6">
                          <span className="bg-slate-100 px-2.5 py-1 text-slate-700 font-medium rounded-md">
                            {exam.room}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <span className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${exam.statusColor}`}>
                            {exam.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-3 bg-slate-50 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                <span>Please report to the hall 20 minutes before the scheduled exam time.</span>
                <span className="font-semibold text-slate-700">Total: 5 Registered Courses</span>
              </div>
            </div>
          )}

          {/* Section: Fee Payments & Receipts */}
          {(studentTab === "all" || studentTab === "fees") && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Fee Payment History &amp; Receipts
                    </h2>
                    <p className="text-xs text-slate-500">Verified institutional counter receipts</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay Due / Get Challan</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-100">
                      <th className="py-3 px-6 font-semibold">Date</th>
                      <th className="py-3 px-6 font-semibold">Receipt No</th>
                      <th className="py-3 px-6 font-semibold">Allocation</th>
                      <th className="py-3 px-6 font-semibold">Mode</th>
                      <th className="py-3 px-6 font-semibold">Amount</th>
                      <th className="py-3 px-6 text-right font-semibold">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.receiptNo} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-6 text-slate-700">{tx.date}</td>
                        <td className="py-3.5 px-6 font-semibold text-blue-600 font-mono">
                          {tx.receiptNo}
                        </td>
                        <td className="py-3.5 px-6">
                          <div className="font-semibold text-slate-800">{tx.allocation}</div>
                          <div className="text-[11px] text-slate-400">{tx.reg}</div>
                        </td>
                        <td className="py-3.5 px-6 text-slate-600">{tx.instrument}</td>
                        <td className="py-3.5 px-6 font-bold text-slate-900 font-mono">
                          {tx.amount}
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          <button
                            onClick={() => triggerToast(`Downloading receipt ${tx.receiptNo}...`)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
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

              <div className="px-6 py-3 bg-slate-50 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="text-slate-500">
                  Outstanding Balance: <strong className="text-amber-600 font-mono">₹25,000.00</strong>
                </span>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                >
                  Pay Offline or Bank Challan &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 Cols): ID Pass, Bulletins, Mentor */}
        <div className="lg:col-span-4 space-y-6">
          {/* Digital ID Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900">
                  Digital Student ID Card
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Active
              </span>
            </div>

            {/* Rendered ID Card Visual */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-5 rounded-2xl shadow-md relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-blue-200 font-semibold">
                    Apex Institute of Technology
                  </div>
                  <div className="text-lg font-bold mt-1">Rahul Sharma</div>
                  <div className="text-xs text-blue-200 font-mono mt-0.5">APX-2023-CS-042</div>
                </div>
                <div className="w-12 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center">
                  <User className="w-7 h-7 text-white/90" />
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/15 flex justify-between items-end">
                <div>
                  <div className="text-[9px] uppercase text-blue-200">Valid Through</div>
                  <div className="text-xs font-bold font-mono">June 2027</div>
                </div>
                <div className="flex items-center gap-1.5 text-blue-200 text-xs font-mono">
                  <QrCode className="w-4 h-4" />
                  <span>SMARTPASS</span>
                </div>
              </div>
            </div>

            <Link
              href="/student/id-card"
              className="mt-4 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Full View / Print ID Card</span>
            </Link>
          </div>

          {/* Bulletins & Notices */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Campus Notices</h3>
              </div>
              <Link href="/student/notices" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
                All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 bg-rose-50/70 border border-rose-200/60 rounded-xl">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold uppercase text-rose-700">High Priority</span>
                  <span className="text-slate-400">2h ago</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  Mid-Term Examination Datesheet Released
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Final hall tickets and seat desk allocations published for all Semester IV subjects.
                </p>
              </div>

              <div className="p-3.5 bg-blue-50/50 border border-blue-200/60 rounded-xl">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold uppercase text-blue-700">Guest Lecture</span>
                  <span className="text-slate-400">Yesterday</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  AI &amp; Distributed Systems Lecture
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Keynote session on modern system architecture at Turing Auditorium at 03:00 PM.
                </p>
              </div>
            </div>
          </div>

          {/* Faculty Mentor Liaison */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
              <Headphones className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Faculty Mentor</h3>
            </div>

            <div className="flex items-start gap-3 mt-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm shrink-0">
                RS
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Prof. Rajesh K. Sharma</div>
                <div className="text-xs text-slate-500">Department of Computer Science</div>
                <a
                  href="mailto:r.sharma@apex.ac.in"
                  className="text-xs text-blue-600 font-semibold hover:underline mt-0.5 block"
                >
                  r.sharma@apex.ac.in
                </a>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
              <span>Office: Tech Block 4, Rm 212</span>
              <span>Hours: Mon/Wed 2–4 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Hall Ticket Preview Modal */}
      {showHallTicketModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Official Examination Admit Card
                </h3>
              </div>
              <button
                onClick={() => setShowHallTicketModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 p-5 border border-slate-200 rounded-xl bg-slate-50/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="text-base font-bold text-slate-900">APEX INSTITUTE OF TECHNOLOGY</div>
                  <div className="text-xs text-slate-500">Controller of Examinations &bull; AY 2025–26</div>
                </div>
                <div className="text-right text-xs font-mono font-bold text-blue-600">
                  #HT-2025-042
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Student</span>
                  <div className="font-semibold text-slate-900">Rahul Sharma</div>
                </div>
                <div>
                  <span className="text-slate-400">Roll No</span>
                  <div className="font-semibold text-slate-900 font-mono">23CS042</div>
                </div>
                <div>
                  <span className="text-slate-400">Program</span>
                  <div className="font-semibold text-slate-900">B.Tech CSE - Sem IV</div>
                </div>
                <div>
                  <span className="text-slate-400">Center</span>
                  <div className="font-semibold text-slate-900">AUD-B (North Campus)</div>
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5">Date &amp; Time</th>
                      <th className="p-2.5 text-right">Desk</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600 font-mono">CS-401</td>
                      <td className="p-2.5 font-medium text-slate-800">Database Management Systems</td>
                      <td className="p-2.5 text-slate-600">15-Apr-2025 (09:30 AM)</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">Desk 42</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600 font-mono">CS-402</td>
                      <td className="p-2.5 font-medium text-slate-800">Operating Systems</td>
                      <td className="p-2.5 text-slate-600">17-Apr-2025 (09:30 AM)</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">Desk 42</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-blue-600 font-mono">CS-403</td>
                      <td className="p-2.5 font-medium text-slate-800">Design &amp; Analysis of Algorithms</td>
                      <td className="p-2.5 text-slate-600">21-Apr-2025 (02:00 PM)</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">Desk 18</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowHallTicketModal(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowHallTicketModal(false);
                  triggerToast("Printing official Admit Card PDF...");
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Admit Card</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Fee Payment Advice Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Fee Payment &amp; Bank Challan
                </h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Pending Balance (Tranche 2)</div>
                    <div className="text-2xl font-bold text-slate-900 font-mono mt-1">₹25,000.00</div>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                    Due: May 02, 2025
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-semibold text-slate-900">1. Counter Cash / Cheque Payment</div>
                  <p className="text-slate-500 mt-0.5">Visit Counter Till #01 or #02 at Admin Block. Thermal receipt issued on the spot.</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-semibold text-slate-900">2. Bank Wire / NEFT Transfer</div>
                  <div className="text-slate-600 mt-1 space-y-0.5 font-mono text-[11px]">
                    <div>Bank: HDFC Bank (Connaught Place)</div>
                    <div>A/C Name: APEX INSTITUTE OF TECHNOLOGY</div>
                    <div>A/C No: 50200049281092 &bull; IFSC: HDFC0001092</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  triggerToast("Bank Challan slip downloaded successfully!");
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Bank Challan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
