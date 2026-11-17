"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ShieldCheck,
  Lock,
  Unlock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  FileSpreadsheet,
  Users,
  UserCheck,
  UserX,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  Info,
  Mail,
  TrendingUp,
  CalendarDays,
  X,
  Filter,
  Sparkles,
  RefreshCw,
  Download,
  Send,
  Printer,
  Fingerprint,
  Check,
  SlidersHorizontal,
  Phone
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  rollNo: string;
  name: string;
  guardian: string;
  guardianPhone: string;
  avatar?: string;
  initials?: string;
  monthlyAvg: number;
  status: "P" | "A" | "L";
  remarks: string;
  smsAlert: boolean;
  isAtRisk?: boolean;
}

const INITIAL_ROSTER: AttendanceRecord[] = [
  {
    id: "r1",
    rollNo: "APX-CS-001",
    name: "Arjun Sharma",
    guardian: "Rajesh Sharma",
    guardianPhone: "+91 98765 43210",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    monthlyAvg: 92.4,
    status: "P",
    remarks: "",
    smsAlert: false
  },
  {
    id: "r2",
    rollNo: "APX-CS-002",
    name: "Devina Mukherjee",
    guardian: "Animesh Mukherjee",
    guardianPhone: "+91 98234 56789",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    monthlyAvg: 68.2,
    status: "A",
    remarks: "Unexcused - 3rd consecutive lecture",
    smsAlert: true,
    isAtRisk: true
  },
  {
    id: "r3",
    rollNo: "APX-CS-003",
    name: "Siddharth Rao",
    guardian: "Anand Rao",
    guardianPhone: "+91 99112 33445",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    monthlyAvg: 84.0,
    status: "L",
    remarks: "Medical certificate submitted (Apex Health Center)",
    smsAlert: false
  },
  {
    id: "r4",
    rollNo: "APX-CS-004",
    name: "Kiran Kumar",
    guardian: "Suresh Kumar",
    guardianPhone: "+91 97654 32198",
    initials: "KK",
    monthlyAvg: 71.5,
    status: "A",
    remarks: "Inter-collegiate Sports trials clearance pending",
    smsAlert: true,
    isAtRisk: true
  },
  {
    id: "r5",
    rollNo: "APX-CS-005",
    name: "Ananya Desai",
    guardian: "Vikram Desai",
    guardianPhone: "+91 98450 12345",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    monthlyAvg: 96.8,
    status: "P",
    remarks: "Perfect attendance milestone",
    smsAlert: false
  },
  {
    id: "r6",
    rollNo: "APX-CS-006",
    name: "Tarun Reddy",
    guardian: "Srinivas Reddy",
    guardianPhone: "+91 98123 45678",
    initials: "TR",
    monthlyAvg: 88.1,
    status: "P",
    remarks: "Late entry: 09:12 AM (Bus route #14 delay)",
    smsAlert: false
  },
  {
    id: "r7",
    rollNo: "APX-CS-007",
    name: "Zoya Naaz",
    guardian: "Farooq Naaz",
    guardianPhone: "+91 99887 76655",
    initials: "ZN",
    monthlyAvg: 78.9,
    status: "L",
    remarks: "Dean-approved NSS National Youth Camp",
    smsAlert: false
  },
  {
    id: "r8",
    rollNo: "APX-CS-008",
    name: "Rishi Verma",
    guardian: "Anil Verma",
    guardianPhone: "+91 98321 65498",
    initials: "RV",
    monthlyAvg: 77.4,
    status: "A",
    remarks: "No prior intimation",
    smsAlert: true
  },
  {
    id: "r9",
    rollNo: "APX-CS-009",
    name: "Pooja Hegde",
    guardian: "Manjunath Hegde",
    guardianPhone: "+91 97412 88990",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    monthlyAvg: 91.5,
    status: "P",
    remarks: "",
    smsAlert: false
  },
  {
    id: "r10",
    rollNo: "APX-CS-010",
    name: "Aditya Nair",
    guardian: "Gopinath Nair",
    guardianPhone: "+91 98950 44556",
    initials: "AN",
    monthlyAvg: 86.3,
    status: "P",
    remarks: "",
    smsAlert: false
  }
];

