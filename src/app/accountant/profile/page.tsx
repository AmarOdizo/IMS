"use client";

import { useState } from "react";
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
  X
} from "lucide-react";

export default function AccountantProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editable Contact Fields
  const [contactInfo, setContactInfo] = useState({
    email: "r.kumar.finance@apex.edu.in",
    phone: "+91 98112 34567",
    intercom: "Ext 204",
    cabin: "Room 104, Admin Block",
    counterTill: "Counter Till #02",
  });

  const [formData, setFormData] = useState({ ...contactInfo });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactInfo({ ...formData });
    setIsEditModalOpen(false);
    showToast("Accountant contact details updated and verified in Central Identity Directory!");
  };

  const handleDownloadDossier = () => {
    showToast("Generating cryptographically verified Bursar Dossier PDF (SHA-256)...");
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

      {/* Main Container */}
      <div className="p-6 flex flex-col gap-6">
        {/* Breadcrumbs & Status Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 font-mono text-xs text-secondary uppercase">
              <Link href="/accountant" className="hover:text-primary transition-colors">
                Accounts &amp; Bursar Portal
              </Link>
              <span className="text-outline">/</span>
              <span>Staff Directory</span>
              <span className="text-outline">/</span>
              <span className="text-on-surface font-bold">Bursar Executive Profile</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-primary">
              Accountant Profile &amp; Financial Clearance Dossier
            </h1>
          </div>

          {/* Action Cluster */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setFormData({ ...contactInfo });
                setIsEditModalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-2 bg-surface-container text-on-surface text-xs font-mono font-bold uppercase tracking-wider hover:bg-surface-container-high transition-colors rounded-xs border border-[#cbd5e1] cursor-pointer"
            >
              <Edit className="h-3.5 w-3.5 text-secondary" />
              <span>Edit Contact Details</span>
            </button>
            <button
              onClick={handleDownloadDossier}
              className="flex items-center gap-2 px-3.5 py-2 bg-surface-container text-on-surface text-xs font-mono font-bold uppercase tracking-wider hover:bg-surface-container-high transition-colors rounded-xs border border-[#cbd5e1] cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-primary" />
              <span>Download Dossier (PDF)</span>
            </button>
            <Link
              href="/accountant/reports"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-xs font-mono font-bold uppercase tracking-wider hover:bg-primary-container transition-colors rounded-xs shadow-xs"
            >
              <Receipt className="h-3.5 w-3.5 text-secondary-container" />
              <span>View Cashier Audit Trail</span>
            </Link>
          </div>
        </div>

        {/* Status Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-primary-container px-4 py-2.5 text-on-primary font-mono text-xs rounded-sm border border-[#324769]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-secondary-container rounded-xs animate-pulse"></span>
            <span className="font-bold tracking-wider uppercase text-on-primary">
              TENURED INSTITUTIONAL BURSAR • EMP-FIN-2016-309 • ACTIVE COUNTER TILL #02
            </span>
          </div>
          <div className="flex items-center gap-3 text-on-primary-container text-[11px] font-bold">
            <span>TIER-1 AUDIT LEVEL</span>
            <span>•</span>
            <span className="text-secondary-fixed">CLEARANCE: LEVEL-A UNRESTRICTED</span>
          </div>
        </div>

        {/* Executive Profile Dossier Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-surface-container-lowest border border-[#cbd5e1] shadow-xs rounded-sm overflow-hidden">
          {/* Left: Portrait & Primary Tag (3 cols) */}
          <div className="lg:col-span-3 flex flex-col bg-surface-container-low p-5 justify-between gap-4 border-b lg:border-b-0 lg:border-r border-[#cbd5e1]">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="relative w-44 h-44 bg-primary text-secondary-container rounded-xs border-2 border-primary shadow-md flex items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                  <User className="h-20 w-20 text-secondary-fixed-dim" />
                  <span className="font-mono text-[10px] tracking-widest text-on-primary-container uppercase mt-1">
                    APEX FIN BURSAR
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-1 px-2 font-mono text-[10px] uppercase font-bold text-center tracking-wider">
                  ACTIVE CADRE BADGE
                </div>
              </div>

              <div className="flex flex-col mt-1">
                <span className="text-xl font-bold text-primary font-sans">
                  Mr. Rajesh Kumar
                </span>
                <span className="font-mono text-xs text-secondary font-bold">
                  M.Com, FCA (ICAI)
                </span>
                <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold mt-1">
                  Chief Bursar &amp; Senior Financial Officer
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 pt-3 bg-surface-container-lowest p-3 border border-[#cbd5e1] rounded-xs font-mono text-xs">
              <div className="flex justify-between items-center text-on-surface">
                <span className="text-on-surface-variant text-[11px]">TENURE:</span>
                <span className="font-bold">8 Yrs 5 Mos</span>
              </div>
              <div className="flex justify-between items-center text-on-surface">
                <span className="text-on-surface-variant text-[11px]">JOINED:</span>
                <span className="font-semibold">18 OCT 2016</span>
              </div>
              <div className="flex justify-between items-center text-on-surface">
                <span className="text-on-surface-variant text-[11px]">SIGNATURE:</span>
                <span className="text-secondary font-bold">TIER-1 AUTH</span>
              </div>
            </div>
          </div>

          {/* Right: Metadata & Institutional Routing (9 cols) */}
          <div className="lg:col-span-9 p-6 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#cbd5e1]">
                <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
                  OFFICIAL APEX IMS IDENTIFICATION PROFILE
                </span>
                <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-mono text-xs font-bold rounded-xs">
                  STATIONED: ADM-B104
                </span>
              </div>

              {/* 6 Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                <div className="flex flex-col bg-surface-container-low p-3 border border-[#cbd5e1] rounded-xs">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                    Employee ID
                  </span>
                  <span className="text-on-surface font-bold mt-1 text-sm">EMP-FIN-2016-309</span>
                  <span className="text-[11px] text-secondary mt-0.5 font-sans">Pay Cadre: Grade-IX Fin</span>
                </div>

                <div className="flex flex-col bg-surface-container-low p-3 border border-[#cbd5e1] rounded-xs">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                    Department
                  </span>
                  <span className="text-on-surface font-bold mt-1 text-sm font-sans">Directorate of Accounts</span>
                  <span className="text-[11px] text-secondary mt-0.5 font-sans">Treasury Management Division</span>
                </div>

                <div className="flex flex-col bg-surface-container-low p-3 border border-[#cbd5e1] rounded-xs">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                    Official Cabin / Station
                  </span>
                  <span className="text-on-surface font-bold mt-1 text-sm font-sans">{contactInfo.cabin}</span>
                  <span className="text-[11px] text-secondary mt-0.5 font-sans">Main Treasury Vault Access</span>
                </div>

                <div className="flex flex-col bg-surface-container-low p-3 border border-[#cbd5e1] rounded-xs">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                    Official Email
                  </span>
                  <span className="text-on-surface font-bold mt-1 truncate">{contactInfo.email}</span>
                  <span className="text-[11px] text-[#047857] mt-0.5 font-sans font-semibold">Encrypted PGP Key Active</span>
                </div>

                <div className="flex flex-col bg-surface-container-low p-3 border border-[#cbd5e1] rounded-xs">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                    Official Direct Line
                  </span>
                  <span className="text-on-surface font-bold mt-1">{contactInfo.phone}</span>
                  <span className="text-[11px] text-secondary mt-0.5 font-sans">PBX Intercom: {contactInfo.intercom}</span>
                </div>

                <div className="flex flex-col bg-surface-container-low p-3 border border-[#cbd5e1] rounded-xs">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                    Counter Assignment
                  </span>
                  <span className="text-on-surface font-bold mt-1 text-sm font-sans">{contactInfo.counterTill}</span>
                  <span className="text-[11px] text-secondary mt-0.5 font-sans">Main Student Reception Counter</span>
                </div>
              </div>
            </div>

            {/* Quick Authorization Snapshot Strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-container p-3 border border-[#cbd5e1] rounded-xs font-mono text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span className="text-on-surface font-bold">
                  Statutory Authority: Dual Authorization Primary Signatory for Apex Academic Trust
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-secondary font-bold">
                <Key className="h-3.5 w-3.5" />
                <span>HSM USB-Token: Serial #4409-APX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Bursar Performance & Operational Telemetry (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Metric 1 */}
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-primary rounded-sm">
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">
                  Lifetime Collections Managed
                </span>
                <Wallet className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-2xl font-bold font-mono text-primary mt-2">₹38.4 Crore</span>
            </div>
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-[#eff4ff] text-on-surface-variant font-mono text-xs">
              <span className="text-secondary font-bold">Over 8 academic years</span>
              <span>• Audited</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-secondary rounded-sm">
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">
                  Current AY Collections
                </span>
                <TrendingUp className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-2xl font-bold font-mono text-primary mt-2">₹4.18 Crore</span>
            </div>
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-[#eff4ff] text-on-surface-variant font-mono text-xs">
              <span className="text-on-surface font-bold">AY 2024-25</span>
              <span className="text-secondary font-bold">(91.4% Target)</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-secondary-container rounded-sm">
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">
                  Audit Accuracy Rating
                </span>
                <BadgeCheck className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-2xl font-bold font-mono text-primary mt-2">99.98%</span>
            </div>
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-[#eff4ff] text-on-surface-variant font-mono text-xs">
              <span className="text-[#047857] font-bold">Zero Discrepancies</span>
              <span>in FY 2023-24</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs relative overflow-hidden flex flex-col justify-between border-l-4 border-l-outline rounded-sm">
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold">
                  Receipts Dispatched This Term
                </span>
                <FileCheck className="h-4 w-4 text-secondary" />
              </div>
              <span className="text-2xl font-bold font-mono text-primary mt-2">1,842</span>
            </div>
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-[#eff4ff] text-on-surface-variant font-mono text-xs">
              <span className="text-on-surface font-bold">SHA-256</span>
              <span>Cryptographically Signed</span>
            </div>
          </div>
        </div>

        {/* Two-Column Detailed Information Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* a. Educational & Professional Qualifications */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm">
              <div className="flex items-center justify-between pb-2 bg-surface-container-low px-3 py-2 border border-[#cbd5e1] rounded-xs">
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    Educational &amp; Professional Qualifications
                  </span>
                </div>
                <span className="font-mono text-xs text-secondary font-bold">ICAI #098124</span>
              </div>

              <div className="flex flex-col gap-2.5 mt-3">
                <div className="flex items-start gap-3 bg-surface p-3 border border-[#cbd5e1] rounded-xs">
                  <div className="p-2 bg-surface-container text-primary rounded-xs">
                    <BadgeCheck className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary font-sans">
                        Fellow Chartered Accountant (FCA)
                      </span>
                      <span className="font-mono text-xs text-secondary font-bold">2008</span>
                    </div>
                    <span className="text-xs text-on-surface-variant mt-0.5">
                      Institute of Chartered Accountants of India (ICAI)
                    </span>
                    <span className="font-mono text-xs text-secondary mt-1">
                      Specialization: Institutional Audits, Corporate Taxation &amp; Internal Control Systems
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-surface p-3 border border-[#cbd5e1] rounded-xs">
                  <div className="p-2 bg-surface-container text-primary rounded-xs">
                    <Building className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary font-sans">
                        Master of Commerce (M.Com - Financial Economics)
                      </span>
                      <span className="font-mono text-xs text-secondary font-bold">2005</span>
                    </div>
                    <span className="text-xs text-on-surface-variant mt-0.5">
                      Delhi School of Economics (DSE), University of Delhi
                    </span>
                    <span className="font-mono text-xs text-secondary mt-1">
                      First Class with Distinction • Institutional Capital Flows
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-surface p-3 border border-[#cbd5e1] rounded-xs">
                  <div className="p-2 bg-surface-container text-primary rounded-xs">
                    <Shield className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary font-sans">
                        Certified Information Systems Auditor (CISA)
                      </span>
                      <span className="font-mono text-xs text-secondary font-bold">ISACA</span>
                    </div>
                    <span className="text-xs text-on-surface-variant mt-0.5">
                      Banking &amp; ERP Systems Integration Protocol
                    </span>
                    <span className="font-mono text-xs text-secondary mt-1">
                      Auditing campus cash ledgers, direct bank transfers and payment gateway reconciliations
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* b. Authorized Financial Roles & Statutory Powers */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm">
              <div className="flex items-center justify-between pb-2 bg-surface-container-low px-3 py-2 border border-[#cbd5e1] rounded-xs">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    Authorized Financial Roles &amp; Statutory Powers
                  </span>
                </div>
                <span className="font-mono text-xs text-secondary font-bold">Apex Trust Gazetted</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="p-3 bg-surface border border-[#cbd5e1] rounded-xs flex flex-col justify-between gap-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <Lock className="h-4 w-4 text-secondary" />
                    <span>Chief Cashier &amp; Vault Custodian</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Sole designated operational keyholder for Counter Till #02 and Dual-Custody Main Cash Safe #A-4 (Admin Vault).
                  </p>
                  <div className="font-mono text-xs text-secondary font-semibold">
                    Auth Key ID: SEC-SAFE-A4-09
                  </div>
                </div>

                <div className="p-3 bg-surface border border-[#cbd5e1] rounded-xs flex flex-col justify-between gap-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <FileText className="h-4 w-4 text-secondary" />
                    <span>Institutional Co-Signatory</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Statutory authority to co-sign operational institutional cheques and Demand Drafts up to ₹5,00,000 per instrument.
                  </p>
                  <div className="font-mono text-xs text-secondary font-semibold">
                    Bank Limit: SBI / HDFC Apex Accounts
                  </div>
                </div>

                <div className="p-3 bg-surface border border-[#cbd5e1] rounded-xs flex flex-col justify-between gap-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <ShieldCheck className="h-4 w-4 text-secondary" />
                    <span>Fee Receipt Authenticator</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Cryptographic SHA-256 signature stamping on all student vouchers, official ledger exports, and clearance slips.
                  </p>
                  <div className="font-mono text-xs text-secondary font-semibold">
                    Signature Engine: Apex PKI HSM-4
                  </div>
                </div>

                <div className="p-3 bg-surface border border-[#cbd5e1] rounded-xs flex flex-col justify-between gap-2">
                  <div className="flex items-center gap-2 text-primary font-bold text-xs">
                    <Users className="h-4 w-4 text-secondary" />
                    <span>Fee Fixation Committee</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Appointed permanent member of the Academic Fee Fixation &amp; Concession Review Committee (Bursar Representative).
                  </p>
                  <div className="font-mono text-xs text-secondary font-semibold">
                    Standing Order: APX-FIN-ORD-2022
                  </div>
                </div>
              </div>
            </div>

            {/* c. Assigned Academic Fee Portfolios */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm">
              <div className="flex items-center justify-between pb-2 bg-surface-container-low px-3 py-2 border border-[#cbd5e1] rounded-xs">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    Assigned Academic Fee Portfolios
                  </span>
                </div>
                <span className="font-mono text-xs text-secondary font-bold">AY 2024-25 Cadre Allocation</span>
              </div>

              <div className="flex flex-col gap-2.5 mt-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-surface border border-[#cbd5e1] rounded-xs gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">
                      B.Tech (All Engineering Disciplines)
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      CSE, ECE, Mechanical, Civil &amp; AI/ML Streams
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface rounded-xs">
                      1,200 Active Students
                    </span>
                    <span className="text-secondary font-bold">88.5% Collected</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-surface border border-[#cbd5e1] rounded-xs gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">
                      M.Tech &amp; Postgraduate Programs
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Master of Technology, MCA &amp; PG Diploma Research Cadre
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface rounded-xs">
                      250 Active Students
                    </span>
                    <span className="text-secondary font-bold">96.2% Collected</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-surface border border-[#cbd5e1] rounded-xs gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-on-surface">
                      Examination &amp; Certification Special Fee Levies
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Semester Assessments, Backlog Papers &amp; Institutional Verifications
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="px-2 py-0.5 bg-surface-container text-on-surface rounded-xs">
                      Campus-Wide
                    </span>
                    <span className="text-secondary font-bold">100% Reconciled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* a. Security, Credentials & Terminal Access */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm">
              <div className="flex items-center justify-between pb-2 bg-surface-container-low px-3 py-2 border border-[#cbd5e1] rounded-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    Security, Credentials &amp; Terminal Access
                  </span>
                </div>
                <Key className="h-4 w-4 text-secondary" />
              </div>

              <div className="flex flex-col gap-2 mt-3 font-mono text-xs">
                <div className="flex justify-between items-center p-2.5 bg-surface border border-[#cbd5e1] rounded-xs">
                  <span className="text-on-surface-variant">Identity SSO:</span>
                  <div className="flex items-center gap-1.5 text-on-surface font-bold text-[11px]">
                    <span className="w-2 h-2 bg-secondary inline-block rounded-xs"></span>
                    <span>AD / Google Enterprise Verified</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-surface border border-[#cbd5e1] rounded-xs">
                  <span className="text-on-surface-variant">Hardware 2FA:</span>
                  <span className="text-on-surface font-bold text-[11px]">FIDO2 YubiKey 5C NFC</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-surface border border-[#cbd5e1] rounded-xs">
                  <span className="text-on-surface-variant">Terminal Whitelist:</span>
                  <span className="text-primary font-bold text-[11px]">192.168.10.45 (Bursar #02)</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-surface border border-[#cbd5e1] rounded-xs">
                  <span className="text-on-surface-variant">Password Expiry:</span>
                  <span className="text-secondary font-bold text-[11px]">Updated 18d ago (27d Rem)</span>
                </div>

                <div className="flex justify-between items-center p-2.5 bg-surface border border-[#cbd5e1] rounded-xs">
                  <span className="text-on-surface-variant">VPN / Subnet Gate:</span>
                  <span className="text-on-surface font-semibold text-[11px]">APX-FIN-VLAN-80 (Locked)</span>
                </div>
              </div>
            </div>

            {/* b. Active Counter Cashier Session Details */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm">
              <div className="flex items-center justify-between pb-2 bg-surface-container-low px-3 py-2 border border-[#cbd5e1] rounded-xs">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    Active Till Session Telemetry
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[10px] font-bold rounded-xs">
                  OPEN
                </span>
              </div>

              <div className="flex flex-col gap-2.5 mt-3 font-mono text-xs">
                <div className="bg-surface p-2.5 border border-[#cbd5e1] rounded-xs flex flex-col gap-0.5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                    Active Till Session ID
                  </span>
                  <span className="text-primary font-bold">SES-FIN-2025-0328-981</span>
                  <span className="text-[11px] text-secondary">Logged in: Today at 08:30:12 IST</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-surface p-2.5 border border-[#cbd5e1] rounded-xs flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                      Physical Drawer Cash
                    </span>
                    <span className="text-lg font-bold text-primary mt-0.5">₹1,42,500</span>
                    <span className="text-[10px] text-secondary">Tallied 14:15 IST</span>
                  </div>

                  <div className="bg-surface p-2.5 border border-[#cbd5e1] rounded-xs flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                      Next Vault Drop
                    </span>
                    <span className="text-lg font-bold text-on-surface mt-0.5">17:00 IST</span>
                    <span className="text-[10px] text-secondary">Supervisor Custody</span>
                  </div>
                </div>

                <div className="p-2.5 bg-surface-container border border-[#cbd5e1] rounded-xs flex items-center justify-between text-on-surface">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-secondary" />
                    <span className="font-bold text-[11px]">Till Auto-Lock (5 min inactive)</span>
                  </div>
                  <button
                    onClick={() => showToast("Counter Till locked manually! Keyholder swipe required to reactivate.")}
                    className="px-2.5 py-1 bg-primary text-on-primary font-bold text-[10px] uppercase tracking-wider rounded-xs cursor-pointer hover:bg-primary-container"
                  >
                    Lock Now
                  </button>
                </div>
              </div>
            </div>

            {/* c. Statutory Archival & Compliance Seal */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm">
              <div className="flex items-center justify-between pb-2 bg-surface-container-low px-3 py-2 border border-[#cbd5e1] rounded-xs">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                    Statutory Archival &amp; Compliance Seal
                  </span>
                </div>
                <span className="font-mono text-xs text-secondary font-bold">REG: RBI/IT-2024</span>
              </div>

              <div className="flex flex-col gap-2 mt-3 text-xs text-on-surface-variant leading-relaxed">
                <p>
                  Apex Institute is registered under Sections 12A &amp; 80G of the Income Tax Act as an authorized non-profit educational institution. All financial counters are subjected to daily continuous reconciliation.
                </p>
                <div className="p-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-xs font-mono text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span>Statutory External Auditor:</span>
                    <span className="font-bold text-primary">Walker Chandiok &amp; Co LLP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Annual Audit:</span>
                    <span className="text-[#047857] font-bold">14 Sep 2024 (Clean Opinion)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT CONTACT DETAILS MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-md w-full border-2 border-primary shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#cbd5e1] pb-3">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">Edit Bursar Contact Info</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-outline hover:text-primary p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveContact} className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-outline">Official Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-8 px-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-xs text-primary focus:outline-none focus:border-secondary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-outline">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-8 px-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-xs text-primary focus:outline-none focus:border-secondary"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-outline">PBX Intercom</label>
                  <input
                    type="text"
                    value={formData.intercom}
                    onChange={(e) => setFormData({ ...formData, intercom: e.target.value })}
                    className="h-8 px-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-xs text-primary focus:outline-none focus:border-secondary"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-outline">Office Cabin / Station</label>
                <input
                  type="text"
                  value={formData.cabin}
                  onChange={(e) => setFormData({ ...formData, cabin: e.target.value })}
                  className="h-8 px-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-xs text-primary focus:outline-none focus:border-secondary"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-outline">Counter Assignment</label>
                <input
                  type="text"
                  value={formData.counterTill}
                  onChange={(e) => setFormData({ ...formData, counterTill: e.target.value })}
                  className="h-8 px-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-xs text-primary focus:outline-none focus:border-secondary"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#cbd5e1] mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-[#cbd5e1] text-xs font-mono font-bold uppercase hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-mono font-bold uppercase tracking-wider hover:bg-primary-container"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
