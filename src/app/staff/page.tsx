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
    time: "09:00 - 10:00",
    duration: "60 MIN",
    code: "CS-401",
    subject: "Database Management Systems",
    batch: "B.Tech CS-IV-A",
    venue: "Lecture Hall 302",
    attendanceInfo: "58/62 Attended (93.5%)",
    status: "completed",
    statusText: "COMPLETED • LOCKED"
  },
  {
    id: "sch-2",
    time: "11:00 - 12:00",
    duration: "60 MIN",
    code: "CS-403",
    subject: "Advanced Database Systems",
    batch: "M.Tech DS-II",
    venue: "Room 204 (PG Block)",
    attendanceInfo: "27/28 Attended (96.4%)",
    status: "completed",
    statusText: "COMPLETED • LOCKED"
  },
  {
    id: "sch-3",
    time: "14:00 - 15:00",
    duration: "60 MIN",
    code: "CS-202",
    subject: "Data Structures Foundation",
    batch: "BCA-II-B",
    venue: "Seminar Hall B",
    attendanceInfo: "Active Period: Unit 3 Trees",
    status: "live",
    statusText: "LIVE IN PROGRESS"
  },
  {
    id: "sch-4",
    time: "15:30 - 17:00",
    duration: "90 MIN",
    code: "CS-405L",
    subject: "Database Engineering Lab",
    batch: "B.Tech CS-IV-B",
    venue: "Turing Computing Lab 3",
    attendanceInfo: "Strength: 48 Systems • Terminal 01-48",
    status: "upcoming",
    statusText: "UPCOMING • OPENS 15:15"
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
    ref: "APX/DEAN/2024-119",
    title: "Mid-Term Question Paper Submission Deadline",
    dept: "Office of the Controller of Examinations",
    deadline: "May 28, 2024 • 17:00 IST",
    priority: "Urgent",
    badgeColor: "bg-error text-on-error"
  },
  {
    id: "FN-02",
    ref: "APX/ACAD/2024-098",
    title: "Final Exam Script Moderation Guidelines & Evaluation Rubric",
    dept: "Directorate of Academic Affairs",
    deadline: "June 05, 2024",
    priority: "High",
    badgeColor: "bg-secondary text-on-secondary"
  },
  {
    id: "FN-03",
    ref: "APX/RES/2024-042",
    title: "Distinguished Guest Lecture: Microkernels for Transformer Workloads",
    dept: "Center for Advanced Computing",
    deadline: "May 28 • Turing Hall",
    priority: "Notice",
    badgeColor: "bg-surface-container text-primary border border-[#cbd5e1]"
  }
];

