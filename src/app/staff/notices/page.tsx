"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Filter,
  PlusCircle,
  Clock,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  X,
  Send,
  Paperclip,
  FileText,
  Users,
  Eye,
  Edit3,
  Archive,
  MessageSquare,
  Sparkles,
  Layers,
  Calendar,
  Check,
  Radio,
  BookOpen,
  Megaphone,
  Share2
} from "lucide-react";

interface FacultyNotice {
  id: string;
  ref: string;
  title: string;
  category: "urgent" | "event" | "remedial" | "institutional" | "academic";
  categoryBadge: string;
  badgeStyle: string;
  targetScope: string;
  batchCode?: string;
  body: string;
  publishedDate: string;
  author: string;
  attachment?: { name: string; size: string };
  receipts: { total: number; confirmed: number; pct: number };
  isMyPublished: boolean;
}

const initialNoticesList: FacultyNotice[] = [
  {
    id: "not-1",
    ref: "SIT-25-NT-089",
    title: "Mid-Term Assessment Lab Submission & Git Repository Freeze",
    category: "urgent",
    categoryBadge: "Urgent Academic Action",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    targetScope: "B.Tech CSE - 4th Sem (Sec A & B) • CS-401 & CS-405L",
    batchCode: "CS-401 / CS-405L",
    body: "All students are required to push final commit logs for the Distributed Database synchronization assignments. The institutional GitLab server will switch to read-only mode precisely at 23:59 IST today. Late submissions will attract a 15% evaluation penalty.",
    publishedDate: "Today • 04:30 PM",
    author: "Prof. Rajesh Sharma (You)",
    attachment: { name: "rubric_v4_distributed_db.pdf", size: "1.8 MB" },
    receipts: { total: 122, confirmed: 118, pct: 96.7 },
    isMyPublished: true
  },
  {
    id: "not-2",
    ref: "SIT-25-EV-014",
    title: "Distinguished Guest Lecture: Paxos & Raft Consensus in Cloud Spanner",
    category: "event",
    categoryBadge: "Guest Seminar",
    badgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
    targetScope: "M.Tech Data Systems - Term II • CS-602",
    batchCode: "CS-602",
    body: "Dr. Elena Rostova from Google Cloud Core Systems will deliver an interactive masterclass on Paxos vs. Raft formalisms in multi-region deployments. Mandatory attendance for advanced systems research scholars.",
    publishedDate: "Yesterday • 11:15 AM",
    author: "Prof. Rajesh Sharma (You)",
    attachment: { name: "speaker_abstract_rostova.pdf", size: "840 KB" },
    receipts: { total: 28, confirmed: 28, pct: 100.0 },
    isMyPublished: true
  },
  {
    id: "not-3",
    ref: "SIT-25-RC-003",
    title: "Data Structures Remedial Clinic: Binary Search Tree Rotations & Heaps",
    category: "remedial",
    categoryBadge: "Remedial Clinic",
    badgeStyle: "bg-amber-50 text-amber-700 border-amber-200",
    targetScope: "BCA - 2nd Sem (Sec B) • CS-202 Cohort",
    batchCode: "CS-202",
    body: "An optional tutorial problem-solving session covering AVL tree balance factors and min-heap array representations will be held this Friday in Seminar Hall B for students scoring below 65% on Quiz 1.",
    publishedDate: "18 May 2025",
    author: "Prof. Rajesh Sharma (You)",
    receipts: { total: 34, confirmed: 32, pct: 94.1 },
    isMyPublished: true
  },
  {
    id: "not-4",
    ref: "SIT-25-DIR-109",
    title: "Even Semester 2024-25 Question Paper Submission Protocol & Bloom Rubric",
    category: "institutional",
    categoryBadge: "Dean Directive // Institutional",
    badgeStyle: "bg-blue-50 text-[#355C7D] border-blue-200",
    targetScope: "All Departmental Course Instructors & Paper Setters",
    body: "All faculty instructors must upload sealed two-set question paper dossiers with Bloom taxonomy cognitive weightage mappings to the COE encrypted vault by June 10, 2025.",
    publishedDate: "16 May 2025",
    author: "Prof. Kenneth Sterling (Controller of Examinations)",
    attachment: { name: "COE_QP_Formatting_Guidelines.pdf", size: "2.1 MB" },
    receipts: { total: 42, confirmed: 39, pct: 92.8 },
    isMyPublished: false
  },
  {
    id: "not-5",
    ref: "SIT-25-INF-033",
    title: "Central Cloud Datacenter & Campus LMS Scheduled Maintenance Downtime",
    category: "institutional",
    categoryBadge: "Infrastructure Advisory",
    badgeStyle: "bg-slate-100 text-slate-700 border-slate-200",
    targetScope: "Campus-Wide Faculty, Researchers & Students",
    body: "Central IT will perform scheduled hypervisor upgrades and storage array re-striping this Sunday from 02:00 AM to 05:00 AM IST. Institutional portals and course LMS will be intermittently offline.",
    publishedDate: "14 May 2025",
    author: "Er. Vikram Sengupta (Chief Info Security Officer)",
    receipts: { total: 184, confirmed: 172, pct: 93.5 },
    isMyPublished: false
  }
];

