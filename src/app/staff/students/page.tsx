"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  X,
  MessageSquare,
  Award,
  BookOpen,
  Send,
  ExternalLink,
  Flame,
  FileText
} from "lucide-react";

interface StudentDossier {
  id: string;
  roll: string;
  name: string;
  batch: string;
  course: string;
  attendancePct: number;
  attendanceTag: "Safe" | "At Risk";
  icaScore: string;
  icaNum: number;
  riskAssessment: "Normal" | "Distinction" | "Shortage Warning";
  status: "Active" | "Medical Leave";
  cgpa: string;
  email: string;
  phone: string;
  guardian: string;
  guardianPhone: string;
  residence: string;
  avatarUrl: string;
}

const studentsMasterList: StudentDossier[] = [
  {
    id: "stu-1",
    roll: "APX-2023-CS-042",
    name: "Rahul Sharma",
    batch: "B.Tech CS-IV-A",
    course: "Computer Science & Eng.",
    attendancePct: 88.4,
    attendanceTag: "Safe",
    icaScore: "38/40",
    icaNum: 38,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.82",
    email: "rahul.sharma23@apex.edu.in",
    phone: "+91 98111 22334",
    guardian: "Rajesh Sharma",
    guardianPhone: "+91 98111 22335",
    residence: "Hall of Residence C, Room 314",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-2",
    roll: "APX-2023-CS-015",
    name: "Priya Patel",
    batch: "B.Tech CS-IV-A",
    course: "Computer Science & Eng.",
    attendancePct: 94.2,
    attendanceTag: "Safe",
    icaScore: "39/40",
    icaNum: 39,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.91",
    email: "priya.patel23@apex.edu.in",
    phone: "+91 98222 33445",
    guardian: "Vikram Patel",
    guardianPhone: "+91 98222 33446",
    residence: "Sarojini Naidu Girls Hostel, Room 102",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-3",
    roll: "APX-2023-CS-078",
    name: "Rohan Verma",
    batch: "B.Tech CS-IV-A",
    course: "Computer Science & Eng.",
    attendancePct: 71.5,
    attendanceTag: "At Risk",
    icaScore: "24/40",
    icaNum: 24,
    riskAssessment: "Shortage Warning",
    status: "Active",
    cgpa: "2.64",
    email: "rohan.verma23@apex.edu.in",
    phone: "+91 97333 44556",
    guardian: "Suresh Verma",
    guardianPhone: "+91 97333 44557",
    residence: "Day Scholar (Gurugram Sec 14)",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-4",
    roll: "APX-2023-CS-089",
    name: "Sneha Rao",
    batch: "B.Tech CS-IV-A",
    course: "Computer Science & Eng.",
    attendancePct: 96.0,
    attendanceTag: "Safe",
    icaScore: "40/40",
    icaNum: 40,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.95",
    email: "sneha.rao23@apex.edu.in",
    phone: "+91 96444 55667",
    guardian: "Venkat Rao",
    guardianPhone: "+91 96444 55668",
    residence: "Sarojini Naidu Girls Hostel, Room 215",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-5",
    roll: "APX-2023-CS-104",
    name: "Vikram Malhotra",
    batch: "B.Tech CS-IV-B",
    course: "Computer Science & Eng.",
    attendancePct: 68.2,
    attendanceTag: "At Risk",
    icaScore: "22/40",
    icaNum: 22,
    riskAssessment: "Shortage Warning",
    status: "Active",
    cgpa: "2.45",
    email: "vikram.m23@apex.edu.in",
    phone: "+91 95555 66778",
    guardian: "Anil Malhotra",
    guardianPhone: "+91 95555 66779",
    residence: "Hall of Residence A, Room 402",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-6",
    roll: "APX-2024-DS-012",
    name: "Kavita Krishnamurthy",
    batch: "M.Tech DS-II",
    course: "Data Systems & Analytics",
    attendancePct: 95.5,
    attendanceTag: "Safe",
    icaScore: "37/40",
    icaNum: 37,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.88",
    email: "kavita.k24@apex.edu.in",
    phone: "+91 94666 77889",
    guardian: "S. Krishnamurthy",
    guardianPhone: "+91 94666 77890",
    residence: "PG Scholar Tower 1, Apt 4B",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-7",
    roll: "APX-2024-BCA-008",
    name: "Aman Deep Singh",
    batch: "BCA-II-B",
    course: "Bachelor of Computer App",
    attendancePct: 84.6,
    attendanceTag: "Safe",
    icaScore: "31/40",
    icaNum: 31,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.20",
    email: "amandeep.s24@apex.edu.in",
    phone: "+91 93777 88990",
    guardian: "Gurdeep Singh",
    guardianPhone: "+91 93777 88991",
    residence: "Day Scholar (South Delhi)",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
  }
];

