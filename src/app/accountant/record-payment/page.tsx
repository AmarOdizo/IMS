"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  QrCode,
  DollarSign,
  Building,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Printer,
  X,
  Search,
  User,
  History,
  FileText,
  Lock,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
  Phone,
  Mail,
  GraduationCap
} from "lucide-react";

interface StudentProfile {
  roll: string;
  name: string;
  course: string;
  semester: string;
  batch: string;
  email: string;
  phone: string;
  guardian: string;
  scholarship: string;
  grossFee: number;
  concession: number;
  netPayable: number;
  previouslyPaid: number;
  outstandingBalance: number;
}

const mockStudentProfiles: Record<string, StudentProfile> = {
  "APX-2023-CS-042": {
    roll: "APX-2023-CS-042",
    name: "Rahul Sharma",
    course: "B.Tech Computer Science & Engineering",
    semester: "Semester IV",
    batch: "2023 - 2027 (Year 2)",
    email: "rahul.sharma23@apex.edu.in",
    phone: "+91 98765 43210",
    guardian: "Rameshwar Sharma (+91 98111 22334)",
    scholarship: "DEAN'S MERIT CONCESSION (15% APPLIED)",
    grossFee: 150000,
    concession: 22500,
    netPayable: 127500,
    previouslyPaid: 100000,
    outstandingBalance: 27500,
  },
  "APX-2023-CS-078": {
    roll: "APX-2023-CS-078",
    name: "Rohan Verma",
    course: "B.Tech Computer Science & Engineering",
    semester: "Semester IV",
    batch: "2023 - 2027 (Year 2)",
    email: "rohan.v23@apex.edu.in",
    phone: "+91 98230 45678",
    guardian: "V. K. Verma (+91 98230 87654)",
    scholarship: "NONE (GENERAL)",
    grossFee: 150000,
    concession: 0,
    netPayable: 150000,
    previouslyPaid: 60000,
    outstandingBalance: 90000,
  },
  "APX-2023-CS-055": {
    roll: "APX-2023-CS-055",
    name: "Sneha Kulkarni",
    course: "B.Tech Computer Science & Engineering",
    semester: "Semester IV",
    batch: "2023 - 2027 (Year 2)",
    email: "sneha.k23@apex.edu.in",
    phone: "+91 98770 99887",
    guardian: "M. Kulkarni (+91 98770 11223)",
    scholarship: "NONE (GENERAL)",
    grossFee: 150000,
    concession: 0,
    netPayable: 150000,
    previouslyPaid: 85000,
    outstandingBalance: 65000,
  },
  "APX-2023-CS-019": {
    roll: "APX-2023-CS-019",
    name: "Kunal Saxena",
    course: "B.Tech Computer Science & Engineering",
    semester: "Semester IV",
    batch: "2023 - 2027 (Year 2)",
    email: "kunal.s23@apex.edu.in",
    phone: "+91 98550 77889",
    guardian: "P. Saxena (+91 98550 99001)",
    scholarship: "SPORTS QUOTA (10% APPLIED)",
    grossFee: 150000,
    concession: 15000,
    netPayable: 135000,
    previouslyPaid: 50000,
    outstandingBalance: 85000,
  },
};

