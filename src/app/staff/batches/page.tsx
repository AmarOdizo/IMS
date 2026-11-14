"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Layers,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Search,
  Filter,
  Download,
  Grid,
  Table as TableIcon,
  CheckCircle2,
  X,
  ArrowRight,
  BookOpen,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Award,
  AlertCircle
} from "lucide-react";

interface BatchItem {
  id: string;
  code: string;
  level: "UG" | "PG";
  format: "Core Theory" | "Practical Lab" | "PG Elective";
  title: string;
  semester: string;
  section: string;
  subjectName: string;
  enrolled: number;
  schedule: string;
  venue: string;
  attendanceHealth: number;
  syllabusPacing: number;
  syllabusUnit: string;
  dateRange: string;
  slot: "MORNING" | "AFTERNOON";
}

const batchesData: BatchItem[] = [
  {
    id: "CS401",
    code: "CS-401",
    level: "UG",
    format: "Core Theory",
    title: "B.Tech Computer Science & Engineering",
    semester: "Semester 04",
    section: "Section A",
    subjectName: "Database Management Systems",
    enrolled: 62,
    schedule: "Mon, Wed, Fri (09:00 - 10:00)",
    venue: "Lecture Hall 302 (North Wing)",
    attendanceHealth: 89.4,
    syllabusPacing: 68.0,
    syllabusUnit: "Unit 4 of 5 (Concurrency Ctrl)",
    dateRange: "15 Jan 2025 – 30 May 2025",
    slot: "MORNING"
  },
  {
    id: "CS405L",
    code: "CS-405L",
    level: "UG",
    format: "Practical Lab",
    title: "B.Tech Computer Science & Engineering",
    semester: "Semester 04",
    section: "Section B",
    subjectName: "Database Systems Practicum Lab",
    enrolled: 60,
    schedule: "Tue, Thu (15:30 - 17:00)",
    venue: "Turing Computing Lab 3",
    attendanceHealth: 92.1,
    syllabusPacing: 72.0,
    syllabusUnit: "Lab 8 of 12 (Query Optimizer)",
    dateRange: "15 Jan 2025 – 30 May 2025",
    slot: "AFTERNOON"
  },
  {
    id: "CS602",
    code: "CS-602",
    level: "PG",
    format: "PG Elective",
    title: "M.Tech Data Systems & Analytics",
    semester: "Term II",
    section: "Core PG",
    subjectName: "Advanced Distributed Database Architecture",
    enrolled: 28,
    schedule: "Mon, Thu (11:00 - 12:30)",
    venue: "Room 204 (PG Block)",
    attendanceHealth: 94.8,
    syllabusPacing: 75.0,
    syllabusUnit: "Module 3 of 4 (Raft & Paxos)",
    dateRange: "15 Jan 2025 – 30 May 2025",
    slot: "MORNING"
  },
  {
    id: "CS202",
    code: "CS-202",
    level: "UG",
    format: "Core Theory",
    title: "Bachelor of Computer Applications",
    semester: "Semester 02",
    section: "Section B",
    subjectName: "Data Structures Foundation",
    enrolled: 34,
    schedule: "Wed, Thu, Fri (14:00 - 15:00)",
    venue: "Seminar Hall B (Main Block)",
    attendanceHealth: 84.6,
    syllabusPacing: 58.0,
    syllabusUnit: "Unit 3 of 5 (Non-Linear Trees)",
    dateRange: "15 Jan 2025 – 30 May 2025",
    slot: "AFTERNOON"
  }
];

const mockRosterStudents = [
  { roll: "APX-CS-001", name: "Arjun Sharma", att: 92.4, status: "Active" },
  { roll: "APX-CS-015", name: "Priya Patel", att: 94.2, status: "Active" },
  { roll: "APX-CS-042", name: "Rahul Sharma", att: 88.4, status: "Active" },
  { roll: "APX-CS-078", name: "Rohan Verma", att: 71.5, status: "At Risk" },
  { roll: "APX-CS-089", name: "Sneha Rao", att: 96.0, status: "Active" },
  { roll: "APX-CS-104", name: "Vikram Malhotra", att: 68.2, status: "At Risk" }
];

