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
  CalendarDays
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
    statusText: "Completed"
  },
  {
    id: "sch-2",
    time: "11:00 - 12:00 PM",
    duration: "60 MIN",
    code: "CS-403",
    subject: "Advanced Database Systems",
    batch: "M.Tech DS-II",
    venue: "Room 204 (PG Block)",
    attendanceInfo: "27/28 Attended (96.4%)",
    status: "completed",
    statusText: "Completed"
  },
  {
    id: "sch-3",
    time: "02:00 - 03:00 PM",
    duration: "60 MIN",
    code: "CS-202",
    subject: "Data Structures Foundation",
    batch: "BCA-II-B",
    venue: "Seminar Hall B",
    attendanceInfo: "Active Period: Unit 3 Trees",
    status: "live",
    statusText: "In Progress"
  },
  {
    id: "sch-4",
    time: "03:30 - 05:00 PM",
    duration: "90 MIN",
    code: "CS-405L",
    subject: "Database Engineering Lab",
    batch: "B.Tech CS-IV-B",
    venue: "Turing Computing Lab 3",
    attendanceInfo: "Lab Strength: 48 Systems",
    status: "upcoming",
    statusText: "Upcoming"
  }
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
    scheduleDay: "Mon, Wed, Fri • 09:00 AM",
    venue: "Hall 302"
  },
  {
    id: "btech-4b",
    name: "B.Tech CSE - 4th Sem (Sec B)",
    code: "CS-405L",
    course: "Database Systems Practicum Lab",
    students: 60,
    avgAttendance: 92.1,
    syllabusProgress: 72,
    scheduleDay: "Tue, Thu • 03:30 PM",
    venue: "Turing Lab 3"
  },
  {
    id: "mtech-2",
    name: "M.Tech DS - 2nd Sem",
    code: "CS-602",
    course: "Advanced Query Optimization",
    students: 28,
    avgAttendance: 94.8,
    syllabusProgress: 75,
    scheduleDay: "Mon, Thu • 11:00 AM",
    venue: "Room 204"
  },
  {
    id: "bca-2b",
    name: "BCA - 2nd Sem (Sec B)",
    code: "CS-202",
    course: "Data Structures Foundation",
    students: 34,
    avgAttendance: 84.6,
    syllabusProgress: 58,
    scheduleDay: "Wed, Thu, Fri • 02:00 PM",
    venue: "Seminar B"
  }
];

