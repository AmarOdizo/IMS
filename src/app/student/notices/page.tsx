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
  ArrowRight,
  BadgeAlert,
  CalendarDays,
  FileSpreadsheet,
} from "lucide-react";

interface NoticeItem {
  id: string;
  circularRef: string;
  title: string;
  category: "academic" | "fees" | "events" | "advisory";
  categoryLabel: string;
  categoryBadgeStyle: string;
  date: string;
  timeAgo: string;
  isUnread: boolean;
  isUrgent?: boolean;
  summary: string;
  subjectLine: string;
  actionRequired?: string;
  authority: string;
  addressedTo: string;
  bodyParagraphs: string[];
  deliverables?: { title: string; spec: string }[];
  timeline?: { date: string; event: string; venue: string; status: string }[];
  signatory: { name: string; title: string; dept: string };
  enclosures: { name: string; size: string; type: string }[];
}

const noticesMasterData: NoticeItem[] = [
  {
    id: "apx-88",
    circularRef: "APX/CIR/2025/088",
    title: "Mid-Term Project Submission Deadline & Viva Voce Schedule AY 2024-25",
    category: "academic",
    categoryLabel: "Academic & Exam",
    categoryBadgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    date: "12 May 2025 &bull; 11:30 AM",
    timeAgo: "2 hours ago",
    isUnread: true,
    isUrgent: true,
    summary:
      "Mandatory guidelines for 4th Semester B.Tech project report submission, GitHub repository freeze, and internal committee viva schedule.",
    subjectLine:
      "Schedule for Semester IV Mini-Project Submission and Viva-Voce Examination for Academic Year 2024–25",
    actionRequired: "Strict Submission Deadline: 25 May 2025 (5:00 PM IST)",
    authority: "Office of Dean Academics &bull; Dr. Alistair Chen",
    addressedTo:
      "All 2nd Year B.Tech Students (Batch 2023–27), Project Faculty Guides & Department Coordinators",
    bodyParagraphs: [
      "This is to inform all second-year B.Tech students (Semester IV) that the project portal for submitting the Semester Mini-Project report and source code documentation will close on 25 May 2025 at 5:00 PM IST.",
      "Students must upload their project synopsis, final PDF report in the prescribed IEEE format, and verified code links. The physical viva-voce evaluation will be conducted between 28 May and 02 June 2025 by the departmental review committee.",
      "Failure to present the project work before the designated committee within the stipulated timeframe will result in the forfeiture of practical evaluation marks for the semester."
    ],
    deliverables: [
      { title: "Final Project Report (IEEE Format)", spec: "PDF Document (.pdf) &bull; Max 20 MB" },
      { title: "Project Source Code / Repository Link", spec: "Verified Departmental Git / GitHub Link" },
      { title: "Faculty Guide Approval Certificate", spec: "Signed by Assigned Project Mentor" }
    ],
    timeline: [
      {
        date: "15 May – 20 May 2025",
        event: "Draft Report Review & Guide Verification",
        venue: "Department of CSE &bull; Respective Faculty Cabins",
        status: "Ongoing"
      },
      {
        date: "25 May 2025 (5:00 PM)",
        event: "Final Report & Code Submission Cutoff",
        venue: "Student Academic Portal (Online)",
        status: "Upcoming Deadline"
      },
      {
        date: "28 May – 02 Jun 2025",
        event: "In-Person Project Viva-Voce Examination",
        venue: "Computer Center &bull; Software Lab 3 & 4",
        status: "Scheduled"
      }
    ],
    signatory: {
      name: "Dr. Alistair Chen",
      title: "Dean of Academic Affairs",
      dept: "Apex Institute of Technology & Management"
    },
    enclosures: [
      { name: "Project_Report_Template_IEEE.docx", size: "640 KB", type: "Word Document" },
      { name: "Viva_Evaluation_Rubric_2025.pdf", size: "420 KB", type: "PDF Document" },
      { name: "Guide_Allotment_List_CSE.pdf", size: "850 KB", type: "PDF List" }
    ]
  },
  {
    id: "apx-87",
    circularRef: "APX/CIR/2025/087",
    title: "Final Datesheet for End-Semester Theory Examinations (Even Semester)",
    category: "academic",
    categoryLabel: "Examination Schedule",
    categoryBadgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
    date: "10 May 2025 &bull; 02:00 PM",
    timeAgo: "2 days ago",
    isUnread: false,
    isUrgent: true,
    summary:
      "Controller of Examinations announces the finalized timetable for B.Tech Semester IV regular and backlog written examinations.",
    subjectLine:
      "Final Schedule for End-Semester Theory Examinations – Even Semester (AY 2024–25)",
    actionRequired: "Admit Card Download Available from 20 May 2025",
    authority: "Office of the Controller of Examinations &bull; Dr. K. N. Murthy",
    addressedTo: "All Enrolled Students (B.Tech, M.Tech & BCA Programs)",
    bodyParagraphs: [
      "The comprehensive timetable for the upcoming End-Semester Theory Examinations (Regular and Arrear/Backlog papers) for Even Semester 2024–25 has been ratified by the Academic Council.",
      "Morning sessions will be conducted from 10:00 AM to 1:00 PM, and Afternoon sessions from 2:00 PM to 5:00 PM. Students must carry their official Student ID Card and printed Admit Card to gain entrance into the examination hall.",
      "No electronic gadgets, smartwatches, or unauthorized study materials are permitted inside the examination halls. Candidates are advised to report 30 minutes prior to the commencement of each session."
    ],
    timeline: [
      {
        date: "05 June 2025",
        event: "CS401: Database Management Systems",
        venue: "Examination Block B &bull; Hall 201",
        status: "Morning (10:00 AM - 1:00 PM)"
      },
      {
        date: "08 June 2025",
        event: "CS402: Operating Systems & Systems Programming",
        venue: "Examination Block B &bull; Hall 201",
        status: "Morning (10:00 AM - 1:00 PM)"
      },
      {
        date: "11 June 2025",
        event: "CS403: Design & Analysis of Algorithms",
        venue: "Examination Block B &bull; Hall 204",
        status: "Morning (10:00 AM - 1:00 PM)"
      },
      {
        date: "14 June 2025",
        event: "MA401: Discrete Mathematics & Graph Theory",
        venue: "Examination Block A &bull; Main Auditorium",
        status: "Morning (10:00 AM - 1:00 PM)"
      }
    ],
    signatory: {
      name: "Dr. K. N. Murthy",
      title: "Controller of Examinations & Registrar",
      dept: "Apex Institute of Technology & Management"
    },
    enclosures: [
      { name: "Final_Datesheet_Even_Sem_2025.pdf", size: "1.8 MB", type: "PDF Schedule" },
      { name: "Exam_Hall_Instructions_Students.pdf", size: "510 KB", type: "PDF Guidelines" }
    ]
  },
  {
    id: "apx-82",
    circularRef: "APX/CIR/2025/082",
    title: "Distinguished Guest Lecture on Cloud Architecture & AI Systems",
    category: "events",
    categoryLabel: "Guest Lecture & Seminar",
    categoryBadgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
    date: "08 May 2025 &bull; 04:15 PM",
    timeAgo: "4 days ago",
    isUnread: false,
    summary:
      "Department of CSE cordially invites students to an interactive industry session with Dr. Arvind Menon, Principal Systems Architect.",
    subjectLine:
      "Special Technical Session: Scalable Cloud Architecture & Distributed AI Workloads",
    actionRequired: "Pre-registration required for seminar certificate of attendance",
    authority: "Department of Computer Science & Engineering",
    addressedTo: "2nd, 3rd, and 4th Year Computer Science & Engineering Students",
    bodyParagraphs: [
      "The Department of Computer Science & Engineering is organizing a distinguished technical guest lecture by Dr. Arvind Menon (Distinguished Cloud Architect at Apex Cloud Labs) on Saturday, 18 May 2025.",
      "The lecture will explore the practical engineering of large-scale distributed systems, microservices architectures, and hardware acceleration for generative AI pipelines. A hands-on live demo on multi-region Kubernetes clusters will follow the presentation.",
      "Attendance is strongly recommended for students enrolled in Operating Systems and Database Systems. E-certificates will be awarded to registered attendees."
    ],
    timeline: [
      {
        date: "18 May 2025 &bull; 10:30 AM",
        event: "Welcome Address & Keynote Lecture",
        venue: "Sir C.V. Raman Auditorium (Central Block)",
        status: "Confirmed"
      },
      {
        date: "18 May 2025 &bull; 12:00 PM",
        event: "Interactive Q&A & Architecture Case Study",
        venue: "Sir C.V. Raman Auditorium",
        status: "Open Session"
      }
    ],
    signatory: {
      name: "Dr. Meera Nambiar",
      title: "Professor & Head of Department",
      dept: "Department of Computer Science & Engineering"
    },
    enclosures: [
      { name: "Seminar_Flyer_Cloud_AI.pdf", size: "1.1 MB", type: "Poster / Flyer" }
    ]
  },
  {
    id: "apx-79",
    circularRef: "APX/CIR/2025/079",
    title: "Semester Fee Installment #3 Payment Window & Schedule",
    category: "fees",
    categoryLabel: "Fee & Accounts",
    categoryBadgeStyle: "bg-amber-50 text-amber-800 border-amber-200",
    date: "02 May 2025 &bull; 10:00 AM",
    timeAgo: "10 days ago",
    isUnread: false,
    summary:
      "Finance Office announces payment schedule for remaining tuition installment (₹25,000) for Academic Year 2024–25.",
    subjectLine:
      "Notice for Submission of Semester Fee Installment #3 for Even Semester 2024–25",
    actionRequired: "Due Date: 20 May 2025 (Standard Period without late fee)",
    authority: "Office of the Finance Officer &bull; Mr. Rajesh Kumar",
    addressedTo: "All Students with Pending Semester Fee Installments",
    bodyParagraphs: [
      "Students who have opted for the installment payment schedule for the academic year 2024–25 are hereby reminded that Installment #3 (Final Semester Installment of ₹25,000) is due for clearance by 20 May 2025.",
      "Online fee payments can be completed seamlessly via the Student Portal Fees Module using UPI, Net Banking, Credit/Debit Card, or via Challan at Punjab National Bank counter on campus.",
      "Students clearing their dues on or before the due date will receive immediate digital fee clearance receipts for semester exam hall ticket generation."
    ],
    signatory: {
      name: "Mr. Rajesh Kumar",
      title: "Chief Accounts Officer",
      dept: "Finance & Accounts Section &bull; Apex Institute"
    },
    enclosures: [
      { name: "Online_Fee_Payment_Step_Guide.pdf", size: "380 KB", type: "Payment Manual" },
      { name: "Bank_Challan_Form_PNB.pdf", size: "290 KB", type: "Printable Challan" }
    ]
  },
  {
    id: "apx-74",
    circularRef: "APX/CIR/2025/074",
    title: "Scheduled Campus Wi-Fi & Student Portal Maintenance Window",
    category: "advisory",
    categoryLabel: "Campus Advisory",
    categoryBadgeStyle: "bg-slate-100 text-slate-700 border-slate-200",
    date: "28 April 2025 &bull; 05:00 PM",
    timeAgo: "2 weeks ago",
    isUnread: false,
    summary:
      "Central IT services routine infrastructure upgrade and server routine maintenance on Sunday early morning.",
    subjectLine:
      "Advisory Regarding Scheduled Server Upgrades & Temporary Portal Downtime",
    actionRequired: "Maintenance Window: Sunday, 04 May 2025 &bull; 2:00 AM to 5:00 AM",
    authority: "Central IT & Campus Network Operations Center",
    addressedTo: "All Students, Faculty Members, and Campus Residents",
    bodyParagraphs: [
      "The Central IT Infrastructure Team will be carrying out scheduled network enhancements and server security updates on Sunday, 04 May 2025, between 2:00 AM and 5:00 AM IST.",
      "During this short window of 3 hours, the Student Academic Portal, Campus Wi-Fi authentication services, and LMS library servers may experience brief intermittent disruptions.",
      "All services will be fully restored before 5:30 AM. We apologize for any temporary inconvenience caused during this maintenance cycle."
    ],
    signatory: {
      name: "Er. Vikram Sengupta",
      title: "Head, Central IT Services",
      dept: "Campus IT & Network Operations Center"
    },
    enclosures: [
      { name: "IT_Services_Status_Guide.pdf", size: "210 KB", type: "Advisory Circular" }
    ]
  }
];

