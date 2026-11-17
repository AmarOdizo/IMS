"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Download,
  Send,
  FileSpreadsheet,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  UserX,
  CreditCard,
  DollarSign,
  Phone,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  X,
  Printer,
  Ban,
  Check,
  AlertCircle,
  HelpCircle,
  Banknote,
  Building2,
  Users,
  QrCode,
  Calendar,
  ShieldCheck,
  Eye,
  RefreshCw,
  FileDown,
  Mail,
  MessageSquare,
  Lock,
  Unlock,
  CheckSquare,
  Square,
  Sparkles,
} from "lucide-react";

interface DefaulterStudent {
  id: string;
  name: string;
  rollNo: string;
  course: string;
  term: string;
  totalFee: number;
  paidAmount: number;
  pendingDue: number;
  dueDate: string;
  agingDays: number;
  agingCategory: "> 60 Days" | "30-60 Days" | "15-30 Days" | "< 15 Days";
  holdStatus: "Exam Hall Ticket Withheld" | "Grace Period" | "Notice Served";
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  lastReminderSent?: string;
  notes?: string;
}

const initialDefaulters: DefaulterStudent[] = [
  {
    id: "DEF-001",
    name: "Rohan Verma",
    rollNo: "APX-2024-ME-058",
    course: "B.Tech Mechanical Engineering",
    term: "Sem III (2024-28)",
    totalFee: 85000,
    paidAmount: 50000,
    pendingDue: 35000,
    dueDate: "15 Oct 2026",
    agingDays: 48,
    agingCategory: "30-60 Days",
    holdStatus: "Exam Hall Ticket Withheld",
    guardianName: "Sunil Verma",
    guardianPhone: "+91 97123 45678",
    guardianEmail: "sunil.verma@example.com",
    lastReminderSent: "12 Nov 2026 (SMS)",
    notes: "Committed to clear before practical exams via RTGS.",
  },
  {
    id: "DEF-002",
    name: "Sneha Kulkarni",
    rollNo: "APX-2023-CS-088",
    course: "B.Tech Computer Science & Eng.",
    term: "Sem V (2023-27)",
    totalFee: 95000,
    paidAmount: 70000,
    pendingDue: 25000,
    dueDate: "28 Oct 2026",
    agingDays: 34,
    agingCategory: "30-60 Days",
    holdStatus: "Grace Period",
    guardianName: "Dhananjay Kulkarni",
    guardianPhone: "+91 98450 11223",
    guardianEmail: "d.kulkarni@techcorp.in",
    lastReminderSent: "14 Nov 2026 (Email)",
    notes: "Applied for installment extension till 25 Nov.",
  },
  {
    id: "DEF-003",
    name: "Kunal Saxena",
    rollNo: "APX-2022-CS-014",
    course: "B.Tech Computer Science & Eng.",
    term: "Sem VII (2022-26)",
    totalFee: 110000,
    paidAmount: 57500,
    pendingDue: 52500,
    dueDate: "01 Sep 2026",
    agingDays: 78,
    agingCategory: "> 60 Days",
    holdStatus: "Exam Hall Ticket Withheld",
    guardianName: "Alok Saxena",
    guardianPhone: "+91 98112 33445",
    guardianEmail: "alok.saxena@delhiconsult.org",
    lastReminderSent: "10 Nov 2026 (Registered Notice)",
    notes: "3 notices served. Final warning issued prior to expulsion recommendation.",
  },
  {
    id: "DEF-004",
    name: "Vikramaditya Singh",
    rollNo: "APX-2022-EE-012",
    course: "B.Tech Electrical Engineering",
    term: "Sem VII (2022-26)",
    totalFee: 65000,
    paidAmount: 58000,
    pendingDue: 7000,
    dueDate: "05 Nov 2026",
    agingDays: 12,
    agingCategory: "< 15 Days",
    holdStatus: "Grace Period",
    guardianName: "Pratap Singh",
    guardianPhone: "+91 99887 76655",
    guardianEmail: "pratap.singh@agrofarm.com",
    lastReminderSent: "06 Nov 2026 (SMS)",
    notes: "Minor lab surcharge balance pending.",
  },
  {
    id: "DEF-005",
    name: "Rahul Sharma",
    rollNo: "APX-2023-CS-042",
    course: "B.Tech Computer Science & Eng.",
    term: "Sem V (2023-27)",
    totalFee: 95000,
    paidAmount: 70000,
    pendingDue: 25000,
    dueDate: "20 Oct 2026",
    agingDays: 28,
    agingCategory: "15-30 Days",
    holdStatus: "Notice Served",
    guardianName: "Rajendra Sharma",
    guardianPhone: "+91 98765 43210",
    guardianEmail: "sharma.raj@govmail.in",
    lastReminderSent: "11 Nov 2026 (SMS & Email)",
    notes: "Parent informed cashier that payment will be made at desk today.",
  },
  {
    id: "DEF-006",
    name: "Tanmay Joshi",
    rollNo: "APX-2024-EC-031",
    course: "B.Tech Electronics & Comm.",
    term: "Sem III (2024-28)",
    totalFee: 88000,
    paidAmount: 50000,
    pendingDue: 38000,
    dueDate: "06 Oct 2026",
    agingDays: 42,
    agingCategory: "30-60 Days",
    holdStatus: "Exam Hall Ticket Withheld",
    guardianName: "Suresh Joshi",
    guardianPhone: "+91 98990 12345",
    guardianEmail: "suresh.joshi@pnb.co.in",
    lastReminderSent: "08 Nov 2026 (SMS)",
    notes: "Education loan disbursement delay from SBI Branch.",
  },
  {
    id: "DEF-007",
    name: "Ritu Singhania",
    rollNo: "APX-2023-BT-009",
    course: "B.Tech Biotechnology",
    term: "Sem V (2023-27)",
    totalFee: 78500,
    paidAmount: 60000,
    pendingDue: 18500,
    dueDate: "29 Oct 2026",
    agingDays: 19,
    agingCategory: "15-30 Days",
    holdStatus: "Notice Served",
    guardianName: "Mukesh Singhania",
    guardianPhone: "+91 98101 23456",
    guardianEmail: "mukesh.s@biocare.org",
    lastReminderSent: "13 Nov 2026 (SMS)",
    notes: "Second installment overdue. Hall ticket barring initiated.",
  },
  {
    id: "DEF-008",
    name: "Manav Gupta",
    rollNo: "APX-2022-ME-045",
    course: "B.Tech Mechanical Engineering",
    term: "Sem VII (2022-26)",
    totalFee: 120000,
    paidAmount: 56000,
    pendingDue: 64000,
    dueDate: "25 Aug 2026",
    agingDays: 84,
    agingCategory: "> 60 Days",
    holdStatus: "Exam Hall Ticket Withheld",
    guardianName: "Vinod Gupta",
    guardianPhone: "+91 98711 99887",
    guardianEmail: "gupta.vinod@logistics.in",
    lastReminderSent: "05 Nov 2026 (Notice by Courier)",
    notes: "Critical arrear. Student barred from practical lab tests and mid-terms.",
  },
];

