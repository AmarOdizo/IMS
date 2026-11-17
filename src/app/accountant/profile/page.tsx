"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Edit,
  ExternalLink,
  FileCheck,
  FileText,
  Key,
  Laptop,
  Lock,
  Mail,
  Phone,
  Printer,
  Receipt,
  RotateCcw,
  Scale,
  School,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Wallet,
  X,
  QrCode,
  CreditCard,
  Check,
} from "lucide-react";

export default function AccountantProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCredentialIdModalOpen, setIsCredentialIdModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isTillLocked, setIsTillLocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editable Contact Fields
  const [contactInfo, setContactInfo] = useState({
    name: "Mr. Rajesh Kumar",
    designation: "Chief Bursar & Senior Financial Officer",
    qualifications: "M.Com, FCA (ICAI)",
    email: "r.kumar.finance@apex.edu.in",
    phone: "+91 98112 34567",
    intercom: "Ext 204",
    cabin: "Room 104, Admin Block",
    counterTill: "Counter Till #02 (Student Reception)",
  });

  const [formData, setFormData] = useState({ ...contactInfo });

  // Security Form
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactInfo({ ...formData });
    setIsEditModalOpen(false);
    showToast("Accountant contact details updated in Central Identity Directory!");
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      alert("PIN must be at least 4 digits.");
      return;
    }
    setIsSecurityModalOpen(false);
    setCurrentPin("");
    setNewPin("");
    showToast("Cashier authorization PIN updated and encrypted with HSM token!");
  };

  const handleDownloadDossier = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Field,Value",
        `Name,"${contactInfo.name}"`,
        `Designation,"${contactInfo.designation}"`,
        `Qualifications,"${contactInfo.qualifications}"`,
        "Employee ID,EMP-FIN-2016-309",
        "Cadre,Grade-IX Fin (Tenured)",
        `Official Email,"${contactInfo.email}"`,
        `Direct Phone,"${contactInfo.phone}"`,
        `Intercom,"${contactInfo.intercom}"`,
        `Cabin / Station,"${contactInfo.cabin}"`,
        `Counter Till,"${contactInfo.counterTill}"`,
        "HSM Token Serial,#4409-APX",
        "Statutory Authority,Dual Authorization Primary Signatory",
        "Lifetime Realized Volume,INR 38.40 Crore",
        "Current AY Realized Volume,INR 4.18 Crore",
        "Audit Discrepancies,Zero (100% Reconciled)",
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bursar_profile_dossier_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloaded verified Bursar Profile & Financial Clearance Dossier (CSV)!");
  };

  return (
    <div className="flex flex-col w-full pb-16 font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Header Context Ribbon */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mb-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
              <Link href="/accountant" className="hover:text-[#3D405B] transition-colors">
                Bursar Portal
              </Link>
              <span>/</span>
              <span>Staff Directory</span>
              <span>/</span>
              <span className="text-[#3D405B] font-bold">Bursar Executive Profile</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl lg:text-2xl font-bold text-[#3D405B] tracking-tight">
                Accountant Profile &amp; Financial Clearance Dossier
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                TIER-1 AUDIT LEVEL
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                CLEARANCE: LEVEL-A UNRESTRICTED
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Statutory credentials, dual authorization co-signatory powers, counter till assignment, and cryptographic HSM token status.
            </p>
          </div>

          {/* Quick Scope Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setFormData({ ...contactInfo });
                setIsEditModalOpen(true);
              }}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Edit className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit Contact Info</span>
            </button>
            <button
              onClick={() => setIsCredentialIdModalOpen(true)}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Cashier ID Card</span>
            </button>
            <button
              onClick={handleDownloadDossier}
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dossier (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Ribbon */}
      <div className="rounded-2xl bg-[#3D405B] px-5 py-3 text-white mb-5 flex flex-wrap items-center justify-between gap-3 shadow-sm text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="font-bold tracking-wider uppercase">
            TENURED INSTITUTIONAL BURSAR &bull; EMP-FIN-2016-309 &bull; {contactInfo.counterTill.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-300 font-medium">
          <span>HSM TOKEN #4409-APX</span>
          <span>&bull;</span>
          <span className="text-emerald-400 font-bold">VAULT PERMIT: ACTIVE</span>
        </div>
      </div>

      {/* Executive Profile Dossier Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-5">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Portrait & Primary Tag (3 cols) */}
          <div className="lg:col-span-3 bg-slate-50/70 p-6 flex flex-col justify-between items-center text-center gap-4 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-36 h-36 bg-[#3D405B] text-white rounded-2xl border-2 border-slate-300 shadow-md flex items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                  <User className="w-16 h-16 text-slate-300" />
                  <span className="text-[10px] tracking-widest text-slate-300 font-mono uppercase mt-1">
                    APEX BURSAR
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-[#2d3043] text-emerald-400 py-0.5 px-2 font-mono text-[9px] uppercase font-bold text-center tracking-wider">
                  ACTIVE CADRE
                </div>
              </div>

              <div className="flex flex-col mt-1">
                <span className="text-lg font-bold text-slate-900">
                  {contactInfo.name}
                </span>
                <span className="font-mono text-xs text-[#3D405B] font-bold">
                  {contactInfo.qualifications}
                </span>
                <span className="text-xs text-slate-500 font-medium mt-1">
                  {contactInfo.designation}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 pt-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400 text-[11px] uppercase font-bold">Tenure:</span>
                <span className="font-bold text-slate-800">8 Yrs 5 Mos</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400 text-[11px] uppercase font-bold">Joined:</span>
                <span className="font-semibold text-slate-800">18 Oct 2016</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span className="text-slate-400 text-[11px] uppercase font-bold">Signature:</span>
                <span className="text-emerald-700 font-bold">Tier-1 Authorized</span>
              </div>
            </div>
          </div>

          {/* Right: Metadata & Institutional Routing (9 cols) */}
          <div className="lg:col-span-9 p-6 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-[#3D405B] uppercase tracking-wider">
                  Official Apex IMS Identification Profile
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-bold text-xs">
                  Stationed: ADM-B104
                </span>
              </div>

              {/* 6 Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                <div className="flex flex-col bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Employee ID
                  </span>
                  <span className="text-slate-900 font-bold mt-1 text-sm font-mono">EMP-FIN-2016-309</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Pay Cadre: Grade-IX Fin</span>
                </div>

                <div className="flex flex-col bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Department
                  </span>
                  <span className="text-slate-900 font-bold mt-1 text-sm">Directorate of Accounts</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Treasury Management Division</span>
                </div>

                <div className="flex flex-col bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Official Cabin / Station
                  </span>
                  <span className="text-slate-900 font-bold mt-1 text-sm">{contactInfo.cabin}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Main Treasury Vault Access</span>
                </div>

                <div className="flex flex-col bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Official Email
                  </span>
                  <span className="text-slate-900 font-bold mt-1 truncate">{contactInfo.email}</span>
                  <span className="text-[11px] text-emerald-700 mt-0.5 font-semibold">Encrypted PGP Key Active</span>
                </div>

                <div className="flex flex-col bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Official Direct Line
                  </span>
                  <span className="text-slate-900 font-bold mt-1 font-mono">{contactInfo.phone}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">PBX Intercom: {contactInfo.intercom}</span>
                </div>

                <div className="flex flex-col bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    Counter Assignment
                  </span>
                  <span className="text-slate-900 font-bold mt-1 text-sm truncate">{contactInfo.counterTill}</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">Main Student Reception Counter</span>
                </div>
              </div>
            </div>

            {/* Quick Authorization Snapshot Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-slate-800 font-bold">
                  Statutory Authority: Dual Authorization Primary Signatory for Apex Academic Trust
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#3D405B] font-bold font-mono">
                <Key className="w-3.5 h-3.5" />
                <span>HSM USB-Token: Serial #4409-APX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Bursar Performance & Operational Telemetry (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs uppercase tracking-wider font-semibold">
                Lifetime Collections Managed
              </span>
              <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-bold text-slate-900 mt-2">₹38.4 Crore</span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 text-slate-500 text-xs">
            <span className="text-slate-700 font-bold">Over 8 academic sessions</span>
            <span>&bull; Audited</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs uppercase tracking-wider font-semibold">
                Current AY Collections
              </span>
              <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-bold text-emerald-700 mt-2">₹4.18 Crore</span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 text-slate-500 text-xs">
            <span className="text-slate-800 font-bold">AY 2026-27</span>
            <span className="text-emerald-700 font-bold">(91.4% Target)</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs uppercase tracking-wider font-semibold">
                Audit Accuracy Rating
              </span>
              <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                <BadgeCheck className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-bold text-slate-900 mt-2">99.98%</span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 text-slate-500 text-xs">
            <span className="text-emerald-700 font-bold">Zero Discrepancies</span>
            <span>in Annual Ledger</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs uppercase tracking-wider font-semibold">
                Receipts Dispatched This Term
              </span>
              <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-bold text-[#3D405B] mt-2">1,842</span>
          </div>
          <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 text-slate-500 text-xs">
            <span className="text-slate-800 font-bold">SHA-256</span>
            <span>Cryptographically Signed</span>
          </div>
        </div>
      </div>

      {/* Two-Column Detailed Information Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start mb-5">
        {/* LEFT COLUMN (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* a. Educational & Professional Qualifications */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
                  <School className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-[#3D405B]">
                  Educational &amp; Professional Qualifications
                </span>
              </div>
              <span className="font-mono text-xs text-slate-500 font-bold">ICAI Reg: #098124</span>
            </div>

            <div className="flex flex-col gap-3 mt-4 text-xs">
              <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="p-2.5 bg-white text-[#3D405B] rounded-xl border border-slate-200 shrink-0">
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Fellow Chartered Accountant (FCA)
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-bold">2008</span>
                  </div>
                  <span className="text-slate-500 text-xs mt-0.5">
                    Institute of Chartered Accountants of India (ICAI)
                  </span>
                  <span className="text-slate-600 text-[11px] mt-1">
                    Specialization: Institutional Audits, Corporate Taxation &amp; Internal Control Systems
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="p-2.5 bg-white text-[#3D405B] rounded-xl border border-slate-200 shrink-0">
                  <Building className="w-5 h-5 text-slate-700" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Master of Commerce (M.Com - Financial Economics)
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-bold">2005</span>
                  </div>
                  <span className="text-slate-500 text-xs mt-0.5">
                    Delhi School of Economics (DSE), University of Delhi
                  </span>
                  <span className="text-slate-600 text-[11px] mt-1">
                    First Class with Distinction &bull; Institutional Capital Flows &amp; Auditing
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="p-2.5 bg-white text-[#3D405B] rounded-xl border border-slate-200 shrink-0">
                  <Shield className="w-5 h-5 text-slate-700" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      Certified Information Systems Auditor (CISA)
                    </span>
                    <span className="font-mono text-xs text-slate-500 font-bold">ISACA</span>
                  </div>
                  <span className="text-slate-500 text-xs mt-0.5">
                    Banking &amp; ERP Systems Integration Protocol
                  </span>
                  <span className="text-slate-600 text-[11px] mt-1">
                    Auditing campus cash ledgers, direct bank transfers and payment gateway reconciliations
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* b. Authorized Financial Roles & Statutory Powers */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-[#3D405B]">
                  Authorized Financial Roles &amp; Statutory Powers
                </span>
              </div>
              <span className="font-mono text-xs text-slate-500 font-bold">Apex Trust Gazetted</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Lock className="w-4 h-4 text-[#3D405B]" />
                  <span>Chief Cashier &amp; Vault Custodian</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Sole designated operational keyholder for Counter Till #02 and Dual-Custody Main Cash Safe #A-4 (Admin Vault).
                </p>
                <div className="font-mono text-[11px] text-[#3D405B] font-bold">
                  Auth Key ID: SEC-SAFE-A4-09
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <FileText className="w-4 h-4 text-[#3D405B]" />
                  <span>Institutional Co-Signatory</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Statutory authority to co-sign operational institutional cheques and Demand Drafts up to ₹5,00,000 per instrument.
                </p>
                <div className="font-mono text-[11px] text-[#3D405B] font-bold">
                  Bank Limit: SBI / HDFC Apex Accounts
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Fee Receipt Authenticator</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Cryptographic SHA-256 signature stamping on all student vouchers, official ledger exports, and clearance slips.
                </p>
                <div className="font-mono text-[11px] text-emerald-700 font-bold">
                  Signature Engine: Apex PKI HSM-4
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between gap-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Users className="w-4 h-4 text-[#3D405B]" />
                  <span>Fee Fixation Committee</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Appointed permanent member of the Academic Fee Fixation &amp; Concession Review Committee (Bursar Representative).
                </p>
                <div className="font-mono text-[11px] text-[#3D405B] font-bold">
                  Standing Order: APX-FIN-ORD-2022
                </div>
              </div>
            </div>
          </div>

          {/* c. Assigned Academic Fee Portfolios */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-[#3D405B]">
                  Assigned Academic Fee Portfolios
                </span>
              </div>
              <span className="font-mono text-xs text-slate-500 font-bold">AY 2026-27 Allocation</span>
            </div>

            <div className="flex flex-col gap-3 mt-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl gap-2">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">
                    B.Tech (All Engineering Disciplines)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    CSE, ECE, Mechanical, Civil &amp; AI/ML Streams
                  </span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700">
                    1,200 Active Students
                  </span>
                  <span className="font-bold text-[#3D405B]">88.5% Collected</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl gap-2">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">
                    M.Tech &amp; Postgraduate Programs
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Master of Technology, MCA &amp; PG Diploma Research Cadre
                  </span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700">
                    250 Active Students
                  </span>
                  <span className="font-bold text-emerald-700">96.2% Collected</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl gap-2">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">
                    Examination &amp; Certification Special Fee Levies
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Semester Assessments, Backlog Papers &amp; Institutional Verifications
                  </span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700">
                    Campus-Wide
                  </span>
                  <span className="font-bold text-emerald-700">100% Reconciled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* a. Security, Credentials & Terminal Access */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-[#3D405B]">
                  Security, Credentials &amp; Terminal Access
                </span>
              </div>
              <button
                onClick={() => setIsSecurityModalOpen(true)}
                className="p-1.5 hover:bg-slate-100 text-[#3D405B] rounded-lg transition-colors cursor-pointer"
                title="Update PIN / Security"
              >
                <Key className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2.5 mt-4 text-xs">
              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500">Identity SSO:</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs">
                  <span className="w-2 h-2 bg-emerald-500 inline-block rounded-full" />
                  <span>Google Enterprise SSO Verified</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500">Hardware 2FA:</span>
                <span className="font-bold text-slate-800 text-xs font-mono">FIDO2 YubiKey 5C NFC</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500">Terminal Whitelist:</span>
                <span className="text-[#3D405B] font-bold text-xs font-mono">192.168.10.45 (Bursar #02)</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500">Password Expiry:</span>
                <span className="font-bold text-slate-800 text-xs">Updated 18d ago (27d Rem)</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-slate-500">VPN / Subnet Gate:</span>
                <span className="font-mono text-slate-700 font-semibold text-xs">APX-FIN-VLAN-80 (Locked)</span>
              </div>

              <button
                onClick={() => setIsSecurityModalOpen(true)}
                className="mt-1 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[11px] rounded-xl transition-colors cursor-pointer text-center"
              >
                Change Authorization PIN
              </button>
            </div>
          </div>

          {/* b. Active Counter Cashier Session Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
                  <Receipt className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-[#3D405B]">
                  Active Till Session Telemetry
                </span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isTillLocked
                    ? "bg-rose-100 text-rose-800 border border-rose-200"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}
              >
                {isTillLocked ? "LOCKED" : "OPEN (ACTIVE)"}
              </span>
            </div>

            <div className="flex flex-col gap-3 mt-4 text-xs">
              <div className="bg-slate-50 p-3 border border-slate-200 rounded-xl flex flex-col gap-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold">
                  Active Till Session ID
                </span>
                <span className="text-[#3D405B] font-bold font-mono">SES-FIN-2026-1117-981</span>
                <span className="text-[11px] text-slate-500">Logged in: Today at 08:30:12 IST</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-50 p-3 border border-slate-200 rounded-xl flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Physical Drawer Cash
                  </span>
                  <span className="text-xl font-bold text-slate-900 mt-0.5">₹1,42,500</span>
                  <span className="text-[10px] text-slate-500">Tallied 14:15 IST</span>
                </div>

                <div className="bg-slate-50 p-3 border border-slate-200 rounded-xl flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    Next Vault Drop
                  </span>
                  <span className="text-xl font-bold text-[#3D405B] mt-0.5">17:00 IST</span>
                  <span className="text-[10px] text-slate-500">Supervisor Custody</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="font-medium text-slate-700 text-xs">Till Lock Switch</span>
                </div>
                <button
                  onClick={() => {
                    const nextState = !isTillLocked;
                    setIsTillLocked(nextState);
                    showToast(
                      nextState
                        ? "Counter Till manually LOCKED! Keyholder swipe required."
                        : "Counter Till UNLOCKED and operational."
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-xs ${
                    isTillLocked
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-[#3D405B] hover:bg-[#2d3043] text-white"
                  }`}
                >
                  {isTillLocked ? "Unlock Till" : "Lock Till Now"}
                </button>
              </div>
            </div>
          </div>

          {/* c. Statutory Archival & Compliance Seal */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-[#3D405B] rounded-lg">
                  <FileCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wide text-[#3D405B]">
                  Statutory Archival &amp; Compliance Seal
                </span>
              </div>
              <span className="font-mono text-xs text-slate-500 font-bold">REG: RBI/IT-2026</span>
            </div>

            <div className="flex flex-col gap-2.5 mt-4 text-xs text-slate-600 leading-relaxed">
              <p>
                Apex Institute is registered under Sections 12A &amp; 80G of the Income Tax Act as an authorized non-profit educational institution. All financial counters are subjected to daily continuous reconciliation.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Statutory External Auditor:</span>
                  <span className="font-bold text-slate-800">Walker Chandiok &amp; Co LLP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Last Annual Audit:</span>
                  <span className="text-emerald-700 font-bold">Clean Unqualified Opinion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT CONTACT DETAILS MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">Edit Bursar Contact Info</h3>
                  <span className="text-slate-500 text-xs">Central Identity Directory Verification</span>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-bold text-slate-600">Official Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3D405B] focus:bg-white font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase font-bold text-slate-600">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3D405B] focus:bg-white font-mono font-medium"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase font-bold text-slate-600">PBX Intercom</label>
                  <input
                    type="text"
                    value={formData.intercom}
                    onChange={(e) => setFormData({ ...formData, intercom: e.target.value })}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3D405B] focus:bg-white font-mono font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-bold text-slate-600">Office Cabin / Station</label>
                <input
                  type="text"
                  value={formData.cabin}
                  onChange={(e) => setFormData({ ...formData, cabin: e.target.value })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3D405B] focus:bg-white font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-bold text-slate-600">Counter Assignment</label>
                <input
                  type="text"
                  value={formData.counterTill}
                  onChange={(e) => setFormData({ ...formData, counterTill: e.target.value })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3D405B] focus:bg-white font-medium"
                  required
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold uppercase text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CASHIER CREDENTIAL ID CARD MODAL */}
      {isCredentialIdModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">Official Cashier Credential ID</h3>
                  <span className="text-slate-500 text-xs">Institutional Bursar Accreditation</span>
                </div>
              </div>
              <button
                onClick={() => setIsCredentialIdModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Credential ID Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#3D405B] via-[#2d3043] to-slate-900 text-white shadow-xl flex flex-col justify-between gap-4 border border-slate-700">
              {/* Card Header */}
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white text-sm">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-xs tracking-wide text-white">APEX INSTITUTE OF TECHNOLOGY</h4>
                    <p className="text-[10px] text-slate-300">Directorate of Accounts &bull; Cashier Division</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[9px] font-bold uppercase tracking-wider border border-emerald-400/30">
                  TIER-1 AUTH
                </span>
              </div>

              {/* Card Body */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-24 rounded-xl bg-slate-800 border-2 border-white/20 flex flex-col items-center justify-center text-slate-300 shrink-0 overflow-hidden">
                  <User className="w-10 h-10 text-slate-400" />
                  <span className="text-[8px] font-mono text-emerald-400 mt-1 uppercase font-bold">BURSAR</span>
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <h3 className="text-base font-bold text-white">{contactInfo.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{contactInfo.designation}</p>
                  <p className="text-[11px] text-emerald-400 font-mono font-bold mt-1">EMP-FIN-2016-309</p>
                  <p className="text-[10px] text-slate-400">Desk: {contactInfo.counterTill}</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-white/10 text-[10px] text-slate-300 font-mono">
                <div>
                  <div>VALID THRU: 10/2028</div>
                  <div className="text-slate-400 text-[9px]">TOKEN: HSM-4409-APX</div>
                </div>
                <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsCredentialIdModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold uppercase text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Badge</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECURITY PIN UPDATE MODAL */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 text-[#3D405B] rounded-lg">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">Update Cashier Authorization PIN</h3>
                  <span className="text-slate-500 text-xs">HSM Token Encrypted Transaction PIN</span>
                </div>
              </div>
              <button
                onClick={() => setIsSecurityModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSecurity} className="flex flex-col gap-3.5">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">
                This 4-to-6 digit PIN is required before committing fee realizations over ₹50,000 or overriding academic exam holds.
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-bold text-slate-600">Current Authorization PIN</label>
                <input
                  type="password"
                  maxLength={6}
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3D405B] focus:bg-white font-mono text-center tracking-widest text-lg"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-bold text-slate-600">New Authorization PIN</label>
                <input
                  type="password"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;"
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#3D405B] focus:bg-white font-mono text-center tracking-widest text-lg"
                  required
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-200 mt-2">
                <button
                  type="button"
                  onClick={() => setIsSecurityModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold uppercase text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#3D405B] hover:bg-[#2d3043] text-white rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Update PIN</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
