"use client";

import { useState } from "react";
import {
  Award,
  ShieldCheck,
  FileCheck,
  Search,
  Filter,
  Download,
  RefreshCw,
  Sliders,
  QrCode,
  Copy,
  Printer,
  FileText,
  Mail,
  Key,
  X,
  AlertTriangle,
  CheckCircle2,
  Lock,
  History,
  Ban,
  ChevronRight,
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
  Eye,
  Plus,
  Check
} from "lucide-react";

interface CertificateRecord {
  id: string;
  serial: string;
  sha256: string;
  studentName: string;
  rollId: string;
  dept: string;
  avatar: string;
  type: string;
  typeBadgeClass: string;
  issuedDate: string;
  session: string;
  status: "Verified" | "Revoked" | "Pending";
  ledgerBlock: string;
  grade: string;
  cgpa: string;
}

const INITIAL_CERTIFICATES: CertificateRecord[] = [
  {
    id: "cert-1",
    serial: "APX-CC-2025-8841",
    sha256: "e8f12a39bc80129f",
    studentName: "Devina Mukherjee",
    rollId: "APX-CS-2021-002",
    dept: "Computer Science & Engineering",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    type: "Course Completion",
    typeBadgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    issuedDate: "18 Mar 2025",
    session: "AY 2024-25 (Sem VIII)",
    status: "Verified",
    ledgerBlock: "#44921",
    grade: "First Class with Distinction",
    cgpa: "9.64 / 10.0"
  },
  {
    id: "cert-2",
    serial: "APX-BN-2025-4190",
    sha256: "d4a93c7104928bfa",
    studentName: "Rohan Senapati",
    rollId: "APX-ME-2022-084",
    dept: "Mechanical Engineering",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    type: "Bonafide Certificate",
    typeBadgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    issuedDate: "17 Mar 2025",
    session: "AY 2024-25 (Passport Visa)",
    status: "Verified",
    ledgerBlock: "#44910",
    grade: "Good Standing",
    cgpa: "8.72 / 10.0"
  },
  {
    id: "cert-3",
    serial: "APX-MH-2025-0012",
    sha256: "b321f0084729cdea",
    studentName: "Ananya Swaminathan",
    rollId: "APX-DS-2021-011",
    dept: "Data Science & AI",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    type: "Merit & Honor",
    typeBadgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    issuedDate: "15 Mar 2025",
    session: "Institute Gold Medallist",
    status: "Verified",
    ledgerBlock: "#44890",
    grade: "Institute Gold Medal (Rank 1)",
    cgpa: "9.91 / 10.0"
  },
  {
    id: "cert-4",
    serial: "APX-TC-2024-0104",
    sha256: "TAMPERED_HASH",
    studentName: "Tariq Khan",
    rollId: "APX-CE-2021-044",
    dept: "Civil Engineering",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    type: "Transfer Cert",
    typeBadgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    issuedDate: "04 Oct 2024",
    session: "Revoked Disciplinary",
    status: "Revoked",
    ledgerBlock: "Disciplinary #09",
    grade: "Revoked Credential",
    cgpa: "N/A"
  },
  {
    id: "cert-5",
    serial: "APX-CC-2025-8840",
    sha256: "71f0ea18492048dd",
    studentName: "Marcus D'Silva",
    rollId: "APX-EE-2021-032",
    dept: "Electrical & Electronics",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    type: "Course Completion",
    typeBadgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    issuedDate: "14 Mar 2025",
    session: "AY 2024-25 (First Class)",
    status: "Verified",
    ledgerBlock: "#44920",
    grade: "First Class",
    cgpa: "8.95 / 10.0"
  }
];

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>(INITIAL_CERTIFICATES);
  const [selectedCertId, setSelectedCertId] = useState<string>("APX-CC-2025-8841");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [certToRevoke, setCertToRevoke] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeCert =
    certificates.find((c) => c.serial === selectedCertId) || certificates[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `https://verify.apexinstitute.edu/cert/${activeCert.serial}`
      );
    }
    showToast(`Verification link copied for ${activeCert.serial}`);
  };

  const handleRevokeConfirm = () => {
    if (certToRevoke) {
      setCertificates((prev) =>
        prev.map((c) =>
          c.serial === certToRevoke
            ? { ...c, status: "Revoked", ledgerBlock: "Revoked Audit #12" }
            : c
        )
      );
      showToast(`Credential ${certToRevoke} revoked & broadcast to ledger.`);
    }
    setIsRevokeModalOpen(false);
  };

  const filteredCertificates = certificates.filter((c) => {
    if (filterType === "completion" && c.type !== "Course Completion") return false;
    if (filterType === "bonafide" && c.type !== "Bonafide Certificate") return false;
    if (filterType === "merit" && c.type !== "Merit & Honor") return false;
    if (filterType === "transfer" && c.type !== "Transfer Cert") return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.studentName.toLowerCase().includes(q) ||
        c.serial.toLowerCase().includes(q) ||
        c.rollId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Header Hero Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Certificates &amp; Credentials</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Cryptographic Anchor Active
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Issue, verify, revoke, and manage tamper-proof academic credentials and completion certificates.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => showToast("Opening Visual Certificate Template Designer...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Template Designer</span>
            </button>
            <button
              onClick={() => showToast("Initiated bulk certificate issuance for graduating class of 2025...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Batch Issuance</span>
            </button>
            <button
              onClick={() => setIsIssueModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Issue Certificate</span>
            </button>
          </div>
        </div>

        {/* 4 Standard Redesigned KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Issued Credentials */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Credentials Issued
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                1,428
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+14.2% YoY • AY 2024–25</span>
              </div>
            </div>
          </div>

          {/* Card 2: Active Templates */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Approved Formats
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                05 <span className="text-xs font-normal text-slate-500">Templates</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium truncate">
                <span>CC, Bonafide, Merit, Transfer, Honor</span>
              </div>
            </div>
          </div>

          {/* Card 3: Pending Issue Queue */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending Approval Queue
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <FileCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">42</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  36 Batch • 6 Urgent
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500">Awaiting Dean Stamp</span>
                <button
                  onClick={() => showToast("Loading 42 pending approvals queue...")}
                  className="text-indigo-600 hover:text-indigo-700 hover:underline font-semibold"
                >
                  Review Queue
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Revoked / Invalidation */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Revoked Credentials
              </span>
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Ban className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-rose-600 tabular-nums">04</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                  Disciplinary Null
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Immutable ledger audit</span>
                <span className="text-slate-900 font-semibold">100% Retained</span>
              </div>
            </div>
          </div>
        </div>

        {/* Template Filter Bar & Ribbon */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-medium overflow-x-auto">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterType === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Templates (1,428)
              </button>
              <button
                onClick={() => setFilterType("completion")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterType === "completion"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Course Completion (842)
              </button>
              <button
                onClick={() => setFilterType("bonafide")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterType === "bonafide"
                    ? "bg-white text-emerald-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Bonafide (310)
              </button>
              <button
                onClick={() => setFilterType("merit")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterType === "merit"
                    ? "bg-white text-amber-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Merit &amp; Honor (33)
              </button>
              <button
                onClick={() => setFilterType("transfer")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  filterType === "transfer"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Transfer / Migration (98)
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Serial, Name, Roll ID..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Quick Batch Issuance Ribbon */}
          <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-col md:flex-row items-stretch md:items-end justify-between gap-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Target Cohort
                </label>
                <select className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
                  <option>B.Tech CS 2021-2025 (Final Year)</option>
                  <option>MBA Executive 2023-2025</option>
                  <option>M.Tech AI &amp; Robotics 2023-2025</option>
                  <option>B.Des Interaction Design 2021-2025</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Credential Format
                </label>
                <select className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
                  <option>Course Completion &amp; Degree Grant</option>
                  <option>Institutional Bonafide</option>
                  <option>Academic Merit Citation</option>
                  <option>Transfer &amp; Clearance Certificate</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Issue Date
                </label>
                <input
                  type="date"
                  defaultValue="2025-03-24"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Signatory Authority
                </label>
                <select className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
                  <option>Dean Dr. Margaret Vance &amp; Registrar</option>
                  <option>Controller of Exams Dr. S. Nair</option>
                  <option>Registrar Kenneth Thorne</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => showToast("Batch Dispatch queued for 128 graduating students.")}
              className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <Zap className="w-4 h-4" />
              <span>Batch Dispatch (128)</span>
            </button>
          </div>
        </div>

        {/* Split Screen (7 Cols Table vs 5 Cols A4 Preview) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT: Issued Certificate Audit Register Table (7 cols) */}
          <div className="xl:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">Certificate Audit Register</h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                    {filteredCertificates.length} of 1,428
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => showToast("Exporting cryptographic registry as CSV...")}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Export CSV"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showToast("Audit ledger refreshed with latest blocks.")}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Refresh Ledger"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Certificate ID</th>
                      <th className="py-3 px-4">Recipient Student</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Issued &amp; Session</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCertificates.map((cert) => {
                      const isSelected = cert.serial === selectedCertId;
                      const isRevoked = cert.status === "Revoked";

                      return (
                        <tr
                          key={cert.id}
                          onClick={() => setSelectedCertId(cert.serial)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-indigo-50/50 hover:bg-indigo-50/70 border-l-4 border-l-indigo-600"
                              : "hover:bg-slate-50/80"
                          }`}
                        >
                          {/* Serial & Hash */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1 font-mono font-bold text-indigo-700">
                              <span className={isRevoked ? "text-rose-600 line-through" : ""}>
                                {cert.serial}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (typeof navigator !== "undefined") {
                                    navigator.clipboard.writeText(cert.serial);
                                  }
                                  showToast(`Copied ${cert.serial}`);
                                }}
                                className="text-slate-400 hover:text-indigo-600"
                                title="Copy ID"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              SHA256: {cert.sha256.slice(0, 8)}...
                            </span>
                          </td>

                          {/* Student */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={cert.avatar}
                                alt={cert.studentName}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <div
                                  className={`font-semibold ${
                                    isRevoked ? "text-rose-600 line-through" : "text-slate-900"
                                  }`}
                                >
                                  {cert.studentName}
                                </div>
                                <div className="text-[11px] text-slate-500 font-mono">{cert.rollId}</div>
                              </div>
                            </div>
                          </td>

                          {/* Type */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cert.typeBadgeClass}`}
                            >
                              {cert.type}
                            </span>
                          </td>

                          {/* Issued Date & Session */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <div className="font-semibold text-slate-800">{cert.issuedDate}</div>
                            <div className="text-[11px] text-slate-500">{cert.session}</div>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                                isRevoked
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              {isRevoked ? (
                                <AlertTriangle className="w-3 h-3" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3" />
                              )}
                              <span>{cert.status}</span>
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => setSelectedCertId(cert.serial)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                                title="View in Studio"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => showToast(`Downloading High-Res PDF for ${cert.serial}...`)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                                title="Download PDF"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              {!isRevoked ? (
                                <button
                                  onClick={() => {
                                    setCertToRevoke(cert.serial);
                                    setIsRevokeModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
                                  title="Revoke Credential"
                                >
                                  <Ban className="w-4 h-4" />
                                </button>
                              ) : (
                                <span className="p-1.5 text-slate-300" title="Revoked">
                                  <Lock className="w-4 h-4" />
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                <div>Showing 1 to {filteredCertificates.length} of 1,428 verified credentials</div>
                <div className="flex items-center gap-1">
                  <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                    Prev
                  </button>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                    1
                  </span>
                  <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Cryptographic Key Infrastructure Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Cryptographic Signing Infrastructure</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ONLINE • BLOCK #981,042
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Key Vault</div>
                  <div className="font-mono font-bold text-slate-900 mt-1">APX-ED-RSA-4096</div>
                  <div className="text-emerald-600 text-[11px] font-medium mt-0.5">HSM Hardware Backed</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Decentralized DID</div>
                  <div className="font-mono font-bold text-slate-900 mt-1 truncate">did:apex:inst:reg-v1</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Anchor: Polygon POS</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Public Verification URL</div>
                  <div className="font-mono font-bold text-slate-900 mt-1 truncate">verify.apexinstitute.edu</div>
                  <div className="text-emerald-600 text-[11px] font-medium mt-0.5">TLS 1.3 Certified</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: A4 Printable Certificate Studio & Live Preview (5 cols) */}
          <div className="xl:col-span-5 space-y-4 sticky top-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Studio Header */}
              <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-200" />
                  <span className="text-sm font-bold">A4 Certificate Studio</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  Full Bleed 300 DPI
                </span>
              </div>

              {/* Certificate Viewport Canvas */}
              <div className="p-4 bg-slate-100 flex items-center justify-center overflow-auto">
                <div
                  className={`w-full max-w-[480px] aspect-[1/1.414] bg-white shadow-xl p-6 relative flex flex-col justify-between text-slate-900 select-none border border-slate-300 rounded-sm ${
                    activeCert.status === "Revoked" ? "opacity-75 grayscale" : ""
                  }`}
                >
                  {/* Decorative Borders */}
                  <div className="absolute inset-2 pointer-events-none border-2 border-indigo-900/80" />
                  <div className="absolute inset-3 pointer-events-none border border-slate-300" />

                  {/* Revoked Stamp */}
                  {activeCert.status === "Revoked" && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                      <span className="text-rose-600/50 font-black text-4xl tracking-widest rotate-[-30deg] border-4 border-rose-600/50 px-4 py-2 uppercase">
                        REVOKED &amp; VOID
                      </span>
                    </div>
                  )}

                  {/* Top Security Line */}
                  <div className="relative z-10 flex items-center justify-between text-[8px] font-mono tracking-widest text-slate-400 uppercase">
                    <span>HASH: SHA256//{activeCert.sha256.slice(0, 6).toUpperCase()}</span>
                    <span className="font-bold text-slate-900">SERIAL: {activeCert.serial}</span>
                    <span>AUTHENTIC RECORD</span>
                  </div>

                  {/* Crest & Title */}
                  <div className="relative z-10 flex flex-col items-center text-center mt-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-900 text-white flex items-center justify-center font-serif font-black text-lg mb-1.5 shadow-xs">
                      A
                    </div>
                    <h3 className="font-serif text-xs uppercase tracking-widest text-indigo-950 font-bold">
                      Apex Institute of Technology &amp; Management
                    </h3>
                    <span className="text-[8px] uppercase tracking-wider text-slate-500 font-medium">
                      Autonomous Academic Council • Estd. Under Statutory Act
                    </span>
                    <div className="w-24 h-0.5 bg-indigo-900 my-2 mx-auto" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-800 font-bold">
                      {activeCert.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Certificate Prose */}
                  <div className="relative z-10 text-center px-2 my-1 flex flex-col items-center space-y-1">
                    <p className="text-[10px] text-slate-500 italic">This is to solemnly certify that</p>
                    <div className="border-b-2 border-indigo-900 pb-0.5 px-3 inline-block">
                      <span className="font-serif text-base text-indigo-950 font-bold tracking-tight">
                        {activeCert.studentName}
                      </span>
                    </div>
                    <p className="font-mono text-[9px] font-semibold text-slate-700">
                      Roll Registration ID: {activeCert.rollId}
                    </p>
                    <p className="text-[9px] text-slate-600 leading-relaxed max-w-xs mt-1">
                      having fulfilled all prescribed curriculum requisites, examinations, and thesis regulations with distinction, is awarded this Certificate in
                    </p>
                    <div className="bg-slate-50 px-3 py-1 border border-slate-200 mt-1">
                      <span className="font-bold text-[10px] uppercase text-indigo-900 tracking-tight">
                        {activeCert.dept}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-700 mt-1">
                      Awarded with {activeCert.grade} (CGPA: {activeCert.cgpa})
                    </span>
                  </div>

                  {/* Signatories & QR */}
                  <div className="relative z-10 mt-auto pt-2 flex flex-col gap-2">
                    <div className="flex items-center justify-between px-2">
                      {/* QR */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-10 bg-white p-0.5 border border-slate-300 flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-slate-900" />
                        </div>
                        <div className="text-[8px] text-left leading-tight text-slate-500">
                          <div className="font-bold text-slate-900">Scan to Verify</div>
                          <div>verify.apexinstitute.edu</div>
                        </div>
                      </div>

                      {/* Seal */}
                      <div className="w-10 h-10 rounded-full border-2 border-dashed border-indigo-900 flex flex-col items-center justify-center text-[7px] text-indigo-900 font-bold">
                        <span>OFFICIAL</span>
                        <span>SEAL</span>
                      </div>
                    </div>

                    {/* Dual Signatures */}
                    <div className="grid grid-cols-2 gap-4 pt-1 px-2 border-t border-slate-200 text-center">
                      <div>
                        <div className="font-serif italic text-xs text-slate-800">Dr. S. Nair</div>
                        <div className="text-[8px] uppercase text-slate-500 font-semibold">Controller of Exams</div>
                      </div>
                      <div>
                        <div className="font-serif italic text-xs text-slate-800">Dr. Margaret Vance</div>
                        <div className="text-[8px] uppercase text-slate-500 font-semibold">Dean of Academic Affairs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      showToast("Spooling full bleed A4 output to printer...");
                      if (typeof window !== "undefined") window.print();
                    }}
                    className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print A4 Slip</span>
                  </button>
                  <button
                    onClick={() => showToast(`Exporting High-Res PDF for ${activeCert.serial}...`)}
                    className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 truncate mr-2">
                    https://verify.apexinstitute.edu/cert/{activeCert.serial}
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100 transition-colors shrink-0"
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Issue New Certificate */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Issue Academic Credential</h3>
              </div>
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Student Roll No *
                  </label>
                  <input
                    type="text"
                    defaultValue="APX-CS-2021-002"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Certificate Type *
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                    <option>Course Completion &amp; Degree Grant</option>
                    <option>Bonafide Certificate</option>
                    <option>Character &amp; Conduct</option>
                    <option>Transfer Certificate (TC)</option>
                    <option>Academic Merit &amp; Gold Medal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Academic Cohort
                  </label>
                  <input
                    type="text"
                    defaultValue="AY 2021-2025 (Class of 2025)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Division &amp; Grade
                  </label>
                  <input
                    type="text"
                    defaultValue="First Class with Distinction (9.64 CGPA)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Custom Endorsement Statement
                </label>
                <textarea
                  rows={2}
                  placeholder="Having satisfied all prerequisites, laboratory vivas, and departmental clearances..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none"
                />
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span className="font-semibold text-indigo-900 text-xs">
                    Anchor to Blockchain &amp; Generate Cryptographic Hash
                  </span>
                </label>
                <span className="font-mono font-bold text-indigo-700 text-[11px]">ED25519</span>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsIssueModalOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsIssueModalOpen(false);
                    showToast("New Academic Credential minted and cryptographically signed.");
                  }}
                  className="py-2 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign &amp; Issue Credential</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Revocation Confirmation */}
      {isRevokeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-rose-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-rose-100 flex items-center justify-between bg-rose-50/70">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-base">Revoke &amp; Invalidate Credential</h3>
              </div>
              <button
                onClick={() => setIsRevokeModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-900">
                Are you sure you want to invalidate credential <span className="font-mono text-rose-600 font-bold">{certToRevoke}</span>?
              </p>
              <p className="leading-relaxed">
                This operation records an immutable Revocation Entry on the distributed ledger. The public verification URL and QR code will permanently return <strong className="text-rose-600">REVOKED &amp; INVALID</strong>.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Reason for Invalidation *
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                  <option>Academic Misconduct / Plagiarism Finding</option>
                  <option>Administrative Clerical Data Correction</option>
                  <option>Disciplinary Committee Directive</option>
                  <option>Duplicate Issuance Superseded</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRevokeModalOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRevokeConfirm}
                  className="py-2 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-xs transition-colors"
                >
                  Confirm Invalidation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
