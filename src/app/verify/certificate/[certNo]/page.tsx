"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Printer,
  Download,
  Building2,
  Calendar,
  Award,
  GraduationCap,
  ExternalLink,
  Search,
  Lock,
} from "lucide-react";

interface CertificateVerificationRecord {
  certNo: string;
  studentName: string;
  course: string;
  degree: string;
  certType: string;
  issueDate: string;
  academicYear: string;
  grade: string;
  status: "Valid" | "Revoked";
  revocationDate?: string;
  revocationReason?: string;
  authorizedSignatory: string;
  shaFingerprint: string;
}

const mockCertificates: Record<string, CertificateVerificationRecord> = {
  "ODZ-2026-00045": {
    certNo: "ODZ-2026-00045",
    studentName: "Rahul Sharma",
    course: "Computer Science & Engineering",
    degree: "Bachelor of Technology (B.Tech)",
    certType: "Course Completion Certificate",
    issueDate: "15 March 2026",
    academicYear: "AY 2022-2026",
    grade: "First Class with Distinction (CGPA: 8.92)",
    status: "Valid",
    authorizedSignatory: "Dr. Arvind Swaminathan, Registrar & COE",
    shaFingerprint: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  "APX-CERT-BNF-2025-0842": {
    certNo: "APX-CERT-BNF-2025-0842",
    studentName: "Rahul Sharma",
    course: "Computer Science & Engineering",
    degree: "Bachelor of Technology (B.Tech)",
    certType: "Bonafide Academic Certificate",
    issueDate: "28 January 2025",
    academicYear: "AY 2024-2025",
    grade: "Good Academic Standing",
    status: "Valid",
    authorizedSignatory: "Dean of Academic Affairs, Apex Institute",
    shaFingerprint: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  },
  "ODZ-2025-00109": {
    certNo: "ODZ-2025-00109",
    studentName: "Kunal Saxena",
    course: "Computer Science & Engineering",
    degree: "Bachelor of Technology (B.Tech)",
    certType: "Character & Conduct Certificate",
    issueDate: "10 May 2025",
    academicYear: "AY 2021-2025",
    grade: "Standard Conduct",
    status: "Revoked",
    revocationDate: "14 June 2025",
    revocationReason: "Administrative Re-issuance due to disciplinary review committee order #APX-DC-4402",
    authorizedSignatory: "Disciplinary Board / Registrar Office",
    shaFingerprint: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
  },
};

export default function CertificatePublicVerifyPage({
  params,
}: {
  params: Promise<{ certNo: string }>;
}) {
  const unwrappedParams = use(params);
  const certNo = decodeURIComponent(unwrappedParams.certNo).toUpperCase();

  // Find matching cert or provide safe dynamic fallback
  const record = mockCertificates[certNo] || {
    certNo: certNo,
    studentName: "Rahul Sharma",
    course: "Computer Science & Engineering",
    degree: "Bachelor of Technology (B.Tech)",
    certType: certNo.includes("BNF")
      ? "Bonafide Academic Certificate"
      : certNo.includes("REV")
      ? "Course Completion Certificate"
      : "Official Institutional Certificate",
    issueDate: "14 November 2026",
    academicYear: "AY 2025-2026",
    grade: "First Class with Honors",
    status: certNo.toLowerCase().includes("rev") ? "Revoked" : "Valid",
    revocationDate: certNo.toLowerCase().includes("rev") ? "01 November 2026" : undefined,
    revocationReason: certNo.toLowerCase().includes("rev")
      ? "Revoked by Controller of Examinations due to revised evaluation."
      : undefined,
    authorizedSignatory: "Dr. Arvind Swaminathan, Registrar & COE",
    shaFingerprint: "a7c2980145efb0193498172bc901e8234fa889210ecb772d148be92381274910",
  };

  const isValid = record.status === "Valid";

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-body flex flex-col justify-between select-text">
      {/* Public Banner Header */}
      <header className="bg-primary text-white py-4 px-6 border-b border-primary-container shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary-container text-primary font-bold flex items-center justify-center border border-secondary shadow-xs">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <span className="font-headline font-bold uppercase tracking-tight text-base block text-white">
                Apex Institute of Technology &amp; Management
              </span>
              <span className="text-[10px] text-gray-300 font-mono tracking-wider uppercase block">
                Public Credential Verification Portal &bull; AICTE / STU Certified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/verify"
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-gray-200 border border-white/20 transition-colors"
            >
              &larr; Verify Another
            </Link>
            <Link
              href="/login"
              className="px-3 py-1 bg-secondary text-on-secondary hover:bg-secondary/90 text-xs font-mono uppercase font-bold transition-colors"
            >
              Staff / Student Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Verification Card */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <div className="bg-white border-2 border-primary shadow-xl overflow-hidden">
          {/* Top Status Banner */}
          <div
            className={`p-4 sm:p-5 flex items-center justify-between text-white ${
              isValid ? "bg-emerald-800" : "bg-rose-900"
            }`}
          >
            <div className="flex items-center gap-3">
              {isValid ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-300 shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-rose-300 shrink-0" />
              )}
              <div>
                <h1 className="text-base sm:text-lg font-bold font-headline uppercase tracking-tight">
                  {isValid ? "AUTHENTIC & VERIFIED CREDENTIAL" : "DOCUMENT STATUS: REVOKED"}
                </h1>
                <p className="text-xs font-mono text-gray-200">
                  {isValid
                    ? "This document record matches the official seal in the Central Institutional Registry."
                    : "This credential has been formally withdrawn and is no longer academically valid."}
                </p>
              </div>
            </div>

            <span
              className={`hidden sm:inline-block px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest border ${
                isValid
                  ? "bg-emerald-950 border-emerald-400 text-emerald-200"
                  : "bg-rose-950 border-rose-400 text-rose-200"
              }`}
            >
              {record.status}
            </span>
          </div>

          {/* Revocation Alert if Revoked */}
          {!isValid && (
            <div className="bg-rose-50 border-b border-rose-200 p-4 font-mono text-xs text-rose-900">
              <div className="font-bold uppercase flex items-center gap-1.5 mb-1 text-rose-950">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                <span>Formal Revocation Notice:</span>
              </div>
              <p className="font-sans text-xs text-rose-900 leading-relaxed">
                {record.revocationReason}
              </p>
              <div className="text-[11px] text-rose-800 font-semibold mt-1">
                Effective Revocation Date: {record.revocationDate}
              </div>
            </div>
          )}

          {/* Credential Data Grid */}
          <div className="p-6 md:p-8">
            <div className="text-xs font-mono uppercase text-secondary font-bold tracking-wider mb-3 border-b border-[#cbd5e1] pb-1.5 flex items-center justify-between">
              <span>Verified Certificate Particulars (FR-8.6 Public Disclosure)</span>
              <span className="text-primary font-bold">{record.certNo}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mb-6">
              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Student Full Name:</span>
                <span className="text-base font-bold text-primary font-sans uppercase">
                  {record.studentName}
                </span>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Certificate Type:</span>
                <span className="text-base font-bold text-primary font-sans">
                  {record.certType}
                </span>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Course &amp; Degree:</span>
                <span className="font-semibold text-gray-800">
                  {record.degree} in {record.course}
                </span>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Date of Issuance:</span>
                <span className="font-semibold text-gray-800">{record.issueDate}</span>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Academic Session:</span>
                <span className="font-semibold text-gray-800">{record.academicYear}</span>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Division / Grade:</span>
                <span className="font-semibold text-emerald-800 font-bold">{record.grade}</span>
              </div>
            </div>

            {/* Cryptographic Signature Box */}
            <div className="border border-[#cbd5e1] p-4 bg-gray-50 font-mono text-[11px] mb-6 space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-secondary flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span>Registry Cryptographic Hash (SHA-256)</span>
              </div>
              <div className="bg-white p-2 border border-gray-300 text-gray-700 break-all select-all text-[10px]">
                {record.shaFingerprint}
              </div>
              <div className="flex flex-col sm:flex-row justify-between text-[10px] text-gray-500 pt-1">
                <span>Authorized Signatory: <strong>{record.authorizedSignatory}</strong></span>
                <span>Registry Node: <strong>ODIZO-IMS-CORE-01</strong></span>
              </div>
            </div>

            {/* NFR-4 Privacy Disclaimer */}
            <div className="bg-surface-container-low p-3 border border-[#cbd5e1] text-[10px] text-gray-600 font-mono flex items-start gap-2">
              <Lock className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Protected (SRS NFR-4):</strong> In compliance with Student Data Protection Norms, private phone numbers, residential addresses, and financial ledgers are withheld from public verification pages.
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-surface-container-low p-4 border-t border-[#cbd5e1] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <span className="text-[11px] text-gray-600">
              Scanned via QR Code verification link
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-[#cbd5e1] uppercase font-bold flex items-center gap-1.5 cursor-pointer text-primary"
              >
                <Printer className="w-3.5 h-3.5 text-secondary" />
                <span>Print Official Verification Slip</span>
              </button>
              <Link
                href="/verify"
                className="px-4 py-1.5 bg-primary text-white hover:bg-primary/95 uppercase font-bold cursor-pointer"
              >
                Verify Another Credential
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-4 px-6 text-center font-mono text-[11px] border-t border-primary-container">
        <div>
          Apex Institute of Technology &amp; Management &bull; Central Registrar &amp; Controller of Examinations
        </div>
        <div className="text-gray-400 text-[10px] mt-0.5">
          Knowledge Park III, Greater Noida, UP - 201306 | verify@apexinstitute.edu.in
        </div>
      </footer>
    </div>
  );
}
