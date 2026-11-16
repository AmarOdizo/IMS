"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  FileCheck,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Lock,
  Plus,
  Printer,
  Search,
  Send,
  Shield,
  TrendingUp,
  Upload,
  UserCheck,
  Users,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Gavel,
  Check,
  BarChart2,
  Sparkles
} from "lucide-react";

interface CandidateExamResult {
  id: string;
  rollNo: string;
  name: string;
  avatar?: string;
  initials?: string;
  theoryMarks: number | string;
  internalMarks: number;
  totalMarks: number | string;
  gradePct: string;
  gradeLabel: string;
  graceMarks: number;
  resultStatus: "Pass" | "Pass (Mod)" | "Absent" | "Fail";
  auditStatus: "Verified" | "Mod Pending" | "Flagged";
  program: string;
  enrollId: string;
  sgpa: number;
  cgpa: number;
  classification: string;
}

const INITIAL_CANDIDATES: CandidateExamResult[] = [
  {
    id: "c-01",
    rollNo: "APX-CS-2023-014",
    name: "Aarav S. Patel",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    theoryMarks: 64,
    internalMarks: 28,
    totalMarks: 92,
    gradePct: "92.0%",
    gradeLabel: "A+ Outstanding",
    graceMarks: 0,
    resultStatus: "Pass",
    auditStatus: "Verified",
    program: "B.Tech Computer Science",
    enrollId: "ENR2023CSE0981",
    sgpa: 8.92,
    cgpa: 8.78,
    classification: "FIRST CLASS (DIST.)"
  },
  {
    id: "c-02",
    rollNo: "APX-CS-2023-018",
    name: "Elena Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    theoryMarks: 58,
    internalMarks: 26,
    totalMarks: 84,
    gradePct: "84.0%",
    gradeLabel: "A Excellent",
    graceMarks: 0,
    resultStatus: "Pass",
    auditStatus: "Verified",
    program: "B.Tech Computer Science",
    enrollId: "ENR2023CSE0985",
    sgpa: 8.65,
    cgpa: 8.52,
    classification: "FIRST CLASS (DIST.)"
  },
  {
    id: "c-03",
    rollNo: "APX-CS-2023-027",
    name: "Marcus Sterling",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    theoryMarks: 48,
    internalMarks: 23,
    totalMarks: 71,
    gradePct: "71.0%",
    gradeLabel: "B+ Good",
    graceMarks: 0,
    resultStatus: "Pass",
    auditStatus: "Verified",
    program: "B.Tech Computer Science",
    enrollId: "ENR2023CSE0994",
    sgpa: 7.85,
    cgpa: 7.72,
    classification: "FIRST CLASS"
  },
  {
    id: "c-04",
    rollNo: "APX-CS-2023-033",
    name: "Chloe Davenport",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    theoryMarks: 26,
    internalMarks: 12,
    totalMarks: "40*",
    gradePct: "40.0%",
    gradeLabel: "P Marginal",
    graceMarks: 2,
    resultStatus: "Pass (Mod)",
    auditStatus: "Mod Pending",
    program: "B.Tech Computer Science",
    enrollId: "ENR2023CSE1002",
    sgpa: 6.2,
    cgpa: 6.45,
    classification: "SECOND CLASS"
  },
  {
    id: "c-05",
    rollNo: "APX-CS-2023-042",
    name: "Kavita Narang",
    initials: "KN",
    theoryMarks: "AB",
    internalMarks: 22,
    totalMarks: "--",
    gradePct: "--",
    gradeLabel: "ABSENT - THEORY",
    graceMarks: 0,
    resultStatus: "Absent",
    auditStatus: "Flagged",
    program: "B.Tech Computer Science",
    enrollId: "ENR2023CSE1015",
    sgpa: 4.8,
    cgpa: 5.9,
    classification: "SUPPLEMENTARY"
  },
  {
    id: "c-06",
    rollNo: "APX-CS-2023-048",
    name: "Rishi Verma",
    initials: "RV",
    theoryMarks: 52,
    internalMarks: 25,
    totalMarks: 77,
    gradePct: "77.0%",
    gradeLabel: "B+ Good",
    graceMarks: 0,
    resultStatus: "Pass",
    auditStatus: "Verified",
    program: "B.Tech Computer Science",
    enrollId: "ENR2023CSE1022",
    sgpa: 8.1,
    cgpa: 7.95,
    classification: "FIRST CLASS"
  }
];