export default function StudentNoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>(noticesMasterData);
  const [selectedNoticeId, setSelectedNoticeId] = useState<string>("apx-88");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
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
        notice.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [notices, selectedCategory, searchQuery]);

  const selectedNotice =
    notices.find((n) => n.id === selectedNoticeId) || filteredNotices[0] || notices[0];

  const handleSelectNotice = (id: string) => {
    setSelectedNoticeId(id);
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto font-sans text-slate-800">
      {/* Print Specific CSS to isolate Selected Notice on 1 clean Page */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-circular, #printable-circular * {
            visibility: visible;
          }
          #printable-circular {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20mm;
            background: white !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom no-print">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header & Master Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-200/80 shadow-xs no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Campus Notices &amp; Circulars
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 text-[#355C7D] border border-blue-200 text-xs font-semibold rounded-full">
              Even Semester 2024–25
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Official university announcements, datesheets, and academic advisories &bull; Rahul Sharma (23CS042)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#355C7D]" />
            <span>Mark All as Read</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#355C7D] hover:bg-[#2A4963] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Current Notice</span>
          </button>
        </div>
      </div>

      {/* 4 Summary / Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        {/* Card 1: Total Circulars */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#355C7D] flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Active Notices
            </span>
            <span className="text-base font-bold text-slate-800">{notices.length} Published</span>
            <span className="text-[11px] text-slate-500 block">Session 2024–25</span>
          </div>
        </div>

        {/* Card 2: Urgent Action */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <BadgeAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Action Required
            </span>
            <span className="text-base font-bold text-rose-600">2 Urgent</span>
            <span className="text-[11px] text-slate-500 block">Project &amp; Exam Dates</span>
          </div>
        </div>

        {/* Card 3: Academic Circulars */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-[#3D405B] flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Academic &amp; Exams
            </span>
            <span className="text-base font-bold text-slate-800">2 Circulars</span>
            <span className="text-[11px] text-emerald-600 font-medium block">Timetable Verified</span>
          </div>
        </div>

        {/* Card 4: Financial & Admin */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Finance &amp; Admin
            </span>
            <span className="text-base font-bold text-slate-800">3 Notices</span>
            <span className="text-[11px] text-slate-500 block">Fee Window &amp; IT Update</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 no-print">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All Notices", count: notices.length },
            { id: "academic", label: "Academic & Exams", count: 2 },
            { id: "fees", label: "Fees & Finance", count: 1 },
            { id: "events", label: "Events & Seminars", count: 1 },
            { id: "advisory", label: "Campus Advisories", count: 1 },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#355C7D] text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search circulars, ref, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#355C7D] transition-all"
          />
        </div>
      </div>

      {/* Primary Split View: Left Notice Feed (5 Cols) + Right Official Letterhead (7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================== */}
        {/* LEFT PANEL: Notice Dispatch Feed (5 Cols)                  */}
        {/* ========================================================== */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden no-print">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#355C7D]" />
              <span className="text-xs font-bold text-[#3D405B] uppercase tracking-wider">
                Official Circular Feed
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredNotices.length} items
            </span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[720px] overflow-y-auto">
            {filteredNotices.map((notice) => {
              const isSelected = selectedNotice.id === notice.id;
              return (
                <div
                  key={notice.id}
                  onClick={() => handleSelectNotice(notice.id)}
                  className={`p-4 transition-all cursor-pointer relative ${
                    isSelected
                      ? "bg-blue-50/60 border-l-4 border-[#355C7D]"
                      : "hover:bg-slate-50 border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${notice.categoryBadgeStyle}`}
                      >
                        {notice.categoryLabel}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 font-semibold">
                        {notice.circularRef}
                      </span>
                    </div>
                    {notice.isUnread && (
                      <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[9px] font-bold rounded-full animate-pulse">
                        New
                      </span>
                    )}
                  </div>

                  <h2
                    className={`text-sm font-bold leading-snug line-clamp-2 ${
                      isSelected ? "text-[#355C7D]" : "text-slate-800"
                    }`}
                  >
                    {notice.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {notice.summary}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{notice.timeAgo}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#355C7D] font-semibold text-xs">
                      <span>View Notice</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredNotices.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400">
                No circulars found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* ========================================================== */}
        {/* RIGHT PANEL: Official Circular Letterhead View (7 Cols)   */}
        {/* ========================================================== */}
        <div className="lg:col-span-7 space-y-4">
          {/* Action Toolbar above letterhead */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-700">
                Official Gazette Ref: {selectedNotice.circularRef}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  showToast(`Downloading official circular: ${selectedNotice.circularRef}...`)
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#355C7D]" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#355C7D] hover:bg-[#2A4963] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => showToast("Added to student academic calendar.")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#355C7D] border border-blue-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>

          {/* Institutional Letterhead Container */}
          <div
            id="printable-circular"
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs relative text-slate-800"
          >
            {/* Top Navy Accent Strip */}
            <div className="h-2 bg-gradient-to-r from-[#355C7D] via-[#3D405B] to-[#2E3046] -mt-6 sm:-mt-8 -mx-6 sm:-mx-8 mb-6 rounded-t-2xl"></div>

            {/* Official Letterhead Header */}
            <div className="pb-5 border-b-2 border-slate-200 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#355C7D] text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                  AIT
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#3D405B] uppercase tracking-wide leading-tight">
                    Apex Institute of Technology &amp; Management
                  </h2>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Sector 12, Academic Knowledge Corridor &bull; Delhi-NCR, India
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Accredited Autonomous Institution &bull; Web: www.apex.edu.in
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-right sm:text-right shrink-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  Circular Reference
                </span>
                <span className="font-mono text-xs font-bold text-[#355C7D] block">
                  {selectedNotice.circularRef}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">
                  Verified Official Dispatch
                </span>
              </div>
            </div>

            {/* Circular Metadata Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-6 text-xs">
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Date of Issue:
                </span>
                <span className="font-semibold text-slate-800">{selectedNotice.date}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Issuing Authority:
                </span>
                <span className="font-semibold text-[#355C7D]">{selectedNotice.authority}</span>
              </div>
              <div className="sm:col-span-2 pt-2 border-t border-slate-200">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Addressed To:
                </span>
                <span className="text-slate-700">{selectedNotice.addressedTo}</span>
              </div>
            </div>

            {/* Subject Line */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#355C7D]">
                SUBJECT:
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#3D405B] mt-0.5 leading-snug">
                {selectedNotice.subjectLine}
              </h3>
            </div>

            {/* Urgent Action Callout */}
            {selectedNotice.actionRequired && (
              <div className="bg-rose-50 border-l-4 border-rose-500 p-3.5 rounded-r-xl mb-6 flex items-start gap-3 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-800 block">
                    {selectedNotice.actionRequired}
                  </span>
                  <span className="text-rose-700 text-[11px] mt-0.5 block">
                    Please ensure strict adherence to the stated timelines to avoid academic delays.
                  </span>
                </div>
              </div>
            )}

            {/* Body Paragraphs */}
            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed mb-6">
              {selectedNotice.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              {/* Deliverables Checklist if available */}
              {selectedNotice.deliverables && (
                <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                  <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-[#3D405B] uppercase tracking-wider border-b border-slate-200">
                    Mandatory Submission Checklist
                  </div>
                  <div className="divide-y divide-slate-200">
                    {selectedNotice.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="p-2.5 px-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="font-medium text-slate-800">{item.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">{item.spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Schedule Timeline Table if available */}
            {selectedNotice.timeline && (
              <div className="mb-6">
                <h4 className="text-xs font-bold text-[#3D405B] uppercase tracking-wider mb-2">
                  Key Milestones &amp; Examination Schedule
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3.5">Date &amp; Time</th>
                        <th className="py-2.5 px-3.5">Event / Subject</th>
                        <th className="py-2.5 px-3.5">Venue</th>
                        <th className="py-2.5 px-3.5">Status / Session</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {selectedNotice.timeline.map((row, tIdx) => (
                        <tr key={tIdx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3.5 font-bold text-[#355C7D] whitespace-nowrap">
                            {row.date}
                          </td>
                          <td className="py-2.5 px-3.5 text-slate-800 font-medium">{row.event}</td>
                          <td className="py-2.5 px-3.5 text-slate-500">{row.venue}</td>
                          <td className="py-2.5 px-3.5">
                            <span className="px-2 py-0.5 bg-blue-50 text-[#355C7D] font-semibold text-[10px] rounded-full border border-blue-200">
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

            {/* Official Signatory Footer */}
            <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Officially Signed &amp; Ratified</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Internal Communications Registry &bull; Apex Academic Senate
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="h-6 flex items-center sm:justify-end font-serif italic text-[#355C7D] text-sm font-bold">
                  {selectedNotice.signatory.name}
                </div>
                <div className="text-xs font-bold text-slate-800">{selectedNotice.signatory.name}</div>
                <div className="text-[11px] text-slate-500">{selectedNotice.signatory.title}</div>
                <div className="text-[10px] text-slate-400">{selectedNotice.signatory.dept}</div>
              </div>
            </div>
          </div>

          {/* Enclosures & Attachments Section */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs no-print">
            <div className="flex items-center gap-2 mb-3">
              <Paperclip className="w-4 h-4 text-[#355C7D]" />
              <h4 className="text-xs font-bold text-[#3D405B] uppercase tracking-wider">
                Official Attachments ({selectedNotice.enclosures.length} Files)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {selectedNotice.enclosures.map((enc, eIdx) => (
                <div
                  key={eIdx}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className="w-4 h-4 text-[#355C7D] shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-800 truncate">{enc.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {enc.size} &bull; {enc.type}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast(`Downloading ${enc.name}...`)}
                    className="p-1.5 text-slate-400 hover:text-[#355C7D] transition-colors shrink-0 cursor-pointer"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Helpdesk Quick Contact */}
          <div className="p-4 bg-slate-100/80 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs no-print">
            <div className="flex items-center gap-2 text-slate-700">
              <MessageSquare className="w-4 h-4 text-[#355C7D] shrink-0" />
              <span>
                Have questions regarding this circular? Contact the <strong>Academic Affairs Cell</strong>.
              </span>
            </div>
            <button
              onClick={() => showToast("Academic Helpdesk query initiated (#TKT-9912).")}
              className="px-3.5 py-1.5 bg-[#355C7D] hover:bg-[#2A4963] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              Contact Academic Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
