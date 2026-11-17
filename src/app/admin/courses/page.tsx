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
  CheckCircle2,
  Eye,
  ChevronDown,
  ChevronUp,
  Grid,
  GraduationCap,
  Check
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
  ],
  "CS-BTECH-1": [
    {
      id: "cs1-1",
      code: "CS101",
      title: "Problem Solving & C Programming",
      type: "Core Theory",
      instructor: "Dr. Elena Rostova",
      labHours: "None",
      credits: 4.0,
      theoryHours: 3,
      semester: 1
    },
    {
      id: "cs1-2",
      code: "MA101",
      title: "Engineering Mathematics I",
      type: "Core Theory",
      instructor: "Prof. S. Ramanujan",
      labHours: "None",
      credits: 4.0,
      theoryHours: 4,
      semester: 1
    },
    {
      id: "cs1-3",
      code: "PH101",
      title: "Engineering Physics & Solid State",
      type: "Core Theory",
      instructor: "Dr. Alistair Chen",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 1
    },
    {
      id: "cs1-4",
      code: "CS102L",
      title: "Computing Tools & Linux CLI Lab",
      type: "Practical Lab",
      instructor: "Inst. Jenkins",
      labHours: "4 Hrs/Wk",
      credits: 2.0,
      theoryHours: 0,
      semester: 1
    }
  ],
  "AI-BTECH-4": [
    {
      id: "ai4-1",
      code: "AI401",
      title: "Deep Learning & Neural Architectures",
      type: "Core Theory",
      instructor: "Dr. Elena Rostova",
      labHours: "None",
      credits: 4.0,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "ai4-2",
      code: "AI402",
      title: "Reinforcement Learning & Multi-Agent",
      type: "Core Theory",
      instructor: "Prof. Rajesh K. Sharma",
      labHours: "None",
      credits: 4.0,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "ai4-3",
      code: "AI403",
      title: "Sensor Fusion & ROS Robotics",
      type: "Program Elective",
      instructor: "Prof. Marcus Sterling",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "ai4-4",
      code: "AI404L",
      title: "PyTorch & GPU Model Lab",
      type: "Practical Lab",
      instructor: "Dr. Vikram Seth",
      labHours: "4 Hrs/Wk",
      credits: 2.5,
      theoryHours: 0,
      semester: 4
    },
    {
      id: "ai4-5",
      code: "AI405",
      title: "Ethics & Safety in Autonomous AI",
      type: "Humanities Elective",
      instructor: "Guest: Dr. Rao",
      labHours: "None",
      credits: 2.0,
      theoryHours: 2,
      semester: 4
    }
  ],
  "AI-BTECH-1": [
    {
      id: "ai1-1",
      code: "AI101",
      title: "Foundations of Artificial Intelligence",
      type: "Core Theory",
      instructor: "Dr. Elena Rostova",
      labHours: "None",
      credits: 4.0,
      theoryHours: 3,
      semester: 1
    },
    {
      id: "ai1-2",
      code: "MA103",
      title: "Linear Algebra & Multivariable Calculus",
      type: "Core Theory",
      instructor: "Prof. S. Ramanujan",
      labHours: "None",
      credits: 4.0,
      theoryHours: 4,
      semester: 1
    },
    {
      id: "ai1-3",
      code: "AI102L",
      title: "Python for Data Science & AI Lab",
      type: "Practical Lab",
      instructor: "Inst. Jenkins",
      labHours: "4 Hrs/Wk",
      credits: 2.5,
      theoryHours: 0,
      semester: 1
    }
  ],
  "MBA-EXEC-1": [
    {
      id: "mba1-1",
      code: "MBA501",
      title: "Strategic Corporate Leadership",
      type: "Core Theory",
      instructor: "Prof. Marcus Sterling",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 1
    },
    {
      id: "mba1-2",
      code: "MBA502",
      title: "Advanced Financial Management & Valuation",
      type: "Core Theory",
      instructor: "Dr. Sarah Lin",
      labHours: "None",
      credits: 4.0,
      theoryHours: 4,
      semester: 1
    },
    {
      id: "mba1-3",
      code: "MBA503",
      title: "Technology Innovation Management",
      type: "Core Theory",
      instructor: "Dr. Alistair Chen",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 1
    },
    {
      id: "mba1-4",
      code: "MBA504",
      title: "Business Analytics & Strategic Decisions",
      type: "Program Elective",
      instructor: "Dr. Vikram Seth",
      labHours: "None",
      credits: 3.0,
      theoryHours: 3,
      semester: 1
    }
  ],
  "MBA-EXEC-2": [
    {
      id: "mba2-1",
      code: "MBA506",
      title: "Global Supply Chain Operations",
      type: "Core Theory",
      instructor: "Prof. Marcus Sterling",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 2
    },
    {
      id: "mba2-2",
      code: "MBA507",
      title: "Venture Capital & Tech Ventures",
      type: "Program Elective",
      instructor: "Dr. Sarah Lin",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 2
    },
    {
      id: "mba2-3",
      code: "MBA508",
      title: "Organizational Design & Talent Strategy",
      type: "Core Theory",
      instructor: "Guest: Dr. Rao",
      labHours: "None",
      credits: 3.0,
      theoryHours: 3,
      semester: 2
    }
  ],
  "ECE-BTECH-4": [
    {
      id: "ec4-1",
      code: "EC401",
      title: "Signals & Digital Signal Processing",
      type: "Core Theory",
      instructor: "Prof. Rajesh K. Sharma",
      labHours: "None",
      credits: 4.0,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "ec4-2",
      code: "EC402",
      title: "Microprocessors & Embedded Systems",
      type: "Core Theory",
      instructor: "Dr. Alistair Chen",
      labHours: "None",
      credits: 4.0,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "ec4-3",
      code: "EC403",
      title: "Electromagnetic Fields & Waveguides",
      type: "Core Theory",
      instructor: "Prof. Marcus Sterling",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "ec4-4",
      code: "EC404L",
      title: "DSP & Embedded FPGA Systems Lab",
      type: "Practical Lab",
      instructor: "Inst. Jenkins",
      labHours: "4 Hrs/Wk",
      credits: 2.0,
      theoryHours: 0,
      semester: 4
    }
  ],
  "DS-MSC-1": [
    {
      id: "ds1-1",
      code: "DS501",
      title: "Statistical Inference & Bayesian Modeling",
      type: "Core Theory",
      instructor: "Dr. Vikram Seth",
      labHours: "None",
      credits: 4.0,
      theoryHours: 4,
      semester: 1
    },
    {
      id: "ds1-2",
      code: "DS502",
      title: "Big Data Engineering & Apache Spark",
      type: "Core Theory",
      instructor: "Prof. Rajesh K. Sharma",
      labHours: "None",
      credits: 4.0,
      theoryHours: 3,
      semester: 1
    },
    {
      id: "ds1-3",
      code: "DS503",
      title: "Time-Series Analysis & Predictive Forecasting",
      type: "Program Elective",
      instructor: "Dr. Elena Rostova",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 1
    },
    {
      id: "ds1-4",
      code: "DS504L",
      title: "Distributed Data Analytics Cloud Lab",
      type: "Practical Lab",
      instructor: "Inst. Jenkins",
      labHours: "4 Hrs/Wk",
      credits: 2.5,
      theoryHours: 0,
      semester: 1
    }
  ],
  "DES-BDES-4": [
    {
      id: "des4-1",
      code: "DES401",
      title: "Human-Computer Interaction & Usability",
      type: "Core Theory",
      instructor: "Dr. Alistair Chen",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "des4-2",
      code: "DES402",
      title: "Design Systems & Component Architecture",
      type: "Core Theory",
      instructor: "Prof. Marcus Sterling",
      labHours: "None",
      credits: 4.0,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "des4-3",
      code: "DES403",
      title: "Typography, Motion & Visual Systems",
      type: "Program Elective",
      instructor: "Dr. Sarah Lin",
      labHours: "None",
      credits: 3.5,
      theoryHours: 3,
      semester: 4
    },
    {
      id: "des4-4",
      code: "DES404L",
      title: "Interactive Prototyping & Figma Lab",
      type: "Practical Lab",
      instructor: "Inst. Jenkins",
      labHours: "4 Hrs/Wk",
      credits: 3.0,
      theoryHours: 0,
      semester: 4
    }
  ]
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course>(initialCourses[0]);
  const [selectedSemester, setSelectedSemester] = useState<number>(4);
  const [workspaceView, setWorkspaceView] = useState<"studio" | "all">("studio");
  const [isAddSubjectExpanded, setIsAddSubjectExpanded] = useState<boolean>(false);
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

  // View & Edit Course Modals State
  const [isViewCourseModalOpen, setIsViewCourseModalOpen] = useState(false);
  const [viewingCourse, setViewingCourse] = useState<Course>(initialCourses[0]);

  const [isEditCourseModalOpen, setIsEditCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course>(initialCourses[0]);
  const [editCourseCode, setEditCourseCode] = useState("");
  const [editCourseTitle, setEditCourseTitle] = useState("");
  const [editCourseDept, setEditCourseDept] = useState("Dept of Computing & IT");
  const [editCourseDuration, setEditCourseDuration] = useState("4 Yrs (8 Sems)");
  const [editCourseCredits, setEditCourseCredits] = useState(160);
  const [editCourseTuition, setEditCourseTuition] = useState(185000);
  const [editCourseCategory, setEditCourseCategory] = useState<Course["category"]>("Eng & Tech");
  const [editCourseStatus, setEditCourseStatus] = useState<Course["status"]>("Active");

  const handleSelectCourse = (c: Course) => {
    setSelectedCourse(c);
    if (selectedSemester > c.semesters) {
      setSelectedSemester(1);
    }
  };

  const handleOpenViewModal = (c: Course) => {
    setViewingCourse(c);
    handleSelectCourse(c);
    setIsViewCourseModalOpen(true);
  };

  const handleOpenEditModal = (c: Course) => {
    setEditingCourse(c);
    setEditCourseCode(c.code);
    setEditCourseTitle(c.title);
    setEditCourseDept(c.department);
    setEditCourseDuration(c.duration);
    setEditCourseCredits(c.credits);
    setEditCourseTuition(c.tuitionYear);
    setEditCourseCategory(c.category);
    setEditCourseStatus(c.status);
    setIsEditCourseModalOpen(true);
  };

  const handleSaveEditedCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCourseCode.trim() || !editCourseTitle.trim()) {
      alert("Please enter program code and title");
      return;
    }

    const updated: Course = {
      ...editingCourse,
      code: editCourseCode.trim().toUpperCase(),
      title: editCourseTitle.trim(),
      department: editCourseDept,
      duration: editCourseDuration,
      semesters: editCourseDuration.includes("2") ? 4 : editCourseDuration.includes("3") ? 6 : 8,
      credits: Number(editCourseCredits),
      tuitionYear: Number(editCourseTuition),
      totalTuition: Number(editCourseTuition) * (editCourseDuration.includes("2") ? 2 : 4),
      category: editCourseCategory,
      status: editCourseStatus
    };

    setCourses(prev => prev.map(c => c.id === editingCourse.id ? updated : c));
    if (selectedCourse.id === editingCourse.id) {
      setSelectedCourse(updated);
    }
    setIsEditCourseModalOpen(false);
    showToast(`Degree Program ${updated.code} updated successfully!`);
  };

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
  const currentSubjects = subjectsMap[currentKey] || [];
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
      [currentKey]: [...(prev[currentKey] || []), newSub]
    }));

    // Update subject count in courses
    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id
          ? { ...c, subjectsCount: c.subjectsCount + 1 }
          : c
      )
    );
    setSelectedCourse((prev) => ({
      ...prev,
      subjectsCount: prev.subjectsCount + 1
    }));

    // Reset form
    setNewSubCode("");
    setNewSubTitle("");
    setNewSubCredits(3.0);
    setNewSubTheoryHours(3);
    setNewSubLabHours("0");
    setIsAddSubjectExpanded(false);
    showToast(`Subject ${newSub.code} added to ${selectedCourse.code} Semester ${selectedSemester}!`);
  };

  // Detach subject handler
  const handleDetachSubject = (subId: string, subCode: string) => {
    setSubjectsMap((prev) => ({
      ...prev,
      [currentKey]: (prev[currentKey] || []).filter((s) => s.id !== subId)
    }));

    setCourses((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id
          ? { ...c, subjectsCount: Math.max(0, c.subjectsCount - 1) }
          : c
      )
    );
    setSelectedCourse((prev) => ({
      ...prev,
      subjectsCount: Math.max(0, prev.subjectsCount - 1)
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
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5">
            {/* Segmented Program Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100">
              {[
                { id: "All", label: "All Programs", count: courses.length },
                { id: "Eng & Tech", label: "Engineering & Tech", count: courses.filter(c => c.category === "Eng & Tech").length },
                { id: "Management & Business", label: "Management", count: courses.filter(c => c.category === "Management & Business").length },
                { id: "Applied Sciences", label: "Applied Sciences", count: courses.filter(c => c.category === "Applied Sciences").length },
                { id: "Design & Media", label: "Design & Media", count: courses.filter(c => c.category === "Design & Media").length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeCategory === tab.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                      activeCategory === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Query Controls Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              <div className="lg:col-span-5 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search code, title or department..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="lg:col-span-3">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="all">All Departments</option>
                  <option value="computing">Computing &amp; IT</option>
                  <option value="ai">AI &amp; Robotics</option>
                  <option value="management">School of Mgmt</option>
                  <option value="ece">Electronics &amp; Comm</option>
                  <option value="design">Faculty of Design</option>
                </select>
              </div>
              <div className="lg:col-span-2">
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="all">All Durations</option>
                  <option value="4">4 Yrs (8 Sem)</option>
                  <option value="2">2 Yrs (4 Sem)</option>
                  <option value="3">3 Yrs (6 Sem)</option>
                </select>
              </div>
              <div className="lg:col-span-2 flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="act">Active</option>
                  <option value="rev">Review</option>
                </select>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDepartmentFilter("all");
                    setDurationFilter("all");
                    setStatusFilter("all");
                    setActiveCategory("All");
                    showToast("Course filters reset to default.");
                  }}
                  className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-xl border border-slate-200 transition-colors shrink-0"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* High-Density Course Directory Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Degree Programs Ledger
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Showing {filteredCourses.length} of {courses.length} Programs
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-200/80">
                    <th className="py-3 px-4">Code &amp; Course Title</th>
                    <th className="py-3 px-4">Faculty / Dept</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Credits</th>
                    <th className="py-3 px-4">Tuition / Year</th>
                    <th className="py-3 px-4">Batches</th>
                    <th className="py-3 px-4">Subjects</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                          <BookOpen className="w-10 h-10 mb-2 text-slate-300" />
                          <p className="text-sm font-semibold text-slate-700">No matching degree programs found</p>
                          <p className="text-xs text-slate-400 mt-0.5">Try clearing your search query or adjusting your filters</p>
                          <button
                            onClick={() => {
                              setSearchQuery("");
                              setDepartmentFilter("all");
                              setDurationFilter("all");
                              setStatusFilter("all");
                              setActiveCategory("All");
                            }}
                            className="mt-3 px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-semibold transition-colors"
                          >
                            Reset All Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((c) => {
                      const isSelected = selectedCourse.id === c.id;
                      return (
                        <tr
                          key={c.id}
                          onClick={() => handleSelectCourse(c)}
                          className={`hover:bg-slate-50/70 transition-colors cursor-pointer ${
                            isSelected ? "bg-indigo-50/60 hover:bg-indigo-50 border-l-4 border-indigo-600" : ""
                          }`}
                        >
                          <td className="py-3 px-4">
                            <div>
                              <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px] inline-block mb-1 border border-indigo-100">
                                {c.code}
                              </span>
                              <div className="text-slate-900 font-bold leading-snug">
                                {c.title}
                              </div>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {c.category}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {c.department}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                            {c.duration}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-800 whitespace-nowrap">
                            {c.credits} CR
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-mono font-bold text-slate-900 block">
                              ₹{c.tuitionYear.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Tot: ₹{c.totalTuition.toLocaleString("en-IN")}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700">
                            {c.batches}
                          </td>
                          <td className="py-3 px-4 font-mono font-semibold text-slate-800">
                            {c.subjectsCount}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${
                                c.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  c.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                                }`}
                              />
                              <span>{c.status}</span>
                            </span>
                          </td>
                          <td
                            className="py-3 px-4 text-right whitespace-nowrap"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleOpenViewModal(c)}
                                className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                                title="View Course Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenEditModal(c)}
                                className="p-1.5 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                                title="Edit Program"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-4 py-3 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
              <span>
                Showing <strong className="text-slate-800 font-mono">1 - {filteredCourses.length}</strong> of{" "}
                <strong className="text-slate-800 font-mono">{courses.length}</strong> Programs
              </span>
              <div className="flex items-center gap-1 font-mono text-xs">
                <button className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 cursor-pointer">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="px-3 py-1 bg-indigo-600 text-white font-bold rounded-lg">1</button>
                <button className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 cursor-pointer">
                  2
                </button>
                <button className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 cursor-pointer">
                  3
                </button>
                <button className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-200 cursor-pointer">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Active Workspace & Curriculum Studio */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden sticky top-20">
            {/* Active Workspace Header with Navigation Tabs */}
            <div className="bg-[#3D405B] text-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-white/10 text-white font-mono text-[10px] rounded uppercase font-bold tracking-wider">
                    Active Workspace
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-300 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Dean Approved</span>
                </div>
              </div>

              {/* View Switcher: Studio vs All Programs */}
              <div className="flex items-center bg-black/20 p-1 rounded-xl gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setWorkspaceView("studio")}
                  className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    workspaceView === "studio"
                      ? "bg-white text-[#3D405B] shadow-xs"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Curriculum Studio</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWorkspaceView("all")}
                  className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    workspaceView === "all"
                      ? "bg-white text-[#3D405B] shadow-xs"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>All Programs ({courses.length})</span>
                </button>
              </div>

              {/* Studio Mode Header Quick Program Selector */}
              {workspaceView === "studio" && (
                <div className="space-y-2 pt-1 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="text-[11px] font-medium text-slate-300">Active Program:</span>
                    <button
                      type="button"
                      onClick={() => setWorkspaceView("all")}
                      className="text-[11px] text-indigo-200 hover:text-white font-semibold underline underline-offset-2 cursor-pointer"
                    >
                      Browse all {courses.length} &rarr;
                    </button>
                  </div>

                  {/* Program Switcher Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedCourse.id}
                      onChange={(e) => {
                        const found = courses.find((c) => c.id === e.target.value);
                        if (found) {
                          handleSelectCourse(found);
                          showToast(`Loaded ${found.code} into workspace`);
                        }
                      }}
                      className="w-full bg-white/10 hover:bg-white/15 focus:bg-white focus:text-slate-900 border border-white/20 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none transition-all cursor-pointer"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id} className="text-slate-900">
                          {c.code} &bull; {c.title} ({c.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Program Chips Ribbon */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                    {courses.map((c) => {
                      const isCurr = c.id === selectedCourse.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleSelectCourse(c)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                            isCurr
                              ? "bg-white text-[#3D405B] border-white shadow-xs"
                              : "bg-white/10 text-white/90 border-white/10 hover:bg-white/20"
                          }`}
                        >
                          {c.code}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1">
                    <span>Dept: <strong className="text-white font-medium">{selectedCourse.department}</strong></span>
                    <span>Fees: <strong className="text-white font-mono">₹{selectedCourse.totalTuition.toLocaleString("en-IN")}</strong></span>
                  </div>
                </div>
              )}
            </div>

            {/* TAB CONTENT 1: CURRICULUM STUDIO */}
            {workspaceView === "studio" && (
              <div>
                {/* Semester Tab Ribbon */}
                <div className="bg-slate-50 px-3 pt-2.5 flex items-center gap-1.5 overflow-x-auto border-b border-slate-100">
                  {Array.from({ length: selectedCourse.semesters || 8 }, (_, i) => i + 1).map((sem) => {
                    const isActive = selectedSemester === sem;
                    return (
                      <button
                        key={sem}
                        type="button"
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

                {/* Semester Summary Stat + Toggle Add Subject Button */}
                <div className="px-4 py-3 bg-slate-50/70 flex items-center justify-between text-xs border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      Semester {selectedSemester} Subjects
                    </span>
                    <span className="font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold text-[10px] border border-indigo-200">
                      {currentTotalCredits.toFixed(1)} Credits
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddSubjectExpanded(!isAddSubjectExpanded)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      isAddSubjectExpanded
                        ? "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200"
                        : "bg-[#3D405B] text-white hover:bg-[#2E3046] shadow-2xs"
                    }`}
                  >
                    {isAddSubjectExpanded ? (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>Close Form</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add Subject</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Upgraded Subject Creation Form (Collapsible Card with Polished UI/UX) */}
                {isAddSubjectExpanded && (
                  <div className="p-4 bg-gradient-to-b from-indigo-50/40 via-white to-white border-b border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                          <Plus className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-slate-800">
                            Add Subject to {selectedCourse.code}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-medium">
                            Attaching to Semester {selectedSemester} curriculum
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddSubjectExpanded(false)}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form className="space-y-3 text-xs" onSubmit={handleAddSubject}>
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Subject Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={newSubCode}
                            onChange={(e) => setNewSubCode(e.target.value)}
                            placeholder="e.g. CS406"
                            className="w-full bg-white px-3 py-2 font-mono font-bold text-slate-800 focus:outline-none border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Subject Type
                          </label>
                          <select
                            value={newSubType}
                            onChange={(e) => setNewSubType(e.target.value as Subject["type"])}
                            className="w-full bg-white px-3 py-2 text-slate-800 focus:outline-none border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer font-medium"
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
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                          Full Subject Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newSubTitle}
                          onChange={(e) => setNewSubTitle(e.target.value)}
                          placeholder="e.g. Cloud Computing & Distributed Architectures"
                          className="w-full bg-white px-3 py-2 text-slate-800 focus:outline-none border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder-slate-400 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                          Assigned Faculty Lead / Instructor
                        </label>
                        <select
                          value={newSubInstructor}
                          onChange={(e) => setNewSubInstructor(e.target.value)}
                          className="w-full bg-white px-3 py-2 text-slate-800 focus:outline-none border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                        >
                          <option>Dr. Elena Rostova (Assoc. Prof)</option>
                          <option>Prof. Rajesh K. Sharma (Professor)</option>
                          <option>Dr. Alistair Chen (Dept Chair)</option>
                          <option>Prof. Marcus Sterling (Asst. Prof)</option>
                          <option>Dr. Sarah Lin (Finance & Strategy)</option>
                          <option>Dr. Vikram Seth (AI & Data Science)</option>
                          <option>Inst. Jenkins (Lab Lead)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5 pt-0.5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Credits (CR)
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            min="0.5"
                            max="12"
                            value={newSubCredits}
                            onChange={(e) => setNewSubCredits(parseFloat(e.target.value) || 0)}
                            className="w-full bg-white px-3 py-2 font-mono font-bold text-slate-800 focus:outline-none border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Theory (h/wk)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={newSubTheoryHours}
                            onChange={(e) => setNewSubTheoryHours(parseInt(e.target.value) || 0)}
                            className="w-full bg-white px-3 py-2 font-mono text-slate-800 focus:outline-none border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                            Lab Hours
                          </label>
                          <select
                            value={newSubLabHours}
                            onChange={(e) => setNewSubLabHours(e.target.value)}
                            className="w-full bg-white px-2.5 py-2 font-mono text-slate-800 focus:outline-none border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                          >
                            <option value="0">None</option>
                            <option value="2">2 Hrs/Wk</option>
                            <option value="4">4 Hrs/Wk</option>
                            <option value="6">6 Hrs/Wk</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setIsAddSubjectExpanded(false)}
                          className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold transition-colors cursor-pointer text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer text-xs"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Attach to Curriculum</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Current Semester Subjects List */}
                <div className="p-3 divide-y divide-slate-100 space-y-1 max-h-[380px] overflow-y-auto">
                  {currentSubjects.length === 0 ? (
                    <div className="py-10 px-4 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 mx-auto flex items-center justify-center mb-2.5">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        No subjects catalogued for Sem {selectedSemester}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                        This semester does not have any attached core or elective courses yet.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsAddSubjectExpanded(true)}
                        className="mt-3 px-3 py-1.5 bg-[#3D405B] hover:bg-[#2E3046] text-white rounded-xl text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Subject to Sem {selectedSemester}</span>
                      </button>
                    </div>
                  ) : (
                    currentSubjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="py-2.5 px-2 hover:bg-slate-50 rounded-xl transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px] border border-indigo-100">
                                {subject.code}
                              </span>
                              <span className="text-slate-800 font-bold text-xs">{subject.title}</span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                              <span
                                className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${
                                  subject.type === "Practical Lab"
                                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                                    : subject.type === "Program Elective"
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : subject.type === "Humanities Elective"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {subject.type}
                              </span>
                              <span className="text-slate-600">{subject.instructor}</span>
                              <span className="text-blue-600 font-medium">Lab: {subject.labHours}</span>
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end shrink-0">
                            <span className="font-mono font-bold text-[#3D405B] text-xs">
                              {subject.credits.toFixed(1)} CR
                            </span>
                            <div className="flex gap-1 mt-1 text-slate-400">
                              <button
                                type="button"
                                onClick={() => showToast(`Editing syllabus for ${subject.code}`)}
                                className="hover:text-blue-600 p-1 rounded hover:bg-blue-50 cursor-pointer"
                                title="Edit Subject Parameters"
                              >
                                <Sliders className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDetachSubject(subject.id, subject.code)}
                                className="hover:text-rose-600 p-1 rounded hover:bg-rose-50 cursor-pointer"
                                title="Detach Subject"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Regulatory Compliance Validation Box */}
                <div className="p-3 bg-slate-50 text-slate-500 text-[11px] flex items-center gap-2 border-t border-slate-100">
                  <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p>Curriculum aligned with IEEE/ACM Computing Guidelines. Prerequisite trees locked.</p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: ALL PROGRAMS DIRECTORY (Shows ALL programs inside Active Workspace) */}
            {workspaceView === "all" && (
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    All Degree Programs ({courses.length})
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Click to load into studio
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
                  {courses.map((c) => {
                    const isSelected = selectedCourse.id === c.id;
                    return (
                      <div
                        key={c.id}
                        className={`p-3 rounded-2xl border transition-all ${
                          isSelected
                            ? "bg-indigo-50/70 border-indigo-300 shadow-xs ring-1 ring-indigo-200"
                            : "bg-white hover:bg-slate-50 border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded text-[11px] border border-indigo-100 shadow-2xs">
                                {c.code}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                {c.category}
                              </span>
                            </div>
                            <h4 className="font-bold text-xs text-slate-900 leading-snug">
                              {c.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">{c.department}</p>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 border ${
                              c.status === "Active"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>

                        {/* Metrics Bar */}
                        <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-[11px]">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Duration</span>
                            <span className="font-mono font-bold text-slate-700">{c.duration}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Tuition / Yr</span>
                            <span className="font-mono font-bold text-slate-900">₹{c.tuitionYear.toLocaleString("en-IN")}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-semibold">Subjects</span>
                            <span className="font-mono font-bold text-indigo-700">{c.subjectsCount} Subjects</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-3 pt-2 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              handleSelectCourse(c);
                              setWorkspaceView("studio");
                              showToast(`Loaded ${c.code} into Curriculum Studio`);
                            }}
                            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                            }`}
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{isSelected ? "Currently Active Studio" : "Open in Studio"}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenViewModal(c)}
                            className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors cursor-pointer"
                            title="View Program Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(c)}
                            className="p-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition-colors cursor-pointer"
                            title="Edit Program"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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

      {/* View Course Details Modal */}
      {isViewCourseModalOpen && viewingCourse && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white max-w-xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-[#3D405B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-indigo-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white">
                      {viewingCourse.code}
                    </span>
                    <span className="text-[11px] text-white/80 font-medium">
                      {viewingCourse.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white mt-0.5">
                    {viewingCourse.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setIsViewCourseModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              {/* Department & Status Header banner */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                    Academic Department
                  </span>
                  <span className="font-semibold text-slate-800 text-xs">
                    {viewingCourse.department}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block mb-1">
                    Accreditation Status
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold rounded-full border ${
                      viewingCourse.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        viewingCourse.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    <span>{viewingCourse.status}</span>
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Duration
                  </span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {viewingCourse.duration}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {viewingCourse.semesters} Semesters
                  </span>
                </div>

                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Required Credits
                  </span>
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {viewingCourse.credits} CR
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Total Curriculum
                  </span>
                </div>

                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Tuition / Year
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    ₹{viewingCourse.tuitionYear.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Per Academic Annum
                  </span>
                </div>

                <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Est. Total Fee
                  </span>
                  <span className="text-xs font-bold text-indigo-700 font-mono">
                    ₹{viewingCourse.totalTuition.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Full Program Cost
                  </span>
                </div>
              </div>

              {/* Batches & Curriculum overview */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-indigo-50/40 rounded-xl border border-indigo-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 block">
                      Enrolled Batches
                    </span>
                    <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">
                      {viewingCourse.batches} Active Batches
                    </span>
                  </div>
                  <Layers className="w-5 h-5 text-indigo-500" />
                </div>

                <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                      Catalogued Subjects
                    </span>
                    <span className="text-sm font-bold text-slate-800 font-mono mt-0.5 block">
                      {viewingCourse.subjectsCount} Modular Courses
                    </span>
                  </div>
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setIsViewCourseModalOpen(false);
                    handleSelectCourse(viewingCourse);
                    setWorkspaceView("studio");
                    showToast(`Opened ${viewingCourse.code} in Curriculum Studio`);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Inspect in Studio</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsViewCourseModalOpen(false);
                      handleOpenEditModal(viewingCourse);
                    }}
                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Program</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsViewCourseModalOpen(false)}
                    className="px-4 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {isEditCourseModalOpen && editingCourse && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-[#3D405B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-200" />
                <div>
                  <h3 className="font-bold text-sm">
                    Edit Degree Program
                  </h3>
                  <span className="text-[10px] text-white/70 font-mono">
                    Updating {editingCourse.code}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditCourseModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedCourse} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={editCourseCode}
                    onChange={(e) => setEditCourseCode(e.target.value)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs font-mono font-bold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Program Domain
                  </label>
                  <select
                    value={editCourseCategory}
                    onChange={(e) => setEditCourseCategory(e.target.value as Course["category"])}
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
                  value={editCourseTitle}
                  onChange={(e) => setEditCourseTitle(e.target.value)}
                  className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Department
                  </label>
                  <select
                    value={editCourseDept}
                    onChange={(e) => setEditCourseDept(e.target.value)}
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
                    value={editCourseDuration}
                    onChange={(e) => setEditCourseDuration(e.target.value)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                  >
                    <option>4 Yrs (8 Sems)</option>
                    <option>2 Yrs (4 Sems)</option>
                    <option>3 Yrs (6 Sems)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Credits (CR)
                  </label>
                  <input
                    type="number"
                    value={editCourseCredits}
                    onChange={(e) => setEditCourseCredits(parseInt(e.target.value) || 0)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Tuition / Yr (₹)
                  </label>
                  <input
                    type="number"
                    value={editCourseTuition}
                    onChange={(e) => setEditCourseTuition(parseInt(e.target.value) || 0)}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Status
                  </label>
                  <select
                    value={editCourseStatus}
                    onChange={(e) => setEditCourseStatus(e.target.value as Course["status"])}
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs font-semibold"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditCourseModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold rounded-xl transition-all shadow-xs hover:shadow cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Program</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
