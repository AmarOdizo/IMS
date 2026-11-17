"use client";

import { useState } from "react";
import {
  Megaphone,
  Eye,
  Send,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Hourglass,
  Sliders,
  Search,
  RotateCcw,
  PlusCircle,
  Calendar,
  Radio,
  Download,
  Printer,
  Edit,
  MoreVertical,
  Check,
  X,
  FileText,
  Smartphone,
  Monitor,
  Mail,
  Shield,
  Layers,
  Building,
  Users,
  ChevronRight,
  Flame,
  Info,
  Filter,
  ArrowUpRight,
  Share2,
  Trash2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Wifi
} from "lucide-react";

interface Notice {
  id: string;
  refNo: string;
  priority: "URGENT" | "HIGH" | "REGULATION" | "FACULTY" | "FEES" | "MAINTENANCE" | "EMERGENCY";
  priorityLabel: string;
  title: string;
  author: string;
  summary: string;
  body: string;
  audience: string;
  cadre: "all" | "student" | "faculty" | "exam" | "emergency" | "archive";
  enrolledCount: string;
  channels: {
    portal: boolean;
    app: boolean;
    sms: boolean;
    email: boolean;
    kiosk: boolean;
  };
  publishDate: string;
  expiryDate: string;
  readReach: number;
  securityHash: string;
  token: string;
}