export default function AttendancePage() {
  const [roster, setRoster] = useState<AttendanceRecord[]>(INITIAL_ROSTER);
  const [isLocked, setIsLocked] = useState(false);
  const [lectureDate, setLectureDate] = useState("2025-03-24");
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "P" | "A" | "L" | "critical">("all");
  const [globalSmsToggle, setGlobalSmsToggle] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState("B.Tech Computer Science & Eng.");
  const [selectedBatch, setSelectedBatch] = useState("Batch 2023-27 [Sem 04]");
  const [selectedSubject, setSelectedSubject] = useState("CS302 - Database Management Systems");
  const [selectedPeriod, setSelectedPeriod] = useState("09:00 - 10:15 AM (Period 1)");

  // Modals & Drawers
  const [debarCandidate, setDebarCandidate] = useState<AttendanceRecord | null>(null);
  const [isBiometricSyncOpen, setIsBiometricSyncOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cohort math scaled to nominal 64 cohort size
  const totalSimulated = 64;
  const pCount = roster.filter((r) => r.status === "P").length;
  const aCount = roster.filter((r) => r.status === "A").length;
  const lCount = roster.filter((r) => r.status === "L").length;
  const ratio = roster.length ? pCount / roster.length : 0.9;
  const simP = Math.round(ratio * totalSimulated);
  const simA = Math.round((aCount / roster.length) * totalSimulated);
  const simL = Math.max(0, totalSimulated - simP - simA);

  const presentPct = ((simP / totalSimulated) * 100).toFixed(1);
  const absentPct = ((simA / totalSimulated) * 100).toFixed(1);
  const leavePct = ((simL / totalSimulated) * 100).toFixed(1);

  // Status toggle handler
  const handleStatusChange = (id: string, newStatus: "P" | "A" | "L") => {
    if (isLocked) {
      showToast("Register is locked. Click 'Unlock Register' first to make edits.");
      return;
    }
    setRoster((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status: newStatus,
            smsAlert: newStatus === "A" ? true : false
          };
        }
        return r;
      })
    );
  };

  // Remarks update
  const handleRemarksChange = (id: string, text: string) => {
    if (isLocked) {
      showToast("Register is locked. Unlock to modify remarks.");
      return;
    }
    setRoster((prev) =>
      prev.map((r) => (r.id === id ? { ...r, remarks: text } : r))
    );
  };

  // SMS alert toggle
  const handleSmsToggle = (id: string) => {
    setRoster((prev) =>
      prev.map((r) => (r.id === id ? { ...r, smsAlert: !r.smsAlert } : r))
    );
  };

  // Mark all present
  const handleMarkAllPresent = () => {
    if (isLocked) {
      showToast("Register is locked. Unlock to modify.");
      return;
    }
    setRoster((prev) =>
      prev.map((r) => ({
        ...r,
        status: "P",
        smsAlert: false
      }))
    );
    showToast("All students in current section marked PRESENT.");
  };

  // Clear all / Reset to Absent
  const handleClearAll = () => {
    if (isLocked) {
      showToast("Register is locked. Unlock to modify.");
      return;
    }
    setRoster((prev) =>
      prev.map((r) => ({
        ...r,
        status: "A",
        smsAlert: true
      }))
    );
    showToast("Register cleared. All students marked ABSENT.");
  };

  // Lock / Unlock toggle
  const handleLockToggle = () => {
    if (!isLocked) {
      setIsLocked(true);
      showToast("Register LOCKED & SYNCED. SMS alerts dispatched to absentees.");
    } else {
      setIsLocked(false);
      showToast("Register UNLOCKED for faculty adjustments.");
    }
  };

  // Biometric Auto-Sync Simulation
  const handleBiometricSync = () => {
    setRoster((prev) =>
      prev.map((r) => {
        if (r.id === "r2" || r.id === "r4") {
          return { ...r, status: "A", smsAlert: true, remarks: "No biometric gate scan logged" };
        }
        if (r.id === "r3" || r.id === "r7") {
          return { ...r, status: "L", smsAlert: false };
        }
        return { ...r, status: "P", smsAlert: false };
      })
    );
    setIsBiometricSyncOpen(false);
    showToast("Biometric turnstile logs synced successfully: 58 Present, 4 Absent, 2 On Leave.");
  };

  // Filtered roster
  const filteredRoster = roster.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.guardian.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "all") return true;
    if (statusFilter === "P") return r.status === "P";
    if (statusFilter === "A") return r.status === "A";
    if (statusFilter === "L") return r.status === "L";
    if (statusFilter === "critical") return r.monthlyAvg < 75.0;

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Header Hero Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Attendance Register</h1>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  isLocked
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isLocked ? "bg-rose-500" : "bg-emerald-500 animate-pulse"}`} />
                {isLocked ? "Locked & Synced" : "Live Session Active"}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Real-time candidate census, biometric check-in sync, and automated statutory shortage tracking.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsBiometricSyncOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Fingerprint className="w-4 h-4 text-indigo-600" />
              <span>Biometric Sync</span>
            </button>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Export Sheet</span>
            </button>
            <button
              onClick={handleLockToggle}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl shadow-xs transition-all ${
                isLocked
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isLocked ? "Unlock Register" : "Lock & Dispatch"}</span>
            </button>
          </div>
        </div>

        {/* 4 Standard Redesigned KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Enrolled */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Enrolled
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                64 <span className="text-xs font-normal text-slate-500">Students</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Census Verified</span>
              </div>
            </div>
          </div>

          {/* Card 2: Present Today */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Present Today
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900">{simP}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {presentPct}%
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+3.2% vs 7-day average</span>
              </div>
            </div>
          </div>

          {/* Card 3: Unexcused Absent */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Unexcused Absentees
              </span>
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <UserX className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900">{simA}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                  {absentPct}%
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>2 students &lt;75% statutory bar</span>
              </div>
            </div>
          </div>

          {/* Card 4: Approved Medical / Duty */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Approved Medical / OD
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900">{simL}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  {leavePct}%
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Documents verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Session Ribbon */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Program Selector */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Program / Discipline
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
              >
                <option>B.Tech Computer Science & Eng.</option>
                <option>B.Tech Electronics & Comm.</option>
                <option>M.Tech Artificial Intelligence</option>
                <option>B.Sc Data Science</option>
              </select>
            </div>

            {/* Batch Selector */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Batch & Semester
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
              >
                <option>Batch 2023-27 [Sem 04]</option>
                <option>Batch 2022-26 [Sem 06]</option>
                <option>Batch 2024-28 [Sem 02]</option>
              </select>
            </div>

            {/* Section & Subject */}
            <div className="md:col-span-3">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Subject & Section
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all cursor-pointer"
              >
                <option>CS302 - Database Management Systems (Sec A)</option>
                <option>CS304 - Operating Systems (Sec B)</option>
                <option>CS308 - Computer Networks (Sec A)</option>
              </select>
            </div>

            {/* Lecture Date */}
            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Session Date
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setLectureDate("2025-03-23");
                      showToast("Date set to Yesterday (23 Mar 2025)");
                    }}
                    className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Yday
                  </button>
                  <button
                    onClick={() => {
                      setLectureDate("2025-03-24");
                      showToast("Date set to Today (24 Mar 2025)");
                    }}
                    className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                  >
                    Today
                  </button>
                </div>
              </div>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={lectureDate}
                  onChange={(e) => setLectureDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Quick Action Ribbon */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleMarkAllPresent}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark All Present</span>
              </button>
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <UserX className="w-3.5 h-3.5 text-rose-500" />
                <span>Clear All (Reset)</span>
              </button>
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Period 1 (09:00 - 10:15 AM)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={globalSmsToggle}
                  onChange={(e) => setGlobalSmsToggle(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span className="text-xs font-medium text-slate-700">
                  Auto-SMS absentees upon register lock
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Primary Split View: 8 Cols Live Ledger vs 4 Cols Intelligence Radar */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT 8-COLS: Live Roster Ledger */}
          <div className="xl:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Table Toolbar */}
              <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">Live Roster Ledger</h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                    {filteredRoster.length} of {roster.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  {/* Search bar */}
                  <div className="relative w-full sm:w-56">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Search roll, name, guardian..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Filter tabs */}
                  <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs">
                    <button
                      onClick={() => setStatusFilter("all")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        statusFilter === "all"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setStatusFilter("P")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        statusFilter === "P"
                          ? "bg-white text-emerald-700 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => setStatusFilter("A")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        statusFilter === "A"
                          ? "bg-white text-rose-700 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => setStatusFilter("critical")}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        statusFilter === "critical"
                          ? "bg-white text-rose-700 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      &lt;75% Risk
                    </button>
                  </div>
                </div>
              </div>

              {/* Ledger Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Roll No</th>
                      <th className="py-3 px-4">Student Details</th>
                      <th className="py-3 px-4 text-center">Monthly Avg</th>
                      <th className="py-3 px-4 text-center">Status Marking</th>
                      <th className="py-3 px-4">Remarks & Notes</th>
                      <th className="py-3 px-4 text-center">SMS Alert</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredRoster.map((candidate) => {
                      const isAtRisk = candidate.monthlyAvg < 75.0;
                      const isAbsent = candidate.status === "A";

                      return (
                        <tr
                          key={candidate.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isAbsent && isAtRisk ? "bg-rose-50/30" : ""
                          }`}
                        >
                          {/* Roll No */}
                          <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-900 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-md ${
                                isAtRisk ? "bg-rose-100 text-rose-800" : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {candidate.rollNo}
                            </span>
                          </td>

                          {/* Student Info */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {candidate.avatar ? (
                                <img
                                  src={candidate.avatar}
                                  alt={candidate.name}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
                                  {candidate.initials}
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                                  <span>{candidate.name}</span>
                                  {isAtRisk && (
                                    <span
                                      title="Critical attendance shortage below 75%"
                                      className="inline-flex items-center text-rose-600"
                                    >
                                      <AlertTriangle className="w-3.5 h-3.5" />
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-slate-500 flex items-center gap-2">
                                  <span>G: {candidate.guardian}</span>
                                  <span className="text-slate-300">•</span>
                                  <span className="font-mono text-[11px]">{candidate.guardianPhone}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Monthly Average */}
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-xs font-bold ${
                                isAtRisk
                                  ? "bg-rose-100 text-rose-700 border border-rose-200"
                                  : candidate.monthlyAvg >= 90
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}
                            >
                              {candidate.monthlyAvg.toFixed(1)}%
                            </span>
                          </td>

                          {/* Status Marking segmented toggle */}
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex rounded-xl p-0.5 bg-slate-100 border border-slate-200/80 shadow-xs">
                              {/* Present */}
                              <button
                                onClick={() => handleStatusChange(candidate.id, "P")}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                  candidate.status === "P"
                                    ? "bg-emerald-600 text-white shadow-xs"
                                    : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50"
                                }`}
                              >
                                P
                              </button>
                              {/* Absent */}
                              <button
                                onClick={() => handleStatusChange(candidate.id, "A")}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                  candidate.status === "A"
                                    ? "bg-rose-600 text-white shadow-xs"
                                    : "text-slate-600 hover:text-rose-700 hover:bg-slate-50"
                                }`}
                              >
                                A
                              </button>
                              {/* Leave */}
                              <button
                                onClick={() => handleStatusChange(candidate.id, "L")}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                  candidate.status === "L"
                                    ? "bg-amber-500 text-white shadow-xs"
                                    : "text-slate-600 hover:text-amber-700 hover:bg-slate-50"
                                }`}
                              >
                                L
                              </button>
                            </div>
                          </td>

                          {/* Remarks */}
                          <td className="py-3 px-4">
                            <input
                              type="text"
                              value={candidate.remarks}
                              onChange={(e) => handleRemarksChange(candidate.id, e.target.value)}
                              placeholder="Add remark or leave note..."
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white placeholder-slate-400 transition-all"
                            />
                          </td>

                          {/* SMS Alert */}
                          <td className="py-3 px-4 text-center">
                            <input
                              type="checkbox"
                              checked={candidate.smsAlert}
                              onChange={() => handleSmsToggle(candidate.id)}
                              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-3">
                  <span>Showing {filteredRoster.length} candidates in roster ledger</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-semibold">{simP} present in active session</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                    Previous
                  </button>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                    1
                  </span>
                  <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Institutional Compliance Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-900 text-sm">
                  Statutory Academic Audit Compliance
                </div>
                <p className="leading-relaxed">
                  Attendance logs are cryptographically sealed into the academic audit record upon register lock.
                  Parents of absentees receive real-time SMS alerts via Apex Cloud Gateway.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT 4-COLS: Shortage Radar, Heatmap & Analytics */}
          <div className="xl:col-span-4 space-y-4">
            {/* Shortage Radar Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Shortage Radar</h3>
                    <p className="text-[11px] text-slate-500">Statutory threshold &lt;75%</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  2 Flagged
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {/* Shortage Candidate 1 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Devina Mukherjee</div>
                      <div className="text-[11px] font-mono text-slate-500">APX-CS-002</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-rose-100 text-rose-800">
                      68.2%
                    </span>
                  </div>
                  <div className="text-[11px] text-rose-600 font-medium">
                    Needs +7 consecutive lectures to clear de-bar list.
                  </div>
                  <button
                    onClick={() => setDebarCandidate(INITIAL_ROSTER[1])}
                    className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Issue De-bar Notice</span>
                  </button>
                </div>

                {/* Shortage Candidate 2 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">Kiran Kumar</div>
                      <div className="text-[11px] font-mono text-slate-500">APX-CS-004</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-rose-100 text-rose-800">
                      71.5%
                    </span>
                  </div>
                  <div className="text-[11px] text-rose-600 font-medium">
                    Needs +3 consecutive lectures to clear de-bar list.
                  </div>
                  <button
                    onClick={() => setDebarCandidate(INITIAL_ROSTER[3])}
                    className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Issue De-bar Notice</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  showToast("Batch de-bar warning notices dispatched to 2 student emails and SMS.")
                }
                className="w-full mt-3 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-slate-500" />
                <span>Broadcast All Shortage Warnings</span>
              </button>
            </div>

            {/* 30-Day Batch Heatmap */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">30-Day Batch Heatmap</h3>
                    <p className="text-[11px] text-slate-500">Past 5 weeks density</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">Avg 89.4%</span>
              </div>

              {/* Heatmap Grid */}
              <div className="mt-4 space-y-2">
                <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-semibold text-slate-400">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {/* W1 */}
                  <div title="17 Feb: 94%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">94</div>
                  <div title="18 Feb: 92%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">92</div>
                  <div title="19 Feb: 90%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">90</div>
                  <div title="20 Feb: 86%" className="h-7 rounded-md bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">86</div>
                  <div title="21 Feb: 81%" className="h-7 rounded-md bg-emerald-400 text-white text-[10px] font-bold flex items-center justify-center">81</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">OFF</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">OFF</div>

                  {/* W2 */}
                  <div title="24 Feb: 95%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">95</div>
                  <div title="25 Feb: 91%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">91</div>
                  <div title="26 Feb: 73% (Rain)" className="h-7 rounded-md bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">73</div>
                  <div title="27 Feb: 88%" className="h-7 rounded-md bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">88</div>
                  <div title="28 Feb: 93%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">93</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">OFF</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">OFF</div>

                  {/* W3 */}
                  <div title="03 Mar: 96%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">96</div>
                  <div title="04 Mar: 92%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">92</div>
                  <div title="05 Mar: 90%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">90</div>
                  <div title="06 Mar: 94%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">94</div>
                  <div title="07 Mar: 85%" className="h-7 rounded-md bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">85</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">OFF</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">OFF</div>

                  {/* W4 */}
                  <div title="10 Mar: 93%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">93</div>
                  <div title="11 Mar: 90%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">90</div>
                  <div title="12 Mar: 84%" className="h-7 rounded-md bg-emerald-400 text-white text-[10px] font-bold flex items-center justify-center">84</div>
                  <div title="13 Mar: 91%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">91</div>
                  <div title="14 Mar: 89%" className="h-7 rounded-md bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">89</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">OFF</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">OFF</div>

                  {/* W5 (Current Active Week) */}
                  <div title="17 Mar: 94%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">94</div>
                  <div title="18 Mar: 92%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">92</div>
                  <div title="19 Mar: 91%" className="h-7 rounded-md bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">91</div>
                  <div title="20 Mar: 88%" className="h-7 rounded-md bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">88</div>
                  <div title="Today: Active" className="h-7 rounded-md bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">TODAY</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">--</div>
                  <div title="Weekend" className="h-7 rounded-md bg-slate-100 text-slate-400 text-[10px] font-medium flex items-center justify-center">--</div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" />
                    <span>&lt;75% Low</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" />
                    <span>80-89%</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
                    <span>90%+ High</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Faculty Biometric Stamp */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[11px] text-slate-500">
                <div className="font-semibold text-slate-800">Faculty Session Authenticated</div>
                <div>Dr. Margaret Vance (FAC-CS-001) • 08:58 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* De-bar Notice Modal */}
      {debarCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-rose-50/50">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-base">Official Exam De-bar Warning Notice</h3>
              </div>
              <button
                onClick={() => setDebarCandidate(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student:</span>
                  <span className="font-bold text-slate-900">{debarCandidate.name} ({debarCandidate.rollNo})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guardian:</span>
                  <span className="text-slate-900">{debarCandidate.guardian}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Guardian Phone:</span>
                  <span className="text-slate-900">{debarCandidate.guardianPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Cumulative:</span>
                  <span className="font-bold text-rose-600">{debarCandidate.monthlyAvg.toFixed(1)}% (Req: 75.0%)</span>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-3 bg-white space-y-2 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Notice under Institutional Academic Regulation §4.2:
                </p>
                <p>
                  This is formal notice that the candidate's aggregate lecture attendance has fallen below the
                  mandatory 75% threshold. Unless medical certificates or approved OD letters are submitted to the
                  Dean's office within 5 working days, candidate will be debarred from Mid-Semester Examinations.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    showToast(`Notice printed for ${debarCandidate.name}.`);
                    setDebarCandidate(null);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Notice</span>
                </button>
                <button
                  onClick={() => {
                    showToast(`SMS & Email dispatched to ${debarCandidate.guardian} (${debarCandidate.guardianPhone}).`);
                    setDebarCandidate(null);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch via SMS & Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Biometric Turnstile Sync Modal */}
      {isBiometricSyncOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Campus Biometric Sync</h3>
              </div>
              <button
                onClick={() => setIsBiometricSyncOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-600">
              <p>
                Connect to North Wing Turnstile Gate #3 and RFID facial recognition units for automatic attendance log import.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">Turnstile Controller Status:</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ONLINE
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">Matched Cohort Logs:</span>
                  <span className="font-mono font-bold text-slate-900">58 / 64 detected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">Unregistered / Missing:</span>
                  <span className="font-mono font-bold text-rose-600">4 candidates</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsBiometricSyncOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBiometricSync}
                  className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Sync 58 Scans to Register</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Sheet Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">Export Attendance Register</h3>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-600">
              <p>
                Download the official statutory attendance register for <strong>{selectedSubject}</strong>, period {selectedPeriod}.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    showToast("Exporting CS302_ATTENDANCE_REGISTER_MAR2025.xlsx...");
                    setIsExportModalOpen(false);
                  }}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-200 text-left transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-bold text-slate-900">Excel Ledger (.xlsx)</div>
                      <div className="text-[11px] text-slate-500">Includes day-by-day matric and formula cells</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => {
                    showToast("Generating official University Audit PDF report...");
                    setIsExportModalOpen(false);
                  }}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-200 text-left transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="font-bold text-slate-900">Statutory Audit Report (.pdf)</div>
                      <div className="text-[11px] text-slate-500">Signed with digital institutional stamp</div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsExportModalOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