export default function StaffDashboardPage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(todaySchedule);
  const [selectedAuditSession, setSelectedAuditSession] = useState<ScheduleItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
              statusText: "COMPLETED • LOCKED",
              attendanceInfo: "32/34 Attended (94.1%)"
            }
          : item
      )
    );
    showToast("Attendance for BCA-II-B CS-202 successfully saved and locked!");
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

      {/* Top Command Telemetry Bar */}
      <div className="px-6 py-2.5 bg-surface-container-low border-b border-[#0D2545]/15 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-primary uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            FACULTY NODE // CLUSTER 04
          </span>
          <span className="text-outline">/</span>
          <span className="font-mono text-xs text-on-surface-variant">NODE STATUS: SYNCHRONIZED</span>
          <span className="text-outline">/</span>
          <span className="font-mono text-xs text-on-surface-variant">PORTAL RELAY: 104.28.19.2</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant">
          <span>
            SERVER TIME: <strong className="text-primary font-bold">14:18:22 IST</strong>
          </span>
          <span className="text-outline">|</span>
          <span>CYCLE: AY-2024-S2</span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {/* Personalized Faculty Header Banner */}
        <div className="bg-surface-container-lowest p-6 border border-[#cbd5e1] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-secondary/10 to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-primary text-on-primary font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider font-semibold rounded-xs">
                  FACULTY DIRECTORY
                </span>
                <span className="bg-surface-container text-primary font-mono text-[10px] px-2 py-0.5 uppercase font-bold border border-[#c4c6cf] rounded-xs">
                  EMP-CS-2018-842
                </span>
                <div className="flex items-center gap-1.5 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] px-2 py-0.5 rounded-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span>
                  <span className="font-mono text-[10px] uppercase font-bold">
                    ACTIVE FACULTY • BIOMETRIC LOGGED 08:42 AM
                  </span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary mt-1">
                Welcome back, Mr. Amit Sharma
              </h1>
              <p className="text-xs text-on-surface-variant flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-primary">Senior Assistant Professor</span>
                <span className="text-outline">•</span>
                <span>Department of Computer Science &amp; Engineering</span>
                <span className="text-outline">•</span>
                <span className="font-mono text-secondary font-bold">Cabin CS-B204</span>
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/staff/attendance"
                className="bg-primary hover:bg-primary-container text-on-primary px-3.5 py-2 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors shadow-sm rounded-sm"
              >
                <CheckCheck className="h-4 w-4 text-secondary-container" />
                <span>Mark Today&apos;s Attendance</span>
              </Link>
              <Link
                href="/staff/exams"
                className="bg-surface-container hover:bg-surface-container-high text-primary px-3.5 py-2 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors border border-[#cbd5e1] rounded-sm"
              >
                <FileSpreadsheet className="h-4 w-4 text-secondary" />
                <span>Enter Exam Marks</span>
              </Link>
              <Link
                href="/staff/students"
                className="bg-surface-container-lowest hover:bg-surface-container text-on-surface hover:text-primary px-3.5 py-2 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors border border-[#cbd5e1] rounded-sm"
              >
                <Users className="h-4 w-4 text-outline" />
                <span>View Assigned Students</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 KPI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative flex flex-col justify-between border-l-4 border-l-primary rounded-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                  Assigned Batches
                </span>
                <Layers className="h-4 w-4 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-primary tracking-tight mt-1">4 Active Cohorts</div>
            </div>
            <div className="mt-3 pt-2 bg-surface-container-low p-2 rounded-xs border border-[#eff4ff]">
              <p className="font-mono text-[11px] text-on-surface-variant truncate">
                B.Tech IV (A/B), M.Tech II, BCA II
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative flex flex-col justify-between border-l-4 border-l-secondary rounded-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                  Registered Roster
                </span>
                <Users className="h-4 w-4 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-primary tracking-tight mt-1">184 Students</div>
            </div>
            <div className="mt-3 pt-2 bg-surface-container-low p-2 rounded-xs border border-[#eff4ff] flex items-center justify-between">
              <span className="font-mono text-[11px] text-on-surface-variant">156 UG • 28 PG Scholars</span>
              <span className="text-[10px] font-mono text-[#047857] font-bold uppercase">100% Verified</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative flex flex-col justify-between border-l-4 border-l-primary-container rounded-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                  Today&apos;s Attendance
                </span>
                <Clock className="h-4 w-4 text-secondary" />
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <div className="text-2xl font-bold text-primary tracking-tight">
                  {schedule.filter((s) => s.status === "completed").length} of 4 Marked
                </div>
                <span className="text-[11px] font-mono font-bold text-secondary">
                  {schedule.filter((s) => s.status === "completed").length === 4 ? "100% DONE" : "75% DONE"}
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2 bg-surface-container-low p-2 rounded-xs border border-[#eff4ff]">
              <p className="font-mono text-[11px] text-on-surface-variant truncate">
                Pending: CS-405L Turing Lab (03:30 PM)
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative flex flex-col justify-between border-l-4 border-l-tertiary-container rounded-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                  Mid-Term Cycle
                </span>
                <CalendarDays className="h-4 w-4 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-primary tracking-tight mt-1">2 Evaluations</div>
            </div>
            <div className="mt-3 pt-2 bg-surface-container-low p-2 rounded-xs border border-[#eff4ff] flex items-center justify-between">
              <span className="font-mono text-[11px] text-error font-bold">Starts in 6 Days</span>
              <span className="text-[10px] font-mono text-primary font-bold">CS-401 • CS-405L</span>
            </div>
          </div>
        </div>

        {/* Teaching Schedule Strip (Interactive Timetable) */}
        <div className="bg-surface-container-lowest p-6 border border-[#cbd5e1] shadow-sm flex flex-col gap-4 rounded-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0D2545]/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-surface-container rounded-sm text-secondary">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-primary uppercase tracking-tight">
                  Today&apos;s Teaching Schedule
                </h2>
                <p className="text-xs font-mono text-on-surface-variant">
                  THURSDAY • 4 SESSIONS PROGRAMMED
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-on-surface-variant">Live Telemetry:</span>
              <span className="px-2.5 py-0.5 bg-surface-container text-primary font-mono text-xs font-bold border border-[#cbd5e1] rounded-xs">
                T-MINUS 1:12 TO NEXT LAB
              </span>
            </div>
          </div>

          {/* Timeline Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px] flex flex-col gap-2">
              {schedule.map((item) => {
                const isCompleted = item.status === "completed";
                const isLive = item.status === "live";
                const isUpcoming = item.status === "upcoming";

                return (
                  <div
                    key={item.id}
                    className={`p-4 flex items-center justify-between transition-colors border rounded-sm ${
                      isLive
                        ? "bg-[#eff4ff] border-secondary shadow-sm"
                        : "bg-surface-container-lowest hover:bg-surface-container-low border-[#cbd5e1]"
                    }`}
                  >
                    {/* Time Window */}
                    <div className="flex items-center gap-4 w-1/4">
                      <div
                        className={`font-mono text-base font-bold ${
                          isLive ? "text-secondary" : "text-primary"
                        }`}
                      >
                        {item.time}
                      </div>
                      <span className="font-mono text-[10px] uppercase bg-surface-container text-on-surface-variant px-1.5 py-0.5 border border-[#c4c6cf] rounded-xs">
                        {item.duration}
                      </span>
                    </div>

                    {/* Subject & Details */}
                    <div className="w-2/5 flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary leading-tight">
                          {item.code}: {item.subject}
                        </span>
                        {isLive && (
                          <span className="h-2 w-2 rounded-full bg-secondary animate-ping"></span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5">
                        <span className="font-semibold text-primary">{item.batch}</span>
                        <span>•</span>
                        <span>{item.venue}</span>
                        <span>•</span>
                        <span className="font-mono text-[11px]">{item.attendanceInfo}</span>
                      </div>
                    </div>

                    {/* Action & Status */}
                    <div className="flex items-center gap-3">
                      {isCompleted && (
                        <>
                          <div className="bg-surface-container text-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-[#cbd5e1] rounded-xs">
                            <Lock className="h-3.5 w-3.5 text-secondary" />
                            <span>{item.statusText}</span>
                          </div>
                          <button
                            onClick={() => setSelectedAuditSession(item)}
                            className="px-3 py-1 bg-surface-container-lowest text-primary font-mono text-[11px] uppercase font-bold hover:bg-surface-container border border-[#cbd5e1] transition-colors rounded-xs"
                          >
                            Audit Roll
                          </button>
                        </>
                      )}

                      {isLive && (
                        <>
                          <div className="bg-secondary text-on-secondary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 rounded-xs animate-pulse">
                            <Radio className="h-3.5 w-3.5" />
                            <span>{item.statusText}</span>
                          </div>
                          <button
                            onClick={handleMarkLiveAttendance}
                            className="px-3.5 py-1 bg-primary text-on-primary font-mono text-[11px] uppercase font-bold hover:bg-primary-container transition-colors shadow-sm rounded-xs flex items-center gap-1"
                          >
                            <CheckCheck className="h-3.5 w-3.5" />
                            <span>Mark Register</span>
                          </button>
                        </>
                      )}

                      {isUpcoming && (
                        <>
                          <div className="bg-surface-container text-outline px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 border border-[#cbd5e1] rounded-xs">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{item.statusText}</span>
                          </div>
                          <Link
                            href="/staff/attendance"
                            className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-[11px] uppercase font-bold border border-[#cbd5e1] transition-colors rounded-xs"
                          >
                            Pre-Load Roster
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Assigned Academic Cohorts Grid */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-secondary" />
              <h2 className="text-base font-bold text-primary uppercase tracking-tight">
                Assigned Academic Cohorts (AY 2024–25)
              </h2>
            </div>
            <Link
              href="/staff/batches"
              className="text-xs font-mono uppercase font-bold text-secondary hover:underline flex items-center gap-1"
            >
              <span>Manage All Batches</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {assignedCohorts.map((cohort) => (
              <div
                key={cohort.id}
                className="bg-surface-container-lowest p-5 border border-[#cbd5e1] shadow-sm flex flex-col justify-between rounded-sm hover:border-secondary transition-all"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#0D2545]/10">
                    <span className="font-mono text-[11px] text-secondary font-bold">
                      {cohort.code}
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container font-mono text-[10px] text-primary font-bold rounded-xs">
                      {cohort.students} Enrolled
                    </span>
                  </div>

                  <h3 className="text-sm font-bold uppercase text-primary tracking-tight mt-2.5">
                    {cohort.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">{cohort.course}</p>

                  <div className="mt-3.5 pt-3 border-t border-[#eff4ff] flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-outline">Attendance Health:</span>
                      <span className="font-mono font-bold text-[#047857]">
                        {cohort.avgAttendance}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary"
                        style={{ width: `${cohort.avgAttendance}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-outline">Syllabus Covered:</span>
                      <span className="font-mono font-bold text-primary">
                        {cohort.syllabusProgress}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${cohort.syllabusProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#0D2545]/10 flex items-center justify-between text-[11px] font-mono text-outline">
                  <span>{cohort.venue}</span>
                  <Link
                    href={`/staff/batches?batch=${cohort.id}`}
                    className="text-secondary font-bold hover:underline"
                  >
                    View Roster &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Dual Grid: Analytics & Notices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Weekly Workload & Attendance Analytics (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 border border-[#cbd5e1] shadow-sm flex flex-col gap-4 rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#0D2545]/10">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-secondary" />
                <h2 className="text-sm font-bold uppercase tracking-tight text-primary">
                  Weekly Teaching Workload &amp; Attendance Analytics
                </h2>
              </div>
              <span className="font-mono text-xs text-outline">Total: 22 Hrs / Wk</span>
            </div>

            {/* Metric Bars Visualization */}
            <div className="grid grid-cols-5 gap-3 pt-2 text-center">
              {[
                { day: "MON", hours: "5.0h", attendance: "91%", height: "h-28" },
                { day: "TUE", hours: "4.5h", attendance: "94%", height: "h-24" },
                { day: "WED", hours: "5.5h", attendance: "88%", height: "h-32" },
                { day: "THU", hours: "4.0h", attendance: "93%", height: "h-20" },
                { day: "FRI", hours: "3.0h", attendance: "90%", height: "h-16" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div className="font-mono text-xs font-bold text-primary">{item.hours}</div>
                  <div className="w-full bg-surface-container-low h-36 flex items-end justify-center p-1 rounded-sm border border-[#cbd5e1]">
                    <div
                      className={`w-full ${item.height} bg-gradient-to-t from-primary to-secondary rounded-xs`}
                    ></div>
                  </div>
                  <span className="font-mono text-xs font-bold text-on-surface">{item.day}</span>
                  <span className="font-mono text-[10px] text-[#047857] font-semibold">
                    {item.attendance}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-surface-container-low border border-[#cbd5e1] text-xs font-mono text-on-surface-variant flex items-center justify-between rounded-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                Compliance Rating: 99.4% (All sessions logged on biometric reader)
              </span>
              <span className="text-primary font-bold">Grade A++ Standard</span>
            </div>
          </div>

          {/* Faculty Notices & Memos (5 Cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-6 border border-[#cbd5e1] shadow-sm flex flex-col justify-between gap-4 rounded-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#0D2545]/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-secondary" />
                  <h2 className="text-sm font-bold uppercase tracking-tight text-primary">
                    Faculty Notices &amp; Directives
                  </h2>
                </div>
                <Link
                  href="/staff/notices"
                  className="font-mono text-xs text-secondary font-bold hover:underline"
                >
                  All Circulars &rarr;
                </Link>
              </div>

              <div className="divide-y divide-[#0D2545]/10">
                {facultyNotices.map((memo) => (
                  <div key={memo.id} className="py-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-outline font-semibold">
                        {memo.ref}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 font-mono text-[9px] uppercase font-bold rounded-xs ${memo.badgeColor}`}
                      >
                        {memo.priority}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-primary uppercase leading-snug">
                      {memo.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] font-mono text-on-surface-variant mt-0.5">
                      <span className="truncate">{memo.dept}</span>
                      <span className="text-error font-semibold shrink-0">{memo.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/staff/notices"
              className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-primary text-center font-mono text-xs uppercase font-bold tracking-wider border border-[#cbd5e1] transition-colors rounded-sm"
            >
              Open Academic Gazette &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Audit Roll Modal */}
      {selectedAuditSession && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg border-2 border-primary shadow-[4px_4px_0_0_#0d2545] p-6 relative rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#cbd5e1]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">
                  Locked Attendance Session Audit
                </h3>
              </div>
              <button
                onClick={() => setSelectedAuditSession(null)}
                className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 text-xs font-mono flex flex-col gap-3">
              <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm">
                <div className="text-sm font-bold text-primary">
                  {selectedAuditSession.code}: {selectedAuditSession.subject}
                </div>
                <div className="text-on-surface-variant mt-1">
                  Batch: {selectedAuditSession.batch} • Venue: {selectedAuditSession.venue}
                </div>
                <div className="text-secondary font-bold mt-1">
                  Time: {selectedAuditSession.time} • Recorded Attendance:{" "}
                  {selectedAuditSession.attendanceInfo}
                </div>
              </div>

              <div className="p-3 bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] rounded-sm">
                Session cryptographic hash locked. Biometric attendance synchronized with Campus Attendance Controller at 10:04 AM.
              </div>
            </div>

            <div className="pt-3 border-t border-[#cbd5e1] flex justify-end gap-2">
              <button
                onClick={() => setSelectedAuditSession(null)}
                className="px-4 py-1.5 bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors rounded-sm"
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

