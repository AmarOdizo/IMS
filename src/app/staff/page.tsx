"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  GraduationCap,
  Layers,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Building,
  CheckCheck,
  Download,
  Eye,
  Lock,
  Radio,
  X,
  Send,
  PlusCircle,
  TrendingUp,
  BarChart3,
  CalendarDays,
  FileCheck,
} from "lucide-react";

interface ScheduleItem {
  id: string;
  time: string;
  duration: string;
  code: string;
  subject: string;
  batch: string;
  venue: string;
  attendanceInfo: string;
  status: "completed" | "live" | "upcoming";
  statusText: string;
}

const todaySchedule: ScheduleItem[] = [
  {
    id: "sch-1",
    time: "09:00 - 10:00 AM",
    duration: "60 MIN",
    code: "CS-401",
    subject: "Database Management Systems",
    batch: "B.Tech CS-IV-A",
    venue: "Lecture Hall 302",
    attendanceInfo: "58/62 Attended (93.5%)",
    status: "completed",
    statusText: "Completed",
  },
  {
    id: "sch-2",
    time: "11:00 - 12:00 PM",
    duration: "60 MIN",
    code: "CS-602",
    subject: "Advanced Database Architecture",
    batch: "M.Tech DS-II",
    venue: "Room 204 (PG Block)",
    attendanceInfo: "27/28 Attended (96.4%)",
    status: "completed",
    statusText: "Completed",
  },
  {
    id: "sch-3",
    time: "02:00 - 03:00 PM",
    duration: "60 MIN",
    code: "CS-202",
    subject: "Data Structures & Algorithms",
    batch: "BCA-II-B",
    venue: "Seminar Hall B",
    attendanceInfo: "Active Period: Unit 3 Trees & Graphs",
    status: "live",
    statusText: "In Progress",
  },
  {
    id: "sch-4",
    time: "03:30 - 05:00 PM",
    duration: "90 MIN",
    code: "CS-405L",
    subject: "Database Engineering Lab",
    batch: "B.Tech CS-IV-B",
    venue: "Software Lab 3",
    attendanceInfo: "Lab Capacity: 48 Terminals",
    status: "upcoming",
    statusText: "Upcoming",
  },
];

const assignedCohorts = [
  {
    id: "btech-4a",
    name: "B.Tech CSE - 4th Sem (Sec A)",
    code: "CS-401",
    course: "Database Management Systems",
    students: 62,
    avgAttendance: 89.4,
    syllabusProgress: 68,
    scheduleDay: "Mon, Wed, Fri &bull; 09:00 AM",
    venue: "Hall 302",
  },
  {
    id: "btech-4b",
    name: "B.Tech CSE - 4th Sem (Sec B)",
    code: "CS-405L",
    course: "Database Systems Practicum Lab",
    students: 60,
    avgAttendance: 92.1,
    syllabusProgress: 72,
    scheduleDay: "Tue, Thu &bull; 03:30 PM",
    venue: "Software Lab 3",
  },
  {
    id: "mtech-2",
    name: "M.Tech DS - 2nd Sem",
    code: "CS-602",
    course: "Advanced Database Architecture",
    students: 28,
    avgAttendance: 94.8,
    syllabusProgress: 75,
    scheduleDay: "Mon, Thu &bull; 11:00 AM",
    venue: "Room 204",
  },
  {
    id: "bca-2b",
    name: "BCA - 2nd Sem (Sec B)",
    code: "CS-202",
    course: "Data Structures & Algorithms",
    students: 34,
    avgAttendance: 84.6,
    syllabusProgress: 58,
    scheduleDay: "Wed, Thu, Fri &bull; 02:00 PM",
    venue: "Seminar Hall B",
  },
];

const facultyNotices = [
  {
    id: "FN-01",
    ref: "APX/EXAM/2025/119",
    title: "Mid-Term Question Paper Submission Deadline",
    dept: "Examination Cell",
    deadline: "25 May 2025",
    priority: "Urgent",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    id: "FN-02",
    ref: "APX/ACAD/2025/098",
    title: "Semester IV Moderation Guidelines & Evaluation Rubrics",
    dept: "Academic Affairs",
    deadline: "28 May 2025",
    priority: "High",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "FN-03",
    ref: "APX/CSE/2025/042",
    title: "Department Academic Review Committee Meeting at 3:30 PM",
    dept: "Dept of CSE",
    deadline: "Tomorrow &bull; Conference Room",
    priority: "Meeting",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
  },
];

