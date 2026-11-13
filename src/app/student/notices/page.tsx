"use client";

import { useState, useMemo } from "react";
import {
  Bell,
  Search,
  Filter,
  CheckCheck,
  Calendar,
  Clock,
  Download,
  Printer,
  CalendarPlus,
  FileText,
  AlertTriangle,
  Info,
  ShieldCheck,
  Building,
  Paperclip,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  GraduationCap,
  Sparkles,
  Layers,
  ArrowRight
} from "lucide-react";

interface NoticeItem {
  id: string;
  circularRef: string;
  title: string;
  category: "academic" | "bursar" | "events" | "advisory";
  categoryBadge: string;
  badgeStyle: string;
  date: string;
  timeAgo: string;
  isUnread: boolean;
  summary: string;
  subjectLine: string;
  actionRequired?: string;
  authority: string;
  addressedTo: string;
  gazetteRecord: string;
  bodyParagraphs: string[];
  deliverables?: { title: string; spec: string }[];
  timeline?: { date: string; event: string; venue: string; status: string; statusStyle: string }[];
  signatureKey: string;
  signatory: { name: string; title: string; dept: string };
  enclosures: { name: string; size: string; type: string }[];
}

const noticesMasterData: NoticeItem[] = [
  {
    id: "apx-88",
    circularRef: "APX/CIR/2024-88",
    title: "End-Semester Capstone Project Submission Deadline & Viva Voce Schedule AY 2024-25",
    category: "academic",
    categoryBadge: "Academic & Exam // Urgent",
    badgeStyle: "bg-error-container text-on-error-container border border-[#ba1a1a]",
    date: "24 May 2024 • 12:00:00 IST",
    timeAgo: "2 hours ago",
    isUnread: true,
    summary:
      "Formal notification regarding mandatory repository freeze, Turnitin verification certificates (<12%), and external committee viva sessions for graduating engineering cohorts.",
    subjectLine:
      "End-Semester Capstone Project Submission Deadline & External Viva Voce Examination Schedule for AY 2024-25",
    actionRequired: "Action Required // Strict Deadline: June 15, 2024 at 23:59 EST",
    authority: "Office of Academic Affairs • Dr. Margaret Vance (Dean)",
    addressedTo:
      "All 4th Year B.Tech & 2nd Year M.Tech Candidates, Capstone Project Mentors & Internal/External Evaluators",
    gazetteRecord: "#88",
    bodyParagraphs: [
      "This is to formally notify all registered candidates that the Central Capstone Submission Portal will officially lock on June 15, 2024. All project deliverables—including verified source code repositories, IEEE standard project dossiers, and Turnitin similarity indexes (< 12%)—must be uploaded before the deadline. Physical viva-voce examinations will commence on June 20, 2024.",
      "Each evaluation committee consists of one assigned internal faculty guide, one departmental senior observer, and one accredited external domain specialist nominated by the Academic Council."
    ],
    deliverables: [
      { title: "IEEE Format Final Dissertation Dossier", spec: "PDF/A-1b Standard (.pdf)" },
      { title: "Turnitin Plagiarism Clearance Certificate", spec: "< 12% Max Permitted Match" },
      { title: "Institutional Git Repository Commit Hash", spec: "Production Branch • Tag v1.0.0" },
      { title: "Departmental Mentor Clearance NOC", spec: "Digitally Signed via Faculty Portal" }
    ],
    timeline: [
      {
        date: "June 01 - June 10",
        event: "Preliminary Guide Dossier Review & Similarity Scan",
        venue: "LMS Capstone Module",
        status: "Scheduled",
        statusStyle: "bg-secondary-fixed text-on-secondary-fixed"
      },
      {
        date: "June 15 • 23:59",
        event: "Hard Gateway Submission Freeze",
        venue: "Registrar Cloud Infrastructure",
        status: "Hard Cutoff",
        statusStyle: "bg-error-container text-on-error-container"
      },
      {
        date: "June 20 - June 26",
        event: "On-Campus External Panel Oral Defense & Code Inspection",
        venue: "Engineering Complex • Lab 4B",
        status: "In-Person",
        statusStyle: "bg-surface-container text-on-surface"
      }
    ],
    signatureKey: "APX-ACAD-SIGNATURE-KEY: 9F84B-2024-VNC",
    signatory: {
      name: "Dr. Margaret Vance, Ph.D.",
      title: "Dean, Directorate of Academic Affairs",
      dept: "Apex Institute of Technology • Governing Board"
    },
    enclosures: [
      { name: "Annexure_A_Rubrics.pdf", size: "1.2 MB", type: "PDF Spec" },
      { name: "IEEE_Dossier_Template.docx", size: "840 KB", type: "Document" },
      { name: "Evaluation_Criteria_Matrix.xlsx", size: "480 KB", type: "Spreadsheet" }
    ]
  },
  {
    id: "apx-87",
    circularRef: "APX/CIR/2024-87",
    title: "Final Timetable for End-Semester Regular & Backlog Theory Examinations",
    category: "academic",
    categoryBadge: "Academic Schedule // High Priority",
    badgeStyle: "bg-secondary-container text-primary border border-[#99c0fe]",
    date: "22 May 2024 • 10:30:00 IST",
    timeAgo: "2 days ago",
    isUnread: false,
    summary:
      "Controller of Examinations releases synchronized schedule for slot-based morning and evening written examinations across all technical engineering blocks.",
    subjectLine: "Final Schedule for Theory Examinations – Spring Semester AY 2024-25",
    actionRequired: "Hall Ticket Download Window Opens: June 01, 2024",
    authority: "Office of the Controller of Examinations",
    addressedTo: "All Registered Students (Batches 2021, 2022, 2023, 2024)",
    gazetteRecord: "#87",
    bodyParagraphs: [
      "The comprehensive timetable for End-Semester Theory Examinations (Regular and Arrear/Backlog papers) has been finalized following Senate ratification.",
      "Morning sessions operate from 09:30 to 12:30 IST. Afternoon sessions operate from 14:00 to 17:00 IST. Entry into exam halls is strictly prohibited without biometric RFID smart badge and physically printed hall ticket."
    ],
    timeline: [
      {
        date: "June 05, 2024",
        event: "CS301 Advanced Data Structures & Algorithms",
        venue: "Block B • Examination Hall 1",
        status: "Confirmed",
        statusStyle: "bg-secondary-container text-primary"
      },
      {
        date: "June 08, 2024",
        event: "CS302 Computer Architecture & Organization",
        venue: "Block B • Examination Hall 1",
        status: "Confirmed",
        statusStyle: "bg-secondary-container text-primary"
      },
      {
        date: "June 12, 2024",
        event: "MA301 Discrete Mathematics & Probability",
        venue: "Main Auditorium Block",
        status: "Confirmed",
        statusStyle: "bg-secondary-container text-primary"
      }
    ],
    signatureKey: "APX-EXAM-KEY: 44D91-2024-COE",
    signatory: {
      name: "Prof. Kenneth Sterling",
      title: "Controller of Examinations",
      dept: "Board of Examinations • Apex Institute"
    },
    enclosures: [
      { name: "Final_Datesheet_Spring_2025.pdf", size: "2.4 MB", type: "PDF Timetable" },
      { name: "Exam_Hall_Bylaws_Instructions.pdf", size: "620 KB", type: "Instructions" }
    ]
  },
  {
    id: "apx-82",
    circularRef: "APX/CIR/2024-82",
    title: "Distinguished Lecture on AI & Kernel Architecture by Dr. Elena Rostova",
    category: "events",
    categoryBadge: "Events & Workshops",
    badgeStyle: "bg-surface-container-high text-on-surface border border-[#c4c6cf]",
    date: "19 May 2024 • 14:00:00 IST",
    timeAgo: "5 days ago",
    isUnread: false,
    summary:
      "Dean of Research announces an interactive session in the Turing Main Auditorium featuring foundational microkernel optimizations for distributed transformer workloads.",
    subjectLine: "Distinguished Colloquium: Microkernels for High-Performance Distributed AI Systems",
    actionRequired: "Seating is limited to 280 registrants. Reserve token via portal.",
    authority: "Directorate of Research & Innovation",
    addressedTo: "Faculty, Research Scholars, and Final/Pre-Final Engineering Undergraduates",
    gazetteRecord: "#82",
    bodyParagraphs: [
      "We are delighted to host Dr. Elena Rostova, Principal Systems Architect at CERN / OpenKernel Labs, for a keynote colloquium examining hardware-software co-design in modern AI execution fabrics.",
      "The session includes live benchmarking demonstrations on heterogeneous compute clusters, followed by an informal 45-minute Q&A with doctoral and undergraduate attendees."
    ],
    timeline: [
      {
        date: "May 28 • 15:00 IST",
        event: "Keynote Lecture & Architecture Telemetry",
        venue: "Alan Turing Auditorium (North Campus)",
        status: "Registration Open",
        statusStyle: "bg-[#ecfdf5] text-[#047857]"
      },
      {
        date: "May 28 • 16:30 IST",
        event: "Interactive Q&A & Systems Research Mixer",
        venue: "Innovation Hub Lounge",
        status: "Tea Reception",
        statusStyle: "bg-surface-container text-on-surface"
      }
    ],
    signatureKey: "APX-RES-KEY: 12F08-2024-RST",
    signatory: {
      name: "Dr. Alan Turing Rao",
      title: "Director of Research & Innovation",
      dept: "Department of Computer Science & Engineering"
    },
    enclosures: [
      { name: "Colloquium_Speaker_Abstract.pdf", size: "850 KB", type: "Abstract" }
    ]
  },
  {
    id: "apx-79",
    circularRef: "APX/CIR/2024-79",
    title: "Fall 2024 Semester Fee Installment #3 Submission Window & Late Fee Waiver",
    category: "bursar",
    categoryBadge: "Bursar Office // Finance",
    badgeStyle: "bg-tertiary-container text-primary border border-[#93ccff]",
    date: "15 May 2024 • 09:00:00 IST",
    timeAgo: "9 days ago",
    isUnread: false,
    summary:
      "Official timeline for third tuition installment settlements, treasury clearing protocols, and conditional late charge relief parameters for eligible students.",
    subjectLine: "Promulgation of Fee Installment #3 Submission Window & Concession Protocols",
    actionRequired: "Payment Deadline: June 05, 2024 (Zero Late Penalty)",
    authority: "Chief Bursar • Office of Financial Administration",
    addressedTo: "All Students with Deferred or Installment Clearance Plans",
    gazetteRecord: "#79",
    bodyParagraphs: [
      "The Bursar Office announces that the payment gateway for Installment #3 (AY 2024-25) is currently live on the Student Portal. Students may settle balances using RTGS, NEFT, Net Banking or generated challan at Punjab National Bank counter branches.",
      "Accounts clearing dues prior to June 05 will automatically have the standard late fee surcharge waived on their ledger."
    ],
    signatureKey: "APX-FIN-KEY: 88A12-2024-BUR",
    signatory: {
      name: "Mr. Rajesh Kumar",
      title: "Chief Bursar & Comptroller of Accounts",
      dept: "Directorate of Financial Governance"
    },
    enclosures: [
      { name: "Challan_Counter_Instructions.pdf", size: "430 KB", type: "Payment Guide" }
    ]
  },
  {
    id: "apx-74",
    circularRef: "APX/CIR/2024-74",
    title: "Scheduled Campus Cloud Server & Student LMS Maintenance Window",
    category: "advisory",
    categoryBadge: "IT & Infrastructure",
    badgeStyle: "bg-surface-container-high text-on-surface border border-[#c4c6cf]",
    date: "10 May 2024 • 18:00:00 IST",
    timeAgo: "14 days ago",
    isUnread: false,
    summary:
      "High-performance compute clusters and centralized academic learning databases will undergo quarterly kernel patching and failover validation.",
    subjectLine: "Scheduled Infrastructure Maintenance & LMS Service Suspension",
    actionRequired: "Planned Downtime: Sunday May 19, 02:00 AM – 04:00 AM IST",
    authority: "Central IT & Campus Network Operations Center",
    addressedTo: "Campus-Wide Faculty, Staff, and Students",
    gazetteRecord: "#74",
    bodyParagraphs: [
      "Central IT will execute mandatory security kernel updates and storage replication failover drills across the campus virtualized cloud.",
      "All services including Student Portal, LMS Moodle cluster, and campus Wi-Fi authentication radius nodes will experience intermittent brief pauses during this two-hour maintenance window."
    ],
    signatureKey: "APX-IT-KEY: 77102-2024-NOC",
    signatory: {
      name: "Er. Vikram Sengupta",
      title: "Chief Information Security Officer",
      dept: "Central IT Infrastructure & Network Directorate"
    },
    enclosures: [
      { name: "Cloud_Status_Dashboard_Info.pdf", size: "290 KB", type: "Security Bulletin" }
    ]
  }
];

