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

export default function StaffIdCardPage() {
  const [selectedCard, setSelectedCard] = useState<"front" | "back">("front");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [zoomCard, setZoomCard] = useState<"front" | "back" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Exact Staff Card Data State matching screenshot
  const [cardData, setCardData] = useState({
    instituteName: "SUNRISE INSTITUTE",
    instituteSub: "OF TECHNOLOGY",
    instituteCode: "SI",
    staffName: "Priya Nair",
    designation: "Assistant Professor",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    employeeId: "EMP-2026-018",
    department: "Computer Science",
    joined: "01 Jul 2024",
    validTill: "31 Mar 2027",
    cardNo: "SIT-ST-26-018",
    bloodGroup: "B+",
    emergencyContact: "+91 91234 56789",
    address: "8, Lake View Society, Pune 411014",
    principalName: "R. Mehta",
    principalTitle: "PRINCIPAL",
    returnLine1: "If found, please return to the institute office.",
    returnLine2: "Plot 12, Knowledge Park, Pune 411057 · +91 20 1234 5678",
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
  // High-Resolution HTML5 Canvas Vector Generator for 300 DPI
  // -------------------------------------------------------------
  const drawFrontCardOnContext = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    data: typeof cardData
  ) => {
    const W = 800;
    const H = 1272;

    ctx.save();
    ctx.translate(offsetX, offsetY);

    // White Card Background (Square corners matching sample)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);

    // Maroon Header Banner (#7A1F2B)
    ctx.fillStyle = "#7A1F2B";
    ctx.fillRect(0, 0, W, 388);

    // White Circular Logo Badge
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(265, 126, 48, 0, Math.PI * 2);
    ctx.fill();

    // Inside Logo Text "SI"
    ctx.fillStyle = "#7A1F2B";
    ctx.font = "900 32px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.instituteCode, 265, 126);

    // Institute Title Text
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "900 27px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.instituteName, 330, 118);

    ctx.fillStyle = "#E2E8F0";
    ctx.font = "700 16px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.instituteSub, 332, 146);

    // Staff Identity Card Pill Badge
    const pillW = 390;
    const pillH = 44;
    const pillX = (W - pillW) / 2;
    const pillY = 210;

    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 22);
    ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 17px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("STAFF IDENTITY CARD", W / 2, pillY + pillH / 2);

    // Overlapping Avatar Photo Frame
    const photoW = 292;
    const photoH = 390;
    const photoX = (W - photoW) / 2;
    const photoY = 276;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoW, photoH, 36);
    ctx.fillStyle = "#E8ECF2";
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.clip();

    // Check if DOM image is available
    const domImg = typeof document !== "undefined" ? (document.getElementById("staff-card-avatar-img") as HTMLImageElement | null) : null;
    let imgDrawn = false;
    if (domImg && domImg.complete && domImg.naturalWidth > 0) {
      try {
        ctx.drawImage(domImg, photoX, photoY, photoW, photoH);
        imgDrawn = true;
      } catch {
        // Fallback to vector silhouette if canvas tainted
      }
    }

    if (!imgDrawn) {
      // Minimalist Avatar Silhouette (#A7B1C2)
      ctx.fillStyle = "#A7B1C2";
      ctx.beginPath();
      ctx.arc(W / 2, photoY + 140, 64, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(W / 2, photoY + 360, 120, 110, 0, Math.PI, 0, false);
      ctx.fill();
    }
    ctx.restore();

    // Staff Name & Designation
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#14213D";
    ctx.font = "800 46px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.staffName, W / 2, 730);

    ctx.fillStyle = "#64748B";
    ctx.font = "600 27px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.designation, W / 2, 778);

    // Rounded 2x2 Info Grid Box
    const boxW = 676;
    const boxH = 205;
    const boxX = (W - boxW) / 2;
    const boxY = 820;

    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 28);
    ctx.fillStyle = "#F5F7FA";
    ctx.fill();

    const col1X = boxX + 44;
    const col2X = boxX + 358;
    const row1Y = boxY + 44;
    const row2Y = boxY + 130;

    // Row 1: EMPLOYEE ID & DEPARTMENT
    ctx.fillStyle = "#8898AA";
    ctx.font = "800 18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("EMPLOYEE ID", col1X, row1Y);
    ctx.fillText("DEPARTMENT", col2X, row1Y);

    ctx.fillStyle = "#14213D";
    ctx.font = "700 27px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.employeeId, col1X, row1Y + 38);
    ctx.fillText(data.department, col2X, row1Y + 38);

    // Row 2: JOINED & VALID TILL
    ctx.fillStyle = "#8898AA";
    ctx.font = "800 18px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText("JOINED", col1X, row2Y);
    ctx.fillText("VALID TILL", col2X, row2Y);

    ctx.fillStyle = "#14213D";
    ctx.font = "700 27px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.joined, col1X, row2Y + 38);
    ctx.fillText(data.validTill, col2X, row2Y + 38);

    // Footer Card No. Strip
    ctx.strokeStyle = "#F1F2F6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 1160);
    ctx.lineTo(W - 60, 1160);
    ctx.stroke();

    ctx.fillStyle = "#8898AA";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("CARD NO.", 60, 1210);

    ctx.fillStyle = "#14213D";
    ctx.font = "800 27px monospace";
    ctx.textAlign = "right";
    ctx.fillText(data.cardNo, W - 60, 1210);

    // Bottom Maroon Base Line (#7A1F2B)
    ctx.fillStyle = "#7A1F2B";
    ctx.fillRect(0, H - 14, W, 14);

    ctx.restore();
  };

  const drawBackCardOnContext = (
    ctx: CanvasRenderingContext2D,
    offsetX: number,
    offsetY: number,
    data: typeof cardData
  ) => {
    const W = 800;
    const H = 1272;

    ctx.save();
    ctx.translate(offsetX, offsetY);

    // White Base Card
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);

    // Top Header Maroon Bar (#7A1F2B)
    ctx.fillStyle = "#7A1F2B";
    ctx.fillRect(0, 0, W, 102);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 25px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${data.instituteName} ${data.instituteSub}`, W / 2, 51);

    // QR Code Box
    const qrBoxSize = 356;
    const qrBoxX = (W - qrBoxSize) / 2;
    const qrBoxY = 142;

    ctx.beginPath();
    ctx.roundRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 34);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Vector QR code modules in #14213D
    drawQrMatrix(ctx, qrBoxX + 28, qrBoxY + 28, 300);

    // Subtitle & Card No. below QR
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#64748B";
    ctx.font = "500 25px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scan to verify this card", W / 2, 552);

    ctx.fillStyle = "#14213D";
    ctx.font = "800 30px monospace";
    ctx.fillText(data.cardNo, W / 2, 598);

    // Three Identity Rows
    const rowLeftX = 64;
    const rowRightX = W - 64;

    // Row 1: Blood Group
    ctx.fillStyle = "#8898AA";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("BLOOD GROUP", rowLeftX, 660);

    ctx.fillStyle = "#14213D";
    ctx.font = "700 25px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(data.bloodGroup, rowRightX, 660);

    ctx.strokeStyle = "#F1F5F9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rowLeftX, 686);
    ctx.lineTo(rowRightX, 686);
    ctx.stroke();

    // Row 2: Emergency Contact
    ctx.fillStyle = "#8898AA";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("EMERGENCY CONTACT", rowLeftX, 742);

    ctx.fillStyle = "#14213D";
    ctx.font = "700 25px monospace";
    ctx.textAlign = "right";
    ctx.fillText(data.emergencyContact, rowRightX, 742);

    ctx.beginPath();
    ctx.moveTo(rowLeftX, 768);
    ctx.lineTo(rowRightX, 768);
    ctx.stroke();

    // Row 3: Address
    ctx.fillStyle = "#8898AA";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("ADDRESS", rowLeftX, 824);

    ctx.fillStyle = "#14213D";
    ctx.font = "700 25px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(data.address, rowRightX, 824);

    ctx.beginPath();
    ctx.moveTo(rowLeftX, 850);
    ctx.lineTo(rowRightX, 850);
    ctx.stroke();

    // Principal Signature Section
    const sigCenterX = W - 180;
    ctx.fillStyle = "#1E293B";
    ctx.font = "italic bold 36px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(data.principalName, sigCenterX, 936);

    ctx.strokeStyle = "#1E293B";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sigCenterX - 110, 956);
    ctx.lineTo(sigCenterX + 110, 956);
    ctx.stroke();

    ctx.fillStyle = "#64748B";
    ctx.font = "700 19px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.principalTitle, sigCenterX, 990);

    // Return Address Disclaimer Footer
    ctx.fillStyle = "#64748B";
    ctx.font = "500 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.returnLine1, W / 2, 1100);
    ctx.fillText(data.returnLine2, W / 2, 1136);

    ctx.fillStyle = "#7A1F2B";
    ctx.font = "700 20px -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.fillText(data.website, W / 2, 1172);

    // Bottom Maroon Base Line (#7A1F2B)
    ctx.fillStyle = "#7A1F2B";
    ctx.fillRect(0, H - 14, W, 14);

    ctx.restore();
  };

  const drawQrMatrix = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.fillStyle = "#14213D";
    const s = size / 29;

    const box = (mx: number, my: number, mw: number, mh: number) => {
      ctx.fillRect(x + mx * s, y + my * s, mw * s, mh * s);
    };

    const drawFinder = (fx: number, fy: number) => {
      box(fx, fy, 7, 7);
      ctx.fillStyle = "#FFFFFF";
      box(fx + 1, fy + 1, 5, 5);
      ctx.fillStyle = "#14213D";
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

  const executeDownload = (mode: "front" | "back") => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 1272;

    if (mode === "front") {
      drawFrontCardOnContext(ctx, 0, 0, cardData);
    } else {
      drawBackCardOnContext(ctx, 0, 0, cardData);
    }

    const dataUrl = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = dataUrl;
    const filename = `Sunrise_Staff_ID_Card_${mode === "front" ? "Front" : "Back"}_${cardData.cardNo}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Downloaded ${filename}!`);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] py-6 px-4 font-sans flex flex-col items-center justify-start text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#7A1F2B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-red-900/40 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Dual Cards Grid Container - Exact Student ID Card Sizing */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start justify-center pt-2">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Staff - front                                */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center w-full">
          {/* Header Bar above Front Card */}
          <div className="w-full max-w-[320px] flex items-center justify-between pb-2 px-1">
            <h2
              onClick={() => setSelectedCard("front")}
              className={`text-base font-bold cursor-pointer transition-colors ${
                selectedCard === "front" ? "text-[#7A1F2B]" : "text-[#475569]"
              }`}
            >
              Staff – front
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
                className="hover:text-[#7A1F2B] transition-colors cursor-pointer p-1"
                title="Download Front Card"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* FRONT CARD CONTAINER: Exact Student ID Card Size & Aspect Ratio */}
          <div
            onClick={() => setSelectedCard("front")}
            className={`w-full max-w-[320px] aspect-[1/1.585] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between transition-all cursor-pointer relative select-none ${
              selectedCard === "front"
                ? "ring-2 ring-[#7A1F2B] shadow-2xl"
                : "border border-slate-200/90 hover:shadow-xl"
            }`}
          >
            {/* Top Maroon Header Banner */}
            <div className="relative bg-[#7A1F2B] pt-5 pb-11 px-4 text-white flex flex-col items-center text-center">
              {/* Institution Crest + Name Row */}
              <div className="flex items-center gap-2.5 justify-center">
                {/* Circular White Logo */}
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#7A1F2B] font-black text-xs shadow-xs shrink-0">
                  {cardData.instituteCode}
                </div>

                {/* Institute Name */}
                <div className="text-left">
                  <h3 className="text-xs font-extrabold tracking-wide uppercase leading-tight text-white">
                    {cardData.instituteName}
                  </h3>
                  <p className="text-[8px] tracking-[0.18em] uppercase font-semibold text-rose-100/90 mt-0.5">
                    {cardData.instituteSub}
                  </p>
                </div>
              </div>

              {/* Staff Identity Card Pill Badge */}
              <div className="mt-2.5">
                <span className="inline-block px-3 py-0.5 bg-white/18 text-white text-[8.5px] font-semibold tracking-widest uppercase rounded-full border border-white/20">
                  STAFF IDENTITY CARD
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
                  id="staff-card-avatar-img"
                  crossOrigin="anonymous"
                  src={cardData.photoUrl}
                  alt={cardData.staffName}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                  <Camera className="w-5 h-5 mb-0.5" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Change</span>
                </div>
              </div>
            </div>

            {/* Cardholder Identity & Designation */}
            <div className="text-center px-3 pt-1">
              <h1 className="text-lg font-bold text-[#14213D] tracking-tight leading-snug">
                {cardData.staffName}
              </h1>
              <p className="text-[11px] font-medium text-[#64748B] mt-0.5">
                {cardData.designation}
              </p>
            </div>

            {/* Rounded 2x2 Information Matrix */}
            <div className="px-4 py-0.5">
              <div className="bg-[#F8FAFC] rounded-xl p-3 border border-[#EDF2F7] grid grid-cols-2 gap-x-3 gap-y-2 text-left">
                <div>
                  <span className="text-[8px] font-bold text-[#8898AA] tracking-wider uppercase block">
                    EMPLOYEE ID
                  </span>
                  <span className="text-[11.5px] font-bold text-[#14213D] block mt-0.5">
                    {cardData.employeeId}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-[#8898AA] tracking-wider uppercase block">
                    DEPARTMENT
                  </span>
                  <span className="text-[11.5px] font-bold text-[#14213D] block mt-0.5 truncate">
                    {cardData.department}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-[#8898AA] tracking-wider uppercase block">
                    JOINED
                  </span>
                  <span className="text-[11.5px] font-bold text-[#14213D] block mt-0.5">
                    {cardData.joined}
                  </span>
                </div>
                <div>
                  <span className="text-[8px] font-bold text-[#8898AA] tracking-wider uppercase block">
                    VALID TILL
                  </span>
                  <span className="text-[11.5px] font-bold text-[#14213D] block mt-0.5">
                    {cardData.validTill}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Card No. Strip & Maroon Base Line */}
            <div className="mt-auto">
              <div className="px-4 py-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <span className="text-[9px] font-bold tracking-widest text-[#8898AA] uppercase">
                  CARD NO.
                </span>
                <span className="font-bold text-[#14213D] font-mono text-[11.5px] tracking-wider">
                  {cardData.cardNo}
                </span>
              </div>
              {/* Bottom Deep Maroon Base */}
              <div className="h-1.5 bg-[#7A1F2B] w-full"></div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Staff - back                                */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center w-full">
          {/* Header Bar above Back Card */}
          <div className="w-full max-w-[320px] flex items-center justify-between pb-2 px-1">
            <h2
              onClick={() => setSelectedCard("back")}
              className={`text-base font-bold cursor-pointer transition-colors ${
                selectedCard === "back" ? "text-[#7A1F2B]" : "text-[#475569]"
              }`}
            >
              Staff – back
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
                className="hover:text-[#7A1F2B] transition-colors cursor-pointer p-1"
                title="Download Back Card"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* BACK CARD CONTAINER: Exact Student ID Card Size & Aspect Ratio */}
          <div
            onClick={() => setSelectedCard("back")}
            className={`w-full max-w-[320px] aspect-[1/1.585] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between transition-all cursor-pointer relative select-none ${
              selectedCard === "back"
                ? "ring-2 ring-[#7A1F2B] shadow-2xl"
                : "border border-slate-200/90 hover:shadow-xl"
            }`}
          >
            {/* Top Maroon Header Banner */}
            <div className="bg-[#7A1F2B] py-2.5 px-3 text-center">
              <h3 className="text-white text-[10.5px] font-extrabold tracking-widest uppercase">
                {cardData.instituteName} {cardData.instituteSub}
              </h3>
            </div>

            {/* QR Code Verification Section */}
            <div className="flex flex-col items-center pt-2.5 pb-0.5">
              {/* Rounded White QR Box */}
              <div className="w-36 h-36 bg-white border border-[#E2E8F0] rounded-xl p-2.5 shadow-2xs flex items-center justify-center">
                <svg
                  className="w-full h-full text-[#14213D]"
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
              <span className="text-[13px] font-extrabold text-[#14213D] font-mono tracking-wider mt-0.5">
                {cardData.cardNo}
              </span>
            </div>

            {/* Three Institutional Data Rows with Dividers */}
            <div className="px-5 py-1.5 space-y-1.5 text-xs">
              {/* Row 1: Blood Group */}
              <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                <span className="text-[8.5px] font-bold text-[#8898AA] tracking-wider uppercase">
                  BLOOD GROUP
                </span>
                <span className="text-[11px] font-bold text-[#14213D]">
                  {cardData.bloodGroup}
                </span>
              </div>

              {/* Row 2: Emergency Contact */}
              <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                <span className="text-[8.5px] font-bold text-[#8898AA] tracking-wider uppercase">
                  EMERGENCY CONTACT
                </span>
                <span className="text-[11px] font-bold text-[#14213D] font-mono">
                  {cardData.emergencyContact}
                </span>
              </div>

              {/* Row 3: Address */}
              <div className="flex items-center justify-between pb-1 border-b border-[#F1F5F9]">
                <span className="text-[8.5px] font-bold text-[#8898AA] tracking-wider uppercase">
                  ADDRESS
                </span>
                <span className="text-[11px] font-bold text-[#14213D] text-right max-w-[170px] truncate">
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

            {/* Disclaimer & Return Information Footer */}
            <div className="mt-auto">
              <div className="px-4 pb-2 pt-1 text-center text-[#64748B] text-[8.5px] leading-tight space-y-0.5">
                <p>{cardData.returnLine1}</p>
                <p>{cardData.returnLine2}</p>
                <p className="font-bold text-[#7A1F2B] pt-0.5">{cardData.website}</p>
              </div>
              {/* Bottom Maroon Base Stripe: 6px */}
              <div className="h-1.5 bg-[#7A1F2B] w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: EDIT CARD DETAILS (Via SlidersHorizontal Button) */}
      {/* ========================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl border border-slate-200 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#7A1F2B]" />
                <h3 className="text-base font-bold text-slate-900">
                  Update Staff ID Card Details
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditModalOpen(false);
                showToast("Staff ID Card details updated successfully!");
              }}
              className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs"
            >
              {/* Passport Size Photo Uploader */}
              <div className="sm:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center gap-4">
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
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-[#7A1F2B] border border-[#7A1F2B]/30 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer self-center sm:self-auto"
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
                      className="w-full px-2.5 py-1 text-[11px] bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#7A1F2B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Staff Full Name
                </label>
                <input
                  type="text"
                  value={cardData.staffName}
                  onChange={(e) =>
                    setCardData({ ...cardData, staffName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={cardData.designation}
                  onChange={(e) =>
                    setCardData({ ...cardData, designation: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Employee ID
                </label>
                <input
                  type="text"
                  value={cardData.employeeId}
                  onChange={(e) =>
                    setCardData({ ...cardData, employeeId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={cardData.department}
                  onChange={(e) =>
                    setCardData({ ...cardData, department: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Date of Joining
                </label>
                <input
                  type="text"
                  value={cardData.joined}
                  onChange={(e) =>
                    setCardData({ ...cardData, joined: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Valid Till
                </label>
                <input
                  type="text"
                  value={cardData.validTill}
                  onChange={(e) =>
                    setCardData({ ...cardData, validTill: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardData.cardNo}
                  onChange={(e) =>
                    setCardData({ ...cardData, cardNo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-mono font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Blood Group
                </label>
                <input
                  type="text"
                  value={cardData.bloodGroup}
                  onChange={(e) =>
                    setCardData({ ...cardData, bloodGroup: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  value={cardData.emergencyContact}
                  onChange={(e) =>
                    setCardData({
                      ...cardData,
                      emergencyContact: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-mono font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={cardData.address}
                  onChange={(e) =>
                    setCardData({ ...cardData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B] font-medium"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 pt-3 flex justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1F2B] hover:bg-[#631822] text-white font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ZOOM / FULLSCREEN PREVIEW (Via Maximize2 Button) */}
      {/* ========================================================= */}
      {zoomCard && (
        <div
          onClick={() => setZoomCard(null)}
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={() => setZoomCard(null)}
              className="absolute top-3 right-3 z-30 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Full Preview &bull; {zoomCard === "front" ? "Staff Front" : "Staff Back"}
              </span>
              <button
                onClick={() => executeDownload(zoomCard)}
                className="w-full py-2.5 bg-[#7A1F2B] hover:bg-[#631822] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Hi-Res PNG (300 DPI)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
