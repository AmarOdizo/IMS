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
  Calendar
} from "lucide-react";

interface FacultyNotice {
  id: string;
  ref: string;
  title: string;
  category: "urgent" | "event" | "remedial" | "institutional";
  categoryBadge: string;
  categoryStyle: string;
  targetScope: string;
  body: string;
  publishedDate: string;
  author: string;
  attachment?: { name: string; size: string };
  receipts: { total: number; confirmed: number; pct: number };
  isMyPublished: boolean;
}

const initialNotices: FacultyNotice[] = [
  {
    id: "not-1",
    ref: "CS-24-NT-089",
    title: "Mid-Term Assessment Lab Submission & Git Repository Freeze",
    category: "urgent",
    categoryBadge: "URGENT ACADEMIC ACTION",
    categoryStyle: "bg-error-container text-on-error-container font-bold",
    targetScope: "B.Tech CS-IV (Sec A & B) • CS-401 & CS-405L",
    body: "All students are required to push complete commit logs for the Distributed Database synchronization assignments. The institutional GitLab repo will switch to read-only mode precisely at 23:59 IST today. Late submissions will attract a 15% penalty.",
    publishedDate: "26 Mar 2025 • 04:30 PM",
    author: "Mr. Amit Sharma (You)",
    attachment: { name: "rubric_v4_distributed_db.pdf", size: "1.8 MB" },
    receipts: { total: 120, confirmed: 116, pct: 96.7 },
    isMyPublished: true
  },
  {
    id: "not-2",
    ref: "DS-24-EV-014",
    title: "Guest Seminar: Distributed Consensus Protocols by Dr. Rostova",
    category: "event",
    categoryBadge: "EVENT NOTIFICATION",
    categoryStyle: "bg-secondary-fixed text-on-secondary-fixed font-bold",
    targetScope: "M.Tech Data Systems - 2nd Sem",
    body: "Dr. Elena Rostova from Turing Advanced Systems will deliver an interactive masterclass on Paxos vs. Raft formalisms in multi-datacenter environments. Mandatory attendance for advanced systems lab credits.",
    publishedDate: "24 Mar 2025",
    author: "Mr. Amit Sharma (You)",
    attachment: { name: "speaker_abstract_rostova.pdf", size: "840 KB" },
    receipts: { total: 28, confirmed: 28, pct: 100.0 },
    isMyPublished: true
  },
  {
    id: "not-3",
    ref: "BCA-24-RC-003",
    title: "Data Structures Remedial Clinic - Binary Search Tree Balancing",
    category: "remedial",
    categoryBadge: "ACADEMIC CLINIC",
    categoryStyle: "bg-surface-container text-primary font-bold border border-[#cbd5e1]",
    targetScope: "BCA-II-B • CS-202 Cohort",
    body: "An optional tutorial problem-solving session covering AVL tree rotations and red-black tree insertion invariants will be held this Friday in Seminar Hall B for students scoring below 60% on Quiz 1.",
    publishedDate: "22 Mar 2025",
    author: "Mr. Amit Sharma (You)",
    receipts: { total: 34, confirmed: 32, pct: 94.1 },
    isMyPublished: true
  },
  {
    id: "not-4",
    ref: "COE-24-QP-109",
    title: "AY 2024-25 End-Semester Exam Question Paper Submission Protocol",
    category: "institutional",
    categoryBadge: "DEAN DIRECTIVE // INSTITUTIONAL",
    categoryStyle: "bg-primary text-on-primary font-bold",
    targetScope: "All Departmental Course Instructors & Paper Setters",
    body: "All instructors must upload sealed two-set question paper dossiers with Bloom taxonomy cognitive weightage mappings to the COE encrypted vault by May 28, 2025.",
    publishedDate: "20 Mar 2025",
    author: "Prof. Kenneth Sterling (Controller of Examinations)",
    attachment: { name: "COE_QP_Formatting_Guidelines.pdf", size: "2.1 MB" },
    receipts: { total: 42, confirmed: 38, pct: 90.5 },
    isMyPublished: false
  },
  {
    id: "not-5",
    ref: "IT-24-MNT-033",
    title: "Central Cloud Server & LMS Scheduled Maintenance Downtime",
    category: "institutional",
    categoryBadge: "INFRASTRUCTURE ADVISORY",
    categoryStyle: "bg-surface-container-high text-on-surface font-semibold border border-[#cbd5e1]",
    targetScope: "Campus-Wide Faculty, Researchers & Students",
    body: "Central IT will perform scheduled hypervisor upgrades and storage array re-striping this Sunday from 02:00 AM to 05:00 AM IST. Portal and LMS will be intermittently offline.",
    publishedDate: "18 Mar 2025",
    author: "Er. Vikram Sengupta (Chief Info Security Officer)",
    receipts: { total: 248, confirmed: 230, pct: 92.7 },
    isMyPublished: false
  }
];

