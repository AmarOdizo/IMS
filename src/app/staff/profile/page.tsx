"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Users,
  ShieldCheck,
  CheckCircle2,
  Award,
  GraduationCap,
  BookOpen,
  Mail,
  Phone,
  Building,
  Calendar,
  Download,
  Printer,
  Edit3,
  X,
  Send,
  Sparkles,
  ExternalLink,
  Layers,
  QrCode,
  FileText,
  BadgeCheck,
  Clock,
  Briefcase,
  BookMarked,
  Check,
  Copy,
  ChevronRight,
  MapPin,
  Lock,
} from "lucide-react";

export default function StaffProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "teaching" | "research" | "roles" | "idcard"
  >("overview");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateCategory, setUpdateCategory] = useState("Contact Information");
  const [updateDetails, setUpdateDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsUpdateModalOpen(false);
      setUpdateDetails("");
      showToast("Profile update request submitted to Registrar & Academic HR!");
    }, 900);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/70 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-75 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Top Banner & Quick Actions */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-slate-900 text-white font-mono text-xs px-2.5 py-1 uppercase font-bold rounded-md">
              EMP-CS-2018-842
            </span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Active Tenured Faculty
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sunrise Institute of Technology &bull; Dept. of CSE
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 text-xs font-semibold transition-colors border border-slate-200 rounded-lg shadow-2xs"
            >
              <Edit3 className="h-3.5 w-3.5 text-slate-600" />
              <span>Request Info Update</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 text-xs font-semibold transition-colors rounded-lg shadow-sm"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Export Dossier (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col gap-6 w-full">
        {/* Faculty Hero Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Faculty Portrait / Avatar Column */}
            <div className="lg:col-span-3 bg-gradient-to-b from-slate-50 to-slate-100/80 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="relative w-36 h-36 rounded-2xl bg-white border-2 border-indigo-200 p-1.5 shadow-md flex items-center justify-center">
                {/* Professor Profile Avatar */}
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 flex flex-col items-center justify-center text-white select-none relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"></div>
                  <User className="w-16 h-16 text-indigo-200/90 mb-1" />
                  <span className="text-[10px] font-mono tracking-widest text-indigo-200 uppercase font-semibold">
                    PROFESSOR
                  </span>
                </div>
                <span className="absolute -bottom-2.5 bg-emerald-600 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs border border-white">
                  VERIFIED
                </span>
              </div>

              <div className="mt-5 text-center flex flex-col items-center">
                <span className="font-mono text-xs text-slate-800 font-bold">
                  SIT-FAC-2018-042
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Academic RFID Active
                </span>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                  <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Bio-Campus Pass Ok</span>
                </div>
              </div>
            </div>

            {/* Faculty Details & Bio */}
            <div className="lg:col-span-9 p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Badges strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Senior Professor
                    </span>
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Ph.D., IIT Delhi
                    </span>
                    <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      M.Tech Gold Medalist
                    </span>
                    <span className="bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      NAAC Criterion 2 Co-Lead
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-medium">
                    Tenure: 6 Yrs 10 Mos at SIT
                  </span>
                </div>

                {/* Name & Academic Rank */}
                <div className="mt-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Prof. Rajesh Sharma
                    </h1>
                    <span className="text-sm font-mono text-slate-500 font-medium">
                      Ph.D. (Distributed Computing), M.Tech (CSE)
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1 font-medium">
                    Senior Professor &bull; Head of Distributed Computing Research Lab &bull; Dept. of Computer Science &amp; Engineering
                  </p>
                </div>

                {/* Contact & Cabin Info Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                  <div className="bg-slate-50/90 hover:bg-slate-100/80 transition-colors p-3.5 rounded-xl border border-slate-200 flex items-start justify-between group">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Mail className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Institutional Email
                        </span>
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          rajesh.sharma@sunrise.edu.in
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard("rajesh.sharma@sunrise.edu.in", "Email")
                      }
                      title="Copy Email"
                      className="text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      {copiedField === "Email" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-50/90 hover:bg-slate-100/80 transition-colors p-3.5 rounded-xl border border-slate-200 flex items-start justify-between group">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Phone className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Contact Handset
                        </span>
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          +91 98765 43210
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard("+91 98765 43210", "Phone")
                      }
                      title="Copy Phone"
                      className="text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    >
                      {copiedField === "Phone" ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-50/90 hover:bg-slate-100/80 transition-colors p-3.5 rounded-xl border border-slate-200 flex items-start justify-between">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Building className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          Faculty Cabin
                        </span>
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          Cabin B-204, Ramanujan Block
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold">
                      2nd Floor
                    </span>
                  </div>
                </div>
              </div>

              {/* Service & Payroll Footer Bar */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span>
                    Date of Joining:{" "}
                    <strong className="text-slate-800 font-semibold">
                      16 July 2018
                    </strong>
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span>
                    Cadre:{" "}
                    <strong className="text-slate-800 font-semibold">
                      Regular Full-Time (Tenured)
                    </strong>
                  </span>
                  <span className="text-slate-300">&bull;</span>
                  <span>
                    Academic Pay Level:{" "}
                    <strong className="text-slate-800 font-semibold">
                      Level 12 (7th CPC)
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-600 font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Registrar Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Compact Academic KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <span>Weekly Teaching Load</span>
              <Clock className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-slate-800 font-mono">
                18 <span className="text-xs font-normal text-slate-400">Hrs/Wk</span>
              </span>
              <span className="bg-emerald-50 text-emerald-700 font-mono text-[11px] px-2 py-0.5 rounded-full font-bold">
                100% Allocated
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              15 Classroom &amp; Labs + 3 Mentorship
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <span>Assigned Cohorts</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-slate-800 font-mono">
                04 <span className="text-xs font-normal text-slate-400">Batches</span>
              </span>
              <span className="bg-blue-50 text-blue-700 font-mono text-[11px] px-2 py-0.5 rounded-full font-bold">
                184 Students
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              B.Tech CS (2) &bull; M.Tech (1) &bull; BCA (1)
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <span>Scholarly Publications</span>
              <BookOpen className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-slate-800 font-mono">
                14 <span className="text-xs font-normal text-slate-400">Papers</span>
              </span>
              <span className="bg-purple-50 text-purple-700 font-mono text-[11px] px-2 py-0.5 rounded-full font-bold">
                h-index: 8
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              10 IEEE/ACM &bull; 4 Scopus Q1 Journals
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <span>Student Feedback Rating</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black text-emerald-600 font-mono">
                4.86 <span className="text-xs font-normal text-slate-400">/ 5.0</span>
              </span>
              <span className="bg-amber-50 text-amber-700 font-mono text-[11px] px-2 py-0.5 rounded-full font-bold">
                Top 5% Faculty
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Based on 168 Mid-Term Submissions
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-0.5">
          {[
            { id: "overview", label: "Credentials & Education", icon: GraduationCap },
            { id: "teaching", label: "Teaching Workload & Batches", icon: Layers },
            { id: "research", label: "Research, Papers & Grants", icon: BookMarked },
            { id: "roles", label: "Institutional Committees", icon: ShieldCheck },
            { id: "idcard", label: "Digital Faculty Card", icon: QrCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? "border-indigo-600 text-indigo-600 bg-white shadow-2xs"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview & Qualifications */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Degrees & Specializations */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-slate-800">
                      Academic Degrees &amp; Qualifications
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">UGC Verified</span>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Ph.D. */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-slate-900">
                            Doctor of Philosophy (Ph.D. in Computer Science &amp; Engg)
                          </h3>
                          <span className="bg-emerald-50 text-emerald-700 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold border border-emerald-200">
                            Conferred 2021
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          Indian Institute of Technology (IIT) Delhi &bull; Department of CSE
                        </p>
                        <p className="text-xs text-slate-500 mt-1.5 italic bg-white p-2.5 rounded-md border border-slate-200/70">
                          Thesis: &ldquo;High-Throughput Consensus Protocols for Globally Partitioned Distributed Cloud Datastores&rdquo;
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-500 shrink-0">2016 – 2021</span>
                  </div>

                  {/* M.Tech */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-slate-900">
                            Master of Technology (M.Tech in Distributed Systems)
                          </h3>
                          <span className="bg-amber-50 text-amber-700 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold border border-amber-200">
                            Gold Medalist &bull; 9.84 CGPA
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          Indian Institute of Technology (IIT) Delhi
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Specialization: Distributed Database Engines &amp; Fault-Tolerant Architectures
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-500 shrink-0">2014 – 2016</span>
                  </div>

                  {/* B.Tech */}
                  <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-slate-900">
                            Bachelor of Technology (B.Tech in Computer Science)
                          </h3>
                          <span className="bg-slate-100 text-slate-700 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold border border-slate-200">
                            First Class with Distinction
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          Pune University &bull; Conferred 2014
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-slate-500 shrink-0">2010 – 2014</span>
                  </div>
                </div>

                {/* Primary Specializations & Domain Tag Cloud */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3">
                    Core Technical &amp; Research Domains
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Distributed Database Engines",
                      "Distributed Cloud Systems",
                      "Raft & Paxos Consensus",
                      "ACID Transaction Protocols",
                      "NoSQL & SQL Query Optimizers",
                      "Data Structures & Algorithms",
                      "Cloud Microservices Architecture",
                    ].map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-50/60 text-indigo-700 text-xs px-3 py-1 border border-indigo-100 rounded-lg font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Certifications & Contact Details */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Professional Certifications */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                  <Award className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                    Professional Certifications
                  </h2>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      name: "AWS Certified Solutions Architect",
                      level: "Professional",
                      valid: "Valid till 2026",
                    },
                    {
                      name: "Oracle Certified Professional (OCP)",
                      level: "Database Administrator 19c",
                      valid: "Lifetime Credential",
                    },
                    {
                      name: "IEEE Senior Member (SMIEEE)",
                      level: "Global Computer Society",
                      valid: "Member ID: 9482012",
                    },
                    {
                      name: "ACM Senior Professional Member",
                      level: "SIGMOD / SIGOPS Chapter",
                      valid: "Member ID: 7728491",
                    },
                  ].map((cert, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col"
                    >
                      <span className="text-xs font-bold text-slate-800">
                        {cert.name}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {cert.level}
                      </span>
                      <span className="text-[10px] font-mono text-indigo-600 font-semibold mt-1">
                        {cert.valid}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation / Office Hours */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
                  <Clock className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                    Office Hours &amp; Consultation
                  </h2>
                </div>
                <div className="flex flex-col gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block">
                      Student Doubt Clearing Clinic
                    </span>
                    <span className="text-slate-600 mt-0.5 block">
                      Mon &amp; Thu &bull; 03:30 PM – 05:00 PM
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Venue: Cabin B-204, Ramanujan Block
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block">
                      PG &amp; Research Dissertation Review
                    </span>
                    <span className="text-slate-600 mt-0.5 block">
                      Wednesday &bull; 11:30 AM – 01:00 PM
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Venue: Distributed Computing Lab 3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Teaching Workload & Batches */}
        {activeTab === "teaching" && (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 mb-5 gap-2">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  <div>
                    <h2 className="text-base font-bold text-slate-800">
                      Active Teaching Workload (AY 2024–25 &bull; Even Semester)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Approved by Head of Department, CSE
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 font-bold rounded-lg self-start sm:self-auto">
                  18 Contact Hours / Week
                </span>
              </div>

              {/* Course Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Subject Code</th>
                      <th className="py-3 px-4">Course Name &amp; Cohort</th>
                      <th className="py-3 px-4">Class Format</th>
                      <th className="py-3 px-4 text-center">Credits</th>
                      <th className="py-3 px-4">Lecture Days &amp; Venue</th>
                      <th className="py-3 px-4 text-right">Weekly Load</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                        CS-401
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          Database Management Systems
                        </div>
                        <span className="text-[11px] text-slate-500">
                          B.Tech CSE - 4th Sem (Sec A) &bull; 62 Students
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-slate-100 text-slate-700 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                          Core Theory
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-semibold">
                        4.0
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        Mon, Wed, Fri &bull; Hall 302
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        4 hrs/wk
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                        CS-405L
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          Database Systems Practicum Lab
                        </div>
                        <span className="text-[11px] text-slate-500">
                          B.Tech CSE - 4th Sem (Sec B) &bull; 60 Students
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-blue-50 text-blue-700 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                          Practical Lab
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-semibold">
                        2.0
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        Tue, Thu &bull; Software Lab 3
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        4 hrs/wk
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                        CS-602
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          Advanced Distributed Database Architecture
                        </div>
                        <span className="text-[11px] text-slate-500">
                          M.Tech Data Science - 2nd Sem &bull; 28 Scholars
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-purple-50 text-purple-700 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                          PG Elective
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-semibold">
                        3.0
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        Mon, Thu &bull; Room 204 (PG Block)
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        3 hrs/wk
                      </td>
                    </tr>

                    <tr className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                        CS-202
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          Data Structures &amp; Algorithms
                        </div>
                        <span className="text-[11px] text-slate-500">
                          BCA - 2nd Sem (Sec B) &bull; 34 Students
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="bg-slate-100 text-slate-700 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                          Undergrad Major
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-semibold">
                        4.0
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        Wed, Thu, Fri &bull; Seminar Hall B
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                        4 hrs/wk
                      </td>
                    </tr>

                    <tr className="bg-slate-50/70 font-semibold text-slate-800">
                      <td className="py-3 px-4 text-right font-mono uppercase text-[11px]" colSpan={3}>
                        Remedial Clinics &amp; Mentorship Office Hours:
                      </td>
                      <td className="py-3 px-4 text-center font-mono">&mdash;</td>
                      <td className="py-3 px-4 text-slate-600">Faculty Cabin B-204</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-indigo-600">
                        3 hrs/wk
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* UGC Compliance Banner */}
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white font-mono text-sm font-bold flex items-center justify-center shrink-0">
                    18h
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase">
                      Weekly Workload Allocation
                    </h3>
                    <p className="text-xs text-slate-500">
                      15 Hours Classroom/Lab Teaching + 3 Hours Mentorship
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-xs px-3 py-1 font-bold rounded-lg">
                    UGC Norms: 100% Compliant (18/16 Hr Min)
                  </span>
                </div>
              </div>
            </div>

            {/* Assigned Cohorts 4-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  batch: "BATCH 2023–27",
                  name: "B.Tech CSE - Sem IV (Sec A)",
                  role: "Course In-Charge",
                  students: 62,
                  avgAttendance: "89.4%",
                  syllabus: "68% Completed",
                },
                {
                  batch: "BATCH 2023–27",
                  name: "B.Tech CSE - Sem IV (Sec B)",
                  role: "Practicum In-Charge",
                  students: 60,
                  avgAttendance: "92.1%",
                  syllabus: "72% Completed",
                },
                {
                  batch: "POST-GRADUATE",
                  name: "M.Tech Data Science - Term II",
                  role: "Thesis Advisor",
                  students: 28,
                  avgAttendance: "94.8%",
                  syllabus: "75% Completed",
                },
                {
                  batch: "BATCH 2024–27",
                  name: "BCA - Semester II (Sec B)",
                  role: "Faculty Instructor",
                  students: 34,
                  avgAttendance: "84.6%",
                  syllabus: "58% Completed",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                        {c.batch}
                      </span>
                      <span className="bg-indigo-50 text-indigo-700 font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {c.role}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-2">
                      {c.name}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-600">{c.students} Enrolled</span>
                    <span className="text-emerald-600 font-bold">
                      {c.avgAttendance} Avg Attendance
                    </span>
                    <span className="text-slate-500">{c.syllabus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Research, Papers & Grants */}
        {activeTab === "research" && (
          <div className="flex flex-col gap-6">
            {/* Sponsored Research Projects & Grants */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-base font-bold text-slate-800">
                    Sponsored Research Projects &amp; Grants
                  </h2>
                </div>
                <span className="text-xs font-mono text-emerald-600 font-bold">
                  Total Funding: &8377;36.5 Lakhs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-emerald-200">
                      Ongoing &bull; Principal Investigator
                    </span>
                    <span className="font-mono text-xs text-slate-500">2023 – 2026</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">
                    Autonomous Multi-Master Consensus Protocols for Edge-Cloud Database Shards
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Sponsoring Agency: Department of Science &amp; Technology (DST-SERB), Govt. of India
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-500">Sanction Ref: SERB/CRG/2023/00142</span>
                    <span className="font-bold text-slate-900">&8377;24.50 Lakhs</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-blue-200">
                      Completed &bull; Co-Investigator
                    </span>
                    <span className="font-mono text-xs text-slate-500">2021 – 2023</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">
                    Adaptive Query Optimization in Heterogeneous Cloud Environments
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Sponsoring Agency: AICTE Research Promotion Scheme (RPS)
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-200/70 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-500">Sanction Ref: AICTE/RPS/8-42/2021</span>
                    <span className="font-bold text-slate-900">&8377;12.00 Lakhs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Journal & Conference Publications */}
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-base font-bold text-slate-800">
                    Selected Peer-Reviewed Publications (Indexed)
                  </h2>
                </div>
                <button
                  onClick={() =>
                    showToast("Opening Google Scholar profile...")
                  }
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Google Scholar</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  {
                    title:
                      "Dynamic Raft Partitioning for Low-Latency Cloud Transactions under Heavy Asymmetric Loads",
                    journal:
                      "IEEE Transactions on Parallel and Distributed Systems (TPDS)",
                    year: "2024",
                    type: "Scopus Q1 Journal",
                    doi: "10.1109/TPDS.2024.3389124",
                  },
                  {
                    title:
                      "Adaptive Shard Rebalancing in Globally Distributed Multi-Tenant SQL Datastores",
                    journal:
                      "ACM Transactions on Database Systems (TODS)",
                    year: "2023",
                    type: "Scopus Q1 Journal",
                    doi: "10.1145/3588921",
                  },
                  {
                    title:
                      "Deterministic Transaction Ordering in Geo-Replicated Database Clusters",
                    journal:
                      "IEEE International Conference on Data Engineering (ICDE)",
                    year: "2022",
                    type: "IEEE Conference",
                    doi: "10.1109/ICDE53745.2022.00118",
                  },
                  {
                    title:
                      "Cost-Effective Memory Hierarchy Utilization in Next-Gen In-Memory Databases",
                    journal:
                      "International Conference on Very Large Data Bases (VLDB Workshop)",
                    year: "2021",
                    type: "VLDB / ACM",
                    doi: "10.1145/3468791",
                  },
                ].map((pub, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-indigo-200">
                          {pub.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {pub.year}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">
                        {pub.journal}
                      </p>
                      <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                        DOI: {pub.doi}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(pub.doi, `DOI (${pub.year})`)
                      }
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shrink-0 shadow-2xs"
                    >
                      Copy DOI
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Institutional Committees */}
        {activeTab === "roles" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Academic Integrity & Ethics Board (DAIB)",
                role: "Senior Member",
                body: "Departmental Committee",
                tenure: "2022 – Present",
                desc: "Reviews student thesis dissertations, research authenticity, code plagiarism inquiries, and ensures academic honesty standards.",
              },
              {
                title: "Faculty Advisor, SIT ACM Student Chapter",
                role: "Faculty Sponsor",
                body: "Student Technical Society",
                tenure: "2020 – Present",
                desc: "Oversees institute collegiate programming contests, national hackathons, technical paper presentations, and guest lecture series.",
              },
              {
                title: "Autonomous Examination Moderation Committee",
                role: "Chief Paper Setter",
                body: "Examination Cell",
                tenure: "AY 2024 – 2025",
                desc: "Responsible for moderation, evaluation rubric design, and setting comprehensive end-semester question papers for CSE theory.",
              },
              {
                title: "NBA & NAAC Accreditation Steering Committee",
                role: "Criterion 2 Co-Lead",
                body: "Quality Assurance Cell (IQAC)",
                tenure: "2021 – Present",
                desc: "Leads teaching-learning and evaluation metrics, course outcome (CO-PO) mapping, and faculty curriculum compliance portfolios.",
              },
            ].map((role, rIdx) => (
              <div
                key={rIdx}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-indigo-50 text-indigo-700 font-mono text-[10px] px-2 py-0.5 rounded-md font-bold border border-indigo-200">
                      {role.role}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {role.tenure}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2.5">
                    {role.title}
                  </h3>
                  <span className="text-xs text-indigo-600 font-semibold block mt-0.5">
                    {role.body}
                  </span>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {role.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Official Dean Appointment</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Digital Faculty Card */}
        {activeTab === "idcard" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8 flex flex-col items-center">
            <div className="text-center max-w-md mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Official Digital Faculty Identity Card
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Sunrise Institute of Technology &bull; Authorized by Registrar Office
              </p>
            </div>

            {/* Smart ID Card Replica */}
            <div className="w-full max-w-sm rounded-2xl bg-[#19335A] text-white p-6 shadow-xl relative overflow-hidden border border-[#2b4c80]">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/20 pb-4">
                <div className="w-10 h-10 rounded-full bg-white text-[#19335A] flex items-center justify-center font-black text-sm">
                  SI
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-wider uppercase text-white">
                    Sunrise Institute of Technology
                  </h3>
                  <span className="text-[10px] tracking-widest uppercase text-indigo-200 font-semibold">
                    Faculty Identity Card
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="my-5 flex items-center gap-4">
                <div className="w-20 h-24 rounded-xl bg-slate-100 border-2 border-white p-1 flex items-center justify-center text-slate-800 shadow-inner">
                  <User className="w-12 h-12 text-[#19335A]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-white">
                    Prof. Rajesh Sharma
                  </span>
                  <span className="text-xs text-indigo-200 font-medium">
                    Senior Professor, CSE
                  </span>
                  <span className="font-mono text-xs text-amber-300 font-bold mt-1">
                    ID: SIT-FAC-2018-042
                  </span>
                  <span className="text-[10px] text-white/70 font-mono mt-0.5">
                    BLOOD GROUP: B+
                  </span>
                </div>
              </div>

              {/* 2x2 Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-white/10 p-3 rounded-lg border border-white/10">
                <div>
                  <span className="text-white/60 block">DEPARTMENT</span>
                  <span className="text-white font-bold">Comp. Science</span>
                </div>
                <div>
                  <span className="text-white/60 block">CABIN</span>
                  <span className="text-white font-bold">B-204</span>
                </div>
                <div>
                  <span className="text-white/60 block">JOINED</span>
                  <span className="text-white font-bold">16 Jul 2018</span>
                </div>
                <div>
                  <span className="text-white/60 block">VALID TILL</span>
                  <span className="text-emerald-300 font-bold">31 May 2029</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="w-6 h-6 text-white" />
                  <span className="text-[9px] font-mono text-white/70">
                    Scan for Auth Verification
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif italic text-xs text-white block">
                    R. Mehta
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-white/60">
                    REGISTRAR
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() =>
                  showToast("Digital Faculty ID saved to device!")
                }
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Digital Faculty ID</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Request Profile Update */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-800">
                  Request Profile Information Update
                </h3>
              </div>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="pt-4 flex flex-col gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Update Category
                </label>
                <select
                  value={updateCategory}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
                >
                  <option value="Contact Information">Contact Information (Mobile, Emergency Phone)</option>
                  <option value="Academic Qualifications">Academic Qualifications &amp; Conferred Degrees</option>
                  <option value="Research & Publications">Research Publications, DOI &amp; Patents</option>
                  <option value="Institutional Role">Committee / Institutional Role</option>
                  <option value="Cabin Allocation">Faculty Cabin or Laboratory Allocation</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Details of Correction / Supporting Evidence URL *
                </label>
                <textarea
                  required
                  rows={4}
                  value={updateDetails}
                  onChange={(e) => setUpdateDetails(e.target.value)}
                  placeholder="e.g. Please update mobile number to +91 98765 00000 or attach Google Scholar paper DOI..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 text-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium resize-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-500 text-[11px] leading-relaxed">
                Note: Modifications to official credentials or academic degrees require supporting documentation verification by the Dean of Academic Affairs.
              </div>

              <div className="pt-3 flex justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
