"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  CreditCard,
  Award,
  Building2,
  ArrowRight,
  ExternalLink,
  Lock,
} from "lucide-react";

export default function PublicVerifySearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [verifyType, setVerifyType] = useState<"certificate" | "id">("certificate");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setErrorMsg("Please enter a Certificate Number or ID Card Number.");
      return;
    }
    setErrorMsg(null);
    const clean = encodeURIComponent(query.trim().toUpperCase());
    if (verifyType === "certificate") {
      router.push(`/verify/certificate/${clean}`);
    } else {
      router.push(`/verify/id/${clean}`);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest text-on-surface font-body flex flex-col justify-between">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 border-b border-primary-container shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary-container text-primary font-bold flex items-center justify-center border border-secondary shadow-xs">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <span className="font-headline font-bold uppercase tracking-tight text-base block text-white">
                Apex Institute of Technology &amp; Management
              </span>
              <span className="text-[10px] text-gray-300 font-mono tracking-wider uppercase block">
                Central Academic Credential &amp; Identity Verification Registry
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="px-3 py-1.5 bg-secondary text-on-secondary hover:bg-secondary/90 text-xs font-mono uppercase font-bold transition-colors shadow-xs"
          >
            Portal Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-10 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container border border-[#cbd5e1] font-mono text-xs uppercase font-bold text-secondary mb-3">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>Cryptographic Public Verification &bull; No Login Required</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-headline uppercase tracking-tight text-primary">
            Verify Academic Credentials &amp; ID Cards
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-2 leading-relaxed">
            Enter the unique reference code printed beneath the QR code on any certificate or digital ID card issued by Apex Institute to verify authentic status.
          </p>
        </div>

        {/* Verification Form Card */}
        <div className="bg-white border-2 border-primary shadow-xl p-6 sm:p-8 mb-8">
          {/* Verification Type Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-6 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setVerifyType("certificate");
                setQuery("");
                setErrorMsg(null);
              }}
              className={`p-3 border flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                verifyType === "certificate"
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-surface-container-low text-gray-700 border-[#cbd5e1] hover:bg-surface-container"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Verify Certificate</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setVerifyType("id");
                setQuery("");
                setErrorMsg(null);
              }}
              className={`p-3 border flex items-center justify-center gap-2 font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                verifyType === "id"
                  ? "bg-primary text-white border-primary shadow-xs"
                  : "bg-surface-container-low text-gray-700 border-[#cbd5e1] hover:bg-surface-container"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Verify ID Card</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 mb-4 bg-rose-50 border border-rose-300 text-rose-900 text-xs font-mono">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleVerifySubmit} className="flex flex-col sm:flex-row gap-2 font-mono text-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  verifyType === "certificate"
                    ? "e.g. ODZ-2026-00045 or APX-CERT-BNF-2025-0842"
                    : "e.g. IDC-STU-2025-042 or IDC-STF-2024-018"
                }
                className="w-full bg-surface-container-low pl-9 pr-3 py-3 border border-[#cbd5e1] focus:border-secondary focus:outline-none uppercase font-mono text-sm text-primary"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary hover:bg-primary/95 text-white uppercase font-bold text-xs tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Verify Authenticity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Live Samples for Quick Testing */}
          <div className="mt-6 pt-4 border-t border-[#cbd5e1] font-mono text-xs">
            <span className="text-[11px] uppercase font-bold text-gray-500 block mb-2">
              Sample Live References to Test:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Link
                href="/verify/certificate/ODZ-2026-00045"
                className="p-2.5 bg-surface-container-low hover:bg-surface-container border border-[#cbd5e1] text-left block"
              >
                <div className="text-emerald-800 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>ODZ-2026-00045</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-0.5">
                  Valid Course Completion Cert
                </div>
              </Link>

              <Link
                href="/verify/id/IDC-STU-2025-042"
                className="p-2.5 bg-surface-container-low hover:bg-surface-container border border-[#cbd5e1] text-left block"
              >
                <div className="text-primary font-bold flex items-center gap-1 text-[11px]">
                  <CreditCard className="w-3.5 h-3.5 text-secondary" />
                  <span>IDC-STU-2025-042</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-0.5">
                  Valid Student Digital ID Card
                </div>
              </Link>

              <Link
                href="/verify/certificate/ODZ-2025-00109"
                className="p-2.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-left block"
              >
                <div className="text-rose-900 font-bold flex items-center gap-1 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                  <span>ODZ-2025-00109</span>
                </div>
                <div className="text-[10px] text-rose-800 mt-0.5">
                  Revoked Certificate Record (FR-8.8)
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* NFR-4 Privacy Note */}
        <div className="bg-surface-container-low p-4 border border-[#cbd5e1] font-mono text-[11px] text-gray-600 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <span>
            <strong>Institutional Trust &amp; Privacy (NFR-4):</strong> This public verification portal allows prospective employers, background verification agencies, and universities to independently confirm the legitimacy of credentials without compromising student personal contact information.
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-4 px-6 text-center font-mono text-[11px] border-t border-primary-container">
        <div>
          Apex Institute of Technology &amp; Management &bull; Registry Services
        </div>
        <div className="text-gray-400 text-[10px] mt-0.5">
          Knowledge Park III, Greater Noida, UP - 201306 | Registrar Office: +91 (0120) 232-9000
        </div>
      </footer>
    </div>
  );
}
