"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Building2,
  Calendar,
  User,
  GraduationCap,
  Briefcase,
  Lock,
  Printer,
  QrCode,
} from "lucide-react";

interface IdCardVerificationRecord {
  cardNo: string;
  holderName: string;
  role: "Student" | "Staff";
  identifierNo: string; // Roll No or Emp No
  discipline: string; // Course or Department
  designationOrBatch: string;
  issueDate: string;
  validTill: string;
  status: "Active" | "Expired" | "Suspended";
  bloodGroup: string;
  avatarColor: string;
}

const mockIdCards: Record<string, IdCardVerificationRecord> = {
  "IDC-STU-2025-042": {
    cardNo: "IDC-STU-2025-042",
    holderName: "Rahul Sharma",
    role: "Student",
    identifierNo: "APX-2023-CS-042",
    discipline: "Computer Science & Engineering",
    designationOrBatch: "B.Tech Batch 2023-2027",
    issueDate: "01 August 2023",
    validTill: "30 June 2027",
    status: "Active",
    bloodGroup: "O+",
    avatarColor: "bg-primary",
  },
  "IDC-STF-2024-018": {
    cardNo: "IDC-STF-2024-018",
    holderName: "Dr. Vikramaditya Sen",
    role: "Staff",
    identifierNo: "EMP-CS-082",
    discipline: "Department of Computer Science",
    designationOrBatch: "Associate Professor & Head",
    issueDate: "15 July 2024",
    validTill: "31 July 2029",
    status: "Active",
    bloodGroup: "B+",
    avatarColor: "bg-[#780016]", // Maroon for staff
  },
  "IDC-STU-2021-089": {
    cardNo: "IDC-STU-2021-089",
    holderName: "Manav Gupta",
    role: "Student",
    identifierNo: "APX-2021-ME-045",
    discipline: "Mechanical Engineering",
    designationOrBatch: "B.Tech Batch 2021-2025",
    issueDate: "01 August 2021",
    validTill: "30 June 2025",
    status: "Expired",
    bloodGroup: "A+",
    avatarColor: "bg-primary",
  },
};

