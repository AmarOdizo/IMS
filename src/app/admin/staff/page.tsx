"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Download,
  Grid,
  UserPlus,
  Gauge,
  Layers,
  AlertTriangle,
  CalendarX,
  CheckCircle2,
  BookOpen,
  Plus,
  Trash2,
  X,
  BadgeCheck,
  Building,
  GraduationCap,
  Clock,
  ArrowRight,
  RotateCcw
} from "lucide-react";

interface SubjectAssignment {
  id: string;
  code: string;
  name: string;
  batch: string;
  hours: number;
}

interface Faculty {
  id: string;
  name: string;
  empId: string;
  avatar: string;
  initials: string;
  department: string;
  cadre: string;
  type: "teaching" | "lab" | "admin";
  weeklyHours: number;
  maxHours: number;
  status: "Optimal" | "Overallocated" | "Under-allocated" | "On Leave";
  verified: boolean;
  email: string;
  phone: string;
  assignments: SubjectAssignment[];
}

const initialFacultyList: Faculty[] = [
  {
    id: "fac-1",
    name: "Prof. Rajesh K. Sharma",
    empId: "APX-FAC-2018-042",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyJ9jabd0hU3R1BjSKPGQCdMMQ7wqrA097FIONtcU9C2ZaZfgdV5xFcXZdGAZEV6dYJh4j2XG8Kgb6wIx_vb9-EViMrdLILihrhcOnLd27Q66baUcw1aRvbDk_mXFNgskd58wZ3rFk0feIG3y2TdT9FmiutLLZJN46REDVVL0XAOzI_irB5oxCuX5Z-cQ5TljoC9XVgSxGah4fQ-T2jGTK_S5wejoF2GDItN4thTtT",
    initials: "RS",
    department: "Dept. of Computing & IT",
    cadre: "Dean & Tenured Professor",
    type: "teaching",
    weeklyHours: 18.0,
    maxHours: 20.0,
    status: "Optimal",
    verified: true,
    email: "rajesh.sharma@apex.edu",
    phone: "+1 (555) 723-9011",
    assignments: [
      { id: "sub-1", code: "CS401", name: "Data Structures & Algorithms", batch: "B.Tech CS Sem 4 (A)", hours: 8.0 },
      { id: "sub-2", code: "CS602", name: "Distributed Systems Architecture", batch: "B.Tech CS Sem 6 (B)", hours: 6.0 },
      { id: "sub-3", code: "CS901", name: "Ph.D Research Colloquium", batch: "Doctoral Cohort 2024", hours: 4.0 }
    ]
  },
  {
    id: "fac-2",
    name: "Dr. Elena Rostova",
    empId: "APX-FAC-2021-088",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeqKWGhNwaLYZNIOxJ0Gpin-5pbSiocTkvuKAp1CJwZjnPF33Pv5xG2ngPOuYaKXlHx69RnktMg_tFlmYdJuGqq3u7vMrpceearwT54PkC1WZhFgESHhXWc5RmjazporF2yi4bMj5CiheY4WICezxayiyLwBSPpObBSTVkG4wa_RToOOJ0Kk5M_pOQsxOXXTDGNHGN0uFew7tAxTBmUFaPv0DCo8-W_7K0GiTL76j1",
    initials: "ER",
    department: "AI & Robotics Lab",
    cadre: "Associate Professor",
    type: "teaching",
    weeklyHours: 16.0,
    maxHours: 20.0,
    status: "Optimal",
    verified: true,
    email: "elena.rostova@apex.edu",
    phone: "+1 (555) 819-3320",
    assignments: [
      { id: "sub-4", code: "AI302", name: "Neural Networks & Deep Learning", batch: "B.Tech AI Sem 4 (A)", hours: 9.0 },
      { id: "sub-5", code: "RB201", name: "Autonomous Navigation Systems", batch: "Robotics Core Sem 2", hours: 7.0 }
    ]
  },
  {
    id: "fac-3",
    name: "Prof. Meenakshi Sundaram",
    empId: "APX-FAC-2016-011",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuArHIhd-DJyJiXKfGtR0FuGUxRJ_Qtgthsfi72I_yPjOmXHgfjHSm4W859h1jHydT2PqM8Gjrd-dBE1nOdEzByFuQbT98NRYjooGwJ6tlOxeI8RXbhiybEAiKTpJMwlufeL1jGqlx8dYo_HfZvNMn3lB8mF5fCyEmKAZKl62VGRciH6T-ywHFhiJeUBfh4vhhuuKBNTldhjMLl1StasLfxMaJZUOT10D3o-heSIKe7M",
    initials: "MS",
    department: "School of Management",
    cadre: "HOD & Professor",
    type: "teaching",
    weeklyHours: 20.0,
    maxHours: 20.0,
    status: "Overallocated",
    verified: true,
    email: "m.sundaram@apex.edu",
    phone: "+1 (555) 304-9118",
    assignments: [
      { id: "sub-6", code: "MBA102", name: "Corporate Financial Engineering", batch: "MBA Term 1 (Cohort A)", hours: 8.0 },
      { id: "sub-7", code: "FIN401", name: "FinTech Operations & Hedging", batch: "Fintech Ops Sem 3", hours: 8.0 },
      { id: "sub-8", code: "MGT800", name: "Executive Leadership Seminar", batch: "Executive MBA", hours: 4.0 }
    ]
  },
  {
    id: "fac-4",
    name: "Dr. Alistair Chen",
    empId: "APX-FAC-2020-019",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaoow6EroYQ3yGh7p9-EZLsTUZ8K40Q4ooWuHoPkj7jlG7SCfHW54eZ2bNpvBAShUD426d58sIw7yENGhZLxhU7Zt3hQDKcGQIJWo6bkddSFGlZUdzlcirts-hjSXnhYr4xDyIEqZQ508R9uWTtP2SKybdX-KfiCwizuJZzEPDNszOmaQARCEftHgSOnBjrhkXlTUf-R2AR5dVIqovXlzH-QugEtTXIbOcZzPqq4jy",
    initials: "AC",
    department: "Quantum Computing & ECE",
    cadre: "Assistant Professor & PI",
    type: "teaching",
    weeklyHours: 14.5,
    maxHours: 20.0,
    status: "Optimal",
    verified: true,
    email: "a.chen.fac@apex.edu",
    phone: "+1 (555) 672-8801",
    assignments: [
      { id: "sub-9", code: "QC501", name: "Quantum Algorithms & Circuits", batch: "M.Tech Quantum Sem 2", hours: 8.5 },
      { id: "sub-10", code: "EC302", name: "Solid State Devices", batch: "B.Tech ECE Sem 4 (B)", hours: 6.0 }
    ]
  },
  {
    id: "fac-5",
    name: "Dr. Sarah Jenkins",
    empId: "APX-FAC-2023-112",
    avatar: "",
    initials: "SJ",
    department: "Data Science & Statistics",
    cadre: "Visiting Scholar",
    type: "teaching",
    weeklyHours: 12.0,
    maxHours: 20.0,
    status: "Under-allocated",
    verified: false,
    email: "sarah.jenkins@apex.edu",
    phone: "+1 (555) 942-0199",
    assignments: [
      { id: "sub-11", code: "DS204", name: "Bayesian Inference & Modeling", batch: "M.Sc Data Science Sem 2", hours: 12.0 }
    ]
  }
];

