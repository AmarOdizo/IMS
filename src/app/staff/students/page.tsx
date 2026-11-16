"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Download,
  Printer,
  ChevronRight,
  ShieldCheck,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  X,
  MessageSquare,
  Award,
  BookOpen,
  Send,
  ExternalLink,
  Flame,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle,
  Check,
  UserCheck,
  UserX,
  Layers,
  MapPin,
  CalendarDays
} from "lucide-react";

interface StudentDossier {
  id: string;
  roll: string;
  name: string;
  batch: string;
  batchCode: string;
  course: string;
  attendancePct: number;
  attendanceTag: "Safe" | "At Risk";
  icaScore: string;
  icaNum: number;
  riskAssessment: "Normal" | "Distinction" | "Shortage Warning";
  status: "Active" | "Medical Leave";
  cgpa: string;
  email: string;
  phone: string;
  guardian: string;
  guardianPhone: string;
  residence: string;
  avatarUrl: string;
}

const studentsMasterList: StudentDossier[] = [
  // B.Tech CS-IV-A (CS-401)
  {
    id: "stu-1",
    roll: "SIT-2023-CS-042",
    name: "Rahul Sharma",
    batch: "B.Tech CS-IV-A",
    batchCode: "CS-401",
    course: "Computer Science & Engineering",
    attendancePct: 88.4,
    attendanceTag: "Safe",
    icaScore: "38/40",
    icaNum: 38,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.82",
    email: "rahul.sharma@sunrise.edu",
    phone: "+91 98111 22334",
    guardian: "Rajesh Sharma",
    guardianPhone: "+91 98111 22335",
    residence: "Hostel C, Room 314",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-2",
    roll: "SIT-2023-CS-015",
    name: "Priya Patel",
    batch: "B.Tech CS-IV-A",
    batchCode: "CS-401",
    course: "Computer Science & Engineering",
    attendancePct: 94.2,
    attendanceTag: "Safe",
    icaScore: "39/40",
    icaNum: 39,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.91",
    email: "priya.patel@sunrise.edu",
    phone: "+91 98222 33445",
    guardian: "Vikram Patel",
    guardianPhone: "+91 98222 33446",
    residence: "Sarojini Naidu Girls Hostel, Room 102",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-3",
    roll: "SIT-2023-CS-078",
    name: "Rohan Verma",
    batch: "B.Tech CS-IV-A",
    batchCode: "CS-401",
    course: "Computer Science & Engineering",
    attendancePct: 71.5,
    attendanceTag: "At Risk",
    icaScore: "24/40",
    icaNum: 24,
    riskAssessment: "Shortage Warning",
    status: "Active",
    cgpa: "2.64",
    email: "rohan.verma@sunrise.edu",
    phone: "+91 97333 44556",
    guardian: "Suresh Verma",
    guardianPhone: "+91 97333 44557",
    residence: "Day Scholar (Gurugram Sec 14)",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-4",
    roll: "SIT-2023-CS-089",
    name: "Sneha Rao",
    batch: "B.Tech CS-IV-A",
    batchCode: "CS-401",
    course: "Computer Science & Engineering",
    attendancePct: 96.0,
    attendanceTag: "Safe",
    icaScore: "40/40",
    icaNum: 40,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.95",
    email: "sneha.rao@sunrise.edu",
    phone: "+91 96444 55667",
    guardian: "Venkat Rao",
    guardianPhone: "+91 96444 55668",
    residence: "Sarojini Naidu Girls Hostel, Room 215",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-5",
    roll: "SIT-2023-CS-001",
    name: "Aarav Sharma",
    batch: "B.Tech CS-IV-A",
    batchCode: "CS-401",
    course: "Computer Science & Engineering",
    attendancePct: 92.5,
    attendanceTag: "Safe",
    icaScore: "37/40",
    icaNum: 37,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.86",
    email: "aarav.s@sunrise.edu",
    phone: "+91 98333 11223",
    guardian: "Manish Sharma",
    guardianPhone: "+91 98333 11224",
    residence: "Hostel A, Room 108",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-6",
    roll: "SIT-2023-CS-028",
    name: "Ananya Iyer",
    batch: "B.Tech CS-IV-A",
    batchCode: "CS-401",
    course: "Computer Science & Engineering",
    attendancePct: 89.0,
    attendanceTag: "Safe",
    icaScore: "36/40",
    icaNum: 36,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.74",
    email: "ananya.i@sunrise.edu",
    phone: "+91 98444 22334",
    guardian: "R. Iyer",
    guardianPhone: "+91 98444 22335",
    residence: "Girls Hostel B, Room 304",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },

  // B.Tech CS-IV-B (CS-405L)
  {
    id: "stu-7",
    roll: "SIT-2023-CS-104",
    name: "Vikram Malhotra",
    batch: "B.Tech CS-IV-B",
    batchCode: "CS-405L",
    course: "Computer Science & Engineering",
    attendancePct: 68.2,
    attendanceTag: "At Risk",
    icaScore: "22/40",
    icaNum: 22,
    riskAssessment: "Shortage Warning",
    status: "Active",
    cgpa: "2.45",
    email: "vikram.m@sunrise.edu",
    phone: "+91 95555 66778",
    guardian: "Anil Malhotra",
    guardianPhone: "+91 95555 66779",
    residence: "Hostel A, Room 402",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-8",
    roll: "SIT-2023-CS-082",
    name: "Kunal Singhania",
    batch: "B.Tech CS-IV-B",
    batchCode: "CS-405L",
    course: "Computer Science & Engineering",
    attendancePct: 93.0,
    attendanceTag: "Safe",
    icaScore: "38/40",
    icaNum: 38,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.80",
    email: "kunal.s@sunrise.edu",
    phone: "+91 95666 77889",
    guardian: "Rajeev Singhania",
    guardianPhone: "+91 95666 77890",
    residence: "Day Scholar (Noida Sec 62)",
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-9",
    roll: "SIT-2023-CS-095",
    name: "Meera Nair",
    batch: "B.Tech CS-IV-B",
    batchCode: "CS-405L",
    course: "Computer Science & Engineering",
    attendancePct: 89.2,
    attendanceTag: "Safe",
    icaScore: "35/40",
    icaNum: 35,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.65",
    email: "meera.n@sunrise.edu",
    phone: "+91 95777 88990",
    guardian: "G. Nair",
    guardianPhone: "+91 95777 88991",
    residence: "Girls Hostel A, Room 204",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-10",
    roll: "SIT-2023-CS-103",
    name: "Tanmay Deshmukh",
    batch: "B.Tech CS-IV-B",
    batchCode: "CS-405L",
    course: "Computer Science & Engineering",
    attendancePct: 72.5,
    attendanceTag: "At Risk",
    icaScore: "26/40",
    icaNum: 26,
    riskAssessment: "Shortage Warning",
    status: "Active",
    cgpa: "2.78",
    email: "tanmay.d@sunrise.edu",
    phone: "+91 95888 99001",
    guardian: "S. Deshmukh",
    guardianPhone: "+91 95888 99002",
    residence: "Hostel C, Room 218",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-11",
    roll: "SIT-2023-CS-112",
    name: "Pooja Hegde",
    batch: "B.Tech CS-IV-B",
    batchCode: "CS-405L",
    course: "Computer Science & Engineering",
    attendancePct: 95.0,
    attendanceTag: "Safe",
    icaScore: "39/40",
    icaNum: 39,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.89",
    email: "pooja.h@sunrise.edu",
    phone: "+91 95999 00112",
    guardian: "P. Hegde",
    guardianPhone: "+91 95999 00113",
    residence: "Girls Hostel B, Room 112",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80"
  },

  // M.Tech DS-II (CS-602)
  {
    id: "stu-12",
    roll: "SIT-2024-DS-004",
    name: "Gaurav Sen",
    batch: "M.Tech DS-II",
    batchCode: "CS-602",
    course: "Data Systems & Analytics",
    attendancePct: 98.0,
    attendanceTag: "Safe",
    icaScore: "40/40",
    icaNum: 40,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.96",
    email: "gaurav.sen@sunrise.edu",
    phone: "+91 94111 22334",
    guardian: "A. Sen",
    guardianPhone: "+91 94111 22335",
    residence: "PG Scholar Tower 1, Apt 2A",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-13",
    roll: "SIT-2024-DS-011",
    name: "Ritika Chawla",
    batch: "M.Tech DS-II",
    batchCode: "CS-602",
    course: "Data Systems & Analytics",
    attendancePct: 96.0,
    attendanceTag: "Safe",
    icaScore: "38/40",
    icaNum: 38,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.90",
    email: "ritika.c@sunrise.edu",
    phone: "+91 94222 33445",
    guardian: "M. Chawla",
    guardianPhone: "+91 94222 33446",
    residence: "PG Scholar Tower 2, Apt 5B",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-14",
    roll: "SIT-2024-DS-012",
    name: "Kavita Krishnamurthy",
    batch: "M.Tech DS-II",
    batchCode: "CS-602",
    course: "Data Systems & Analytics",
    attendancePct: 95.5,
    attendanceTag: "Safe",
    icaScore: "37/40",
    icaNum: 37,
    riskAssessment: "Distinction",
    status: "Active",
    cgpa: "3.88",
    email: "kavita.k@sunrise.edu",
    phone: "+91 94666 77889",
    guardian: "S. Krishnamurthy",
    guardianPhone: "+91 94666 77890",
    residence: "PG Scholar Tower 1, Apt 4B",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-15",
    roll: "SIT-2024-DS-019",
    name: "Aditya Bhatt",
    batch: "M.Tech DS-II",
    batchCode: "CS-602",
    course: "Data Systems & Analytics",
    attendancePct: 92.5,
    attendanceTag: "Safe",
    icaScore: "36/40",
    icaNum: 36,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.72",
    email: "aditya.b@sunrise.edu",
    phone: "+91 94333 44556",
    guardian: "K. Bhatt",
    guardianPhone: "+91 94333 44557",
    residence: "Day Scholar (South Delhi)",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
  },

  // BCA-II-B (CS-202)
  {
    id: "stu-16",
    roll: "SIT-2024-BCA-008",
    name: "Aman Deep Singh",
    batch: "BCA-II-B",
    batchCode: "CS-202",
    course: "Bachelor of Computer Applications",
    attendancePct: 84.6,
    attendanceTag: "Safe",
    icaScore: "31/40",
    icaNum: 31,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.20",
    email: "amandeep.s@sunrise.edu",
    phone: "+91 93777 88990",
    guardian: "Gurdeep Singh",
    guardianPhone: "+91 93777 88991",
    residence: "Day Scholar (South Delhi)",
    avatarUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-17",
    roll: "SIT-2024-BCA-005",
    name: "Kavya Menon",
    batch: "BCA-II-B",
    batchCode: "CS-202",
    course: "Bachelor of Computer Applications",
    attendancePct: 88.0,
    attendanceTag: "Safe",
    icaScore: "34/40",
    icaNum: 34,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.52",
    email: "kavya.m@sunrise.edu",
    phone: "+91 93111 22334",
    guardian: "P. Menon",
    guardianPhone: "+91 93111 22335",
    residence: "Girls Hostel A, Room 115",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-18",
    roll: "SIT-2024-BCA-012",
    name: "Nikhil Gupta",
    batch: "BCA-II-B",
    batchCode: "CS-202",
    course: "Bachelor of Computer Applications",
    attendancePct: 85.5,
    attendanceTag: "Safe",
    icaScore: "32/40",
    icaNum: 32,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.38",
    email: "nikhil.g@sunrise.edu",
    phone: "+91 93222 33445",
    guardian: "R. Gupta",
    guardianPhone: "+91 93222 33446",
    residence: "Day Scholar (Faridabad)",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-19",
    roll: "SIT-2024-BCA-027",
    name: "Varun Chopra",
    batch: "BCA-II-B",
    batchCode: "CS-202",
    course: "Bachelor of Computer Applications",
    attendancePct: 69.5,
    attendanceTag: "At Risk",
    icaScore: "23/40",
    icaNum: 23,
    riskAssessment: "Shortage Warning",
    status: "Active",
    cgpa: "2.50",
    email: "varun.c@sunrise.edu",
    phone: "+91 93333 44556",
    guardian: "K. Chopra",
    guardianPhone: "+91 93333 44557",
    residence: "Hostel B, Room 202",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "stu-20",
    roll: "SIT-2024-BCA-033",
    name: "Zaid Khan",
    batch: "BCA-II-B",
    batchCode: "CS-202",
    course: "Bachelor of Computer Applications",
    attendancePct: 89.0,
    attendanceTag: "Safe",
    icaScore: "33/40",
    icaNum: 33,
    riskAssessment: "Normal",
    status: "Active",
    cgpa: "3.45",
    email: "zaid.k@sunrise.edu",
    phone: "+91 93444 55667",
    guardian: "A. Khan",
    guardianPhone: "+91 93444 55668",
    residence: "Hostel B, Room 308",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  }
];

