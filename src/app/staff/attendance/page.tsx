"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Users,
  Search,
  Filter,
  Download,
  Lock,
  Unlock,
  Send,
  X,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  UserX,
  UserCheck,
  FileText,
  AlertCircle,
  ChevronRight,
  Flame
} from "lucide-react";

interface StudentAttendanceRecord {
  id: string;
  roll: string;
  name: string;
  guardian: string;
  monthlyAvg: number;
  status: "P" | "A" | "L";
  remarks: string;
  smsQueued: boolean;
}

const initialStudents: StudentAttendanceRecord[] = [
  {
    id: "stu-1",
    roll: "APX-CS-001",
    name: "Arjun Sharma",
    guardian: "Rajesh Sharma",
    monthlyAvg: 92.4,
    status: "P",
    remarks: "Attended lab & theory",
    smsQueued: false
  },
  {
    id: "stu-2",
    roll: "APX-CS-015",
    name: "Priya Patel",
    guardian: "Vikram Patel",
    monthlyAvg: 94.2,
    status: "P",
    remarks: "",
    smsQueued: false
  },
  {
    id: "stu-3",
    roll: "APX-CS-042",
    name: "Rahul Sharma",
    guardian: "Dinesh Sharma",
    monthlyAvg: 88.4,
    status: "P",
    remarks: "Answering viva questions actively",
    smsQueued: false
  },
  {
    id: "stu-4",
    roll: "APX-CS-078",
    name: "Rohan Verma",
    guardian: "Suresh Verma",
    monthlyAvg: 71.5,
    status: "A",
    remarks: "Flagged: Critical Shortage (<75%)",
    smsQueued: true
  },
  {
    id: "stu-5",
    roll: "APX-CS-089",
    name: "Sneha Rao",
    guardian: "Venkat Rao",
    monthlyAvg: 96.0,
    status: "P",
    remarks: "",
    smsQueued: false
  },
  {
    id: "stu-6",
    roll: "APX-CS-104",
    name: "Vikram Malhotra",
    guardian: "Anil Malhotra",
    monthlyAvg: 68.2,
    status: "A",
    remarks: "Second unexcused consecutive absence",
    smsQueued: true
  },
  {
    id: "stu-7",
    roll: "APX-CS-112",
    name: "Ananya Deshmukh",
    guardian: "Prakash Deshmukh",
    monthlyAvg: 89.1,
    status: "L",
    remarks: "Medical certificate lodged (Flu)",
    smsQueued: false
  },
  {
    id: "stu-8",
    roll: "APX-CS-120",
    name: "Karan Johar Mehta",
    guardian: "Harish Mehta",
    monthlyAvg: 84.0,
    status: "P",
    remarks: "",
    smsQueued: false
  }
];