const facultyNotices = [
  {
    id: "FN-01",
    ref: "APX/DEAN/2025-119",
    title: "Mid-Term Question Paper Submission Deadline",
    dept: "Examination Cell",
    deadline: "April 08, 2025",
    priority: "Urgent",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "FN-02",
    ref: "APX/ACAD/2025-098",
    title: "Final Exam Moderation & Evaluation Rubrics Ratified",
    dept: "Academic Affairs",
    deadline: "April 15, 2025",
    priority: "Important",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "FN-03",
    ref: "APX/RES/2025-042",
    title: "Guest Lecture: Microkernels for Transformer Workloads",
    dept: "Computing Research",
    deadline: "April 20 • Turing Hall",
    priority: "Notice",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200"
  }
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
              attendanceInfo: "32/34 Attended (94.1%)"
            }
          : item
      )
    );
    showToast("Attendance for BCA-II-B CS-202 successfully saved!");
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/60 via-purple-50/30 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Faculty ID: EMP-CS-842
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                On Duty &bull; AY 2025–26
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Welcome back, Prof. Amit Sharma! 👋
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Department of Computer Science &amp; Engineering &bull; Cabin B-204
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <Link
              href="/staff/attendance"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition-all"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark Attendance</span>
            </Link>
            <Link
              href="/staff/exams"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <span>Enter Exam Marks</span>
            </Link>
            <Link
              href="/staff/students"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-all"
            >
              <Users className="w-4 h-4 text-slate-500" />
              <span>My Students</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Assigned Batches</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">4 Batches</div>
            <div className="text-xs text-slate-500 mt-1">B.Tech IV (A/B), M.Tech II, BCA II</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Enrolled</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">184 Students</div>
            <div className="text-xs text-slate-500 mt-1">156 UG &bull; 28 PG Scholars</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Today's Lectures</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">
              {schedule.filter((s) => s.status === "completed").length} of 4 Done
            </div>
            <div className="text-xs text-emerald-600 font-medium mt-1">Next: Lab at 03:30 PM</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Upcoming Exams</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 tracking-tight">2 Papers</div>
            <div className="text-xs text-amber-600 font-medium mt-1">Mid-term starts in 6 days</div>
          </div>
        </div>
      </div>

      {/* Today's Teaching Schedule */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Today&apos;s Lecture Schedule
              </h2>
              <p className="text-xs text-slate-500">Thursday &bull; 4 Sessions Scheduled</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setScheduleFilter("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                scheduleFilter === "all"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({schedule.length})
            </button>
            <button
              onClick={() => setScheduleFilter("active")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                scheduleFilter === "active"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Active ({schedule.filter((s) => s.status !== "completed").length})
            </button>
            <button
              onClick={() => setScheduleFilter("completed")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                scheduleFilter === "completed"
                  ? "bg-white text-blue-600 shadow-xs"
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
                  <div className={`text-sm font-bold ${isLive ? "text-blue-700" : "text-slate-900"}`}>
                    {item.time}
                  </div>
                  <span className="text-[10px] font-semibold bg-white text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                    {item.duration}
                  </span>
                </div>

                {/* Subject & Venue */}
                <div className="md:w-2/5 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {item.code}: {item.subject}
                    </span>
                    {isLive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 animate-pulse">
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
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors"
                      >
                        View Attendance
                      </button>
                    </>
                  )}

                  {isLive && (
                    <button
                      onClick={handleMarkLiveAttendance}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow flex items-center gap-1.5 transition-all"
                    >
                      <CheckCheck className="w-4 h-4" />
                      <span>Submit Attendance</span>
                    </button>
                  )}

                  {isUpcoming && (
                    <Link
                      href="/staff/attendance"
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors"
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

      {/* Assigned Academic Cohorts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Assigned Batches (AY 2025–26)
            </h2>
          </div>
          <Link
            href="/staff/batches"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Manage All Batches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {assignedCohorts.map((cohort) => (
            <div
              key={cohort.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {cohort.code}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {cohort.students} Students
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-3">
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
                      <span className="font-semibold text-blue-600">{cohort.syllabusProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
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
                  className="text-blue-600 font-semibold hover:underline"
                >
                  View Roster &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Dual Grid: Workload & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Workload Analytics (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">
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
              { day: "FRI", hours: "3.0h", attendance: "90%", height: "h-16" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="text-xs font-bold text-slate-700">{item.hours}</div>
                <div className="w-full bg-slate-50 h-36 flex items-end justify-center p-1.5 rounded-xl border border-slate-100">
                  <div className={`w-full ${item.height} bg-blue-600 rounded-lg transition-all`}></div>
                </div>
                <span className="text-xs font-bold text-slate-900">{item.day}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">{item.attendance}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Biometric Attendance Rating: 99.4%
            </span>
            <span className="text-blue-600 font-semibold">Grade A Standard</span>
          </div>
        </div>

        {/* Faculty Notices (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">
                Faculty Notices
              </h2>
            </div>
            <Link href="/staff/notices" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
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
                <h3 className="text-xs font-bold text-slate-900 leading-snug">
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
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Attendance Session Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedAuditSession(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 text-xs space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-sm font-bold text-slate-900">
                  {selectedAuditSession.code}: {selectedAuditSession.subject}
                </div>
                <div className="text-slate-500 mt-1">
                  Batch: {selectedAuditSession.batch} &bull; Venue: {selectedAuditSession.venue}
                </div>
                <div className="text-blue-600 font-semibold mt-1">
                  Time: {selectedAuditSession.time} &bull; Recorded Attendance: {selectedAuditSession.attendanceInfo}
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl">
                Session verified. Attendance synchronized with central student academic ledger.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAuditSession(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
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