export default function StaffStudentsPage() {
  const [students] = useState<StudentDossier[]>(studentsMasterList);
  const [selectedStudent, setSelectedStudent] = useState<StudentDossier>(studentsMasterList[0]);
  const [activeBatchTab, setActiveBatchTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [attFilter, setAttFilter] = useState("all");
  const [standingFilter, setStandingFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "roll" | "attendance" | "cgpa">("roll");
  
  // Modals & State
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState(false);
  const [isMentorshipModalOpen, setIsMentorshipModalOpen] = useState(false);
  const [advisoryCategory, setAdvisoryCategory] = useState("Attendance Shortage Warning & Makeup Plan");
  const [advisoryNote, setAdvisoryNote] = useState("");
  const [mentorshipDate, setMentorshipDate] = useState("2025-05-22");
  const [mentorshipTime, setMentorshipTime] = useState("14:30");
  const [mentorshipMode, setMentorshipMode] = useState("Cabin B-204 (Faculty Office)");
  const [mentorshipTopic, setMentorshipTopic] = useState("Unit 4 Query Optimization Review & Makeup Test");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync batch from URL query parameter (?batch=CS401, etc.)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const bParam = params.get("batch");
      if (bParam) {
        const bp = bParam.toUpperCase();
        if (bp.includes("401")) setActiveBatchTab("B.Tech CS-IV-A");
        else if (bp.includes("405")) setActiveBatchTab("B.Tech CS-IV-B");
        else if (bp.includes("602")) setActiveBatchTab("M.Tech DS-II");
        else if (bp.includes("202")) setActiveBatchTab("BCA-II-B");
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendAdvisory = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdvisoryModalOpen(false);
    setAdvisoryNote("");
    showToast(`Advisory dispatched to ${selectedStudent.name} (${selectedStudent.roll}) via official SSO!`);
  };

  const handleScheduleMentorship = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMentorshipModalOpen(false);
    showToast(`1:1 Mentorship scheduled with ${selectedStudent.name} on ${mentorshipDate} at ${mentorshipTime}!`);
  };

  const filteredStudents = useMemo(() => {
    let result = students.filter((s) => {
      const matchesBatch = activeBatchTab === "All" || s.batch === activeBatchTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.roll.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.batchCode.toLowerCase().includes(q);

      const matchesAtt =
        attFilter === "all" ||
        (attFilter === "safe" && s.attendancePct >= 75) ||
        (attFilter === "risk" && s.attendancePct < 75);

      const matchesStanding =
        standingFilter === "all" ||
        (standingFilter === "distinction" && s.riskAssessment === "Distinction") ||
        (standingFilter === "normal" && s.riskAssessment === "Normal") ||
        (standingFilter === "support" && s.riskAssessment === "Shortage Warning");

      return matchesBatch && matchesSearch && matchesAtt && matchesStanding;
    });

    return result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "roll") return a.roll.localeCompare(b.roll);
      if (sortBy === "attendance") return b.attendancePct - a.attendancePct;
      if (sortBy === "cgpa") return parseFloat(b.cgpa) - parseFloat(a.cgpa);
      return 0;
    });
  }, [students, activeBatchTab, searchQuery, attFilter, standingFilter, sortBy]);

  // Telemetry counts
  const totalRosterCount = 184;
  const distinctionCount = 42;
  const atRiskCount = 12;
  const avgAttendance = 90.2;

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#355C7D] text-xs font-semibold rounded-full border border-blue-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355C7D]"></span>
                Prof. Rajesh Sharma &bull; EMP-CS-2018-842
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Faculty Mentorship Scope &bull; Even Semester 2024–25
              </span>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#3D405B] tracking-tight">
                Assigned Students Directory &amp; Dossiers
              </h1>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={() => showToast("Exporting roster register (CSV)...")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              <Download className="h-4 w-4 text-slate-600" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Print Roster</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Enrolled Learners
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">{totalRosterCount}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Across All 4 Assigned Batches</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Active Roster Size</span>
            <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
              <Check className="h-3 w-3" /> 100% Verified
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Attendance
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">{avgAttendance}%</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Biometric Gate + RFID Logs</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Benchmark: 75.0%</span>
            <span className="text-emerald-600 font-semibold text-[11px]">Healthy Overall</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Dean&apos;s Honor Roll
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-[#3D405B]">{distinctionCount}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">ICA &gt; 36/40 &amp; CGPA &gt; 3.75</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">22.8% of Total Cohort</span>
            <span className="bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded-full text-[11px]">
              Distinction
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Shortage Warning (&lt;75%)
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-rose-600">{atRiskCount}</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">Require Mentorship &amp; Makeup Plan</p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Intervention Mandate</span>
            <span className="bg-rose-50 text-rose-700 font-semibold px-2 py-0.5 rounded-full text-[11px]">
              Action Required
            </span>
          </div>
        </div>
      </div>

      {/* Segmented Batch Navigation Strip */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {[
            { label: "All My Batches", val: "All", count: 184 },
            { label: "B.Tech CS-IV-A", val: "B.Tech CS-IV-A", code: "CS-401", count: 62 },
            { label: "B.Tech CS-IV-B", val: "B.Tech CS-IV-B", code: "CS-405L", count: 60 },
            { label: "M.Tech DS-II", val: "M.Tech DS-II", code: "CS-602", count: 28 },
            { label: "BCA-II-B", val: "BCA-II-B", code: "CS-202", count: 34 }
          ].map((tab) => (
            <button
              key={tab.val}
              onClick={() => setActiveBatchTab(tab.val)}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
                activeBatchTab === tab.val
                  ? "bg-[#355C7D] text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 text-[11px] rounded-full font-bold ${
                  activeBatchTab === tab.val
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-2 text-xs">
          <span className="text-slate-400 font-medium">Selected Filter:</span>
          <span className="font-bold text-[#355C7D] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/70">
            {activeBatchTab === "All" ? "All 4 Teaching Batches" : activeBatchTab}
          </span>
        </div>
      </div>

      {/* Filter & Omni-Search Strip */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
        <div className="flex-1 flex flex-col md:flex-row items-stretch md:items-center gap-2.5 text-xs">
          {/* Search Field */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, roll number, or institutional email..."
              className="w-full pl-10 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 focus:border-[#355C7D] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter: Attendance */}
          <div className="flex items-center bg-slate-50 px-3 py-2 border border-slate-200 rounded-xl">
            <span className="text-slate-500 uppercase mr-2 text-[10px] font-bold tracking-wider">
              Attendance:
            </span>
            <select
              value={attFilter}
              onChange={(e) => setAttFilter(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold outline-none cursor-pointer text-xs"
            >
              <option value="all">All Records</option>
              <option value="safe">Above 75% (Safe)</option>
              <option value="risk">Below 75% (At Risk)</option>
            </select>
          </div>

          {/* Filter: Standing */}
          <div className="flex items-center bg-slate-50 px-3 py-2 border border-slate-200 rounded-xl">
            <span className="text-slate-500 uppercase mr-2 text-[10px] font-bold tracking-wider">
              Standing:
            </span>
            <select
              value={standingFilter}
              onChange={(e) => setStandingFilter(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold outline-none cursor-pointer text-xs"
            >
              <option value="all">All Bands</option>
              <option value="distinction">Distinction (&gt;85%)</option>
              <option value="normal">Normal Performance</option>
              <option value="support">Shortage Warning (&lt;75%)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center bg-slate-50 px-3 py-2 border border-slate-200 rounded-xl">
            <span className="text-slate-500 uppercase mr-2 text-[10px] font-bold tracking-wider">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-800 font-semibold outline-none cursor-pointer text-xs"
            >
              <option value="roll">Roll Number</option>
              <option value="name">Student Name</option>
              <option value="attendance">Attendance (High-Low)</option>
              <option value="cgpa">CGPA (High-Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Workspace: Table (8 Cols) + Student Dossier Drawer (4 Cols) */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Table Container (8 Cols) */}
        <div className="col-span-12 xl:col-span-8 flex flex-col gap-3">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {/* Table Subheader */}
            <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="text-slate-500 font-medium">
                  Showing: <strong className="text-slate-800">{filteredStudents.length} Students</strong> in {activeBatchTab}
                </span>
                <span className="text-slate-500 font-medium hidden sm:inline-block">
                  Class Mentor: <strong className="text-[#355C7D]">Prof. Rajesh Sharma</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-rose-600 font-semibold text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  {filteredStudents.filter((s) => s.attendancePct < 75).length} At Risk
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {filteredStudents.filter((s) => s.attendancePct >= 75).length} Cleared
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50/90 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-5">Student Identifier</th>
                    <th className="py-3.5 px-4">Batch &amp; Course</th>
                    <th className="py-3.5 px-4">Biometric Att. %</th>
                    <th className="py-3.5 px-4">ICA Score</th>
                    <th className="py-3.5 px-4">Standing Tag</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-5 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredStudents.map((stu) => {
                    const isSelected = selectedStudent.id === stu.id;
                    return (
                      <tr
                        key={stu.id}
                        onClick={() => setSelectedStudent(stu)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50/60 border-l-4 border-l-[#355C7D]"
                            : "hover:bg-slate-50/80"
                        } ${stu.attendanceTag === "At Risk" ? "bg-rose-50/20" : ""}`}
                      >
                        {/* Student Name & Avatar */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <img
                              alt={stu.name}
                              src={stu.avatarUrl}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-sm text-[#3D405B] truncate">
                                {stu.name}
                              </span>
                              <span className="font-mono text-[11px] text-slate-400">
                                {stu.roll}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Batch & Program */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-bold text-xs text-slate-800">{stu.batch}</span>
                            <span className="text-[11px] text-slate-400">{stu.course}</span>
                          </div>
                        </td>

                        {/* Attendance */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-mono font-bold text-xs ${
                                stu.attendancePct >= 85
                                  ? "text-emerald-600"
                                  : stu.attendancePct >= 75
                                  ? "text-blue-600"
                                  : "text-rose-600"
                              }`}
                            >
                              {stu.attendancePct}%
                            </span>
                            <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-1.5 rounded-full ${
                                  stu.attendancePct >= 75 ? "bg-emerald-500" : "bg-rose-500"
                                }`}
                                style={{ width: `${stu.attendancePct}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* ICA Score */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono font-bold text-slate-800">
                          {stu.icaScore}
                        </td>

                        {/* Standing Tag */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${
                              stu.riskAssessment === "Distinction"
                                ? "bg-purple-50 text-purple-700 border border-purple-200/70"
                                : stu.riskAssessment === "Shortage Warning"
                                ? "bg-rose-50 text-rose-700 border border-rose-200/70"
                                : "bg-blue-50 text-blue-700 border border-blue-200/70"
                            }`}
                          >
                            {stu.riskAssessment}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" /> {stu.status}
                          </span>
                        </td>

                        {/* Inspect */}
                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudent(stu);
                            }}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-[#355C7D] text-white shadow-xs"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                            }`}
                          >
                            Dossier &rarr;
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="p-12 text-center space-y-2">
                <p className="text-sm font-bold text-slate-700">No students match current filter criteria</p>
                <p className="text-xs text-slate-400">Clear search input or change attendance / standing filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Student Dossier Inspector (4 Cols) */}
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-4 sticky top-6">
          <div className="bg-white border border-slate-200/90 shadow-sm p-6 rounded-2xl flex flex-col gap-5">
            {/* Dossier Card Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#355C7D] flex items-center justify-center">
                  <Award className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#3D405B]">
                  Candidate Dossier
                </h3>
              </div>
              <span className="font-mono text-xs text-[#355C7D] font-bold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60">
                {selectedStudent.batch}
              </span>
            </div>

            {/* Student Persona Header */}
            <div className="flex items-center gap-4">
              <img
                alt={selectedStudent.name}
                src={selectedStudent.avatarUrl}
                className="w-18 h-18 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
              />
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#3D405B] leading-tight">
                  {selectedStudent.name}
                </h4>
                <div className="font-mono text-xs font-semibold text-[#355C7D]">
                  {selectedStudent.roll}
                </div>
                <div className="text-xs text-slate-500">
                  {selectedStudent.course}
                </div>
              </div>
            </div>

            {/* Academic Metrics Ribbon */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
                  CGPA
                </span>
                <span className="text-lg font-bold text-[#3D405B]">{selectedStudent.cgpa}</span>
                <span className="text-[10px] text-slate-400 block font-medium">Scale 4.0</span>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
                  Attendance
                </span>
                <span
                  className={`text-lg font-bold ${
                    selectedStudent.attendancePct >= 75 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {selectedStudent.attendancePct}%
                </span>
                <span className="text-[10px] text-slate-400 block font-medium">Biometric</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
                  ICA Score
                </span>
                <span className="text-lg font-bold text-[#3D405B]">{selectedStudent.icaScore}</span>
                <span className="text-[10px] text-slate-400 block font-medium">Internal</span>
              </div>
            </div>

            {/* Contact Particulars */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50/70 border border-slate-200/70 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="text-slate-600 font-medium">SSO Email</span>
                </div>
                <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                  {selectedStudent.email}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50/70 border border-slate-200/70 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="h-3.5 w-3.5" />
                  <span className="text-slate-600 font-medium">Phone</span>
                </div>
                <span className="font-semibold text-slate-800 font-mono">
                  {selectedStudent.phone}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50/70 border border-slate-200/70 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-slate-600 font-medium">Guardian</span>
                </div>
                <span className="font-semibold text-slate-800 text-right">
                  {selectedStudent.guardian} ({selectedStudent.guardianPhone})
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-slate-50/70 border border-slate-200/70 rounded-xl">
                <div className="flex items-center gap-2 text-slate-400">
                  <Building className="h-3.5 w-3.5" />
                  <span className="text-slate-600 font-medium">Residence</span>
                </div>
                <span className="font-semibold text-slate-800 truncate max-w-[170px] text-right">
                  {selectedStudent.residence}
                </span>
              </div>
            </div>

            {/* Advisory & Mentorship Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => setIsAdvisoryModalOpen(true)}
                className="w-full py-2.5 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Send Academic Advisory Note</span>
              </button>
              <button
                onClick={() => setIsMentorshipModalOpen(true)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="h-4 w-4 text-slate-600" />
                <span>Schedule 1:1 Mentorship Session</span>
              </button>
              <Link
                href={`/staff/attendance?batch=${selectedStudent.batchCode}`}
                className="w-full py-2 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-1.5 text-center"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Open {selectedStudent.batch} Attendance Sheet</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Modal */}
      {isAdvisoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#3D405B]">
                  Dispatch Academic Advisory
                </h3>
                <p className="text-xs text-slate-500">
                  Transmits formal faculty note logged in candidate mentorship file.
                </p>
              </div>
              <button
                onClick={() => setIsAdvisoryModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSendAdvisory} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block tracking-wider">
                  Recipient Candidate
                </span>
                <div className="font-bold text-sm text-[#3D405B]">
                  {selectedStudent.name} ({selectedStudent.roll})
                </div>
                <div className="text-slate-500">
                  {selectedStudent.batch} &bull; Biometric Attendance: {selectedStudent.attendancePct}%
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Advisory Subject / Category
                </label>
                <select
                  value={advisoryCategory}
                  onChange={(e) => setAdvisoryCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
                >
                  <option>Attendance Shortage Warning &amp; Makeup Plan</option>
                  <option>Continuous Assessment (ICA) Performance Counseling</option>
                  <option>Dean&apos;s Honor Roll Commendation</option>
                  <option>Capstone Project Progress Check</option>
                  <option>General Academic Guidance &amp; Office Visit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Faculty Directive / Recommendation Body *
                </label>
                <textarea
                  required
                  rows={4}
                  value={advisoryNote}
                  onChange={(e) => setAdvisoryNote(e.target.value)}
                  placeholder="Specify makeup tasks, remedial tutorial dates, or required meeting at Cabin B-204..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 transition-all resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAdvisoryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Transmit Advisory</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1:1 Mentorship Scheduling Modal */}
      {isMentorshipModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-7 border border-slate-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#3D405B]">
                  Schedule 1:1 Mentorship Session
                </h3>
                <p className="text-xs text-slate-500">
                  Book an academic review consultation slot for {selectedStudent.name}.
                </p>
              </div>
              <button
                onClick={() => setIsMentorshipModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleScheduleMentorship} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Session Date
                  </label>
                  <input
                    type="date"
                    value={mentorshipDate}
                    onChange={(e) => setMentorshipDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Office Hour Slot
                  </label>
                  <select
                    value={mentorshipTime}
                    onChange={(e) => setMentorshipTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
                  >
                    <option value="14:00">02:00 PM - 02:30 PM</option>
                    <option value="14:30">02:30 PM - 03:00 PM</option>
                    <option value="15:00">03:00 PM - 03:30 PM</option>
                    <option value="16:30">04:30 PM - 05:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Meeting Venue / Mode
                </label>
                <select
                  value={mentorshipMode}
                  onChange={(e) => setMentorshipMode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20 cursor-pointer"
                >
                  <option value="Cabin B-204 (Faculty Office)">In-Person &bull; Faculty Cabin B-204 (CSE Dept)</option>
                  <option value="Google Meet Video Call">Virtual &bull; Google Meet Video Conference</option>
                  <option value="Turing Computing Lab 3">Laboratory &bull; Turing Computing Lab 3</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Consultation Agenda / Topic
                </label>
                <input
                  type="text"
                  value={mentorshipTopic}
                  onChange={(e) => setMentorshipTopic(e.target.value)}
                  placeholder="e.g. Unit 4 Query Optimization Review & Makeup Test"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#355C7D]/20"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsMentorshipModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#355C7D] hover:bg-[#2b4c68] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>Confirm Slot</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
