"use client";

import { useState } from "react";
import {
  CreditCard,
  Printer,
  Download,
  RotateCw,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  QrCode,
  Radio,
  X,
  Wallet,
  Crop,
  Grid,
  Building,
  User,
  Phone,
  FileCheck,
  ShieldAlert
} from "lucide-react";

export default function StudentIdCardPage() {
  const [viewMode, setViewMode] = useState<"both" | "flip">("both");
  const [isFlipped, setIsFlipped] = useState(false);
  const [printLayout, setPrintLayout] = useState<"single" | "sheet">("single");
  const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);
  const [cardStatus, setCardStatus] = useState<"active" | "frozen">("active");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFreezeCard = () => {
    setCardStatus("frozen");
    setIsFreezeModalOpen(false);
    showToast("CR80 Smart Card access frozen! RFID keys revoked campus-wide.");
  };

  const handleUnfreezeCard = () => {
    setCardStatus("active");
    showToast("CR80 Smart Card re-activated! Biometrics re-synced.");
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

      {/* Command Center Header Area */}
      <div className="px-6 py-5 bg-surface-container-lowest border-b border-[#0D2545]/15 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-on-surface-variant font-semibold">
                Student Portal
              </span>
              <span className="text-[11px] text-outline">/</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-secondary font-bold">
                My ID Card
              </span>
              <span className="ml-2 px-2 py-0.5 bg-surface-container font-mono text-[10px] text-secondary tracking-widest uppercase border border-[#c4c6cf]">
                CR80 Compliant
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-primary">
              Digital Student Smart Badge &amp; ID Card Studio
            </h1>
            <p className="text-xs font-mono text-on-surface-variant mt-0.5">
              Standard Specification:{" "}
              <span className="text-primary font-semibold">
                ISO/IEC 7810 ID-1 (CR80 Standard: 85.6 mm × 53.98 mm • 3.370 in × 2.125 in • Micro-Chip Embedded)
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="h-9 px-3.5 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 border border-[#cbd5e1] shadow-sm transition-colors"
            >
              <Printer className="h-4 w-4 text-secondary" />
              <span>Print CR80 Badge</span>
            </button>
            <button
              onClick={() => showToast("Exporting high-resolution vector PDF (300 DPI CMYK)...")}
              className="h-9 px-3.5 bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-sm transition-colors"
            >
              <Download className="h-4 w-4 text-secondary-container" />
              <span>Download High-Res PDF</span>
            </button>
          </div>
        </div>

        {/* Smart Card Telemetry Row (4 Metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mt-4 pt-3 border-t border-[#0D2545]/10">
          {/* Telemetry 1 */}
          <div className="bg-surface-container-low p-3.5 shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-[#047857]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Card Security State
              </span>
              {cardStatus === "active" ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#ECFDF5] text-[#047857] font-mono text-[10px] uppercase font-bold border border-[#a7f3d0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#047857] animate-pulse"></span>Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#FEF2F2] text-error font-mono text-[10px] uppercase font-bold border border-[#fecaca]">
                  <Lock className="w-3 h-3" /> Frozen
                </span>
              )}
            </div>
            <div className="mt-2">
              <div className="text-sm font-bold text-on-surface">
                {cardStatus === "active" ? "NFC & Biometrics Synced" : "Card Access Suspended"}
              </div>
              <p className="font-mono text-[11px] text-on-surface-variant mt-0.5">
                {cardStatus === "active"
                  ? "Turnstile gates, library access & meal terminal authorized"
                  : "Revoked campus-wide. Contact campus security to restore."}
              </p>
            </div>
          </div>

          {/* Telemetry 2 */}
          <div className="bg-surface-container-low p-3.5 shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-secondary">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Hardware Serial Identifier
              </span>
              <CreditCard className="h-4 w-4 text-secondary" />
            </div>
            <div className="mt-2">
              <div className="font-mono text-sm font-bold text-on-surface">APX-CR80-2023-9941</div>
              <p className="font-mono text-[11px] text-on-surface-variant mt-0.5">
                RFID Mifare DESFire EV3 8K • UID #04:2E:8C:91
              </p>
            </div>
          </div>

          {/* Telemetry 3 */}
          <div className="bg-surface-container-low p-3.5 shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Accredited Validity Period
              </span>
              <FileCheck className="h-4 w-4 text-outline" />
            </div>
            <div className="mt-2">
              <div className="text-sm font-bold text-on-surface">01 Aug 2023 – 30 Jun 2027</div>
              <p className="font-mono text-[11px] text-on-surface-variant mt-0.5">
                Enrolled for 4 Academic Cycles (Undergraduate Level)
              </p>
            </div>
          </div>

          {/* Telemetry 4 */}
          <div className="bg-surface-container-low p-3.5 shadow-sm relative overflow-hidden flex flex-col justify-between border-l-4 border-tertiary-container">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                Authorized Perimeters
              </span>
              <span className="font-mono text-[10px] font-bold text-primary bg-secondary-container px-1.5 py-0.5">
                ZONE CLEARANCE
              </span>
            </div>
            <div className="mt-2">
              <div className="text-sm font-bold text-on-surface">4 Authorized Zones</div>
              <p className="font-mono text-[11px] text-on-surface-variant mt-0.5">
                Main Block, Turing Comp Lab, Central Lib, North Gym
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas: Physical Realistic Dual Card CR80 Showcase */}
      <div className="px-6 py-6 flex flex-col items-center">
        {/* Interactive View Switcher Toolbar */}
        <div className="w-full max-w-5xl mb-6 flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-3 shadow-sm border border-[#cbd5e1]">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-secondary" />
            <span className="text-sm font-bold text-primary uppercase tracking-tight">
              Dual Side Physical Render Showcase
            </span>
            <span className="hidden md:inline-block font-mono text-[11px] text-outline ml-2">
              Scale: 1:1 Aspect Virtual Preview (CR80 Portrait Specification)
            </span>
          </div>

          <div className="flex items-center gap-1 bg-surface-container p-1 border border-[#c4c6cf]">
            <button
              onClick={() => {
                setViewMode("both");
                setIsFlipped(false);
              }}
              className={`px-3 py-1 font-mono text-xs uppercase font-bold tracking-wider transition-colors ${
                viewMode === "both"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface hover:bg-surface-container-high"
              }`}
            >
              Both Sides
            </button>
            <button
              onClick={() => {
                setViewMode("flip");
                setIsFlipped(!isFlipped);
              }}
              className={`px-3 py-1 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors ${
                viewMode === "flip"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <RotateCw className="h-3.5 w-3.5" />
              <span>360 Rotate / Flip</span>
            </button>
          </div>
        </div>

        {/* Cards Display Grid */}
        <div
          className={`w-full max-w-5xl items-center justify-items-center ${
            viewMode === "both"
              ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
              : "flex justify-center"
          }`}
        >
          {/* ========================================== */}
          {/* CARD FRONT (Realistic CR80 Vertical Card)  */}
          {/* ========================================== */}
          {(viewMode === "both" || !isFlipped) && (
            <div className="flex flex-col items-center w-full max-w-[340px]">
              <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> FRONT ELEVATION • OBSERVE FACING
              </div>

              {/* Physical Card Container (CR80 Aspect Ratio 53.98 x 85.6 mm ~ 1 : 1.586) */}
              <div className="relative w-full aspect-[1/1.586] bg-[#0A192F] text-white shadow-2xl overflow-hidden rounded-xl flex flex-col justify-between border border-[#19477e]">
                {/* Surface Gloss Glaze Overlays */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-70"></div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#99c0fe]/15 via-transparent to-transparent pointer-events-none"></div>

                {/* FRONT: Top Header Section */}
                <div className="relative z-10 px-4 pt-3.5 pb-2 bg-gradient-to-b from-[#0D2545] to-[#07172C] border-b border-[#99c0fe]/30">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Institute Crest */}
                      <div className="w-7 h-7 bg-[#d5e3ff] flex items-center justify-center text-primary font-black text-xs shadow-sm rounded-sm">
                        A
                      </div>
                      <div>
                        <div className="text-[10px] tracking-tight text-white uppercase font-bold leading-tight">
                          Apex Institute of
                        </div>
                        <div className="text-[8px] tracking-widest text-[#99c0fe] uppercase font-semibold">
                          Technology &amp; Management
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-1.5 py-0.5 bg-[#99c0fe]/20 text-[#d5e3ff] font-mono text-[7.5px] tracking-widest uppercase font-semibold">
                        STUDENT SMART CARD
                      </span>
                    </div>
                  </div>
                </div>

                {/* FRONT: Main Body Section */}
                <div className="relative z-10 px-4 py-2 flex-1 flex flex-col justify-between">
                  {/* Top sub-row: Smart Chip & Hologram Seal */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Physical EMV Chip Graphic */}
                    <div className="relative w-11 h-8 bg-gradient-to-br from-[#E6C687] via-[#DFBA73] to-[#BF964B] rounded-sm p-[2px] shadow-sm">
                      <div className="w-full h-full border border-[#8C6D23]/60 relative flex items-center justify-center">
                        <div className="absolute w-full h-[1px] bg-[#8C6D23]/60"></div>
                        <div className="absolute h-full w-[1px] bg-[#8C6D23]/60"></div>
                        <div className="w-3.5 h-3.5 rounded-full border border-[#8C6D23]/60 bg-[#D4AE5E]/40 z-10"></div>
                      </div>
                    </div>

                    {/* Contactless / Holographic Accreditation Seal */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#99c0fe] text-xs font-mono font-bold tracking-tighter">RFID ///</span>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#99c0fe]/30 via-white/40 to-[#d6e3ff]/20 flex items-center justify-center shadow-inner relative overflow-hidden backdrop-blur-xs border border-white/20">
                        <div className="text-[6.5px] font-mono uppercase font-bold text-center leading-none text-white/90">
                          AUTON<br />2027
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Block: Photo + Name / Degree */}
                  <div className="flex items-center gap-3.5 my-auto">
                    {/* Student Photo */}
                    <div className="relative shrink-0">
                      <div className="w-24 h-28 bg-[#19477e] p-[2px] shadow-md relative rounded-xs">
                        <img
                          alt="Student Portrait"
                          className="w-full h-full object-cover contrast-105"
                          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#047857] flex items-center justify-center text-white rounded-full">
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                      </div>
                    </div>

                    {/* Primary Academic Record */}
                    <div className="flex flex-col justify-center min-w-0">
                      <div className="font-mono text-[8px] text-[#99c0fe] uppercase tracking-widest leading-none">
                        Full Legal Identity
                      </div>
                      <div className="text-sm text-white font-bold tracking-tight uppercase leading-snug mt-0.5 truncate">
                        RAHUL SHARMA
                      </div>
                      <div className="mt-1.5 flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[8.5px] text-[#d5e3ff]/70 uppercase">ID NO:</span>
                          <span className="font-mono text-[11px] text-[#99c0fe] font-bold tracking-wider">
                            APX-2023-CS-042
                          </span>
                        </div>
                        <div className="text-[10px] font-medium text-white leading-tight">
                          B.Tech Computer Science &amp; Engg
                        </div>
                        <div className="font-mono text-[8.5px] text-[#d5e3ff]/80">
                          Cycle: <span className="font-semibold text-white">Batch 2023 – 2027</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student Metadata Key-Value Matrix */}
                  <div className="bg-black/35 p-2 grid grid-cols-2 gap-2 text-[8px] font-mono rounded-sm">
                    <div className="flex items-center justify-between pr-2 border-r border-white/10">
                      <span className="text-[#99c0fe] uppercase">Blood Group</span>
                      <span className="text-white font-bold">O+</span>
                    </div>
                    <div className="flex items-center justify-between pl-2">
                      <span className="text-[#99c0fe] uppercase">Emergency</span>
                      <span className="text-white font-bold tracking-tight">+91 98111 22334</span>
                    </div>
                  </div>
                </div>

                {/* FRONT: Bottom Barcode & Security Strip */}
                <div className="relative z-10 px-4 py-2 bg-gradient-to-t from-[#050D1A] to-[#0A192F] flex items-center justify-between border-t border-[#99c0fe]/20">
                  <div className="flex flex-col">
                    {/* Barcode SVG */}
                    <svg className="h-6 w-36 fill-white" viewBox="0 0 145 24">
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
                    <span className="font-mono text-[7px] text-[#99c0fe] tracking-widest mt-0.5">
                      APX-2023-CS-042-CR80
                    </span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="font-mono text-[7px] text-[#d5e3ff]/70 tracking-tighter">SECURE CARD CHIP</span>
                    <span className="font-mono text-[8px] text-[#99c0fe] font-bold">DESFire EV3</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 font-mono text-xs text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" /> Hologram Layer
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" /> EMV Contact Pin
                </span>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* CARD BACK (Realistic CR80 Vertical Card)   */}
          {/* ========================================== */}
          {(viewMode === "both" || isFlipped) && (
            <div className="flex flex-col items-center w-full max-w-[340px]">
              <div className="font-mono text-xs uppercase tracking-widest text-on-surface-variant mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span> REVERSE ELEVATION • MRZ TELEMETRY
              </div>

              {/* Physical Card Container (Same CR80 Ratio) */}
              <div className="relative w-full aspect-[1/1.586] bg-[#0E1B2E] text-white shadow-2xl overflow-hidden rounded-xl flex flex-col justify-between border border-[#19477e]">
                {/* Surface Gloss Glaze Overlays */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-bl from-white/0 via-white/5 to-white/10 opacity-70"></div>

                {/* Magnetic Stripe (HiCo 4000 Oe) */}
                <div className="relative z-10 w-full h-7 bg-[#05070A] mt-2 shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  <div className="w-full h-full flex items-center justify-between px-4">
                    <span className="font-mono text-[6.5px] text-white/30 uppercase tracking-widest">
                      3-TRACK HIGH COERCIVITY (HiCo) MAGNETIC STRIPE
                    </span>
                    <span className="font-mono text-[6.5px] text-[#99c0fe]/50 font-bold">4000 Oe</span>
                  </div>
                </div>

                {/* BACK: Header & Ordinances */}
                <div className="relative z-10 px-4 pt-1">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#99c0fe] font-bold">
                      TERMS OF USE &amp; CAMPUS ORDINANCES
                    </span>
                    <span className="font-mono text-[7.5px] text-[#d5e3ff]/60">OFFICIAL PROPERTY</span>
                  </div>
                  <p className="font-mono text-[6.8px] leading-tight text-[#d5e3ff]/70 text-justify">
                    This credentials card remains the sole property of Apex Institute of Technology &amp; Management.
                    Possession signifies adherence to academic bylaws. Transfer, tampering or duplicate presentation is
                    punishable under University Statute §14-A.
                  </p>
                </div>

                {/* BACK: Mid Section (QR, Address, Signatures) */}
                <div className="relative z-10 px-4 py-1 flex-1 flex flex-col justify-around">
                  <div className="flex items-start gap-3">
                    {/* QR Code */}
                    <div className="shrink-0 p-1.5 bg-white shadow-sm flex flex-col items-center rounded-xs">
                      <QrCode className="h-14 w-14 text-black" />
                      <span className="font-mono text-[5.5px] text-black font-bold tracking-tighter mt-0.5">
                        SCAN TO AUDIT
                      </span>
                    </div>

                    {/* Student Residence & Coordinates */}
                    <div className="flex-1 flex flex-col justify-between text-[7.5px] font-mono">
                      <div className="mb-1">
                        <div className="text-[#99c0fe] uppercase font-bold tracking-tight">Campus Residence:</div>
                        <div className="text-white leading-tight">Hall of Residence Block C, Room 314, North Campus</div>
                      </div>
                      <div className="mb-1">
                        <div className="text-[#99c0fe] uppercase font-bold tracking-tight">Permanent Domicile:</div>
                        <div className="text-white leading-tight">Gurugram, Haryana • India</div>
                      </div>
                      <div className="flex items-center justify-between bg-black/40 p-1 rounded-xs">
                        <span className="text-[#d5e3ff]/80">Library Patron:</span>
                        <span className="text-[#99c0fe] font-bold">APX-LIB-8841</span>
                      </div>
                    </div>
                  </div>

                  {/* Signatures Row */}
                  <div className="pt-1 flex items-end justify-between border-t border-white/10">
                    <div>
                      <div className="font-mono text-[6.5px] text-[#99c0fe] uppercase font-bold">
                        Institutional Dispatch Desk
                      </div>
                      <div className="font-mono text-[7px] text-white">Registrar: +1 800 492-APEX</div>
                      <div className="font-mono text-[7px] text-[#d5e3ff]/80">Campus Security: Ext 1099 / 911</div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                      <div className="h-5 w-20 flex items-center justify-center font-serif italic text-white/70 text-[10px]">
                        Margaret Vance
                      </div>
                      <div className="font-mono text-[6.5px] text-[#d5e3ff]/90 uppercase font-bold tracking-wider">
                        Dr. Margaret Vance
                      </div>
                      <div className="font-mono text-[5.5px] text-[#99c0fe]/80 uppercase">
                        Registrar &amp; Dean Academic Ops
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK: Machine Readable Zone (MRZ Lines at Bottom) */}
                <div className="relative z-10 px-3 py-1.5 bg-[#050B14] font-mono text-[8.5px] tracking-[0.14em] text-[#99c0fe] leading-none flex flex-col gap-0.5 border-t border-[#99c0fe]/30 select-all">
                  <div className="truncate">I&lt;INDAPX2023CS0420&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
                  <div className="truncate">0408157M2706305IND&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;8SHARMA&lt;&lt;RAHUL</div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 font-mono text-xs text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" /> Optical MRZ Validated
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" /> SHA-256 Sign-off
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Printable Actions, Cut-out Specifications & Digital Wallet Sync */}
        <div className="w-full max-w-5xl mt-10 bg-surface-container-lowest p-6 shadow-sm border border-[#cbd5e1] flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#0D2545]/10">
            <div>
              <h2 className="text-base font-bold uppercase tracking-tight text-primary">
                Print Layout &amp; Card Production Center
              </h2>
              <p className="font-mono text-xs text-on-surface-variant mt-0.5">
                Configure cut-marks, vector bleeds, and export formats for PVC thermal dye-sublimation card printers or sheet printing.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => showToast("Downloading CMYK 300 DPI vector ready template...")}
                className="h-9 px-4 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 border border-[#cbd5e1] transition-colors"
              >
                <Download className="h-4 w-4 text-secondary" />
                <span>Vector PDF (CMYK 300 DPI)</span>
              </button>
              <button
                onClick={() => showToast("Apple / Google Wallet card certificate (.pkpass) exported!")}
                className="h-9 px-4 bg-[#001c3b] hover:bg-[#00273f] text-[#d6e3ff] font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-colors shadow-sm"
              >
                <Wallet className="h-4 w-4 text-secondary-container" />
                <span>Add to Apple / Google Wallet (.pkpass)</span>
              </button>
            </div>
          </div>

          {/* Settings & Security Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Option 1 */}
            <div className="p-4 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                    Output Geometry
                  </span>
                  <Crop className="h-4 w-4 text-secondary" />
                </div>
                <div className="mt-2 text-sm font-bold text-on-surface">Standard CR80 Cut Template</div>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Pre-aligned with standard 3.0mm bleeds and registration corner crop-marks for thermal edge-to-edge card embossers.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="radio"
                  id="singleCard"
                  name="printLayout"
                  checked={printLayout === "single"}
                  onChange={() => setPrintLayout("single")}
                  className="accent-primary"
                />
                <label htmlFor="singleCard" className="font-mono text-xs text-on-surface cursor-pointer">
                  Single Duplex Card (1:1)
                </label>
              </div>
            </div>

            {/* Option 2 */}
            <div className="p-4 bg-surface-container-low border border-[#cbd5e1] rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-outline font-bold">
                    Sheet Efficiency
                  </span>
                  <Grid className="h-4 w-4 text-secondary" />
                </div>
                <div className="mt-2 text-sm font-bold text-on-surface">8-Card A4 Cut-Out Matrix</div>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Renders front &amp; reverse sides side-by-side on 250gsm heavyweight paper with folding crease-indicators.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="radio"
                  id="sheetCard"
                  name="printLayout"
                  checked={printLayout === "sheet"}
                  onChange={() => setPrintLayout("sheet")}
                  className="accent-primary"
                />
                <label htmlFor="sheetCard" className="font-mono text-xs text-on-surface cursor-pointer">
                  8-Up A4 Sheet Ready
                </label>
              </div>
            </div>

            {/* Security Directive / Emergency Action */}
            <div className="p-4 bg-[#fef2f2] border border-[#fecaca] rounded-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-error">
                  <ShieldAlert className="h-4 w-4" />
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                    Lost or Stolen Protocol
                  </span>
                </div>
                <p className="text-xs mt-2 text-on-error-container leading-relaxed">
                  Report misplaced credentials immediately to Campus Security. Revokes the RFID encryption keys within 90 seconds campus-wide.
                </p>
              </div>
              <div className="mt-4">
                {cardStatus === "active" ? (
                  <button
                    onClick={() => setIsFreezeModalOpen(true)}
                    className="w-full py-2 px-3 bg-error text-on-error font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#93000a] transition-colors shadow-sm"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Instantly Freeze Card Access</span>
                  </button>
                ) : (
                  <button
                    onClick={handleUnfreezeCard}
                    className="w-full py-2 px-3 bg-[#047857] text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#065f46] transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Re-Activate Card Access</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Freeze Card Confirmation */}
      {isFreezeModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-md border-2 border-error shadow-[4px_4px_0_0_#93000a] p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2 text-error">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="text-base font-bold uppercase">Confirm Card Freeze</h3>
              </div>
              <button
                onClick={() => setIsFreezeModalOpen(false)}
                className="p-1 hover:bg-surface-container text-outline hover:text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 text-xs flex flex-col gap-3">
              <p className="text-on-surface leading-relaxed">
                Are you sure you want to freeze smart badge <strong>APX-CR80-2023-9941</strong>?
              </p>
              <div className="p-3 bg-[#fef2f2] border border-[#fecaca] text-error font-mono text-[11px] leading-relaxed">
                • NFC turnstiles, library issuance, and campus gates will reject this physical card immediately.
                <br />• You will need to present proof of identity to the Registrar Desk or use this portal to unfreeze.
              </div>
            </div>

            <div className="pt-3 border-t border-[#eff4ff] flex justify-end gap-2">
              <button
                onClick={() => setIsFreezeModalOpen(false)}
                className="px-4 py-1.5 bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider hover:bg-surface-container-high transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFreezeCard}
                className="px-4 py-1.5 bg-error text-on-error font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#93000a] transition-colors"
              >
                Confirm Freeze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
