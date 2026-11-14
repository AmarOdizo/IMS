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
  Check
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

const initialCandidates: CandidateExamResult[] = [
  {
    id: "c-01",
    rollNo: "APX-CS-2023-014",
    name: "Aarav S. Patel",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHlmD72uSAq5bqlqIxisYAbaboO1LKC08LcPOjkLnBNbXlW_o7qzL70uy4440Gdjo8A6Jh1cXphgHek1Jk3igxQpMErViMZKqqh9XQpnllrSAFtDkO8EcBAKz6NKo42TcvMWtpufJNX2kkQVImkBatN4jHCtWvXfFJjz848VfdsTyKCwrh_Kv86TRHDsIQHvdhIboc2LQu92gw-hS21Au5wbyWaXjQnaqWc4wad538",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAS0RvEjb_G17d9AqJS1mZreNKYj1UO6EkpKR3YWDdUZ58Avj6x53HNS6yIcswY4h6uSXb3XGBFS8O3bUc_r8cIppHtYeOPTSqI7oWf3hJNekNQs4E5Fh6sdMULMS9YcYmGpt0GkOwTZTLg4w8knjv3faZ5VtoOKBQYj-cYsdZeINDsMj0otN4embrHpmyo7buKL_ONr4Y4VbfJSosNPd2XpIYIMGc4c-LGeS86X8g8",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA9riMvcCn2b_b4-WdWNzCb47SRVR66KGpwSoNBopD_55A6CcTVBsaatSPSg3BQ880TW8RLkOaeJ7IUaEOVwBfBMut-e4lJaFl8411HtLBDJrHCpKRdOacxHH2OwbMP_cuIZ-wM6P_8_btBewI-DBVlm2-alBRjUoRScDlVhWuF8u-AySI-T9eXEWoiC-TAEBMv3lzEasP5wvroYwkaQ6l1Chb9KX6cPeewBZHddi5P",
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXh5e4KT_cK1Hoc2FMl7Exo4IYruCWW7mckAtj_FWqwANRxkejzddN6UGPC9akZrNbPtLtzf43KTQtBLTbAGTgFwlBgkKdIEenb1VSn-O2v9gV0hUonip8EJeovAQbnIZFODjCSnmxkCKY2srbPgDzsCYqe5cX3XKdMTfm9oOyGABwGDPN32qWgTMOhgD_82N42nx4Q4BEz3LlL4cXzxiC37ovO8zjA_k8rhBNA-Kd",
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
    initials: "NA",
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
  }
];

