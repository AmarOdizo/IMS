"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Award,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Search,
  Filter,
  Save,
  Send,
  X,
  HelpCircle,
  BarChart3,
  SlidersHorizontal,
  RefreshCw,
  Sparkles,
  Layers,
  GraduationCap,
  BookOpen,
  Pin
} from "lucide-react";

interface StudentMarkRecord {
  id: string;
  roll: string;
  name: string;
  comp1: number; // Quiz or Viva
  comp2: number; // Assignment or Lab Execution
  midTerm: number; // Mid-Term Test
  isPinned: boolean;
}

interface BatchExamConfig {
  code: string;
  name: string;
  degree: string;
  subject: string;
  maxMarks: number;
  comp1Name: string;
  comp1Max: number;
  comp2Name: string;
  comp2Max: number;
  midTermName: string;
  midTermMax: number;
  students: StudentMarkRecord[];
}

const batchExamPresets: Record<string, BatchExamConfig> = {
  "CS-401": {
    code: "CS-401",
    name: "B.Tech CS-IV-A",
    degree: "B.Tech CSE - 4th Sem (Sec A)",
    subject: "Database Management Systems",
    maxMarks: 40,
    comp1Name: "Quiz / Tests (10)",
    comp1Max: 10,
    comp2Name: "Mini-Project (10)",
    comp2Max: 10,
    midTermName: "Mid-Term Exam (20)",
    midTermMax: 20,
    students: [
      { id: "m-1", roll: "SIT-2023-CS-042", name: "Rahul Sharma", comp1: 9.5, comp2: 9.0, midTerm: 18.5, isPinned: false },
      { id: "m-2", roll: "SIT-2023-CS-015", name: "Priya Patel", comp1: 10.0, comp2: 9.5, midTerm: 19.0, isPinned: false },
      { id: "m-3", roll: "SIT-2023-CS-078", name: "Rohan Verma", comp1: 5.5, comp2: 6.0, midTerm: 11.0, isPinned: false },
      { id: "m-4", roll: "SIT-2023-CS-089", name: "Sneha Rao", comp1: 10.0, comp2: 10.0, midTerm: 19.5, isPinned: false },
      { id: "m-5", roll: "SIT-2023-CS-001", name: "Aarav Sharma", comp1: 9.0, comp2: 8.5, midTerm: 17.5, isPinned: false },
      { id: "m-6", roll: "SIT-2023-CS-028", name: "Ananya Iyer", comp1: 8.5, comp2: 9.0, midTerm: 16.5, isPinned: false },
      { id: "m-7", roll: "SIT-2023-CS-035", name: "Devansh Patel", comp1: 8.0, comp2: 8.5, midTerm: 15.5, isPinned: false },
      { id: "m-8", roll: "SIT-2023-CS-051", name: "Karan Johar Mehta", comp1: 8.0, comp2: 7.5, midTerm: 15.0, isPinned: false }
    ]
  },
  "CS-405L": {
    code: "CS-405L",
    name: "B.Tech CS-IV-B",
    degree: "B.Tech CSE - 4th Sem (Sec B)",
    subject: "Database Systems Practicum Lab",
    maxMarks: 50,
    comp1Name: "Lab Viva (15)",
    comp1Max: 15,
    comp2Name: "Query Execution (15)",
    comp2Max: 15,
    midTermName: "Lab Exam (20)",
    midTermMax: 20,
    students: [
      { id: "m-9", roll: "SIT-2023-CS-104", name: "Vikram Malhotra", comp1: 8.0, comp2: 7.5, midTerm: 11.0, isPinned: false },
      { id: "m-10", roll: "SIT-2023-CS-082", name: "Kunal Singhania", comp1: 14.5, comp2: 14.0, midTerm: 18.5, isPinned: false },
      { id: "m-11", roll: "SIT-2023-CS-095", name: "Meera Nair", comp1: 13.0, comp2: 13.5, midTerm: 17.0, isPinned: false },
      { id: "m-12", roll: "SIT-2023-CS-103", name: "Tanmay Deshmukh", comp1: 9.5, comp2: 9.0, midTerm: 12.0, isPinned: false },
      { id: "m-13", roll: "SIT-2023-CS-112", name: "Pooja Hegde", comp1: 14.5, comp2: 14.5, midTerm: 19.0, isPinned: false }
    ]
  },
  "CS-602": {
    code: "CS-602",
    name: "M.Tech DS-II",
    degree: "M.Tech Data Systems - Term II",
    subject: "Advanced Distributed Database Architecture",
    maxMarks: 40,
    comp1Name: "Paper Review (10)",
    comp1Max: 10,
    comp2Name: "Raft Project (10)",
    comp2Max: 10,
    midTermName: "Mid-Term Exam (20)",
    midTermMax: 20,
    students: [
      { id: "m-14", roll: "SIT-2024-DS-004", name: "Gaurav Sen", comp1: 10.0, comp2: 10.0, midTerm: 19.5, isPinned: false },
      { id: "m-15", roll: "SIT-2024-DS-011", name: "Ritika Chawla", comp1: 9.5, comp2: 9.5, midTerm: 18.5, isPinned: false },
      { id: "m-16", roll: "SIT-2024-DS-012", name: "Kavita Krishnamurthy", comp1: 9.5, comp2: 9.0, midTerm: 18.0, isPinned: false },
      { id: "m-17", roll: "SIT-2024-DS-019", name: "Aditya Bhatt", comp1: 9.0, comp2: 8.5, midTerm: 17.0, isPinned: false }
    ]
  },
  "CS-202": {
    code: "CS-202",
    name: "BCA-II-B",
    degree: "BCA - 2nd Sem (Sec B)",
    subject: "Data Structures & Algorithms Foundation",
    maxMarks: 40,
    comp1Name: "Coding Quiz (10)",
    comp1Max: 10,
    comp2Name: "DS Assignment (10)",
    comp2Max: 10,
    midTermName: "Mid-Term Exam (20)",
    midTermMax: 20,
    students: [
      { id: "m-18", roll: "SIT-2024-BCA-008", name: "Aman Deep Singh", comp1: 8.0, comp2: 8.5, midTerm: 14.5, isPinned: false },
      { id: "m-19", roll: "SIT-2024-BCA-005", name: "Kavya Menon", comp1: 8.5, comp2: 9.0, midTerm: 16.5, isPinned: false },
      { id: "m-20", roll: "SIT-2024-BCA-012", name: "Nikhil Gupta", comp1: 8.0, comp2: 8.0, midTerm: 15.0, isPinned: false },
      { id: "m-21", roll: "SIT-2024-BCA-027", name: "Varun Chopra", comp1: 6.0, comp2: 5.5, midTerm: 10.5, isPinned: false },
      { id: "m-22", roll: "SIT-2024-BCA-033", name: "Zaid Khan", comp1: 8.5, comp2: 8.5, midTerm: 16.0, isPinned: false }
    ]
  }
};

