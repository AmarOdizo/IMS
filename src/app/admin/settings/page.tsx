"use client";

import { useState } from "react";
import {
  Settings,
  Shield,
  Key,
  Database,
  Radio,
  Server,
  Building,
  CheckCircle2,
  Clock,
  Save,
  Lock,
  RotateCcw,
  AlertTriangle,
  History,
  Cloud,
  ChevronRight,
  Sliders,
  Users,
  Check,
  X,
  Smartphone,
  CreditCard,
  Fingerprint,
  HardDrive,
  FileText,
  Eye,
  Edit,
  ExternalLink,
  Plus,
  RefreshCw,
  Award,
  Download,
  Wifi,
  UploadCloud,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";

interface CampusNode {
  id: string;
  campusId: string;
  designation: string;
  type: string;
  head: string;
  capacity: string;
  status: "ACTIVE" | "MAINTENANCE" | "OFFLINE";
}

const INITIAL_CAMPUSES: CampusNode[] = [
  {
    id: "cmp-1",
    campusId: "CAMPUS-01",
    designation: "North Science & Engineering Center",
    type: "Main Headquarters",
    head: "Dr. Margaret Vance",
    capacity: "6,400 Students",
    status: "ACTIVE"
  },
  {
    id: "cmp-2",
    campusId: "CAMPUS-02",
    designation: "South Management & Law Annex",
    type: "Satellite School",
    head: "Prof. R. K. Sharma",
    capacity: "2,800 Students",
    status: "ACTIVE"
  },
  {
    id: "cmp-3",
    campusId: "CAMPUS-03",
    designation: "East Bio-Tech & AI Incubation Hub",
    type: "Research Facility",
    head: "Dr. S. Nair",
    capacity: "950 Fellows",
    status: "ACTIVE"
  }
];

export default function CampusSettingsPage() {
  const [campuses, setCampuses] = useState<CampusNode[]>(INITIAL_CAMPUSES);
  const [activeTab, setActiveTab] = useState<
    "general" | "academic" | "rbac" | "grading" | "gateways" | "security" | "backup"
  >("general");

  // Profile Form States
  const [legalName, setLegalName] = useState("Apex Institute of Technology & Management");
  const [instCode, setInstCode] = useState("APX-EDU-AUT-2011");
  const [address, setAddress] = useState(
    "Apex Tech Valley, North Campus, Sector 9, Science & Technology Park, State PIN 560103"
  );
  const [charter, setCharter] = useState(
    "Autonomous Institution Affiliated with National Board of Technical Education (NBA Tier-1 Accredited, NAAC A++)"
  );
  const [registrarEmail, setRegistrarEmail] = useState("registrar@apex.edu.in");
  const [emergencyPhone, setEmergencyPhone] = useState("+1 (800) 492-APEX (Ext 101)");

  // Academic Session States
  const [academicCycle, setAcademicCycle] = useState("AY 2024-25 (1 July 2024 - 30 June 2025)");
  const [gradingScheme, setGradingScheme] = useState("10-Point Relative Grading (Gaussian Bell Scale)");
  const [attendanceThreshold, setAttendanceThreshold] = useState("75.0%");

  // Security States
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [idleTimeout, setIdleTimeout] = useState("15 MIN");
  const [ipWhitelist, setIpWhitelist] = useState("192.168.1.0/24, 10.0.4.0/22");
  const [passwordRotation, setPasswordRotation] = useState("90 DAYS");

  // Modals
  const [isRegisterCampusOpen, setIsRegisterCampusOpen] = useState(false);
  const [isAuditLogsOpen, setIsAuditLogsOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isEmergencyLockdownOpen, setIsEmergencyLockdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Campus Form
  const [newCampus, setNewCampus] = useState({
    campusId: `CAMPUS-0${campuses.length + 1}`,
    designation: "",
    type: "Satellite School",
    head: "",
    capacity: "1,500 Students"
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleAddCampus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampus.designation || !newCampus.head) {
      alert("Please enter designation and head of campus.");
      return;
    }
    const created: CampusNode = {
      id: `cmp-${Date.now()}`,
      campusId: newCampus.campusId,
      designation: newCampus.designation,
      type: newCampus.type,
      head: newCampus.head,
      capacity: newCampus.capacity,
      status: "ACTIVE"
    };
    setCampuses([...campuses, created]);
    setIsRegisterCampusOpen(false);
    showToast(`Campus node ${created.campusId} registered successfully.`);
  };

  const handleSaveGlobalConfig = () => {
    showToast("Global institutional configuration committed and synchronized across all active nodes.");
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
        {/* Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Settings & Configuration</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Config Engine v5.4 Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Global institutional parameters, academic session governance, RBAC permissions & gateway telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <button
              onClick={() => setIsAuditLogsOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <History className="w-4 h-4 text-indigo-600" />
              <span>Audit Trail</span>
            </button>
            <button
              onClick={() => setIsBackupModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Cloud className="w-4 h-4 text-slate-600" />
              <span>Backup & Snapshot DB</span>
            </button>
            <button
              onClick={handleSaveGlobalConfig}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Global Config</span>
            </button>
          </div>
        </div>

        {/* 4 Standard Redesigned KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Metric 1: Academic Session */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                Active Session
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                AY 2024-25 <span className="text-[10px] sm:text-xs font-normal text-slate-500 block sm:inline">Fall Term</span>
              </div>
              <div className="mt-1.5 sm:mt-2 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs font-medium text-slate-500 gap-1">
                <span className="text-indigo-600 font-semibold">Cycle 1 of 2</span>
                <span className="font-mono text-[10px] sm:text-xs">Rollover: 142d</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Roles & RBAC */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                System Roles
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                18 <span className="text-[10px] sm:text-xs font-normal text-slate-500">Roles</span>
              </div>
              <div className="mt-1.5 sm:mt-2 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs font-medium text-slate-500 gap-1">
                <span className="text-emerald-600 font-semibold">4 Admins</span>
                <span className="font-mono text-[10px] sm:text-xs">1,248 Users</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Security & Compliance */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                Compliance
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums truncate">
                SOC-2 & FERPA
              </div>
              <div className="mt-1.5 sm:mt-2 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs font-medium text-slate-500 gap-1">
                <span className="text-purple-600 font-semibold">MFA: 100%</span>
                <span className="font-mono text-[10px] sm:text-xs">TLS 1.3</span>
              </div>
            </div>
          </div>

          {/* Metric 4: API & Gateways */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                Gateways
              </span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                <Radio className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                14 <span className="text-[10px] sm:text-xs font-normal text-slate-500">Webhooks</span>
              </div>
              <div className="mt-1.5 sm:mt-2 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs font-medium text-slate-500 gap-1">
                <span className="text-sky-600 font-semibold truncate">Twilio • Stripe</span>
                <span className="text-emerald-600 font-mono font-semibold text-[10px] sm:text-xs">99.98%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-1.5 flex items-center gap-1.5 overflow-x-auto max-w-full no-scrollbar">
          {[
            { id: "general", label: "General & Campus Profile", icon: Building },
            { id: "academic", label: "Academic Session & Terms", icon: Clock },
            { id: "rbac", label: "Roles & Permissions (RBAC)", icon: Users },
            { id: "grading", label: "Grading Schemes & GPA", icon: Award },
            { id: "gateways", label: "Notification & Gateways", icon: Radio },
            { id: "security", label: "Security & Audit Logs", icon: Shield },
            { id: "backup", label: "Data Backup & Recovery", icon: Database },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Master Configuration (~66% = 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* TAB CONTENT: GENERAL & CAMPUS PROFILE */}
            {(activeTab === "general" || activeTab === "rbac" || activeTab === "grading" || activeTab === "security" || activeTab === "backup") && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Institutional Identity & Master Seal
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Accreditation, Legal Names, and Digital Document Credentials
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                    ID: APX-CORE-INST-01
                  </span>
                </div>

                {/* Logo Seal Preview Strip */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 relative shadow-2xs shrink-0">
                      <Building className="w-9 h-9 text-indigo-600" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">
                        ✓
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Official Academic Crest & Watermark
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 block mt-0.5">
                        apex_crest_vector_master_v3.svg (256 KB)
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Recommended: 800×800 px, Monochrome SVG or Transparent PNG
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => showToast("Opening Transcript Seal watermark preview canvas.")}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
                    >
                      Preview Seal
                    </button>
                    <button
                      onClick={() => showToast("File picker triggered: Upload new SVG/PNG crest.")}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                    >
                      Upload Crest
                    </button>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Full Legal Institution Name
                    </label>
                    <input
                      type="text"
                      value={legalName}
                      onChange={e => setLegalName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Institutional Code / AISHE Ref
                    </label>
                    <input
                      type="text"
                      value={instCode}
                      onChange={e => setInstCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Official Campus Postal Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Accreditation & Autonomous Governance Charter
                    </label>
                    <input
                      type="text"
                      value={charter}
                      onChange={e => setCharter(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Registrar Office Email
                    </label>
                    <input
                      type="email"
                      value={registrarEmail}
                      onChange={e => setRegistrarEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Emergency Contact Desk
                    </label>
                    <input
                      type="text"
                      value={emergencyPhone}
                      onChange={e => setEmergencyPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Campus Facilities Matrix */}
                <div className="pt-2 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Configured Campuses & Satellite Centers
                    </span>
                    <button
                      onClick={() => setIsRegisterCampusOpen(true)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      + Register Campus Node
                    </button>
                  </div>
                  <div className="overflow-x-auto w-full border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-xs min-w-[650px]">
                      <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200/80 whitespace-nowrap">
                        <tr>
                          <th className="py-2.5 px-3">Campus ID</th>
                          <th className="py-2.5 px-3">Designation</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Head of Campus</th>
                          <th className="py-2.5 px-3">Capacity</th>
                          <th className="py-2.5 px-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 whitespace-nowrap">
                        {campuses.map(node => (
                          <tr key={node.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                              {node.campusId}
                            </td>
                            <td className="py-2.5 px-3 font-medium text-slate-800">{node.designation}</td>
                            <td className="py-2.5 px-3 text-slate-500">{node.type}</td>
                            <td className="py-2.5 px-3 text-slate-700">{node.head}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-600">{node.capacity}</td>
                            <td className="py-2.5 px-3 text-right">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200/80">
                                {node.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* CARD 2: ACADEMIC SESSION GOVERNANCE */}
            {(activeTab === "general" || activeTab === "academic") && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Academic Session Governance & Shifts
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Operational Calendars, Shift Hours, and Attendance Baselines
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold">
                    CYCLE: 2024-FALL
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Current Active Academic Cycle
                    </label>
                    <select
                      value={academicCycle}
                      onChange={e => setAcademicCycle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                      <option>AY 2024-25 (1 July 2024 - 30 June 2025)</option>
                      <option>AY 2025-26 (Planning Phase)</option>
                      <option>AY 2023-24 (Archived & Sealed)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Default Academic Grading Scheme
                    </label>
                    <select
                      value={gradingScheme}
                      onChange={e => setGradingScheme(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                      <option>10-Point Relative Grading (Gaussian Bell Scale)</option>
                      <option>4-Point Absolute Scale (US Standard GPA)</option>
                      <option>Letter Grades with Direct Percentage Weight</option>
                    </select>
                  </div>

                  {/* Operational Working Days */}
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Configured Institutional Teaching Days
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-1">
                      {["MON", "TUE", "WED", "THU", "FRI"].map(day => (
                        <div
                          key={day}
                          className="p-2 bg-indigo-600 text-white rounded-xl flex items-center justify-between text-xs font-mono font-semibold shadow-xs"
                        >
                          <span>{day}</span>
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ))}
                      <div className="p-2 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-between border border-slate-200 text-xs font-mono font-semibold">
                        <span>SAT (½)</span>
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <div className="p-2 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-between border border-slate-200/60 text-xs font-mono font-semibold">
                        <span>SUN</span>
                        <X className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Shift Timings */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Day Shift (Standard)
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-mono text-[9px] font-bold">
                        PRIMARY
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>Start: <span className="font-bold text-slate-900">08:30 AM</span></div>
                      <div>Dismissal: <span className="font-bold text-slate-900">16:30 PM</span></div>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Period: 50m • Recess: 45m • Passing: 10m
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Evening Shift (Postgrad)
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[9px] font-bold">
                        POSTGRAD
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>Start: <span className="font-bold text-slate-900">17:00 PM</span></div>
                      <div>Dismissal: <span className="font-bold text-slate-900">21:30 PM</span></div>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Modular block lectures: 90m • Break: 20m
                    </div>
                  </div>

                  {/* Attendance Threshold */}
                  <div className="md:col-span-2 p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Exam Eligibility Attendance Threshold
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Mandatory cumulative attendance required to generate semester admit cards and seat allocations.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xl font-bold font-mono text-slate-900">
                          {attendanceThreshold}
                        </div>
                        <span className="text-[10px] font-bold uppercase text-amber-600 block">
                          DEAN CUTOFF
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const newPct = prompt("Enter new minimum attendance percentage threshold:", "75.0%");
                          if (newPct) {
                            setAttendanceThreshold(newPct);
                            showToast(`Attendance eligibility updated to ${newPct}`);
                          }
                        }}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                      >
                        Adjust Policy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CARD 3: ENTERPRISE INTEGRATION & API GATEWAYS */}
            {(activeTab === "general" || activeTab === "gateways") && (
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Radio className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Enterprise Integrations & Gateways
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        Biometric Turnstiles, SMS Dispatchers, Payment Hooks, and Storage Nodes
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Opening Gateway Connector Setup wizard...")}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors shadow-2xs"
                  >
                    + New Connector
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Gateway 1: SMS */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sky-600 shadow-2xs shrink-0">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            Twilio Enterprise SMS Trunk
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold border border-emerald-200">
                            ONLINE
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                          SID: AC98e2...a04f • Priority Queue • Ping: 42ms
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      <span className="font-mono text-xs text-emerald-600 font-semibold">
                        99.8% Uptime
                      </span>
                      <button
                        onClick={() => showToast("Twilio SMS trunk configuration modal opened.")}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold shadow-2xs"
                      >
                        Configure
                      </button>
                    </div>
                  </div>

                  {/* Gateway 2: Payments */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-2xs shrink-0">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            Fee Payment Engine (HDFC & Stripe ACH)
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold border border-emerald-200">
                            LIVE (T+1)
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                          Auto-reconciliation active • 1,842 collected today
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      <span className="font-mono text-xs text-indigo-600 font-semibold">
                        PCI-DSS L1
                      </span>
                      <button
                        onClick={() => showToast("Payment gateway webhooks & keys inspector opened.")}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold shadow-2xs"
                      >
                        Configure
                      </button>
                    </div>
                  </div>

                  {/* Gateway 3: Biometrics */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-2xs shrink-0">
                        <Fingerprint className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            Biometric RFID & Turnstile Grid
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold border border-emerald-200">
                            42 SYNCED
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                          Campus perimeter turnstiles • 0 drop-outs recorded past 72 hrs
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      <span className="font-mono text-xs text-slate-600 font-semibold">
                        Sub-sec Push
                      </span>
                      <button
                        onClick={() => showToast("Turnstile heartbeat ping executed: 42 of 42 responding.")}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold shadow-2xs"
                      >
                        Diagnostics
                      </button>
                    </div>
                  </div>

                  {/* Gateway 4: AWS Storage */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-purple-600 shadow-2xs shrink-0">
                        <HardDrive className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">
                            AWS S3 Encrypted Document Vault
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[9px] font-bold border border-emerald-200">
                            HEALTHY
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                          Storage Pool: 1.4 TB utilized of 5.0 TB allocated • SSE-KMS
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 self-end sm:self-center">
                      <span className="font-mono text-xs text-purple-600 font-semibold">
                        28% Full
                      </span>
                      <button
                        onClick={() => showToast("Requesting AWS bucket storage pool quota expansion...")}
                        className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold shadow-2xs"
                      >
                        Expand
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: RBAC Matrix, Security Hardening & Lock (~34% = 4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Live Role Inspector & RBAC Drawer */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      RBAC Role Inspector
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Granular Permission Matrix
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold">
                  ACTIVE
                </span>
              </div>

              {/* Active Role Details */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    Policy Target
                  </span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-white text-indigo-600 rounded border border-slate-200">
                    ROLE-SUPER-ADMIN-01
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900">
                  Super Administrator (Executive Dean & Registrar)
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="h-6 w-6 rounded-full bg-indigo-600 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                      MV
                    </div>
                    <div className="h-6 w-6 rounded-full bg-emerald-600 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                      RS
                    </div>
                    <div className="h-6 w-6 rounded-full bg-purple-600 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                      +2
                    </div>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    4 Active Assignees
                  </span>
                </div>
              </div>

              {/* Permission Matrix Grid */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-700 block">
                  Operational Scope & Rights
                </span>

                {/* Section 1: Student Records */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">Student Identity & Records</span>
                    <span className="font-mono text-[10px] text-emerald-600 font-bold">AUTHORIZED</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-[10px] font-mono font-bold">
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      READ ✓
                    </div>
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      WRITE ✓
                    </div>
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      DEL ✓
                    </div>
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      EXP ✓
                    </div>
                  </div>
                </div>

                {/* Section 2: Financial Ledgers */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">Financial Fee Ledgers</span>
                    <span className="font-mono text-[10px] text-indigo-600 font-bold">DUAL-SIGN</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-[10px] font-mono font-bold">
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      READ ✓
                    </div>
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      WRITE ✓
                    </div>
                    <div className="p-1 bg-emerald-50 text-emerald-700 rounded text-center border border-emerald-200/60">
                      RFND ✓
                    </div>
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      AUDT ✓
                    </div>
                  </div>
                </div>

                {/* Section 3: Exams & Grading */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">Exams & Grade Override</span>
                    <span className="font-mono text-[10px] text-purple-600 font-bold">AUDITED</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[10px] font-mono font-bold">
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      READ ✓
                    </div>
                    <div className="p-1 bg-indigo-50 text-indigo-700 rounded text-center border border-indigo-200/60">
                      PUBLISH ✓
                    </div>
                    <div className="p-1 bg-purple-50 text-purple-700 rounded text-center border border-purple-200/60">
                      OVERRIDE ✓
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => showToast("Catalog of all 18 institutional RBAC roles opened.")}
                    className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Role Catalog
                  </button>
                  <button
                    onClick={() => showToast("Editing permission matrix for ROLE-SUPER-ADMIN-01")}
                    className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
                  >
                    Edit Policy
                  </button>
                </div>
              </div>
            </div>

            {/* Security Enforcement Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Security Parameters
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                  STRICT
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* MFA Toggle */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">
                      Enforce Multi-Factor (MFA)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Required for faculty, staff & registrars
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMfaEnforced(!mfaEnforced);
                      showToast(`MFA enforcement set to ${!mfaEnforced ? "ENABLED" : "DISABLED"}`);
                    }}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                      mfaEnforced ? "bg-indigo-600 justify-end" : "bg-slate-300 justify-start"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
                  </button>
                </div>

                {/* Idle Inactivity */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Idle Inactivity Timeout</span>
                    <span className="font-mono font-bold text-indigo-600">{idleTimeout}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Terminates unauthenticated operator sessions automatically.
                  </p>
                </div>

                {/* IP Whitelist */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">IP Whitelist Subnets</span>
                    <span className="font-mono text-[10px] font-bold text-emerald-600">2 RANGES</span>
                  </div>
                  <div className="p-1.5 bg-white rounded-lg font-mono text-[11px] text-slate-800 border border-slate-200">
                    {ipWhitelist}
                  </div>
                </div>

                {/* Password Rotation */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Password Rotation</div>
                    <div className="text-[11px] text-slate-500">Periodic update cadence</div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{passwordRotation}</span>
                </div>
              </div>
            </div>

            {/* Emergency Protocol Lock Card */}
            <div className="bg-gradient-to-br from-rose-900 to-rose-950 text-white rounded-2xl p-5 shadow-xs border border-rose-800 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <span className="text-sm font-bold tracking-tight">
                  Emergency Maintenance Protocol
                </span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                Activating Emergency Maintenance suspends student portal sessions, halts scheduled payment checkouts, and freezes all examination record updates immediately.
              </p>
              <button
                onClick={() => setIsEmergencyLockdownOpen(true)}
                className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Lock className="w-4 h-4" />
                <span>Initiate Lockdown</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Technical Telemetry Strip */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>CLUSTER: US-EAST-04 (K8S: 12/12 PODS READY)</span>
              </span>
              <span>•</span>
              <span>UPTIME: 44D 18:32:01</span>
              <span>•</span>
              <span>REDIS HIT: 98.4%</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                FERPA AUDITED
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                GDPR READY
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/60">
                ISO 27001
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: REGISTER CAMPUS NODE */}
      {isRegisterCampusOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Building className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Register Campus / Satellite Node
                </h3>
              </div>
              <button
                onClick={() => setIsRegisterCampusOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCampus} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Campus ID</label>
                  <input
                    type="text"
                    required
                    value={newCampus.campusId}
                    onChange={e => setNewCampus({ ...newCampus, campusId: e.target.value })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Node Type</label>
                  <select
                    value={newCampus.type}
                    onChange={e => setNewCampus({ ...newCampus, type: e.target.value })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                  >
                    <option>Main Headquarters</option>
                    <option>Satellite School</option>
                    <option>Research Facility</option>
                    <option>Off-Campus Annex</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Campus Designation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. West Campus Innovation Hub"
                  value={newCampus.designation}
                  onChange={e => setNewCampus({ ...newCampus, designation: e.target.value })}
                  className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Head of Campus</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. David Miller"
                    value={newCampus.head}
                    onChange={e => setNewCampus({ ...newCampus, head: e.target.value })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Capacity</label>
                  <input
                    type="text"
                    required
                    value={newCampus.capacity}
                    onChange={e => setNewCampus({ ...newCampus, capacity: e.target.value })}
                    className="w-full bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRegisterCampusOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Register Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: AUDIT TRAIL LOGS */}
      {isAuditLogsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <History className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  System Configuration Audit Ledger
                </h3>
              </div>
              <button
                onClick={() => setIsAuditLogsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs max-h-80 overflow-y-auto">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-start">
                <div>
                  <span className="text-indigo-600 font-bold">[2024-05-24 10:14:02 UTC]</span>
                  <div className="text-slate-900 font-sans font-semibold mt-0.5">
                    PARM_UPDATE: Attendance threshold affirmed at 75.0%
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Operator: margaret.vance@apex.edu (Dean) • IP: 192.168.1.12
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  VERIFIED
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-start">
                <div>
                  <span className="text-indigo-600 font-bold">[2024-05-23 16:30:19 UTC]</span>
                  <div className="text-slate-900 font-sans font-semibold mt-0.5">
                    GATEWAY_RELOAD: Twilio SMS Trunk SSL Certificate Renewed
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Operator: root-sysadmin@apex.edu • IP: 10.0.4.5
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                  SUCCESS
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex justify-between items-start">
                <div>
                  <span className="text-indigo-600 font-bold">[2024-05-22 09:00:00 UTC]</span>
                  <div className="text-slate-900 font-sans font-semibold mt-0.5">
                    RBAC_MUTATION: Added 2 adjunct faculty to Course Evaluator role
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    Operator: registrar@apex.edu • IP: 192.168.1.24
                  </div>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                  LOGGED
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button
                onClick={() => showToast("Exporting signed cryptographic audit ledger as CSV...")}
                className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-xs font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Export Audit CSV</span>
              </button>
              <button
                onClick={() => setIsAuditLogsOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: BACKUP & SNAPSHOT DB */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Cloud className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Database Snapshot & S3 Sync
                </h3>
              </div>
              <button
                onClick={() => setIsBackupModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Initiates an immediate consistent point-in-time snapshot of the primary PostgreSQL database cluster, encrypts tables with AES-256, and dispatches the tarball to AWS S3 Glacier.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 font-mono text-xs space-y-1">
              <div>Target Cluster: <span className="font-bold text-slate-900">US-EAST-PROD-CL-04</span></div>
              <div>Estimated Size: <span className="text-indigo-600 font-semibold">14.2 GB</span></div>
              <div>Retention: <span className="text-slate-700">365 Days WORM Compliant</span></div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsBackupModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBackupModalOpen(false);
                  showToast("Point-in-time snapshot job #SNP-9812 initiated on primary cluster.");
                }}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
              >
                Trigger Snapshot Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: EMERGENCY LOCKDOWN CONFIRMATION */}
      {isEmergencyLockdownOpen && (
        <div className="fixed inset-0 z-50 bg-rose-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-rose-500 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Confirm System Lockdown
                </h3>
                <span className="text-[11px] font-mono font-bold text-rose-600">
                  MAINTENANCE PROTOCOL ENFORCEMENT
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to trigger an immediate institutional lockdown? This terminates all active student sessions, puts payment portals in maintenance mode, and locks grade mutations.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEmergencyLockdownOpen(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-semibold rounded-xl text-slate-600 hover:bg-slate-50"
              >
                Abort
              </button>
              <button
                onClick={() => {
                  setIsEmergencyLockdownOpen(false);
                  showToast("CAMPUS SYSTEM LOCKDOWN ENGAGED. ALL SESSIONS FROZEN.");
                }}
                className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-colors shadow-xs"
              >
                Confirm Lockdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