const INITIAL_NOTICES: Notice[] = [
  {
    id: "not-1",
    refNo: "APX/CIR/2024-88",
    priority: "URGENT",
    priorityLabel: "URGENT ACTION",
    title: "Capstone Project Submission Deadline & Viva Schedule",
    author: "Academic Senate (Dr. Margaret Vance)",
    summary: "Final code repository links, documentation, and plagiarism reports must be uploaded before June 15 midnight.",
    body: "This is to notify all registered final-year candidates that the Central Capstone Examination Portal submission window for Spring 2024 theses will strictly close on June 15, 2024 at 23:59 EST. No extensions or offline submission petitions will be entertained without prior written sanction from the Departmental Review Board.\n\nAll project artifacts, including complete source code repositories, compiled project dossiers, and Turnitin similarity index reports (which must certify an overall overlap score of < 12%), must be formally ratified and uploaded through the designated student portal console.\n\nPhysical Viva-Voce examinations will proceed from June 20, 2024 before the designated external examiner panel in Departmental Labs 1 through 4. Strict formal academic attire is required.",
    audience: "Final Year (B.Tech & PG)",
    cadre: "student",
    enrolledCount: "All Departments (1,240 Enrolled)",
    channels: { portal: true, app: true, sms: true, email: true, kiosk: false },
    publishDate: "May 24, 2024",
    expiryDate: "Jun 15, 2024",
    readReach: 98.2,
    securityHash: "SHA256: 9e4f2b1897c8d20ae41d6... (Verified)",
    token: "2024-VNC-9812"
  },
  {
    id: "not-2",
    refNo: "APX/CIR/2024-87",
    priority: "HIGH",
    priorityLabel: "HIGH PRIORITY",
    title: "Final Timetable for End-Semester Regular & Backlog Exams",
    author: "Controller of Exams (Dr. S. Nair)",
    summary: "The revised final schedule for theory and laboratory examinations for all engineering and management cohorts.",
    body: "The Office of the Controller of Examinations has published the conclusive datesheet for Regular and Supplementary Examinations for the Spring 2024 session.\n\nTheory examinations will run across two daily sessions: Morning Session (09:30 - 12:30) and Afternoon Session (14:00 - 17:00). Hall tickets will be downloadable via the Student Portal commencing June 1st, subject to clearance of bursar arrears and minimum 75% attendance compliance.",
    audience: "B.Tech (Sem 4,6,8) & MBA",
    cadre: "exam",
    enrolledCount: "2,180 Candidates",
    channels: { portal: true, app: true, sms: false, email: false, kiosk: true },
    publishDate: "May 22, 2024",
    expiryDate: "Jun 30, 2024",
    readReach: 94.5,
    securityHash: "SHA256: 48e89d1b098fca23415e9... (Verified)",
    token: "2024-COE-4419"
  },
  {
    id: "not-3",
    refNo: "APX/CIR/2024-85",
    priority: "REGULATION",
    priorityLabel: "REGULATION",
    title: "Mandatory Research Ethics & AI Citation Policy",
    author: "Dean of Research & Academic Senate",
    summary: "All doctoral, postgraduate and final year theses must integrate the new GenAI disclosure declarations prior to binding.",
    body: "In accordance with the National Academic Integrity Framework, all research scholars and graduate students must adhere to the updated GenAI Usage Disclosure Charter.\n\nAll non-original assistive synthesis must be accompanied by explicit methodology citations and prompt declaration appendices. Failure to submit mandatory disclosure forms will result in immediate disqualification at the preliminary peer-review stage.",
    audience: "Postgraduate & Ph.D",
    cadre: "student",
    enrolledCount: "Research Scholars (620)",
    channels: { portal: true, app: false, sms: false, email: true, kiosk: false },
    publishDate: "May 20, 2024",
    expiryDate: "Jul 10, 2024",
    readReach: 88.0,
    securityHash: "SHA256: 77a01c45982e0fa12398b... (Verified)",
    token: "2024-RSH-1102"
  },
  {
    id: "not-4",
    refNo: "APX/CIR/2024-82",
    priority: "FACULTY",
    priorityLabel: "FACULTY MEMO",
    title: "Annual Convocation Protocol & Academic Regalia Rehearsal",
    author: "Office of Registrar",
    summary: "All tenured and adjunct teaching faculty are required to attend the dress rehearsal in Auditorium A on May 28 at 15:00.",
    body: "The 14th Annual Convocation of Apex Institute of Technology & Management is scheduled for Saturday, June 1st. All professorial cadres, departmental deans, and academic senate dignitaries are hereby instructed to participate in the mandatory procession rehearsal.\n\nOfficial ceremonial regalia hoods and sashes may be claimed from the Senate Robing Room between 10:00 and 14:00 on May 28th.",
    audience: "Faculty & Staff Only",
    cadre: "faculty",
    enrolledCount: "340 Cadre Members",
    channels: { portal: true, app: false, sms: true, email: true, kiosk: false },
    publishDate: "May 18, 2024",
    expiryDate: "May 31, 2024",
    readReach: 100.0,
    securityHash: "SHA256: 31c94d019f82bc78041a3... (Verified)",
    token: "2024-REG-7703"
  },
  {
    id: "not-5",
    refNo: "APX/CIR/2024-79",
    priority: "FEES",
    priorityLabel: "FEES & BURSAR",
    title: "Fall 2024 Semester Fee Installment #2 Last Date & Counter Schedule",
    author: "Bursar & Student Accounts",
    summary: "Students with pending balances are requested to execute payments through online payment gateway before late fine assessment.",
    body: "The Finance and Accounts Directorate issues this final notice concerning the settlement of the second tuition fee tranche for AY 2024-25.\n\nUnsettled accounts as of midnight May 30, 2024 will incur a statutory daily late fine of $25 and forfeiture of automated hall ticket generation for upcoming semester assessments. Payment counters in Admin Block Ground Floor will remain operational until 18:00 daily.",
    audience: "Fee Defaulter Ledger",
    cadre: "student",
    enrolledCount: "384 Students Tagged",
    channels: { portal: true, app: true, sms: true, email: false, kiosk: false },
    publishDate: "May 15, 2024",
    expiryDate: "May 30, 2024",
    readReach: 92.1,
    securityHash: "SHA256: cc4091a187e02fb8821d4... (Verified)",
    token: "2024-BUR-5521"
  },
  {
    id: "not-6",
    refNo: "APX/CIR/2024-74",
    priority: "MAINTENANCE",
    priorityLabel: "MAINTENANCE",
    title: "Scheduled Campus Core Server & LMS Cloud Downtime Window",
    author: "Central IT Infrastructure Directorate",
    summary: "Student portal logins, turnstiles, and digital library resources will experience planned downtime Saturday 00:00 to 04:00.",
    body: "Central IT will undertake critical database firmware patching and optical backbone maintenance on the primary campus cloud cluster.\n\nDuring this four-hour maintenance window, the LMS portal, student mobile app synching, turnstile sync caches, and digital repository gateways will be offline. Local campus Wi-Fi routing will remain operational with fallback DNS.",
    audience: "Everyone (All Campus)",
    cadre: "all",
    enrolledCount: "All 4,200 Accounts",
    channels: { portal: true, app: true, sms: false, email: false, kiosk: true },
    publishDate: "May 12, 2024",
    expiryDate: "May 26, 2024",
    readReach: 97.4,
    securityHash: "SHA256: 109bf4290d8a55e2387a2... (Verified)",
    token: "2024-SYS-0044"
  },
  {
    id: "not-7",
    refNo: "APX/CIR/2024-71",
    priority: "EMERGENCY",
    priorityLabel: "EMERGENCY ADVISORY",
    title: "Severe Weather Warning: Precautionary Shift to Hybrid Classes",
    author: "Campus Disaster Management Cell",
    summary: "Met Department amber alert: Physical afternoon lab sessions transitioned to remote Zoom links with immediate effect.",
    body: "Following the regional meteorological amber alert forecasting intense storm squalls and localized flooding in North Campus access corridors, all physical instructional activities scheduled after 14:00 today will proceed via remote learning portals.\n\nCampus shuttle transit routes will conduct early departures at 13:30. Residential hostels and cafeteria facilities remain fully staffed.",
    audience: "All Students & Faculty",
    cadre: "emergency",
    enrolledCount: "4,540 Campus Community",
    channels: { portal: true, app: true, sms: true, email: true, kiosk: true },
    publishDate: "May 10, 2024",
    expiryDate: "May 12, 2024",
    readReach: 99.8,
    securityHash: "SHA256: ea891104928fe881cba90... (Verified)",
    token: "2024-EMG-0911"
  }
];

