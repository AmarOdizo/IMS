"use client";

import { useState } from "react";
import {
  CreditCard,
  Printer,
  Layers,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  QrCode,
  ShieldCheck,
  Cpu,
  UserCheck,
  FileSpreadsheet,
  X,
  FileText,
  Scan,
  Radio,
  Sliders,
  Check,
  ChevronRight,
  ExternalLink,
  Plus
} from "lucide-react";

interface Cardholder {
  id: string;
  name: string;
  role: "student" | "faculty";
  roleLabel: string;
  rollId: string;
  dept: string;
  validity: string;
  rfidUid: string;
  status: "Queued" | "Active" | "Pending Photo" | "Revoked";
  photo: string;
  bloodGroup: string;
  serial: string;
  barcode: string;
}

const initialCardholders: Cardholder[] = [
  {
    id: "devina",
    name: "Devina Mukherjee",
    role: "student",
    roleLabel: "Student (B.Tech)",
    rollId: "APX-CS-2024-002",
    dept: "CSE (Core)",
    validity: "2024–2028",
    rfidUid: "04:A2:8F:91:E2",
    status: "Queued",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "O +VE",
    serial: "CR80-884102",
    barcode: "*APX-CS-2024-002*"
  },
  {
    id: "aarav",
    name: "Aarav S. Patel",
    role: "student",
    roleLabel: "Student (B.Tech)",
    rollId: "APX-CS-2024-014",
    dept: "CSE (AI & Data)",
    validity: "2024–2028",
    rfidUid: "04:B5:11:7C:99",
    status: "Queued",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "B +VE",
    serial: "CR80-884114",
    barcode: "*APX-CS-2024-014*"
  },
  {
    id: "sharma",
    name: "Prof. Rajesh K. Sharma",
    role: "faculty",
    roleLabel: "Faculty & Dean",
    rollId: "APX-FAC-2018-042",
    dept: "Dept. Computing",
    validity: "2024–2029",
    rfidUid: "04:99:3F:8A:10",
    status: "Active",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "B +VE",
    serial: "CR80-FAC-4019",
    barcode: "*APX-FAC-2018-042*"
  },
  {
    id: "sophia",
    name: "Sophia Devika Rao",
    role: "student",
    roleLabel: "Student (B.Tech)",
    rollId: "APX-CS-2024-089",
    dept: "Cloud Eng.",
    validity: "2024–2028",
    rfidUid: "04:F2:77:21:4A",
    status: "Queued",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "A +VE",
    serial: "CR80-884189",
    barcode: "*APX-CS-2024-089*"
  },
  {
    id: "alistair",
    name: "Dr. Alistair Chen",
    role: "faculty",
    roleLabel: "Research Officer",
    rollId: "APX-ADM-2020-019",
    dept: "Quantum Labs",
    validity: "2024–2027",
    rfidUid: "04:61:9A:02:5D",
    status: "Active",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "AB +VE",
    serial: "CR80-FAC-2019",
    barcode: "*APX-ADM-2020-019*"
  },
  {
    id: "marcus",
    name: "Marcus V. Lindqvist",
    role: "student",
    roleLabel: "Student (B.Tech)",
    rollId: "APX-EC-2024-014",
    dept: "ECE Systems",
    validity: "2024–2028",
    rfidUid: "04:DD:54:19:8B",
    status: "Queued",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "O -VE",
    serial: "CR80-884214",
    barcode: "*APX-EC-2024-014*"
  },
  {
    id: "aisha",
    name: "Aisha Zahra Khan",
    role: "student",
    roleLabel: "Student (MBA)",
    rollId: "APX-MBA-2024-102",
    dept: "School of Mgmt",
    validity: "2024–2026",
    rfidUid: "04:EE:81:40:22",
    status: "Queued",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "B +VE",
    serial: "CR80-884302",
    barcode: "*APX-MBA-2024-102*"
  },
  {
    id: "elena",
    name: "Elena Chen",
    role: "faculty",
    roleLabel: "Faculty (Robotics)",
    rollId: "APX-FAC-2021-088",
    dept: "Robotics Lab",
    validity: "2024–2029",
    rfidUid: "04:12:88:AC:33",
    status: "Queued",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "A -VE",
    serial: "CR80-FAC-3088",
    barcode: "*APX-FAC-2021-088*"
  }
];

