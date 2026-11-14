"use client";

import { useState, useMemo } from "react";
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
  RefreshCw
} from "lucide-react";

interface StudentMarkRecord {
  id: string;
  roll: string;
  name: string;
  quiz: number;
  project: number;
  midTerm: number;
  isPinned: boolean;
}

const initialMarksData: StudentMarkRecord[] = [
  {
    id: "m-1",
    roll: "APX-2023-CS-042",
    name: "Rahul Sharma",
    quiz: 9.5,
    project: 9.0,
    midTerm: 18.5,
    isPinned: false
  },
  {
    id: "m-2",
    roll: "APX-2023-CS-015",
    name: "Priya Patel",
    quiz: 10.0,
    project: 9.5,
    midTerm: 19.0,
    isPinned: false
  },
  {
    id: "m-3",
    roll: "APX-2023-CS-078",
    name: "Rohan Verma",
    quiz: 5.5,
    project: 6.0,
    midTerm: 11.0,
    isPinned: false
  },
  {
    id: "m-4",
    roll: "APX-2023-CS-089",
    name: "Sneha Rao",
    quiz: 10.0,
    project: 10.0,
    midTerm: 19.5,
    isPinned: false
  },
  {
    id: "m-5",
    roll: "APX-2023-CS-104",
    name: "Vikram Malhotra",
    quiz: 6.0,
    project: 5.5,
    midTerm: 11.0,
    isPinned: false
  },
  {
    id: "m-6",
    roll: "APX-2023-CS-001",
    name: "Arjun Sharma",
    quiz: 9.0,
    project: 8.5,
    midTerm: 17.5,
    isPinned: false
  },
  {
    id: "m-7",
    roll: "APX-2023-CS-112",
    name: "Ananya Deshmukh",
    quiz: 8.5,
    project: 9.0,
    midTerm: 16.5,
    isPinned: false
  },
  {
    id: "m-8",
    roll: "APX-2023-CS-120",
    name: "Karan Johar Mehta",
    quiz: 8.0,
    project: 7.5,
    midTerm: 15.0,
    isPinned: false
  }
];

