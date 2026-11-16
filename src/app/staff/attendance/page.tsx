"use client";

import { useState, useMemo, useEffect } from "react";
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
  Flame,
  Radio,
  RefreshCw,
  Sparkles,
  MapPin,
  Check
} from "lucide-react";

interface StudentAttendanceRecord {
  id: string;
  roll: string;
  name: string;
  batchCode: string;
  guardian: string;
  guardianPhone: string;
  monthlyAvg: number;
  status: "P" | "A" | "L";
  remarks: string;
  smsQueued: boolean;
  rfidVerified: boolean;
}

interface BatchConfig {
  id: string;
  code: string;
  name: string;
  degree: string;
  subject: string;
  schedule: string;
  venue: string;
  period: string;
  totalStudents: number;
}

const facultyBatches: Record<string, BatchConfig> = {
  "CS-401": {
    id: "CS-401",
    code: "CS-401",
    name: "B.Tech CS-IV-A",
    degree: "B.Tech CSE - 4th Sem (Sec A)",
    subject: "Database Management Systems",
    schedule: "Mon, Wed, Fri • 09:00 - 10:00 AM",
    venue: "Lecture Hall 302 (North Wing)",
    period: "Period 1 (09:00 AM)",
    totalStudents: 62
  },
  "CS-405L": {
    id: "CS-405L",
    code: "CS-405L",
    name: "B.Tech CS-IV-B",
    degree: "B.Tech CSE - 4th Sem (Sec B)",
    subject: "Database Systems Practicum Lab",
    schedule: "Tue, Thu • 03:30 - 05:00 PM",
    venue: "Turing Computing Lab 3",
    period: "Lab Session (03:30 PM)",
    totalStudents: 60
  },
  "CS-602": {
    id: "CS-602",
    code: "CS-602",
    name: "M.Tech DS-II",
    degree: "M.Tech Data Systems - Term II",
    subject: "Advanced Distributed Database Architecture",
    schedule: "Mon, Thu • 11:00 AM - 12:30 PM",
    venue: "Room 204 (PG Research Block)",
    period: "Period 2 (11:00 AM)",
    totalStudents: 28
  },
  "CS-202": {
    id: "CS-202",
    code: "CS-202",
    name: "BCA-II-B",
    degree: "BCA - 2nd Sem (Sec B)",
    subject: "Data Structures & Algorithms Foundation",
    schedule: "Wed, Thu, Fri • 02:00 - 03:00 PM",
    venue: "Seminar Hall B (Main Block)",
    period: "Period 4 (02:00 PM)",
    totalStudents: 34
  }
};

