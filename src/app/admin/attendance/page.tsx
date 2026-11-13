"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ShieldCheck,
  Lock,
  Unlock,
  Calendar,
  CheckCheck,
  UserX,
  FileSpreadsheet,
  CloudCheck,
  Users,
  UserCheck,
  AlertTriangle,
  FileText,
  Search,
  ChevronLeft,
  ChevronRight,
  Info,
  Gavel,
  Mail,
  TrendingUp,
  CalendarDays,
  X
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  rollNo: string;
  name: string;
  guardian: string;
  avatar?: string;
  initials?: string;
  monthlyAvg: number;
  status: "P" | "A" | "L";
  remarks: string;
  smsAlert: boolean;
  isAtRisk?: boolean;
}

const initialRoster: AttendanceRecord[] = [
  {
    id: "r1",
    rollNo: "APX-CS-001",
    name: "Arjun Sharma",
    guardian: "Rajesh Sharma",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaapfiTEV22YJoPwVsK1lrVX3QhYimpSUKj8Nd0lEwH5Zfh1olmfv9QdzancRzi0InD3VF1G7Ay-bMsmr7rQOPI3RrhJ_WjdV0F7bNWVRKnzpLHV9alQOkSSSmcOwm0eatkgSAME0Rw2jf_65DgE9gWFUGXhBvElx6tBn4JRhuXVMSaVTeE_z09UgO0PhyQ43x8WEG3CHiwtKHiJryAoEo6OJq_EOFaN6Bu1rU4Fqc",
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
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDynJZ1UYDkIfizcKjTvS5aNzjc_w_T_zk39UdGcM4ay-v11E85ps0MWyZORRuhTGCHalrvxbuYfyBk-S_fVlv6NnZ-VOc-do2bzMatpnKGm20xg4Vu1HmcyVNsayqCucCqcgKcMZOs4RZZN41vmFe_m5z3FMnnqZBDAIN7gZL5XZRugcgh-JrzCjTBKMfVWZ30j6JUo03CfLJY0VsKs31DdODY2szDrklOZ232VbzH",
    monthlyAvg: 68.2,
    status: "A",
    remarks: "Unexcused - 3rd consecutive",
    smsAlert: true,
    isAtRisk: true
  },
  {
    id: "r3",
    rollNo: "APX-CS-003",
    name: "Siddharth Rao",
    guardian: "Anand Rao",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCy3xkMoTce9CEZ80VPvRmuho6f6xFNGxQcKQ7JRsRa_O9Od_PaOMxd73A2XYhj-z9waaTN7zFf8HSMJipwSY-Eu7cyRlzJZd7QF8RA6UhUOomEuPe8RTopkTsCgzjmPReukNdNtsvkYk6hiUtXnZAObnWQTXhufWIUzU1VzRXk1JXDO6mCFQmZTfGwktvxV006LWWvE-S8lYCYwIZrfMpoYLUoOrRPkVRpUuy__T29",
    monthlyAvg: 84.0,
    status: "L",
    remarks: "Fever cert submitted (Apex Clinic)",
    smsAlert: false
  },
  {
    id: "r4",
    rollNo: "APX-CS-004",
    name: "Kiran Kumar",
    guardian: "Suresh Kumar",
    initials: "KK",
    monthlyAvg: 71.5,
    status: "A",
    remarks: "Sports trials clearance pending",
    smsAlert: true,
    isAtRisk: true
  },
  {
    id: "r5",
    rollNo: "APX-CS-005",
    name: "Ananya Desai",
    guardian: "Vikram Desai",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGHynoJIjHzdGiFHyooffGbhNvtrouCN6brvzvVCu7tXl0f5rK4Y1iwGXZywk43tpC_H1P6_ZT30UU3ARbbGvN8Qa6o0wKUn7NrCxKXxGXutCsiNJr-q4ZgWOcX6YLYwGMASg6I8ZZj8Kv-lntjmIcGqN269wCa4nQHmc97Y2AKxBWN86Geb3KzvPr6WGUvcGrLjfbmCwwjC_xVZkXYz00EQPfSC88MMCNpJp4S-77",
    monthlyAvg: 96.8,
    status: "P",
    remarks: "",
    smsAlert: false
  },
  {
    id: "r6",
    rollNo: "APX-CS-006",
    name: "Tarun Reddy",
    guardian: "Srinivas Reddy",
    initials: "TR",
    monthlyAvg: 88.1,
    status: "P",
    remarks: "Late entry: 09:12 AM (Bus route 14)",
    smsAlert: false
  },
  {
    id: "r7",
    rollNo: "APX-CS-007",
    name: "Zoya Naaz",
    guardian: "Farooq Naaz",
    initials: "ZN",
    monthlyAvg: 78.9,
    status: "L",
    remarks: "Dean-approved NSS Camp",
    smsAlert: false
  },
  {
    id: "r8",
    rollNo: "APX-CS-008",
    name: "Rishi Verma",
    guardian: "Anil Verma",
    initials: "RV",
    monthlyAvg: 77.4,
    status: "A",
    remarks: "",
    smsAlert: true
  }
];

