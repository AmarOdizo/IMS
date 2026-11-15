"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Download,
  Printer,
  CheckCircle2,
  Calendar,
  FileCheck,
  ShieldCheck,
  Plus,
  X,
  FileText,
  Clock,
  Building,
  GraduationCap,
  ExternalLink,
  Search,
  Check
} from "lucide-react";

interface CertificateItem {
  id: string;
  refNo: string;
  title: string;
  category: "Bonafide" | "Transcript" | "Award" | "NOC";
  typeBadge: string;
  issueDate: string;
  validUntil: string;
  purpose: string;
  status: "Active" | "Permanent";
  remark?: string;
  bodyText: string;
  signatory1: { name: string; title: string };
  signatory2: { name: string; title: string };
}

const certificatesList: CertificateItem[] = [
  {
    id: "cert-1",
    refNo: "APX-CERT-BNF-2025-0842",
    title: "Bonafide Student Certificate",
    category: "Bonafide",
    typeBadge: "Official Attestation",
    issueDate: "12 Feb 2025",
    validUntil: "31 Jul 2025",
    purpose: "Passport, Visa & Educational Concession",
    status: "Active",
    bodyText:
      "This is to certify that Rahul Sharma, Son of Mr. Rameshwar Sharma, Roll No: 23CS042 (Registration: APX-2023-CS-042), is a bonafide full-time student of Apex Institute of Technology pursuing Bachelor of Technology (B.Tech) in Computer Science & Engineering (Batch 2023–2027). He bears good moral character and regular academic conduct.",
    signatory1: { name: "Dr. K. N. Murthy", title: "Registrar" },
    signatory2: { name: "Dr. Alistair Chen", title: "Dean of Academics" },
  },
  {
    id: "cert-2",
    refNo: "APX-TRN-2024-3918",
    title: "Semester Grade Transcript",
    category: "Transcript",
    typeBadge: "Academic Record",
    issueDate: "18 Jan 2025",
    validUntil: "Permanent Record",
    purpose: "Higher Studies & Internship Verification",
    status: "Permanent",
    remark: "CGPA: 8.42 / 10.0 • 68 Total Credits Cleared",
    bodyText:
      "This official academic transcript certifies that Rahul Sharma (Roll: 23CS042) has successfully completed Semester III examinations in Computer Science & Engineering with First Class Distinction. The student has accumulated 68 credits with a cumulative Grade Point Average of 8.42 on a 10.0 scale, with zero active arrears.",
    signatory1: { name: "Dr. K. N. Murthy", title: "Controller of Examinations" },
    signatory2: { name: "Dr. Meera Nambiar", title: "Head, Dept of CSE" },
  },
  {
    id: "cert-3",
    refNo: "APX-AWD-2024-0199",
    title: "Dean's Merit Excellence Award",
    category: "Award",
    typeBadge: "Honor Roll",
    issueDate: "05 Dec 2024",
    validUntil: "Permanent Record",
    purpose: "Academic Distinction & Merit Recognition",
    status: "Permanent",
    remark: "Dean's Honor Roll • Rank #3 Batch of 2027",
    bodyText:
      "In recognition of outstanding scholastic performance and intellectual diligence, the Academic Senate of Apex Institute of Technology proudly confers the Dean's Honor Roll Citation upon Rahul Sharma for securing an SGPA exceeding 8.60 during Academic Year 2024–25.",
    signatory1: { name: "Prof. S. R. Vardhan", title: "Director of Institute" },
    signatory2: { name: "Dr. Alistair Chen", title: "Dean of Academic Affairs" },
  },
  {
    id: "cert-4",
    refNo: "APX-NOC-2024-0041",
    title: "No Objection Certificate (NOC)",
    category: "NOC",
    typeBadge: "Industry Training",
    issueDate: "20 Oct 2024",
    validUntil: "30 Jun 2025",
    purpose: "Summer Industry Internship & Practical Training",
    status: "Active",
    bodyText:
      "The Department of Computer Science & Engineering has no objection to Rahul Sharma (Roll: 23CS042) undertaking professional industrial training or a technical internship during scheduled summer term recess.",
    signatory1: { name: "Dr. Meera Nambiar", title: "Head, Dept of CSE" },
    signatory2: { name: "Prof. Kenneth Sterling", title: "Dean, Training & Placement" },
  },
];

