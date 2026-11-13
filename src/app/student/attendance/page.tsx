"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  FileText,
  Shield,
  ShieldCheck,
  TrendingUp,
  X,
  Upload,
  Send,
  Plus
} from "lucide-react";

export default function StudentAttendancePage() {
  const [selectedSemester, setSelectedSemester] = useState("sem4");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const attendanceLogs = [
    {
      id: "LOG-01",
      date: "27 Mar 2025",
      time: "09:02:14 AM",
      code: "CS401",
      subject: "Database Management Systems",
      slot: "09:00 – 10:00 AM",
      venue: "Lecture Hall 302",
      source: "Turnstile RFID Entry (North Wing Gate 2)",
      sourceIcon: "contactless",
      status: "Present",
      statusClass: "bg-[#ECFDF5] text-[#047857] border-[#a7f3d0]",
    },
    {
      id: "LOG-02",
      date: "26 Mar 2025",
      time: "02:11:45 PM",
      code: "CS405L",
      subject: "DB Systems & Cloud SQL Lab",
      slot: "02:00 – 05:00 PM",
      venue: "Comp Lab Block IV",
      source: "Biometric Optical Scanner (Station 14)",
      sourceIcon: "fingerprint",
      status: "Present",
      statusClass: "bg-[#ECFDF5] text-[#047857] border-[#a7f3d0]",
    },
    {
      id: "LOG-03",
      date: "25 Mar 2025",
      time: "11:03:02 AM",
      code: "CS402",
      subject: "Operating Systems & Kernel Arch",
      slot: "11:00 – 12:00 PM",
      venue: "Lecture Hall 204",
      source: "Faculty Biometric App (BLE Sync)",
      sourceIcon: "phonelink_setup",
      status: "Present",
      statusClass: "bg-[#ECFDF5] text-[#047857] border-[#a7f3d0]",
    },
    {
      id: "LOG-04",
      date: "18 Mar 2025",
      time: "Unrecorded",
      code: "CS404",
      subject: "Automata Theory & Formal Lang",
      slot: "10:00 – 11:00 AM",
      venue: "Hall B-11",
      source: "Turnstile / Beacon No Detection",
      sourceIcon: "sensors_off",
      status: "Absent",
      statusClass: "bg-[#FEF2F2] text-error border-red-300",
    },
    {
      id: "LOG-05",
      date: "17 Mar 2025",
      time: "09:01:10 AM",
      code: "CS403",
      subject: "Design & Analysis of Algorithms",
      slot: "09:00 – 10:00 AM",
      venue: "Lecture Hall 301",
      source: "Turnstile RFID Entry (North Wing Gate 1)",
      sourceIcon: "contactless",
      status: "Present",
      statusClass: "bg-[#ECFDF5] text-[#047857] border-[#a7f3d0]",
    },
    {
      id: "LOG-06",
      date: "12 Mar 2025",
      time: "Dean Approved",
      code: "ALL-DAY",
      subject: "Medical Quarantine / Hospitalization OD",
      slot: "Full Day (6 Sessions)",
      venue: "Campus Infirmary Reg",
      source: "Academic Dean Override (OD-941)",
      sourceIcon: "verified_user",
      status: "Medical Leave",
      statusClass: "bg-[#FFFBEB] text-[#B45309] border-[#fde68a]",
    },
    {
      id: "LOG-07",
      date: "10 Mar 2025",
      time: "09:04:22 AM",
      code: "CS401",
      subject: "Database Management Systems",
      slot: "09:00 – 10:00 AM",
      venue: "Lecture Hall 302",
      source: "Turnstile RFID Entry (North Wing Gate 2)",
      sourceIcon: "contactless",
      status: "Present",
      statusClass: "bg-[#ECFDF5] text-[#047857] border-[#a7f3d0]",
    },
    {
      id: "LOG-08",
      date: "05 Mar 2025",
      time: "Unrecorded",
      code: "HS401",
      subject: "Corporate Ethics & Governance",
      slot: "03:00 – 04:00 PM",
      venue: "Seminar Room 1",
      source: "Absent – Unnotified Absence",
      sourceIcon: "sensors_off",
      status: "Absent",
      statusClass: "bg-[#FEF2F2] text-error border-red-300",
    },
  ];

  const filteredLogs = attendanceLogs.filter((log) => {
    const matchesSearch =
      log.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.date.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "PRESENT" && log.status === "Present") ||
      (statusFilter === "ABSENT" && log.status === "Absent") ||
      (statusFilter === "MEDICAL" && log.status === "Medical Leave");

    return matchesSearch && matchesStatus;
  });

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

      {/* Sub-Header & Controls Strip */}
      <div className="px-6 py-4 bg-surface-container-lowest border-b border-[#d5e3fc] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            <Link href="/student" className="hover:text-primary">
              Student Portal
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <span className="text-primary font-bold">My Attendance</span>
          </div>
          <h1 className="font-headline text-xl text-primary font-bold tracking-tight">
            Attendance Telemetry &amp; Biometric Register
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-surface-container-low px-3 py-1.5 text-on-surface border border-[#c4c6cf]">
            <Calendar className="w-4 h-4 text-secondary mr-2" />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              aria-label="Select Semester"
              className="bg-transparent font-mono text-xs text-primary focus:outline-none cursor-pointer pr-2 font-semibold"
            >
              <option value="sem4">Semester IV (Jan 2025 – May 2025)</option>
              <option value="sem3">Semester III (Jul 2024 – Nov 2024)</option>
              <option value="sem2">Semester II (Jan 2024 – May 2024)</option>
            </select>
          </div>

          <button
            onClick={() => setShowLeaveModal(true)}
            className="flex items-center gap-1.5 bg-surface-container text-primary hover:bg-surface-container-high px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border border-[#c4c6cf] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply Leave / OD</span>
          </button>

          <button
            onClick={() =>
              triggerToast(
                "Compiling cryptographically signed register for Rahul Sharma (APX-2023-CS-042)... PDF downloaded."
              )
            }
            className="flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Primary View Area */}
      <div className="p-6 flex flex-col gap-6">
        {/* KPI Metric Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Cumulative Attendance */}
          <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#047857]"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                Cumulative Aggregate
              </span>
              <span className="px-1.5 py-0.5 bg-[#ECFDF5] text-[#047857] font-mono text-[10px] uppercase font-bold tracking-wider border border-[#a7f3d0]">
                Exam Cleared
              </span>
            </div>
            <div className="flex items-center justify-between my-2">
              <div>
                <div className="font-headline text-3xl text-primary font-bold tracking-tight">
                  88.4%
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">
                  Threshold:{" "}
                  <span className="font-mono font-bold text-primary">75.0%</span>
                </div>
              </div>

              {/* Radial Gauge Chart SVG */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#047857]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="88.4, 100"
                    strokeLinecap="butt"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute material-symbols-outlined text-[#047857] text-[18px]">
                  verified
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] text-[#047857] pt-2 bg-surface-container-low px-2 py-1 border border-[#a7f3d0]/50 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Eligible for End-Sem Exam Enrollment</span>
            </div>
          </div>

          {/* Card 2: Total Working Days */}
          <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                Scheduled Work Periods
              </span>
              <Calendar className="w-4 h-4 text-secondary" />
            </div>
            <div className="my-2">
              <div className="font-headline text-3xl text-primary font-bold tracking-tight">
                129{" "}
                <span className="text-xs font-mono font-normal text-on-surface-variant">
                  Sessions
                </span>
              </div>
              <div className="text-xs text-on-surface-variant mt-0.5">
                Lectures • Lab Practical Runs
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-on-surface-variant pt-2 bg-surface-container-low px-2 py-1 border border-[#d5e3fc]">
              <span>
                Active Days: <strong className="text-primary">86 d</strong>
              </span>
              <span>
                Cycle: <strong className="text-primary">Wk 14/18</strong>
              </span>
            </div>
          </div>

          {/* Card 3: Days Breakdown */}
          <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                Session Distribution
              </span>
              <span className="font-mono text-xs text-primary font-bold">
                129 Tally
              </span>
            </div>
            <div className="flex flex-col gap-1 my-2 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#047857]"></span>Present
                </span>
                <span className="font-bold text-[#047857]">
                  114{" "}
                  <span className="font-normal text-on-surface-variant">
                    (88.4%)
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-error"></span>Absent
                </span>
                <span className="font-bold text-error">
                  11{" "}
                  <span className="font-normal text-on-surface-variant">
                    (8.5%)
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#B45309]"></span>Medical / OD
                </span>
                <span className="font-bold text-[#B45309]">
                  4{" "}
                  <span className="font-normal text-on-surface-variant">
                    (3.1%)
                  </span>
                </span>
              </div>
            </div>
            {/* Multi-segment Progress Bar */}
            <div className="w-full h-1.5 bg-surface-container flex overflow-hidden">
              <div
                className="bg-[#047857] h-full"
                style={{ width: "88.4%" }}
              ></div>
              <div className="bg-error h-full" style={{ width: "8.5%" }}></div>
              <div
                className="bg-[#B45309] h-full"
                style={{ width: "3.1%" }}
              ></div>
            </div>
          </div>

          {/* Card 4: Attendance Buffer Margin */}
          <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                Cutoff Buffer Margin
              </span>
              <Shield className="w-4 h-4 text-secondary" />
            </div>
            <div className="my-2">
              <div className="font-headline text-3xl font-bold tracking-tight text-secondary">
                17{" "}
                <span className="text-xs font-mono font-normal text-on-surface-variant">
                  Periods
                </span>
              </div>
              <div className="text-xs text-on-surface-variant mt-0.5">
                Contingency allowance available
              </div>
            </div>
            <div className="font-mono text-[11px] text-primary-fixed-variant bg-secondary-fixed p-1.5 leading-tight flex items-center gap-1 border border-secondary/30">
              <AlertCircle className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Can miss up to 17 hrs before 75% breach</span>
            </div>
          </div>
        </div>

        {/* Main Section: Calendar Grid (60%) & Subject Breakdown (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Calendar and Trend (7 of 12 cols = ~60%) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Calendar Module */}
            <div className="bg-surface-container-lowest shadow-sm border border-[#d5e3fc] flex flex-col">
              {/* Calendar Header Bar */}
              <div className="p-4 bg-surface-container-low border-b border-[#d5e3fc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    event_note
                  </span>
                  <span className="font-headline text-sm font-bold text-primary tracking-tight uppercase">
                    Biometric Log • March 2025
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-surface-container-lowest p-1 border border-[#c4c6cf] font-mono text-xs">
                  <button className="px-2 py-0.5 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors flex items-center">
                    <ChevronLeft className="w-3.5 h-3.5" /> Feb
                  </button>
                  <span className="px-3 py-0.5 font-bold text-primary bg-primary-fixed">
                    March 2025
                  </span>
                  <button className="px-2 py-0.5 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors flex items-center">
                    Apr <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Calendar Body */}
              <div className="p-4">
                {/* Day of Week Headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase font-bold tracking-wider text-on-surface-variant mb-2">
                  <div className="py-1 bg-surface-container">Mon</div>
                  <div className="py-1 bg-surface-container">Tue</div>
                  <div className="py-1 bg-surface-container">Wed</div>
                  <div className="py-1 bg-surface-container">Thu</div>
                  <div className="py-1 bg-surface-container">Fri</div>
                  <div className="py-1 bg-surface-container font-bold text-primary">
                    Sat
                  </div>
                  <div className="py-1 bg-surface-container text-error">Sun</div>
                </div>

                {/* Calendar Days Matrix */}
                <div className="grid grid-cols-7 gap-1 text-xs font-mono">
                  {/* Previous month overflow (Feb 24 - 28) */}
                  <div className="min-h-[58px] p-1.5 bg-surface-container-low/40 opacity-40 flex flex-col justify-between">
                    <span className="text-on-surface-variant">24</span>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container-low/40 opacity-40 flex flex-col justify-between">
                    <span className="text-on-surface-variant">25</span>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container-low/40 opacity-40 flex flex-col justify-between">
                    <span className="text-on-surface-variant">26</span>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container-low/40 opacity-40 flex flex-col justify-between">
                    <span className="text-on-surface-variant">27</span>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container-low/40 opacity-40 flex flex-col justify-between">
                    <span className="text-on-surface-variant">28</span>
                  </div>

                  {/* Sat March 1 */}
                  <div className="min-h-[58px] p-1.5 bg-surface-container-low flex flex-col justify-between hover:bg-surface-container transition-colors border border-transparent hover:border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">1</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      4h Lab
                    </div>
                  </div>

                  {/* Sun March 2 */}
                  <div className="min-h-[58px] p-1.5 bg-surface-container flex flex-col justify-between text-on-surface-variant/60">
                    <span>2</span>
                    <span className="text-[8px] uppercase font-bold">Recess</span>
                  </div>

                  {/* Week 2: March 3 - 9 */}
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors border border-transparent">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">3</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">4</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  {/* Wed March 5: ABSENT */}
                  <div className="min-h-[58px] p-1.5 bg-[#FEF2F2] flex flex-col justify-between border border-red-300 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-error">5</span>
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                    </div>
                    <div className="text-[8px] text-error font-bold uppercase tracking-wider">
                      Absent
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">6</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      5h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">7</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      7h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container-low flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">8</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      4h Lab
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container flex flex-col justify-between text-on-surface-variant/60">
                    <span>9</span>
                    <span className="text-[8px] uppercase font-bold">Recess</span>
                  </div>

                  {/* Week 3: March 10 - 16 */}
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">10</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">11</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  {/* Wed March 12: Medical Leave */}
                  <div className="min-h-[58px] p-1.5 bg-[#FFFBEB] flex flex-col justify-between border border-amber-300 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#B45309]">12</span>
                      <span className="w-2 h-2 rounded-full bg-[#B45309]"></span>
                    </div>
                    <div className="text-[8px] text-[#B45309] font-bold uppercase leading-tight">
                      Med Leave
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">13</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">14</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      7h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container flex flex-col justify-between text-on-surface-variant/60">
                    <span>15</span>
                    <span className="text-[8px] uppercase font-bold">
                      Convocation
                    </span>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container flex flex-col justify-between text-on-surface-variant/60">
                    <span>16</span>
                    <span className="text-[8px] uppercase font-bold">Recess</span>
                  </div>

                  {/* Week 4: March 17 - 23 */}
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">17</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  {/* Tue March 18: ABSENT */}
                  <div className="min-h-[58px] p-1.5 bg-[#FEF2F2] flex flex-col justify-between border border-red-300 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-error">18</span>
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                    </div>
                    <div className="text-[8px] text-error font-bold uppercase tracking-wider">
                      Absent
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">19</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">20</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">21</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container-low flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">22</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      3h Lab
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container flex flex-col justify-between text-on-surface-variant/60">
                    <span>23</span>
                    <span className="text-[8px] uppercase font-bold">Recess</span>
                  </div>

                  {/* Week 5: March 24 - 30 */}
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">24</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">25</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-[#ECFDF5]/50 flex flex-col justify-between hover:bg-[#ECFDF5] transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">26</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
                    </div>
                    <div className="text-[9px] text-[#047857] font-semibold">
                      6h Logged
                    </div>
                  </div>
                  {/* Today: March 27 Active */}
                  <div className="min-h-[58px] p-1.5 bg-primary-fixed border border-primary flex flex-col justify-between shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">27</span>
                      <span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse"></span>
                    </div>
                    <div className="text-[8px] text-primary font-bold uppercase">
                      Today Active
                    </div>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container-lowest flex flex-col justify-between opacity-70">
                    <span className="font-bold text-on-surface">28</span>
                    <span className="text-[8px] text-outline">Pending</span>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container-lowest flex flex-col justify-between opacity-70">
                    <span className="font-bold text-on-surface">29</span>
                    <span className="text-[8px] text-outline">Pending</span>
                  </div>
                  <div className="min-h-[58px] p-1.5 bg-surface-container flex flex-col justify-between text-on-surface-variant/60">
                    <span>30</span>
                    <span className="text-[8px] uppercase font-bold">Recess</span>
                  </div>
                </div>

                {/* Calendar Legend Bar */}
                <div className="mt-4 pt-3 bg-surface-container-low px-4 py-2 border border-[#d5e3fc] flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-[#047857] inline-block"></span>
                    <span className="text-on-surface text-[11px]">
                      Present (100% Attended)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-[#B45309] inline-block"></span>
                    <span className="text-on-surface text-[11px]">
                      Approved Medical / OD
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-error inline-block"></span>
                    <span className="text-on-surface text-[11px]">
                      Unexcused Absent
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-surface-container-highest inline-block"></span>
                    <span className="text-on-surface text-[11px]">
                      Institutional Recess
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Trend Chart Box */}
            <div className="bg-surface-container-lowest p-5 shadow-sm border border-[#d5e3fc]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Trend Telemetry
                  </span>
                  <h3 className="font-headline text-sm font-bold text-primary">
                    Monthly Progression Vector
                  </h3>
                </div>
                <span className="font-mono text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 border border-[#c4c6cf]">
                  AY25 Target: ≥ 75%
                </span>
              </div>

              {/* Trend Bar Graph Display */}
              <div className="grid grid-cols-4 gap-4 items-end pt-2 h-36">
                {/* Jan */}
                <div className="flex flex-col items-center h-full justify-end group">
                  <div className="font-mono text-xs text-[#047857] font-bold mb-1">
                    91.2%
                  </div>
                  <div className="w-full bg-surface-container-high h-24 relative flex items-end">
                    <div
                      className="w-full bg-secondary transition-all group-hover:bg-primary"
                      style={{ height: "91.2%" }}
                    ></div>
                  </div>
                  <span className="font-mono text-xs text-on-surface mt-2 font-semibold">
                    Jan &apos;25
                  </span>
                  <span className="text-[10px] text-on-surface-variant">31 Days</span>
                </div>

                {/* Feb */}
                <div className="flex flex-col items-center h-full justify-end group">
                  <div className="font-mono text-xs text-[#047857] font-bold mb-1">
                    87.5%
                  </div>
                  <div className="w-full bg-surface-container-high h-24 relative flex items-end">
                    <div
                      className="w-full bg-secondary transition-all group-hover:bg-primary"
                      style={{ height: "87.5%" }}
                    ></div>
                  </div>
                  <span className="font-mono text-xs text-on-surface mt-2 font-semibold">
                    Feb &apos;25
                  </span>
                  <span className="text-[10px] text-on-surface-variant">28 Days</span>
                </div>

                {/* Mar (Current) */}
                <div className="flex flex-col items-center h-full justify-end group">
                  <div className="font-mono text-xs text-primary font-bold mb-1">
                    86.8%
                  </div>
                  <div className="w-full bg-surface-container-high h-24 relative flex items-end">
                    <div
                      className="w-full bg-[#047857] transition-all"
                      style={{ height: "86.8%" }}
                    ></div>
                  </div>
                  <span className="font-mono text-xs text-primary mt-2 font-bold">
                    Mar &apos;25
                  </span>
                  <span className="text-[10px] text-[#047857] font-bold">
                    Active
                  </span>
                </div>

                {/* Apr (Projected) */}
                <div className="flex flex-col items-center h-full justify-end group">
                  <div className="font-mono text-xs text-on-surface-variant mb-1 font-semibold">
                    89.0%
                  </div>
                  <div className="w-full bg-surface-container-high h-24 relative flex items-end">
                    <div
                      className="w-full bg-surface-variant border-dashed border-t-2 border-secondary"
                      style={{ height: "89%" }}
                    ></div>
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant mt-2">
                    Apr (Proj)
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Est. 30 D</span>
                </div>
              </div>

              <div className="mt-4 pt-2 bg-surface-container-low px-4 py-2 flex items-center justify-between font-mono text-[11px] text-on-surface-variant border border-[#d5e3fc]">
                <span>
                  Exam Qualification Threshold:{" "}
                  <strong className="text-primary font-bold">75.0% absolute</strong>
                </span>
                <span className="text-[#047857] font-semibold">
                  +13.4% above institutional disqualification limit
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Subject-Wise Breakdown (5 of 12 cols = ~40%) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-lowest shadow-sm border border-[#d5e3fc] flex flex-col">
              <div className="p-4 bg-surface-container-low border-b border-[#d5e3fc] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Course Audits
                  </span>
                  <h2 className="font-headline text-sm font-bold text-primary">
                    Subject Telemetry Breakdown
                  </h2>
                </div>
                <span className="bg-primary text-white font-mono text-xs px-2 py-0.5 font-bold">
                  6 Courses
                </span>
              </div>

              {/* Subject Stack */}
              <div className="p-4 flex flex-col gap-3.5">
                {/* Subject 1 */}
                <div className="p-3 bg-surface-container-low/70 border border-[#d5e3fc]/60 flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-xs">
                          CS401
                        </span>
                        <span className="font-sans text-xs font-semibold text-on-surface">
                          Database Management Systems
                        </span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        Faculty: Prof. Arvind Swaminathan (DCS)
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 bg-[#ECFDF5] text-[#047857] font-mono text-[10px] font-bold uppercase border border-[#a7f3d0]">
                      Eligible
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">
                      Attended:{" "}
                      <strong className="text-primary font-bold">38 / 42</strong>{" "}
                      Classes
                    </span>
                    <span className="font-bold text-[#047857]">90.5%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container overflow-hidden">
                    <div
                      className="bg-[#047857] h-full"
                      style={{ width: "90.5%" }}
                    ></div>
                  </div>
                </div>

                {/* Subject 2 */}
                <div className="p-3 bg-surface-container-low/70 border border-[#d5e3fc]/60 flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-xs">
                          CS402
                        </span>
                        <span className="font-sans text-xs font-semibold text-on-surface">
                          Operating Systems &amp; Kernel Arch
                        </span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        Faculty: Dr. Meera Nambiar (DCS)
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 bg-[#ECFDF5] text-[#047857] font-mono text-[10px] font-bold uppercase border border-[#a7f3d0]">
                      Eligible
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">
                      Attended:{" "}
                      <strong className="text-primary font-bold">36 / 40</strong>{" "}
                      Classes
                    </span>
                    <span className="font-bold text-[#047857]">90.0%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container overflow-hidden">
                    <div
                      className="bg-[#047857] h-full"
                      style={{ width: "90.0%" }}
                    ></div>
                  </div>
                </div>

                {/* Subject 3 */}
                <div className="p-3 bg-surface-container-low/70 border border-[#d5e3fc]/60 flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-xs">
                          CS403
                        </span>
                        <span className="font-sans text-xs font-semibold text-on-surface">
                          Design &amp; Analysis of Algorithms
                        </span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        Faculty: Dr. Richard V. Thorne (DCS)
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 bg-[#ECFDF5] text-[#047857] font-mono text-[10px] font-bold uppercase border border-[#a7f3d0]">
                      Eligible
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">
                      Attended:{" "}
                      <strong className="text-primary font-bold">34 / 40</strong>{" "}
                      Classes
                    </span>
                    <span className="font-bold text-[#047857]">85.0%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container overflow-hidden">
                    <div
                      className="bg-secondary h-full"
                      style={{ width: "85.0%" }}
                    ></div>
                  </div>
                </div>

                {/* Subject 4: Automata (Safe Margin Warning) */}
                <div className="p-3 bg-surface-container-low/70 border border-[#d5e3fc]/60 flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-xs">
                          CS404
                        </span>
                        <span className="font-sans text-xs font-semibold text-on-surface">
                          Automata Theory &amp; Formal Lang
                        </span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        Faculty: Prof. K. G. Ramanathan (Math-CS)
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 bg-[#FFFBEB] text-[#B45309] font-mono text-[10px] font-bold uppercase border border-[#fde68a]">
                      Safe Margin
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">
                      Attended:{" "}
                      <strong className="text-primary font-bold">28 / 35</strong>{" "}
                      Classes
                    </span>
                    <span className="font-bold text-[#B45309]">80.0%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container overflow-hidden">
                    <div
                      className="bg-[#B45309] h-full"
                      style={{ width: "80.0%" }}
                    ></div>
                  </div>
                </div>

                {/* Subject 5: Lab */}
                <div className="p-3 bg-surface-container-low/70 border border-[#d5e3fc]/60 flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-xs">
                          CS405L
                        </span>
                        <span className="font-sans text-xs font-semibold text-on-surface">
                          DB Systems &amp; Cloud SQL Lab
                        </span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        Lab In-Charge: Er. Tanvi Desai (Lab Complex III)
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 bg-[#ECFDF5] text-[#047857] font-mono text-[10px] font-bold uppercase border border-[#a7f3d0]">
                      Eligible
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">
                      Attended:{" "}
                      <strong className="text-primary font-bold">18 / 20</strong>{" "}
                      Sessions
                    </span>
                    <span className="font-bold text-[#047857]">90.0%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container overflow-hidden">
                    <div
                      className="bg-[#047857] h-full"
                      style={{ width: "90.0%" }}
                    ></div>
                  </div>
                </div>

                {/* Subject 6: Ethics */}
                <div className="p-3 bg-surface-container-low/70 border border-[#d5e3fc]/60 flex flex-col gap-2 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-xs">
                          HS401
                        </span>
                        <span className="font-sans text-xs font-semibold text-on-surface">
                          Corporate Ethics &amp; Governance
                        </span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        Faculty: Dr. Sunita Bannerjee (Humanities)
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 bg-[#ECFDF5] text-[#047857] font-mono text-[10px] font-bold uppercase border border-[#a7f3d0]">
                      Eligible
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">
                      Attended:{" "}
                      <strong className="text-primary font-bold">18 / 22</strong>{" "}
                      Classes
                    </span>
                    <span className="font-bold text-[#047857]">81.8%</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container overflow-hidden">
                    <div
                      className="bg-secondary h-full"
                      style={{ width: "81.8%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Summary Footnote */}
              <div className="p-4 bg-surface-container border-t border-[#d5e3fc] text-xs font-mono text-on-surface-variant flex items-center justify-between">
                <span>
                  Aggregated Course Cleared:{" "}
                  <strong className="text-primary">6 / 6</strong>
                </span>
                <span className="font-bold text-primary">
                  Hall Ticket Status: UNBLOCKED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full Width Section: Recent Attendance Log Table */}
        <div className="bg-surface-container-lowest shadow-sm border border-[#d5e3fc] flex flex-col">
          {/* Table Header & Live Filters */}
          <div className="p-4 bg-surface-container-low border-b border-[#d5e3fc] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold">
                Telemetry Ledger
              </span>
              <h2 className="font-headline text-sm font-bold text-primary">
                Audit Log: Turnstile &amp; Biometric Captures
              </h2>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-on-surface-variant" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search course, room, date..."
                  className="pl-8 pr-3 py-1 bg-surface-container-lowest text-primary font-mono text-xs border border-[#c4c6cf] focus:outline-none focus:border-primary h-8"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by verification status"
                className="bg-surface-container-lowest text-on-surface font-mono text-xs px-2 py-1 border border-[#c4c6cf] h-8 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="MEDICAL">Medical Leave</option>
              </select>

              <span className="text-on-surface-variant font-mono text-xs hidden sm:inline">
                •
              </span>
              <span className="font-mono text-xs text-on-surface-variant">
                Showing {filteredLogs.length} of {attendanceLogs.length} records
              </span>
            </div>
          </div>

          {/* Compact Technical Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-surface-container font-semibold uppercase text-[11px] tracking-wider text-on-surface-variant border-b border-[#d5e3fc]">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Date &amp; Stamp</th>
                  <th className="py-2.5 px-4 font-semibold">Subject / Course Module</th>
                  <th className="py-2.5 px-4 font-semibold">Session Slot</th>
                  <th className="py-2.5 px-4 font-semibold">Facility / Hall</th>
                  <th className="py-2.5 px-4 font-semibold">Telemetry Device &amp; Source</th>
                  <th className="py-2.5 px-4 text-right font-semibold">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d5e3fc]/60 text-on-surface">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-surface-container-low transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-primary">
                      {log.date}
                      <span className="block text-[11px] text-on-surface-variant font-normal">
                        {log.time}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <span className="font-mono font-bold text-primary mr-1.5">
                        {log.code}
                      </span>
                      <span>{log.subject}</span>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {log.slot}
                    </td>
                    <td className="py-3 px-4">{log.venue}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          {log.sourceIcon}
                        </span>
                        <span>{log.source}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold border ${log.statusClass}`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Bar */}
          <div className="p-4 bg-surface-container-low border-t border-[#d5e3fc] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
            <div className="text-on-surface-variant">
              Displaying records{" "}
              <span className="font-bold text-primary">
                1 – {filteredLogs.length}
              </span>{" "}
              of 129 entries • Page 1 of 17
            </div>
            <div className="flex items-center gap-1">
              <button
                className="px-2.5 py-1 bg-surface-container text-outline cursor-not-allowed text-[11px]"
                disabled
              >
                Previous
              </button>
              <button className="px-2.5 py-1 bg-primary text-white font-bold text-[11px]">
                1
              </button>
              <button className="px-2.5 py-1 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-[11px] border border-[#c4c6cf]">
                2
              </button>
              <button className="px-2.5 py-1 bg-surface-container-lowest hover:bg-surface-container text-on-surface text-[11px] border border-[#c4c6cf]">
                3
              </button>
              <span className="px-1 text-outline">...</span>
              <button className="px-2.5 py-1 bg-surface-container-lowest hover:bg-surface-container text-primary font-bold text-[11px] border border-[#c4c6cf]">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Apply for Leave / On-Duty (OD) */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-headline text-base font-bold text-primary uppercase">
                  Apply for Leave / On-Duty (OD)
                </h3>
              </div>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="text-on-surface-variant hover:text-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5">
              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Leave Classification
                </label>
                <select className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary">
                  <option>Medical Leave (Requires Hospital/Doctor Slip)</option>
                  <option>Institutional On-Duty (OD) / Hackathon</option>
                  <option>Sports / Cultural Representation</option>
                  <option>Family Emergency / Bereavement</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Reason for Absence
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide precise details of medical treatment, competition, or representation..."
                  className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Upload Supporting Proof (Medical Slip / Event Invitation)
                </label>
                <div className="border-2 border-dashed border-[#c4c6cf] p-4 text-center cursor-pointer hover:border-primary transition-colors bg-surface/30">
                  <Upload className="w-6 h-6 text-primary mx-auto mb-1" />
                  <div className="text-xs text-primary font-medium">
                    Upload Doctor Prescription / Event Authorization
                  </div>
                  <div className="text-[10px] text-on-surface-variant mt-0.5">
                    Accepted: PDF, PNG, JPG (Max 5MB)
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setShowLeaveModal(false)}
                className="px-4 py-2 border border-[#c4c6cf] text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLeaveModal(false);
                  triggerToast(
                    "Leave application submitted to Dean. Token: #LVE-2025-104"
                  );
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

