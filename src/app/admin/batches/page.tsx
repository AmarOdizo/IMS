"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Plus,
  Clock,
  Building,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Download,
  MoreVertical,
  X,
  LayoutGrid,
  List,
  RotateCcw
} from "lucide-react";

interface Batch {
  id: string;
  code: string;
  title: string;
  program: string;
  level: "UG" | "PG";
  levelLabel: string;
  semester: string;
  section: string;
  subject: string;
  enrolled: number;
  capacity: number;
  schedule: string;
  slot: "MORNING" | "AFTERNOON" | "EVENING";
  venue: string;
  faculty: string;
  facultyId: string;
  attendanceHealth: number;
  syllabusPace: number;
  status: "ACTIVE" | "ARCHIVED" | "UPCOMING";
  startDate: string;
  endDate: string;
}

const INITIAL_BATCHES: Batch[] = [
  {
    id: "b-1",
    code: "CS-401",
    title: "B.Tech Computer Science & Engineering",
    program: "B.Tech CSE",
    level: "UG",
    levelLabel: "Undergraduate",
    semester: "Semester 04",
    section: "Section A",
    subject: "Database Management Systems",
    enrolled: 62,
    capacity: 65,
    schedule: "Mon, Wed, Fri (09:00 - 10:00)",
    slot: "MORNING",
    venue: "Lecture Hall 302 (North Wing)",
    faculty: "Dr. Margaret Vance",
    facultyId: "FAC-CS-001",
    attendanceHealth: 89.4,
    syllabusPace: 68.0,
    status: "ACTIVE",
    startDate: "15 Jan 2025",
    endDate: "30 May 2025"
  },
  {
    id: "b-2",
    code: "CS-405L",
    title: "B.Tech Computer Science & Engineering",
    program: "B.Tech CSE",
    level: "UG",
    levelLabel: "Undergraduate",
    semester: "Semester 04",
    section: "Section B",
    subject: "Database Systems & Cloud SQL Lab",
    enrolled: 58,
    capacity: 60,
    schedule: "Tue, Thu (15:30 - 17:30)",
    slot: "AFTERNOON",
    venue: "Turing Lab B-12 (Ground Floor)",
    faculty: "Mr. Amit Sharma",
    facultyId: "EMP-CS-2018-842",
    attendanceHealth: 91.2,
    syllabusPace: 71.4,
    status: "ACTIVE",
    startDate: "15 Jan 2025",
    endDate: "30 May 2025"
  },
  {
    id: "b-3",
    code: "CS-602",
    title: "M.Tech Data Systems & Analytics",
    program: "M.Tech DSA",
    level: "PG",
    levelLabel: "Postgraduate",
    semester: "Semester 02",
    section: "Single Cohort",
    subject: "Adv. Distributed DB Architecture",
    enrolled: 28,
    capacity: 30,
    schedule: "Tue, Thu (11:00 - 12:30)",
    slot: "MORNING",
    venue: "Room 204 (PG Academic Wing)",
    faculty: "Dr. S. Nair",
    facultyId: "FAC-CS-004",
    attendanceHealth: 94.0,
    syllabusPace: 66.7,
    status: "ACTIVE",
    startDate: "01 Feb 2025",
    endDate: "15 Jun 2025"
  },
  {
    id: "b-4",
    code: "AI-301",
    title: "B.Tech Artificial Intelligence & Data",
    program: "B.Tech AI-DS",
    level: "UG",
    levelLabel: "Undergraduate",
    semester: "Semester 03",
    section: "Section A",
    subject: "Deep Learning & Neural Architectures",
    enrolled: 64,
    capacity: 65,
    schedule: "Mon, Wed, Fri (10:15 - 11:15)",
    slot: "MORNING",
    venue: "Hall 104 (East AI Center)",
    faculty: "Prof. Elena Rostova",
    facultyId: "FAC-AI-012",
    attendanceHealth: 92.5,
    syllabusPace: 65.0,
    status: "ACTIVE",
    startDate: "15 Jan 2025",
    endDate: "30 May 2025"
  },
  {
    id: "b-5",
    code: "MBA-102",
    title: "MBA Systems & Financial Analytics",
    program: "MBA Analytics",
    level: "PG",
    levelLabel: "Postgraduate",
    semester: "Semester 02",
    section: "Cohort A",
    subject: "Strategic Management & FinTech Models",
    enrolled: 45,
    capacity: 50,
    schedule: "Mon to Thu (14:00 - 15:30)",
    slot: "AFTERNOON",
    venue: "Management Block Hall 1",
    faculty: "Dr. Arvind Patel",
    facultyId: "FAC-MGT-002",
    attendanceHealth: 95.0,
    syllabusPace: 70.0,
    status: "ACTIVE",
    startDate: "10 Jan 2025",
    endDate: "20 May 2025"
  },
  {
    id: "b-6",
    code: "ECE-501",
    title: "B.Tech Electronics & Comm. Eng.",
    program: "B.Tech ECE",
    level: "UG",
    levelLabel: "Undergraduate",
    semester: "Semester 05",
    section: "Section A",
    subject: "Embedded IoT Architecture",
    enrolled: 55,
    capacity: 60,
    schedule: "Mon, Wed, Fri (11:30 - 12:30)",
    slot: "MORNING",
    venue: "Hall 201 (Science Block)",
    faculty: "Dr. Rajesh Iyer",
    facultyId: "FAC-ECE-005",
    attendanceHealth: 88.0,
    syllabusPace: 62.0,
    status: "ACTIVE",
    startDate: "15 Jan 2025",
    endDate: "30 May 2025"
  }
];

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [slotFilter, setSlotFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Drawer & Modals
  const [activeBatchDrawer, setActiveBatchDrawer] = useState<Batch | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Batch Form State
  const [newBatch, setNewBatch] = useState({
    code: "",
    title: "B.Tech Computer Science & Engineering",
    program: "B.Tech CSE",
    level: "UG" as "UG" | "PG",
    semester: "Semester 04",
    section: "Section C",
    subject: "",
    capacity: 60,
    schedule: "Mon, Wed, Fri (13:00 - 14:00)",
    slot: "AFTERNOON" as "MORNING" | "AFTERNOON" | "EVENING",
    venue: "Lecture Hall 204",
    faculty: "Dr. Margaret Vance"
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredBatches = batches.filter(b => {
    if (levelFilter !== "ALL" && b.level !== levelFilter) return false;
    if (slotFilter !== "ALL" && b.slot !== slotFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const match =
        b.code.toLowerCase().includes(q) ||
        b.title.toLowerCase().includes(q) ||
        b.subject.toLowerCase().includes(q) ||
        b.venue.toLowerCase().includes(q) ||
        b.faculty.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBatch.code || !newBatch.subject) {
      alert("Please provide Batch Code and Subject Name.");
      return;
    }

    const created: Batch = {
      id: `b-${Date.now()}`,
      code: newBatch.code,
      title: newBatch.title,
      program: newBatch.program,
      level: newBatch.level,
      levelLabel: newBatch.level === "UG" ? "Undergraduate" : "Postgraduate",
      semester: newBatch.semester,
      section: newBatch.section,
      subject: newBatch.subject,
      enrolled: 0,
      capacity: newBatch.capacity,
      schedule: newBatch.schedule,
      slot: newBatch.slot,
      venue: newBatch.venue,
      faculty: newBatch.faculty,
      facultyId: "FAC-GEN-001",
      attendanceHealth: 100,
      syllabusPace: 0,
      status: "ACTIVE",
      startDate: "01 Feb 2025",
      endDate: "30 Jun 2025"
    };

    setBatches([created, ...batches]);
    setIsCreateModalOpen(false);
    showToast(`Batch ${created.code} successfully created.`);
  };

  return (
    <div className="p-5 md:p-7 space-y-5 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Header Banner - Clean, Balanced, Zero Redundant Text */}
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/50 via-indigo-50/20 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Batches &amp; Cohort Registry
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                ACTIVE COHORTS: <strong>{batches.length}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                ENROLLED: <strong>{batches.reduce((sum, b) => sum + b.enrolled, 0)}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                UTILIZED: <strong>87.5%</strong>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons - Vertically Centered & Balanced */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
            <button
              onClick={() => showToast("Exporting comprehensive Batch Cohort Registry (Excel)...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export Roster</span>
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Batch</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Telemetry KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Active Cohorts
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">{batches.length} Cohorts</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="font-medium text-slate-700">4 Undergrad</span>
              <span>•</span>
              <span className="font-medium text-slate-700">2 Postgrad</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Enrolled
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">
              {batches.reduce((sum, b) => sum + b.enrolled, 0)} Students
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                87.5%
              </span>
              <span>Cap: 360 Seats</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Weekly Contact Hours
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50/80 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">92 <span className="text-sm font-normal text-slate-400">hrs</span></div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="font-medium text-slate-700">68 Theory</span>
              <span>•</span>
              <span className="font-medium text-slate-700">24 Lab</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Avg Syllabus Pace
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">67.2%</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
                On Track
              </span>
              <span>Audited Wk 11</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
            placeholder="Search by batch name, course code, venue, or faculty..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={levelFilter}
            onChange={e => setLevelFilter(e.target.value)}
            className="bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] text-slate-800"
          >
            <option value="ALL">All Levels</option>
            <option value="UG">Undergraduate (UG)</option>
            <option value="PG">Postgraduate (PG)</option>
          </select>

          <select
            value={slotFilter}
            onChange={e => setSlotFilter(e.target.value)}
            className="bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] text-slate-800"
          >
            <option value="ALL">All Shifts</option>
            <option value="MORNING">Morning Slots</option>
            <option value="AFTERNOON">Afternoon Slots</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery("");
              setLevelFilter("ALL");
              setSlotFilter("ALL");
            }}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Grid / Table Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === "grid" ? "bg-[#3D405B] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === "table" ? "bg-[#3D405B] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. GRID VIEW */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredBatches.map(batch => (
            <article
              key={batch.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div
                className={`h-1.5 w-full ${
                  batch.level === "UG" ? "bg-blue-600" : "bg-purple-600"
                }`}
              ></div>

              <div className="p-5 flex flex-col gap-3.5">
                {/* Header & Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-xs px-2 py-0.5 bg-[#3D405B] text-white font-bold rounded">
                        {batch.code}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">
                        {batch.levelLabel}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200/60">
                        {batch.semester} &bull; {batch.section}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-[#3D405B] tracking-tight">
                      {batch.title}
                    </h2>
                    <div className="text-xs text-slate-500">
                      Subject: <strong className="text-slate-800">{batch.subject}</strong>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-2xl font-bold text-[#3D405B] block font-mono">
                      {batch.enrolled}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      / {batch.capacity} Enrolled
                    </span>
                  </div>
                </div>

                {/* Schedule & Venue Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Schedule</span>
                      <span className="font-mono text-slate-700 font-medium">{batch.schedule}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">Venue &amp; Lead</span>
                      <span className="font-mono text-slate-700 font-medium truncate block">{batch.venue} &bull; {batch.faculty}</span>
                    </div>
                  </div>
                </div>

                {/* Health & Syllabus Progress Bars */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Attendance Health</span>
                      <span className="font-mono font-bold text-[#3D405B]">{batch.attendanceHealth}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full"
                        style={{ width: `${batch.attendanceHealth}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Syllabus Pacing</span>
                      <span className="font-mono font-bold text-[#3D405B]">{batch.syllabusPace}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#3D405B] h-full rounded-full"
                        style={{ width: `${batch.syllabusPace}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="bg-slate-50/80 p-3 grid grid-cols-3 gap-2 border-t border-slate-100">
                <button
                  onClick={() => setActiveBatchDrawer(batch)}
                  className="py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">Roster ({batch.enrolled})</span>
                </button>
                <Link
                  href="/admin/attendance"
                  className="py-1.5 px-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate">Attendance</span>
                </Link>
                <Link
                  href="/admin/exams"
                  className="py-1.5 px-2 bg-[#3D405B] hover:bg-[#2E3046] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="truncate">Marks Ledger</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* 5. TABLE VIEW */}
      {viewMode === "table" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 text-[10px] uppercase tracking-wider font-semibold border-b border-slate-100">
                  <th className="py-2.5 px-4 font-semibold">Batch Code</th>
                  <th className="py-2.5 px-4 font-semibold">Program &amp; Subject</th>
                  <th className="py-2.5 px-4 font-semibold">Section</th>
                  <th className="py-2.5 px-4 font-semibold">Enrolled / Cap</th>
                  <th className="py-2.5 px-4 font-semibold">Schedule &amp; Venue</th>
                  <th className="py-2.5 px-4 font-semibold">Lead Faculty</th>
                  <th className="py-2.5 px-4 font-semibold">Attendance</th>
                  <th className="py-2.5 px-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBatches.map(batch => (
                  <tr key={batch.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#3D405B]">
                      {batch.code}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{batch.subject}</div>
                      <div className="text-slate-400 text-[11px]">{batch.title}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">{batch.section}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {batch.enrolled} / {batch.capacity}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <div className="font-mono">{batch.schedule}</div>
                      <div className="text-slate-400 text-[11px]">{batch.venue}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{batch.faculty}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-emerald-600">
                      {batch.attendanceHealth}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setActiveBatchDrawer(batch)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. DRAWER: BATCH ROSTER */}
      {activeBatchDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-200">
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-[#3D405B] text-white font-bold rounded">
                    {activeBatchDrawer.code}
                  </span>
                  <h3 className="text-base font-bold text-[#3D405B] mt-1">
                    {activeBatchDrawer.subject}
                  </h3>
                  <div className="text-xs text-slate-500">
                    {activeBatchDrawer.title} &bull; {activeBatchDrawer.semester}
                  </div>
                </div>
                <button
                  onClick={() => setActiveBatchDrawer(null)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Schedule</div>
                  <div className="font-bold text-[#3D405B] font-mono">{activeBatchDrawer.schedule}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Classroom</div>
                  <div className="font-bold text-[#3D405B] font-mono">{activeBatchDrawer.venue}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Faculty Lead</div>
                  <div className="font-bold text-[#3D405B]">{activeBatchDrawer.faculty}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Enrolled / Cap</div>
                  <div className="font-bold text-emerald-700 font-mono">
                    {activeBatchDrawer.enrolled} / {activeBatchDrawer.capacity} Seats
                  </div>
                </div>
              </div>

              {/* Sample Enrolled Students Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Registered Students Roster (Sample)
                  </span>
                  <span className="font-mono text-xs text-blue-600 font-semibold">
                    {activeBatchDrawer.enrolled} Total Records
                  </span>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="p-2.5">Roll No</th>
                        <th className="p-2.5">Student Name</th>
                        <th className="p-2.5">Attendance</th>
                        <th className="p-2.5 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                      <tr>
                        <td className="p-2.5 font-bold text-[#3D405B]">APX24CS001</td>
                        <td className="p-2.5 font-sans font-medium text-slate-800">Alexander Vance</td>
                        <td className="p-2.5 text-emerald-700 font-semibold">96.4%</td>
                        <td className="p-2.5 text-right font-sans text-emerald-700 font-semibold">ACTIVE</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#3D405B]">APX24CS002</td>
                        <td className="p-2.5 font-sans font-medium text-slate-800">Maya R. Chen</td>
                        <td className="p-2.5 text-emerald-700 font-semibold">94.8%</td>
                        <td className="p-2.5 text-right font-sans text-emerald-700 font-semibold">ACTIVE</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#3D405B]">APX24CS003</td>
                        <td className="p-2.5 font-sans font-medium text-slate-800">Karthik S. Nair</td>
                        <td className="p-2.5 text-blue-700 font-semibold">88.2%</td>
                        <td className="p-2.5 text-right font-sans text-emerald-700 font-semibold">ACTIVE</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold text-[#3D405B]">APX24CS004</td>
                        <td className="p-2.5 font-sans font-medium text-slate-800">Sophia Jenkins</td>
                        <td className="p-2.5 text-emerald-700 font-semibold">91.0%</td>
                        <td className="p-2.5 text-right font-sans text-emerald-700 font-semibold">ACTIVE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  showToast(`Roster downloaded for ${activeBatchDrawer.code}`);
                  setActiveBatchDrawer(null);
                }}
                className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setActiveBatchDrawer(null)}
                className="px-5 py-2 bg-[#3D405B] text-white font-semibold rounded-xl text-xs hover:bg-[#2E3046] transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: + CREATE NEW BATCH */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-[#3D405B]">
                  Create New Cohort / Batch
                </h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Batch Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS-408"
                    value={newBatch.code}
                    onChange={e => setNewBatch({ ...newBatch, code: e.target.value })}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] font-mono text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Academic Level
                  </label>
                  <select
                    value={newBatch.level}
                    onChange={e => setNewBatch({ ...newBatch, level: e.target.value as "UG" | "PG" })}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] text-xs"
                  >
                    <option value="UG">Undergraduate (UG)</option>
                    <option value="PG">Postgraduate (PG)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700 uppercase text-[10px]">
                  Subject / Course Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Computing & Microservices"
                  value={newBatch.subject}
                  onChange={e => setNewBatch({ ...newBatch, subject: e.target.value })}
                  className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Semester
                  </label>
                  <input
                    type="text"
                    value={newBatch.semester}
                    onChange={e => setNewBatch({ ...newBatch, semester: e.target.value })}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Section
                  </label>
                  <input
                    type="text"
                    value={newBatch.section}
                    onChange={e => setNewBatch({ ...newBatch, section: e.target.value })}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={newBatch.capacity}
                    onChange={e => setNewBatch({ ...newBatch, capacity: parseInt(e.target.value) || 60 })}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Venue / Classroom
                  </label>
                  <input
                    type="text"
                    value={newBatch.venue}
                    onChange={e => setNewBatch({ ...newBatch, venue: e.target.value })}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Faculty Lead
                  </label>
                  <input
                    type="text"
                    value={newBatch.faculty}
                    onChange={e => setNewBatch({ ...newBatch, faculty: e.target.value })}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 font-semibold text-slate-700 rounded-xl hover:bg-slate-50 text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                >
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