export default function StaffExamsPage() {
  const [selectedBatchCode, setSelectedBatchCode] = useState("CS-401");
  const [marksState, setMarksState] = useState<Record<string, StudentMarkRecord[]>>({
    "CS-401": batchExamPresets["CS-401"].students,
    "CS-405L": batchExamPresets["CS-405L"].students,
    "CS-602": batchExamPresets["CS-602"].students,
    "CS-202": batchExamPresets["CS-202"].students
  });
  const [activeTab, setActiveTab] = useState<"ica" | "lab" | "audit">("ica");
  const [selectedExam, setSelectedExam] = useState("Mid-Term Assessment (AY 2024-25)");
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync batch from URL query parameter (?batch=CS401, ?batch=CS-405L, etc.)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const bParam = params.get("batch");
      if (bParam) {
        const bp = bParam.toUpperCase();
        if (bp.includes("401")) setSelectedBatchCode("CS-401");
        else if (bp.includes("405")) {
          setSelectedBatchCode("CS-405L");
          setActiveTab("lab");
        } else if (bp.includes("602")) setSelectedBatchCode("CS-602");
        else if (bp.includes("202")) setSelectedBatchCode("CS-202");
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeConfig = batchExamPresets[selectedBatchCode] || batchExamPresets["CS-401"];
  const currentMarks = marksState[selectedBatchCode] || [];

  const handleMarkChange = (
    id: string,
    field: "comp1" | "comp2" | "midTerm",
    value: number
  ) => {
    if (isLocked) {
      showToast("Evaluation ledger is locked. Revisions require Exam Cell approval.");
      return;
    }
    const maxVals = {
      comp1: activeConfig.comp1Max,
      comp2: activeConfig.comp2Max,
      midTerm: activeConfig.midTermMax
    };
    const clampedVal = Math.min(Math.max(0, value), maxVals[field]);

    setMarksState((prev) => ({
      ...prev,
      [selectedBatchCode]: prev[selectedBatchCode].map((s) =>
        s.id === id ? { ...s, [field]: clampedVal } : s
      )
    }));
  };

  const togglePin = (id: string) => {
    setMarksState((prev) => ({
      ...prev,
      [selectedBatchCode]: prev[selectedBatchCode].map((s) =>
        s.id === id ? { ...s, isPinned: !s.isPinned } : s
      )
    }));
  };

  // Computations
  const computedStats = useMemo(() => {
    const totals = currentMarks.map((s) => s.comp1 + s.comp2 + s.midTerm);
    const count = totals.length;
    if (count === 0)
      return { avg: "0.0", peak: "0.0", floor: "0.0", dist: 0, first: 0, pass: 0, rem: 0, count: 0 };

    const sum = totals.reduce((a, b) => a + b, 0);
    const avg = (sum / count).toFixed(1);
    const peak = Math.max(...totals).toFixed(1);
    const floor = Math.min(...totals).toFixed(1);

    let dist = 0,
      first = 0,
      pass = 0,
      rem = 0;
    totals.forEach((t) => {
      const pct = (t / activeConfig.maxMarks) * 100;
      if (pct >= 85) dist++;
      else if (pct >= 65) first++;
      else if (pct >= 50) pass++;
      else rem++;
    });

    return { avg, peak, floor, dist, first, pass, rem, count };
  }, [currentMarks, activeConfig]);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return currentMarks.filter(
      (s) =>
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.roll.toLowerCase().includes(q)
    );
  }, [currentMarks, searchQuery]);

  const handleSubmitLedger = () => {
    setIsLocked(true);
    setIsSubmitModalOpen(false);
    showToast(
      `Continuous assessment marks for ${activeConfig.code} successfully committed to Examination Cell!`
    );
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
                Continuous Internal Assessment &bull; Even Semester 2024–25
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#3D405B] tracking-tight">
                Marks Entry &amp; Examination Evaluation
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Record Continuous Assessment Marks (CAM), practical laboratory scores, and sessional test evaluations for your 4 assigned course cohorts.
              </p>
            </div>
          </div>

          {/* Deadline Pill & Submit Trigger */}
          <div className="flex items-center flex-wrap gap-2.5">
            <div className="flex items-center gap-2.5 bg-slate-50 px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold">
              <Clock className="h-4 w-4 text-rose-600" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
                  Submission Deadline
                </span>
                <span className="font-bold text-rose-600">10 Jun 2025 (14 Days Remaining)</span>
              </div>
            </div>

            {!isLocked ? (
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Submit to Exam Cell</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLocked(false);
                  showToast("Marks ledger unlocked for revisions.");
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-emerald-200"
              >
                <Unlock className="h-4 w-4" />
                <span>Unlock for Revision</span>
              </button>
            )}

            <button
              onClick={() => showToast("Exporting continuous assessment marks (Excel)...")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              <Download className="h-4 w-4 text-slate-600" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cohort & Examination Selection Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end text-xs">
        {/* Batch Dropdown */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Select Course Cohort
          </label>
          <select
            value={selectedBatchCode}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedBatchCode(val);
              if (val === "CS-405L") setActiveTab("lab");
              else setActiveTab("ica");
            }}
            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-slate-800 font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
          >
            {Object.values(batchExamPresets).map((b) => (
              <option key={b.code} value={b.code}>
                {b.code}: {b.subject} ({b.name})
              </option>
            ))}
          </select>
        </div>

        {/* Examination Dropdown */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Examination Period
          </label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-slate-800 font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
          >
            <option value="Mid-Term Assessment (AY 2024-25)">Mid-Term Assessment (AY 2024-25)</option>
            <option value="Continuous Evaluation 01 (AY 2024-25)">Continuous Evaluation 01 (AY 2024-25)</option>
            <option value="End-Term Internal Sessional Review">End-Term Internal Sessional Review</option>
          </select>
        </div>

        {/* Subject & Max Marks Meta */}
        <div className="md:col-span-4 space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Evaluation Ledger State
          </label>
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-800">Max Score: {activeConfig.maxMarks}.0</div>
              <div className="text-[11px] text-slate-400">{activeConfig.degree}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLocked ? "bg-emerald-500" : "bg-amber-500"
                }`}
              ></span>
              <span className="font-bold text-xs text-slate-700">
                {isLocked ? "Locked" : "Draft"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Coverage */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Evaluation Coverage
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">
              {computedStats.count} / {computedStats.count}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">All Candidates Logged</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Pending Marks</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
              <CheckCircle2 className="h-3 w-3" /> 100% Complete
            </span>
          </div>
        </div>

        {/* Metric 2: Class Average */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Class Average
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-600">{computedStats.avg}</span>
              <span className="text-xs text-slate-400">/ {activeConfig.maxMarks}.0</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 ml-auto">
                {((parseFloat(computedStats.avg) / activeConfig.maxMarks) * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Cohort Performance Mean</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Benchmark Target: 70%</span>
            <span className="text-emerald-600 font-semibold text-[11px]">+5.4% YoY</span>
          </div>
        </div>

        {/* Metric 3: Score Range (Peak & Floor) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Score Boundary Range
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Peak Score
              </span>
              <span className="text-2xl font-bold text-[#3D405B]">{computedStats.peak}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Floor Score
              </span>
              <span className="text-2xl font-bold text-rose-600">{computedStats.floor}</span>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Spread Margin</span>
            <span className="text-slate-700 font-semibold text-[11px]">
              {(parseFloat(computedStats.peak) - parseFloat(computedStats.floor)).toFixed(1)} pts
            </span>
          </div>
        </div>

        {/* Metric 4: Grade Band Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Grade Distribution
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <BarChart3 className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3 space-y-2">
            {/* Visual segmented bar */}
            <div className="flex items-center h-2.5 w-full gap-1 rounded-full overflow-hidden bg-slate-100">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{
                  width: `${
                    computedStats.count > 0 ? (computedStats.dist / computedStats.count) * 100 : 0
                  }%`
                }}
                title={`Distinction: ${computedStats.dist}`}
              ></div>
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{
                  width: `${
                    computedStats.count > 0 ? (computedStats.first / computedStats.count) * 100 : 0
                  }%`
                }}
                title={`1st Class: ${computedStats.first}`}
              ></div>
              <div
                className="bg-amber-500 h-full rounded-full transition-all"
                style={{
                  width: `${
                    computedStats.count > 0 ? (computedStats.pass / computedStats.count) * 100 : 0
                  }%`
                }}
                title={`Pass: ${computedStats.pass}`}
              ></div>
              <div
                className="bg-rose-500 h-full rounded-full transition-all"
                style={{
                  width: `${
                    computedStats.count > 0 ? (computedStats.rem / computedStats.count) * 100 : 0
                  }%`
                }}
                title={`Remedial: ${computedStats.rem}`}
              ></div>
            </div>
            <div className="grid grid-cols-4 gap-1 text-center font-bold text-[10px]">
              <span className="text-emerald-600">{computedStats.dist} Dist</span>
              <span className="text-blue-600">{computedStats.first} 1st</span>
              <span className="text-amber-600">{computedStats.pass} Pass</span>
              <span className="text-rose-600">{computedStats.rem} Rem</span>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Pass Rate</span>
            <span className="text-emerald-600 font-semibold text-[11px]">
              {computedStats.count > 0
                ? (((computedStats.count - computedStats.rem) / computedStats.count) * 100).toFixed(0)
                : 0}
              % Passed
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace Table & Operations */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
        {/* Workspace Mode Tabs & Search Toolstrip */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
          <div className="flex items-center bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab("ica")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "ica"
                  ? "bg-white text-[#355C7D] font-bold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Theory Continuous Assessment (Max {activeConfig.maxMarks})
            </button>
            <button
              onClick={() => setActiveTab("lab")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "lab"
                  ? "bg-white text-[#355C7D] font-bold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Practical Lab Practicum
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "audit"
                  ? "bg-white text-[#355C7D] font-bold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Audit Trail &amp; Hash
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-44 sm:w-56">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate name or roll..."
                className="w-full bg-white border border-slate-200 pl-8 pr-2 py-1.5 text-xs text-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#355C7D]"
              />
            </div>

            <button
              onClick={() => showToast("Draft saved to secure local storage.")}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Save className="h-3.5 w-3.5 text-slate-500" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>

        {/* Main Marks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/90 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 w-36">Student Roll</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4 text-center bg-blue-50/60 text-[#355C7D]">
                  {activeConfig.comp1Name}
                </th>
                <th className="py-3 px-4 text-center bg-blue-50/60 text-[#355C7D]">
                  {activeConfig.comp2Name}
                </th>
                <th className="py-3 px-4 text-center bg-blue-50/60 text-[#355C7D]">
                  {activeConfig.midTermName}
                </th>
                <th className="py-3 px-4 text-right bg-slate-100 text-slate-800 font-bold">
                  Total (/{activeConfig.maxMarks})
                </th>
                <th className="py-3 px-4 text-right bg-slate-100 text-slate-800 font-bold">
                  % Score
                </th>
                <th className="py-3 px-4 text-center">Academic Band</th>
                <th className="py-3 px-3 text-center w-12">Pin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map((stu, sIdx) => {
                const total = stu.comp1 + stu.comp2 + stu.midTerm;
                const pct = ((total / activeConfig.maxMarks) * 100).toFixed(1);

                let bandBadge = "bg-emerald-50 text-emerald-700 border-emerald-200";
                let bandText = "Distinction";
                if (parseFloat(pct) < 50) {
                  bandBadge = "bg-rose-50 text-rose-700 border-rose-200";
                  bandText = "Remedial";
                } else if (parseFloat(pct) < 65) {
                  bandBadge = "bg-amber-50 text-amber-700 border-amber-200";
                  bandText = "Pass";
                } else if (parseFloat(pct) < 85) {
                  bandBadge = "bg-blue-50 text-blue-700 border-blue-200";
                  bandText = "1st Class";
                }

                return (
                  <tr
                    key={stu.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      stu.isPinned ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-center text-slate-400 font-mono text-xs">
                      {sIdx + 1}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-xs text-slate-800">
                      {stu.roll}
                    </td>
                    <td className="py-3 px-4 font-bold text-sm text-[#3D405B]">
                      {stu.name}
                    </td>

                    {/* Comp 1 Input */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={activeConfig.comp1Max}
                        disabled={isLocked || stu.isPinned}
                        value={stu.comp1}
                        onChange={(e) =>
                          handleMarkChange(stu.id, "comp1", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 w-18 text-center bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-lg focus:outline-none focus:ring-1 focus:ring-[#355C7D] disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </td>

                    {/* Comp 2 Input */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={activeConfig.comp2Max}
                        disabled={isLocked || stu.isPinned}
                        value={stu.comp2}
                        onChange={(e) =>
                          handleMarkChange(stu.id, "comp2", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 w-18 text-center bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-lg focus:outline-none focus:ring-1 focus:ring-[#355C7D] disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </td>

                    {/* Mid-Term Input */}
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max={activeConfig.midTermMax}
                        disabled={isLocked || stu.isPinned}
                        value={stu.midTerm}
                        onChange={(e) =>
                          handleMarkChange(stu.id, "midTerm", parseFloat(e.target.value) || 0)
                        }
                        className="h-8 w-18 text-center bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-lg focus:outline-none focus:ring-1 focus:ring-[#355C7D] disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </td>

                    {/* Total */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-sm text-[#3D405B] bg-slate-50/60">
                      {total.toFixed(1)}
                    </td>

                    {/* Percentage */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-xs text-slate-700 bg-slate-50/60">
                      {pct}%
                    </td>

                    {/* Academic Band Badge */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md border ${bandBadge}`}
                      >
                        {bandText}
                      </span>
                    </td>

                    {/* Pin / Lock Row */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => togglePin(stu.id)}
                        title={stu.isPinned ? "Row Pinned" : "Pin Row"}
                        className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        {stu.isPinned ? (
                          <Lock className="h-3.5 w-3.5 text-[#355C7D]" />
                        ) : (
                          <Unlock className="h-3.5 w-3.5 text-slate-300" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-slate-50/90 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>
              Real-time SHA-256 validation anchor active. All 3 components automatically summed &amp; converted to letter grades.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast("Exporting official marks spreadsheet (Excel)...")}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            >
              Export Excel
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg border border-slate-200 transition-colors shadow-2xs cursor-pointer"
            >
              Print Gazette Draft
            </button>
          </div>
        </div>
      </div>

      {/* Submit Marks Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#355C7D] flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3D405B]">
                    Commit Marks to Exam Cell
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official submission for internal evaluation gazetting.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <p className="text-slate-600 leading-relaxed">
                You are locking and transmitting Continuous Assessment Marks for:
              </p>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cohort:</span>
                  <strong className="text-slate-800">{activeConfig.code}: {activeConfig.subject}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assessment:</span>
                  <strong className="text-slate-800">{selectedExam}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Candidates Evaluated:</span>
                  <strong className="text-emerald-600">{currentMarks.length} / {currentMarks.length} (100%)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Class Average:</span>
                  <strong className="text-[#355C7D]">{computedStats.avg} / {activeConfig.maxMarks}.0</strong>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/70 text-slate-700 text-xs rounded-xl space-y-1">
                <div className="font-bold text-[#355C7D] flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#355C7D]" />
                  Examination Cell Ledger Audit
                </div>
                <p className="text-[11px] text-slate-500">
                  Upon locking, grades are committed to the university central server. Subsequent amendments will require Controller of Examinations sanction.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitLedger}
                className="px-5 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Lock &amp; Transmit Marks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