export default function AttendancePage() {
  const [roster, setRoster] = useState<AttendanceRecord[]>(initialRoster);
  const [isLocked, setIsLocked] = useState(false);
  const [lectureDate, setLectureDate] = useState("2024-06-10");
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "A" | "critical">("all");
  const [globalSmsToggle, setGlobalSmsToggle] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Calculations scaled to total cohort size of 64 candidates
  const totalSimulated = 64;
  const pCount = roster.filter((r) => r.status === "P").length;
  const aCount = roster.filter((r) => r.status === "A").length;
  const lCount = roster.filter((r) => r.status === "L").length;
  const ratio = roster.length ? pCount / roster.length : 0.9;
  const simP = Math.round(ratio * totalSimulated);
  const simA = Math.round((aCount / roster.length) * totalSimulated);
  const simL = totalSimulated - simP - simA;

  const presentPct = ((simP / totalSimulated) * 100).toFixed(1);
  const absentPct = ((simA / totalSimulated) * 100).toFixed(1);
  const leavePct = ((simL / totalSimulated) * 100).toFixed(1);

  // Single candidate status toggle
  const handleStatusChange = (id: string, newStatus: "P" | "A" | "L") => {
    if (isLocked) {
      showToast("Cannot edit: Register is locked. Click 'Unlock Register' first.");
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
    setRoster((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, remarks: text };
        }
        return r;
      })
    );
  };

  // SMS alert toggle
  const handleSmsToggle = (id: string) => {
    setRoster((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return { ...r, smsAlert: !r.smsAlert };
        }
        return r;
      })
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
    showToast("All 64 Candidates marked PRESENT in current period.");
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
    showToast("Register cleared. All marked as ABSENT pending faculty review.");
  };

  // Lock / Unlock toggle
  const handleLockToggle = () => {
    if (!isLocked) {
      setIsLocked(true);
      showToast("Register LOCKED & SYNCED. SMS alerts queued for dispatch to guardians.");
    } else {
      setIsLocked(false);
      showToast("Register UNLOCKED for faculty adjustments.");
    }
  };

  // Filtered roster
  const filteredRoster = roster.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchFilter.toLowerCase()) ||
      r.guardian.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "all") return true;
    if (statusFilter === "A") return r.status === "A";
    if (statusFilter === "critical") return r.monthlyAvg < 75.0;

    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Dynamic Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-primary text-on-primary px-4 py-3 shadow-2xl border-l-4 border-secondary flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2">
          <CheckCheck className="w-5 h-5 text-secondary-container" />
          <span className="font-mono-data text-xs tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Command Telemetry Header */}
      <div className="w-full bg-surface-container-lowest p-6 border-b border-outline-variant/30 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-mono-data text-xs text-secondary uppercase tracking-wider">
              <span className="inline-block w-2 h-2 bg-secondary" />
              <span>Register Module // Section A-CS</span>
              <span className="text-outline">/</span>
              <span>Session AY 2024-25</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold mt-1">
              Daily Attendance & Register Control
            </h1>
          </div>

          {/* Quick Session Presets & Status */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <div className="flex items-center gap-2 bg-surface-container px-3.5 py-1.5 shadow-sm text-on-surface border border-outline-variant/30">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="font-mono-data text-mono-data font-semibold text-xs">09:00 - 10:15 AM</span>
              <span className="font-label-sm text-[0.625rem] uppercase px-1.5 py-0.5 bg-secondary text-on-secondary font-bold ml-1">
                Period 1
              </span>
            </div>

            <div className="flex items-center gap-2 bg-surface-container px-3.5 py-1.5 shadow-sm text-on-surface border border-outline-variant/30">
              <ShieldCheck className="w-4 h-4 text-outline" />
              <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
                Status:
              </span>
              <span
                className={`font-mono-data text-mono-data font-semibold text-xs uppercase ${
                  isLocked ? "text-error" : "text-secondary"
                }`}
              >
                {isLocked ? "Locked & Synced" : "Draft / Unlocked"}
              </span>
            </div>

            <button
              onClick={handleLockToggle}
              className={`font-label-md text-label-md uppercase tracking-wider px-4 py-2 shadow-md transition-colors flex items-center gap-1.5 ${
                isLocked
                  ? "bg-error text-on-error hover:bg-error/90"
                  : "bg-primary-container text-on-primary hover:bg-primary"
              }`}
            >
              {isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isLocked ? "Unlock Register" : "Submit & Lock"}</span>
            </button>
          </div>
        </div>

        {/* Architectural Filter Ribbon */}
        <div className="bg-surface-container-low p-4 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3 items-end border border-outline-variant/30">
          {/* Course Selector */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Program / Discipline
            </label>
            <select className="w-full bg-surface-container-lowest px-3 py-2 font-mono-data text-mono-data text-on-surface focus:outline-none border border-outline-variant/30 text-xs cursor-pointer">
              <option>B.Tech Computer Science & Eng.</option>
              <option>B.Tech Electronics & Comm.</option>
              <option>M.Tech Artificial Intelligence</option>
              <option>B.Sc Data Science</option>
            </select>
          </div>

          {/* Batch Selector */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Batch / Term
            </label>
            <select className="w-full bg-surface-container-lowest px-3 py-2 font-mono-data text-mono-data text-on-surface focus:outline-none border border-outline-variant/30 text-xs cursor-pointer">
              <option>Batch 2023-27 [Year 3]</option>
              <option>Batch 2022-26 [Year 4]</option>
              <option>Batch 2024-28 [Year 2]</option>
            </select>
          </div>

          {/* Section / Subject Selector */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Section & Course Code
            </label>
            <select className="w-full bg-surface-container-lowest px-3 py-2 font-mono-data text-mono-data text-on-surface focus:outline-none border border-outline-variant/30 text-xs cursor-pointer">
              <option>Sec A (M) // CS302 Operating Sys.</option>
              <option>Sec B (E) // CS304 Database Sys.</option>
              <option>Sec A (M) // CS308 Computer Networks</option>
            </select>
          </div>

          {/* Date with Quick Select */}
          <div className="md:col-span-4 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Lecture Date
              </label>
              <div className="flex items-center gap-1 font-label-sm text-label-sm uppercase">
                <button
                  onClick={() => {
                    setLectureDate("2024-06-09");
                    showToast("Date set to Yesterday (June 09, 2024)");
                  }}
                  className="px-2 py-0.5 bg-surface hover:bg-surface-container-high text-on-surface-variant transition-colors border border-outline-variant/30 text-xs"
                >
                  Yday
                </button>
                <button
                  onClick={() => {
                    setLectureDate("2024-06-10");
                    showToast("Date set to Today (June 10, 2024)");
                  }}
                  className="px-2 py-0.5 bg-primary-container text-on-primary font-semibold text-xs"
                >
                  Today
                </button>
              </div>
            </div>
            <div className="relative bg-surface-container-lowest shadow-sm flex items-center border border-outline-variant/30">
              <Calendar className="w-4 h-4 text-on-surface-variant absolute left-2.5" />
              <input
                type="date"
                value={lectureDate}
                onChange={(e) => setLectureDate(e.target.value)}
                className="w-full bg-transparent pl-9 pr-3 py-1.5 font-mono-data text-mono-data text-on-surface focus:outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Quick Action Toolstrip */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleMarkAllPresent}
              className="bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-3.5 py-1.5 shadow-sm hover:bg-primary-container transition-colors flex items-center gap-1.5"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark All Present</span>
            </button>
            <button
              onClick={handleClearAll}
              className="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase tracking-wider px-3.5 py-1.5 shadow-sm transition-colors flex items-center gap-1.5 border border-outline-variant/30"
            >
              <UserX className="w-4 h-4 text-error" />
              <span>Clear All / Reset</span>
            </button>
            <button
              onClick={() => showToast("Generating SEC_A_JUNE_2024_REGISTER.xlsx file...")}
              className="bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase tracking-wider px-3.5 py-1.5 shadow-sm transition-colors flex items-center gap-1.5 border border-outline-variant/30"
            >
              <FileSpreadsheet className="w-4 h-4 text-secondary" />
              <span>Export Monthly Excel</span>
            </button>
          </div>

          <div className="flex items-center gap-4 font-mono-data text-mono-data text-on-surface-variant text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={globalSmsToggle}
                onChange={(e) => setGlobalSmsToggle(e.target.checked)}
                className="w-4 h-4 accent-primary cursor-pointer"
              />
              <span className="font-label-sm text-label-sm uppercase tracking-wide text-on-surface font-semibold">
                Auto-Notify Absentees via SMS
              </span>
            </label>
            <div className="h-4 w-px bg-outline-variant/40" />
            <span className="flex items-center gap-1 text-[0.75rem] uppercase text-outline">
              <CloudCheck className="w-4 h-4 text-secondary" /> Autosaved 14s ago
            </span>
          </div>
        </div>
      </div>

      {/* Metric Telemetry Cards (4-up brutalist layout) */}
      <div className="p-6 pb-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-4 shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary" />
          <div className="flex items-center justify-between pl-2">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
              Total Enrolled Registry
            </span>
            <Users className="w-5 h-5 text-outline" />
          </div>
          <div className="pl-2 mt-2">
            <div className="font-headline-lg text-headline-lg font-bold text-primary font-mono-data">
              64 <span className="text-body-sm font-normal text-on-surface-variant text-sm">Candidates</span>
            </div>
            <div className="flex items-center gap-1 text-label-sm uppercase text-secondary font-semibold mt-1">
              <CheckCheck className="w-3.5 h-3.5" /> 100% Census Verified
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-4 shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-secondary" />
          <div className="flex items-center justify-between pl-2">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
              Present in Session
            </span>
            <UserCheck className="w-5 h-5 text-secondary" />
          </div>
          <div className="pl-2 mt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg font-bold text-primary font-mono-data">{simP}</span>
              <span className="font-label-md text-label-md font-semibold text-secondary bg-surface-container-high px-1.5 py-0.5">
                {presentPct}%
              </span>
            </div>
            <div className="flex items-center gap-1 text-label-sm uppercase text-secondary font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +3.2% vs 7-day average
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-4 shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-error" />
          <div className="flex items-center justify-between pl-2">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
              Unexcused Absentees
            </span>
            <AlertTriangle className="w-5 h-5 text-error" />
          </div>
          <div className="pl-2 mt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg font-bold text-error font-mono-data">{simA}</span>
              <span className="font-label-md text-label-md font-semibold text-error bg-error-container px-1.5 py-0.5">
                {absentPct}%
              </span>
            </div>
            <div className="flex items-center gap-1 text-label-sm uppercase text-error mt-1 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" /> 2 flagged under 75% bar
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-4 shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-outline" />
          <div className="flex items-center justify-between pl-2">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
              Approved Medical / Duty
            </span>
            <FileText className="w-5 h-5 text-outline" />
          </div>
          <div className="pl-2 mt-2">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg font-bold text-on-surface font-mono-data">{simL}</span>
              <span className="font-label-md text-label-md font-semibold text-on-surface-variant bg-surface-container px-1.5 py-0.5">
                {leavePct}%
              </span>
            </div>
            <div className="flex items-center gap-1 text-label-sm uppercase text-on-surface-variant mt-1 font-mono-data">
              Doc. Verifications attached
            </div>
          </div>
        </div>
      </div>

      {/* Primary Split Grid: Main Register Sheet (Col 8) vs Monthly Shortage & Heatmap Intelligence (Col 4) */}
      <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Interactive Live Attendance Sheet (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="bg-surface-container-lowest p-4 shadow-sm flex items-center justify-between flex-wrap gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <h2 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
                Roster Ledger // Section A
              </h2>
              <span className="px-2 py-0.5 bg-surface-container-low font-mono-data text-mono-data text-on-surface-variant font-semibold border border-outline-variant/30 text-xs">
                CS302: Operating Systems
              </span>
            </div>

            {/* Filter & Search Inside Table */}
            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-60 bg-surface-container-low shadow-sm flex items-center border border-outline-variant/30">
                <Search className="w-3.5 h-3.5 text-on-surface-variant absolute left-2.5" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter student or APX-ID..."
                  className="w-full bg-transparent pl-8 pr-2 py-1 font-body-sm text-body-sm text-on-surface focus:outline-none text-xs"
                />
              </div>
              <div className="flex items-center bg-surface-container-low shadow-sm p-0.5 font-label-sm text-label-sm uppercase border border-outline-variant/30">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-2 py-1 text-xs transition-colors ${
                    statusFilter === "all"
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-on-surface-variant hover:bg-surface"
                  }`}
                >
                  All (64)
                </button>
                <button
                  onClick={() => setStatusFilter("A")}
                  className={`px-2 py-1 text-xs transition-colors ${
                    statusFilter === "A"
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-on-surface-variant hover:bg-surface"
                  }`}
                >
                  Absentees
                </button>
                <button
                  onClick={() => setStatusFilter("critical")}
                  className={`px-2 py-1 text-xs transition-colors ${
                    statusFilter === "critical"
                      ? "bg-primary text-on-primary font-semibold"
                      : "text-on-surface-variant hover:bg-surface"
                  }`}
                >
                  &lt;75% Risk
                </button>
              </div>
            </div>
          </div>

          {/* Live Roster Table */}
          <div className="bg-surface-container-lowest shadow-sm overflow-x-auto border border-outline-variant/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider select-none border-b border-outline-variant/30">
                  <th className="py-2.5 px-4 w-32">Roll No.</th>
                  <th className="py-2.5 px-4">Candidate Name</th>
                  <th className="py-2.5 px-4 text-center w-28">Monthly Avg</th>
                  <th className="py-2.5 px-4 text-center w-48">Status Marking</th>
                  <th className="py-2.5 px-4">Remarks / Notes</th>
                  <th className="py-2.5 px-4 text-center w-20">SMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-body-sm">
                {filteredRoster.map((candidate) => {
                  const isAtRisk = candidate.monthlyAvg < 75.0;
                  const isRowAbsent = candidate.status === "A";

                  return (
                    <tr
                      key={candidate.id}
                      className={`transition-colors ${
                        isRowAbsent && isAtRisk
                          ? "bg-error-container/20 hover:bg-error-container/30"
                          : "hover:bg-surface-container-low bg-surface-container-lowest"
                      }`}
                    >
                      <td className="py-2 px-4 font-mono-data text-mono-data font-bold text-xs">
                        <span className={isAtRisk ? "text-error" : "text-primary"}>{candidate.rollNo}</span>
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex items-center gap-2.5">
                          {candidate.avatar ? (
                            <img
                              src={candidate.avatar}
                              alt={candidate.name}
                              className="w-7 h-7 object-cover grayscale border border-outline-variant/30 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-7 h-7 bg-surface-container-high flex items-center justify-center font-mono-data text-xs font-bold text-primary flex-shrink-0 border border-outline-variant/30">
                              {candidate.initials}
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-body-md text-sm font-semibold text-on-surface flex items-center gap-1">
                              {candidate.name}
                              {isAtRisk && (
                                <span title="Critical Shortage">
                                  <AlertTriangle className="w-3.5 h-3.5 text-error" />
                                </span>
                              )}
                            </span>
                            <span
                              className={`text-[0.6875rem] ${
                                isAtRisk ? "text-error font-medium" : "text-outline"
                              }`}
                            >
                              {isAtRisk ? "Critical Shortage Alert" : `G: ${candidate.guardian}`}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span
                          className={`font-mono-data text-mono-data font-bold text-xs ${
                            isAtRisk
                              ? "text-error bg-error-container px-1 py-0.5"
                              : candidate.monthlyAvg > 90
                              ? "text-secondary font-semibold"
                              : "text-on-surface font-semibold"
                          }`}
                        >
                          {candidate.monthlyAvg.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <div className="inline-flex shadow-sm bg-surface-container p-0.5 border border-outline-variant/30">
                          <button
                            onClick={() => handleStatusChange(candidate.id, "P")}
                            className={`px-2.5 py-1 text-xs font-bold uppercase transition-all ${
                              candidate.status === "P"
                                ? "bg-secondary text-on-secondary shadow-sm"
                                : "text-on-surface-variant hover:bg-surface"
                            }`}
                          >
                            P
                          </button>
                          <button
                            onClick={() => handleStatusChange(candidate.id, "A")}
                            className={`px-2.5 py-1 text-xs font-bold uppercase transition-all ${
                              candidate.status === "A"
                                ? "bg-error text-on-error shadow-sm"
                                : "text-on-surface-variant hover:bg-surface"
                            }`}
                          >
                            A
                          </button>
                          <button
                            onClick={() => handleStatusChange(candidate.id, "L")}
                            className={`px-2.5 py-1 text-xs font-bold uppercase transition-all ${
                              candidate.status === "L"
                                ? "bg-secondary-container text-on-secondary-container font-bold shadow-sm"
                                : "text-on-surface-variant hover:bg-surface"
                            }`}
                          >
                            L
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          value={candidate.remarks}
                          onChange={(e) => handleRemarksChange(candidate.id, e.target.value)}
                          placeholder="Add remark..."
                          className="w-full bg-surface-container-low px-2 py-1 font-mono-data text-xs text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30"
                        />
                      </td>
                      <td className="py-2 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={candidate.smsAlert}
                          onChange={() => handleSmsToggle(candidate.id)}
                          className="sms-chk accent-primary cursor-pointer w-4 h-4"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Table Ledger Pagination & Summary Bar */}
            <div className="bg-surface-container-low p-3 flex items-center justify-between font-mono-data text-mono-data text-on-surface-variant text-xs border-t border-outline-variant/30">
              <div className="flex items-center gap-3">
                <span>Showing rows 1-{filteredRoster.length} of 64</span>
                <span className="text-outline">|</span>
                <span className="text-secondary font-semibold">{simP} marked Present in batch memory</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 hover:bg-surface-container-high transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 py-0.5 bg-surface-container-lowest font-bold text-primary border border-outline-variant/30">
                  1
                </span>
                <button className="p-1 hover:bg-surface-container-high transition-colors">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Operational Action Note */}
          <div className="bg-surface-container-lowest p-4 shadow-sm flex items-start gap-3 border border-outline-variant/30">
            <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="flex flex-col text-on-surface-variant">
              <span className="font-label-md text-label-md uppercase font-semibold text-primary">
                Institutional Attendance Rule §4.2
              </span>
              <p className="font-body-sm text-body-sm leading-relaxed mt-0.5 text-xs">
                Attendance submissions are automatically timestamped into the immutable academic audit trail. Marking a
                student as Absent will trigger an automated SMS broadcast to registered guardians within 30 minutes of
                registry lock.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Analytics, 30-Day Heatmap & Shortage Radar (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          {/* Shortage Radar Alert Widget */}
          <div className="bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-1 border-b border-outline-variant/30">
              <div className="flex items-center gap-1.5">
                <Gavel className="w-4 h-4 text-error" />
                <h3 className="font-headline-sm text-headline-sm uppercase text-primary font-bold">Shortage Radar</h3>
              </div>
              <span className="bg-error text-on-error font-mono-data text-xs uppercase px-1.5 py-0.5 font-bold">
                2 At Risk (&lt;75%)
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Candidates falling beneath the 75% statutory bar are automatically disqualified from Mid-Semester
              Examinations.
            </p>

            {/* Candidate Cards */}
            <div className="flex flex-col gap-2 mt-1">
              {/* Shortage Item 1 */}
              <div className="bg-surface-container-low p-2.5 flex items-center justify-between gap-2 border border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-mono-data font-bold text-error text-xs">APX-002</span>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-xs font-semibold text-on-surface">Devina Mukherjee</span>
                    <span className="font-label-sm text-[0.6875rem] text-error font-mono-data">
                      68.2% Cum. (Need +7 classes)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => showToast("Official Exam De-bar Notice issued for Devina Mukherjee (APX-CS-002)")}
                  className="bg-error text-on-error font-label-sm text-[0.625rem] uppercase px-2 py-1 hover:bg-error/90 transition-colors whitespace-nowrap"
                >
                  De-bar Notice
                </button>
              </div>

              {/* Shortage Item 2 */}
              <div className="bg-surface-container-low p-2.5 flex items-center justify-between gap-2 border border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-mono-data font-bold text-error text-xs">APX-004</span>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-xs font-semibold text-on-surface">Kiran Kumar</span>
                    <span className="font-label-sm text-[0.6875rem] text-error font-mono-data">
                      71.5% Cum. (Need +3 classes)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => showToast("Official Exam De-bar Notice issued for Kiran Kumar (APX-CS-004)")}
                  className="bg-error text-on-error font-label-sm text-[0.625rem] uppercase px-2 py-1 hover:bg-error/90 transition-colors whitespace-nowrap"
                >
                  De-bar Notice
                </button>
              </div>
            </div>

            <button
              onClick={() => showToast("Dispatched 2 Exam Ineligibility Notices via Postal & Student Portal.")}
              className="w-full mt-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md uppercase tracking-wider py-2 shadow-sm transition-colors flex items-center justify-center gap-1.5 border border-outline-variant/30"
            >
              <Mail className="w-4 h-4 text-secondary" />
              <span>Generate All Ineligibility Notices</span>
            </button>
          </div>

          {/* Past 30 Days Attendance Heatmap */}
          <div className="bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-1 border-b border-outline-variant/30">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
                  30-Day Batch Heatmap
                </h3>
              </div>
              <span className="font-mono-data text-xs uppercase text-on-surface-variant font-semibold">
                Past 6 Weeks
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Aggregate section density. Darker blocks indicate high attendance rates (&gt;90%).
            </p>

            {/* Inline Technical Heatmap Grid */}
            <div className="w-full bg-surface-container-low p-3 flex flex-col gap-2 border border-outline-variant/30">
              <div className="grid grid-cols-7 gap-1 font-mono-data text-xs text-center text-outline">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>

              {/* Heatmap Day Matrix (5 weeks x 7 days) */}
              <div className="grid grid-cols-7 gap-1">
                {/* W1 */}
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 13: 94%"
                >
                  94
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 14: 92%"
                >
                  92
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 15: 90%"
                >
                  90
                </div>
                <div
                  className="h-6 bg-secondary/80 flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 16: 86%"
                >
                  86
                </div>
                <div
                  className="h-6 bg-secondary/60 flex items-center justify-center font-mono-data text-[0.625rem] text-primary"
                  title="May 17: 81%"
                >
                  81
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>

                {/* W2 */}
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 20: 95%"
                >
                  95
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 21: 91%"
                >
                  91
                </div>
                <div
                  className="h-6 bg-error/80 flex items-center justify-center font-mono-data text-[0.625rem] text-on-error font-bold"
                  title="May 22: 73% (Rain Storm)"
                >
                  73
                </div>
                <div
                  className="h-6 bg-secondary/80 flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 23: 88%"
                >
                  88
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 24: 93%"
                >
                  93
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>

                {/* W3 */}
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 27: 96%"
                >
                  96
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 28: 92%"
                >
                  92
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 29: 90%"
                >
                  90
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 30: 94%"
                >
                  94
                </div>
                <div
                  className="h-6 bg-secondary/80 flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="May 31: 85%"
                >
                  85
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>

                {/* W4 */}
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="Jun 03: 93%"
                >
                  93
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="Jun 04: 90%"
                >
                  90
                </div>
                <div
                  className="h-6 bg-secondary/70 flex items-center justify-center font-mono-data text-[0.625rem] text-primary"
                  title="Jun 05: 84%"
                >
                  84
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="Jun 06: 91%"
                >
                  91
                </div>
                <div
                  className="h-6 bg-secondary flex items-center justify-center font-mono-data text-[0.625rem] text-on-secondary"
                  title="Jun 07: 89%"
                >
                  89
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>

                {/* W5 (Current) */}
                <div
                  className="h-6 bg-primary text-on-primary font-bold flex items-center justify-center font-mono-data text-[0.625rem] shadow-sm"
                  title="Jun 10 Today: Active"
                >
                  TODAY
                </div>
                <div className="h-6 bg-surface-container-high/40 flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  --
                </div>
                <div className="h-6 bg-surface-container-high/40 flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  --
                </div>
                <div className="h-6 bg-surface-container-high/40 flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  --
                </div>
                <div className="h-6 bg-surface-container-high/40 flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  --
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>
                <div className="h-6 bg-surface-container flex items-center justify-center font-mono-data text-[0.625rem] text-outline">
                  OFF
                </div>
              </div>

              <div className="flex items-center justify-between text-[0.6875rem] uppercase pt-1 text-on-surface-variant font-mono-data border-t border-outline-variant/30">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-error/70 inline-block" /> &lt;75% Short
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-secondary/60 inline-block" /> 80-89%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-secondary inline-block" /> 90%+ Normal
                </span>
              </div>
            </div>
          </div>

          {/* Trend Sparkline Telemetry Widget */}
          <div className="bg-surface-container-lowest p-4 shadow-sm flex flex-col gap-2 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                30-Day Rate Velocity
              </span>
              <span className="font-mono-data text-mono-data font-bold text-secondary text-xs">Mean: 89.4%</span>
            </div>

            {/* Inline SVG Sparkline */}
            <div className="w-full h-16 relative bg-surface-container-low p-1 border border-outline-variant/30">
              <svg className="w-full h-full text-secondary" preserveAspectRatio="none" viewBox="0 0 300 60">
                <path
                  d="M0,35 L20,32 L40,28 L60,34 L80,38 L100,22 L120,24 L140,55 L160,26 L180,18 L200,20 L220,15 L240,30 L260,25 L280,22 L300,16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Reference 75% threshold line */}
                <line stroke="#ba1a1a" strokeDasharray="3,3" strokeWidth="1.5" x1="0" x2="300" y1="48" y2="48" />
              </svg>
              <span className="absolute bottom-1 right-2 font-mono-data text-[0.625rem] text-error font-semibold">
                Min 75% Bound
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-on-surface-variant font-mono-data pt-1">
              <span>Batch Headcount: 64</span>
              <span>Semester Days: 42/90</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
