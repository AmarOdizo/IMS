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
  Lock,
  Download,
  Printer,
  Edit3,
  X,
  Send,
  Sparkles,
  ExternalLink,
  Layers,
  Fingerprint,
  QrCode,
  CreditCard,
  CheckCheck
} from "lucide-react";

export default function StaffProfilePage() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateCategory, setUpdateCategory] = useState("Contact Information");
  const [updateDetails, setUpdateDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsUpdateModalOpen(false);
      setUpdateDetails("");
      showToast("Dossier correction request submitted to Registrar HR Desk!");
    }, 900);
  };

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
        {/* Top Action Toolbar & Status Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm rounded-sm">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-primary text-on-primary font-mono text-xs px-2.5 py-1 tracking-wider uppercase font-bold rounded-xs">
              Dossier ID: F-842-CS
            </span>
            <span className="bg-surface-container text-on-surface-variant font-mono text-xs px-2.5 py-1 border border-[#cbd5e1] rounded-xs">
              Node: FACULTY_CORE_v4.2
            </span>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#047857]"></span>
              <span>HR Synchronized • 08:30 IST</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-primary px-3.5 py-1.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors border border-[#cbd5e1] rounded-sm"
            >
              <Edit3 className="h-4 w-4 text-secondary" />
              <span>Request Info Update</span>
            </button>
            <button
              onClick={() => showToast("Exporting cryptographic faculty dossier PDF...")}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-3.5 py-1.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-sm rounded-sm"
            >
              <Printer className="h-4 w-4 text-secondary-container" />
              <span>Export Dossier (PDF)</span>
            </button>
          </div>
        </div>

        {/* Faculty Hero Card / Primary Overview */}
        <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm rounded-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Faculty Photo Column */}
            <div className="lg:col-span-3 bg-surface-container-low flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-[#cbd5e1]">
              <div className="relative w-40 h-44 shadow-md bg-surface-container-high border-2 border-primary rounded-xs overflow-hidden">
                <img
                  alt="Mr. Amit Sharma - Faculty Profile"
                  className="w-full h-full object-cover contrast-105"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                />
                <span className="absolute bottom-0 right-0 bg-primary text-secondary-container text-[10px] font-mono uppercase font-bold px-2 py-0.5 leading-none">
                  TENURED
                </span>
              </div>
              <div className="mt-3 flex flex-col items-center text-center">
                <span className="font-mono text-xs text-primary font-bold">RFID: APX-FAC-88412</span>
                <span className="font-mono text-[10px] text-[#047857] uppercase font-semibold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Biometric Clearance Active
                </span>
              </div>
            </div>

            {/* Faculty Details & Credentials Summary */}
            <div className="lg:col-span-9 p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#0D2545]/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-surface-container text-primary font-mono text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider border border-[#c4c6cf] rounded-xs">
                      Active &amp; Tenured Faculty
                    </span>
                    <span className="bg-primary text-secondary-container font-mono text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold rounded-xs">
                      Tier-1 Accredited Evaluator
                    </span>
                    <span className="bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-mono text-[10px] px-2 py-0.5 font-bold rounded-xs">
                      NAAC Criterion 2 Co-Lead
                    </span>
                  </div>
                  <span className="font-mono text-xs text-outline font-semibold">Service: 6 Yrs 10 Mos</span>
                </div>

                <div className="mt-3">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary leading-tight">
                      Mr. Amit Sharma
                    </h1>
                    <span className="text-sm font-mono text-on-surface-variant font-normal">
                      M.Tech, Ph.D. (Pursuing)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant mt-1 text-xs flex-wrap">
                    <span className="font-bold text-secondary">Senior Assistant Professor</span>
                    <span className="text-outline">•</span>
                    <span className="text-on-surface">Department of Computer Science &amp; Engineering</span>
                    <span className="text-outline">•</span>
                    <span className="font-mono bg-surface-container px-2 py-0.5 text-primary font-bold border border-[#cbd5e1] rounded-xs">
                      EMP-CS-2018-842
                    </span>
                  </div>
                </div>

                {/* Quick Telemetry & Contact Pills */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                  <div className="bg-surface-container-low p-3 border border-[#cbd5e1] rounded-sm flex items-start gap-2.5">
                    <Phone className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-mono uppercase text-outline">Contact Handset</span>
                      <span className="font-mono text-xs text-primary font-bold truncate">+91 98765 43210</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3 border border-[#cbd5e1] rounded-sm flex items-start gap-2.5">
                    <Mail className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-mono uppercase text-outline">Institutional SSO</span>
                      <span className="font-mono text-xs text-primary font-bold truncate">a.sharma@apex.edu.in</span>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3 border border-[#cbd5e1] rounded-sm flex items-start gap-2.5">
                    <Building className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-mono uppercase text-outline">Faculty Cabin</span>
                      <span className="text-xs text-primary font-bold truncate">Room 314, Block C</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry strip */}
              <div className="mt-5 pt-3 border-t border-[#0D2545]/10 flex flex-wrap items-center justify-between text-on-surface-variant gap-3 text-xs font-mono">
                <div className="flex items-center gap-3 flex-wrap">
                  <span>
                    Date of Joining: <strong className="text-primary font-bold">16 July 2018</strong>
                  </span>
                  <span className="text-outline">•</span>
                  <span>
                    Cadre: <strong className="text-primary font-bold">Regular Full-Time</strong>
                  </span>
                  <span className="text-outline">•</span>
                  <span>
                    Curricular Pay Band: <strong className="text-primary font-bold">L-11 (7th CPC)</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-secondary font-bold">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="uppercase text-[11px]">Official Institutional Dossier</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Up High Density Academic Telemetry Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden border-l-4 border-l-secondary rounded-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
              Weekly Teaching Load
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-primary font-mono">
                18 <span className="text-xs text-outline font-normal">Hrs/Wk</span>
              </span>
              <span className="bg-surface-container text-secondary font-mono text-[10px] px-1.5 py-0.5 font-bold rounded-xs">
                100% Allocated
              </span>
            </div>
            <span className="text-xs text-on-surface-variant mt-1 block">
              15 Lecture Hours + 3 Mentorship
            </span>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden border-l-4 border-l-primary rounded-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
              Assigned Cohorts
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-primary font-mono">
                04 <span className="text-xs text-outline font-normal">Batches</span>
              </span>
              <span className="bg-surface-container text-primary font-mono text-[10px] px-1.5 py-0.5 font-bold rounded-xs">
                184 Students
              </span>
            </div>
            <span className="text-xs text-on-surface-variant mt-1 block">
              UG (3) • PG Thesis Research (1)
            </span>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden border-l-4 border-l-primary-container rounded-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
              Scholarly Publications
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-primary font-mono">
                10 <span className="text-xs text-outline font-normal">Indexed</span>
              </span>
              <span className="bg-surface-container text-secondary font-mono text-[10px] px-1.5 py-0.5 font-bold rounded-xs">
                h-index: 6
              </span>
            </div>
            <span className="text-xs text-on-surface-variant mt-1 block">
              8 IEEE/ACM Conf + 2 Scopus Q1
            </span>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-sm relative overflow-hidden border-l-4 border-l-tertiary-container rounded-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
              Avg Student Evaluation
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-[#047857] font-mono">
                4.82 <span className="text-xs text-outline font-normal">/ 5.0</span>
              </span>
              <span className="bg-[#ecfdf5] text-[#047857] font-mono text-[10px] px-1.5 py-0.5 font-bold rounded-xs">
                ▲ +0.14
              </span>
            </div>
            <span className="text-xs text-on-surface-variant mt-1 block">
              Based on 142 Mid-Term Submissions
            </span>
          </div>
        </div>

        {/* Main Multi-Section Dossier Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Academic Credentials, Workload, Batches (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* SECTION 1: Academic & Professional Credentials */}
            <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm p-6 rounded-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#0D2545]/10 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  <h2 className="text-base font-bold uppercase tracking-tight text-primary">
                    Academic &amp; Professional Credentials
                  </h2>
                </div>
                <span className="text-xs font-mono uppercase text-outline font-bold">Verified Records</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Ph.D. Pursuing */}
                <div className="bg-surface-container-low p-4 border border-[#cbd5e1] rounded-sm flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-primary">
                          Doctor of Philosophy (Ph.D.) - In Progress
                        </span>
                        <span className="bg-primary text-secondary-container font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold rounded-xs">
                          Synopsis Defended
                        </span>
                      </div>
                      <p className="text-xs text-on-surface mt-1">
                        Indian Institute of Technology (IIT) Delhi • Department of CSE
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1 italic">
                        Thesis: &ldquo;Deterministic High-Throughput Consensus Protocols for Globally Distributed Multi-Master Cloud Datastores&rdquo;
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-outline shrink-0">Exp. Fall 2025</span>
                </div>

                {/* M.Tech */}
                <div className="bg-surface-container-low p-4 border border-[#cbd5e1] rounded-sm flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-primary">
                          Master of Technology (M.Tech in Distributed Systems)
                        </span>
                        <span className="bg-secondary-container text-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold rounded-xs">
                          Gold Medalist • 9.84 CGPA
                        </span>
                      </div>
                      <p className="text-xs text-on-surface mt-1">
                        Indian Institute of Technology (IIT) Delhi • Conferred 2016
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Specialization: Cloud Infrastructure &amp; Sharded Database Architectures
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-outline shrink-0">2014 – 2016</span>
                </div>

                {/* B.Tech */}
                <div className="bg-surface-container-low p-4 border border-[#cbd5e1] rounded-sm flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-primary">
                          Bachelor of Technology (B.Tech in Computer Science)
                        </span>
                        <span className="bg-surface-container text-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold border border-[#cbd5e1] rounded-xs">
                          First Class with Distinction
                        </span>
                      </div>
                      <p className="text-xs text-on-surface mt-1">
                        Apex Technical University • Conferred 2014
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-outline shrink-0">2010 – 2014</span>
                </div>
              </div>

              {/* Research Specializations & Publication Summary Tag Cloud */}
              <div className="mt-4 pt-4 border-t border-[#0D2545]/10 flex flex-col gap-2">
                <span className="text-[11px] font-mono text-outline uppercase tracking-wider font-bold">
                  Primary Research Specializations &amp; Domains
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Distributed Database Engines",
                    "Cloud SQL Optimization",
                    "Sharded Micro-Architectures",
                    "ACID Multi-Partition Transactions",
                    "Raft Consensus Adaptations"
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-surface-container text-primary font-mono text-xs px-2.5 py-1 border border-[#cbd5e1] rounded-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2 p-3 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-secondary" />
                    <span className="text-primary">
                      <strong>Publications Record:</strong> 8 Peer-Reviewed IEEE / ACM Conference Papers, 2 Scopus Q1 Indexed Journals
                    </span>
                  </div>
                  <button
                    onClick={() => showToast("Opening full bibliography index...")}
                    className="font-mono text-xs text-secondary font-bold hover:underline uppercase"
                  >
                    View Bibliography
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 2: Assigned Teaching Workload & Courses (AY 2024-25) */}
            <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm p-6 rounded-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#0D2545]/10 mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-secondary" />
                  <h2 className="text-base font-bold uppercase tracking-tight text-primary">
                    Assigned Teaching Workload (AY 2024–25 • Term II)
                  </h2>
                </div>
                <span className="font-mono text-xs bg-primary text-on-primary px-2.5 py-1 uppercase font-bold rounded-xs">
                  18 Total Contact Hours
                </span>
              </div>

              {/* Academic Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container font-mono text-[10px] text-primary uppercase border-b border-[#cbd5e1]">
                    <tr>
                      <th className="py-2.5 px-3">Course Code</th>
                      <th className="py-2.5 px-3">Course Title</th>
                      <th className="py-2.5 px-3">Format / Scope</th>
                      <th className="py-2.5 px-3 text-center">Credits</th>
                      <th className="py-2.5 px-3 text-right">Weekly Load</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#cbd5e1]">
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-primary">CS-401</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-primary">Database Management Systems</div>
                        <span className="text-[11px] text-on-surface-variant">Core UG • 4th Semester B.Tech</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-surface-container text-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold border border-[#cbd5e1] rounded-xs">
                          Theory
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">4.0</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-primary">4 hrs/wk</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-primary">CS-405L</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-primary">Database Systems &amp; Cloud SQL Lab</div>
                        <span className="text-[11px] text-on-surface-variant">Lab Practical • Cloud Cluster 3</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-secondary-container text-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold rounded-xs">
                          Practical Lab
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">2.0</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-primary">4 hrs/wk</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-primary">CS-602</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-primary">Advanced Distributed Database Architecture</div>
                        <span className="text-[11px] text-on-surface-variant">M.Tech Elective II • PG Seminar</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-surface-container text-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold border border-[#cbd5e1] rounded-xs">
                          PG Theory
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">3.0</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-primary">3 hrs/wk</td>
                    </tr>
                    <tr className="hover:bg-surface-container-low transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-primary">CS-202</td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-primary">Data Structures &amp; Algorithm Foundations</div>
                        <span className="text-[11px] text-on-surface-variant">Undergraduate Major • BCA Dept</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-surface-container text-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold border border-[#cbd5e1] rounded-xs">
                          Theory
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">4.0</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-primary">4 hrs/wk</td>
                    </tr>
                    <tr className="bg-surface-container-low font-semibold text-primary">
                      <td className="py-2.5 px-3 text-right uppercase font-mono text-[10px]" colSpan={3}>
                        Remedial Clinic &amp; Office Hours Consultation:
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">—</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold">3 hrs/wk</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Workload Ledger Strip */}
              <div className="mt-4 p-4 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary text-secondary-container font-mono text-base font-bold flex items-center justify-center rounded-sm">
                    18h
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-primary font-bold uppercase font-mono">
                      Weekly Commitment Ledger
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      15 Hours Scheduled Classroom/Lab + 3 Hours Advisory/Clinic
                    </span>
                    <div className="flex items-center gap-4 mt-1 text-[11px] font-mono text-outline">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-primary inline-block"></span> 83% Direct Teaching
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-secondary inline-block"></span> 17% Mentorship
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-outline uppercase block">UGC Benchmark Status</span>
                  <span className="bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-mono text-xs px-2.5 py-1 font-bold inline-block mt-1 rounded-xs">
                    COMPLIANT (18/16 Hr Min)
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 3: Assigned Batches & Mentorship */}
            <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm p-6 rounded-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#0D2545]/10 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  <h2 className="text-base font-bold uppercase tracking-tight text-primary">
                    Assigned Batches &amp; Cohort Mentorship
                  </h2>
                </div>
                <span className="text-xs font-mono text-outline">Academic Session 2024-25</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    batch: "BATCH 2023–27",
                    role: "Class Mentor",
                    name: "B.Tech CS - Sem IV (Sec A)",
                    desc: "Primary Academic Mentor & Theory Course Lead (CS-401)",
                    strength: "64 Students",
                    attendance: "89.4%"
                  },
                  {
                    batch: "BATCH 2023–27",
                    role: "Lab Lead",
                    name: "B.Tech CS - Sem IV (Sec B)",
                    desc: "Practical Lab Lead (CS-405L Cloud SQL Systems)",
                    strength: "62 Students",
                    attendance: "91.2%"
                  },
                  {
                    batch: "POST-GRADUATE",
                    role: "Thesis Advisor",
                    name: "M.Tech Data Systems - Term II",
                    desc: "Supervisor for 6 Distributed Datastores Dissertations",
                    strength: "28 Scholars",
                    attendance: "94.8%"
                  },
                  {
                    batch: "BATCH 2024–27",
                    role: "Theory Instructor",
                    name: "BCA - Semester II (Sec B)",
                    desc: "Course Instructor for CS-202 Data Structures",
                    strength: "30 Students",
                    attendance: "84.6%"
                  }
                ].map((cohort, cIdx) => (
                  <div
                    key={cIdx}
                    className="bg-surface-container-low p-4 border border-[#cbd5e1] rounded-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-primary font-bold">{cohort.batch}</span>
                        <span className="bg-primary text-on-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold rounded-xs">
                          {cohort.role}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold uppercase text-primary mt-1.5">{cohort.name}</h3>
                      <p className="text-xs text-on-surface-variant mt-1">{cohort.desc}</p>
                    </div>
                    <div className="mt-3.5 pt-2 border-t border-[#cbd5e1] flex items-center justify-between font-mono text-xs text-outline">
                      <span>{cohort.strength}</span>
                      <span className="text-[#047857] font-bold">Attendance: {cohort.attendance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Roles, Security, Smart Badge (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* SECTION 4: Institutional Roles & Committees */}
            <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm p-6 rounded-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-[#0D2545]/10 mb-4">
                <ShieldCheck className="h-5 w-5 text-secondary" />
                <h2 className="text-base font-bold uppercase tracking-tight text-primary">
                  Institutional Roles
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                <div className="bg-surface-container-low p-3.5 border border-[#cbd5e1] rounded-sm">
                  <div className="flex items-center justify-between">
                    <span className="bg-primary text-on-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold rounded-xs">
                      Standing Committee
                    </span>
                    <span className="font-mono text-xs text-outline">2022–Pres.</span>
                  </div>
                  <h3 className="text-xs font-bold text-primary uppercase mt-1.5">
                    Academic Integrity Board
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Member: Departmental Academic Integrity Board (DAIB). Reviewing thesis submissions and code plagiarism inquiries.
                  </p>
                </div>

                <div className="bg-surface-container-low p-3.5 border border-[#cbd5e1] rounded-sm">
                  <div className="flex items-center justify-between">
                    <span className="bg-secondary-container text-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold rounded-xs">
                      Student Chapter
                    </span>
                    <span className="font-mono text-xs text-outline">2020–Pres.</span>
                  </div>
                  <h3 className="text-xs font-bold text-primary uppercase mt-1.5">
                    Faculty Advisor, Apex ACM
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Faculty Chapter Sponsor. Overseeing national hackathons, technical symposia, and collegiate algorithmic competitions.
                  </p>
                </div>

                <div className="bg-surface-container-low p-3.5 border border-[#cbd5e1] rounded-sm">
                  <div className="flex items-center justify-between">
                    <span className="bg-surface-container text-primary font-mono text-[10px] px-1.5 py-0.5 uppercase font-bold border border-[#cbd5e1] rounded-xs">
                      Examination Cell
                    </span>
                    <span className="font-mono text-xs text-outline">AY 2024–25</span>
                  </div>
                  <h3 className="text-xs font-bold text-primary uppercase mt-1.5">
                    Moderation Committee
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    Member: Autonomous Examination Moderation Committee for End-Semester CSE Theory Papers.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 5: Security & Access Telemetry */}
            <div className="bg-surface-container-lowest border border-[#cbd5e1] shadow-sm p-6 rounded-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#0D2545]/10 mb-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-secondary" />
                  <h2 className="text-base font-bold uppercase tracking-tight text-primary">
                    Security &amp; Access
                  </h2>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-[#047857]"></span>
              </div>

              <div className="flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-sm">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-secondary" />
                    <div>
                      <div className="font-bold text-primary">Identity SSO Status</div>
                      <div className="text-[10px] text-outline">Google Workspace Enterprise</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] bg-[#ecfdf5] text-[#047857] px-2 py-0.5 font-bold rounded-xs">
                    ACTIVE
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-sm">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-secondary" />
                    <div>
                      <div className="font-bold text-primary">Two-Factor Auth (MFA)</div>
                      <div className="text-[10px] text-outline">Hardware FIDO2 Token</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] bg-[#ecfdf5] text-[#047857] px-2 py-0.5 font-bold rounded-xs">
                    ENFORCED
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-secondary" />
                    <div>
                      <div className="font-bold text-primary">Biometric Clearance</div>
                      <div className="text-[10px] text-outline">Level 4 Faculty Perimeters</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] bg-primary text-secondary-container px-2 py-0.5 font-bold rounded-xs">
                    LEVEL 4
                  </span>
                </div>
              </div>

              {/* Mini Smart Badge Replica */}
              <div className="mt-4 p-4 bg-[#0A192F] text-white rounded-lg border border-[#19477e] shadow-md flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-[#d5e3ff] text-primary flex items-center justify-center font-bold text-[10px] rounded-xs">
                      A
                    </div>
                    <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-white">
                      APEX FACULTY BADGE
                    </span>
                  </div>
                  <span className="font-mono text-[8px] bg-white/20 px-1.5 py-0.5 rounded-xs text-[#99c0fe]">
                    Mifare DESFire
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 bg-white/10 border border-white/20 p-1 flex items-center justify-center rounded-xs">
                    <QrCode className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex flex-col font-mono text-[10px]">
                    <span className="text-white font-bold">MR. AMIT SHARMA</span>
                    <span className="text-[#99c0fe]">APX-FAC-88412</span>
                    <span className="text-white/60 text-[8px] mt-0.5">VALID UNTIL: JUN 2027</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Request Dossier Update */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg border-2 border-primary shadow-[4px_4px_0_0_#0d2545] p-6 relative rounded-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#cbd5e1]">
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">
                  Request Dossier Update
                </h3>
              </div>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="py-4 flex flex-col gap-4 text-xs font-mono">
              <div>
                <label className="uppercase font-bold text-on-surface-variant block mb-1">
                  Update Category
                </label>
                <select
                  value={updateCategory}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] text-xs text-primary focus:outline-none focus:border-primary rounded-xs"
                >
                  <option value="Contact Information">Contact Information (Handset, Emergency Phone)</option>
                  <option value="Academic Qualifications">Academic Qualifications (Conferred Degrees, Ph.D. Defense)</option>
                  <option value="Publications Record">Research Publications &amp; Patents</option>
                  <option value="Institutional Committee Role">Institutional Committee Designation</option>
                  <option value="Cabin / Laboratory Relocation">Cabin or Research Lab Allocation</option>
                </select>
              </div>

              <div>
                <label className="uppercase font-bold text-on-surface-variant block mb-1">
                  Details of Modification / Evidence URL *
                </label>
                <textarea
                  required
                  rows={3}
                  value={updateDetails}
                  onChange={(e) => setUpdateDetails(e.target.value)}
                  placeholder="e.g. Updating mobile number to +91 98765 00000 following SIM registration or attaching new publication DOI..."
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] text-xs text-primary focus:outline-none focus:border-primary resize-none rounded-xs font-sans"
                />
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1] text-[11px] text-outline rounded-xs">
                Modifications to academic qualifications or pay cadre require verification by Dean of Academic Affairs and HR Directorate.
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#cbd5e1]">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 bg-surface-container text-primary uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-primary text-on-primary uppercase font-bold tracking-wider hover:bg-primary-container transition-colors flex items-center gap-1.5 rounded-xs"
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
