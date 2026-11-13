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
  DollarSign,
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
  Layers
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
    coverage: "$5.10M Billed, 14 Ledgers",
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
    setTimeout(() => setToastMessage(null), 3000);
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

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 shadow-xl border border-secondary flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-secondary" />
          <span className="font-mono-data text-body-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Sub-Header & Executive Breadcrumb Bar */}
      <div className="bg-surface-container-lowest px-gutter-desktop py-space-md shadow-sm border-b border-outline-variant/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-mono-data text-label-sm uppercase tracking-wider text-secondary">
                Institutional Command
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant" />
              <span className="font-mono-data text-label-sm uppercase tracking-wider text-on-surface-variant">
                Registrar & Governance
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant" />
              <span className="font-mono-data text-label-sm uppercase tracking-wider text-primary font-semibold">
                Reports & Analytics Intelligence
              </span>
            </div>
            <div className="flex items-center gap-space-sm mt-0.5">
              <h1 className="font-headline-lg text-headline-lg tracking-tight text-primary font-bold">
                Intelligence Command & Regulatory Audit Console
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-surface-container-high text-on-secondary-container font-mono-data text-label-sm uppercase tracking-wider font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse"></span>
                Data Lake v4.12 • Synced 4m ago
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low text-primary hover:bg-surface-container font-label-md text-label-md uppercase tracking-wider transition-colors border border-outline-variant/40"
            >
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Regulatory Audit (NIRF/NAAC/ABET)</span>
            </button>
            <button
              onClick={() => showToast("Exporting Complete Executive Reporting Pack (ZIP, 14.8 MB)...")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low text-primary hover:bg-surface-container font-label-md text-label-md uppercase tracking-wider transition-colors border border-outline-variant/40"
            >
              <Download className="w-4 h-4" />
              <span>Export Executive Pack</span>
            </button>
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm font-semibold"
            >
              <Calendar className="w-4 h-4" />
              <span>+ Schedule Automated Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Space */}
      <div className="p-gutter-desktop space-y-space-lg">
        {/* Top 4 Executive Intelligence KPI Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* KPI 1 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div className="pl-2">
              <div className="flex items-center justify-between text-on-surface-variant mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Campus Enrollment & Retention
                </span>
                <GraduationCap className="w-4 h-4 text-secondary" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">3,892</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Enrolled</span>
                <span className="ml-auto inline-flex items-center px-1.5 py-0.5 bg-surface-container-high text-on-secondary-container font-mono-data text-label-sm font-semibold">
                  +1.8% YoY
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                <strong className="font-semibold text-on-surface">97.2% Retention Rate</strong> • 42 Withdrawals / Transfers logged
              </p>
            </div>
            <div className="pl-2 mt-3 pt-2 bg-surface-container-low px-2 py-1.5 flex items-center justify-between">
              <span className="font-mono-data text-label-sm text-on-surface-variant uppercase">Target: 3,850</span>
              <span className="font-mono-data text-label-sm text-secondary font-semibold">101.1% Capacity</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
            <div className="pl-2">
              <div className="flex items-center justify-between text-on-surface-variant mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Aggregate Academic Performance
                </span>
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">3.44</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">CGPA / 4.00</span>
                <span className="ml-auto inline-flex items-center px-1.5 py-0.5 bg-surface-container-high text-on-secondary-container font-mono-data text-label-sm font-semibold">
                  Tier-1 Met
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                <strong className="font-semibold text-on-surface">94.6% Exam Clear Rate</strong> • 28.4% Dean&apos;s Honor Roll
              </p>
            </div>
            <div className="pl-2 mt-3 pt-2 bg-surface-container-low px-2 py-1.5 flex items-center justify-between">
              <span className="font-mono-data text-label-sm text-on-surface-variant uppercase">Grade Spread</span>
              <span className="font-mono-data text-label-sm text-primary font-semibold">Gaussian Bell Standard</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container"></div>
            <div className="pl-2">
              <div className="flex items-center justify-between text-on-surface-variant mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Fee Collection & Arrears Telemetry
                </span>
                <DollarSign className="w-4 h-4 text-secondary" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">$4.82M</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">/ $5.10M</span>
                <span className="ml-auto inline-flex items-center px-1.5 py-0.5 bg-surface-container-high text-on-secondary-container font-mono-data text-label-sm font-semibold">
                  94.5% Collected
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                <strong className="font-semibold text-on-surface">$280K Aging Ledger</strong> • Defaulter Rate: 2.1% (Low)
              </p>
            </div>
            <div className="pl-2 mt-3 pt-2 bg-surface-container-low px-2 py-1.5 flex items-center justify-between">
              <span className="font-mono-data text-label-sm text-on-surface-variant uppercase">Bursar Clearance</span>
              <span className="font-mono-data text-label-sm text-secondary font-semibold">3,680 Hall Tickets Issued</span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-surface-tint"></div>
            <div className="pl-2">
              <div className="flex items-center justify-between text-on-surface-variant mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Faculty Load & Research Velocity
                </span>
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">16.4</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Hrs/Wk Avg</span>
                <span className="ml-auto inline-flex items-center px-1.5 py-0.5 bg-surface-container-high text-on-secondary-container font-mono-data text-label-sm font-semibold">
                  98.6% Staffed
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                <strong className="font-semibold text-on-surface">142 Active Staff</strong> • 84 Peer-Reviewed Papers in AY 24-25
              </p>
            </div>
            <div className="pl-2 mt-3 pt-2 bg-surface-container-low px-2 py-1.5 flex items-center justify-between">
              <span className="font-mono-data text-label-sm text-on-surface-variant uppercase">Grant Pipeline</span>
              <span className="font-mono-data text-label-sm text-primary font-semibold">$1.42M Funded Labs</span>
            </div>
          </div>
        </div>

        {/* Main Split-Pane Layout (8 cols left / 4 cols right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left & Main Master Catalog (8 cols / ~65%) */}
          <div className="lg:col-span-8 space-y-space-md">
            {/* Category Filter Tabs */}
            <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/40 flex flex-wrap items-center overflow-x-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 transition-colors ${
                  activeTab === "all"
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span>All Reports</span>
                <span className="bg-surface-container-high text-primary px-1.5 py-0.2 rounded-none font-mono-data text-label-sm font-bold">
                  36
                </span>
              </button>
              <button
                onClick={() => setActiveTab("academic")}
                className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 transition-colors ${
                  activeTab === "academic"
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span>Academic & Grades</span>
                <span className="bg-surface-container text-on-surface-variant px-1.5 py-0.2 rounded-none font-mono-data text-label-sm">
                  12
                </span>
              </button>
              <button
                onClick={() => setActiveTab("finance")}
                className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 transition-colors ${
                  activeTab === "finance"
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span>Finance & Bursar</span>
                <span className="bg-surface-container text-on-surface-variant px-1.5 py-0.2 rounded-none font-mono-data text-label-sm">
                  8
                </span>
              </button>
              <button
                onClick={() => setActiveTab("attendance")}
                className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 transition-colors ${
                  activeTab === "attendance"
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span>Attendance & Cohorts</span>
                <span className="bg-surface-container text-on-surface-variant px-1.5 py-0.2 rounded-none font-mono-data text-label-sm">
                  6
                </span>
              </button>
              <button
                onClick={() => setActiveTab("accreditation")}
                className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 transition-colors ${
                  activeTab === "accreditation"
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span>Accreditation & NIRF</span>
                <span className="bg-surface-container text-on-surface-variant px-1.5 py-0.2 rounded-none font-mono-data text-label-sm">
                  5
                </span>
              </button>
              <button
                onClick={() => setActiveTab("workload")}
                className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 transition-colors ${
                  activeTab === "workload"
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span>Staff Workload</span>
                <span className="bg-surface-container text-on-surface-variant px-1.5 py-0.2 rounded-none font-mono-data text-label-sm">
                  5
                </span>
              </button>
            </div>

            {/* Filter & Search Query Controls */}
            <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 flex flex-col md:flex-row items-stretch gap-space-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-on-surface-variant" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container-low pl-9 pr-3 py-2 font-body-sm text-body-sm text-on-surface focus:outline-none placeholder:text-on-surface-variant/60 border border-outline-variant/30"
                  placeholder="Search report templates, metrics, compliance tags, codes..."
                />
              </div>
              <div className="flex flex-wrap items-center gap-space-xs">
                <select
                  value={selectedAcademicYear}
                  onChange={e => setSelectedAcademicYear(e.target.value)}
                  className="bg-surface-container-low px-3 py-2 font-mono-data text-label-sm uppercase tracking-wider text-on-surface focus:outline-none border border-outline-variant/30"
                >
                  <option value="AY 2024-25">AY 2024-25 (Current Sem)</option>
                  <option value="AY 2023-24">AY 2023-24 (Full Cycle)</option>
                  <option value="AY 2022-23">Archived AY 2022-23</option>
                </select>
                <select
                  value={selectedFaculty}
                  onChange={e => setSelectedFaculty(e.target.value)}
                  className="bg-surface-container-low px-3 py-2 font-mono-data text-label-sm uppercase tracking-wider text-on-surface focus:outline-none border border-outline-variant/30"
                >
                  <option value="all">All Faculties (Computing, AI, Mgmt, Eng)</option>
                  <option value="computing">Faculty of Computing & Data Sciences</option>
                  <option value="ai">Faculty of Artificial Intelligence</option>
                  <option value="mgmt">Faculty of Business Management</option>
                </select>
                <select
                  value={selectedFrequency}
                  onChange={e => setSelectedFrequency(e.target.value)}
                  className="bg-surface-container-low px-3 py-2 font-mono-data text-label-sm uppercase tracking-wider text-on-surface focus:outline-none border border-outline-variant/30"
                >
                  <option value="all">All Frequencies</option>
                  <option value="weekly">Automated Weekly</option>
                  <option value="daily">Daily EOD</option>
                  <option value="monthly">Monthly Compliance</option>
                  <option value="dynamic">Real-Time Dynamic</option>
                </select>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFaculty("all");
                    setSelectedFrequency("all");
                    showToast("Dataset refreshed and synced with Data Lake.");
                  }}
                  className="p-2 bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors border border-outline-variant/30"
                  title="Refresh Dataset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Master Reports Catalog & Execution Register (Table) */}
            <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider border-b border-outline-variant/30">
                      <th className="py-2.5 px-3">Report Code & Class</th>
                      <th className="py-2.5 px-3">Report Title & Scope</th>
                      <th className="py-2.5 px-3">Cadence & Recent Run</th>
                      <th className="py-2.5 px-3">Coverage / Metrics</th>
                      <th className="py-2.5 px-3">Formats</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {filteredReports.map(rep => {
                      const isSelected = selectedReport.id === rep.id;
                      return (
                        <tr
                          key={rep.id}
                          onClick={() => setSelectedReport(rep)}
                          className={`transition-colors cursor-pointer group ${
                            isSelected
                              ? "bg-primary/5 hover:bg-primary/10 border-l-4 border-primary"
                              : "hover:bg-surface-container-low"
                          }`}
                        >
                          <td className="py-2.5 px-3 align-middle">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-secondary" />
                              <div className="flex flex-col">
                                <span className="font-mono-data text-mono-data font-bold text-primary">
                                  {rep.code}
                                </span>
                                <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold">
                                  {rep.categoryLabel}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 align-middle">
                            <div className="font-body-md text-body-md text-on-surface font-semibold group-hover:text-primary">
                              {rep.title}
                            </div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                              {rep.scope}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 align-middle">
                            <div className="font-mono-data text-label-sm text-on-surface">
                              {rep.cadence}
                            </div>
                            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                              {rep.lastRun}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 align-middle">
                            <span className="font-mono-data text-label-sm text-primary font-medium">
                              {rep.coverage}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 align-middle">
                            <div className="flex items-center gap-1 font-mono-data text-label-sm font-bold">
                              {rep.formats.map(f => (
                                <span
                                  key={f}
                                  className="px-1.5 py-0.5 bg-surface-container text-on-surface text-[0.6875rem]"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-2.5 px-3 align-middle text-right">
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  setSelectedReport(rep);
                                  setIsPreviewModalOpen(true);
                                }}
                                className="px-2 py-1 bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm uppercase tracking-wider transition-colors font-semibold"
                              >
                                Run Now
                              </button>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  showToast(`Downloaded signed archive for ${rep.code}`);
                                }}
                                className="p-1 text-on-surface-variant hover:text-primary transition-colors"
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

              {/* Bottom Pagination & Batch Controls */}
              <div className="bg-surface-container-low px-space-md py-2.5 flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-outline-variant/30">
                <div className="flex items-center gap-3">
                  <span className="font-mono-data text-label-sm text-on-surface-variant">
                    Showing <strong className="text-on-surface">1 - {filteredReports.length}</strong> of 36 Reports
                  </span>
                  <button
                    onClick={() => showToast("Bulk batch export generated for all visible reporting registers.")}
                    className="inline-flex items-center gap-1 text-primary hover:text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Bulk Export Selected</span>
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono-data text-label-sm text-on-surface-variant mr-2">Page 1 of 6</span>
                  <button
                    disabled
                    className="px-2 py-1 bg-surface-container opacity-50 cursor-not-allowed text-on-surface-variant font-label-sm text-label-sm uppercase"
                  >
                    Prev
                  </button>
                  <button className="px-2 py-1 bg-primary text-on-primary font-mono-data text-label-sm font-bold">
                    1
                  </button>
                  <button className="px-2 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-mono-data text-label-sm">
                    2
                  </button>
                  <button className="px-2 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-mono-data text-label-sm">
                    3
                  </button>
                  <button className="px-2 py-1 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Telemetry & Multi-Vector Trajectory Card */}
            <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                    Semester YoY Metric Trajectory Telemetry
                  </h3>
                </div>
                <span className="font-mono-data text-label-sm uppercase text-on-surface-variant">
                  Aggregated across all 18 Schools & 3 Campuses
                </span>
              </div>

              {/* Trend Bar Graph Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm pt-2">
                {/* Trajectory 1 */}
                <div className="bg-surface-container-low p-space-sm flex flex-col justify-between border border-outline-variant/30">
                  <div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                      <span>Enrollment</span>
                      <span className="text-secondary font-bold">+5.2% YoY</span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
                      3,892 Pax
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 w-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-secondary w-[82%]"></div>
                    </div>
                    <span className="font-mono-data text-label-sm text-on-surface-variant mt-1 block">
                      Baseline: 3,700
                    </span>
                  </div>
                </div>

                {/* Trajectory 2 */}
                <div className="bg-surface-container-low p-space-sm flex flex-col justify-between border border-outline-variant/30">
                  <div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                      <span>Fee Realization</span>
                      <span className="text-secondary font-bold">+3.1% YoY</span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
                      94.5% Rate
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 w-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-primary w-[94.5%]"></div>
                    </div>
                    <span className="font-mono-data text-label-sm text-on-surface-variant mt-1 block">
                      Cleared: $4.82M
                    </span>
                  </div>
                </div>

                {/* Trajectory 3 */}
                <div className="bg-surface-container-low p-space-sm flex flex-col justify-between border border-outline-variant/30">
                  <div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                      <span>Exam Pass Rate</span>
                      <span className="text-secondary font-bold">+1.4% YoY</span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
                      94.6% Clear
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 w-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-secondary-container w-[94.6%]"></div>
                    </div>
                    <span className="font-mono-data text-label-sm text-on-surface-variant mt-1 block">
                      Arrears: 5.4%
                    </span>
                  </div>
                </div>

                {/* Trajectory 4 */}
                <div className="bg-surface-container-low p-space-sm flex flex-col justify-between border border-outline-variant/30">
                  <div>
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase">
                      <span>Chronic Absence</span>
                      <span className="text-secondary font-bold">-2.8% Delta</span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
                      1.64% Cohort
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 w-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-surface-tint w-[16%]"></div>
                    </div>
                    <span className="font-mono-data text-label-sm text-on-surface-variant mt-1 block">
                      Intervention: 64 pax
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Studio Drawer & Live Compiler (4 cols / ~35%) */}
          <div className="lg:col-span-4 space-y-space-md">
            {/* Live Report Studio Card */}
            <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 space-y-space-md relative">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-primary" />
                  <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                    Live Report Studio
                  </h2>
                </div>
                <span className="px-2 py-0.5 bg-surface-container font-mono-data text-label-sm uppercase text-primary font-bold">
                  Interactive
                </span>
              </div>

              {/* Active Selection Banner */}
              <div className="bg-surface-container-low p-space-sm flex items-start gap-space-sm border border-outline-variant/30">
                <FileText className="w-6 h-6 text-secondary mt-0.5" />
                <div className="min-w-0">
                  <span className="font-mono-data text-label-sm text-secondary font-semibold uppercase">
                    Active Template Selection
                  </span>
                  <h4 className="font-body-md text-body-md font-bold text-primary truncate">
                    {selectedReport.code}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {selectedReport.title}
                  </p>
                </div>
              </div>

              {/* Document Render Miniature Visual Preview */}
              <div className="bg-surface-container-lowest border-2 border-dashed border-surface-container p-3 relative shadow-inner">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    <span className="font-headline-sm text-[0.75rem] font-bold text-primary uppercase">
                      Apex Institute • Academic Ledger
                    </span>
                  </div>
                  <span className="font-mono-data text-[0.625rem] text-on-surface-variant uppercase font-semibold">
                    SHA-256 VALIDATED
                  </span>
                </div>

                {/* Document lines preview */}
                <div className="space-y-1.5 font-mono-data text-[0.6875rem] text-on-surface">
                  <div className="flex justify-between bg-surface-container-low px-1.5 py-0.5 font-semibold">
                    <span>USN #</span>
                    <span>NAME</span>
                    <span>SGPA</span>
                    <span>RESULT</span>
                  </div>
                  <div className="flex justify-between px-1.5 py-0.5 text-on-surface-variant">
                    <span>APX24CS001</span>
                    <span>Alexander Vance</span>
                    <span className="font-bold text-primary">3.92</span>
                    <span className="text-secondary font-semibold">DISTINCTION</span>
                  </div>
                  <div className="flex justify-between px-1.5 py-0.5 text-on-surface-variant">
                    <span>APX24CS002</span>
                    <span>Maya R. Chen</span>
                    <span className="font-bold text-primary">3.88</span>
                    <span className="text-secondary font-semibold">DISTINCTION</span>
                  </div>
                  <div className="flex justify-between px-1.5 py-0.5 text-on-surface-variant">
                    <span>APX24CS003</span>
                    <span>Karthik S. Nair</span>
                    <span className="font-bold text-primary">3.41</span>
                    <span className="text-on-surface font-semibold">FIRST CLASS</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-surface-container flex items-center justify-between text-[0.625rem] font-mono-data text-on-surface-variant">
                  <span>SECURITY HASH: 9f8a3c...d81e</span>
                  <span className="text-secondary font-semibold">DIGITALLY SIGNED</span>
                </div>
              </div>

              {/* Parameter Tuning Panel */}
              <div className="space-y-space-sm">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block">
                  Execution Parameter Tuning
                </span>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Target Faculty / Department
                  </label>
                  <select
                    value={targetDept}
                    onChange={e => setTargetDept(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none border border-outline-variant/40"
                  >
                    <option>B.Tech Computer Science & Engineering</option>
                    <option>B.Tech Artificial Intelligence & Data</option>
                    <option>MBA Systems & Financial Analytics</option>
                    <option>B.Tech Electronics & Communication</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Cohort Batch & Term
                  </label>
                  <select
                    value={cohortBatch}
                    onChange={e => setCohortBatch(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none border border-outline-variant/40"
                  >
                    <option>Batch 2023-27 (Semester IV) - Active</option>
                    <option>Batch 2022-26 (Semester VI)</option>
                    <option>Batch 2021-25 (Semester VIII - Graduating)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Grade Calculation Scheme
                  </label>
                  <select
                    value={gradingScheme}
                    onChange={e => setGradingScheme(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none border border-outline-variant/40"
                  >
                    <option>Relative Grading (Gaussian Curve Standard)</option>
                    <option>Absolute Threshold Scale (10-Point UGC)</option>
                    <option>Weighted Grade Point Equivalent</option>
                  </select>
                </div>

                {/* Inclusions Telemetry Checkboxes */}
                <div className="pt-2 space-y-1.5">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                    Include Telemetry Layers
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm text-on-surface">
                    <input
                      type="checkbox"
                      checked={includeAttendanceCross}
                      onChange={e => setIncludeAttendanceCross(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded-none"
                    />
                    <span>Attendance Correlation Cross-Matrix</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm text-on-surface">
                    <input
                      type="checkbox"
                      checked={includeICA}
                      onChange={e => setIncludeICA(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded-none"
                    />
                    <span>Internal Continuous Assessment (ICA) breakdown</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm text-on-surface">
                    <input
                      type="checkbox"
                      checked={includeRank}
                      onChange={e => setIncludeRank(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded-none"
                    />
                    <span>Cohort Class Rank Percentile & Dean&apos;s Honor Badge</span>
                  </label>
                </div>
              </div>

              {/* Delivery & Recurrence Configuration */}
              <div className="p-space-sm bg-surface-container-low space-y-2 border border-outline-variant/30">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                  Automation Cadence
                </span>
                <div className="flex items-center justify-between font-mono-data text-body-sm text-on-surface">
                  <span>Recurrence:</span>
                  <strong className="font-semibold text-primary">Every Monday @ 07:00 EST</strong>
                </div>
                <div className="font-mono-data text-label-sm text-on-surface-variant break-all">
                  Recipients: dean.vance@apex.edu, exams@apex.edu, registrar@apex.edu
                </div>
              </div>

              {/* Studio Actions */}
              <div className="space-y-space-xs pt-2">
                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="w-full py-2.5 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Generate & Preview Report</span>
                </button>
                <button
                  onClick={() => {
                    setIsScheduleModalOpen(true);
                  }}
                  className="w-full py-2 bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule to Auto-Email Queue</span>
                </button>
              </div>
            </div>

            {/* Security, FERPA & Compliance Guarantee Box */}
            <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 space-y-space-sm relative overflow-hidden">
              <div className="flex items-center gap-2 text-primary font-bold">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span className="font-headline-sm text-headline-sm uppercase tracking-tight">
                  Security & Regulatory Seal
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                All exported datasets adhere strictly to FERPA, GDPR, and National Statutory Accreditation guidelines. Each generated batch is cryptographically stamped with SHA-256 checksums and automatically logged to Campus Immutable Ledger <strong className="font-mono-data text-primary">#APX-SEC-LOG-2024</strong>.
              </p>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <span className="px-2 py-0.5 bg-surface-container font-mono-data text-[0.6875rem] text-on-surface-variant uppercase font-bold">
                  FERPA SECURE
                </span>
                <span className="px-2 py-0.5 bg-surface-container font-mono-data text-[0.6875rem] text-on-surface-variant uppercase font-bold">
                  NAAC CRITERION-2
                </span>
                <span className="px-2 py-0.5 bg-surface-container font-mono-data text-[0.6875rem] text-on-surface-variant uppercase font-bold">
                  256-BIT ENCRYPTION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: FULL REPORT GENERATION & PREVIEW MODAL */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-4xl w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                    {selectedReport.title}
                  </h3>
                  <div className="font-mono-data text-label-sm text-on-surface-variant">
                    {selectedReport.code} • {cohortBatch} • {targetDept}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsPreviewModalOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Generated Data Table */}
            <div className="border border-outline-variant/40 overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/40">
                  <tr>
                    <th className="p-2.5">Roll No (USN)</th>
                    <th className="p-2.5">Candidate Name</th>
                    <th className="p-2.5">Program</th>
                    <th className="p-2.5">Credits Completed</th>
                    <th className="p-2.5">SGPA</th>
                    <th className="p-2.5">CGPA</th>
                    <th className="p-2.5">Attendance</th>
                    <th className="p-2.5 text-right">Academic Standing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-mono-data">
                  <tr className="hover:bg-surface-container-low">
                    <td className="p-2.5 font-bold text-primary">APX24CS001</td>
                    <td className="p-2.5 font-sans font-medium">Alexander Vance</td>
                    <td className="p-2.5">B.Tech CSE</td>
                    <td className="p-2.5">24 / 24</td>
                    <td className="p-2.5 font-bold text-secondary">3.92</td>
                    <td className="p-2.5 font-bold text-primary">3.90</td>
                    <td className="p-2.5">94.8%</td>
                    <td className="p-2.5 text-right font-sans font-semibold text-secondary">DEAN&apos;S LIST</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low">
                    <td className="p-2.5 font-bold text-primary">APX24CS002</td>
                    <td className="p-2.5 font-sans font-medium">Maya R. Chen</td>
                    <td className="p-2.5">B.Tech CSE</td>
                    <td className="p-2.5">24 / 24</td>
                    <td className="p-2.5 font-bold text-secondary">3.88</td>
                    <td className="p-2.5 font-bold text-primary">3.84</td>
                    <td className="p-2.5">96.2%</td>
                    <td className="p-2.5 text-right font-sans font-semibold text-secondary">DEAN&apos;S LIST</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low">
                    <td className="p-2.5 font-bold text-primary">APX24CS003</td>
                    <td className="p-2.5 font-sans font-medium">Karthik S. Nair</td>
                    <td className="p-2.5">B.Tech CSE</td>
                    <td className="p-2.5">24 / 24</td>
                    <td className="p-2.5 font-bold text-primary">3.41</td>
                    <td className="p-2.5 font-bold text-primary">3.45</td>
                    <td className="p-2.5">88.5%</td>
                    <td className="p-2.5 text-right font-sans font-medium text-on-surface">FIRST CLASS</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low">
                    <td className="p-2.5 font-bold text-primary">APX24CS004</td>
                    <td className="p-2.5 font-sans font-medium">Sophia Jenkins</td>
                    <td className="p-2.5">B.Tech CSE</td>
                    <td className="p-2.5">24 / 24</td>
                    <td className="p-2.5 font-bold text-primary">3.55</td>
                    <td className="p-2.5 font-bold text-primary">3.52</td>
                    <td className="p-2.5">91.0%</td>
                    <td className="p-2.5 text-right font-sans font-medium text-on-surface">FIRST CLASS</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low">
                    <td className="p-2.5 font-bold text-primary">APX24CS005</td>
                    <td className="p-2.5 font-sans font-medium">Devon Brooks</td>
                    <td className="p-2.5">B.Tech CSE</td>
                    <td className="p-2.5">21 / 24</td>
                    <td className="p-2.5 font-bold text-error">2.68</td>
                    <td className="p-2.5 font-bold text-error">2.74</td>
                    <td className="p-2.5 text-error font-bold">71.2%</td>
                    <td className="p-2.5 text-right font-sans font-semibold text-error">ATTENDANCE SHORTAGE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/30">
              <div className="flex items-center gap-2 font-mono-data text-[0.75rem] text-on-surface-variant">
                <span>DIGITAL CHECKSUM: 9f8a3c4b...</span>
                <span>•</span>
                <span className="text-secondary font-semibold">FERPA AUDITED</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                    showToast("Sending report to system print spools...");
                  }}
                  className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => {
                    showToast(`Exported ${selectedReport.code} as formatted XLSX workbook.`);
                    setIsPreviewModalOpen(false);
                  }}
                  className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md uppercase tracking-wider font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Export XLSX</span>
                </button>
                <button
                  onClick={() => {
                    showToast(`Signed PDF report generated for ${selectedReport.code}`);
                    setIsPreviewModalOpen(false);
                  }}
                  className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-primary-container shadow-sm flex items-center gap-1.5"
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
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Schedule Automated Dispatch
                </h3>
              </div>
              <button onClick={() => setIsScheduleModalOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-body-sm text-body-sm">
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                  Report Template
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${selectedReport.code} - ${selectedReport.title}`}
                  className="w-full bg-surface-container-low p-2 border border-outline-variant/40 font-mono-data text-body-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Cadence / Frequency
                  </label>
                  <select className="w-full bg-surface-container-low p-2 border border-outline-variant/40">
                    <option>Weekly on Mondays</option>
                    <option>Daily at EOD (23:59)</option>
                    <option>Monthly (1st of month)</option>
                    <option>Bi-Weekly</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Execution Time (EST)
                  </label>
                  <input
                    type="time"
                    defaultValue="07:00"
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 font-mono-data"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                  Recipient Email Distribution List (comma separated)
                </label>
                <textarea
                  rows={2}
                  defaultValue="dean.vance@apex.edu, exams@apex.edu, registrar@apex.edu"
                  className="w-full bg-surface-container-low p-2 border border-outline-variant/40 font-mono-data text-[0.75rem]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                  Attachment Output Format
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary" />
                    <span>Encrypted PDF</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-primary" />
                    <span>Excel (.xlsx)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-primary" />
                    <span>Raw CSV</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
              <button
                onClick={() => setIsScheduleModalOpen(false)}
                className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider text-on-surface hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsScheduleModalOpen(false);
                  showToast(`Cron job scheduled for ${selectedReport.code} every Monday @ 07:00 EST.`);
                }}
                className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-sm"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: REGULATORY AUDIT DOSSIER */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Statutory Regulatory Audit Dossier
                </h3>
              </div>
              <button onClick={() => setIsAuditModalOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-body-sm text-body-sm">
              <p className="text-on-surface-variant">
                Pre-packaged criterion evidence reports mapped to NIRF (National Institutional Ranking Framework), NAAC Criteria 1–7, and ABET accreditation metrics.
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-primary">NIRF 2025 Data Capture Framework (DCF)</div>
                    <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                      TLR, RPC, GO, OI, PR Parameters • AY 2024-25
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Downloaded NIRF DCF Data Bundle (PDF & Excel)")}
                    className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider"
                  >
                    Download
                  </button>
                </div>

                <div className="p-3 bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-primary">NAAC Self-Study Report (SSR) Criterion 1–7</div>
                    <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                      Curricular Aspects, Teaching-Learning, Research, Infrastructure
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Downloaded NAAC SSR Dossier Bundle")}
                    className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider"
                  >
                    Download
                  </button>
                </div>

                <div className="p-3 bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-primary">ABET Engineering Accreditation Readiness</div>
                    <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                      Student Outcomes 1–7, Program Educational Objectives (PEOs)
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Downloaded ABET Assessment Matrix")}
                    className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="px-4 py-2 bg-surface-container text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high"
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

