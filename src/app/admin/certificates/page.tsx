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
  Plus
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

const initialCertificates: CertificateRecord[] = [
  {
    id: "cert-1",
    serial: "APX-CC-2024-8841",
    sha256: "e8f12a39bc80129f",
    studentName: "Devina Mukherjee",
    rollId: "APX-CS-2020-002",
    dept: "Computer Science & Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    type: "Course Completion",
    typeBadgeClass: "bg-primary-container text-on-primary",
    issuedDate: "18 Jun 2024",
    session: "AY 2023-24 (Sem VIII)",
    status: "Verified",
    ledgerBlock: "#44921",
    grade: "First Class with Distinction",
    cgpa: "9.64 / 10.0"
  },
  {
    id: "cert-2",
    serial: "APX-BN-2024-4190",
    sha256: "d4a93c7104928bfa",
    studentName: "Rohan Senapati",
    rollId: "APX-ME-2021-084",
    dept: "Mechanical Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    type: "Bonafide Certificate",
    typeBadgeClass: "bg-secondary-container text-on-secondary-container",
    issuedDate: "17 Jun 2024",
    session: "AY 2024-25 (Passport Visa)",
    status: "Verified",
    ledgerBlock: "#44910",
    grade: "Good Standing",
    cgpa: "8.72 / 10.0"
  },
  {
    id: "cert-3",
    serial: "APX-MH-2024-0012",
    sha256: "b321f0084729cdea",
    studentName: "Ananya Swaminathan",
    rollId: "APX-DS-2020-011",
    dept: "Data Science & AI",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    type: "Merit & Honor",
    typeBadgeClass: "bg-surface-container-high text-primary font-bold",
    issuedDate: "15 Jun 2024",
    session: "Institute Gold Medallist",
    status: "Verified",
    ledgerBlock: "#44890",
    grade: "Institute Gold Medal (Rank 1)",
    cgpa: "9.91 / 10.0"
  },
  {
    id: "cert-4",
    serial: "APX-TC-2023-0104",
    sha256: "TAMPERED_HASH",
    studentName: "Tariq Khan",
    rollId: "APX-CE-2020-044",
    dept: "Civil Engineering",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    type: "Transfer Cert",
    typeBadgeClass: "bg-surface-container text-on-surface",
    issuedDate: "04 Oct 2023",
    session: "Revoked 12 Nov 2023",
    status: "Revoked",
    ledgerBlock: "Disciplinary #09",
    grade: "Revoked Credential",
    cgpa: "N/A"
  },
  {
    id: "cert-5",
    serial: "APX-CC-2024-8840",
    sha256: "71f0ea18492048dd",
    studentName: "Marcus D'Silva",
    rollId: "APX-EE-2020-032",
    dept: "Electrical & Electronics",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    type: "Course Completion",
    typeBadgeClass: "bg-primary-container text-on-primary",
    issuedDate: "18 Jun 2024",
    session: "AY 2023-24 (First Class)",
    status: "Verified",
    ledgerBlock: "#44920",
    grade: "First Class",
    cgpa: "8.95 / 10.0"
  }
];

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>(initialCertificates);
  const [selectedCertId, setSelectedCertId] = useState<string>("APX-CC-2024-8841");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [certToRevoke, setCertToRevoke] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeCert =
    certificates.find((c) => c.serial === selectedCertId) || certificates[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        `https://verify.apexinstitute.edu/cert/${activeCert.serial}`
      );
    }
    triggerToast(`Verification link copied for ${activeCert.serial}`);
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
      triggerToast(`Credential ${certToRevoke} revoked & broadcast to ledger.`);
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
    <div className="flex flex-col w-full font-body-md text-on-surface">
      {/* Command Header & Breadcrumbs Strip */}
      <div className="px-margin-desktop py-space-md bg-surface-container-lowest shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md border-b border-outline-variant/30">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            <span>Institutional Command</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Registrar &amp; Academic Credentials</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-semibold">Certification Register</span>
          </div>
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
              Certificates Registry &amp; Credential Generator
            </h1>
            <span className="inline-flex items-center gap-1 px-space-xs py-0.5 bg-surface-container-high text-primary font-mono-data text-body-sm font-semibold">
              v3.4.2-BLOCKCHAIN
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-space-sm shrink-0 font-mono-data">
          <button
            onClick={() => triggerToast("Opening Visual Certificate Template Designer...")}
            className="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-container-low text-primary hover:bg-surface-container font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm"
          >
            <Sliders className="w-4 h-4 text-secondary" />
            <span>Template Designer</span>
          </button>
          <button
            onClick={() => triggerToast("Initiated bulk issuance for graduating class of 2024...")}
            className="inline-flex items-center gap-1.5 px-space-md py-2 bg-secondary text-on-secondary hover:bg-secondary/90 font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm"
          >
            <Layers className="w-4 h-4" />
            <span>Bulk Batch Issuance</span>
          </button>
          <button
            onClick={() => setIsIssueModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-space-md py-2 bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>+ Issue New Certificate</span>
          </button>
        </div>
      </div>

      {/* Operational Canvas */}
      <div className="p-margin-desktop flex flex-col gap-space-lg">
        {/* KPI Metric Telemetry Tiles (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
          {/* KPI 1 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
            <div className="flex items-center justify-between pl-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                Total Issued Credentials
              </span>
              <ShieldCheck className="w-5 h-5 text-secondary" />
            </div>
            <div className="pl-space-xs my-space-sm">
              <div className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                1,428
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Verified &amp; Cryptographically Anchored
              </p>
            </div>
            <div className="pl-space-xs pt-space-xs flex items-center justify-between text-body-sm border-t border-outline-variant/20">
              <span className="inline-flex items-center gap-0.5 text-secondary font-mono-data font-bold">
                <Sparkles className="w-3.5 h-3.5" /> +14.2% YoY
              </span>
              <span className="text-on-surface-variant font-mono-data text-body-sm">
                AY 2024-25
              </span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
            <div className="flex items-center justify-between pl-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                Active Templates
              </span>
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div className="pl-space-xs my-space-sm">
              <div className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                05
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Approved Institutional Formats
              </p>
            </div>
            <div className="pl-space-xs pt-space-xs flex items-center gap-1 text-body-sm text-on-surface-variant font-mono-data border-t border-outline-variant/20">
              <span className="h-2 w-2 bg-secondary inline-block"></span>
              <span className="truncate">CC, TC, Bonafide, Character, Merit</span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
            <div className="flex items-center justify-between pl-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                Pending Issue Queue
              </span>
              <FileCheck className="w-5 h-5 text-secondary" />
            </div>
            <div className="pl-space-xs my-space-sm">
              <div className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                42
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                36 Batch Approvals · 6 Expedited
              </p>
            </div>
            <div className="pl-space-xs pt-space-xs flex items-center justify-between text-body-sm border-t border-outline-variant/20">
              <span className="inline-flex items-center gap-1 text-on-surface-variant font-mono-data">
                <span className="inline-block h-1.5 w-1.5 bg-rose-600"></span> 4 urgent audits
              </span>
              <button
                onClick={() => triggerToast("Loading 42 pending approvals queue...")}
                className="text-secondary font-label-sm text-label-sm uppercase font-semibold hover:underline"
              >
                Review Queue
              </button>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-700"></div>
            <div className="flex items-center justify-between pl-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                Revoked / Disciplinary
              </span>
              <Ban className="w-5 h-5 text-rose-700" />
            </div>
            <div className="pl-space-xs my-space-sm">
              <div className="font-headline-xl text-headline-xl text-rose-700 font-bold tracking-tight">
                04
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Tamper/Disciplinary Invalidation
              </p>
            </div>
            <div className="pl-space-xs pt-space-xs flex items-center justify-between text-body-sm border-t border-outline-variant/20">
              <span className="text-on-surface-variant font-mono-data text-body-sm">
                Immutable Ledger Audit
              </span>
              <span className="font-mono-data text-body-sm text-primary font-semibold">
                100% Retained
              </span>
            </div>
          </div>
        </div>

        {/* Template Filter Bar & Ribbon */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 font-mono-data">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mr-1">
                Filter:
              </span>
              <button
                onClick={() => setFilterType("all")}
                className={`px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider whitespace-nowrap shadow-sm transition-colors ${
                  filterType === "all"
                    ? "bg-primary text-on-primary font-bold"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                All Templates (1,428)
              </button>
              <button
                onClick={() => setFilterType("completion")}
                className={`px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                  filterType === "completion"
                    ? "bg-primary text-on-primary font-bold"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                Course Completion (842)
              </button>
              <button
                onClick={() => setFilterType("bonafide")}
                className={`px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                  filterType === "bonafide"
                    ? "bg-primary text-on-primary font-bold"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                Bonafide Certificate (310)
              </button>
              <button
                onClick={() => setFilterType("merit")}
                className={`px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                  filterType === "merit"
                    ? "bg-primary text-on-primary font-bold"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                Merit &amp; Honor (33)
              </button>
              <button
                onClick={() => setFilterType("transfer")}
                className={`px-space-sm py-1 font-label-sm text-label-sm uppercase tracking-wider whitespace-nowrap transition-colors ${
                  filterType === "transfer"
                    ? "bg-primary text-on-primary font-bold"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                Transfer &amp; Migration (98)
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative min-w-[280px] lg:w-96">
              <Search className="w-4 h-4 text-on-surface-variant absolute left-space-sm top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Serial (APX-CC-...), Name, or Roll ID..."
                className="w-full bg-surface-container-low pl-9 pr-space-sm py-1.5 font-mono-data text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest shadow-sm placeholder:text-on-surface-variant/60 border border-outline-variant/40"
              />
            </div>
          </div>

          {/* Batch Issuance Selector Ribbon */}
          <div className="pt-space-sm bg-surface p-space-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm text-body-sm border border-outline-variant/20 font-mono-data">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-sm flex-1">
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-0.5">
                  Target Batch Cohort
                </label>
                <select className="bg-surface-container-lowest px-2 py-1.5 font-body-sm text-on-surface focus:outline-none shadow-sm border border-outline-variant/40">
                  <option>B.Tech CS 2020-2024 (Final Year)</option>
                  <option>MBA Exec 2022-2024</option>
                  <option>M.Tech AI &amp; Robotics 2022-2024</option>
                  <option>BBA FinTech 2021-2024</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-0.5">
                  Credential Format
                </label>
                <select className="bg-surface-container-lowest px-2 py-1.5 font-body-sm text-on-surface focus:outline-none shadow-sm border border-outline-variant/40">
                  <option>Course Completion &amp; Degree Grant</option>
                  <option>Institutional Bonafide</option>
                  <option>Academic Merit Citation</option>
                  <option>Transfer &amp; Clearance Certificate</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-0.5">
                  Seal &amp; Issue Date
                </label>
                <input
                  type="date"
                  defaultValue="2024-06-18"
                  className="bg-surface-container-lowest px-2 py-1.5 font-mono-data text-body-sm text-on-surface focus:outline-none shadow-sm border border-outline-variant/40"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-0.5">
                  Authorized Signatory
                </label>
                <select className="bg-surface-container-lowest px-2 py-1.5 font-body-sm text-on-surface focus:outline-none shadow-sm border border-outline-variant/40">
                  <option>Dean Dr. Margaret Vance &amp; Registrar</option>
                  <option>Registrar Kenneth Thorne</option>
                  <option>Controller of Exams Dr. S. Nair</option>
                </select>
              </div>
            </div>
            <div className="shrink-0 flex items-end">
              <button
                onClick={() => triggerToast("Batch Dispatch queued for 128 graduating students.")}
                className="w-full md:w-auto px-space-md py-2 bg-secondary text-on-secondary hover:bg-secondary/90 font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-1.5 font-bold"
              >
                <Zap className="w-4 h-4" />
                <span>Batch Dispatch (128)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Split Two-Column Production Layout (60% / 40%) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter-desktop items-start">
          {/* Left Column: Issued Certificate Audit Register Table (7 cols) */}
          <div className="xl:col-span-7 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest shadow-sm flex flex-col border border-outline-variant/30">
              {/* Table Controls Header */}
              <div className="p-space-md flex items-center justify-between bg-surface-container-lowest border-b border-outline-variant/30">
                <div className="flex items-center gap-space-sm">
                  <FileCheck className="w-5 h-5 text-primary" />
                  <span className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
                    Cryptographic Audit Register
                  </span>
                  <span className="px-space-xs py-0.5 bg-surface-container font-mono-data text-body-sm text-secondary font-bold">
                    1,428 RECORDS
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <button
                    onClick={() => triggerToast("Exporting cryptographic registry as CSV...")}
                    className="p-1.5 hover:bg-surface text-on-surface-variant hover:text-on-surface"
                    title="Export CSV"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => triggerToast("Audit ledger refreshed with latest blocks.")}
                    className="p-1.5 hover:bg-surface text-on-surface-variant hover:text-on-surface"
                    title="Refresh Register"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => triggerToast("View settings opened.")}
                    className="p-1.5 hover:bg-surface text-on-surface-variant hover:text-on-surface"
                    title="Table View Settings"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table Wrapper */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse font-mono-data text-[0.75rem]">
                  <thead>
                    <tr className="bg-surface font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant select-none border-b border-outline-variant/30">
                      <th className="py-2.5 px-space-md font-semibold">Certificate ID</th>
                      <th className="py-2.5 px-space-md font-semibold">Recipient Student</th>
                      <th className="py-2.5 px-space-md font-semibold">Type</th>
                      <th className="py-2.5 px-space-md font-semibold">Issued &amp; Session</th>
                      <th className="py-2.5 px-space-md font-semibold">Verification &amp; Status</th>
                      <th className="py-2.5 px-space-md font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {filteredCertificates.map((cert) => {
                      const isSelected = cert.serial === selectedCertId;
                      const isRevoked = cert.status === "Revoked";

                      return (
                        <tr
                          key={cert.id}
                          onClick={() => setSelectedCertId(cert.serial)}
                          className={`transition-colors cursor-pointer group ${
                            isSelected
                              ? "bg-primary/10 border-l-2 border-l-primary"
                              : "hover:bg-surface-container-low"
                          }`}
                        >
                          <td className="py-3 px-space-md">
                            <div className="flex items-center gap-1 font-semibold">
                              <span
                                className={
                                  isRevoked
                                    ? "text-rose-700 line-through"
                                    : "text-primary"
                                }
                              >
                                {cert.serial}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (typeof navigator !== "undefined") {
                                    navigator.clipboard.writeText(cert.serial);
                                  }
                                  triggerToast(`Copied ${cert.serial}`);
                                }}
                                className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-primary transition-opacity"
                                title="Copy ID"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                            <span
                              className={`font-label-sm text-[0.625rem] uppercase block ${
                                isRevoked ? "text-rose-700 font-bold" : "text-on-surface-variant"
                              }`}
                            >
                              SHA256: {cert.sha256.slice(0, 8)}...
                            </span>
                          </td>
                          <td className="py-3 px-space-md">
                            <div className="flex items-center gap-space-sm">
                              <img
                                src={cert.avatar}
                                alt={cert.studentName}
                                className="w-8 h-8 rounded-full object-cover shrink-0 border border-outline-variant/40"
                              />
                              <div className="flex flex-col min-w-0">
                                <span
                                  className={`font-semibold truncate ${
                                    isRevoked
                                      ? "text-rose-700 line-through"
                                      : "text-primary"
                                  }`}
                                >
                                  {cert.studentName}
                                </span>
                                <span className="text-on-surface-variant text-[0.6875rem]">
                                  {cert.rollId}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-space-md">
                            <span
                              className={`px-2 py-0.5 font-label-sm text-[0.625rem] uppercase tracking-wider whitespace-nowrap ${cert.typeBadgeClass}`}
                            >
                              {cert.type}
                            </span>
                          </td>
                          <td className="py-3 px-space-md">
                            <div className="flex flex-col">
                              <span className="font-semibold text-primary">{cert.issuedDate}</span>
                              <span className="text-on-surface-variant text-[0.6875rem]">
                                {cert.session}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-space-md">
                            <div className="flex items-center gap-2">
                              {isRevoked ? (
                                <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                              )}
                              <div className="flex flex-col">
                                <span
                                  className={`font-bold uppercase tracking-wider text-[0.6875rem] ${
                                    isRevoked ? "text-rose-700" : "text-secondary"
                                  }`}
                                >
                                  {cert.status}
                                </span>
                                <span className="text-on-surface-variant text-[0.6875rem]">
                                  Ledger {cert.ledgerBlock}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-space-md text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => setSelectedCertId(cert.serial)}
                                className="p-1 hover:bg-surface-container text-primary font-semibold"
                                title="A4 Live Studio Preview"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => triggerToast(`Downloading High-Res PDF for ${cert.serial}...`)}
                                className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-primary"
                                title="Download High-Res PDF"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              {!isRevoked ? (
                                <button
                                  onClick={() => {
                                    setCertToRevoke(cert.serial);
                                    setIsRevokeModalOpen(true);
                                  }}
                                  className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-rose-700"
                                  title="Revoke Credential"
                                >
                                  <Ban className="w-4 h-4" />
                                </button>
                              ) : (
                                <span className="p-1 text-on-surface-variant/40" title="Locked">
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

              {/* Pagination Bar */}
              <div className="p-space-sm bg-surface flex flex-col sm:flex-row items-center justify-between gap-space-sm font-mono-data text-body-sm border-t border-outline-variant/20">
                <span className="text-on-surface-variant text-[0.75rem]">
                  Showing record <span className="font-semibold text-primary">1 to 5</span> of 1,428
                </span>
                <div className="flex items-center gap-1 text-[0.75rem]">
                  <button className="px-2 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container disabled:opacity-40" disabled>
                    Previous
                  </button>
                  <button className="px-2 py-1 bg-primary text-on-primary font-bold">1</button>
                  <button className="px-2 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container">2</button>
                  <button className="px-2 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container">3</button>
                  <span className="px-1 text-on-surface-variant">...</span>
                  <button className="px-2 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container">286</button>
                  <button className="px-2 py-1 bg-surface-container-lowest text-on-surface hover:bg-surface-container">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Security & Ledger Verification Subpanel */}
            <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  <span>Decentralized Credential Ledger &amp; Key Infrastructure</span>
                </div>
                <span className="px-space-xs py-0.5 bg-surface-container text-secondary font-mono-data text-body-sm font-semibold">
                  SYNCHRONIZED (BLOCK #981,042)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs text-body-sm">
                <div className="p-space-sm bg-surface border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    KMS HSM Key Vault
                  </span>
                  <p className="font-mono-data text-primary font-semibold mt-1">
                    APX-ED-RSA-4096-LIVE
                  </p>
                  <span className="text-secondary font-label-sm text-label-sm uppercase font-semibold">
                    Active &amp; HSM Backed
                  </span>
                </div>
                <div className="p-space-sm bg-surface border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    W3C DID Issuer DID
                  </span>
                  <p className="font-mono-data text-primary font-semibold mt-1 truncate">
                    did:apex:inst:reg-v1
                  </p>
                  <span className="text-on-surface-variant font-label-sm text-label-sm uppercase">
                    Anchor: Polygon POS
                  </span>
                </div>
                <div className="p-space-sm bg-surface border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Public Verification Gateway
                  </span>
                  <p className="font-mono-data text-primary font-semibold mt-1 truncate">
                    verify.apexinstitute.edu
                  </p>
                  <span className="text-secondary font-label-sm text-label-sm uppercase font-semibold">
                    99.99% TLS 1.3 Uptime
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: A4 Printable Certificate Studio & Live Preview (5 cols) */}
          <div className="xl:col-span-5 flex flex-col gap-space-md sticky top-20">
            <div className="bg-surface-container-lowest shadow-sm flex flex-col overflow-hidden border border-outline-variant/30">
              {/* Studio Header Bar */}
              <div className="p-space-md bg-primary-container text-on-primary flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <Eye className="w-4 h-4 text-secondary-fixed-dim" />
                  <span className="font-headline-sm text-headline-sm uppercase tracking-wide font-bold">
                    Live A4 Studio Canvas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-data text-body-sm bg-primary px-2 py-0.5 text-primary-fixed">
                    SCALE: 75% (A4 300DPI)
                  </span>
                </div>
              </div>

              {/* Certificate Viewport Background Canvas */}
              <div className="p-space-lg bg-surface flex items-center justify-center overflow-auto max-h-[720px]">
                {/* High-Fidelity A4 Certificate Paper Sheet */}
                <div
                  className={`w-full max-w-[540px] aspect-[1/1.414] bg-surface-container-lowest shadow-xl p-6 relative flex flex-col justify-between text-on-surface select-none border border-slate-300 ${
                    activeCert.status === "Revoked" ? "opacity-75 grayscale" : ""
                  }`}
                >
                  {/* Geometric Institutional Borders */}
                  <div className="absolute inset-2 pointer-events-none bg-transparent shadow-[inset_0_0_0_2px_#0d2545]"></div>
                  <div className="absolute inset-3 pointer-events-none bg-transparent shadow-[inset_0_0_0_1px_#c4c6cf]"></div>
                  <div className="absolute inset-5 pointer-events-none bg-transparent shadow-[inset_0_0_0_1px_#0d2545]"></div>

                  {/* Revoked Watermark Stamp if Revoked */}
                  {activeCert.status === "Revoked" && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                      <span className="text-red-600/40 font-black text-6xl tracking-widest rotate-[-30deg] border-4 border-red-600/40 p-4 uppercase">
                        REVOKED &amp; VOID
                      </span>
                    </div>
                  )}

                  {/* Top Security Barcode & Tracking Identifier */}
                  <div className="relative z-10 flex items-center justify-between text-[0.625rem] font-mono-data tracking-widest text-on-surface-variant uppercase">
                    <span>SEC-HASH: SHA256//{activeCert.sha256.slice(0, 6).toUpperCase()}</span>
                    <span className="font-bold text-primary">CREDENTIAL SERIAL: {activeCert.serial}</span>
                    <span>AUTHENTIC RECORD</span>
                  </div>

                  {/* Institutional Header & Crest */}
                  <div className="relative z-10 flex flex-col items-center text-center mt-2">
                    <div className="w-14 h-14 bg-primary-container text-surface flex items-center justify-center relative mb-2 shadow-sm">
                      <span className="font-serif font-black text-2xl text-cyan-200">A</span>
                      <div className="absolute -bottom-1 w-4 h-4 bg-secondary rotate-45 flex items-center justify-center">
                        <Sparkles className="w-2.5 h-2.5 text-on-secondary -rotate-45" />
                      </div>
                    </div>
                    <h2 className="font-headline-sm text-headline-sm uppercase tracking-widest text-primary font-bold">
                      Apex Institute of Technology &amp; Management
                    </h2>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-medium mt-0.5">
                      Autonomous Institution · Statutory University Directorate
                    </span>
                    <div className="w-32 h-0.5 bg-primary-container my-3 mx-auto"></div>
                    <span className="font-label-md text-label-md uppercase tracking-[0.25em] text-secondary font-bold">
                      {activeCert.type.toUpperCase()} &amp; DEGREE COMPLETION
                    </span>
                  </div>

                  {/* Verbatim Academic Certificate Copy */}
                  <div className="relative z-10 text-center px-4 my-2 flex flex-col items-center">
                    <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                      This is to solemnly certify that
                    </p>
                    <div className="my-2 border-b-2 border-primary-container pb-0.5 px-4 inline-block">
                      <span className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                        {activeCert.studentName}
                      </span>
                    </div>
                    <p className="font-mono-data text-body-sm font-semibold text-primary">
                      Roll Registration ID: {activeCert.rollId}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface leading-relaxed max-w-sm mt-3">
                      having fulfilled all prescribed curriculum requisites, academic examinations,
                      and thesis regulations with distinction, is awarded this Certificate in
                    </p>
                    <div className="mt-2 bg-surface-container-low px-4 py-1.5 shadow-sm border border-outline-variant/30">
                      <span className="font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-tight">
                        {activeCert.dept}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold mt-2">
                      Awarded with {activeCert.grade} (CGPA: {activeCert.cgpa})
                    </span>
                  </div>

                  {/* Authentication Footer & Signatories */}
                  <div className="relative z-10 mt-auto pt-4 flex flex-col gap-3">
                    {/* Security Elements Row */}
                    <div className="flex items-center justify-between px-3">
                      {/* QR Cryptographic Node */}
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-14 bg-surface p-1 shadow-sm flex items-center justify-center border border-slate-300">
                          <svg className="w-full h-full text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h4v4h-4v-4zm-4 2h2v2h-2v-2zm4-12h2v2h-2V6zm-8 4h2v2H10v-2zm-4 4h2v2H6v-2zm8 0h2v2h-2v-2z"></path>
                          </svg>
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-label-sm text-[0.625rem] uppercase font-bold text-primary">
                            Scan To Verify
                          </span>
                          <span className="font-mono-data text-[0.5625rem] text-on-surface-variant">
                            verify.apexinstitute.edu
                          </span>
                          <span className="font-mono-data text-[0.5625rem] text-secondary">
                            ID: {activeCert.serial.slice(-4)}-POLYPOS
                          </span>
                        </div>
                      </div>

                      {/* Hologram Seal Badge */}
                      <div className="relative w-14 h-14 bg-gradient-to-br from-secondary-fixed-dim via-primary-container to-secondary flex items-center justify-center shadow-md">
                        <div className="w-11 h-11 bg-surface-container-lowest/90 flex flex-col items-center justify-center p-0.5 text-center">
                          <ShieldCheck className="w-4 h-4 text-primary" />
                          <span className="font-label-sm text-[0.5rem] uppercase tracking-tighter text-primary font-bold leading-none mt-0.5">
                            OFFICIAL SEAL
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dual Signatory Sign-off with Vector Signatures */}
                    <div className="grid grid-cols-2 gap-4 pt-2 px-2">
                      <div className="flex flex-col items-center text-center">
                        <div className="h-8 flex items-end justify-center w-full">
                          <svg className="h-6 text-primary w-24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 120 30">
                            <path d="M5,22 Q25,5 45,20 T80,10 T115,22 M30,12 L32,28 M70,5 L72,25"></path>
                          </svg>
                        </div>
                        <div className="w-32 h-px bg-on-surface-variant/40 my-1"></div>
                        <span className="font-label-sm text-label-sm uppercase font-bold text-primary">
                          Dr. S. Nair
                        </span>
                        <span className="font-label-sm text-[0.625rem] text-on-surface-variant uppercase">
                          Controller of Examinations
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="h-8 flex items-end justify-center w-full">
                          <svg className="h-6 text-primary w-24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 120 30">
                            <path d="M10,25 Q35,2 60,18 Q85,28 105,12 M40,8 L40,24 M85,15 L95,28"></path>
                          </svg>
                        </div>
                        <div className="w-32 h-px bg-on-surface-variant/40 my-1"></div>
                        <span className="font-label-sm text-label-sm uppercase font-bold text-primary">
                          Dr. Margaret Vance
                        </span>
                        <span className="font-label-sm text-[0.625rem] text-on-surface-variant uppercase">
                          Dean of Academic Affairs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Command Bar Below Preview */}
              <div className="p-space-md bg-surface-container-lowest flex flex-col gap-space-sm border-t border-outline-variant/30 font-mono-data">
                <div className="grid grid-cols-2 gap-space-sm">
                  <button
                    onClick={() => {
                      triggerToast("Spooling A4 full bleed output to institutional certificate printer...");
                      if (typeof window !== "undefined") window.print();
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-space-md py-2 bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm font-bold"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print A4 (Full Bleed)</span>
                  </button>
                  <button
                    onClick={() => triggerToast(`Exporting High-Res PDF for ${activeCert.serial}...`)}
                    className="inline-flex items-center justify-center gap-1.5 px-space-md py-2 bg-secondary text-on-secondary hover:bg-secondary/90 font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm font-bold"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export High-Res PDF</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-space-sm">
                  <button
                    onClick={() => triggerToast(`Dispatched credential copy to ${activeCert.studentName}'s portal.`)}
                    className="inline-flex items-center justify-center gap-1.5 px-space-sm py-1.5 bg-surface text-primary hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider transition-colors shadow-sm border border-outline-variant/40"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Portal</span>
                  </button>
                  <button
                    onClick={() => triggerToast("Re-generated cryptographic ED25519 signature keys.")}
                    className="inline-flex items-center justify-center gap-1.5 px-space-sm py-1.5 bg-surface text-primary hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider transition-colors shadow-sm border border-outline-variant/40"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Regenerate Keys &amp; QR</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Fast Verification Simulator */}
            <div className="bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-xs border border-outline-variant/30 font-mono-data">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                  Public Verification Link Test
                </span>
                <span className="inline-flex items-center gap-1 text-secondary font-mono-data text-body-sm font-semibold">
                  <span className="h-1.5 w-1.5 bg-secondary rounded-full"></span> 200 OK
                </span>
              </div>
              <div className="bg-surface p-space-xs flex items-center justify-between gap-space-sm border border-outline-variant/30">
                <code className="font-mono-data text-[0.75rem] text-primary truncate select-all">
                  https://verify.apexinstitute.edu/cert/{activeCert.serial}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="px-2 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider shrink-0 font-bold"
                >
                  COPY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Issue New Certificate */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant/40 font-mono-data">
            {/* Header */}
            <div className="p-space-md bg-primary-container text-on-primary flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <Award className="w-5 h-5 text-secondary-container" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-wide font-bold">
                  Generate New Academic Credential
                </h3>
              </div>
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="text-on-primary hover:opacity-80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-space-lg flex flex-col gap-space-md max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                    Student Roll Number *
                  </label>
                  <input
                    type="text"
                    defaultValue="APX-CS-2020-002"
                    className="bg-surface px-space-sm py-2 font-mono-data text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-low shadow-sm border border-outline-variant/40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                    Certificate Type *
                  </label>
                  <select className="bg-surface px-space-sm py-2 font-body-sm text-on-surface focus:outline-none shadow-sm border border-outline-variant/40">
                    <option>Course Completion &amp; Degree Grant</option>
                    <option>Bonafide Certificate</option>
                    <option>Character &amp; Conduct</option>
                    <option>Transfer Certificate (TC)</option>
                    <option>Academic Merit &amp; Gold Medal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="flex flex-col">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                    Academic Session / Cohort
                  </label>
                  <input
                    type="text"
                    defaultValue="AY 2020-2024 (Class of 2024)"
                    className="bg-surface px-space-sm py-2 font-body-sm text-on-surface focus:outline-none shadow-sm border border-outline-variant/40"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                    Division / Award Grade
                  </label>
                  <input
                    type="text"
                    defaultValue="First Class with Distinction (9.64 CGPA)"
                    className="bg-surface px-space-sm py-2 font-body-sm text-on-surface focus:outline-none shadow-sm border border-outline-variant/40"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                  Custom Endorsement Statement (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Having satisfied all prerequisites, laboratory vivas, and departmental clearances..."
                  className="bg-surface p-space-sm font-body-sm text-on-surface focus:outline-none shadow-sm placeholder:text-on-surface-variant/60 border border-outline-variant/40"
                ></textarea>
              </div>

              <div className="p-space-sm bg-surface-container-low flex items-center justify-between border border-outline-variant/30">
                <div className="flex items-center gap-space-sm">
                  <input
                    type="checkbox"
                    id="signBlockchain"
                    defaultChecked
                    className="w-4 h-4 text-primary rounded-none accent-primary"
                  />
                  <label
                    htmlFor="signBlockchain"
                    className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold cursor-pointer"
                  >
                    Anchor to Blockchain Ledger &amp; Generate Cryptographic DID
                  </label>
                </div>
                <span className="font-mono-data text-body-sm text-secondary font-semibold">
                  ED25519-SIG
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-space-md bg-surface flex items-center justify-end gap-space-sm border-t border-outline-variant/30">
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="px-space-md py-2 bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsIssueModalOpen(false);
                  triggerToast("New Academic Credential minted and cryptographically signed.");
                }}
                className="px-space-md py-2 bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 font-bold"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign &amp; Issue Credential</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Revocation Confirmation */}
      {isRevokeModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg shadow-2xl flex flex-col overflow-hidden border border-rose-300 font-mono-data">
            <div className="p-space-md bg-rose-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-headline-sm text-headline-sm uppercase tracking-wide font-bold">
                  Revoke Credential &amp; Nullify Key
                </span>
              </div>
              <button
                onClick={() => setIsRevokeModalOpen(false)}
                className="text-white hover:opacity-80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-space-lg flex flex-col gap-space-sm text-body-sm text-on-surface">
              <p className="font-bold text-primary">
                Are you sure you want to invalidate credential{" "}
                <span className="font-mono-data text-rose-700">{certToRevoke}</span>?
              </p>
              <p className="text-on-surface-variant leading-relaxed text-[0.8125rem]">
                This operation records an immutable Revocation Entry on the distributed ledger. The
                public verification URL and QR code will permanently return{" "}
                <strong className="text-rose-700">REVOKED &amp; INVALID</strong>.
              </p>
              <div className="flex flex-col mt-2">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                  Reason for Invalidation *
                </label>
                <select className="bg-surface px-space-sm py-2 font-body-sm text-on-surface focus:outline-none shadow-sm border border-outline-variant/40">
                  <option>Academic Misconduct / Plagiarism Finding</option>
                  <option>Administrative Clerical Data Correction</option>
                  <option>Court Order or Disciplinary Committee Directive</option>
                  <option>Duplicate Issuance Superseded</option>
                </select>
              </div>
            </div>

            <div className="p-space-md bg-surface flex items-center justify-end gap-space-sm border-t border-outline-variant/20">
              <button
                onClick={() => setIsRevokeModalOpen(false)}
                className="px-space-md py-2 bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handleRevokeConfirm}
                className="px-space-md py-2 bg-rose-700 text-white hover:bg-rose-800 font-label-md text-label-md uppercase tracking-wider shadow-sm font-bold"
              >
                Confirm Invalidation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-md py-space-sm shadow-xl flex items-center gap-space-sm border border-outline-variant/40">
          <CheckCircle2 className="w-5 h-5 text-secondary-container" />
          <span className="font-mono-data text-body-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

