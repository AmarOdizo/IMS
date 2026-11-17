"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  AlertTriangle,
  CreditCard,
  CheckCircle2,
  Clock,
  Printer,
  Mail,
  Receipt,
  FileSpreadsheet,
  X,
  User,
  ChevronRight,
  TrendingUp,
  Building2,
  ShieldCheck,
  Send,
  Eye,
  SlidersHorizontal,
  Table,
  Phone,
  ArrowRight,
  FileText,
  Calendar,
  Sparkles,
  Coins,
} from "lucide-react";

interface StudentLedger {
  id: string;
  name: string;
  roll: string;
  course: string;
  semester: string;
  avatar: string;
  totalFee: number;
  concessionAmount: number;
  concessionTag: string;
  netPayable: number;
  paidAmount: number;
  pendingAmount: number;
  status: "Cleared" | "Partial" | "Overdue";
  lastDate: string;
  advisor: string;
  phone: string;
  guardian: string;
  components: {
    tuition: number;
    lab: number;
    libraryExam: number;
    amenities: number;
  };
  tranches: {
    title: string;
    amount: number;
    date: string;
    status: "Paid" | "Pending";
    txnId?: string;
    mode?: string;
  }[];
}

const mockStudents: StudentLedger[] = [
  {
    id: "STU-01",
    name: "Rahul Sharma",
    roll: "APX-2023-CS-042",
    course: "B.Tech Computer Science (CSE)",
    semester: "Sem IV",
    avatar: "RS",
    totalFee: 150000,
    concessionAmount: 22500,
    concessionTag: "Merit 15%",
    netPayable: 127500,
    paidAmount: 100000,
    pendingAmount: 27500,
    status: "Partial",
    lastDate: "22 Jan 2025",
    advisor: "Dr. S. Ranganathan",
    phone: "+91 98765 43210",
    guardian: "Rameshwar Sharma (+91 98111 22334)",
    components: {
      tuition: 100000,
      lab: 25000,
      libraryExam: 15000,
      amenities: 10000,
    },
    tranches: [
      { title: "Tranche 1", amount: 50000, date: "12 Aug 2024", status: "Paid", txnId: "AXP-88912", mode: "UPI" },
      { title: "Tranche 2", amount: 50000, date: "22 Jan 2025", status: "Paid", txnId: "AXP-93041", mode: "NetBanking" },
      { title: "Tranche 3", amount: 27500, date: "30 Apr 2025", status: "Pending" },
    ],
  },
  {
    id: "STU-02",
    name: "Priya Patel",
    roll: "APX-2023-CS-015",
    course: "B.Tech Computer Science (CSE)",
    semester: "Sem IV",
    avatar: "PP",
    totalFee: 150000,
    concessionAmount: 0,
    concessionTag: "None",
    netPayable: 150000,
    paidAmount: 150000,
    pendingAmount: 0,
    status: "Cleared",
    lastDate: "14 Nov 2024",
    advisor: "Dr. Arvind Swaminathan",
    phone: "+91 98440 12345",
    guardian: "K. Patel (+91 98440 54321)",
    components: {
      tuition: 100000,
      lab: 25000,
      libraryExam: 15000,
      amenities: 10000,
    },
    tranches: [
      { title: "Tranche 1", amount: 75000, date: "10 Aug 2024", status: "Paid", txnId: "AXP-81023", mode: "Cheque" },
      { title: "Tranche 2", amount: 75000, date: "14 Nov 2024", status: "Paid", txnId: "AXP-89940", mode: "Bank Transfer" },
    ],
  },
  {
    id: "STU-03",
    name: "Rohan Verma",
    roll: "APX-2023-CS-078",
    course: "B.Tech Computer Science (CSE)",
    semester: "Sem IV",
    avatar: "RV",
    totalFee: 150000,
    concessionAmount: 0,
    concessionTag: "None",
    netPayable: 150000,
    paidAmount: 60000,
    pendingAmount: 90000,
    status: "Overdue",
    lastDate: "05 Aug 2024",
    advisor: "Dr. Meenakshi Sundaram",
    phone: "+91 98230 45678",
    guardian: "V. K. Verma (+91 98230 87654)",
    components: {
      tuition: 100000,
      lab: 25000,
      libraryExam: 15000,
      amenities: 10000,
    },
    tranches: [
      { title: "Tranche 1", amount: 60000, date: "05 Aug 2024", status: "Paid", txnId: "AXP-79011", mode: "Cash" },
      { title: "Tranche 2 (Overdue)", amount: 45000, date: "15 Jan 2025", status: "Pending" },
      { title: "Tranche 3 (Overdue)", amount: 45000, date: "30 Mar 2025", status: "Pending" },
    ],
  },
  {
    id: "STU-04",
    name: "Ananya Iyer",
    roll: "APX-2023-CS-003",
    course: "B.Tech Computer Science (CSE)",
    semester: "Sem IV",
    avatar: "AI",
    totalFee: 150000,
    concessionAmount: 30000,
    concessionTag: "Dean's Honor (20%)",
    netPayable: 120000,
    paidAmount: 120000,
    pendingAmount: 0,
    status: "Cleared",
    lastDate: "10 Dec 2024",
    advisor: "Dr. S. Ranganathan",
    phone: "+91 98190 11223",
    guardian: "R. Iyer (+91 98190 33445)",
    components: {
      tuition: 100000,
      lab: 25000,
      libraryExam: 15000,
      amenities: 10000,
    },
    tranches: [
      { title: "Tranche 1", amount: 60000, date: "15 Aug 2024", status: "Paid", txnId: "AXP-82190", mode: "UPI" },
      { title: "Tranche 2", amount: 60000, date: "10 Dec 2024", status: "Paid", txnId: "AXP-90412", mode: "UPI" },
    ],
  },
  {
    id: "STU-05",
    name: "Sneha Kulkarni",
    roll: "APX-2023-CS-055",
    course: "B.Tech Computer Science (CSE)",
    semester: "Sem IV",
    avatar: "SK",
    totalFee: 150000,
    concessionAmount: 0,
    concessionTag: "None",
    netPayable: 150000,
    paidAmount: 85000,
    pendingAmount: 65000,
    status: "Partial",
    lastDate: "18 Jan 2025",
    advisor: "Dr. Arvind Swaminathan",
    phone: "+91 98770 99887",
    guardian: "M. Kulkarni (+91 98770 11223)",
    components: {
      tuition: 100000,
      lab: 25000,
      libraryExam: 15000,
      amenities: 10000,
    },
    tranches: [
      { title: "Tranche 1", amount: 50000, date: "20 Aug 2024", status: "Paid", txnId: "AXP-83011", mode: "NEFT" },
      { title: "Tranche 2", amount: 35000, date: "18 Jan 2025", status: "Paid", txnId: "AXP-91902", mode: "Bank Transfer" },
      { title: "Tranche 3", amount: 65000, date: "05 Apr 2025", status: "Pending" },
    ],
  },
  {
    id: "STU-06",
    name: "Vikramaditya Singh",
    roll: "APX-2023-CS-091",
    course: "B.Tech Computer Science (CSE)",
    semester: "Sem IV",
    avatar: "VS",
    totalFee: 150000,
    concessionAmount: 0,
    concessionTag: "None",
    netPayable: 150000,
    paidAmount: 115000,
    pendingAmount: 35000,
    status: "Partial",
    lastDate: "04 Feb 2025",
    advisor: "Dr. S. Ranganathan",
    phone: "+91 98660 33445",
    guardian: "D. Singh (+91 98660 55667)",
    components: {
      tuition: 100000,
      lab: 25000,
      libraryExam: 15000,
      amenities: 10000,
    },
    tranches: [
      { title: "Tranche 1", amount: 60000, date: "15 Aug 2024", status: "Paid", txnId: "AXP-82901", mode: "Card" },
      { title: "Tranche 2", amount: 55000, date: "04 Feb 2025", status: "Paid", txnId: "AXP-93910", mode: "Card" },
      { title: "Tranche 3", amount: 35000, date: "15 Apr 2025", status: "Pending" },
    ],
  },
  {
    id: "STU-07",
    name: "Kunal Saxena",
    roll: "APX-2023-CS-019",
    course: "B.Tech Computer Science (CSE)",
    semester: "Sem IV",
    avatar: "KS",
    totalFee: 150000,
    concessionAmount: 15000,
    concessionTag: "Sports 10%",
    netPayable: 135000,
    paidAmount: 50000,
    pendingAmount: 85000,
    status: "Overdue",
    lastDate: "12 Jul 2024",
    advisor: "Dr. Meenakshi Sundaram",
    phone: "+91 98550 77889",
    guardian: "P. Saxena (+91 98550 99001)",
    components: {
      tuition: 100000,
      lab: 25000,
      libraryExam: 15000,
      amenities: 10000,
    },
    tranches: [
      { title: "Tranche 1", amount: 50000, date: "12 Jul 2024", status: "Paid", txnId: "AXP-77091", mode: "Cash" },
      { title: "Tranche 2 (Overdue)", amount: 45000, date: "15 Dec 2024", status: "Pending" },
      { title: "Tranche 3 (Overdue)", amount: 40000, date: "30 Mar 2025", status: "Pending" },
    ],
  },
  {
    id: "STU-08",
    name: "Meera Nair",
    roll: "APX-2023-CS-022",
    course: "B.Tech Computer Science (CSE)",
    semester: "Sem IV",
    avatar: "MN",
    totalFee: 150000,
    concessionAmount: 0,
    concessionTag: "None",
    netPayable: 150000,
    paidAmount: 150000,
    pendingAmount: 0,
    status: "Cleared",
    lastDate: "15 Oct 2024",
    advisor: "Dr. Arvind Swaminathan",
    phone: "+91 98440 66778",
    guardian: "S. Nair (+91 98440 88990)",
    components: {
      tuition: 100000,
      lab: 25000,
      libraryExam: 15000,
      amenities: 10000,
    },
    tranches: [
      { title: "Tranche 1", amount: 75000, date: "18 Aug 2024", status: "Paid", txnId: "AXP-83100", mode: "NetBanking" },
      { title: "Tranche 2", amount: 75000, date: "15 Oct 2024", status: "Paid", txnId: "AXP-87890", mode: "UPI" },
    ],
  },
];

