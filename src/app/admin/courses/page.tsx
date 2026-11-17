"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Award,
  IndianRupee,
  Search,
  Plus,
  Download,
  CheckCircle,
  FileText,
  Edit,
  Trash2,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Sliders,
  ShieldAlert,
  Save,
  X,
  RotateCcw,
  CheckCircle2
} from "lucide-react";

interface Subject {
  id: string;
  code: string;
  title: string;
  type: "Core Theory" | "Practical Lab" | "Program Elective" | "Open Elective" | "Humanities Elective";
  instructor: string;
  labHours: string;
  credits: number;
  theoryHours: number;
  semester: number;
}

interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  duration: string;
  semesters: number;
  credits: number;
  tuitionYear: number;
  totalTuition: number;
  batches: number;
  subjectsCount: number;
  status: "Active" | "Pending Rev" | "Archived";
  category: "Eng & Tech" | "Management & Business" | "Applied Sciences" | "Design & Media";
}

const initialCourses: Course[] = [
  {
    id: "c1",
    code: "CS-BTECH",
    title: "B.Tech Computer Science & Eng.",
    department: "Dept of Computing & IT",
    duration: "4 Yrs (8 Sems)",
    semesters: 8,
    credits: 160,
    tuitionYear: 185000,
    totalTuition: 740000,
    batches: 8,
    subjectsCount: 42,
    status: "Active",
    category: "Eng & Tech"
  },
  {
    id: "c2",
    code: "AI-BTECH",
    title: "B.Tech AI & Robotics",
    department: "Dept of AI & Robotics",
    duration: "4 Yrs (8 Sems)",
    semesters: 8,
    credits: 164,
    tuitionYear: 210000,
    totalTuition: 840000,
    batches: 4,
    subjectsCount: 38,
    status: "Active",
    category: "Eng & Tech"
  },
  {
    id: "c3",
    code: "MBA-EXEC",
    title: "MBA (Tech Management)",
    department: "School of Management",
    duration: "2 Yrs (4 Sems)",
    semesters: 4,
    credits: 90,
    tuitionYear: 275000,
    totalTuition: 550000,
    batches: 3,
    subjectsCount: 26,
    status: "Active",
    category: "Management & Business"
  },
  {
    id: "c4",
    code: "ECE-BTECH",
    title: "B.Tech Electronics & Comm.",
    department: "Dept of ECE",
    duration: "4 Yrs (8 Sems)",
    semesters: 8,
    credits: 158,
    tuitionYear: 165000,
    totalTuition: 660000,
    batches: 6,
    subjectsCount: 40,
    status: "Active",
    category: "Eng & Tech"
  },
  {
    id: "c5",
    code: "DS-MSC",
    title: "M.Sc Data Science & Neural Sys",
    department: "Dept of Applied Sciences",
    duration: "2 Yrs (4 Sems)",
    semesters: 4,
    credits: 84,
    tuitionYear: 140000,
    totalTuition: 280000,
    batches: 2,
    subjectsCount: 22,
    status: "Active",
    category: "Applied Sciences"
  },
  {
    id: "c6",
    code: "DES-BDES",
    title: "B.Des Interaction & Architecture",
    department: "Faculty of Design",
    duration: "4 Yrs (8 Sems)",
    semesters: 8,
    credits: 150,
    tuitionYear: 195000,
    totalTuition: 780000,
    batches: 3,
    subjectsCount: 32,
    status: "Pending Rev",
    category: "Design & Media"
  }
];

