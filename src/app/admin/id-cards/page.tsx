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
  Plus,
  Eye,
  SlidersHorizontal
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

const INITIAL_CARDHOLDERS: Cardholder[] = [
  {
    id: "devina",
    name: "Devina Mukherjee",
    role: "student",
    roleLabel: "Student (B.Tech)",
    rollId: "APX-CS-2025-002",
    dept: "Computer Science (Core)",
    validity: "2025–2029",
    rfidUid: "04:A2:8F:91:E2",
    status: "Queued",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "O +VE",
    serial: "CR80-884102",
    barcode: "*APX-CS-2025-002*"
  },
  {
    id: "aarav",
    name: "Aarav S. Patel",
    role: "student",
    roleLabel: "Student (B.Tech)",
    rollId: "APX-CS-2025-014",
    dept: "CSE (AI & Data Science)",
    validity: "2025–2029",
    rfidUid: "04:B5:11:7C:99",
    status: "Queued",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "B +VE",
    serial: "CR80-884114",
    barcode: "*APX-CS-2025-014*"
  },
  {
    id: "sharma",
    name: "Prof. Rajesh K. Sharma",
    role: "faculty",
    roleLabel: "Faculty & Dean",
    rollId: "APX-FAC-2018-042",
    dept: "Dept. of Computing",
    validity: "2024–2029",
    rfidUid: "04:99:3F:8A:10",
    status: "Active",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "B +VE",
    serial: "CR80-FAC-4019",
    barcode: "*APX-FAC-2018-042*"
  },
  {
    id: "sophia",
    name: "Sophia Devika Rao",
    role: "student",
    roleLabel: "Student (B.Tech)",
    rollId: "APX-CS-2025-089",
    dept: "Cloud Computing & DevOps",
    validity: "2025–2029",
    rfidUid: "04:F2:77:21:4A",
    status: "Queued",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "A +VE",
    serial: "CR80-884189",
    barcode: "*APX-CS-2025-089*"
  },
  {
    id: "alistair",
    name: "Dr. Alistair Chen",
    role: "faculty",
    roleLabel: "Senior Scientist",
    rollId: "APX-ADM-2020-019",
    dept: "Quantum Computing Labs",
    validity: "2024–2027",
    rfidUid: "04:61:9A:02:5D",
    status: "Active",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "AB +VE",
    serial: "CR80-FAC-2019",
    barcode: "*APX-ADM-2020-019*"
  },
  {
    id: "marcus",
    name: "Marcus V. Lindqvist",
    role: "student",
    roleLabel: "Student (B.Tech)",
    rollId: "APX-EC-2025-014",
    dept: "Electronics & Embedded Sys",
    validity: "2025–2029",
    rfidUid: "04:DD:54:19:8B",
    status: "Queued",
    photo:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "O -VE",
    serial: "CR80-884214",
    barcode: "*APX-EC-2025-014*"
  },
  {
    id: "aisha",
    name: "Aisha Zahra Khan",
    role: "student",
    roleLabel: "Student (MBA)",
    rollId: "APX-MBA-2025-102",
    dept: "School of Management",
    validity: "2025–2027",
    rfidUid: "04:EE:81:40:22",
    status: "Queued",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "B +VE",
    serial: "CR80-884302",
    barcode: "*APX-MBA-2025-102*"
  },
  {
    id: "elena",
    name: "Elena Chen",
    role: "faculty",
    roleLabel: "Assistant Professor",
    rollId: "APX-FAC-2021-088",
    dept: "Robotics & Automation",
    validity: "2024–2029",
    rfidUid: "04:12:88:AC:33",
    status: "Queued",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    bloodGroup: "A -VE",
    serial: "CR80-FAC-3088",
    barcode: "*APX-FAC-2021-088*"
  }
];