export default function StaffExamsPage() {
  const [marksList, setMarksList] = useState<StudentMarkRecord[]>(initialMarksData);
  const [activeTab, setActiveTab] = useState<"ica" | "lab" | "audit">("ica");
  const [selectedBatch, setSelectedBatch] = useState("B.Tech CSE - 4th Sem (Sec A)");
  const [selectedExam, setSelectedExam] = useState("Mid-Term Assessment IV (AY 2024-25)");
  const [selectedSubject, setSelectedSubject] = useState("CS-401 Database Management Systems");
  const [isLocked, setIsLocked] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMarkChange = (
    id: string,
    field: "quiz" | "project" | "midTerm",
    value: number
  ) => {
    if (isLocked) {
      showToast("Evaluation ledger is locked. Revisions require Exam Cell approval.");
      return;
    }
    const maxVals = { quiz: 10, project: 10, midTerm: 20 };
    const clampedVal = Math.min(Math.max(0, value), maxVals[field]);

    setMarksList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: clampedVal } : s))
    );
  };

  const togglePin = (id: string) => {
    setMarksList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPinned: !s.isPinned } : s))
    );
  };

  // Computations
  const computedStats = useMemo(() => {
    const totals = marksList.map((s) => s.quiz + s.project + s.midTerm);
    const count = totals.length;
    if (count === 0) return { avg: "0.0", peak: "0.0", floor: "0.0", dist: 0, first: 0, pass: 0, rem: 0, count: 0 };

    const sum = totals.reduce((a, b) => a + b, 0);
    const avg = (sum / count).toFixed(1);
    const peak = Math.max(...totals).toFixed(1);
    const floor = Math.min(...totals).toFixed(1);

    let dist = 0, first = 0, pass = 0, rem = 0;
    totals.forEach((t) => {
      const pct = (t / 40) * 100;
      if (pct >= 85) dist++;
      else if (pct >= 65) first++;
      else if (pct >= 50) pass++;
      else rem++;
    });

    return { avg, peak, floor, dist, first, pass, rem, count };
  }, [marksList]);

  const filteredStudents = useMemo(() => {
    return marksList.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [marksList, searchQuery]);

  const handleSubmitLedger = () => {
    setIsLocked(true);
    setIsSubmitModalOpen(false);
    showToast("Continuous internal assessment marks successfully submitted to Examination Cell!");
  };

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

      {/* Top Header & Deadline Sentinel Bar */}
      <div className="px-6 py-5 bg-surface-container-low border-b border-[#0D2545]/15 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant uppercase">
          <Link href="/staff" className="hover:text-primary">Staff Portal</Link>
          <ChevronRight className="h-3.5 w-3.5 text-outline" />
          <span>Examination Cell</span>
          <ChevronRight className="h-3.5 w-3.5 text-outline" />
          <span className="text-primary font-bold">Continuous Internal Assessment &amp; Marks Entry</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary">
              Marks Entry &amp; Examination Evaluation
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Record Continuous Assessment Marks (CAM), practical lab ratings, and mid-term evaluations for your assigned subjects.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 border border-[#cbd5e1] shadow-xs rounded-sm">
            <Clock className="h-5 w-5 text-secondary shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase text-outline font-bold">
                Evaluation Deadline
              </span>
              <span className="font-mono text-xs font-bold text-error">
                10 JUN 2025 • 14 DAYS REMAINING
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Access Scope Banner */}
      <div className="bg-surface-container-highest px-6 py-2 border-b border-[#0D2545]/15 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-2 text-on-surface">
          <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
          <span className="font-mono font-bold uppercase text-primary">Faculty Access Scope:</span>
          <span className="text-on-surface-variant text-[11px]">
            Marks entry &amp; grade curation authorized. Final grade gazetting &amp; official result publication is strictly reserved for Examination Cell.
          </span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 bg-primary text-on-primary uppercase font-bold rounded-xs">
          ROLE: INSTRUCTOR (WRITE/SUBMIT)
        </span>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Selection Configuration Strip */}
        <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 text-xs font-mono">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-outline">
                Select Assigned Batch
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full h-9 bg-surface-container-low border border-[#cbd5e1] px-2.5 font-bold text-primary focus:outline-none rounded-xs"
              >
                <option value="B.Tech CSE - 4th Sem (Sec A)">B.Tech CSE - 4th Sem (Sec A) [62 Students]</option>
                <option value="B.Tech CSE - 4th Sem (Sec B)">B.Tech CSE - 4th Sem (Sec B) [60 Students]</option>
                <option value="M.Tech Data Science - 2nd Sem">M.Tech Data Science - 2nd Sem [28 Students]</option>
                <option value="BCA - 2nd Sem (Sec B)">BCA - 2nd Sem (Sec B) [34 Students]</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-outline">
                Select Examination
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full h-9 bg-surface-container-low border border-[#cbd5e1] px-2.5 font-bold text-primary focus:outline-none rounded-xs"
              >
                <option value="Mid-Term Assessment IV (AY 2024-25)">Mid-Term Assessment IV (AY 2024-25)</option>
                <option value="Continuous Evaluation 01 (AY 2024-25)">Continuous Evaluation 01 (AY 2024-25)</option>
                <option value="End-Term Internal Sessional Review">End-Term Internal Sessional Review</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-outline">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full h-9 bg-surface-container-low border border-[#cbd5e1] px-2.5 font-bold text-primary focus:outline-none rounded-xs"
              >
                <option value="CS-401 Database Management Systems">CS-401 Database Management Systems (Theory • Max: 40)</option>
                <option value="CS-405L DBMS & SQL Query Laboratory">CS-405L DBMS &amp; SQL Query Laboratory (Lab • Max: 50)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 justify-end">
              <div className="flex items-center justify-between h-9 px-3 bg-surface-container border border-[#cbd5e1] rounded-xs">
                <span className="text-[10px] uppercase text-outline font-bold">Ledger State</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isLocked ? "bg-[#047857]" : "bg-secondary"
                    }`}
                  ></span>
                  <span className="font-mono text-xs font-bold uppercase text-primary">
                    {isLocked ? "Locked & Submitted" : "Draft / Unlocked"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden border-l-4 border-l-secondary rounded-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Evaluation Coverage
              </span>
              <Award className="h-4 w-4 text-secondary" />
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary font-mono leading-none">
                {computedStats.count} / {computedStats.count}
              </span>
              <span className="text-xs font-mono font-bold text-[#047857] bg-[#ecfdf5] px-1.5 py-0.5 rounded-xs">
                100% COMPLETE
              </span>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs font-mono text-outline">
              <span>ALL MARKS LOGGED</span>
              <span className="text-primary font-bold">0 PENDING</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden border-l-4 border-l-primary rounded-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Class Average
              </span>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="my-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary font-mono leading-none">
                {computedStats.avg}
              </span>
              <span className="text-xs text-outline font-mono">/ 40.0</span>
              <span className="text-xs font-mono font-bold text-secondary ml-1">
                {((parseFloat(computedStats.avg) / 40) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs font-mono text-outline">
              <span>HISTORICAL S23: 30.1</span>
              <span className="text-secondary font-bold">+5.7% YOY</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden border-l-4 border-l-primary-container rounded-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Range Boundary
              </span>
              <SlidersHorizontal className="h-4 w-4 text-secondary" />
            </div>
            <div className="my-2 flex items-baseline justify-between font-mono">
              <div>
                <span className="text-[10px] text-outline uppercase block">Peak</span>
                <span className="text-lg font-bold text-primary">{computedStats.peak}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-outline uppercase block">Floor</span>
                <span className="text-lg font-bold text-error">{computedStats.floor}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] flex items-center justify-between text-xs font-mono text-outline">
              <span>Peak: Ananya / Priya</span>
              <span>Floor: Rohan Verma</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden border-l-4 border-l-tertiary-container rounded-sm">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Performance Curve
              </span>
              <BarChart3 className="h-4 w-4 text-secondary" />
            </div>
            {/* Visual Bar segments */}
            <div className="my-2 flex items-center h-3 w-full gap-0.5 rounded-full overflow-hidden bg-surface-container">
              <div
                className="bg-[#047857] h-full"
                style={{ width: `${computedStats.count > 0 ? (computedStats.dist / computedStats.count) * 100 : 0}%` }}
                title={`Distinction: ${computedStats.dist}`}
              ></div>
              <div
                className="bg-secondary h-full"
                style={{ width: `${computedStats.count > 0 ? (computedStats.first / computedStats.count) * 100 : 0}%` }}
                title={`First Class: ${computedStats.first}`}
              ></div>
              <div
                className="bg-primary h-full"
                style={{ width: `${computedStats.count > 0 ? (computedStats.pass / computedStats.count) * 100 : 0}%` }}
                title={`Pass: ${computedStats.pass}`}
              ></div>
              <div
                className="bg-error h-full"
                style={{ width: `${computedStats.count > 0 ? (computedStats.rem / computedStats.count) * 100 : 0}%` }}
                title={`Remedial: ${computedStats.rem}`}
              ></div>
            </div>
            <div className="pt-2 border-t border-[#eff4ff] grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
              <span className="text-[#047857] font-bold">{computedStats.dist} DIST</span>
              <span className="text-secondary font-bold">{computedStats.first} 1ST</span>
              <span className="text-primary font-bold">{computedStats.pass} PASS</span>
              <span className="text-error font-bold">{computedStats.rem} REM</span>
            </div>
          </div>
        </div>

        {/* Main Workspace Table & Operations */}
        <div className="flex flex-col bg-surface-container-lowest border border-[#cbd5e1] shadow-sm rounded-sm overflow-hidden">
          {/* Workspace Tabs & Toolstrip */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#cbd5e1] px-4 bg-surface-container-low gap-3">
            <div className="flex font-mono text-xs">
              <button
                onClick={() => setActiveTab("ica")}
                className={`h-11 px-4 flex items-center gap-2 border-b-2 font-bold uppercase transition-colors ${
                  activeTab === "ica"
                    ? "border-primary text-primary bg-surface-container-lowest"
                    : "border-transparent text-outline hover:text-primary"
                }`}
              >
                <span>Continuous Assessment (ICA) - Max 40</span>
              </button>
              <button
                onClick={() => setActiveTab("lab")}
                className={`h-11 px-4 flex items-center gap-2 border-b-2 font-bold uppercase transition-colors ${
                  activeTab === "lab"
                    ? "border-primary text-primary bg-surface-container-lowest"
                    : "border-transparent text-outline hover:text-primary"
                }`}
              >
                <span>Practical Lab Marks (CS-405L) - Max 50</span>
              </button>
              <button
                onClick={() => setActiveTab("audit")}
                className={`h-11 px-4 flex items-center gap-2 border-b-2 font-bold uppercase transition-colors ${
                  activeTab === "audit"
                    ? "border-primary text-primary bg-surface-container-lowest"
                    : "border-transparent text-outline hover:text-primary"
                }`}
              >
                <span>Submission Audit &amp; Archival</span>
              </button>
            </div>

            <div className="flex items-center gap-2 py-2">
              <div className="relative">
                <Search className="h-3.5 w-3.5 text-outline absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter student..."
                  className="w-44 h-8 pl-8 pr-2 bg-surface-container-lowest border border-[#cbd5e1] text-xs font-mono text-primary placeholder:text-outline focus:outline-none rounded-xs"
                />
              </div>

              <button
                onClick={() => showToast("Marks draft synchronized to local cache.")}
                className="h-8 px-3 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold flex items-center gap-1 border border-[#cbd5e1] rounded-xs"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save Draft</span>
              </button>

              {!isLocked ? (
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="h-8 px-3.5 bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold flex items-center gap-1 shadow-sm rounded-xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit to Exam Cell</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsLocked(false);
                    showToast("Marks ledger unlocked for revisions.");
                  }}
                  className="h-8 px-3.5 bg-[#047857] hover:bg-[#065f46] text-white font-mono text-xs uppercase font-bold flex items-center gap-1 shadow-sm rounded-xs"
                >
                  <Unlock className="h-3.5 w-3.5" />
                  <span>Unlock Revisions</span>
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container font-mono text-[10px] text-primary uppercase border-b border-[#cbd5e1]">
                <tr>
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-3">Student Roll</th>
                  <th className="py-2.5 px-3">Candidate Name</th>
                  <th className="py-2.5 px-3 text-center bg-surface-container-high text-primary">
                    Comp 1 (Quiz /10)
                  </th>
                  <th className="py-2.5 px-3 text-center bg-surface-container-high text-primary">
                    Comp 2 (Project /10)
                  </th>
                  <th className="py-2.5 px-3 text-center bg-surface-container-high text-primary">
                    Mid-Term (/20)
                  </th>
                  <th className="py-2.5 px-3 text-right bg-surface-container text-primary font-bold">
                    Total (/40)
                  </th>
                  <th className="py-2.5 px-3 text-right bg-surface-container text-primary font-bold">
                    %
                  </th>
                  <th className="py-2.5 px-3 text-center">Band &amp; Status</th>
                  <th className="py-2.5 px-3 text-center w-14">Pin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cbd5e1] font-mono text-xs">
                {filteredStudents.map((stu, sIdx) => {
                  const total = stu.quiz + stu.project + stu.midTerm;
                  const pct = ((total / 40) * 100).toFixed(1);

                  let bandStyle = "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]";
                  let bandText = "Distinction";
                  if (parseFloat(pct) < 50) {
                    bandStyle = "bg-[#fef2f2] text-error border-[#fecaca]";
                    bandText = "Remedial";
                  } else if (parseFloat(pct) < 65) {
                    bandStyle = "bg-surface-container text-primary border-[#cbd5e1]";
                    bandText = "Pass";
                  } else if (parseFloat(pct) < 85) {
                    bandStyle = "bg-secondary-container text-primary border-[#99c0fe]";
                    bandText = "1st Class";
                  }

                  return (
                    <tr
                      key={stu.id}
                      className={`hover:bg-surface-container-low transition-colors ${
                        stu.isPinned ? "bg-secondary-container/20" : ""
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center text-outline font-mono">
                        {sIdx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-primary">{stu.roll}</td>
                      <td className="py-2.5 px-3 font-medium text-on-surface">{stu.name}</td>

                      {/* Quiz */}
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="10"
                          disabled={isLocked || stu.isPinned}
                          value={stu.quiz}
                          onChange={(e) =>
                            handleMarkChange(stu.id, "quiz", parseFloat(e.target.value) || 0)
                          }
                          className="h-7 w-16 text-center bg-surface-container-low border border-[#cbd5e1] text-primary font-bold focus:outline-none focus:border-primary rounded-xs"
                        />
                      </td>

                      {/* Project */}
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="10"
                          disabled={isLocked || stu.isPinned}
                          value={stu.project}
                          onChange={(e) =>
                            handleMarkChange(stu.id, "project", parseFloat(e.target.value) || 0)
                          }
                          className="h-7 w-16 text-center bg-surface-container-low border border-[#cbd5e1] text-primary font-bold focus:outline-none focus:border-primary rounded-xs"
                        />
                      </td>

                      {/* Mid-Term */}
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="20"
                          disabled={isLocked || stu.isPinned}
                          value={stu.midTerm}
                          onChange={(e) =>
                            handleMarkChange(stu.id, "midTerm", parseFloat(e.target.value) || 0)
                          }
                          className="h-7 w-16 text-center bg-surface-container-low border border-[#cbd5e1] text-primary font-bold focus:outline-none focus:border-primary rounded-xs"
                        />
                      </td>

                      {/* Total */}
                      <td className="py-2.5 px-3 text-right font-bold text-primary bg-surface-container-low">
                        {total.toFixed(1)}
                      </td>

                      {/* Pct */}
                      <td className="py-2.5 px-3 text-right font-bold text-primary bg-surface-container-low">
                        {pct}%
                      </td>

                      {/* Band */}
                      <td className="py-2.5 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] uppercase font-bold border rounded-xs ${bandStyle}`}
                        >
                          {bandText}
                        </span>
                      </td>

                      {/* Lock / Pin */}
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => togglePin(stu.id)}
                          title={stu.isPinned ? "Pinned" : "Pin Row"}
                          className="text-outline hover:text-primary transition-colors"
                        >
                          {stu.isPinned ? (
                            <Lock className="h-3.5 w-3.5 text-secondary" />
                          ) : (
                            <Unlock className="h-3.5 w-3.5 text-outline" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-surface-container-low border-t border-[#cbd5e1] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-outline">
              <ShieldCheck className="h-4 w-4 text-[#047857]" />
              <span>
                SHA-256 Checksum Anchor linked. Real-time aggregate auto-calculated.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => showToast("Exporting marks ledger (Excel)...")}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary font-bold uppercase border border-[#cbd5e1] rounded-xs"
              >
                Export Excel
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary font-bold uppercase border border-[#cbd5e1] rounded-xs"
              >
                Print Gazette Draft
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Marks Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-md border-2 border-primary shadow-[4px_4px_0_0_#0d2545] p-6 relative rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#cbd5e1]">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">
                  Lock &amp; Submit Internal Marks
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 text-xs font-mono flex flex-col gap-3">
              <p className="text-on-surface leading-relaxed">
                You are submitting final Continuous Assessment Marks for:
              </p>
              <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm space-y-1">
                <div>Batch: <strong>{selectedBatch}</strong></div>
                <div>Exam: <strong>{selectedExam}</strong></div>
                <div>Subject: <strong>{selectedSubject}</strong></div>
                <div>Candidates: <strong>{marksList.length} Evaluated</strong></div>
                <div>Class Average: <strong className="text-primary">{computedStats.avg} / 40.0</strong></div>
              </div>

              <div className="p-2.5 bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-[11px] rounded-sm">
                Upon locking, marks are pushed to the Controller of Examinations and can only be amended via an official Gazette Rectification Request.
              </div>
            </div>

            <div className="pt-3 border-t border-[#cbd5e1] flex justify-end gap-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-1.5 bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitLedger}
                className="px-4 py-1.5 bg-primary text-on-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-primary-container transition-colors rounded-sm"
              >
                Lock &amp; Transmit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
