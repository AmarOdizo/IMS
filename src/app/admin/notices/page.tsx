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
  Info
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
    setTimeout(() => setToastMessage(null), 3000);
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

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 shadow-xl border border-secondary flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-secondary" />
          <span className="font-mono-data text-body-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Sub-Header & Breadcrumbs Command Bar */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/30 px-gutter-desktop py-space-md shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              <span className="hover:text-on-surface cursor-pointer">INSTITUTIONAL COMMAND</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="hover:text-on-surface cursor-pointer">REGISTRAR & CAMPUS COMMUNICATIONS</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary font-semibold">CAMPUS NOTICES & CIRCULAR DISPATCH</span>
            </nav>
            <div className="flex items-baseline gap-space-sm">
              <h1 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tight font-bold">
                Notices & Campus Bulletins
              </h1>
              <span className="font-mono-data text-mono-data text-secondary px-2 py-0.5 bg-surface-container-high border border-outline-variant/40 font-semibold">
                CONSOLE ID: CTL-NOTICES-09
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Institutional Circulars, Emergency Broadcasts, Academic Notifications & Multi-Channel Dispatch Ledger
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-space-xs">
            <button
              onClick={() => setIsDraftModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider border border-primary-container hover:bg-primary shadow-sm transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Draft New Notice</span>
            </button>
            <button
              onClick={() => setIsScheduledQueueOpen(true)}
              className="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider border border-outline-variant/60 hover:bg-surface-container-low transition-colors shadow-sm"
            >
              <Clock className="w-4 h-4 text-secondary" />
              <span>Scheduled Queue (4)</span>
            </button>
            <button
              onClick={() => setIsBroadcastConfigOpen(true)}
              className="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider border border-outline-variant/60 hover:bg-surface-container-low transition-colors shadow-sm"
            >
              <Radio className="w-4 h-4 text-secondary" />
              <span>Broadcast Config</span>
            </button>
            <button
              onClick={() => showToast("Archived audit logs exported as encrypted ZIP digest.")}
              className="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider border border-outline-variant/60 hover:bg-surface-container-low transition-colors shadow-sm"
            >
              <Download className="w-4 h-4 text-secondary" />
              <span>Audit Archive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Container */}
      <div className="p-gutter-desktop space-y-gutter-desktop">
        {/* Top KPI Telemetry Grid (4 Tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 shadow-sm p-space-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Active Published Notices
                </span>
                <Megaphone className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">28</span>
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">Active Bulletins</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Institutional: 12 • Dept: 11 • Emergency: 1
              </p>
            </div>
            <div className="mt-space-md pt-2 border-t border-outline-variant/30 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-mono-data text-mono-data text-error font-semibold">
                <Hourglass className="w-3.5 h-3.5" />
                4 Expiring &lt; 48h
              </span>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold cursor-pointer hover:underline">
                VIEW EXPY
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 shadow-sm p-space-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Dispatch Reach & Engagement
                </span>
                <Eye className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">96.4%</span>
                <span className="font-label-md text-label-md text-secondary font-medium">Cumulative</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Portal: 3,740 / 3,892 read • Mobile: 91.2%
              </p>
            </div>
            <div className="mt-space-md pt-2 border-t border-outline-variant/30 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-mono-data text-mono-data text-primary">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                Mean read time: 3.8 hrs
              </span>
              <span className="h-2 w-2 rounded-full bg-secondary"></span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 shadow-sm p-space-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  SMS & Email Gateway Outbox
                </span>
                <Send className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">14,820</span>
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">Delivered</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                SMS Rate: 99.4% • Email Open Rate: 84.6%
              </p>
            </div>
            <div className="mt-space-md pt-2 border-t border-outline-variant/30 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-mono-data text-mono-data text-secondary font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                All gateways green • 0 bounces
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">SN-RELAY</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 shadow-sm p-space-md relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Pending Dean & Registrar Sign-Off
                </span>
                <AlertTriangle className="w-5 h-5 text-error" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">3</span>
                <span className="font-label-md text-label-md text-error font-medium">In Queue</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                2 Academic Senate • 1 Fee Ledger Memo
              </p>
            </div>
            <div className="mt-space-md pt-2 border-t border-outline-variant/30 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-mono-data text-mono-data text-error font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Urgent Review Required
              </span>
              <button
                onClick={() => showToast("Authorizing Dean signature token for 3 pending notices.")}
                className="font-label-sm text-label-sm uppercase bg-error/10 text-error px-2 py-0.5 hover:bg-error hover:text-on-error transition-colors font-bold"
              >
                AUTHORIZE
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Cadre Categorization Matrix */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 shadow-sm">
          {/* Cadre Tabs */}
          <div className="flex border-b border-outline-variant/30 overflow-x-auto">
            <button
              onClick={() => setActiveCadreTab("all")}
              className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeCadreTab === "all"
                  ? "border-b-2 border-primary text-primary font-bold bg-surface-container-low"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <span>All Notices</span>
              <span className="px-1.5 py-0.5 bg-primary text-on-primary text-label-sm font-mono-data font-bold">28</span>
            </button>
            <button
              onClick={() => setActiveCadreTab("student")}
              className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeCadreTab === "student"
                  ? "border-b-2 border-primary text-primary font-bold bg-surface-container-low"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <span>Student Only</span>
              <span className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant text-label-sm font-mono-data font-semibold">14</span>
            </button>
            <button
              onClick={() => setActiveCadreTab("faculty")}
              className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeCadreTab === "faculty"
                  ? "border-b-2 border-primary text-primary font-bold bg-surface-container-low"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <span>Faculty & Staff</span>
              <span className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant text-label-sm font-mono-data font-semibold">8</span>
            </button>
            <button
              onClick={() => setActiveCadreTab("exam")}
              className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeCadreTab === "exam"
                  ? "border-b-2 border-primary text-primary font-bold bg-surface-container-low"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <span>Examination & Datesheet</span>
              <span className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant text-label-sm font-mono-data font-semibold">4</span>
            </button>
            <button
              onClick={() => setActiveCadreTab("emergency")}
              className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeCadreTab === "emergency"
                  ? "border-b-2 border-error text-error font-bold bg-error-container/30"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <span>Emergency & Advisory</span>
              <span className="px-1.5 py-0.5 bg-error-container text-error text-label-sm font-mono-data font-bold">2</span>
            </button>
            <button
              onClick={() => setActiveCadreTab("archive")}
              className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors ml-auto ${
                activeCadreTab === "archive"
                  ? "border-b-2 border-primary text-primary font-bold bg-surface-container-low"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
            >
              <span>Archive / Expired</span>
              <span className="px-1.5 py-0.5 bg-surface-container-high text-on-surface-variant text-label-sm font-mono-data font-semibold">142</span>
            </button>
          </div>

          {/* Extended Filter Control Strip */}
          <div className="p-space-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-space-sm items-center bg-surface-container-low/40">
            <div className="xl:col-span-4 relative">
              <Search className="absolute left-space-sm top-2.5 w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 pl-9 pr-3 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary-container placeholder:text-on-surface-variant/60"
                placeholder="Filter notices by circular ref no., subject keywords, author..."
              />
            </div>
            <div className="xl:col-span-2">
              <select
                value={selectedAudience}
                onChange={e => setSelectedAudience(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 px-2 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary-container"
              >
                <option value="all">AUDIENCE: All Audiences</option>
                <option value="all">Everyone (Campus-Wide)</option>
                <option value="b.tech">Undergraduate (B.Tech)</option>
                <option value="postgraduate">Postgraduate (M.Sc/MBA)</option>
                <option value="faculty">Faculty & Teaching Staff</option>
                <option value="administrative">Administrative Cadre</option>
              </select>
            </div>
            <div className="xl:col-span-2">
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 px-2 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary-container"
              >
                <option value="all">DEPARTMENT: All Depts</option>
                <option value="senate">Academic Senate</option>
                <option value="coe">Controller of Exams</option>
                <option value="bursar">Bursar & Student Accounts</option>
                <option value="research">Dean of Research</option>
                <option value="facilities">Campus Security</option>
              </select>
            </div>
            <div className="xl:col-span-2">
              <select
                value={selectedPriority}
                onChange={e => setSelectedPriority(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 px-2 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary-container"
              >
                <option value="all">PRIORITY: All Priorities</option>
                <option value="URGENT">Crimson / Urgent Priority</option>
                <option value="HIGH">High Priority</option>
                <option value="REGULATION">Academic Regulation</option>
                <option value="EMERGENCY">Emergency Advisory</option>
              </select>
            </div>
            <div className="xl:col-span-2 flex items-center gap-space-xs">
              <select
                value={selectedChannel}
                onChange={e => setSelectedChannel(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/60 px-2 py-1.5 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary-container"
              >
                <option value="all">CHANNEL: All Channels</option>
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
                className="px-2.5 py-1.5 bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Body Split Layout: Ledger & Interactive Inspector Studio */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter items-start">
          {/* LEFT COLUMN: Master Notices & Circulars Ledger Table (7 of 12 cols / ~58-60%) */}
          <div className="xl:col-span-7 bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col">
            {/* Table Action Header Bar */}
            <div className="p-space-md border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low/20">
              <div className="flex items-center gap-space-md">
                <label className="inline-flex items-center gap-2 cursor-pointer font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  <input
                    type="checkbox"
                    checked={selectedNoticeIds.length > 0 && selectedNoticeIds.length === filteredNotices.length}
                    onChange={e => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded-none accent-primary border-outline cursor-pointer"
                  />
                  <span>Select All</span>
                </label>
                <div className="h-4 w-px bg-outline-variant/40"></div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => showToast(`Published ${selectedNoticeIds.length} notices to live channels.`)}
                    className="px-2 py-1 bg-surface-container-lowest border border-outline-variant/60 text-on-surface font-label-sm text-label-sm uppercase hover:bg-surface-container-low transition-colors"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => showToast(`Archived ${selectedNoticeIds.length} notices.`)}
                    className="px-2 py-1 bg-surface-container-lowest border border-outline-variant/60 text-on-surface font-label-sm text-label-sm uppercase hover:bg-surface-container-low transition-colors"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => showToast(`Generating PDF Digest for ${selectedNoticeIds.length} items.`)}
                    className="px-2 py-1 bg-surface-container-lowest border border-outline-variant/60 text-on-surface font-label-sm text-label-sm uppercase hover:bg-surface-container-low transition-colors"
                  >
                    PDF Digest
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono-data text-mono-data text-on-surface-variant">
                  Showing {filteredNotices.length} of 28 Active Bulletins
                </span>
                <button className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-on-surface">
                  <Sliders className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/40">
                    <th className="w-10 px-3 py-2 text-center">
                      <span className="sr-only">Row Select</span>
                    </th>
                    <th className="px-3 py-2.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Circular Ref & Priority
                    </th>
                    <th className="px-3 py-2.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Title & Notice Summary
                    </th>
                    <th className="px-3 py-2.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Target Audience
                    </th>
                    <th className="px-3 py-2.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Dispatched Channels
                    </th>
                    <th className="px-3 py-2.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Published / Expiry
                    </th>
                    <th className="px-3 py-2.5 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Read Reach
                    </th>
                    <th className="w-20 px-3 py-2.5 text-right font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 font-body-sm text-body-sm text-on-surface">
                  {filteredNotices.map(notice => {
                    const isSelected = selectedNotice.id === notice.id;
                    const isChecked = selectedNoticeIds.includes(notice.id);

                    const badgeColor =
                      notice.priority === "URGENT" || notice.priority === "EMERGENCY"
                        ? "bg-error text-on-error"
                        : notice.priority === "HIGH"
                        ? "bg-secondary-container text-on-secondary-container"
                        : notice.priority === "FACULTY"
                        ? "bg-primary-container text-on-primary"
                        : "bg-surface-container-highest text-primary";

                    return (
                      <tr
                        key={notice.id}
                        onClick={() => setSelectedNotice(notice)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-primary/5 hover:bg-primary/10 border-l-4 border-primary"
                            : "hover:bg-surface-container-low/60"
                        }`}
                      >
                        <td
                          className="px-3 py-3 text-center"
                          onClick={e => {
                            e.stopPropagation();
                            toggleSelectNotice(notice.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSelectNotice(notice.id)}
                            className="w-3.5 h-3.5 rounded-none accent-primary border-outline"
                          />
                        </td>
                        <td className="px-3 py-3 align-top whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className="font-mono-data text-mono-data font-bold text-primary">
                              {notice.refNo}
                            </span>
                            <span className={`inline-block px-1.5 py-0.5 font-label-sm text-label-sm font-semibold tracking-wider text-center ${badgeColor}`}>
                              {notice.priorityLabel}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 align-top max-w-xs">
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-body-md font-bold text-primary hover:underline">
                              {notice.title}
                            </span>
                            <span className="font-label-sm text-label-sm text-secondary font-medium">
                              By: {notice.author}
                            </span>
                            <p className="text-on-surface-variant line-clamp-2 mt-1 font-body-sm text-body-sm">
                              {notice.summary}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-3 align-top whitespace-nowrap">
                          <span className="font-mono-data text-mono-data text-primary font-medium">
                            {notice.audience}
                          </span>
                          <div className="text-on-surface-variant text-[0.6875rem]">
                            {notice.enrolledCount}
                          </div>
                        </td>
                        <td className="px-3 py-3 align-top">
                          <div className="flex items-center gap-1.5 text-on-surface-variant">
                            {notice.channels.portal && (
                              <span title="Web Portal Active">
                                <Monitor className="w-4 h-4 text-secondary" />
                              </span>
                            )}
                            {notice.channels.app && (
                              <span title="Mobile App Push Sent">
                                <Smartphone className="w-4 h-4 text-secondary" />
                              </span>
                            )}
                            {notice.channels.sms && (
                              <span title="SMS Gateway Delivered">
                                <Send className="w-4 h-4 text-secondary" />
                              </span>
                            )}
                            {notice.channels.email && (
                              <span title="Official Email Sent">
                                <Mail className="w-4 h-4 text-secondary" />
                              </span>
                            )}
                            {notice.channels.kiosk && (
                              <span title="Noticeboard Kiosk Active">
                                <Radio className="w-4 h-4 text-secondary" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3 align-top whitespace-nowrap">
                          <div className="font-mono-data text-mono-data">{notice.publishDate}</div>
                          <div className="text-error font-mono-data text-[0.6875rem] font-medium">
                            Exp: {notice.expiryDate}
                          </div>
                        </td>
                        <td className="px-3 py-3 align-top whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between font-mono-data text-mono-data">
                              <span className="font-bold text-primary">{notice.readReach}%</span>
                            </div>
                            <div className="w-16 h-1.5 bg-surface-container-high overflow-hidden">
                              <div
                                className="h-full bg-secondary"
                                style={{ width: `${notice.readReach}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1 text-on-surface-variant">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedNotice(notice);
                                setActiveStudioTab("letterhead");
                              }}
                              className="p-1 hover:text-primary hover:bg-surface-container"
                              title="View Live Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedNotice(notice);
                                setActiveStudioTab("studio");
                              }}
                              className="p-1 hover:text-primary hover:bg-surface-container"
                              title="Edit Circular"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                showToast(`Menu opened for ${notice.refNo}`);
                              }}
                              className="p-1 hover:text-primary hover:bg-surface-container"
                              title="Options"
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

            {/* Table Pagination Footer */}
            <div className="p-space-md border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low/20">
              <span className="font-mono-data text-mono-data text-on-surface-variant">
                Page 1 of 5 (Total {notices.length} Active Notices)
              </span>
              <div className="inline-flex items-center gap-1 font-label-md text-label-md">
                <button
                  disabled
                  className="px-2.5 py-1 bg-surface-container-lowest border border-outline-variant/60 text-on-surface-variant opacity-50 cursor-not-allowed"
                >
                  Prev
                </button>
                <button className="px-3 py-1 bg-primary text-on-primary font-bold border border-primary font-mono-data">
                  1
                </button>
                <button className="px-3 py-1 bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container-low text-on-surface font-mono-data">
                  2
                </button>
                <button className="px-3 py-1 bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container-low text-on-surface font-mono-data">
                  3
                </button>
                <button className="px-2.5 py-1 bg-surface-container-lowest border border-outline-variant/60 text-on-surface hover:bg-surface-container-low">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Notice Studio & Live Official Bulletin Preview Drawer (5 of 12 cols / ~40-42%) */}
          <div className="xl:col-span-5 flex flex-col gap-space-md">
            {/* Live Inspector Card Container */}
            <div className="bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col">
              {/* Studio Header Segmented Switcher */}
              <div className="flex border-b border-outline-variant/30 bg-surface-container-low/30">
                <button
                  onClick={() => setActiveStudioTab("letterhead")}
                  className={`flex-1 py-2.5 px-3 font-label-sm text-label-sm uppercase tracking-wider text-center font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    activeStudioTab === "letterhead"
                      ? "border-b-2 border-primary text-primary bg-surface-container-lowest"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Official Letterhead</span>
                </button>
                <button
                  onClick={() => setActiveStudioTab("studio")}
                  className={`flex-1 py-2.5 px-3 font-label-sm text-label-sm uppercase tracking-wider text-center font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    activeStudioTab === "studio"
                      ? "border-b-2 border-primary text-primary bg-surface-container-lowest"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  <Edit className="w-4 h-4" />
                  <span>Notice Studio</span>
                </button>
                <button
                  onClick={() => setActiveStudioTab("dispatch")}
                  className={`flex-1 py-2.5 px-3 font-label-sm text-label-sm uppercase tracking-wider text-center font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    activeStudioTab === "dispatch"
                      ? "border-b-2 border-primary text-primary bg-surface-container-lowest"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  <Radio className="w-4 h-4" />
                  <span>Dispatch Matrix</span>
                </button>
              </div>

              {/* TAB 1: FORMAL INSTITUTIONAL LETTERHEAD */}
              {activeStudioTab === "letterhead" && (
                <div className="p-space-lg bg-surface border-b border-outline-variant/30">
                  <div className="bg-surface-container-lowest border border-outline-variant/50 p-space-lg shadow-sm relative">
                    {/* Letterhead Header Strip */}
                    <div className="border-b-2 border-primary pb-space-sm mb-space-md">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary flex items-center justify-center text-on-primary">
                            <Building className="w-7 h-7" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                              Apex Institute of Technology & Management
                            </span>
                            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
                              Office of Academic Affairs • Autonomous Academic Council
                            </span>
                            <span className="font-mono-data text-[0.625rem] text-secondary tracking-widest uppercase">
                              REG. CODE: APX-EDU-AUT-2011 • NORTH CAMPUS
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-label-sm text-[0.625rem] uppercase tracking-widest text-on-surface-variant block font-bold">
                            Document Type
                          </span>
                          <span className="font-mono-data text-mono-data font-bold text-primary">
                            OFFICIAL CIRCULAR
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Bar */}
                    <div className="grid grid-cols-2 gap-2 pb-space-sm mb-space-md border-b border-outline-variant/30 font-mono-data text-[0.6875rem]">
                      <div>
                        <span className="text-on-surface-variant uppercase font-semibold">Ref No:</span>
                        <span className="font-bold text-primary ml-1">{selectedNotice.refNo}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-on-surface-variant uppercase font-semibold">Date of Issue:</span>
                        <span className="font-bold text-primary ml-1">{selectedNotice.publishDate}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-on-surface-variant uppercase font-semibold">Security Digest:</span>
                        <span className="font-mono-data text-[0.625rem] text-secondary ml-1 font-bold">
                          {selectedNotice.securityHash}
                        </span>
                      </div>
                    </div>

                    {/* Urgent Action Callout Banner */}
                    {(selectedNotice.priority === "URGENT" || selectedNotice.priority === "EMERGENCY") && (
                      <div className="bg-error text-on-error px-3 py-1.5 mb-space-md flex items-center justify-between">
                        <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          ACTION REQUIRED // MANDATORY COMPLIANCE
                        </span>
                        <span className="font-mono-data text-[0.6875rem] font-semibold">
                          DEADLINE: {selectedNotice.expiryDate}
                        </span>
                      </div>
                    )}

                    {/* Circular Subject */}
                    <div className="mb-space-md">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block mb-0.5">
                        SUBJECT:
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-primary font-bold leading-tight">
                        {selectedNotice.title}
                      </h2>
                    </div>

                    {/* Addressed To */}
                    <div className="mb-space-md p-2 bg-surface-container-low border border-outline-variant/40">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                        Addressed To:
                      </span>
                      <span className="font-body-sm text-body-sm font-semibold text-primary">
                        {selectedNotice.audience} • {selectedNotice.enrolledCount}
                      </span>
                    </div>

                    {/* Formal Body Content */}
                    <div className="space-y-space-sm font-body-sm text-body-sm text-on-surface leading-relaxed text-justify mb-space-lg whitespace-pre-line">
                      {selectedNotice.body}
                    </div>

                    {/* Signatory & Digital Seal Grid */}
                    <div className="pt-space-md border-t border-outline-variant/40 grid grid-cols-2 items-end">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-14 border border-secondary bg-surface-container flex flex-col items-center justify-center p-1 text-center">
                          <CheckCircle2 className="w-5 h-5 text-secondary" />
                          <span className="font-label-sm text-[0.5625rem] font-bold text-primary uppercase leading-tight mt-0.5">
                            Apex Valid Seal
                          </span>
                        </div>
                        <div className="flex flex-col font-mono-data text-[0.625rem] text-on-surface-variant">
                          <span className="text-secondary font-bold">SECURE SIGNATURE</span>
                          <span>Token: {selectedNotice.token}</span>
                          <span>Timestamp: 09:30:14 UTC</span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="font-mono-data text-secondary italic font-semibold text-sm mb-0.5">
                          Margaret Vance
                        </div>
                        <span className="font-label-md text-label-md text-primary font-bold uppercase">
                          Dr. Margaret Vance
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                          Super Admin & Dean of Academic Affairs
                        </span>
                        <span className="font-label-sm text-[0.625rem] text-on-surface-variant uppercase">
                          Apex Institute of Tech & Mgmt
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: NOTICE STUDIO (LIVE EDITOR) */}
              {activeStudioTab === "studio" && (
                <div className="p-space-md space-y-space-md bg-surface-container-low/20">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Subject / Circular Title
                    </label>
                    <input
                      type="text"
                      value={selectedNotice.title}
                      onChange={e => setSelectedNotice({ ...selectedNotice, title: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-space-sm">
                    <div className="space-y-1">
                      <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                        Target Audience
                      </label>
                      <input
                        type="text"
                        value={selectedNotice.audience}
                        onChange={e => setSelectedNotice({ ...selectedNotice, audience: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={selectedNotice.expiryDate}
                        onChange={e => setSelectedNotice({ ...selectedNotice, expiryDate: e.target.value })}
                        className="w-full bg-surface-container-lowest border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Circular Body & Regulatory Directives
                    </label>
                    <textarea
                      rows={6}
                      value={selectedNotice.body}
                      onChange={e => setSelectedNotice({ ...selectedNotice, body: e.target.value })}
                      className="w-full bg-surface-container-lowest border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="p-space-sm bg-surface-container-lowest border border-outline-variant/40 space-y-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                      Active Broadcast Channels
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="flex items-center gap-1.5 font-label-sm text-label-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.portal}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, portal: e.target.checked }
                            })
                          }
                          className="accent-primary"
                        />
                        <span>Portal Web</span>
                      </label>
                      <label className="flex items-center gap-1.5 font-label-sm text-label-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.app}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, app: e.target.checked }
                            })
                          }
                          className="accent-primary"
                        />
                        <span>App Push</span>
                      </label>
                      <label className="flex items-center gap-1.5 font-label-sm text-label-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.sms}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, sms: e.target.checked }
                            })
                          }
                          className="accent-primary"
                        />
                        <span>SMS Gateway</span>
                      </label>
                      <label className="flex items-center gap-1.5 font-label-sm text-label-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.email}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, email: e.target.checked }
                            })
                          }
                          className="accent-primary"
                        />
                        <span>Official Email</span>
                      </label>
                      <label className="flex items-center gap-1.5 font-label-sm text-label-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedNotice.channels.kiosk}
                          onChange={e =>
                            setSelectedNotice({
                              ...selectedNotice,
                              channels: { ...selectedNotice.channels, kiosk: e.target.checked }
                            })
                          }
                          className="accent-primary"
                        />
                        <span>Signage Kiosks</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => showToast("Changes saved to active circular draft.")}
                      className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors"
                    >
                      Save Circular Edits
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: DISPATCH MATRIX */}
              {activeStudioTab === "dispatch" && (
                <div className="p-space-md space-y-space-md bg-surface-container-low/20">
                  <div className="space-y-space-sm">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                      Multi-Channel Delivery Breakdown
                    </span>
                    <div className="space-y-2">
                      <div className="p-space-sm bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Monitor className="w-5 h-5 text-secondary" />
                          <div>
                            <div className="font-headline-sm text-body-md font-bold text-primary">Web Portal</div>
                            <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                              Active Student / Faculty Feed
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono-data text-body-sm font-bold text-secondary">3,740 Read</span>
                          <div className="font-label-sm text-[0.625rem] text-on-surface-variant uppercase">96.1% Reach</div>
                        </div>
                      </div>

                      <div className="p-space-sm bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-5 h-5 text-secondary" />
                          <div>
                            <div className="font-headline-sm text-body-md font-bold text-primary">FCM & APNS Mobile Push</div>
                            <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                              Instant Handset Broadcast
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono-data text-body-sm font-bold text-secondary">3,420 Acked</span>
                          <div className="font-label-sm text-[0.625rem] text-on-surface-variant uppercase">14ms latency</div>
                        </div>
                      </div>

                      <div className="p-space-sm bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Send className="w-5 h-5 text-secondary" />
                          <div>
                            <div className="font-headline-sm text-body-md font-bold text-primary">Twilio SMS Gateway</div>
                            <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                              Carrier Transit Carrier Trunk
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono-data text-body-sm font-bold text-secondary">3,380 Delivered</span>
                          <div className="font-label-sm text-[0.625rem] text-on-surface-variant uppercase">40 in queue</div>
                        </div>
                      </div>

                      <div className="p-space-sm bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Radio className="w-5 h-5 text-secondary" />
                          <div>
                            <div className="font-headline-sm text-body-md font-bold text-primary">Digital Signage Displays</div>
                            <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                              Campus Atrium & Hall Kiosks
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono-data text-body-sm font-bold text-primary">6 / 6 Live</span>
                          <div className="font-label-sm text-[0.625rem] text-secondary uppercase font-semibold">1080p Stream OK</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast("Triggered re-dispatch retry for unacknowledged channels.")}
                    className="w-full py-2 bg-surface-container text-primary hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors"
                  >
                    Retry Pending / Failed Receptors
                  </button>
                </div>
              )}

              {/* Multi-Channel Dispatch Telemetry Box */}
              <div className="p-space-md border-b border-outline-variant/30 bg-surface-container-low/30">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block mb-2">
                  Live Dispatch Pipeline Status
                </span>
                <div className="grid grid-cols-2 gap-space-xs font-body-sm text-body-sm">
                  <div className="p-2 bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                      <Monitor className="w-4 h-4 text-secondary" />
                      Student Portal
                    </span>
                    <span className="font-mono-data text-mono-data text-secondary font-semibold">100% Synced</span>
                  </div>
                  <div className="p-2 bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                      <Smartphone className="w-4 h-4 text-secondary" />
                      App Push
                    </span>
                    <span className="font-mono-data text-mono-data text-secondary font-semibold">3,420 Sent</span>
                  </div>
                  <div className="p-2 bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                      <Send className="w-4 h-4 text-secondary" />
                      SMS Alert
                    </span>
                    <span className="font-mono-data text-mono-data text-secondary font-semibold">3,380 / 40 Queue</span>
                  </div>
                  <div className="p-2 bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant">
                      <Printer className="w-4 h-4 text-secondary" />
                      A4 Print Ready
                    </span>
                    <span className="font-mono-data text-mono-data text-primary font-semibold">Vector PDF OK</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons in Inspector */}
              <div className="p-space-md bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-xs">
                <button
                  onClick={() => {
                    window.print();
                    showToast("Sending circular to print spooler...");
                  }}
                  className="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official PDF</span>
                </button>
                <button
                  onClick={() => showToast(`SMS Reminder dispatched to all recipients of ${selectedNotice.refNo}`)}
                  className="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider border border-outline-variant/60 hover:bg-surface-container-low transition-colors"
                >
                  <Send className="w-4 h-4 text-error" />
                  <span>Send SMS Reminder</span>
                </button>
                <button
                  onClick={() => {
                    setNotices(notices.filter(n => n.id !== selectedNotice.id));
                    showToast(`Circular ${selectedNotice.refNo} has been revoked.`);
                  }}
                  className="px-space-sm py-2 text-on-surface-variant hover:text-error font-label-md text-label-md uppercase tracking-wider transition-colors"
                >
                  Revoke Notice
                </button>
              </div>
            </div>

            {/* Quick Emergency Broadcast Card */}
            <div className="bg-primary text-on-primary p-space-md shadow-sm border border-primary-container relative overflow-hidden">
              <div className="flex items-center justify-between mb-space-sm">
                <div className="flex items-center gap-2">
                  <Radio className="w-6 h-6 text-secondary-container" />
                  <span className="font-headline-sm text-headline-sm uppercase tracking-tight font-bold">
                    Urgent Broadcast Override
                  </span>
                </div>
                <span className="font-mono-data text-[0.6875rem] px-2 py-0.5 bg-surface-container-lowest text-primary font-bold">
                  LEVEL-1 PRIORITY
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-primary-container mb-space-md">
                Broadcast emergency advisories (weather cancellations, security alerts, power outages) instantaneously to all phone numbers, mobile app push notifications, and campus digital signboards.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-on-primary-container/20">
                <span className="font-mono-data text-mono-data text-secondary-container">Turnaround: ~15 seconds</span>
                <button
                  onClick={() => setIsEmergencyModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-space-md py-1.5 bg-error text-on-error font-label-md text-label-md uppercase tracking-wider hover:bg-error-container hover:text-on-error-container transition-colors font-bold"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Issue Immediate Alert</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Multi-Channel Gateway Telemetry & Infrastructure Strip */}
        <div className="bg-surface-container-lowest border border-outline-variant/40 p-space-md shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
            {/* Left: Gateway Health Telemetry Items */}
            <div className="flex flex-wrap items-center gap-space-lg">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  INFRASTRUCTURE PIPELINES:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary"></span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">SMS Gateway (Twilio/AWS SNS):</span>
                <span className="font-mono-data text-mono-data text-secondary font-semibold">99.8% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary"></span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">SMTP Transactional Relays:</span>
                <span className="font-mono-data text-mono-data text-secondary font-semibold">100% Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary"></span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">Push Notification Core (FCM/APNS):</span>
                <span className="font-mono-data text-mono-data text-primary font-semibold">24ms Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary"></span>
                <span className="font-body-sm text-body-sm text-on-surface font-medium">Digital Signage Displays:</span>
                <span className="font-mono-data text-mono-data text-primary font-semibold">6 / 6 Kiosks Online</span>
              </div>
            </div>
            {/* Right: Action status */}
            <div className="flex items-center gap-space-sm font-mono-data text-mono-data text-on-surface-variant">
              <Clock className="w-4 h-4 text-secondary" />
              <span>Last Synchronized: Real-Time Stream</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: + DRAFT NEW NOTICE */}
      {isDraftModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-2xl w-full p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Draft New Campus Circular
                </h3>
              </div>
              <button
                onClick={() => setIsDraftModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDraft} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Circular Reference No.
                  </label>
                  <input
                    type="text"
                    value={newNotice.refNo}
                    onChange={e => setNewNotice({ ...newNotice, refNo: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/60 p-2 font-mono-data text-body-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Issuing Authority / Dept
                  </label>
                  <input
                    type="text"
                    value={newNotice.author}
                    onChange={e => setNewNotice({ ...newNotice, author: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Subject / Heading
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-Semester Laboratory Schedule Revision..."
                  value={newNotice.title}
                  onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Target Cadre
                  </label>
                  <select
                    value={newNotice.cadre}
                    onChange={e => setNewNotice({ ...newNotice, cadre: e.target.value as Notice["cadre"] })}
                    className="w-full bg-surface-container-low border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                  >
                    <option value="student">Student Cohort</option>
                    <option value="faculty">Faculty & Staff</option>
                    <option value="exam">Examination & Result</option>
                    <option value="emergency">Emergency / Alert</option>
                    <option value="all">Campus-Wide</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Priority Tier
                  </label>
                  <select
                    value={newNotice.priority}
                    onChange={e => setNewNotice({ ...newNotice, priority: e.target.value as Notice["priority"] })}
                    className="w-full bg-surface-container-low border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
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
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newNotice.expiryDate}
                    onChange={e => setNewNotice({ ...newNotice, expiryDate: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Summary Teaser
                </label>
                <input
                  type="text"
                  required
                  placeholder="1-2 sentences shown on mobile and card previews..."
                  value={newNotice.summary}
                  onChange={e => setNewNotice({ ...newNotice, summary: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Verbatim Notice Body (Official Letterhead)
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter full formal text, deadlines, rules, laboratory venues..."
                  value={newNotice.body}
                  onChange={e => setNewNotice({ ...newNotice, body: e.target.value })}
                  className="w-full bg-surface-container-low border border-outline-variant/60 p-2 font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary"
                />
              </div>

              <div className="p-3 bg-surface-container-low border border-outline-variant/40 space-y-2">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold block">
                  Select Dispatch Pipeline Channels
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.portal}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, portal: e.target.checked }
                        })
                      }
                      className="accent-primary"
                    />
                    <span>Web Portal</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.app}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, app: e.target.checked }
                        })
                      }
                      className="accent-primary"
                    />
                    <span>App Push (FCM)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.sms}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, sms: e.target.checked }
                        })
                      }
                      className="accent-primary"
                    />
                    <span>SMS Gateway</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.email}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, email: e.target.checked }
                        })
                      }
                      className="accent-primary"
                    />
                    <span>Official Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-body-sm text-body-sm">
                    <input
                      type="checkbox"
                      checked={newNotice.channels.kiosk}
                      onChange={e =>
                        setNewNotice({
                          ...newNotice,
                          channels: { ...newNotice.channels, kiosk: e.target.checked }
                        })
                      }
                      className="accent-primary"
                    />
                    <span>Campus Kiosks</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsDraftModalOpen(false)}
                  className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-sm"
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
        <div className="fixed inset-0 z-50 bg-error/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-error shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-error">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-bold tracking-tight">
                  CONFIRM EMERGENCY BROADCAST
                </h3>
                <span className="font-mono-data text-[0.6875rem] uppercase font-bold text-on-surface-variant">
                  LEVEL-1 PRIORITY OVERRIDE
                </span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              This action will immediately trigger SMS dispatches to all registered phone numbers (4,200+), push high-priority alert banners across the mobile app, and flash emergency advisories on all 6 physical campus digital signage kiosks.
            </p>

            <div className="p-3 bg-error/10 border border-error/30 text-error font-mono-data text-body-sm">
              Estimated delivery latency: 12 - 18 seconds across all cellular and IP nodes.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEmergencyModalOpen(false)}
                className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider"
              >
                Abort
              </button>
              <button
                onClick={handleTriggerEmergencyAlert}
                className="px-6 py-2 bg-error text-on-error font-label-md text-label-md uppercase tracking-wider font-bold hover:bg-error-container transition-colors shadow-md"
              >
                Execute Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: SCHEDULED QUEUE */}
      {isScheduledQueueOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Automated Scheduled Queue (4 Pending)
                </h3>
              </div>
              <button onClick={() => setIsScheduledQueueOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                <div>
                  <div className="font-mono-data text-label-sm text-primary font-bold">APX/SCH/2024-91</div>
                  <div className="font-body-sm text-body-sm font-semibold">Library Books Return & Fine Amnesty Week</div>
                  <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">Scheduled: June 1, 2024 @ 08:00 EST</div>
                </div>
                <span className="px-2 py-0.5 bg-surface-container-high text-primary font-mono-data text-label-sm font-semibold">QUEUED</span>
              </div>
              <div className="p-3 bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                <div>
                  <div className="font-mono-data text-label-sm text-primary font-bold">APX/SCH/2024-92</div>
                  <div className="font-body-sm text-body-sm font-semibold">Placement Drive: Google & Microsoft On-Campus Interviews</div>
                  <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">Scheduled: June 3, 2024 @ 09:00 EST</div>
                </div>
                <span className="px-2 py-0.5 bg-surface-container-high text-primary font-mono-data text-label-sm font-semibold">QUEUED</span>
              </div>
              <div className="p-3 bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                <div>
                  <div className="font-mono-data text-label-sm text-primary font-bold">APX/SCH/2024-93</div>
                  <div className="font-body-sm text-body-sm font-semibold">Summer Internship Diary Sign-Off Directive</div>
                  <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">Scheduled: June 5, 2024 @ 10:00 EST</div>
                </div>
                <span className="px-2 py-0.5 bg-surface-container-high text-primary font-mono-data text-label-sm font-semibold">QUEUED</span>
              </div>
              <div className="p-3 bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                <div>
                  <div className="font-mono-data text-label-sm text-primary font-bold">APX/SCH/2024-94</div>
                  <div className="font-body-sm text-body-sm font-semibold">Hostel Vacating & Luggage Room Protocol</div>
                  <div className="font-mono-data text-[0.6875rem] text-on-surface-variant">Scheduled: June 10, 2024 @ 12:00 EST</div>
                </div>
                <span className="px-2 py-0.5 bg-surface-container-high text-primary font-mono-data text-label-sm font-semibold">QUEUED</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsScheduledQueueOpen(false)}
                className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: BROADCAST CONFIG */}
      {isBroadcastConfigOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Broadcast Infrastructure Config
                </h3>
              </div>
              <button onClick={() => setIsBroadcastConfigOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 font-body-sm text-body-sm">
              <div className="p-3 bg-surface-container-low border border-outline-variant/40 space-y-1">
                <div className="font-bold text-primary">Twilio SMS Trunk Routing</div>
                <div className="text-on-surface-variant font-mono-data text-[0.75rem]">Trunk SID: TK_APX_NORTH_SMS_99812</div>
                <div className="text-secondary font-semibold font-mono-data text-[0.75rem]">Throughput: 120 messages / sec</div>
              </div>
              <div className="p-3 bg-surface-container-low border border-outline-variant/40 space-y-1">
                <div className="font-bold text-primary">Firebase Cloud Messaging (FCM)</div>
                <div className="text-on-surface-variant font-mono-data text-[0.75rem]">Topic: /topics/campus_all_broadcast</div>
                <div className="text-secondary font-semibold font-mono-data text-[0.75rem]">APNS Voip Token fallback: ACTIVE</div>
              </div>
              <div className="p-3 bg-surface-container-low border border-outline-variant/40 space-y-1">
                <div className="font-bold text-primary">Physical Signage WebSocket Gateway</div>
                <div className="text-on-surface-variant font-mono-data text-[0.75rem]">Endpoint: wss://signage.apex.edu/stream/live</div>
                <div className="text-secondary font-semibold font-mono-data text-[0.75rem]">Heartbeat: 5000ms • Active Displays: 6 / 6</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setIsBroadcastConfigOpen(false);
                  showToast("Broadcast gateway configuration validated.");
                }}
                className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider"
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