function RecordPaymentContent() {
  const searchParams = useSearchParams();
  const initialRoll = searchParams.get("roll") || "APX-2023-CS-042";

  const [currentStudent, setCurrentStudent] = useState<StudentProfile>(
    mockStudentProfiles[initialRoll] || mockStudentProfiles["APX-2023-CS-042"]
  );

  // Components Checklist State
  const [compTuition, setCompTuition] = useState(true);
  const [compLab, setCompLab] = useState(true);
  const [compExam, setCompExam] = useState(true);

  // Values for components
  const tuitionVal = 20000;
  const labVal = 5000;
  const examVal = 2500;

  const calculatedFromComponents = useMemo(() => {
    let sum = 0;
    if (compTuition) sum += tuitionVal;
    if (compLab) sum += labVal;
    if (compExam) sum += examVal;
    return sum;
  }, [compTuition, compLab, compExam]);

  // Payment Form State
  const [paymentAmount, setPaymentAmount] = useState<number>(calculatedFromComponents);
  const [receiptDate, setReceiptDate] = useState("2025-03-28");
  const [paymentMode, setPaymentMode] = useState<"cash" | "upi" | "pos" | "bank" | "cheque">("cash");

  // Mode Specific Form State
  // Cash Denominations
  const [denoms, setDenoms] = useState({ n500: 55, n200: 0, n100: 0, n50: 0 });
  const cashTotal = useMemo(() => {
    return denoms.n500 * 500 + denoms.n200 * 200 + denoms.n100 * 100 + denoms.n50 * 50;
  }, [denoms]);

  // Electronic details
  const [utrRef, setUtrRef] = useState("AXIS/4820194821");
  const [bankEntity, setBankEntity] = useState("Axis Bank Corporate Gateway");

  // Cheque details
  const [chequeNo, setChequeNo] = useState("441092");
  const [chequeBank, setChequeBank] = useState("HDFC Bank, Fort Branch");
  const [chequeDate, setChequeDate] = useState("2025-03-28");

  // Remarks
  const [remarks, setRemarks] = useState(
    "Term IV final installment received in full via cash counter. Physical currency verified on counting machine."
  );

  // Notifications toggles
  const [sendSMS, setSendSMS] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [printVouchers, setPrintVouchers] = useState(true);

  // Modals and Toasts
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Recent counter transactions state
  const [recentBatch, setRecentBatch] = useState([
    {
      time: "14:12:08",
      receiptNo: "REC-2025-0842",
      studentName: "Pooja Mehra",
      roll: "APX-2022-EC-019",
      course: "B.Tech ECE • Sem VI",
      mode: "UPI (Axis)",
      amount: 32000,
      status: "POSTED & VERIFIED",
    },
    {
      time: "13:48:22",
      receiptNo: "REC-2025-0841",
      studentName: "Aditya Vardhan",
      roll: "APX-2024-MB-008",
      course: "MBA Finance • Sem II",
      mode: "Cash (Till 02)",
      amount: 45000,
      status: "POSTED & VERIFIED",
    },
    {
      time: "13:15:50",
      receiptNo: "REC-2025-0840",
      studentName: "Tanvi Deshmukh",
      roll: "APX-2021-ME-055",
      course: "B.Tech Mech • Sem VIII",
      mode: "POS #04",
      amount: 18500,
      status: "POSTED & VERIFIED",
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSelectStudent = (roll: string) => {
    if (mockStudentProfiles[roll]) {
      const stu = mockStudentProfiles[roll];
      setCurrentStudent(stu);
      setPaymentAmount(stu.outstandingBalance);
      showToast(`Student dossier loaded: ${stu.name} (${stu.roll})`);
    }
  };

  const projectedBalance = Math.max(0, currentStudent.outstandingBalance - paymentAmount);

  const handleFinalizePayment = () => {
    setIsConfirmModalOpen(false);

    // Create new receipt record
    const newReceipt = {
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      receiptNo: "REC-2025-0843",
      studentName: currentStudent.name,
      roll: currentStudent.roll,
      course: currentStudent.course + " • " + currentStudent.semester,
      mode:
        paymentMode === "cash"
          ? "Cash (Till 02)"
          : paymentMode === "upi"
          ? `UPI (${utrRef.slice(0, 8)})`
          : paymentMode === "pos"
          ? "POS Card"
          : paymentMode === "bank"
          ? "NEFT / RTGS"
          : "Cheque #" + chequeNo,
      amount: paymentAmount,
      status: "POSTED & VERIFIED",
    };

    setRecentBatch([newReceipt, ...recentBatch]);
    showToast(
      `Payment of ₹${paymentAmount.toLocaleString("en-IN")} successfully registered! Receipt #REC-2025-0843 generated & sent via SMS.`
    );
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

      {/* Main Container */}
      <div className="p-6 flex flex-col gap-6">
        {/* Operational Breadcrumbs & Global State Header */}
        <div className="flex flex-col gap-2 bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 font-mono text-xs text-secondary uppercase tracking-wider">
              <Link href="/accountant" className="hover:text-primary transition-colors">
                Accounts &amp; Bursar Portal
              </Link>
              <span className="text-outline">/</span>
              <span>Counter Cashier</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">Record Fee Payment</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-0.5 bg-tertiary-container text-on-tertiary-container font-bold uppercase rounded-xs">
                COUNTER TILL #02 • MR. RAJESH KUMAR (VERIFIED RECEIVER)
              </span>
              <span className="px-2 py-0.5 bg-surface-container-high text-secondary font-semibold rounded-xs">
                SESSION ID: CS-2025-0328-981
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pt-1 border-t border-[#eff4ff]">
            <div>
              <h1 className="text-2xl font-bold uppercase tracking-tight text-primary">
                Record Manual Fee Payment &amp; Counter Register
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                STRICT MANUAL COUNTER MODE. All transactions generate instant immutable receipt numbers. Amount cannot exceed outstanding balance.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-secondary font-bold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full bg-secondary opacity-75 rounded-full"></span>
                <span className="relative inline-flex h-2 w-2 bg-secondary rounded-full"></span>
              </span>
              <span>Bursar Ledger Synchronized</span>
            </div>
          </div>
        </div>

        {/* Primary Split Grid: 65% Entry Form / 35% Ledger Calculation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Payment Entry Form (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Section A: Student Identification & Verified Context */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    1. Student Identification &amp; Enrollment Validation
                  </span>
                </div>
                <span className="font-mono text-xs text-[#047857] font-bold">
                  STATUS: ENROLLED • CLEARANCE ACTIVE
                </span>
              </div>

              {/* Quick Switch Selector */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-outline uppercase text-[10px] font-bold">Quick Select Candidate:</span>
                {Object.keys(mockStudentProfiles).map((roll) => (
                  <button
                    key={roll}
                    type="button"
                    onClick={() => handleSelectStudent(roll)}
                    className={`px-2.5 py-1 rounded-xs border text-[11px] font-bold cursor-pointer transition-colors ${
                      currentStudent.roll === roll
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface-container-low text-on-surface border-[#cbd5e1] hover:bg-surface-container"
                    }`}
                  >
                    {mockStudentProfiles[roll].name} ({roll})
                  </button>
                ))}
              </div>

              {/* Selected Student Identity Dossier */}
              <div className="bg-surface-container-low p-4 border border-[#cbd5e1] rounded-xs flex flex-col md:flex-row gap-4 items-start shadow-xs">
                <div className="relative shrink-0">
                  <div className="w-20 h-24 bg-primary text-secondary-container flex flex-col items-center justify-center font-bold text-xl rounded-xs shadow-xs">
                    <User className="h-10 w-10 text-secondary-fixed-dim" />
                    <span className="text-[10px] font-mono mt-1 text-on-primary-container">STUDENT</span>
                  </div>
                  <span className="absolute bottom-0 right-0 bg-secondary text-on-secondary font-mono text-[9px] px-1 font-bold rounded-xs">
                    {currentStudent.semester}
                  </span>
                </div>

                <div className="flex flex-col justify-between flex-1 w-full gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold uppercase text-primary font-sans">
                        {currentStudent.name}
                      </span>
                      <span className="font-mono text-xs text-secondary font-bold">
                        {currentStudent.roll}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant font-mono text-[10px] font-bold uppercase rounded-xs">
                      {currentStudent.course}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs text-on-surface-variant pt-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <GraduationCap className="h-3.5 w-3.5 text-secondary" />
                      <span>Batch: <strong className="text-on-surface">{currentStudent.batch}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="h-3.5 w-3.5 text-secondary" />
                      <span className="truncate">{currentStudent.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Phone className="h-3.5 w-3.5 text-secondary" />
                      <span>{currentStudent.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <User className="h-3.5 w-3.5 text-secondary" />
                      <span>G: {currentStudent.guardian}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 mt-1 bg-surface-container/60 px-2.5 py-1 text-[11px] font-mono rounded-xs">
                    <span className="text-on-surface-variant font-bold">Scholarship / Aid:</span>
                    <span className="text-primary font-bold">{currentStudent.scholarship}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section B: Payment Particulars & Fund Allocation */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    2. Payment Particulars &amp; Fund Allocation
                  </span>
                </div>
                <span className="font-mono text-[11px] text-secondary font-bold uppercase">
                  Counter Rule: Strict Allocation Check
                </span>
              </div>

              {/* Billable Component Allocation Checkboxes */}
              <div className="flex flex-col gap-2 bg-surface-container-low p-3 border border-[#cbd5e1] rounded-xs font-mono text-xs">
                <div className="flex items-center justify-between uppercase text-on-surface-variant font-bold text-[10px] pb-1 border-b border-[#cbd5e1]">
                  <span>Billable Component Allocation (Semester IV)</span>
                  <span>Allocated Amount (INR)</span>
                </div>

                <label className="flex items-center justify-between p-2 bg-surface-container-lowest hover:bg-surface-container cursor-pointer transition-colors border border-[#cbd5e1] rounded-xs">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={compTuition}
                      onChange={(e) => setCompTuition(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded-none cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-primary">Tuition Fee (Semester IV Standard Term)</span>
                      <span className="text-[10px] text-on-surface-variant">Account Code: #REV-AC-1011 (Core Academics)</span>
                    </div>
                  </div>
                  <span className="font-bold text-primary text-sm">₹20,000.00</span>
                </label>

                <label className="flex items-center justify-between p-2 bg-surface-container-lowest hover:bg-surface-container cursor-pointer transition-colors border border-[#cbd5e1] rounded-xs">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={compLab}
                      onChange={(e) => setCompLab(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded-none cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-primary">Computer Lab &amp; Cloud Infrastructure</span>
                      <span className="text-[10px] text-on-surface-variant">Account Code: #REV-AC-1044 (Computing Lab Till)</span>
                    </div>
                  </div>
                  <span className="font-bold text-primary text-sm">₹5,000.00</span>
                </label>

                <label className="flex items-center justify-between p-2 bg-surface-container-lowest hover:bg-surface-container cursor-pointer transition-colors border border-[#cbd5e1] rounded-xs">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={compExam}
                      onChange={(e) => setCompExam(e.target.checked)}
                      className="w-4 h-4 accent-primary rounded-none cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-primary">Semester End Examination Assessment</span>
                      <span className="text-[10px] text-on-surface-variant">Account Code: #REV-AC-2009 (Autonomous Exam Board)</span>
                    </div>
                  </div>
                  <span className="font-bold text-primary text-sm">₹2,500.00</span>
                </label>
              </div>

              {/* Amount and Date Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Payment Amount Field */}
                <div className="flex flex-col gap-1 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <label className="uppercase font-bold text-on-surface-variant text-[11px]">
                      Payment Amount (₹ INR) <span className="text-error">*</span>
                    </label>
                    <span className="text-[10px] text-secondary font-bold">
                      {paymentAmount === currentStudent.outstandingBalance ? "EXACT DUE MATCH" : "CUSTOM ENTRY"}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center font-bold text-primary text-lg pointer-events-none">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 bg-surface-container-lowest text-primary font-mono text-xl font-bold border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-on-surface-variant pt-0.5">
                    <span>Outstanding balance: ₹{currentStudent.outstandingBalance.toLocaleString("en-IN")}</span>
                    <span className="text-primary font-bold bg-secondary-fixed/50 px-1 py-0.2 rounded-xs">
                      {projectedBalance === 0 ? "EXACTLY CLEARS TERM DUES" : `LEAVES ₹${projectedBalance.toLocaleString("en-IN")} DUE`}
                    </span>
                  </div>
                </div>

                {/* Receipt Date Field */}
                <div className="flex flex-col gap-1 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <label className="uppercase font-bold text-on-surface-variant text-[11px]">
                      Receipt / Value Date <span className="text-error">*</span>
                    </label>
                    <span className="text-[10px] text-on-surface-variant">FISCAL DAY: CURRENT</span>
                  </div>
                  <input
                    type="date"
                    value={receiptDate}
                    onChange={(e) => setReceiptDate(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-container-lowest text-on-surface font-mono text-sm font-semibold border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary uppercase"
                  />
                  <span className="text-[10px] text-on-surface-variant pt-0.5">
                    Current Open Till Date: 28 March 2025 (IST)
                  </span>
                </div>
              </div>

              {/* Counter Tender Mode Selector */}
              <div className="flex flex-col gap-1.5 pt-1 font-mono text-xs">
                <label className="uppercase font-bold text-on-surface-variant text-[11px]">
                  Counter Tender Mode <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode("cash")}
                    className={`flex flex-col items-center justify-center py-2 px-1 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors gap-1 cursor-pointer border ${
                      paymentMode === "cash"
                        ? "bg-primary text-on-primary border-primary shadow-xs"
                        : "bg-surface-container-low text-on-surface border-[#cbd5e1] hover:bg-surface-container"
                    }`}
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>Cash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode("upi")}
                    className={`flex flex-col items-center justify-center py-2 px-1 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors gap-1 cursor-pointer border ${
                      paymentMode === "upi"
                        ? "bg-primary text-on-primary border-primary shadow-xs"
                        : "bg-surface-container-low text-on-surface border-[#cbd5e1] hover:bg-surface-container"
                    }`}
                  >
                    <QrCode className="h-4 w-4" />
                    <span>UPI Dynamic</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode("pos")}
                    className={`flex flex-col items-center justify-center py-2 px-1 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors gap-1 cursor-pointer border ${
                      paymentMode === "pos"
                        ? "bg-primary text-on-primary border-primary shadow-xs"
                        : "bg-surface-container-low text-on-surface border-[#cbd5e1] hover:bg-surface-container"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Card (POS)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode("bank")}
                    className={`flex flex-col items-center justify-center py-2 px-1 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors gap-1 cursor-pointer border ${
                      paymentMode === "bank"
                        ? "bg-primary text-on-primary border-primary shadow-xs"
                        : "bg-surface-container-low text-on-surface border-[#cbd5e1] hover:bg-surface-container"
                    }`}
                  >
                    <Building className="h-4 w-4" />
                    <span>NEFT / RTGS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode("cheque")}
                    className={`flex flex-col items-center justify-center py-2 px-1 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors gap-1 cursor-pointer border ${
                      paymentMode === "cheque"
                        ? "bg-primary text-on-primary border-primary shadow-xs"
                        : "bg-surface-container-low text-on-surface border-[#cbd5e1] hover:bg-surface-container"
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>Cheque / DD</span>
                  </button>
                </div>
              </div>

              {/* Mode-Specific Input Panel: Cash Denominations */}
              {paymentMode === "cash" && (
                <div className="bg-surface-container-low p-3.5 border border-[#cbd5e1] rounded-xs flex flex-col gap-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-bold text-primary uppercase text-[11px]">
                      Cash Drawer Verification &amp; Till #02 Denominations
                    </span>
                    <span className="text-secondary font-bold text-[10px]">Currency Count Match: 100%</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-surface-container-lowest p-2 border border-[#cbd5e1] rounded-xs flex flex-col gap-1">
                      <span className="text-[10px] text-on-surface-variant font-bold">₹500 Notes</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-outline">Qty:</span>
                        <input
                          type="number"
                          value={denoms.n500}
                          onChange={(e) => setDenoms({ ...denoms, n500: Number(e.target.value) })}
                          className="w-full bg-surface-container px-1 py-0.5 font-bold text-primary text-center rounded-xs"
                        />
                      </div>
                      <span className="text-[11px] text-right text-primary font-bold">
                        = ₹{(denoms.n500 * 500).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="bg-surface-container-lowest p-2 border border-[#cbd5e1] rounded-xs flex flex-col gap-1">
                      <span className="text-[10px] text-on-surface-variant font-bold">₹200 Notes</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-outline">Qty:</span>
                        <input
                          type="number"
                          value={denoms.n200}
                          onChange={(e) => setDenoms({ ...denoms, n200: Number(e.target.value) })}
                          className="w-full bg-surface-container px-1 py-0.5 font-bold text-primary text-center rounded-xs"
                        />
                      </div>
                      <span className="text-[11px] text-right text-on-surface-variant">
                        = ₹{(denoms.n200 * 200).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="bg-surface-container-lowest p-2 border border-[#cbd5e1] rounded-xs flex flex-col gap-1">
                      <span className="text-[10px] text-on-surface-variant font-bold">₹100 Notes</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-outline">Qty:</span>
                        <input
                          type="number"
                          value={denoms.n100}
                          onChange={(e) => setDenoms({ ...denoms, n100: Number(e.target.value) })}
                          className="w-full bg-surface-container px-1 py-0.5 font-bold text-primary text-center rounded-xs"
                        />
                      </div>
                      <span className="text-[11px] text-right text-on-surface-variant">
                        = ₹{(denoms.n100 * 100).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="bg-surface-container-lowest p-2 border border-[#cbd5e1] rounded-xs flex flex-col gap-1">
                      <span className="text-[10px] text-on-surface-variant font-bold">₹50 / Coins</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-outline">Qty:</span>
                        <input
                          type="number"
                          value={denoms.n50}
                          onChange={(e) => setDenoms({ ...denoms, n50: Number(e.target.value) })}
                          className="w-full bg-surface-container px-1 py-0.5 font-bold text-primary text-center rounded-xs"
                        />
                      </div>
                      <span className="text-[11px] text-right text-on-surface-variant">
                        = ₹{(denoms.n50 * 50).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#cbd5e1] text-[11px]">
                    <span className="text-on-surface-variant">Cash Counting Machine Counter: #APX-CCM-02 (PASSED)</span>
                    <span className="font-bold text-primary">
                      Physical Tender Total: <strong className="text-secondary text-sm">₹{cashTotal.toLocaleString("en-IN")}.00</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* Mode-Specific Input Panel: Electronic (UPI, POS, Bank) */}
              {(paymentMode === "upi" || paymentMode === "pos" || paymentMode === "bank") && (
                <div className="bg-surface-container-low p-3.5 border border-[#cbd5e1] rounded-xs flex flex-col gap-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-bold text-primary uppercase text-[11px]">
                      {paymentMode === "upi"
                        ? "UPI Dynamic Transaction Data"
                        : paymentMode === "pos"
                        ? "Point-of-Sale (POS) Terminal Auth"
                        : "NEFT / RTGS Institutional Remittance"}
                    </span>
                    <span className="text-secondary font-bold text-[10px]">GATEWAY DIRECT PULL</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                        Transaction UTR / Reference ID
                      </label>
                      <input
                        type="text"
                        value={utrRef}
                        onChange={(e) => setUtrRef(e.target.value)}
                        className="px-2.5 py-1.5 bg-surface-container-lowest font-mono text-xs border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                        Bank / Origin Entity
                      </label>
                      <input
                        type="text"
                        value={bankEntity}
                        onChange={(e) => setBankEntity(e.target.value)}
                        className="px-2.5 py-1.5 bg-surface-container-lowest font-mono text-xs border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mode-Specific Input Panel: Cheque */}
              {paymentMode === "cheque" && (
                <div className="bg-surface-container-low p-3.5 border border-[#cbd5e1] rounded-xs flex flex-col gap-2 font-mono text-xs">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-bold text-primary uppercase text-[11px]">
                      Negotiable Instrument Particulars (CTS-2010 Only)
                    </span>
                    <span className="text-error font-bold text-[10px]">SUBJECT TO CLEARING</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                        Cheque / DD Number
                      </label>
                      <input
                        type="text"
                        value={chequeNo}
                        onChange={(e) => setChequeNo(e.target.value)}
                        className="px-2.5 py-1.5 bg-surface-container-lowest font-mono text-xs border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                        Drawn Bank &amp; Branch
                      </label>
                      <input
                        type="text"
                        value={chequeBank}
                        onChange={(e) => setChequeBank(e.target.value)}
                        className="px-2.5 py-1.5 bg-surface-container-lowest font-mono text-xs border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-on-surface-variant">
                        Instrument Date
                      </label>
                      <input
                        type="date"
                        value={chequeDate}
                        onChange={(e) => setChequeDate(e.target.value)}
                        className="px-2.5 py-1 bg-surface-container-lowest font-mono text-xs border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Remarks */}
              <div className="flex flex-col gap-1 font-mono text-xs">
                <label className="uppercase font-bold text-on-surface-variant text-[11px]">
                  Counter Auditor Remarks &amp; Ledger Annotations
                </label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full p-2.5 bg-surface-container-low text-on-surface border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary font-mono text-xs"
                />
                <span className="text-[10px] text-on-surface-variant">
                  Note will be irreversibly archived with transaction hash: #TXN-GL-849202
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentAmount(calculatedFromComponents);
                      setRemarks("");
                      showToast("Payment form fields reset.");
                    }}
                    className="px-3.5 py-2 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs font-bold uppercase rounded-xs border border-[#cbd5e1] cursor-pointer"
                  >
                    Reset Form
                  </button>
                  <Link
                    href="/accountant"
                    className="px-3.5 py-2 bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-mono text-xs font-bold uppercase rounded-xs border border-[#cbd5e1]"
                  >
                    Cancel
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary font-mono text-xs font-bold uppercase tracking-widest hover:bg-primary shadow-md rounded-xs cursor-pointer transition-colors"
                >
                  <ShieldCheck className="h-4 w-4 text-secondary-container" />
                  <span>Preview &amp; Process Payment</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Real-Time Ledger State & Generation Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Live Payment Ledger Breakdown Tile */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                    Real-time Student Ledger
                  </span>
                </div>
                <span className="font-mono text-secondary text-[11px] font-bold">TERM IV (EVEN)</span>
              </div>

              {/* Mathematical Progression List */}
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-on-surface-variant text-[11px]">Gross Approved Term Fee:</span>
                  <span className="text-on-surface font-semibold">
                    ₹{currentStudent.grossFee.toLocaleString("en-IN")}.00
                  </span>
                </div>
                {currentStudent.concession > 0 && (
                  <div className="flex justify-between items-center py-1 bg-surface-container-low px-2 rounded-xs">
                    <span className="text-secondary font-medium text-[11px]">Merit Concession:</span>
                    <span className="text-secondary font-bold">
                      -₹{currentStudent.concession.toLocaleString("en-IN")}.00
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1 font-bold text-on-surface">
                  <span className="text-[11px]">Net Payable Assessment:</span>
                  <span>₹{currentStudent.netPayable.toLocaleString("en-IN")}.00</span>
                </div>
                <div className="flex justify-between items-center py-1 text-on-surface-variant text-[11px]">
                  <span>Previously Cleared:</span>
                  <span className="font-semibold text-primary">
                    ₹{currentStudent.previouslyPaid.toLocaleString("en-IN")}.00
                  </span>
                </div>

                <div className="h-px bg-[#cbd5e1] my-1"></div>

                <div className="flex justify-between items-center py-1.5 bg-surface-container px-2 rounded-xs">
                  <span className="font-bold text-on-surface uppercase text-[11px]">Outstanding Due Balance:</span>
                  <span className="font-bold text-primary text-sm">
                    ₹{currentStudent.outstandingBalance.toLocaleString("en-IN")}.00
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 bg-secondary-fixed/50 px-2 rounded-xs">
                  <span className="font-bold text-primary uppercase text-[11px]">Payment Received Now:</span>
                  <span className="font-bold text-primary text-sm">
                    ₹{paymentAmount.toLocaleString("en-IN")}.00
                  </span>
                </div>

                {/* Projected Balance Outcome */}
                <div className="p-3 bg-surface-container-highest mt-1 rounded-xs flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-on-surface-variant uppercase text-[10px]">
                      Projected Balance:
                    </span>
                    <span className="text-lg font-bold font-mono text-primary">
                      ₹{projectedBalance.toLocaleString("en-IN")}.00
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] font-bold text-secondary">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#047857]" />
                    <span>
                      {projectedBalance === 0
                        ? "Ledger Status Post-Commit: FULLY CLEARED"
                        : "Ledger Status Post-Commit: PARTIAL DUE REMAINING"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Representation */}
              <div className="flex flex-col gap-1 pt-1 font-mono text-xs">
                <div className="flex justify-between text-[11px] uppercase text-on-surface-variant">
                  <span>Settlement Progress</span>
                  <span className="font-bold text-primary">
                    {Math.min(
                      100,
                      Math.round(
                        ((currentStudent.previouslyPaid + paymentAmount) / currentStudent.netPayable) * 100
                      )
                    )}
                    % Post-Payment
                  </span>
                </div>
                <div className="w-full h-2.5 bg-surface-container flex overflow-hidden rounded-full">
                  <div
                    className="bg-primary-container h-full"
                    style={{
                      width: `${(currentStudent.previouslyPaid / currentStudent.netPayable) * 100}%`,
                    }}
                    title="Previously Paid"
                  ></div>
                  <div
                    className="bg-secondary h-full"
                    style={{
                      width: `${(paymentAmount / currentStudent.netPayable) * 100}%`,
                    }}
                    title="Current Tender"
                  ></div>
                </div>
              </div>
            </div>

            {/* Execution & Dispatch Preview Card */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <Printer className="h-4 w-4 text-primary" />
                  <span className="font-bold uppercase tracking-wider text-primary">
                    Dispatch &amp; Vouchers
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-surface-container-high text-primary text-[10px] font-bold rounded-xs">
                  READY TO POST
                </span>
              </div>

              {/* Next Generated Receipt Identifier */}
              <div className="p-2.5 bg-surface-container-low border border-[#cbd5e1] rounded-xs flex flex-col gap-1">
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">
                  Allocated System Receipt Number:
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-base text-primary font-bold tracking-wider">REC-2025-0843</span>
                  <span className="px-1.5 py-0.2 bg-surface-container text-secondary text-[10px] rounded-xs">
                    SERIES 2024-25
                  </span>
                </div>
                <span className="text-[9px] text-on-surface-variant">
                  Receipt sequence is locked and audited by Bursar Registrar Node.
                </span>
              </div>

              {/* Multichannel Notification Pipeline */}
              <div className="flex flex-col gap-2 pt-1 font-sans text-xs">
                <span className="font-mono text-[10px] uppercase text-on-surface-variant font-bold">
                  Automatic Notification Pipeline:
                </span>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendSMS}
                    onChange={(e) => setSendSMS(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-primary rounded-none cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-primary text-[11px]">SMS Receipt Confirmation</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      To Parent: {currentStudent.guardian.split(" ")[1] || "+91 98111 22334"} (NIC Gateway)
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-primary rounded-none cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-primary text-[11px]">Email Signed PDF Receipt</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      To Student: {currentStudent.email}
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={printVouchers}
                    onChange={(e) => setPrintVouchers(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-primary rounded-none cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-primary text-[11px]">Auto-Print Physical Vouchers</span>
                    <span className="font-mono text-[10px] text-on-surface-variant">
                      2 Copies (Thermal Till Print + Student A4 Counterfoil)
                    </span>
                  </div>
                </label>
              </div>

              {/* Security Seal */}
              <div className="p-2 bg-surface-container-high/60 border border-[#cbd5e1] rounded-xs flex items-center gap-2 text-on-surface-variant text-[10px]">
                <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
                <span className="leading-tight">
                  SHA-256 Checksum will be stamped onto physical thermal voucher.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner: Recent Counter Transactions */}
        <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm flex flex-col gap-2 mt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#cbd5e1]">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  Recent Counter Transactions (Today&apos;s Till #02 Batch)
                </span>
                <span className="font-mono text-secondary text-[11px]">LOGGED BY: RAJESH KUMAR</span>
              </div>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs">
              <span className="text-on-surface-variant text-[11px]">
                34 RECEIPTS ISSUED TODAY • TOTAL CASH: ₹4,18,500
              </span>
              <Link
                href="/accountant/payment-history"
                className="font-bold text-primary hover:underline flex items-center gap-1 uppercase"
              >
                <span>Full Day Log</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-bold uppercase tracking-wider text-[11px] border-b border-[#cbd5e1]">
                  <th className="py-2 px-3">Time / Receipt No</th>
                  <th className="py-2 px-3">Student Identifier</th>
                  <th className="py-2 px-3">Department &amp; Sem</th>
                  <th className="py-2 px-3">Payment Tender</th>
                  <th className="py-2 px-3 text-right">Amount (INR)</th>
                  <th className="py-2 px-3 text-center">Audit Status</th>
                  <th className="py-2 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-on-surface">
                {recentBatch.map((txn, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-2 px-3 font-bold text-primary">
                      {txn.time} <span className="text-secondary ml-1 font-normal">#{txn.receiptNo}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span className="font-bold font-sans text-on-surface">{txn.studentName}</span>
                      <span className="text-on-surface-variant text-[11px] block">{txn.roll}</span>
                    </td>
                    <td className="py-2 px-3 text-on-surface-variant">{txn.course}</td>
                    <td className="py-2 px-3 font-semibold text-primary">{txn.mode}</td>
                    <td className="py-2 px-3 text-right font-bold text-primary">
                      ₹{txn.amount.toLocaleString("en-IN")}.00
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-1.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed-variant text-[10px] font-bold uppercase rounded-xs">
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button
                        onClick={() => showToast(`Reprinting receipt ${txn.receiptNo} on Till #02 thermal spooler...`)}
                        className="px-2 py-1 bg-surface-container-high hover:bg-surface-variant text-primary font-mono text-[10px] uppercase font-bold rounded-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="h-3 w-3" />
                        Reprint Slip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-xl w-full border-2 border-primary shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-[#cbd5e1]">
              <div>
                <span className="font-mono text-[10px] uppercase text-secondary font-bold">
                  BURSAR IMMUTABLE AUDIT CONFIRMATION
                </span>
                <h2 className="text-lg font-bold uppercase text-primary">
                  Commit Payment To General Ledger?
                </h2>
              </div>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="text-outline hover:text-primary p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-surface-container-low p-4 border border-[#cbd5e1] rounded-xs font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Receipt No:</span>
                <span className="font-bold text-primary">REC-2025-0843 (AUTO-GENERATED)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Student:</span>
                <span className="font-bold text-on-surface">
                  {currentStudent.name} ({currentStudent.roll})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Total Amount Received:</span>
                <span className="font-bold text-primary text-base">
                  ₹{paymentAmount.toLocaleString("en-IN")}.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Tender Mode:</span>
                <span className="font-bold text-secondary uppercase">{paymentMode} (COUNTER SPECIFIED)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Cashier:</span>
                <span>Rajesh Kumar (EMP-FIN-2016-309)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#cbd5e1] font-bold">
                <span className="text-on-surface-variant">Final Student Balance:</span>
                <span className="text-primary">
                  ₹{projectedBalance.toLocaleString("en-IN")}.00{" "}
                  {projectedBalance === 0 ? "(TERM FULLY CLEARED)" : "(PARTIAL DUE)"}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-surface-container border border-[#cbd5e1] text-[11px] font-mono text-on-surface-variant rounded-xs">
              <strong className="text-primary">LEGAL NOTICE:</strong> Once committed, this receipt is irrevocable under Financial Bylaws Sec 4.4. A reversing adjustment voucher will require Directorate Level 3 Authorization.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#cbd5e1]">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 border border-[#cbd5e1] text-xs font-mono font-bold uppercase hover:bg-surface-container"
              >
                Back / Edit
              </button>
              <button
                type="button"
                onClick={handleFinalizePayment}
                className="px-5 py-2 bg-primary text-on-primary text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-primary-container shadow-md"
              >
                <Printer className="h-4 w-4" />
                <span>Confirm, Post &amp; Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecordPaymentPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center font-mono text-sm text-secondary">
          Loading Cashier Point-of-Sale Register...
        </div>
      }
    >
      <RecordPaymentContent />
    </Suspense>
  );
}