export default function CampusNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
  const [selectedNotice, setSelectedNotice] = useState<Notice>(INITIAL_NOTICES[0]);
  const [activeCadreTab, setActiveCadreTab] = useState<"all" | "student" | "faculty" | "exam" | "emergency" | "archive">("all");
  const [activeStudioTab, setActiveStudioTab] = useState<"letterhead" | "studio" | "dispatch">("letterhead");

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");

  // Selection
  const [selectedNoticeIds, setSelectedNoticeIds] = useState<string[]>([INITIAL_NOTICES[0].id]);

  // Modals
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isScheduledQueueOpen, setIsScheduledQueueOpen] = useState(false);
  const [isBroadcastConfigOpen, setIsBroadcastConfigOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Draft Form State
  const [newNotice, setNewNotice] = useState({
    title: "",
    refNo: `APX/CIR/2024-${Math.floor(Math.random() * 90 + 10)}`,
    author: "Academic Affairs (Dr. Margaret Vance)",
    audience: "Undergraduate (B.Tech)",
    cadre: "student" as Notice["cadre"],
    priority: "HIGH" as Notice["priority"],
    summary: "",
    body: "",
    channels: { portal: true, app: true, sms: false, email: true, kiosk: false },
    expiryDate: "2024-06-30"
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Filter Notices
  const filteredNotices = notices.filter(item => {
    if (activeCadreTab === "student" && item.cadre !== "student") return false;
    if (activeCadreTab === "faculty" && item.cadre !== "faculty") return false;
    if (activeCadreTab === "exam" && item.cadre !== "exam") return false;
    if (activeCadreTab === "emergency" && item.cadre !== "emergency") return false;
    if (activeCadreTab === "archive" && item.cadre !== "archive") return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const match =
        item.refNo.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedAudience !== "all") {
      if (!item.audience.toLowerCase().includes(selectedAudience.toLowerCase())) return false;
    }
    if (selectedPriority !== "all") {
      if (item.priority !== selectedPriority) return false;
    }
    if (selectedChannel === "portal" && !item.channels.portal) return false;
    if (selectedChannel === "sms" && !item.channels.sms) return false;
    if (selectedChannel === "kiosk" && !item.channels.kiosk) return false;

    return true;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNoticeIds(filteredNotices.map(n => n.id));
    } else {
      setSelectedNoticeIds([]);
    }
  };

  const toggleSelectNotice = (id: string) => {
    setSelectedNoticeIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.summary) {
      alert("Please enter title and summary");
      return;
    }

    const priorityLabels: Record<string, string> = {
      URGENT: "URGENT ACTION",
      HIGH: "HIGH PRIORITY",
      REGULATION: "REGULATION",
      FACULTY: "FACULTY MEMO",
      FEES: "FEES & BURSAR",
      MAINTENANCE: "MAINTENANCE",
      EMERGENCY: "EMERGENCY ADVISORY"
    };

    const created: Notice = {
      id: `not-${Date.now()}`,
      refNo: newNotice.refNo,
      priority: newNotice.priority,
      priorityLabel: priorityLabels[newNotice.priority] || "CIRCULAR",
      title: newNotice.title,
      author: newNotice.author,
      summary: newNotice.summary,
      body: newNotice.body || newNotice.summary,
      audience: newNotice.audience,
      cadre: newNotice.cadre,
      enrolledCount: "All Eligible (1,450 Enrolled)",
      channels: newNotice.channels,
      publishDate: "May 25, 2024",
      expiryDate: newNotice.expiryDate,
      readReach: 0,
      securityHash: `SHA256: ${Math.random().toString(36).substring(2, 15)}... (Verified)`,
      token: `2024-PUB-${Math.floor(Math.random() * 9000 + 1000)}`
    };

    setNotices([created, ...notices]);
    setSelectedNotice(created);
    setIsDraftModalOpen(false);
    showToast(`Notice ${created.refNo} published successfully.`);
  };

  const handleTriggerEmergencyAlert = () => {
    const alertNotice: Notice = {
      id: `emg-${Date.now()}`,
      refNo: `APX/EMG/2024-${Math.floor(Math.random() * 90 + 10)}`,
      priority: "EMERGENCY",
      priorityLabel: "CRIMSON IMMEDIATE",
      title: "CAMPUS PRIORITY ALERT: Security & Emergency Override Enacted",
      author: "Office of the Dean & Campus Police",
      summary: "Immediate precautionary safety broadcast initiated across all 4,200 mobile, portal and digital signages.",
      body: "This is a Level-1 Automated Emergency Advisory. All campus turnstiles are locked to safe perimeter routing. Standby on verified campus channels for real-time clearance instructions.",
      audience: "ALL CAMPUS RESIDENTS",
      cadre: "emergency",
      enrolledCount: "4,540 Campus Community",
      channels: { portal: true, app: true, sms: true, email: true, kiosk: true },
      publishDate: "May 25, 2024",
      expiryDate: "May 26, 2024",
      readReach: 100.0,
      securityHash: "SHA256: 009f4291de... (Emergency Override)",
      token: "2024-EMG-OVERRIDE"
    };

    setNotices([alertNotice, ...notices]);
    setSelectedNotice(alertNotice);
    setIsEmergencyModalOpen(false);
    showToast("CRIMSON EMERGENCY BROADCAST DISPATCHED TO ALL CHANNELS!");
  };

  const getPriorityBadgeClass = (priority: Notice["priority"]) => {
    switch (priority) {
      case "URGENT":
      case "EMERGENCY":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      case "HIGH":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "REGULATION":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "FACULTY":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      case "FEES":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "MAINTENANCE":
      default:
        return "bg-slate-100 text-slate-700 border-slate-200/80";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notices & Bulletins</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Broadcast Channels Active
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Institutional circulars, emergency advisories, academic notifications & multi-channel dispatch ledger.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsScheduledQueueOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Scheduled Queue (4)</span>
            </button>
            <button
              onClick={() => setIsBroadcastConfigOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Radio className="w-4 h-4 text-indigo-600" />
              <span>Broadcast Config</span>
            </button>
            <button
              onClick={() => setIsEmergencyModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 shadow-xs transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Emergency Alert</span>
            </button>
            <button
              onClick={() => setIsDraftModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Draft New Notice</span>
            </button>
          </div>
        </div>

        {/* 4 Standard Redesigned KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Active Published Notices */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Active Published Notices
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Megaphone className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                {notices.length} <span className="text-xs font-normal text-slate-500">Active</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>12 Inst • 11 Dept • 1 Alert</span>
                <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                  <Hourglass className="w-3.5 h-3.5" />
                  4 Expiring &lt; 48h
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Dispatch Reach & Engagement */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Dispatch Reach & Engagement
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Eye className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                96.4% <span className="text-xs font-normal text-slate-500">Cumulative</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="text-emerald-600 font-semibold">Portal: 3,740 / 3,892</span>
                <span>Mean: 3.8 hrs</span>
              </div>
            </div>
          </div>

          {/* Card 3: SMS & Email Outbox */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Gateway Outbox Total
              </span>
              <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
                <Send className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                14,820 <span className="text-xs font-normal text-slate-500">Dispatches</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>SMS: 99.4% • Email: 84.6%</span>
                <span className="text-emerald-600 font-semibold">0 Bounces</span>
              </div>
            </div>
          </div>

          {/* Card 4: Pending Sign-Off */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending Dean Sign-Off
              </span>
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                3 <span className="text-xs font-normal text-slate-500">In Queue</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500">2 Senate • 1 Fee Memo</span>
                <button
                  onClick={() => showToast("Authorizing Dean signature token for 3 pending notices...")}
                  className="px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold transition-colors"
                >
                  AUTHORIZE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cadre Navigation Ribbon & Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-4">
          {/* Cadre Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100">
            {[
              { id: "all", label: "All Notices", count: notices.length },
              { id: "student", label: "Student Only", count: notices.filter(n => n.cadre === "student").length },
              { id: "faculty", label: "Faculty & Staff", count: notices.filter(n => n.cadre === "faculty").length },
              { id: "exam", label: "Exam & Datesheet", count: notices.filter(n => n.cadre === "exam").length },
              { id: "emergency", label: "Emergency & Advisory", count: notices.filter(n => n.cadre === "emergency").length },
              { id: "archive", label: "Archive / Expired", count: 142 },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCadreTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeCadreTab === tab.id
                    ? tab.id === "emergency"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-indigo-600 text-white shadow-xs"
                    : tab.id === "emergency"
                    ? "text-rose-600 hover:bg-rose-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                    activeCadreTab === tab.id
                      ? "bg-white/20 text-white"
                      : tab.id === "emergency"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Extended Filter Ribbon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search circular ref no., subject keywords, author..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="lg:col-span-2">
              <select
                value={selectedAudience}
                onChange={e => setSelectedAudience(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="all">All Audiences</option>
                <option value="everyone">Everyone (Campus-Wide)</option>
                <option value="b.tech">Undergraduate (B.Tech)</option>
                <option value="postgraduate">Postgraduate (M.Sc/MBA)</option>
                <option value="faculty">Faculty & Teaching Staff</option>
                <option value="administrative">Administrative Cadre</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="all">All Departments</option>
                <option value="senate">Academic Senate</option>
                <option value="coe">Controller of Exams</option>
                <option value="bursar">Bursar & Accounts</option>
                <option value="research">Dean of Research</option>
                <option value="facilities">Campus Security</option>
              </select>
            </div>

            <div className="lg:col-span-2">
              <select
                value={selectedPriority}
                onChange={e => setSelectedPriority(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="all">All Priorities</option>
                <option value="URGENT">Urgent Action</option>
                <option value="HIGH">High Priority</option>
                <option value="REGULATION">Academic Regulation</option>
                <option value="EMERGENCY">Emergency Advisory</option>
              </select>
            </div>

            <div className="lg:col-span-2 flex items-center gap-2">
              <select
                value={selectedChannel}
                onChange={e => setSelectedChannel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="all">All Channels</option>
                <option value="portal">Web Portal + Mobile</option>
                <option value="sms">SMS Gateway Only</option>
                <option value="kiosk">Noticeboard Kiosk</option>
              </select>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedAudience("all");
                  setSelectedDept("all");
                  setSelectedPriority("all");
                  setSelectedChannel("all");
                }}
                title="Reset Filters"
                className="p-2 text-slate-500 hover:text-slate-800 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Body Split Layout: Master Notices Ledger (7 cols) vs Interactive Inspector Studio (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Master Notices & Circulars Ledger Table (7 of 12 cols / ~58%) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
            {/* Table Action Bar */}
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={selectedNoticeIds.length > 0 && selectedNoticeIds.length === filteredNotices.length}
                    onChange={e => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>Select All</span>
                </label>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => showToast(`Published ${selectedNoticeIds.length} notices to live channels.`)}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => showToast(`Archived ${selectedNoticeIds.length} notices.`)}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => showToast(`Generating PDF Digest for ${selectedNoticeIds.length} items.`)}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    PDF Digest
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-mono">
                  Showing {filteredNotices.length} of {notices.length} Notices
                </span>
              </div>
            </div>

            {/* Scrollable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="w-10 px-3 py-3 text-center">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="px-3 py-3">Circular Ref</th>
                    <th className="px-3 py-3">Title & Summary</th>
                    <th className="px-3 py-3">Audience</th>
                    <th className="px-3 py-3">Channels</th>
                    <th className="px-3 py-3">Valid Until</th>
                    <th className="px-3 py-3">Reach</th>
                    <th className="w-16 px-3 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredNotices.map(notice => {
                    const isSelected = selectedNotice.id === notice.id;
                    const isChecked = selectedNoticeIds.includes(notice.id);

                    return (
                      <tr
                        key={notice.id}
                        onClick={() => setSelectedNotice(notice)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-indigo-50/60 hover:bg-indigo-50 border-l-4 border-indigo-600"
                            : "hover:bg-slate-50/70"
                        }`}
                      >
                        <td
                          className="px-3 py-3.5 text-center"
                          onClick={e => {
                            e.stopPropagation();
                            toggleSelectNotice(notice.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelectNotice(notice.id)}
                            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                          />
                        </td>
                        <td className="px-3 py-3.5 align-top whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono font-bold text-slate-900">{notice.refNo}</span>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border tracking-wider text-center ${getPriorityBadgeClass(
                                notice.priority
                              )}`}
                            >
                              {notice.priorityLabel}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 align-top max-w-xs">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 line-clamp-1 hover:text-indigo-600 transition-colors">
                              {notice.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">By: {notice.author}</span>
                            <p className="text-slate-500 line-clamp-2 mt-1 text-[11px] leading-relaxed">
                              {notice.summary}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 align-top whitespace-nowrap">
                          <span className="font-medium text-slate-800">{notice.audience}</span>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{notice.enrolledCount}</div>
                        </td>
                        <td className="px-3 py-3.5 align-top whitespace-nowrap">
                          <div className="flex items-center gap-1 text-slate-400">
                            {notice.channels.portal && (
                              <span title="Web Portal Active" className="p-1 rounded bg-indigo-50 text-indigo-600">
                                <Monitor className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {notice.channels.app && (
                              <span title="Mobile App Push Sent" className="p-1 rounded bg-emerald-50 text-emerald-600">
                                <Smartphone className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {notice.channels.sms && (
                              <span title="SMS Gateway Delivered" className="p-1 rounded bg-sky-50 text-sky-600">
                                <Send className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {notice.channels.email && (
                              <span title="Official Email Sent" className="p-1 rounded bg-amber-50 text-amber-600">
                                <Mail className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {notice.channels.kiosk && (
                              <span title="Noticeboard Kiosk Active" className="p-1 rounded bg-purple-50 text-purple-600">
                                <Radio className="w-3.5 h-3.5" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3.5 align-top whitespace-nowrap">
                          <div className="font-mono text-slate-700">{notice.publishDate}</div>
                          <div className="text-rose-600 font-mono text-[10px] font-semibold mt-0.5">
                            Exp: {notice.expiryDate}
                          </div>
                        </td>
                        <td className="px-3 py-3.5 align-top whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono font-bold text-slate-900">{notice.readReach}%</span>
                            <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${notice.readReach}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1 text-slate-400">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedNotice(notice);
                                setActiveStudioTab("letterhead");
                              }}
                              className="p-1 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="View Live Letterhead"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedNotice(notice);
                                setActiveStudioTab("studio");
                              }}
                              className="p-1 rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="Edit Circular"
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

            {/* Table Pagination Footer */}
            <div className="p-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
              <span className="text-xs text-slate-500 font-mono">
                Page 1 of 5 (Total {notices.length} Active Bulletins)
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

          {/* RIGHT COLUMN: Interactive Notice Studio & Live Official Letterhead Preview (5 of 12 cols / ~42%) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Live Inspector Card Container */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
              {/* Studio Segmented Switcher */}
              <div className="flex border-b border-slate-100 bg-slate-50/80 p-1.5 gap-1">
                <button
                  onClick={() => setActiveStudioTab("letterhead")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-all ${
                    activeStudioTab === "letterhead"
                      ? "bg-white text-indigo-600 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Official Letterhead</span>
                </button>
                <button
                  onClick={() => setActiveStudioTab("studio")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-all ${
                    activeStudioTab === "studio"
                      ? "bg-white text-indigo-600 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Notice Studio</span>
                </button>
                <button
                  onClick={() => setActiveStudioTab("dispatch")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-all ${
                    activeStudioTab === "dispatch"
                      ? "bg-white text-indigo-600 shadow-2xs font-bold"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Dispatch Matrix</span>
                </button>
              </div>

              {/* TAB 1: FORMAL INSTITUTIONAL LETTERHEAD */}
              {activeStudioTab === "letterhead" && (
                <div className="p-5 bg-slate-50/40">
                  <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs relative">
                    {/* Letterhead Header Strip */}
                    <div className="border-b-2 border-slate-900 pb-3 mb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                            <Building className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-900 tracking-tight block">
                              Apex Institute of Technology & Management
                            </span>
                            <span className="text-[11px] font-medium text-slate-500 block">
                              Office of Academic Affairs • Autonomous Academic Council
                            </span>
                            <span className="text-[10px] font-mono text-indigo-600 tracking-wider">
                              REG: APX-EDU-AUT-2011 • NORTH CAMPUS
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Document Type
                          </span>
                          <span className="text-xs font-bold font-mono text-slate-900">
                            OFFICIAL CIRCULAR
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Bar */}
                    <div className="grid grid-cols-2 gap-2 pb-3 mb-3 border-b border-slate-100 text-[11px] font-mono">
                      <div>
                        <span className="text-slate-400 uppercase font-semibold">Ref No:</span>
                        <span className="font-bold text-slate-900 ml-1.5">{selectedNotice.refNo}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 uppercase font-semibold">Issue Date:</span>
                        <span className="font-bold text-slate-900 ml-1.5">{selectedNotice.publishDate}</span>
                      </div>
                      <div className="col-span-2 flex items-center justify-between text-[10px] text-slate-400">
                        <div className="truncate">
                          <span className="font-semibold">Security Digest: </span>
                          <span className="font-mono text-indigo-600 font-semibold">{selectedNotice.securityHash}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (typeof navigator !== "undefined" && navigator.clipboard) {
                              navigator.clipboard.writeText(selectedNotice.securityHash);
                            }
                            showToast("Security digest copied to clipboard.");
                          }}
                          className="hover:text-indigo-600 p-0.5 ml-1 shrink-0"
                          title="Copy Digest"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Urgent Action Callout Banner */}
                    {(selectedNotice.priority === "URGENT" || selectedNotice.priority === "EMERGENCY") && (
                      <div className="bg-rose-50 border border-rose-200/80 rounded-lg p-2.5 mb-3 flex items-center justify-between text-rose-700">
                        <span className="text-[11px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          Action Required // Mandatory Compliance
                        </span>
                        <span className="font-mono text-[10px] font-bold text-rose-800">
                          DEADLINE: {selectedNotice.expiryDate}
                        </span>
                      </div>
                    )}

                    {/* Circular Subject */}
                    <div className="mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Subject:
                      </span>
                      <h2 className="text-base font-bold text-slate-900 leading-snug">
                        {selectedNotice.title}
                      </h2>
                    </div>

                    {/* Addressed To */}
                    <div className="mb-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Addressed To:
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {selectedNotice.audience} • <span className="font-normal text-slate-500">{selectedNotice.enrolledCount}</span>
                      </span>
                    </div>

                    {/* Formal Body Content */}
                    <div className="space-y-2 text-xs text-slate-700 leading-relaxed text-justify mb-5 whitespace-pre-line">
                      {selectedNotice.body}
                    </div>

                    {/* Signatory & Digital Seal */}
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-2 items-end">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-lg border border-emerald-300 bg-emerald-50 flex flex-col items-center justify-center p-1 text-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-[8px] font-bold text-emerald-800 uppercase leading-tight mt-0.5">
                            Apex Seal
                          </span>
                        </div>
                        <div className="flex flex-col text-[10px] font-mono text-slate-500">
                          <span className="text-emerald-700 font-bold">SECURE SIGNATURE</span>
                          <span className="truncate">Token: {selectedNotice.token}</span>
                          <span>Timestamp: 09:30:14 UTC</span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="font-serif italic font-bold text-slate-800 text-sm mb-0.5">
                          Margaret Vance
                        </div>
                        <span className="text-xs text-slate-900 font-bold uppercase">
                          Dr. Margaret Vance
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Dean of Academic Affairs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: NOTICE STUDIO (LIVE EDITOR) */}
              {activeStudioTab === "studio" && (
                <div className="p-5 space-y-4 bg-slate-50/30">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Subject / Circular Title
                    </label>
                    <input
                      type="text"
                      value={selectedNotice.title}
                      onChange={e => setSelectedNotice({ ...selectedNotice, title: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Target Audience
                      </label>
                      <input
                        type="text"
                        value={selectedNotice.audience}
                        onChange={e => setSelectedNotice({ ...selectedNotice, audience: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={selectedNotice.expiryDate}
                        onChange={e => setSelectedNotice({ ...selectedNotice, expiryDate: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Circular Body & Directives
                    </label>
                    <textarea
                      rows={6}
                      value={selectedNotice.body}
                      onChange={e => setSelectedNotice({ ...selectedNotice, body: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-2">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Active Broadcast Channels
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.portal}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, portal: e.target.checked }
                            })
                          }
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Portal Web</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.app}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, app: e.target.checked }
                            })
                          }
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>App Push</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.sms}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, sms: e.target.checked }
                            })
                          }
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>SMS Gateway</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.email}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, email: e.target.checked }
                            })
                          }
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Email Relay</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.kiosk}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, kiosk: e.target.checked }
                            })
                          }
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Signage Kiosks</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => showToast("Changes saved to active circular draft.")}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
                    >
                      Save Circular Edits
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: DISPATCH MATRIX */}
              {activeStudioTab === "dispatch" && (
                <div className="p-5 space-y-4 bg-slate-50/30">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-700 block">
                      Multi-Channel Delivery Breakdown
                    </span>
                    <div className="space-y-2.5">
                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Monitor className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Web Portal</div>
                            <div className="text-[10px] text-slate-400">Active Student / Faculty Feed</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-600 font-mono">3,740 Read</span>
                          <div className="text-[10px] text-slate-400 font-medium">96.1% Reach</div>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <Smartphone className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Mobile Push (FCM/APNS)</div>
                            <div className="text-[10px] text-slate-400">Instant Handset Broadcast</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-600 font-mono">3,420 Acked</span>
                          <div className="text-[10px] text-slate-400 font-medium">14ms latency</div>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                            <Send className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Twilio SMS Gateway</div>
                            <div className="text-[10px] text-slate-400">Carrier Transit Trunk</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-sky-600 font-mono">3,380 Sent</span>
                          <div className="text-[10px] text-slate-400 font-medium">40 in queue</div>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                            <Radio className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Campus Signage Displays</div>
                            <div className="text-[10px] text-slate-400">Atrium & Quad Kiosks</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-purple-600 font-mono">6 / 6 Live</span>
                          <div className="text-[10px] text-emerald-600 font-semibold">1080p Stream OK</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast("Triggered re-dispatch retry for unacknowledged channels.")}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Retry Pending / Failed Receptors
                  </button>
                </div>
              )}

              {/* Multi-Channel Telemetry Box */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Live Dispatch Status
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Monitor className="w-3.5 h-3.5 text-indigo-600" />
                      Student Portal
                    </span>
                    <span className="font-mono text-emerald-600 font-bold">100% Synced</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                      App Push
                    </span>
                    <span className="font-mono text-emerald-600 font-bold">3,420 Sent</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Send className="w-3.5 h-3.5 text-sky-600" />
                      SMS Alert
                    </span>
                    <span className="font-mono text-sky-600 font-bold">3,380 Sent</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      A4 Ready
                    </span>
                    <span className="font-mono text-indigo-600 font-bold">Vector PDF</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-slate-100 bg-white flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      window.print();
                      showToast("Sending circular to print spooler...");
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>
                  <button
                    onClick={() => showToast(`SMS Reminder dispatched to all recipients of ${selectedNotice.refNo}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5 text-sky-600" />
                    <span>SMS Reminder</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setNotices(notices.filter(n => n.id !== selectedNotice.id));
                    showToast(`Circular ${selectedNotice.refNo} has been revoked.`);
                  }}
                  className="px-2.5 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors"
                >
                  Revoke Notice
                </button>
              </div>
            </div>

            {/* Quick Emergency Broadcast Card */}
            <div className="bg-gradient-to-br from-rose-900 to-rose-950 text-white rounded-2xl p-5 shadow-xs border border-rose-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-bold tracking-tight">
                    Urgent Broadcast Override
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-500/30 font-bold">
                  LEVEL-1 PRIORITY
                </span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed mb-4">
                Instantly flash emergency advisories (weather cancellations, security alerts, power outages) to all phone numbers, student apps, and 6 campus digital signboards.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-rose-800/80">
                <span className="text-[11px] font-mono text-rose-300">Turnaround: ~15s</span>
                <button
                  onClick={() => setIsEmergencyModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Issue Alert</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Multi-Channel Gateway Telemetry & Infrastructure Strip */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Pipelines:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-slate-600">Twilio / AWS SMS:</span>
                <span className="text-xs font-mono font-semibold text-emerald-600">99.8% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-slate-600">SMTP Relays:</span>
                <span className="text-xs font-mono font-semibold text-emerald-600">100% Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-slate-600">FCM / APNS Push:</span>
                <span className="text-xs font-mono font-semibold text-indigo-600">24ms Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-slate-600">Digital Signage:</span>
                <span className="text-xs font-mono font-semibold text-purple-600">6 / 6 Online</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>Real-Time Stream Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: + DRAFT NEW NOTICE */}
      {isDraftModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Draft New Campus Circular
                </h3>
              </div>
              <button
                onClick={() => setIsDraftModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDraft} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Circular Ref No.
                  </label>
                  <input
                    type="text"
                    value={newNotice.refNo}
                    onChange={e => setNewNotice({ ...newNotice, refNo: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Issuing Authority / Dept
                  </label>
                  <input
                    type="text"
                    value={newNotice.author}
                    onChange={e => setNewNotice({ ...newNotice, author: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Subject / Heading
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-Semester Laboratory Schedule Revision..."
                  value={newNotice.title}
                  onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Target Cadre
                  </label>
                  <select
                    value={newNotice.cadre}
                    onChange={e => setNewNotice({ ...newNotice, cadre: e.target.value as Notice["cadre"] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="student">Student Cohort</option>
                    <option value="faculty">Faculty & Staff</option>
                    <option value="exam">Examination & Result</option>
                    <option value="emergency">Emergency / Alert</option>
                    <option value="all">Campus-Wide</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Priority Tier
                  </label>
                  <select
                    value={newNotice.priority}
                    onChange={e => setNewNotice({ ...newNotice, priority: e.target.value as Notice["priority"] })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="URGENT">Urgent Action</option>
                    <option value="HIGH">High Priority</option>
                    <option value="REGULATION">Regulation</option>
                    <option value="FACULTY">Faculty Memo</option>
                    <option value="FEES">Fees & Bursar</option>
                    <option value="MAINTENANCE">Maintenance</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newNotice.expiryDate}
                    onChange={e => setNewNotice({ ...newNotice, expiryDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Summary Teaser
                </label>
                <input
                  type="text"
                  required
                  placeholder="1-2 sentences shown on mobile and card previews..."
                  value={newNotice.summary}
                  onChange={e => setNewNotice({ ...newNotice, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Verbatim Notice Body (Official Letterhead)
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter full formal text, deadlines, rules, laboratory venues..."
                  value={newNotice.body}
                  onChange={e => setNewNotice({ ...newNotice, body: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <span className="text-xs font-semibold text-slate-700 block">
                  Select Dispatch Pipeline Channels
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.portal}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, portal: e.target.checked }
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Web Portal</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.app}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, app: e.target.checked }
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>App Push (FCM)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.sms}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, sms: e.target.checked }
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>SMS Gateway</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.email}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, email: e.target.checked }
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Official Email</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.kiosk}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, kiosk: e.target.checked }
                        })
                      }
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Campus Kiosks</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDraftModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: URGENT EMERGENCY ALERT OVERRIDE */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-rose-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-rose-500 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Confirm Emergency Broadcast
                </h3>
                <span className="text-[11px] font-mono font-bold text-rose-600">
                  LEVEL-1 PRIORITY OVERRIDE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              This action will immediately trigger SMS dispatches to all registered phone numbers (4,200+), push high-priority alert banners across the mobile app, and flash emergency advisories on all 6 physical campus digital signage kiosks.
            </p>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-700 text-xs font-mono">
              Estimated delivery latency: 12 - 18 seconds across all cellular and IP nodes.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEmergencyModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-50"
              >
                Abort
              </button>
              <button
                onClick={handleTriggerEmergencyAlert}
                className="px-5 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-xs"
              >
                Execute Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SCHEDULED QUEUE */}
      {isScheduledQueueOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Automated Scheduled Queue (4 Pending)
                </h3>
              </div>
              <button
                onClick={() => setIsScheduledQueueOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-indigo-600 font-bold">APX/SCH/2024-91</div>
                  <div className="text-xs font-semibold text-slate-800">Library Books Return & Fine Amnesty Week</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">Scheduled: June 1, 2024 @ 08:00 EST</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                  QUEUED
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-indigo-600 font-bold">APX/SCH/2024-92</div>
                  <div className="text-xs font-semibold text-slate-800">Placement Drive: Google & Microsoft Interviews</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">Scheduled: June 3, 2024 @ 09:00 EST</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                  QUEUED
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-indigo-600 font-bold">APX/SCH/2024-93</div>
                  <div className="text-xs font-semibold text-slate-800">Summer Internship Diary Sign-Off Directive</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">Scheduled: June 5, 2024 @ 10:00 EST</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                  QUEUED
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-indigo-600 font-bold">APX/SCH/2024-94</div>
                  <div className="text-xs font-semibold text-slate-800">Hostel Vacating & Luggage Room Protocol</div>
                  <div className="font-mono text-[10px] text-slate-400 mt-0.5">Scheduled: June 10, 2024 @ 12:00 EST</div>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                  QUEUED
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsScheduledQueueOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: BROADCAST CONFIG */}
      {isBroadcastConfigOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Radio className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Broadcast Infrastructure Config
                </h3>
              </div>
              <button
                onClick={() => setIsBroadcastConfigOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">Twilio SMS Trunk Routing</div>
                <div className="text-slate-500 font-mono text-[11px]">Trunk SID: TK_APX_NORTH_SMS_99812</div>
                <div className="text-emerald-600 font-semibold font-mono text-[11px]">Throughput: 120 msgs / sec</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">Firebase Cloud Messaging (FCM)</div>
                <div className="text-slate-500 font-mono text-[11px]">Topic: /topics/campus_all_broadcast</div>
                <div className="text-emerald-600 font-semibold font-mono text-[11px]">APNS VoIP Fallback: ACTIVE</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900">Physical Signage WebSocket Gateway</div>
                <div className="text-slate-500 font-mono text-[11px]">Endpoint: wss://signage.apex.edu/stream/live</div>
                <div className="text-indigo-600 font-semibold font-mono text-[11px]">Heartbeat: 5000ms • Displays: 6 / 6 Online</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setIsBroadcastConfigOpen(false);
                  showToast("Broadcast gateway configuration validated.");
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700"
              >
                Save & Verify Pipes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
