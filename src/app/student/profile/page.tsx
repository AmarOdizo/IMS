"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  CheckCircle,
  FileText,
  Download,
  Edit,
  Mail,
  Phone,
  Building,
  Key,
  Lock,
  Heart,
  Globe,
  Award,
  BookOpen,
  Calendar,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  MapPin,
  Clock,
  X,
  Send,
  Upload
} from "lucide-react";

export default function StudentProfilePage() {
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const clearances = [
    {
      lab: "Turing Advanced Computing Lab (B-12)",
      level: "Level 3 (Supervised)",
      window: "08:00 – 22:00",
      authority: "Dept Head CS",
      status: "Active",
      statusColor: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]",
    },
    {
      lab: "North Tower Central Library Stacks",
      level: "Level 1 (General Public)",
      window: "24/7 RFID Turnstile",
      authority: "Chief Librarian",
      status: "Active",
      statusColor: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]",
    },
    {
      lab: "Robotics & Autonomous Hardware Bay",
      level: "Level 4 (High Voltage)",
      window: "Course Slot Specific",
      authority: "Prof. V. Raman",
      status: "Permit Pending",
      statusColor: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]",
    },
    {
      lab: "Aquila Sports Complex & Gymnasium",
      level: "Campus Life",
      window: "06:00 – 21:00",
      authority: "Dean of Student Affairs",
      status: "Active",
      statusColor: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]",
    },
    {
      lab: "Embedded Systems & IoT Workstation",
      level: "Level 2 (Departmental)",
      window: "09:00 – 19:00",
      authority: "Lab Director",
      status: "Active",
      statusColor: "bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]",
    },
  ];

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 shadow-[2px_2px_0_0_#0D2545] border-l-4 border-secondary-container flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="material-symbols-outlined text-secondary-container text-[20px]">
            info
          </span>
          <span className="font-mono text-xs">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-primary-fixed-dim hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Dynamic Operational Sub-Header Bar */}
      <section className="bg-surface-container-low px-6 py-3.5 border-b border-[#d5e3fc] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
              Academic Registry
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-outline" />
            <span className="text-[11px] uppercase tracking-wider text-primary font-bold">
              Dossier APX-2023-CS-042
            </span>
            <span className="px-2 py-0.5 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-bold uppercase ml-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#047857] inline-block"></span>{" "}
              Verified File
            </span>
          </div>
          <h1 className="font-headline text-xl text-primary font-bold tracking-tight">
            Student Profile &amp; Academic Dossier
          </h1>
        </div>

        {/* Telemetry Actions */}
        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => setShowCorrectionModal(true)}
            className="bg-surface-container-lowest text-primary hover:bg-surface-container px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#c4c6cf] flex items-center gap-2 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              edit_document
            </span>
            <span>Request Information Update</span>
          </button>
          <button
            onClick={() =>
              triggerToast("Compiling secure signed PDF Dossier for Rahul Sharma...")
            }
            className="bg-primary text-white hover:bg-primary-container px-4 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Profile Dossier (PDF)</span>
          </button>
        </div>
      </section>

      {/* Main Technical Canvas */}
      <div className="p-6 flex flex-col gap-6">
        {/* Top Identity Command Banner */}
        <section className="bg-surface-container-lowest border border-[#d5e3fc] shadow-sm flex flex-col lg:flex-row relative">
          <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary"></div>

          {/* Student Badge & Visual Artifact */}
          <div className="p-6 lg:w-80 flex flex-col items-center sm:items-start text-left border-b lg:border-b-0 lg:border-r border-[#d5e3fc] bg-surface-container-lowest">
            <div className="relative group">
              <div className="w-28 h-32 bg-primary/10 border border-[#c4c6cf] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary-container via-secondary to-primary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[64px] text-white/80">
                    person
                  </span>
                </div>
              </div>
              <div
                className="absolute -bottom-2 -right-2 bg-primary text-white p-1 border-2 border-white"
                title="Official Bio-Metric Verified"
              >
                <span className="material-symbols-outlined text-[18px] block">
                  verified
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center sm:items-start">
              <span className="font-mono text-sm text-primary font-bold">
                APX-2023-CS-042
              </span>
              <span className="text-[11px] uppercase tracking-widest text-on-surface-variant mt-0.5 font-medium">
                UID: 9884-0012-7819
              </span>
              <div className="mt-3 flex items-center gap-1.5 px-2 py-0.5 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="uppercase">Active • Regular Student</span>
              </div>
            </div>
          </div>

          {/* Core Curricular Readout */}
          <div className="p-6 flex-1 flex flex-col justify-between border-b lg:border-b-0 border-[#d5e3fc]">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 bg-surface-container font-mono text-xs text-primary font-semibold tracking-wide">
                  Dept of Computer Science &amp; Engineering
                </span>
                <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] uppercase font-bold">
                  Tier-1 Autonomous
                </span>
              </div>
              <h2 className="font-headline text-2xl text-primary font-bold tracking-tight">
                Rahul Sharma
              </h2>
              <p className="text-sm text-secondary font-medium mt-1">
                Bachelor of Technology (B.Tech) — Computer Science &amp; Engineering
              </p>
            </div>

            {/* Academic Matrix Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-[#d5e3fc]">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
                  Batch Cohort
                </div>
                <div className="font-mono text-xs text-primary font-semibold mt-0.5">
                  2023–2027 (Sec A)
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
                  Progression
                </div>
                <div className="font-mono text-xs text-primary font-semibold mt-0.5">
                  Year 2 • Sem IV
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
                  Cumulative GPA
                </div>
                <div className="font-mono text-xs text-[#047857] font-bold mt-0.5 flex items-center gap-1">
                  <span>3.82 / 4.00</span>
                  <span className="text-[9px] bg-[#ecfdf5] px-1 border border-[#a7f3d0] font-bold">
                    Top 3%
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
                  Standing Class
                </div>
                <div className="font-mono text-xs text-primary font-semibold mt-0.5">
                  Distinction Honors
                </div>
              </div>
            </div>
          </div>

          {/* Quick Institutional Points of Contact */}
          <div className="p-6 lg:w-96 bg-surface-container-low border-t lg:border-t-0 lg:border-l border-[#d5e3fc] flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-3">
                Institutional Telemetry
              </span>
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-on-surface-variant uppercase font-medium">
                      Institutional Email
                    </div>
                    <a
                      className="font-mono text-xs text-primary hover:underline truncate block"
                      href="mailto:rahul.sharma23@apex.edu.in"
                    >
                      rahul.sharma23@apex.edu.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-on-surface-variant uppercase font-medium">
                      Direct Handset
                    </div>
                    <div className="font-mono text-xs text-primary">
                      +91 98765 43210
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-on-surface-variant uppercase font-medium">
                      Campus Residential Allocation
                    </div>
                    <div className="text-xs text-on-surface leading-tight">
                      Hall of Residence Block C, Room 314, North Campus HQ
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#d5e3fc] flex items-center justify-between text-on-surface-variant font-mono text-[11px]">
              <span>
                RFID KEY: <strong className="text-primary font-bold">8819-B4</strong>
              </span>
              <span className="text-[#047857] flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 bg-[#047857]"></span> HOSTEL PERMIT
                GRANTED
              </span>
            </div>
          </div>
        </section>

        {/* Visual Ledger Tabs & Structured Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Column 1: Personal & Bio Details */}
          <section className="bg-surface-container-lowest border border-[#d5e3fc] shadow-sm flex flex-col">
            <div className="px-5 py-3 bg-surface-container flex items-center justify-between border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  badge
                </span>
                <h3 className="font-headline text-xs font-bold text-primary uppercase">
                  Demographic &amp; Bio
                </h3>
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant font-semibold">
                SEC: 01
              </span>
            </div>

            <div className="p-4 flex flex-col divide-y divide-surface-container text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Date of Birth
                </span>
                <span className="font-mono text-primary font-medium">
                  14 August 2004{" "}
                  <span className="text-on-surface-variant">(Age 20)</span>
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Gender
                </span>
                <span className="text-primary font-medium">Male</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Blood Group
                </span>
                <span className="font-mono text-red-700 font-bold px-2 py-0.5 bg-red-50 border border-red-300">
                  O+ (Positive)
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Nationality
                </span>
                <span className="text-primary flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-2 bg-[#d5e3fc] inline-block border border-[#74777f]"></span>{" "}
                  Indian
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  National ID (Aadhaar)
                </span>
                <span className="font-mono text-primary tracking-wider font-semibold">
                  XXXX-XXXX-4912
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Mother Tongue / Dialect
                </span>
                <span className="text-primary font-medium">
                  Hindi / English (Bilingual)
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Admission Category
                </span>
                <span className="font-mono text-primary font-medium">
                  General Academic Merit
                </span>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low border-t border-[#d5e3fc] flex items-center gap-2 text-on-surface-variant font-mono text-[11px]">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted under National Privacy Directive UIDAI/2022</span>
            </div>
          </section>

          {/* Column 2: Guardian & Emergency Contacts */}
          <section className="bg-surface-container-lowest border border-[#d5e3fc] shadow-sm flex flex-col">
            <div className="px-5 py-3 bg-surface-container flex items-center justify-between border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  family_restroom
                </span>
                <h3 className="font-headline text-xs font-bold text-primary uppercase">
                  Kinship &amp; Emergency
                </h3>
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant font-semibold">
                SEC: 02
              </span>
            </div>

            <div className="p-4 flex flex-col divide-y divide-surface-container text-xs">
              <div className="py-2.5 flex flex-col gap-0.5">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Primary Guardian / Father
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-headline text-sm font-bold text-primary">
                    Mr. Rameshwar Sharma
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-surface-container text-on-surface uppercase font-medium">
                    Father
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant">
                  Senior Structural Engineer • L&amp;T Infrastructure
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Guardian Phone
                </span>
                <a
                  className="font-mono text-primary hover:underline font-semibold"
                  href="tel:+919811122334"
                >
                  +91 98111 22334
                </a>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Guardian Email
                </span>
                <a
                  className="font-mono text-primary hover:underline"
                  href="mailto:rameshwar.sharma@gmail.com"
                >
                  rameshwar.sharma@gmail.com
                </a>
              </div>

              <div className="py-2.5 flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Permanent Domicile Address
                </span>
                <p className="text-xs text-on-surface leading-normal">
                  Flat 402, Greenview Heights, Sector 14, Gurugram, Haryana –
                  122001, India
                </p>
              </div>

              <div className="py-2.5 flex flex-col gap-2 bg-surface-container-low p-2.5 border border-[#d5e3fc]">
                <span className="text-[10px] uppercase tracking-wider text-error font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    emergency
                  </span>{" "}
                  Active Escalation Hierarchy
                </span>
                <div className="text-[11px] font-mono flex flex-col gap-1">
                  <div className="flex justify-between items-center text-on-surface">
                    <span>1. Mr. Rameshwar Sharma (Father)</span>
                    <span className="font-bold">+91 98111 22334</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>2. Dr. A. K. Verma (Campus Guardian)</span>
                    <span>+91 98450 11223</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low border-t border-[#d5e3fc] flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
              <span>COUNCIL DISPATCH STATUS</span>
              <span className="text-[#047857] font-semibold">
                VERIFIED VIA SMS OTP
              </span>
            </div>
          </section>

          {/* Column 3: Academic Standing & Audit */}
          <section className="bg-surface-container-lowest border border-[#d5e3fc] shadow-sm flex flex-col">
            <div className="px-5 py-3 bg-surface-container flex items-center justify-between border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">
                  school
                </span>
                <h3 className="font-headline text-xs font-bold text-primary uppercase">
                  Academic Standing &amp; Audit
                </h3>
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant font-semibold">
                SEC: 03
              </span>
            </div>

            <div className="p-4 flex flex-col divide-y divide-surface-container text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Program Identifier
                </span>
                <span className="font-mono text-primary font-bold">
                  CS-BTECH (4Y / 8 Sem)
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Matriculation Date
                </span>
                <span className="font-mono text-primary">01 August 2023</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Admission Quota Merit
                </span>
                <span className="font-mono text-primary">
                  JEE Rank: 14,280
                </span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Appointed Academic Mentor
                </span>
                <div className="text-right">
                  <span className="text-xs text-primary font-medium block">
                    Dr. Alistair Chen
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    Dept of Computer Science
                  </span>
                </div>
              </div>

              {/* Registered Credits Breakdown Progress Bar */}
              <div className="py-2.5 flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                    Degree Credit Pipeline
                  </span>
                  <span className="font-mono text-primary font-bold">
                    68 / 160 Credits (42.5%)
                  </span>
                </div>
                <div className="w-full h-2 bg-surface-container border border-[#c4c6cf] overflow-hidden flex">
                  <div className="bg-primary h-full w-[42.5%]"></div>
                  <div
                    className="bg-secondary-container h-full w-[13.75%]"
                    title="Current Sem In-Flight"
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                  <span>Earned: 68 Credits</span>
                  <span>Enrolled Now: 22 Credits</span>
                </div>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Library System Pass
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-primary">APX-LIB-8841</span>
                  <span className="px-1.5 py-0.5 bg-[#ecfdf5] text-[#047857] text-[9px] font-bold">
                    0 FINES
                  </span>
                </div>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wide text-on-surface-variant font-medium">
                  Directory SSO
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#047857] font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    cloud_done
                  </span>{" "}
                  Google Workspace
                </span>
              </div>
            </div>

            <div className="p-3 bg-surface-container-low border-t border-[#d5e3fc] flex items-center justify-between font-mono text-[11px] text-on-surface-variant">
              <span>CURRICULAR STATUS</span>
              <span className="text-primary font-bold">
                CLEAR OF CONDITIONAL PROBATION
              </span>
            </div>
          </section>
        </div>

        {/* Secondary Tabular Diagnostics & Facility Clearance Map */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Facility & Access Clearance Matrix (8 cols) */}
          <div className="lg:col-span-8 bg-surface-container-lowest border border-[#d5e3fc] shadow-sm p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#d5e3fc]">
              <div>
                <h4 className="font-headline text-sm font-bold text-primary uppercase">
                  Institutional Facility Clearances
                </h4>
                <span className="text-xs text-on-surface-variant">
                  Active access tokens tied directly to RFID Smartcard APX-2023-CS-042
                </span>
              </div>
              <span className="px-2 py-1 bg-surface-container font-mono text-on-surface uppercase text-[10px] font-semibold border border-[#c4c6cf]">
                Sync: Automated T-0
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider border-b border-[#d5e3fc]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Laboratory / Zone</th>
                    <th className="py-2.5 px-3 font-semibold">Security Level</th>
                    <th className="py-2.5 px-3 font-semibold">Operating Window</th>
                    <th className="py-2.5 px-3 font-semibold">Approving Authority</th>
                    <th className="py-2.5 px-3 text-right font-semibold">Clearance State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d5e3fc]/60 font-mono text-xs">
                  {clearances.map((c) => (
                    <tr
                      key={c.lab}
                      className="hover:bg-surface-container-low transition-colors"
                    >
                      <td className="py-2.5 px-3 font-semibold text-primary font-sans">
                        {c.lab}
                      </td>
                      <td className="py-2.5 px-3 text-on-surface">{c.level}</td>
                      <td className="py-2.5 px-3 text-on-surface-variant">
                        {c.window}
                      </td>
                      <td className="py-2.5 px-3 text-on-surface-variant font-sans">
                        {c.authority}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={`px-2 py-0.5 text-[10px] uppercase font-bold border ${c.statusColor}`}
                        >
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Campus Location Context View (4 cols) */}
          <div className="lg:col-span-4 bg-surface-container-lowest border border-[#d5e3fc] shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-headline text-sm font-bold text-primary uppercase">
                  Assigned Hub
                </h4>
                <span className="font-mono text-[11px] text-secondary font-semibold">
                  CAMPUS NORTH GRID
                </span>
              </div>

              {/* Map Canvas Visual Placeholder */}
              <div className="w-full h-40 bg-gradient-to-br from-primary-container via-slate-800 to-primary border border-[#c4c6cf] relative overflow-hidden flex items-center justify-center">
                <div className="text-center p-3">
                  <MapPin className="w-8 h-8 text-secondary-container mx-auto mb-1 animate-bounce" />
                  <div className="font-headline text-xs font-bold text-white uppercase">
                    Apex North Perimeter
                  </div>
                  <div className="text-[10px] text-white/70">
                    Faculty of Engineering • Block 3
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-primary text-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider">
                  LAT: 28.4595° N • LON: 77.0266° E
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold block">
                  Primary Operational Node
                </span>
                <p className="text-xs text-on-surface mt-0.5 leading-relaxed">
                  Faculty of Engineering • Block 3, North Perimeter Rd, Apex
                  Autonomous Campus
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#d5e3fc] flex items-center justify-between text-on-surface-variant font-mono text-[11px]">
              <span>
                EVAC ZONE: <strong className="text-primary font-bold">ASSEMBLY-NORTH-4</strong>
              </span>
              <button
                onClick={() =>
                  triggerToast("Launching interactive campus GIS navigational overlay...")
                }
                className="text-secondary hover:underline flex items-center gap-0.5 font-semibold"
              >
                Campus Map →
              </button>
            </div>
          </div>
        </section>

        {/* Autonomous Regulatory Footer Banner */}
        <footer className="bg-surface-container p-5 border border-[#d5e3fc] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary text-white mt-0.5 shrink-0">
              <span className="material-symbols-outlined text-[20px] block">
                gavel
              </span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-primary font-bold">
                Statutory Notice on Demographic &amp; Academic Integrity
              </div>
              <p className="text-xs text-on-surface-variant max-w-4xl mt-0.5 leading-relaxed">
                All official demographic records, kinship dependencies, and
                enrollment codes are synchronized with the{" "}
                <strong>Registrar Autonomous Council</strong>. Under Institute
                By-Law IV-C, modifications to permanent residential address,
                national identifier records, or guardian credentials require
                submission of an Official Correction Ticket accompanied by
                sworn documentary verification.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCorrectionModal(true)}
            className="bg-surface-container-lowest hover:bg-surface-container text-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#c4c6cf] whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">
              open_in_new
            </span>
            <span>Submit Correction Ticket</span>
          </button>
        </footer>
      </div>

      {/* MODAL: Submit Profile Correction Ticket */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-[#d5e3fc] shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#d5e3fc]">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-primary" />
                <h3 className="font-headline text-base font-bold text-primary uppercase">
                  Submit Official Dossier Correction Ticket
                </h3>
              </div>
              <button
                onClick={() => setShowCorrectionModal(false)}
                className="text-on-surface-variant hover:text-primary p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5">
              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Target Field for Modification
                </label>
                <select className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary">
                  <option>Permanent Residential Domicile Address</option>
                  <option>Guardian Contact Number / Email</option>
                  <option>Emergency Contact Hierarchy Order</option>
                  <option>Spelling Correction in Legal Full Name</option>
                  <option>Blood Group / Medical Flag Update</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Proposed New Information
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter exact updated details here..."
                  className="w-full border border-[#c4c6cf] p-2 text-xs bg-surface text-on-surface focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-on-surface block mb-1">
                  Supporting Verification Document (PDF / Scan)
                </label>
                <div className="border-2 border-dashed border-[#c4c6cf] p-4 text-center cursor-pointer hover:border-primary transition-colors bg-surface/30">
                  <Upload className="w-6 h-6 text-primary mx-auto mb-1" />
                  <div className="text-xs text-primary font-medium">
                    Click to browse or drop affidavit / identity proof
                  </div>
                  <div className="text-[10px] text-on-surface-variant mt-0.5">
                    Accepted: PDF, PNG, JPG (Max 5MB)
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5e3fc]">
              <button
                onClick={() => setShowCorrectionModal(false)}
                className="px-4 py-2 border border-[#c4c6cf] text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCorrectionModal(false);
                  triggerToast(
                    "Correction ticket registered. Tracking Token: #COR-2025-019"
                  );
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container"
              >
                Submit to Registrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