export default function ExamsPage() {
  const [candidates, setCandidates] = useState<CandidateExamResult[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateExamResult>(INITIAL_CANDIDATES[0]);
  const [activeTab, setActiveTab] = useState<"all" | "ledger" | "moderation" | "archive">("ledger");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);

  // New exam form state
  const [newExamTitle, setNewExamTitle] = useState("");
  const [newExamType, setNewExamType] = useState("End-Semester Regular");
  const [newExamStartDate, setNewExamStartDate] = useState("2025-05-15");
  const [newExamEndDate, setNewExamEndDate] = useState("2025-05-30");
  const [newExamBatch, setNewExamBatch] = useState("Batch 2023-27 · Sem IV");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Helper to re-calculate grades when theory or internal changes
  const handleScoreChange = (id: string, field: "theory" | "internal", val: string) => {
    if (isLocked) {
      showToast("Cannot edit: Marks entry ledger is locked. Click 'Unlock Marks Entry' first.");
      return;
    }

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        if (val.toUpperCase() === "AB") {
          const updated: CandidateExamResult = {
            ...c,
            theoryMarks: "AB",
            totalMarks: "--",
            gradePct: "--",
            gradeLabel: "ABSENT - THEORY",
            resultStatus: "Absent",
            auditStatus: "Flagged"
          };
          if (selectedCandidate.id === id) setSelectedCandidate(updated);
          return updated;
        }

        const numVal = parseInt(val) || 0;
        const currentTheory = field === "theory" ? numVal : typeof c.theoryMarks === "number" ? c.theoryMarks : 0;
        const currentInternal = field === "internal" ? numVal : c.internalMarks;
        const newTotal = currentTheory + currentInternal;

        let gradeLabel = "F Fail";
        let gradePct = `${newTotal.toFixed(1)}%`;
        let resultStatus: CandidateExamResult["resultStatus"] = "Pass";
        let graceMarks = c.graceMarks;

        if (newTotal >= 90) {
          gradeLabel = "A+ Outstanding";
        } else if (newTotal >= 80) {
          gradeLabel = "A Excellent";
        } else if (newTotal >= 70) {
          gradeLabel = "B+ Good";
        } else if (newTotal >= 60) {
          gradeLabel = "B Above Average";
        } else if (newTotal >= 50) {
          gradeLabel = "C Average";
        } else if (newTotal >= 40) {
          gradeLabel = "P Marginal";
        } else if (newTotal >= 38) {
          gradeLabel = "P Marginal";
          resultStatus = "Pass (Mod)";
          graceMarks = 40 - newTotal;
        } else {
          gradeLabel = "F Fail";
          resultStatus = "Fail";
        }

        const updated: CandidateExamResult = {
          ...c,
          theoryMarks: currentTheory,
          internalMarks: currentInternal,
          totalMarks: graceMarks > 0 ? `${40}*` : newTotal,
          gradePct,
          gradeLabel,
          graceMarks,
          resultStatus,
          auditStatus: graceMarks > 0 ? "Mod Pending" : "Verified"
        };

        if (selectedCandidate.id === id) {
          setSelectedCandidate(updated);
        }
        return updated;
      })
    );
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamTitle.trim()) {
      showToast("Please enter examination series title.");
      return;
    }
    setIsCreateExamModalOpen(false);
    showToast(`Examination '${newExamTitle}' scheduled successfully.`);
    setNewExamTitle("");
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.rollNo.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeTab === "moderation") return c.auditStatus === "Mod Pending" || c.graceMarks > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2 border border-slate-700">
          <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Header Hero Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Exams &amp; Results Controller</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Examination Cycle Active
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Marks moderation, grade ledger entry, official transcript rendering, and university gazette publication.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => showToast("Exporting bulk transcript PDF bundles (1,240 records)...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Bulk Marksheets</span>
            </button>
            <button
              onClick={() => showToast("Results dispatch successfully broadcast to Student & Guardian Portals.")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shadow-xs transition-all"
            >
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Publish Dispatch</span>
            </button>
            <button
              onClick={() => setIsCreateExamModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Examination</span>
            </button>
          </div>
        </div>

        {/* 4 Standard Redesigned KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Scheduled Exams */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Scheduled Exams
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                18 <span className="text-xs font-normal text-slate-500">Active Series</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <span className="text-emerald-600 font-semibold">8 Done</span>
                <span>•</span>
                <span className="text-indigo-600 font-semibold">6 Ongoing</span>
                <span>•</span>
                <span>4 Upcoming</span>
              </div>
            </div>
          </div>

          {/* Card 2: Paper Evaluation Velocity */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Evaluation Velocity
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <FileCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">4,820</span>
                <span className="text-xs text-slate-500 font-normal">/ 5,100</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 ml-auto">
                  94.5%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: "94.5%" }} />
              </div>
            </div>
          </div>

          {/* Card 3: Institutional Average */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Institutional Average
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900">78.4%</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  GPA 3.42
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2.1% YoY across all faculties</span>
              </div>
            </div>
          </div>

          {/* Card 4: Publishing Queue */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Publishing Queue
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900">3 Batches</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  1,240 Slips
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Pending Dean Sign-off</span>
                <span className="text-indigo-600 font-semibold">Ready to Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Controller Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-3">
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-medium">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Examinations (18)
              </button>
              <button
                onClick={() => setActiveTab("ledger")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "ledger"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Marks Entry Ledger</span>
              </button>
              <button
                onClick={() => setActiveTab("moderation")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === "moderation"
                    ? "bg-white text-amber-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Moderation &amp; Approvals</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  3 Pending
                </span>
              </button>
              <button
                onClick={() => setActiveTab("archive")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "archive"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Published Results Archive
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Marks Ledger Secure Mode</span>
            </div>
          </div>

          {/* Filter dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Program / Department
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                <option>B.Tech Computer Science &amp; Eng.</option>
                <option>B.Tech Electronics &amp; Comm.</option>
                <option>M.Tech Artificial Intelligence</option>
                <option>MBA Systems Management</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Cohort / Term
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                <option>Batch 2023-27 · Semester IV</option>
                <option>Batch 2022-26 · Semester VI</option>
                <option>Batch 2021-25 · Semester VIII</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Course Unit
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                <option>CS401: Database Management Systems</option>
                <option>CS402: Design &amp; Analysis of Algorithms</option>
                <option>CS403: Operating Systems Architecture</option>
                <option>CS404: Theory of Computation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Assessment Series
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                <option>End-Semester Regular (Spring 2025)</option>
                <option>Mid-Term Assessment</option>
                <option>Practical Viva &amp; Lab Review</option>
                <option>Remedial / Supplementary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Split Screen 8 Cols vs 4 Cols */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT AREA: Marks Entry Ledger & Distribution (8 Cols) */}
          <div className="xl:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Unit Header */}
              <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono font-bold text-xs border border-indigo-100">
                      CS401
                    </span>
                    <h2 className="text-base font-bold text-slate-900">Database Management Systems</h2>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      4.0 Credits
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Max Marks: <strong className="text-slate-900">100</strong> (Theory: 70 • Internal/Lab: 30) • Passing Cutoff: 40% aggregate
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>42/45 Verified</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-3 bg-slate-50/60 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setIsLocked(!isLocked);
                      showToast(isLocked ? "Marks Entry UNLOCKED for edit." : "Marks Entry LOCKED & timestamped.");
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isLocked
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isLocked ? "Unlock Ledger" : "Lock Ledger"}</span>
                  </button>
                  <button
                    onClick={() => showToast("CSV Marks Template loaded into staging memory.")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Import CSV</span>
                  </button>
                  <button
                    onClick={() => showToast("Auto-calculated Semester SGPA & CGPA for all candidates.")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 transition-colors"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Calculate GPA</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast("Official Examination Gazette exported (PDF).")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Gazette</span>
                  </button>
                  <div className="relative w-44">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search student..."
                      className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-2.5 py-1 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-3">Roll &amp; Candidate</th>
                      <th className="py-3 px-2 text-center w-24">Theory (70)</th>
                      <th className="py-3 px-2 text-center w-24">Internal (30)</th>
                      <th className="py-3 px-2 text-center w-20">Total (100)</th>
                      <th className="py-3 px-3 text-center">Grade &amp; Score</th>
                      <th className="py-3 px-2 text-center">Grace</th>
                      <th className="py-3 px-2 text-center">Status</th>
                      <th className="py-3 px-3 text-right">Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCandidates.map((c) => {
                      const isSelected = selectedCandidate.id === c.id;

                      return (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedCandidate(c)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-indigo-50/50 hover:bg-indigo-50/70 border-l-4 border-l-indigo-600"
                              : "hover:bg-slate-50/80"
                          }`}
                        >
                          {/* Roll & Candidate */}
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              {c.avatar ? (
                                <img
                                  src={c.avatar}
                                  alt={c.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-mono text-[10px] font-bold text-indigo-700 shrink-0">
                                  {c.initials}
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-slate-900">{c.name}</div>
                                <div className="font-mono text-[11px] text-slate-500">{c.rollNo}</div>
                              </div>
                            </div>
                          </td>

                          {/* Theory Marks */}
                          <td className="py-2.5 px-2 text-center">
                            <input
                              type="text"
                              value={c.theoryMarks}
                              onChange={(e) => handleScoreChange(c.id, "theory", e.target.value)}
                              disabled={isLocked}
                              className={`w-16 text-center font-mono font-bold bg-slate-50 border border-slate-200 rounded-md py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white ${
                                c.theoryMarks === "AB" ? "text-rose-600 bg-rose-50" : "text-slate-900"
                              }`}
                            />
                          </td>

                          {/* Internal Marks */}
                          <td className="py-2.5 px-2 text-center">
                            <input
                              type="text"
                              value={c.internalMarks}
                              onChange={(e) => handleScoreChange(c.id, "internal", e.target.value)}
                              disabled={isLocked}
                              className="w-16 text-center font-mono font-bold bg-slate-50 border border-slate-200 rounded-md py-1 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                            />
                          </td>

                          {/* Total Marks */}
                          <td className="py-2.5 px-2 text-center font-mono font-bold text-xs">
                            <span className={c.totalMarks === "--" ? "text-rose-600" : "text-slate-900"}>
                              {c.totalMarks}
                            </span>
                          </td>

                          {/* Grade & Score */}
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold border ${
                                c.resultStatus === "Absent"
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              <span>{c.gradePct}</span>
                              <span>[{c.gradeLabel.split(" ")[0]}]</span>
                            </span>
                          </td>

                          {/* Grace */}
                          <td className="py-2.5 px-2 text-center font-mono text-[11px]">
                            {c.graceMarks > 0 ? (
                              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                                +{c.graceMarks}
                              </span>
                            ) : (
                              <span className="text-slate-400">0</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="py-2.5 px-2 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                c.resultStatus === "Pass"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : c.resultStatus === "Pass (Mod)"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-rose-50 text-rose-700 border-rose-200"
                              }`}
                            >
                              {c.resultStatus}
                            </span>
                          </td>

                          {/* Audit */}
                          <td className="py-2.5 px-3 text-right">
                            <span
                              className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold ${
                                c.auditStatus === "Verified"
                                  ? "text-emerald-700"
                                  : c.auditStatus === "Flagged"
                                  ? "text-rose-600"
                                  : "text-amber-700"
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{c.auditStatus}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-3">
                  <span>Showing {filteredCandidates.length} of 45 Enrolled Candidates</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-900 font-semibold">Class Avg: 76.8/100</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-semibold">Pass Rate: 97.7%</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                    Prev
                  </button>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                    1
                  </span>
                  <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Marks Curve & Grade Spread Histogram */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">CS401 Marks Curve &amp; Grade Spread</h3>
                  <p className="text-xs text-slate-500">Cohort Gaussian distribution breakdown</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  98.2% Fit
                </span>
              </div>

              {/* Clean Histogram Bar View */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-end justify-between gap-2 h-28 pt-4 px-2">
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500">1</span>
                    <div className="w-full rounded-t-md bg-rose-400" style={{ height: "10%" }} />
                    <span className="text-[10px] font-medium text-slate-600">F (&lt;40)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500">3</span>
                    <div className="w-full rounded-t-md bg-amber-400" style={{ height: "20%" }} />
                    <span className="text-[10px] font-medium text-slate-600">P (40-49)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500">7</span>
                    <div className="w-full rounded-t-md bg-blue-400" style={{ height: "40%" }} />
                    <span className="text-[10px] font-medium text-slate-600">C (50-59)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500">12</span>
                    <div className="w-full rounded-t-md bg-indigo-400" style={{ height: "65%" }} />
                    <span className="text-[10px] font-medium text-slate-600">B (60-69)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500">14</span>
                    <div className="w-full rounded-t-md bg-indigo-600" style={{ height: "82%" }} />
                    <span className="text-[10px] font-bold text-indigo-700">B+ (70-79)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500">6</span>
                    <div className="w-full rounded-t-md bg-emerald-500" style={{ height: "50%" }} />
                    <span className="text-[10px] font-bold text-emerald-700">A (80-89)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-500">2</span>
                    <div className="w-full rounded-t-md bg-emerald-600" style={{ height: "25%" }} />
                    <span className="text-[10px] font-bold text-emerald-800">A+ (&gt;90)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT AREA: Live Marksheet Preview (4 Cols) */}
          <div className="xl:col-span-4 space-y-4 sticky top-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Header */}
              <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-200" />
                  <span className="text-sm font-bold">Live Transcript Preview</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  Real-Time Sync
                </span>
              </div>

              {/* Document Body */}
              <div className="p-5 space-y-4 text-xs font-mono text-slate-700 bg-white">
                {/* Institutional Header */}
                <div className="text-center pb-3 border-b border-slate-200 space-y-1">
                  <h4 className="font-bold text-sm text-slate-900 tracking-tight">
                    APEX INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT
                  </h4>
                  <p className="text-[10px] text-slate-500">Autonomous Academic Council • Estd. 2012</p>
                  <div className="inline-block px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mt-1 border border-indigo-100">
                    Official Grade Transcript
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-3">
                  {selectedCandidate.avatar ? (
                    <img
                      src={selectedCandidate.avatar}
                      alt={selectedCandidate.name}
                      className="w-14 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-16 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-sm shrink-0">
                      {selectedCandidate.initials}
                    </div>
                  )}
                  <div className="space-y-0.5 text-[11px] leading-tight">
                    <div>
                      <span className="text-slate-400">NAME:</span>{" "}
                      <strong className="text-slate-900">{selectedCandidate.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">ROLL NO:</span>{" "}
                      <strong className="text-slate-900">{selectedCandidate.rollNo}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">ENROLL:</span>{" "}
                      <span className="text-slate-700">{selectedCandidate.enrollId}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">TERM:</span>{" "}
                      <span className="text-slate-700">Semester IV (Spring 2025)</span>
                    </div>
                  </div>
                </div>

                {/* Subject-wise Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                        <th className="py-1">Code</th>
                        <th className="py-1">Title</th>
                        <th className="py-1 text-center">Cr</th>
                        <th className="py-1 text-center">Marks</th>
                        <th className="py-1 text-center">Grd</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="bg-indigo-50/40 font-semibold">
                        <td className="py-1.5 text-indigo-700">CS401</td>
                        <td className="py-1.5 truncate max-w-[80px]">DBMS</td>
                        <td className="py-1.5 text-center">4.0</td>
                        <td className="py-1.5 text-center font-bold">{selectedCandidate.totalMarks}</td>
                        <td className="py-1.5 text-center font-bold text-indigo-700">
                          {selectedCandidate.gradeLabel.split(" ")[0]}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-slate-500">CS402</td>
                        <td className="py-1.5 truncate max-w-[80px]">Algorithms</td>
                        <td className="py-1.5 text-center">4.0</td>
                        <td className="py-1.5 text-center">88</td>
                        <td className="py-1.5 text-center font-bold">A</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-slate-500">CS403</td>
                        <td className="py-1.5 truncate max-w-[80px]">Operating Sys</td>
                        <td className="py-1.5 text-center">4.0</td>
                        <td className="py-1.5 text-center">81</td>
                        <td className="py-1.5 text-center font-bold">A</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-slate-500">CS404</td>
                        <td className="py-1.5 truncate max-w-[80px]">Automata</td>
                        <td className="py-1.5 text-center">3.0</td>
                        <td className="py-1.5 text-center">76</td>
                        <td className="py-1.5 text-center font-bold">B+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Cumulative Metrics */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">SGPA</div>
                    <div className="text-sm font-bold text-slate-900">{selectedCandidate.sgpa.toFixed(2)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 uppercase">CGPA</div>
                    <div className="text-sm font-bold text-indigo-700">{selectedCandidate.cgpa.toFixed(2)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase">Class</div>
                    <div className="text-[11px] font-bold text-slate-900">{selectedCandidate.classification}</div>
                  </div>
                </div>

                {/* Digital Seal */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                  <div>
                    <div>ISSUED: 24-MAR-2025</div>
                    <div>HASH: 94F8-A21E</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 italic">Dr. Margaret Vance</div>
                    <div className="text-[9px] uppercase">Controller of Exams</div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 space-y-2">
                <button
                  onClick={() => showToast(`Downloaded Official Marksheet for ${selectedCandidate.name}.pdf`)}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Marksheet PDF</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => showToast(`Sent transcript for ${selectedCandidate.name} to printer.`)}
                    className="py-1.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => showToast(`Marksheet synced to ${selectedCandidate.name}'s Student Portal.`)}
                    className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Sync Portal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Moderation Standing Policy Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <Gavel className="w-4 h-4" />
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-900">Academic Regulation §4.2 (Grace Policy)</div>
                <p className="leading-relaxed">
                  Grace marks are strictly capped at 3 marks aggregate across the semester for candidates with 75%+ mandatory attendance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Examination Modal */}
      {isCreateExamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Create Examination Series</h3>
              </div>
              <button
                onClick={() => setIsCreateExamModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="p-6 space-y-4 text-xs text-slate-700">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Examination Series Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-Semester Regular Examinations (Spring 2025)"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Assessment Type
                  </label>
                  <select
                    value={newExamType}
                    onChange={(e) => setNewExamType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option>End-Semester Regular</option>
                    <option>Mid-Term Comprehensive</option>
                    <option>Practical Viva Review</option>
                    <option>Remedial / Supplementary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Cohort Target
                  </label>
                  <select
                    value={newExamBatch}
                    onChange={(e) => setNewExamBatch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option>Batch 2023-27 · Sem IV</option>
                    <option>Batch 2022-26 · Sem VI</option>
                    <option>Batch 2021-25 · Sem VIII</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newExamStartDate}
                    onChange={(e) => setNewExamStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newExamEndDate}
                    onChange={(e) => setNewExamEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateExamModalOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Schedule Series</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
