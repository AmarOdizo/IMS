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
  AlertCircle,
  Sparkles,
  GraduationCap,
  PlusCircle,
  CheckCheck,
  BarChart3,
  FileSpreadsheet,
  FileText,
  Send,
  MessageSquare,
  Eye,
  BookMarked,
  CalendarDays,
  Check
} from "lucide-react";

interface SyllabusUnit {
  id: number;
  title: string;
  lecturesPlanned: number;
  lecturesTaken: number;
  status: "completed" | "in-progress" | "upcoming";
  topics: string;
}

interface BatchStudent {
  roll: string;
  name: string;
  email: string;
  attendance: number;
  status: "Active" | "At Risk" | "Detained Warning";
  avatar: string;
}

interface BatchItem {
  id: string;
  code: string;
  level: "UG" | "PG";
  format: "Core Theory" | "Practical Lab" | "PG Elective";
  title: string;
  degree: string;
  semester: string;
  section: string;
  subjectName: string;
  credits: number;
  enrolled: number;
  schedule: string;
  scheduleDays: string;
  scheduleTime: string;
  venue: string;
  roomShort: string;
  attendanceHealth: number;
  syllabusPacing: number;
  syllabusUnit: string;
  completedLectures: number;
  totalLectures: number;
  dateRange: string;
  slot: "MORNING" | "AFTERNOON";
  color: string;
  syllabusUnits: SyllabusUnit[];
  students: BatchStudent[];
}