export default function ExamsPage() {
  const [candidates, setCandidates] = useState<CandidateExamResult[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateExamResult>(initialCandidates[0]);
  const [activeTab, setActiveTab] = useState<"all" | "ledger" | "moderation" | "archive">("ledger");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);

  // New exam form state
  const [newExamTitle, setNewExamTitle] = useState("");
  const [newExamType, setNewExamType] = useState("End-Semester Regular");
  const [newExamStartDate, setNewExamStartDate] = useState("2024-05-20");
  const [newExamEndDate, setNewExamEndDate] = useState("2024-06-05");
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
      showToast("Cannot edit: Marks entry ledger is locked. Click 'Lock Marks Entry' to unlock.");
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
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-primary text-on-primary px-4 py-3 shadow-2xl border-l-4 border-secondary flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2">
          <FileCheck className="w-5 h-5 text-secondary-container" />
          <span className="font-mono-data text-xs tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Command Header & Breadcrumb Strip */}
      <div className="px-6 py-4 bg-surface-container-lowest shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/30">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            <span>Institutional Command</span>
            <span className="text-[0.75rem] text-outline-variant">/</span>
            <span>Examination Controller</span>
            <span className="text-[0.75rem] text-outline-variant">/</span>
            <span className="text-secondary font-semibold">AY 2024-25 Series</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            Exams & Results Central Controller
          </h1>
        </div>

        {/* Global Exam Actions */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => showToast("Exporting bulk transcript PDF bundles (1,240 records)...")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors border border-outline-variant/30 shadow-sm"
          >
            <Download className="w-4 h-4 text-secondary" />
            <span>Bulk Marksheet Export</span>
          </button>
          <button
            onClick={() => showToast("Results dispatch successfully broadcast to Student & Guardian Portals.")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Publish Results Dispatch</span>
          </button>
          <button
            onClick={() => setIsCreateExamModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New Examination</span>
          </button>
        </div>
      </div>

      <div className="px-6 py-6 flex flex-col gap-6">
        {/* Metric KPI Row (4 brutalist telemetry tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* KPI 1 */}
          <div className="relative bg-surface-container-lowest p-4 shadow-sm flex flex-col justify-between overflow-hidden border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
            <div className="flex items-center justify-between pb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Scheduled Exams
              </span>
              <Calendar className="w-4 h-4 text-secondary" />
            </div>
            <div className="my-2">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">18 Active</div>
              <div className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                8 Completed · 6 Ongoing · 4 Upcoming
              </div>
            </div>
            <div className="w-full bg-surface-container h-1.5 mt-2 flex">
              <div className="bg-secondary h-full" style={{ width: "44.4%" }} />
              <div className="bg-secondary-container h-full" style={{ width: "33.3%" }} />
              <div className="bg-outline-variant h-full" style={{ width: "22.3%" }} />
            </div>
          </div>

          {/* KPI 2 */}
          <div className="relative bg-surface-container-lowest p-4 shadow-sm flex flex-col justify-between overflow-hidden border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container" />
            <div className="flex items-center justify-between pb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Paper Evaluation Velocity
              </span>
              <FileCheck className="w-4 h-4 text-primary-container" />
            </div>
            <div className="my-2">
              <div className="font-headline-lg text-headline-lg text-primary font-bold flex items-baseline gap-2">
                <span>4,820</span>
                <span className="font-mono-data text-mono-data text-on-surface-variant font-normal text-sm">
                  / 5,100
                </span>
              </div>
              <div className="font-body-sm text-xs text-on-surface-variant mt-0.5">94.5% Evaluation Complete</div>
            </div>
            <div className="w-full bg-surface-container h-1.5 mt-2">
              <div className="bg-primary-container h-full" style={{ width: "94.5%" }} />
            </div>
          </div>

          {/* KPI 3 */}
          <div className="relative bg-surface-container-lowest p-4 shadow-sm flex flex-col justify-between overflow-hidden border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container" />
            <div className="flex items-center justify-between pb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Institutional Average
              </span>
              <TrendingUp className="w-4 h-4 text-secondary" />
            </div>
            <div className="my-2">
              <div className="font-headline-lg text-headline-lg text-primary font-bold flex items-baseline gap-2">
                <span>78.4%</span>
                <span className="inline-flex items-center text-xs font-mono-data text-secondary font-bold">
                  GPA 3.42
                </span>
              </div>
              <div className="font-body-sm text-xs text-secondary mt-0.5 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2.1% YoY across all faculties</span>
              </div>
            </div>
            <div className="w-full bg-surface-container h-1.5 mt-2">
              <div className="bg-secondary h-full" style={{ width: "78.4%" }} />
            </div>
          </div>

          {/* KPI 4 */}
          <div className="relative bg-surface-container-lowest p-4 shadow-sm flex flex-col justify-between overflow-hidden border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error" />
            <div className="flex items-center justify-between pb-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Publishing Dispatch Queue
              </span>
              <AlertCircle className="w-4 h-4 text-error" />
            </div>
            <div className="my-2">
              <div className="font-headline-lg text-headline-lg text-error font-bold flex items-baseline gap-2">
                <span>3 Batches</span>
              </div>
              <div className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                Ready for Dean Sign-off & Portal Sync
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-1.5 py-0.5 bg-error-container text-on-error-container font-label-sm text-[0.625rem] font-semibold uppercase">
                Pending Dean Stamp
              </span>
              <span className="font-mono-data text-[0.6875rem] text-on-surface-variant">1,240 Transcripts</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Controller Filters */}
        <div className="bg-surface-container-lowest shadow-sm p-4 flex flex-col gap-4 border border-outline-variant/30">
          {/* Tabs Strip */}
          <div className="flex items-center justify-between border-b border-surface-container overflow-x-auto">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-colors rounded-md ${
                  activeTab === "all"
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                All Examinations (18)
              </button>
              <button
                onClick={() => setActiveTab("ledger")}
                className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-md ${
                  activeTab === "ledger"
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Marks Entry Ledger</span>
              </button>
              <button
                onClick={() => setActiveTab("moderation")}
                className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-md ${
                  activeTab === "moderation"
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                <span>Moderation & Approvals</span>
                <span className="px-1.5 py-0.2 bg-secondary text-on-secondary font-label-sm text-[0.625rem] rounded">
                  3 Pending
                </span>
              </button>
              <button
                onClick={() => setActiveTab("archive")}
                className={`px-4 py-2 font-label-md text-label-md uppercase tracking-wider transition-colors rounded-md ${
                  activeTab === "archive"
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                Published Results Archive
              </button>
            </div>
            <div className="hidden lg:flex items-center gap-2 py-1 font-mono-data text-mono-data text-on-surface-variant text-xs">
              <span className="h-2 w-2 bg-secondary animate-pulse rounded-full" />
              <span>LEDGER ENGINE: SECURE WRITE-ENABLED</span>
            </div>
          </div>

          {/* Advanced Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-surface-container-low p-3 border border-outline-variant/30">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-[0.6875rem] uppercase tracking-wider text-on-surface-variant font-semibold">
                Program / Department
              </label>
              <select className="w-full bg-surface-container-lowest text-primary px-3 py-2 font-mono-data text-xs border border-outline-variant/30 focus:outline-none">
                <option>B.Tech Computer Science & Eng.</option>
                <option>B.Tech Electronics & Comm.</option>
                <option>M.Tech Artificial Intelligence</option>
                <option>MBA Systems Management</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-[0.6875rem] uppercase tracking-wider text-on-surface-variant font-semibold">
                Cohort / Term
              </label>
              <select className="w-full bg-surface-container-lowest text-primary px-3 py-2 font-mono-data text-xs border border-outline-variant/30 focus:outline-none">
                <option>Batch 2023-27 · Semester IV</option>
                <option>Batch 2022-26 · Semester VI</option>
                <option>Batch 2021-25 · Semester VIII (Final)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-[0.6875rem] uppercase tracking-wider text-on-surface-variant font-semibold">
                Course Unit
              </label>
              <select className="w-full bg-surface-container-lowest text-primary px-3 py-2 font-mono-data text-xs border border-outline-variant/30 focus:outline-none">
                <option>CS401: Database Management Systems</option>
                <option>CS402: Design & Analysis of Algorithms</option>
                <option>CS403: Operating Systems Architecture</option>
                <option>CS404: Theory of Computation</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-[0.6875rem] uppercase tracking-wider text-on-surface-variant font-semibold">
                Assessment Series
              </label>
              <select className="w-full bg-surface-container-lowest text-primary px-3 py-2 font-mono-data text-xs border border-outline-variant/30 focus:outline-none">
                <option>End-Semester Regular Examination (May 2024)</option>
                <option>Mid-Term Comprehensive Assessment</option>
                <option>Practical Viva & Laboratory Review</option>
                <option>Remedial / Supplementary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Split Screen Two-Column Administrative Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT / MAIN AREA (8 cols) */}
          <div className="xl:col-span-8 flex flex-col gap-4">
            {/* Interactive Ledger Header & Control Ribbon */}
            <div className="bg-surface-container-lowest shadow-sm p-4 flex flex-col gap-3 border border-outline-variant/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-surface-container">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-primary-container text-on-primary font-mono-data text-mono-data uppercase font-bold text-xs">
                      CS401
                    </span>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      Database Management Systems
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container text-secondary font-mono-data text-[0.6875rem] font-bold">
                      4.0 CREDITS
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1">
                    Max Marks: <strong className="text-primary font-mono-data">100</strong> (Theory: 70 · Continuous
                    Assessment/Lab: 30) · Passing Cutoff: 40% aggregate
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[0.75rem] font-mono-data text-on-surface-variant bg-surface-container-low px-2 py-1 border border-outline-variant/30">
                    <CheckCircle className="w-3.5 h-3.5 text-secondary" />
                    <span>AUDIT: 42/45 Verified</span>
                  </span>
                </div>
              </div>

              {/* Quick Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setIsLocked(!isLocked);
                      showToast(isLocked ? "Marks Entry UNLOCKED for edit." : "Marks Entry LOCKED & timestamped.");
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-label-md text-label-md uppercase tracking-wider transition-colors border border-outline-variant/30 ${
                      isLocked
                        ? "bg-error text-on-error"
                        : "bg-surface-container text-primary hover:bg-surface-container-high"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isLocked ? "Unlock Marks Entry" : "Lock Marks Entry"}</span>
                  </button>
                  <button
                    onClick={() => showToast("CSV Marks Template loaded into staging memory.")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors border border-outline-variant/30"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import CSV Marks</span>
                  </button>
                  <button
                    onClick={() => showToast("Auto-calculated Semester SGPA & CGPA for all 45 enrolled candidates.")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow-sm"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Auto-Calculate GPA</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast("Official Examination Gazette Exported (PDF/Print).")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors border border-outline-variant/30"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Export Gazette</span>
                  </button>
                  <div className="relative w-48">
                    <Search className="w-3.5 h-3.5 text-on-surface-variant absolute left-2 top-2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter Candidate..."
                      className="w-full bg-surface-container-low text-primary px-3 py-1 pl-7 font-body-sm text-xs focus:outline-none border border-outline-variant/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rich Interactive Data Table */}
            <div className="bg-surface-container-lowest shadow-sm overflow-hidden border border-outline-variant/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-surface-container font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      <th className="py-2.5 px-3">Roll & Candidate</th>
                      <th className="py-2.5 px-2 text-center w-24">Theory (70)</th>
                      <th className="py-2.5 px-2 text-center w-24">Internal (30)</th>
                      <th className="py-2.5 px-2 text-center w-20">Total (100)</th>
                      <th className="py-2.5 px-3 text-center">Grade & Performance</th>
                      <th className="py-2.5 px-2 text-center">Grace</th>
                      <th className="py-2.5 px-2 text-center">Result Status</th>
                      <th className="py-2.5 px-3 text-right">Audit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-body-md text-sm text-on-surface">
                    {filteredCandidates.map((c) => {
                      const isSelected = selectedCandidate.id === c.id;

                      return (
                        <tr
                          key={c.id}
                          onClick={() => setSelectedCandidate(c)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-surface-container-high/40 hover:bg-surface-container-high border-l-4 border-l-secondary"
                              : "hover:bg-surface-container-low"
                          }`}
                        >
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2">
                              {c.avatar ? (
                                <img
                                  src={c.avatar}
                                  alt={c.name}
                                  className="w-7 h-7 object-cover grayscale contrast-125 border border-outline-variant/30"
                                />
                              ) : (
                                <div className="w-7 h-7 bg-surface-container-high flex items-center justify-center font-mono-data text-[0.625rem] font-bold text-on-surface-variant border border-outline-variant/30">
                                  {c.initials}
                                </div>
                              )}
                              <div className="flex flex-col min-w-0">
                                <span className="font-mono-data text-mono-data font-bold text-primary truncate text-xs">
                                  {c.rollNo}
                                </span>
                                <span className="text-[0.75rem] text-on-surface-variant truncate font-medium">
                                  {c.name}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <input
                              type="text"
                              value={c.theoryMarks}
                              onChange={(e) => handleScoreChange(c.id, "theory", e.target.value)}
                              disabled={isLocked}
                              className={`w-16 text-center font-mono-data text-mono-data font-bold bg-surface-container-lowest py-1 border-b text-xs focus:outline-none ${
                                isSelected ? "border-secondary" : "border-outline-variant"
                              } ${c.theoryMarks === "AB" ? "text-error" : "text-primary"}`}
                            />
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <input
                              type="text"
                              value={c.internalMarks}
                              onChange={(e) => handleScoreChange(c.id, "internal", e.target.value)}
                              disabled={isLocked}
                              className="w-16 text-center font-mono-data text-mono-data font-bold bg-surface-container-lowest text-primary py-1 border-b border-outline-variant text-xs focus:outline-none"
                            />
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <span
                              className={`font-mono-data text-mono-data font-bold text-xs ${
                                c.totalMarks === "--" ? "text-error" : "text-primary"
                              }`}
                            >
                              {c.totalMarks}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono-data text-[0.6875rem] font-bold shadow-sm ${
                                c.resultStatus === "Absent"
                                  ? "bg-error-container text-on-error-container"
                                  : "bg-surface-container-lowest text-secondary"
                              }`}
                            >
                              {c.resultStatus !== "Absent" && (
                                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                              )}
                              <span>
                                {c.gradePct} [{c.gradeLabel}]
                              </span>
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono-data text-[0.75rem] text-on-surface-variant">
                            {c.graceMarks > 0 ? (
                              <span className="px-1.5 py-0.2 bg-secondary-container text-primary font-mono-data text-[0.625rem] font-bold">
                                +{c.graceMarks} Grace
                              </span>
                            ) : (
                              "0"
                            )}
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <span
                              className={`px-2 py-0.5 font-label-sm text-[0.625rem] font-bold uppercase ${
                                c.resultStatus === "Absent"
                                  ? "bg-error-container text-on-error-container"
                                  : "bg-surface-container-low text-secondary"
                              }`}
                            >
                              {c.resultStatus}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span
                              className={`inline-flex items-center font-mono-data text-[0.6875rem] font-medium ${
                                c.auditStatus === "Verified"
                                  ? "text-secondary"
                                  : c.auditStatus === "Flagged"
                                  ? "text-error"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              <CheckCircle className="w-3.5 h-3.5 mr-0.5" />
                              <span>{c.auditStatus}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Ledger Footer Pagination & Quick Aggregate */}
              <div className="px-4 py-2.5 bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant border-t border-outline-variant/30">
                <div className="flex items-center gap-4 text-xs">
                  <span>Showing 1-{filteredCandidates.length} of 45 Enrolled Candidates</span>
                  <span className="hidden md:inline font-mono-data text-primary">
                    Class Average: <strong>76.8/100</strong>
                  </span>
                  <span className="hidden md:inline font-mono-data text-secondary">
                    Pass Rate: <strong>97.7%</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono-data text-xs">
                  <button className="px-2 py-1 bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors shadow-sm border border-outline-variant/30">
                    PREV
                  </button>
                  <button className="px-2 py-1 bg-primary text-on-primary font-bold">1</button>
                  <button className="px-2 py-1 bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors shadow-sm border border-outline-variant/30">
                    2
                  </button>
                  <button className="px-2 py-1 bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors shadow-sm border border-outline-variant/30">
                    3
                  </button>
                  <button className="px-2 py-1 bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors shadow-sm border border-outline-variant/30">
                    NEXT
                  </button>
                </div>
              </div>
            </div>

            {/* Grade Distribution Chart Module */}
            <div className="bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Statistical Cohort Telemetry
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    CS401 Marks Curve & Grade Spread
                  </span>
                </div>
                <span className="font-mono-data text-mono-data text-secondary font-semibold text-xs">
                  GAUSSIAN DISTRIBUTION FIT: 98.2%
                </span>
              </div>

              {/* Inline Technical SVG Histogram */}
              <div className="w-full bg-surface-container-low p-4 border border-outline-variant/30">
                <div className="flex items-end justify-between gap-2 h-28 pt-4 px-2">
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant font-bold">1</span>
                    <div className="w-full bg-error-container" style={{ height: "8%" }} />
                    <span className="font-mono-data text-[0.6875rem] text-primary">F (&lt;40)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant font-bold">3</span>
                    <div className="w-full bg-outline-variant" style={{ height: "18%" }} />
                    <span className="font-mono-data text-[0.6875rem] text-primary">P (40-49)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant font-bold">7</span>
                    <div className="w-full bg-surface-container-high" style={{ height: "38%" }} />
                    <span className="font-mono-data text-[0.6875rem] text-primary">C (50-59)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant font-bold">12</span>
                    <div className="w-full bg-secondary-container" style={{ height: "64%" }} />
                    <span className="font-mono-data text-[0.6875rem] text-primary">B (60-69)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant font-bold">14</span>
                    <div className="w-full bg-secondary" style={{ height: "82%" }} />
                    <span className="font-mono-data text-[0.6875rem] text-primary font-bold">B+ (70-79)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant font-bold">6</span>
                    <div className="w-full bg-primary" style={{ height: "48%" }} />
                    <span className="font-mono-data text-[0.6875rem] text-primary font-bold">A (80-89)</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant font-bold">2</span>
                    <div className="w-full bg-primary-container" style={{ height: "22%" }} />
                    <span className="font-mono-data text-[0.6875rem] text-primary font-bold">A+ (&gt;90)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT AREA (4 cols): Official Marksheet & Transcript Live Preview Card */}
          <div className="xl:col-span-4 flex flex-col gap-4 sticky top-20">
            <div className="bg-surface-container-lowest shadow-md flex flex-col relative overflow-hidden border border-outline-variant/30">
              {/* Card Header & Live Inspector Badge */}
              <div className="bg-primary text-on-primary p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-secondary-container" />
                  <span className="font-label-md text-label-md uppercase tracking-wider font-bold">
                    Live Marksheet Preview
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-secondary text-on-secondary font-mono-data text-[0.625rem] font-bold uppercase tracking-wider">
                  REAL-TIME SYNC
                </span>
              </div>

              {/* Official Document Body (High density simulated grade sheet) */}
              <div className="p-4 flex flex-col gap-3 bg-surface-container-lowest relative">
                {/* Institutional Watermark Simulated Center Seal */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
                  <svg className="w-64 h-64 text-primary fill-current" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="6" />
                    <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="2" />
                    <polygon points="100,25 125,75 180,80 140,120 150,175 100,150 50,175 60,120 20,80 75,75" />
                  </svg>
                </div>

                {/* Institutional Header */}
                <div className="text-center pb-2 border-b border-surface-container flex flex-col items-center">
                  <div className="font-headline-sm text-sm leading-snug font-bold text-primary uppercase tracking-tight">
                    Apex Institute of Technology & Management
                  </div>
                  <div className="font-label-sm text-[0.625rem] uppercase tracking-widest text-on-surface-variant font-semibold">
                    Autonomous Academic Council · Established Under Act 2012
                  </div>
                  <div className="mt-1 px-3 py-0.5 bg-surface-container text-primary font-mono-data text-[0.6875rem] font-bold uppercase tracking-wider">
                    OFFICIAL GRADE CARD / TRANSCRIPT
                  </div>
                </div>

                {/* Candidate Demographic Bio Box */}
                <div className="p-2 bg-surface-container-low grid grid-cols-12 gap-2 text-xs border border-outline-variant/30">
                  <div className="col-span-3 flex items-center justify-center">
                    {selectedCandidate.avatar ? (
                      <img
                        src={selectedCandidate.avatar}
                        alt={selectedCandidate.name}
                        className="w-16 h-20 object-cover shadow-sm border border-outline-variant/30"
                      />
                    ) : (
                      <div className="w-16 h-20 bg-surface-container flex items-center justify-center font-mono-data text-xs font-bold text-primary border border-outline-variant/30">
                        {selectedCandidate.initials}
                      </div>
                    )}
                  </div>
                  <div className="col-span-9 flex flex-col justify-center font-mono-data text-[0.6875rem] leading-relaxed">
                    <div>
                      <span className="text-on-surface-variant">NAME:</span>{" "}
                      <strong className="text-primary font-bold">{selectedCandidate.name}</strong>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">ROLL NO:</span>{" "}
                      <strong className="text-primary">{selectedCandidate.rollNo}</strong>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">ENROLL ID:</span>{" "}
                      <strong className="text-primary">{selectedCandidate.enrollId}</strong>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">PROGRAM:</span>{" "}
                      <span className="text-on-surface">{selectedCandidate.program}</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant">TERM:</span>{" "}
                      <span className="text-on-surface">Semester IV (Spring 2024)</span>
                    </div>
                  </div>
                </div>

                {/* Subject-wise Breakdown Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[0.6875rem] font-mono-data">
                    <thead>
                      <tr className="bg-surface-container text-primary uppercase font-bold border-b border-outline-variant/40">
                        <th className="p-1">Code</th>
                        <th className="p-1">Title</th>
                        <th className="p-1 text-center">Cr</th>
                        <th className="p-1 text-center">Max</th>
                        <th className="p-1 text-center">Scored</th>
                        <th className="p-1 text-center">Grd</th>
                        <th className="p-1 text-center">Pt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container text-on-surface">
                      <tr className="bg-surface-container-high/20 font-semibold">
                        <td className="p-1 text-secondary">CS401</td>
                        <td className="p-1 truncate max-w-[90px]">Database Mgmt</td>
                        <td className="p-1 text-center">4.0</td>
                        <td className="p-1 text-center">100</td>
                        <td className="p-1 text-center font-bold text-primary">{selectedCandidate.totalMarks}</td>
                        <td className="p-1 text-center text-secondary font-bold">
                          {selectedCandidate.gradeLabel.split(" ")[0]}
                        </td>
                        <td className="p-1 text-center">10.0</td>
                      </tr>
                      <tr>
                        <td className="p-1 text-on-surface-variant">CS402</td>
                        <td className="p-1 truncate max-w-[90px]">Algorithms & Comp</td>
                        <td className="p-1 text-center">4.0</td>
                        <td className="p-1 text-center">100</td>
                        <td className="p-1 text-center">88</td>
                        <td className="p-1 text-center font-bold">A</td>
                        <td className="p-1 text-center">9.0</td>
                      </tr>
                      <tr>
                        <td className="p-1 text-on-surface-variant">CS403</td>
                        <td className="p-1 truncate max-w-[90px]">Operating Systems</td>
                        <td className="p-1 text-center">4.0</td>
                        <td className="p-1 text-center">100</td>
                        <td className="p-1 text-center">81</td>
                        <td className="p-1 text-center font-bold">A</td>
                        <td className="p-1 text-center">9.0</td>
                      </tr>
                      <tr>
                        <td className="p-1 text-on-surface-variant">CS404</td>
                        <td className="p-1 truncate max-w-[90px]">Automata Theory</td>
                        <td className="p-1 text-center">3.0</td>
                        <td className="p-1 text-center">100</td>
                        <td className="p-1 text-center">76</td>
                        <td className="p-1 text-center font-bold">B+</td>
                        <td className="p-1 text-center">8.0</td>
                      </tr>
                      <tr>
                        <td className="p-1 text-on-surface-variant">CS405</td>
                        <td className="p-1 truncate max-w-[90px]">DBMS Lab (Practical)</td>
                        <td className="p-1 text-center">2.0</td>
                        <td className="p-1 text-center">50</td>
                        <td className="p-1 text-center">47</td>
                        <td className="p-1 text-center text-secondary font-bold">O</td>
                        <td className="p-1 text-center">10.0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Cumulative Summary Matrix */}
                <div className="p-2 bg-surface-container flex items-center justify-between font-mono-data text-xs border border-outline-variant/30">
                  <div className="flex flex-col">
                    <span className="text-on-surface-variant text-[0.625rem] uppercase">Semester SGPA</span>
                    <span className="text-primary font-bold text-sm">{selectedCandidate.sgpa.toFixed(2)} / 10.0</span>
                  </div>
                  <div className="flex flex-col text-center">
                    <span className="text-on-surface-variant text-[0.625rem] uppercase">Cumulative CGPA</span>
                    <span className="text-secondary font-bold text-sm">{selectedCandidate.cgpa.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-on-surface-variant text-[0.625rem] uppercase">Classification</span>
                    <span className="text-primary font-bold text-[0.6875rem]">{selectedCandidate.classification}</span>
                  </div>
                </div>

                {/* Dean Official Signature Block & Institutional Seal Stamp */}
                <div className="pt-2 flex items-center justify-between border-t border-surface-container mt-1">
                  <div className="flex flex-col text-left">
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant">ISSUANCE: 24-MAY-2024</span>
                    <span className="font-mono-data text-[0.625rem] text-on-surface-variant">
                      SECURITY KEY: 94F8-A21E
                    </span>
                  </div>

                  {/* Controller Stamp Element */}
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col text-right">
                      <span className="font-headline-sm text-xs font-bold text-primary italic">M. Vance</span>
                      <span className="font-label-sm text-[0.5625rem] uppercase tracking-wider text-on-surface-variant font-semibold">
                        CONTROLLER OF EXAMS
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-secondary flex items-center justify-center text-secondary font-bold text-[0.5rem] tracking-tighter">
                      SEAL
                    </div>
                  </div>
                </div>
              </div>

              {/* Marksheet Output Dispatch Actions */}
              <div className="p-3 bg-surface-container-low flex flex-col gap-2 border-t border-outline-variant/30">
                <button
                  onClick={() => showToast(`Downloaded Official Marksheet for ${selectedCandidate.name}.pdf`)}
                  className="w-full py-2 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Marksheet PDF</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => showToast(`Sent transcript for ${selectedCandidate.name} to connected printer.`)}
                    className="py-1.5 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 shadow-sm border border-outline-variant/30"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Copy</span>
                  </button>
                  <button
                    onClick={() =>
                      showToast(`Marksheet synced to ${selectedCandidate.name}'s Student Portal account.`)
                    }
                    className="py-1.5 bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Dispatch to Portal</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Moderation Quick Policy Notice */}
            <div className="p-4 bg-surface-container shadow-sm flex flex-col gap-1 border border-outline-variant/30">
              <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
                <Gavel className="w-4 h-4 text-secondary" />
                <span>Standing Academic Regulation 4.2</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed text-xs">
                Grace marks are strictly capped at a maximum of <strong>3 marks aggregate</strong> across the semester
                for candidates with 75%+ mandatory lecture attendance. Any adjustment requires joint sign-off by the
                Academic Board.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Examination Modal */}
      {isCreateExamModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container-lowest max-w-lg w-full shadow-2xl border border-outline-variant/40 animate-in fade-in zoom-in-95">
            <div className="bg-primary text-on-primary px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-secondary-container" />
                <h3 className="font-headline-sm text-headline-sm uppercase font-bold tracking-tight">
                  + Create Examination Series
                </h3>
              </div>
              <button
                onClick={() => setIsCreateExamModalOpen(false)}
                className="text-on-primary/70 hover:text-on-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="p-5 space-y-4">
              <div>
                <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                  Examination Series Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-Semester Regular Examinations (Autumn 2024)"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary border border-outline-variant/40 text-xs focus:outline-none focus:bg-surface-container-lowest"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Assessment Type
                  </label>
                  <select
                    value={newExamType}
                    onChange={(e) => setNewExamType(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  >
                    <option>End-Semester Regular</option>
                    <option>Mid-Term Comprehensive</option>
                    <option>Practical Viva Review</option>
                    <option>Remedial / Supplementary</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Cohort Target
                  </label>
                  <select
                    value={newExamBatch}
                    onChange={(e) => setNewExamBatch(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-body-sm text-body-sm text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  >
                    <option>Batch 2023-27 · Sem IV</option>
                    <option>Batch 2022-26 · Sem VI</option>
                    <option>Batch 2021-25 · Sem VIII</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newExamStartDate}
                    onChange={(e) => setNewExamStartDate(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-mono-data text-mono-data text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-[0.6875rem] uppercase text-on-surface-variant mb-1 font-semibold">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newExamEndDate}
                    onChange={(e) => setNewExamEndDate(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 font-mono-data text-mono-data text-primary border border-outline-variant/40 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsCreateExamModalOpen(false)}
                  className="px-4 py-2 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors flex items-center gap-1.5 shadow-sm"
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

