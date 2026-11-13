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
  Download
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
    setTimeout(() => setToastMessage(null), 3000);
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
    <div className="flex flex-col w-full pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-4 py-3 shadow-xl border border-secondary flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-secondary" />
          <span className="font-mono-data text-body-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Global Telemetry Banner / Ticker */}
      <div className="w-full bg-primary text-on-primary px-margin-desktop py-1.5 flex flex-wrap items-center justify-between gap-space-sm text-[0.6875rem] font-mono-data tracking-wider uppercase border-b border-primary-container">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 bg-secondary animate-pulse"></span>
            <span className="font-semibold text-secondary-fixed">CORE CONFIG ENGINE v5.4</span>
          </div>
          <span className="text-outline">|</span>
          <span className="text-surface-container-high">
            NODE: <span className="text-on-primary">US-EAST-PROD-CL-04</span>
          </span>
          <span className="text-outline">|</span>
          <span className="text-surface-container-high">
            DB LATENCY: <span className="text-secondary-fixed">3.8 MS (SYNCHRONIZED)</span>
          </span>
          <span className="text-outline">|</span>
          <span className="text-surface-container-high">
            FAILOVER: <span className="text-secondary-fixed">ACTIVE-STANDBY-AZ-B</span>
          </span>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="text-surface-container-high">
            LAST SNAPSHOT: <span className="text-on-primary">03:00:12 UTC (SHA-256 VERIFIED)</span>
          </span>
          <span className="text-outline">|</span>
          <span className="px-1.5 py-0.5 bg-primary-container text-secondary-fixed text-[0.625rem] font-semibold tracking-widest">
            STRICT ENFORCEMENT
          </span>
        </div>
      </div>

      {/* Page Header & Global Actions Bar */}
      <div className="w-full bg-surface-container-lowest px-margin-desktop py-space-lg shadow-sm border-b border-outline-variant/30">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md">
          <div className="flex flex-col">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
              <span>INSTITUTIONAL COMMAND</span>
              <ChevronRight className="w-3.5 h-3.5 text-outline" />
              <span>SYSTEM ADMINISTRATION</span>
              <ChevronRight className="w-3.5 h-3.5 text-outline" />
              <span className="text-primary font-semibold">SETTINGS & CAMPUS CONFIGURATION</span>
            </div>
            {/* Main Title & Operational Subtitle */}
            <div className="flex items-baseline gap-space-md mt-1 flex-wrap">
              <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">
                Settings & Campus Configuration
              </h1>
              <span className="px-2 py-0.5 bg-surface-container text-on-secondary-container font-mono-data text-body-sm font-semibold tracking-wide border border-outline-variant/40">
                PARM-SET-GLOBAL-2024.B
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
              Global Institutional Parameters, Academic Session Governance, Role & Access Control, and Gateway Telemetry
            </p>
          </div>
          {/* Action Button Group */}
          <div className="flex items-center gap-space-sm flex-wrap self-start lg:self-center">
            <button
              onClick={() => setIsAuditLogsOpen(true)}
              className="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-low transition-colors shadow-sm border border-outline-variant/60"
            >
              <History className="w-4 h-4 text-secondary" />
              <span>Audit Trail (Logs)</span>
            </button>
            <button
              onClick={() => setIsBackupModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-space-md py-2 bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-low transition-colors shadow-sm border border-outline-variant/60"
            >
              <Cloud className="w-4 h-4 text-secondary" />
              <span>Backup & Snapshot DB</span>
            </button>
            <button
              onClick={handleSaveGlobalConfig}
              className="inline-flex items-center gap-1.5 px-space-lg py-2 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-all shadow-md active:translate-y-0.5 font-semibold"
            >
              <Save className="w-4 h-4 text-secondary-fixed" />
              <span>Save Global Config</span>
            </button>
          </div>
        </div>
      </div>

      {/* Telemetry KPI Cards Bar (4 Columns) */}
      <div className="w-full px-margin-desktop py-space-md">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {/* Metric 1: Academic Session */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Active Academic Session
                </span>
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-headline-lg text-headline-lg text-primary mt-1 tracking-tight font-bold">
                AY 2024-25
              </div>
              <div className="font-mono-data text-body-sm text-on-surface-variant font-medium mt-0.5">
                Semester Fall / Term 1
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-outline-variant/20">
              <span className="px-1.5 py-0.5 bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Cycle 1 of 2
              </span>
              <span className="font-mono-data text-body-sm text-secondary font-semibold">
                Auto-rollover: 142d
              </span>
            </div>
          </div>

          {/* Metric 2: Roles & RBAC */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  System Roles & RBAC
                </span>
                <Shield className="w-5 h-5 text-primary-container" />
              </div>
              <div className="font-headline-lg text-headline-lg text-primary mt-1 tracking-tight font-bold">
                18 Defined Roles
              </div>
              <div className="font-mono-data text-body-sm text-on-surface-variant font-medium mt-0.5">
                4 Super Admins • 14 Leads
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-outline-variant/20">
              <span className="px-1.5 py-0.5 bg-surface-container-high text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Zero Escalations
              </span>
              <span className="font-mono-data text-body-sm text-on-surface-variant">
                1,248 Assigned Users
              </span>
            </div>
          </div>

          {/* Metric 3: Security & Compliance */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary-container"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Security Telemetry
                </span>
                <Lock className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-headline-lg text-headline-lg text-primary mt-1 tracking-tight font-bold">
                SOC2 & FERPA
              </div>
              <div className="font-mono-data text-body-sm text-on-surface-variant font-medium mt-0.5">
                MFA Enforced: 100% Staff
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-outline-variant/20">
              <span className="px-1.5 py-0.5 bg-surface-container-high text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                AES-256 At Rest
              </span>
              <span className="font-mono-data text-body-sm text-secondary font-semibold">
                TLS 1.3 Strict
              </span>
            </div>
          </div>

          {/* Metric 4: API & Gateways */}
          <div className="bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                  Connected Gateways
                </span>
                <Radio className="w-5 h-5 text-secondary" />
              </div>
              <div className="font-headline-lg text-headline-lg text-primary mt-1 tracking-tight font-bold">
                14 Active Webhooks
              </div>
              <div className="font-mono-data text-body-sm text-on-surface-variant font-medium mt-0.5">
                Twilio • Stripe • Canvas LMS
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between border-t border-outline-variant/20">
              <span className="px-1.5 py-0.5 bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                All Pipes Live
              </span>
              <span className="font-mono-data text-body-sm text-secondary font-semibold">
                99.98% Gateway SLA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Horizontal Navigation Tabs Bar */}
      <div className="w-full px-margin-desktop pt-space-sm">
        <div className="bg-surface-container-lowest px-space-md flex items-center gap-space-xs overflow-x-auto shadow-sm border border-outline-variant/30">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "general"
                ? "text-on-primary bg-primary-container font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>General & Campus Profile</span>
          </button>
          <button
            onClick={() => setActiveTab("academic")}
            className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "academic"
                ? "text-on-primary bg-primary-container font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Academic Session & Terms</span>
          </button>
          <button
            onClick={() => setActiveTab("rbac")}
            className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "rbac"
                ? "text-on-primary bg-primary-container font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Roles & Permissions (RBAC)</span>
          </button>
          <button
            onClick={() => setActiveTab("grading")}
            className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "grading"
                ? "text-on-primary bg-primary-container font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Grading Schemes & GPA</span>
          </button>
          <button
            onClick={() => setActiveTab("gateways")}
            className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "gateways"
                ? "text-on-primary bg-primary-container font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Notification & Gateways</span>
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "security"
                ? "text-on-primary bg-primary-container font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & Audit Logs</span>
          </button>
          <button
            onClick={() => setActiveTab("backup")}
            className={`px-space-md py-3 font-label-md text-label-md uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "backup"
                ? "text-on-primary bg-primary-container font-semibold"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Backup & Recovery</span>
          </button>
        </div>
      </div>

      {/* Main Content Asymmetric 2-Column Grid */}
      <div className="w-full px-margin-desktop py-space-md mb-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* LEFT COLUMN: Institutional Master Configuration (~65% = 8 Cols) */}
          <div className="lg:col-span-8 space-y-space-md">
            {/* CARD 1: Institutional Legal Profile & Identity */}
            <div className="bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40">
              <div className="flex items-center justify-between pb-space-sm bg-surface-container-low p-space-sm mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <Building className="w-5 h-5 text-primary" />
                  <div>
                    <h2 className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
                      Institutional Identity & Master Seal
                    </h2>
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Accreditation, Legal Names, and Digital Document Credentials
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-primary-container text-on-primary font-mono-data text-body-sm font-semibold">
                  ID: APX-CORE-INST-01
                </span>
              </div>

              <div className="space-y-space-md">
                {/* Logo Seal Preview Strip */}
                <div className="p-space-md bg-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-outline-variant/30">
                  <div className="flex items-center gap-space-md">
                    <div className="w-20 h-20 bg-surface-container-lowest flex items-center justify-center p-2 relative shadow-sm border border-outline-variant/40">
                      <Building className="w-12 h-12 text-primary" />
                      <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-secondary flex items-center justify-center text-on-primary text-[0.65rem] font-bold">
                        ✓
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        Official Academic Crest & Watermark
                      </span>
                      <span className="font-mono-data text-body-sm text-on-surface-variant">
                        apex_crest_vector_master_v3.svg (256 KB)
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">
                        Recommended: 800×800 px, Monochrome SVG or Transparent PNG
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm self-end md:self-center">
                    <button
                      onClick={() => showToast("Opening Transcript Seal watermark preview canvas.")}
                      className="px-space-md py-1.5 bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors shadow-sm border border-outline-variant/40"
                    >
                      Preview Transcript Seal
                    </button>
                    <button
                      onClick={() => showToast("File picker triggered: Upload new SVG/PNG crest.")}
                      className="px-space-md py-1.5 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors font-semibold"
                    >
                      Upload Crest
                    </button>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Full Legal Institution Name
                    </label>
                    <input
                      type="text"
                      value={legalName}
                      onChange={e => setLegalName(e.target.value)}
                      className="w-full bg-surface text-on-surface px-space-sm py-2 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Institutional Code / AISHE Reference
                    </label>
                    <input
                      type="text"
                      value={instCode}
                      onChange={e => setInstCode(e.target.value)}
                      className="w-full bg-surface text-on-surface px-space-sm py-2 font-mono-data text-body-md focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/40"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Official Campus Postal Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full bg-surface text-on-surface px-space-sm py-2 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/40"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Accreditation & Autonomous Governance Charter
                    </label>
                    <input
                      type="text"
                      value={charter}
                      onChange={e => setCharter(e.target.value)}
                      className="w-full bg-surface text-on-surface px-space-sm py-2 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Registrar Office Official Email
                    </label>
                    <input
                      type="email"
                      value={registrarEmail}
                      onChange={e => setRegistrarEmail(e.target.value)}
                      className="w-full bg-surface text-on-surface px-space-sm py-2 font-mono-data text-body-md focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/40"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Institutional Emergency Contact Desk
                    </label>
                    <input
                      type="text"
                      value={emergencyPhone}
                      onChange={e => setEmergencyPhone(e.target.value)}
                      className="w-full bg-surface text-on-surface px-space-sm py-2 font-mono-data text-body-md focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/40"
                    />
                  </div>
                </div>

                {/* Campus Facilities Multi-Zone Matrix */}
                <div className="pt-space-xs">
                  <div className="flex items-center justify-between pb-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Configured Institutional Campuses & Satellite Centers
                    </span>
                    <button
                      onClick={() => setIsRegisterCampusOpen(true)}
                      className="font-mono-data text-body-sm text-secondary font-semibold hover:underline"
                    >
                      + Register Campus Node
                    </button>
                  </div>
                  <div className="overflow-x-auto border border-outline-variant/30">
                    <table className="w-full text-left font-body-sm text-body-sm">
                      <thead className="bg-surface text-on-surface-variant uppercase font-label-sm text-label-sm border-b border-outline-variant/30">
                        <tr>
                          <th className="py-2 px-space-sm">Campus ID</th>
                          <th className="py-2 px-space-sm">Designation</th>
                          <th className="py-2 px-space-sm">Type</th>
                          <th className="py-2 px-space-sm">Head of Campus</th>
                          <th className="py-2 px-space-sm">Capacity</th>
                          <th className="py-2 px-space-sm text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container">
                        {campuses.map(node => (
                          <tr key={node.id} className="hover:bg-surface-container-low transition-colors">
                            <td className="py-2 px-space-sm font-mono-data text-primary font-semibold">
                              {node.campusId}
                            </td>
                            <td className="py-2 px-space-sm font-medium">{node.designation}</td>
                            <td className="py-2 px-space-sm text-on-surface-variant">{node.type}</td>
                            <td className="py-2 px-space-sm">{node.head}</td>
                            <td className="py-2 px-space-sm font-mono-data">{node.capacity}</td>
                            <td className="py-2 px-space-sm text-right">
                              <span className="px-2 py-0.5 bg-surface-container-high text-primary font-label-sm text-label-sm uppercase font-semibold">
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
            </div>

            {/* CARD 2: Academic Session Governance & Term Configuration */}
            <div className="bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40">
              <div className="flex items-center justify-between pb-space-sm bg-surface-container-low p-space-sm mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <h2 className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
                      Academic Session Governance & Shifts
                    </h2>
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Operational Calendars, Shift Hours, and Attendance Baselines
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-surface-container text-primary font-mono-data text-body-sm font-semibold">
                  CYCLE: 2024-FALL
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Current Active Academic Cycle
                  </label>
                  <select
                    value={academicCycle}
                    onChange={e => setAcademicCycle(e.target.value)}
                    className="w-full bg-surface text-on-surface px-space-sm py-2 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/40"
                  >
                    <option>AY 2024-25 (1 July 2024 - 30 June 2025)</option>
                    <option>AY 2025-26 (Planning Phase)</option>
                    <option>AY 2023-24 (Archived & Sealed)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Default Academic Grading Scheme
                  </label>
                  <select
                    value={gradingScheme}
                    onChange={e => setGradingScheme(e.target.value)}
                    className="w-full bg-surface text-on-surface px-space-sm py-2 font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none border border-outline-variant/40"
                  >
                    <option>10-Point Relative Grading (Gaussian Bell Scale)</option>
                    <option>4-Point Absolute Scale (US Standard GPA)</option>
                    <option>Letter Grades with Direct Percentage Weight (A+, A, B...)</option>
                  </select>
                </div>

                {/* Operational Working Days */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                    Configured Institutional Teaching Days
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-1">
                    <div className="p-2 bg-primary-container text-on-primary flex items-center justify-between">
                      <span className="font-mono-data text-body-sm font-semibold">MON</span>
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-primary-container text-on-primary flex items-center justify-between">
                      <span className="font-mono-data text-body-sm font-semibold">TUE</span>
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-primary-container text-on-primary flex items-center justify-between">
                      <span className="font-mono-data text-body-sm font-semibold">WED</span>
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-primary-container text-on-primary flex items-center justify-between">
                      <span className="font-mono-data text-body-sm font-semibold">THU</span>
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-primary-container text-on-primary flex items-center justify-between">
                      <span className="font-mono-data text-body-sm font-semibold">FRI</span>
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="p-2 bg-surface-container text-primary flex items-center justify-between border border-outline-variant/40">
                      <span className="font-mono-data text-body-sm font-semibold">SAT (½)</span>
                      <Clock className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="p-2 bg-surface text-on-surface-variant/40 flex items-center justify-between border border-outline-variant/20">
                      <span className="font-mono-data text-body-sm font-semibold">SUN</span>
                      <X className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Shift Timings Split */}
                <div className="p-space-sm bg-surface space-y-2 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      Day Shift (Standard)
                    </span>
                    <span className="px-1.5 py-0.5 bg-surface-container-high text-primary font-label-sm text-label-sm uppercase font-semibold">
                      PRIMARY
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-on-surface-variant font-mono-data text-body-sm">
                    <div>
                      Start: <span className="text-primary font-semibold">08:30 AM</span>
                    </div>
                    <div>
                      Dismissal: <span className="text-primary font-semibold">16:30 PM</span>
                    </div>
                  </div>
                  <div className="text-on-surface-variant font-body-sm">
                    Lecture period: 50m • Recess: 45m • Passing: 10m
                  </div>
                </div>

                <div className="p-space-sm bg-surface space-y-2 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      Executive / Evening Shift
                    </span>
                    <span className="px-1.5 py-0.5 bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase font-semibold">
                      POSTGRAD
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-on-surface-variant font-mono-data text-body-sm">
                    <div>
                      Start: <span className="text-primary font-semibold">17:00 PM</span>
                    </div>
                    <div>
                      Dismissal: <span className="text-primary font-semibold">21:30 PM</span>
                    </div>
                  </div>
                  <div className="text-on-surface-variant font-body-sm">
                    Modular block lectures: 90m • Break: 20m
                  </div>
                </div>

                {/* Attendance Eligibility Threshold Slider / Metric */}
                <div className="md:col-span-2 p-space-sm bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/30">
                  <div className="space-y-0.5">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      Exam Eligibility Attendance Threshold
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Mandatory cumulative attendance required to generate semester admit cards and seat allocations.
                    </p>
                  </div>
                  <div className="flex items-center gap-space-md">
                    <div className="text-right">
                      <div className="font-headline-lg text-headline-lg text-primary font-bold">
                        {attendanceThreshold}
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                        STRICT DEAN CUTOFF
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
                      className="px-space-md py-1.5 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors font-semibold"
                    >
                      Adjust Policy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Enterprise Integration & API Gateways */}
            <div className="bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40">
              <div className="flex items-center justify-between pb-space-sm bg-surface-container-low p-space-sm mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <Radio className="w-5 h-5 text-primary" />
                  <div>
                    <h2 className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
                      Enterprise Integrations & Peripheral Gateways
                    </h2>
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Biometric Turnstiles, SMS Dispatchers, Payment Hooks, and Storage Nodes
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => showToast("Opening Gateway Connector Setup wizard...")}
                  className="px-2.5 py-1 bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high transition-colors font-semibold border border-outline-variant/40"
                >
                  + New Connector
                </button>
              </div>

              <div className="space-y-space-sm">
                {/* Gateway 1: SMS */}
                <div className="p-space-sm bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border border-outline-variant/30">
                  <div className="flex items-center gap-space-md">
                    <div className="w-10 h-10 bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm border border-outline-variant/40">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          Twilio Enterprise SMS Trunk
                        </span>
                        <span className="px-1.5 py-0.2 bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold uppercase">
                          ONLINE
                        </span>
                      </div>
                      <div className="font-mono-data text-body-sm text-on-surface-variant">
                        SID: AC98e2...a04f | Routing: Priority Academic Queue | Ping: 42ms
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm self-end sm:self-center">
                    <span className="font-mono-data text-body-sm text-secondary font-semibold">
                      99.8% Uptime
                    </span>
                    <button
                      onClick={() => showToast("Twilio SMS trunk configuration modal opened.")}
                      className="px-space-sm py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high border border-outline-variant/40"
                    >
                      Configure
                    </button>
                  </div>
                </div>

                {/* Gateway 2: Payments */}
                <div className="p-space-sm bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border border-outline-variant/30">
                  <div className="flex items-center gap-space-md">
                    <div className="w-10 h-10 bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm border border-outline-variant/40">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          Fee Payment Engine (HDFC & Stripe ACH)
                        </span>
                        <span className="px-1.5 py-0.2 bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold uppercase">
                          LIVE (T+1)
                        </span>
                      </div>
                      <div className="font-mono-data text-body-sm text-on-surface-variant">
                        Auto-reconciliation active | Instant webhooks: 1,842 collected today
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm self-end sm:self-center">
                    <span className="font-mono-data text-body-sm text-secondary font-semibold">
                      PCI-DSS L1
                    </span>
                    <button
                      onClick={() => showToast("Payment gateway webhooks & keys inspector opened.")}
                      className="px-space-sm py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high border border-outline-variant/40"
                    >
                      Configure
                    </button>
                  </div>
                </div>

                {/* Gateway 3: Biometrics */}
                <div className="p-space-sm bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border border-outline-variant/30">
                  <div className="flex items-center gap-space-md">
                    <div className="w-10 h-10 bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm border border-outline-variant/40">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          Biometric RFID & Turnstile Grid
                        </span>
                        <span className="px-1.5 py-0.2 bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold uppercase">
                          42 SYNCED
                        </span>
                      </div>
                      <div className="font-mono-data text-body-sm text-on-surface-variant">
                        Campus perimeter turnstiles • 0 drop-outs recorded past 72 hrs
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm self-end sm:self-center">
                    <span className="font-mono-data text-body-sm text-secondary font-semibold">
                      Sub-sec Push
                    </span>
                    <button
                      onClick={() => showToast("Turnstile heartbeat ping executed: 42 of 42 responding.")}
                      className="px-space-sm py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high border border-outline-variant/40"
                    >
                      Diagnostics
                    </button>
                  </div>
                </div>

                {/* Gateway 4: AWS Storage */}
                <div className="p-space-sm bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm border border-outline-variant/30">
                  <div className="flex items-center gap-space-md">
                    <div className="w-10 h-10 bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm border border-outline-variant/40">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">
                          AWS S3 Encrypted Document Vault
                        </span>
                        <span className="px-1.5 py-0.2 bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold uppercase">
                          HEALTHY
                        </span>
                      </div>
                      <div className="font-mono-data text-body-sm text-on-surface-variant">
                        Storage Pool: 1.4 TB utilized of 5.0 TB allocated | SSE-KMS Enabled
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm self-end sm:self-center">
                    <span className="font-mono-data text-body-sm text-secondary font-semibold">
                      28% Full
                    </span>
                    <button
                      onClick={() => showToast("Requesting AWS bucket storage pool quota expansion...")}
                      className="px-space-sm py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-high border border-outline-variant/40"
                    >
                      Expand
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RBAC Matrix, Security Hardening & Lock Controls (~35% = 4 Cols) */}
          <div className="lg:col-span-4 space-y-space-md">
            {/* Live Role Inspector & RBAC Drawer */}
            <div className="bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40">
              <div className="flex items-center justify-between pb-space-sm bg-surface-container-low p-space-sm mb-space-md">
                <div className="flex items-center gap-space-sm">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
                      RBAC Role Inspector
                    </h3>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Granular Permission Matrix
                    </span>
                  </div>
                </div>
                <span className="font-mono-data text-body-sm font-semibold text-secondary">
                  ACTIVE
                </span>
              </div>

              {/* Active Role Details */}
              <div className="p-space-sm bg-surface space-y-2 mb-space-md border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Selected Policy Target
                  </span>
                  <span className="font-mono-data text-body-sm px-1 bg-surface-container text-primary font-bold">
                    ROLE-SUPER-ADMIN-01
                  </span>
                </div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold">
                  Super Administrator (Executive Dean & Registrar)
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="h-6 w-6 rounded-full bg-primary text-on-primary font-mono-data text-[0.625rem] flex items-center justify-center font-bold">
                      MV
                    </div>
                    <div className="h-6 w-6 rounded-full bg-secondary text-on-primary font-mono-data text-[0.625rem] flex items-center justify-center font-bold">
                      RS
                    </div>
                    <div className="h-6 w-6 rounded-full bg-primary-container text-on-primary font-mono-data text-[0.625rem] flex items-center justify-center font-bold">
                      +2
                    </div>
                  </div>
                  <span className="font-mono-data text-body-sm text-on-surface-variant font-medium">
                    4 Active Assignees
                  </span>
                </div>
              </div>

              {/* Permission Matrix Grid */}
              <div className="space-y-space-md">
                <div className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant pb-1 font-bold">
                  Operational Scope & Rights
                </div>

                {/* Section 1: Student Records */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md font-semibold text-primary">
                      Student Identity & Records
                    </span>
                    <span className="font-mono-data text-label-sm text-secondary font-semibold">
                      ALL AUTHORIZED
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>READ</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>WRITE</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>DEL</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>EXP</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Financial Ledgers */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md font-semibold text-primary">
                      Financial Fee Ledgers
                    </span>
                    <span className="font-mono-data text-label-sm text-secondary font-semibold">
                      DUAL-SIGN REQUIRED
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>READ</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>WRITE</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-1.5 bg-secondary text-on-secondary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>RFND</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>AUDT</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Exams & Grading Overrides */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-body-md text-body-md font-semibold text-primary">
                      Exams & Grade Override
                    </span>
                    <span className="font-mono-data text-label-sm text-secondary font-semibold">
                      DEAN AUDITED
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>READ</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-1.5 bg-primary-container text-on-primary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>PUBLISH</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-1.5 bg-secondary text-on-secondary text-center font-mono-data text-body-sm font-semibold flex items-center justify-center gap-1">
                      <span>OVERRIDE</span>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Section 4: System Configs */}
                <div className="p-2 bg-surface flex items-center justify-between border border-outline-variant/30">
                  <div>
                    <span className="font-headline-sm text-headline-sm text-primary block font-bold">
                      Root Core Configuration
                    </span>
                    <span className="font-mono-data text-body-sm text-on-surface-variant">
                      Global system mutations permitted
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-primary-container text-on-primary font-mono-data text-body-sm font-bold">
                    ROOT [x]
                  </span>
                </div>

                <div className="pt-space-xs flex justify-between gap-space-sm">
                  <button
                    onClick={() => showToast("Catalog of all 18 institutional RBAC roles opened.")}
                    className="flex-1 py-1.5 bg-surface text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors border border-outline-variant/40"
                  >
                    Role Catalog
                  </button>
                  <button
                    onClick={() => showToast("Editing permission matrix for ROLE-SUPER-ADMIN-01")}
                    className="flex-1 py-1.5 bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors font-semibold"
                  >
                    Edit Policy
                  </button>
                </div>
              </div>
            </div>

            {/* Security Enforcement Card */}
            <div className="bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40 space-y-space-md">
              <div className="flex items-center justify-between pb-space-sm bg-surface-container-low p-space-sm">
                <div className="flex items-center gap-space-sm">
                  <Lock className="w-5 h-5 text-primary" />
                  <h3 className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
                    Security Parameters
                  </h3>
                </div>
                <span className="px-2 py-0.5 bg-surface-container-high text-primary font-mono-data text-body-sm font-semibold">
                  STRICT
                </span>
              </div>

              <div className="space-y-space-sm text-body-md">
                <div className="p-space-sm bg-surface flex items-center justify-between border border-outline-variant/30">
                  <div>
                    <div className="font-headline-sm text-headline-sm text-primary font-bold">
                      Enforce Multi-Factor (MFA)
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      Required for faculty, staff & registrars
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMfaEnforced(!mfaEnforced);
                      showToast(`MFA enforcement set to ${!mfaEnforced ? "ENABLED" : "DISABLED"}`);
                    }}
                    className={`w-10 h-5 flex items-center px-0.5 transition-colors cursor-pointer ${
                      mfaEnforced ? "bg-primary-container justify-end" : "bg-outline-variant justify-start"
                    }`}
                  >
                    <span className="w-4 h-4 bg-surface-container-lowest shadow-sm"></span>
                  </button>
                </div>

                <div className="p-space-sm bg-surface space-y-1 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      Idle Inactivity Timeout
                    </span>
                    <span className="font-mono-data text-body-sm text-primary font-bold">
                      {idleTimeout}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Terminates unauthenticated operator sessions automatically across all terminals.
                  </p>
                </div>

                <div className="p-space-sm bg-surface space-y-1 border border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      IP Whitelist Subnets (CIDR)
                    </span>
                    <span className="font-mono-data text-body-sm text-secondary font-semibold">
                      2 RANGES
                    </span>
                  </div>
                  <div className="p-1.5 bg-surface-container-lowest font-mono-data text-body-sm text-primary border border-outline-variant/40">
                    {ipWhitelist}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Restricts Dean console to North & South Campus IP ranges and verified WireGuard VPN.
                  </p>
                </div>

                <div className="p-space-sm bg-surface flex items-center justify-between border border-outline-variant/30">
                  <div>
                    <div className="font-headline-sm text-headline-sm text-primary font-bold">
                      Password Rotation Cadence
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      Forces credentials update periodically
                    </div>
                  </div>
                  <span className="font-mono-data text-body-sm text-primary font-bold">
                    {passwordRotation}
                  </span>
                </div>
              </div>
            </div>

            {/* System Emergency Maintenance Protocol */}
            <div className="bg-surface-container-lowest p-space-md shadow-sm border-l-4 border-error border border-outline-variant/40 space-y-space-sm">
              <div className="flex items-center gap-space-sm">
                <AlertTriangle className="w-5 h-5 text-error" />
                <span className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
                  Emergency Protocol Lock
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Activating Emergency Maintenance suspends student portal sessions, halts scheduled payment checkouts, and freezes all examination record updates immediately.
              </p>
              <button
                onClick={() => setIsEmergencyLockdownOpen(true)}
                className="w-full py-2 bg-error text-on-error font-label-md text-label-md uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 font-bold shadow-md"
              >
                <Lock className="w-4 h-4" />
                <span>Initiate Emergency Lockdown</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Global Technical Telemetry Strip */}
      <div className="w-full bg-surface-container px-margin-desktop py-space-md shadow-inner border-t border-outline-variant/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md text-[0.75rem] font-mono-data text-on-surface-variant">
          <div className="flex flex-wrap items-center gap-space-md">
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className="h-2 w-2 bg-secondary"></span>
              <span>CLUSTER: US-EAST-04 (K8S PODS: 12/12 READY)</span>
            </span>
            <span>•</span>
            <span>ENGINE RUNTIME: 44 DAYS 18:32:01</span>
            <span>•</span>
            <span>REDIS CACHE HIT: 98.4%</span>
          </div>
          <div className="flex items-center gap-space-md uppercase font-label-sm text-label-sm tracking-widest text-on-surface font-semibold">
            <span className="px-1.5 py-0.5 bg-surface-container-high">FERPA AUDITED</span>
            <span className="px-1.5 py-0.5 bg-surface-container-high">GDPR READY</span>
            <span className="px-1.5 py-0.5 bg-surface-container-high">ISO 27001</span>
          </div>
        </div>
      </div>

      {/* MODAL 1: REGISTER CAMPUS NODE */}
      {isRegisterCampusOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Register Campus / Satellite Node
                </h3>
              </div>
              <button onClick={() => setIsRegisterCampusOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCampus} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Campus ID
                  </label>
                  <input
                    type="text"
                    required
                    value={newCampus.campusId}
                    onChange={e => setNewCampus({ ...newCampus, campusId: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 font-mono-data text-body-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Node Type
                  </label>
                  <select
                    value={newCampus.type}
                    onChange={e => setNewCampus({ ...newCampus, type: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                  >
                    <option>Main Headquarters</option>
                    <option>Satellite School</option>
                    <option>Research Facility</option>
                    <option>Off-Campus Annex</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                  Campus Designation / Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. West Campus Innovation Hub"
                  value={newCampus.designation}
                  onChange={e => setNewCampus({ ...newCampus, designation: e.target.value })}
                  className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Head of Campus / Dean
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Prof. David Miller"
                    value={newCampus.head}
                    onChange={e => setNewCampus({ ...newCampus, head: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 text-body-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                    Student Capacity
                  </label>
                  <input
                    type="text"
                    required
                    value={newCampus.capacity}
                    onChange={e => setNewCampus({ ...newCampus, capacity: e.target.value })}
                    className="w-full bg-surface-container-low p-2 border border-outline-variant/40 font-mono-data text-body-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setIsRegisterCampusOpen(false)}
                  className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider text-on-surface hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-sm"
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
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  System Configuration Audit Ledger
                </h3>
              </div>
              <button onClick={() => setIsAuditLogsOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 font-mono-data text-[0.75rem] max-h-80 overflow-y-auto">
              <div className="p-2.5 bg-surface-container-low border border-outline-variant/30 flex justify-between items-start">
                <div>
                  <span className="text-secondary font-bold">[2024-05-24 10:14:02 UTC]</span>
                  <div className="text-primary font-semibold font-sans mt-0.5">
                    PARM_UPDATE: Attendance threshold affirmed at 75.0%
                  </div>
                  <div className="text-on-surface-variant">Operator: margaret.vance@apex.edu (Dean) • IP: 192.168.1.12</div>
                </div>
                <span className="px-1.5 py-0.5 bg-surface-container text-primary font-bold">VERIFIED</span>
              </div>

              <div className="p-2.5 bg-surface-container-low border border-outline-variant/30 flex justify-between items-start">
                <div>
                  <span className="text-secondary font-bold">[2024-05-23 16:30:19 UTC]</span>
                  <div className="text-primary font-semibold font-sans mt-0.5">
                    GATEWAY_RELOAD: Twilio SMS Trunk SSL Certificate Renewed
                  </div>
                  <div className="text-on-surface-variant">Operator: root-sysadmin@apex.edu • IP: 10.0.4.5</div>
                </div>
                <span className="px-1.5 py-0.5 bg-surface-container text-primary font-bold">SUCCESS</span>
              </div>

              <div className="p-2.5 bg-surface-container-low border border-outline-variant/30 flex justify-between items-start">
                <div>
                  <span className="text-secondary font-bold">[2024-05-22 09:00:00 UTC]</span>
                  <div className="text-primary font-semibold font-sans mt-0.5">
                    RBAC_MUTATION: Added 2 adjunct faculty to Course Evaluator role
                  </div>
                  <div className="text-on-surface-variant">Operator: registrar@apex.edu • IP: 192.168.1.24</div>
                </div>
                <span className="px-1.5 py-0.5 bg-surface-container text-primary font-bold">LOGGED</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => showToast("Exporting signed cryptographic audit ledger as CSV...")}
                className="inline-flex items-center gap-1.5 text-primary hover:text-secondary font-label-sm text-label-sm uppercase font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Export Audit CSV</span>
              </button>
              <button
                onClick={() => setIsAuditLogsOpen(false)}
                className="px-4 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: BACKUP & SNAPSHOT DB */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant/60 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-secondary" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Database Snapshot & S3 Sync
                </h3>
              </div>
              <button onClick={() => setIsBackupModalOpen(false)} className="p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              Initiates an immediate consistent point-in-time snapshot of the primary PostgreSQL database cluster, encrypts tables with AES-256, and dispatches the tarball to AWS S3 Glacier.
            </p>

            <div className="p-3 bg-surface-container-low border border-outline-variant/30 font-mono-data text-body-sm space-y-1">
              <div>Target Cluster: <span className="font-bold text-primary">US-EAST-PROD-CL-04</span></div>
              <div>Estimated Size: <span className="text-secondary font-semibold">14.2 GB</span></div>
              <div>Retention: <span className="text-primary">365 Days WORM Compliant</span></div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsBackupModalOpen(false)}
                className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsBackupModalOpen(false);
                  showToast("Point-in-time snapshot job #SNP-9812 initiated on primary cluster.");
                }}
                className="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-primary-container transition-colors shadow-sm"
              >
                Trigger Snapshot Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: EMERGENCY LOCKDOWN CONFIRMATION */}
      {isEmergencyLockdownOpen && (
        <div className="fixed inset-0 z-50 bg-error/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border-2 border-error shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-error">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h3 className="font-headline-sm text-headline-sm uppercase font-bold tracking-tight">
                  ACTIVATE CAMPUS SYSTEM LOCKDOWN
                </h3>
                <span className="font-mono-data text-[0.6875rem] uppercase font-bold text-on-surface-variant">
                  MAINTENANCE PROTOCOL ENFORCEMENT
                </span>
              </div>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              Are you sure you want to trigger an immediate institutional lockdown? This terminates all active student sessions, puts payment portals in maintenance mode, and locks grade mutations.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsEmergencyLockdownOpen(false)}
                className="px-4 py-2 border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider"
              >
                Abort
              </button>
              <button
                onClick={() => {
                  setIsEmergencyLockdownOpen(false);
                  showToast("CAMPUS SYSTEM LOCKDOWN ENGAGED. ALL SESSIONS FROZEN.");
                }}
                className="px-6 py-2 bg-error text-on-error font-label-md text-label-md uppercase tracking-wider font-bold hover:bg-error-container transition-colors shadow-md"
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