const batchesData: BatchItem[] = [
  {
    id: "CS401",
    code: "CS-401",
    level: "UG",
    format: "Core Theory",
    title: "B.Tech Computer Science & Engineering",
    degree: "B.Tech CSE",
    semester: "Semester 04",
    section: "Section A",
    subjectName: "Database Management Systems",
    credits: 4,
    enrolled: 62,
    schedule: "Mon, Wed, Fri (09:00 - 10:00 AM)",
    scheduleDays: "Mon, Wed, Fri",
    scheduleTime: "09:00 - 10:00 AM",
    venue: "Lecture Hall 302 (North Wing)",
    roomShort: "Hall 302",
    attendanceHealth: 89.4,
    syllabusPacing: 68.0,
    syllabusUnit: "Unit 4 of 5 (Concurrency Ctrl & ACID)",
    completedLectures: 28,
    totalLectures: 42,
    dateRange: "15 Jan 2025 – 30 May 2025",
    slot: "MORNING",
    color: "from-blue-600 to-indigo-700",
    syllabusUnits: [
      { id: 1, title: "Unit 1: Relational Data Model & Relational Algebra", lecturesPlanned: 8, lecturesTaken: 8, status: "completed", topics: "Entity-relationship diagrams, schema mappings, relational calculi" },
      { id: 2, title: "Unit 2: SQL Architecture & Advanced Queries", lecturesPlanned: 8, lecturesTaken: 8, status: "completed", topics: "Subqueries, aggregations, window functions, integrity triggers" },
      { id: 3, title: "Unit 3: Normalization & Functional Dependencies", lecturesPlanned: 8, lecturesTaken: 8, status: "completed", topics: "1NF, 2NF, 3NF, BCNF, lossless join decomposition" },
      { id: 4, title: "Unit 4: Transaction Processing & Concurrency Control", lecturesPlanned: 10, lecturesTaken: 4, status: "in-progress", topics: "ACID properties, serializability, two-phase locking (2PL), deadlocks" },
      { id: 5, title: "Unit 5: Crash Recovery, B-Trees & Distributed DBs", lecturesPlanned: 8, lecturesTaken: 0, status: "upcoming", topics: "WAL logging, ARIES algorithm, B+ tree indexing, distributed transactions" },
    ],
    students: [
      { roll: "APX-CS-001", name: "Aarav Sharma", email: "aarav.cs23@sunrise.edu", attendance: 94.2, status: "Active", avatar: "AS" },
      { roll: "APX-CS-015", name: "Ananya Iyer", email: "ananya.cs23@sunrise.edu", attendance: 92.4, status: "Active", avatar: "AI" },
      { roll: "APX-CS-028", name: "Devansh Patel", email: "devansh.cs23@sunrise.edu", attendance: 88.0, status: "Active", avatar: "DP" },
      { roll: "APX-CS-042", name: "Rahul Sharma", email: "rahul.sharma@sunrise.edu", attendance: 91.5, status: "Active", avatar: "RS" },
      { roll: "APX-CS-056", name: "Rohan Verma", email: "rohan.v@sunrise.edu", attendance: 71.0, status: "At Risk", avatar: "RV" },
      { roll: "APX-CS-062", name: "Vikram Malhotra", email: "vikram.m@sunrise.edu", attendance: 67.5, status: "Detained Warning", avatar: "VM" },
    ]
  },
  {
    id: "CS405L",
    code: "CS-405L",
    level: "UG",
    format: "Practical Lab",
    title: "B.Tech Computer Science & Engineering",
    degree: "B.Tech CSE",
    semester: "Semester 04",
    section: "Section B",
    subjectName: "Database Systems Practicum Lab",
    credits: 2,
    enrolled: 60,
    schedule: "Tue, Thu (03:30 - 05:00 PM)",
    scheduleDays: "Tue, Thu",
    scheduleTime: "03:30 - 05:00 PM",
    venue: "Turing Computing Lab 3 (North Block)",
    roomShort: "Software Lab 3",
    attendanceHealth: 92.1,
    syllabusPacing: 72.0,
    syllabusUnit: "Lab 8 of 12 (Query Optimizer & Indexing)",
    completedLectures: 18,
    totalLectures: 24,
    dateRange: "15 Jan 2025 – 30 May 2025",
    slot: "AFTERNOON",
    color: "from-emerald-600 to-teal-700",
    syllabusUnits: [
      { id: 1, title: "Lab 1-3: PostgreSQL Environment Setup & DDL/DML", lecturesPlanned: 6, lecturesTaken: 6, status: "completed", topics: "Table constraints, views, indexing baseline, complex joins" },
      { id: 2, title: "Lab 4-6: PL/pgSQL Stored Procedures & Triggers", lecturesPlanned: 6, lecturesTaken: 6, status: "completed", topics: "Functions, audit triggers, exception handling, cursor loops" },
      { id: 3, title: "Lab 7-9: Query Plan Analysis (EXPLAIN ANALYZE)", lecturesPlanned: 6, lecturesTaken: 4, status: "in-progress", topics: "Execution cost, sequential scans vs index scans, B+ tree tuning" },
      { id: 4, title: "Lab 10-12: Fullstack REST Integration & Benchmark", lecturesPlanned: 6, lecturesTaken: 0, status: "upcoming", topics: "Connection pooling, ACID stress tests, PgBouncer load simulation" },
    ],
    students: [
      { roll: "APX-CS-071", name: "Sneha Rao", email: "sneha.rao@sunrise.edu", attendance: 96.5, status: "Active", avatar: "SR" },
      { roll: "APX-CS-082", name: "Kunal Singhania", email: "kunal.s@sunrise.edu", attendance: 93.0, status: "Active", avatar: "KS" },
      { roll: "APX-CS-095", name: "Meera Nair", email: "meera.n@sunrise.edu", attendance: 89.2, status: "Active", avatar: "MN" },
      { roll: "APX-CS-103", name: "Tanmay Deshmukh", email: "tanmay.d@sunrise.edu", attendance: 72.5, status: "At Risk", avatar: "TD" },
      { roll: "APX-CS-112", name: "Pooja Hegde", email: "pooja.h@sunrise.edu", attendance: 95.0, status: "Active", avatar: "PH" },
    ]
  },
  {
    id: "CS602",
    code: "CS-602",
    level: "PG",
    format: "PG Elective",
    title: "M.Tech Data Systems & Analytics",
    degree: "M.Tech DS",
    semester: "Term II",
    section: "Core PG",
    subjectName: "Advanced Distributed Database Architecture",
    credits: 4,
    enrolled: 28,
    schedule: "Mon, Thu (11:00 AM - 12:30 PM)",
    scheduleDays: "Mon, Thu",
    scheduleTime: "11:00 AM - 12:30 PM",
    venue: "Room 204 (PG Research Block)",
    roomShort: "Room 204",
    attendanceHealth: 94.8,
    syllabusPacing: 75.0,
    syllabusUnit: "Module 3 of 4 (Raft Consensus & Commit)",
    completedLectures: 24,
    totalLectures: 32,
    dateRange: "15 Jan 2025 – 30 May 2025",
    slot: "MORNING",
    color: "from-purple-600 to-violet-700",
    syllabusUnits: [
      { id: 1, title: "Module 1: Distributed Transactions & 2PC/3PC", lecturesPlanned: 8, lecturesTaken: 8, status: "completed", topics: "Two-phase commit, coordinator crash scenarios, blocking semantics" },
      { id: 2, title: "Module 2: CAP Theorem, PACELC & Consistency", lecturesPlanned: 8, lecturesTaken: 8, status: "completed", topics: "Linearizability, eventual consistency, quorum reads/writes" },
      { id: 3, title: "Module 3: Paxos & Raft Consensus Protocols", lecturesPlanned: 8, lecturesTaken: 6, status: "in-progress", topics: "Leader election, log replication, safety invariant proofs" },
      { id: 4, title: "Module 4: Spanner, CockroachDB & NewSQL", lecturesPlanned: 8, lecturesTaken: 0, status: "upcoming", topics: "TrueTime API, multi-version concurrency control (MVCC), Paxos groups" },
    ],
    students: [
      { roll: "APX-MT-004", name: "Gaurav Sen", email: "gaurav.mtech@sunrise.edu", attendance: 98.0, status: "Active", avatar: "GS" },
      { roll: "APX-MT-011", name: "Ritika Chawla", email: "ritika.c@sunrise.edu", attendance: 96.0, status: "Active", avatar: "RC" },
      { roll: "APX-MT-019", name: "Aditya Bhatt", email: "aditya.b@sunrise.edu", attendance: 92.5, status: "Active", avatar: "AB" },
      { roll: "APX-MT-024", name: "Siddharth Joshi", email: "sid.j@sunrise.edu", attendance: 91.0, status: "Active", avatar: "SJ" },
    ]
  },
  {
    id: "CS202",
    code: "CS-202",
    level: "UG",
    format: "Core Theory",
    title: "Bachelor of Computer Applications",
    degree: "BCA",
    semester: "Semester 02",
    section: "Section B",
    subjectName: "Data Structures & Algorithms Foundation",
    credits: 4,
    enrolled: 34,
    schedule: "Wed, Thu, Fri (02:00 - 03:00 PM)",
    scheduleDays: "Wed, Thu, Fri",
    scheduleTime: "02:00 - 03:00 PM",
    venue: "Seminar Hall B (Main Academic Block)",
    roomShort: "Seminar Hall B",
    attendanceHealth: 84.6,
    syllabusPacing: 58.0,
    syllabusUnit: "Unit 3 of 5 (Non-Linear Trees & Heaps)",
    completedLectures: 22,
    totalLectures: 38,
    dateRange: "15 Jan 2025 – 30 May 2025",
    slot: "AFTERNOON",
    color: "from-amber-600 to-orange-700",
    syllabusUnits: [
      { id: 1, title: "Unit 1: Asymptotic Notation & Linear Arrays", lecturesPlanned: 7, lecturesTaken: 7, status: "completed", topics: "Big-O analysis, 1D/2D array addressing, dynamic arrays" },
      { id: 2, title: "Unit 2: Stacks, Queues & Linked Lists", lecturesPlanned: 8, lecturesTaken: 8, status: "completed", topics: "Infix to postfix, circular queues, doubly linked list operations" },
      { id: 3, title: "Unit 3: Binary Trees, BSTs & Priority Queues", lecturesPlanned: 9, lecturesTaken: 5, status: "in-progress", topics: "Tree traversals (Inorder/Preorder), BST deletion, min/max heaps" },
      { id: 4, title: "Unit 4: Graph Traversals (BFS, DFS) & Spanning Trees", lecturesPlanned: 8, lecturesTaken: 0, status: "upcoming", topics: "Adjacency matrix/list, Prim's and Kruskal's algorithms" },
      { id: 5, title: "Unit 5: Sorting & Dynamic Programming Intro", lecturesPlanned: 6, lecturesTaken: 0, status: "upcoming", topics: "QuickSort, MergeSort, memoization basics" },
    ],
    students: [
      { roll: "APX-BCA-005", name: "Kavya Menon", email: "kavya.bca@sunrise.edu", attendance: 88.0, status: "Active", avatar: "KM" },
      { roll: "APX-BCA-012", name: "Nikhil Gupta", email: "nikhil.g@sunrise.edu", attendance: 85.5, status: "Active", avatar: "NG" },
      { roll: "APX-BCA-019", name: "Simran Kaur", email: "simran.k@sunrise.edu", attendance: 82.0, status: "Active", avatar: "SK" },
      { roll: "APX-BCA-027", name: "Varun Chopra", email: "varun.c@sunrise.edu", attendance: 69.5, status: "At Risk", avatar: "VC" },
      { roll: "APX-BCA-033", name: "Zaid Khan", email: "zaid.k@sunrise.edu", attendance: 89.0, status: "Active", avatar: "ZK" },
    ]
  }
];

