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
  Sparkles
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
    <div className="flex flex-col w-full pb-16">
      {/* 1. Institutional Header & Operational Sub-bar */}
      <section className="bg-surface-container-lowest px-6 py-4 shadow-sm border-b border-outline-variant/30">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-on-surface-variant uppercase tracking-wider">
              <span>Institutional Command</span>
              <span>/</span>
              <span>Academic Administration</span>
              <span>/</span>
              <span className="text-secondary font-bold">Staff Directory &amp; Faculty Assignment</span>
            </div>
            <div className="flex items-baseline gap-3 mt-0.5">
              <h1 className="font-headline text-xl uppercase text-primary font-bold tracking-tight">
                Staff Directory &amp; Faculty Assignment
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 bg-surface-container font-mono text-xs text-secondary font-bold">
                ACTIVE ROSTER AY 2024-25
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Institutional Faculty Registry, Subject Load Balancing &amp; Batch Allocation • Operational Telemetry Grid
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => alert("Exporting Faculty Registry to Excel...")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs uppercase tracking-wider transition-colors border border-outline-variant/30 shadow-sm"
            >
              <Download className="w-4 h-4 text-secondary" />
              <span>Export Registry (XLSX)</span>
            </button>
            <button
              onClick={() => alert("Opening Workload Matrix Heatmap")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs uppercase tracking-wider transition-colors border border-outline-variant/30 shadow-sm"
            >
              <Grid className="w-4 h-4 text-secondary" />
              <span>Batch Workload Matrix</span>
            </button>
            <button
              onClick={() => setShowOnboardModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-container hover:bg-primary text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Onboard New Faculty / Staff</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Telemetry KPI Strip */}
      <section className="px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* KPI 1 */}
          <div className="relative bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Total Faculty &amp; Staff
              </span>
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-2xl font-bold text-primary">142</span>
                <span className="text-[11px] uppercase text-secondary font-bold">Total Active</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Teaching Faculty: <strong className="text-on-surface">98</strong> • Lab/Admin: <strong className="text-on-surface">44</strong>
              </p>
            </div>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-secondary font-bold">+6 this semester</span>
              <span className="text-on-surface-variant font-mono">100% Verified</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="relative bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Average Teaching Load
              </span>
              <Gauge className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-2xl font-bold text-primary">16.4</span>
                <span className="text-[11px] uppercase text-secondary font-bold">Hrs / Wk</span>
              </div>
              <div className="w-full bg-surface-container h-1.5 mt-2">
                <div className="bg-secondary h-1.5" style={{ width: "82%" }}></div>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-on-surface-variant">Ceiling: 20.0 Hrs/Wk</span>
              <span className="text-secondary font-bold">82.0% Optimal</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="relative bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-container"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Batch Subject Allocation
              </span>
              <Layers className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-2xl font-bold text-primary">98.6%</span>
                <span className="text-[11px] uppercase text-secondary font-bold">Staffed</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                148 / 150 Course Modules Assigned
              </p>
            </div>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-error font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> 2 Unstaffed Slots
              </span>
              <span className="text-secondary font-bold">12 Core Labs</span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="relative bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20 overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-outline"></div>
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                Faculty on Leave
              </span>
              <CalendarX className="w-5 h-5 text-secondary" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-2xl font-bold text-primary">4</span>
                <span className="text-[11px] uppercase text-on-surface-variant font-bold">On Leave</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Sabbatical: 2 • Medical: 2
              </p>
            </div>
            <div className="pt-1 flex items-center justify-between text-[11px]">
              <span className="text-secondary font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Substitutes Active
              </span>
              <span className="text-on-surface-variant font-mono">Zero Gaps</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Workspace Grid: Left Ledger + Right Faculty Assignment Controller */}
      <section className="px-6 pb-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Staff Directory Ledger (Col 8) */}
          <div className="xl:col-span-8 flex flex-col gap-4">
            {/* Filter Console & Search Bar */}
            <div className="bg-surface-container-lowest p-4 shadow-sm border border-outline-variant/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    className="w-full bg-surface-container-low pl-9 pr-3 py-1.5 text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:bg-surface-container-lowest"
                    placeholder="Filter by Name, Employee ID (APX-FAC...), or Department..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="bg-surface-container-low text-xs px-2.5 py-1.5 border border-outline-variant/30 focus:outline-none"
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
                    className="px-2.5 py-1.5 text-xs text-on-surface-variant hover:text-on-surface uppercase border border-outline-variant/30"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Segmented Filter Tabs */}
              <div className="flex items-center overflow-x-auto pt-3 gap-1 text-xs">
                <button
                  onClick={() => setSelectedTab("all")}
                  className={`px-3 py-1.5 font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                    selectedTab === "all"
                      ? "bg-primary-container text-white"
                      : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  All Staff ({facultyList.length})
                </button>
                <button
                  onClick={() => setSelectedTab("teaching")}
                  className={`px-3 py-1.5 font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ${
                    selectedTab === "teaching"
                      ? "bg-primary-container text-white"
                      : "bg-surface-container-low text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Teaching Faculty ({facultyList.filter((f) => f.type === "teaching").length})
                </button>
                <button
                  onClick={() => setSelectedTab("overallocated")}
                  className={`px-3 py-1.5 font-semibold uppercase tracking-wider whitespace-nowrap transition-colors ml-auto flex items-center gap-1 ${
                    selectedTab === "overallocated"
                      ? "bg-error text-white"
                      : "bg-error-container text-error hover:bg-error/20"
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Over-Allocated (&gt;18h) ({facultyList.filter((f) => f.weeklyHours >= 19.0).length})
                </button>
              </div>
            </div>

            {/* Dense Data Ledger Table */}
            <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-[10px] uppercase tracking-wider font-semibold border-b border-outline-variant/30">
                      <th className="py-2.5 px-4 font-semibold">Faculty / Employee</th>
                      <th className="py-2.5 px-4 font-semibold">Department &amp; Cadre</th>
                      <th className="py-2.5 px-4 font-semibold">Assigned Subjects &amp; Cohorts</th>
                      <th className="py-2.5 px-4 font-semibold">Weekly Load</th>
                      <th className="py-2.5 px-4 font-semibold">Status</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {filteredList.map((fac) => {
                      const isSelected = selectedFaculty.id === fac.id;
                      const loadPercent = Math.min(100, Math.round((fac.weeklyHours / fac.maxHours) * 100));

                      return (
                        <tr
                          key={fac.id}
                          onClick={() => setSelectedFaculty(fac)}
                          className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                            isSelected ? "bg-surface-container/60 border-l-4 border-primary" : ""
                          }`}
                        >
                          {/* Faculty Info */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                                {fac.avatar ? (
                                  <img src={fac.avatar} alt={fac.name} className="w-full h-full object-cover" />
                                ) : (
                                  fac.initials
                                )}
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-primary truncate flex items-center gap-1">
                                  {fac.name}
                                  {fac.verified && (
                                    <BadgeCheck className="w-3.5 h-3.5 text-secondary" />
                                  )}
                                </span>
                                <span className="font-mono text-[10px] text-on-surface-variant">
                                  {fac.empId}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Department */}
                          <td className="py-3 px-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-primary">{fac.department}</span>
                              <span className="text-on-surface-variant text-[10px] uppercase">
                                {fac.cadre}
                              </span>
                            </div>
                          </td>

                          {/* Subjects */}
                          <td className="py-3 px-4">
                            <div className="flex flex-col gap-1 max-w-xs">
                              {fac.assignments.slice(0, 2).map((a) => (
                                <div key={a.id} className="flex items-center gap-1.5 truncate">
                                  <span className="px-1.5 py-0.2 bg-surface-container text-primary font-mono text-[10px] font-bold">
                                    {a.code}
                                  </span>
                                  <span className="truncate text-on-surface-variant text-[11px]">
                                    {a.batch}
                                  </span>
                                </div>
                              ))}
                              {fac.assignments.length > 2 && (
                                <span className="text-[10px] text-secondary font-bold">
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
                                    fac.status === "Overallocated" ? "text-error" : "text-primary"
                                  }`}
                                >
                                  {fac.weeklyHours}h / {fac.maxHours}h
                                </span>
                                <span className="text-on-surface-variant">{loadPercent}%</span>
                              </div>
                              <div className="w-full bg-surface-container h-1.5">
                                <div
                                  className={`h-full ${
                                    fac.status === "Overallocated"
                                      ? "bg-error"
                                      : fac.weeklyHours >= 14
                                      ? "bg-primary-container"
                                      : "bg-secondary"
                                  }`}
                                  style={{ width: `${loadPercent}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                                fac.status === "Optimal"
                                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                                  : fac.status === "Overallocated"
                                  ? "bg-error-container text-error border border-error/30"
                                  : "bg-amber-50 text-amber-800 border border-amber-200"
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
                              className="px-2.5 py-1 bg-surface-container-low text-primary hover:bg-primary hover:text-white font-mono text-[10px] font-bold uppercase transition-colors border border-outline-variant/30"
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
          <div className="xl:col-span-4 flex flex-col gap-4">
            <div className="bg-surface-container-lowest p-5 shadow-md border border-outline-variant/20 sticky top-20">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h3 className="font-headline text-sm font-bold text-primary uppercase">
                    Faculty Assignment Console
                  </h3>
                </div>
                <span className="font-mono text-[10px] text-secondary font-bold">
                  LIVE WORKLOAD
                </span>
              </div>

              {/* Selected Faculty Identity Tile */}
              <div className="p-3 bg-surface-container-low border border-outline-variant/30 flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm overflow-hidden shrink-0">
                  {selectedFaculty.avatar ? (
                    <img src={selectedFaculty.avatar} alt={selectedFaculty.name} className="w-full h-full object-cover" />
                  ) : (
                    selectedFaculty.initials
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-headline text-sm font-bold text-primary truncate">
                    {selectedFaculty.name}
                  </h4>
                  <span className="font-mono text-[10px] text-secondary font-semibold">
                    {selectedFaculty.empId}
                  </span>
                  <span className="text-[11px] text-on-surface-variant truncate">
                    {selectedFaculty.department}
                  </span>
                </div>
              </div>

              {/* Workload Meter */}
              <div className="p-3 bg-surface border border-outline-variant/30 mb-4">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-on-surface-variant font-medium">Weekly Allocated Load:</span>
                  <strong
                    className={`font-mono text-sm ${
                      selectedFaculty.weeklyHours >= 19 ? "text-error" : "text-primary"
                    }`}
                  >
                    {selectedFaculty.weeklyHours} / {selectedFaculty.maxHours} Hrs
                  </strong>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-none overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      selectedFaculty.weeklyHours >= 19
                        ? "bg-error"
                        : selectedFaculty.weeklyHours >= 14
                        ? "bg-primary-container"
                        : "bg-secondary"
                    }`}
                    style={{
                      width: `${Math.min(100, (selectedFaculty.weeklyHours / selectedFaculty.maxHours) * 100)}%`
                    }}
                  ></div>
                </div>
                {selectedFaculty.weeklyHours >= 19 && (
                  <p className="text-[10px] text-error font-semibold mt-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Overload Warning: Exceeds standard faculty ceiling!
                  </p>
                )}
              </div>

              {/* Current Active Course Assignments */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs font-bold text-primary uppercase">
                  <span>Assigned Courses ({selectedFaculty.assignments.length})</span>
                  <span className="text-[10px] text-on-surface-variant font-mono">HOURS/WK</span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {selectedFaculty.assignments.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-2.5 bg-surface border border-outline-variant/30 flex items-center justify-between text-xs group hover:border-primary transition-colors"
                    >
                      <div className="flex flex-col min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-primary">{sub.code}</span>
                          <span className="font-medium text-on-surface truncate">{sub.name}</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-mono">
                          {sub.batch}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono font-bold text-secondary text-xs">
                          {sub.hours}h
                        </span>
                        <button
                          onClick={() => handleRemoveCourse(sub.id, sub.hours)}
                          className="p-1 text-on-surface-variant/60 hover:text-error transition-colors"
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
              <form onSubmit={handleAssignCourse} className="p-3 bg-surface-container-low border border-outline-variant/30 space-y-2.5 text-xs">
                <span className="font-bold text-primary uppercase text-[10px] tracking-wider block">
                  + Assign New Subject / Batch
                </span>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-on-surface-variant">Course Subject</label>
                  <select
                    className="p-1.5 bg-surface border border-outline-variant/40 text-xs focus:outline-none"
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
                    <label className="text-[10px] text-on-surface-variant">Target Batch</label>
                    <select
                      className="p-1.5 bg-surface border border-outline-variant/40 text-xs focus:outline-none"
                      value={newSubBatch}
                      onChange={(e) => setNewSubBatch(e.target.value)}
                    >
                      <option value="B.Tech CS Sem 5 (A)">B.Tech CS Sem 5 (A)</option>
                      <option value="B.Tech AI Sem 3 (B)">B.Tech AI Sem 3 (B)</option>
                      <option value="M.Tech Sem 1">M.Tech Sem 1</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-on-surface-variant">Hours / Wk</label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      max="10"
                      className="p-1.5 bg-surface border border-outline-variant/40 text-xs focus:outline-none font-mono"
                      value={newSubHours}
                      onChange={(e) => setNewSubHours(Number(e.target.value))}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-primary-container text-white font-bold text-xs uppercase tracking-wider hover:bg-primary transition-colors flex items-center justify-center gap-1.5 shadow-sm mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Assign Subject to Faculty</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Onboard Faculty Modal */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-surface-container-lowest shadow-2xl border border-outline-variant/30 overflow-hidden">
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-secondary-container" />
                <h3 className="font-headline font-bold text-sm uppercase tracking-wider">
                  Onboard Faculty / Academic Staff
                </h3>
              </div>
              <button
                onClick={() => setShowOnboardModal(false)}
                className="p-1 text-white/80 hover:text-white"
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
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-on-surface uppercase text-[10px]">
                    Faculty Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                    placeholder="e.g. Dr. Jennifer Lawrence"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface uppercase text-[10px]">
                      Academic Department *
                    </label>
                    <select className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container">
                      <option>Dept. of Computing & IT</option>
                      <option>AI & Robotics Lab</option>
                      <option>School of Management</option>
                      <option>Quantum Computing & ECE</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface uppercase text-[10px]">
                      Cadre / Designation *
                    </label>
                    <input
                      type="text"
                      className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                      placeholder="e.g. Assistant Professor"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface uppercase text-[10px]">
                      Official Institutional Email *
                    </label>
                    <input
                      type="email"
                      className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                      placeholder="j.lawrence@apex.edu"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-on-surface uppercase text-[10px]">
                      Emergency Phone Dial
                    </label>
                    <input
                      type="text"
                      className="p-2 border border-outline-variant/40 bg-surface focus:outline-none focus:border-primary-container"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowOnboardModal(false)}
                  className="px-4 py-2 border border-outline-variant/40 font-semibold uppercase hover:bg-surface-container transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-container text-white font-bold uppercase tracking-wider hover:bg-primary transition-colors shadow-sm"
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

