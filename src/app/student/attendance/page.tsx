"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  FileText,
  ShieldCheck,
  Download,
  Plus,
  X,
  Upload,
  BookOpen,
  Filter
} from "lucide-react";

export default function StudentAttendancePage() {
  const [selectedSemester, setSelectedSemester] = useState("sem4");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Leave Form State
  const [leaveType, setLeaveType] = useState("Medical Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !leaveReason.trim()) {
      triggerToast("Please fill all required fields before submitting.");
      return;
    }
    setShowLeaveModal(false);
    triggerToast(`Leave application (${leaveType}) submitted for mentor approval.`);
    setStartDate("");
    setEndDate("");
    setLeaveReason("");
  };

  // Current Semester Courses Attendance
  const subjectAttendance = [
    {
      code: "CS-401",
      title: "Database Management Systems",
      faculty: "Prof. Arvind Swaminathan",
      attended: 38,
      total: 42,
      percentage: 90.5,
      status: "Eligible",
    },
    {
      code: "CS-402",
      title: "Operating Systems",
      faculty: "Dr. Meera Nambiar",
      attended: 36,
      total: 40,
      percentage: 90.0,
      status: "Eligible",
    },
    {
      code: "CS-403",
      title: "Design & Analysis of Algorithms",
      faculty: "Dr. Richard Thorne",
      attended: 34,
      total: 40,
      percentage: 85.0,
      status: "Eligible",
    },
    {
      code: "CS-404",
      title: "Automata & Formal Languages",
      faculty: "Prof. K. G. Ramanathan",
      attended: 28,
      total: 35,
      percentage: 80.0,
      status: "Eligible",
    },
    {
      code: "CS-405L",
      title: "Systems Engineering Laboratory",
      faculty: "Er. Tanvi Desai",
      attended: 18,
      total: 20,
      percentage: 90.0,
      status: "Eligible",
    },
  ];

  // Recent Attendance Records
  const attendanceLogs = [
    {
      id: "LOG-01",
      date: "27 Mar 2025",
      code: "CS-401",
      subject: "Database Management Systems",
      slot: "09:00 – 10:00 AM",
      venue: "Lecture Hall 302",
      status: "Present",
    },
    {
      id: "LOG-02",
      date: "26 Mar 2025",
      code: "CS-405L",
      subject: "Systems Engineering Laboratory",
      slot: "02:00 – 05:00 PM",
      venue: "Lab Complex Block III",
      status: "Present",
    },
    {
      id: "LOG-03",
      date: "25 Mar 2025",
      code: "CS-402",
      subject: "Operating Systems",
      slot: "11:00 – 12:00 PM",
      venue: "Lecture Hall 204",
      status: "Present",
    },
    {
      id: "LOG-04",
      date: "24 Mar 2025",
      code: "CS-403",
      subject: "Design & Analysis of Algorithms",
      slot: "09:00 – 10:00 AM",
      venue: "Lecture Hall 301",
      status: "Present",
    },
    {
      id: "LOG-05",
      date: "21 Mar 2025",
      code: "CS-404",
      subject: "Automata & Formal Languages",
      slot: "10:00 – 11:00 AM",
      venue: "Hall B-11",
      status: "Absent",
    },
    {
      id: "LOG-06",
      date: "19 Mar 2025",
      code: "CS-401",
      subject: "Database Management Systems",
      slot: "09:00 – 10:00 AM",
      venue: "Lecture Hall 302",
      status: "Present",
    },
    {
      id: "LOG-07",
      date: "17 Mar 2025",
      code: "CS-402",
      subject: "Operating Systems",
      slot: "11:00 – 12:00 PM",
      venue: "Lecture Hall 204",
      status: "Present",
    },
    {
      id: "LOG-08",
      date: "12 Mar 2025",
      code: "CS-ALL",
      subject: "Approved Leave / Hospital Slip",
      slot: "Full Day Sessions",
      venue: "Medical Exemption",
      status: "Medical Leave",
    },
    {
      id: "LOG-09",
      date: "07 Mar 2025",
      code: "CS-403",
      subject: "Design & Analysis of Algorithms",
      slot: "09:00 – 10:00 AM",
      venue: "Lecture Hall 301",
      status: "Present",
    },
    {
      id: "LOG-10",
      date: "05 Mar 2025",
      code: "CS-404",
      subject: "Automata & Formal Languages",
      slot: "10:00 – 11:00 AM",
      venue: "Hall B-11",
      status: "Absent",
    },
  ];

  const filteredLogs = attendanceLogs.filter((log) => {
    const matchesSearch =
      log.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.date.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "PRESENT" && log.status === "Present") ||
      (statusFilter === "ABSENT" && log.status === "Absent") ||
      (statusFilter === "LEAVE" && log.status === "Medical Leave");

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
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

      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Attendance Record
            </h1>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full">
              88.4% Overall
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Semester IV (Even Term 2024–25) &bull; Rahul Sharma (23CS042)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-2xs">
            <Calendar className="w-4 h-4 text-[#355C7D] mr-2 shrink-0" />
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="sem4">Semester IV (Current)</option>
              <option value="sem3">Semester III</option>
              <option value="sem2">Semester II</option>
              <option value="sem1">Semester I</option>
            </select>
          </div>

          <button
            onClick={() => setShowLeaveModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Apply for Leave</span>
          </button>

          <button
            onClick={() => triggerToast("Generating official attendance report (PDF)...")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Aggregate Attendance */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Overall Attendance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600 font-mono">88.4%</span>
              <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Exam Eligible
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "88.4%" }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Minimum required: 75.0%
            </span>
          </div>
        </div>

        {/* Card 2: Attended Classes */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Classes Attended</span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#3D405B] font-mono">114</span>
              <span className="text-xs text-slate-400 font-mono">/ 129 Sessions</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-violet-600 h-full rounded-full" style={{ width: "88.4%" }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Total conducted this semester
            </span>
          </div>
        </div>

        {/* Card 3: Absences */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Absences</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-600 font-mono">11</span>
              <span className="text-xs text-rose-600 font-medium">Classes Missed</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: "8.5%" }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              8.5% of total classes
            </span>
          </div>
        </div>

        {/* Card 4: Approved Leaves / OD */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Approved Leaves &amp; OD</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-600 font-mono">4</span>
              <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Medical Exemption
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: "100%" }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Credited in final eligibility
            </span>
          </div>
        </div>
      </div>

      {/* Main 2 Columns: Subject-Wise Progress (Left) & Recent Attendance Log (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 Cols): Subject-Wise Attendance Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#355C7D]" />
              <h2 className="text-sm font-bold text-[#3D405B]">
                Subject-Wise Attendance
              </h2>
            </div>
            <span className="text-[11px] font-mono font-semibold text-slate-500">
              5 Courses
            </span>
          </div>

          <div className="p-4 divide-y divide-slate-100 space-y-4">
            {subjectAttendance.map((sub) => (
              <div key={sub.code} className="pt-3 first:pt-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#355C7D]">
                        {sub.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-900">
                        {sub.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {sub.faculty}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-md shrink-0 border ${
                      sub.percentage >= 85
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {sub.percentage >= 85 ? "Eligible" : "Safe Margin"}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">
                      {sub.attended} / {sub.total} Classes
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        sub.percentage >= 85 ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {sub.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 mt-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        sub.percentage >= 85 ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${sub.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200/80 text-xs text-slate-500 flex items-center justify-between">
            <span>Minimum 75% required per subject</span>
            <span className="text-emerald-700 font-semibold font-mono">
              All 5 Clear
            </span>
          </div>
        </div>

        {/* Right Column (7 Cols): Recent Attendance Activity Log */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Header & Filter Controls */}
          <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#3D405B]">
                Attendance History
              </h2>
              <p className="text-[11px] text-slate-400">
                Detailed record of attended and missed sessions
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search subject..."
                  className="pl-8 pr-3 py-1.5 bg-slate-50 text-slate-800 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#355C7D] w-36 sm:w-44"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 text-slate-700 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#355C7D] cursor-pointer"
              >
                <option value="ALL">All</option>
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
                <option value="LEAVE">Leave</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200/80 text-[11px]">
                <tr>
                  <th className="py-2.5 px-4">Date</th>
                  <th className="py-2.5 px-4">Course</th>
                  <th className="py-2.5 px-4 hidden sm:table-cell">Timing</th>
                  <th className="py-2.5 px-4 hidden md:table-cell">Room</th>
                  <th className="py-2.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-700">
                      {log.date}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#355C7D] mr-1.5">
                        {log.code}
                      </span>
                      <span className="text-slate-800">{log.subject}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 hidden sm:table-cell text-[11px]">
                      {log.slot}
                    </td>
                    <td className="py-3 px-4 text-slate-500 hidden md:table-cell text-[11px]">
                      {log.venue}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-md border ${
                          log.status === "Present"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : log.status === "Absent"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400 text-xs">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {filteredLogs.length} of {attendanceLogs.length} recent sessions
            </span>
            <Link
              href="/student"
              className="text-[#355C7D] hover:underline font-medium text-xs"
            >
              Back to Dashboard &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL: Apply for Leave / OD */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#355C7D]" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Apply for Leave / On-Duty (OD)
                </h3>
              </div>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="py-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Leave Type
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-slate-50 text-slate-800 focus:outline-none focus:border-[#355C7D] focus:bg-white"
                >
                  <option>Medical Leave</option>
                  <option>Institutional On-Duty (OD) / Hackathon</option>
                  <option>Sports &amp; Cultural Representation</option>
                  <option>Family Emergency / Personal Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded-xl p-2 text-xs text-slate-800 focus:outline-none focus:border-[#355C7D]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full border border-slate-300 rounded-xl p-2 text-xs text-slate-800 focus:outline-none focus:border-[#355C7D]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Reason for Absence
                </label>
                <textarea
                  rows={3}
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Enter details of illness, event, or reasons for leave..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#355C7D] resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Supporting Document (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#355C7D] transition-colors bg-slate-50/50">
                  <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                  <div className="text-xs text-slate-600 font-medium">
                    Upload Doctor Slip, Prescription, or Event Invitation
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    PDF, JPG, PNG (Max 5MB)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