export default function StaffBatchesPage() {
  const [batches] = useState<BatchItem[]>(batchesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [slotFilter, setSlotFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [activeDrawerBatch, setActiveDrawerBatch] = useState<BatchItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const matchesSearch =
        searchQuery === "" ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.venue.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = levelFilter === "ALL" || b.level === levelFilter;
      const matchesSlot = slotFilter === "ALL" || b.slot === slotFilter;

      return matchesSearch && matchesLevel && matchesSlot;
    });
  }, [batches, searchQuery, levelFilter, slotFilter]);

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

      {/* Top Scope Sentinel Bar */}
      <div className="w-full bg-primary text-on-primary px-6 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-block w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-wider text-secondary-container font-bold">
            Scope: Faculty-Specific Viewport
          </span>
          <span className="text-white/30">|</span>
          <span className="font-mono text-xs text-white/80">
            FAC_ID: EMP-CS-2018-842 (Mr. Amit Sharma)
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-secondary-container bg-primary-container px-2 py-0.5 rounded-xs font-semibold">
            Assigned Cohorts Only (4 Total)
          </span>
          <span className="hidden sm:inline-block text-white/60">Data Verified: 09:42 IST</span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Breadcrumb & Command Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-on-surface-variant font-mono">
            <Link href="/staff" className="hover:text-primary">Staff Portal</Link>
            <ChevronRight className="h-3.5 w-3.5 text-outline" />
            <span>Academic Operations</span>
            <ChevronRight className="h-3.5 w-3.5 text-outline" />
            <span className="text-primary font-bold">My Assigned Batches</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary">
                My Assigned Batches &amp; Cohorts
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Active teaching groups, enrolled student tallies, syllabus milestones, and lecture scheduling for AY 2024-25.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDrawerBatch(batches[0])}
                className="bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold tracking-wider px-4 py-2 shadow-sm flex items-center gap-1.5 transition-colors rounded-sm"
              >
                <SlidersHorizontal className="h-4 w-4 text-secondary-container" />
                <span>Batch Console</span>
              </button>
              <button
                onClick={() => showToast("Exporting complete roster for all 4 batches (CSV/Excel)...")}
                className="bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider px-4 py-2 border border-[#cbd5e1] shadow-sm flex items-center gap-1.5 transition-colors rounded-sm"
              >
                <Download className="h-4 w-4 text-secondary" />
                <span>Export Roster (All)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-l-primary rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Active Batches
              </span>
              <Layers className="h-4 w-4 text-secondary" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-bold text-primary font-mono leading-none">04</div>
              <span className="text-[11px] font-mono uppercase text-secondary font-bold">
                Cohorts in Instruction
              </span>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs font-mono text-outline">
              <span>3 Undergrad • 1 Postgrad</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" />
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-l-secondary rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Enrolled Students
              </span>
              <Users className="h-4 w-4 text-secondary" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-bold text-primary font-mono leading-none">184</div>
              <span className="text-[11px] font-mono uppercase text-secondary font-bold">
                Verified Registrations
              </span>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs font-mono text-outline">
              <span>100% Identity Checked</span>
              <span className="text-[#047857] font-bold">+12 vs Term 1</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-l-primary-container rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Weekly Contact
              </span>
              <Clock className="h-4 w-4 text-secondary" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-bold text-primary font-mono leading-none">
                18 <span className="text-sm font-normal text-outline">hrs</span>
              </div>
              <span className="text-[11px] font-mono uppercase text-secondary font-bold">
                12 Theory • 6 Lab
              </span>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs font-mono text-outline">
              <span>Max Cap: 20 hrs/wk</span>
              <span className="bg-surface-container text-primary font-bold px-1.5 py-0.2 rounded-xs text-[10px]">
                Normal Load
              </span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-l-tertiary-container rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Avg Syllabus Pace
              </span>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </div>
            <div className="my-2">
              <div className="text-3xl font-bold text-primary font-mono leading-none">64.5%</div>
              <span className="text-[11px] font-mono uppercase text-secondary font-bold">
                Mid-Term Benchmark Met
              </span>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs font-mono text-outline">
              <span>Audited Wk 11 of 18</span>
              <span className="bg-[#ecfdf5] text-[#047857] font-bold px-1.5 py-0.2 rounded-xs text-[10px]">
                ON TRACK
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filtration Bar */}
        <div className="bg-surface-container-lowest p-3 border border-[#cbd5e1] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 rounded-sm">
          <div className="flex-1 flex items-center bg-surface-container-low px-3 py-1.5 border border-[#cbd5e1] rounded-sm">
            <Search className="h-4 w-4 text-outline mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by batch name, course code, room number or timing..."
              className="bg-transparent w-full text-xs font-mono text-on-surface placeholder:text-outline focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-surface-container-low px-2.5 py-1.5 border border-[#cbd5e1] rounded-sm text-xs font-mono">
              <span className="text-outline uppercase mr-2">Level:</span>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-transparent text-primary font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Academic Levels ({batches.length})</option>
                <option value="UG">Undergraduate (3)</option>
                <option value="PG">Postgraduate (1)</option>
              </select>
            </div>

            <div className="flex items-center bg-surface-container-low px-2.5 py-1.5 border border-[#cbd5e1] rounded-sm text-xs font-mono">
              <span className="text-outline uppercase mr-2">Slot:</span>
              <select
                value={slotFilter}
                onChange={(e) => setSlotFilter(e.target.value)}
                className="bg-transparent text-primary font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Timings</option>
                <option value="MORNING">Morning Slots</option>
                <option value="AFTERNOON">Afternoon Slots</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-surface-container p-0.5 border border-[#cbd5e1] rounded-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2.5 py-1 text-xs font-mono uppercase font-bold flex items-center gap-1 rounded-xs transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-on-surface hover:text-primary"
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-2.5 py-1 text-xs font-mono uppercase font-bold flex items-center gap-1 rounded-xs transition-colors ${
                  viewMode === "table"
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-on-surface hover:text-primary"
                }`}
              >
                <TableIcon className="h-3.5 w-3.5" />
                <span>Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Batches Display: Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredBatches.map((batch) => (
              <article
                key={batch.id}
                className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm flex flex-col justify-between hover:border-secondary transition-all rounded-sm overflow-hidden"
              >
                <div className="h-1.5 w-full bg-primary"></div>
                <div className="p-6 flex flex-col gap-4">
                  {/* Card Header & Badge Strip */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-xs uppercase px-2 py-0.5 bg-primary text-on-primary font-bold rounded-xs">
                          {batch.code}
                        </span>
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-surface-container text-primary font-bold border border-[#cbd5e1] rounded-xs">
                          {batch.level === "UG" ? "Undergraduate" : "Postgraduate"}
                        </span>
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-surface-container-low text-secondary font-semibold border border-[#eff4ff] rounded-xs">
                          {batch.format}
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-primary tracking-tight mt-1">
                        {batch.title}
                      </h2>
                      <div className="font-mono text-xs text-on-surface-variant flex items-center gap-2">
                        <span>{batch.semester}</span>
                        <span>•</span>
                        <span className="text-primary font-bold">{batch.section}</span>
                        <span>•</span>
                        <span className="text-outline">Subject: {batch.subjectName}</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end shrink-0">
                      <span className="text-2xl font-bold text-primary font-mono leading-none">
                        {batch.enrolled}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-outline">Enrolled</span>
                    </div>
                  </div>

                  {/* Schedule & Location Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-surface-container-low p-3 border border-[#cbd5e1] rounded-sm text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-secondary shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase text-outline">Schedule</span>
                        <span className="font-mono text-on-surface font-semibold">{batch.schedule}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-secondary shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase text-outline">Venue</span>
                        <span className="font-mono text-on-surface font-semibold">{batch.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Health & Syllabus Progression */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-outline uppercase text-[10px] font-mono font-bold">
                          Attendance Health
                        </span>
                        <span className="font-mono font-bold text-primary">{batch.attendanceHealth}%</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-secondary h-2"
                          style={{ width: `${batch.attendanceHealth}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono text-outline">
                        Optimal • Regular Cohort
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-outline uppercase text-[10px] font-mono font-bold">
                          Syllabus Pacing
                        </span>
                        <span className="font-mono font-bold text-primary">{batch.syllabusPacing}%</span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-2"
                          style={{ width: `${batch.syllabusPacing}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-mono text-outline truncate">
                        {batch.syllabusUnit}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Strip */}
                  <div className="flex items-center justify-between pt-1 font-mono text-xs text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-secondary" />
                      <span>{batch.dateRange}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-surface-container text-primary font-mono text-[10px] uppercase font-bold rounded-xs">
                      TERM ACTIVE
                    </span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="bg-surface-container-low p-3 grid grid-cols-3 gap-2 border-t border-[#cbd5e1]">
                  <button
                    onClick={() => setActiveDrawerBatch(batch)}
                    className="bg-surface-container-lowest hover:bg-surface-container text-primary font-mono text-xs uppercase font-bold py-2 px-1 text-center border border-[#cbd5e1] transition-colors flex items-center justify-center gap-1 rounded-xs"
                  >
                    <Users className="h-3.5 w-3.5 text-secondary" />
                    <span className="truncate">Students ({batch.enrolled})</span>
                  </button>
                  <Link
                    href={`/staff/attendance?batch=${batch.id}`}
                    className="bg-surface-container-lowest hover:bg-surface-container text-primary font-mono text-xs uppercase font-bold py-2 px-1 text-center border border-[#cbd5e1] transition-colors flex items-center justify-center gap-1 rounded-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                    <span className="truncate">Attendance</span>
                  </Link>
                  <Link
                    href={`/staff/exams?batch=${batch.id}`}
                    className="bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold py-2 px-1 text-center transition-colors flex items-center justify-center gap-1 shadow-sm rounded-xs"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-secondary-container" />
                    <span className="truncate">Marks Entry</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Batches Display: Table View */}
        {viewMode === "table" && (
          <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container font-mono text-[10px] text-primary uppercase border-b border-[#cbd5e1]">
                  <tr>
                    <th className="py-2.5 px-4">Course Code</th>
                    <th className="py-2.5 px-3">Batch &amp; Subject</th>
                    <th className="py-2.5 px-3">Schedule &amp; Room</th>
                    <th className="py-2.5 px-3 text-center">Strength</th>
                    <th className="py-2.5 px-3">Attendance Health</th>
                    <th className="py-2.5 px-3">Syllabus Covered</th>
                    <th className="py-2.5 px-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cbd5e1]">
                  {filteredBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-primary">
                        <span className="bg-primary text-on-primary px-2 py-0.5 rounded-xs">
                          {batch.code}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-primary">{batch.title}</div>
                        <span className="text-[11px] text-on-surface-variant font-mono">
                          {batch.semester} ({batch.section}) • {batch.subjectName}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-xs">
                        <div>{batch.schedule}</div>
                        <span className="text-outline text-[11px]">{batch.venue}</span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-primary">
                        {batch.enrolled}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#047857]">
                            {batch.attendanceHealth}%
                          </span>
                          <div className="w-20 bg-surface-container h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-secondary h-1.5"
                              style={{ width: `${batch.attendanceHealth}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-primary">
                            {batch.syllabusPacing}%
                          </span>
                          <div className="w-20 bg-surface-container h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-primary h-1.5"
                              style={{ width: `${batch.syllabusPacing}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActiveDrawerBatch(batch)}
                            className="px-2.5 py-1 bg-surface-container text-primary font-mono text-[11px] uppercase font-bold hover:bg-surface-container-high border border-[#cbd5e1] rounded-xs"
                          >
                            Roster
                          </button>
                          <Link
                            href={`/staff/attendance?batch=${batch.id}`}
                            className="px-2.5 py-1 bg-primary text-on-primary font-mono text-[11px] uppercase font-bold hover:bg-primary-container rounded-xs"
                          >
                            Register
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Side Drawer: Batch Student Roster Console */}
      {activeDrawerBatch && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex justify-end">
          <div className="bg-surface-container-lowest w-full max-w-xl h-full shadow-2xl p-6 flex flex-col justify-between border-l-2 border-primary animate-in slide-in-from-right duration-200 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <span className="bg-primary text-on-primary font-mono text-xs px-2 py-0.5 uppercase font-bold rounded-xs">
                    {activeDrawerBatch.code}
                  </span>
                  <div>
                    <h3 className="text-base font-bold uppercase text-primary">
                      {activeDrawerBatch.title}
                    </h3>
                    <span className="text-xs font-mono text-on-surface-variant">
                      {activeDrawerBatch.semester} ({activeDrawerBatch.section}) • {activeDrawerBatch.enrolled} Students Enrolled
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveDrawerBatch(null)}
                  className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors rounded-sm"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Batch Info Ribbon */}
              <div className="my-4 p-3 bg-surface-container-low border border-[#cbd5e1] grid grid-cols-2 gap-3 text-xs font-mono rounded-sm">
                <div>
                  <span className="text-[10px] text-outline uppercase block">Timing &amp; Slot</span>
                  <span className="font-semibold text-primary">{activeDrawerBatch.schedule}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline uppercase block">Assigned Hall</span>
                  <span className="font-semibold text-primary">{activeDrawerBatch.venue}</span>
                </div>
              </div>

              {/* Roster Table */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase font-mono text-primary">
                    Candidate Roster Sample
                  </h4>
                  <Link
                    href={`/staff/students?batch=${activeDrawerBatch.id}`}
                    className="text-xs font-mono text-secondary font-bold hover:underline"
                  >
                    View All {activeDrawerBatch.enrolled} Students &rarr;
                  </Link>
                </div>

                <div className="border border-[#cbd5e1] rounded-sm overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-container font-mono text-[10px] text-primary uppercase border-b border-[#cbd5e1]">
                      <tr>
                        <th className="py-2 px-3">Roll No</th>
                        <th className="py-2 px-3">Student Name</th>
                        <th className="py-2 px-3 text-center">Attendance</th>
                        <th className="py-2 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#cbd5e1]">
                      {mockRosterStudents.map((stu) => (
                        <tr key={stu.roll} className="hover:bg-surface-container-low">
                          <td className="py-2 px-3 font-mono font-bold text-primary">{stu.roll}</td>
                          <td className="py-2 px-3 text-on-surface font-medium">{stu.name}</td>
                          <td className="py-2 px-3 text-center font-mono font-bold">
                            <span
                              className={
                                stu.att >= 75
                                  ? "text-[#047857]"
                                  : "text-error"
                              }
                            >
                              {stu.att}%
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right">
                            <span
                              className={`px-1.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded-xs ${
                                stu.status === "Active"
                                  ? "bg-[#ecfdf5] text-[#047857]"
                                  : "bg-[#fef2f2] text-error"
                              }`}
                            >
                              {stu.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-[#cbd5e1] flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  showToast(`Exporting roster for ${activeDrawerBatch.code}...`);
                  setActiveDrawerBatch(null);
                }}
                className="px-4 py-2 bg-surface-container text-primary font-mono text-xs uppercase font-bold hover:bg-surface-container-high transition-colors border border-[#cbd5e1] rounded-sm"
              >
                Export CSV
              </button>
              <div className="flex items-center gap-2">
                <Link
                  href={`/staff/attendance?batch=${activeDrawerBatch.id}`}
                  className="px-4 py-2 bg-primary text-on-primary font-mono text-xs uppercase font-bold hover:bg-primary-container transition-colors rounded-sm"
                >
                  Mark Attendance
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