export default function StaffAttendancePage() {
  const [students, setStudents] = useState<StudentAttendanceRecord[]>(initialStudents);
  const [isLocked, setIsLocked] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "A" | "critical">("all");
  const [autoSmsToggle, setAutoSmsToggle] = useState(true);
  const [selectedDate, setSelectedDate] = useState("2025-03-12");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status Counts
  const counts = useMemo(() => {
    const present = students.filter((s) => s.status === "P").length;
    const absent = students.filter((s) => s.status === "A").length;
    const leave = students.filter((s) => s.status === "L").length;
    const total = students.length;
    return {
      total,
      present,
      absent,
      leave,
      presentPct: total > 0 ? ((present / total) * 100).toFixed(1) : "0",
      absentPct: total > 0 ? ((absent / total) * 100).toFixed(1) : "0",
      leavePct: total > 0 ? ((leave / total) * 100).toFixed(1) : "0"
    };
  }, [students]);

  // Handle individual status toggle
  const handleStatusChange = (id: string, status: "P" | "A" | "L") => {
    if (isLocked) {
      showToast("Cannot modify locked register. Request Unlock from Dean.");
      return;
    }
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status,
              smsQueued: status === "A" && autoSmsToggle
            }
          : s
      )
    );
  };

  // Handle remark edit
  const handleRemarkChange = (id: string, remarks: string) => {
    if (isLocked) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, remarks } : s))
    );
  };

  // Bulk actions
  const markAllPresent = () => {
    if (isLocked) return;
    setStudents((prev) =>
      prev.map((s) => ({ ...s, status: "P", smsQueued: false }))
    );
    showToast("All 64 candidates marked Present.");
  };

  const markAllAbsent = () => {
    if (isLocked) return;
    setStudents((prev) =>
      prev.map((s) => ({ ...s, status: "A", smsQueued: autoSmsToggle }))
    );
    showToast("Register reset. All marked Absent.");
  };

  const handleLockRegister = () => {
    setIsLocked(true);
    setIsLockModalOpen(false);
    showToast("Daily register locked & synced to Central Academic Ledger!");
  };

  // Filtered roster
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        searchQuery === "" ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.guardian.toLowerCase().includes(searchQuery.toLowerCase());

      if (statusFilter === "A") return matchesSearch && s.status === "A";
      if (statusFilter === "critical") return matchesSearch && s.monthlyAvg < 75;
      return matchesSearch;
    });
  }, [students, searchQuery, statusFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 rounded shadow-xl flex items-center gap-3 border border-secondary text-xs uppercase tracking-wider font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#047857]" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Command Telemetry Header */}
      <div className="w-full bg-surface-container-lowest p-6 border-b border-[#0D2545]/15 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-mono text-xs text-secondary uppercase tracking-wider">
              <span className="inline-block w-2 h-2 bg-secondary rounded-full"></span>
              <span>Register Module // Section A-CS</span>
              <span className="text-outline">/</span>
              <span>Session AY 2024-25</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary mt-1">
              Daily Attendance &amp; Register Control
            </h1>
          </div>

          {/* Quick Session Presets & Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 border border-[#cbd5e1] rounded-sm text-xs font-mono">
              <Clock className="h-4 w-4 text-secondary" />
              <span className="font-bold text-primary">09:00 - 10:15 AM</span>
              <span className="text-[10px] uppercase px-1.5 py-0.2 bg-secondary text-on-secondary ml-1 font-bold rounded-xs">
                Period 1
              </span>
            </div>

            <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 border border-[#cbd5e1] rounded-sm text-xs font-mono">
              <ShieldCheck className="h-4 w-4 text-outline" />
              <span className="text-outline uppercase text-[10px] font-bold">Status:</span>
              <span
                className={`font-bold uppercase ${
                  isLocked ? "text-[#047857]" : "text-secondary"
                }`}
              >
                {isLocked ? "Locked & Finalized" : "Draft / Unlocked"}
              </span>
            </div>

            {!isLocked ? (
              <button
                onClick={() => setIsLockModalOpen(true)}
                className="bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold tracking-wider px-4 py-2 shadow-sm transition-colors flex items-center gap-1.5 rounded-sm"
              >
                <Lock className="h-4 w-4 text-secondary-container" />
                <span>Submit &amp; Lock</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLocked(false);
                  showToast("Register unlocked for revisions.");
                }}
                className="bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider px-4 py-2 border border-[#cbd5e1] transition-colors flex items-center gap-1.5 rounded-sm"
              >
                <Unlock className="h-4 w-4 text-secondary" />
                <span>Unlock (Revision)</span>
              </button>
            )}
          </div>
        </div>

        {/* Architectural Filter Ribbon */}
        <div className="bg-surface-container-low p-4 border border-[#cbd5e1] rounded-sm grid grid-cols-1 md:grid-cols-12 gap-3 items-end text-xs font-mono">
          {/* Program Selector */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider text-outline font-bold">
              Program / Discipline
            </label>
            <select className="w-full bg-surface-container-lowest border border-[#cbd5e1] px-3 py-2 text-primary font-bold focus:outline-none rounded-xs">
              <option>B.Tech Computer Science &amp; Eng.</option>
              <option>B.Tech Electronics &amp; Comm.</option>
              <option>M.Tech Artificial Intelligence</option>
              <option>B.Sc Data Science</option>
            </select>
          </div>

          {/* Batch Selector */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider text-outline font-bold">
              Batch / Term
            </label>
            <select className="w-full bg-surface-container-lowest border border-[#cbd5e1] px-3 py-2 text-primary font-bold focus:outline-none rounded-xs">
              <option>Batch 2023-27 [Year 3]</option>
              <option>Batch 2022-26 [Year 4]</option>
              <option>Batch 2024-28 [Year 2]</option>
            </select>
          </div>

          {/* Section / Subject Selector */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider text-outline font-bold">
              Section &amp; Course Code
            </label>
            <select className="w-full bg-surface-container-lowest border border-[#cbd5e1] px-3 py-2 text-primary font-bold focus:outline-none rounded-xs">
              <option>Sec A (M) // CS302 Operating Sys.</option>
              <option>Sec B (E) // CS304 Database Sys.</option>
              <option>Sec A (M) // CS308 Computer Networks</option>
            </select>
          </div>

          {/* Date with Quick Select */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-wider text-outline font-bold">
                Lecture Date
              </label>
              <div className="flex items-center gap-1 text-[10px] uppercase">
                <button
                  onClick={() => setSelectedDate("2025-03-11")}
                  className="px-2 py-0.5 bg-surface-container hover:bg-surface-container-high text-primary border border-[#cbd5e1] rounded-xs"
                >
                  Yday
                </button>
                <button
                  onClick={() => setSelectedDate("2025-03-12")}
                  className="px-2 py-0.5 bg-primary text-on-primary font-bold rounded-xs"
                >
                  Today
                </button>
              </div>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-surface-container-lowest border border-[#cbd5e1] px-3 py-1.5 text-primary font-bold focus:outline-none rounded-xs"
            />
          </div>
        </div>

        {/* Quick Action Toolstrip */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={markAllPresent}
              disabled={isLocked}
              className="bg-primary text-on-primary font-mono text-xs uppercase font-bold tracking-wider px-3.5 py-1.5 shadow-xs hover:bg-primary-container disabled:opacity-50 transition-colors flex items-center gap-1.5 rounded-xs"
            >
              <UserCheck className="h-4 w-4" />
              <span>Mark All Present</span>
            </button>
            <button
              onClick={markAllAbsent}
              disabled={isLocked}
              className="bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider px-3.5 py-1.5 border border-[#cbd5e1] disabled:opacity-50 transition-colors flex items-center gap-1.5 rounded-xs"
            >
              <UserX className="h-4 w-4" />
              <span>Clear All / Reset</span>
            </button>
            <button
              onClick={() => showToast("Exporting monthly attendance ledger (Excel)...")}
              className="bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider px-3.5 py-1.5 border border-[#cbd5e1] transition-colors flex items-center gap-1.5 rounded-xs"
            >
              <FileSpreadsheet className="h-4 w-4 text-secondary" />
              <span>Export Monthly Excel</span>
            </button>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-on-surface-variant">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoSmsToggle}
                onChange={(e) => setAutoSmsToggle(e.target.checked)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <span className="text-[11px] uppercase font-bold text-primary">
                Auto-Notify Absentees via SMS
              </span>
            </label>
            <span className="text-outline">|</span>
            <span className="text-[11px] text-outline flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" /> Autosaved 14s ago
            </span>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metrics Cards */}
      <div className="px-6 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-l-primary rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
              Total Enrolled Registry
            </span>
            <Users className="h-4 w-4 text-secondary" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-primary font-mono leading-none">
              64 <span className="text-xs text-outline font-normal">Candidates</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-[#047857] font-semibold mt-1">
              <CheckCircle2 className="h-3 w-3" /> 100% Census Verified
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-l-[#047857] rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
              Present in Session
            </span>
            <UserCheck className="h-4 w-4 text-[#047857]" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#047857] font-mono leading-none">
                {counts.present}
              </span>
              <span className="text-xs font-mono font-bold text-[#047857] bg-[#ecfdf5] px-1.5 py-0.5 border border-[#a7f3d0] rounded-xs">
                {counts.presentPct}%
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-[#047857] font-semibold mt-1">
              <TrendingUp className="h-3 w-3" /> +3.2% vs 7-day average
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-l-error rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
              Unexcused Absentees
            </span>
            <UserX className="h-4 w-4 text-error" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-error font-mono leading-none">
                {counts.absent}
              </span>
              <span className="text-xs font-mono font-bold text-error bg-[#fef2f2] px-1.5 py-0.5 border border-[#fecaca] rounded-xs">
                {counts.absentPct}%
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono uppercase text-error font-semibold mt-1">
              <AlertTriangle className="h-3 w-3" /> 2 flagged under 75% bar
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-l-secondary rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
              Approved Medical / Duty
            </span>
            <FileText className="h-4 w-4 text-secondary" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary font-mono leading-none">
                {counts.leave}
              </span>
              <span className="text-xs font-mono font-bold text-primary bg-surface-container px-1.5 py-0.5 border border-[#cbd5e1] rounded-xs">
                {counts.leavePct}%
              </span>
            </div>
            <div className="text-[11px] font-mono text-outline mt-1">
              Doc. Verifications attached
            </div>
          </div>
        </div>
      </div>

      {/* Primary Split Grid: Live Register (8 Cols) vs Intelligence (4 Cols) */}
      <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Live Roster Ledger (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm flex flex-wrap items-center justify-between gap-3 rounded-sm">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold uppercase text-primary">
                Roster Ledger // Section A
              </h2>
              <span className="px-2 py-0.5 bg-surface-container text-primary font-mono text-xs font-bold rounded-xs border border-[#cbd5e1]">
                CS302: Operating Systems
              </span>
            </div>

            {/* Filter & Search */}
            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-56 bg-surface-container-low border border-[#cbd5e1] flex items-center rounded-xs">
                <Search className="h-3.5 w-3.5 text-outline absolute left-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter student or APX-ID..."
                  className="w-full bg-transparent pl-7 pr-2 py-1 font-mono text-xs text-on-surface focus:outline-none"
                />
              </div>

              <div className="flex items-center bg-surface-container p-0.5 border border-[#cbd5e1] rounded-xs font-mono text-xs uppercase">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-2 py-0.5 font-bold rounded-xs transition-colors ${
                    statusFilter === "all"
                      ? "bg-primary text-on-primary"
                      : "text-on-surface hover:text-primary"
                  }`}
                >
                  All ({students.length})
                </button>
                <button
                  onClick={() => setStatusFilter("A")}
                  className={`px-2 py-0.5 font-bold rounded-xs transition-colors ${
                    statusFilter === "A"
                      ? "bg-error text-on-error"
                      : "text-on-surface hover:text-primary"
                  }`}
                >
                  Absentees
                </button>
                <button
                  onClick={() => setStatusFilter("critical")}
                  className={`px-2 py-0.5 font-bold rounded-xs transition-colors ${
                    statusFilter === "critical"
                      ? "bg-secondary text-on-secondary"
                      : "text-on-surface hover:text-primary"
                  }`}
                >
                  &lt;75% Risk
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container font-mono text-[10px] text-primary uppercase border-b border-[#cbd5e1]">
                  <tr>
                    <th className="py-2.5 px-3 w-28">Roll No.</th>
                    <th className="py-2.5 px-3">Candidate Name</th>
                    <th className="py-2.5 px-3 text-center w-24">Monthly Avg</th>
                    <th className="py-2.5 px-3 text-center w-44">Status Marking</th>
                    <th className="py-2.5 px-3">Remarks / Notes</th>
                    <th className="py-2.5 px-3 text-center w-16">SMS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cbd5e1]">
                  {filteredStudents.map((stu) => (
                    <tr
                      key={stu.id}
                      className={`hover:bg-surface-container-low transition-colors ${
                        stu.status === "A" ? "bg-[#fef2f2]/40" : ""
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-primary">{stu.roll}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-primary">{stu.name}</span>
                          <span className="text-[10px] text-outline font-mono">
                            G: {stu.guardian}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`font-mono font-bold ${
                            stu.monthlyAvg >= 75 ? "text-[#047857]" : "text-error"
                          }`}
                        >
                          {stu.monthlyAvg}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="inline-flex border border-[#cbd5e1] bg-surface-container p-0.5 rounded-xs font-mono text-xs font-bold">
                          <button
                            onClick={() => handleStatusChange(stu.id, "P")}
                            className={`px-2.5 py-0.5 rounded-xs transition-colors ${
                              stu.status === "P"
                                ? "bg-primary text-on-primary"
                                : "text-on-surface hover:bg-surface-container-high"
                            }`}
                          >
                            P
                          </button>
                          <button
                            onClick={() => handleStatusChange(stu.id, "A")}
                            className={`px-2.5 py-0.5 rounded-xs transition-colors ${
                              stu.status === "A"
                                ? "bg-error text-on-error"
                                : "text-on-surface hover:bg-surface-container-high"
                            }`}
                          >
                            A
                          </button>
                          <button
                            onClick={() => handleStatusChange(stu.id, "L")}
                            className={`px-2.5 py-0.5 rounded-xs transition-colors ${
                              stu.status === "L"
                                ? "bg-secondary text-on-secondary"
                                : "text-on-surface hover:bg-surface-container-high"
                            }`}
                          >
                            L
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <input
                          type="text"
                          value={stu.remarks}
                          disabled={isLocked}
                          onChange={(e) => handleRemarkChange(stu.id, e.target.value)}
                          placeholder="Add note..."
                          className="w-full bg-transparent border-b border-transparent hover:border-[#cbd5e1] focus:border-primary text-xs font-mono text-on-surface focus:outline-none"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {stu.smsQueued ? (
                          <span
                            title="SMS Dispatch Queued"
                            className="inline-block p-1 bg-[#fef2f2] text-error rounded-xs border border-[#fecaca]"
                          >
                            <Send className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="text-outline text-[10px] font-mono">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Shortage Radar & Heatmap (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Shortage Radar Card */}
          <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm p-5 rounded-sm flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#0D2545]/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-error" />
                <h3 className="text-xs font-bold uppercase font-mono text-primary">
                  Shortage Radar (&lt; 75% Risk)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-error font-bold uppercase">
                2 Defaulters
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                {
                  roll: "APX-CS-078",
                  name: "Rohan Verma",
                  att: 71.5,
                  needed: "3 sessions needed to reach 75%"
                },
                {
                  roll: "APX-CS-104",
                  name: "Vikram Malhotra",
                  att: 68.2,
                  needed: "5 sessions needed to reach 75%"
                }
              ].map((defaulter, dIdx) => (
                <div
                  key={dIdx}
                  className="p-3 bg-[#fef2f2] border border-[#fecaca] rounded-sm flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-error">
                      {defaulter.roll}
                    </span>
                    <span className="font-mono text-xs font-bold text-error">
                      {defaulter.att}%
                    </span>
                  </div>
                  <div className="text-xs font-bold text-primary">{defaulter.name}</div>
                  <div className="text-[10px] font-mono text-on-surface-variant">
                    {defaulter.needed}
                  </div>
                  <div className="pt-1 flex items-center justify-between border-t border-[#fecaca]">
                    <button
                      onClick={() =>
                        showToast(`Guardian advisory SMS dispatched to ${defaulter.name}'s parent.`)
                      }
                      className="text-[10px] font-mono text-error font-bold hover:underline flex items-center gap-1 uppercase"
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>Send Advisory SMS</span>
                    </button>
                    <Link
                      href={`/staff/students?roll=${defaulter.roll}`}
                      className="text-[10px] font-mono text-secondary font-bold hover:underline"
                    >
                      Dossier &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 30-Day Heatmap Card */}
          <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm p-5 rounded-sm flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#0D2545]/10">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-secondary" />
                <h3 className="text-xs font-bold uppercase font-mono text-primary">
                  30-Day Batch Heatmap
                </h3>
              </div>
              <span className="text-[10px] font-mono text-outline">March 2025</span>
            </div>

            {/* Matrix Simulation */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-mono">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, dIdx) => (
                <span key={dIdx} className="font-bold text-outline">
                  {d}
                </span>
              ))}
              {Array.from({ length: 28 }).map((_, idx) => {
                const day = idx + 1;
                // Realistic mock rates
                const rate = idx % 7 === 5 || idx % 7 === 6 ? 0 : 85 + (idx % 12);
                const isWeekend = idx % 7 === 5 || idx % 7 === 6;

                let bg = "bg-surface-container text-outline";
                if (!isWeekend) {
                  if (rate >= 92) bg = "bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-bold";
                  else if (rate >= 80) bg = "bg-primary-container text-primary font-bold";
                  else bg = "bg-[#fef2f2] text-error font-bold";
                }

                return (
                  <div
                    key={idx}
                    title={isWeekend ? "Holiday" : `Day ${day}: ${rate}% attendance`}
                    className={`h-7 flex items-center justify-center rounded-xs ${bg}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#cbd5e1] flex items-center justify-between text-[10px] font-mono text-outline">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#ecfdf5] border border-[#a7f3d0]"></span> &gt;90%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-primary-container"></span> 80–90%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-xs bg-[#fef2f2] border border-[#fecaca]"></span> &lt;80%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lock Register Confirmation Modal */}
      {isLockModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-md border-2 border-primary shadow-[4px_4px_0_0_#0d2545] p-6 relative rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#cbd5e1]">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">
                  Lock Daily Attendance Register
                </h3>
              </div>
              <button
                onClick={() => setIsLockModalOpen(false)}
                className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 text-xs font-mono flex flex-col gap-3">
              <p className="text-on-surface leading-relaxed">
                You are submitting attendance for <strong>CS302: Operating Systems (Sec A)</strong> on <strong>{selectedDate}</strong>.
              </p>
              <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm space-y-1">
                <div>Present: <strong className="text-[#047857]">{counts.present} students</strong></div>
                <div>Absent: <strong className="text-error">{counts.absent} students</strong></div>
                <div>Medical / Leave: <strong className="text-primary">{counts.leave} students</strong></div>
              </div>
              <div className="p-2.5 bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-[11px] rounded-sm">
                Once locked, a cryptographic hash is committed to the institutional attendance ledger. Absentees with SMS enabled will receive instant parental notices.
              </div>
            </div>

            <div className="pt-3 border-t border-[#cbd5e1] flex justify-end gap-2">
              <button
                onClick={() => setIsLockModalOpen(false)}
                className="px-4 py-1.5 bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleLockRegister}
                className="px-4 py-1.5 bg-primary text-on-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-primary-container transition-colors rounded-sm"
              >
                Confirm &amp; Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