export default function StaffDashboardPage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(todaySchedule);
  const [scheduleFilter, setScheduleFilter] = useState<"all" | "active" | "completed">("all");
  const [selectedAuditSession, setSelectedAuditSession] = useState<ScheduleItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredSchedule = schedule.filter((item) => {
    if (scheduleFilter === "active") return item.status === "live" || item.status === "upcoming";
    if (scheduleFilter === "completed") return item.status === "completed";
    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMarkLiveAttendance = () => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === "sch-3"
          ? {
              ...item,
              status: "completed",
              statusText: "Completed",
              attendanceInfo: "32/34 Attended (94.1%)",
            }
          : item
      )
    );
    showToast("Attendance for BCA-II-B (CS-202) marked successfully!");
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
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
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#355C7D] text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355C7D]"></span>
                Faculty ID: EMP-CS-2018-842
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Active Session &bull; Even Semester 2024–25
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#3D405B] tracking-tight">
                Welcome back, Prof. Rajesh Sharma! 👋
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Department of Computer Science &amp; Engineering &bull; Faculty Cabin B-204
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <Link
              href="/staff/attendance"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#355C7D] hover:bg-[#2A4963] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark Attendance</span>
            </Link>
            <Link
              href="/staff/exams"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#355C7D]" />
              <span>Enter Marks</span>
            </Link>
            <Link
              href="/staff/students"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
            >
              <Users className="w-4 h-4 text-[#355C7D]" />
              <span>Student Directory</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Compact KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Batches */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Assigned Batches
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#355C7D] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">4 Batches</div>
            <div className="text-xs text-slate-500 mt-1">B.Tech IV (A/B), M.Tech II, BCA II</div>
          </div>
        </div>

        {/* Card 2: Total Students */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Enrolled
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#3D405B] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">184 Students</div>
            <div className="text-xs text-slate-500 mt-1">156 UG &bull; 28 PG Scholars</div>
          </div>
        </div>

        {/* Card 3: Today's Lectures */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Today&apos;s Lectures
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">
              {schedule.filter((s) => s.status === "completed").length} of 4 Done
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">Next: Lab at 03:30 PM</div>
          </div>
        </div>

        {/* Card 4: Upcoming Exams */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Evaluations Pending
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight">2 Papers</div>
            <div className="text-xs text-amber-700 font-medium mt-1">Mid-term evaluation window</div>
          </div>
        </div>
      </div>

      {/* Today's Teaching Schedule */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#355C7D] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#3D405B]">
                Today&apos;s Lecture Schedule
              </h2>
              <p className="text-xs text-slate-500">4 Teaching Sessions Scheduled</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setScheduleFilter("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                scheduleFilter === "all"
                  ? "bg-white text-[#3D405B] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({schedule.length})
            </button>
            <button
              onClick={() => setScheduleFilter("active")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                scheduleFilter === "active"
                  ? "bg-white text-[#3D405B] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Active ({schedule.filter((s) => s.status !== "completed").length})
            </button>
            <button
              onClick={() => setScheduleFilter("completed")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                scheduleFilter === "completed"
                  ? "bg-white text-[#3D405B] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Completed ({schedule.filter((s) => s.status === "completed").length})
            </button>
          </div>
        </div>

        {/* Schedule List */}
        <div className="mt-4 space-y-3">
          {filteredSchedule.map((item) => {
            const isCompleted = item.status === "completed";
            const isLive = item.status === "live";
            const isUpcoming = item.status === "upcoming";

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all border ${
                  isLive
                    ? "bg-blue-50/40 border-blue-200/80 shadow-xs"
                    : "bg-slate-50/60 hover:bg-slate-50 border-slate-100"
                }`}
              >
                {/* Time & Duration */}
                <div className="flex items-center gap-3 md:w-1/4">
                  <div className={`text-sm font-bold ${isLive ? "text-[#355C7D]" : "text-[#3D405B]"}`}>
                    {item.time}
                  </div>
                  <span className="text-[10px] font-semibold bg-white text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                    {item.duration}
                  </span>
                </div>

                {/* Subject & Venue */}
                <div className="md:w-2/5 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#3D405B]">
                      {item.code}: {item.subject}
                    </span>
                    {isLive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-[#355C7D] animate-pulse">
                        <Radio className="w-3 h-3" /> Live Now
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{item.batch}</span>
                    <span>&bull;</span>
                    <span>{item.venue}</span>
                    <span>&bull;</span>
                    <span className="text-slate-600">{item.attendanceInfo}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {isCompleted && (
                    <>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                      </span>
                      <button
                        onClick={() => setSelectedAuditSession(item)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-xl border border-slate-200 transition-colors cursor-pointer shadow-xs"
                      >
                        View Details
                      </button>
                    </>
                  )}

                  {isLive && (
                    <button
                      onClick={handleMarkLiveAttendance}
                      className="px-4 py-2 bg-[#355C7D] hover:bg-[#2A4963] text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <CheckCheck className="w-4 h-4" />
                      <span>Submit Attendance</span>
                    </button>
                  )}

                  {isUpcoming && (
                    <Link
                      href="/staff/attendance"
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-xl border border-slate-200 transition-colors shadow-xs"
                    >
                      Pre-load Roster
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assigned Batches Overview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#355C7D] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-[#3D405B]">
              Assigned Batches (Even Semester 2024–25)
            </h2>
          </div>
          <Link
            href="/staff/batches"
            className="text-xs font-semibold text-[#355C7D] hover:underline flex items-center gap-1"
          >
            <span>Manage All Batches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {assignedCohorts.map((cohort) => (
            <div
              key={cohort.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#355C7D] bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200/60">
                    {cohort.code}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {cohort.students} Students
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#3D405B] mt-3">
                  {cohort.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{cohort.course}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">Attendance Rate</span>
                      <span className="font-semibold text-emerald-600">{cohort.avgAttendance}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${cohort.avgAttendance}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500">Syllabus Covered</span>
                      <span className="font-semibold text-[#355C7D]">{cohort.syllabusProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#355C7D] rounded-full"
                        style={{ width: `${cohort.syllabusProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{cohort.venue}</span>
                <Link
                  href={`/staff/batches?batch=${cohort.id}`}
                  className="text-[#355C7D] font-semibold hover:underline"
                >
                  View Roster &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Dual Grid: Workload Analytics & Faculty Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Workload Analytics (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#355C7D] flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[#3D405B]">
                Weekly Teaching Workload &amp; Attendance
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">Total: 22 Hrs / Week</span>
          </div>

          <div className="grid grid-cols-5 gap-3 pt-2 text-center">
            {[
              { day: "MON", hours: "5.0h", attendance: "91%", height: "h-28" },
              { day: "TUE", hours: "4.5h", attendance: "94%", height: "h-24" },
              { day: "WED", hours: "5.5h", attendance: "88%", height: "h-32" },
              { day: "THU", hours: "4.0h", attendance: "93%", height: "h-20" },
              { day: "FRI", hours: "3.0h", attendance: "90%", height: "h-16" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="text-xs font-bold text-slate-700">{item.hours}</div>
                <div className="w-full bg-slate-50 h-36 flex items-end justify-center p-1.5 rounded-xl border border-slate-100">
                  <div className={`w-full ${item.height} bg-[#355C7D] rounded-lg transition-all`}></div>
                </div>
                <span className="text-xs font-bold text-[#3D405B]">{item.day}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">{item.attendance}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Faculty Attendance Compliance: Regular &bull; 99.4%
            </span>
            <span className="text-[#355C7D] font-semibold">Department Standard</span>
          </div>
        </div>

        {/* Faculty Notices (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-[#3D405B] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-[#3D405B]">
                Faculty Bulletins &amp; Notices
              </h2>
            </div>
            <Link href="/staff/notices" className="text-xs text-[#355C7D] hover:underline font-semibold">
              All Notices &rarr;
            </Link>
          </div>

          <div className="divide-y divide-slate-100 space-y-2">
            {facultyNotices.map((memo) => (
              <div key={memo.id} className="pt-2.5 first:pt-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">{memo.ref}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${memo.badgeColor}`}>
                    {memo.priority}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-[#3D405B] leading-snug">
                  {memo.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{memo.dept}</span>
                  <span className="text-rose-600 font-medium">{memo.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Roll Modal */}
      {selectedAuditSession && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Attendance Session Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedAuditSession(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 text-xs space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-sm font-bold text-[#3D405B]">
                  {selectedAuditSession.code}: {selectedAuditSession.subject}
                </div>
                <div className="text-slate-500 mt-1">
                  Batch: {selectedAuditSession.batch} &bull; Venue: {selectedAuditSession.venue}
                </div>
                <div className="text-[#355C7D] font-semibold mt-1">
                  Time: {selectedAuditSession.time} &bull; Recorded Attendance: {selectedAuditSession.attendanceInfo}
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl">
                Attendance session verified and recorded for the academic session.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAuditSession(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
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
