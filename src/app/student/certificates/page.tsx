"use client";

import { useState } from "react";
import {
  FileCheck,
  ShieldCheck,
  Download,
  Printer,
  QrCode,
  Search,
  PlusCircle,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Lock,
  Building,
  GraduationCap,
  Calendar,
  Award,
  Hash,
  Send,
  Sparkles,
  Info
} from "lucide-react";

interface CertificateItem {
  id: string;
  refNo: string;
  title: string;
  category: "Bonafide" | "Transcript" | "Award" | "Clearance";
  typeBadge: string;
  issueDate: string;
  validUntil: string;
  purpose: string;
  merkleHash: string;
  status: "Active" | "Permanent" | "Archived";
  cgpaOrRemark?: string;
  bodyText: string;
  signatory1: { name: string; title: string };
  signatory2: { name: string; title: string };
}

const certificatesData: CertificateItem[] = [
  {
    id: "cert-1",
    refNo: "APX-CERT-BNF-2025-0842",
    title: "Bonafide Student Certificate",
    category: "Bonafide",
    typeBadge: "Administrative Attestation",
    issueDate: "12 February 2025",
    validUntil: "31 July 2025",
    purpose: "Passport & Visa Application / Educational Fare Concession",
    merkleHash: "0x8e4a9f1cb20914c6e9381f9a8837dbef844910",
    status: "Active",
    bodyText:
      "This is to certify that Rahul Sharma, Son of Mr. Rajesh Sharma, Enrolment ID APX-2023-CS-042, is a bonafide full-time undergraduate student of Apex Institute of Technology & Management pursuing Bachelor of Technology (B.Tech) in Computer Science & Engineering (AY 2023–2027). He maintains good moral character and regular attendance.",
    signatory1: { name: "Dr. Margaret Vance", title: "Registrar & Dean of Academics" },
    signatory2: { name: "Prof. Kenneth Sterling", title: "Dean of Student Affairs" }
  },
  {
    id: "cert-2",
    refNo: "APX-TRN-2024-3918",
    title: "Semester III Official Grade Transcript",
    category: "Transcript",
    typeBadge: "Permanent Credential",
    issueDate: "18 January 2025",
    validUntil: "Permanent Record",
    purpose: "Higher Education / Competitive Scholarship & Research Fellowship",
    merkleHash: "0x3f7b2c91da65e8a011749c8d5512be03a7482f",
    status: "Permanent",
    cgpaOrRemark: "SGPA: 3.88 / CGPA: 3.82 • 68 Credits Earned",
    bodyText:
      "Official Academic Transcript verifying that Rahul Sharma (Roll: APX-2023-CS-042) has successfully completed Semester III examinations in Computer Science & Engineering with distinction. The student has accumulated 68 credits with a cumulative Grade Point Average of 3.82 on a 4.00 scale, ranking in the top 3% cohort.",
    signatory1: { name: "Dr. Margaret Vance", title: "Controller of Examinations" },
    signatory2: { name: "Dr. Alan Turing Rao", title: "Head, Dept of CSE" }
  },
  {
    id: "cert-3",
    refNo: "APX-AWD-2024-0199",
    title: "Merit Excellence & Dean's List Award",
    category: "Award",
    typeBadge: "Honor Credential",
    issueDate: "05 December 2024",
    validUntil: "Lifetime Distinction",
    purpose: "Academic Honor Roll & Merit Recognition",
    merkleHash: "0x91cc45e78a2301fae569bb20509420afc51829",
    status: "Permanent",
    cgpaOrRemark: "Dean's Honor Roll • Rank #3 Batch of 2027",
    bodyText:
      "In recognition of outstanding academic brilliance, scholastic tenacity, and exceptional performance, the Dean's Council of Apex Institute of Technology & Management proudly confers the Dean's Honor Roll Citation upon Rahul Sharma for maintaining an SGPA exceeding 3.85 during the Academic Year 2024–25.",
    signatory1: { name: "Prof. Kenneth Sterling", title: "President, Board of Governors" },
    signatory2: { name: "Dr. Margaret Vance", title: "Dean of Academic Affairs" }
  }
];