export default function StudentFeeDetailsPage() {
  const [students] = useState<StudentLedger[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentLedger>(mockStudents[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [batchFilter, setBatchFilter] = useState("All Batches");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [concessionFilter, setConcessionFilter] = useState("All Concessions");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [reminderModalStudent, setReminderModalStudent] = useState<StudentLedger | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const statusCounts = useMemo(() => {
    return {
      ALL: students.length,
      CLEARED: students.filter((s) => s.status === "Cleared").length,
      PARTIAL: students.filter((s) => s.status === "Partial").length,
      OVERDUE: students.filter((s) => s.status === "Overdue").length,
    };
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery);

      const matchCourse =
        courseFilter === "All Courses" ||
        s.course.toLowerCase().includes(courseFilter.toLowerCase().replace("b.tech ", ""));

      const matchStatus =
        statusFilter === "ALL" ||
        (statusFilter === "CLEARED" && s.status === "Cleared") ||
        (statusFilter === "PARTIAL" && s.status === "Partial") ||
        (statusFilter === "OVERDUE" && s.status === "Overdue");

      const matchConcession =
        concessionFilter === "All Concessions" ||
        (concessionFilter === "General" && s.concessionTag === "None") ||
        (concessionFilter === "Merit" && s.concessionTag.includes("Merit")) ||
        (concessionFilter === "Honor" && s.concessionTag.includes("Honor")) ||
        (concessionFilter === "Sports" && s.concessionTag.includes("Sports"));

      return matchSearch && matchCourse && matchStatus && matchConcession;
    });
  }, [students, searchQuery, courseFilter, statusFilter, concessionFilter]);

  const handleExportCSV = () => {
    const csvHeader =
      "Student ID,Name,Roll,Course,Semester,Total Fee,Concession,Net Payable,Paid,Pending,Status,Last Date,Phone\n";
    const csvRows = filteredStudents
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.roll}","${s.course}","${s.semester}",${s.totalFee},${s.concessionAmount},${s.netPayable},${s.paidAmount},${s.pendingAmount},"${s.status}","${s.lastDate}","${s.phone}"`
      )
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `student_fee_ledgers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Master student fee ledger exported as CSV!");
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

      {/* Top Operational Context & Actions */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-7 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-amber-50/70 via-blue-50/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Link href="/accountant" className="text-amber-700 hover:underline">
                Accounts Directorate
              </Link>
              <span>/</span>
              <span>Fee Ledgers</span>
              <span>/</span>
              <span className="text-[#3D405B] font-bold">Student Fee Directory</span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#3D405B] tracking-tight">
                  Student Fee Directory &amp; Outstanding Ledgers 📑
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  Live Audit Synchronized
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Real-time student fee accounting, installment schedules, concession waivers, and collection audit trails.
              </p>
            </div>
          </div>

          {/* Action Button Cluster */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Export Master (CSV)</span>
            </button>
            <Link
              href="/accountant/pending-dues"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 shadow-2xs transition-all"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Defaulters (82)</span>
            </Link>
            <Link
              href="/accountant/record-payment"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>+ New Payment Entry</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Real-Time Metrics Tile Array (5 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Billed</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              1,842
            </div>
            <div className="text-xs text-blue-700 font-semibold mt-1">
              ₹27.63 Cr Gross Demand
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Enrolled Students</span>
            <span className="font-semibold text-slate-700">AY 24-25</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Fully Cleared</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              1,380
            </div>
            <div className="text-xs text-emerald-600 font-bold mt-1">
              74.9% Realized
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>NOC Cleared</span>
            <span className="font-semibold text-emerald-600">Zero Dues</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Partial Balance</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              380
            </div>
            <div className="text-xs text-amber-700 font-semibold mt-1">
              20.6% on Tranche
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Active EMI Plans</span>
            <span className="font-semibold text-amber-700">In Schedule</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Overdue Defaulters</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-rose-600 tracking-tight font-mono">
              82
            </div>
            <div className="text-xs text-rose-700 font-semibold mt-1">
              4.5% Past Cutoff
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Admit Card Holds</span>
            <span className="font-semibold text-rose-600">Restricted</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Net Uncollected</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-[#3D405B] tracking-tight font-mono">
              ₹46.50 L
            </div>
            <div className="text-xs text-purple-700 font-semibold mt-1">
              Due Current Term
            </div>
          </div>
          <div className="pt-2.5 mt-2.5 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
            <span>Target Deadline</span>
            <span className="font-semibold text-slate-700">15 May 2025</span>
          </div>
        </div>
      </div>

      {/* Search & Filtration Toolbar */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Row 1: Search and Select dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-4 relative flex items-center">
            <Search className="h-4 w-4 absolute left-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search student name, roll number, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-3 bg-slate-50 text-xs text-slate-800 placeholder:text-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600 transition-colors"
            />
          </div>

          <div className="lg:col-span-2">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 text-xs text-slate-700 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
            >
              <option>All Courses</option>
              <option>B.Tech Computer Science (CSE)</option>
              <option>B.Tech Electronics (ECE)</option>
              <option>M.Tech Data Systems</option>
              <option>BCA</option>
              <option>MCA</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 text-xs text-slate-700 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
            >
              <option>All Batches</option>
              <option>Batch 2023-27 (Sem IV)</option>
              <option>Batch 2022-26 (Sem VI)</option>
              <option>Batch 2024-28 (Sem II)</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 text-xs text-slate-700 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="CLEARED">Fully Paid</option>
              <option value="PARTIAL">Partial Balance</option>
              <option value="OVERDUE">Overdue Defaulters</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={concessionFilter}
              onChange={(e) => setConcessionFilter(e.target.value)}
              className="w-full h-10 px-3 bg-slate-50 text-xs text-slate-700 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600"
            >
              <option value="All Concessions">All Concessions</option>
              <option value="General">General (Full Fee)</option>
              <option value="Merit">Merit 15% Waiver</option>
              <option value="Honor">Dean&apos;s Honor (20%)</option>
              <option value="Sports">Sports Quota</option>
            </select>
          </div>
        </div>

        {/* Row 2: Quick Filter Pills with Dynamic Counts */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setStatusFilter("ALL")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                statusFilter === "ALL"
                  ? "bg-amber-600 text-white shadow-xs font-bold"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>All Students</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                statusFilter === "ALL" ? "bg-white/25 text-white" : "bg-slate-200 text-slate-600"
              }`}>
                {statusCounts.ALL}
              </span>
            </button>

            <button
              onClick={() => setStatusFilter("CLEARED")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                statusFilter === "CLEARED"
                  ? "bg-emerald-600 text-white shadow-xs font-bold"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>Fully Cleared</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                statusFilter === "CLEARED" ? "bg-white/25 text-white" : "bg-slate-200 text-slate-600"
              }`}>
                {statusCounts.CLEARED}
              </span>
            </button>

            <button
              onClick={() => setStatusFilter("PARTIAL")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                statusFilter === "PARTIAL"
                  ? "bg-amber-600 text-white shadow-xs font-bold"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <span>Partial Balance</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                statusFilter === "PARTIAL" ? "bg-white/25 text-white" : "bg-slate-200 text-slate-600"
              }`}>
                {statusCounts.PARTIAL}
              </span>
            </button>

            <button
              onClick={() => setStatusFilter("OVERDUE")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                statusFilter === "OVERDUE"
                  ? "bg-rose-600 text-white shadow-xs font-bold"
                  : "bg-slate-50 text-rose-700 hover:bg-rose-50 border border-rose-200"
              }`}
            >
              <span>Overdue Defaulters</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                statusFilter === "OVERDUE" ? "bg-white/25 text-white" : "bg-rose-100 text-rose-700"
              }`}>
                {statusCounts.OVERDUE}
              </span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredStudents.length}</strong> of {students.length} Records
          </span>
        </div>
      </div>

      {/* Primary Split Surface: Master Ledger (8 cols) & Real-Time Student Audit Inspector (4 cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Data Grid Canvas (8 cols on XL) */}
        <div className="xl:col-span-8 bg-white border border-slate-200 shadow-xs rounded-2xl flex flex-col overflow-hidden">
          <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Table className="h-4 w-4 text-amber-700" />
              <span className="text-sm font-bold text-[#3D405B]">
                Consolidated Fee Ledger Directory
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500 font-mono">
              CURRENCY: INR (₹)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Student / ID</th>
                  <th className="py-3 px-3">Total Fee</th>
                  <th className="py-3 px-3">Concession</th>
                  <th className="py-3 px-3">Net Payable</th>
                  <th className="py-3 px-3">Paid</th>
                  <th className="py-3 px-3">Pending</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Last Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {filteredStudents.map((s) => {
                  const isInspecting = selectedStudent.id === s.id;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedStudent(s)}
                      className={`transition-colors cursor-pointer group ${
                        isInspecting
                          ? "bg-amber-50/70"
                          : s.status === "Overdue"
                          ? "hover:bg-rose-50/40"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 flex items-center justify-center font-bold text-xs rounded-xl ${
                              isInspecting
                                ? "bg-amber-600 text-white shadow-xs"
                                : s.status === "Overdue"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {s.avatar}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-[#3D405B] flex items-center gap-1.5">
                              {s.name}
                              {isInspecting && (
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" title="Active Inspector"></span>
                              )}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {s.roll} &bull; {s.semester}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700">
                        ₹{s.totalFee.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3">
                        {s.concessionAmount > 0 ? (
                          <div className="flex flex-col">
                            <span className="text-amber-800 font-semibold font-mono">
                              -₹{s.concessionAmount.toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {s.concessionTag}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-mono">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#3D405B] font-mono">
                        ₹{s.netPayable.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-700 font-semibold">
                        ₹{s.paidAmount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-rose-600">
                        {s.pendingAmount > 0 ? (
                          `₹${s.pendingAmount.toLocaleString("en-IN")}`
                        ) : (
                          <span className="text-emerald-600 font-medium font-sans text-xs">Nil</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
                            s.status === "Cleared"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : s.status === "Partial"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              s.status === "Cleared"
                                ? "bg-emerald-600"
                                : s.status === "Partial"
                                ? "bg-amber-600"
                                : "bg-rose-600 animate-pulse"
                            }`}
                          ></span>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[11px] text-slate-500 whitespace-nowrap">
                        {s.lastDate}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudent(s);
                              setIsLedgerModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            Ledger
                          </button>
                          {s.pendingAmount > 0 ? (
                            <Link
                              href={`/accountant/record-payment?roll=${s.roll}`}
                              onClick={(e) => e.stopPropagation()}
                              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
                            >
                              Pay
                            </Link>
                          ) : (
                            <span className="px-2 py-1 bg-slate-100 text-slate-400 font-medium text-xs rounded-lg">
                              Paid
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Showing 1 to {filteredStudents.length} of {students.length} students &bull; Page 1 of 1
            </span>
            <div className="flex items-center gap-1 font-semibold">
              <button className="px-3 py-1 bg-white text-slate-400 border border-slate-200 rounded-lg cursor-not-allowed">
                Prev
              </button>
              <button className="px-3 py-1 bg-amber-600 text-white rounded-lg shadow-2xs">
                1
              </button>
              <button className="px-3 py-1 bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Inspection Drawer (4 cols on XL) */}
        <div className="xl:col-span-4 space-y-5">
          {/* Active Student Dossier Card */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs relative overflow-hidden space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-600"></div>

            {/* Header with Avatar & Details */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base rounded-2xl shadow-2xs">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B] leading-tight">
                    {selectedStudent.name}
                  </h3>
                  <span className="text-xs text-blue-600 font-mono font-semibold block">
                    {selectedStudent.roll}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {selectedStudent.course} &bull; {selectedStudent.semester}
                  </span>
                </div>
              </div>
              <span
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                  selectedStudent.status === "Cleared"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : selectedStudent.status === "Partial"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}
              >
                {selectedStudent.status}
              </span>
            </div>

            {/* Meta Chips */}
            <div className="grid grid-cols-2 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Academic Advisor</span>
                <span className="font-semibold text-slate-800 text-[11px] truncate block">
                  {selectedStudent.advisor}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Contact Tel</span>
                <span className="font-semibold text-slate-800 text-[11px] block font-mono">
                  {selectedStudent.phone}
                </span>
              </div>
            </div>

            {/* Detailed Fee Components Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold text-[#3D405B]">
                  Term Fee Components
                </span>
                <span className="text-[10px] font-semibold text-slate-500">
                  AY 2024-25 (TERM II)
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs font-sans">
                <div className="flex items-center justify-between py-1.5 text-slate-600">
                  <span>Tuition &amp; Instruction Base</span>
                  <span className="font-mono font-semibold text-slate-800">
                    ₹{selectedStudent.components.tuition.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 text-slate-600">
                  <span>Advanced Compute &amp; Lab Access</span>
                  <span className="font-mono font-semibold text-slate-800">
                    ₹{selectedStudent.components.lab.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 text-slate-600">
                  <span>Central Library &amp; Exam Fee</span>
                  <span className="font-mono font-semibold text-slate-800">
                    ₹{selectedStudent.components.libraryExam.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 text-slate-600">
                  <span>Campus Amenities &amp; Sports</span>
                  <span className="font-mono font-semibold text-slate-800">
                    ₹{selectedStudent.components.amenities.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 bg-slate-50 px-3 rounded-lg font-bold text-[#3D405B] mt-1">
                  <span>Gross Academic Assessment</span>
                  <span className="font-mono">₹{selectedStudent.totalFee.toLocaleString("en-IN")}</span>
                </div>

                {selectedStudent.concessionAmount > 0 && (
                  <div className="flex items-center justify-between py-2 px-3 bg-amber-50 rounded-lg text-amber-900 font-semibold mt-1">
                    <div className="flex flex-col">
                      <span className="text-xs">Institutional Concession</span>
                      <span className="text-[10px] text-amber-700">{selectedStudent.concessionTag}</span>
                    </div>
                    <span className="font-mono">
                      -₹{selectedStudent.concessionAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between py-2.5 px-3 bg-[#3D405B] text-white rounded-xl font-bold mt-2">
                  <span className="text-xs uppercase tracking-wider">Net Payable Obligation</span>
                  <span className="text-base font-mono">
                    ₹{selectedStudent.netPayable.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Tranche / Installment Timeline */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#3D405B]">
                  Installment Tranches
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {selectedStudent.tranches.length} Scheduled
                </span>
              </div>

              <div className="space-y-2">
                {selectedStudent.tranches.map((tranche, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                      tranche.status === "Paid"
                        ? "bg-slate-50 border-slate-200"
                        : "bg-rose-50/70 border-rose-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {tranche.status === "Paid" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Clock className="h-4 w-4 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <span
                          className={`font-bold block ${
                            tranche.status === "Paid" ? "text-slate-800" : "text-rose-700"
                          }`}
                        >
                          {tranche.title}: ₹{tranche.amount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          {tranche.status === "Paid"
                            ? `Txn #${tranche.txnId} &bull; ${tranche.mode}`
                            : `Due Date: ${tranche.date}`}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        tranche.status === "Paid"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {tranche.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button Cluster */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {selectedStudent.pendingAmount > 0 ? (
                <Link
                  href={`/accountant/record-payment?roll=${selectedStudent.roll}`}
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Receive Pending (₹{selectedStudent.pendingAmount.toLocaleString("en-IN")})</span>
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-2.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 border border-emerald-200 cursor-not-allowed"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Fee Fully Cleared (No Dues)</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsLedgerModalOpen(true)}
                  className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5 text-slate-500" />
                  <span>Ledger PDF</span>
                </button>
                <button
                  onClick={() => setReminderModalStudent(selectedStudent)}
                  className="py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="h-3.5 w-3.5 text-amber-600" />
                  <span>Send Alert</span>
                </button>
              </div>
            </div>
          </div>

          {/* Counter Audit Node Card */}
          <div className="bg-[#3D405B] text-white p-5 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold">Counter Till #02 Active</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-amber-300">
                Staff ID: EMP-FIN-309
              </span>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <div>Operator: <strong className="text-white">Rajesh Kumar (Chief Cashier)</strong></div>
              <div>Today&apos;s Realized: <strong className="text-emerald-400 font-mono font-bold">₹3,85,000 (24 Receipts)</strong></div>
              <div className="text-[11px] text-slate-400">Vault Transfer Cutoff: <strong className="text-slate-200">17:00 IST</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Full Ledger Statement Preview Modal */}
      {isLedgerModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-amber-100 text-amber-800 font-bold flex items-center justify-center rounded-xl">
                  <Table className="h-5 w-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#3D405B]">
                    Student Ledger Statement
                  </h3>
                  <span className="text-xs text-blue-600 font-mono font-semibold">
                    {selectedStudent.name} &bull; {selectedStudent.roll}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsLedgerModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-3">
              <div className="text-center border-b border-slate-200 pb-2.5">
                <span className="text-sm font-bold text-[#3D405B] block">
                  Apex Institute of Technology &amp; Management
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Official Bursar Ledger Statement &bull; Academic Year 2024-25
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Candidate:</span>
                  <span className="font-bold text-[#3D405B]">{selectedStudent.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Roll / Enrolment:</span>
                  <span className="font-bold text-blue-600 font-mono">{selectedStudent.roll}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Programme:</span>
                  <span className="text-slate-700">{selectedStudent.course}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Current Status:</span>
                  <span className="font-bold text-[#3D405B]">{selectedStudent.status}</span>
                </div>
              </div>

              <div className="border border-slate-200 p-3 bg-white rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Tuition &amp; Lab Levy:</span>
                  <span className="font-mono font-bold text-slate-800">
                    ₹{selectedStudent.totalFee.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-amber-800 font-semibold">
                  <span>Concessions Applied:</span>
                  <span className="font-mono">
                    -₹{selectedStudent.concessionAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 font-bold text-[#3D405B]">
                  <span>Net Assessed Demand:</span>
                  <span className="font-mono">₹{selectedStudent.netPayable.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Total Amount Realized:</span>
                  <span className="font-mono">₹{selectedStudent.paidAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 text-rose-600 font-bold">
                  <span>Outstanding Dues Balance:</span>
                  <span className="font-mono">₹{selectedStudent.pendingAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsLedgerModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast("Student Ledger Statement sent to counter printer!");
                  window.print();
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="h-4 w-4" />
                <span>Print Ledger Statement</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Send Reminder Alert Modal */}
      {reminderModalStudent && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl p-5 sm:p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Send Fee Clearance Alert
                </h3>
              </div>
              <button
                onClick={() => setReminderModalStudent(null)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-bold text-[#3D405B]">
                  {reminderModalStudent.name} ({reminderModalStudent.roll})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guardian Contact:</span>
                <span className="text-slate-700 font-medium">
                  {reminderModalStudent.guardian}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pending Dues:</span>
                <span className="font-bold text-rose-600 font-mono">
                  ₹{reminderModalStudent.pendingAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold block mb-1">Notice Template Preview:</span>
              &ldquo;Dear Student/Parent, a pending fee balance of INR ₹{reminderModalStudent.pendingAmount.toLocaleString("en-IN")} is registered for {reminderModalStudent.name}. Please settle before the upcoming term assessment cutoff. — Apex Bursar Directorate&rdquo;
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setReminderModalStudent(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast(
                    `Fee reminder notification sent to ${reminderModalStudent.name} and parent!`
                  );
                  setReminderModalStudent(null);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Reminder</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
