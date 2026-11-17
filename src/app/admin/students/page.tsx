"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Upload,
  UserPlus,
  RotateCcw,
  Eye,
  CreditCard,
  Printer,
  Mail,
  Phone,
  Shield,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  GraduationCap,
  Users,
  FileSpreadsheet
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  rollId: string;
  avatar: string;
  initials: string;
  program: string;
  discipline: string;
  cohort: string;
  section: string;
  guardian: string;
  guardianRelation: string;
  guardianPhone: string;
  attendance: number;
  attendanceStatus: "OPTIMAL" | "VALID" | "DEFICIT";
  feeStatus: "PAID IN FULL" | "PARTIAL DUE" | "OVERDUE";
  feeAmountDue?: number;
  status: "ACTIVE" | "LEAVE" | "SUSPENDED";
  bloodGroup: string;
  dob: string;
  email: string;
  phone: string;
}

const initialStudents: Student[] = [
  {
    id: "1",
    name: "Alistair Chen",
    rollId: "APX-CS-2024-042",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIq6GuJkVhmI8NpRtbKATsK0CkoALtf_ltIWBDSY0J_iy7gt8oA2Y1wqgvHem8e08ACEAnJSK51pS66wiDkVh5DmEha9nafwKsz-10HDn8kLJcDH1SpLqW9tv5uO3RjlekFyu2KAsLEDSmLATNlU9yQIB9drs68tWu8j51OrRUfWYCEPdAl60KUJ3_m7pgEEFuC3RU-zNAUD3nv4MqFLwfwmsQFVz087zXSJ0Xr4_V",
    initials: "AC",
    program: "B.Tech Computer Science",
    discipline: "AI & Autonomous Systems",
    cohort: "2024–2028 (Sem 2)",
    section: "Section ALPHA • Morning",
    guardian: "Dr. Jonathan Chen",
    guardianRelation: "Father",
    guardianPhone: "+1 (555) 839-2041",
    attendance: 97.4,
    attendanceStatus: "OPTIMAL",
    feeStatus: "PAID IN FULL",
    status: "ACTIVE",
    bloodGroup: "O+",
    dob: "Oct 14, 2005",
    email: "alistair.c@apex.edu",
    phone: "+1 (555) 438-9901"
  },
  {
    id: "2",
    name: "Sophia Devika Rao",
    rollId: "APX-CS-2024-089",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuADZw46_KS1Pi6GIgttKqMjWk8dZfTMzGyEOKvFHZcW1sppo2P4JdcMt8kiDSfI5beUZWm6ttkRE2eW84feefRZCYewQwzOCN4uDKA37was2coTf5YNvZOfH5g14z_MCZu76Ck4J_yGtF7IVyJlUgbZ442sBc2uBE6wZRqZotdX0RBJAZAPo_ZA-jr2AJdIflV0WQGv5ekz7NEm4MGksyb6geVgpedRqQTeuoQ1B1hv",
    initials: "SR",
    program: "B.Tech Computer Science",
    discipline: "Cloud Engineering",
    cohort: "2024–2028 (Sem 2)",
    section: "Section ALPHA • Morning",
    guardian: "M. S. Rao",
    guardianRelation: "Father",
    guardianPhone: "+1 (555) 712-4439",
    attendance: 88.2,
    attendanceStatus: "VALID",
    feeStatus: "PARTIAL DUE",
    feeAmountDue: 450,
    status: "ACTIVE",
    bloodGroup: "B+",
    dob: "Mar 22, 2006",
    email: "sophia.rao@apex.edu",
    phone: "+1 (555) 914-1188"
  },
  {
    id: "3",
    name: "Marcus V. Lindqvist",
    rollId: "APX-EC-2023-014",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpY7e-pdSS02yWx6aI-KSfPJH6W54QEJBvzVr92OxrQi2mGUITlR2BxvUmK7aMy6ZyCgH8-X7L1RP3IeelVVDhEcKaIAN-c6am4GAwnx-5m2G8BYQf3JpWrPsd6D6KdW_vqVCUqAyfxG3_BPRv0Z9w0v3SzQaaUnLaI_rPUarR6-erEHWBP-pLaTXbX7w5FdjZOp69VdwoxrZ-_8uVGXjhwL7Llx1grHUHnfUdeYt0",
    initials: "ML",
    program: "B.Tech Electronics & Comm",
    discipline: "Embedded VLSI Hardware",
    cohort: "2023–2027 (Sem 4)",
    section: "Section BRAVO • Evening",
    guardian: "Helena Lindqvist",
    guardianRelation: "Mother",
    guardianPhone: "+1 (555) 902-8812",
    attendance: 94.0,
    attendanceStatus: "OPTIMAL",
    feeStatus: "PAID IN FULL",
    status: "ACTIVE",
    bloodGroup: "A+",
    dob: "Nov 03, 2004",
    email: "marcus.l@apex.edu",
    phone: "+1 (555) 761-0023"
  },
  {
    id: "4",
    name: "Aisha Zahra Khan",
    rollId: "APX-MBA-2024-102",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcnfbKYj3M1yvEiN8P7gQetPNaCc2f85Mxfq8MCD7aqlCjvg4jJsomNgAYQDNZbkch9r1INeog7bPYCpPTKgBpamO3GtJ_hVikWpOnCIDlA43wHx1chVkZW2vcoIMT1_AqlC5z40k1cSEJ8om-JA3g-t9g-l_hcBkHUezX7fFwcsfLUuGPHfJyC6Ds7BUQJEIjbp1VFyMzqZXPclrTmnfzrhQbkyiisCyzsC_nw34W",
    initials: "AK",
    program: "MBA Technology Mgmt",
    discipline: "FinTech & Web3 Operations",
    cohort: "2024–2026 (Sem 2)",
    section: "Section DELTA • Weekend",
    guardian: "Tariq Khan",
    guardianRelation: "Guardian",
    guardianPhone: "+1 (555) 634-1190",
    attendance: 91.5,
    attendanceStatus: "OPTIMAL",
    feeStatus: "PAID IN FULL",
    status: "ACTIVE",
    bloodGroup: "AB+",
    dob: "Feb 18, 2002",
    email: "aisha.khan@apex.edu",
    phone: "+1 (555) 634-9912"
  },
  {
    id: "5",
    name: "Devendra Pratap",
    rollId: "APX-AI-2024-055",
    avatar: "",
    initials: "DP",
    program: "B.Tech Artificial Intel",
    discipline: "Robotics & Machine Vision",
    cohort: "2024–2028 (Sem 2)",
    section: "Section ALPHA • Morning",
    guardian: "Ram Pratap",
    guardianRelation: "Father",
    guardianPhone: "+1 (555) 441-2099",
    attendance: 71.8,
    attendanceStatus: "DEFICIT",
    feeStatus: "OVERDUE",
    feeAmountDue: 1200,
    status: "LEAVE",
    bloodGroup: "O-",
    dob: "Aug 11, 2005",
    email: "devendra.p@apex.edu",
    phone: "+1 (555) 441-8822"
  }
];