const initialBatchStudents: Record<string, StudentAttendanceRecord[]> = {
  "CS-401": [
    { id: "stu-1", roll: "SIT-2023-CS-042", name: "Rahul Sharma", batchCode: "CS-401", guardian: "Rajesh Sharma", guardianPhone: "+91 98111 22335", monthlyAvg: 88.4, status: "P", remarks: "Active discussion in Unit 4", smsQueued: false, rfidVerified: true },
    { id: "stu-2", roll: "SIT-2023-CS-015", name: "Priya Patel", batchCode: "CS-401", guardian: "Vikram Patel", guardianPhone: "+91 98222 33446", monthlyAvg: 94.2, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-3", roll: "SIT-2023-CS-078", name: "Rohan Verma", batchCode: "CS-401", guardian: "Suresh Verma", guardianPhone: "+91 97333 44557", monthlyAvg: 71.5, status: "A", remarks: "Flagged: Critical Shortage (<75%)", smsQueued: true, rfidVerified: false },
    { id: "stu-4", roll: "SIT-2023-CS-089", name: "Sneha Rao", batchCode: "CS-401", guardian: "Venkat Rao", guardianPhone: "+91 96444 55668", monthlyAvg: 96.0, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-5", roll: "SIT-2023-CS-001", name: "Aarav Sharma", batchCode: "CS-401", guardian: "Manish Sharma", guardianPhone: "+91 98333 11224", monthlyAvg: 92.5, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-6", roll: "SIT-2023-CS-028", name: "Ananya Iyer", batchCode: "CS-401", guardian: "R. Iyer", guardianPhone: "+91 98444 22335", monthlyAvg: 89.0, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-7", roll: "SIT-2023-CS-035", name: "Devansh Patel", batchCode: "CS-401", guardian: "D. Patel", guardianPhone: "+91 98555 33446", monthlyAvg: 87.5, status: "L", remarks: "Medical certificate lodged (Fever)", smsQueued: false, rfidVerified: false },
    { id: "stu-8", roll: "SIT-2023-CS-051", name: "Karan Johar Mehta", batchCode: "CS-401", guardian: "Harish Mehta", guardianPhone: "+91 98666 44557", monthlyAvg: 84.0, status: "P", remarks: "", smsQueued: false, rfidVerified: true }
  ],
  "CS-405L": [
    { id: "stu-9", roll: "SIT-2023-CS-104", name: "Vikram Malhotra", batchCode: "CS-405L", guardian: "Anil Malhotra", guardianPhone: "+91 95555 66779", monthlyAvg: 68.2, status: "A", remarks: "Second consecutive lab absence", smsQueued: true, rfidVerified: false },
    { id: "stu-10", roll: "SIT-2023-CS-082", name: "Kunal Singhania", batchCode: "CS-405L", guardian: "Rajeev Singhania", guardianPhone: "+91 95666 77890", monthlyAvg: 93.0, status: "P", remarks: "Lab task completed", smsQueued: false, rfidVerified: true },
    { id: "stu-11", roll: "SIT-2023-CS-095", name: "Meera Nair", batchCode: "CS-405L", guardian: "G. Nair", guardianPhone: "+91 95777 88991", monthlyAvg: 89.2, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-12", roll: "SIT-2023-CS-103", name: "Tanmay Deshmukh", batchCode: "CS-405L", guardian: "S. Deshmukh", guardianPhone: "+91 95888 99002", monthlyAvg: 72.5, status: "A", remarks: "Hardware terminal review needed", smsQueued: true, rfidVerified: false },
    { id: "stu-13", roll: "SIT-2023-CS-112", name: "Pooja Hegde", batchCode: "CS-405L", guardian: "P. Hegde", guardianPhone: "+91 95999 00113", monthlyAvg: 95.0, status: "P", remarks: "Benchmark query executed", smsQueued: false, rfidVerified: true }
  ],
  "CS-602": [
    { id: "stu-14", roll: "SIT-2024-DS-004", name: "Gaurav Sen", batchCode: "CS-602", guardian: "A. Sen", guardianPhone: "+91 94111 22335", monthlyAvg: 98.0, status: "P", remarks: "Lead discussion on Raft log replication", smsQueued: false, rfidVerified: true },
    { id: "stu-15", roll: "SIT-2024-DS-011", name: "Ritika Chawla", batchCode: "CS-602", guardian: "M. Chawla", guardianPhone: "+91 94222 33446", monthlyAvg: 96.0, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-16", roll: "SIT-2024-DS-012", name: "Kavita Krishnamurthy", batchCode: "CS-602", guardian: "S. Krishnamurthy", guardianPhone: "+91 94666 77890", monthlyAvg: 95.5, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-17", roll: "SIT-2024-DS-019", name: "Aditya Bhatt", batchCode: "CS-602", guardian: "K. Bhatt", guardianPhone: "+91 94333 44557", monthlyAvg: 92.5, status: "P", remarks: "", smsQueued: false, rfidVerified: true }
  ],
  "CS-202": [
    { id: "stu-18", roll: "SIT-2024-BCA-008", name: "Aman Deep Singh", batchCode: "CS-202", guardian: "Gurdeep Singh", guardianPhone: "+91 93777 88991", monthlyAvg: 84.6, status: "P", remarks: "Present in front row", smsQueued: false, rfidVerified: true },
    { id: "stu-19", roll: "SIT-2024-BCA-005", name: "Kavya Menon", batchCode: "CS-202", guardian: "P. Menon", guardianPhone: "+91 93111 22335", monthlyAvg: 88.0, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-20", roll: "SIT-2024-BCA-012", name: "Nikhil Gupta", batchCode: "CS-202", guardian: "R. Gupta", guardianPhone: "+91 93222 33446", monthlyAvg: 85.5, status: "P", remarks: "", smsQueued: false, rfidVerified: true },
    { id: "stu-21", roll: "SIT-2024-BCA-027", name: "Varun Chopra", batchCode: "CS-202", guardian: "K. Chopra", guardianPhone: "+91 93333 44557", monthlyAvg: 69.5, status: "A", remarks: "Absent without notification", smsQueued: true, rfidVerified: false },
    { id: "stu-22", roll: "SIT-2024-BCA-033", name: "Zaid Khan", batchCode: "CS-202", guardian: "A. Khan", guardianPhone: "+91 93444 55668", monthlyAvg: 89.0, status: "P", remarks: "", smsQueued: false, rfidVerified: true }
  ]
};

export default function StaffAttendancePage() {
  const [selectedBatchCode, setSelectedBatchCode] = useState<string>("CS-401");
  const [studentsData, setStudentsData] = useState<Record<string, StudentAttendanceRecord[]>>(initialBatchStudents);
  const [isLocked, setIsLocked] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "P" | "A" | "L" | "critical">("all");
  const [autoSmsToggle, setAutoSmsToggle] = useState(true);
  const [selectedDate, setSelectedDate] = useState("2025-05-21");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync batch from URL query parameter (?batch=CS401, ?batch=CS-405L, etc.)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const bParam = params.get("batch");
      if (bParam) {
        const bp = bParam.toUpperCase();
        if (bp.includes("401")) setSelectedBatchCode("CS-401");
        else if (bp.includes("405")) setSelectedBatchCode("CS-405L");
        else if (bp.includes("602")) setSelectedBatchCode("CS-602");
        else if (bp.includes("202")) setSelectedBatchCode("CS-202");
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeBatch = facultyBatches[selectedBatchCode] || facultyBatches["CS-401"];
  const currentStudents = studentsData[selectedBatchCode] || [];

  // Status Counts
  const counts = useMemo(() => {
    const present = currentStudents.filter((s) => s.status === "P").length;
    const absent = currentStudents.filter((s) => s.status === "A").length;
    const leave = currentStudents.filter((s) => s.status === "L").length;
    const total = currentStudents.length;
    return {
      total,
      present,
      absent,
      leave,
      presentPct: total > 0 ? ((present / total) * 100).toFixed(1) : "0",
      absentPct: total > 0 ? ((absent / total) * 100).toFixed(1) : "0",
      leavePct: total > 0 ? ((leave / total) * 100).toFixed(1) : "0"
    };
  }, [currentStudents]);

  // Handle individual status toggle
  const handleStatusChange = (id: string, status: "P" | "A" | "L") => {
    if (isLocked) {
      showToast("Cannot modify locked register. Request unlock from Dean or Registrar.");
      return;
    }
    setStudentsData((prev) => ({
      ...prev,
      [selectedBatchCode]: prev[selectedBatchCode].map((s) =>
        s.id === id
          ? {
              ...s,
              status,
              smsQueued: status === "A" && autoSmsToggle
            }
          : s
      )
    }));
  };

  // Handle remark edit
  const handleRemarkChange = (id: string, remarks: string) => {
    if (isLocked) return;
    setStudentsData((prev) => ({
      ...prev,
      [selectedBatchCode]: prev[selectedBatchCode].map((s) =>
        s.id === id ? { ...s, remarks } : s
      )
    }));
  };

  // Bulk actions
  const markAllPresent = () => {
    if (isLocked) return;
    setStudentsData((prev) => ({
      ...prev,
      [selectedBatchCode]: prev[selectedBatchCode].map((s) => ({
        ...s,
        status: "P",
        smsQueued: false
      }))
    }));
    showToast(`All ${currentStudents.length} candidates in ${selectedBatchCode} marked Present.`);
  };

  const markAllAbsent = () => {
    if (isLocked) return;
    setStudentsData((prev) => ({
      ...prev,
      [selectedBatchCode]: prev[selectedBatchCode].map((s) => ({
        ...s,
        status: "A",
        smsQueued: autoSmsToggle
      }))
    }));
    showToast(`Register reset. All ${currentStudents.length} candidates marked Absent.`);
  };

  const syncRFIDTurnstile = () => {
    if (isLocked) return;
    showToast("RFID biometric gate logs fetched! 6 candidates auto-verified.");
  };

  const handleLockRegister = () => {
    setIsLocked(true);
    setIsLockModalOpen(false);
    showToast(`Daily register for ${selectedBatchCode} locked & committed to central academic ledger!`);
  };

  // Filtered roster
  const filteredStudents = useMemo(() => {
    return currentStudents.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.roll.toLowerCase().includes(q) ||
        s.guardian.toLowerCase().includes(q);

      if (statusFilter === "P") return matchesSearch && s.status === "P";
      if (statusFilter === "A") return matchesSearch && s.status === "A";
      if (statusFilter === "L") return matchesSearch && s.status === "L";
      if (statusFilter === "critical") return matchesSearch && s.monthlyAvg < 75;
      return matchesSearch;
    });
  }, [currentStudents, searchQuery, statusFilter]);

  // Defaulters (<75%)
  const defaulters = currentStudents.filter((s) => s.monthlyAvg < 75);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Daily Attendance Register &bull; Even Semester 2024–25
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#3D405B] tracking-tight">
              Daily Attendance &amp; Classroom Register
            </h1>
          </div>

          {/* Header Action Buttons & Lock Status */}
          <div className="flex items-center flex-wrap gap-2.5 shrink-0">
            <div className="inline-flex items-center gap-2 bg-slate-50 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-slate-500" />
              <span className="text-slate-400 uppercase text-[10px] tracking-wider">Status:</span>
              <span
                className={`font-bold ${
                  isLocked ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {isLocked ? "Locked & Finalized" : "Draft / Unlocked"}
              </span>
            </div>

            {!isLocked ? (
              <button
                onClick={() => setIsLockModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                <span>Submit &amp; Lock Register</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLocked(false);
                  showToast("Register unlocked for revision edits.");
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200"
              >
                <Unlock className="h-4 w-4 text-slate-600" />
                <span>Unlock for Revision</span>
              </button>
            )}

            <button
              onClick={() => showToast("Exporting monthly attendance sheet (Excel)...")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              <FileSpreadsheet className="h-4 w-4 text-slate-600" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cohort Selector & Session Parameter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end text-xs">
        {/* Batch / Cohort Dropdown */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Assigned Teaching Batch
          </label>
          <select
            value={selectedBatchCode}
            onChange={(e) => setSelectedBatchCode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-slate-800 font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
          >
            {Object.values(facultyBatches).map((b) => (
              <option key={b.code} value={b.code}>
                {b.code}: {b.subject} ({b.name})
              </option>
            ))}
          </select>
        </div>

        {/* Schedule & Venue Meta */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Lecture Slot &amp; Assigned Venue
          </label>
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">{activeBatch.period}</div>
              <div className="text-[11px] text-slate-400">{activeBatch.venue}</div>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-50 text-[#355C7D] rounded-md">
              {activeBatch.totalStudents} Enrolled
            </span>
          </div>
        </div>

        {/* Lecture Date Picker */}
        <div className="md:col-span-4 space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Lecture Date
            </label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedDate("2025-05-20")}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-bold"
              >
                Yesterday
              </button>
              <button
                onClick={() => setSelectedDate("2025-05-21")}
                className="px-2 py-0.5 bg-[#355C7D] text-white rounded text-[10px] font-bold"
              >
                Today
              </button>
            </div>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 text-slate-800 font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
          />
        </div>
      </div>

      {/* Quick Toolstrip (Bulk Mark, RFID, Auto SMS) */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={markAllPresent}
            disabled={isLocked}
            className="px-3.5 py-2 bg-[#355C7D] text-white font-semibold rounded-xl hover:bg-[#2b4c68] disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <UserCheck className="h-4 w-4" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={markAllAbsent}
            disabled={isLocked}
            className="px-3.5 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 border border-slate-200 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <UserX className="h-4 w-4 text-slate-500" />
            <span>Reset All to Absent</span>
          </button>
          <button
            onClick={syncRFIDTurnstile}
            disabled={isLocked}
            className="px-3.5 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-xl hover:bg-emerald-100 border border-emerald-200/80 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sync RFID Gate Logs</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoSmsToggle}
              onChange={(e) => setAutoSmsToggle(e.target.checked)}
              className="w-4 h-4 accent-[#355C7D] rounded cursor-pointer"
            />
            <span className="text-xs font-semibold text-slate-700">
              Auto-Notify Absentees via SMS
            </span>
          </label>
          <span className="text-slate-300">|</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Autosaved live
          </span>
        </div>
      </div>

      {/* 4 Telemetry Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Candidates */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Roster Candidates
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">
              {counts.total} <span className="text-sm font-normal text-slate-400">Students</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">{activeBatch.degree}</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Cohort Code</span>
            <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded-md">
              {activeBatch.code}
            </span>
          </div>
        </div>

        {/* Card 2: Present in Session */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Present in Session
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-600">{counts.present}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                {counts.presentPct}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Attending today&apos;s period</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Session Pacing</span>
            <span className="text-emerald-600 font-semibold text-[11px]">+2.4% vs 7-day avg</span>
          </div>
        </div>

        {/* Card 3: Unexcused Absentees */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Unexcused Absentees
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <UserX className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-rose-600">{counts.absent}</span>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">
                {counts.absentPct}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Parental SMS queued on submit</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Shortage Impact</span>
            <span className="text-rose-600 font-semibold text-[11px]">
              {defaulters.length} flagged &lt;75%
            </span>
          </div>
        </div>

        {/* Card 4: Approved Medical / Duty */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Approved Leave / Medical
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-600">{counts.leave}</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                {counts.leavePct}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Lodged with Dean Academics</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Documentation</span>
            <span className="text-amber-700 font-semibold text-[11px]">Excused from penalty</span>
          </div>
        </div>
      </div>

      {/* Main Split Grid: Live Roster (8 Cols) vs Shortage Radar & Heatmap (4 Cols) */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Live Roster Ledger (8 Cols) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Table Header & Controls */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#3D405B]">
                  Live Attendance Ledger &bull; {activeBatch.code}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeBatch.subject} ({activeBatch.name}) &bull; Date: {selectedDate}
                </p>
              </div>

              {/* Filter & Search */}
              <div className="flex items-center gap-2">
                <div className="relative w-44 sm:w-52">
                  <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name, roll..."
                    className="w-full bg-slate-50 border border-slate-200 pl-8 pr-2 py-1.5 text-xs text-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#355C7D]"
                  />
                </div>

                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                  <button
                    onClick={() => setStatusFilter("all")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      statusFilter === "all"
                        ? "bg-white text-[#355C7D] shadow-2xs font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    All ({currentStudents.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter("A")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      statusFilter === "A"
                        ? "bg-rose-50 text-rose-700 font-bold shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Absentees ({counts.absent})
                  </button>
                  <button
                    onClick={() => setStatusFilter("critical")}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      statusFilter === "critical"
                        ? "bg-amber-50 text-amber-700 font-bold shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    &lt;75% Risk ({defaulters.length})
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50/90 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 w-32">Roll Number</th>
                    <th className="py-3 px-4">Candidate Name</th>
                    <th className="py-3 px-3 text-center w-28">Monthly Avg</th>
                    <th className="py-3 px-4 text-center w-48">Status Marking</th>
                    <th className="py-3 px-4">Session Remarks</th>
                    <th className="py-3 px-3 text-center w-16">SMS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredStudents.map((stu) => (
                    <tr
                      key={stu.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        stu.status === "A" ? "bg-rose-50/30" : ""
                      }`}
                    >
                      {/* Roll Number */}
                      <td className="py-3 px-4 font-mono font-bold text-xs text-slate-800">
                        {stu.roll}
                      </td>

                      {/* Name & Guardian */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-[#3D405B]">{stu.name}</span>
                          <span className="text-[11px] text-slate-400">
                            Guardian: {stu.guardian}
                          </span>
                        </div>
                      </td>

                      {/* Monthly Avg */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`font-mono font-bold text-xs ${
                            stu.monthlyAvg >= 75 ? "text-emerald-600" : "text-rose-600"
                          }`}
                        >
                          {stu.monthlyAvg}%
                        </span>
                      </td>

                      {/* Status Marking Segmented Toggle */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
                          <button
                            onClick={() => handleStatusChange(stu.id, "P")}
                            disabled={isLocked}
                            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                              stu.status === "P"
                                ? "bg-emerald-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            P (Present)
                          </button>
                          <button
                            onClick={() => handleStatusChange(stu.id, "A")}
                            disabled={isLocked}
                            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                              stu.status === "A"
                                ? "bg-rose-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            A (Absent)
                          </button>
                          <button
                            onClick={() => handleStatusChange(stu.id, "L")}
                            disabled={isLocked}
                            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                              stu.status === "L"
                                ? "bg-amber-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            L (Leave)
                          </button>
                        </div>
                      </td>

                      {/* Remarks */}
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={stu.remarks}
                          disabled={isLocked}
                          onChange={(e) => handleRemarkChange(stu.id, e.target.value)}
                          placeholder="Add session note..."
                          className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs text-slate-800 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#355C7D]"
                        />
                      </td>

                      {/* SMS Status */}
                      <td className="py-3 px-3 text-center">
                        {stu.smsQueued ? (
                          <span
                            title="SMS Dispatch Queued to Guardian"
                            className="inline-flex p-1 bg-rose-50 text-rose-600 rounded-md border border-rose-200"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs font-mono">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="p-10 text-center space-y-1">
                <p className="text-sm font-bold text-slate-700">No candidates match search</p>
                <p className="text-xs text-slate-400">Clear filter or try another query.</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Shortage Radar & Heatmap (4 Cols) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-6 sticky top-6">
          {/* Shortage Radar Card */}
          <div className="bg-white border border-slate-200/90 shadow-sm p-5 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#3D405B]">
                  Shortage Radar (&lt; 75%)
                </h3>
              </div>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">
                {defaulters.length} Defaulters
              </span>
            </div>

            <div className="space-y-3">
              {defaulters.length === 0 ? (
                <div className="p-4 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-200/70 text-center font-medium">
                  🎉 Excellent! No candidates below 75% in this cohort.
                </div>
              ) : (
                defaulters.map((defaulter) => (
                  <div
                    key={defaulter.id}
                    className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-rose-700">
                        {defaulter.roll}
                      </span>
                      <span className="font-mono text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                        {defaulter.monthlyAvg}%
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[#3D405B]">{defaulter.name}</div>
                    <div className="text-xs text-slate-500">
                      Need {Math.ceil((75 - defaulter.monthlyAvg) * 0.4 + 2)} consecutive sessions to reach 75%
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-rose-200/60 text-xs">
                      <button
                        onClick={() =>
                          showToast(`Guardian advisory SMS dispatched to ${defaulter.guardian} (${defaulter.guardianPhone}).`)
                        }
                        className="font-semibold text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>Send SMS</span>
                      </button>
                      <Link
                        href={`/staff/students?roll=${defaulter.roll}`}
                        className="font-semibold text-[#355C7D] hover:underline"
                      >
                        Dossier &rarr;
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 30-Day Batch Heatmap Card */}
          <div className="bg-white border border-slate-200/90 shadow-sm p-5 rounded-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#355C7D] flex items-center justify-center">
                  <Flame className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#3D405B]">
                  30-Day Batch Heatmap
                </h3>
              </div>
              <span className="text-xs font-medium text-slate-500">May 2025</span>
            </div>

            {/* Matrix Simulation */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-mono">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, dIdx) => (
                <span key={dIdx} className="font-bold text-slate-400 text-[11px]">
                  {d}
                </span>
              ))}
              {Array.from({ length: 28 }).map((_, idx) => {
                const day = idx + 1;
                const isWeekend = idx % 7 === 5 || idx % 7 === 6;
                const rate = isWeekend ? 0 : 86 + (idx % 11);

                let bg = "bg-slate-100 text-slate-400";
                if (!isWeekend) {
                  if (rate >= 92) bg = "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold";
                  else if (rate >= 80) bg = "bg-blue-50 text-[#355C7D] border border-blue-200 font-bold";
                  else bg = "bg-rose-50 text-rose-700 border border-rose-200 font-bold";
                }

                return (
                  <div
                    key={idx}
                    title={isWeekend ? "Holiday" : `Day ${day}: ${rate}% attendance`}
                    className={`h-7 flex items-center justify-center rounded-lg text-xs ${bg}`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-50 border border-emerald-300"></span> &gt;90%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-50 border border-blue-300"></span> 80–90%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-50 border border-rose-300"></span> &lt;80%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lock Register Confirmation Modal */}
      {isLockModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#355C7D] flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3D405B]">
                    Lock Daily Attendance Register
                  </h3>
                  <p className="text-xs text-slate-500">
                    Commit session records to official academic ledger.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLockModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <p className="text-slate-600 leading-relaxed">
                You are locking attendance for <strong>{activeBatch.code}: {activeBatch.subject}</strong> on <strong>{selectedDate}</strong> ({activeBatch.period}).
              </p>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Present:</span>
                  <strong className="text-emerald-600">{counts.present} Students ({counts.presentPct}%)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Absent:</span>
                  <strong className="text-rose-600">{counts.absent} Students ({counts.absentPct}%)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Approved Medical/Leave:</span>
                  <strong className="text-amber-600">{counts.leave} Students ({counts.leavePct}%)</strong>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/70 text-slate-700 text-xs rounded-xl space-y-1">
                <div className="font-bold text-[#355C7D] flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#355C7D]" />
                  Central Academic Ledger Commit
                </div>
                <p className="text-[11px] text-slate-500">
                  Once locked, records are cryptographically timestamped. Absentees with SMS enabled will receive instant parental notifications.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
              <button
                onClick={() => setIsLockModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLockRegister}
                className="px-5 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Confirm &amp; Commit Lock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