export default function StaffDirectoryPage() {
  const [facultyList, setFacultyList] = useState<Faculty[]>(initialFacultyList);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty>(initialFacultyList[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedTab, setSelectedTab] = useState<"all" | "teaching" | "lab" | "admin" | "overallocated">("all");
  const [showOnboardModal, setShowOnboardModal] = useState(false);

  // Quick Assignment State
  const [newSubCode, setNewSubCode] = useState("CS505");
  const [newSubName, setNewSubName] = useState("Advanced Operating Systems");
  const [newSubBatch, setNewSubBatch] = useState("B.Tech CS Sem 5 (A)");
  const [newSubHours, setNewSubHours] = useState<number>(4.0);

  // Filter Logic
  const filteredList = facultyList.filter((fac) => {
    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === "all" ? true : fac.department.toLowerCase().includes(selectedDept);

    let matchesTab = true;
    if (selectedTab === "teaching") matchesTab = fac.type === "teaching";
    if (selectedTab === "lab") matchesTab = fac.type === "lab";
    if (selectedTab === "admin") matchesTab = fac.type === "admin";
    if (selectedTab === "overallocated") matchesTab = fac.weeklyHours >= 19.0;

    return matchesSearch && matchesDept && matchesTab;
  });

  // Assign Course Module
  const handleAssignCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFaculty) return;

    const newAssignment: SubjectAssignment = {
      id: String(Date.now()),
      code: newSubCode,
      name: newSubName,
      batch: newSubBatch,
      hours: Number(newSubHours)
    };

    const updatedHours = selectedFaculty.weeklyHours + Number(newSubHours);
    const updatedStatus: Faculty["status"] =
      updatedHours >= 19.0 ? "Overallocated" : updatedHours >= 14.0 ? "Optimal" : "Under-allocated";

    const updatedFaculty: Faculty = {
      ...selectedFaculty,
      weeklyHours: updatedHours,
      status: updatedStatus,
      assignments: [...selectedFaculty.assignments, newAssignment]
    };

    setSelectedFaculty(updatedFaculty);
    setFacultyList(facultyList.map((f) => (f.id === updatedFaculty.id ? updatedFaculty : f)));
  };

  // Remove Course Module
  const handleRemoveCourse = (subId: string, hours: number) => {
    const updatedHours = Math.max(0, selectedFaculty.weeklyHours - hours);
    const updatedStatus: Faculty["status"] =
      updatedHours >= 19.0 ? "Overallocated" : updatedHours >= 14.0 ? "Optimal" : "Under-allocated";

    const updatedFaculty: Faculty = {
      ...selectedFaculty,
      weeklyHours: updatedHours,
      status: updatedStatus,
      assignments: selectedFaculty.assignments.filter((a) => a.id !== subId)
    };

    setSelectedFaculty(updatedFaculty);
    setFacultyList(facultyList.map((f) => (f.id === updatedFaculty.id ? updatedFaculty : f)));
  };

  return (
    <div className="p-3 sm:p-5 md:p-7 space-y-4 sm:space-y-5 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* 1. Header Banner - Clean, Balanced, Zero Redundant Text */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-50/50 via-indigo-50/20 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Staff Directory &amp; Faculty Assignment
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                ACTIVE ROSTER: <strong>142</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                TEACHING: <strong>98</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                LAB &amp; ADMIN: <strong>44</strong>
              </span>
            </div>
          </div>

          {/* Quick Action Buttons - Vertically Centered & Balanced */}
          <div className="flex items-center flex-wrap gap-2 shrink-0">
            <button
              onClick={() => alert("Exporting Faculty Registry to Excel...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export (XLSX)</span>
            </button>
            <button
              onClick={() => alert("Opening Workload Matrix Heatmap")}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <Grid className="w-4 h-4 text-slate-500" />
              <span>Workload Matrix</span>
            </button>
            <button
              onClick={() => setShowOnboardModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Onboard Faculty</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Telemetry KPI Cards (4 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Total Faculty &amp; Staff
            </span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3.5">
            <div className="text-xl sm:text-2xl font-bold text-[#3D405B] tracking-tight">142</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
                100%
              </span>
              <span>18 depts</span>
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Average Load
            </span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50/80 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3.5">
            <div className="text-xl sm:text-2xl font-bold text-[#3D405B] tracking-tight">16.4 <span className="text-xs font-normal text-slate-400">h/wk</span></div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-purple-700 font-semibold">
                82.0%
              </span>
              <span>of 20h</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Subject Allocation
            </span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3.5">
            <div className="text-xl sm:text-2xl font-bold text-[#3D405B] tracking-tight">98.6%</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                148/150
              </span>
              <span>Modules</span>
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              On Leave
            </span>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50/80 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <CalendarX className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3.5">
            <div className="text-xl sm:text-2xl font-bold text-amber-600 tracking-tight">4</div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
              <span className="inline-flex items-center text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
                Substitutes Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Workspace Grid: Left Ledger + Right Faculty Assignment Controller */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Staff Directory Ledger (Col 8) */}
        <div className="xl:col-span-8 space-y-4">
          {/* Filter Console & Search Bar */}
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
                  placeholder="Filter by Name, Employee ID (APX-FAC...), or Department..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  className="bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3D405B] text-slate-800"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="computing">Dept. of Computing &amp; IT</option>
                  <option value="robotics">AI &amp; Robotics Lab</option>
                  <option value="management">School of Management</option>
                  <option value="quantum">Quantum Computing &amp; ECE</option>
                </select>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDept("all");
                  }}
                  className="px-3 py-2 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Segmented Filter Tabs */}
            <div className="flex items-center overflow-x-auto gap-2 text-xs max-w-full no-scrollbar pb-1">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedTab === "all"
                    ? "bg-[#3D405B] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                All Staff ({facultyList.length})
              </button>
              <button
                onClick={() => setSelectedTab("teaching")}
                className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedTab === "teaching"
                    ? "bg-[#3D405B] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
              >
                Teaching Faculty ({facultyList.filter((f) => f.type === "teaching").length})
              </button>
              <button
                onClick={() => setSelectedTab("overallocated")}
                className={`px-3 py-1.5 font-semibold rounded-lg transition-colors ml-auto flex items-center gap-1.5 cursor-pointer ${
                  selectedTab === "overallocated"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Over-Allocated (&gt;18h) ({facultyList.filter((f) => f.weeklyHours >= 19.0).length})</span>
              </button>
            </div>
          </div>

          {/* Dense Data Ledger Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse text-xs min-w-[750px]">
                <thead>
                  <tr className="bg-slate-50/70 text-slate-500 text-[10px] uppercase tracking-wider font-semibold border-b border-slate-100 whitespace-nowrap">
                    <th className="py-2.5 px-4 font-semibold">Faculty / Employee</th>
                    <th className="py-2.5 px-4 font-semibold">Department &amp; Cadre</th>
                    <th className="py-2.5 px-4 font-semibold">Assigned Subjects</th>
                    <th className="py-2.5 px-4 font-semibold">Weekly Load</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.map((fac) => {
                    const isSelected = selectedFaculty.id === fac.id;
                    const loadPercent = Math.min(100, Math.round((fac.weeklyHours / fac.maxHours) * 100));

                    return (
                      <tr
                        key={fac.id}
                        onClick={() => setSelectedFaculty(fac)}
                        className={`hover:bg-slate-50/60 transition-colors cursor-pointer ${
                          isSelected ? "bg-blue-50/50 border-l-4 border-[#3D405B]" : ""
                        }`}
                      >
                        {/* Faculty Info */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                              {fac.avatar ? (
                                <img src={fac.avatar} alt={fac.name} className="w-full h-full object-cover" />
                              ) : (
                                fac.initials
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-[#3D405B] truncate flex items-center gap-1">
                                {fac.name}
                                {fac.verified && (
                                  <BadgeCheck className="w-3.5 h-3.5 text-blue-600" />
                                )}
                              </span>
                              <span className="font-mono text-[10px] text-slate-400">
                                {fac.empId}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-800">{fac.department}</span>
                            <span className="text-slate-400 text-[10px]">
                              {fac.cadre}
                            </span>
                          </div>
                        </td>

                        {/* Subjects */}
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1 max-w-xs">
                            {fac.assignments.slice(0, 2).map((a) => (
                              <div key={a.id} className="flex items-center gap-1.5 truncate">
                                <span className="px-1.5 py-0.5 bg-slate-100 text-[#3D405B] font-mono text-[10px] font-bold rounded">
                                  {a.code}
                                </span>
                                <span className="truncate text-slate-500 text-[11px]">
                                  {a.batch}
                                </span>
                              </div>
                            ))}
                            {fac.assignments.length > 2 && (
                              <span className="text-[10px] text-blue-600 font-semibold">
                                +{fac.assignments.length - 2} more modules
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Weekly Load */}
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1 w-28">
                            <div className="flex justify-between items-center font-mono text-[10px]">
                              <span
                                className={`font-bold ${
                                  fac.status === "Overallocated" ? "text-rose-600" : "text-[#3D405B]"
                                }`}
                              >
                                {fac.weeklyHours}h / {fac.maxHours}h
                              </span>
                              <span className="text-slate-400">{loadPercent}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  fac.status === "Overallocated"
                                    ? "bg-rose-600"
                                    : fac.weeklyHours >= 14
                                    ? "bg-[#3D405B]"
                                    : "bg-blue-600"
                                }`}
                                style={{ width: `${loadPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
                              fac.status === "Optimal"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : fac.status === "Overallocated"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {fac.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td
                          className="py-3 px-4 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedFaculty(fac)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            Manage
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

        {/* RIGHT COLUMN: Faculty Assignment & Workload Controller (Col 4) */}
        <div className="xl:col-span-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs sticky top-20 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#3D405B]" />
                <h3 className="font-bold text-sm text-[#3D405B]">
                  Faculty Assignment Console
                </h3>
              </div>
              <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                LIVE WORKLOAD
              </span>
            </div>

            {/* Selected Faculty Identity Tile */}
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#3D405B] text-white flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                {selectedFaculty.avatar ? (
                  <img src={selectedFaculty.avatar} alt={selectedFaculty.name} className="w-full h-full object-cover" />
                ) : (
                  selectedFaculty.initials
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-semibold text-sm text-[#3D405B] truncate">
                  {selectedFaculty.name}
                </h4>
                <span className="font-mono text-[10px] text-slate-400">
                  {selectedFaculty.empId}
                </span>
                <span className="text-[11px] text-slate-500 truncate">
                  {selectedFaculty.department}
                </span>
              </div>
            </div>

            {/* Workload Meter */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="text-slate-500">Weekly Allocated Load:</span>
                <strong
                  className={`font-mono text-sm ${
                    selectedFaculty.weeklyHours >= 19 ? "text-rose-600" : "text-[#3D405B]"
                  }`}
                >
                  {selectedFaculty.weeklyHours} / {selectedFaculty.maxHours} Hrs
                </strong>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    selectedFaculty.weeklyHours >= 19
                      ? "bg-rose-600"
                      : selectedFaculty.weeklyHours >= 14
                      ? "bg-[#3D405B]"
                      : "bg-blue-600"
                  }`}
                  style={{
                    width: `${Math.min(100, (selectedFaculty.weeklyHours / selectedFaculty.maxHours) * 100)}%`
                  }}
                ></div>
              </div>
              {selectedFaculty.weeklyHours >= 19 && (
                <p className="text-[10px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Overload Warning: Exceeds standard faculty ceiling!
                </p>
              )}
            </div>

            {/* Current Active Course Assignments */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#3D405B]">
                <span>Assigned Courses ({selectedFaculty.assignments.length})</span>
                <span className="text-[10px] text-slate-400 font-mono">HOURS/WK</span>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {selectedFaculty.assignments.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-100 flex items-center justify-between text-xs group transition-colors"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-[#3D405B]">{sub.code}</span>
                        <span className="font-medium text-slate-800 truncate">{sub.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {sub.batch}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-blue-600 text-xs">
                        {sub.hours}h
                      </span>
                      <button
                        onClick={() => handleRemoveCourse(sub.id, sub.hours)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Unassign module"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Course Assignment Form */}
            <form onSubmit={handleAssignCourse} className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 space-y-2.5 text-xs">
              <span className="font-bold text-[#3D405B] uppercase text-[10px] tracking-wider block">
                + Assign New Subject / Batch
              </span>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-slate-500 font-medium">Course Subject</label>
                <select
                  className="p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#3D405B]"
                  value={newSubCode}
                  onChange={(e) => {
                    setNewSubCode(e.target.value);
                    if (e.target.value === "CS505") setNewSubName("Advanced Operating Systems");
                    if (e.target.value === "AI402") setNewSubName("Computer Vision & Perception");
                    if (e.target.value === "DS301") setNewSubName("Big Data Streaming Architectures");
                  }}
                >
                  <option value="CS505">CS505 - Advanced Operating Systems</option>
                  <option value="AI402">AI402 - Computer Vision &amp; Perception</option>
                  <option value="DS301">DS301 - Big Data Streaming Architectures</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-medium">Target Batch</label>
                  <select
                    className="p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#3D405B]"
                    value={newSubBatch}
                    onChange={(e) => setNewSubBatch(e.target.value)}
                  >
                    <option value="B.Tech CS Sem 5 (A)">B.Tech CS Sem 5 (A)</option>
                    <option value="B.Tech AI Sem 3 (B)">B.Tech AI Sem 3 (B)</option>
                    <option value="M.Tech Sem 1">M.Tech Sem 1</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-slate-500 font-medium">Hours / Wk</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="10"
                    className="p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#3D405B] font-mono"
                    value={newSubHours}
                    onChange={(e) => setNewSubHours(Number(e.target.value))}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer mt-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Assign Subject to Faculty</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 4. Onboard Faculty Modal */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4.5 bg-[#3D405B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-200" />
                <h3 className="font-bold text-sm">
                  Onboard Faculty / Academic Staff
                </h3>
              </div>
              <button
                onClick={() => setShowOnboardModal(false)}
                className="p-1 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Faculty onboarding successfully saved!");
                setShowOnboardModal(false);
              }}
              className="p-6 space-y-4 text-xs"
            >
              <div className="space-y-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-slate-700 uppercase text-[10px]">
                    Faculty Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                    placeholder="e.g. Dr. Jennifer Lawrence"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">
                      Academic Department *
                    </label>
                    <select className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs">
                      <option>Dept. of Computing &amp; IT</option>
                      <option>AI &amp; Robotics Lab</option>
                      <option>School of Management</option>
                      <option>Quantum Computing &amp; ECE</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">
                      Cadre / Designation *
                    </label>
                    <input
                      type="text"
                      className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                      placeholder="e.g. Assistant Professor"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">
                      Official Institutional Email *
                    </label>
                    <input
                      type="email"
                      className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                      placeholder="j.lawrence@apex.edu"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">
                      Emergency Phone Dial
                    </label>
                    <input
                      type="text"
                      className="p-2.5 border border-slate-200 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl focus:outline-none focus:border-[#3D405B] focus:ring-2 focus:ring-slate-100 transition-all text-xs"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowOnboardModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3D405B] hover:bg-[#2E3046] text-white font-semibold rounded-xl transition-all shadow-xs hover:shadow cursor-pointer"
                >
                  Confirm &amp; Issue Roster ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