export default function StaffNoticesPage() {
  const [notices, setNotices] = useState<FacultyNotice[]>(initialNoticesList);
  const [filterTab, setFilterTab] = useState<"all" | "institutional" | "my-batches">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNoticeForModal, setSelectedNoticeForModal] = useState<FacultyNotice | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Composer Form State
  const [composerTitle, setComposerTitle] = useState("");
  const [composerTarget, setComposerTarget] = useState("B.Tech CS-IV-A [62 Students]");
  const [composerCategory, setComposerCategory] = useState("Urgent Academic Action");
  const [composerBody, setComposerBody] = useState("");
  const [composerSms, setComposerSms] = useState(true);
  const [composerAttachmentName, setComposerAttachmentName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerTitle.trim() || !composerBody.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      let badgeStyle = "bg-blue-50 text-[#355C7D] border-blue-200";
      let cat: "urgent" | "event" | "remedial" | "institutional" | "academic" = "academic";
      if (composerCategory.includes("Urgent")) {
        badgeStyle = "bg-rose-50 text-rose-700 border-rose-200";
        cat = "urgent";
      } else if (composerCategory.includes("Event")) {
        badgeStyle = "bg-purple-50 text-purple-700 border-purple-200";
        cat = "event";
      } else if (composerCategory.includes("Remedial")) {
        badgeStyle = "bg-amber-50 text-amber-700 border-amber-200";
        cat = "remedial";
      }

      const newNotice: FacultyNotice = {
        id: `not-${Date.now()}`,
        ref: `SIT-25-NT-${Math.floor(100 + Math.random() * 900)}`,
        title: composerTitle,
        category: cat,
        categoryBadge: composerCategory,
        badgeStyle,
        targetScope: composerTarget,
        batchCode: composerTarget.split(" ")[0],
        body: composerBody,
        publishedDate: "Just now",
        author: "Prof. Rajesh Sharma (You)",
        attachment: composerAttachmentName ? { name: composerAttachmentName, size: "1.2 MB" } : undefined,
        receipts: { total: 62, confirmed: 1, pct: 1.6 },
        isMyPublished: true
      };

      setNotices([newNotice, ...notices]);
      setIsSubmitting(false);
      setComposerTitle("");
      setComposerBody("");
      setComposerAttachmentName("");
      showToast("Notice broadcasted successfully to targeted batch with instant push!");
    }, 500);
  };

  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const matchesFilter =
        filterTab === "all" ||
        (filterTab === "institutional" && !n.isMyPublished) ||
        (filterTab === "my-batches" && n.isMyPublished);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        n.title.toLowerCase().includes(q) ||
        n.ref.toLowerCase().includes(q) ||
        n.targetScope.toLowerCase().includes(q) ||
        n.author.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [notices, filterTab, searchQuery]);

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
      <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Faculty Communications Node &bull; Even Semester 2024–25
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-[#3D405B] tracking-tight">
              Academic Bulletins &amp; Batch Notices
            </h1>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => {
                const el = document.getElementById("composer-panel");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Create Batch Notice</span>
            </button>
            <button
              onClick={() => showToast("Exporting announcements digest (PDF)...")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              <Download className="h-4 w-4 text-slate-600" />
              <span>Export Archive</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Bulletins
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Bell className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">14</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Across All Department Nodes</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Broadcast Channel</span>
            <span className="text-emerald-600 font-semibold text-[11px]">Online</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Assigned Cohorts
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">04</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">184 Enrolled Learners</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Target Reach</span>
            <span className="text-purple-700 font-semibold text-[11px]">100% Delivery</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              My Published Notices
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Send className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">
              0{notices.filter((n) => n.isMyPublished).length}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Active Batch Directives</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Average Read Receipt</span>
            <span className="text-emerald-600 font-semibold text-[11px]">96.2% Confirmed</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pending Action Directive
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-amber-600">01</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Dean QP Protocol Due 10 Jun</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Priority Level</span>
            <span className="bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full text-[11px]">
              High Priority
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search Controls */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setFilterTab("all")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              filterTab === "all"
                ? "bg-[#355C7D] text-white shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60"
            }`}
          >
            All Active Notices ({notices.length})
          </button>
          <button
            onClick={() => setFilterTab("institutional")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              filterTab === "institutional"
                ? "bg-[#355C7D] text-white shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60"
            }`}
          >
            Institutional &amp; Dean Memos ({notices.filter((n) => !n.isMyPublished).length})
          </button>
          <button
            onClick={() => setFilterTab("my-batches")}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              filterTab === "my-batches"
                ? "bg-[#355C7D] text-white shadow-xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60"
            }`}
          >
            My Published Batch Notices ({notices.filter((n) => n.isMyPublished).length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="h-3.5 w-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search headline, ref, code..."
            className="w-full bg-slate-50 border border-slate-200 pl-8 pr-3 py-1.5 text-xs text-slate-800 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#355C7D]"
          />
        </div>
      </div>

      {/* Main Dual-Panel Workspace: Notice Feed (7 Cols) & Composer Form (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Notice Feed (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-6 space-y-3.5"
            >
              {/* Badge & Ref Header */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg border ${notice.badgeStyle}`}
                >
                  {notice.categoryBadge}
                </span>
                <span className="font-mono text-xs font-semibold text-slate-400">
                  {notice.ref}
                </span>
              </div>

              {/* Title & Target Scope */}
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-[#3D405B] leading-snug">
                  {notice.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Users className="h-3.5 w-3.5 text-[#355C7D] shrink-0" />
                  <span className="text-slate-700 font-semibold">Target:</span>
                  <span>{notice.targetScope}</span>
                </div>
              </div>

              {/* Notice Body */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {notice.body}
              </p>

              {/* Attachment Pill (if any) */}
              {notice.attachment && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold truncate max-w-sm">
                    <Paperclip className="h-4 w-4 text-[#355C7D] shrink-0" />
                    <span className="truncate">{notice.attachment.name}</span>
                    <span className="text-slate-400 text-[11px] font-normal">
                      ({notice.attachment.size})
                    </span>
                  </div>
                  <button
                    onClick={() => showToast(`Downloading ${notice.attachment?.name}...`)}
                    className="font-bold text-[#355C7D] hover:underline cursor-pointer text-xs"
                  >
                    Download PDF
                  </button>
                </div>
              )}

              {/* Read Receipts & Metadata */}
              <div className="p-3 bg-slate-50/70 border border-slate-200/70 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 text-[11px] space-y-0.5">
                  <div>
                    Published: <strong className="text-slate-700">{notice.publishedDate}</strong>
                  </div>
                  <div>
                    Author: <strong className="text-[#355C7D]">{notice.author}</strong>
                  </div>
                </div>

                {/* Receipts Meter */}
                <div className="sm:text-right min-w-[150px] space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Read Receipts</span>
                    <span className="font-bold text-slate-800">
                      {notice.receipts.confirmed}/{notice.receipts.total} ({notice.receipts.pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${notice.receipts.pct}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Footer Controls */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedNoticeForModal(notice)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() =>
                      showToast(`Receipt ledger: ${notice.receipts.confirmed} of ${notice.receipts.total} confirmed.`)
                    }
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#355C7D] font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Receipts
                  </button>
                </div>

                {notice.isMyPublished && (
                  <button
                    onClick={() => showToast(`Notice ${notice.ref} archived.`)}
                    className="text-slate-400 hover:text-rose-600 transition-colors font-medium text-xs cursor-pointer"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-2">
              <p className="text-sm font-bold text-slate-700">No matching notices found</p>
              <p className="text-xs text-slate-400">Clear your search query or change filter tab.</p>
            </div>
          )}
        </div>

        {/* Targeted Batch Notice Composer (5 Cols) */}
        <div
          id="composer-panel"
          className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5 sticky top-6"
        >
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#355C7D] flex items-center justify-center">
                <PlusCircle className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-[#3D405B]">
                Publish Batch Notice
              </h3>
            </div>
            <span className="font-mono text-[11px] bg-blue-50 text-[#355C7D] px-2.5 py-0.5 font-bold uppercase rounded-md border border-blue-200/60">
              Instant Push
            </span>
          </div>

          <form onSubmit={handlePublishNotice} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Notice Title / Headline *
              </label>
              <input
                type="text"
                required
                value={composerTitle}
                onChange={(e) => setComposerTitle(e.target.value)}
                placeholder="e.g. Mid-Term Lab Practical Schedule & Viva Batch Split"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 focus:border-[#355C7D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Cohort / Assigned Batch *
              </label>
              <select
                value={composerTarget}
                onChange={(e) => setComposerTarget(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
              >
                <option value="All My 4 Batches [184 Students]">All My 4 Batches (184 Enrolled Learners)</option>
                <option value="B.Tech CS-IV-A [62 Students]">CS-401: B.Tech CS-IV-A (62 Students)</option>
                <option value="B.Tech CS-IV-B [60 Students]">CS-405L: B.Tech CS-IV-B Lab (60 Students)</option>
                <option value="M.Tech DS-II [28 Scholars]">CS-602: M.Tech DS-II (28 Scholars)</option>
                <option value="BCA-II-B [34 Students]">CS-202: BCA-II-B (34 Students)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Notice Category &amp; Priority
              </label>
              <select
                value={composerCategory}
                onChange={(e) => setComposerCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
              >
                <option value="Urgent Academic Action">Urgent Academic Action (High Priority)</option>
                <option value="Assignment & Lab Directive">Assignment &amp; Lab Practical Directive</option>
                <option value="Guest Seminar / Event">Guest Seminar / Industry Masterclass</option>
                <option value="Remedial Clinic & Office Hours">Remedial Clinic &amp; Office Hours</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Notice Body / Directive Content *
              </label>
              <textarea
                required
                rows={4}
                value={composerBody}
                onChange={(e) => setComposerBody(e.target.value)}
                placeholder="Draft instructions, deliverables, deadlines, and room arrangements..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 transition-all resize-none"
              />
            </div>

            {/* Attachment Input Simulation */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                  Attachment / PDF Rubric
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const sample = "Unit4_Practice_Questions.pdf";
                    setComposerAttachmentName(sample);
                    showToast(`Attached ${sample}`);
                  }}
                  className="text-xs font-bold text-[#355C7D] hover:underline cursor-pointer"
                >
                  {composerAttachmentName ? "Change File" : "+ Attach Sample PDF"}
                </button>
              </div>
              {composerAttachmentName && (
                <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs">
                  <Paperclip className="h-3.5 w-3.5 text-[#355C7D]" />
                  <span>{composerAttachmentName} (1.2 MB)</span>
                </div>
              )}
            </div>

            {/* Instant Push Checkbox */}
            <label className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer select-none">
              <input
                type="checkbox"
                checked={composerSms}
                onChange={(e) => setComposerSms(e.target.checked)}
                className="w-4 h-4 accent-[#355C7D] rounded cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-700">
                Broadcast instant notification to student portal &amp; SMS
              </span>
            </label>

            {/* Submit Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => showToast("Draft saved locally.")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white font-semibold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{isSubmitting ? "Broadcasting..." : "Publish Broadcast"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNoticeForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg border ${selectedNoticeForModal.badgeStyle}`}
                >
                  {selectedNoticeForModal.categoryBadge}
                </span>
                <h3 className="text-lg font-bold text-[#3D405B] mt-2 leading-snug">
                  {selectedNoticeForModal.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Ref: {selectedNoticeForModal.ref} &bull; {selectedNoticeForModal.publishedDate}
                </p>
              </div>
              <button
                onClick={() => setSelectedNoticeForModal(null)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Author:</span>
                  <strong className="text-slate-800">{selectedNoticeForModal.author}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Audience:</span>
                  <strong className="text-slate-800">{selectedNoticeForModal.targetScope}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Read Receipts:</span>
                  <strong className="text-emerald-600">
                    {selectedNoticeForModal.receipts.confirmed} / {selectedNoticeForModal.receipts.total} ({selectedNoticeForModal.receipts.pct}%)
                  </strong>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-sm bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                {selectedNoticeForModal.body}
              </p>

              {selectedNoticeForModal.attachment && (
                <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold truncate max-w-sm">
                    <Paperclip className="h-4 w-4 text-[#355C7D] shrink-0" />
                    <span className="truncate">{selectedNoticeForModal.attachment.name}</span>
                    <span className="text-slate-400 text-[11px] font-normal">
                      ({selectedNoticeForModal.attachment.size})
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      showToast(`Downloading ${selectedNoticeForModal.attachment?.name}...`);
                    }}
                    className="font-bold text-[#355C7D] hover:underline cursor-pointer text-xs"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedNoticeForModal(null)}
                className="px-5 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
