"use client";

import React, { useState } from "react";
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
  agingDays: number;
  agingCategory: "> 60 Days" | "30-60 Days" | "15-30 Days" | "< 15 Days";
  holdStatus: "Exam Hall Ticket Withheld" | "Grace Period" | "Notice Served";
  guardianName: string;
  guardianPhone: string;
}

const mockDefaulters: DefaulterStudent[] = [
  {
    id: "1",
    name: "Rohan Verma",
    rollNo: "APX-2024-ME-058",
    course: "B.Tech Mechanical Engineering",
    term: "Sem III (2024-28)",
    totalFee: 35000,
    paidAmount: 25000,
    pendingDue: 10000,
    agingDays: 48,
    agingCategory: "30-60 Days",
    holdStatus: "Exam Hall Ticket Withheld",
    guardianName: "Sunil Verma",
    guardianPhone: "+91 97123 45678",
  },
  {
    id: "2",
    name: "Sneha Kulkarni",
    rollNo: "APX-2023-CS-088",
    course: "B.Tech Computer Science & Eng.",
    term: "Sem V (2023-27)",
    totalFee: 75000,
    paidAmount: 50000,
    pendingDue: 25000,
    agingDays: 34,
    agingCategory: "30-60 Days",
    holdStatus: "Grace Period",
    guardianName: "Dhananjay Kulkarni",
    guardianPhone: "+91 98450 11223",
  },
  {
    id: "3",
    name: "Kunal Saxena",
    rollNo: "APX-2022-CS-014",
    course: "B.Tech Computer Science & Eng.",
    term: "Sem VII (2022-26)",
    totalFee: 85000,
    paidAmount: 32500,
    pendingDue: 52500,
    agingDays: 62,
    agingCategory: "> 60 Days",
    holdStatus: "Exam Hall Ticket Withheld",
    guardianName: "Alok Saxena",
    guardianPhone: "+91 98112 33445",
  },
  {
    id: "4",
    name: "Vikramaditya Singh",
    rollNo: "APX-2022-EE-012",
    course: "B.Tech Electrical Engineering",
    term: "Sem VII (2022-26)",
    totalFee: 42000,
    paidAmount: 35000,
    pendingDue: 7000,
    agingDays: 14,
    agingCategory: "< 15 Days",
    holdStatus: "Grace Period",
    guardianName: "Pratap Singh",
    guardianPhone: "+91 99887 76655",
  },
  {
    id: "5",
    name: "Rahul Sharma",
    rollNo: "APX-2023-CS-042",
    course: "B.Tech Computer Science & Eng.",
    term: "Sem V (2023-27)",
    totalFee: 52500,
    paidAmount: 27500,
    pendingDue: 25000,
    agingDays: 28,
    agingCategory: "15-30 Days",
    holdStatus: "Notice Served",
    guardianName: "Rajendra Sharma",
    guardianPhone: "+91 98765 43210",
  },
  {
    id: "6",
    name: "Tanmay Joshi",
    rollNo: "APX-2024-EC-031",
    course: "B.Tech Electronics & Comm.",
    term: "Sem III (2024-28)",
    totalFee: 68000,
    paidAmount: 30000,
    pendingDue: 38000,
    agingDays: 41,
    agingCategory: "30-60 Days",
    holdStatus: "Exam Hall Ticket Withheld",
    guardianName: "Suresh Joshi",
    guardianPhone: "+91 98990 12345",
  },
  {
    id: "7",
    name: "Ritu Singhania",
    rollNo: "APX-2023-BT-009",
    course: "B.Tech Biotechnology",
    term: "Sem V (2023-27)",
    totalFee: 48500,
    paidAmount: 30000,
    pendingDue: 18500,
    agingDays: 19,
    agingCategory: "15-30 Days",
    holdStatus: "Notice Served",
    guardianName: "Mukesh Singhania",
    guardianPhone: "+91 98101 23456",
  },
  {
    id: "8",
    name: "Manav Gupta",
    rollNo: "APX-2022-ME-045",
    course: "B.Tech Mechanical Engineering",
    term: "Sem VII (2022-26)",
    totalFee: 94000,
    paidAmount: 30000,
    pendingDue: 64000,
    agingDays: 75,
    agingCategory: "> 60 Days",
    holdStatus: "Exam Hall Ticket Withheld",
    guardianName: "Vinod Gupta",
    guardianPhone: "+91 98711 99887",
  },
];

