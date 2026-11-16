"use client";

import { useState, useRef } from "react";
import {
  SlidersHorizontal,
  Maximize2,
  Download,
  X,
  CheckCircle2,
  Camera,
  Upload,
} from "lucide-react";

export default function StudentIdCardPage() {
  const [selectedCard, setSelectedCard] = useState<"front" | "back">("front");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [zoomCard, setZoomCard] = useState<"front" | "back" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Card Data state
  const [cardData, setCardData] = useState({
    instituteName: "SUNRISE INSTITUTE",
    instituteSub: "OF TECHNOLOGY",
    instituteCode: "SI",
    studentName: "Aarav Sharma",
    course: "Bachelor of Computer Applications",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    rollNo: "STU-2026-0142",
    batch: "BCA 2026–29",
    dob: "12 Aug 2007",
    validTill: "31 May 2029",
    cardNo: "SIT-26-0142",
    bloodGroup: "O+",
    emergencyContact: "+91 98765 43210",
    address: "24, MG Road, Pune 411001",
    principalName: "R. Mehta",
    principalTitle: "PRINCIPAL",
    returnLine1: "If found, please return to the institute office.",
    returnLine2: "Plot 12, Knowledge Park, Pune 411057 • +91 20 1234 5678",
    website: "www.sunriseinstitute.edu.in",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Upload and process passport size photo from device
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Photo must be less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCardData((prev) => ({ ...prev, photoUrl: result }));
          showToast("Passport photo updated successfully!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // -------------------------------------------------------------
  // High-Resolution HTML5 Canvas Generator for 100% Real Downloads
  // -------------------------------------------------------------
  const drawFrontCardOnContext = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    data: typeof cardData
  ) => {
    const W = 800;
    const H = 1268;
    const R = 32;

    ctx.save();
    ctx.translate(offsetX, offsetY);

    // 1. Card Rounded Base Clip
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, R);
    ctx.clip();

    // White Card Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);

    // 2. Deep Navy Blue Header Banner
    ctx.fillStyle = "#19335A";
    ctx.fillRect(0, 0, W, 420);

    // White Circular Logo Badge
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(260, 140, 52, 0, Math.PI * 2);
    ctx.fill();

    // Inside Logo Text "SI"
    ctx.fillStyle = "#19335A";
    ctx.font = "900 36px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.instituteCode, 260, 140);

    // Institute Title Text
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 30px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.instituteName, 330, 132);

    ctx.fillStyle = "#CBD5E1";
    ctx.font = "700 17px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.instituteSub, 332, 162);

    // Student Identity Card Pill Badge
    const pillW = 440;
    const pillH = 46;
    const pillX = (W - pillW) / 2;
    const pillY = 224;

    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 23);
    ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 19px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("STUDENT IDENTITY CARD", W / 2, pillY + 30);

    // 3. Overlapping Avatar Box
    const boxW = 250;
    const boxH = 300;
    const boxX = (W - boxW) / 2;
    const boxY = 320;

    // Avatar Box Shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.14)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;

    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 32);
    ctx.fillStyle = "#EEF2F6";
    ctx.fill();

    // White thick border around avatar box
    ctx.shadowColor = "transparent";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    // Clip to Avatar box to draw candidate photo or avatar silhouette
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 32);
    ctx.clip();

    const domImg = typeof document !== "undefined" ? (document.getElementById("student-card-avatar-img") as HTMLImageElement | null) : null;
    let imgDrawn = false;
    if (domImg && domImg.complete && domImg.naturalWidth > 0) {
      try {
        ctx.drawImage(domImg, boxX, boxY, boxW, boxH);
        imgDrawn = true;
      } catch {
        // Fallback to silhouette if cross-origin canvas security triggers
      }
    }

    if (!imgDrawn) {
      // Avatar Head Circle
      ctx.fillStyle = "#94A3B8";
      ctx.beginPath();
      ctx.arc(W / 2, boxY + 110, 48, 0, Math.PI * 2);
      ctx.fill();

      // Avatar Torso
      ctx.beginPath();
      ctx.roundRect(W / 2 - 82, boxY + 180, 164, 130, [46, 46, 0, 0]);
      ctx.fill();
    }
    ctx.restore();

    // 4. Cardholder Name & Course
    ctx.textAlign = "center";
    ctx.fillStyle = "#1E293B";
    ctx.font = "700 44px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.studentName, W / 2, 690);

    ctx.fillStyle = "#64748B";
    ctx.font = "500 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.course, W / 2, 735);

    // 5. 2x2 Rounded Info Box
    const infoW = 660;
    const infoH = 260;
    const infoX = (W - infoW) / 2;
    const infoY = 780;

    ctx.beginPath();
    ctx.roundRect(infoX, infoY, infoW, infoH, 32);
    ctx.fillStyle = "#F8FAFC";
    ctx.fill();
    ctx.strokeStyle = "#EDF2F7";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Grid Column Coordinates
    const col1X = infoX + 40;
    const col2X = infoX + infoW / 2 + 20;

    // Row 1
    ctx.textAlign = "left";
    ctx.fillStyle = "#94A3B8";
    ctx.font = "700 18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("ROLL NO.", col1X, infoY + 54);
    ctx.fillText("BATCH", col2X, infoY + 54);

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 26px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.rollNo, col1X, infoY + 98);
    ctx.fillText(data.batch, col2X, infoY + 98);

    // Row 2
    ctx.fillStyle = "#94A3B8";
    ctx.font = "700 18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("DATE OF BIRTH", col1X, infoY + 170);
    ctx.fillText("VALID TILL", col2X, infoY + 170);

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 26px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.dob, col1X, infoY + 214);
    ctx.fillText(data.validTill, col2X, infoY + 214);

    // 6. Footer Card No. Strip
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 1160);
    ctx.lineTo(W, 1160);
    ctx.stroke();

    ctx.fillStyle = "#94A3B8";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("CARD NO.", 60, 1208);

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 26px monospace";
    ctx.textAlign = "right";
    ctx.fillText(data.cardNo, W - 60, 1208);

    // Bottom Navy Blue Base Line
    ctx.fillStyle = "#19335A";
    ctx.fillRect(0, H - 16, W, 16);

    ctx.restore();
  };

  const drawBackCardOnContext = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    data: typeof cardData
  ) => {
    const W = 800;
    const H = 1268;
    const R = 32;

    ctx.save();
    ctx.translate(offsetX, offsetY);

    // 1. Base Card Rounded Clip
    ctx.beginPath();
    ctx.roundRect(0, 0, W, H, R);
    ctx.clip();

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);

    // 2. Top Header Navy Bar
    ctx.fillStyle = "#19335A";
    ctx.fillRect(0, 0, W, 90);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${data.instituteName} ${data.instituteSub}`, W / 2, 45);

    // 3. QR Code Box
    const qrBoxSize = 360;
    const qrBoxX = (W - qrBoxSize) / 2;
    const qrBoxY = 130;

    ctx.beginPath();
    ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 32);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Render Crisp Vector QR Code onto Canvas
    drawQrMatrix(ctx, qrBoxX + 30, qrBoxY + 30, 300);

    // Subtitle & Card No. below QR
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#64748B";
    ctx.font = "500 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scan to verify this card", W / 2, 540);

    ctx.fillStyle = "#0F172A";
    ctx.font = "800 30px monospace";
    ctx.fillText(data.cardNo, W / 2, 586);

    // 4. Three Identity Rows
    const rowLeftX = 70;
    const rowRightX = W - 70;

    // Row 1: Blood Group
    ctx.fillStyle = "#94A3B8";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("BLOOD GROUP", rowLeftX, 646);

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(data.bloodGroup, rowRightX, 646);

    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rowLeftX, 672);
    ctx.lineTo(rowRightX, 672);
    ctx.stroke();

    // Row 2: Emergency Contact
    ctx.fillStyle = "#94A3B8";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("EMERGENCY CONTACT", rowLeftX, 726);

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 24px monospace";
    ctx.textAlign = "right";
    ctx.fillText(data.emergencyContact, rowRightX, 726);

    ctx.beginPath();
    ctx.moveTo(rowLeftX, 752);
    ctx.lineTo(rowRightX, 752);
    ctx.stroke();

    // Row 3: Address
    ctx.fillStyle = "#94A3B8";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("ADDRESS", rowLeftX, 806);

    ctx.fillStyle = "#0F172A";
    ctx.font = "700 24px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(data.address, rowRightX, 806);

    ctx.beginPath();
    ctx.moveTo(rowLeftX, 832);
    ctx.lineTo(rowRightX, 832);
    ctx.stroke();

    // 5. Principal Signature Section
    const sigCenterX = W - 180;
    ctx.fillStyle = "#1E293B";
    ctx.font = "italic bold 36px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(data.principalName, sigCenterX, 915);

    ctx.strokeStyle = "#1E293B";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sigCenterX - 110, 936);
    ctx.lineTo(sigCenterX + 110, 936);
    ctx.stroke();

    ctx.fillStyle = "#64748B";
    ctx.font = "700 18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.principalTitle, sigCenterX, 968);

    // 6. Return Address Disclaimer Footer
    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 1040);
    ctx.lineTo(W - 50, 1040);
    ctx.stroke();

    ctx.fillStyle = "#64748B";
    ctx.font = "500 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.returnLine1, W / 2, 1096);
    ctx.fillText(data.returnLine2, W / 2, 1134);

    ctx.fillStyle = "#19335A";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.website, W / 2, 1172);

    // Bottom Navy Blue Base Line
    ctx.fillStyle = "#19335A";
    ctx.fillRect(0, H - 16, W, 16);

    ctx.restore();
  };

  // Helper to draw QR code modules on Canvas
  const drawQrMatrix = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.fillStyle = "#0F172A";
    const s = size / 29;

    const box = (mx: number, my: number, mw: number, mh: number) => {
      ctx.fillRect(x + mx * s, y + my * s, mw * s, mh * s);
    };

    const drawFinder = (fx: number, fy: number) => {
      box(fx, fy, 7, 7);
      ctx.fillStyle = "#FFFFFF";
      box(fx + 1, fy + 1, 5, 5);
      ctx.fillStyle = "#0F172A";
      box(fx + 2, fy + 2, 3, 3);
    };

    drawFinder(0, 0);
    drawFinder(22, 0);
    drawFinder(0, 22);

    const pattern = [
      [9, 1], [11, 2], [13, 0], [15, 3], [17, 1], [19, 2],
      [9, 4], [12, 5], [14, 4], [16, 5], [18, 4], [20, 5],
      [1, 9], [3, 11], [5, 9], [7, 10], [9, 9], [11, 10], [13, 9], [15, 11], [17, 9], [19, 10], [21, 9], [23, 11], [25, 9], [27, 10],
      [2, 13], [4, 15], [6, 13], [8, 14], [10, 13], [12, 15], [14, 13], [16, 14], [18, 13], [20, 15], [22, 13], [24, 14], [26, 13], [28, 15],
      [0, 17], [3, 17], [5, 18], [7, 17], [10, 18], [13, 17], [16, 18], [19, 17], [22, 18], [25, 17], [28, 18],
      [9, 22], [11, 24], [13, 22], [15, 23], [17, 22], [19, 24], [21, 22], [23, 23], [25, 22], [27, 24],
      [10, 26], [12, 28], [14, 26], [16, 27], [18, 26], [20, 28], [22, 26], [24, 27], [26, 26], [28, 28],
    ];

    pattern.forEach(([px, py]) => {
      box(px, py, 1.8, 1.8);
    });
  };

  // Direct Download Trigger for the existing Download buttons
  const executeDownload = (mode: "front" | "back") => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 1268;

    if (mode === "front") {
      drawFrontCardOnContext(ctx, 0, 0, cardData);
    } else {
      drawBackCardOnContext(ctx, 0, 0, cardData);
    }

    const dataUrl = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = dataUrl;
    const filename = `Sunrise_ID_Card_${mode === "front" ? "Front" : "Back"}_${cardData.cardNo}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded ${filename}!`);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] py-8 px-4 sm:px-6 lg:px-8 font-sans flex flex-col items-center justify-start text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#19335A] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
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

      {/* Main Dual Cards Grid Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start justify-center pt-2">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Student - front                              */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center w-full">
          {/* Header Bar above Front Card */}
          <div className="w-full max-w-[320px] flex items-center justify-between pb-2.5 px-1">
            <h2
              onClick={() => setSelectedCard("front")}
              className={`text-base font-bold cursor-pointer transition-colors ${selectedCard === "front" ? "text-[#1B72E8]" : "text-[#475569]"
                }`}
            >
              Student – front
            </h2>

            <div className="flex items-center gap-2.5 text-slate-400">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="hover:text-slate-700 transition-colors cursor-pointer p-1"
                title="Edit Card Details"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomCard("front")}
                className="hover:text-slate-700 transition-colors cursor-pointer p-1"
                title="Fullscreen Preview"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => executeDownload("front")}
                className="hover:text-[#1B72E8] transition-colors cursor-pointer p-1"
                title="Download Front Card"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* FRONT CARD CONTAINER */}
          <div
            onClick={() => setSelectedCard("front")}
            className={`w-full max-w-[320px] aspect-[1/1.585] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between transition-all cursor-pointer relative select-none ${selectedCard === "front"
              ? "ring-2 ring-[#1B72E8] shadow-2xl"
              : "border border-slate-200/90 hover:shadow-xl"
              }`}
          >
            {/* Top Navy Blue Header Banner */}
            <div className="relative bg-[#19335A] pt-5 pb-11 px-4 text-white flex flex-col items-center text-center">
              {/* Institution Crest + Name Row */}
              <div className="flex items-center gap-2.5 justify-center">
                {/* Circular White Logo */}
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#19335A] font-black text-xs shadow-xs shrink-0">
                  {cardData.instituteCode}
                </div>

                {/* Institute Name */}
                <div className="text-left">
                  <h3 className="text-xs font-extrabold tracking-wide uppercase leading-tight text-white">
                    {cardData.instituteName}
                  </h3>
                  <p className="text-[8px] tracking-[0.18em] uppercase font-semibold text-slate-300 mt-0.5">
                    {cardData.instituteSub}
                  </p>
                </div>
              </div>

              {/* Student Identity Card Pill Badge */}
              <div className="mt-2.5">
                <span className="inline-block px-3 py-0.5 bg-white/15 text-white text-[8.5px] font-semibold tracking-widest uppercase rounded-full border border-white/20">
                  STUDENT IDENTITY CARD
                </span>
              </div>
            </div>

            {/* Overlapping Avatar Box (Standard Passport Photo Frame) */}
            <div className="relative -mt-9 flex justify-center z-10 px-3">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                title="Click to upload passport photo"
                className="w-24 h-30 bg-[#EEF2F6] rounded-xl border-[3px] border-white shadow-md overflow-hidden flex items-center justify-center relative group cursor-pointer"
              >
                <img
                  id="student-card-avatar-img"
                  crossOrigin="anonymous"
                  src={cardData.photoUrl}
                  alt={cardData.studentName}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                  <Camera className="w-5 h-5 mb-0.5" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Change</span>
                </div>
              </div>
            </div>

            {/* Cardholder Identity & Degree */}
            <div className="text-center px-3 pt-1">
              <h1 className="text-lg font-bold text-[#1E293B] tracking-tight leading-snug">
                {cardData.studentName}
              </h1>
              <p className="text-[11px] font-medium text-[#64748B] mt-0.5">
                {cardData.course}
              </p>
            </div>

            {/* Rounded 2x2 Information Matrix */}
            <div className="px-4 py-0.5">
              <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#EDF2F7] grid grid-cols-2 gap-x-3 gap-y-2 text-left">
                <div>
                  <span className="text-[8px] font-bold text-[#94A3B8] tracking-wider uppercase block">
                    ROLL NO.
                  </span>
                  <span className="text-[11.5px] font-bold text-[#0F172A] block mt-0.5">
                    {cardData.rollNo}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-[#94A3B8] tracking-wider uppercase block">
                    BATCH
                  </span>
                  <span className="text-[11.5px] font-bold text-[#0F172A] block mt-0.5">
                    {cardData.batch}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-[#94A3B8] tracking-wider uppercase block">
                    DATE OF BIRTH
                  </span>
                  <span className="text-[11.5px] font-bold text-[#0F172A] block mt-0.5">
                    {cardData.dob}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-[#94A3B8] tracking-wider uppercase block">
                    VALID TILL
                  </span>
                  <span className="text-[11.5px] font-bold text-[#0F172A] block mt-0.5">
                    {cardData.validTill}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Card No. Strip & Navy Base Line */}
            <div className="mt-auto">
              <div className="px-4 py-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="text-[9px] font-bold tracking-widest text-[#94A3B8] uppercase">
                  CARD NO.
                </span>
                <span className="font-bold text-[#0F172A] font-mono text-[11.5px] tracking-wider">
                  {cardData.cardNo}
                </span>
              </div>
              {/* Bottom Deep Navy Base */}
              <div className="h-1.5 bg-[#19335A] w-full"></div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Student - back                             */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center w-full">
          {/* Header Bar above Back Card */}
          <div className="w-full max-w-[320px] flex items-center justify-between pb-2.5 px-1">
            <h2
              onClick={() => setSelectedCard("back")}
              className={`text-base font-bold cursor-pointer transition-colors ${selectedCard === "back" ? "text-[#1B72E8]" : "text-[#475569]"
                }`}
            >
              Student – back
            </h2>

            <div className="flex items-center gap-2.5 text-slate-400">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="hover:text-slate-700 transition-colors cursor-pointer p-1"
                title="Edit Card Details"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomCard("back")}
                className="hover:text-slate-700 transition-colors cursor-pointer p-1"
                title="Fullscreen Preview"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => executeDownload("back")}
                className="hover:text-[#1B72E8] transition-colors cursor-pointer p-1"
                title="Download Back Card"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* BACK CARD CONTAINER */}
          <div
            onClick={() => setSelectedCard("back")}
            className={`w-full max-w-[320px] aspect-[1/1.585] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between transition-all cursor-pointer relative select-none ${selectedCard === "back"
              ? "ring-2 ring-[#1B72E8] shadow-2xl"
              : "border border-slate-200/90 hover:shadow-xl"
              }`}
          >
            {/* Top Navy Blue Header Banner */}
            <div className="bg-[#19335A] py-2.5 px-3 text-center">
              <h3 className="text-white text-[10.5px] font-extrabold tracking-widest uppercase">
                {cardData.instituteName} {cardData.instituteSub}
              </h3>
            </div>

            {/* QR Code Verification Section */}
            <div className="flex flex-col items-center pt-2.5 pb-0.5">
              {/* Rounded White QR Box */}
              <div className="w-36 h-36 bg-white border border-[#E2E8F0] rounded-xl p-2.5 shadow-2xs flex items-center justify-center">
                <svg
                  className="w-full h-full text-slate-900"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
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

              <span className="text-[10.5px] text-[#64748B] font-medium mt-1.5">
                Scan to verify this card
              </span>
              <span className="text-[13px] font-extrabold text-[#0F172A] font-mono tracking-wider mt-0.5">
                {cardData.cardNo}
              </span>
            </div>

            {/* Three Institutional Data Rows with Dividers */}
            <div className="px-5 py-1.5 space-y-1.5 text-xs">
              {/* Row 1: Blood Group */}
              <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                <span className="text-[8.5px] font-bold text-[#94A3B8] tracking-wider uppercase">
                  BLOOD GROUP
                </span>
                <span className="text-[11px] font-bold text-[#0F172A]">
                  {cardData.bloodGroup}
                </span>
              </div>

              {/* Row 2: Emergency Contact */}
              <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                <span className="text-[8.5px] font-bold text-[#94A3B8] tracking-wider uppercase">
                  EMERGENCY CONTACT
                </span>
                <span className="text-[11px] font-bold text-[#0F172A] font-mono">
                  {cardData.emergencyContact}
                </span>
              </div>

              {/* Row 3: Address */}
              <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                <span className="text-[8.5px] font-bold text-[#94A3B8] tracking-wider uppercase shrink-0">
                  ADDRESS
                </span>
                <span className="text-[11px] font-bold text-[#0F172A] text-right truncate pl-3">
                  {cardData.address}
                </span>
              </div>
            </div>

            {/* Principal Signature Block */}
            <div className="px-5 pt-1 flex flex-col items-end">
              <div className="w-28 text-center">
                <span className="font-serif italic text-base text-slate-800 font-bold block leading-tight">
                  {cardData.principalName}
                </span>
                <div className="h-[1px] bg-slate-800 w-full my-0.5"></div>
                <span className="text-[8px] font-bold uppercase tracking-widest text-[#64748B] block">
                  {cardData.principalTitle}
                </span>
              </div>
            </div>

            {/* Footer Disclaimer & Return Address */}
            <div className="mt-auto">
              <div className="px-4 pb-2 pt-1 text-center text-[#64748B] text-[8.5px] leading-tight space-y-0.5">
                <p>{cardData.returnLine1}</p>
                <p>{cardData.returnLine2}</p>
                <p className="font-bold text-[#19335A] pt-0.5">{cardData.website}</p>
              </div>
              {/* Bottom Deep Navy Base */}
              <div className="h-1.5 bg-[#19335A] w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Fullscreen Zoom Modal */}
      {zoomCard && (
        <div
          onClick={() => setZoomCard(null)}
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full scale-105 transition-all flex flex-col items-center"
          >
            <div className="w-full flex items-center justify-between text-white pb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider">
                Preview ({zoomCard === "front" ? "Front Side" : "Back Side"})
              </span>
              <button
                onClick={() => setZoomCard(null)}
                className="text-white hover:text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={() => {
                  executeDownload(zoomCard);
                  setZoomCard(null);
                }}
                className="w-full py-2.5 bg-[#1B72E8] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg mb-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Image</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Customize / Edit Card Details */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#19335A]">
                <SlidersHorizontal className="w-5 h-5 text-[#1B72E8]" />
                <h3 className="text-base font-bold">Customize ID Card Information</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              {/* Passport Size Photo Uploader */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="file"
                  ref={modalFileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="w-20 h-24 bg-white rounded-lg border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center relative shadow-2xs shrink-0">
                  {cardData.photoUrl ? (
                    <img
                      src={cardData.photoUrl}
                      alt="Passport Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <Camera className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-800 text-xs block">
                        Passport Size Photograph (35mm &times; 45mm)
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Clear face-front portrait photo with light background (Max 5MB)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => modalFileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-[#19335A] border border-slate-300 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer self-center sm:self-auto"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold shrink-0">Or URL:</span>
                    <input
                      type="text"
                      value={cardData.photoUrl}
                      onChange={(e) =>
                        setCardData({ ...cardData, photoUrl: e.target.value })
                      }
                      placeholder="Paste image URL here..."
                      className="w-full px-2.5 py-1 text-[11px] bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1B72E8]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={cardData.studentName}
                    onChange={(e) => setCardData({ ...cardData, studentName: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Course / Degree
                  </label>
                  <input
                    type="text"
                    value={cardData.course}
                    onChange={(e) => setCardData({ ...cardData, course: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={cardData.rollNo}
                    onChange={(e) => setCardData({ ...cardData, rollNo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Batch
                  </label>
                  <input
                    type="text"
                    value={cardData.batch}
                    onChange={(e) => setCardData({ ...cardData, batch: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    value={cardData.dob}
                    onChange={(e) => setCardData({ ...cardData, dob: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Valid Till
                  </label>
                  <input
                    type="text"
                    value={cardData.validTill}
                    onChange={(e) => setCardData({ ...cardData, validTill: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Card No. (Unique Identifier)
                  </label>
                  <input
                    type="text"
                    value={cardData.cardNo}
                    onChange={(e) => setCardData({ ...cardData, cardNo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    value={cardData.bloodGroup}
                    onChange={(e) => setCardData({ ...cardData, bloodGroup: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    value={cardData.emergencyContact}
                    onChange={(e) => setCardData({ ...cardData, emergencyContact: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none font-mono text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Principal Signature Name
                  </label>
                  <input
                    type="text"
                    value={cardData.principalName}
                    onChange={(e) => setCardData({ ...cardData, principalName: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Residential / Domicile Address
                </label>
                <input
                  type="text"
                  value={cardData.address}
                  onChange={(e) => setCardData({ ...cardData, address: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1B72E8] outline-none text-slate-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCardData({
                      instituteName: "SUNRISE INSTITUTE",
                      instituteSub: "OF TECHNOLOGY",
                      instituteCode: "SI",
                      studentName: "Rahul Sharma",
                      course: "B.Tech - Computer Science & Engineering",
                      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
                      rollNo: "23CS042",
                      batch: "B.Tech 2023–27",
                      dob: "15 Aug 2004",
                      validTill: "30 Jun 2027",
                      cardNo: "SIT-23-0042",
                      bloodGroup: "O+",
                      emergencyContact: "+91 98111 22334",
                      address: "Sector 14, Gurugram, Haryana 122001",
                      principalName: "Dr. K. N. Murthy",
                      principalTitle: "PRINCIPAL / REGISTRAR",
                      returnLine1: "If found, please return to the institute office.",
                      returnLine2: "Sector 12, Academic Corridor, Delhi-NCR • +91 11 2659 1000",
                      website: "www.apex.edu.in",
                    });
                    showToast("Switched to Rahul Sharma profile data.");
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Load Rahul Sharma Data
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCardData({
                      instituteName: "SUNRISE INSTITUTE",
                      instituteSub: "OF TECHNOLOGY",
                      instituteCode: "SI",
                      studentName: "Aarav Sharma",
                      course: "Bachelor of Computer Applications",
                      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
                      rollNo: "STU-2026-0142",
                      batch: "BCA 2026–29",
                      dob: "12 Aug 2007",
                      validTill: "31 May 2029",
                      cardNo: "SIT-26-0142",
                      bloodGroup: "O+",
                      emergencyContact: "+91 98765 43210",
                      address: "24, MG Road, Pune 411001",
                      principalName: "R. Mehta",
                      principalTitle: "PRINCIPAL",
                      returnLine1: "If found, please return to the institute office.",
                      returnLine2: "Plot 12, Knowledge Park, Pune 411057 • +91 20 1234 5678",
                      website: "www.sunriseinstitute.edu.in",
                    });
                    showToast("Reset to Sample (Aarav Sharma) data.");
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Reset to Sample
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-[#19335A] hover:bg-[#132745] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Save &amp; Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
