"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Upload,
  UserPlus,
  Filter,
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
  GraduationCap
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
    <div className="flex flex-col w-full pb-16">
      {/* 1. Header & Live Telemetry Strip */}
      <section className="bg-surface-container-lowest px-6 py-4 shadow-sm border-b border-outline-variant/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
              <span>Institutional Command</span>
              <span>/</span>
              <span className="text-secondary font-bold">Student Information Grid</span>
            </div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="font-headline text-xl text-primary uppercase font-bold tracking-tight">
                Students Directory &amp; Management
              </h1>
              <div className="flex items-center gap-2 bg-surface-container-low px-2.5 py-1 font-mono text-xs border border-outline-variant/30">
                <span className="flex items-center gap-1 font-semibold text-on-surface">
                  <span className="h-2 w-2 rounded-full bg-secondary"></span>
                  ACTIVE: <strong className="text-primary font-bold">{students.filter(s => s.status === 'ACTIVE').length + 2475}</strong>
                </span>
                <span className="text-outline-variant">|</span>
                <span className="flex items-center gap-1 text-on-surface-variant font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  LEAVE: <strong className="text-on-surface font-semibold">{students.filter(s => s.status === 'LEAVE').length + 13}</strong>
                </span>
                <span className="text-outline-variant">|</span>
                <span className="flex items-center gap-1 text-error font-medium">
                  <span className="h-2 w-2 rounded-full bg-error"></span>
                  SUSPENDED: <strong className="font-bold">2</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => alert("Exporting 2,480 student records to Excel...")}
              className="bg-surface-container-low text-on-surface hover:bg-surface-container px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 border border-outline-variant/30 shadow-sm"
            >
              <Download className="w-4 h-4 text-secondary" />
              <span>Export (XLSX)</span>
            </button>
            <button
              onClick={() => alert("Upload CSV dialog")}
              className="bg-surface-container-low text-on-surface hover:bg-surface-container px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 border border-outline-variant/30 shadow-sm"
            >
              <Upload className="w-4 h-4 text-secondary" />
              <span>Bulk CSV Import</span>
            </button>
            <button
              onClick={() => setShowEnrollModal(true)}
              className="bg-primary-container text-white hover:bg-primary px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all shadow-md flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Enroll New Student</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Advanced Multi-Filter Query Matrix */}
      <section className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/20">
        <div className="bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
            {/* Search Input */}
            <div className="lg:col-span-4 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant flex items-center justify-between">
                <span>Query Lookup Matrix</span>
                <span className="text-secondary font-mono">REG / ROLL / PHONE</span>
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 absolute left-3 text-on-surface-variant" />
                <input
                  className="w-full bg-surface text-on-surface pl-9 pr-3 py-1.5 text-xs border border-outline-variant/40 focus:outline-none focus:border-primary-container"
                  placeholder="Search name, APX-CS-2024..., or guardian phone"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Course / Program Filter */}
            <div className="lg:col-span-3 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                Course / Program
              </label>
              <select
                className="w-full bg-surface text-on-surface px-2.5 py-1.5 text-xs border border-outline-variant/40 focus:outline-none focus:border-primary-container"
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
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                Academic Cohort
              </label>
              <select
                className="w-full bg-surface text-on-surface px-2.5 py-1.5 text-xs border border-outline-variant/40 focus:outline-none focus:border-primary-container"
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
            <div className="lg:col-span-2 flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                Fee Clearance
              </label>
              <select
                className="w-full bg-surface text-on-surface px-2.5 py-1.5 text-xs border border-outline-variant/40 focus:outline-none focus:border-primary-container"
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
                className="w-full bg-surface-container-high hover:bg-secondary-container text-on-surface py-1.5 flex items-center justify-center transition-colors border border-outline-variant/40"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main High-Density Ledger Table */}
      <section className="px-6 py-4 flex-1">
        <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/20 overflow-hidden">
          {/* Batch Toolbar */}
          <div className="px-4 py-2.5 bg-surface-container-low flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-on-surface-variant font-semibold">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-none accent-primary cursor-pointer"
                  checked={selectedIds.length > 0 && selectedIds.length === filteredStudents.length}
                  onChange={toggleSelectAll}
                />
                <span className="text-on-surface font-bold">Selected ({selectedIds.length})</span>
              </label>

              {selectedIds.length > 0 && (
                <>
                  <div className="h-4 w-px bg-outline-variant/40"></div>
                  <button
                    onClick={() => alert(`Printing ID cards for ${selectedIds.length} students`)}
                    className="hover:text-primary transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Printer className="w-3.5 h-3.5 text-secondary" />
                    Bulk ID Print
                  </button>
                  <button
                    onClick={() => alert(`Opening bulk dispatch modal for ${selectedIds.length} students`)}
                    className="hover:text-primary transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    SMS / Email Dispatch
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-on-surface-variant">Live Records: {filteredStudents.length}</span>
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container text-on-surface text-[10px] uppercase tracking-wider font-semibold select-none border-b border-outline-variant/30">
                  <th className="py-2.5 px-3 w-8 text-center"></th>
                  <th className="py-2.5 px-3 font-semibold">Student Profile &amp; Unique Roll ID</th>
                  <th className="py-2.5 px-3 font-semibold">Program &amp; Discipline</th>
                  <th className="py-2.5 px-3 font-semibold">Cohort &amp; Section</th>
                  <th className="py-2.5 px-3 font-semibold">Guardian &amp; Emergency Dial</th>
                  <th className="py-2.5 px-3 text-center font-semibold">Attendance</th>
                  <th className="py-2.5 px-3 font-semibold">Fee Settlement</th>
                  <th className="py-2.5 px-3 text-center font-semibold">Status</th>
                  <th className="py-2.5 px-3 text-right font-semibold">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredStudents.map((s, idx) => {
                  const isChecked = selectedIds.includes(s.id);
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedStudent(s)}
                      className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                        idx % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface/50"
                      } ${isChecked ? "bg-blue-50/50" : ""}`}
                    >
                      <td
                        className="py-3 px-3 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-none accent-primary cursor-pointer"
                          checked={isChecked}
                          onChange={() => toggleSelectOne(s.id)}
                        />
                      </td>

                      {/* Profile & Roll ID */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                            {s.avatar ? (
                              <img src={s.avatar} alt={s.name} className="w-full h-full object-cover" />
                            ) : (
                              s.initials
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-primary truncate hover:text-secondary">
                              {s.name}
                            </span>
                            <span className="font-mono text-[10px] text-secondary font-semibold">
                              {s.rollId}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Program & Discipline */}
                      <td className="py-3 px-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-on-surface">{s.program}</span>
                          <span className="text-on-surface-variant text-[10px] uppercase">
                            {s.discipline}
                          </span>
                        </div>
                      </td>

                      {/* Cohort & Section */}
                      <td className="py-3 px-3">
                        <div className="flex flex-col font-mono text-xs">
                          <span className="text-on-surface font-semibold">{s.cohort}</span>
                          <span className="text-on-surface-variant text-[10px] uppercase">
                            {s.section}
                          </span>
                        </div>
                      </td>

                      {/* Guardian & Dial */}
                      <td className="py-3 px-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-on-surface">
                            {s.guardian} ({s.guardianRelation})
                          </span>
                          <span className="font-mono text-[11px] text-secondary">
                            {s.guardianPhone}
                          </span>
                        </div>
                      </td>

                      {/* Attendance Track */}
                      <td className="py-3 px-3 text-center">
                        <div className="flex flex-col items-center gap-1 w-24 mx-auto">
                          <div className="flex justify-between w-full font-mono text-[10px] font-bold">
                            <span>{s.attendance}%</span>
                            <span
                              className={
                                s.attendanceStatus === "OPTIMAL"
                                  ? "text-emerald-700"
                                  : s.attendanceStatus === "VALID"
                                  ? "text-secondary"
                                  : "text-error"
                              }
                            >
                              {s.attendanceStatus}
                            </span>
                          </div>
                          <div className="w-full bg-surface-container h-1.5 overflow-hidden">
                            <div
                              className={`h-full ${
                                s.attendance >= 90
                                  ? "bg-emerald-600"
                                  : s.attendance >= 75
                                  ? "bg-secondary"
                                  : "bg-error"
                              }`}
                              style={{ width: `${s.attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Fee Settlement */}
                      <td className="py-3 px-3">
                        {s.feeStatus === "PAID IN FULL" && (
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                            PAID IN FULL
                          </span>
                        )}
                        {s.feeStatus === "PARTIAL DUE" && (
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                            DUE ${s.feeAmountDue}
                          </span>
                        )}
                        {s.feeStatus === "OVERDUE" && (
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-error-container text-error border border-error/30">
                            OVERDUE ${s.feeAmountDue}
                          </span>
                        )}
                      </td>

                      {/* Status Cadre */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase ${
                            s.status === "ACTIVE"
                              ? "bg-surface-container-high text-primary"
                              : s.status === "LEAVE"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-error-container text-error"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>

                      {/* Operations */}
                      <td
                        className="py-3 px-3 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                            title="Examine 360 Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => alert(`Generating Smart ID for ${s.name}`)}
                            className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-secondary transition-colors"
                            title="Print ID Card"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          <Link
                            href="/admin/fees"
                            className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
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
      </section>

      {/* 4. Slide-Over 360 Student Profile Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col border-l border-outline-variant/30 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between border-b border-primary-container">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-secondary-container" />
                <span className="font-headline font-bold text-sm uppercase tracking-wider">
                  Student 360 Dossier
                </span>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Banner */}
            <div className="p-6 bg-surface-container-low border-b border-outline-variant/20 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-lg overflow-hidden shrink-0 border-2 border-white shadow-sm">
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
                <h3 className="font-headline text-lg font-bold text-primary truncate">
                  {selectedStudent.name}
                </h3>
                <span className="font-mono text-xs font-semibold text-secondary">
                  {selectedStudent.rollId}
                </span>
                <span className="text-xs text-on-surface-variant mt-0.5">
                  {selectedStudent.program}
                </span>
              </div>
            </div>

            {/* Profile Tabs & Details */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {/* Academic Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-surface border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Attendance Record
                  </span>
                  <span className="font-mono text-lg font-bold text-primary mt-1">
                    {selectedStudent.attendance}%
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">
                    {selectedStudent.attendanceStatus} STANDING
                  </span>
                </div>
                <div className="p-3 bg-surface border border-outline-variant/30 flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Fee Balance
                  </span>
                  <span className="font-mono text-lg font-bold text-primary mt-1">
                    {selectedStudent.feeStatus === "PAID IN FULL"
                      ? "$0.00"
                      : `$${selectedStudent.feeAmountDue}`}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
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
              <div className="space-y-2 border-t border-outline-variant/20 pt-3">
                <h4 className="font-bold text-primary uppercase text-[11px] tracking-wider">
                  Academic Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-on-surface">
                  <div className="p-2 bg-surface-container-low">
                    <span className="text-[10px] text-on-surface-variant block">Discipline</span>
                    <strong>{selectedStudent.discipline}</strong>
                  </div>
                  <div className="p-2 bg-surface-container-low">
                    <span className="text-[10px] text-on-surface-variant block">Batch Cohort</span>
                    <strong>{selectedStudent.cohort}</strong>
                  </div>
                  <div className="p-2 bg-surface-container-low">
                    <span className="text-[10px] text-on-surface-variant block">Class Section</span>
                    <strong>{selectedStudent.section}</strong>
                  </div>
                  <div className="p-2 bg-surface-container-low">
                    <span className="text-[10px] text-on-surface-variant block">Blood Group</span>
                    <strong>{selectedStudent.bloodGroup}</strong>
                  </div>
                </div>
              </div>

              {/* Contact & Guardian */}
              <div className="space-y-2 border-t border-outline-variant/20 pt-3">
                <h4 className="font-bold text-primary uppercase text-[11px] tracking-wider">
                  Emergency &amp; Guardian Info
                </h4>
                <div className="space-y-1.5 p-3 bg-surface border border-outline-variant/30">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Primary Guardian:</span>
                    <strong className="text-primary">{selectedStudent.guardian}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Emergency Phone:</span>
                    <strong className="font-mono text-secondary">{selectedStudent.guardianPhone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Student Email:</span>
                    <strong className="text-primary">{selectedStudent.email}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Student Contact:</span>
                    <strong className="font-mono text-primary">{selectedStudent.phone}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="p-4 bg-surface-container-low border-t border-outline-variant/20 flex gap-2">
              <button
                onClick={() => alert(`Generating formal certificate for ${selectedStudent.name}`)}
                className="flex-1 py-2 bg-primary-container text-white font-semibold text-xs uppercase tracking-wider hover:bg-primary transition-colors text-center"
              >
                Issue Certificate
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-surface border border-outline-variant/40 text-on-surface font-semibold text-xs uppercase hover:bg-surface-container transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Enroll New Student Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-surface-container-lowest shadow-2xl border border-outline-variant/30 overflow-hidden">
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-secondary-container" />
                <h3 className="font-headline font-bold text-sm uppercase tracking-wider">
                  New Student Institutional Enrollment
                </h3>
              </div>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="font-bold text-on-surface uppercase text-[10px]">
                    Full Student Legal Name *
                  </label>
                  <input
                    required
                    type="text"
                    className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                    placeholder="e.g. Vikramaditya Rathore"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface uppercase text-[10px]">
                    Academic Program *
                  </label>
                  <select
                    className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                    value={newStudent.program}
                    onChange={(e) => setNewStudent({ ...newStudent, program: e.target.value })}
                  >
                    <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                    <option value="B.Tech Electronics & Comm">B.Tech Electronics &amp; Comm</option>
                    <option value="B.Tech Artificial Intel">B.Tech Artificial Intel</option>
                    <option value="MBA Technology Mgmt">MBA Technology Mgmt</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface uppercase text-[10px]">
                    Discipline / Specialization
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                    placeholder="e.g. AI & Robotics"
                    value={newStudent.discipline}
                    onChange={(e) => setNewStudent({ ...newStudent, discipline: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface uppercase text-[10px]">
                    Cohort &amp; Semester
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                    placeholder="2024–2028 (Sem 1)"
                    value={newStudent.cohort}
                    onChange={(e) => setNewStudent({ ...newStudent, cohort: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface uppercase text-[10px]">
                    Section
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                    placeholder="Section ALPHA"
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface uppercase text-[10px]">
                    Guardian Full Name
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                    placeholder="Father/Mother/Guardian"
                    value={newStudent.guardian}
                    onChange={(e) => setNewStudent({ ...newStudent, guardian: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface uppercase text-[10px]">
                    Guardian Phone / Emergency Dial
                  </label>
                  <input
                    type="text"
                    className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                    placeholder="+1 (555) 000-0000"
                    value={newStudent.guardianPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 border border-outline-variant/40 font-semibold uppercase hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-container text-white font-bold uppercase tracking-wider hover:bg-primary transition-colors shadow-sm"
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

