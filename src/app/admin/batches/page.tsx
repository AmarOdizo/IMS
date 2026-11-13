"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Building,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Download,
  Sliders,
  ChevronRight,
  MoreVertical,
  X,
  User,
  Layers,
  LayoutGrid,
  List
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
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 shadow-xl border border-secondary flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-secondary" />
          <span className="font-mono-data text-body-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner / Breadcrumb Bar */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/30 px-gutter-desktop py-space-md shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              <span>IMS Core</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Academic Operations</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary font-semibold">Batches & Cohort Registry</span>
            </nav>
            <div className="flex items-baseline gap-space-sm">
              <h1 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tight font-bold">
                Batches & Cohort Registry
              </h1>
              <span className="font-mono-data text-mono-data text-secondary px-2 py-0.5 bg-surface-container-high border border-outline-variant/40 font-semibold">
                AY 2024-25 • TERM 2
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Central Institutional Cohorts, Lecture Scheduling, Venue Allocations & Faculty Workload Links
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create New Batch</span>
            </button>
            <button
              onClick={() => showToast("Exporting comprehensive Batch Cohort Registry (Excel)...")}
              className="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider border border-outline-variant/60 hover:bg-surface-container-low transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 text-secondary" />
              <span>Export Roster</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Space */}
      <div className="p-gutter-desktop space-y-gutter-desktop">
        {/* Quick Operational Telemetry Cards (4 Tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Tile 1 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div>
              <div className="flex items-center justify-between text-on-surface-variant mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Active Cohorts
                </span>
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-headline-xl text-headline-xl text-primary font-bold">
                {batches.length}
              </div>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">
                Cohorts in Instruction
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between font-mono-data text-body-sm text-on-surface-variant">
              <span>4 Undergrad • 2 Postgrad</span>
              <span className="text-secondary font-semibold">100% Active</span>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between text-on-surface-variant mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Total Enrolled Students
                </span>
                <GraduationCap className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-headline-xl text-headline-xl text-primary font-bold">
                {batches.reduce((sum, b) => sum + b.enrolled, 0)}
              </div>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">
                Verified Registrations
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between font-mono-data text-body-sm text-on-surface-variant">
              <span>Campus Cap: 360 Seats</span>
              <span className="text-secondary font-semibold">87.5% Utilized</span>
            </div>
          </div>

          {/* Tile 3 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-tint"></div>
            <div>
              <div className="flex items-center justify-between text-on-surface-variant mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Weekly Contact Hours
                </span>
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-headline-xl text-headline-xl text-primary font-bold">
                92 <span className="text-headline-sm font-normal text-on-surface-variant">hrs</span>
              </div>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">
                68 Theory • 24 Lab
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between font-mono-data text-body-sm text-on-surface-variant">
              <span>6 Lecture Theatres</span>
              <span className="text-primary font-semibold">0 Scheduling Clashes</span>
            </div>
          </div>

          {/* Tile 4 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container"></div>
            <div>
              <div className="flex items-center justify-between text-on-surface-variant mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Avg Syllabus Pace
                </span>
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-headline-xl text-headline-xl text-primary font-bold">
                67.2%
              </div>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">
                Mid-Term Benchmark Met
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-outline-variant/20 flex items-center justify-between font-mono-data text-body-sm text-on-surface-variant">
              <span>Audited Wk 11 of 18</span>
              <span className="bg-surface-container-highest px-1.5 py-0.5 text-primary font-bold">
                ON TRACK
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="bg-surface-container-lowest p-space-sm shadow-sm border border-outline-variant/40 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm">
          <div className="flex-1 flex items-center bg-surface-container-low px-space-sm py-space-xs border border-outline-variant/30">
            <Search className="w-4 h-4 text-on-surface-variant mr-space-xs" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none"
              placeholder="Search by batch name, course code, room number, or faculty..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-space-xs">
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="bg-surface-container-low px-3 py-1.5 font-mono-data text-label-sm uppercase tracking-wider text-primary focus:outline-none border border-outline-variant/30"
            >
              <option value="ALL">All Academic Levels</option>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
            </select>

            <select
              value={slotFilter}
              onChange={e => setSlotFilter(e.target.value)}
              className="bg-surface-container-low px-3 py-1.5 font-mono-data text-label-sm uppercase tracking-wider text-primary focus:outline-none border border-outline-variant/30"
            >
              <option value="ALL">All Shift Timings</option>
              <option value="MORNING">Morning Slots</option>
              <option value="AFTERNOON">Afternoon Slots</option>
            </select>

            {/* Grid / Table Toggle */}
            <div className="flex items-center bg-surface-container-high p-0.5 border border-outline-variant/30">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-space-sm py-1 font-label-sm text-label-sm uppercase flex items-center gap-1 transition-all ${
                  viewMode === "grid" ? "bg-primary text-on-primary" : "text-on-surface hover:text-primary"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-space-sm py-1 font-label-sm text-label-sm uppercase flex items-center gap-1 transition-all ${
                  viewMode === "table" ? "bg-primary text-on-primary" : "text-on-surface hover:text-primary"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-space-lg">
            {filteredBatches.map(batch => (
              <article
                key={batch.id}
                className="bg-surface-container-lowest shadow-md border border-outline-variant/40 flex flex-col justify-between group hover:shadow-xl transition-shadow relative overflow-hidden"
              >
                <div
                  className={`h-1.5 w-full ${
                    batch.level === "UG" ? "bg-primary" : "bg-secondary"
                  }`}
                ></div>

                <div className="p-space-lg flex flex-col gap-space-md">
                  {/* Header & Badges */}
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center gap-space-xs flex-wrap">
                        <span className="font-mono-data text-mono-data uppercase px-space-xs py-0.5 bg-primary-container text-on-primary font-bold">
                          {batch.code}
                        </span>
                        <span className="font-label-sm text-label-sm uppercase px-space-xs py-0.5 bg-surface-container-high text-primary font-semibold">
                          {batch.levelLabel}
                        </span>
                        <span className="font-label-sm text-label-sm uppercase px-space-xs py-0.5 bg-surface-container-low text-secondary font-semibold">
                          {batch.semester} • {batch.section}
                        </span>
                      </div>
                      <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold group-hover:text-secondary transition-colors">
                        {batch.title}
                      </h2>
                      <div className="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-space-xs">
                        <span className="text-outline">Subject:</span>
                        <span className="text-primary font-semibold">{batch.subject}</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <span className="font-headline-lg text-headline-lg text-primary leading-tight font-bold">
                        {batch.enrolled}
                      </span>
                      <span className="font-label-sm text-label-sm uppercase text-outline">
                        / {batch.capacity} Enrolled
                      </span>
                    </div>
                  </div>

                  {/* Schedule & Venue Matrix */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs bg-surface-container-low p-space-sm border border-outline-variant/30">
                    <div className="flex items-center gap-space-xs">
                      <Clock className="w-5 h-5 text-secondary" />
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline">Schedule</span>
                        <span className="font-mono-data text-mono-data text-on-surface font-semibold">
                          {batch.schedule}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <Building className="w-5 h-5 text-secondary" />
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm uppercase text-outline">Venue & Lead</span>
                        <span className="font-mono-data text-mono-data text-on-surface font-semibold truncate">
                          {batch.venue} • {batch.faculty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Health & Syllabus Progress Bars */}
                  <div className="grid grid-cols-2 gap-space-md pt-space-xs">
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                          Attendance Health
                        </span>
                        <span className="font-mono-data text-mono-data text-primary font-bold">
                          {batch.attendanceHealth}%
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 overflow-hidden">
                        <div
                          className="bg-secondary h-2"
                          style={{ width: `${batch.attendanceHealth}%` }}
                        ></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline">
                        Optimal Cohort Baseline
                      </span>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                          Syllabus Pacing
                        </span>
                        <span className="font-mono-data text-mono-data text-primary font-bold">
                          {batch.syllabusPace}%
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 overflow-hidden">
                        <div
                          className="bg-primary h-2"
                          style={{ width: `${batch.syllabusPace}%` }}
                        ></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline">
                        Audited on Milestone
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="bg-surface-container-low p-space-sm grid grid-cols-3 gap-space-xs border-t border-outline-variant/30">
                  <button
                    onClick={() => setActiveBatchDrawer(batch)}
                    className="bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-label-md uppercase py-space-sm px-space-xs text-center transition-colors flex items-center justify-center gap-1 border border-outline-variant/30 font-semibold"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span className="truncate">Roster ({batch.enrolled})</span>
                  </button>
                  <Link
                    href="/admin/attendance"
                    className="bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-label-md uppercase py-space-sm px-space-xs text-center transition-colors flex items-center justify-center gap-1 border border-outline-variant/30 font-semibold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                    <span className="truncate">Attendance</span>
                  </Link>
                  <Link
                    href="/admin/exams"
                    className="bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase py-space-sm px-space-xs text-center transition-colors flex items-center justify-center gap-1 font-semibold"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="truncate">Marks Ledger</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* TABLE VIEW */}
        {viewMode === "table" && (
          <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/30">
                  <tr>
                    <th className="py-3 px-4">Batch Code</th>
                    <th className="py-3 px-4">Program & Subject</th>
                    <th className="py-3 px-4">Section</th>
                    <th className="py-3 px-4">Enrolled / Cap</th>
                    <th className="py-3 px-4">Schedule & Venue</th>
                    <th className="py-3 px-4">Lead Faculty</th>
                    <th className="py-3 px-4">Attendance</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                  {filteredBatches.map(batch => (
                    <tr key={batch.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-3 px-4 font-mono-data font-bold text-primary">
                        {batch.code}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-primary">{batch.subject}</div>
                        <div className="text-on-surface-variant text-[0.75rem]">{batch.title}</div>
                      </td>
                      <td className="py-3 px-4 font-mono-data">{batch.section}</td>
                      <td className="py-3 px-4 font-mono-data">
                        {batch.enrolled} / {batch.capacity}
                      </td>
                      <td className="py-3 px-4 font-mono-data text-[0.75rem]">
                        <div>{batch.schedule}</div>
                        <div className="text-on-surface-variant">{batch.venue}</div>
                      </td>
                      <td className="py-3 px-4 font-medium">{batch.faculty}</td>
                      <td className="py-3 px-4 font-mono-data font-semibold text-secondary">
                        {batch.attendanceHealth}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setActiveBatchDrawer(batch)}
                          className="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold mr-1"
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
      </div>

      {/* DRAWER: BATCH ROSTER & CONSOLE */}
      {activeBatchDrawer && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex justify-end">
          <div className="bg-surface-container-lowest w-full max-w-xl h-full shadow-2xl flex flex-col justify-between border-l border-outline-variant/60 animate-in slide-in-from-right duration-200">
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div>
                  <span className="font-mono-data text-label-sm uppercase px-2 py-0.5 bg-primary-container text-on-primary font-bold">
                    {activeBatchDrawer.code}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm uppercase text-primary font-bold mt-1">
                    {activeBatchDrawer.subject}
                  </h3>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    {activeBatchDrawer.title} • {activeBatchDrawer.semester}
                  </div>
                </div>
                <button
                  onClick={() => setActiveBatchDrawer(null)}
                  className="p-1 hover:bg-surface-container"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono-data text-[0.75rem]">
                <div className="p-3 bg-surface-container-low border border-outline-variant/30 space-y-1">
                  <div className="text-on-surface-variant uppercase font-semibold">Schedule</div>
                  <div className="font-bold text-primary">{activeBatchDrawer.schedule}</div>
                </div>
                <div className="p-3 bg-surface-container-low border border-outline-variant/30 space-y-1">
                  <div className="text-on-surface-variant uppercase font-semibold">Classroom</div>
                  <div className="font-bold text-primary">{activeBatchDrawer.venue}</div>
                </div>
                <div className="p-3 bg-surface-container-low border border-outline-variant/30 space-y-1">
                  <div className="text-on-surface-variant uppercase font-semibold">Faculty Lead</div>
                  <div className="font-bold text-primary">{activeBatchDrawer.faculty}</div>
                </div>
                <div className="p-3 bg-surface-container-low border border-outline-variant/30 space-y-1">
                  <div className="text-on-surface-variant uppercase font-semibold">Enrolled / Cap</div>
                  <div className="font-bold text-secondary">
                    {activeBatchDrawer.enrolled} / {activeBatchDrawer.capacity} Seats
                  </div>
                </div>
              </div>

              {/* Sample Enrolled Students Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Registered Students Roster (Sample)
                  </span>
                  <span className="font-mono-data text-label-sm text-secondary font-semibold">
                    {activeBatchDrawer.enrolled} Total Records
                  </span>
                </div>
                <div className="border border-outline-variant/30 overflow-x-auto">
                  <table className="w-full text-left font-body-sm text-body-sm">
                    <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      <tr>
                        <th className="p-2">Roll No</th>
                        <th className="p-2">Student Name</th>
                        <th className="p-2">Attendance</th>
                        <th className="p-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container font-mono-data text-[0.75rem]">
                      <tr>
                        <td className="p-2 font-bold text-primary">APX24CS001</td>
                        <td className="p-2 font-sans font-medium">Alexander Vance</td>
                        <td className="p-2 text-secondary font-semibold">96.4%</td>
                        <td className="p-2 text-right font-sans text-secondary font-semibold">ACTIVE</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-primary">APX24CS002</td>
                        <td className="p-2 font-sans font-medium">Maya R. Chen</td>
                        <td className="p-2 text-secondary font-semibold">94.8%</td>
                        <td className="p-2 text-right font-sans text-secondary font-semibold">ACTIVE</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-primary">APX24CS003</td>
                        <td className="p-2 font-sans font-medium">Karthik S. Nair</td>
                        <td className="p-2 text-primary font-semibold">88.2%</td>
                        <td className="p-2 text-right font-sans text-primary font-semibold">ACTIVE</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-primary">APX24CS004</td>
                        <td className="p-2 font-sans font-medium">Sophia Jenkins</td>
                        <td className="p-2 text-primary font-semibold">91.0%</td>
                        <td className="p-2 text-right font-sans text-primary font-semibold">ACTIVE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  showToast(`Roster downloaded for ${activeBatchDrawer.code}`);
                  setActiveBatchDrawer(null);
                }}
                className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setActiveBatchDrawer(null)}
                className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-primary-container"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: + CREATE NEW BATCH */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Create New Cohort / Batch
                </h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Batch Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CS-408"
                    value={newBatch.code}
                    onChange={e => setNewBatch({ ...newBatch, code: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 font-mono-data text-body-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Academic Level
                  </label>
                  <select
                    value={newBatch.level}
                    onChange={e => setNewBatch({ ...newBatch, level: e.target.value as "UG" | "PG" })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                  >
                    <option value="UG">Undergraduate</option>
                    <option value="PG">Postgraduate</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                  Subject / Course Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Computing & Microservices"
                  value={newBatch.subject}
                  onChange={e => setNewBatch({ ...newBatch, subject: e.target.value })}
                  className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Semester
                  </label>
                  <input
                    type="text"
                    value={newBatch.semester}
                    onChange={e => setNewBatch({ ...newBatch, semester: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Section
                  </label>
                  <input
                    type="text"
                    value={newBatch.section}
                    onChange={e => setNewBatch({ ...newBatch, section: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    value={newBatch.capacity}
                    onChange={e => setNewBatch({ ...newBatch, capacity: parseInt(e.target.value) || 60 })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 font-mono-data text-body-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Venue / Classroom
                  </label>
                  <input
                    type="text"
                    value={newBatch.venue}
                    onChange={e => setNewBatch({ ...newBatch, venue: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Faculty Lead
                  </label>
                  <input
                    type="text"
                    value={newBatch.faculty}
                    onChange={e => setNewBatch({ ...newBatch, faculty: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-sm"
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

