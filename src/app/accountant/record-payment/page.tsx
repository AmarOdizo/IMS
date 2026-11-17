"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  QrCode,
  DollarSign,
  Building2,
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
  GraduationCap,
  Calendar,
  Coins,
  Download,
  Check,
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

interface CounterTxn {
  time: string;
  receiptNo: string;
  studentName: string;
  roll: string;
  course: string;
  mode: string;
  amount: number;
  status: string;
}

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
  const [generatedReceipt, setGeneratedReceipt] = useState<CounterTxn | null>(null);

  // Recent counter transactions state
  const [recentBatch, setRecentBatch] = useState<CounterTxn[]>([
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
      mode: "POS Card",
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
    const newReceipt: CounterTxn = {
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
    setGeneratedReceipt(newReceipt);
    showToast(
      `Payment of ₹${paymentAmount.toLocaleString("en-IN")} successfully posted! Receipt #REC-2025-0843 generated.`
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-600 text-xs sm:text-sm font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Operational Header Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-amber-50/70 via-blue-50/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/accountant" className="text-amber-700 hover:underline">
                Accounts Directorate
              </Link>
              <span>/</span>
              <span>Counter Cashier</span>
              <span>/</span>
              <span className="text-[#3D405B] font-bold">Record Fee Payment</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#3D405B] tracking-tight">
                  Record Fee Payment &amp; Counter Register 💳
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  Till #02 Open &bull; Mr. Rajesh Kumar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Official counter payment intake desk. Generates instant verified thermal receipts and updates student fee ledgers.
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <Link
              href="/accountant/fee-details"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              <span>Fee Directory</span>
            </Link>
            <Link
              href="/accountant/receipts"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-xl border border-amber-200/80 shadow-2xs transition-all"
            >
              <Receipt className="w-4 h-4 text-amber-600" />
              <span>Receipts Log</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Split Grid: 8 Cols Entry Form / 4 Cols Ledger Calculation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Payment Entry Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Student Identification */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-amber-700" />
                <h3 className="text-sm font-bold text-[#3D405B]">
                  1. Student Identification &amp; Enrollment
                </h3>
              </div>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Enrolled &bull; Clearance Active
              </span>
            </div>

            {/* Quick Candidate Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold text-[11px]">Quick Select Candidate:</span>
              {Object.keys(mockStudentProfiles).map((roll) => {
                const s = mockStudentProfiles[roll];
                const isSelected = currentStudent.roll === roll;
                return (
                  <button
                    key={roll}
                    type="button"
                    onClick={() => handleSelectStudent(roll)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? "bg-amber-600 text-white border-amber-600 shadow-xs font-bold"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {s.name} ({roll})
                  </button>
                );
              })}
            </div>

            {/* Selected Student Card */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row gap-4 items-start">
              <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-2xl flex flex-col items-center justify-center font-bold text-lg shadow-2xs shrink-0">
                <GraduationCap className="h-7 w-7 text-amber-700" />
                <span className="text-[10px] font-mono mt-0.5 text-amber-800 font-bold">
                  {currentStudent.semester}
                </span>
              </div>

              <div className="flex-1 space-y-1.5 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-[#3D405B]">
                      {currentStudent.name}
                    </span>
                    <span className="font-mono text-xs text-blue-600 font-semibold">
                      {currentStudent.roll}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-full border border-blue-200">
                    {currentStudent.course}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 pt-1">
                  <div>Batch: <strong className="text-slate-800">{currentStudent.batch}</strong></div>
                  <div>Email: <span className="text-slate-700 font-mono">{currentStudent.email}</span></div>
                  <div>Tel: <span className="text-slate-700 font-mono">{currentStudent.phone}</span></div>
                  <div>Guardian: <span className="text-slate-700">{currentStudent.guardian}</span></div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Scholarship / Concession:</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-md">
                    {currentStudent.scholarship}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Particulars & Fund Allocation */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-amber-700" />
                <h3 className="text-sm font-bold text-[#3D405B]">
                  2. Payment Particulars &amp; Fund Allocation
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Till #02 Real-Time Settlement
              </span>
            </div>

            {/* Billable Component Checkboxes */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#3D405B] block">
                Billable Fee Component Breakdown (Semester IV)
              </span>

              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 cursor-pointer rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={compTuition}
                      onChange={(e) => setCompTuition(e.target.checked)}
                      className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                    />
                    <div>
                      <span className="font-semibold text-xs text-[#3D405B] block">
                        Tuition Fee (Semester IV Standard Term)
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Account Code: #REV-AC-1011 (Core Academics)
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 font-mono text-sm">₹20,000.00</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 cursor-pointer rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={compLab}
                      onChange={(e) => setCompLab(e.target.checked)}
                      className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                    />
                    <div>
                      <span className="font-semibold text-xs text-[#3D405B] block">
                        Computer Lab &amp; Cloud Infrastructure
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Account Code: #REV-AC-1044 (Computing Lab Till)
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 font-mono text-sm">₹5,000.00</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 cursor-pointer rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={compExam}
                      onChange={(e) => setCompExam(e.target.checked)}
                      className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                    />
                    <div>
                      <span className="font-semibold text-xs text-[#3D405B] block">
                        Semester End Examination Assessment
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Account Code: #REV-AC-2009 (Exam Board)
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 font-mono text-sm">₹2,500.00</span>
                </label>
              </div>
            </div>

            {/* Amount and Value Date Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Payment Amount */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-[#3D405B]">
                    Payment Amount (₹ INR) <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[10px] font-bold text-amber-700">
                    {paymentAmount === currentStudent.outstandingBalance
                      ? "EXACT DUE MATCH"
                      : "CUSTOM ENTRY"}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center font-bold text-slate-500 text-lg pointer-events-none">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 text-[#3D405B] font-mono text-xl font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Due: ₹{currentStudent.outstandingBalance.toLocaleString("en-IN")}</span>
                  <span className="font-semibold text-emerald-600">
                    {projectedBalance === 0
                      ? "Clears Full Balance"
                      : `Leaves ₹${projectedBalance.toLocaleString("en-IN")} due`}
                  </span>
                </div>
              </div>

              {/* Receipt Date */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-[#3D405B]">
                    Receipt / Value Date <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[10px] text-slate-400">TODAY</span>
                </div>
                <input
                  type="date"
                  value={receiptDate}
                  onChange={(e) => setReceiptDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 font-mono text-sm font-semibold border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
                />
                <span className="text-[11px] text-slate-500 block">
                  Current Open Till: 28 March 2025 (IST)
                </span>
              </div>
            </div>

            {/* Counter Tender Mode */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-[#3D405B] block">
                Counter Tender Mode <span className="text-rose-600">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMode("cash")}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 text-xs font-bold rounded-xl transition-all gap-1.5 cursor-pointer border ${
                    paymentMode === "cash"
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Coins className="h-4 w-4" />
                  <span>Cash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode("upi")}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 text-xs font-bold rounded-xl transition-all gap-1.5 cursor-pointer border ${
                    paymentMode === "upi"
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <QrCode className="h-4 w-4" />
                  <span>UPI Dynamic</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode("pos")}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 text-xs font-bold rounded-xl transition-all gap-1.5 cursor-pointer border ${
                    paymentMode === "pos"
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Card (POS)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode("bank")}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 text-xs font-bold rounded-xl transition-all gap-1.5 cursor-pointer border ${
                    paymentMode === "bank"
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  <span>NEFT / Wire</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMode("cheque")}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 text-xs font-bold rounded-xl transition-all gap-1.5 cursor-pointer border ${
                    paymentMode === "cheque"
                      ? "bg-amber-600 text-white border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Cheque / DD</span>
                </button>
              </div>
            </div>

            {/* Mode Specific Panel: Cash Denominations */}
            {paymentMode === "cash" && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="font-bold text-xs text-[#3D405B]">
                    Cash Drawer Till #02 Note Denominations
                  </span>
                  <span className="text-emerald-700 font-semibold text-xs">
                    Counting Match: 100%
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-white p-2.5 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">₹500 Notes</span>
                    <input
                      type="number"
                      value={denoms.n500}
                      onChange={(e) => setDenoms({ ...denoms, n500: Number(e.target.value) })}
                      className="w-full bg-slate-50 px-2 py-1 font-bold text-[#3D405B] text-center rounded-lg border border-slate-200"
                    />
                    <span className="text-[11px] text-right block font-mono font-bold text-slate-700">
                      = ₹{(denoms.n500 * 500).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">₹200 Notes</span>
                    <input
                      type="number"
                      value={denoms.n200}
                      onChange={(e) => setDenoms({ ...denoms, n200: Number(e.target.value) })}
                      className="w-full bg-slate-50 px-2 py-1 font-bold text-[#3D405B] text-center rounded-lg border border-slate-200"
                    />
                    <span className="text-[11px] text-right block font-mono font-bold text-slate-700">
                      = ₹{(denoms.n200 * 200).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">₹100 Notes</span>
                    <input
                      type="number"
                      value={denoms.n100}
                      onChange={(e) => setDenoms({ ...denoms, n100: Number(e.target.value) })}
                      className="w-full bg-slate-50 px-2 py-1 font-bold text-[#3D405B] text-center rounded-lg border border-slate-200"
                    />
                    <span className="text-[11px] text-right block font-mono font-bold text-slate-700">
                      = ₹{(denoms.n100 * 100).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">₹50 Notes</span>
                    <input
                      type="number"
                      value={denoms.n50}
                      onChange={(e) => setDenoms({ ...denoms, n50: Number(e.target.value) })}
                      className="w-full bg-slate-50 px-2 py-1 font-bold text-[#3D405B] text-center rounded-lg border border-slate-200"
                    />
                    <span className="text-[11px] text-right block font-mono font-bold text-slate-700">
                      = ₹{(denoms.n50 * 50).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                  <span className="text-slate-500">Counting Machine: #APX-CCM-02 (Verified)</span>
                  <span className="font-bold text-[#3D405B]">
                    Physical Tender Total: <strong className="text-emerald-700 text-sm font-mono">₹{cashTotal.toLocaleString("en-IN")}</strong>
                  </span>
                </div>
              </div>
            )}

            {/* Mode Specific Panel: Electronic (UPI, POS, Bank) */}
            {(paymentMode === "upi" || paymentMode === "pos" || paymentMode === "bank") && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-xs text-[#3D405B] block">
                  {paymentMode === "upi"
                    ? "UPI Reference Particulars"
                    : paymentMode === "pos"
                    ? "POS Card Authorization Particulars"
                    : "NEFT / Direct Wire Particulars"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-medium">Transaction UTR / Auth Reference</label>
                    <input
                      type="text"
                      value={utrRef}
                      onChange={(e) => setUtrRef(e.target.value)}
                      className="w-full px-3 py-2 bg-white font-mono text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 font-medium">Bank / Gateway Entity</label>
                    <input
                      type="text"
                      value={bankEntity}
                      onChange={(e) => setBankEntity(e.target.value)}
                      className="w-full px-3 py-2 bg-white font-mono text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mode Specific Panel: Cheque */}
            {paymentMode === "cheque" && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-xs text-[#3D405B] block">
                  Cheque / Demand Draft Instrument Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-medium">Cheque / DD Number</label>
                    <input
                      type="text"
                      value={chequeNo}
                      onChange={(e) => setChequeNo(e.target.value)}
                      className="w-full px-3 py-2 bg-white font-mono text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 font-medium">Drawn Bank &amp; Branch</label>
                    <input
                      type="text"
                      value={chequeBank}
                      onChange={(e) => setChequeBank(e.target.value)}
                      className="w-full px-3 py-2 bg-white text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 font-medium">Instrument Date</label>
                    <input
                      type="date"
                      value={chequeDate}
                      onChange={(e) => setChequeDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white font-mono text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Remarks */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#3D405B]">
                Cashier Remarks &amp; Ledger Notes
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full p-3 bg-slate-50 text-xs text-slate-800 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentAmount(calculatedFromComponents);
                    setRemarks("");
                    showToast("Form fields reset to defaults.");
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
                >
                  Reset Form
                </button>
                <Link
                  href="/accountant"
                  className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
                >
                  Cancel
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Preview &amp; Process Payment</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Ledger State (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live Ledger Calculation Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Receipt className="h-4 w-4 text-amber-700" />
                <h3 className="text-sm font-bold text-[#3D405B]">
                  Real-Time Fee Ledger
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                Term IV (Even)
              </span>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Gross Approved Fee:</span>
                <span className="font-mono font-semibold text-slate-800">
                  ₹{currentStudent.grossFee.toLocaleString("en-IN")}
                </span>
              </div>

              {currentStudent.concession > 0 && (
                <div className="flex justify-between items-center p-2 bg-amber-50 rounded-lg text-amber-900 font-semibold">
                  <span>Merit Concession:</span>
                  <span className="font-mono">
                    -₹{currentStudent.concession.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center font-bold text-[#3D405B]">
                <span>Net Payable Obligation:</span>
                <span className="font-mono">₹{currentStudent.netPayable.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between items-center text-slate-500">
                <span>Previously Cleared:</span>
                <span className="font-mono text-emerald-700 font-semibold">
                  ₹{currentStudent.previouslyPaid.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center font-bold">
                <span className="text-slate-600">Current Outstanding:</span>
                <span className="font-mono text-rose-600 text-sm">
                  ₹{currentStudent.outstandingBalance.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex justify-between items-center">
                <span className="font-bold text-amber-900">Payment Receiving Now:</span>
                <span className="font-bold text-amber-800 font-mono text-base">
                  ₹{paymentAmount.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Projected Balance Outcome */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    Projected Balance:
                  </span>
                  <span className="text-base font-bold font-mono text-[#3D405B]">
                    ₹{projectedBalance.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    {projectedBalance === 0
                      ? "Status Post-Payment: FULLY CLEARED"
                      : "Status Post-Payment: PARTIAL DUE REMAINING"}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar Representation */}
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Settlement Progress</span>
                <span className="font-bold text-slate-800">
                  {Math.min(
                    100,
                    Math.round(
                      ((currentStudent.previouslyPaid + paymentAmount) / currentStudent.netPayable) * 100
                    )
                  )}
                  % Post-Payment
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 flex overflow-hidden rounded-full">
                <div
                  className="bg-blue-600 h-full"
                  style={{
                    width: `${(currentStudent.previouslyPaid / currentStudent.netPayable) * 100}%`,
                  }}
                  title="Previously Paid"
                ></div>
                <div
                  className="bg-amber-600 h-full"
                  style={{
                    width: `${(paymentAmount / currentStudent.netPayable) * 100}%`,
                  }}
                  title="Current Tender"
                ></div>
              </div>
            </div>
          </div>

          {/* Notification & Dispatch Pipeline */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Printer className="h-4 w-4 text-amber-700" />
                <h3 className="text-sm font-bold text-[#3D405B]">
                  Dispatch &amp; Vouchers
                </h3>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full">
                READY TO POST
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                Allocated System Receipt ID:
              </span>
              <div className="flex items-center justify-between">
                <span className="text-base text-blue-600 font-mono font-bold">REC-2025-0843</span>
                <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-md font-semibold text-slate-700">
                  SERIES 2024-25
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendSMS}
                  onChange={(e) => setSendSMS(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">SMS Receipt Confirmation</span>
                  <span className="text-[10px] text-slate-500">
                    To Guardian: {currentStudent.guardian.split(" ")[1] || "+91 98111 22334"}
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Email PDF Receipt</span>
                  <span className="text-[10px] text-slate-500">
                    To Student: {currentStudent.email}
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={printVouchers}
                  onChange={(e) => setPrintVouchers(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-amber-600 rounded cursor-pointer"
                />
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">Print Counter Foil</span>
                  <span className="text-[10px] text-slate-500">
                    Direct trigger to Till #02 thermal spooler
                  </span>
                </div>
              </label>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>SHA-256 cryptographically stamped on thermal receipt voucher.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Counter Transactions */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <History className="h-4 w-4 text-amber-700" />
            <div>
              <h3 className="text-sm font-bold text-[#3D405B]">
                Recent Counter Transactions (Today&apos;s Till #02 Batch)
              </h3>
              <p className="text-xs text-slate-500">34 Receipts Issued Today &bull; Total Cash: ₹4,18,500</p>
            </div>
          </div>

          <Link
            href="/accountant/payment-history"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>View Full Day Log</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200/80">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-3 px-4">Time / Receipt No</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Department &amp; Sem</th>
                <th className="py-3 px-4">Payment Tender</th>
                <th className="py-3 px-4 text-right">Amount (INR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {recentBatch.map((txn, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">
                    {txn.time} <span className="text-slate-400 font-normal">#{txn.receiptNo}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#3D405B] block">{txn.studentName}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{txn.roll}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{txn.course}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{txn.mode}</td>
                  <td className="py-3 px-4 text-right font-bold text-[#3D405B] font-mono">
                    ₹{txn.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200">
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setGeneratedReceipt(txn);
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Printer className="h-3 w-3 text-slate-500" />
                      <span>Print Slip</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">
                    Commit Payment To General Ledger?
                  </h3>
                  <span className="text-xs text-slate-500">
                    Bursar Immutable Audit Confirmation
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Allocated Receipt:</span>
                <span className="font-bold text-blue-600 font-mono">REC-2025-0843 (AUTO-GENERATED)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-bold text-[#3D405B]">
                  {currentStudent.name} ({currentStudent.roll})
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                <span className="text-slate-600 font-bold">Total Amount Receiving:</span>
                <span className="font-bold text-emerald-700 font-mono text-base">
                  ₹{paymentAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tender Mode:</span>
                <span className="font-semibold text-slate-800 uppercase">{paymentMode} (Counter Verified)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cashier:</span>
                <span className="font-semibold text-slate-700">Mr. Rajesh Kumar (Till #02)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-600">Remaining Due Balance:</span>
                <span className="font-bold text-[#3D405B] font-mono">
                  ₹{projectedBalance.toLocaleString("en-IN")}{" "}
                  {projectedBalance === 0 ? "(TERM FULLY CLEARED)" : "(PARTIAL DUE)"}
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
              <strong>Notice:</strong> Once posted, this receipt is registered on the permanent institutional ledger and cannot be deleted.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Back / Edit
              </button>
              <button
                type="button"
                onClick={handleFinalizePayment}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Confirm &amp; Generate Voucher</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GENERATED / REPRINT THERMAL VOUCHER MODAL */}
      {generatedReceipt && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">
                    Fee Receipt Voucher
                  </h3>
                  <span className="text-xs text-blue-600 font-mono font-semibold">
                    {generatedReceipt.receiptNo}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setGeneratedReceipt(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Voucher Body (Thermal Stylized) */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 text-xs space-y-3.5">
              <div className="text-center border-b border-slate-200 pb-2.5">
                <div className="text-sm font-bold text-[#3D405B] tracking-tight">
                  Apex Institute of Technology &amp; Management
                </div>
                <div className="text-slate-500 text-[11px] font-medium">
                  Central Accounts &amp; Bursar Directorate &bull; Official Voucher
                </div>
                <div className="text-slate-400 text-[10px] font-mono mt-0.5">
                  GSTIN: 07AAAAA0000A1Z5 &bull; Till Counter #02
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Student Name:
                  </span>
                  <span className="font-bold text-[#3D405B]">
                    {generatedReceipt.studentName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Roll Number:
                  </span>
                  <span className="font-bold text-blue-600 font-mono">
                    {generatedReceipt.roll}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Program &amp; Term:
                  </span>
                  <span className="text-slate-700 font-semibold">
                    {generatedReceipt.course}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Timestamp:
                  </span>
                  <span className="text-slate-700 font-mono">
                    {generatedReceipt.time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Payment Mode:
                  </span>
                  <span className="font-bold text-slate-800">
                    {generatedReceipt.mode}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-medium">
                    Audit Status:
                  </span>
                  <span className="font-bold text-emerald-700">
                    {generatedReceipt.status}
                  </span>
                </div>
              </div>

              {/* Amount Box */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block text-[10px]">Total Paid:</span>
                  <span className="text-lg font-bold font-mono text-emerald-700">
                    ₹{generatedReceipt.amount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Operator:</span>
                  <span className="font-semibold text-slate-700 text-xs">Rajesh Kumar</span>
                </div>
              </div>

              {/* Verification Stamp */}
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 text-[11px]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Digitally Reconciled by Bursar Cashier</span>
                </div>
                <span className="font-mono font-bold text-[10px]">VERIFIED</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setGeneratedReceipt(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(`Voucher ${generatedReceipt.receiptNo} sent to counter printer!`);
                  window.print();
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Thermal Voucher</span>
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
        <div className="p-8 text-center text-sm text-slate-500">
          Loading Cashier Point-of-Sale Register...
        </div>
      }
    >
      <RecordPaymentContent />
    </Suspense>
  );
}