export default function AccountantPendingDuesPage() {
  const [defaulters, setDefaulters] = useState<DefaulterStudent[]>(initialDefaulters);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeAgingTab, setActiveAgingTab] = useState<"all" | "critical" | "grace" | "notice" | "minor">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("ALL");
  const [amountRangeFilter, setAmountRangeFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [collectModalStudent, setCollectModalStudent] = useState<DefaulterStudent | null>(null);
  const [collectAmount, setCollectAmount] = useState<number>(0);
  const [collectMode, setCollectMode] = useState<"Cash" | "UPI" | "Card" | "Bank Transfer">("UPI");
  const [autoReleaseHold, setAutoReleaseHold] = useState(true);
  const [isBulkSmsModalOpen, setIsBulkSmsModalOpen] = useState(false);
  const [isGazetteModalOpen, setIsGazetteModalOpen] = useState(false);
  const [dossierStudent, setDossierStudent] = useState<DefaulterStudent | null>(null);

  // Quick Rapid Collect Panel State
  const [rapidRoll, setRapidRoll] = useState(initialDefaulters[0].rollNo);
  const [rapidAmount, setRapidAmount] = useState(initialDefaulters[0].pendingDue.toString());
  const [rapidMode, setRapidMode] = useState<"Cash" | "UPI" | "Card">("Cash");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredDefaulters.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // Toggle Exam Hold single student
  const toggleHoldStatus = (id: string) => {
    setDefaulters((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.holdStatus === "Exam Hall Ticket Withheld" ? "Grace Period" : "Exam Hall Ticket Withheld";
          showToast(
            `${item.name} (${item.rollNo}) hold updated to: ${nextStatus.toUpperCase()}`
          );
          return { ...item, holdStatus: nextStatus };
        }
        return item;
      })
    );
  };

  // Batch Toggle Hold
  const handleBatchToggleHold = (hold: boolean) => {
    const targetStatus = hold ? "Exam Hall Ticket Withheld" : "Grace Period";
    setDefaulters((prev) =>
      prev.map((item) => {
        if (selectedIds.includes(item.id)) {
          return { ...item, holdStatus: targetStatus };
        }
        return item;
      })
    );
    showToast(`Updated ${selectedIds.length} students to "${targetStatus}"`);
    setSelectedIds([]);
  };

  const filteredDefaulters = defaulters.filter((d) => {
    // Tab filter
    if (activeAgingTab === "critical" && d.holdStatus !== "Exam Hall Ticket Withheld") {
      return false;
    }
    if (activeAgingTab === "grace" && d.holdStatus !== "Grace Period") {
      return false;
    }
    if (activeAgingTab === "notice" && d.holdStatus !== "Notice Served") {
      return false;
    }
    if (activeAgingTab === "minor" && d.pendingDue >= 20000) {
      return false;
    }

    // Search
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matches =
        d.name.toLowerCase().includes(q) ||
        d.rollNo.toLowerCase().includes(q) ||
        d.guardianPhone.includes(q) ||
        d.guardianName.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // Course filter
    if (courseFilter !== "ALL" && !d.course.toLowerCase().includes(courseFilter.toLowerCase())) {
      return false;
    }

    // Amount range filter
    if (amountRangeFilter === "GT50" && d.pendingDue <= 50000) return false;
    if (amountRangeFilter === "25TO50" && (d.pendingDue < 25000 || d.pendingDue > 50000)) return false;
    if (amountRangeFilter === "LT25" && d.pendingDue >= 25000) return false;

    return true;
  });

  // Export CSV Function
  const handleExportCSV = () => {
    const header = [
      "ID",
      "Student Name",
      "Roll No",
      "Course",
      "Term",
      "Total Fee (INR)",
      "Paid Amount (INR)",
      "Pending Due (INR)",
      "Due Date",
      "Aging (Days)",
      "Aging Category",
      "Clearance Status",
      "Guardian Name",
      "Guardian Phone",
      "Guardian Email",
      "Last Reminder",
    ];

    const dataRows = (selectedIds.length > 0
      ? defaulters.filter((d) => selectedIds.includes(d.id))
      : filteredDefaulters
    ).map((d) => [
      d.id,
      `"${d.name}"`,
      d.rollNo,
      `"${d.course}"`,
      `"${d.term}"`,
      d.totalFee,
      d.paidAmount,
      d.pendingDue,
      d.dueDate,
      d.agingDays,
      `"${d.agingCategory}"`,
      `"${d.holdStatus}"`,
      `"${d.guardianName}"`,
      d.guardianPhone,
      d.guardianEmail,
      `"${d.lastReminderSent || "None"}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [header.join(","), ...dataRows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `apex_fee_defaulters_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded official CSV ledger of defaulters!");
  };

  const openCollectModal = (student: DefaulterStudent) => {
    setCollectModalStudent(student);
    setCollectAmount(student.pendingDue);
    setAutoReleaseHold(true);
  };

  const submitCollectModal = () => {
    if (!collectModalStudent) return;
    const paid = Number(collectAmount) || 0;
    if (paid <= 0) {
      alert("Please enter a valid amount greater than zero.");
      return;
    }

    setDefaulters((prev) =>
      prev.map((item) => {
        if (item.id === collectModalStudent.id) {
          const newPending = Math.max(0, item.pendingDue - paid);
          const newStatus =
            newPending === 0 || autoReleaseHold ? "Grace Period" : item.holdStatus;
          return {
            ...item,
            paidAmount: item.paidAmount + paid,
            pendingDue: newPending,
            holdStatus: newStatus,
          };
        }
        return item;
      })
    );

    showToast(
      `Realized ₹${paid.toLocaleString("en-IN")} via ${collectMode} for ${collectModalStudent.name} (${collectModalStudent.rollNo}). Stamped receipt generated.`
    );
    setCollectModalStudent(null);
  };

  // Calculations for KPI Cards
  const totalOutstanding = defaulters.reduce((acc, curr) => acc + curr.pendingDue, 0);
  const totalBilled = defaulters.reduce((acc, curr) => acc + curr.totalFee, 0);
  const examHoldsCount = defaulters.filter((d) => d.holdStatus === "Exam Hall Ticket Withheld").length;
  const criticalDefaultersCount = defaulters.filter((d) => d.pendingDue > 50000).length;
  const avgOutstanding = Math.round(totalOutstanding / (defaulters.length || 1));

  return (
    <div className="flex flex-col w-full pb-16 font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Top Context Ribbon & Strategic Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
              <Link href="/accountant" className="hover:text-[#3D405B] transition-colors">
                Bursar Portal
              </Link>
              <span>/</span>
              <span>Arrear Management</span>
              <span>/</span>
              <span className="text-[#3D405B] font-bold">Defaulters &amp; Exam Holds</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl lg:text-2xl font-bold text-[#3D405B] tracking-tight">
                Pending Dues &amp; Academic Examination Clearance Registry
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                <Ban className="w-3.5 h-3.5" />
                {examHoldsCount} HALL TICKET HOLDS ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Real-time monitoring of overdue student accounts, semester examination barring directives, and rapid desk fee realizations.
            </p>
          </div>

          {/* Top Tactical Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsBulkSmsModalOpen(true)}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-slate-600" />
              <span>Bulk SMS Recovery</span>
            </button>
            <button
              onClick={() => setIsGazetteModalOpen(true)}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Barred Gazette</span>
            </button>
            <button
              onClick={handleExportCSV}
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Ledger CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Strategic Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Outstanding Pool
            </span>
            <span className="text-2xl font-bold text-rose-600 mt-1">
              ₹{totalOutstanding.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Across {defaulters.length} accounts (Billed: ₹{(totalBilled / 100000).toFixed(1)}L)
            </span>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Barred From Examinations
            </span>
            <span className="text-2xl font-bold text-rose-700 mt-1">
              {examHoldsCount} Students
            </span>
            <span className="text-[11px] text-rose-600 font-semibold mt-0.5 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Ordinance §14.2 Active
            </span>
          </div>
          <div className="p-3 bg-rose-100 text-rose-800 rounded-xl border border-rose-200">
            <Ban className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Critical Defaults (&gt; ₹50k)
            </span>
            <span className="text-2xl font-bold text-[#3D405B] mt-1">
              {criticalDefaultersCount} Students
            </span>
            <span className="text-[11px] text-amber-600 font-medium mt-0.5">
              High exposure arrear risk
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Avg Outstanding / Account
            </span>
            <span className="text-2xl font-bold text-slate-800 mt-1">
              ₹{avgOutstanding.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium mt-0.5">
              Recoverable via Counter POS
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
            <Banknote className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recovery Pipeline Visual Scrim & Analytics Inline Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#3D405B] uppercase tracking-wide">
              Arrear Aging &amp; Risk Exposure Breakdown
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
              Total Pool: ₹{totalOutstanding.toLocaleString("en-IN")}
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Overdue accounts categorized as per Statutory Academic Ordinance
          </span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="w-full h-3.5 bg-slate-100 rounded-full flex overflow-hidden border border-slate-200 mb-3 shadow-inner">
          <div
            className="bg-rose-600 h-full transition-all duration-300"
            style={{ width: "52%" }}
            title="Overdue > 60 Days: 52%"
          />
          <div
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: "32%" }}
            title="Overdue 30-60 Days: 32%"
          />
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: "16%" }}
            title="Overdue < 30 Days: 16%"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50/70 border border-rose-100">
            <span className="w-3 h-3 rounded-full bg-rose-600 shrink-0" />
            <div>
              <span className="text-slate-600 block text-[11px]">Overdue &gt; 60 Days (Critical):</span>
              <span className="font-bold text-rose-700">₹1,16,500 (2 Students)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-100">
            <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
            <div>
              <span className="text-slate-600 block text-[11px]">Overdue 30-60 Days (Warning):</span>
              <span className="font-bold text-amber-800">₹98,000 (3 Students)</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100">
            <span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" />
            <div>
              <span className="text-slate-600 block text-[11px]">Overdue &lt; 30 Days (Active Grace):</span>
              <span className="font-bold text-blue-800">₹50,500 (3 Students)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Aging Tabs & Filtering Rig */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mb-5 flex flex-col gap-3.5">
        {/* Tabs with Dynamic Counts */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 text-xs">
          <button
            onClick={() => setActiveAgingTab("all")}
            className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
              activeAgingTab === "all"
                ? "bg-[#3D405B] text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Accounts ({defaulters.length})
          </button>
          <button
            onClick={() => setActiveAgingTab("critical")}
            className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
              activeAgingTab === "critical"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
            }`}
          >
            Exam Barred ({defaulters.filter((d) => d.holdStatus === "Exam Hall Ticket Withheld").length})
          </button>
          <button
            onClick={() => setActiveAgingTab("grace")}
            className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
              activeAgingTab === "grace"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
            }`}
          >
            Grace Period ({defaulters.filter((d) => d.holdStatus === "Grace Period").length})
          </button>
          <button
            onClick={() => setActiveAgingTab("notice")}
            className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
              activeAgingTab === "notice"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
            }`}
          >
            Notice Served ({defaulters.filter((d) => d.holdStatus === "Notice Served").length})
          </button>
          <button
            onClick={() => setActiveAgingTab("minor")}
            className={`px-3.5 py-1.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
              activeAgingTab === "minor"
                ? "bg-slate-700 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Minor Dues &lt; ₹20k ({defaulters.filter((d) => d.pendingDue < 20000).length})
          </button>
        </div>

        {/* Multi-Dimensional Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Student, Roll, or Parent Phone..."
              className="w-full bg-slate-50 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none transition-colors text-slate-700 font-medium"
            >
              <option value="ALL">All Academic Disciplines</option>
              <option value="Computer Science">B.Tech Computer Science (CSE)</option>
              <option value="Electronics">B.Tech Electronics &amp; Comm. (ECE)</option>
              <option value="Mechanical">B.Tech Mechanical Eng. (ME)</option>
              <option value="Electrical">B.Tech Electrical Eng. (EE)</option>
              <option value="Biotechnology">B.Tech Biotechnology (BT)</option>
            </select>
          </div>

          <div>
            <select
              value={amountRangeFilter}
              onChange={(e) => setAmountRangeFilter(e.target.value)}
              className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none transition-colors text-slate-700 font-medium"
            >
              <option value="ALL">All Outstanding Ranges</option>
              <option value="GT50">Critical: &gt; ₹50,000</option>
              <option value="25TO50">Medium: ₹25,000 - ₹50,000</option>
              <option value="LT25">Minor: &lt; ₹25,000</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSearchQuery("");
                setCourseFilter("ALL");
                setAmountRangeFilter("ALL");
                setActiveAgingTab("all");
              }}
              className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors text-center cursor-pointer"
            >
              Reset Filters
            </button>
            <span className="text-slate-500 font-semibold whitespace-nowrap text-xs">
              Showing {filteredDefaulters.length} accounts
            </span>
          </div>
        </div>
      </div>

      {/* Main Ledger Split: 9 Cols (Table) + 3 Cols (Statutory Directives & Rapid Collect Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Comprehensive Defaulters Ledger (9 Cols) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {/* Batch Action Floating Header when rows are selected */}
          {selectedIds.length > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/90 p-3 flex flex-wrap items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-2">
                <span className="font-bold text-rose-900">
                  {selectedIds.length} candidate account(s) selected
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-600 font-medium">
                  Cumulative Due: ₹
                  {defaulters
                    .filter((d) => selectedIds.includes(d.id))
                    .reduce((sum, d) => sum + d.pendingDue, 0)
                    .toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBatchToggleHold(true)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Withhold Hall Tickets</span>
                </button>
                <button
                  onClick={() => handleBatchToggleHold(false)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Lift Barring Hold</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Selection</span>
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="p-1.5 hover:bg-rose-100 rounded-md text-rose-700 cursor-pointer"
                  title="Clear Selection"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Table Card */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
                    <th className="p-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={
                          filteredDefaulters.length > 0 &&
                          selectedIds.length === filteredDefaulters.length
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded cursor-pointer accent-[#3D405B]"
                      />
                    </th>
                    <th className="p-3">Student Particulars</th>
                    <th className="p-3 text-right">Billed</th>
                    <th className="p-3 text-right">Paid</th>
                    <th className="p-3 text-right font-bold text-rose-600">Pending Due</th>
                    <th className="p-3 text-center">Aging Days</th>
                    <th className="p-3 text-center">Clearance Status</th>
                    <th className="p-3">Guardian Info</th>
                    <th className="p-3 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {filteredDefaulters.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-10 text-center text-slate-500">
                        <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-700">No student accounts found</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Try adjusting your search query or reset the applied filters.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredDefaulters.map((item) => {
                      const isChecked = selectedIds.includes(item.id);
                      const isBarred = item.holdStatus === "Exam Hall Ticket Withheld";
                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isChecked ? "bg-slate-50/90" : ""
                          }`}
                        >
                          <td className="p-3 text-center">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                              className="rounded cursor-pointer accent-[#3D405B]"
                            />
                          </td>

                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                  isBarred
                                    ? "bg-rose-100 text-rose-700 border border-rose-200"
                                    : "bg-slate-100 text-[#3D405B]"
                                }`}
                              >
                                {item.name.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-800 text-[13px]">
                                  {item.name}
                                </span>
                                <span className="font-mono text-slate-500 text-[11px] font-medium">
                                  {item.rollNo}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {item.course} &bull; {item.term}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3 text-right font-medium text-slate-600">
                            ₹{item.totalFee.toLocaleString("en-IN")}
                          </td>

                          <td className="p-3 text-right font-medium text-emerald-700">
                            ₹{item.paidAmount.toLocaleString("en-IN")}
                          </td>

                          <td className="p-3 text-right">
                            <span className="font-bold text-rose-600 text-sm">
                              ₹{item.pendingDue.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              Due: {item.dueDate}
                            </span>
                          </td>

                          <td className="p-3 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                item.agingDays > 60
                                  ? "bg-rose-100 text-rose-800 border border-rose-200"
                                  : item.agingDays >= 30
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}
                            >
                              {item.agingDays}d ({item.agingCategory})
                            </span>
                          </td>

                          <td className="p-3 text-center">
                            <button
                              onClick={() => toggleHoldStatus(item.id)}
                              type="button"
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                                isBarred
                                  ? "bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
                                  : item.holdStatus === "Grace Period"
                                  ? "bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200"
                                  : "bg-blue-100 text-blue-900 border border-blue-300 hover:bg-blue-200"
                              }`}
                              title="Click to toggle hold status"
                            >
                              {isBarred ? (
                                <Ban className="w-3 h-3" />
                              ) : (
                                <Clock className="w-3 h-3 text-slate-600" />
                              )}
                              <span>{item.holdStatus}</span>
                            </button>
                          </td>

                          <td className="p-3">
                            <div className="flex flex-col text-[11px]">
                              <span className="font-medium text-slate-800">{item.guardianName}</span>
                              <span className="font-mono text-slate-500">{item.guardianPhone}</span>
                              {item.lastReminderSent && (
                                <span className="text-[10px] text-slate-400 mt-0.5">
                                  Notified: {item.lastReminderSent}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openCollectModal(item)}
                                className="px-3 py-1.5 bg-[#3D405B] hover:bg-[#2d3043] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                                title="Collect Fee at Counter"
                              >
                                <Banknote className="w-3.5 h-3.5" />
                                <span>Collect</span>
                              </button>
                              <button
                                onClick={() => setDossierStudent(item)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-200"
                                title="View Dossier & Arrear Audit"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() =>
                                  showToast(`SMS reminder dispatched to ${item.guardianPhone}`)
                                }
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-200"
                                title="Send SMS Notice"
                              >
                                <Send className="w-3.5 h-3.5 text-slate-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Bottom Control Strip */}
            <div className="bg-slate-50 p-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-semibold">
                  Showing {filteredDefaulters.length} of {defaulters.length} Accounts
                </span>
                {selectedIds.length > 0 && (
                  <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold text-[11px]">
                    {selectedIds.length} Selected
                  </span>
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-1.5 text-xs">
                <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 font-semibold text-slate-600 cursor-pointer">
                  Prev
                </button>
                <button className="px-3 py-1 rounded-lg bg-[#3D405B] text-white font-bold">1</button>
                <button className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer">
                  2
                </button>
                <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 font-semibold text-slate-600 cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statutory Directives & Rapid Collect Box (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col gap-4 font-sans">
          {/* Statutory Action Callout */}
          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/80 p-4 shadow-sm flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-tight">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Ordinance §14.2 Barring Directive</span>
            </div>
            <p className="text-xs text-rose-950 leading-relaxed">
              As per Apex Academic Council directive, hall tickets for End-Semester Examinations are withheld for candidates with cumulative arrears &gt; ₹25,000 overdue &gt; 30 days. Reversal requires instantaneous desk realization.
            </p>
            <div className="text-[11px] text-rose-800 font-bold border-t border-rose-200 pt-2 flex items-center justify-between">
              <span>Automatic Lock Cutoff:</span>
              <span className="bg-rose-200/80 px-2 py-0.5 rounded-full">18:00 IST Today</span>
            </div>
          </div>

          {/* Quick Fast Action: Immediate Counter Payment Entry */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-[#3D405B]" />
                <span className="text-xs font-bold uppercase text-[#3D405B]">
                  Rapid Counter Realization
                </span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                TILL #02 ACTIVE
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-semibold text-slate-500">
                Select Candidate:
              </label>
              <select
                value={rapidRoll}
                onChange={(e) => {
                  setRapidRoll(e.target.value);
                  const st = defaulters.find((d) => d.rollNo === e.target.value);
                  if (st) setRapidAmount(st.pendingDue.toString());
                }}
                className="bg-slate-50 p-2 text-xs rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none font-medium text-slate-800"
              >
                {defaulters.map((d) => (
                  <option key={d.id} value={d.rollNo}>
                    {d.rollNo} - {d.name} (Due: ₹{d.pendingDue.toLocaleString("en-IN")})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-semibold text-slate-500">
                Amount Tendered (₹):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  ₹
                </span>
                <input
                  type="number"
                  value={rapidAmount}
                  onChange={(e) => setRapidAmount(e.target.value)}
                  className="w-full bg-slate-50 pl-7 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-[#3D405B] focus:bg-white focus:outline-none font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase font-semibold text-slate-500">
                Tender Instrument:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs text-center font-bold">
                {(["Cash", "UPI", "Card"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setRapidMode(m)}
                    className={`py-1.5 rounded-lg border cursor-pointer transition-all ${
                      rapidMode === m
                        ? "bg-[#3D405B] text-white border-[#3D405B] shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                const st = defaulters.find((d) => d.rollNo === rapidRoll);
                if (st) {
                  openCollectModal(st);
                  setCollectAmount(Number(rapidAmount) || st.pendingDue);
                }
              }}
              type="button"
              className="mt-1 w-full py-2.5 bg-[#3D405B] hover:bg-[#2d3043] text-white text-xs uppercase font-bold tracking-wider rounded-xl transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <Banknote className="w-4 h-4" />
              <span>Record &amp; Clear Hold</span>
            </button>
          </div>

          {/* Real-time SMS Recovery Tracker */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#3D405B]" />
                <span className="text-xs font-bold uppercase text-[#3D405B]">
                  SMS Recovery Telemetry
                </span>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                TRAI DLT
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                  Sent Reminders
                </span>
                <span className="text-lg font-bold text-slate-800">284 SMS</span>
              </div>
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                <span className="text-[10px] uppercase text-emerald-700 font-semibold block">
                  Delivery Rate
                </span>
                <span className="text-lg font-bold text-emerald-700">98.2%</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                Recovered Post-Notice (Last 72h)
              </span>
              <span className="text-lg font-bold text-emerald-700">₹14,20,000</span>
              <span className="text-[11px] text-slate-500 block mt-1">
                38 students cleared dues and unbarred for examination.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Collect Fee Modal */}
      {collectModalStudent && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-150 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#3D405B]">
                    Realize Fee &amp; Lift Examination Hold
                  </h3>
                  <span className="text-xs text-slate-500">
                    Counter Voucher Issue &bull; Academic Clearance
                  </span>
                </div>
              </div>
              <button
                onClick={() => setCollectModalStudent(null)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Candidate Card */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-4">
              <div className="flex justify-between items-start mb-1.5">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">
                    {collectModalStudent.name}
                  </span>
                  <span className="font-mono text-[#3D405B] font-bold text-xs">
                    {collectModalStudent.rollNo}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-rose-100 text-rose-800 border border-rose-200 rounded-full font-bold text-xs">
                  Outstanding: ₹{collectModalStudent.pendingDue.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                {collectModalStudent.course} &bull; {collectModalStudent.term}
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                <span>Parent: {collectModalStudent.guardianName}</span>
                <span>Phone: {collectModalStudent.guardianPhone}</span>
              </div>
            </div>

            {/* Realization Form */}
            <div className="flex flex-col gap-3.5 mb-5">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-bold text-slate-600">
                  Realization Amount (₹):
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={collectAmount}
                    onChange={(e) => setCollectAmount(Number(e.target.value) || 0)}
                    className="w-full bg-white pl-8 pr-3 py-2 text-base font-bold text-slate-900 rounded-xl border border-slate-300 focus:border-[#3D405B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-bold text-slate-600">
                  Counter Payment Instrument:
                </label>
                <div className="grid grid-cols-4 gap-2 text-center font-bold">
                  {(["Cash", "UPI", "Card", "Bank Transfer"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCollectMode(mode)}
                      className={`p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        collectMode === mode
                          ? "bg-[#3D405B] text-white border-[#3D405B] shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-emerald-50/80 rounded-xl border border-emerald-200">
                <input
                  type="checkbox"
                  id="autoRelease"
                  checked={autoReleaseHold}
                  onChange={(e) => setAutoReleaseHold(e.target.checked)}
                  className="rounded cursor-pointer accent-emerald-600 w-4 h-4"
                />
                <label htmlFor="autoRelease" className="text-xs text-emerald-950 font-medium cursor-pointer">
                  <strong>Instant Academic Clearance:</strong> Immediately revoke Exam Hall Ticket Withholding in Controller of Examination (COE) portal.
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
              <button
                onClick={() => setCollectModalStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl uppercase font-semibold text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitCollectModal}
                className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl uppercase font-bold text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Confirm &amp; Issue Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk SMS Reminder Modal */}
      {isBulkSmsModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-150 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#3D405B]">
                    Dispatch Fee Recovery SMS Broadcast
                  </h3>
                  <span className="text-xs text-slate-500">
                    TRAI DLT Verified Gateway &bull; Instant Delivery
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBulkSmsModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3.5 mb-5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Segment:</span>
                  <span className="font-bold text-[#3D405B]">
                    {selectedIds.length > 0 ? `${selectedIds.length} Selected Accounts` : "All Overdue Defaulters"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Recipient Guardians:</span>
                  <span className="font-bold text-slate-800">
                    {selectedIds.length > 0 ? selectedIds.length : defaulters.length} Verified Mobile Numbers
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SMS Sender Header:</span>
                  <span className="font-mono font-bold text-slate-800">APEX-INST (Principal Bursar)</span>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-slate-600 block mb-1.5">
                  DLT Approved Reminder Template:
                </label>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-xs leading-relaxed font-sans">
                  "Dear Parent, Outstanding dues of ₹{"{DUE_AMOUNT}"} remain pending for {"{STUDENT_NAME}"} ({"{ROLL_NO}"}) at Apex Institute. Kindly settle before 18:00 IST today to avoid End-Sem exam hall ticket barring. Pay online at apex.edu.in/fees or visit Till #02 Bursar Office."
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  SMS will be transmitted via primary TRAI-approved telecom route with statutory delivery receipts tracked in the Bursar log.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
              <button
                onClick={() => setIsBulkSmsModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl uppercase font-semibold text-xs cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBulkSmsModalOpen(false);
                  const count = selectedIds.length > 0 ? selectedIds.length : defaulters.length;
                  showToast(`Bulk SMS broadcast successfully queued for ${count} guardians!`);
                }}
                className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl uppercase font-bold text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Broadcast</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gazette & Hall Ticket Barring List Printable Modal */}
      {isGazetteModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-150 font-sans text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
                  <Ban className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#3D405B]">
                    Apex Institute Official Defaulter Gazette
                  </h3>
                  <span className="text-xs text-slate-500">
                    Form COE/ACC-14: Examination Hall Ticket Withholding Notification
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsGazetteModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Gazette Preview Body */}
            <div className="overflow-y-auto pr-1 space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#3D405B]">APEX INSTITUTE OF TECHNOLOGY</h4>
                    <p className="text-[11px] text-slate-500">
                      Office of the Chief Bursar &bull; Controller of Examinations
                    </p>
                  </div>
                  <div className="text-right text-[11px] font-mono text-slate-500">
                    <div>Date: 17 Nov 2026</div>
                    <div>Ref: AIT/BUR/2026/DH-882</div>
                  </div>
                </div>

                <div className="text-xs leading-relaxed text-slate-700 mb-3">
                  Under Regulation §14.2 of Academic Statutes, the following candidates are withheld from the upcoming End-Semester Examination Hall Ticket issuance due to non-clearance of institutional fee dues.
                </div>

                <table className="w-full text-left text-xs border border-slate-200 bg-white">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-2">#</th>
                      <th className="p-2">Roll No</th>
                      <th className="p-2">Student Name</th>
                      <th className="p-2">Course / Term</th>
                      <th className="p-2 text-right">Overdue (₹)</th>
                      <th className="p-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {defaulters
                      .filter((d) => d.holdStatus === "Exam Hall Ticket Withheld")
                      .map((d, index) => (
                        <tr key={d.id}>
                          <td className="p-2 text-slate-500">{index + 1}</td>
                          <td className="p-2 font-mono font-bold text-slate-800">{d.rollNo}</td>
                          <td className="p-2 font-semibold text-slate-800">{d.name}</td>
                          <td className="p-2 text-slate-600">{d.course}</td>
                          <td className="p-2 text-right font-bold text-rose-700">
                            ₹{d.pendingDue.toLocaleString("en-IN")}
                          </td>
                          <td className="p-2 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                              BARRED
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center pt-5 mt-4 text-[11px] text-slate-500 border-t border-slate-200">
                  <div className="text-center">
                    <div className="h-6 font-script font-bold text-slate-800">R. K. Verma</div>
                    <div className="font-semibold text-slate-700">Accounts &amp; Cashier Officer</div>
                  </div>
                  <div className="text-center">
                    <div className="h-6 font-script font-bold text-slate-800">Dr. S. Mukherjee</div>
                    <div className="font-semibold text-slate-700">Chief Bursar &amp; Dean Academic Finance</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 mt-3 border-t border-slate-200">
              <button
                onClick={() => setIsGazetteModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl uppercase font-semibold text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl uppercase font-bold text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Notice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Arrear Dossier Detail Modal */}
      {dossierStudent && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 duration-150 font-sans text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                  <UserX className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#3D405B]">
                    Student Arrear Dossier &bull; {dossierStudent.rollNo}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Comprehensive Ledger &amp; Communications Trail
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDossierStudent(null)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 mb-5">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{dossierStudent.name}</h4>
                  <p className="text-slate-500 text-xs">{dossierStudent.course}</p>
                  <p className="text-slate-400 text-[11px]">{dossierStudent.term}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Total Arrear Due:</span>
                  <span className="text-lg font-bold text-rose-600">
                    ₹{dossierStudent.pendingDue.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase text-slate-500 font-semibold block">
                    Total Billed Fee
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    ₹{dossierStudent.totalFee.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <span className="text-[10px] uppercase text-emerald-700 font-semibold block">
                    Amount Realized
                  </span>
                  <span className="font-bold text-emerald-800 text-sm">
                    ₹{dossierStudent.paidAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Guardian Name:</span>
                  <span className="font-semibold text-slate-800">{dossierStudent.guardianName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Number:</span>
                  <span className="font-mono text-slate-800">{dossierStudent.guardianPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email Address:</span>
                  <span className="font-mono text-slate-800">{dossierStudent.guardianEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Aging Duration:</span>
                  <span className="font-bold text-rose-700">
                    {dossierStudent.agingDays} Days ({dossierStudent.agingCategory})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Reminder:</span>
                  <span className="text-slate-700 font-medium">
                    {dossierStudent.lastReminderSent || "None recorded"}
                  </span>
                </div>
              </div>

              {dossierStudent.notes && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
                  <strong>Cashier / Advisor Notes:</strong> {dossierStudent.notes}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                onClick={() => {
                  const student = dossierStudent;
                  setDossierStudent(null);
                  openCollectModal(student);
                }}
                className="px-4 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl uppercase font-bold text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Banknote className="w-4 h-4" />
                <span>Collect Due Now</span>
              </button>
              <button
                onClick={() => setDossierStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl uppercase font-semibold text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