export default function StudentNoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>(noticesMasterData);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>("apx-88");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [feedView, setFeedView] = useState<"dual" | "condensed" | "chrono">("dual");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const markAllRead = () => {
    setNotices((prev) => prev.map((n) => ({ ...n, isUnread: false })));
    showToast("All campus notices marked as read!");
  };

  // Filtered notices
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesCategory =
        selectedCategory === "all" || notice.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.circularRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.authority.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [notices, selectedCategory, searchQuery]);

  const selectedNotice =
    notices.find((n) => n.id === selectedNoticeId) || filteredNotices[0] || notices[0];

  const handleSelectNotice = (id: string) => {
    setSelectedNoticeId(id);
    // Auto-mark as read
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
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

      {/* Command Strip / Master Context Header */}
      <div className="px-6 py-5 bg-surface-container-lowest border-b border-[#0D2545]/15 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-semibold">
                Student Portal
              </span>
              <span className="text-[11px] text-outline">/</span>
              <span className="text-[11px] font-mono text-secondary font-bold uppercase tracking-wider">
                Official Notices
              </span>
              <span className="ml-2 px-1.5 py-0.5 bg-secondary-container text-primary font-mono text-[10px] uppercase font-bold tracking-tight rounded-sm">
                Active Session
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-primary">
              Campus Notices, Circulars &amp; Student Bulletins
            </h1>
            <p className="text-xs font-mono text-on-surface-variant mt-0.5">
              Official institutional dispatches, examination datesheets, and student advisories.
            </p>
          </div>

          {/* Quick Telemetry & Feed Controls */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center bg-surface-container px-3 py-1.5 border border-[#cbd5e1] rounded-sm">
              <ShieldCheck className="h-4 w-4 text-secondary mr-2" />
              <span className="font-mono text-xs text-primary font-bold">LEDGER INTEGRITY: 100% OK</span>
            </div>
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider transition-colors border border-[#cbd5e1] shadow-sm rounded-sm"
            >
              <CheckCheck className="h-4 w-4 text-secondary" />
              <span>Mark Visible As Read</span>
            </button>
          </div>
        </div>

        {/* Live Search & Filtration Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3 mt-3 border-t border-[#0D2545]/10 items-center">
          <div className="lg:col-span-7 relative">
            <Search className="absolute left-3 top-2.5 text-on-surface-variant h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices by keyword, circular ref, or department..."
              className="w-full pl-9 pr-20 py-2 bg-surface text-on-surface font-mono text-xs border border-[#cbd5e1] focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline rounded-sm"
            />
            <span className="absolute right-3 top-2.5 font-mono text-[10px] text-outline uppercase tracking-wider hidden sm:inline-block">
              CTRL + K
            </span>
          </div>

          <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-2 overflow-x-auto">
            <span className="font-mono text-[11px] text-on-surface-variant uppercase whitespace-nowrap">
              Feed View:
            </span>
            <button
              onClick={() => setFeedView("dual")}
              className={`px-2.5 py-1.5 font-mono text-[11px] tracking-wide uppercase font-semibold transition-colors rounded-sm ${
                feedView === "dual"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface border border-[#cbd5e1]"
              }`}
            >
              Dual Pane
            </button>
            <button
              onClick={() => setFeedView("condensed")}
              className={`px-2.5 py-1.5 font-mono text-[11px] tracking-wide uppercase font-semibold transition-colors rounded-sm ${
                feedView === "condensed"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface border border-[#cbd5e1]"
              }`}
            >
              Condensed
            </button>
            <button
              onClick={() => setFeedView("chrono")}
              className={`px-2.5 py-1.5 font-mono text-[11px] tracking-wide uppercase font-semibold transition-colors rounded-sm ${
                feedView === "chrono"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container text-on-surface border border-[#cbd5e1]"
              }`}
            >
              Chronological
            </button>
          </div>
        </div>
      </div>

      {/* Operational Status Bar & Filter Tabs */}
      <div className="px-6 py-2 bg-surface-container-low border-b border-[#0D2545]/15 flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors rounded-sm font-bold ${
              selectedCategory === "all"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-lowest text-on-surface border border-[#cbd5e1] hover:bg-surface-container"
            }`}
          >
            All Notices ({notices.length})
          </button>
          <button
            onClick={() => setSelectedCategory("academic")}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors rounded-sm font-bold ${
              selectedCategory === "academic"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-lowest text-on-surface border border-[#cbd5e1] hover:bg-surface-container"
            }`}
          >
            Academic &amp; Datesheet (2)
          </button>
          <button
            onClick={() => setSelectedCategory("bursar")}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors rounded-sm font-bold ${
              selectedCategory === "bursar"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-lowest text-on-surface border border-[#cbd5e1] hover:bg-surface-container"
            }`}
          >
            Bursar &amp; Fees (1)
          </button>
          <button
            onClick={() => setSelectedCategory("events")}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors rounded-sm font-bold ${
              selectedCategory === "events"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-lowest text-on-surface border border-[#cbd5e1] hover:bg-surface-container"
            }`}
          >
            Events &amp; Guest Lectures (1)
          </button>
          <button
            onClick={() => setSelectedCategory("advisory")}
            className={`px-3 py-1 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-colors rounded-sm font-bold ${
              selectedCategory === "advisory"
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-lowest text-on-surface border border-[#cbd5e1] hover:bg-surface-container"
            }`}
          >
            Emergency &amp; Advisories (1)
          </button>
        </div>

        {/* Auxiliary Sync Timestamp */}
        <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
          <span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse"></span>
          <span className="text-[11px] uppercase tracking-wider">Sync: May 24, 2024 • 14:32:09 IST</span>
        </div>
      </div>

      {/* Primary Operations Surface: 45/55 Dual-Pane Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full flex-1">
        {/* LEFT PANEL: Master Notice Feed (5 Cols) */}
        <section className="lg:col-span-5 bg-surface-container-lowest border-r border-[#0D2545]/15 flex flex-col justify-between overflow-y-auto min-h-[500px]">
          <div>
            {/* Stream Header */}
            <div className="px-5 py-2.5 bg-surface-container-high/60 border-b border-[#0D2545]/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-secondary" />
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                  Dispatch Feed
                </span>
                <span className="px-1.5 py-0.5 bg-secondary-container text-primary font-mono text-[10px] font-bold rounded-xs">
                  {filteredNotices.length} ITEMS
                </span>
              </div>
              <span className="font-mono text-[11px] text-outline">SORT: NEWEST FIRST</span>
            </div>

            {/* Feed List Items */}
            <div className="divide-y divide-[#0D2545]/10">
              {filteredNotices.map((notice) => {
                const isSelected = selectedNotice.id === notice.id;
                return (
                  <article
                    key={notice.id}
                    onClick={() => handleSelectNotice(notice.id)}
                    className={`cursor-pointer p-4 transition-all relative ${
                      isSelected
                        ? "bg-surface-container border-l-4 border-primary"
                        : "bg-surface-container-lowest hover:bg-surface-container-low border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-2 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider rounded-xs ${notice.badgeStyle}`}
                        >
                          {notice.categoryBadge}
                        </span>
                        <span className="font-mono text-[11px] text-outline font-semibold">
                          {notice.circularRef}
                        </span>
                      </div>
                      {notice.isUnread && (
                        <span className="px-1.5 py-0.2 bg-error text-on-error font-mono text-[10px] uppercase font-bold tracking-wider animate-pulse rounded-xs">
                          Unread
                        </span>
                      )}
                    </div>

                    <h2
                      className={`text-sm font-bold uppercase leading-snug tracking-tight ${
                        isSelected ? "text-primary" : "text-on-surface hover:text-primary"
                      }`}
                    >
                      {notice.title}
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-1.5 line-clamp-2 leading-relaxed">
                      {notice.summary}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-[#0D2545]/10 flex items-center justify-between text-outline font-mono text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-secondary" />
                        <span>{notice.timeAgo}</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-bold uppercase">
                        <span>Inspect</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </article>
                );
              })}

              {filteredNotices.length === 0 && (
                <div className="p-8 text-center text-xs font-mono text-outline">
                  No circulars matched the specified keyword or category.
                </div>
              )}
            </div>
          </div>

          {/* Feed Pagination */}
          <div className="p-4 bg-surface-container-low border-t border-[#0D2545]/10 flex items-center justify-between">
            <div className="font-mono text-xs text-on-surface-variant">
              SHOWING <span className="font-bold text-primary">{filteredNotices.length}</span> OF 14 CIRCULARS
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled
                className="w-7 h-7 flex items-center justify-center bg-surface-container-lowest text-on-surface border border-[#cbd5e1] disabled:opacity-40 rounded-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-2 font-mono text-xs text-on-surface font-semibold">PAGE 01</span>
              <button
                disabled
                className="w-7 h-7 flex items-center justify-center bg-surface-container-lowest text-on-surface border border-[#cbd5e1] disabled:opacity-40 rounded-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT PANEL: Formal Institutional Notice Reader (7 Cols) */}
        <main className="lg:col-span-7 bg-surface p-6 flex flex-col gap-6 overflow-y-auto">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-secondary inline-block rounded-full animate-ping"></span>
              <span className="font-mono text-xs text-primary font-bold uppercase tracking-wider">
                OFFICIAL GAZETTE RECORD {selectedNotice.gazetteRecord}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => showToast(`Downloading official signed circular: ${selectedNotice.circularRef}...`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-sm rounded-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Vector PDF</span>
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider border border-[#cbd5e1] transition-colors rounded-sm"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Circular</span>
              </button>
              <button
                onClick={() => showToast("Directive milestone added to Academic Calendar.")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-secondary-container text-secondary font-mono text-xs uppercase font-bold tracking-wider border border-[#cbd5e1] transition-colors rounded-sm"
              >
                <CalendarPlus className="h-3.5 w-3.5" />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>

          {/* Institutional Letterhead Parchment Container */}
          <article className="bg-surface-container-lowest p-8 border border-[#cbd5e1] shadow-sm relative">
            {/* Top Blueprint Architectural Bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-secondary-container -mt-8 -mx-8 mb-8"></div>

            {/* Official Letterhead Header */}
            <header className="pb-6 border-b-2 border-primary mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Crest and Identity */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center font-black text-xl rounded-sm shadow-md">
                    A
                  </div>
                  <div>
                    <div className="text-base uppercase font-bold tracking-tight text-primary">
                      Apex Institute of Technology
                    </div>
                    <div className="font-mono text-[11px] text-on-surface-variant uppercase tracking-widest font-semibold">
                      Autonomous Campus • Directorate of Academic Governance
                    </div>
                    <div className="text-[11px] text-outline font-mono">
                      Sector 12, Academic Knowledge Corridor • Gazette Portal ID: APX-ACAD-2024
                    </div>
                  </div>
                </div>

                {/* Verification Seal Chip */}
                <div className="bg-surface-container px-3 py-2 text-right border border-[#cbd5e1] self-stretch sm:self-auto flex sm:flex-col justify-between sm:justify-center items-end rounded-sm">
                  <span className="text-[10px] text-outline uppercase tracking-wider font-bold font-mono">
                    DISPATCH REF
                  </span>
                  <span className="font-mono text-xs text-primary font-bold">{selectedNotice.circularRef}</span>
                  <span className="font-mono text-[10px] text-secondary font-semibold">SHA-256 VERIFIED</span>
                </div>
              </div>
            </header>

            {/* Circular Metadata Ledger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-low p-4 border border-[#cbd5e1] mb-6 rounded-sm">
              <div>
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block">
                  Date of Promulgation:
                </span>
                <span className="font-mono text-xs text-on-surface font-semibold">{selectedNotice.date}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block">
                  Issuing Authority:
                </span>
                <span className="text-xs text-primary font-semibold">{selectedNotice.authority}</span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-[#cbd5e1]">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block">
                  Addressed Cohort:
                </span>
                <span className="text-xs text-on-surface">{selectedNotice.addressedTo}</span>
              </div>
            </div>

            {/* Subject Line */}
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-secondary font-bold">
                Subject Matter //
              </span>
              <h2 className="text-lg md:text-xl font-bold text-primary tracking-tight mt-1 leading-snug">
                {selectedNotice.subjectLine}
              </h2>
            </div>

            {/* Directive Callout Banner */}
            {selectedNotice.actionRequired && (
              <div className="bg-[#fef2f2] text-error p-4 border-l-4 border-error mb-6 flex items-start gap-3 rounded-r-sm">
                <AlertTriangle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-error">
                    {selectedNotice.actionRequired}
                  </div>
                  <div className="text-[11px] mt-0.5 text-on-surface-variant">
                    Late repositories will not be granted evaluator access. System automations will lock git hashes at the exact cutoff timestamp.
                  </div>
                </div>
              </div>
            )}

            {/* Body Copy */}
            <div className="space-y-4 text-xs leading-relaxed text-on-surface mb-6">
              {selectedNotice.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              {/* Structured Deliverables Matrix */}
              {selectedNotice.deliverables && (
                <div className="border border-[#cbd5e1] bg-surface-container-lowest mt-4 rounded-sm overflow-hidden">
                  <div className="bg-surface-container px-4 py-2 font-mono text-[11px] uppercase font-bold text-primary tracking-wider border-b border-[#cbd5e1]">
                    Mandatory Deliverable Matrix &amp; Verification Checks
                  </div>
                  <div className="divide-y divide-[#cbd5e1]">
                    {selectedNotice.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="p-2.5 flex items-start justify-between gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          <span className="font-medium text-primary">{item.title}</span>
                        </div>
                        <span className="font-mono text-[11px] text-on-surface-variant">{item.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Schedule Phase Table */}
            {selectedNotice.timeline && (
              <div className="mb-6">
                <div className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-2">
                  Phase-Wise Operational Timeline
                </div>
                <div className="overflow-x-auto border border-[#cbd5e1] rounded-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-container font-mono text-[10px] text-primary uppercase border-b border-[#cbd5e1]">
                      <tr>
                        <th className="py-2 px-3">Date Window</th>
                        <th className="py-2 px-3">Protocol Event</th>
                        <th className="py-2 px-3">Venue / Platform</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#cbd5e1] font-mono text-[11px]">
                      {selectedNotice.timeline.map((row, tIdx) => (
                        <tr key={tIdx} className="hover:bg-surface-container-low transition-colors">
                          <td className="py-2 px-3 font-semibold text-primary">{row.date}</td>
                          <td className="py-2 px-3 text-on-surface">{row.event}</td>
                          <td className="py-2 px-3 text-on-surface-variant">{row.venue}</td>
                          <td className="py-2 px-3">
                            <span className={`px-1.5 py-0.5 text-[10px] uppercase font-bold rounded-xs ${row.statusStyle}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Verification, Digital Seal & Signatures Footer */}
            <footer className="pt-6 border-t-2 border-primary mt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              {/* Digital Watermark */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-container text-secondary flex items-center justify-center border border-[#cbd5e1] rounded-sm">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="font-mono text-[11px] font-bold text-primary">{selectedNotice.signatureKey}</div>
                  <div className="font-mono text-[10px] text-outline">Digital Timestamp: {selectedNotice.date}</div>
                  <div className="text-[10px] text-[#047857] font-mono uppercase font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="h-3 w-3" />
                    Valid Institutional Signature
                  </div>
                </div>
              </div>

              {/* Signatory Profile */}
              <div className="text-left md:text-right">
                <div className="text-sm text-primary font-bold">{selectedNotice.signatory.name}</div>
                <div className="font-mono text-xs text-on-surface-variant">{selectedNotice.signatory.title}</div>
                <div className="text-[11px] text-outline">{selectedNotice.signatory.dept}</div>
              </div>
            </footer>
          </article>

          {/* Attached Enclosures Panel */}
          <section className="bg-surface-container-lowest p-5 border border-[#cbd5e1] shadow-sm rounded-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Paperclip className="h-4 w-4 text-secondary" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-primary">
                  Official Attached Enclosures ({selectedNotice.enclosures.length} Files)
                </span>
              </div>
              <span className="font-mono text-[11px] text-outline">SECURITY SCANNED: CLEAN</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedNotice.enclosures.map((enc, eIdx) => (
                <div
                  key={eIdx}
                  className="p-3 bg-surface-container-low border border-[#cbd5e1] flex items-center justify-between group hover:bg-surface-container transition-colors rounded-sm"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <div className="truncate">
                      <div className="font-mono text-[11px] font-bold text-primary truncate">{enc.name}</div>
                      <div className="font-mono text-[10px] text-outline">
                        {enc.size} • {enc.type}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Downloading ${enc.name}...`)}
                    className="p-1 text-on-surface-variant hover:text-primary transition-colors shrink-0"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Help Desk Inquiry Bar */}
          <div className="p-4 bg-surface-container border border-[#cbd5e1] flex flex-wrap items-center justify-between gap-3 rounded-sm">
            <div className="flex items-center gap-2.5 text-xs">
              <MessageSquare className="h-4 w-4 text-secondary" />
              <span className="text-on-surface">
                Questions regarding this circular? Contact the <strong>Academic Dispatch Liaison</strong> desk.
              </span>
            </div>
            <button
              onClick={() => showToast("Direct liaison inquiry opened. Ticket #NOT-8819 created.")}
              className="px-3.5 py-1.5 bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold tracking-wider transition-colors rounded-sm"
            >
              Contact Academic Desk
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

