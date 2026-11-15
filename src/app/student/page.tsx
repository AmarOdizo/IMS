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
  TrendingUp,
  User,
  Headphones,
  Printer,
  QrCode,
  X,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function StudentDashboardPage() {
  const [studentTab, setStudentTab] = useState<"all" | "exams" | "fees">("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showHallTicketModal, setShowHallTicketModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrintAdmitCard = () => {
    triggerToast("Opening 1-Page Official Admit Card Print...");
    const card = document.getElementById("printable-admit-card");
    if (!card) return;

    const printWindow = window.open("", "_blank", "width=850,height=1100");
    if (printWindow) {
      const cardHTML = card.outerHTML;
      printWindow.document.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Admit_Card_23CS042_Rahul_Sharma</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap">
    <style>
      @page {
        size: A4 portrait;
        margin: 5mm;
      }
      *, *::before, *::after {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      html, body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        font-family: 'Geist', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #0f172a;
      }
      .print-container {
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
      }
      #printable-admit-card {
        width: 100% !important;
        max-width: 100% !important;
        box-shadow: none !important;
        border: 2px solid #0f172a !important;
        padding: 14px 18px !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        break-after: avoid !important;
      }
    </style>
  </head>
  <body>
    <div class="print-container">
      ${cardHTML}
    </div>
    <script>
      window.onload = function() {
        window.focus();
        setTimeout(function() {
          window.print();
          window.close();
        }, 250);
      };
    <\/script>
  </body>
</html>`);
      printWindow.document.close();
    } else {
      window.print();
    }
  };

  const upcomingExams = [
    {
      date: "Apr 15, 2025",
      time: "09:30 AM",
      code: "CS-401",
      subject: "Database Management Systems",
      room: "AUD-B / Desk 42",
      status: "Admit Ready",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      date: "Apr 17, 2025",
      time: "09:30 AM",
      code: "CS-402",
      subject: "Operating Systems",
      room: "AUD-B / Desk 42",
      status: "Admit Ready",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      date: "Apr 21, 2025",
      time: "02:00 PM",
      code: "CS-403",
      subject: "Design & Analysis of Algorithms",
      room: "HALL-3 / Desk 18",
      status: "Admit Ready",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      date: "Apr 24, 2025",
      time: "09:30 AM",
      code: "CS-404",
      subject: "Automata & Formal Languages",
      room: "AUD-B / Desk 42",
      status: "Scheduled",
      statusColor: "bg-slate-50 text-slate-700 border-slate-200",
    },
    {
      date: "Apr 27, 2025",
      time: "09:30 AM",
      code: "CS-405L",
      subject: "Systems Engineering Lab",
      room: "LAB-TURING-3",
      status: "Scheduled",
      statusColor: "bg-slate-50 text-slate-700 border-slate-200",
    },
  ];

  const recentTransactions = [
    {
      date: "Jan 10, 2025",
      receiptNo: "#REC-2025-0842",
      allocation: "Semester IV Tuition (Installment 1)",
      instrument: "Counter Cash",
      amount: "₹27,500.00",
    },
    {
      date: "Oct 15, 2024",
      receiptNo: "#REC-2024-5120",
      allocation: "Semester III Tuition (Final)",
      instrument: "Online NEFT",
      amount: "₹40,000.00",
    },
    {
      date: "Jul 22, 2024",
      receiptNo: "#REC-2024-2104",
      allocation: "Annual Tech & Lab Fee",
      instrument: "Demand Draft",
      amount: "₹15,000.00",
    },
  ];

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

      {/* 1. Header Hero Card with Clean Action Buttons */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
            RS
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
                Rahul Sharma
              </h1>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                Active Student
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              B.Tech Computer Science &bull; Semester IV &bull; Roll: <span className="font-mono font-semibold text-slate-700">23CS042</span>
            </p>
          </div>
        </div>

        {/* Buttons cleanly arranged with clear hierarchy */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => setShowHallTicketModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Admit Card</span>
          </button>
          <Link
            href="/student/id-card"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 transition-all"
          >
            <BadgeCheck className="w-4 h-4 text-violet-600" />
            <span>ID Card</span>
          </Link>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 transition-all cursor-pointer"
          >
            <CreditCard className="w-4 h-4 text-slate-500" />
            <span>Pay Due</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Simplified KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {/* Metric 1: Degree Progress */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Degree Progress</span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-[#3D405B]">68%</span>
              <span className="text-[11px] text-slate-400">108/160 Credits</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-violet-600 h-full rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>
        </div>

        {/* Metric 2: Attendance */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Attendance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-emerald-600">88.4%</span>
              <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                Regular
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "88.4%" }}></div>
            </div>
          </div>
        </div>

        {/* Metric 3: Fee Balance */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Fees</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-amber-600 font-mono">₹25,000</span>
              <span className="text-[11px] text-amber-700 font-medium">Due May 02</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: "68%" }}></div>
            </div>
          </div>
        </div>

        {/* Metric 4: Upcoming Exam */}
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Upcoming Exams</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-[#3D405B]">Mid-Term IV</span>
              <span className="text-[11px] text-violet-700 font-medium">Starts Apr 15</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">5 registered examination papers</p>
          </div>
        </div>
      </div>

      {/* 3. Main Content: Left Column (Tables) + Right Column (Widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols): Academic Tables */}
        <div className="lg:col-span-8 space-y-5">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setStudentTab("all")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                studentTab === "all"
                  ? "bg-violet-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-[#3D405B]"
              }`}
            >
              All Overview
            </button>
            <button
              onClick={() => setStudentTab("exams")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                studentTab === "exams"
                  ? "bg-violet-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-[#3D405B]"
              }`}
            >
              Exams ({upcomingExams.length})
            </button>
            <button
              onClick={() => setStudentTab("fees")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                studentTab === "fees"
                  ? "bg-violet-600 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-[#3D405B]"
              }`}
            >
              Fee Receipts ({recentTransactions.length})
            </button>
          </div>

          {/* Section: Examination Schedule Table */}
          {(studentTab === "all" || studentTab === "exams") && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#3D405B]">Examination Schedule</h2>
                    <p className="text-xs text-slate-400">Mid-Term IV Datesheet</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHallTicketModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Admit Card</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-100">
                      <th className="py-3 px-5 font-semibold">Date & Time</th>
                      <th className="py-3 px-5 font-semibold">Code</th>
                      <th className="py-3 px-5 font-semibold">Subject</th>
                      <th className="py-3 px-5 font-semibold">Venue</th>
                      <th className="py-3 px-5 text-right font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {upcomingExams.map((exam) => (
                      <tr key={exam.code} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-5">
                          <div className="font-semibold text-[#3D405B]">{exam.date}</div>
                          <div className="text-[11px] text-slate-400">{exam.time}</div>
                        </td>
                        <td className="py-3 px-5 font-mono font-bold text-violet-700">
                          {exam.code}
                        </td>
                        <td className="py-3 px-5 font-medium text-slate-800">
                          {exam.subject}
                        </td>
                        <td className="py-3 px-5">
                          <span className="bg-slate-100 px-2 py-0.5 text-slate-700 font-medium rounded">
                            {exam.room}
                          </span>
                        </td>
                        <td className="py-3 px-5 text-right">
                          <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full border ${exam.statusColor}`}>
                            {exam.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section: Fee Payments Table */}
          {(studentTab === "all" || studentTab === "fees") && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#3D405B]">Fee Receipts</h2>
                    <p className="text-xs text-slate-400">Payment records and vouchers</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay Balance</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-100">
                      <th className="py-3 px-5 font-semibold">Date</th>
                      <th className="py-3 px-5 font-semibold">Receipt No</th>
                      <th className="py-3 px-5 font-semibold">Description</th>
                      <th className="py-3 px-5 font-semibold">Mode</th>
                      <th className="py-3 px-5 font-semibold">Amount</th>
                      <th className="py-3 px-5 text-right font-semibold">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.receiptNo} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-5 text-slate-600">{tx.date}</td>
                        <td className="py-3 px-5 font-mono font-semibold text-violet-700">
                          {tx.receiptNo}
                        </td>
                        <td className="py-3 px-5 font-medium text-slate-800">
                          {tx.allocation}
                        </td>
                        <td className="py-3 px-5 text-slate-600">{tx.instrument}</td>
                        <td className="py-3 px-5 font-mono font-bold text-[#3D405B]">
                          {tx.amount}
                        </td>
                        <td className="py-3 px-5 text-right">
                          <button
                            onClick={() => triggerToast(`Receipt ${tx.receiptNo} downloaded`)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-violet-700 transition-colors cursor-pointer"
                            title="Download Receipt PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 Cols): Widgets */}
        <div className="lg:col-span-4 space-y-5">
          {/* Digital ID Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-bold text-[#3D405B]">Student ID Pass</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>

            {/* Clean ID Badge Visual */}
            <div className="bg-gradient-to-br from-violet-700 to-indigo-900 text-white p-4 rounded-xl shadow-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-violet-200 font-semibold">
                    Apex Institute
                  </div>
                  <div className="text-base font-bold mt-1">Rahul Sharma</div>
                  <div className="text-xs text-violet-200 font-mono">23CS042</div>
                </div>
                <div className="w-10 h-12 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-white/90" />
                </div>
              </div>
              <div className="mt-4 pt-2.5 border-t border-white/15 flex justify-between items-center text-xs font-mono text-violet-200">
                <span>Valid: Jun 2027</span>
                <span className="flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" /> SMARTPASS
                </span>
              </div>
            </div>

            <Link
              href="/student/id-card"
              className="mt-3.5 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Full ID Card View</span>
            </Link>
          </div>

          {/* Campus Notices */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-violet-600" />
                <h3 className="text-sm font-bold text-[#3D405B]">Important Notices</h3>
              </div>
              <Link href="/student/notices" className="text-xs text-violet-700 hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-rose-50/60 border border-rose-200/50 rounded-xl">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold uppercase text-rose-700">Exam Alert</span>
                  <span className="text-slate-400">2h ago</span>
                </div>
                <h4 className="text-xs font-bold text-[#3D405B] mt-1">
                  Mid-Term Datesheet Released
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Seat desk allocations are now published for Semester IV.
                </p>
              </div>

              <div className="p-3 bg-violet-50/50 border border-violet-200/50 rounded-xl">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold uppercase text-violet-700">Academic</span>
                  <span className="text-slate-400">Yesterday</span>
                </div>
                <h4 className="text-xs font-bold text-[#3D405B] mt-1">
                  AI & Distributed Systems Lecture
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Keynote session tomorrow at 03:00 PM in Turing Hall.
                </p>
              </div>
            </div>
          </div>

          {/* Faculty Mentor */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100 mb-3">
              <Headphones className="w-4 h-4 text-violet-600" />
              <h3 className="text-sm font-bold text-[#3D405B]">Faculty Mentor</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm shrink-0">
                RS
              </div>
              <div>
                <div className="text-sm font-bold text-[#3D405B]">Prof. Rajesh K. Sharma</div>
                <a
                  href="mailto:r.sharma@apex.ac.in"
                  className="text-xs text-violet-700 font-semibold hover:underline"
                >
                  r.sharma@apex.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Authentic Examination Admit Card / Hall Ticket Modal */}
      {showHallTicketModal && (
        <div id="hall-ticket-modal-container" className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          <div className="bg-slate-100 w-full max-w-4xl max-h-[94vh] flex flex-col rounded-2xl border border-slate-300 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Control Bar */}
            <div className="px-5 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 modal-controls">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#355C7D]" />
                <span className="text-sm font-bold text-[#355C7D]">
                  Official Examination Admit Card Preview
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold rounded-full">
                  1-Page Verified Admit Card
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintAdmitCard}
                  className="px-3.5 py-1.5 bg-[#355C7D] hover:opacity-90 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setShowHallTicketModal(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Document Area */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1 flex justify-center">
              {/* THE AUTHENTIC ADMIT CARD SHEET */}
              <div
                id="printable-admit-card"
                className="w-full max-w-[800px] bg-white border-2 border-slate-800 p-5 md:p-6 shadow-sm text-slate-900 font-sans relative"
              >
                {/* Outer Decorative Double Border Line */}
                <div className="absolute inset-1 pointer-events-none border border-slate-400"></div>

                {/* Subtle Background Watermark */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
                  <div className="text-center">
                    <GraduationCap className="w-96 h-96 text-slate-900 mx-auto" />
                    <div className="font-serif font-black text-6xl tracking-widest mt-4">APEX INSTITUTE</div>
                  </div>
                </div>

                {/* 1. INSTITUTIONAL HEADER */}
                <div className="relative z-10 border-b-2 border-slate-800 pb-3">
                  <div className="flex items-center justify-between gap-3">
                    {/* Emblem */}
                    <div className="w-14 h-16 md:w-16 md:h-20 shrink-0 border-2 border-slate-800 rounded-lg flex flex-col items-center justify-center bg-slate-50 p-1 text-center">
                      <GraduationCap className="w-8 h-8 text-[#3D405B]" />
                      <span className="font-serif font-bold text-[7px] md:text-[8px] uppercase tracking-tighter text-slate-700 mt-0.5">ESTD. 1998</span>
                    </div>

                    {/* Central University Title */}
                    <div className="text-center flex-1">
                      <h1 className="font-serif text-base md:text-xl font-black tracking-wide text-slate-900 uppercase">
                        Apex Institute of Technology
                      </h1>
                      <div className="text-[9px] md:text-[10px] font-semibold text-slate-600 uppercase tracking-widest mt-0.5">
                        (Autonomous Institution Approved by AICTE &amp; Accredited NAAC &apos;A++&apos;)
                      </div>
                      <div className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-wider mt-0.5">
                        Office of the Controller of Examinations
                      </div>
                      <div
                        className="mt-1.5 inline-block px-3 py-0.5 text-white font-mono text-[11px] md:text-xs font-bold uppercase tracking-widest rounded-xs shadow-xs"
                        style={{ backgroundColor: '#355C7D' }}
                      >
                        Admit Card &bull; Even Semester 2024–25
                      </div>
                    </div>

                    {/* Candidate Photograph Image (Replaces QR Code) */}
                    <div className="shrink-0 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-24 sm:w-22 sm:h-26 border-2 border-slate-800 bg-white p-0.5 shadow-xs overflow-hidden rounded-xs">
                        <img
                          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
                          alt="Rahul Sharma"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CANDIDATE DETAILS GRID */}
                <div className="relative z-10 my-2.5 border border-slate-800 text-xs">
                  <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-300">
                    <div className="p-1.5 px-2.5">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Candidate Name</span>
                      <span className="font-bold text-slate-900 text-xs">RAHUL SHARMA</span>
                    </div>
                    <div className="p-1.5 px-2.5 bg-slate-50/60">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Roll Number</span>
                      <span className="font-mono font-bold text-xs text-[#355C7D]">23CS042</span>
                    </div>
                    <div className="p-1.5 px-2.5">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Registration No.</span>
                      <span className="font-mono font-semibold text-slate-800 text-xs">APX-2023-CS-042</span>
                    </div>
                    <div className="p-1.5 px-2.5 bg-slate-50/60">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Category</span>
                      <span className="font-semibold text-slate-800 text-xs">Regular / Full-Time</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-300 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-300">
                    <div className="p-1.5 px-2.5">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Program / Branch</span>
                      <span className="font-bold text-slate-800 text-[11px]">B.Tech (Computer Science &amp; Engg)</span>
                    </div>
                    <div className="p-1.5 px-2.5 bg-slate-50/60">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Semester &amp; Batch</span>
                      <span className="font-semibold text-slate-800 text-[11px]">Semester IV (2023–27)</span>
                    </div>
                    <div className="p-1.5 px-2.5 md:col-span-2">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Examination Center &amp; Venue</span>
                      <span className="font-semibold text-slate-900 text-[11px]">AUD-B, Academic Complex, North Campus (Center: 104-APX)</span>
                    </div>
                  </div>
                </div>

                {/* 3. EXAMINATION PAPERS / DATESHEET SCHEDULE */}
                <div className="relative z-10 mt-2.5">
                  <div
                    className="text-white px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider flex justify-between items-center"
                    style={{ backgroundColor: '#355C7D' }}
                  >
                    <span>Approved Courses &amp; Seated Datesheet Schedule</span>
                    <span>Total Courses: 05</span>
                  </div>

                  <table className="w-full text-left text-[11px] border-collapse border border-slate-800">
                    <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-800">
                      <tr className="divide-x divide-slate-800 text-[10px]">
                        <th className="p-1.5 w-10 text-center">S.No</th>
                        <th className="p-1.5 w-20">Code</th>
                        <th className="p-1.5">Subject / Course Title</th>
                        <th className="p-1.5 w-28 text-center">Date</th>
                        <th className="p-1.5 w-36 text-center">Timing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr className="divide-x divide-slate-800">
                        <td className="p-1.5 text-center font-mono">1</td>
                        <td className="p-1.5 font-mono font-bold text-slate-900">CS-401</td>
                        <td className="p-1.5 font-medium">Database Management Systems</td>
                        <td className="p-1.5 font-mono text-center">15-Apr-2025</td>
                        <td className="p-1.5 text-[10px] text-center">09:30 AM – 12:30 PM</td>
                      </tr>
                      <tr className="divide-x divide-slate-800 bg-slate-50/40">
                        <td className="p-1.5 text-center font-mono">2</td>
                        <td className="p-1.5 font-mono font-bold text-slate-900">CS-402</td>
                        <td className="p-1.5 font-medium">Operating Systems</td>
                        <td className="p-1.5 font-mono text-center">17-Apr-2025</td>
                        <td className="p-1.5 text-[10px] text-center">09:30 AM – 12:30 PM</td>
                      </tr>
                      <tr className="divide-x divide-slate-800">
                        <td className="p-1.5 text-center font-mono">3</td>
                        <td className="p-1.5 font-mono font-bold text-slate-900">CS-403</td>
                        <td className="p-1.5 font-medium">Design &amp; Analysis of Algorithms</td>
                        <td className="p-1.5 font-mono text-center">21-Apr-2025</td>
                        <td className="p-1.5 text-[10px] text-center">02:00 PM – 05:00 PM</td>
                      </tr>
                      <tr className="divide-x divide-slate-800 bg-slate-50/40">
                        <td className="p-1.5 text-center font-mono">4</td>
                        <td className="p-1.5 font-mono font-bold text-slate-900">CS-404</td>
                        <td className="p-1.5 font-medium">Automata &amp; Formal Languages</td>
                        <td className="p-1.5 font-mono text-center">24-Apr-2025</td>
                        <td className="p-1.5 text-[10px] text-center">09:30 AM – 12:30 PM</td>
                      </tr>
                      <tr className="divide-x divide-slate-800">
                        <td className="p-1.5 text-center font-mono">5</td>
                        <td className="p-1.5 font-mono font-bold text-slate-900">CS-405L</td>
                        <td className="p-1.5 font-medium">Systems Engineering Laboratory (Practical)</td>
                        <td className="p-1.5 font-mono text-center">27-Apr-2025</td>
                        <td className="p-1.5 text-[10px] text-center">09:30 AM – 12:30 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 4. MANDATORY CANDIDATE INSTRUCTIONS */}
                <div className="relative z-10 mt-2.5 p-2 bg-slate-50 border border-slate-400 rounded-xs text-[9px] text-slate-700 space-y-0.5 leading-tight">
                  <div className="font-bold text-slate-900 uppercase tracking-wide">
                    Mandatory Instructions for Candidate:
                  </div>
                  <ol className="list-decimal pl-3.5 space-y-0.5">
                    <li>Produce this printed Admit Card along with original Institute Student ID Card to enter the examination hall.</li>
                    <li>Report to allocated examination venue at least 20 minutes prior to session commencement.</li>
                    <li>Possession of mobile phones, smartwatches, or unauthorized study material is strictly prohibited.</li>
                    <li>No candidate may leave the examination room until 60 minutes after paper commencement.</li>
                  </ol>
                </div>

                {/* 5. VERIFICATION SEALS & SIGNATURES */}
                <div className="relative z-10 mt-3 pt-2 border-t-2 border-slate-800 flex items-end justify-between gap-2 text-xs">
                  {/* Candidate Signature (Blank for physical signature by student) */}
                  <div className="text-center w-44">
                    <div className="h-8 border-b-2 border-slate-500">
                      {/* Blank area for candidate physical signature */}
                    </div>
                    <span className="text-[9px] uppercase font-bold text-slate-700 block mt-1 tracking-wide">
                      Candidate Signature
                    </span>
                  </div>

                  {/* Red/Crimson Verification Stamp Badge */}
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-dashed border-rose-600/70 p-0.5 flex items-center justify-center rotate-[-6deg] text-center bg-rose-50/40">
                      <div className="border border-rose-600/60 rounded-full w-full h-full flex flex-col items-center justify-center text-[6px] font-bold text-rose-700 uppercase leading-none">
                        <span>APEX INST.</span>
                        <Award className="w-2.5 h-2.5 text-rose-600 my-0.2" />
                        <span>COE VERIFIED</span>
                        <span>2024-25</span>
                      </div>
                    </div>
                  </div>

                  {/* Controller of Examinations Signature */}
                  <div className="text-center w-48">
                    <div className="h-7 border-b border-slate-400 flex items-end justify-center pb-0.5">
                      <span className="font-serif italic font-bold text-sm text-slate-900 tracking-wider">K. N. Murthy</span>
                    </div>
                    <span className="text-[9px] uppercase font-bold text-slate-900 block mt-0.5">
                      Controller of Examinations
                    </span>
                    <span className="text-[8px] text-slate-500 font-mono">Issued: 02-Apr-2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between shrink-0 modal-controls">
              <span className="text-xs text-slate-500 hidden sm:inline-block">
                Print mode optimized for <strong>1-Page A4 Sheet</strong> with high-resolution layout.
              </span>
              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  onClick={() => setShowHallTicketModal(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
                <button
                  onClick={handlePrintAdmitCard}
                  className="px-5 py-2 bg-[#355C7D] hover:opacity-90 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official Admit Card (1 Page)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Print Isolation CSS ensuring 1-Page Perfect Print */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 5mm;
          }
          body * {
            visibility: hidden !important;
          }
          #printable-admit-card,
          #printable-admit-card * {
            visibility: visible !important;
          }
          #printable-admit-card {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 12px 16px !important;
            border: 2px solid #0f172a !important;
            box-shadow: none !important;
            background: #ffffff !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            break-after: avoid !important;
          }
        }
      `}</style>

      {/* MODAL 2: Fee Payment Advice Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-violet-600" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Fee Payment
                </h3>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Pending Balance</div>
                  <div className="text-2xl font-bold text-[#3D405B] font-mono mt-0.5">₹25,000.00</div>
                </div>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                  Due: May 02, 2025
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-semibold text-[#3D405B]">Bank Wire / NEFT Transfer</div>
                  <div className="text-slate-600 mt-1 font-mono text-[11px] space-y-0.5">
                    <div>Bank: HDFC Bank &bull; A/C: 50200049281092</div>
                    <div>IFSC: HDFC0001092</div>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-semibold text-[#3D405B]">Counter Cash</div>
                  <p className="text-slate-500 mt-0.5">Counter Till #01 or #02 at Admin Block.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  triggerToast("Bank Challan slip downloaded!");
                }}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Challan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
