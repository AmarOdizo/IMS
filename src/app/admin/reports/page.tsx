"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  FileText,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building,
  GraduationCap,
  IndianRupee,
  Users,
  Award,
  BookOpen,
  PieChart,
  RotateCcw,
  Sliders,
  Check,
  X,
  Play,
  Mail,
  Send,
  Sparkles,
  Layers,
  ArrowUpRight,
  Lock,
  Briefcase
} from "lucide-react";

interface ReportTemplate {
  id: string;
  code: string;
  category: "academic" | "finance" | "attendance" | "accreditation" | "workload";
  categoryLabel: string;
  title: string;
  scope: string;
  cadence: string;
  lastRun: string;
  coverage: string;
  formats: string[];
  isStarred?: boolean;
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "rep-1",
    code: "APX-REP-ACAD-01",
    category: "academic",
    categoryLabel: "Academic",
    title: "End-Semester Cumulative Cohort Grade Gazette",
    scope: "Includes SGPA, CGPA, Backlog telemetry, and Dean's Honor index.",
    cadence: "Weekly Automated",
    lastRun: "Yesterday 23:59 EST",
    coverage: "3,892 Students, 186 Subjects",
    formats: ["PDF", "XLSX", "CSV"],
    isStarred: true
  },
  {
    id: "rep-2",
    code: "APX-REP-FIN-04",
    category: "finance",
    categoryLabel: "Finance",
    title: "Tuition Fee Arrears & Counter Collections Reconciliation",
    scope: "Real-time payment gateway, demand draft, and bank settlement ledger.",
    cadence: "Daily EOD Batch",
    lastRun: "Today 06:00 EST",
    coverage: "₹5.10 Cr Billed, 14 Ledgers",
    formats: ["PDF", "XLSX"]
  },
  {
    id: "rep-3",
    code: "APX-REP-ATT-09",
    category: "attendance",
    categoryLabel: "Attendance",
    title: "Chronic Absenteeism & 75% Defaulter Audit",
    scope: "Statutory mandatory minimum attendance threshold enforcement roster.",
    cadence: "Weekly Mondays",
    lastRun: "2 days ago",
    coverage: "18 Cohorts, 64 Flagged",
    formats: ["PDF", "CSV"]
  },
  {
    id: "rep-4",
    code: "APX-REP-FAC-02",
    category: "workload",
    categoryLabel: "Faculty",
    title: "Faculty Workload Variance & Lecture Allocation Matrix",
    scope: "Credits-to-contact hours parity, research release time, and lab slots.",
    cadence: "Bi-Weekly Review",
    lastRun: "May 20, 2024",
    coverage: "142 Faculty, 150 Slots",
    formats: ["PDF", "XLSX"]
  },
  {
    id: "rep-5",
    code: "APX-REP-GOV-07",
    category: "accreditation",
    categoryLabel: "Regulatory",
    title: "National Accreditation Compliance Dossier (NIRF/NAAC/ABET)",
    scope: "Criterion 1 through 7 statutory evidence index and audit bundle.",
    cadence: "Monthly EOM",
    lastRun: "May 01, 2024",
    coverage: "Criterion 1-7 Full Audit",
    formats: ["PDF", "DOCX"],
    isStarred: true
  },
  {
    id: "rep-6",
    code: "APX-REP-EXAM-03",
    category: "academic",
    categoryLabel: "Exams",
    title: "Course Evaluation Velocity & Grade Moderation Telemetry",
    scope: "Scripts evaluated, standard deviation outliers, and moderation flags.",
    cadence: "Real-Time Dynamic",
    lastRun: "Active Stream",
    coverage: "4,820 Evaluated Papers",
    formats: ["PDF", "CSV"]
  },
  {
    id: "rep-7",
    code: "APX-REP-PLC-05",
    category: "academic",
    categoryLabel: "Placement",
    title: "Campus Placements & Corporate Recruitment Index",
    scope: "Tier-1 enterprise offers, median CTC bands, and industry hiring matrix.",
    cadence: "Bi-Weekly Batch",
    lastRun: "3 days ago",
    coverage: "1,240 Finalists, 92 Corporates",
    formats: ["PDF", "XLSX", "CSV"]
  },
  {
    id: "rep-8",
    code: "APX-REP-RES-08",
    category: "accreditation",
    categoryLabel: "Research",
    title: "Research Citations, Patents & Sponsored Lab Grants",
    scope: "Scopus/WoS h-index tracking, government grants, and IP disclosures.",
    cadence: "Quarterly Audit",
    lastRun: "Apr 15, 2024",
    coverage: "84 Papers, ₹1.42 Cr Grants",
    formats: ["PDF", "DOCX"]
  }
];