export default function StudentsDirectoryPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedFeeStatus, setSelectedFeeStatus] = useState("");
  const [selectedCohort, setSelectedCohort] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Form State for New Student
  const [newStudent, setNewStudent] = useState({
    name: "",
    program: "B.Tech Computer Science",
    discipline: "AI & Autonomous Systems",
    cohort: "2024–2028 (Sem 1)",
    section: "Section ALPHA",
    guardian: "",
    guardianPhone: "",
    email: "",
    phone: "",
    dob: "2006-01-01"
  });

  // Filter Logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.guardianPhone.includes(searchQuery);

    const matchesProgram = selectedProgram ? s.program === selectedProgram : true;
    const matchesFee = selectedFeeStatus ? s.feeStatus === selectedFeeStatus : true;
    const matchesCohort = selectedCohort ? s.cohort.includes(selectedCohort) : true;

    return matchesSearch && matchesProgram && matchesFee && matchesCohort;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map((s) => s.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name) return;

    const studentToAdd: Student = {
      id: String(Date.now()),
      name: newStudent.name,
      rollId: `APX-CS-2024-${Math.floor(100 + Math.random() * 900)}`,
      avatar: "",
      initials: newStudent.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      program: newStudent.program,
      discipline: newStudent.discipline,
      cohort: newStudent.cohort,
      section: `${newStudent.section} • Morning`,
      guardian: newStudent.guardian || "Guardian",
      guardianRelation: "Parent",
      guardianPhone: newStudent.guardianPhone || "+1 (555) 000-0000",
      attendance: 100,
      attendanceStatus: "OPTIMAL",
      feeStatus: "PAID IN FULL",
      status: "ACTIVE",
      bloodGroup: "O+",
      dob: newStudent.dob,
      email: newStudent.email || `${newStudent.name.toLowerCase().replace(" ", ".")}@apex.edu`,
      phone: newStudent.phone || "+1 (555) 123-4567"
    };

    setStudents([studentToAdd, ...students]);
    setShowEnrollModal(false);
    setNewStudent({
      name: "",
      program: "B.Tech Computer Science",
      discipline: "AI & Autonomous Systems",
      cohort: "2024–2028 (Sem 1)",
      section: "Section ALPHA",
      guardian: "",
      guardianPhone: "",
      email: "",
      phone: "",
      dob: "2006-01-01"
    });
  };

  return (
    <div className="p-3 sm:p-5 md:p-7 space-y-4 sm:space-y-5 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* 1. Header Banner - Clean, Balanced, Zero Redundant Text */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/50 via-indigo-50/20 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Students Directory &amp; Management
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                ACTIVE: <strong>{students.filter(s => s.status === 'ACTIVE').length + 2475}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                LEAVE: <strong>{students.filter(s => s.status === 'LEAVE').length + 13}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-50 text-rose-700 text-xs font-semibold rounded-full border border-rose-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                SUSPENDED: <strong>2</strong>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons - Vertically Centered & Balanced */}
          <div className="flex items-center flex-wrap gap-2 shrink-0">
            <button
              onClick={() => alert("Exporting 2,480 student records to Excel...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export (XLSX)</span>
            </button>
            <button
              onClick={() => alert("Upload CSV dialog")}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              <span>Bulk CSV Import</span>
            </button>
            <button
              onClick={() => setShowEnrollModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll New Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Advanced Multi-Filter Query Matrix */}
      <div className="bg-white p-4 sm:p-4.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          {/* Search Input */}
          <div className="lg:col-span-4 flex flex-col gap-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-500 flex items-center justify-between">
              <span>Query Lookup Matrix</span>
              <span className="text-slate-400 font-mono text-[10px]">NAME / ROLL / PHONE</span>
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
                placeholder="Search name, roll ID, or guardian phone..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Course / Program Filter */}
          <div className="lg:col-span-3 flex flex-col gap-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-500">
              Course / Program
            </label>
            <select
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
            >
              <option value="">All Programs</option>
              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
              <option value="B.Tech Electronics & Comm">B.Tech Electronics &amp; Comm</option>
              <option value="B.Tech Artificial Intel">B.Tech Artificial Intel</option>
              <option value="MBA Technology Mgmt">MBA Technology Mgmt</option>
            </select>
          </div>

          {/* Cohort Filter */}
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-500">
              Academic Cohort
            </label>
            <select
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all"
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
            >
              <option value="">All Batches</option>
              <option value="2024–2028">Cohort 2024–2028</option>
              <option value="2023–2027">Cohort 2023–2027</option>
              <option value="2024–2026">Cohort 2024–2026</option>
            </select>
          </div>

          {/* Fee Clearance Filter */}
          <div className="lg:col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-500">
              Fee Status
            </label>
            <select
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all"
              value={selectedFeeStatus}
              onChange={(e) => setSelectedFeeStatus(e.target.value)}
            >
              <option value="">All Ledger States</option>
              <option value="PAID IN FULL">100% Cleared</option>
              <option value="PARTIAL DUE">Partial Balance</option>
              <option value="OVERDUE">Default / Overdue</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="lg:col-span-1 flex">
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedProgram("");
                setSelectedFeeStatus("");
                setSelectedCohort("");
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 flex items-center justify-center rounded-xl transition-colors border border-slate-200 shadow-2xs cursor-pointer"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main High-Density Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Batch Toolbar */}
        <div className="px-5 py-3 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-slate-500 font-semibold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#3D405B] cursor-pointer"
                checked={selectedIds.length > 0 && selectedIds.length === filteredStudents.length}
                onChange={toggleSelectAll}
              />
              <span className="text-[#3D405B] font-bold">Selected ({selectedIds.length})</span>
            </label>

            {selectedIds.length > 0 && (
              <>
                <div className="h-4 w-px bg-slate-200"></div>
                <button
                  onClick={() => alert(`Printing ID cards for ${selectedIds.length} students`)}
                  className="hover:text-[#3D405B] transition-colors flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Bulk ID Print</span>
                </button>
                <button
                  onClick={() => alert(`Opening bulk dispatch modal for ${selectedIds.length} students`)}
                  className="hover:text-[#3D405B] transition-colors flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>SMS / Email Dispatch</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span>Showing {filteredStudents.length} Students</span>
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 text-[10px] uppercase tracking-wider font-semibold select-none border-b border-slate-100 whitespace-nowrap">
                <th className="py-2.5 px-4 w-10 text-center"></th>
                <th className="py-2.5 px-4 font-semibold">Student Profile &amp; Roll ID</th>
                <th className="py-2.5 px-4 font-semibold">Program &amp; Discipline</th>
                <th className="py-2.5 px-4 font-semibold">Cohort &amp; Section</th>
                <th className="py-2.5 px-4 font-semibold">Guardian Contact</th>
                <th className="py-2.5 px-4 text-center font-semibold">Attendance</th>
                <th className="py-2.5 px-4 font-semibold">Fee Settlement</th>
                <th className="py-2.5 px-4 text-center font-semibold">Status</th>
                <th className="py-2.5 px-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => {
                const isChecked = selectedIds.includes(s.id);
                return (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className={`hover:bg-slate-50/60 transition-colors cursor-pointer ${
                      isChecked ? "bg-blue-50/40" : ""
                    }`}
                  >
                    <td
                      className="py-3 px-4 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded accent-[#3D405B] cursor-pointer"
                        checked={isChecked}
                        onChange={() => toggleSelectOne(s.id)}
                      />
                    </td>

                    {/* Profile & Roll ID */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                          {s.avatar ? (
                            <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                          ) : (
                            s.initials
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[#3D405B] truncate hover:text-blue-600">
                            {s.name}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {s.rollId}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Program & Discipline */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{s.program}</span>
                        <span className="text-slate-400 text-[10px]">
                          {s.discipline}
                        </span>
                      </div>
                    </td>

                    {/* Cohort & Section */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col font-mono text-xs">
                        <span className="text-slate-800 font-medium">{s.cohort}</span>
                        <span className="text-slate-400 text-[10px]">
                          {s.section}
                        </span>
                      </div>
                    </td>

                    {/* Guardian & Dial */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">
                          {s.guardian} ({s.guardianRelation})
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                          {s.guardianPhone}
                        </span>
                      </div>
                    </td>

                    {/* Attendance Track */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1 w-24 mx-auto">
                        <div className="flex justify-between w-full font-mono text-[10px] font-bold">
                          <span>{s.attendance}%</span>
                          <span
                            className={
                              s.attendanceStatus === "OPTIMAL"
                                ? "text-emerald-700"
                                : s.attendanceStatus === "VALID"
                                ? "text-blue-600"
                                : "text-rose-600"
                            }
                          >
                            {s.attendanceStatus}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              s.attendance >= 90
                                ? "bg-emerald-600"
                                : s.attendance >= 75
                                ? "bg-blue-600"
                                : "bg-rose-600"
                            }`}
                            style={{ width: `${s.attendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Fee Settlement */}
                    <td className="py-3 px-4">
                      {s.feeStatus === "PAID IN FULL" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          PAID IN FULL
                        </span>
                      )}
                      {s.feeStatus === "PARTIAL DUE" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          DUE ${s.feeAmountDue}
                        </span>
                      )}
                      {s.feeStatus === "OVERDUE" && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          OVERDUE ${s.feeAmountDue}
                        </span>
                      )}
                    </td>

                    {/* Status Cadre */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          s.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : s.status === "LEAVE"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    {/* Operations */}
                    <td
                      className="py-3 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedStudent(s)}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-[#3D405B] rounded-lg transition-colors cursor-pointer"
                          title="Examine 360 Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert(`Generating Smart ID for ${s.name}`)}
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                          title="Print ID Card"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <Link
                          href="/admin/fees"
                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-[#3D405B] rounded-lg transition-colors cursor-pointer inline-block"
                          title="Financial Audit Ledger"
                        >
                          <CreditCard className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Slide-Over 360 Student Profile Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 bg-[#3D405B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-200" />
                <span className="font-bold text-sm uppercase tracking-wider">
                  Student 360 Dossier
                </span>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Banner */}
            <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#3D405B] text-white flex items-center justify-center font-bold text-base overflow-hidden shrink-0 border-2 border-white shadow-xs">
                {selectedStudent.avatar ? (
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  selectedStudent.initials
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-base font-bold text-[#3D405B] truncate">
                  {selectedStudent.name}
                </h3>
                <span className="font-mono text-xs font-semibold text-slate-500">
                  {selectedStudent.rollId}
                </span>
                <span className="text-xs text-slate-500 mt-0.5">
                  {selectedStudent.program}
                </span>
              </div>
            </div>

            {/* Profile Tabs & Details */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {/* Academic Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Attendance Record
                  </span>
                  <span className="font-mono text-lg font-bold text-[#3D405B] mt-1">
                    {selectedStudent.attendance}%
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                    {selectedStudent.attendanceStatus} STANDING
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Fee Balance
                  </span>
                  <span className="font-mono text-lg font-bold text-[#3D405B] mt-1">
                    {selectedStudent.feeStatus === "PAID IN FULL"
                      ? "₹0"
                      : `₹${(selectedStudent.feeAmountDue || 0).toLocaleString("en-IN")}`}
                  </span>
                  <span
                    className={`text-[10px] font-semibold mt-0.5 ${
                      selectedStudent.feeStatus === "PAID IN FULL"
                        ? "text-emerald-700"
                        : "text-amber-800"
                    }`}
                  >
                    {selectedStudent.feeStatus}
                  </span>
                </div>
              </div>

              {/* Personal & Academic Specs */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-[#3D405B] uppercase text-[11px] tracking-wider">
                  Academic Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Discipline</span>
                    <strong>{selectedStudent.discipline}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Batch Cohort</span>
                    <strong>{selectedStudent.cohort}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Class Section</span>
                    <strong>{selectedStudent.section}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Blood Group</span>
                    <strong>{selectedStudent.bloodGroup}</strong>
                  </div>
                </div>
              </div>

              {/* Contact & Guardian */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <h4 className="font-bold text-[#3D405B] uppercase text-[11px] tracking-wider">
                  Emergency &amp; Guardian Info
                </h4>
                <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Primary Guardian:</span>
                    <strong className="text-[#3D405B]">{selectedStudent.guardian}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Emergency Phone:</span>
                    <strong className="font-mono text-slate-800">{selectedStudent.guardianPhone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Email:</span>
                    <strong className="text-[#3D405B]">{selectedStudent.email}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Contact:</span>
                    <strong className="font-mono text-[#3D405B]">{selectedStudent.phone}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => alert(`Generating formal certificate for ${selectedStudent.name}`)}
                className="flex-1 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer shadow-xs"
              >
                Issue Certificate
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Enroll New Student Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4.5 bg-[#3D405B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-200" />
                <h3 className="font-bold text-sm">
                  New Student Institutional Enrollment
                </h3>
              </div>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Full Student Legal Name *
                  </label>
                  <input
                    required
                    type="text"
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                    placeholder="e.g. Vikramaditya Rathore"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Academic Program *
                  </label>
                  <select
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                    value={newStudent.program}
                    onChange={(e) => setNewStudent({ ...newStudent, program: e.target.value })}
                  >
                    <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                    <option value="B.Tech Electronics & Comm">B.Tech Electronics &amp; Comm</option>
                    <option value="B.Tech Artificial Intel">B.Tech Artificial Intel</option>
                    <option value="MBA Technology Mgmt">MBA Technology Mgmt</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Discipline / Specialization
                  </label>
                  <input
                    type="text"
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                    placeholder="e.g. AI & Robotics"
                    value={newStudent.discipline}
                    onChange={(e) => setNewStudent({ ...newStudent, discipline: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Cohort &amp; Semester
                  </label>
                  <input
                    type="text"
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                    placeholder="2024–2028 (Sem 1)"
                    value={newStudent.cohort}
                    onChange={(e) => setNewStudent({ ...newStudent, cohort: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Section
                  </label>
                  <input
                    type="text"
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                    placeholder="Section ALPHA"
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Guardian Full Name
                  </label>
                  <input
                    type="text"
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                    placeholder="Father/Mother/Guardian"
                    value={newStudent.guardian}
                    onChange={(e) => setNewStudent({ ...newStudent, guardian: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Guardian Phone / Emergency Dial
                  </label>
                  <input
                    type="text"
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                    placeholder="+1 (555) 000-0000"
                    value={newStudent.guardianPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold rounded-xl transition-all shadow-xs hover:shadow cursor-pointer"
                >
                  Confirm &amp; Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
