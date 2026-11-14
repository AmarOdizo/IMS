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
  Building,
  ShieldCheck,
  Send,
  Eye,
  SlidersHorizontal,
  Table
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
  const [students, setStudents] = useState<StudentLedger[]>(mockStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentLedger>(mockStudents[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [batchFilter, setBatchFilter] = useState("All Batches");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [concessionFilter, setConcessionFilter] = useState("All Concessions");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery);

      const matchCourse =
        courseFilter === "All Courses" || s.course.includes(courseFilter.replace("B.Tech ", "").replace(" (CSE)", ""));

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

  const handleExportXLS = () => {
    showToast("Master student fee ledger exported to Excel (XLS) format!");
  };

  const handleSendReminder = (student: StudentLedger) => {
    showToast(`Payment reminder dispatch queued via Email & SMS to ${student.name} (+91 98765 43210)!`);
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
        {/* Top Operational Context & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-mono text-xs text-secondary uppercase tracking-wider">
              <Link href="/accountant" className="hover:text-primary transition-colors">
                Accounts &amp; Bursar Portal
              </Link>
              <span className="text-outline">/</span>
              <span>Fee Ledgers</span>
              <span className="text-outline">/</span>
              <span className="text-primary font-bold">Student Fee Directory &amp; Ledger Audit</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-primary">
                Student Fee Directory &amp; Outstanding Ledgers
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 bg-surface-container font-mono text-secondary text-[11px] font-bold uppercase rounded-xs">
                LIVE AUDIT SYNCHRONIZED
              </span>
            </div>
          </div>

          {/* CTA Cluster */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportXLS}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container-lowest text-primary font-mono text-xs font-bold uppercase tracking-wider hover:bg-surface-container-high border border-[#cbd5e1] shadow-xs rounded-xs transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-secondary" />
              <span>Export Master (XLS)</span>
            </button>
            <Link
              href="/accountant/pending-dues"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-error-container text-on-error-container font-mono text-xs font-bold uppercase tracking-wider hover:bg-error hover:text-on-error shadow-xs rounded-xs transition-colors cursor-pointer"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Generate Defaulter Notice (PDF)</span>
            </Link>
            <Link
              href="/accountant/record-payment"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider hover:bg-primary-container shadow-xs rounded-xs transition-colors cursor-pointer"
            >
              <CreditCard className="h-3.5 w-3.5 text-secondary-container" />
              <span>+ New Payment Entry</span>
            </Link>
          </div>
        </div>

        {/* Real-Time Metrics Tile Array (5 Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {/* Tile 1 */}
          <div className="bg-surface-container-lowest p-4 flex flex-col justify-between border border-[#cbd5e1] shadow-xs relative overflow-hidden border-l-4 border-l-primary rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">
                Total Billed
              </span>
              <Building className="h-4 w-4 text-secondary" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-primary">1,842</span>
              <span className="font-mono text-on-surface-variant text-[11px]">AY 24-25</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-secondary font-bold">₹27.63 Cr Gross Demand</div>
          </div>

          {/* Tile 2 */}
          <div className="bg-surface-container-lowest p-4 flex flex-col justify-between border border-[#cbd5e1] shadow-xs relative overflow-hidden border-l-4 border-l-secondary rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">
                Fully Paid
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#047857]" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-primary">1,380</span>
              <span className="font-mono text-[#047857] text-[11px] font-bold">74.9%</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-secondary font-semibold">NOC Cleared</div>
          </div>

          {/* Tile 3 */}
          <div className="bg-surface-container-lowest p-4 flex flex-col justify-between border border-[#cbd5e1] shadow-xs relative overflow-hidden border-l-4 border-l-secondary-container rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">
                Partial Dues
              </span>
              <Clock className="h-4 w-4 text-secondary" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-primary">380</span>
              <span className="font-mono text-secondary text-[11px] font-bold">20.6%</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-on-surface-variant font-semibold">Active Tranche Plan</div>
          </div>

          {/* Tile 4 */}
          <div className="bg-surface-container-lowest p-4 flex flex-col justify-between border border-[#cbd5e1] shadow-xs relative overflow-hidden border-l-4 border-l-error rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-error uppercase tracking-wider font-bold">
                Overdue / Defaulters
              </span>
              <AlertTriangle className="h-4 w-4 text-error" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-error">82</span>
              <span className="font-mono text-error text-[11px] font-bold">4.5%</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-error font-bold">Hall Ticket Restricted</div>
          </div>

          {/* Tile 5 */}
          <div className="bg-surface-container-lowest p-4 flex flex-col justify-between border border-[#cbd5e1] shadow-xs relative overflow-hidden col-span-2 md:col-span-1 border-l-4 border-l-tertiary-container rounded-sm">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-on-surface-variant uppercase tracking-wider font-bold">
                Net Uncollected
              </span>
              <Receipt className="h-4 w-4 text-secondary" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-on-surface">₹46.50 L</span>
              <span className="font-mono text-secondary text-[11px]">Due Current Term</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-secondary font-semibold">Target Rec.: 15 May</div>
          </div>
        </div>

        {/* Search & Filtration Canvas */}
        <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm flex flex-col gap-3">
          {/* Row 1: Query & High-Density Selects */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-4 relative flex items-center">
              <Search className="h-4 w-4 absolute left-3 text-secondary" />
              <input
                type="text"
                placeholder="Search student name, roll number, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 bg-surface-container-low font-mono text-xs text-on-surface placeholder:text-outline border border-[#cbd5e1] rounded-xs focus:outline-none focus:border-secondary"
              />
            </div>
            <div className="md:col-span-2">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="w-full h-9 px-2.5 bg-surface-container-low font-mono text-xs text-on-surface border border-[#cbd5e1] rounded-xs focus:outline-none"
              >
                <option>All Courses</option>
                <option>B.Tech Computer Science (CSE)</option>
                <option>B.Tech Electronics (ECE)</option>
                <option>M.Tech Data Systems</option>
                <option>BCA</option>
                <option>MCA</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="w-full h-9 px-2.5 bg-surface-container-low font-mono text-xs text-on-surface border border-[#cbd5e1] rounded-xs focus:outline-none"
              >
                <option>All Batches</option>
                <option>Batch 2023-27 (Sem IV)</option>
                <option>Batch 2022-26 (Sem VI)</option>
                <option>Batch 2024-28 (Sem II)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-9 px-2.5 bg-surface-container-low font-mono text-xs text-on-surface border border-[#cbd5e1] rounded-xs focus:outline-none"
              >
                <option value="ALL">All Payment Statuses</option>
                <option value="CLEARED">Fully Paid [Green]</option>
                <option value="PARTIAL">Partial Paid [Amber]</option>
                <option value="OVERDUE">Overdue / Defaulter [Red]</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <select
                value={concessionFilter}
                onChange={(e) => setConcessionFilter(e.target.value)}
                className="w-full h-9 px-2.5 bg-surface-container-low font-mono text-xs text-on-surface border border-[#cbd5e1] rounded-xs focus:outline-none"
              >
                <option value="All Concessions">All Concessions</option>
                <option value="General">General (Full Fee)</option>
                <option value="Merit">Merit 15% Waiver</option>
                <option value="Honor">Dean&apos;s Honor (20%)</option>
                <option value="Sports">Sports Quota</option>
              </select>
            </div>
          </div>

          {/* Row 2: Status Quick Filter Segmented Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#eff4ff]">
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setStatusFilter("ALL")}
                className={`px-3 py-1 font-bold uppercase rounded-xs transition-colors ${
                  statusFilter === "ALL"
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                }`}
              >
                All Students (1,842)
              </button>
              <button
                onClick={() => setStatusFilter("CLEARED")}
                className={`px-3 py-1 font-bold uppercase rounded-xs transition-colors ${
                  statusFilter === "CLEARED"
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                }`}
              >
                Fully Cleared (1,380)
              </button>
              <button
                onClick={() => setStatusFilter("PARTIAL")}
                className={`px-3 py-1 font-bold uppercase rounded-xs transition-colors ${
                  statusFilter === "PARTIAL"
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                }`}
              >
                Partial Balance (380)
              </button>
              <button
                onClick={() => setStatusFilter("OVERDUE")}
                className={`px-3 py-1 font-bold uppercase rounded-xs transition-colors ${
                  statusFilter === "OVERDUE"
                    ? "bg-error text-on-error"
                    : "bg-surface-container-low text-error hover:bg-error-container"
                }`}
              >
                Overdue Defaulters (82)
              </button>
            </div>

            <span className="font-mono text-xs text-secondary">
              Displaying <strong className="text-on-surface">{filteredStudents.length}</strong> of 1,842 Records
            </span>
          </div>
        </div>

        {/* Primary Split Surface: Master Ledger & Real-Time Student Audit Inspector */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Data Grid Canvas (8 cols on XL) */}
          <div className="xl:col-span-8 bg-surface-container-lowest border border-[#cbd5e1] shadow-xs rounded-sm flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-surface-container-low border-b border-[#cbd5e1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs uppercase tracking-wider text-on-surface font-bold">
                  Consolidated Fee Ledger Records
                </span>
              </div>
              <span className="font-mono text-xs text-secondary font-bold">
                INSTITUTIONAL CURRENCY: INR (₹)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant font-bold uppercase tracking-wider text-[11px] border-b border-[#cbd5e1]">
                    <th className="py-2.5 px-3">Student / ID</th>
                    <th className="py-2.5 px-2">Total Fee</th>
                    <th className="py-2.5 px-2">Concession</th>
                    <th className="py-2.5 px-2">Net Payable</th>
                    <th className="py-2.5 px-2">Paid</th>
                    <th className="py-2.5 px-2">Pending</th>
                    <th className="py-2.5 px-2">Status</th>
                    <th className="py-2.5 px-2">Last Date</th>
                    <th className="py-2.5 px-3 text-right">Ledger Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {filteredStudents.map((s) => {
                    const isInspecting = selectedStudent.id === s.id;
                    return (
                      <tr
                        key={s.id}
                        className={`transition-colors cursor-pointer ${
                          isInspecting
                            ? "bg-surface-container-high"
                            : s.status === "Overdue"
                            ? "bg-error-container/20 hover:bg-error-container/30"
                            : "hover:bg-surface-container-low"
                        }`}
                        onClick={() => setSelectedStudent(s)}
                      >
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-7 h-7 flex items-center justify-center font-bold text-xs rounded-xs ${
                                isInspecting
                                  ? "bg-primary text-on-primary"
                                  : s.status === "Overdue"
                                  ? "bg-error text-on-error"
                                  : "bg-surface-container text-on-surface"
                              }`}
                            >
                              {s.avatar}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-sans font-bold text-primary flex items-center gap-1">
                                {s.name}
                                {isInspecting && (
                                  <span className="w-1.5 h-1.5 bg-secondary inline-block rounded-xs" title="Inspector Active"></span>
                                )}
                              </span>
                              <span className="text-[11px] text-secondary">
                                {s.roll} • {s.semester}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-2">₹{s.totalFee.toLocaleString("en-IN")}</td>
                        <td className="py-2.5 px-2 text-secondary">
                          {s.concessionAmount > 0 ? (
                            <span>
                              -₹{s.concessionAmount.toLocaleString("en-IN")}{" "}
                              <span className="text-[10px] text-on-surface-variant">({s.concessionTag})</span>
                            </span>
                          ) : (
                            <span className="text-outline">—</span>
                          )}
                        </td>
                        <td className="py-2.5 px-2 font-bold text-on-surface">
                          ₹{s.netPayable.toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 px-2">₹{s.paidAmount.toLocaleString("en-IN")}</td>
                        <td className="py-2.5 px-2 font-bold text-error">
                          ₹{s.pendingAmount.toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 px-2">
                          <span
                            className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-xs ${
                              s.status === "Cleared"
                                ? "bg-tertiary-fixed text-on-tertiary-fixed font-bold"
                                : s.status === "Partial"
                                ? "bg-secondary-fixed text-on-secondary-fixed-variant font-bold"
                                : "bg-error text-on-error font-bold"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-[11px] text-on-surface-variant">{s.lastDate}</td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStudent(s);
                                setIsLedgerModalOpen(true);
                              }}
                              className="px-2 py-1 bg-surface-container-high hover:bg-surface-variant text-primary font-bold text-[10px] uppercase rounded-xs"
                            >
                              Ledger
                            </button>
                            {s.pendingAmount > 0 ? (
                              <Link
                                href={`/accountant/record-payment?roll=${s.roll}`}
                                onClick={(e) => e.stopPropagation()}
                                className="px-2 py-1 bg-primary text-on-primary hover:bg-primary-container font-bold text-[10px] uppercase rounded-xs"
                              >
                                Pay
                              </Link>
                            ) : (
                              <span className="px-2 py-1 bg-surface-container-low text-outline text-[10px] font-bold uppercase rounded-xs cursor-not-allowed">
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

            {/* Pagination / Technical Footer */}
            <div className="px-4 py-2.5 bg-surface-container-low border-t border-[#cbd5e1] flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs">
              <span className="text-on-surface-variant text-[11px]">
                Showing 1 to {filteredStudents.length} of 1,842 students | Page 1 of 231
              </span>
              <div className="flex items-center gap-1 font-mono">
                <button className="px-2 py-0.5 bg-surface-container-lowest text-outline font-bold rounded-xs cursor-not-allowed">
                  PREV
                </button>
                <button className="px-2.5 py-0.5 bg-primary text-on-primary font-bold rounded-xs">1</button>
                <button className="px-2.5 py-0.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container rounded-xs">
                  2
                </button>
                <button className="px-2.5 py-0.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container rounded-xs">
                  3
                </button>
                <span className="px-1 text-outline">...</span>
                <button className="px-2.5 py-0.5 bg-surface-container-lowest text-on-surface hover:bg-surface-container rounded-xs">
                  231
                </button>
                <button className="px-2 py-0.5 bg-surface-container-lowest text-primary hover:bg-surface-container font-bold rounded-xs">
                  NEXT
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Inspection Drawer: Deep Dive Ledger for Selected Student (4 cols on XL) */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            {/* Active Student Dossier Card */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs relative overflow-hidden rounded-sm flex flex-col gap-3">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>

              {/* Header with Inspection ID */}
              <div className="flex items-start justify-between pb-2 border-b border-[#cbd5e1]">
                <div className="flex gap-2.5">
                  <div className="w-11 h-11 bg-primary text-on-primary flex items-center justify-center font-bold text-sm rounded-xs">
                    {selectedStudent.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-primary leading-tight font-sans">
                      {selectedStudent.name}
                    </span>
                    <span className="font-mono text-xs text-secondary font-bold">
                      {selectedStudent.roll}
                    </span>
                    <span className="font-mono text-on-surface-variant text-[11px]">
                      {selectedStudent.course} • {selectedStudent.semester}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase rounded-xs ${
                    selectedStudent.status === "Cleared"
                      ? "bg-tertiary-fixed text-on-tertiary-fixed"
                      : selectedStudent.status === "Partial"
                      ? "bg-secondary-fixed text-on-secondary-fixed-variant"
                      : "bg-error text-on-error"
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>

              {/* Meta Chips */}
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-2 rounded-xs font-mono text-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-outline font-bold">Academic Advisor</span>
                  <span className="text-on-surface font-semibold text-[11px] truncate">
                    {selectedStudent.advisor}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-outline font-bold">Contact Tel</span>
                  <span className="text-on-surface font-semibold text-[11px]">
                    {selectedStudent.phone}
                  </span>
                </div>
              </div>

              {/* Detailed Fee Component Breakdown Matrix */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                    Term Fee Components
                  </span>
                  <span className="font-mono text-secondary text-[10px] font-bold">AY 2024-25 (TERM II)</span>
                </div>
                <div className="flex flex-col divide-y divide-surface-container font-mono text-xs">
                  <div className="flex items-center justify-between py-1 text-[11px]">
                    <span className="text-on-surface-variant">Tuition &amp; Instruction Base</span>
                    <span className="text-on-surface font-semibold">
                      ₹{selectedStudent.components.tuition.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-[11px]">
                    <span className="text-on-surface-variant">Advanced Compute &amp; Lab Access</span>
                    <span className="text-on-surface font-semibold">
                      ₹{selectedStudent.components.lab.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-[11px]">
                    <span className="text-on-surface-variant">Central Library &amp; Exam Fee</span>
                    <span className="text-on-surface font-semibold">
                      ₹{selectedStudent.components.libraryExam.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-[11px]">
                    <span className="text-on-surface-variant">Campus Amenities &amp; Union</span>
                    <span className="text-on-surface font-semibold">
                      ₹{selectedStudent.components.amenities.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 bg-surface-container-low px-2 rounded-xs font-bold text-primary">
                    <span>Gross Academic Assessment</span>
                    <span>₹{selectedStudent.totalFee.toLocaleString("en-IN")}</span>
                  </div>
                  {selectedStudent.concessionAmount > 0 && (
                    <div className="flex items-center justify-between py-1.5 px-2 bg-surface-container rounded-xs">
                      <div className="flex flex-col">
                        <span className="text-secondary font-bold text-[11px]">Institutional Concession</span>
                        <span className="text-[9px] text-on-surface-variant">{selectedStudent.concessionTag}</span>
                      </div>
                      <span className="text-secondary font-bold">
                        -₹{selectedStudent.concessionAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 px-2 bg-surface-container-high font-bold text-primary rounded-xs">
                    <span className="text-xs uppercase tracking-wider">Net Payable Obligation</span>
                    <span className="text-base font-mono">
                      ₹{selectedStudent.netPayable.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tranche / Installment Timeline & Audit Record */}
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
                    Installment Tranche Schedule
                  </span>
                  <span className="font-mono text-secondary text-[10px] font-bold">
                    {selectedStudent.tranches.length} Planned
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-xs">
                  {selectedStudent.tranches.map((tranche, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-xs flex items-center justify-between border ${
                        tranche.status === "Paid"
                          ? "bg-surface-container-low border-[#cbd5e1]"
                          : "bg-error-container/30 border-error/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tranche.status === "Paid" ? (
                          <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                        ) : (
                          <Clock className="h-4 w-4 text-error" />
                        )}
                        <div className="flex flex-col">
                          <span
                            className={`font-bold text-[11px] ${
                              tranche.status === "Paid" ? "text-on-surface" : "text-error"
                            }`}
                          >
                            {tranche.title}: ₹{tranche.amount.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-secondary">
                            {tranche.status === "Paid"
                              ? `Txn #${tranche.txnId} • Paid via ${tranche.mode}`
                              : `DUE DATE: ${tranche.date}`}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-xs ${
                          tranche.status === "Paid"
                            ? "bg-[#ecfdf5] text-[#047857]"
                            : "bg-error text-on-error"
                        }`}
                      >
                        {tranche.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button Cluster */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#cbd5e1]">
                {selectedStudent.pendingAmount > 0 ? (
                  <Link
                    href={`/accountant/record-payment?roll=${selectedStudent.roll}`}
                    className="w-full py-2 bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-container shadow-xs transition-colors rounded-xs"
                  >
                    <CreditCard className="h-4 w-4 text-secondary-container" />
                    <span>Receive Pending (₹{selectedStudent.pendingAmount.toLocaleString("en-IN")})</span>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-2 bg-surface-container text-on-surface-variant font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs cursor-not-allowed opacity-75"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#047857]" />
                    <span>Fee Fully Cleared (No Dues)</span>
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsLedgerModalOpen(true)}
                    className="w-full py-1.5 bg-surface-container text-on-surface hover:bg-surface-container-high font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 rounded-xs border border-[#cbd5e1] cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Full Ledger PDF</span>
                  </button>
                  <button
                    onClick={() => handleSendReminder(selectedStudent)}
                    className="w-full py-1.5 bg-surface-container text-on-surface hover:bg-surface-container-high font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 rounded-xs border border-[#cbd5e1] cursor-pointer"
                  >
                    <Mail className="h-3.5 w-3.5 text-secondary" />
                    <span>Send Reminder</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Counter Audit Node Card */}
            <div className="bg-surface-container-lowest p-4 border border-[#cbd5e1] shadow-xs rounded-sm flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-secondary inline-block rounded-xs animate-pulse"></span>
                  <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    Counter Audit #02 Node
                  </span>
                </div>
                <span className="font-mono text-secondary text-[10px] font-bold">ACTIVE OPERATOR</span>
              </div>
              <div className="font-mono text-[11px] text-on-surface-variant leading-relaxed">
                Logged Operator: <strong className="text-on-surface">Rajesh Kumar (Bursar)</strong>
                <br />
                Session Collected Today: <strong className="text-primary font-bold">₹3,85,000 (24 Receipts)</strong>
                <br />
                Next Scheduled Vault Handover: <span className="text-secondary font-bold">17:00 IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Full Ledger Statement Preview Modal */}
      {isLedgerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-xl w-full border-2 border-primary shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-[#cbd5e1] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 bg-primary text-secondary-container font-bold flex items-center justify-center rounded-xs">
                  <Table className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase text-primary">Student Ledger Statement</h3>
                  <span className="font-mono text-xs text-secondary font-bold">
                    {selectedStudent.name} • {selectedStudent.roll}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsLedgerModalOpen(false)}
                className="text-outline hover:text-primary p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 bg-surface-container-low border border-[#cbd5e1] rounded-xs font-mono text-xs space-y-3">
              <div className="text-center border-b border-[#cbd5e1] pb-2">
                <span className="font-headline text-sm font-bold text-primary uppercase block">
                  Apex Institute of Technology
                </span>
                <span className="text-[10px] text-on-surface-variant block">
                  Official Bursar Ledger Statement • Academic Year 2024-25
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-outline block text-[9px] uppercase">Candidate:</span>
                  <span className="font-bold text-primary">{selectedStudent.name}</span>
                </div>
                <div>
                  <span className="text-outline block text-[9px] uppercase">Roll / Enrolment:</span>
                  <span className="font-bold text-secondary">{selectedStudent.roll}</span>
                </div>
                <div>
                  <span className="text-outline block text-[9px] uppercase">Programme:</span>
                  <span>{selectedStudent.course}</span>
                </div>
                <div>
                  <span className="text-outline block text-[9px] uppercase">Current Standing:</span>
                  <span className="font-bold text-primary">{selectedStudent.status}</span>
                </div>
              </div>

              <div className="border border-[#cbd5e1] p-3 bg-surface-container-lowest rounded-xs space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span>Gross Tuition &amp; Lab Levy:</span>
                  <span className="font-bold">₹{selectedStudent.totalFee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Concessions Applied:</span>
                  <span className="font-bold">-₹{selectedStudent.concessionAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-t border-[#cbd5e1] pt-1 font-bold">
                  <span>Net Assessed Demand:</span>
                  <span>₹{selectedStudent.netPayable.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#047857]">
                  <span>Total Amount Realized:</span>
                  <span className="font-bold">₹{selectedStudent.paidAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-t border-[#cbd5e1] pt-1 text-error font-bold">
                  <span>Outstanding Dues Balance:</span>
                  <span>₹{selectedStudent.pendingAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#cbd5e1]">
              <button
                onClick={() => setIsLedgerModalOpen(false)}
                className="px-4 py-2 border border-[#cbd5e1] text-xs font-mono font-bold uppercase hover:bg-surface-container"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast("Cryptographically signed Student Ledger Statement PDF downloaded!");
                  setIsLedgerModalOpen(false);
                }}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-primary-container"
              >
                <Download className="h-4 w-4" />
                <span>Download Official Statement PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