const initialSubjects: Record<string, Subject[]> = {
  "CS-BTECH-4": [
    {
      id: "s1",
      code: "CS401",
      title: "Database Management Systems",
      type: "Core Theory",
      instructor: "Prof. Rajesh K. Sharma",
      labHours: "Required",
      credits: 4.0,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "s2",
      code: "CS402",
      title: "Operating Systems & Kernel Arch.",
      type: "Core Theory",
      instructor: "Dr. Alistair Chen",
      labHours: "Required",
      credits: 4.0,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "s3",
      code: "CS403",
      title: "Design & Analysis of Algorithms",
      type: "Core Theory",
      instructor: "Dr. Elena Rostova",
      labHours: "None",
      credits: 4.0,
      theoryHours: 4,
      semester: 4
    },
    {
      id: "s4",
      code: "CS404",
      title: "Automata Theory & Formal Lang.",
      type: "Core Theory",
      instructor: "Prof. Marcus Sterling",
      labHours: "None",
      credits: 3.0,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "s5",
      code: "CS405L",
      title: "DB Systems & Cloud SQL Lab",
      type: "Practical Lab",
      instructor: "Inst. Jenkins",
      labHours: "4 Hrs/Wk",
      credits: 2.0,
      theoryHours: 0,
      semester: 4
    },
    {
      id: "s6",
      code: "HS401",
      title: "Corporate Ethics & Governance",
      type: "Humanities Elective",
      instructor: "Guest: Dr. Rao",
      labHours: "None",
      credits: 3.0,
      theoryHours: 3,
      semester: 4
    }
  ]
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course>(initialCourses[0]);
  const [selectedSemester, setSelectedSemester] = useState<number>(4);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Subjects state for active course/semester
  const [subjectsMap, setSubjectsMap] = useState<Record<string, Subject[]>>(initialSubjects);

  // New subject form state
  const [newSubCode, setNewSubCode] = useState("");
  const [newSubTitle, setNewSubTitle] = useState("");
  const [newSubType, setNewSubType] = useState<Subject["type"]>("Core Theory");
  const [newSubCredits, setNewSubCredits] = useState(3.0);
  const [newSubTheoryHours, setNewSubTheoryHours] = useState(3);
  const [newSubLabHours, setNewSubLabHours] = useState("0");
  const [newSubInstructor, setNewSubInstructor] = useState("Dr. Elena Rostova (Assoc. Prof)");

  // Modal state
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Course Modal form state
  const [newCourseCode, setNewCourseCode] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDept, setNewCourseDept] = useState("Dept of Computing & IT");
  const [newCourseDuration, setNewCourseDuration] = useState("4 Yrs (8 Sems)");
  const [newCourseCredits, setNewCourseCredits] = useState(160);
  const [newCourseTuition, setNewCourseTuition] = useState(185000);
  const [newCourseCategory, setNewCourseCategory] = useState<Course["category"]>("Eng & Tech");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "Eng & Tech" && c.category === "Eng & Tech") ||
      (activeCategory === "Management & Business" && c.category === "Management & Business") ||
      (activeCategory === "Applied Sciences" && c.category === "Applied Sciences") ||
      (activeCategory === "Design & Media" && c.category === "Design & Media");

    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = departmentFilter === "all" || c.department.toLowerCase().includes(departmentFilter.toLowerCase());
    const matchesDuration = durationFilter === "all" || c.duration.startsWith(durationFilter);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "act" && c.status === "Active") ||
      (statusFilter === "rev" && c.status === "Pending Rev");

    return matchesCategory && matchesSearch && matchesDept && matchesDuration && matchesStatus;
  });

  // Current semester subjects
  const currentKey = `${selectedCourse.code}-${selectedSemester}`;
  const currentSubjects = subjectsMap[currentKey] || subjectsMap["CS-BTECH-4"] || [];
  const currentTotalCredits = currentSubjects.reduce((acc, s) => acc + s.credits, 0);

  // Add subject handler
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubCode.trim() || !newSubTitle.trim()) {
      showToast("Please enter subject code and title.");
      return;
    }

    const newSub: Subject = {
      id: "sub-" + Date.now(),
      code: newSubCode.trim().toUpperCase(),
      title: newSubTitle.trim(),
      type: newSubType,
      credits: Number(newSubCredits),
      theoryHours: Number(newSubTheoryHours),
      labHours: newSubLabHours === "0" ? "None" : `${newSubLabHours} Hrs/Wk`,
      instructor: newSubInstructor.split(" (")[0],
      semester: selectedSemester
    };

    setSubjectsMap((prev) => ({
      ...prev,
      [currentKey]: [...(prev[currentKey] || currentSubjects), newSub]
    }));

    // Reset form
    setNewSubCode("");
    setNewSubTitle("");
    setNewSubCredits(3.0);
    setNewSubTheoryHours(3);
    setNewSubLabHours("0");
    showToast(`Subject ${newSub.code} added to Semester ${selectedSemester} manifest.`);
  };

  // Detach subject handler
  const handleDetachSubject = (subId: string, subCode: string) => {
    setSubjectsMap((prev) => ({
      ...prev,
      [currentKey]: (prev[currentKey] || currentSubjects).filter((s) => s.id !== subId)
    }));
    showToast(`Subject ${subCode} detached from curriculum.`);
  };

  // Add course handler
  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim() || !newCourseTitle.trim()) {
      showToast("Please fill in course code and title.");
      return;
    }

    const created: Course = {
      id: "c-" + Date.now(),
      code: newCourseCode.trim().toUpperCase(),
      title: newCourseTitle.trim(),
      department: newCourseDept,
      duration: newCourseDuration,
      semesters: newCourseDuration.includes("2") ? 4 : 8,
      credits: Number(newCourseCredits),
      tuitionYear: Number(newCourseTuition),
      totalTuition: Number(newCourseTuition) * (newCourseDuration.includes("2") ? 2 : 4),
      batches: 1,
      subjectsCount: 0,
      status: "Active",
      category: newCourseCategory
    };

    setCourses([created, ...courses]);
    setSelectedCourse(created);
    setIsAddCourseModalOpen(false);
    setNewCourseCode("");
    setNewCourseTitle("");
    showToast(`Degree Program ${created.code} successfully registered!`);
  };

  return (
    <div className="p-5 md:p-7 space-y-5 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#3D405B] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 border border-slate-700 text-xs font-medium animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
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
              Courses &amp; Subjects Management
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                PROGRAMS: <strong>{courses.length}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                MODULES: <strong>186</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                CREDITS: <strong>3,420</strong>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons - Vertically Centered & Balanced */}
          <div className="flex items-center flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
            <button
              onClick={() => showToast("Exporting comprehensive academic scheme CSV...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export Scheme</span>
            </button>
            <button
              onClick={() => showToast("Curriculum Accreditation Audit Report generated.")}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Audit Report</span>
            </button>
            <button
              onClick={() => {
                const subInput = document.getElementById("addSubjectCodeInput");
                if (subInput) subInput.focus();
                showToast("Fill in details in the right-side Add Subject Studio.");
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-500" />
              <span>+ Create Subject</span>
            </button>
            <button
              onClick={() => setIsAddCourseModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Course</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Telemetry KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Degree Programs
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">24 Programs</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="font-medium text-slate-700">UG: 14</span>
              <span>•</span>
              <span className="font-medium text-slate-700">PG: 8</span>
              <span>•</span>
              <span className="font-medium text-slate-700">Doctoral: 2</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Subject Modules
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50/80 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">186 Subjects</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="font-medium text-slate-700">Core: 112</span>
              <span>•</span>
              <span className="font-medium text-slate-700">Labs: 54</span>
              <span>•</span>
              <span className="font-medium text-slate-700">Electives: 20</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Academic Credits
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">3,420 Credits</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
                NBA &amp; AICTE
              </span>
              <span>Accredited Tier-1</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Tuition Benchmark
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3.5">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">₹1.40L - ₹2.75L</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-indigo-600 font-semibold">
                100% Configured
              </span>
              <span>Avg: ₹1.95L / yr</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 cols): Catalog Table */}
        <div className="xl:col-span-8 space-y-4">
          {/* Filter & Search Toolbar Card */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            {/* Segmented Program Tabs */}
            <div className="flex items-center overflow-x-auto gap-2">
              {[
                { id: "All", label: "All Programs (24)" },
                { id: "Eng & Tech", label: "Eng & Tech (10)" },
                { id: "Management & Business", label: "Management (6)" },
                { id: "Applied Sciences", label: "Applied Sciences (5)" },
                { id: "Design & Media", label: "Design & Media (3)" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    activeCategory === tab.id
                      ? "bg-[#3D405B] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Query Controls Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center pt-1 border-t border-slate-100">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search code, title or department..."
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="md:col-span-3">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] text-slate-800"
                >
                  <option value="all">All Departments</option>
                  <option value="computing">Computing &amp; IT</option>
                  <option value="ai">AI &amp; Robotics</option>
                  <option value="management">School of Mgmt</option>
                  <option value="ece">Electronics &amp; Comm</option>
                  <option value="design">Faculty of Design</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] text-slate-800"
                >
                  <option value="all">Duration</option>
                  <option value="4">4 Years (8 Sem)</option>
                  <option value="2">2 Years (4 Sem)</option>
                  <option value="3">3 Years (6 Sem)</option>
                </select>
              </div>
              <div className="md:col-span-2 flex items-center gap-1.5">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] text-slate-800"
                >
                  <option value="all">Status: All</option>
                  <option value="act">Active</option>
                  <option value="rev">Review</option>
                </select>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDepartmentFilter("all");
                    setDurationFilter("all");
                    setStatusFilter("all");
                  }}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl border border-slate-200 transition-colors cursor-pointer shrink-0"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* High-Density Course Directory Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 text-slate-500 text-[10px] uppercase tracking-wider font-semibold border-b border-slate-100">
                    <th className="py-2.5 px-4 font-semibold">Code &amp; Course Title</th>
                    <th className="py-2.5 px-4 font-semibold">Faculty / Dept</th>
                    <th className="py-2.5 px-4 font-semibold">Duration</th>
                    <th className="py-2.5 px-4 font-semibold">Credits</th>
                    <th className="py-2.5 px-4 font-semibold">Tuition / Year</th>
                    <th className="py-2.5 px-4 font-semibold">Batches</th>
                    <th className="py-2.5 px-4 font-semibold">Subjects</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCourses.map((c) => {
                    const isSelected = selectedCourse.id === c.id;
                    return (
                      <tr
                        key={c.id}
                        onClick={() => setSelectedCourse(c)}
                        className={`hover:bg-slate-50/60 transition-colors cursor-pointer ${
                          isSelected ? "bg-blue-50/50 border-l-4 border-[#3D405B]" : ""
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-mono font-bold text-[#3D405B]">
                              {c.code}
                            </div>
                            <div className="text-slate-700 font-medium truncate max-w-[190px]">
                              {c.title}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-500 truncate max-w-[140px]">
                          {c.department}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-700">
                          {c.duration}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-700">
                          {c.credits} CR
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono font-semibold text-[#3D405B] block">
                            ₹{c.tuitionYear.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            Tot: ₹{c.totalTuition.toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-700">
                          {c.batches}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-[#3D405B]">
                          {c.subjectsCount}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
                              c.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td
                          className="py-3 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setSelectedCourse(c);
                                showToast(`Curriculum Studio focused on ${c.code}`);
                              }}
                              className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-[#3D405B] rounded-lg transition-colors cursor-pointer"
                              title="View Syllabus"
                            >
                              <BookOpen className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => showToast(`Editing manifest for ${c.code}`)}
                              className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                              title="Edit Course"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-4 py-2.5 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
              <span>
                Showing <strong className="text-slate-800 font-mono">1 - {filteredCourses.length}</strong> of{" "}
                <strong className="text-slate-800 font-mono">24</strong> Programs
              </span>
              <div className="flex items-center gap-1 font-mono text-xs">
                <button className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded border border-slate-200 cursor-pointer">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="px-2.5 py-1 bg-[#3D405B] text-white font-semibold rounded">1</button>
                <button className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded border border-slate-200 cursor-pointer">
                  2
                </button>
                <button className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded border border-slate-200 cursor-pointer">
                  3
                </button>
                <button className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded border border-slate-200 cursor-pointer">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Active Program Syllabus Studio */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden sticky top-20">
            {/* Active Program Studio Header */}
            <div className="bg-[#3D405B] text-white p-4.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-white/10 text-white font-mono text-[10px] rounded uppercase font-semibold">
                  Active Workspace
                </span>
                <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Dean Approved</span>
                </div>
              </div>
              <h2 className="text-sm font-bold tracking-tight">
                {selectedCourse.code} &bull; {selectedCourse.title}
              </h2>
              <div className="flex items-center justify-between text-xs text-slate-300 pt-0.5">
                <span>Duration: <strong className="text-white font-mono">{selectedCourse.duration}</strong></span>
                <span>Total Fees: <strong className="text-white font-mono">₹{selectedCourse.totalTuition.toLocaleString("en-IN")}</strong></span>
              </div>
            </div>

            {/* Semester Tab Ribbon */}
            <div className="bg-slate-50 px-3 pt-2.5 flex items-center gap-1.5 overflow-x-auto border-b border-slate-100">
              {Array.from({ length: selectedCourse.semesters || 8 }, (_, i) => i + 1).map((sem) => {
                const isActive = selectedSemester === sem;
                return (
                  <button
                    key={sem}
                    onClick={() => setSelectedSemester(sem)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-white text-[#3D405B] shadow-2xs border-t-2 border-t-[#3D405B]"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Sem {sem}
                  </button>
                );
              })}
            </div>

            {/* Semester Summary Stat */}
            <div className="px-4 py-2.5 bg-slate-50/50 flex items-center justify-between text-xs border-b border-slate-100">
              <span className="font-semibold text-[#3D405B]">Semester {selectedSemester} Subjects</span>
              <span className="font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-bold text-[11px] border border-blue-200">
                {currentTotalCredits.toFixed(1)} Credits
              </span>
            </div>

            {/* Current Semester Subjects List */}
            <div className="p-3 divide-y divide-slate-100 space-y-1 max-h-[340px] overflow-y-auto">
              {currentSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="py-2.5 px-2 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#3D405B] text-xs">{subject.code}</span>
                        <span className="text-slate-800 font-medium text-xs">{subject.title}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <span
                          className={`px-1.5 py-0.5 text-[10px] font-medium rounded ${
                            subject.type === "Practical Lab"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {subject.type}
                        </span>
                        <span>{subject.instructor}</span>
                        <span className="text-blue-600 font-medium">Lab: {subject.labHours}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end shrink-0">
                      <span className="font-mono font-bold text-[#3D405B] text-xs">
                        {subject.credits.toFixed(1)} CR
                      </span>
                      <div className="flex gap-1 mt-1 text-slate-400">
                        <button
                          onClick={() => showToast(`Modifying ${subject.code} syllabus params`)}
                          className="hover:text-blue-600 p-0.5 cursor-pointer"
                          title="Edit Subject"
                        >
                          <Sliders className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDetachSubject(subject.id, subject.code)}
                          className="hover:text-rose-600 p-0.5 cursor-pointer"
                          title="Detach"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Subject Inline Form */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-[#3D405B] flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600" />
                Add Subject to Sem {selectedSemester}
              </span>

              <form className="space-y-2.5 text-xs" onSubmit={handleAddSubject}>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      Subject Code
                    </label>
                    <input
                      id="addSubjectCodeInput"
                      type="text"
                      value={newSubCode}
                      onChange={(e) => setNewSubCode(e.target.value)}
                      placeholder="e.g. CS406"
                      className="w-full bg-white px-2.5 py-1.5 font-mono text-slate-800 focus:outline-none border border-slate-200 rounded-lg text-xs focus:border-[#3D405B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      Subject Type
                    </label>
                    <select
                      value={newSubType}
                      onChange={(e) => setNewSubType(e.target.value as Subject["type"])}
                      className="w-full bg-white px-2.5 py-1.5 text-slate-800 focus:outline-none border border-slate-200 rounded-lg text-xs focus:border-[#3D405B]"
                    >
                      <option value="Core Theory">Core Theory</option>
                      <option value="Practical Lab">Practical Lab</option>
                      <option value="Program Elective">Program Elective</option>
                      <option value="Open Elective">Open Elective</option>
                      <option value="Humanities Elective">Humanities Elective</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Full Subject Title
                  </label>
                  <input
                    type="text"
                    value={newSubTitle}
                    onChange={(e) => setNewSubTitle(e.target.value)}
                    placeholder="e.g. Computer Networks & Protocols"
                    className="w-full bg-white px-2.5 py-1.5 text-slate-800 focus:outline-none border border-slate-200 rounded-lg text-xs focus:border-[#3D405B]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      Credits
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={newSubCredits}
                      onChange={(e) => setNewSubCredits(parseFloat(e.target.value) || 0)}
                      className="w-full bg-white px-2.5 py-1.5 font-mono text-slate-800 focus:outline-none border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      Theory (h/wk)
                    </label>
                    <input
                      type="number"
                      value={newSubTheoryHours}
                      onChange={(e) => setNewSubTheoryHours(parseInt(e.target.value) || 0)}
                      className="w-full bg-white px-2.5 py-1.5 font-mono text-slate-800 focus:outline-none border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                      Lab (h/wk)
                    </label>
                    <input
                      type="text"
                      value={newSubLabHours}
                      onChange={(e) => setNewSubLabHours(e.target.value)}
                      className="w-full bg-white px-2.5 py-1.5 font-mono text-slate-800 focus:outline-none border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 mb-1">
                    Faculty Lead / Instructor
                  </label>
                  <select
                    value={newSubInstructor}
                    onChange={(e) => setNewSubInstructor(e.target.value)}
                    className="w-full bg-white px-2.5 py-1.5 text-slate-800 focus:outline-none border border-slate-200 rounded-lg text-xs focus:border-[#3D405B]"
                  >
                    <option>Dr. Elena Rostova (Assoc. Prof)</option>
                    <option>Prof. Rajesh K. Sharma (Professor)</option>
                    <option>Dr. Alistair Chen (Dept Chair)</option>
                    <option>Prof. Marcus Sterling (Asst. Prof)</option>
                  </select>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Attach to Curriculum</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Regulatory Compliance Validation Box */}
            <div className="p-3 bg-slate-50 text-slate-500 text-[11px] flex items-center gap-2 border-t border-slate-100">
              <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
              <p>Curriculum aligned with IEEE/ACM Computing Guidelines. Prerequisite trees locked.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4.5 bg-[#3D405B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-200" />
                <h3 className="font-bold text-sm">
                  + Create Degree Program
                </h3>
              </div>
              <button
                onClick={() => setIsAddCourseModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CY-BTECH"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Program Domain
                  </label>
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value as Course["category"])}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                  >
                    <option value="Eng & Tech">Eng &amp; Tech</option>
                    <option value="Management & Business">Management &amp; Business</option>
                    <option value="Applied Sciences">Applied Sciences</option>
                    <option value="Design & Media">Design &amp; Media</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700 uppercase text-[10px]">
                  Full Degree Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech in Cyber Security & Forensic Systems"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Department
                  </label>
                  <select
                    value={newCourseDept}
                    onChange={(e) => setNewCourseDept(e.target.value)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                  >
                    <option>Dept of Computing &amp; IT</option>
                    <option>Dept of AI &amp; Robotics</option>
                    <option>School of Management</option>
                    <option>Dept of ECE</option>
                    <option>Dept of Applied Sciences</option>
                    <option>Faculty of Design</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Duration &amp; Semesters
                  </label>
                  <select
                    value={newCourseDuration}
                    onChange={(e) => setNewCourseDuration(e.target.value)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                  >
                    <option>4 Yrs (8 Sems)</option>
                    <option>2 Yrs (4 Sems)</option>
                    <option>3 Yrs (6 Sems)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Required Credits
                  </label>
                  <input
                    type="number"
                    value={newCourseCredits}
                    onChange={(e) => setNewCourseCredits(parseInt(e.target.value) || 0)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Tuition Fee Per Annum (₹)
                  </label>
                  <input
                    type="number"
                    value={newCourseTuition}
                    onChange={(e) => setNewCourseTuition(parseInt(e.target.value) || 0)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold rounded-xl transition-all shadow-xs hover:shadow cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Course</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