export default function StaffNoticesPage() {
  const [notices, setNotices] = useState<FacultyNotice[]>(initialNotices);
  const [filterTab, setFilterTab] = useState<"all" | "institutional" | "my-batches">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Composer Form State
  const [composerTitle, setComposerTitle] = useState("");
  const [composerTarget, setComposerTarget] = useState("B.Tech CS-IV (Sec A & B)");
  const [composerCategory, setComposerCategory] = useState("Urgent Academic Action");
  const [composerBody, setComposerBody] = useState("");
  const [composerSms, setComposerSms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newNotice: FacultyNotice = {
        id: `not-${Date.now()}`,
        ref: `CS-25-NT-${Math.floor(100 + Math.random() * 900)}`,
        title: composerTitle,
        category: composerCategory.includes("Urgent") ? "urgent" : "event",
        categoryBadge: composerCategory.toUpperCase(),
        categoryStyle: composerCategory.includes("Urgent")
          ? "bg-error-container text-on-error-container font-bold"
          : "bg-secondary-fixed text-on-secondary-fixed font-bold",
        targetScope: composerTarget,
        body: composerBody,
        publishedDate: "Just now",
        author: "Mr. Amit Sharma (You)",
        receipts: { total: 62, confirmed: 1, pct: 1.6 },
        isMyPublished: true
      };

      setNotices([newNotice, ...notices]);
      setIsSubmitting(false);
      setComposerTitle("");
      setComposerBody("");
      showToast("Notice broadcasted successfully to targeted batch & SMS queued!");
    }, 700);
  };

  const filteredNotices = useMemo(() => {
    return notices.filter((n) => {
      const matchesFilter =
        filterTab === "all" ||
        (filterTab === "institutional" && !n.isMyPublished) ||
        (filterTab === "my-batches" && n.isMyPublished);

      const matchesSearch =
        searchQuery === "" ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.targetScope.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [notices, filterTab, searchQuery]);

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

      <div className="p-6 flex flex-col gap-6">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-on-surface-variant font-mono">
              <Link href="/staff" className="hover:text-primary">Staff Portal</Link>
              <ChevronRight className="h-3.5 w-3.5 text-outline" />
              <span>Communications</span>
              <ChevronRight className="h-3.5 w-3.5 text-outline" />
              <span className="text-secondary font-semibold">Academic Bulletins &amp; Batch Notices</span>
            </div>

            <div className="flex items-baseline gap-3 mt-1">
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary">
                Notices &amp; Announcements
              </h1>
              <span className="font-mono text-[10px] bg-surface-container px-2 py-0.5 border border-[#cbd5e1] uppercase font-bold text-primary rounded-xs">
                TELEMETRY SEC-COMM
              </span>
            </div>
            <p className="text-xs text-on-surface-variant max-w-3xl">
              Review institutional administrative circulars and broadcast targeted academic notices to your assigned cohorts.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => {
                const el = document.getElementById("composer-panel");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 font-mono text-xs uppercase font-bold tracking-wider shadow-sm transition-colors rounded-sm"
            >
              <PlusCircle className="h-4 w-4 text-secondary-container" />
              <span>+ Create Batch Notice</span>
            </button>
          </div>
        </div>

        {/* Telemetry Ticker Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-surface-container-lowest p-2 border border-[#cbd5e1] shadow-sm rounded-sm">
          <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Active Broadcasts
              </span>
              <Bell className="h-4 w-4 text-secondary" />
            </div>
            <span className="text-2xl font-bold text-primary font-mono mt-1">14</span>
            <span className="text-[10px] text-outline font-mono">Across all faculty nodes</span>
          </div>

          <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Assigned Cohorts
              </span>
              <Users className="h-4 w-4 text-secondary" />
            </div>
            <span className="text-2xl font-bold text-primary font-mono mt-1">04</span>
            <span className="text-[10px] text-outline font-mono">184 Enrolled Learners</span>
          </div>

          <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                My Published
              </span>
              <Send className="h-4 w-4 text-secondary" />
            </div>
            <span className="text-2xl font-bold text-primary font-mono mt-1">
              {notices.filter((n) => n.isMyPublished).length}
            </span>
            <span className="text-[10px] text-outline font-mono">Avg Receipt: 96.2%</span>
          </div>

          <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Pending Directives
              </span>
              <AlertTriangle className="h-4 w-4 text-error" />
            </div>
            <span className="text-2xl font-bold text-error font-mono mt-1">01</span>
            <span className="text-[10px] text-error font-mono font-semibold">Dean QP Protocol</span>
          </div>
        </div>

        {/* Filter & Segmented Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-2 border border-[#cbd5e1] shadow-sm rounded-sm">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <button
              onClick={() => setFilterTab("all")}
              className={`px-3 py-1.5 uppercase font-bold tracking-wider rounded-xs transition-colors ${
                filterTab === "all"
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-on-surface hover:bg-surface-container"
              }`}
            >
              All Active Notices ({notices.length})
            </button>
            <button
              onClick={() => setFilterTab("institutional")}
              className={`px-3 py-1.5 uppercase font-bold tracking-wider rounded-xs transition-colors ${
                filterTab === "institutional"
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-on-surface hover:bg-surface-container"
              }`}
            >
              Institutional &amp; Faculty Memos (2)
            </button>
            <button
              onClick={() => setFilterTab("my-batches")}
              className={`px-3 py-1.5 uppercase font-bold tracking-wider rounded-xs transition-colors ${
                filterTab === "my-batches"
                  ? "bg-primary text-on-primary shadow-xs"
                  : "text-on-surface hover:bg-surface-container"
              }`}
            >
              My Published Batch Notices ({notices.filter((n) => n.isMyPublished).length})
            </button>
          </div>

          <div className="flex items-center gap-2 px-2">
            <div className="flex items-center bg-surface-container-low px-2.5 py-1 border border-[#cbd5e1] rounded-xs text-xs font-mono">
              <Search className="h-3.5 w-3.5 text-outline mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notices, tags, codes..."
                className="bg-transparent text-primary placeholder:text-outline focus:outline-none w-44 sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Dual-Panel Layout: Feed (7 Cols) & Composer Form (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel (7 Cols): Notice Feed */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {filteredNotices.map((notice) => (
              <article
                key={notice.id}
                className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm flex flex-col hover:border-secondary transition-all rounded-sm overflow-hidden"
              >
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs ${notice.categoryStyle}`}
                      >
                        {notice.categoryBadge}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-outline font-semibold">
                      REF: {notice.ref}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="text-base font-bold text-primary tracking-tight leading-snug">
                      {notice.title}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-1 font-mono">
                      <Users className="h-3.5 w-3.5 text-secondary shrink-0" />
                      <span className="font-semibold text-primary">Target:</span>
                      <span>{notice.targetScope}</span>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {notice.body}
                  </p>

                  {/* Metadata & Read Receipt Bar */}
                  <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 text-outline text-[11px]">
                        <span>Published: {notice.publishedDate}</span>
                        <span>•</span>
                        <span className="text-primary font-bold">Author: {notice.author}</span>
                      </div>
                      {notice.attachment && (
                        <div className="flex items-center gap-1.5 text-primary font-bold mt-1">
                          <Paperclip className="h-3.5 w-3.5 text-secondary" />
                          <button
                            onClick={() => showToast(`Downloading ${notice.attachment?.name}...`)}
                            className="underline hover:text-secondary text-left truncate max-w-xs"
                          >
                            {notice.attachment.name} ({notice.attachment.size})
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Receipts Progress */}
                    <div className="flex flex-col sm:items-end min-w-[140px]">
                      <div className="flex items-center justify-between w-full text-[10px] uppercase text-outline">
                        <span>Receipts</span>
                        <span className="font-bold text-primary">
                          {notice.receipts.confirmed} / {notice.receipts.total} ({notice.receipts.pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-surface-container h-1.5 mt-1 rounded-full overflow-hidden">
                        <div
                          className="bg-secondary h-full"
                          style={{ width: `${notice.receipts.pct}%` }}
                        ></div>
                      </div>
                      <span className="text-[9px] text-outline mt-0.5">
                        {notice.receipts.pct === 100 ? "Full Cohort Acknowledged" : "Active Read Monitor"}
                      </span>
                    </div>
                  </div>

                  {/* Card Control Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#0D2545]/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast(`Edit drafted for ${notice.ref}`)}
                        className="px-2.5 py-1 text-primary hover:bg-surface-container font-bold uppercase transition-colors rounded-xs border border-[#cbd5e1]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => showToast(`Read receipts: ${notice.receipts.confirmed} of ${notice.receipts.total} acknowledged.`)}
                        className="px-2.5 py-1 text-secondary hover:bg-surface-container font-bold uppercase transition-colors rounded-xs border border-[#cbd5e1]"
                      >
                        Receipts
                      </button>
                    </div>
                    <button
                      onClick={() => showToast(`Archived notice ${notice.ref}`)}
                      className="text-outline hover:text-error transition-colors text-[11px] uppercase font-bold"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Panel (5 Cols): Targeted Batch Notice Composer */}
          <div
            id="composer-panel"
            className="lg:col-span-5 bg-surface-container-lowest border-2 border-primary shadow-sm p-6 rounded-sm flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#cbd5e1]">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary font-mono">
                  Create Targeted Batch Notice
                </h3>
              </div>
              <span className="font-mono text-[10px] bg-primary text-on-primary px-2 py-0.5 font-bold uppercase rounded-xs">
                INSTANT DISPATCH
              </span>
            </div>

            <form onSubmit={handlePublishNotice} className="flex flex-col gap-4 text-xs font-mono">
              <div>
                <label className="uppercase font-bold text-outline block mb-1">
                  Notice Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={composerTitle}
                  onChange={(e) => setComposerTitle(e.target.value)}
                  placeholder="e.g. End-Term Lab Practical Schedule & Viva Batch Split"
                  className="w-full px-3 py-2 bg-surface-container-low border border-[#cbd5e1] text-xs font-bold text-primary focus:outline-none focus:border-primary rounded-xs"
                />
              </div>

              <div>
                <label className="uppercase font-bold text-outline block mb-1">
                  Target Cohort / Assigned Batch *
                </label>
                <select
                  value={composerTarget}
                  onChange={(e) => setComposerTarget(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-[#cbd5e1] text-xs font-bold text-primary focus:outline-none rounded-xs"
                >
                  <option value="B.Tech CS-IV (Sec A & B)">B.Tech CS-IV (Sec A &amp; B) [120 Students]</option>
                  <option value="B.Tech CS-IV-A">B.Tech CS-IV-A [62 Students]</option>
                  <option value="B.Tech CS-IV-B">B.Tech CS-IV-B [58 Students]</option>
                  <option value="M.Tech Data Systems - 2nd Sem">M.Tech Data Systems - 2nd Sem [28 Scholars]</option>
                  <option value="BCA-II-B">BCA-II-B [34 Students]</option>
                </select>
              </div>

              <div>
                <label className="uppercase font-bold text-outline block mb-1">
                  Notice Category &amp; Priority
                </label>
                <select
                  value={composerCategory}
                  onChange={(e) => setComposerCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-low border border-[#cbd5e1] text-xs font-bold text-primary focus:outline-none rounded-xs"
                >
                  <option value="Urgent Academic Action">Urgent Academic Action (High Priority)</option>
                  <option value="Event Notification">Event Notification / Guest Seminar</option>
                  <option value="Academic Clinic">Remedial Clinic / Office Hours</option>
                  <option value="Assignment Directive">Assignment Directive &amp; Lab Guidelines</option>
                </select>
              </div>

              <div>
                <label className="uppercase font-bold text-outline block mb-1">
                  Notice Directive Body *
                </label>
                <textarea
                  required
                  rows={4}
                  value={composerBody}
                  onChange={(e) => setComposerBody(e.target.value)}
                  placeholder="Draft clear instructions, deadlines, venue or deliverable parameters..."
                  className="w-full px-3 py-2 bg-surface-container-low border border-[#cbd5e1] text-xs text-primary focus:outline-none focus:border-primary resize-none rounded-xs font-sans"
                />
              </div>

              {/* Attachment Simulation */}
              <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-xs flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-outline">
                  <Paperclip className="h-4 w-4 text-secondary" />
                  <span>Attach PDF / Rubric Sheet</span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Attachment upload file picker opened.")}
                  className="text-secondary font-bold hover:underline"
                >
                  Browse File
                </button>
              </div>

              {/* SMS Dispatch Option */}
              <label className="flex items-center gap-2 cursor-pointer select-none p-2 bg-surface-container-low border border-[#cbd5e1] rounded-xs">
                <input
                  type="checkbox"
                  checked={composerSms}
                  onChange={(e) => setComposerSms(e.target.checked)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="text-[11px] font-bold text-primary uppercase">
                  Broadcast instant SMS push to enrolled student handsets
                </span>
              </label>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-2 border-t border-[#cbd5e1]">
                <button
                  type="button"
                  onClick={() => showToast("Notice draft saved locally.")}
                  className="px-4 py-2 bg-surface-container text-primary uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors rounded-xs border border-[#cbd5e1]"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-primary text-on-primary uppercase font-bold tracking-wider hover:bg-primary-container transition-colors flex items-center gap-1.5 rounded-xs shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? "Broadcasting..." : "Publish Broadcast"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
