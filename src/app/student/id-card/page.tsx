"use client";

import { useState } from "react";
import {
  CreditCard,
  Printer,
  Download,
  RotateCw,
  CheckCircle2,
  X,
  User,
  ShieldCheck,
  Calendar,
  Building,
  Phone,
  QrCode,
  Sparkles,
  RefreshCw,
  Lock,
  Unlock,
} from "lucide-react";

export default function StudentIdCardPage() {
  const [viewMode, setViewMode] = useState<"both" | "flip">("both");
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeProfile, setActiveProfile] = useState<"sample" | "student">("sample");
  const [showPhoto, setShowPhoto] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Profile data definitions
  const profileData =
    activeProfile === "sample"
      ? {
          instituteName: "SUNRISE INSTITUTE",
          instituteSub: "OF TECHNOLOGY",
          instituteCode: "SI",
          studentName: "Aarav Sharma",
          course: "Bachelor of Computer Applications",
          rollNo: "STU-2026-0142",
          batch: "BCA 2026–29",
          dob: "12 Aug 2007",
          validTill: "31 May 2029",
          cardNo: "SIT-26-0142",
          bloodGroup: "O+",
          emergencyContact: "+91 98765 43210",
          address: "24, MG Road, Pune 411001",
          signatoryName: "R. Mehta",
          signatoryTitle: "PRINCIPAL",
          returnAddressLine1: "If found, please return to the institute office.",
          returnAddressLine2: "Plot 12, Knowledge Park, Pune 411057 • +91 20 1234 5678",
          website: "www.sunriseinstitute.edu.in",
          photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
        }
      : {
          instituteName: "SUNRISE INSTITUTE",
          instituteSub: "OF TECHNOLOGY",
          instituteCode: "SI",
          studentName: "Rahul Sharma",
          course: "B.Tech - Computer Science & Engineering",
          rollNo: "23CS042",
          batch: "B.Tech 2023–27",
          dob: "15 Aug 2004",
          validTill: "30 Jun 2027",
          cardNo: "SIT-23-0042",
          bloodGroup: "O+",
          emergencyContact: "+91 98111 22334",
          address: "Sector 14, Gurugram, Haryana 122001",
          signatoryName: "R. Mehta",
          signatoryTitle: "PRINCIPAL",
          returnAddressLine1: "If found, please return to the institute office.",
          returnAddressLine2: "Plot 12, Knowledge Park, Pune 411057 • +91 20 1234 5678",
          website: "www.sunriseinstitute.edu.in",
          photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
        };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto font-sans text-slate-800">
      {/* Print Specific CSS to isolate Front & Back ID Card on 1 clean Page */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-id-card, #printable-id-card * {
            visibility: visible;
          }
          #printable-id-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 10mm 15mm;
            background: white !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: flex-start !important;
            gap: 12mm !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B365D] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom no-print">
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

      {/* Top Header & Master Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-200/80 shadow-xs no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#1B365D] tracking-tight">
              Student Identity Card
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 text-[#1B365D] border border-blue-200 text-xs font-semibold rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Official Template &bull; {profileData.instituteName}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cardholder: {profileData.studentName} ({profileData.cardNo}) &bull; Valid Till {profileData.validTill}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Profile Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1">
            <button
              onClick={() => setActiveProfile("sample")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeProfile === "sample"
                  ? "bg-white text-[#1B365D] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sample Card (Aarav)
            </button>
            <button
              onClick={() => setActiveProfile("student")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeProfile === "student"
                  ? "bg-white text-[#1B365D] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              My Profile (Rahul)
            </button>
          </div>

          <button
            onClick={() => setShowPhoto(!showPhoto)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#1B365D] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer"
            title="Toggle between Avatar illustration and Photo"
          >
            <User className="w-3.5 h-3.5" />
            <span>{showPhoto ? "Show Avatar" : "Show Photo"}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#1B365D] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Print ID Card</span>
          </button>
          <button
            onClick={() => showToast("Downloading high-resolution ID Card PDF...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#1B365D] hover:bg-[#152a48] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Surface */}
      <div className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-6 md:p-10 flex flex-col items-center">
        {/* View Mode Toolbar */}
        <div className="w-full max-w-4xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200 no-print">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#1B365D]" />
            <span className="text-sm font-bold text-[#1B365D]">
              Physical ID Card Studio &bull; Standard CR80 Vertical Format
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => {
                setViewMode("both");
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === "both"
                  ? "bg-[#1B365D] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Both Sides
            </button>
            <button
              onClick={() => {
                setViewMode("flip");
                setIsFlipped(!isFlipped);
              }}
              className={`px-3.5 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "flip"
                  ? "bg-[#1B365D] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip ({isFlipped ? "Back" : "Front"})</span>
            </button>
          </div>
        </div>

        {/* Printable & Screen Render Container */}
        <div
          id="printable-id-card"
          className={`w-full max-w-4xl items-center justify-center ${
            viewMode === "both"
              ? "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              : "flex justify-center"
          }`}
        >
          {/* ========================================================= */}
          {/* FRONT FACE (OBVERSE) - EXACT MATCH TO USER'S SCREENSHOT  */}
          {/* ========================================================= */}
          {(viewMode === "both" || !isFlipped) && (
            <div className="flex flex-col items-center w-full max-w-[360px]">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 no-print">
                <span className="w-2 h-2 rounded-full bg-[#1B365D]"></span>
                Front Face
              </div>

              {/* Physical Card Container */}
              <div className="relative w-full aspect-[1/1.58] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col justify-between text-slate-800">
                {/* 1. Deep Navy Header Section */}
                <div className="relative bg-[#1B365D] pt-6 pb-12 px-5 text-white flex flex-col items-center text-center">
                  {/* Top Row: Crest Logo + Institute Name */}
                  <div className="flex items-center gap-3 justify-center">
                    {/* Circular White Logo */}
                    <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-[#1B365D] font-black text-sm shadow-sm shrink-0">
                      {profileData.instituteCode}
                    </div>

                    {/* Institute Title */}
                    <div className="text-left">
                      <h2 className="text-sm font-extrabold tracking-wide uppercase leading-tight">
                        {profileData.instituteName}
                      </h2>
                      <p className="text-[9px] tracking-[0.2em] uppercase font-semibold text-slate-300">
                        {profileData.instituteSub}
                      </p>
                    </div>
                  </div>

                  {/* Student Identity Card Pill Badge */}
                  <div className="mt-3.5">
                    <span className="inline-block px-4 py-1 bg-white/15 text-white text-[9.5px] font-semibold tracking-widest uppercase rounded-full border border-white/20">
                      STUDENT IDENTITY CARD
                    </span>
                  </div>
                </div>

                {/* 2. Photo / Avatar Box Overlapping Header and Body */}
                <div className="relative -mt-10 flex justify-center z-10 px-4">
                  <div className="w-26 h-32 bg-[#e2e8f0] rounded-2xl border-[3.5px] border-white shadow-md overflow-hidden flex items-center justify-center relative">
                    {showPhoto ? (
                      <img
                        src={profileData.photo}
                        alt={profileData.studentName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Clean Minimalist Avatar Placeholder as seen in screenshot */
                      <div className="w-full h-full bg-[#edf2f7] flex flex-col items-center justify-end pb-0 relative">
                        {/* Circular Head */}
                        <div className="w-11 h-11 rounded-full bg-[#94a3b8] absolute top-6"></div>
                        {/* Shoulders / Torso */}
                        <div className="w-18 h-11 bg-[#94a3b8] rounded-t-full"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Student Identity & Course */}
                <div className="text-center px-4 pt-2">
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                    {profileData.studentName}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {profileData.course}
                  </p>
                </div>

                {/* 4. Rounded Info Box (2x2 Grid) */}
                <div className="px-5 py-1">
                  <div className="bg-[#f8fafc] rounded-2xl p-4 border border-slate-100 grid grid-cols-2 gap-x-4 gap-y-3 text-left">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                        ROLL NO.
                      </span>
                      <span className="text-xs font-bold text-slate-900 block mt-0.5">
                        {profileData.rollNo}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                        BATCH
                      </span>
                      <span className="text-xs font-bold text-slate-900 block mt-0.5">
                        {profileData.batch}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                        DATE OF BIRTH
                      </span>
                      <span className="text-xs font-bold text-slate-900 block mt-0.5">
                        {profileData.dob}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">
                        VALID TILL
                      </span>
                      <span className="text-xs font-bold text-slate-900 block mt-0.5">
                        {profileData.validTill}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. Bottom Card No Strip & Navy Accent */}
                <div className="mt-auto">
                  <div className="px-5 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-[9.5px] font-bold tracking-widest text-slate-400 uppercase">
                      CARD NO.
                    </span>
                    <span className="font-bold text-slate-900 font-mono text-xs tracking-wider">
                      {profileData.cardNo}
                    </span>
                  </div>
                  {/* Bottom Navy Line */}
                  <div className="h-1.5 bg-[#1B365D] w-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BACK FACE (REVERSE) - EXACT MATCH TO USER'S SCREENSHOT   */}
          {/* ========================================================= */}
          {(viewMode === "both" || isFlipped) && (
            <div className="flex flex-col items-center w-full max-w-[360px]">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 no-print">
                <span className="w-2 h-2 rounded-full bg-[#1B365D]"></span>
                Back Face
              </div>

              {/* Physical Card Container */}
              <div className="relative w-full aspect-[1/1.58] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col justify-between text-slate-800">
                {/* 1. Top Navy Bar with Institute Name */}
                <div className="bg-[#1B365D] py-2.5 px-4 text-center">
                  <h3 className="text-white text-xs font-extrabold tracking-wider uppercase">
                    {profileData.instituteName} {profileData.instituteSub}
                  </h3>
                </div>

                {/* 2. QR Code Verification Section */}
                <div className="flex flex-col items-center pt-3 pb-1">
                  {/* QR Code Container */}
                  <div className="w-36 h-36 bg-white border border-slate-200 rounded-2xl p-2.5 flex items-center justify-center shadow-xs">
                    <svg
                      className="w-full h-full text-slate-900"
                      viewBox="0 0 100 100"
                      fill="currentColor"
                    >
                      {/* Accurate QR Code Matrix Representation */}
                      <rect x="5" y="5" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="6" />
                      <rect x="12" y="12" width="12" height="12" />
                      <rect x="69" y="5" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="6" />
                      <rect x="76" y="12" width="12" height="12" />
                      <rect x="5" y="69" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="6" />
                      <rect x="12" y="76" width="12" height="12" />
                      <rect x="38" y="8" width="6" height="6" />
                      <rect x="48" y="14" width="8" height="6" />
                      <rect x="58" y="8" width="6" height="10" />
                      <rect x="36" y="22" width="10" height="6" />
                      <rect x="52" y="24" width="8" height="8" />
                      <rect x="8" y="38" width="8" height="6" />
                      <rect x="22" y="38" width="6" height="8" />
                      <rect x="34" y="36" width="14" height="14" />
                      <rect x="54" y="38" width="8" height="8" />
                      <rect x="68" y="36" width="12" height="6" />
                      <rect x="86" y="38" width="6" height="8" />
                      <rect x="8" y="48" width="6" height="10" />
                      <rect x="20" y="50" width="8" height="6" />
                      <rect x="38" y="54" width="8" height="12" />
                      <rect x="52" y="52" width="12" height="6" />
                      <rect x="70" y="48" width="8" height="10" />
                      <rect x="84" y="50" width="8" height="8" />
                      <rect x="36" y="70" width="10" height="8" />
                      <rect x="50" y="66" width="8" height="12" />
                      <rect x="64" y="68" width="14" height="8" />
                      <rect x="84" y="68" width="8" height="10" />
                      <rect x="38" y="84" width="8" height="8" />
                      <rect x="52" y="82" width="10" height="10" />
                      <rect x="68" y="82" width="10" height="8" />
                      <rect x="82" y="84" width="10" height="8" />
                    </svg>
                  </div>

                  <span className="text-[11px] text-slate-500 font-medium mt-1.5">
                    Scan to verify this card
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 font-mono tracking-wider mt-0.5">
                    {profileData.cardNo}
                  </span>
                </div>

                {/* 3. Three Data Rows (Blood Group, Emergency Contact, Address) */}
                <div className="px-6 py-2 space-y-2 text-xs">
                  {/* Row 1: Blood Group */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-[9.5px] font-bold text-slate-400 tracking-wider uppercase">
                      BLOOD GROUP
                    </span>
                    <span className="font-bold text-slate-900 text-xs">
                      {profileData.bloodGroup}
                    </span>
                  </div>

                  {/* Row 2: Emergency Contact */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-[9.5px] font-bold text-slate-400 tracking-wider uppercase">
                      EMERGENCY CONTACT
                    </span>
                    <span className="font-bold text-slate-900 font-mono text-xs">
                      {profileData.emergencyContact}
                    </span>
                  </div>

                  {/* Row 3: Address */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-[9.5px] font-bold text-slate-400 tracking-wider uppercase shrink-0">
                      ADDRESS
                    </span>
                    <span className="font-bold text-slate-900 text-xs text-right truncate pl-3">
                      {profileData.address}
                    </span>
                  </div>
                </div>

                {/* 4. Principal Signature Section */}
                <div className="px-6 pt-1 pb-2 flex flex-col items-end">
                  <div className="w-36 text-center">
                    <div className="font-serif italic text-base font-bold text-slate-800 tracking-tight leading-tight">
                      {profileData.signatoryName}
                    </div>
                    <div className="w-full border-b border-slate-800 my-0.5"></div>
                    <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase block">
                      {profileData.signatoryTitle}
                    </span>
                  </div>
                </div>

                {/* 5. Institutional Disclaimer Footer */}
                <div className="mt-auto">
                  <div className="px-4 py-2 border-t border-slate-100 text-center text-[9.5px] text-slate-500 leading-tight space-y-0.5">
                    <p>{profileData.returnAddressLine1}</p>
                    <p>{profileData.returnAddressLine2}</p>
                    <p className="text-[#1B365D] font-semibold">{profileData.website}</p>
                  </div>
                  {/* Bottom Navy Line */}
                  <div className="h-1.5 bg-[#1B365D] w-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guidelines & Institutional Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#1B365D]">
              <ShieldCheck className="w-4 h-4" />
              <h2 className="text-sm font-bold">Identity &amp; Campus Entry</h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              This identity badge is required for physical gate entry, laboratory access, and semester examination halls.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Card Specification: ISO/IEC 7810 Standard
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#1B365D]">
              <QrCode className="w-4 h-4" />
              <h2 className="text-sm font-bold">Digital QR Verification</h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Scanning the reverse QR code validates student enrollment status directly against institutional records.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Card ID: {profileData.cardNo}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#1B365D]">
              <Building className="w-4 h-4" />
              <h2 className="text-sm font-bold">Loss &amp; Replacement</h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              In case of loss or damage, report to the institute administrative office for reissue within 3 working days.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Support: helpdesk@sunriseinstitute.edu.in
          </div>
        </div>
      </div>
    </div>
  );
}