export default function StudentCertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem>(certificatesData[0]);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Verification modal state
  const [verifyInput, setVerifyInput] = useState("APX-CERT-BNF-2025-0842");
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "success" | "invalid">("success");

  // Requisition modal form state
  const [reqType, setReqType] = useState("Bonafide Student Certificate");
  const [reqPurpose, setReqPurpose] = useState("");
  const [reqUrgency, setReqUrgency] = useState("Standard (3 Working Days)");
  const [reqCopies, setReqCopies] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleVerify = () => {
    if (verifyInput.trim().toUpperCase().includes("APX")) {
      setVerifyStatus("success");
    } else {
      setVerifyStatus("invalid");
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRequestModalOpen(false);
      setReqPurpose("");
      showToast(`Requisition submitted! Token #REQ-${Math.floor(1000 + Math.random() * 9000)} generated.`);
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

      {/* Page Command Header */}
      <div className="px-6 py-5 bg-surface-container-lowest border-b border-[#0D2545]/15 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                Student Portal
              </span>
              <span className="text-[11px] text-outline">/</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-bold">
                Credentials & Documents
              </span>
              <span className="ml-2 px-1.5 py-0.5 bg-secondary-container text-primary text-[10px] font-mono uppercase font-bold tracking-tight rounded-sm">
                Blockchain Synced
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-primary flex items-center gap-2.5">
              Verified Academic Credentials & Certificates Registry
              <ShieldCheck className="h-6 w-6 text-secondary" />
            </h1>
            <p className="text-xs font-mono text-on-surface-variant mt-0.5">
              Cryptographically anchored institutional credentials, provisional degrees, and administrative attestations.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setVerifyInput(selectedCert.refNo);
                setVerifyStatus("success");
                setIsVerifyModalOpen(true);
              }}
              className="px-3.5 py-2 bg-surface-container-low hover:bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 border border-[#cbd5e1] transition-colors shadow-sm"
            >
              <QrCode className="h-4 w-4 text-secondary" />
              <span>Verify Authenticity</span>
            </button>
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="px-3.5 py-2 bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-colors shadow-sm"
            >
              <PlusCircle className="h-4 w-4 text-secondary-container" />
              <span>Request New Certificate / Attestation</span>
            </button>
          </div>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#0D2545]/10">
          <div className="bg-surface-container-low p-3 rounded-sm border-l-2 border-primary">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline block">Total Issued</span>
            <span className="text-base font-bold text-primary">3 Credentials</span>
          </div>
          <div className="bg-surface-container-low p-3 rounded-sm border-l-2 border-[#047857]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline block">Blockchain Sync</span>
            <span className="text-base font-bold text-[#047857] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#047857] animate-pulse"></span>
              100% Immutable
            </span>
          </div>
          <div className="bg-surface-container-low p-3 rounded-sm border-l-2 border-secondary">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline block">Pending Requests</span>
            <span className="text-base font-bold text-secondary">0 Open Inquiries</span>
          </div>
          <div className="bg-surface-container-low p-3 rounded-sm border-l-2 border-tertiary-container">
            <span className="text-[10px] font-mono uppercase tracking-wider text-outline block">Digital Attestations</span>
            <span className="text-base font-bold text-on-surface">Valid AY 2024-25</span>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Workspace (6 Cols / 6 Cols Balanced) */}
      <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Registered Certificates Dossier (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-secondary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                Issued Credentials Dossier ({certificatesData.length})
              </h2>
            </div>
            <span className="text-[11px] font-mono text-outline">Click any card to inspect parchment</span>
          </div>

          {/* Certificate Cards */}
          {certificatesData.map((cert) => {
            const isSelected = selectedCert.id === cert.id;
            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`cursor-pointer p-5 rounded-sm transition-all relative ${
                  isSelected
                    ? "bg-surface-container-lowest border-2 border-primary shadow-[2px_2px_0_0_#0d2545]"
                    : "bg-surface-container-lowest border border-[#cbd5e1] hover:border-secondary shadow-sm"
                }`}
              >
                {/* Active indicator dot */}
                {isSelected && (
                  <div className="absolute -top-1.5 -left-1.5 h-3 w-3 rounded-full bg-secondary ring-2 ring-white"></div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-surface-container text-primary border border-[#c4c6cf] text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary inline-block"></span>
                        {cert.typeBadge}
                      </span>
                      <span className="text-[11px] font-mono text-outline uppercase tracking-wider">
                        {cert.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold uppercase text-primary tracking-tight mt-2">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-mono text-secondary font-bold tracking-tight mt-0.5">
                      Ref: {cert.refNo}
                    </div>
                  </div>

                  <div className="p-2 bg-surface-container rounded text-primary shrink-0">
                    <ShieldCheck className="h-6 w-6 text-secondary" />
                  </div>
                </div>

                {/* Validity Grid */}
                <div className="mt-3.5 pt-3 border-t border-[#eff4ff] grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-outline block">Issue Date</span>
                    <span className="font-mono text-on-surface font-semibold">{cert.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-outline block">Valid Until</span>
                    <span className="font-mono text-on-surface font-semibold">{cert.validUntil}</span>
                  </div>
                </div>

                {/* Purpose Note */}
                <div className="mt-2.5 p-2 bg-surface-container-low text-xs text-on-surface flex items-start gap-2 border border-[#eff4ff]">
                  <Info className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-primary">Purpose:</strong> {cert.purpose}
                  </span>
                </div>

                {cert.cgpaOrRemark && (
                  <div className="mt-2 px-2 py-1 bg-surface-container text-xs font-mono text-primary font-bold">
                    {cert.cgpaOrRemark}
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="mt-3.5 pt-3 border-t border-[#eff4ff] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[#047857] font-mono text-[11px] uppercase font-semibold">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Anchor: {cert.merkleHash.substring(0, 14)}...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(cert);
                      }}
                      className="px-3 py-1 bg-surface-container hover:bg-secondary-container text-primary font-mono text-[11px] uppercase font-bold tracking-wider transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`Downloading signed PDF: ${cert.refNo}.pdf`);
                      }}
                      className="px-3 py-1 bg-primary hover:bg-primary-container text-on-primary font-mono text-[11px] uppercase font-bold tracking-wider transition-colors flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      <span>Vector A4 PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Security & Regulatory Bylaws Card */}
          <div className="p-4 bg-surface-container-lowest border border-[#cbd5e1] rounded-sm text-xs font-mono text-on-surface-variant flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-[11px]">
              <Lock className="h-3.5 w-3.5 text-secondary" />
              <span>Verifiable Digital Signatures Standard</span>
            </div>
            <p className="text-[11px] leading-relaxed text-outline">
              All credentials generated by Apex Institute are anchored to an immutable distributed Merkle tree. 
              Physical printouts are valid with QR scan authentication under IT Act 2000 §4 and AICTE Digital Bylaws.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Official Institutional Certificate Parchment Replica (6 Cols - Sticky) */}
        <div className="lg:col-span-6 flex flex-col gap-3 lg:sticky lg:top-20">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-secondary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                A4 Certificate Replica View
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-[11px] uppercase font-bold tracking-wider flex items-center gap-1.5 border border-[#cbd5e1] transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => showToast(`Generating high-res print PDF for ${selectedCert.refNo}...`)}
                className="px-3 py-1 bg-primary hover:bg-primary-container text-on-primary font-mono text-[11px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download A4 PDF</span>
              </button>
            </div>
          </div>

          {/* Parchment Box */}
          <div className="bg-[#FAFBFD] border-4 border-[#0D2545] p-8 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[580px]">
            {/* Ornamental Border Corners */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-secondary pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-secondary pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-secondary pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-secondary pointer-events-none"></div>

            {/* Institutional Header */}
            <div className="flex flex-col items-center text-center pb-4 border-b-2 border-[#0D2545]/20">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="h-9 w-9 bg-primary text-secondary-container font-black text-lg flex items-center justify-center rounded-sm shadow-sm">
                  A
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="font-headline text-base font-black uppercase tracking-tight text-primary leading-tight">
                    Apex Institute of Technology & Management
                  </h3>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-secondary font-bold">
                    Autonomous Institute • Affiliated to State Technological University
                  </span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-outline uppercase tracking-wider">
                NAAC Accredited Grade &apos;A++&apos; • ISO 9001:2015 Certified Campus • Institutional Registry
              </div>
              <div className="mt-1 px-3 py-0.5 bg-surface-container font-mono text-[9px] text-primary font-bold tracking-widest uppercase">
                Official Credential Reference: {selectedCert.refNo}
              </div>
            </div>

            {/* Certificate Title & Ribbon */}
            <div className="text-center my-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-secondary font-bold block mb-1">
                This Is To Officially Certify That
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-black uppercase tracking-tight text-primary pb-2 border-b-2 border-dashed border-secondary/40 inline-block px-4">
                {selectedCert.title}
              </h2>
            </div>

            {/* Certificate Body Text */}
            <div className="px-4 py-2 text-center text-sm leading-relaxed text-on-surface font-serif">
              <p className="mb-4">{selectedCert.bodyText}</p>
              <div className="inline-grid grid-cols-2 gap-x-8 gap-y-1 text-left font-mono text-xs bg-surface-container-low p-3 border border-[#cbd5e1] rounded-sm max-w-md mx-auto">
                <span className="text-outline uppercase text-[10px]">Student Name:</span>
                <span className="font-bold text-primary">Rahul Sharma</span>
                <span className="text-outline uppercase text-[10px]">Enrolment ID:</span>
                <span className="font-bold text-primary">APX-2023-CS-042</span>
                <span className="text-outline uppercase text-[10px]">Academic Degree:</span>
                <span className="font-bold text-primary">B.Tech Computer Science</span>
                <span className="text-outline uppercase text-[10px]">Date of Certification:</span>
                <span className="font-bold text-primary">{selectedCert.issueDate}</span>
              </div>
            </div>

            {/* Signatures & Seal Row */}
            <div className="mt-8 pt-4 border-t-2 border-[#0D2545]/20 grid grid-cols-3 items-end gap-3 text-center">
              {/* Signatory 1 */}
              <div className="flex flex-col items-center">
                <div className="h-9 w-28 border-b border-primary/40 flex items-center justify-center font-serif italic text-primary/70 text-xs">
                  {selectedCert.signatory1.name}
                </div>
                <span className="text-[10px] font-bold text-primary uppercase font-mono mt-1">
                  {selectedCert.signatory1.name}
                </span>
                <span className="text-[8.5px] font-mono text-outline uppercase">
                  {selectedCert.signatory1.title}
                </span>
              </div>

              {/* Institutional Gold Emboss Seal Simulation */}
              <div className="flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full border-2 border-secondary bg-gradient-to-tr from-secondary-container/40 via-white to-secondary-container/20 flex flex-col items-center justify-center p-1 shadow-inner">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="text-[6.5px] font-mono uppercase font-black text-primary leading-tight mt-0.5">
                    SEAL OF APEX
                  </span>
                </div>
                <span className="text-[8px] font-mono text-outline uppercase mt-1">Institutional Seal</span>
              </div>

              {/* Signatory 2 */}
              <div className="flex flex-col items-center">
                <div className="h-9 w-28 border-b border-primary/40 flex items-center justify-center font-serif italic text-primary/70 text-xs">
                  {selectedCert.signatory2.name}
                </div>
                <span className="text-[10px] font-bold text-primary uppercase font-mono mt-1">
                  {selectedCert.signatory2.name}
                </span>
                <span className="text-[8.5px] font-mono text-outline uppercase">
                  {selectedCert.signatory2.title}
                </span>
              </div>
            </div>

            {/* Bottom Security Watermark Bar */}
            <div className="mt-4 pt-2 border-t border-[#cbd5e1] flex items-center justify-between text-[9px] font-mono text-outline">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-[#047857]" />
                <span>SHA-256 Digest: {selectedCert.merkleHash}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Scan QR for instant campus node verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Verify Document Authenticity */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg border-2 border-primary shadow-[4px_4px_0_0_#0d2545] p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">Verify Document Authenticity</h3>
              </div>
              <button
                onClick={() => setIsVerifyModalOpen(false)}
                className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 flex flex-col gap-3">
              <label className="text-xs font-mono uppercase font-bold text-on-surface-variant">
                Document Serial Number or Merkle Hash
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={verifyInput}
                  onChange={(e) => setVerifyInput(e.target.value)}
                  placeholder="e.g. APX-CERT-BNF-2025-0842"
                  className="flex-1 px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] font-mono text-xs text-primary focus:outline-none focus:border-primary"
                />
                <button
                  onClick={handleVerify}
                  className="px-4 py-2 bg-primary text-on-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-primary-container transition-colors"
                >
                  Verify
                </button>
              </div>

              {verifyStatus === "success" && (
                <div className="p-3 bg-[#ecfdf5] border border-[#a7f3d0] flex items-start gap-2.5 mt-2">
                  <CheckCircle2 className="h-5 w-5 text-[#047857] shrink-0 mt-0.5" />
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-[#047857] uppercase tracking-wide">
                      Ledger Verification Passed
                    </span>
                    <span className="font-mono text-on-surface text-[11px] mt-0.5">
                      Hash: {selectedCert.merkleHash}
                    </span>
                    <span className="text-[11px] text-on-surface-variant mt-0.5">
                      Issued to: <strong>Rahul Sharma (APX-2023-CS-042)</strong> • Signed by Registrar & Dean
                    </span>
                  </div>
                </div>
              )}

              {verifyStatus === "invalid" && (
                <div className="p-3 bg-[#fef2f2] border border-[#fecaca] flex items-start gap-2.5 mt-2">
                  <AlertCircle className="h-5 w-5 text-error shrink-0 mt-0.5" />
                  <div className="flex flex-col text-xs text-error">
                    <span className="font-bold uppercase tracking-wide">Verification Failed</span>
                    <span className="text-[11px] text-on-surface-variant mt-0.5">
                      No matching record found in institutional ledger. Ensure correct serial prefix &apos;APX-&apos;.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#eff4ff] flex justify-end gap-2">
              <button
                onClick={() => setIsVerifyModalOpen(false)}
                className="px-4 py-1.5 bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Request New Certificate / Attestation */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg border-2 border-primary shadow-[4px_4px_0_0_#0d2545] p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-secondary" />
                <h3 className="text-base font-bold uppercase text-primary">
                  Request New Certificate / Attestation
                </h3>
              </div>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit} className="py-4 flex flex-col gap-4 text-xs">
              <div>
                <label className="font-mono uppercase font-bold text-on-surface-variant block mb-1">
                  Certificate / Document Type
                </label>
                <select
                  value={reqType}
                  onChange={(e) => setReqType(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] font-mono text-xs text-primary focus:outline-none focus:border-primary"
                >
                  <option value="Bonafide Student Certificate">Bonafide Student Certificate</option>
                  <option value="Character Certificate">Character & Conduct Certificate</option>
                  <option value="Provisional Degree Certificate">Provisional Degree Certificate</option>
                  <option value="Migration & Clearance Certificate">Migration & Clearance Certificate</option>
                  <option value="No Objection Certificate (NOC)">No Objection Certificate (NOC) for Internship</option>
                  <option value="Medium of Instruction (English)">Medium of Instruction Certificate</option>
                </select>
              </div>

              <div>
                <label className="font-mono uppercase font-bold text-on-surface-variant block mb-1">
                  Purpose / Intended Destination *
                </label>
                <textarea
                  required
                  rows={2}
                  value={reqPurpose}
                  onChange={(e) => setReqPurpose(e.target.value)}
                  placeholder="e.g. Visa application to Embassy of Germany / Scholarship application"
                  className="w-full px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] font-mono text-xs text-primary focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono uppercase font-bold text-on-surface-variant block mb-1">
                    Processing SLA
                  </label>
                  <select
                    value={reqUrgency}
                    onChange={(e) => setReqUrgency(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] font-mono text-xs text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="Standard (3 Working Days)">Standard (3 Working Days) • Free</option>
                    <option value="Tatkal Express (24h)">Tatkal Express (24h) • ₹250</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono uppercase font-bold text-on-surface-variant block mb-1">
                    Required Hard Copies
                  </label>
                  <select
                    value={reqCopies}
                    onChange={(e) => setReqCopies(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-lowest border border-[#cbd5e1] font-mono text-xs text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="1">1 Original Copy</option>
                    <option value="2">2 Original Copies</option>
                    <option value="3">3 Original Copies</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1] text-[11px] text-outline font-mono">
                The registrar desk will review academic clearance and bursar fee status before dispatch. 
                Digitally signed soft-copy will be available in your portal upon approval.
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#eff4ff]">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-4 py-2 bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-primary text-on-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-primary-container transition-colors flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSubmitting ? "Transmitting..." : "Submit Requisition"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
