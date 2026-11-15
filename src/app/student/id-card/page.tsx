"use client";

import { useState } from "react";
import {
  CreditCard,
  Printer,
  Download,
  RotateCw,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  QrCode,
  X,
  Building,
  User,
  Phone,
  FileCheck,
  MapPin,
  Calendar,
  BadgeCheck,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function StudentIdCardPage() {
  const [viewMode, setViewMode] = useState<"both" | "flip">("both");
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStatus, setCardStatus] = useState<"active" | "suspended">("active");
  const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [duplicateReason, setDuplicateReason] = useState("Lost / Misplaced");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleFreeze = () => {
    if (cardStatus === "active") {
      setCardStatus("suspended");
      setIsFreezeModalOpen(false);
      showToast("Card temporarily locked. Campus access suspended.");
    } else {
      setCardStatus("active");
      setIsFreezeModalOpen(false);
      showToast("Card unlocked successfully! Campus access restored.");
    }
  };

  const handleDuplicateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDuplicateModalOpen(false);
    showToast(
      `Duplicate ID card request submitted (#DUP-${Math.floor(
        1000 + Math.random() * 9000
      )}). Collection in 3 working days.`
    );
  };

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto font-sans text-slate-800">
      {/* Print Specific CSS to isolate Front & Back ID Card on 1 Page */}
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
            padding: 15mm 20mm;
            background: white !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: center !important;
            align-items: flex-start !important;
            gap: 12mm !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom no-print">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-200/80 shadow-xs no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
              Student Identity Card
            </h1>
            {cardStatus === "active" ? (
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active &amp; Verified
              </span>
            ) : (
              <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Temporarily Locked
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Official identity badge &bull; Rahul Sharma (Roll: 23CS042 &bull; Reg: APX-2023-CS-042)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#355C7D]" />
            <span>Print ID Card</span>
          </button>
          <button
            onClick={() => showToast("Downloading high-resolution ID card PDF...")}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#355C7D] hover:bg-[#2A4963] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={() => setIsDuplicateModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-700" />
            <span>Request Duplicate</span>
          </button>
        </div>
      </div>

      {/* 4 Summary / Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        {/* Card 1: Status */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              cardStatus === "active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Card Status
            </span>
            <span className="text-base font-bold text-slate-800">
              {cardStatus === "active" ? "Active & Valid" : "Temporarily Locked"}
            </span>
            <span className="text-[11px] text-slate-500 block">Semester IV (AY 2024–25)</span>
          </div>
        </div>

        {/* Card 2: Validity */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-[#355C7D]" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Validity Period
            </span>
            <span className="text-base font-bold text-slate-800">Aug 2023 – Jun 2027</span>
            <span className="text-[11px] text-slate-500 block">4 Academic Years (B.Tech)</span>
          </div>
        </div>

        {/* Card 3: Library Membership */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Building className="w-5 h-5 text-[#3D405B]" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Library Card ID
            </span>
            <span className="text-base font-bold text-slate-800">APX-LIB-2023-042</span>
            <span className="text-[11px] text-emerald-600 font-medium block">Active &bull; 0 Overdue</span>
          </div>
        </div>

        {/* Card 4: Issuing Authority */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <BadgeCheck className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Issuing Office
            </span>
            <span className="text-base font-bold text-slate-800">Office of Registrar</span>
            <span className="text-[11px] text-slate-500 block">Dr. K. N. Murthy</span>
          </div>
        </div>
      </div>

      {/* Main Card View Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 flex flex-col items-center">
        {/* View Mode Switcher Toolbar */}
        <div className="w-full max-w-4xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 no-print">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#355C7D]" />
            <span className="text-sm font-bold text-[#3D405B]">
              Institutional Identity Badge Preview
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-400">
              &bull; Standard Vertical ID-1 Format
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setViewMode("both");
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                viewMode === "both"
                  ? "bg-white text-[#3D405B] shadow-xs"
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
                  ? "bg-white text-[#3D405B] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip Card ({isFlipped ? "Back" : "Front"})</span>
            </button>
          </div>
        </div>

        {/* Printable & Screen ID Card Render Container */}
        <div
          id="printable-id-card"
          className={`w-full max-w-4xl items-center justify-center ${
            viewMode === "both"
              ? "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              : "flex justify-center"
          }`}
        >
          {/* ======================================================== */}
          {/* FRONT OF THE ID CARD                                     */}
          {/* ======================================================== */}
          {(viewMode === "both" || !isFlipped) && (
            <div className="flex flex-col items-center w-full max-w-[340px]">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 no-print">
                <span className="w-2 h-2 rounded-full bg-[#355C7D]"></span>
                Front Side
              </div>

              {/* Physical Card Body */}
              <div className="relative w-full aspect-[1/1.586] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-300 flex flex-col justify-between text-slate-800">
                {/* Gloss / Depth Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-slate-200/20"></div>

                {/* Top Banner (Steel Blue / Navy) */}
                <div className="relative z-10 bg-gradient-to-r from-[#355C7D] via-[#3D405B] to-[#2E3046] px-4 py-3 text-white border-b-2 border-amber-400">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center font-bold text-amber-300 text-sm shadow-xs shrink-0">
                      AIT
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wide leading-tight truncate">
                        Apex Institute of Technology
                      </div>
                      <div className="text-[8px] text-slate-200 tracking-wider uppercase">
                        &amp; Management &bull; New Delhi
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[8px] text-amber-200 font-medium tracking-wider">
                    <span>STUDENT IDENTITY CARD</span>
                    <span>SESSION 2023–27</span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="relative z-10 px-4 py-2 flex-1 flex flex-col justify-between">
                  {/* Photo & Primary Info */}
                  <div className="flex items-center gap-3.5 pt-1">
                    {/* Student Photo */}
                    <div className="relative shrink-0">
                      <div className="w-22 h-26 rounded-xl overflow-hidden border-2 border-[#355C7D]/30 shadow-sm bg-slate-100">
                        <img
                          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
                          alt="Rahul Sharma"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>

                    {/* Name & Academic Details */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Student Name
                      </span>
                      <h2 className="text-base font-extrabold text-[#3D405B] leading-tight truncate">
                        RAHUL SHARMA
                      </h2>

                      <div className="mt-1.5 space-y-0.5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-500 font-medium">Roll No:</span>
                          <span className="font-bold text-[#355C7D] font-mono text-[11px]">
                            23CS042
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-500 font-medium">Reg No:</span>
                          <span className="font-semibold text-slate-700 font-mono text-[10px]">
                            APX-2023-CS-042
                          </span>
                        </div>
                        <div className="text-[10px] font-semibold text-slate-800 leading-tight pt-0.5">
                          B.Tech &bull; Computer Science &amp; Engg
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200/80 text-center my-1.5">
                    <div>
                      <span className="text-[8px] text-slate-400 font-medium uppercase block">
                        Blood Grp
                      </span>
                      <span className="text-[11px] font-bold text-slate-800">O+</span>
                    </div>
                    <div className="border-x border-slate-200">
                      <span className="text-[8px] text-slate-400 font-medium uppercase block">
                        DOB
                      </span>
                      <span className="text-[11px] font-bold text-slate-800">15/08/2004</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-400 font-medium uppercase block">
                        Valid Thru
                      </span>
                      <span className="text-[11px] font-bold text-slate-800">Jun 2027</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Barcode & Footer Strip */}
                <div className="relative z-10 px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex flex-col">
                    {/* Realistic Barcode Graphic */}
                    <svg className="h-5 w-32 fill-slate-800" viewBox="0 0 145 24">
                      <rect height="24" width="2" x="0" y="0"></rect>
                      <rect height="24" width="1" x="4" y="0"></rect>
                      <rect height="24" width="3" x="7" y="0"></rect>
                      <rect height="24" width="1" x="12" y="0"></rect>
                      <rect height="24" width="2" x="15" y="0"></rect>
                      <rect height="24" width="4" x="20" y="0"></rect>
                      <rect height="24" width="1" x="26" y="0"></rect>
                      <rect height="24" width="2" x="30" y="0"></rect>
                      <rect height="24" width="1" x="34" y="0"></rect>
                      <rect height="24" width="3" x="38" y="0"></rect>
                      <rect height="24" width="2" x="44" y="0"></rect>
                      <rect height="24" width="1" x="48" y="0"></rect>
                      <rect height="24" width="3" x="52" y="0"></rect>
                      <rect height="24" width="1" x="58" y="0"></rect>
                      <rect height="24" width="2" x="62" y="0"></rect>
                      <rect height="24" width="4" x="66" y="0"></rect>
                      <rect height="24" width="2" x="73" y="0"></rect>
                      <rect height="24" width="1" x="78" y="0"></rect>
                      <rect height="24" width="3" x="82" y="0"></rect>
                      <rect height="24" width="1" x="88" y="0"></rect>
                      <rect height="24" width="2" x="92" y="0"></rect>
                      <rect height="24" width="3" x="97" y="0"></rect>
                      <rect height="24" width="1" x="103" y="0"></rect>
                      <rect height="24" width="4" x="107" y="0"></rect>
                      <rect height="24" width="2" x="114" y="0"></rect>
                      <rect height="24" width="1" x="119" y="0"></rect>
                      <rect height="24" width="3" x="123" y="0"></rect>
                      <rect height="24" width="1" x="129" y="0"></rect>
                      <rect height="24" width="3" x="133" y="0"></rect>
                      <rect height="24" width="2" x="139" y="0"></rect>
                    </svg>
                    <span className="font-mono text-[8px] text-slate-500 tracking-wider">
                      APX-2023-CS-042
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-semibold text-[#355C7D] block">
                      OFFICIAL ID
                    </span>
                    <span className="text-[7.5px] text-slate-400 block">Apex Campus Card</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* BACK OF THE ID CARD                                      */}
          {/* ======================================================== */}
          {(viewMode === "both" || isFlipped) && (
            <div className="flex flex-col items-center w-full max-w-[340px]">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 no-print">
                <span className="w-2 h-2 rounded-full bg-[#3D405B]"></span>
                Back Side
              </div>

              {/* Physical Card Body */}
              <div className="relative w-full aspect-[1/1.586] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-300 flex flex-col justify-between text-slate-800">
                {/* Magnetic Stripe Preview */}
                <div className="w-full h-8 bg-slate-900 mt-2 flex items-center justify-between px-4">
                  <span className="text-[7.5px] font-mono text-slate-400 uppercase tracking-widest">
                    CAMPUS ACCESS &bull; LIBRARY &bull; EXAMINATION
                  </span>
                  <span className="text-[7.5px] font-mono text-slate-400">APX-2023</span>
                </div>

                {/* Back Content Area */}
                <div className="px-4 py-2 flex-1 flex flex-col justify-between text-left">
                  {/* Instructions */}
                  <div>
                    <h3 className="text-[9px] font-bold text-[#355C7D] uppercase tracking-wider border-b border-slate-200 pb-0.5 mb-1">
                      Terms &amp; Instructions
                    </h3>
                    <ul className="text-[7.5px] text-slate-600 space-y-0.5 leading-tight list-disc pl-3">
                      <li>This card is non-transferable and remains property of the Institute.</li>
                      <li>Must be produced on demand by university staff or faculty.</li>
                      <li>Loss or theft of this card must be immediately reported to the Registrar.</li>
                      <li>Mandatory for campus entry, library borrowing, and semester exams.</li>
                    </ul>
                  </div>

                  {/* Addresses & Contacts */}
                  <div className="space-y-1 text-[8px] bg-slate-50 p-2 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="font-semibold text-slate-700">Permanent Address: </span>
                      <span className="text-slate-600">
                        Sector 14, Gurugram, Haryana &bull; 122001
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Campus Residence: </span>
                      <span className="text-slate-600">
                        Room 314, Hostel Block C, North Campus
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5 border-t border-slate-200">
                      <div>
                        <span className="font-semibold text-slate-700">Emergency: </span>
                        <span className="text-[#355C7D] font-bold font-mono">
                          +91 98111 22334 (Father)
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Security: </span>
                        <span className="font-mono text-slate-700 font-semibold">Ext 1099</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code & Signatures Row */}
                  <div className="flex items-end justify-between gap-3 pt-1 border-t border-slate-200">
                    {/* Official QR Code */}
                    <div className="p-1 bg-white border border-slate-200 rounded-lg flex flex-col items-center shrink-0">
                      <QrCode className="w-11 h-11 text-[#3D405B]" />
                      <span className="text-[6px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5">
                        Scan to Verify
                      </span>
                    </div>

                    {/* Student Signature */}
                    <div className="text-center flex-1">
                      <div className="h-6 flex items-center justify-center font-serif italic text-slate-700 text-xs">
                        Rahul Sharma
                      </div>
                      <div className="border-t border-slate-300 pt-0.5">
                        <span className="text-[7px] text-slate-500 font-medium uppercase block">
                          Cardholder Signature
                        </span>
                      </div>
                    </div>

                    {/* Registrar Signature */}
                    <div className="text-center flex-1">
                      <div className="h-6 flex items-center justify-center font-serif italic text-[#355C7D] text-xs font-bold">
                        K.N. Murthy
                      </div>
                      <div className="border-t border-slate-300 pt-0.5">
                        <span className="text-[7px] text-slate-800 font-bold uppercase block">
                          Dr. K. N. Murthy
                        </span>
                        <span className="text-[6.5px] text-slate-500 block leading-none">
                          Registrar
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return Address Footer */}
                <div className="bg-slate-100 px-4 py-1.5 border-t border-slate-200 text-center">
                  <p className="text-[7px] text-slate-500 leading-tight">
                    If found, please return to: Office of Registrar, Apex Institute of Technology &amp; Management, Delhi-NCR, India &bull; Phone: +91 11 2659 1000
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guidelines & Card Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 no-print">
        {/* Card Management Action Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-[#355C7D]" />
              <h2 className="text-sm font-bold text-[#3D405B]">Card Security &amp; Control</h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              If your card is misplaced or temporarily missing, lock it instantly to prevent unauthorized use across campus.
            </p>
          </div>
          <div className="mt-5 space-y-2">
            {cardStatus === "active" ? (
              <button
                onClick={() => setIsFreezeModalOpen(true)}
                className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Temporarily Lock ID Card</span>
              </button>
            ) : (
              <button
                onClick={handleToggleFreeze}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock &amp; Restore Access</span>
              </button>
            )}
            <button
              onClick={() => setIsDuplicateModalOpen(true)}
              className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-slate-500" />
              <span>Apply for Duplicate Card</span>
            </button>
          </div>
        </div>

        {/* Student Guidelines Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-[#355C7D]" />
              <h2 className="text-sm font-bold text-[#3D405B]">Important Instructions</h2>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355C7D] mt-1.5 shrink-0"></span>
                <span>Mandatory to wear / carry your ID card inside college premises and during semester exams.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355C7D] mt-1.5 shrink-0"></span>
                <span>Scan card barcode at the Central Library desk to issue or return reference books.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355C7D] mt-1.5 shrink-0"></span>
                <span>Duplicate card fee is ₹200 (INR) in case of permanent loss or physical damage.</span>
              </li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Valid across all university campuses &bull; Academic Year 2024–25
          </div>
        </div>

        {/* Academic Cell Helpdesk Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-[#355C7D]" />
              <h2 className="text-sm font-bold text-[#3D405B]">Registrar Academic Cell</h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              For ID card corrections, photo updates, or duplicate card collections, visit the Academic Cell desk.
            </p>
            <div className="mt-3 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Ground Floor, Administrative Block A</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Mon – Fri &bull; 9:30 AM to 4:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>+91 11 2659 1000 (Ext: 1042)</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Contact: <span className="font-semibold text-slate-700">academic.cell@apex.edu.in</span>
          </div>
        </div>
      </div>

      {/* MODAL: Temporary Freeze Card Confirmation */}
      {isFreezeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200 p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-bold">Lock ID Card</h3>
              </div>
              <button
                onClick={() => setIsFreezeModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-xs space-y-3">
              <p className="text-slate-700 leading-relaxed">
                Are you sure you want to temporarily lock ID card for{" "}
                <strong className="text-slate-900">Rahul Sharma (23CS042)</strong>?
              </p>
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl leading-relaxed">
                &bull; Library issue, lab entry, and turnstiles will be paused.
                <br />
                &bull; You can unlock your card anytime from this portal with one click.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
              <button
                onClick={() => setIsFreezeModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleToggleFreeze}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Confirm Lock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Request Duplicate ID Card */}
      {isDuplicateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#3D405B]">
                <CreditCard className="w-5 h-5 text-[#355C7D]" />
                <h3 className="text-base font-bold">Request Duplicate ID Card</h3>
              </div>
              <button
                onClick={() => setIsDuplicateModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDuplicateSubmit} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Student Details
                </label>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700 font-mono text-[11px]">
                  Rahul Sharma &bull; 23CS042 &bull; B.Tech CSE (Sem IV)
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Reason for Duplicate Card
                </label>
                <select
                  value={duplicateReason}
                  onChange={(e) => setDuplicateReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-[#355C7D] outline-none"
                >
                  <option value="Lost / Misplaced">Lost / Misplaced</option>
                  <option value="Physical Damage / Broken">Physical Damage / Broken</option>
                  <option value="Information / Photo Correction">
                    Information / Photo Correction
                  </option>
                  <option value="Stolen / Theft">Stolen / Theft</option>
                </select>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                <div className="font-semibold flex items-center justify-between">
                  <span>Re-issuance Processing Fee:</span>
                  <span className="font-bold text-sm">₹200 (INR)</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  Fee will be added to your semester fee ledger or can be paid at the Registrar counter.
                </p>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed">
                Collection Point: Academic Cell Desk, Ground Floor, Block A. Processing time is 3 working days.
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsDuplicateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#355C7D] hover:bg-[#2A4963] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Submit Application (₹200)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