export default function IdCardManagementPage() {
  const [cardholders, setCardholders] = useState<Cardholder[]>(initialCardholders);
  const [selectedCardId, setSelectedCardId] = useState<string>("devina");
  const [activeTab, setActiveTab] = useState<string>("queue");
  const [studioMode, setStudioMode] = useState<"single" | "sheet">("single");
  const [selectedRows, setSelectedRows] = useState<string[]>([
    "devina", "aarav", "sharma", "sophia", "alistair", "marcus", "aisha", "elena"
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active card data for Studio Preview
  const activeCard = cardholders.find((c) => c.id === selectedCardId) || cardholders[0];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === cardholders.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(cardholders.map((c) => c.id));
    }
  };

  // Filtered cardholders based on active tab and search
  const filteredCardholders = cardholders.filter((item) => {
    if (activeTab === "student" && item.role !== "student") return false;
    if (activeTab === "faculty" && item.role !== "faculty") return false;
    if (activeTab === "queue" && item.status !== "Queued") return false;
    if (activeTab === "reissue" && item.status !== "Revoked") return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.rollId.toLowerCase().includes(q) ||
        item.rfidUid.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface">
      {/* Top Breadcrumb & Metadata Strip */}
      <div className="w-full bg-surface-container-lowest px-gutter-desktop py-space-sm border-b border-outline-variant/30 flex flex-wrap items-center justify-between gap-y-2">
        <div className="flex items-center gap-space-xs font-mono-data text-[0.6875rem] uppercase tracking-widest text-on-surface-variant">
          <span>Institutional Command</span>
          <ChevronRight className="w-3.5 h-3.5 text-outline" />
          <span>Registrar &amp; Campus Security</span>
          <ChevronRight className="w-3.5 h-3.5 text-outline" />
          <span className="text-primary font-bold">ID Card Management &amp; Credential Issuance</span>
        </div>
        <div className="flex items-center gap-space-md text-[0.6875rem] font-mono-data">
          <span className="inline-flex items-center gap-1.5 text-secondary font-semibold">
            <span className="inline-block w-2 h-2 bg-emerald-500 animate-pulse"></span>
            CARD PRINTER NODE #01: ONLINE (FARGO HDP5000)
          </span>
          <span className="text-outline">|</span>
          <span className="text-on-surface-variant">ENCODER: MIFARE DESFIRE EV3 4K</span>
        </div>
      </div>

      {/* Main Administrative Header Banner */}
      <div className="w-full bg-surface-container-low px-gutter-desktop py-space-lg border-b border-outline-variant/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-space-sm">
              <h1 className="font-headline-lg text-headline-lg uppercase text-primary tracking-tight font-bold">
                ID Card Management &amp; Smart Badge Studio
              </h1>
              <span className="bg-primary text-on-primary font-mono-data text-[0.6875rem] uppercase px-2 py-0.5 font-semibold">
                PROD RUN #9421
              </span>
              <span className="bg-surface-variant text-on-surface font-mono-data text-[0.6875rem] uppercase px-2 py-0.5 border border-outline-variant/50">
                CR80 DUPLEX READY
              </span>
            </div>
            <p className="font-mono-data text-body-sm text-on-surface-variant flex flex-wrap items-center gap-x-2">
              <span>ISO/IEC 7810 CR80 Standard (85.6 × 54.0 mm)</span>
              <span className="text-outline-variant">•</span>
              <span>RFID/NFC MIFARE DESFire 4K Enabled</span>
              <span className="text-outline-variant">•</span>
              <span className="text-primary font-semibold">AY 2024-25 Series</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono-data">
            <button
              onClick={() => triggerToast("Exporting Card Registry as encrypted CSV...")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container-lowest text-primary text-label-md uppercase tracking-wider border border-outline-variant/60 hover:bg-surface transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Registry</span>
            </button>
            <button
              onClick={() => setStudioMode("sheet")}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-label-md uppercase tracking-wider border transition-colors ${
                studioMode === "sheet"
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-surface-container-lowest text-primary border-outline-variant/60 hover:bg-surface"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>A4 Sheet Batch (8-Up)</span>
            </button>
            <button
              onClick={() => triggerToast("Bulk generator started for 68 queued badges.")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-secondary text-on-secondary text-label-md uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary-container transition-colors"
            >
              <Cpu className="w-4 h-4" />
              <span>Bulk Batch Generator</span>
            </button>
            <button
              onClick={() => setIsIssueModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary text-label-md uppercase tracking-wider border border-primary hover:bg-primary-container transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Issue Single ID Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Telemetry Bar (4 Cards) */}
      <div className="w-full px-gutter-desktop py-space-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md border-b border-outline-variant/30 bg-surface">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-space-md border-l-4 border-l-primary border-t border-r border-b border-outline-variant/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Total Active Badges
              </span>
              <UserCheck className="w-4 h-4 text-primary" />
            </div>
            <div className="font-headline-lg text-headline-lg text-primary font-bold mt-1 tracking-tight">
              3,892
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-body-sm font-mono-data">
            <span className="text-on-surface-variant text-[0.75rem]">Std: 3,450 • Fac: 442</span>
            <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 text-[0.6875rem] font-bold">
              +14.2% YoY
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest p-space-md border-l-4 border-l-amber-600 border-t border-r border-b border-outline-variant/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Pending Issuance Queue
              </span>
              <Printer className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-headline-lg text-headline-lg text-primary font-bold mt-1 tracking-tight">
              68 Cards
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-body-sm font-mono-data">
            <span className="text-on-surface-variant text-[0.75rem]">Batch &apos;24: 52 • Fac: 16</span>
            <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 text-[0.6875rem] font-bold">
              Urgent Queue
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-space-md border-l-4 border-l-secondary border-t border-r border-b border-outline-variant/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                RFID / Access Hardware Health
              </span>
              <Radio className="w-4 h-4 text-secondary" />
            </div>
            <div className="font-headline-lg text-headline-lg text-primary font-bold mt-1 tracking-tight">
              99.8%
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-body-sm font-mono-data">
            <span className="text-on-surface-variant text-[0.75rem]">Turnstiles &amp; Labs Synced</span>
            <span className="text-secondary bg-surface-container px-1.5 py-0.5 text-[0.6875rem] font-bold">
              0 Conflicts
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest p-space-md border-l-4 border-l-rose-700 border-t border-r border-b border-outline-variant/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Damaged / Re-Issue Requests
              </span>
              <AlertTriangle className="w-4 h-4 text-rose-700" />
            </div>
            <div className="font-headline-lg text-headline-lg text-primary font-bold mt-1 tracking-tight">
              12 Pending
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-outline-variant/30 flex items-center justify-between text-body-sm font-mono-data">
            <span className="text-on-surface-variant text-[0.75rem]">Lost: 8 • Chip Fault: 4</span>
            <button
              onClick={() => setActiveTab("reissue")}
              className="text-rose-700 underline font-semibold text-[0.6875rem] hover:text-rose-900"
            >
              Review Re-Issues →
            </button>
          </div>
        </div>
      </div>

      {/* Primary Operations Canvas (Split Layout 7:5) */}
      <div className="w-full px-gutter-desktop py-space-md grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* LEFT PANEL: Ledger, Filters, Queue Controls (7 Cols on xl) */}
        <div className="xl:col-span-7 flex flex-col space-y-space-md">
          {/* Segmented Category Tabs */}
          <div className="w-full bg-surface-container-lowest border border-outline-variant/40 flex flex-wrap items-center">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider border-r border-outline-variant/40 transition-colors ${
                activeTab === "all"
                  ? "bg-primary text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              All Cardholders (3,892)
            </button>
            <button
              onClick={() => setActiveTab("student")}
              className={`px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider border-r border-outline-variant/40 transition-colors ${
                activeTab === "student"
                  ? "bg-primary text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Student Cards <span className="ml-1 inline-block w-2 h-2 bg-[#173b65]"></span>
            </button>
            <button
              onClick={() => setActiveTab("faculty")}
              className={`px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider border-r border-outline-variant/40 transition-colors ${
                activeTab === "faculty"
                  ? "bg-primary text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Faculty &amp; Staff <span className="ml-1 inline-block w-2 h-2 bg-[#7b1113]"></span>
            </button>
            <button
              onClick={() => setActiveTab("queue")}
              className={`px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider border-r border-outline-variant/40 transition-colors ${
                activeTab === "queue"
                  ? "bg-primary text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Print Batch Queue (68)
            </button>
            <button
              onClick={() => setActiveTab("reissue")}
              className={`px-space-md py-2.5 font-label-md text-label-md uppercase tracking-wider transition-colors ${
                activeTab === "reissue"
                  ? "bg-primary text-on-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              Re-Issue / Lost (12)
            </button>
          </div>

          {/* Filter Controls Strip */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 p-space-sm space-y-space-sm">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono-data text-body-sm">
              <div>
                <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                  Academic Program / Dept
                </label>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full bg-surface border border-outline-variant/50 px-2 py-1.5 text-on-surface text-[0.8125rem] focus:outline-none focus:border-primary"
                >
                  <option value="all">All Academic Depts</option>
                  <option value="cs">B.Tech Computer Science</option>
                  <option value="ec">Electronics &amp; Comm</option>
                  <option value="mgmt">School of Business / MBA</option>
                  <option value="fac">Faculty &amp; Staff Pool</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                  Cohort Batch
                </label>
                <select className="w-full bg-surface border border-outline-variant/50 px-2 py-1.5 text-on-surface text-[0.8125rem] focus:outline-none focus:border-primary">
                  <option>Batch 2024-2028 (Year 1)</option>
                  <option>Batch 2023-2027 (Year 2)</option>
                  <option>Batch 2022-2026 (Year 3)</option>
                  <option>Permanent Faculty Tenured</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                  Production Status
                </label>
                <select className="w-full bg-surface border border-outline-variant/50 px-2 py-1.5 text-on-surface text-[0.8125rem] focus:outline-none focus:border-primary">
                  <option>All Statuses</option>
                  <option>Queued for Print (68)</option>
                  <option>Printed &amp; Active (3,892)</option>
                  <option>Pending Photo Sync (14)</option>
                  <option>Revoked / Blocked</option>
                </select>
              </div>
              <div>
                <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                  Search Registry
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Roll, RFID UID, Name..."
                    className="w-full bg-surface border border-outline-variant/50 pl-7 pr-2 py-1.5 text-on-surface text-[0.8125rem] focus:outline-none focus:border-primary font-mono-data"
                  />
                  <Search className="w-3.5 h-3.5 text-on-surface-variant absolute left-2 top-2" />
                </div>
              </div>
            </div>

            {/* Batch Action Toolbar */}
            <div className="bg-surface-container-low border border-outline-variant/30 px-space-sm py-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-space-sm font-mono-data text-body-sm">
                <input
                  type="checkbox"
                  checked={selectedRows.length === cardholders.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-primary rounded-none"
                />
                <span className="font-bold text-primary">Selected: {selectedRows.length} Cards</span>
                <span className="text-on-surface-variant text-[0.75rem]">
                  (Exact 8-Up A4 Cardstock capacity ready)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStudioMode("sheet")}
                  className="px-2.5 py-1 bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center gap-1"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Send to A4 Sheet Studio</span>
                </button>
                <button
                  onClick={() => triggerToast("Encoding MIFARE DESFire AES-128 keys to selected cards...")}
                  className="px-2.5 py-1 bg-surface-container-lowest text-primary border border-outline-variant/50 font-label-md text-label-md uppercase tracking-wider hover:bg-surface transition-colors flex items-center gap-1"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Encode RFID Keys</span>
                </button>
                <button
                  onClick={() => triggerToast("Marked 8 selected badges as Printed & Issued.")}
                  className="px-2.5 py-1 bg-surface-container-lowest text-primary border border-outline-variant/50 font-label-md text-label-md uppercase tracking-wider hover:bg-surface transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Printed</span>
                </button>
              </div>
            </div>
          </div>

          {/* High-Density Production Data Table */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono-data text-[0.75rem]">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant/40 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  <th className="p-2 w-8 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === cardholders.length}
                      onChange={toggleSelectAll}
                      className="w-3.5 h-3.5 accent-primary rounded-none"
                    />
                  </th>
                  <th className="p-2">Cardholder Detail</th>
                  <th className="p-2">ID / Roll Identifier</th>
                  <th className="p-2">Dept / Program</th>
                  <th className="p-2">Valid Thru</th>
                  <th className="p-2">RFID UID Tag</th>
                  <th className="p-2">Batch Status</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {filteredCardholders.map((card) => {
                  const isSelectedInStudio = card.id === selectedCardId;
                  const isChecked = selectedRows.includes(card.id);

                  return (
                    <tr
                      key={card.id}
                      onClick={() => {
                        setSelectedCardId(card.id);
                        setStudioMode("single");
                      }}
                      className={`transition-colors cursor-pointer ${
                        isSelectedInStudio
                          ? "bg-primary/10 border-l-2 border-l-primary"
                          : isChecked
                          ? "bg-primary/5 hover:bg-primary/10"
                          : "hover:bg-surface-container-low"
                      }`}
                    >
                      <td className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(card.id)}
                          className="w-3.5 h-3.5 accent-primary rounded-none"
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={card.photo}
                            alt={card.name}
                            className="w-7 h-8 object-cover border border-outline-variant/50 rounded-none shrink-0"
                          />
                          <div className="flex flex-col">
                            <span className="font-bold text-on-surface text-[0.8125rem]">
                              {card.name}
                            </span>
                            <span
                              className={`font-label-sm text-[0.625rem] font-bold uppercase tracking-wider ${
                                card.role === "faculty" ? "text-[#7b1113]" : "text-[#173b65]"
                              }`}
                            >
                              {card.roleLabel}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`p-2 font-bold ${
                          card.role === "faculty" ? "text-[#7b1113]" : "text-primary"
                        }`}
                      >
                        {card.rollId}
                      </td>
                      <td className="p-2 truncate max-w-[120px]" title={card.dept}>
                        {card.dept}
                      </td>
                      <td className="p-2 text-on-surface-variant">{card.validity}</td>
                      <td className="p-2 font-mono text-[0.6875rem] text-secondary">
                        {card.rfidUid}
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-1.5 py-0.5 text-[0.625rem] font-bold uppercase border ${
                            card.status === "Queued"
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : card.status === "Active"
                              ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                              : "bg-rose-100 text-rose-900 border-rose-300"
                          }`}
                        >
                          {card.status}
                        </span>
                      </td>
                      <td className="p-2 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedCardId(card.id);
                              setStudioMode("single");
                            }}
                            className="p-1 hover:bg-surface text-primary border border-outline-variant/40"
                            title="Preview in Studio"
                          >
                            <Scan className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => triggerToast(`Printing single card for ${card.name}...`)}
                            className="p-1 hover:bg-surface text-secondary border border-outline-variant/40"
                            title="Print Single"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Table Footer / Telemetry Bar */}
            <div className="p-2 bg-surface-container-low border-t border-outline-variant/40 flex flex-wrap items-center justify-between text-body-sm font-mono-data">
              <div className="flex items-center gap-2 text-on-surface-variant text-[0.6875rem]">
                <span className="font-bold text-primary">{selectedRows.length} of 68 selected</span>
                <span>•</span>
                <span>Batch Run Scheduled: 16:00 EST</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">Paper Tray 1: Loaded (300 GSM)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[0.6875rem] text-on-surface-variant mr-2">Page 1 of 9</span>
                <button className="px-2 py-0.5 border border-outline-variant/40 bg-surface-container-lowest text-primary text-[0.6875rem] hover:bg-surface">
                  ← Prev
                </button>
                <button className="px-2 py-0.5 border border-outline-variant/40 bg-surface-container-lowest text-primary text-[0.6875rem] hover:bg-surface">
                  Next →
                </button>
              </div>
            </div>
          </div>

          {/* Quick Production Diagnostics Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 p-space-md shadow-sm">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2 mb-space-sm">
              <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-secondary" />
                Hardware &amp; Security Encoding Diagnostics
              </span>
              <span className="font-mono-data text-[0.6875rem] bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 font-bold uppercase">
                All Encoders Ready
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm text-body-sm font-mono-data">
              <div className="p-2 bg-surface-container-low border border-outline-variant/30">
                <div className="text-[0.6875rem] text-on-surface-variant uppercase font-semibold">
                  RFID Key Derivation
                </div>
                <div className="text-[0.8125rem] font-bold text-primary mt-0.5">
                  AES-128 Institutional SAM
                </div>
                <div className="text-[0.6875rem] text-secondary mt-1">SAM Sector 00-0F Locked</div>
              </div>
              <div className="p-2 bg-surface-container-low border border-outline-variant/30">
                <div className="text-[0.6875rem] text-on-surface-variant uppercase font-semibold">
                  Barcode Verification
                </div>
                <div className="text-[0.8125rem] font-bold text-primary mt-0.5">
                  Code-128 / Mod-103
                </div>
                <div className="text-[0.6875rem] text-emerald-700 mt-1">Optical Scan Check 100%</div>
              </div>
              <div className="p-2 bg-surface-container-low border border-outline-variant/30">
                <div className="text-[0.6875rem] text-on-surface-variant uppercase font-semibold">
                  Holographic Overlay
                </div>
                <div className="text-[0.8125rem] font-bold text-primary mt-0.5">
                  Apex PolyGuard 1.0 Mil
                </div>
                <div className="text-[0.6875rem] text-secondary mt-1">Lamination Heat: 165°C</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Studio Interactive Visualizer (5 Cols on xl) */}
        <div className="xl:col-span-5 flex flex-col space-y-space-md">
          {/* Studio Mode Switch Bar */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 p-2 flex items-center justify-between">
            <div className="flex items-center gap-1 font-mono-data">
              <button
                onClick={() => setStudioMode("single")}
                className={`px-3 py-1.5 font-label-md text-label-md uppercase tracking-wider font-bold transition-colors ${
                  studioMode === "single"
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                Single CR80 Studio
              </button>
              <button
                onClick={() => setStudioMode("sheet")}
                className={`px-3 py-1.5 font-label-md text-label-md uppercase tracking-wider font-bold transition-colors ${
                  studioMode === "sheet"
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                A4 Batch Sheet (8-Up)
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[0.6875rem] font-mono-data text-on-surface-variant">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>DPI 300 CMYK</span>
            </div>
          </div>

          {/* VIEW A: SINGLE CR80 DUAL STUDIO (FRONT & BACK) */}
          {studioMode === "single" && (
            <div className="flex flex-col space-y-space-md">
              {/* Badge Preset Selector */}
              <div className="bg-surface-container-lowest border border-outline-variant/40 p-space-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold">
                    Design Theme:
                  </span>
                  <button
                    onClick={() => setSelectedCardId("devina")}
                    className={`px-2.5 py-1 text-[0.75rem] font-mono-data uppercase font-bold flex items-center gap-1 ${
                      activeCard.role === "student"
                        ? "bg-[#173b65] text-white"
                        : "bg-surface text-on-surface border border-outline-variant/50 hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="w-2 h-2 bg-cyan-300"></span> Student (Navy)
                  </button>
                  <button
                    onClick={() => setSelectedCardId("sharma")}
                    className={`px-2.5 py-1 text-[0.75rem] font-mono-data uppercase font-bold flex items-center gap-1 ${
                      activeCard.role === "faculty"
                        ? "bg-[#7b1113] text-white"
                        : "bg-surface text-on-surface border border-outline-variant/50 hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="w-2 h-2 bg-[#7b1113]"></span> Faculty/Staff (Maroon)
                  </button>
                </div>
                <span className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                  Aspect: 54 × 85.6mm
                </span>
              </div>

              {/* Interactive CR80 Front & Back Cards Display */}
              <div className="bg-surface-container-low border border-outline-variant/40 p-space-lg flex flex-col items-center justify-center gap-space-lg relative overflow-hidden">
                {/* Background Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundSize: "16px 16px",
                    backgroundImage: "radial-gradient(#0d2545 1px, transparent 1px)"
                  }}
                ></div>

                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-space-lg relative z-10">
                  {/* CARD FRONT (CR80 Portrait Aspect Ratio ~ 230px x 364px) */}
                  <div className="flex flex-col items-center">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1 font-bold">
                      Front Face (Obverse)
                    </span>
                    <div className="w-[230px] h-[364px] bg-[#ffffff] border border-slate-400 shadow-xl relative overflow-hidden flex flex-col justify-between text-left select-none">
                      {/* Card Header */}
                      <div
                        className={`w-full p-3 text-white relative transition-colors ${
                          activeCard.role === "faculty" ? "bg-[#7b1113]" : "bg-[#173b65]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-white p-0.5 flex items-center justify-center border border-white/20 shrink-0">
                            <span
                              className={`text-[1.25rem] font-bold ${
                                activeCard.role === "faculty" ? "text-[#7b1113]" : "text-[#173b65]"
                              }`}
                            >
                              A
                            </span>
                          </div>
                          <div className="leading-tight">
                            <div className="font-headline-sm text-[0.625rem] font-bold tracking-tight uppercase leading-none">
                              Apex Institute of
                            </div>
                            <div
                              className={`font-mono-data text-[0.5rem] tracking-wider uppercase ${
                                activeCard.role === "faculty" ? "text-amber-200" : "text-cyan-200"
                              }`}
                            >
                              Tech &amp; Management
                            </div>
                          </div>
                        </div>
                        {/* Diagonal Accent Slash */}
                        <div
                          className={`absolute -bottom-2.5 right-0 w-16 h-5 transform -skew-y-6 ${
                            activeCard.role === "faculty" ? "bg-[#9e1c1e]" : "bg-[#3478c8]"
                          }`}
                        ></div>
                      </div>

                      {/* Credential Category Pill */}
                      <div className="px-3 pt-1 relative z-10 flex items-center justify-between">
                        <span
                          className={`font-mono-data text-[0.5625rem] font-extrabold uppercase px-2 py-0.5 tracking-wider ${
                            activeCard.role === "faculty"
                              ? "bg-[#7b1113] text-amber-200"
                              : "bg-[#173b65] text-cyan-200"
                          }`}
                        >
                          {activeCard.role === "faculty"
                            ? "Faculty & Academic Staff"
                            : "Student Identity Card"}
                        </span>
                        {/* Hologram Foil Simulation */}
                        <div
                          className="w-5 h-5 bg-gradient-to-tr from-amber-200 via-rose-300 to-cyan-300 border border-amber-300/80 shadow-inner flex items-center justify-center"
                          title="Micro-Hologram Foil Security Tag"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />
                        </div>
                      </div>

                      {/* Portrait Photo Box */}
                      <div className="px-3 py-1 flex items-center justify-center">
                        <div
                          className={`relative w-28 h-32 border-2 bg-slate-100 p-0.5 shadow-sm ${
                            activeCard.role === "faculty" ? "border-[#7b1113]" : "border-[#173b65]"
                          }`}
                        >
                          <img
                            src={activeCard.photo}
                            alt={activeCard.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Contactless Chip NFC Glyph */}
                          <div className="absolute bottom-1 right-1 bg-amber-400 text-slate-900 px-1 py-0.2 text-[0.5rem] font-mono font-bold flex items-center gap-0.5 border border-amber-600">
                            <Radio className="w-2.5 h-2.5" />
                            <span>NFC</span>
                          </div>
                        </div>
                      </div>

                      {/* Cardholder Primary Data Fields */}
                      <div className="px-3 py-1 text-center">
                        <div className="font-headline-sm text-[0.9375rem] font-bold text-[#0d2545] tracking-tight uppercase leading-tight">
                          {activeCard.name}
                        </div>
                        <div
                          className={`font-mono-data text-[0.625rem] font-semibold mt-0.5 leading-snug ${
                            activeCard.role === "faculty" ? "text-[#7b1113]" : "text-[#365f97]"
                          }`}
                        >
                          {activeCard.dept}
                        </div>
                      </div>

                      {/* Technical Details Matrix */}
                      <div className="px-3 pb-1">
                        <div className="bg-surface-container-low border border-slate-300 p-1.5 grid grid-cols-2 gap-x-2 gap-y-1 font-mono-data text-[0.5625rem]">
                          <div>
                            <span className="text-slate-500 uppercase block text-[0.5rem]">
                              Roll / ID No
                            </span>
                            <span className="font-bold text-slate-900">{activeCard.rollId}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 uppercase block text-[0.5rem]">
                              Blood Group
                            </span>
                            <span className="font-bold text-slate-900">{activeCard.bloodGroup}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 uppercase block text-[0.5rem]">
                              Academic Cohort
                            </span>
                            <span className="font-bold text-slate-900">{activeCard.validity}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 uppercase block text-[0.5rem]">
                              Card Serial
                            </span>
                            <span className="font-bold text-slate-900">{activeCard.serial}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Ground Bar */}
                      <div
                        className={`w-full h-3 transition-colors ${
                          activeCard.role === "faculty" ? "bg-[#7b1113]" : "bg-[#173b65]"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* CARD BACK (CR80 Reverse Face) */}
                  <div className="flex flex-col items-center">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1 font-bold">
                      Reverse Face (Barcode &amp; QR)
                    </span>
                    <div className="w-[230px] h-[364px] bg-[#ffffff] border border-slate-400 shadow-xl relative overflow-hidden flex flex-col justify-between p-3 text-left select-none font-mono-data">
                      {/* Institutional Instructions Header */}
                      <div className="border-b border-slate-300 pb-1">
                        <div className="text-[0.5625rem] font-bold text-slate-900 uppercase">
                          Emergency &amp; Institutional Contacts
                        </div>
                        <div className="text-[0.46875rem] text-slate-600 leading-tight mt-0.5">
                          Apex Technology Campus, Sector 4, Silicon Valley Hub.
                          <br />
                          Security Dispatch: +1 (555) 019-4820 • ims.apex.edu
                        </div>
                      </div>

                      {/* Scannable QR & Terms */}
                      <div className="flex items-center gap-2 py-1">
                        <div className="w-16 h-16 bg-white border border-slate-400 p-0.5 shrink-0 flex items-center justify-center">
                          <svg
                            className="w-full h-full text-slate-900"
                            fill="currentColor"
                            viewBox="0 0 100 100"
                          >
                            <rect fill="none" height="28" stroke="currentColor" strokeWidth="6" width="28" x="5" y="5" />
                            <rect height="12" width="12" x="13" y="13" />
                            <rect fill="none" height="28" stroke="currentColor" strokeWidth="6" width="28" x="67" y="5" />
                            <rect height="12" width="12" x="75" y="13" />
                            <rect fill="none" height="28" stroke="currentColor" strokeWidth="6" width="28" x="5" y="67" />
                            <rect height="12" width="12" x="13" y="75" />
                            <rect height="8" width="8" x="42" y="10" />
                            <rect height="14" width="8" x="52" y="24" />
                            <rect height="14" width="14" x="42" y="42" />
                            <rect height="6" width="10" x="62" y="42" />
                            <rect height="8" width="14" x="78" y="52" />
                            <rect height="22" width="8" x="42" y="62" />
                            <rect height="14" width="12" x="58" y="72" />
                            <rect height="16" width="16" x="76" y="76" />
                          </svg>
                        </div>
                        <div className="text-[0.46875rem] text-slate-600 space-y-0.5 leading-snug">
                          <div className="font-bold text-slate-900 uppercase">Cardholder Terms:</div>
                          <p>
                            This credential remains sole property of Apex Institute. Non-transferable.
                            Lost cards must be reported immediately.
                          </p>
                          <div className="text-primary font-bold">UID: {activeCard.rfidUid}:00</div>
                        </div>
                      </div>

                      {/* 1D Barcode Strip (Code 128 Simulation) */}
                      <div className="flex flex-col items-center bg-slate-50 border border-slate-200 py-1.5 px-2">
                        <div className="h-9 w-full flex items-stretch justify-center gap-[1.5px] px-1 bg-white">
                          <div className="w-1 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-1.5 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-2 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-1 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-1.5 bg-black"></div>
                          <div className="w-1 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-2 bg-black"></div>
                          <div className="w-1 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-1.5 bg-black"></div>
                          <div className="w-2 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-1 bg-black"></div>
                          <div className="w-1.5 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-1 bg-black"></div>
                          <div className="w-2 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-1 bg-black"></div>
                          <div className="w-1.5 bg-black"></div>
                          <div className="w-0.5 bg-black"></div>
                          <div className="w-2 bg-black"></div>
                          <div className="w-1 bg-black"></div>
                        </div>
                        <span className="text-[0.5625rem] font-bold text-slate-800 tracking-widest mt-1 leading-none">
                          {activeCard.barcode}
                        </span>
                      </div>

                      {/* Signatory Stamp */}
                      <div className="border-t border-slate-300 pt-1 flex items-end justify-between">
                        <div>
                          <span className="text-[0.46875rem] text-slate-500 uppercase block">
                            Guardian Emergency:
                          </span>
                          <span className="text-[0.5rem] font-bold text-slate-900">
                            +1 (555) 019-4820
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-serif italic text-[0.625rem] text-[#173b65] leading-none mb-0.5 font-bold tracking-tight">
                            M. Vance
                          </div>
                          <div className="text-[0.46875rem] text-slate-600 font-bold uppercase tracking-tighter border-t border-slate-400 pt-0.5">
                            Dean, Academic Affairs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Studio Toolbar */}
                <div className="w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-outline-variant/30 text-body-sm font-mono-data">
                  <div className="flex items-center gap-2 text-on-surface-variant text-[0.6875rem]">
                    <Sliders className="w-3.5 h-3.5 text-secondary" />
                    <span>Lamination: Dual PET-G • Color Match: PANTONE 288 C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => triggerToast("Re-computed cryptographic SHA-256 for QR Code.")}
                      className="px-3 py-1 bg-surface-container-lowest text-primary border border-outline-variant/60 font-label-md text-label-md uppercase tracking-wider hover:bg-surface transition-colors flex items-center gap-1"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Re-Hash QR</span>
                    </button>
                    <button
                      onClick={() => triggerToast(`Dispatching ${activeCard.name} to Fargo HDP5000 printer.`)}
                      className="px-3 py-1 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Single CR80</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW B: A4 MULTI-CARD BATCH PRINT SHEET STUDIO (8 CARDS DUPLEX GRID) */}
          {studioMode === "sheet" && (
            <div className="flex flex-col space-y-space-md">
              <div className="bg-surface-container-lowest border border-outline-variant/40 p-space-sm flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-label-md text-label-md uppercase font-bold text-primary block">
                    A4 Production Sheet (8-Up Duplex Grid)
                  </span>
                  <span className="font-mono-data text-[0.6875rem] text-on-surface-variant">
                    210 × 297 mm • 300 DPI • 4 × 2 Portrait Cards • Bleed 3mm • Trim Crop Marks Active
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono-data text-[0.6875rem]">
                  <span className="px-2 py-0.5 bg-primary text-on-primary uppercase font-bold">
                    Tray 1 Duplex
                  </span>
                  <button
                    onClick={() => triggerToast("Printer margin calibration check OK (0.00mm offset)")}
                    className="p-1 border border-outline-variant/50 hover:bg-surface"
                    title="Calibrate Margins"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sheet Canvas Representation with Cut Marks */}
              <div className="bg-slate-300 border border-outline-variant/50 p-space-md flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                {/* Scaled A4 Sheet (210 x 297) */}
                <div className="w-full max-w-[420px] bg-white border border-slate-400 shadow-2xl p-4 relative font-mono-data select-none">
                  {/* Corner Crosshairs */}
                  <div className="absolute top-1 left-1 text-[0.625rem] text-slate-500 font-mono leading-none">+</div>
                  <div className="absolute top-1 right-1 text-[0.625rem] text-slate-500 font-mono leading-none">+</div>
                  <div className="absolute bottom-1 left-1 text-[0.625rem] text-slate-500 font-mono leading-none">+</div>
                  <div className="absolute bottom-1 right-1 text-[0.625rem] text-slate-500 font-mono leading-none">+</div>

                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-2 text-[0.5rem] text-slate-600 uppercase">
                    <span>APEX IMS BATCH #9421 • TRAY 1 HEAVY CARDSTOCK 300GSM</span>
                    <span>CALIB: 0.00mm</span>
                  </div>

                  {/* 8-Up Mini Grid (4 rows x 2 cols) */}
                  <div className="grid grid-cols-2 gap-2 border border-dashed border-slate-300 p-1.5 relative">
                    {cardholders.map((card) => (
                      <div
                        key={card.id}
                        className="border border-slate-400 bg-white p-1 text-[0.4375rem] flex flex-col justify-between h-20 shadow-xs relative"
                      >
                        <div
                          className={`text-white p-0.5 flex justify-between items-center text-[0.375rem] ${
                            card.role === "faculty" ? "bg-[#7b1113]" : "bg-[#173b65]"
                          }`}
                        >
                          <span className="font-bold">APEX INSTITUTE</span>
                          <span className={card.role === "faculty" ? "text-amber-200" : "text-cyan-200"}>
                            {card.role === "faculty" ? "FACULTY" : "STUDENT"}
                          </span>
                        </div>
                        <div className="flex gap-1 items-center px-0.5">
                          <img
                            src={card.photo}
                            alt={card.name}
                            className="w-6 h-7 object-cover border border-slate-400 shrink-0"
                          />
                          <div className="leading-tight overflow-hidden">
                            <div className="font-bold text-slate-900 truncate uppercase">
                              {card.name}
                            </div>
                            <div className="text-[0.375rem] text-slate-600 truncate">
                              {card.rollId}
                            </div>
                            <div
                              className={`text-[0.375rem] font-semibold ${
                                card.role === "faculty" ? "text-[#7b1113]" : "text-[#173b65]"
                              }`}
                            >
                              {card.dept}
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-100 p-0.5 text-[0.375rem] flex justify-between text-slate-600">
                          <span>{card.validity}</span>
                          <span className="font-mono">{card.rfidUid.slice(0, 8)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trim Guideline Footnote */}
                  <div className="mt-2 pt-1 border-t border-slate-300 flex justify-between text-[0.4375rem] text-slate-500 uppercase">
                    <span>Guillotine Cut Target: 85.6 × 54.0 mm</span>
                    <span>Duplex Flip on Long Edge</span>
                  </div>
                </div>
              </div>

              {/* A4 Sheet Production Actions */}
              <div className="bg-surface-container-lowest border border-outline-variant/40 p-space-sm space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => triggerToast("Spooling 8-up sheet to thermal card printer...")}
                    className="flex-1 py-2 px-3 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 font-bold"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print A4 Sheet to Thermal Card Printer</span>
                  </button>
                  <button
                    onClick={() => triggerToast("Generating CMYK vector print PDF with bleed...")}
                    className="py-2 px-3 bg-surface-container-low text-primary border border-outline-variant/50 font-label-md text-label-md uppercase tracking-wider hover:bg-surface transition-colors flex items-center gap-1.5 font-bold"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Vector PDF (CMYK + Bleed)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Regulatory Audit & Compliance Box */}
          <div className="bg-surface-container-lowest border border-outline-variant/40 p-space-sm space-y-1 font-mono-data text-[0.6875rem]">
            <div className="flex items-center justify-between text-primary font-bold uppercase">
              <span>Security Compliance &amp; Custody</span>
              <span className="text-secondary">FERPA / GDPR SECURED</span>
            </div>
            <p className="text-on-surface-variant leading-snug">
              Batch transmission encrypted under TLS 1.3 to Fargo Industrial Host. Every credential
              issuance creates an immutable hash logged into the Campus Ledger.
            </p>
          </div>
        </div>
      </div>

      {/* MODAL: Issue Single ID Card */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-xl shadow-2xl flex flex-col overflow-hidden border border-outline-variant/40">
            {/* Header */}
            <div className="p-space-md bg-primary-container text-on-primary flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <CreditCard className="w-5 h-5 text-secondary-container" />
                <h3 className="font-headline-sm text-headline-sm uppercase tracking-wide font-bold">
                  Issue Single Smart ID Credential
                </h3>
              </div>
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="text-on-primary hover:opacity-80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-space-lg space-y-space-md max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                    Cardholder Full Name *
                  </label>
                  <input
                    type="text"
                    defaultValue="Kiran S. Verma"
                    className="w-full bg-surface border border-outline-variant/50 px-3 py-2 text-on-surface font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                    Credential Role *
                  </label>
                  <select className="w-full bg-surface border border-outline-variant/50 px-3 py-2 text-on-surface font-body-sm focus:outline-none focus:border-primary">
                    <option>Student (Undergraduate)</option>
                    <option>Student (Postgraduate / MBA)</option>
                    <option>Faculty &amp; Tenured Staff</option>
                    <option>Administrative Staff</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                    Roll / Employee ID *
                  </label>
                  <input
                    type="text"
                    defaultValue="APX-CS-2024-118"
                    className="w-full bg-surface border border-outline-variant/50 px-3 py-2 text-on-surface font-mono-data text-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                    Blood Group
                  </label>
                  <select className="w-full bg-surface border border-outline-variant/50 px-3 py-2 text-on-surface font-mono-data text-body-sm focus:outline-none focus:border-primary">
                    <option>O +VE</option>
                    <option>A +VE</option>
                    <option>B +VE</option>
                    <option>AB +VE</option>
                    <option>O -VE</option>
                    <option>A -VE</option>
                    <option>B -VE</option>
                    <option>AB -VE</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                    Department / Division
                  </label>
                  <input
                    type="text"
                    defaultValue="Computer Science & Engineering"
                    className="w-full bg-surface border border-outline-variant/50 px-3 py-2 text-on-surface font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm uppercase text-on-surface-variant mb-1">
                    Validity Period
                  </label>
                  <input
                    type="text"
                    defaultValue="2024 – 2028"
                    className="w-full bg-surface border border-outline-variant/50 px-3 py-2 text-on-surface font-mono-data text-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="p-3 bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="font-label-sm uppercase text-primary font-bold block">
                    Auto-Generate RFID UID &amp; Keys
                  </span>
                  <span className="text-on-surface-variant text-[0.75rem] font-mono-data">
                    UID: 04:78:E1:92:0C (DESFire 4K)
                  </span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>
            </div>

            {/* Footer */}
            <div className="p-space-md bg-surface flex items-center justify-end gap-2 border-t border-outline-variant/30">
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="px-4 py-2 bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsIssueModalOpen(false);
                  triggerToast("New ID Card queued for production run #9421.");
                }}
                className="px-4 py-2 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center gap-1.5 font-bold"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Issue &amp; Queue for Print</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-on-primary px-space-md py-space-sm shadow-xl flex items-center gap-space-sm border border-outline-variant/40">
          <CheckCircle2 className="w-5 h-5 text-secondary-container" />
          <span className="font-mono-data text-body-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

