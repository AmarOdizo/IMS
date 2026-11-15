"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Download,
  Printer,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  BookOpen,
  X,
  ShieldCheck,
  TrendingUp,
  Check,
  Building
} from "lucide-react";

export default function StudentResultsPage() {
  const [selectedTerm, setSelectedTerm] = useState("sem3");
  const [showGrievanceModal, setShowGrievanceModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Re-evaluation form states
  const [selectedSubject, setSelectedSubject] = useState("CS-301 - Data Structures & Algorithms");
  const [serviceType, setServiceType] = useState("Re-Evaluation of Answer Script (₹500)");
  const [discrepancyNote, setDiscrepancyNote] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowGrievanceModal(false);
    triggerToast(`Re-evaluation request for ${selectedSubject.split(" - ")[0]} submitted.`);
    setDiscrepancyNote("");
  };

  const subjectsSem3 = [
    {
      code: "CS-301",
      title: "Data Structures & Algorithms",
      credits: 4,
      internal: 37,
      endSem: 54,
      total: 91,
      grade: "A+",
      gradePoint: 10,
      status: "Pass",
    },
    {
      code: "CS-302",
      title: "Object Oriented Programming (Java)",
      credits: 4,
      internal: 36,
      endSem: 50,
      total: 86,
      grade: "A",
      gradePoint: 9,
      status: "Pass",
    },
    {
      code: "CS-303",
      title: "Computer Organization & Architecture",
      credits: 4,
      internal: 35,
      endSem: 51,
      total: 86,
      grade: "A",
      gradePoint: 9,
      status: "Pass",
    },
    {
      code: "CS-304",
      title: "Discrete Mathematics",
      credits: 4,
      internal: 39,
      endSem: 55,
      total: 94,
      grade: "A+",
      gradePoint: 10,
      status: "Pass",
    },
    {
      code: "CS-305L",
      title: "Data Structures Laboratory",
      credits: 2,
      internal: 39,
      endSem: 58,
      total: 97,
      grade: "O",
      gradePoint: 10,
      status: "Pass",
    },
    {
      code: "MA-301",
      title: "Advanced Engineering Mathematics",
      credits: 4,
      internal: 38,
      endSem: 56,
      total: 94,
      grade: "A+",
      gradePoint: 10,
      status: "Pass",
    },
  ];

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

      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Academic Results
            </h1>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full">
              CGPA: 8.42
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Semester Grade Card &bull; Rahul Sharma (23CS042)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-2xs">
            <Calendar className="w-4 h-4 text-[#355C7D] mr-2 shrink-0" />
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="bg-transparent text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="sem3">Semester III (Declared)</option>
              <option value="sem2">Semester II</option>
              <option value="sem1">Semester I</option>
            </select>
          </div>

          <button
            onClick={() => setShowGrievanceModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Apply Re-Evaluation</span>
          </button>

          <button
            onClick={() => triggerToast("Generating official marksheet (PDF)...")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Marksheet</span>
          </button>
        </div>
      </div>

      {/* 4 Performance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Cumulative CGPA */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Cumulative CGPA</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600 font-mono">8.42</span>
              <span className="text-xs text-slate-400 font-mono">/ 10.0</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "84.2%" }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Cumulative over Sem I, II &amp; III
            </span>
          </div>
        </div>

        {/* Card 2: Term SGPA */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Semester III SGPA</span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#3D405B] font-mono">8.65</span>
              <span className="text-[11px] text-violet-700 font-medium bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200">
                Term High
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-violet-600 h-full rounded-full" style={{ width: "86.5%" }}></div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              548 / 600 Total Marks (91.3%)
            </span>
          </div>
        </div>

        {/* Card 3: Earned Credits */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Credits Earned</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#3D405B] flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#3D405B] font-mono">68</span>
              <span className="text-xs text-slate-400 font-mono">/ 68 Total</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }}></div>
            </div>
            <span className="text-[10px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 0 Backlogs / All Passed
            </span>
          </div>
        </div>

        {/* Card 4: Academic Standing */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Academic Standing</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-slate-900 leading-tight">
              First Class with Distinction
            </div>
            <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mt-2">
              Dean&apos;s Honor List
            </span>
          </div>
        </div>
      </div>

      {/* Main 2 Columns: Semester Marksheet Table (Left 7 Cols) & Marksheet Preview (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Grade Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200/80 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#3D405B]">
                Semester III Marks &amp; Grades Breakdown
              </h2>
              <p className="text-[11px] text-slate-400">
                Official evaluated grades for Fall Term 2024
              </p>
            </div>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-200">
              Result: Pass
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200/80 text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Course</th>
                  <th className="py-2.5 px-2 text-center">Internal (40)</th>
                  <th className="py-2.5 px-2 text-center">End-Sem (60)</th>
                  <th className="py-2.5 px-2 text-center font-bold text-slate-900">Total (100)</th>
                  <th className="py-2.5 px-2 text-center">Grade</th>
                  <th className="py-2.5 px-2 text-center">Credits</th>
                  <th className="py-2.5 px-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjectsSem3.map((sub) => (
                  <tr key={sub.code} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-[#355C7D] block">
                        {sub.code}
                      </span>
                      <span className="text-[11px] font-medium text-slate-800">
                        {sub.title}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-slate-600">
                      {sub.internal}
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-slate-600">
                      {sub.endSem}
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-slate-900">
                      {sub.total}
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-[#355C7D]">
                      {sub.grade}
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-slate-700">
                      {sub.credits}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-md border border-emerald-200">
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Aggregate Total Strip */}
          <div className="bg-[#3D405B] text-white p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div>
              <span className="text-[10px] text-slate-300 uppercase block font-medium">
                Total Marks
              </span>
              <span className="text-base font-bold font-mono">548 / 600</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase block font-medium">
                Percentage
              </span>
              <span className="text-base font-bold font-mono text-emerald-300">
                91.33%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase block font-medium">
                Term SGPA
              </span>
              <span className="text-base font-bold font-mono text-amber-300">
                8.65
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase block font-medium">
                Credits Earned
              </span>
              <span className="text-base font-bold font-mono">22 / 22</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Marksheet Preview Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#355C7D]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#3D405B]">
                Marksheet Card Preview
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => window.print()}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                title="Print Marksheet"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={() => triggerToast("Downloading PDF marksheet...")}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clean Marksheet Card Body */}
          <div className="p-5 text-xs space-y-4">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-900 uppercase">
                Apex Institute of Technology
              </h3>
              <p className="text-[11px] text-slate-500">
                Office of the Controller of Examinations
              </p>
              <div className="mt-1.5 inline-block px-2.5 py-0.5 bg-[#355C7D] text-white text-[10px] font-bold uppercase rounded-md tracking-wider">
                Official Statement of Grades
              </div>
            </div>

            {/* Candidate Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-[10px]">Student Name</span>
                <span className="font-semibold text-slate-900">Rahul Sharma</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Roll Number</span>
                <span className="font-mono font-bold text-[#355C7D]">23CS042</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Program</span>
                <span className="font-medium text-slate-800">B.Tech (CSE)</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Examination</span>
                <span className="font-medium text-slate-800">Semester III</span>
              </div>
            </div>

            {/* Mini Grades Summary */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Subject Summary
              </span>
              <div className="space-y-1">
                {subjectsSem3.map((s) => (
                  <div
                    key={s.code}
                    className="flex justify-between items-center py-1 border-b border-slate-100 text-[11px]"
                  >
                    <span className="font-medium text-slate-700">
                      <strong className="font-mono text-[#355C7D] mr-1">{s.code}</strong>{" "}
                      {s.title}
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {s.total}/100 ({s.grade})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Term Result */}
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[10px]">SGPA</span>
                <span className="text-sm font-bold font-mono text-[#355C7D]">8.65 / 10.0</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px]">Final Status</span>
                <span className="font-bold text-emerald-700">Passed in 1st Attempt</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => triggerToast("Downloading PDF Grade Card...")}
                className="px-4 py-1.5 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Marksheet</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Apply for Re-Evaluation */}
      {showGrievanceModal && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#355C7D]" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Apply for Re-Evaluation
                </h3>
              </div>
              <button
                onClick={() => setShowGrievanceModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGrievanceSubmit} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Select Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#355C7D]"
                >
                  <option>CS-301 - Data Structures &amp; Algorithms</option>
                  <option>CS-302 - OOP with Java</option>
                  <option>CS-303 - Computer Organization &amp; Architecture</option>
                  <option>CS-304 - Discrete Mathematics</option>
                  <option>MA-301 - Advanced Engineering Mathematics</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Service Requested
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#355C7D]"
                >
                  <option>Re-Evaluation of Answer Script (₹500)</option>
                  <option>Recounting of Answer Script Marks (₹250)</option>
                  <option>Certified Copy of Evaluated Answer Sheet (₹300)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Reason / Query Details
                </label>
                <textarea
                  rows={3}
                  value={discrepancyNote}
                  onChange={(e) => setDiscrepancyNote(e.target.value)}
                  placeholder="Specify questions or sections where marks discrepancy is noted..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#355C7D] resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowGrievanceModal(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