export default function ReportsAndAnalyticsPage() {
  const [reports] = useState<ReportTemplate[]>(REPORT_TEMPLATES);
  const [selectedReport, setSelectedReport] = useState<ReportTemplate>(REPORT_TEMPLATES[0]);
  const [activeTab, setActiveTab] = useState<"all" | "academic" | "finance" | "attendance" | "accreditation" | "workload">("all");

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState("AY 2024-25");
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedFrequency, setSelectedFrequency] = useState("all");

  // Parameter Tuning states
  const [targetDept, setTargetDept] = useState("B.Tech Computer Science & Engineering");
  const [cohortBatch, setCohortBatch] = useState("Batch 2023-27 (Semester IV) - Active");
  const [gradingScheme, setGradingScheme] = useState("Relative Grading (Gaussian Curve Standard)");
  const [includeAttendanceCross, setIncludeAttendanceCross] = useState(true);
  const [includeICA, setIncludeICA] = useState(true);
  const [includeRank, setIncludeRank] = useState(false);

  // Modals & Feedback
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const filteredReports = reports.filter(item => {
    if (activeTab !== "all" && item.category !== activeTab) return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const match =
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.scope.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedFrequency !== "all") {
      if (!item.cadence.toLowerCase().includes(selectedFrequency.toLowerCase())) return false;
    }

    return true;
  });

  const getCategoryBadgeClass = (category: ReportTemplate["category"]) => {
    switch (category) {
      case "academic":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "finance":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "attendance":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "accreditation":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      case "workload":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200/80";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        {/* Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reports &amp; Analytics</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Data Lake v4.12 Synced
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Institutional intelligence, statutory compliance dossiers (NIRF/NAAC/ABET) &amp; automated dispatch center.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Regulatory Audit</span>
            </button>
            <button
              onClick={() => showToast("Exporting Complete Executive Reporting Pack (ZIP, 14.8 MB)...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Export Executive Pack</span>
            </button>
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>+ Schedule Dispatch</span>
            </button>
          </div>
        </div>

        {/* 4 Standard Redesigned KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* KPI 1: Campus Enrollment & Retention */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Enrollment
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                3,892 <span className="text-xs font-normal text-slate-500">Students</span>
              </div>
              <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-emerald-600 font-semibold">+1.8% YoY</span>
                <span className="text-slate-400">97.2% Ret.</span>
              </div>
            </div>
          </div>

          {/* KPI 2: Aggregate Academic Performance */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Performance
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                3.44 <span className="text-xs font-normal text-slate-500">CGPA</span>
              </div>
              <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-emerald-600 font-semibold">94.6% Clear</span>
                <span className="text-slate-400">28% Honor</span>
              </div>
            </div>
          </div>

          {/* KPI 3: Fee Collections Telemetry */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Fee Collection Rate
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                ₹4.82 Cr <span className="text-xs font-normal text-slate-500">/ ₹5.10 Cr</span>
              </div>
              <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-emerald-600 font-semibold">94.5% Realized</span>
                <span className="text-slate-400">2.1% Due</span>
              </div>
            </div>
          </div>

          {/* KPI 4: Faculty Load & Research Velocity */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Faculty Load
              </span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2.5 sm:mt-3">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                16.4 <span className="text-xs font-normal text-slate-500">h/wk</span>
              </div>
              <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-purple-600 font-semibold">84 Papers</span>
                <span className="text-slate-400">₹1.42 Cr Grants</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation Ribbon & Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 max-w-full no-scrollbar">
            {[
              { id: "all", label: "All Reports", count: reports.length },
              { id: "academic", label: "Academic & Grades", count: reports.filter(r => r.category === "academic").length },
              { id: "finance", label: "Finance & Bursar", count: reports.filter(r => r.category === "finance").length },
              { id: "attendance", label: "Attendance & Cohorts", count: reports.filter(r => r.category === "attendance").length },
              { id: "accreditation", label: "Accreditation & NIRF", count: reports.filter(r => r.category === "accreditation").length },
              { id: "workload", label: "Staff Workload", count: reports.filter(r => r.category === "workload").length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Extended Filter Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search report templates, metrics, compliance tags, codes..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="lg:col-span-2">
              <select
                value={selectedAcademicYear}
                onChange={e => setSelectedAcademicYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="AY 2024-25">AY 2024-25 (Current)</option>
                <option value="AY 2023-24">AY 2023-24 (Full Cycle)</option>
                <option value="AY 2022-23">Archived AY 2022-23</option>
              </select>
            </div>

            <div className="lg:col-span-3">
              <select
                value={selectedFaculty}
                onChange={e => setSelectedFaculty(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="all">All Faculties & Schools</option>
                <option value="computing">Faculty of Computing & Data</option>
                <option value="ai">Faculty of Artificial Intelligence</option>
                <option value="mgmt">School of Management</option>
              </select>
            </div>

            <div className="lg:col-span-2 flex items-center gap-2">
              <select
                value={selectedFrequency}
                onChange={e => setSelectedFrequency(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="all">All Cadences</option>
                <option value="weekly">Automated Weekly</option>
                <option value="daily">Daily EOD</option>
                <option value="monthly">Monthly Audit</option>
                <option value="dynamic">Real-Time</option>
              </select>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFaculty("all");
                  setSelectedFrequency("all");
                  showToast("Dataset refreshed and synced with Data Lake.");
                }}
                title="Refresh Dataset"
                className="p-2 text-slate-500 hover:text-slate-800 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Split Layout: Left Reports Ledger (8 cols) vs Right Interactive Studio Drawer (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Master Reports Catalog Table & YoY Metrics (8 of 12 cols / ~66%) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Master Reports Catalog Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
              {/* Action Bar */}
              <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Executive Report Registry
                  </span>
                  <div className="h-4 w-px bg-slate-200" />
                  <button
                    onClick={() => showToast("Bulk batch export generated for all visible reporting registers.")}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Bulk Export</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  Showing {filteredReports.length} of {reports.length} Templates
                </div>
              </div>

              {/* Scrollable Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[750px]">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                      <th className="px-3.5 py-3">Report Code & Class</th>
                      <th className="px-3.5 py-3">Report Title & Scope</th>
                      <th className="px-3.5 py-3">Cadence & Last Run</th>
                      <th className="px-3.5 py-3">Coverage</th>
                      <th className="px-3.5 py-3">Formats</th>
                      <th className="px-3.5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredReports.map(rep => {
                      const isSelected = selectedReport.id === rep.id;

                      return (
                        <tr
                          key={rep.id}
                          onClick={() => setSelectedReport(rep)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-indigo-50/60 hover:bg-indigo-50 border-l-4 border-indigo-600"
                              : "hover:bg-slate-50/70"
                          }`}
                        >
                          <td className="px-3.5 py-3.5 align-top whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                              <div className="flex flex-col gap-0.5">
                                <span className="font-mono font-bold text-slate-900">{rep.code}</span>
                                <span
                                  className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getCategoryBadgeClass(
                                    rep.category
                                  )}`}
                                >
                                  {rep.categoryLabel}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-3.5 py-3.5 align-top max-w-xs">
                            <div className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors">
                              {rep.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                              {rep.scope}
                            </div>
                          </td>
                          <td className="px-3.5 py-3.5 align-top whitespace-nowrap">
                            <div className="font-mono text-slate-800 font-medium">{rep.cadence}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{rep.lastRun}</div>
                          </td>
                          <td className="px-3.5 py-3.5 align-top whitespace-nowrap">
                            <span className="font-medium text-slate-700">{rep.coverage}</span>
                          </td>
                          <td className="px-3.5 py-3.5 align-top whitespace-nowrap">
                            <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                              {rep.formats.map(f => (
                                <span
                                  key={f}
                                  className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/80"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-3.5 py-3.5 align-top text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  setSelectedReport(rep);
                                  setIsPreviewModalOpen(true);
                                }}
                                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
                              >
                                Run Now
                              </button>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  showToast(`Downloaded signed archive for ${rep.code}`);
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                                title="Download Archive"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Footer */}
              <div className="p-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                <span className="text-xs text-slate-500 font-mono">
                  Page 1 of 6 (Total {reports.length} Templates)
                </span>
                <div className="inline-flex items-center gap-1 text-xs">
                  <button
                    disabled
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg cursor-not-allowed opacity-50"
                  >
                    Prev
                  </button>
                  <button className="px-3 py-1 bg-indigo-600 text-white font-bold rounded-lg font-mono">1</button>
                  <button className="px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-mono">
                    2
                  </button>
                  <button className="px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-mono">
                    3
                  </button>
                  <button className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Telemetry & Multi-Vector Trajectory Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Semester YoY Metric Trajectory Telemetry
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Aggregated across all 18 Schools & 3 Campuses
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  AY 2024–25 Baseline
                </span>
              </div>

              {/* Trajectory 4-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                {/* Metric 1 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                      <span>Enrollment</span>
                      <span className="text-emerald-600 font-bold">+5.2% YoY</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mt-1">3,892 Pax</div>
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full w-[82%]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">Baseline: 3,700</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                      <span>Fee Realization</span>
                      <span className="text-emerald-600 font-bold">+3.1% YoY</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mt-1">94.5% Rate</div>
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[94.5%]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">Cleared: ₹4.82 Cr</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                      <span>Exam Pass Rate</span>
                      <span className="text-emerald-600 font-bold">+1.4% YoY</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mt-1">94.6% Clear</div>
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full w-[94.6%]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">Arrears: 5.4%</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                      <span>Chronic Absence</span>
                      <span className="text-emerald-600 font-bold">-2.8% Delta</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mt-1">1.64% Cohort</div>
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full w-[16%]" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-1 block">Flagged: 64 pax</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Studio Drawer & Live Compiler (4 of 12 cols / ~34%) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Live Report Studio Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Live Report Studio
                  </h2>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                  Interactive
                </span>
              </div>

              {/* Active Selection Banner */}
              <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-3 border border-slate-200/80">
                <FileText className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase font-bold text-indigo-600">
                    Active Selection
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {selectedReport.code}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {selectedReport.title}
                  </p>
                </div>
              </div>

              {/* Document Render Miniature Visual Preview */}
              <div className="bg-slate-50/70 rounded-xl border border-dashed border-slate-300 p-3 relative">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-bold text-slate-900 uppercase">
                      Apex Institute • Academic Gazette
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-600 font-semibold">
                    SHA-256 VALIDATED
                  </span>
                </div>

                {/* Document lines preview */}
                <div className="space-y-1 font-mono text-[10px] text-slate-800">
                  <div className="flex justify-between bg-white rounded px-2 py-1 font-bold text-slate-600 border border-slate-200/60">
                    <span>USN #</span>
                    <span>NAME</span>
                    <span>SGPA</span>
                    <span>RESULT</span>
                  </div>
                  <div className="flex justify-between px-2 py-0.5 text-slate-600">
                    <span>APX24CS001</span>
                    <span className="font-sans">A. Vance</span>
                    <span className="font-bold text-indigo-600">3.92</span>
                    <span className="text-emerald-600 font-semibold font-sans">DISTINCTION</span>
                  </div>
                  <div className="flex justify-between px-2 py-0.5 text-slate-600">
                    <span>APX24CS002</span>
                    <span className="font-sans">M. Chen</span>
                    <span className="font-bold text-indigo-600">3.88</span>
                    <span className="text-emerald-600 font-semibold font-sans">DISTINCTION</span>
                  </div>
                  <div className="flex justify-between px-2 py-0.5 text-slate-600">
                    <span>APX24CS003</span>
                    <span className="font-sans">K. Nair</span>
                    <span className="font-bold text-slate-900">3.41</span>
                    <span className="text-slate-600 font-sans">FIRST CLASS</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[9px] font-mono text-slate-400">
                  <span>HASH: 9f8a3c...d81e</span>
                  <span className="text-emerald-600 font-semibold">DIGITALLY SIGNED</span>
                </div>
              </div>

              {/* Execution Parameter Tuning */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-700 block">
                  Execution Parameters
                </span>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Target Department / School
                  </label>
                  <select
                    value={targetDept}
                    onChange={e => setTargetDept(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option>B.Tech Computer Science & Engineering</option>
                    <option>B.Tech Artificial Intelligence & Data</option>
                    <option>MBA Systems & Financial Analytics</option>
                    <option>B.Tech Electronics & Communication</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Cohort Batch & Term
                  </label>
                  <select
                    value={cohortBatch}
                    onChange={e => setCohortBatch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option>Batch 2023-27 (Semester IV) - Active</option>
                    <option>Batch 2022-26 (Semester VI)</option>
                    <option>Batch 2021-25 (Semester VIII - Graduating)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-slate-600">
                    Grade Calculation Scheme
                  </label>
                  <select
                    value={gradingScheme}
                    onChange={e => setGradingScheme(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option>Relative Grading (Gaussian Curve Standard)</option>
                    <option>Absolute Threshold Scale (10-Point UGC)</option>
                    <option>Weighted Grade Point Equivalent</option>
                  </select>
                </div>

                {/* Inclusions Telemetry Checkboxes */}
                <div className="pt-1 space-y-1.5 text-xs text-slate-700">
                  <span className="text-[11px] font-medium text-slate-600 block">
                    Telemetry Layers
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeAttendanceCross}
                      onChange={e => setIncludeAttendanceCross(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Attendance Correlation Cross-Matrix</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeICA}
                      onChange={e => setIncludeICA(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Internal Continuous Assessment (ICA)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeRank}
                      onChange={e => setIncludeRank(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Class Rank Percentile & Dean&apos;s Honor Badge</span>
                  </label>
                </div>
              </div>

              {/* Delivery Cadence Box */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Automation Cadence:</span>
                  <strong className="font-semibold text-indigo-600 font-mono text-[11px]">
                    Every Monday @ 07:00 EST
                  </strong>
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate">
                  dean.vance@apex.edu, exams@apex.edu, registrar@apex.edu
                </div>
              </div>

              {/* Studio Actions */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Play className="w-4 h-4" />
                  <span>Generate & Preview Report</span>
                </button>
                <button
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="w-full py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span>Schedule to Auto-Email Queue</span>
                </button>
              </div>
            </div>

            {/* Security, FERPA & Compliance Guarantee Box */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <span className="text-xs uppercase tracking-wider font-bold">
                  Security & Regulatory Seal
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                All exported datasets adhere strictly to FERPA, GDPR, and National Statutory Accreditation guidelines. Each generated batch is cryptographically stamped with SHA-256 checksums and logged to Campus Immutable Ledger <strong className="font-mono text-indigo-600">#APX-SEC-LOG-2024</strong>.
              </p>
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-600 font-bold border border-slate-200/60">
                  FERPA SECURE
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-600 font-bold border border-slate-200/60">
                  NAAC CRITERION-2
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-600 font-bold border border-slate-200/60">
                  256-BIT ENCRYPTION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: FULL REPORT GENERATION & PREVIEW MODAL */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full p-6 space-y-4 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedReport.title}
                  </h3>
                  <div className="font-mono text-xs text-slate-400 mt-0.5">
                    {selectedReport.code} • {cohortBatch} • {targetDept}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Generated Data Table */}
            <div className="border border-slate-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80">
                  <tr>
                    <th className="p-3">Roll No (USN)</th>
                    <th className="p-3">Candidate Name</th>
                    <th className="p-3">Program</th>
                    <th className="p-3">Credits</th>
                    <th className="p-3">SGPA</th>
                    <th className="p-3">CGPA</th>
                    <th className="p-3">Attendance</th>
                    <th className="p-3 text-right">Standing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">APX24CS001</td>
                    <td className="p-3 font-sans font-medium text-slate-800">Alexander Vance</td>
                    <td className="p-3">B.Tech CSE</td>
                    <td className="p-3">24 / 24</td>
                    <td className="p-3 font-bold text-indigo-600">3.92</td>
                    <td className="p-3 font-bold text-slate-900">3.90</td>
                    <td className="p-3 text-emerald-600 font-semibold">94.8%</td>
                    <td className="p-3 text-right font-sans font-bold text-emerald-600">DEAN&apos;S LIST</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">APX24CS002</td>
                    <td className="p-3 font-sans font-medium text-slate-800">Maya R. Chen</td>
                    <td className="p-3">B.Tech CSE</td>
                    <td className="p-3">24 / 24</td>
                    <td className="p-3 font-bold text-indigo-600">3.88</td>
                    <td className="p-3 font-bold text-slate-900">3.84</td>
                    <td className="p-3 text-emerald-600 font-semibold">96.2%</td>
                    <td className="p-3 text-right font-sans font-bold text-emerald-600">DEAN&apos;S LIST</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">APX24CS003</td>
                    <td className="p-3 font-sans font-medium text-slate-800">Karthik S. Nair</td>
                    <td className="p-3">B.Tech CSE</td>
                    <td className="p-3">24 / 24</td>
                    <td className="p-3 font-bold text-slate-900">3.41</td>
                    <td className="p-3 font-bold text-slate-900">3.45</td>
                    <td className="p-3">88.5%</td>
                    <td className="p-3 text-right font-sans font-medium text-slate-700">FIRST CLASS</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">APX24CS004</td>
                    <td className="p-3 font-sans font-medium text-slate-800">Sophia Jenkins</td>
                    <td className="p-3">B.Tech CSE</td>
                    <td className="p-3">24 / 24</td>
                    <td className="p-3 font-bold text-slate-900">3.55</td>
                    <td className="p-3 font-bold text-slate-900">3.52</td>
                    <td className="p-3">91.0%</td>
                    <td className="p-3 text-right font-sans font-medium text-slate-700">FIRST CLASS</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">APX24CS005</td>
                    <td className="p-3 font-sans font-medium text-slate-800">Devon Brooks</td>
                    <td className="p-3">B.Tech CSE</td>
                    <td className="p-3">21 / 24</td>
                    <td className="p-3 font-bold text-rose-600">2.68</td>
                    <td className="p-3 font-bold text-rose-600">2.74</td>
                    <td className="p-3 text-rose-600 font-bold">71.2%</td>
                    <td className="p-3 text-right font-sans font-semibold text-rose-600">ATTENDANCE SHORTAGE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span>DIGITAL CHECKSUM: 9f8a3c4b...</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold">FERPA AUDITED</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                    showToast("Sending report to system print spools...");
                  }}
                  className="px-3.5 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => {
                    showToast(`Exported ${selectedReport.code} as formatted XLSX workbook.`);
                    setIsPreviewModalOpen(false);
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export XLSX</span>
                </button>
                <button
                  onClick={() => {
                    showToast(`Signed PDF report generated for ${selectedReport.code}`);
                    setIsPreviewModalOpen(false);
                  }}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SCHEDULE AUTOMATED REPORT */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Calendar className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Schedule Automated Dispatch
                </h3>
              </div>
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Report Template
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${selectedReport.code} - ${selectedReport.title}`}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-slate-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Cadence / Frequency
                  </label>
                  <select className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800">
                    <option>Weekly on Mondays</option>
                    <option>Daily at EOD (23:59)</option>
                    <option>Monthly (1st of month)</option>
                    <option>Bi-Weekly</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Execution Time (EST)
                  </label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Recipient Email Distribution List
                </label>
                <textarea
                  rows={2}
                  defaultValue="dean.vance@apex.edu, exams@apex.edu, registrar@apex.edu"
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">
                  Attachment Output Format
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Encrypted PDF</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Excel (.xlsx)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                    <span>Raw CSV</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsScheduleModalOpen(false);
                  showToast(`Cron job scheduled for ${selectedReport.code} every Monday @ 07:00 EST.`);
                }}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: REGULATORY AUDIT DOSSIER */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Statutory Regulatory Audit Dossier
                </h3>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-500 leading-relaxed">
                Pre-packaged criterion evidence reports mapped to NIRF (National Institutional Ranking Framework), NAAC Criteria 1–7, and ABET accreditation metrics.
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">NIRF 2025 Data Capture Framework (DCF)</div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                      TLR, RPC, GO, OI, PR Parameters • AY 2024-25
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Downloaded NIRF DCF Data Bundle (PDF & Excel)")}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Download
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">NAAC Self-Study Report (SSR) Criterion 1–7</div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                      Curricular Aspects, Teaching-Learning, Research, Infrastructure
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Downloaded NAAC SSR Dossier Bundle")}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Download
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">ABET Engineering Accreditation Readiness</div>
                    <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                      Student Outcomes 1–7, Program Educational Objectives (PEOs)
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Downloaded ABET Assessment Matrix")}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