export default function IdCardPublicVerifyPage({
  params,
}: {
  params: Promise<{ cardNo: string }>;
}) {
  const unwrappedParams = use(params);
  const cardNo = decodeURIComponent(unwrappedParams.cardNo).toUpperCase();

  const record: IdCardVerificationRecord = mockIdCards[cardNo] || {
    cardNo: cardNo,
    holderName: cardNo.includes("STF") ? "Prof. Suresh Nambiar" : "Rahul Sharma",
    role: cardNo.includes("STF") ? "Staff" : "Student",
    identifierNo: cardNo.includes("STF") ? "EMP-FAC-049" : "APX-2023-CS-042",
    discipline: "Computer Science & Engineering",
    designationOrBatch: cardNo.includes("STF") ? "Assistant Professor" : "B.Tech Batch 2023-2027",
    issueDate: "01 August 2023",
    validTill: "30 June 2027",
    status: cardNo.toLowerCase().includes("exp") ? "Expired" : "Active",
    bloodGroup: "O+",
    avatarColor: cardNo.includes("STF") ? "bg-[#780016]" : "bg-primary",
  };

  const isActive = record.status === "Active";
  const isStaff = record.role === "Staff";

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-body flex flex-col justify-between select-text">
      {/* Top Header */}
      <header className="bg-primary text-white py-4 px-6 border-b border-primary-container shadow-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary-container text-primary font-bold flex items-center justify-center border border-secondary shadow-xs">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="font-headline font-bold uppercase tracking-tight text-base block text-white">
                Apex Institute of Technology &amp; Management
              </span>
              <span className="text-[10px] text-gray-300 font-mono tracking-wider uppercase block">
                Digital Identity Card Verification &bull; Security Node
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/verify"
              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-gray-200 border border-white/20 transition-colors"
            >
              &larr; Verify Search
            </Link>
            <Link
              href="/login"
              className="px-3 py-1 bg-secondary text-on-secondary hover:bg-secondary/90 text-xs font-mono uppercase font-bold transition-colors"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Verification Dossier */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col justify-center">
        <div className="bg-white border-2 border-primary shadow-xl overflow-hidden">
          {/* Status Header */}
          <div
            className={`p-4 sm:p-5 flex items-center justify-between text-white ${
              isActive ? (isStaff ? "bg-[#780016]" : "bg-[#001028]") : "bg-rose-900"
            }`}
          >
            <div className="flex items-center gap-3">
              {isActive ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-300 shrink-0" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-rose-300 shrink-0" />
              )}
              <div>
                <h1 className="text-base sm:text-lg font-bold font-headline uppercase tracking-tight">
                  {isActive
                    ? `OFFICIALLY VERIFIED ${record.role.toUpperCase()} ID CARD`
                    : "ID CARD EXPIRED / INACTIVE"}
                </h1>
                <p className="text-xs font-mono text-gray-200">
                  {isActive
                    ? "Active biometric and credentials match institute registrar database."
                    : "This identity card has expired or been decommissioned."}
                </p>
              </div>
            </div>

            <span
              className={`hidden sm:inline-block px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest border ${
                isActive
                  ? "bg-white/15 border-white/30 text-white"
                  : "bg-rose-950 border-rose-400 text-rose-200"
              }`}
            >
              {record.status}
            </span>
          </div>

          {/* Profile Card Body (SRS 4.9 & NFR-4 compliant) */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#cbd5e1] mb-6">
              {/* Photo Avatar */}
              <div className="relative">
                <div
                  className={`w-28 h-36 ${
                    isStaff ? "bg-[#780016]" : "bg-[#001028]"
                  } text-white flex flex-col items-center justify-center border-2 border-primary shadow-md p-2 text-center`}
                >
                  <User className="w-14 h-14 text-white/70 mb-1" />
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/80 font-bold">
                    OFFICIAL PHOTO
                  </span>
                  <span className="text-[8px] font-mono text-emerald-300 font-bold">
                    CHIP ENCRYPTED
                  </span>
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-xs ${
                    isStaff ? "bg-[#780016]" : "bg-secondary"
                  }`}
                >
                  {record.role}
                </div>
              </div>

              {/* Name & Primary Role */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wide">
                    {record.role === "Student" ? "Student Candidate" : "Academic Faculty"}
                  </span>
                  <h2 className="text-2xl font-bold font-headline text-primary uppercase tracking-tight mt-0.5">
                    {record.holderName}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1 font-mono text-xs">
                    <span className="px-2 py-0.5 bg-surface-container font-bold text-primary border border-[#cbd5e1]">
                      {record.identifierNo}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 border border-gray-300">
                      Card ID: {record.cardNo}
                    </span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-900 border border-red-300 font-bold">
                      Blood: {record.bloodGroup}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-700 font-sans leading-relaxed">
                  <strong>{record.discipline}</strong> &bull; {record.designationOrBatch}
                </div>
              </div>
            </div>

            {/* Credential Validity Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono mb-6">
              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Issue Date:</span>
                <span className="font-bold text-primary">{record.issueDate}</span>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Valid Until:</span>
                <span
                  className={`font-bold ${
                    isActive ? "text-emerald-800" : "text-rose-800"
                  }`}
                >
                  {record.validTill}
                </span>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Card Standard:</span>
                <span className="font-semibold text-gray-800">CR80 (85.6&times;54mm)</span>
              </div>

              <div className="p-3 bg-surface-container-low border border-[#cbd5e1]">
                <span className="text-gray-500 text-[10px] uppercase block">Campus Access:</span>
                <span className="font-bold text-emerald-700">AUTHORIZED</span>
              </div>
            </div>

            {/* Privacy Protection Callout (SRS NFR-4) */}
            <div className="bg-surface-container-low p-3.5 border border-[#cbd5e1] text-[10px] text-gray-600 font-mono flex items-start gap-2">
              <Lock className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Institutional Privacy Compliance (NFR-4):</strong> To safeguard student and faculty welfare, personal phone numbers and home addresses are withheld from public scan endpoints. For emergency assistance or loss reports, contact campus security at <strong>+91 (0120) 232-9000</strong>.
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-surface-container-low p-4 border-t border-[#cbd5e1] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <span className="text-[11px] text-gray-600">
              Scanned via ID Card Backside QR Code
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-[#cbd5e1] uppercase font-bold flex items-center gap-1.5 cursor-pointer text-primary"
              >
                <Printer className="w-3.5 h-3.5 text-secondary" />
                <span>Print Verification Receipt</span>
              </button>
              <Link
                href="/verify"
                className="px-4 py-1.5 bg-primary text-white hover:bg-primary/95 uppercase font-bold cursor-pointer"
              >
                Scan Another Card
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-4 px-6 text-center font-mono text-[11px] border-t border-primary-container">
        <div>
          Apex Institute of Technology &amp; Management &bull; Campus Safety &amp; Registrar Registry
        </div>
        <div className="text-gray-400 text-[10px] mt-0.5">
          Knowledge Park III, Institutional Area, Greater Noida, UP - 201306 | security@apexinstitute.edu.in
        </div>
      </footer>
    </div>
  );
}