export default function StaffStudentsPage() {
  const [students] = useState<StudentDossier[]>(studentsMasterList);
  const [selectedStudent, setSelectedStudent] = useState<StudentDossier>(studentsMasterList[0]);
  const [activeBatchTab, setActiveBatchTab] = useState("B.Tech CS-IV-A");
  const [searchQuery, setSearchQuery] = useState("");
  const [attFilter, setAttFilter] = useState("all");
  const [standingFilter, setStandingFilter] = useState("all");
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
  const [advisoryNote, setAdvisoryNote] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendAdvisory = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdvisoryModalOpen(false);
    setAdvisoryNote("");
    showToast(`Advisory dispatched to ${selectedStudent.name} and logged in mentorship dossier!`);
  };

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesBatch = activeBatchTab === "All" || s.batch === activeBatchTab;
      const matchesSearch =
        searchQuery === "" ||
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesAtt =
        attFilter === "all" ||
        (attFilter === "safe" && s.attendancePct >= 75) ||
        (attFilter === "risk" && s.attendancePct < 75);

      const matchesStanding =
        standingFilter === "all" ||
        (standingFilter === "distinction" && s.riskAssessment === "Distinction") ||
        (standingFilter === "support" && s.riskAssessment === "Shortage Warning");

      return matchesBatch && matchesSearch && matchesAtt && matchesStanding;
    });
  }, [students, activeBatchTab, searchQuery, attFilter, standingFilter]);

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
        {/* Scoped Context & Breadcrumb Bar */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-on-surface-variant font-mono">
            <Link href="/staff" className="hover:text-primary">Staff Portal</Link>
            <ChevronRight className="h-3.5 w-3.5 text-outline" />
            <span>Academic Operations</span>
            <ChevronRight className="h-3.5 w-3.5 text-outline" />
            <span className="text-primary font-bold">My Assigned Students</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-1">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary">
                  Assigned Students Directory
                </h1>
                <span className="bg-primary text-secondary-container font-mono text-[10px] px-2 py-0.5 font-bold uppercase rounded-xs">
                  Faculty Scope
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Roster of <strong className="text-primary font-mono">184</strong> active students across your 4 assigned batches. View attendance telemetry, academic standing, and continuous assessment.
              </p>
            </div>

            <div className="flex items-center gap-2.5 bg-surface-container-low px-4 py-2 border border-[#cbd5e1] rounded-sm text-xs">
              <ShieldCheck className="h-5 w-5 text-secondary shrink-0" />
              <div className="flex flex-col">
                <span className="font-mono text-[11px] uppercase font-bold text-primary">
                  Academic Advisory Mode
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  Fee &amp; core admission ledgers are locked to Registrar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Batch Segmented Controller Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest p-2 border border-[#cbd5e1] shadow-sm rounded-sm">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {[
              { label: "All My Batches", val: "All", count: 184 },
              { label: "B.Tech CS-IV-A", val: "B.Tech CS-IV-A", count: 62 },
              { label: "B.Tech CS-IV-B", val: "B.Tech CS-IV-B", count: 58 },
              { label: "M.Tech DS-II", val: "M.Tech DS-II", count: 28 },
              { label: "BCA-II-B", val: "BCA-II-B", count: 36 }
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setActiveBatchTab(tab.val)}
                className={`px-3 py-1.5 uppercase font-bold tracking-wider flex items-center gap-1.5 rounded-xs transition-colors ${
                  activeBatchTab === tab.val
                    ? "bg-primary text-on-primary shadow-xs"
                    : "text-on-surface hover:bg-surface-container"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] font-mono rounded-xs ${
                    activeBatchTab === tab.val
                      ? "bg-secondary-container text-primary font-bold"
                      : "bg-surface-container text-primary"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-2 text-xs font-mono">
            <span className="text-outline uppercase text-[10px]">Active Batch Code:</span>
            <span className="font-bold text-primary bg-surface-container px-2 py-0.5 border border-[#cbd5e1] rounded-xs">
              AY24-CS4A-REG
            </span>
          </div>
        </div>

        {/* Filter & Omni-Search Command Strip */}
        <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm flex flex-col xl:flex-row gap-3 items-stretch xl:items-center justify-between rounded-sm">
          <div className="flex-1 flex flex-col md:flex-row items-stretch md:items-center gap-2.5 text-xs font-mono">
            {/* Search Field */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="h-4 w-4 text-outline absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, roll number, or reg ID..."
                className="w-full h-9 pl-9 pr-3 bg-surface-container-low text-primary placeholder:text-outline border border-[#cbd5e1] focus:border-primary outline-none rounded-xs"
              />
            </div>

            {/* Filter: Attendance */}
            <div className="flex items-center bg-surface-container-low px-2.5 h-9 border border-[#cbd5e1] rounded-xs">
              <span className="text-outline uppercase mr-2 text-[10px]">Attendance:</span>
              <select
                value={attFilter}
                onChange={(e) => setAttFilter(e.target.value)}
                className="bg-transparent text-primary font-bold outline-none cursor-pointer"
              >
                <option value="all">All Records</option>
                <option value="safe">Above 75% Safe</option>
                <option value="risk">Below 75% At Risk</option>
              </select>
            </div>

            {/* Filter: Standing */}
            <div className="flex items-center bg-surface-container-low px-2.5 h-9 border border-[#cbd5e1] rounded-xs">
              <span className="text-outline uppercase mr-2 text-[10px]">Academic Standing:</span>
              <select
                value={standingFilter}
                onChange={(e) => setStandingFilter(e.target.value)}
                className="bg-transparent text-primary font-bold outline-none cursor-pointer"
              >
                <option value="all">All Bands</option>
                <option value="distinction">Distinction (&gt;85%)</option>
                <option value="support">Needs Support (&lt;65%)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 justify-end">
            <button
              onClick={() => showToast("Exporting assigned roster CSV...")}
              className="h-9 px-3.5 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 border border-[#cbd5e1] transition-colors rounded-xs"
            >
              <Download className="h-4 w-4 text-secondary" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="h-9 px-3.5 bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors shadow-sm rounded-xs"
            >
              <Printer className="h-4 w-4 text-secondary-container" />
              <span>Roster Sheet</span>
            </button>
          </div>
        </div>

        {/* Main Workspace: Table (8 Cols) + Student Dossier Drawer (4 Cols) */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Table Container (8 Cols) */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-2">
            <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm rounded-sm overflow-hidden">
              {/* Table Subheader */}
              <div className="bg-surface-container-low px-4 py-2 border-b border-[#cbd5e1] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-4">
                  <span>Current View: <strong className="text-primary">{activeBatchTab}</strong></span>
                  <span>Class Mentor: <strong className="text-secondary">Amit Sharma</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-error font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-error"></span> 2 Defaulters
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#047857] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#047857]"></span> 60 Cleared
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container font-mono text-[10px] text-primary uppercase border-b border-[#cbd5e1]">
                    <tr>
                      <th className="py-2.5 px-4">Student Identifier</th>
                      <th className="py-2.5 px-3">Batch &amp; Course</th>
                      <th className="py-2.5 px-3">Biometric Att. %</th>
                      <th className="py-2.5 px-3">ICA (/40)</th>
                      <th className="py-2.5 px-3">Risk Assessment</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#cbd5e1]">
                    {filteredStudents.map((stu) => {
                      const isSelected = selectedStudent.id === stu.id;
                      return (
                        <tr
                          key={stu.id}
                          onClick={() => setSelectedStudent(stu)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-surface-container border-l-4 border-l-primary"
                              : "hover:bg-surface-container-low"
                          } ${stu.attendanceTag === "At Risk" ? "bg-[#fef2f2]/30" : ""}`}
                        >
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <img
                                alt={stu.name}
                                src={stu.avatarUrl}
                                className="w-8 h-8 rounded-sm object-cover contrast-105 border border-[#cbd5e1]"
                              />
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-primary truncate leading-tight">
                                  {stu.name}
                                </span>
                                <span className="font-mono text-[10px] text-on-surface-variant">
                                  {stu.roll}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span className="font-semibold text-primary">{stu.batch}</span>
                              <span className="text-[10px] text-outline font-mono">{stu.course}</span>
                            </div>
                          </td>

                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-primary">{stu.attendancePct}%</span>
                              <span
                                className={`text-[9px] px-1 font-mono uppercase font-bold rounded-xs ${
                                  stu.attendanceTag === "Safe"
                                    ? "bg-[#ecfdf5] text-[#047857]"
                                    : "bg-[#fef2f2] text-error"
                                }`}
                              >
                                {stu.attendanceTag}
                              </span>
                            </div>
                          </td>

                          <td className="py-2.5 px-3 whitespace-nowrap font-mono font-bold text-primary">
                            {stu.icaScore}
                          </td>

                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono uppercase font-bold rounded-xs ${
                                stu.riskAssessment === "Distinction"
                                  ? "bg-secondary-container text-primary"
                                  : stu.riskAssessment === "Shortage Warning"
                                  ? "bg-error text-on-error"
                                  : "bg-surface-container text-primary"
                              }`}
                            >
                              {stu.riskAssessment}
                            </span>
                          </td>

                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="px-1.5 py-0.5 bg-[#ecfdf5] text-[#047857] text-[10px] font-mono uppercase font-bold rounded-xs">
                              {stu.status}
                            </span>
                          </td>

                          <td className="py-2.5 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStudent(stu);
                              }}
                              className={`px-2.5 py-1 text-[11px] font-mono uppercase font-bold tracking-wider rounded-xs transition-colors ${
                                isSelected
                                  ? "bg-primary text-on-primary"
                                  : "bg-surface-container hover:bg-surface-container-high text-primary"
                              }`}
                            >
                              Dossier &rarr;
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Student Dossier Inspector (4 Cols) */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-4">
            <div className="bg-surface-container-lowest border-2 border-primary shadow-sm p-5 rounded-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  <h3 className="text-base font-bold uppercase text-primary font-mono">
                    Candidate Dossier
                  </h3>
                </div>
                <span className="font-mono text-xs text-primary font-bold bg-surface-container px-2 py-0.5 border border-[#cbd5e1] rounded-xs">
                  {selectedStudent.batch}
                </span>
              </div>

              {/* Student Header */}
              <div className="flex items-center gap-3.5">
                <img
                  alt={selectedStudent.name}
                  src={selectedStudent.avatarUrl}
                  className="w-16 h-18 rounded-sm object-cover contrast-105 border-2 border-primary shadow-sm"
                />
                <div className="flex flex-col">
                  <h4 className="text-base font-bold uppercase text-primary leading-tight">
                    {selectedStudent.name}
                  </h4>
                  <span className="font-mono text-xs text-secondary font-bold mt-0.5">
                    {selectedStudent.roll}
                  </span>
                  <span className="text-xs text-on-surface-variant mt-0.5">
                    {selectedStudent.course}
                  </span>
                </div>
              </div>

              {/* Academic Metrics Ribbon */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm text-center font-mono">
                <div>
                  <span className="text-[10px] text-outline uppercase block">CGPA</span>
                  <span className="text-base font-bold text-primary">{selectedStudent.cgpa}</span>
                </div>
                <div className="border-x border-[#cbd5e1]">
                  <span className="text-[10px] text-outline uppercase block">Attendance</span>
                  <span
                    className={`text-base font-bold ${
                      selectedStudent.attendancePct >= 75 ? "text-[#047857]" : "text-error"
                    }`}
                  >
                    {selectedStudent.attendancePct}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-outline uppercase block">ICA Score</span>
                  <span className="text-base font-bold text-primary">{selectedStudent.icaScore}</span>
                </div>
              </div>

              {/* Contact Particulars */}
              <div className="flex flex-col gap-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 bg-surface-container-low border border-[#cbd5e1] rounded-xs">
                  <span className="text-outline uppercase text-[10px]">SSO Email:</span>
                  <span className="font-bold text-primary truncate max-w-[200px]">
                    {selectedStudent.email}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface-container-low border border-[#cbd5e1] rounded-xs">
                  <span className="text-outline uppercase text-[10px]">Student Handset:</span>
                  <span className="font-bold text-primary">{selectedStudent.phone}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface-container-low border border-[#cbd5e1] rounded-xs">
                  <span className="text-outline uppercase text-[10px]">Guardian:</span>
                  <span className="font-bold text-primary">
                    {selectedStudent.guardian} ({selectedStudent.guardianPhone})
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface-container-low border border-[#cbd5e1] rounded-xs">
                  <span className="text-outline uppercase text-[10px]">Campus Residence:</span>
                  <span className="font-bold text-primary truncate max-w-[200px]">
                    {selectedStudent.residence}
                  </span>
                </div>
              </div>

              {/* Faculty Advisory Actions */}
              <div className="pt-3 border-t border-[#cbd5e1] flex flex-col gap-2 font-mono">
                <button
                  onClick={() => setIsAdvisoryModalOpen(true)}
                  className="w-full py-2 bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm rounded-sm"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send Advisory Note</span>
                </button>
                <button
                  onClick={() =>
                    showToast(`Mentorship session scheduled for ${selectedStudent.name}.`)
                  }
                  className="w-full py-2 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider border border-[#cbd5e1] transition-colors flex items-center justify-center gap-1.5 rounded-sm"
                >
                  <Calendar className="h-4 w-4 text-secondary" />
                  <span>Schedule 1:1 Mentorship</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Modal */}
      {isAdvisoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg border-2 border-primary shadow-[4px_4px_0_0_#0d2545] p-6 relative rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#cbd5e1]">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">
                  Dispatch Academic Advisory
                </h3>
              </div>
              <button
                onClick={() => setIsAdvisoryModalOpen(false)}
                className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSendAdvisory} className="py-4 flex flex-col gap-3 text-xs font-mono">
              <div className="p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm">
                Recipient: <strong>{selectedStudent.name}</strong> ({selectedStudent.roll}) • {selectedStudent.batch}
              </div>

              <div>
                <label className="uppercase font-bold text-on-surface-variant block mb-1">
                  Advisory Subject / Category
                </label>
                <select className="w-full px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] text-xs text-primary focus:outline-none rounded-xs">
                  <option>Attendance Shortage Warning &amp; Makeup Plan</option>
                  <option>Continuous Assessment (ICA) Performance Counseling</option>
                  <option>Dean&apos;s Honor Roll Commendation</option>
                  <option>Capstone Project Progress Check</option>
                </select>
              </div>

              <div>
                <label className="uppercase font-bold text-on-surface-variant block mb-1">
                  Directive / Message Body *
                </label>
                <textarea
                  required
                  rows={3}
                  value={advisoryNote}
                  onChange={(e) => setAdvisoryNote(e.target.value)}
                  placeholder="Enter specific recommendations, makeup assignments, or required office hour visit..."
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] text-xs text-primary focus:outline-none resize-none rounded-xs font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#cbd5e1]">
                <button
                  type="button"
                  onClick={() => setIsAdvisoryModalOpen(false)}
                  className="px-4 py-1.5 bg-surface-container text-primary uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-primary text-on-primary uppercase font-bold tracking-wider hover:bg-primary-container transition-colors flex items-center gap-1.5 rounded-xs shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Transmit Advisory</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