export default function AccountantPendingDuesPage() {
  const [defaulters, setDefaulters] = useState<DefaulterStudent[]>(mockDefaulters);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeAgingTab, setActiveAgingTab] = useState<
    "all" | "critical" | "grace" | "minor"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("ALL");
  const [amountRangeFilter, setAmountRangeFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [collectModalStudent, setCollectModalStudent] = useState<DefaulterStudent | null>(null);
  const [collectAmount, setCollectAmount] = useState<number>(0);
  const [collectMode, setCollectMode] = useState<"Cash" | "UPI" | "Card">("UPI");
  const [isBulkSmsModalOpen, setIsBulkSmsModalOpen] = useState(false);
  const [isGazetteModalOpen, setIsGazetteModalOpen] = useState(false);

  // Quick Rapid Collect Panel State
  const [rapidRoll, setRapidRoll] = useState("APX-2024-ME-058");
  const [rapidAmount, setRapidAmount] = useState("10000");
  const [rapidMode, setRapidMode] = useState("Cash");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

  const filteredDefaulters = defaulters.filter((d) => {
    // Tab filter
    if (activeAgingTab === "critical" && d.holdStatus !== "Exam Hall Ticket Withheld") {
      return false;
    }
    if (activeAgingTab === "grace" && d.holdStatus !== "Grace Period") {
      return false;
    }
    if (activeAgingTab === "minor" && d.pendingDue >= 15000) {
      return false;
    }

    // Search
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.guardianPhone.includes(searchQuery);
    if (!matchesSearch) return false;

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

  const openCollectModal = (student: DefaulterStudent) => {
    setCollectModalStudent(student);
    setCollectAmount(student.pendingDue);
  };

  const submitCollectModal = () => {
    if (!collectModalStudent) return;
    showToast(
      `Realized ₹${collectAmount.toLocaleString("en-IN")} via ${collectMode} for ${collectModalStudent.name} (${collectModalStudent.rollNo}). Stamped receipt generated.`
    );
    // update state
    setDefaulters((prev) =>
      prev.map((item) => {
        if (item.id === collectModalStudent.id) {
          const newPending = Math.max(0, item.pendingDue - collectAmount);
          return {
            ...item,
            paidAmount: item.paidAmount + collectAmount,
            pendingDue: newPending,
            holdStatus: newPending === 0 ? "Grace Period" : item.holdStatus,
          };
        }
        return item;
      })
    );
    setCollectModalStudent(null);
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

      {/* Top Context Ribbon & Strategic Header */}
      <div className="bg-surface-container-lowest p-4 mb-4 shadow-xs border border-[#d5e3fc]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 font-mono text-[11px] text-secondary uppercase tracking-wider mb-1">
              <span>Accounts &amp; Bursar Portal</span>
              <span className="text-outline-variant">/</span>
              <span>Arrear Management</span>
              <span className="text-outline-variant">/</span>
              <span className="text-primary font-bold">Defaulters &amp; Exam Holds</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold font-headline text-primary tracking-tight">
                Pending Dues &amp; Academic Examination Clearance Hold Registry
              </h1>
              <span className="px-2 py-0.5 bg-error text-on-error font-mono text-[11px] font-bold">
                82 HALL TICKET HOLDS
              </span>
            </div>
          </div>

          {/* Top Tactical Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsBulkSmsModalOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs uppercase tracking-wider transition-colors border border-[#cbd5e1] font-semibold cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-secondary" />
              <span>Send Bulk SMS Fee Reminders</span>
            </button>
            <button
              onClick={() => setIsGazetteModalOpen(true)}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs uppercase tracking-wider transition-colors border border-[#cbd5e1] font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-secondary" />
              <span>Download Defaulter Gazette (PDF)</span>
            </button>
            <button
              onClick={() =>
                showToast("Hall Ticket Barring List exported to Controller of Examinations (COE)!")
              }
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-error text-on-error hover:bg-error/90 font-mono text-xs uppercase tracking-wider transition-colors font-bold shadow-xs cursor-pointer"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Generate Hall Ticket Hold List</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Strategic Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
              Total Outstanding Dues
            </span>
            <span className="text-xl font-bold font-mono text-error">₹46,50,000</span>
            <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">
              342 Student Accounts
            </span>
          </div>
          <div className="p-2.5 bg-rose-50 text-error border border-rose-200">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
              Pending Defaulters
            </span>
            <span className="text-xl font-bold font-mono text-primary">342 Students</span>
            <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">
              18.4% of Total Enrollment
            </span>
          </div>
          <div className="p-2.5 bg-surface-container text-secondary">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
              Imminent Exam Holds
            </span>
            <span className="text-xl font-bold font-mono text-rose-700">82 Students</span>
            <span className="text-[10px] text-rose-600 font-mono mt-0.5">
              Auto-Barring in 48 Hours
            </span>
          </div>
          <div className="p-2.5 bg-rose-100 text-rose-800 border border-rose-300">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
              Avg Outstanding / Account
            </span>
            <span className="text-xl font-bold font-mono text-primary">₹13,596</span>
            <span className="text-[10px] text-on-surface-variant font-mono mt-0.5">
              Std Dev: &plusmn;₹4,200
            </span>
          </div>
          <div className="p-2.5 bg-surface-container text-secondary">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Recovery Pipeline Visual Scrim & Analytics Inline Bar */}
      <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs mb-4">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="font-bold text-primary uppercase">
            Arrear Risk Exposure Composition (₹46.50 Lakh Total Pool)
          </span>
          <span className="text-[11px] text-on-surface-variant">
            Critical Defaults (&gt;₹50k) constitute 61.1% of capital at risk
          </span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="w-full h-3 bg-surface-container-low flex overflow-hidden border border-[#cbd5e1] mb-2">
          <div className="bg-rose-700 h-full" style={{ width: "61.1%" }} title="Critical Default > ₹50k (61.1%)" />
          <div className="bg-amber-500 h-full" style={{ width: "26.2%" }} title="Medium Risk ₹25k - ₹50k (26.2%)" />
          <div className="bg-secondary h-full" style={{ width: "12.7%" }} title="Minor Arrears < ₹25k (12.7%)" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-rose-700 shrink-0" />
            <span className="text-gray-600">Critical &gt; ₹50,000:</span>
            <span className="font-bold text-rose-800">₹28.40 L (34 Students)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-amber-500 shrink-0" />
            <span className="text-gray-600">Medium ₹25k - ₹50k:</span>
            <span className="font-bold text-amber-800">₹12.20 L (48 Students)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-secondary shrink-0" />
            <span className="text-gray-600">Minor &lt; ₹25,000:</span>
            <span className="font-bold text-primary">₹5.90 L (260 Students)</span>
          </div>
        </div>
      </div>

      {/* Interactive Aging Tabs & Filtering Rig */}
      <div className="bg-surface-container-lowest p-3 border border-[#d5e3fc] shadow-xs mb-4 flex flex-col gap-3">
        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#cbd5e1] pb-2 font-mono text-xs">
          <button
            onClick={() => setActiveAgingTab("all")}
            className={`px-3 py-1.5 font-bold uppercase transition-colors border-b-2 -mb-[10px] cursor-pointer ${
              activeAgingTab === "all"
                ? "border-primary text-primary bg-surface-container-low"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            All Pending Dues (342)
          </button>
          <button
            onClick={() => setActiveAgingTab("critical")}
            className={`px-3 py-1.5 font-bold uppercase transition-colors border-b-2 -mb-[10px] cursor-pointer ${
              activeAgingTab === "critical"
                ? "border-rose-700 text-rose-800 bg-rose-50"
                : "border-transparent text-on-surface-variant hover:text-rose-700"
            }`}
          >
            Critical Hold: Exam Barred (82)
          </button>
          <button
            onClick={() => setActiveAgingTab("grace")}
            className={`px-3 py-1.5 font-bold uppercase transition-colors border-b-2 -mb-[10px] cursor-pointer ${
              activeAgingTab === "grace"
                ? "border-amber-600 text-amber-800 bg-amber-50"
                : "border-transparent text-on-surface-variant hover:text-amber-700"
            }`}
          >
            Grace Period / Inst. 3 (195)
          </button>
          <button
            onClick={() => setActiveAgingTab("minor")}
            className={`px-3 py-1.5 font-bold uppercase transition-colors border-b-2 -mb-[10px] cursor-pointer ${
              activeAgingTab === "minor"
                ? "border-secondary text-primary bg-surface-container-low"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Minor Dues &lt; ₹15k (65)
          </button>
        </div>

        {/* Multi-Dimensional Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs font-mono">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Student, Roll, or Phone..."
              className="w-full bg-surface-container-low pl-8 pr-3 py-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
            />
          </div>

          <div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full bg-surface-container-low p-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
            >
              <option value="ALL">All Academic Disciplines</option>
              <option value="Computer Science">Computer Science (CSE)</option>
              <option value="Electronics">Electronics &amp; Comm. (ECE)</option>
              <option value="Mechanical">Mechanical Eng. (ME)</option>
              <option value="Electrical">Electrical Eng. (EE)</option>
              <option value="Biotechnology">Biotechnology (BT)</option>
            </select>
          </div>

          <div>
            <select
              value={amountRangeFilter}
              onChange={(e) => setAmountRangeFilter(e.target.value)}
              className="w-full bg-surface-container-low p-1.5 border border-[#cbd5e1] focus:border-secondary focus:outline-none"
            >
              <option value="ALL">All Outstanding Amounts</option>
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
              }}
              className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high border border-[#cbd5e1] uppercase font-bold text-[11px] text-on-surface-variant"
            >
              Reset Filters
            </button>
            <span className="text-[11px] text-on-surface-variant">
              Found {filteredDefaulters.length} accounts
            </span>
          </div>
        </div>
      </div>

      {/* Main Ledger Split: 9 Cols (Table) + 3 Cols (Statutory Directives & Rapid Collect Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: The Comprehensive Defaulters Ledger (9 Cols) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-surface-container-low font-mono text-[10px] uppercase text-on-surface-variant border-b border-[#cbd5e1]">
                  <th className="p-2.5 w-8 text-center">
                    <input
                      type="checkbox"
                      checked={
                        filteredDefaulters.length > 0 &&
                        selectedIds.length === filteredDefaulters.length
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded-none cursor-pointer"
                    />
                  </th>
                  <th className="p-2.5">Candidate Particulars</th>
                  <th className="p-2.5 font-mono text-right">Billed (₹)</th>
                  <th className="p-2.5 font-mono text-right">Paid (₹)</th>
                  <th className="p-2.5 font-mono text-right font-bold text-error">Due (₹)</th>
                  <th className="p-2.5 text-center font-mono">Aging Days</th>
                  <th className="p-2.5 text-center font-mono">Clearance Status</th>
                  <th className="p-2.5">Guardian Contact</th>
                  <th className="p-2.5 text-right font-mono">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {filteredDefaulters.map((item) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-surface-container-low transition-colors ${
                        isChecked ? "bg-surface-container-high/40" : ""
                      }`}
                    >
                      <td className="p-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                          className="rounded-none cursor-pointer"
                        />
                      </td>

                      <td className="p-2.5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-primary">{item.name}</span>
                          <span className="font-mono text-[11px] text-secondary font-bold">
                            {item.rollNo}
                          </span>
                          <span className="text-[10px] text-on-surface-variant">
                            {item.course} &bull; {item.term}
                          </span>
                        </div>
                      </td>

                      <td className="p-2.5 text-right font-mono text-on-surface">
                        ₹{item.totalFee.toLocaleString("en-IN")}
                      </td>

                      <td className="p-2.5 text-right font-mono text-emerald-800 font-semibold">
                        ₹{item.paidAmount.toLocaleString("en-IN")}
                      </td>

                      <td className="p-2.5 text-right font-mono font-bold text-error">
                        ₹{item.pendingDue.toLocaleString("en-IN")}
                      </td>

                      <td className="p-2.5 text-center">
                        <span
                          className={`px-1.5 py-0.5 font-mono text-[10px] uppercase font-bold ${
                            item.agingDays > 60
                              ? "bg-rose-100 text-rose-900 border border-rose-300"
                              : item.agingDays >= 30
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-blue-100 text-blue-900 border border-blue-300"
                          }`}
                        >
                          {item.agingDays}d ({item.agingCategory})
                        </span>
                      </td>

                      <td className="p-2.5 text-center">
                        <span
                          className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase inline-flex items-center gap-1 ${
                            item.holdStatus === "Exam Hall Ticket Withheld"
                              ? "bg-rose-700 text-white"
                              : item.holdStatus === "Grace Period"
                              ? "bg-amber-100 text-amber-900 border border-amber-400"
                              : "bg-blue-100 text-blue-900 border border-blue-400"
                          }`}
                        >
                          {item.holdStatus === "Exam Hall Ticket Withheld" && (
                            <Ban className="w-2.5 h-2.5" />
                          )}
                          {item.holdStatus}
                        </span>
                      </td>

                      <td className="p-2.5">
                        <div className="flex flex-col text-[11px]">
                          <span className="font-medium text-gray-700">{item.guardianName}</span>
                          <span className="font-mono text-gray-500">{item.guardianPhone}</span>
                        </div>
                      </td>

                      <td className="p-2.5 text-right">
                        <div className="flex items-center justify-end gap-1 font-mono">
                          <button
                            onClick={() => openCollectModal(item)}
                            className="px-2 py-1 bg-primary text-on-primary text-[10px] uppercase font-bold hover:bg-primary/90 transition-colors cursor-pointer"
                            title="Collect Fee at Counter"
                          >
                            Collect
                          </button>
                          <button
                            onClick={() =>
                              showToast(`Dispatched urgency SMS reminder to ${item.guardianPhone}`)
                            }
                            className="p-1 bg-surface-container hover:bg-surface-container-high border border-[#cbd5e1] text-secondary cursor-pointer"
                            title="Send Warning SMS"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/accountant/fee-details`}
                            className="p-1 bg-surface-container hover:bg-surface-container-high border border-[#cbd5e1] text-primary"
                            title="Audit Ledger"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Table Bottom Control Strip */}
            <div className="bg-surface-container-low p-2.5 border-t border-[#cbd5e1] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">
                  {selectedIds.length} of {filteredDefaulters.length} Accounts Selected
                </span>
                {selectedIds.length > 0 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        showToast(`Sent bulk reminder SMS to ${selectedIds.length} guardians!`);
                        setSelectedIds([]);
                      }}
                      className="px-2.5 py-1 bg-primary text-on-primary text-[10px] uppercase font-bold hover:bg-primary/90"
                    >
                      Send Bulk Warning SMS
                    </button>
                    <button
                      onClick={() => {
                        showToast(`Exported hold notices for ${selectedIds.length} accounts!`);
                      }}
                      className="px-2.5 py-1 bg-surface-container-high border border-[#cbd5e1] text-[10px] uppercase font-bold"
                    >
                      Export Hold Notices
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-on-surface-variant mr-2">Page 1 of 43</span>
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
        </div>

        {/* Right Column: Statutory Directives & Rapid Collect Box (3 Cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3 font-mono">
          {/* Statutory Action Callout */}
          <div className="bg-rose-50 border-2 border-rose-300 p-3.5 shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-tight">
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" />
              <span>Ordinance §14.2 Barring Directive</span>
            </div>
            <p className="text-[11px] text-rose-950 leading-relaxed font-sans">
              As per Apex Academic Council directive, hall tickets for End-Semester Examinations are withheld for candidates with cumulative arrears &gt; ₹25,000 overdue &gt; 30 days. Reversal requires instantaneous realization clearance.
            </p>
            <div className="text-[10px] text-rose-800 font-bold border-t border-rose-200 pt-1.5 flex items-center justify-between">
              <span>Automatic Lock Cutoff:</span>
              <span>18:00 IST Today</span>
            </div>
          </div>

          {/* Quick Fast Action: Immediate Counter Payment Entry */}
          <div className="bg-surface-container-lowest border border-[#d5e3fc] p-3.5 shadow-xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-1.5">
              <span className="text-xs font-bold uppercase text-primary">
                Rapid Counter Realization
              </span>
              <span className="text-[9px] bg-secondary-container text-primary font-bold px-1.5 py-0.2">
                TILL #02
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-semibold text-gray-500">
                Student Candidate:
              </label>
              <select
                value={rapidRoll}
                onChange={(e) => {
                  setRapidRoll(e.target.value);
                  const st = defaulters.find((d) => d.rollNo === e.target.value);
                  if (st) setRapidAmount(st.pendingDue.toString());
                }}
                className="bg-surface-container-low p-1.5 text-xs border border-[#cbd5e1] focus:border-secondary focus:outline-none"
              >
                {defaulters.map((d) => (
                  <option key={d.id} value={d.rollNo}>
                    {d.rollNo} - {d.name} (Due: ₹{d.pendingDue.toLocaleString("en-IN")})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-semibold text-gray-500">
                Amount Tendered (₹):
              </label>
              <input
                type="number"
                value={rapidAmount}
                onChange={(e) => setRapidAmount(e.target.value)}
                className="bg-surface-container-low p-1.5 text-xs border border-[#cbd5e1] focus:border-secondary focus:outline-none font-bold text-primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-semibold text-gray-500">
                Tender Mode:
              </label>
              <div className="grid grid-cols-3 gap-1 text-[11px] text-center font-bold">
                {(["Cash", "UPI", "POS Card"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setRapidMode(m)}
                    className={`py-1 border cursor-pointer ${
                      rapidMode === m
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface-container border-[#cbd5e1] text-on-surface-variant hover:text-on-surface"
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
              className="mt-1 w-full py-2 bg-primary text-on-primary text-xs uppercase font-bold tracking-wider hover:bg-primary/95 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Banknote className="w-3.5 h-3.5" />
              <span>Record &amp; Clear Hold</span>
            </button>
          </div>

          {/* Real-time SMS Recovery Tracker */}
          <div className="bg-surface-container-lowest border border-[#d5e3fc] p-3.5 shadow-xs flex flex-col gap-2">
            <div className="text-xs font-bold uppercase text-primary border-b border-[#cbd5e1] pb-1.5">
              SMS Recovery Telemetry
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-[9px] uppercase text-gray-500 block">Sent Reminders</span>
                <span className="text-base font-bold text-primary">284</span>
              </div>
              <div className="p-2 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-[9px] uppercase text-gray-500 block">Delivered Rate</span>
                <span className="text-base font-bold text-emerald-700">98.2%</span>
              </div>
            </div>
            <div className="p-2 bg-surface-container-low border border-[#cbd5e1] text-xs">
              <span className="text-[9px] uppercase text-gray-500 block">
                Recovered Post-Notice (Last 72h)
              </span>
              <span className="text-base font-bold text-primary">₹14,20,000</span>
              <span className="text-[10px] text-gray-500 block mt-0.5">
                38 Students cleared &amp; hall tickets unbarred
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Collect Fee Modal */}
      {collectModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-primary w-full max-w-lg p-5 shadow-2xl animate-in zoom-in-95 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Banknote className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-tight">
                  Fee Realization &amp; Hold Lift: {collectModalStudent.rollNo}
                </h3>
              </div>
              <button
                onClick={() => setCollectModalStudent(null)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Candidate Card */}
            <div className="p-3 bg-surface-container-low border border-[#cbd5e1] mb-3">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="font-bold text-primary text-sm font-sans block">
                    {collectModalStudent.name}
                  </span>
                  <span className="text-secondary font-bold text-[11px]">
                    {collectModalStudent.rollNo}
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-rose-100 text-rose-900 border border-rose-300 font-bold text-[10px] uppercase">
                  Due: ₹{collectModalStudent.pendingDue.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="text-[11px] text-gray-600 font-sans">
                {collectModalStudent.course} &bull; {collectModalStudent.term}
              </div>
            </div>

            {/* Realization Form */}
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-secondary">
                  Realization Amount (₹):
                </label>
                <input
                  type="number"
                  value={collectAmount}
                  onChange={(e) => setCollectAmount(Number(e.target.value) || 0)}
                  className="bg-white p-2 text-base font-bold text-primary border border-[#cbd5e1] focus:border-secondary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-secondary">
                  Counter Payment Instrument:
                </label>
                <div className="grid grid-cols-3 gap-2 text-center font-bold">
                  {(["Cash", "UPI", "Card"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCollectMode(mode)}
                      className={`p-2 border cursor-pointer ${
                        collectMode === mode
                          ? "bg-primary text-on-primary border-primary"
                          : "bg-surface-container border-[#cbd5e1] text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-300 text-amber-900 text-[11px] leading-relaxed">
                <strong>Instant Academic Clearance:</strong> Upon confirming this realization, any automatic examination hall ticket hold for {collectModalStudent.name} will be immediately lifted in the University Controller database.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#cbd5e1]">
              <button
                onClick={() => setCollectModalStudent(null)}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface uppercase font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={submitCollectModal}
                className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary/95 uppercase font-bold tracking-wider cursor-pointer shadow-xs"
              >
                Confirm Realization &amp; Issue Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk SMS Reminder Modal */}
      {isBulkSmsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-primary w-full max-w-md p-5 shadow-2xl animate-in zoom-in-95 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-tight">
                  Dispatch Fee Recovery SMS Broadcast
                </h3>
              </div>
              <button
                onClick={() => setIsBulkSmsModalOpen(false)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <div className="p-2.5 bg-surface-container-low border border-[#cbd5e1]">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Target Segment:</span>
                  <span className="font-bold text-primary">All Active Defaulters</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-500">Recipients:</span>
                  <span className="font-bold text-primary">342 Registered Guardians</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">SMS Gateway:</span>
                  <span className="font-bold text-primary">APEX-INST (TRAI DLT Verified)</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-secondary block mb-1">
                  Approved DLT Template Preview:
                </label>
                <div className="p-2.5 bg-gray-50 border border-gray-300 text-gray-800 text-[11px] font-sans leading-relaxed">
                  "Dear Parent, Outstanding dues of ₹{"{AMOUNT}"} remain pending for {"{STUDENT_NAME}"} ({"{ROLL_NO}"}) at Apex Institute. Kindly settle before 18:00 IST to avoid End-Sem exam hall ticket barring. Pay online at apex.edu.in/fees or visit Till #02."
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#cbd5e1]">
              <button
                onClick={() => setIsBulkSmsModalOpen(false)}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface uppercase font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBulkSmsModalOpen(false);
                  showToast("Bulk SMS dispatched to 342 student guardians via DLT gateway!");
                }}
                className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary/95 uppercase font-bold tracking-wider cursor-pointer shadow-xs"
              >
                Dispatch 342 SMS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gazette Modal */}
      {isGazetteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-primary w-full max-w-md p-5 shadow-2xl animate-in zoom-in-95 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#cbd5e1] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-secondary" />
                <h3 className="font-headline font-bold text-sm text-primary uppercase tracking-tight">
                  Defaulters &amp; Arrears Gazette
                </h3>
              </div>
              <button
                onClick={() => setIsGazetteModalOpen(false)}
                className="p-1 hover:bg-surface-container text-on-surface-variant cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-on-surface-variant leading-relaxed mb-3">
              Generate an official, stamped institutional PDF gazette of all accounts currently with uncollected balances, organized by department and overdue aging.
            </p>

            <div className="p-2.5 bg-surface-container-low border border-[#cbd5e1] mb-4 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Accounts:</span>
                <span className="font-bold text-primary">342 Defaulters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cumulative Arrears:</span>
                <span className="font-bold text-error">₹46,50,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Signatory:</span>
                <span className="font-bold text-primary">Bursar &amp; Finance Officer</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#cbd5e1]">
              <button
                onClick={() => setIsGazetteModalOpen(false)}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface uppercase font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsGazetteModalOpen(false);
                  showToast("Downloading Official Defaulter Gazette (PDF)...");
                }}
                className="px-4 py-1.5 bg-primary text-on-primary hover:bg-primary/95 uppercase font-bold tracking-wider cursor-pointer shadow-xs"
              >
                Download PDF Gazette
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