export default function StaffBatchesPage() {
  const [batches] = useState<BatchItem[]>(batchesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<"ALL" | "UG" | "PG">("ALL");
  const [formatFilter, setFormatFilter] = useState<"ALL" | "Core Theory" | "Practical Lab" | "PG Elective">("ALL");
  const [slotFilter, setSlotFilter] = useState<"ALL" | "MORNING" | "AFTERNOON">("ALL");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  
  // Modals & Drawers
  const [activeDrawerBatch, setActiveDrawerBatch] = useState<BatchItem | null>(null);
  const [activeSyllabusBatch, setActiveSyllabusBatch] = useState<BatchItem | null>(null);
  const [showTimetableModal, setShowTimetableModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementBatchId, setAnnouncementBatchId] = useState("ALL");
  const [announcementText, setAnnouncementText] = useState("");
  const [rosterSearch, setRosterSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        b.title.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q) ||
        b.subjectName.toLowerCase().includes(q) ||
        b.venue.toLowerCase().includes(q) ||
        b.semester.toLowerCase().includes(q) ||
        b.section.toLowerCase().includes(q);

      const matchesLevel = levelFilter === "ALL" || b.level === levelFilter;
      const matchesFormat = formatFilter === "ALL" || b.format === formatFilter;
      const matchesSlot = slotFilter === "ALL" || b.slot === slotFilter;

      return matchesSearch && matchesLevel && matchesFormat && matchesSlot;
    });
  }, [batches, searchQuery, levelFilter, formatFilter, slotFilter]);

  // Aggregate telemetry
  const totalCohorts = batches.length;
  const totalStudents = batches.reduce((acc, b) => acc + b.enrolled, 0);
  const weeklyHours = 18; // 12h Theory + 6h Lab
  const avgAttendance = (
    batches.reduce((acc, b) => acc + b.attendanceHealth, 0) / batches.length
  ).toFixed(1);

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    const targetLabel = announcementBatchId === "ALL" ? "All 4 Batches" : announcementBatchId;
    showToast(`Announcement broadcasted to ${targetLabel} successfully!`);
    setAnnouncementText("");
    setShowAnnouncementModal(false);
  };

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
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#355C7D] text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355C7D]"></span>
                Prof. Rajesh Sharma &bull; EMP-CS-2018-842
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Even Semester 2024–25 &bull; Active Instruction
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#3D405B] tracking-tight">
                My Assigned Batches &amp; Cohorts
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Teaching schedule, student roster registers, syllabus pace audit, and quick classroom attendance for your 4 assigned academic cohorts.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={() => setShowTimetableModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              <CalendarDays className="h-4 w-4 text-slate-600" />
              <span>Weekly Timetable</span>
            </button>
            <button
              onClick={() => setShowAnnouncementModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-[#355C7D] text-sm font-semibold rounded-xl transition-colors cursor-pointer border border-blue-200/70"
            >
              <Send className="h-4 w-4 text-[#355C7D]" />
              <span>Batch Notice</span>
            </button>
            <button
              onClick={() => showToast("Exporting consolidated roster for all 184 students (Excel)...")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Export All Rosters</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Assigned Batches
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">0{totalCohorts}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Cohorts in Current Session</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">3 Undergrad &bull; 1 Postgrad</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
              <Check className="h-3 w-3" /> Active
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Students
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">{totalStudents}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Verified Enrolled Learners</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">100% Identity Checked</span>
            <span className="text-emerald-600 font-semibold text-[11px]">+12 vs Term 1</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Weekly Contact Load
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">
              {weeklyHours} <span className="text-base font-normal text-slate-500">hrs/wk</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">12h Lecture &bull; 6h Practicum</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Cap: 20 hrs/week</span>
            <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-[11px]">
              Optimal Load
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Attendance
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">{avgAttendance}%</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Across All 4 Assigned Batches</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Min Benchmark: 75%</span>
            <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-[11px]">
              High Health
            </span>
          </div>
        </div>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course code (e.g. CS-401), degree, subject or venue..."
            className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 focus:border-[#355C7D] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Level Filter */}
          <div className="flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setLevelFilter("ALL")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                levelFilter === "ALL"
                  ? "bg-white text-[#355C7D] font-bold shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Levels ({batches.length})
            </button>
            <button
              onClick={() => setLevelFilter("UG")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                levelFilter === "UG"
                  ? "bg-white text-[#355C7D] font-bold shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              UG (3)
            </button>
            <button
              onClick={() => setLevelFilter("PG")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                levelFilter === "PG"
                  ? "bg-white text-[#355C7D] font-bold shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              PG (1)
            </button>
          </div>

          {/* Slot Filter */}
          <select
            value={slotFilter}
            onChange={(e) => setSlotFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
          >
            <option value="ALL">All Schedule Slots</option>
            <option value="MORNING">Morning Slots (09:00 - 12:30)</option>
            <option value="AFTERNOON">Afternoon Slots (14:00 - 17:00)</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-[#355C7D] shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Grid className="h-3.5 w-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-[#355C7D] shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-800"
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
            <div
              key={batch.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              {/* Header Top Band */}
              <div className="p-6 pb-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    {/* Tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#355C7D] text-white rounded-lg shadow-xs">
                        {batch.code}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                        {batch.level === "UG" ? "Undergraduate" : "Postgraduate"}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                          batch.format === "Practical Lab"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : batch.format === "PG Elective"
                            ? "bg-purple-50 text-purple-700 border-purple-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {batch.format}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        {batch.credits} Credits
                      </span>
                    </div>

                    {/* Subject & Degree */}
                    <div>
                      <h2 className="text-lg font-bold text-[#3D405B] group-hover:text-[#355C7D] transition-colors">
                        {batch.subjectName}
                      </h2>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {batch.degree} &bull; {batch.semester} ({batch.section})
                      </p>
                    </div>
                  </div>

                  {/* Enrolled Badge */}
                  <div className="text-right shrink-0 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
                    <div className="text-2xl font-bold text-[#3D405B] leading-none">
                      {batch.enrolled}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mt-1">
                      Students
                    </span>
                  </div>
                </div>

                {/* Schedule & Location Pill */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-100/60 text-[#355C7D] flex items-center justify-center shrink-0">
                      <Clock className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Class Schedule
                      </span>
                      <span className="font-semibold text-slate-800">{batch.schedule}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100/60 text-emerald-700 flex items-center justify-center shrink-0">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        Assigned Venue
                      </span>
                      <span className="font-semibold text-slate-800">{batch.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Gauges: Attendance & Syllabus */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Attendance Health */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                        Attendance Rate
                      </span>
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {batch.attendanceHealth}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${batch.attendanceHealth}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>Regular attendance</span>
                      <span className="text-emerald-700 font-semibold">Optimal</span>
                    </div>
                  </div>

                  {/* Syllabus Pacing */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-slate-500">
                        Syllabus Progress
                      </span>
                      <span className="font-bold text-[#355C7D] bg-blue-50 px-2 py-0.5 rounded-md">
                        {batch.syllabusPacing}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#355C7D] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${batch.syllabusPacing}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium truncate">
                      <span className="truncate">{batch.syllabusUnit}</span>
                      <span className="shrink-0 font-semibold text-slate-600 ml-1">
                        {batch.completedLectures}/{batch.totalLectures} Lecs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Term Dates & Syllabus Plan Trigger */}
                <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{batch.dateRange}</span>
                  </div>
                  <button
                    onClick={() => setActiveSyllabusBatch(batch)}
                    className="inline-flex items-center gap-1 font-semibold text-[#355C7D] hover:underline cursor-pointer"
                  >
                    <BookMarked className="h-3.5 w-3.5" />
                    <span>View Curriculum Roadmap &rarr;</span>
                  </button>
                </div>
              </div>

              {/* Card Action Footer */}
              <div className="bg-slate-50/80 px-6 py-3.5 border-t border-slate-100 grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => setActiveDrawerBatch(batch)}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Users className="h-3.5 w-3.5 text-slate-500" />
                  <span className="truncate">Roster ({batch.enrolled})</span>
                </button>
                <Link
                  href={`/staff/attendance?batch=${batch.id}`}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200/80 transition-colors flex items-center justify-center gap-1.5 shadow-2xs text-center"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="truncate">Attendance</span>
                </Link>
                <Link
                  href={`/staff/exams?batch=${batch.id}`}
                  className="px-3 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs text-center"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span className="truncate">Marks Entry</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Batches Display: Table View */}
      {viewMode === "table" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/90 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">Code</th>
                  <th className="py-3.5 px-4">Subject &amp; Cohort</th>
                  <th className="py-3.5 px-4">Schedule &amp; Hall</th>
                  <th className="py-3.5 px-4 text-center">Strength</th>
                  <th className="py-3.5 px-4">Attendance Health</th>
                  <th className="py-3.5 px-4">Syllabus Covered</th>
                  <th className="py-3.5 px-5 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredBatches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5">
                      <span className="font-mono font-bold text-xs px-2.5 py-1 bg-slate-100 text-[#355C7D] rounded-lg border border-slate-200">
                        {batch.code}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-sm text-[#3D405B]">{batch.subjectName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {batch.degree} &bull; {batch.semester} ({batch.section})
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">{batch.schedule}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{batch.venue}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block px-2.5 py-1 bg-slate-100 rounded-lg font-bold text-slate-800 text-xs">
                        {batch.enrolled}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600">{batch.attendanceHealth}%</span>
                        <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: `${batch.attendanceHealth}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#355C7D]">{batch.syllabusPacing}%</span>
                        <div className="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#355C7D] h-2 rounded-full"
                            style={{ width: `${batch.syllabusPacing}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[150px] mt-0.5">
                        {batch.completedLectures}/{batch.totalLectures} Lectures
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setActiveDrawerBatch(batch)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Roster
                        </button>
                        <button
                          onClick={() => setActiveSyllabusBatch(batch)}
                          className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#355C7D] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Plan
                        </button>
                        <Link
                          href={`/staff/attendance?batch=${batch.id}`}
                          className="px-3 py-1.5 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-lg transition-colors"
                        >
                          Attendance
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

      {/* Empty State when filters yield 0 */}
      {filteredBatches.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching batches found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or clear filters to view all assigned cohorts.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setLevelFilter("ALL");
              setFormatFilter("ALL");
              setSlotFilter("ALL");
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Side Drawer: Batch Student Roster Console */}
      {activeDrawerBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl p-6 sm:p-7 flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-250 overflow-hidden">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#355C7D] flex items-center justify-center font-mono font-bold text-sm">
                    {activeDrawerBatch.code}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#3D405B]">
                      {activeDrawerBatch.subjectName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activeDrawerBatch.degree} &bull; {activeDrawerBatch.semester} ({activeDrawerBatch.section}) &bull; {activeDrawerBatch.enrolled} Students Enrolled
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveDrawerBatch(null);
                    setRosterSearch("");
                  }}
                  className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Batch Info Ribbon */}
              <div className="my-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
                    Schedule Slot
                  </span>
                  <span className="font-semibold text-slate-800">{activeDrawerBatch.scheduleDays}</span>
                  <span className="text-slate-500 block text-[11px]">{activeDrawerBatch.scheduleTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
                    Assigned Venue
                  </span>
                  <span className="font-semibold text-slate-800">{activeDrawerBatch.roomShort}</span>
                  <span className="text-slate-500 block text-[11px]">{activeDrawerBatch.venue}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
                    Avg Attendance
                  </span>
                  <span className="font-bold text-emerald-600 text-sm">
                    {activeDrawerBatch.attendanceHealth}%
                  </span>
                  <span className="text-slate-400 block text-[11px]">Regular cohort</span>
                </div>
              </div>

              {/* Roster Table Search */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Enrolled Student Roster Sample
                  </h4>
                  <Link
                    href={`/staff/students?batch=${activeDrawerBatch.id}`}
                    className="text-xs font-semibold text-[#355C7D] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Full Cohort View ({activeDrawerBatch.enrolled})</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={rosterSearch}
                    onChange={(e) => setRosterSearch(e.target.value)}
                    placeholder="Search candidate by name, roll no or email..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#355C7D]"
                  />
                </div>

                {/* Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden max-h-[340px] overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold text-[11px] uppercase tracking-wider border-b border-slate-200 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">Student</th>
                        <th className="py-2.5 px-3">Roll Number</th>
                        <th className="py-2.5 px-3 text-center">Attendance</th>
                        <th className="py-2.5 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {activeDrawerBatch.students
                        .filter(
                          (stu) =>
                            rosterSearch === "" ||
                            stu.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
                            stu.roll.toLowerCase().includes(rosterSearch.toLowerCase()) ||
                            stu.email.toLowerCase().includes(rosterSearch.toLowerCase())
                        )
                        .map((stu) => (
                          <tr key={stu.roll} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-2.5 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-slate-100 text-[#355C7D] font-bold text-[10px] flex items-center justify-center shrink-0 border border-slate-200">
                                  {stu.avatar}
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-800">{stu.name}</div>
                                  <div className="text-[10px] text-slate-400">{stu.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 font-mono font-semibold text-slate-700">
                              {stu.roll}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className={`font-bold font-mono ${
                                  stu.attendance >= 85
                                    ? "text-emerald-600"
                                    : stu.attendance >= 75
                                    ? "text-blue-600"
                                    : "text-rose-600"
                                }`}
                              >
                                {stu.attendance}%
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <span
                                className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                                  stu.status === "Active"
                                    ? "bg-emerald-50 text-emerald-700"
                                    : stu.status === "At Risk"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-rose-50 text-rose-700"
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
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  showToast(`Roster export generated for ${activeDrawerBatch.code} (${activeDrawerBatch.enrolled} students).`);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200 flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href={`/staff/attendance?batch=${activeDrawerBatch.id}`}
                  className="px-4 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Mark Attendance</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Syllabus & Curriculum Roadmap Modal */}
      {activeSyllabusBatch && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl p-6 sm:p-7 border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#355C7D] text-white rounded-md">
                    {activeSyllabusBatch.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {activeSyllabusBatch.degree} &bull; {activeSyllabusBatch.semester}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#3D405B]">
                  {activeSyllabusBatch.subjectName} — Curriculum Roadmap
                </h3>
                <p className="text-xs text-slate-500">
                  Total {activeSyllabusBatch.completedLectures} of {activeSyllabusBatch.totalLectures} Lectures Delivered ({activeSyllabusBatch.syllabusPacing}% Syllabus Completed)
                </p>
              </div>
              <button
                onClick={() => setActiveSyllabusBatch(null)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Pacing Overview Banner */}
            <div className="p-4 bg-blue-50/70 border border-blue-200/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#355C7D] block">
                  Mid-Term Syllabus Target Met
                </span>
                <span className="text-xs text-slate-600 mt-0.5 block">
                  Class pace is on schedule according to the academic calendar guidelines.
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#355C7D]">
                  {activeSyllabusBatch.syllabusPacing}%
                </span>
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                  Target: 60%
                </span>
              </div>
            </div>

            {/* Units List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Course Syllabus Units &amp; Coverage
              </h4>

              <div className="space-y-2.5">
                {activeSyllabusBatch.syllabusUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {unit.status === "completed" ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Check className="h-3.5 w-3.5" />
                          </div>
                        ) : unit.status === "in-progress" ? (
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-[#355C7D] flex items-center justify-center shrink-0">
                            <Clock className="h-3.5 w-3.5" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                            <Layers className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <span className="font-bold text-sm text-slate-800">{unit.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-slate-500">
                          {unit.lecturesTaken}/{unit.lecturesPlanned} Lecs
                        </span>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                            unit.status === "completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : unit.status === "in-progress"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {unit.status === "in-progress" ? "In Progress" : unit.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 pl-8">
                      <strong className="text-slate-600">Key Topics:</strong> {unit.topics}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  showToast(`Syllabus report for ${activeSyllabusBatch.code} exported.`);
                  setActiveSyllabusBatch(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200"
              >
                Download Syllabus PDF
              </button>
              <button
                onClick={() => setActiveSyllabusBatch(null)}
                className="px-5 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
              >
                Close Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Timetable Modal */}
      {showTimetableModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl p-6 sm:p-7 border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-[#3D405B]">
                  Faculty Weekly Timetable — Even Semester 2024–25
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Prof. Rajesh Sharma &bull; Dept. of Computer Science &amp; Engineering &bull; 18 Contact Hours/Week
                </p>
              </div>
              <button
                onClick={() => setShowTimetableModal(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Timetable Schedule Grid */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Day</th>
                    <th className="py-3 px-4">09:00 - 10:00</th>
                    <th className="py-3 px-4">11:00 - 12:30</th>
                    <th className="py-3 px-4">14:00 - 15:00</th>
                    <th className="py-3 px-4">15:30 - 17:00</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Monday */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-[#3D405B]">Monday</td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-blue-50 border border-blue-200/80 rounded-lg">
                        <span className="font-bold text-[#355C7D] block text-xs">CS-401</span>
                        <span className="text-[11px] text-slate-600 block">DBMS &bull; Hall 302</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-purple-50 border border-purple-200/80 rounded-lg">
                        <span className="font-bold text-purple-700 block text-xs">CS-602</span>
                        <span className="text-[11px] text-slate-600 block">Adv DB &bull; Room 204</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Research / Office Hrs</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Department Meeting</td>
                  </tr>

                  {/* Tuesday */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-[#3D405B]">Tuesday</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Office Hours</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">PhD Scholar Review</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Curriculum Prep</td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-emerald-50 border border-emerald-200/80 rounded-lg">
                        <span className="font-bold text-emerald-700 block text-xs">CS-405L (Lab)</span>
                        <span className="text-[11px] text-slate-600 block">DB Practicum &bull; Lab 3</span>
                      </div>
                    </td>
                  </tr>

                  {/* Wednesday */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-[#3D405B]">Wednesday</td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-blue-50 border border-blue-200/80 rounded-lg">
                        <span className="font-bold text-[#355C7D] block text-xs">CS-401</span>
                        <span className="text-[11px] text-slate-600 block">DBMS &bull; Hall 302</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Research Guidance</td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-amber-50 border border-amber-200/80 rounded-lg">
                        <span className="font-bold text-amber-700 block text-xs">CS-202</span>
                        <span className="text-[11px] text-slate-600 block">DSA &bull; Seminar Hall B</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Faculty Evaluation</td>
                  </tr>

                  {/* Thursday */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-[#3D405B]">Thursday</td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Office Hours</td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-purple-50 border border-purple-200/80 rounded-lg">
                        <span className="font-bold text-purple-700 block text-xs">CS-602</span>
                        <span className="text-[11px] text-slate-600 block">Adv DB &bull; Room 204</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-amber-50 border border-amber-200/80 rounded-lg">
                        <span className="font-bold text-amber-700 block text-xs">CS-202</span>
                        <span className="text-[11px] text-slate-600 block">DSA &bull; Seminar Hall B</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-emerald-50 border border-emerald-200/80 rounded-lg">
                        <span className="font-bold text-emerald-700 block text-xs">CS-405L (Lab)</span>
                        <span className="text-[11px] text-slate-600 block">DB Practicum &bull; Lab 3</span>
                      </div>
                    </td>
                  </tr>

                  {/* Friday */}
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-[#3D405B]">Friday</td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-blue-50 border border-blue-200/80 rounded-lg">
                        <span className="font-bold text-[#355C7D] block text-xs">CS-401</span>
                        <span className="text-[11px] text-slate-600 block">DBMS &bull; Hall 302</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Sponsored Project Work</td>
                    <td className="py-3 px-4">
                      <div className="p-2 bg-amber-50 border border-amber-200/80 rounded-lg">
                        <span className="font-bold text-amber-700 block text-xs">CS-202</span>
                        <span className="text-[11px] text-slate-600 block">DSA &bull; Seminar Hall B</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] italic">Weekly Sync</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Official Timetable Slot Verification: Room allocation approved by Dean Academics.
              </span>
              <button
                onClick={() => {
                  showToast("Weekly Timetable PDF exported successfully.");
                  setShowTimetableModal(false);
                }}
                className="px-4 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Download Timetable PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#3D405B]">Publish Batch Announcement</h3>
                <p className="text-xs text-slate-500">
                  Broadcast instant notification to student portals and emails.
                </p>
              </div>
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Batch Cohort
                </label>
                <select
                  value={announcementBatchId}
                  onChange={(e) => setAnnouncementBatchId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
                >
                  <option value="ALL">All 4 Batches (184 Enrolled Students)</option>
                  <option value="CS-401">CS-401: B.Tech CSE Sem 4 (Sec A) - 62 Students</option>
                  <option value="CS-405L">CS-405L: B.Tech CSE Sem 4 (Sec B) Lab - 60 Students</option>
                  <option value="CS-602">CS-602: M.Tech DS Term II - 28 Students</option>
                  <option value="CS-202">CS-202: BCA Sem 2 (Sec B) - 34 Students</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Announcement Message
                </label>
                <textarea
                  rows={4}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="e.g. Please note that tomorrow's CS-401 lecture will begin with a 15-minute quiz on Unit 3 Normalization..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 transition-all resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Broadcast Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