export default function StudentCertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem>(certificatesList[0]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Requisition Form State
  const [docType, setDocType] = useState("Bonafide Student Certificate");
  const [purpose, setPurpose] = useState("");
  const [urgency, setUrgency] = useState("Standard (3 Working Days) • Free");
  const [copies, setCopies] = useState("1");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose.trim()) {
      triggerToast("Please enter the purpose of the certificate.");
      return;
    }
    setIsRequestModalOpen(false);
    triggerToast(`Request for "${docType}" submitted. Tracking ID: #REQ-${Math.floor(1000 + Math.random() * 9000)}`);
    setPurpose("");
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Certificates &amp; Documents
            </h1>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full">
              4 Issued
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Official academic credentials &bull; Rahul Sharma (23CS042)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => triggerToast("Compiling all issued certificates into a single download...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All</span>
          </button>

          <button
            onClick={() => setIsRequestModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Request Certificate</span>
          </button>
        </div>
      </div>

      {/* 4 Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Issued Certificates */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Issued Certificates</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#3D405B] font-mono">4</span>
              <span className="text-xs text-slate-400">Available</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Bonafide, Transcript, Award &amp; NOC
            </span>
          </div>
        </div>

        {/* Card 2: Attestation Status */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Attestation Status</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-emerald-600 font-mono">100%</span>
              <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Signed by Registrar &amp; Academic Dean
            </span>
          </div>
        </div>

        {/* Card 3: Pending Inquiries */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pending Requests</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#3D405B] flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#3D405B] font-mono">0</span>
              <span className="text-xs text-slate-400">In Progress</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              All applications processed
            </span>
          </div>
        </div>

        {/* Card 4: Current Academic Term */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Academic Standing</span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-base font-bold text-slate-900 leading-tight">
              Good Academic Standing
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Semester IV &bull; Regular Enrolment
            </span>
          </div>
        </div>
      </div>

      {/* Main 2 Columns: Certificates List (Left 6 Cols) & Certificate Preview (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Certificates Cards List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#3D405B]">
              Issued Documents ({certificatesList.length})
            </h2>
            <span className="text-[11px] text-slate-400">
              Click any document to preview
            </span>
          </div>

          <div className="space-y-3">
            {certificatesList.map((cert) => {
              const isSelected = selectedCert.id === cert.id;
              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${
                    isSelected
                      ? "border-[#355C7D] ring-2 ring-[#355C7D]/20 shadow-sm"
                      : "border-slate-200/80 hover:border-slate-300 shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-md border border-slate-200">
                          {cert.typeBadge}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#355C7D]">
                          {cert.refNo}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1.5">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {cert.purpose}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-md border border-emerald-200">
                        {cert.status}
                      </span>
                    </div>
                  </div>

                  {cert.remark && (
                    <div className="mt-2.5 px-2.5 py-1 bg-slate-50 rounded-lg text-xs font-mono font-medium text-slate-700 border border-slate-200/60">
                      {cert.remark}
                    </div>
                  )}

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Issued: {cert.issueDate}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(cert);
                        }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                          isSelected
                            ? "bg-[#355C7D] text-white"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {isSelected ? "Viewing" : "Preview"}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerToast(`Downloading PDF for ${cert.title}...`);
                        }}
                        className="text-xs font-semibold px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Certificate Preview Parchment */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#355C7D]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#3D405B]">
                Document Preview &bull; {selectedCert.title}
              </h2>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => window.print()}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                title="Print Certificate"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={() => triggerToast(`Downloading PDF: ${selectedCert.title}...`)}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Clean Parchment Design */}
          <div className="p-6 md:p-8 space-y-6 text-center border-4 border-slate-100 m-3 rounded-xl bg-slate-50/30">
            {/* Header */}
            <div className="border-b-2 border-slate-200 pb-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <GraduationCap className="w-7 h-7 text-[#3D405B]" />
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
                  Apex Institute of Technology
                </h3>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Autonomous Institution &bull; Accredited NAAC &apos;A++&apos; &bull; New Delhi, India
              </p>
              <div className="mt-2 inline-block px-3 py-0.5 bg-[#355C7D] text-white text-[10px] font-bold uppercase rounded-md tracking-wider">
                Ref: {selectedCert.refNo}
              </div>
            </div>

            {/* Certificate Title */}
            <div className="py-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-1">
                Official Attestation
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-black uppercase text-[#3D405B] tracking-tight">
                {selectedCert.title}
              </h2>
            </div>

            {/* Certificate Body Paragraph */}
            <div className="text-xs text-slate-700 leading-relaxed max-w-lg mx-auto font-serif text-justify md:text-center">
              <p>{selectedCert.bodyText}</p>
            </div>

            {/* Candidate Metadata Box */}
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-xl border border-slate-200 max-w-md mx-auto text-left">
              <div>
                <span className="text-slate-400 block text-[10px]">Student Name</span>
                <span className="font-semibold text-slate-900">Rahul Sharma</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Roll Number</span>
                <span className="font-mono font-bold text-[#355C7D]">23CS042</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Academic Program</span>
                <span className="font-medium text-slate-800">B.Tech (CSE)</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">Date of Issue</span>
                <span className="font-medium text-slate-800">{selectedCert.issueDate}</span>
              </div>
            </div>

            {/* Signatures Row */}
            <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-3 items-end gap-3 text-center">
              <div>
                <div className="h-7 border-b border-slate-400 flex items-end justify-center pb-0.5">
                  <span className="font-serif italic text-xs text-slate-700">{selectedCert.signatory1.name}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-800 uppercase block mt-1">
                  {selectedCert.signatory1.name}
                </span>
                <span className="text-[9px] text-slate-500 block">
                  {selectedCert.signatory1.title}
                </span>
              </div>

              {/* Seal */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-[#355C7D] bg-white flex flex-col items-center justify-center p-1 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#355C7D]" />
                  <span className="text-[6px] font-bold text-[#355C7D] uppercase">APEX VERIFIED</span>
                </div>
                <span className="text-[8px] text-slate-400 uppercase mt-0.5">Official Seal</span>
              </div>

              <div>
                <div className="h-7 border-b border-slate-400 flex items-end justify-center pb-0.5">
                  <span className="font-serif italic text-xs text-slate-700">{selectedCert.signatory2.name}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-800 uppercase block mt-1">
                  {selectedCert.signatory2.name}
                </span>
                <span className="text-[9px] text-slate-500 block">
                  {selectedCert.signatory2.title}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => triggerToast(`Downloading PDF: ${selectedCert.title}...`)}
                className="px-4 py-1.5 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Request New Certificate */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#355C7D]" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Request New Certificate
                </h3>
              </div>
              <button
                onClick={() => setIsRequestModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Certificate / Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#355C7D]"
                >
                  <option>Bonafide Student Certificate</option>
                  <option>Character &amp; Conduct Certificate</option>
                  <option>No Objection Certificate (NOC) for Internship</option>
                  <option>Provisional Degree Certificate</option>
                  <option>Medium of Instruction (English) Certificate</option>
                  <option>Migration &amp; Transfer Clearance</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Purpose / Intended Destination *
                </label>
                <textarea
                  rows={2}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Visa application, Internship at Google, Education Loan..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-[#355C7D] resize-none"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Processing Speed
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#355C7D]"
                  >
                    <option>Standard (3 Working Days) • Free</option>
                    <option>Tatkal Express (24h) • ₹150</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1.5">
                    Hard Copies Required
                  </label>
                  <select
                    value={copies}
                    onChange={(e) => setCopies(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 text-slate-800 focus:outline-none focus:border-[#355C7D]"
                  >
                    <option value="1">1 Original Copy</option>
                    <option value="2">2 Original Copies</option>
                    <option value="3">3 Original Copies</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                The Registrar Desk reviews clearance before issuing. Soft copies will be instantly available in your portal upon approval.
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsRequestModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
