"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Award,
  DollarSign,
  Search,
  Filter,
  Plus,
  Download,
  CheckCircle,
  FileText,
  Edit,
  Trash2,
  MoreVertical,
  Check,
  ChevronLeft,
  ChevronRight,
  Sliders,
  ShieldAlert,
  GraduationCap,
  Save,
  X
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
    tuitionYear: 8500,
    totalTuition: 34000,
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
    tuitionYear: 9200,
    totalTuition: 36800,
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
    tuitionYear: 12500,
    totalTuition: 25000,
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
    tuitionYear: 7800,
    totalTuition: 31200,
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
    tuitionYear: 6900,
    totalTuition: 13800,
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
    tuitionYear: 8200,
    totalTuition: 32800,
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
  const [newCourseTuition, setNewCourseTuition] = useState(8500);
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
    // Reset modal
    setNewCourseCode("");
    setNewCourseTitle("");
    showToast(`Degree Program ${created.code} successfully registered!`);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-primary text-on-primary px-4 py-3 shadow-2xl border-l-4 border-secondary flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle className="w-5 h-5 text-secondary-container" />
          <span className="font-mono-data text-xs tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Command Center Header Area */}
      <div className="bg-surface-container-lowest px-6 py-4 border-b border-outline-variant/30 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Breadcrumb & Title Block */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              <span>Institutional Command</span>
              <span className="text-[0.75rem] text-outline-variant">/</span>
              <span>Curriculum Architecture</span>
              <span className="text-[0.75rem] text-outline-variant">/</span>
              <span className="text-secondary font-semibold">Courses & Subjects Catalog</span>
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tight">
                Courses & Subjects Management
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 bg-surface-container text-primary font-mono-data text-[0.6875rem] font-semibold border border-outline-variant/40">
                AY 2024-25 REGISTRY
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Degree Programs, Electives Registry, Syllabus Accreditation & Fee Matrix AY 2024-25
            </p>
          </div>

          {/* Action Suite */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => showToast("Exporting comprehensive academic scheme CSV...")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container transition-colors shadow-sm border border-outline-variant/30"
            >
              <Download className="w-4 h-4 text-secondary" />
              <span>Export Scheme</span>
            </button>
            <button
              onClick={() => showToast("Curriculum Accreditation Audit Report generated.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container transition-colors shadow-sm border border-outline-variant/30"
            >
              <FileText className="w-4 h-4 text-secondary" />
              <span>Audit Report</span>
            </button>
            <button
              onClick={() => {
                const subInput = document.getElementById("addSubjectCodeInput");
                if (subInput) subInput.focus();
                showToast("Fill in details in the right-side Add Subject Studio.");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-secondary-container text-on-secondary-container font-label-md text-label-md uppercase tracking-wider hover:bg-secondary hover:text-on-secondary transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Create Subject</span>
            </button>
            <button
              onClick={() => setIsAddCourseModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Course</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Telemetry KPI Matrix (4-up Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="bg-surface-container-lowest p-4 relative overflow-hidden shadow-sm flex flex-col justify-between border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Degree Programs
                </span>
                <span className="px-1.5 py-0.5 bg-surface-container text-secondary font-label-sm text-[0.6875rem] font-semibold">
                  +2 AI Specializations
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                  24 Programs
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2 bg-surface-container-low px-2 py-1 flex items-center justify-between text-on-surface-variant font-body-sm text-[0.75rem]">
              <span>
                UG: <strong className="text-primary font-mono-data">14</strong>
              </span>
              <span>•</span>
              <span>
                PG: <strong className="text-primary font-mono-data">8</strong>
              </span>
              <span>•</span>
              <span>
                Doctoral: <strong className="text-primary font-mono-data">2</strong>
              </span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-lowest p-4 relative overflow-hidden shadow-sm flex flex-col justify-between border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container" />
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Subject Modules
                </span>
                <Layers className="w-4 h-4 text-secondary" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                  186 Subjects
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2 bg-surface-container-low px-2 py-1 flex items-center justify-between text-on-surface-variant font-body-sm text-[0.75rem]">
              <span>
                Core: <strong className="text-primary font-mono-data">112</strong>
              </span>
              <span>•</span>
              <span>
                Labs: <strong className="text-primary font-mono-data">54</strong>
              </span>
              <span>•</span>
              <span>
                Electives: <strong className="text-primary font-mono-data">20</strong>
              </span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-lowest p-4 relative overflow-hidden shadow-sm flex flex-col justify-between border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container" />
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Academic Credits
                </span>
                <span className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-[0.6875rem] font-semibold">
                  Tier-1 Status
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                  3,420 Credits
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2 bg-surface-container-low px-2 py-1 flex items-center justify-between text-on-surface-variant font-body-sm text-[0.75rem]">
              <span className="truncate">NBA & AICTE Fully Accredited</span>
              <CheckCircle className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container-lowest p-4 relative overflow-hidden shadow-sm flex flex-col justify-between border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-outline" />
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  Tuition Benchmark
                </span>
                <span className="px-1.5 py-0.5 bg-surface-container text-primary font-label-sm text-[0.6875rem] font-semibold">
                  100% Configured
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                  $4,250 - $12,800
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2 bg-surface-container-low px-2 py-1 flex items-center justify-between text-on-surface-variant font-body-sm text-[0.75rem]">
              <span>
                Avg Per Annum: <strong className="text-primary font-mono-data">$6,400/yr</strong>
              </span>
              <DollarSign className="w-3.5 h-3.5 text-secondary" />
            </div>
          </div>
        </div>

        {/* Main Workspace Split Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Catalog Table */}
          <div className="xl:col-span-8 flex flex-col space-y-6">
            {/* Filter & Search Toolbar Card */}
            <div className="bg-surface-container-lowest p-4 shadow-sm space-y-4 border border-outline-variant/30">
              {/* Segmented Program Tabs */}
              <div className="flex items-center overflow-x-auto gap-1 bg-surface-container-low p-1 border border-outline-variant/30">
                {[
                  { id: "All", label: "All Programs (24)" },
                  { id: "Eng & Tech", label: "Eng & Tech (10)" },
                  { id: "Management & Business", label: "Management & Business (6)" },
                  { id: "Applied Sciences", label: "Applied Sciences (5)" },
                  { id: "Design & Media", label: "Design & Media (3)" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-colors ${
                      activeCategory === tab.id
                        ? "bg-emerald-600 text-white font-semibold shadow-sm"
                        : "bg-surface-container text-on-surface-variant hover:text-emerald-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Query Controls Bar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                <div className="md:col-span-5 relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-on-surface-variant/70" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by code, degree or course..."
                    className="w-full bg-surface-container-low pl-9 pr-3 py-2 font-body-sm text-body-sm text-primary placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest border border-outline-variant/30"
                  />
                </div>
                <div className="md:col-span-3">
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary focus:outline-none focus:bg-surface-container-lowest uppercase tracking-wider border border-outline-variant/30 cursor-pointer"
                  >
                    <option value="all">All Departments</option>
                    <option value="computing">Computing & IT</option>
                    <option value="ai">AI & Robotics</option>
                    <option value="management">School of Mgmt</option>
                    <option value="ece">Electronics & Comm</option>
                    <option value="design">Faculty of Design</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary focus:outline-none focus:bg-surface-container-lowest uppercase tracking-wider border border-outline-variant/30 cursor-pointer"
                  >
                    <option value="all">Duration</option>
                    <option value="4">4 Years (8 Sem)</option>
                    <option value="2">2 Years (4 Sem)</option>
                    <option value="3">3 Years (6 Sem)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary focus:outline-none focus:bg-surface-container-lowest uppercase tracking-wider border border-outline-variant/30 cursor-pointer"
                  >
                    <option value="all">Status: All</option>
                    <option value="act">Active</option>
                    <option value="rev">Under Review</option>
                  </select>
                </div>
              </div>
            </div>

            {/* High-Density Course Directory Table */}
            <div className="bg-surface-container-lowest shadow-sm overflow-hidden border border-outline-variant/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body-sm text-body-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/30">
                      <th className="py-2.5 px-3">Code & Course Title</th>
                      <th className="py-2.5 px-3">Faculty / Dept</th>
                      <th className="py-2.5 px-3">Duration & Sem</th>
                      <th className="py-2.5 px-3">Credits</th>
                      <th className="py-2.5 px-3">Tuition / Year</th>
                      <th className="py-2.5 px-3">Batches</th>
                      <th className="py-2.5 px-3">Subjects</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {filteredCourses.map((c) => {
                      const isSelected = selectedCourse.id === c.id;
                      return (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedCourse(c)}
                          className={`cursor-pointer transition-colors group ${
                            isSelected
                              ? "bg-surface-container-low border-l-4 border-l-secondary"
                              : "hover:bg-surface-container-low"
                          }`}
                        >
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              <div>
                                <div
                                  className={`font-mono-data text-mono-data font-bold ${
                                    isSelected ? "text-secondary" : "text-primary group-hover:text-secondary"
                                  }`}
                                >
                                  {c.code}
                                </div>
                                <div className="text-[0.8125rem] text-primary font-medium truncate max-w-[170px]">
                                  {c.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 text-on-surface-variant truncate max-w-[120px] text-xs">
                            {c.department}
                          </td>
                          <td className="py-2.5 px-3 font-mono-data text-mono-data text-primary text-xs">
                            {c.duration}
                          </td>
                          <td className="py-2.5 px-3 font-mono-data text-mono-data text-primary text-xs">
                            {c.credits} CR
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-mono-data text-mono-data font-semibold text-primary block">
                              ${c.tuitionYear.toLocaleString()}
                            </span>
                            <span className="text-[0.6875rem] block text-on-surface-variant">
                              Tot: ${c.totalTuition.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-mono-data text-mono-data text-xs">{c.batches}</td>
                          <td className="py-2.5 px-3 font-mono-data text-mono-data text-primary font-semibold text-xs">
                            {c.subjectsCount}
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 font-label-sm text-[0.625rem] font-semibold uppercase ${
                                c.status === "Active"
                                  ? "bg-surface-container text-secondary"
                                  : "bg-surface-container-high text-secondary-container"
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCourse(c);
                                  showToast(`Curriculum Studio focused on ${c.code}`);
                                }}
                                className="p-1 hover:bg-surface-container-high text-primary transition-colors"
                                title="View Syllabus"
                              >
                                <BookOpen className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showToast(`Editing manifest for ${c.code}`);
                                }}
                                className="p-1 hover:bg-surface-container-high text-primary transition-colors"
                                title="Edit Course"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showToast(`Actions menu for ${c.code}`);
                                }}
                                className="p-1 hover:bg-surface-container-high text-on-surface-variant transition-colors"
                                title="More Actions"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer / Dense Pagination */}
              <div className="px-4 py-2.5 bg-surface-container flex flex-col sm:flex-row items-center justify-between gap-3 text-on-surface-variant font-body-sm text-body-sm border-t border-outline-variant/30">
                <div className="flex items-center gap-4">
                  <span>
                    Showing <strong className="text-primary font-mono-data">1 - {filteredCourses.length}</strong> of{" "}
                    <strong className="text-primary font-mono-data">24</strong> Programs
                  </span>
                  <div className="flex items-center gap-1">
                    <span>Rows:</span>
                    <select className="bg-surface-container-low px-1.5 py-0.5 font-mono-data text-mono-data text-primary focus:outline-none border border-outline-variant/30">
                      <option>6</option>
                      <option>12</option>
                      <option>24</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono-data text-mono-data">
                  <button className="px-2 py-1 bg-surface-container-low text-on-surface-variant hover:text-primary border border-outline-variant/30">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button className="px-2.5 py-1 bg-primary text-on-primary font-semibold">1</button>
                  <button className="px-2.5 py-1 bg-surface-container-low text-primary hover:bg-surface-container-high border border-outline-variant/30">
                    2
                  </button>
                  <button className="px-2.5 py-1 bg-surface-container-low text-primary hover:bg-surface-container-high border border-outline-variant/30">
                    3
                  </button>
                  <button className="px-2.5 py-1 bg-surface-container-low text-primary hover:bg-surface-container-high border border-outline-variant/30">
                    4
                  </button>
                  <button className="px-2 py-1 bg-surface-container-low text-on-surface-variant hover:text-primary border border-outline-variant/30">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Academic Accreditation Footnote & Visual Analytics Strip */}
            <div className="bg-surface-container-lowest p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-outline-variant/30">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-secondary flex-shrink-0" />
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
                    Curriculum Compliance Framework
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    All 24 active schemes audited under Washington Accord Tier-1 guidelines with automatic prerequisite
                    chain locks.
                  </div>
                </div>
              </div>

              {/* Sparkline Distribution SVG */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex flex-col text-right">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Elective Ratio
                  </span>
                  <span className="font-mono-data text-mono-data font-bold text-primary">28.4% UG</span>
                </div>
                <svg className="w-24 h-8 text-secondary" fill="none" viewBox="0 0 100 30">
                  <path
                    d="M0 25 L15 20 L30 22 L45 10 L60 14 L75 5 L90 8 L100 2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M0 25 L15 20 L30 22 L45 10 L60 14 L75 5 L90 8 L100 2 V30 H0 Z"
                    fill="currentColor"
                    fillOpacity="0.1"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Active Program Syllabus Studio */}
          <div className="xl:col-span-4 flex flex-col space-y-6">
            <div className="bg-surface-container-lowest shadow-sm flex flex-col border border-outline-variant/30">
              {/* Active Program Studio Header */}
              <div className="bg-primary text-on-primary p-4">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-primary-container text-on-primary-container font-mono-data text-[0.6875rem] uppercase tracking-wider">
                    Active Workspace
                  </span>
                  <div className="flex items-center gap-1 font-label-sm text-label-sm text-secondary-container">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Dean Approved</span>
                  </div>
                </div>
                <h2 className="mt-2 font-headline-sm text-headline-sm text-on-primary tracking-tight font-bold">
                  {selectedCourse.code} • {selectedCourse.title}
                </h2>
                <div className="mt-1 flex items-center justify-between text-on-primary-container font-body-sm text-body-sm">
                  <span>
                    Duration: <strong className="text-on-primary font-mono-data">{selectedCourse.duration}</strong>
                  </span>
                  <span>
                    Total Fees:{" "}
                    <strong className="text-on-primary font-mono-data">
                      ${selectedCourse.totalTuition.toLocaleString()}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Semester Tab Ribbon */}
              <div className="bg-surface-container-low px-2 pt-2 flex items-center gap-1 overflow-x-auto border-b border-outline-variant/30">
                {Array.from({ length: selectedCourse.semesters || 8 }, (_, i) => i + 1).map((sem) => {
                  const isActive = selectedSemester === sem;
                  return (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`px-3 py-1.5 font-label-sm text-label-sm uppercase whitespace-nowrap transition-colors ${
                        isActive
                          ? "font-bold bg-surface-container-lowest text-primary shadow-sm border-t-2 border-t-secondary"
                          : "text-on-surface-variant hover:text-primary"
                      }`}
                    >
                      Sem {sem} {isActive && "(Active)"}
                    </button>
                  );
                })}
              </div>

              {/* Semester Summary Stat */}
              <div className="px-4 py-2 bg-surface-container flex items-center justify-between text-on-surface font-body-sm text-body-sm border-b border-outline-variant/30">
                <span className="font-semibold text-primary">Semester {selectedSemester} Subject Manifest</span>
                <span className="font-mono-data text-mono-data bg-surface-container-lowest px-2 py-0.5 text-secondary font-bold text-xs border border-outline-variant/30">
                  {currentTotalCredits.toFixed(1)} Academic Credits
                </span>
              </div>

              {/* Current Semester Subjects List (Vertical Stack) */}
              <div className="p-3 divide-y divide-surface-container space-y-1 max-h-[360px] overflow-y-auto">
                {currentSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="pt-2 pb-2 px-2 hover:bg-surface-container-low transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono-data text-mono-data font-bold text-primary">{subject.code}</span>
                          <span className="text-primary font-medium font-body-sm text-body-sm">{subject.title}</span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-on-surface-variant font-body-sm text-[0.75rem]">
                          <span
                            className={`px-1.5 py-0.5 font-label-sm text-[0.625rem] uppercase ${
                              subject.type === "Practical Lab"
                                ? "bg-secondary-container text-on-secondary-container"
                                : "bg-surface-container text-primary"
                            }`}
                          >
                            {subject.type}
                          </span>
                          <span>{subject.instructor}</span>
                          <span className="text-secondary font-semibold">Lab: {subject.labHours}</span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end flex-shrink-0">
                        <span className="font-mono-data text-mono-data font-bold text-primary text-xs">
                          {subject.credits.toFixed(1)} CR
                        </span>
                        <div className="flex gap-1 mt-1 text-on-surface-variant">
                          <button
                            onClick={() => showToast(`Modifying ${subject.code} syllabus params`)}
                            className="hover:text-primary p-0.5"
                            title="Edit Subject"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDetachSubject(subject.id, subject.code)}
                            className="hover:text-error p-0.5"
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

              {/* Quick Module Injection Drawer / Inline Form */}
              <div className="p-4 bg-surface-container-low border-t border-outline-variant/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                    <Plus className="w-4 h-4 text-secondary" />
                    Add Subject to Semester {selectedSemester}
                  </span>
                  <span className="text-on-surface-variant font-mono-data text-mono-data text-[0.75rem]">
                    Sem {selectedSemester} Scope
                  </span>
                </div>
                <form className="space-y-3" onSubmit={handleAddSubject}>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1">
                        Subject Code
                      </label>
                      <input
                        id="addSubjectCodeInput"
                        type="text"
                        value={newSubCode}
                        onChange={(e) => setNewSubCode(e.target.value)}
                        placeholder="e.g. CS406"
                        className="w-full bg-surface-container-lowest px-2 py-1.5 font-mono-data text-mono-data text-primary focus:outline-none border border-outline-variant/30 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1">
                        Subject Type
                      </label>
                      <select
                        value={newSubType}
                        onChange={(e) => setNewSubType(e.target.value as Subject["type"])}
                        className="w-full bg-surface-container-lowest px-2 py-1.5 font-body-sm text-body-sm text-primary focus:outline-none border border-outline-variant/30 text-xs"
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
                    <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1">
                      Full Subject Title
                    </label>
                    <input
                      type="text"
                      value={newSubTitle}
                      onChange={(e) => setNewSubTitle(e.target.value)}
                      placeholder="e.g. Computer Networks & Protocols"
                      className="w-full bg-surface-container-lowest px-2 py-1.5 font-body-sm text-body-sm text-primary focus:outline-none border border-outline-variant/30 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1">
                        Credits
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={newSubCredits}
                        onChange={(e) => setNewSubCredits(parseFloat(e.target.value) || 0)}
                        className="w-full bg-surface-container-lowest px-2 py-1.5 font-mono-data text-mono-data text-primary focus:outline-none border border-outline-variant/30 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1">
                        Theory (Hr/Wk)
                      </label>
                      <input
                        type="number"
                        value={newSubTheoryHours}
                        onChange={(e) => setNewSubTheoryHours(parseInt(e.target.value) || 0)}
                        className="w-full bg-surface-container-lowest px-2 py-1.5 font-mono-data text-mono-data text-primary focus:outline-none border border-outline-variant/30 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1">
                        Lab (Hr/Wk)
                      </label>
                      <input
                        type="text"
                        value={newSubLabHours}
                        onChange={(e) => setNewSubLabHours(e.target.value)}
                        className="w-full bg-surface-container-lowest px-2 py-1.5 font-mono-data text-mono-data text-primary focus:outline-none border border-outline-variant/30 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1">
                      Faculty Lead / Instructor
                    </label>
                    <select
                      value={newSubInstructor}
                      onChange={(e) => setNewSubInstructor(e.target.value)}
                      className="w-full bg-surface-container-lowest px-2 py-1.5 font-body-sm text-body-sm text-primary focus:outline-none border border-outline-variant/30 text-xs"
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
                      className="w-full py-2 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save & Attach to Curriculum</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Regulatory Compliance Validation Box */}
              <div className="p-3 bg-surface-container text-on-surface-variant font-body-sm text-[0.75rem] flex items-center gap-2 border-t border-outline-variant/30">
                <ShieldAlert className="w-5 h-5 text-secondary flex-shrink-0" />
                <p>Curriculum aligned with IEEE/ACM Computing Curricula Guidelines. Prerequisite trees locked.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container-lowest max-w-lg w-full shadow-2xl border border-outline-variant/40 animate-in fade-in zoom-in-95">
            <div className="bg-primary text-on-primary px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary-container" />
                <h3 className="font-headline-sm text-headline-sm uppercase font-bold tracking-tight">
                  + Create Degree Program
                </h3>
              </div>
              <button
                onClick={() => setIsAddCourseModalOpen(false)}
                className="text-on-primary/70 hover:text-on-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Course Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CY-BTECH"
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-mono-data text-mono-data text-primary border border-outline-variant/40 text-xs focus:outline-none focus:bg-surface-container-lowest"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Program Domain
                  </label>
                  <select
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value as Course["category"])}
                    className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  >
                    <option value="Eng & Tech">Eng & Tech</option>
                    <option value="Management & Business">Management & Business</option>
                    <option value="Applied Sciences">Applied Sciences</option>
                    <option value="Design & Media">Design & Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                  Full Degree Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech in Cyber Security & Forensic Systems"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary border border-outline-variant/40 text-xs focus:outline-none focus:bg-surface-container-lowest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Department
                  </label>
                  <select
                    value={newCourseDept}
                    onChange={(e) => setNewCourseDept(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  >
                    <option>Dept of Computing & IT</option>
                    <option>Dept of AI & Robotics</option>
                    <option>School of Management</option>
                    <option>Dept of ECE</option>
                    <option>Dept of Applied Sciences</option>
                    <option>Faculty of Design</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Duration & Semesters
                  </label>
                  <select
                    value={newCourseDuration}
                    onChange={(e) => setNewCourseDuration(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  >
                    <option>4 Yrs (8 Sems)</option>
                    <option>2 Yrs (4 Sems)</option>
                    <option>3 Yrs (6 Sems)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Required Credits
                  </label>
                  <input
                    type="number"
                    value={newCourseCredits}
                    onChange={(e) => setNewCourseCredits(parseInt(e.target.value) || 0)}
                    className="w-full bg-surface-container-low px-3 py-2 font-mono-data text-mono-data text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Tuition Fee Per Annum ($)
                  </label>
                  <input
                    type="number"
                    value={newCourseTuition}
                    onChange={(e) => setNewCourseTuition(parseInt(e.target.value) || 0)}
                    className="w-full bg-surface-container-low px-3 py-2 font-mono-data text-mono-data text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsAddCourseModalOpen(false)}
                  className="px-4 py-2 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors flex items-center gap-1.5 shadow-sm"
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