export default function IdCardManagementPage() {
  const [cardholders, setCardholders] = useState<Cardholder[]>(INITIAL_CARDHOLDERS);
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
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
    <div className="min-h-screen bg-slate-50/60 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-2 border border-slate-700">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* Header Hero Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">ID Cards &amp; Smart Badges</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Thermal Printer Node Online
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              CR80 dual-sided badges, contactless RFID/NFC encoding, and automated 8-up A4 production sheets.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => showToast("Exporting Card Registry as encrypted CSV...")}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Export Registry</span>
            </button>
            <button
              onClick={() => setStudioMode("sheet")}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border shadow-xs transition-all ${
                studioMode === "sheet"
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>A4 Batch Sheet (8-Up)</span>
            </button>
            <button
              onClick={() => setIsIssueModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Issue Single ID Card</span>
            </button>
          </div>
        </div>

        {/* 4 Standard Redesigned KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Active Badges */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Active Badges
              </span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                3,892
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Students: 3,450 • Faculty: 442</span>
                <span className="text-emerald-600 font-semibold">+14.2% YoY</span>
              </div>
            </div>
          </div>

          {/* Card 2: Pending Issuance Queue */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pending Print Queue
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Printer className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">68 Cards</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  Ready to print
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Batch &apos;25: 52 • Faculty: 16</span>
                <span className="text-indigo-600 font-semibold">Priority 1</span>
              </div>
            </div>
          </div>

          {/* Card 3: RFID / Hardware Health */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                RFID &amp; Access Health
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Radio className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">99.8%</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Healthy
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Turnstiles &amp; Labs Synced</span>
                <span className="text-emerald-600 font-semibold">0 Conflicts</span>
              </div>
            </div>
          </div>

          {/* Card 4: Damaged / Re-Issue Requests */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Re-Issue / Lost Requests
              </span>
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-rose-600 tabular-nums">12 Pending</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500">Lost: 8 • Chip Fault: 4</span>
                <button
                  onClick={() => setActiveTab("reissue")}
                  className="text-rose-600 hover:text-rose-700 hover:underline font-semibold"
                >
                  Review Re-Issues →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Strip & Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Tabs */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-medium overflow-x-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Cardholders (3,892)
              </button>
              <button
                onClick={() => setActiveTab("student")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === "student"
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Student Cards
              </button>
              <button
                onClick={() => setActiveTab("faculty")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === "faculty"
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Faculty &amp; Staff
              </button>
              <button
                onClick={() => setActiveTab("queue")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === "queue"
                    ? "bg-white text-amber-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Print Batch Queue (68)
              </button>
              <button
                onClick={() => setActiveTab("reissue")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  activeTab === "reissue"
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Re-Issue / Lost (12)
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Roll, RFID UID, Name..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-mono"
              />
            </div>
          </div>

          {/* Batch Action Bar */}
          <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedRows.length === cardholders.length}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
              />
              <span className="font-semibold text-slate-900">Selected: {selectedRows.length} Cards</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-mono">Capacity: 8-Up A4 Cardstock ready</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setStudioMode("sheet")}
                className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Send to A4 Sheet Studio</span>
              </button>
              <button
                onClick={() => showToast("Encoding MIFARE DESFire AES-128 keys to selected cards...")}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5 text-slate-500" />
                <span>Encode RFID Keys</span>
              </button>
              <button
                onClick={() => showToast("Marked 8 selected badges as Printed & Issued.")}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark Printed</span>
              </button>
            </div>
          </div>
        </div>

        {/* Split Screen (7 Cols Table vs 5 Cols Visualizer Studio) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* LEFT: Ledger Table (7 Cols) */}
          <div className="xl:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="p-3 w-8 text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.length === cardholders.length}
                          onChange={toggleSelectAll}
                          className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        />
                      </th>
                      <th className="py-3 px-3">Cardholder Detail</th>
                      <th className="py-3 px-3">Roll / Employee ID</th>
                      <th className="py-3 px-3">Program / Dept</th>
                      <th className="py-3 px-3">Valid Thru</th>
                      <th className="py-3 px-3">RFID UID</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
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
                          className={`cursor-pointer transition-colors ${
                            isSelectedInStudio
                              ? "bg-indigo-50/50 hover:bg-indigo-50/70 border-l-4 border-l-indigo-600"
                              : "hover:bg-slate-50/80"
                          }`}
                        >
                          <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleSelectRow(card.id)}
                              className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                            />
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={card.photo}
                                alt={card.name}
                                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                              <div>
                                <div className="font-semibold text-slate-900">{card.name}</div>
                                <div
                                  className={`text-[10px] font-bold uppercase ${
                                    card.role === "faculty" ? "text-rose-700" : "text-indigo-700"
                                  }`}
                                >
                                  {card.roleLabel}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                            {card.rollId}
                          </td>
                          <td className="py-2.5 px-3 truncate max-w-[120px] text-slate-600" title={card.dept}>
                            {card.dept}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 font-mono">
                            {card.validity}
                          </td>
                          <td className="py-2.5 px-3 font-mono text-indigo-600 text-[11px] whitespace-nowrap">
                            {card.rfidUid}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                card.status === "Queued"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : card.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                  : "bg-rose-50 text-rose-700 border-rose-200"
                              }`}
                            >
                              {card.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setSelectedCardId(card.id);
                                  setStudioMode("single");
                                }}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
                                title="Preview in Studio"
                              >
                                <Scan className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => showToast(`Printing single card for ${card.name}...`)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-slate-100 transition-colors"
                                title="Print Single"
                              >
                                <Printer className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50/80 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                <div>Showing 1 to {filteredCardholders.length} of 3,892 cardholders</div>
                <div className="flex items-center gap-1">
                  <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                    Prev
                  </button>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                    1
                  </span>
                  <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Hardware Diagnostics Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Hardware &amp; Security Encoding Diagnostics</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ALL ENCODERS ONLINE
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">RFID SAM Key Derivation</div>
                  <div className="font-mono font-bold text-slate-900 mt-1">AES-128 SAM v2</div>
                  <div className="text-emerald-600 text-[11px] font-medium mt-0.5">Sectors 00-0F Locked</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Barcode Verification</div>
                  <div className="font-mono font-bold text-slate-900 mt-1">Code-128 / Mod-103</div>
                  <div className="text-emerald-600 text-[11px] font-medium mt-0.5">Optical Scan Check 100%</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="text-slate-400 text-[10px] uppercase font-semibold">Holographic Overlay</div>
                  <div className="font-mono font-bold text-slate-900 mt-1">PolyGuard 1.0 Mil</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Heat: 165°C Dual PET-G</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Visualizer Studio (5 Cols) */}
          <div className="xl:col-span-5 space-y-4 sticky top-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Studio Switch Header */}
              <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
                <div className="inline-flex rounded-lg bg-indigo-700/60 p-0.5 text-xs font-semibold">
                  <button
                    onClick={() => setStudioMode("single")}
                    className={`px-3 py-1 rounded-md transition-all ${
                      studioMode === "single" ? "bg-white text-indigo-900 shadow-xs" : "text-indigo-100 hover:text-white"
                    }`}
                  >
                    Single CR80 Studio
                  </button>
                  <button
                    onClick={() => setStudioMode("sheet")}
                    className={`px-3 py-1 rounded-md transition-all ${
                      studioMode === "sheet" ? "bg-white text-indigo-900 shadow-xs" : "text-indigo-100 hover:text-white"
                    }`}
                  >
                    A4 Batch Sheet (8-Up)
                  </button>
                </div>
                <span className="text-[10px] font-mono text-indigo-200">300 DPI CMYK</span>
              </div>

              {/* VIEW 1: Single CR80 Dual View (Front & Back) */}
              {studioMode === "single" && (
                <div className="p-5 space-y-5 bg-white">
                  {/* Theme Switch */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Design Theme:
                    </span>
                    <div className="inline-flex rounded-lg p-0.5 bg-slate-100 text-xs font-semibold">
                      <button
                        onClick={() => setSelectedCardId("devina")}
                        className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                          activeCard.role === "student"
                            ? "bg-white text-indigo-900 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-indigo-900 inline-block" />
                        <span>Student (Navy)</span>
                      </button>
                      <button
                        onClick={() => setSelectedCardId("sharma")}
                        className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                          activeCard.role === "faculty"
                            ? "bg-white text-rose-900 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-900 inline-block" />
                        <span>Faculty (Maroon)</span>
                      </button>
                    </div>
                  </div>

                  {/* Dual Card Display */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-slate-100 p-4 rounded-xl border border-slate-200/80">
                    {/* Front Face */}
                    <div className="w-[200px] h-[316px] bg-white rounded-lg shadow-md border border-slate-300 relative overflow-hidden flex flex-col justify-between text-left select-none">
                      {/* Top Header Banner */}
                      <div
                        className={`p-2.5 text-white relative transition-colors ${
                          activeCard.role === "faculty" ? "bg-rose-900" : "bg-indigo-950"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 bg-white rounded flex items-center justify-center font-bold text-xs shrink-0">
                            <span className={activeCard.role === "faculty" ? "text-rose-900" : "text-indigo-950"}>
                              A
                            </span>
                          </div>
                          <div className="leading-tight">
                            <div className="font-bold text-[9px] uppercase leading-none">Apex Institute</div>
                            <div className="text-[7px] text-indigo-200 uppercase">Tech &amp; Management</div>
                          </div>
                        </div>
                      </div>

                      {/* Category Pill */}
                      <div className="px-2.5 pt-1 flex items-center justify-between">
                        <span
                          className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                            activeCard.role === "faculty"
                              ? "bg-rose-50 text-rose-800"
                              : "bg-indigo-50 text-indigo-800"
                          }`}
                        >
                          {activeCard.role === "faculty" ? "Faculty Badge" : "Student Card"}
                        </span>
                        <div className="w-4 h-4 rounded bg-gradient-to-tr from-amber-200 via-rose-300 to-cyan-300 border border-amber-300 flex items-center justify-center">
                          <ShieldCheck className="w-3 h-3 text-slate-800" />
                        </div>
                      </div>

                      {/* Photo */}
                      <div className="px-2.5 py-1 flex items-center justify-center">
                        <div className="relative w-22 h-26 rounded border-2 border-slate-300 overflow-hidden bg-slate-100">
                          <img src={activeCard.photo} alt={activeCard.name} className="w-full h-full object-cover" />
                          <div className="absolute bottom-1 right-1 bg-amber-400 text-slate-900 px-1 text-[7px] font-bold rounded flex items-center gap-0.5">
                            <Radio className="w-2 h-2" />
                            <span>NFC</span>
                          </div>
                        </div>
                      </div>

                      {/* Name & Dept */}
                      <div className="px-2.5 text-center">
                        <div className="font-bold text-xs text-slate-900 truncate uppercase leading-tight">
                          {activeCard.name}
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium truncate mt-0.5">
                          {activeCard.dept}
                        </div>
                      </div>

                      {/* Data Grid */}
                      <div className="px-2.5 pb-1">
                        <div className="bg-slate-50 rounded border border-slate-200 p-1.5 grid grid-cols-2 gap-x-1 gap-y-0.5 font-mono text-[8px]">
                          <div>
                            <span className="text-slate-400 uppercase block text-[7px]">ID No</span>
                            <span className="font-bold text-slate-800">{cardholders[0].rollId.split("-")[2] || "CS002"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 uppercase block text-[7px]">Blood</span>
                            <span className="font-bold text-slate-800">{activeCard.bloodGroup}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 uppercase block text-[7px]">Valid</span>
                            <span className="font-bold text-slate-800">{activeCard.validity.split("–")[1] || "2029"}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 uppercase block text-[7px]">Serial</span>
                            <span className="font-bold text-slate-800">{activeCard.serial.slice(-4)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Accent */}
                      <div className={`w-full h-2 ${activeCard.role === "faculty" ? "bg-rose-900" : "bg-indigo-950"}`} />
                    </div>

                    {/* Back Face */}
                    <div className="w-[200px] h-[316px] bg-white rounded-lg shadow-md border border-slate-300 relative overflow-hidden flex flex-col justify-between p-2.5 text-left select-none font-mono">
                      <div className="border-b border-slate-200 pb-1">
                        <div className="text-[8px] font-bold text-slate-900 uppercase">Emergency Contacts</div>
                        <div className="text-[7px] text-slate-500 leading-tight mt-0.5">
                          Apex Campus, North Wing Dispatch
                          <br />
                          +1 (555) 019-4820 • ims.apex.edu
                        </div>
                      </div>

                      <div className="flex items-center gap-2 py-1">
                        <div className="w-12 h-12 bg-white border border-slate-300 p-0.5 rounded shrink-0 flex items-center justify-center">
                          <QrCode className="w-10 h-10 text-slate-900" />
                        </div>
                        <div className="text-[7px] text-slate-500 leading-tight">
                          <div className="font-bold text-slate-800">Cardholder Terms:</div>
                          <p>Property of Apex IMS. Report lost cards immediately.</p>
                          <div className="text-indigo-600 font-bold mt-0.5">UID: {activeCard.rfidUid.slice(0, 8)}</div>
                        </div>
                      </div>

                      {/* Barcode Strip */}
                      <div className="flex flex-col items-center bg-slate-50 border border-slate-200 py-1 px-1 rounded">
                        <div className="h-7 w-full flex items-stretch justify-center gap-[1px] px-1 bg-white">
                          {[1, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 2, 1, 2, 3, 1, 2].map((w, idx) => (
                            <div key={idx} className="bg-slate-900" style={{ width: `${w}px` }} />
                          ))}
                        </div>
                        <span className="text-[7px] font-bold text-slate-700 tracking-widest mt-0.5">
                          {activeCard.barcode}
                        </span>
                      </div>

                      {/* Signature Block */}
                      <div className="border-t border-slate-200 pt-1 flex items-end justify-between text-[7px]">
                        <div>
                          <span className="text-slate-400 block">Guardian:</span>
                          <span className="font-bold text-slate-800">+1 555-019-4820</span>
                        </div>
                        <div className="text-right">
                          <div className="font-serif italic text-[9px] text-indigo-950 font-bold leading-none">
                            M. Vance
                          </div>
                          <div className="text-slate-500 font-semibold border-t border-slate-300 pt-0.5 mt-0.5">
                            Dean of Academic Affairs
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => showToast("Re-computed cryptographic SHA-256 for QR Code.")}
                      className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5 text-slate-500" />
                      <span>Re-Hash QR</span>
                    </button>
                    <button
                      onClick={() => showToast(`Dispatching ${activeCard.name} to Fargo HDP5000 printer.`)}
                      className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Single CR80</span>
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 2: A4 Batch Sheet (8-Up) */}
              {studioMode === "sheet" && (
                <div className="p-5 space-y-4 bg-white">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xs font-bold text-slate-900">A4 Production Sheet (8-Up Grid)</div>
                      <div className="text-[11px] text-slate-500">210 × 297 mm • 300 DPI • Trim crop marks active</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                      Tray 1 Duplex
                    </span>
                  </div>

                  {/* Scaled Sheet View */}
                  <div className="bg-slate-200 p-4 rounded-xl flex items-center justify-center">
                    <div className="w-full max-w-[360px] bg-white rounded shadow-lg p-3 relative font-mono select-none border border-slate-300">
                      <div className="flex items-center justify-between text-[7px] text-slate-400 pb-1 mb-2 border-b border-slate-200">
                        <span>APEX IMS BATCH #9421 • HEAVY CARDSTOCK 300GSM</span>
                        <span>0.00mm CUT TRIM</span>
                      </div>

                      {/* 8-Up Mini Grid */}
                      <div className="grid grid-cols-2 gap-1.5 p-1 border border-dashed border-slate-300 rounded">
                        {cardholders.map((c) => (
                          <div
                            key={c.id}
                            className="border border-slate-300 bg-white p-1 rounded-xs flex flex-col justify-between h-18 text-[6px]"
                          >
                            <div
                              className={`text-white px-1 py-0.5 flex justify-between font-bold rounded-xs ${
                                c.role === "faculty" ? "bg-rose-900" : "bg-indigo-950"
                              }`}
                            >
                              <span>APEX IMS</span>
                              <span>{c.role === "faculty" ? "FAC" : "STD"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <img src={c.photo} alt={c.name} className="w-5 h-6 object-cover rounded-xs" />
                              <div className="truncate">
                                <div className="font-bold text-slate-900 truncate">{c.name}</div>
                                <div className="text-slate-500 truncate">{c.rollId}</div>
                              </div>
                            </div>
                            <div className="flex justify-between text-slate-400 text-[5px] border-t border-slate-100 pt-0.5">
                              <span>{c.validity}</span>
                              <span>{c.rfidUid.slice(0, 5)}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 text-center text-[7px] text-slate-400">
                        Guillotine Cut Target: 85.6 × 54.0 mm (ISO/IEC 7810 CR80)
                      </div>
                    </div>
                  </div>

                  {/* Sheet Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => showToast("Spooling 8-up sheet to thermal card printer...")}
                      className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print A4 Sheet</span>
                    </button>
                    <button
                      onClick={() => showToast("Generating CMYK vector print PDF with bleed...")}
                      className="py-2 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Issue Single ID Card */}
      {isIssueModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">Issue Smart ID Card</h3>
              </div>
              <button
                onClick={() => setIsIssueModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    defaultValue="Kiran S. Verma"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Credential Role *
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                    <option>Student (Undergraduate)</option>
                    <option>Student (Postgraduate / MBA)</option>
                    <option>Faculty &amp; Tenured Staff</option>
                    <option>Administrative Staff</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Roll / Employee ID *
                  </label>
                  <input
                    type="text"
                    defaultValue="APX-CS-2025-118"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Blood Group
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-medium text-slate-900 cursor-pointer">
                    <option>O +VE</option>
                    <option>A +VE</option>
                    <option>B +VE</option>
                    <option>AB +VE</option>
                    <option>O -VE</option>
                    <option>A -VE</option>
                    <option>B -VE</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Department / Division
                  </label>
                  <input
                    type="text"
                    defaultValue="Computer Science & Engineering"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Validity Period
                  </label>
                  <input
                    type="text"
                    defaultValue="2025 – 2029"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-indigo-900 text-xs">Auto-Generate RFID UID &amp; SAM Keys</div>
                  <div className="text-[11px] text-indigo-700 font-mono">UID: 04:78:E1:92:0C (DESFire 4K)</div>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsIssueModalOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsIssueModalOpen(false);
                    showToast("New ID Card queued for production run #9421.");
                  }}
                  className="py-2 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Issue &amp; Queue Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
