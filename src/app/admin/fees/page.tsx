"use client";

import { useState } from "react";
import {
  CreditCard,
  Receipt,
  Download,
  Search,
  Filter,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Building,
  Smartphone,
  Landmark,
  X,
  Printer,
  MessageSquare,
  FileSpreadsheet,
  Check,
  ChevronRight,
  ExternalLink,
  Plus,
  Coins
} from "lucide-react";

interface FeeTransaction {
  id: string;
  receiptNo: string;
  date: string;
  time: string;
  studentName: string;
  rollId: string;
  course: string;
  batch: string;
  feeHead: string;
  amount: number;
  mode: string;
  modeType: "upi" | "cash" | "cheque" | "card" | "neft";
  collector: string;
  status: "Cleared" | "Pending Bank Clearance";
}

const initialTransactions: FeeTransaction[] = [
  {
    id: "tx-1",
    receiptNo: "REC-2024-1049",
    date: "Oct 24, 2024",
    time: "14:28",
    studentName: "Ethan Vance Walker",
    rollId: "APEX-ENG-2022-094",
    course: "B.Tech Computer Science",
    batch: "Batch 2022-26 • Sec-B",
    feeHead: "Sem 5 Tuition",
    amount: 4250.0,
    mode: "UPI (UTR-8491)",
    modeType: "upi",
    collector: "R. Hendricks (Desk-01)",
    status: "Cleared"
  },
  {
    id: "tx-2",
    receiptNo: "REC-2024-1048",
    date: "Oct 24, 2024",
    time: "13:50",
    studentName: "Priya S. Nambiar",
    rollId: "APEX-MGT-2023-018",
    course: "MBA Executive Strategy",
    batch: "Batch 2023-25 • Div-A",
    feeHead: "Lab & Library",
    amount: 1100.0,
    mode: "Counter Cash",
    modeType: "cash",
    collector: "M. Vance (Dean Bursar)",
    status: "Cleared"
  },
  {
    id: "tx-3",
    receiptNo: "REC-2024-1047",
    date: "Oct 24, 2024",
    time: "11:15",
    studentName: "Devon Marcus Lee",
    rollId: "APEX-ENG-2021-304",
    course: "B.Tech Mechanical Robotics",
    batch: "Batch 2021-25 • Sec-C",
    feeHead: "Semester 7 Tuition",
    amount: 5800.0,
    mode: "Cheque #492811",
    modeType: "cheque",
    collector: "R. Hendricks (Desk-01)",
    status: "Pending Bank Clearance"
  },
  {
    id: "tx-4",
    receiptNo: "REC-2024-1046",
    date: "Oct 24, 2024",
    time: "09:40",
    studentName: "Kavita R. Nair",
    rollId: "APEX-DES-2024-012",
    course: "B.Des Interaction Architecture",
    batch: "Batch 2024-28 • Div-A",
    feeHead: "Examination & Studio",
    amount: 650.0,
    mode: "POS Terminal #04",
    modeType: "card",
    collector: "S. Jenkins (Bursar Aux)",
    status: "Cleared"
  },
  {
    id: "tx-5",
    receiptNo: "REC-2024-1045",
    date: "Oct 23, 2024",
    time: "16:45",
    studentName: "Liam A. Gallagher",
    rollId: "APEX-ENG-2023-149",
    course: "B.Tech Civil Engineering",
    batch: "Batch 2023-27 • Sec-A",
    feeHead: "Sem 3 Tuition",
    amount: 2400.0,
    mode: "NEFT/RTGS",
    modeType: "neft",
    collector: "R. Hendricks (Desk-01)",
    status: "Cleared"
  }
];

export default function FeesManagementPage() {
  const [transactions, setTransactions] = useState<FeeTransaction[]>(initialTransactions);
  const [activeTab, setActiveTab] = useState<"all" | "defaulters" | "schedule" | "reconcile">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<FeeTransaction | null>(null);

  // Drawer Payment Form State
  const [drawerMode, setDrawerMode] = useState<"cash" | "upi" | "card" | "neft" | "cheque">("cash");
  const [selectedHeads, setSelectedHeads] = useState<{ [key: string]: boolean }>({
    tuition: true,
    lab: true,
    exam: true
  });
  const [discount, setDiscount] = useState(0);
  const [fine, setFine] = useState(0);
  const [autoOpenReceipt, setAutoOpenReceipt] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const headPrices = {
    tuition: 3800,
    lab: 350,
    exam: 100
  };

  const calculateTotal = () => {
    let sub = 0;
    if (selectedHeads.tuition) sub += headPrices.tuition;
    if (selectedHeads.lab) sub += headPrices.lab;
    if (selectedHeads.exam) sub += headPrices.exam;
    return Math.max(0, sub - discount + fine);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const handleCommitPayment = () => {
    const netAmount = calculateTotal();
    const newTx: FeeTransaction = {
      id: `tx-${Date.now()}`,
      receiptNo: `REC-2024-${1050 + transactions.length}`,
      date: "Oct 24, 2024",
      time: "15:02",
      studentName: "Ethan Vance Walker",
      rollId: "APEX-ENG-2022-094",
      course: "B.Tech Computer Science",
      batch: "Batch 2022-26 • Sec-B",
      feeHead: "Sem 5 Tuition & Labs",
      amount: netAmount,
      mode: drawerMode.toUpperCase(),
      modeType: drawerMode,
      collector: "R. Hendricks (Desk-01)",
      status: "Cleared"
    };

    setTransactions([newTx, ...transactions]);
    setIsDrawerOpen(false);
    triggerToast(`Payment recorded to ledger. Voucher #${newTx.receiptNo}`);

    if (autoOpenReceipt) {
      setTimeout(() => {
        setActiveReceipt(newTx);
        setIsReceiptModalOpen(true);
      }, 400);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTab === "defaulters") {
      return tx.status === "Pending Bank Clearance";
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tx.receiptNo.toLowerCase().includes(q) ||
        tx.studentName.toLowerCase().includes(q) ||
        tx.rollId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full font-body-md text-on-surface">
      {/* Top Context & Action Command Bar */}
      <section className="bg-surface-container-lowest shadow-sm px-gutter-desktop py-space-md flex flex-wrap items-center justify-between gap-space-md border-b border-outline-variant/30">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm uppercase tracking-wider">
            <span>Institutional Bursar Office</span>
            <span>/</span>
            <span className="text-secondary font-semibold">Treasury &amp; General Ledger</span>
            <span>/</span>
            <span className="text-on-surface">AY 2024-25 Series</span>
          </div>
          <div className="flex items-center gap-space-sm mt-0.5">
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight uppercase font-bold">
              Fees Management &amp; Fiscal Ledger
            </h1>
            <span className="inline-flex items-center px-space-xs py-0.5 bg-surface-container font-mono-data text-label-sm text-secondary uppercase font-semibold">
              Live Clearing
            </span>
          </div>
        </div>

        {/* Action Toolset */}
        <div className="flex items-center gap-space-sm flex-wrap font-mono-data">
          <button
            onClick={() => setIsStructureModalOpen(true)}
            className="inline-flex items-center gap-space-xs px-space-md py-2 bg-surface-container-low text-on-surface font-label-md uppercase tracking-wider hover:bg-surface-container transition-colors shadow-sm border border-outline-variant/40"
          >
            <Sliders className="w-4 h-4 text-secondary" />
            <span>Fee Structures</span>
          </button>
          <button
            onClick={() => triggerToast("Preparing Tally XML & Consolidated Ledger (.xlsx)...")}
            className="inline-flex items-center gap-space-xs px-space-md py-2 bg-surface-container-low text-on-surface font-label-md uppercase tracking-wider hover:bg-surface-container transition-colors shadow-sm border border-outline-variant/40"
          >
            <Download className="w-4 h-4 text-secondary" />
            <span>Export Tally / CSV</span>
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-space-xs px-space-lg py-2 bg-primary-container text-on-primary font-label-md uppercase tracking-wider hover:bg-primary transition-all shadow-md font-bold"
          >
            <Coins className="w-4 h-4 text-secondary-container" />
            <span>Record Manual Payment</span>
          </button>
        </div>
      </section>

      {/* KPI Summary Matrix (4 Tiles) */}
      <section className="p-gutter-desktop grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter-desktop">
        {/* Tile 1 */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Total Projected Revenue
            </span>
            <Landmark className="w-5 h-5 text-secondary" />
          </div>
          <div className="my-space-sm">
            <div className="font-headline-xl text-headline-xl text-primary leading-none tabular-nums font-bold">
              $3,850,000
            </div>
            <div className="font-mono-data text-body-sm text-on-surface-variant mt-1.5 flex items-center gap-1">
              <span className="text-secondary font-semibold">1,420</span> enrolled students baseline
            </div>
          </div>
          <div className="pt-space-xs bg-surface-container-low px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm border-t border-outline-variant/20">
            <span>SESSION: AY 2024-2025</span>
            <span className="font-mono-data text-primary font-bold">100% QUOTA</span>
          </div>
        </div>

        {/* Tile 2 */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Total Collected To Date
            </span>
            <CheckCircle2 className="w-5 h-5 text-secondary" />
          </div>
          <div className="my-space-sm">
            <div className="font-headline-xl text-headline-xl text-primary leading-none tabular-nums font-bold">
              $3,210,000
            </div>
            <div className="font-mono-data text-body-sm text-on-surface-variant mt-1.5 flex items-center gap-1.5">
              <span className="px-1 py-0.2 bg-secondary-container/40 text-on-secondary-container font-bold font-mono-data text-label-sm">
                83.37%
              </span>
              <span>cleared to Central Treasury</span>
            </div>
          </div>
          <div className="w-full bg-surface-container h-1.5 overflow-hidden">
            <div className="bg-secondary h-full" style={{ width: "83.37%" }}></div>
          </div>
        </div>

        {/* Tile 3 */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-700"></div>
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Overdue Outstanding Dues
            </span>
            <AlertTriangle className="w-5 h-5 text-rose-700" />
          </div>
          <div className="my-space-sm">
            <div className="font-headline-xl text-headline-xl text-rose-700 leading-none tabular-nums font-bold">
              $640,000
            </div>
            <div className="font-mono-data text-body-sm text-on-surface-variant mt-1.5 flex items-center gap-1">
              <span className="px-1 py-0.2 bg-rose-100 text-rose-900 font-bold font-mono-data text-label-sm">
                210 Students
              </span>
              <span>past due cutoff</span>
            </div>
          </div>
          <div className="pt-space-xs bg-rose-50 px-space-sm py-1 flex items-center justify-between text-rose-700 font-label-sm border-t border-rose-200">
            <span className="font-bold">ACTION NEEDED</span>
            <button
              onClick={() => setActiveTab("defaulters")}
              className="underline font-semibold hover:text-rose-900"
            >
              Filter Ledger
            </button>
          </div>
        </div>

        {/* Tile 4 */}
        <div className="bg-surface-container-lowest p-space-md shadow-sm relative overflow-hidden flex flex-col justify-between border border-outline-variant/30">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex items-start justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
              Today&apos;s Counter Collection
            </span>
            <Receipt className="w-5 h-5 text-primary" />
          </div>
          <div className="my-space-sm">
            <div className="font-headline-xl text-headline-xl text-primary leading-none tabular-nums font-bold">
              $14,200
            </div>
            <div className="font-mono-data text-body-sm text-on-surface-variant mt-1.5 flex items-center gap-1">
              <span className="font-bold text-primary">18 Receipts</span> logged by counter staff
            </div>
          </div>
          <div className="pt-space-xs bg-surface-container-low px-space-sm py-1 flex items-center justify-between text-on-surface-variant font-label-sm border-t border-outline-variant/20">
            <span>DAILY REGISTER CLOSING</span>
            <span className="font-mono-data text-secondary font-semibold">17:00 EST</span>
          </div>
        </div>
      </section>

      {/* Ledger Operational Console */}
      <section className="px-gutter-desktop pb-gutter-desktop">
        <div className="bg-surface-container-lowest shadow-sm border border-outline-variant/30">
          {/* Toolbar & Subtabs */}
          <div className="bg-surface-container-low px-space-md py-space-sm flex flex-wrap items-center justify-between gap-space-md border-b border-outline-variant/30">
            {/* Segmented Tab Group */}
            <div className="inline-flex bg-surface-container shadow-inner p-0.5 font-mono-data">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-space-md py-1.5 font-label-md uppercase tracking-wider text-label-sm font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-primary-container text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                All Transactions (1,842)
              </button>
              <button
                onClick={() => {
                  setActiveTab("defaulters");
                  triggerToast("Loaded 210 overdue defaulter accounts for follow-up.");
                }}
                className={`px-space-md py-1.5 font-label-md uppercase tracking-wider text-label-sm font-semibold transition-all ${
                  activeTab === "defaulters"
                    ? "bg-primary-container text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Pending Dues / Defaulters (210)
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`px-space-md py-1.5 font-label-md uppercase tracking-wider text-label-sm font-semibold transition-all ${
                  activeTab === "schedule"
                    ? "bg-primary-container text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Installment Schedule
              </button>
              <button
                onClick={() => {
                  setActiveTab("reconcile");
                  triggerToast("Tally / Central Bank statement matched: 99.4%");
                }}
                className={`px-space-md py-1.5 font-label-md uppercase tracking-wider text-label-sm font-semibold transition-all ${
                  activeTab === "reconcile"
                    ? "bg-primary-container text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Bank Reconciliation
              </button>
            </div>

            {/* Rapid Filter Search Bar */}
            <div className="flex items-center gap-space-sm flex-1 max-w-lg min-w-[280px]">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-on-surface-variant absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by Receipt No, Roll ID, or Student name..."
                  className="w-full bg-surface-container-lowest pl-8 pr-space-md py-1.5 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 shadow-inner focus:outline-none focus:bg-surface-bright border border-outline-variant/40"
                />
              </div>
              <button className="px-space-sm py-1.5 bg-surface text-on-surface-variant hover:text-on-surface shadow-sm inline-flex items-center gap-1 font-label-sm uppercase border border-outline-variant/40">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Multi-Head Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono-data text-[0.75rem]">
              <thead>
                <tr className="bg-surface-container font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/30">
                  <th className="py-2.5 px-space-md font-semibold">Receipt No</th>
                  <th className="py-2.5 px-space-md font-semibold">Date &amp; Time</th>
                  <th className="py-2.5 px-space-md font-semibold">Student / Identifier</th>
                  <th className="py-2.5 px-space-md font-semibold">Course &amp; Batch</th>
                  <th className="py-2.5 px-space-md font-semibold">Fee Head</th>
                  <th className="py-2.5 px-space-md font-semibold text-right">Amount Paid</th>
                  <th className="py-2.5 px-space-md font-semibold">Mode</th>
                  <th className="py-2.5 px-space-md font-semibold">Collector (Staff)</th>
                  <th className="py-2.5 px-space-md font-semibold">Status</th>
                  <th className="py-2.5 px-space-md font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-surface-container-low transition-colors bg-surface-container-lowest"
                  >
                    <td className="py-2.5 px-space-md font-bold text-primary">
                      #{tx.receiptNo}
                    </td>
                    <td className="py-2.5 px-space-md text-on-surface-variant whitespace-nowrap">
                      {tx.date} <span className="text-on-surface-variant/60 text-[0.6875rem]">{tx.time}</span>
                    </td>
                    <td className="py-2.5 px-space-md">
                      <div className="font-semibold text-on-surface text-[0.8125rem]">
                        {tx.studentName}
                      </div>
                      <div className="text-[0.6875rem] text-on-surface-variant">
                        {tx.rollId}
                      </div>
                    </td>
                    <td className="py-2.5 px-space-md">
                      <div className="text-on-surface">{tx.course}</div>
                      <div className="text-[0.6875rem] text-on-surface-variant">{tx.batch}</div>
                    </td>
                    <td className="py-2.5 px-space-md">
                      <span className="inline-block px-1.5 py-0.5 bg-surface-container text-[0.6875rem] text-primary font-semibold">
                        {tx.feeHead}
                      </span>
                    </td>
                    <td className="py-2.5 px-space-md text-right font-bold text-primary">
                      ${tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-space-md">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-surface-container-high text-on-secondary-container font-label-sm uppercase font-semibold text-[0.6875rem]">
                        {tx.modeType === "upi" && <Smartphone className="w-3 h-3" />}
                        {tx.modeType === "cash" && <Coins className="w-3 h-3" />}
                        {tx.modeType === "card" && <CreditCard className="w-3 h-3" />}
                        {tx.modeType === "neft" && <Landmark className="w-3 h-3" />}
                        {tx.modeType === "cheque" && <Receipt className="w-3 h-3" />}
                        {tx.mode}
                      </span>
                    </td>
                    <td className="py-2.5 px-space-md text-on-surface-variant text-[0.6875rem]">
                      {tx.collector}
                    </td>
                    <td className="py-2.5 px-space-md">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[0.6875rem] uppercase font-bold border ${
                          tx.status === "Cleared"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-amber-50 text-amber-800 border-amber-300"
                        }`}
                      >
                        {tx.status === "Cleared" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Clock className="w-3 h-3 text-amber-600" />
                        )}
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-space-md text-center whitespace-nowrap">
                      <button
                        onClick={() => {
                          setActiveReceipt(tx);
                          setIsReceiptModalOpen(true);
                        }}
                        className="p-1 hover:bg-surface-container text-primary transition-colors inline-block"
                        title="Print Receipt Preview"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          triggerToast(
                            `SMS payment notification dispatched to ${tx.studentName} (${tx.rollId})`
                          )
                        }
                        className="p-1 hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors inline-block"
                        title="SMS Delivery Dispatch"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Audit Pagination & Telemetry */}
          <div className="px-space-md py-space-sm bg-surface-container-low flex flex-wrap items-center justify-between gap-space-md font-mono-data text-[0.6875rem] text-on-surface-variant border-t border-outline-variant/30">
            <div className="flex items-center gap-space-md">
              <span>PAGE 01 / 92</span>
              <span>•</span>
              <span>DISPLAYING {filteredTransactions.length} OF 1,842 AUDITED SLIPS</span>
              <span>•</span>
              <span className="text-secondary font-semibold">TALLY XML SYNC READY</span>
            </div>
            <div className="inline-flex gap-0.5">
              <button className="px-space-sm py-1 bg-surface-container hover:bg-surface text-primary font-bold">
                PREV
              </button>
              <button className="px-space-sm py-1 bg-primary-container text-on-primary font-bold">
                01
              </button>
              <button className="px-space-sm py-1 bg-surface-container hover:bg-surface text-primary">
                02
              </button>
              <button className="px-space-sm py-1 bg-surface-container hover:bg-surface text-primary">
                03
              </button>
              <button className="px-space-sm py-1 bg-surface-container hover:bg-surface text-primary font-bold">
                NEXT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DRAWER: Direct Manual Payment Entry Slip (Back-Office) */}
      {isDrawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <aside className="fixed top-0 right-0 h-full w-full max-w-2xl bg-surface-container-lowest shadow-2xl z-50 flex flex-col border-l border-outline-variant/40">
            {/* Header */}
            <div className="px-gutter-desktop py-space-md bg-primary-container text-on-primary flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <Coins className="w-6 h-6 text-secondary-container" />
                <div>
                  <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight font-bold">
                    Manual Payment Entry Slip
                  </h2>
                  <p className="font-label-sm text-on-primary-container uppercase tracking-wider text-[0.6875rem]">
                    Apex Treasury Ledger • Counter Terminal #01
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 hover:bg-primary text-on-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-gutter-desktop space-y-space-lg bg-surface">
              {/* 1. Student Search Auto-Populate */}
              <div className="bg-surface-container-lowest p-space-md shadow-sm space-y-space-sm border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    1. Student Identification / Lookup
                  </label>
                  <span className="font-mono-data text-label-sm text-secondary font-bold text-[0.6875rem]">
                    AUTO-LOOKUP ACTIVE
                  </span>
                </div>
                <div className="relative">
                  <User className="w-4 h-4 text-on-surface-variant absolute left-3 top-3" />
                  <input
                    type="text"
                    defaultValue="APEX-ENG-2022-094"
                    className="w-full bg-surface-container-low pl-10 pr-space-md py-2 font-mono-data text-body-md text-primary font-semibold focus:outline-none focus:bg-surface-bright shadow-inner border border-outline-variant/40"
                  />
                </div>
                {/* Populated Snapshot */}
                <div className="bg-surface-container-low p-space-sm mt-space-sm flex items-start justify-between border border-outline-variant/20">
                  <div>
                    <div className="font-headline-sm text-body-md font-bold text-primary">
                      Ethan Vance Walker
                    </div>
                    <div className="font-mono-data text-label-sm text-on-surface-variant text-[0.75rem]">
                      B.Tech Computer Science • Batch 2022-26 (Sem 5)
                    </div>
                    <div className="text-label-sm text-on-surface-variant mt-1 text-[0.75rem]">
                      Father: Marcus Vance Walker • Ph: +1 (555) 019-4820
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-rose-700 font-bold text-[0.6875rem]">
                      Total Dues Pending
                    </span>
                    <div className="font-headline-sm text-headline-sm text-rose-700 font-bold tabular-nums">
                      $4,250.00
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Fee Head & Installment Allocation */}
              <div className="bg-surface-container-lowest p-space-md shadow-sm space-y-space-sm border border-outline-variant/30">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  2. Fee Head &amp; Installment Allocation
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-space-sm bg-surface hover:bg-surface-container-low cursor-pointer transition-colors border border-outline-variant/20">
                    <div className="flex items-center gap-space-sm">
                      <input
                        type="checkbox"
                        checked={selectedHeads.tuition}
                        onChange={(e) =>
                          setSelectedHeads({ ...selectedHeads, tuition: e.target.checked })
                        }
                        className="w-4 h-4 accent-primary"
                      />
                      <div>
                        <div className="font-semibold text-primary text-[0.8125rem]">
                          Semester 5 Tuition Fee (Core)
                        </div>
                        <div className="text-[0.6875rem] text-on-surface-variant">
                          Due Date: Oct 15, 2024 (Overdue by 9 days)
                        </div>
                      </div>
                    </div>
                    <span className="font-mono-data text-body-md font-bold text-primary">
                      ${headPrices.tuition.toFixed(2)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-space-sm bg-surface hover:bg-surface-container-low cursor-pointer transition-colors border border-outline-variant/20">
                    <div className="flex items-center gap-space-sm">
                      <input
                        type="checkbox"
                        checked={selectedHeads.lab}
                        onChange={(e) =>
                          setSelectedHeads({ ...selectedHeads, lab: e.target.checked })
                        }
                        className="w-4 h-4 accent-primary"
                      />
                      <div>
                        <div className="font-semibold text-primary text-[0.8125rem]">
                          Advanced Computer Lab &amp; Cloud Sandbox
                        </div>
                        <div className="text-[0.6875rem] text-on-surface-variant">
                          Regular Academic Levy
                        </div>
                      </div>
                    </div>
                    <span className="font-mono-data text-body-md font-bold text-primary">
                      ${headPrices.lab.toFixed(2)}
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-space-sm bg-surface hover:bg-surface-container-low cursor-pointer transition-colors border border-outline-variant/20">
                    <div className="flex items-center gap-space-sm">
                      <input
                        type="checkbox"
                        checked={selectedHeads.exam}
                        onChange={(e) =>
                          setSelectedHeads({ ...selectedHeads, exam: e.target.checked })
                        }
                        className="w-4 h-4 accent-primary"
                      />
                      <div>
                        <div className="font-semibold text-primary text-[0.8125rem]">
                          Mid-Term Examination &amp; Evaluation Fee
                        </div>
                        <div className="text-[0.6875rem] text-on-surface-variant">
                          Autonomous Examination Controller
                        </div>
                      </div>
                    </div>
                    <span className="font-mono-data text-body-md font-bold text-primary">
                      ${headPrices.exam.toFixed(2)}
                    </span>
                  </label>
                </div>
              </div>

              {/* 3. Back-Office Payment Instrument Mode */}
              <div className="bg-surface-container-lowest p-space-md shadow-sm space-y-space-md border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    3. Counter Payment Instrument
                  </label>
                  <span className="font-mono-data text-label-sm text-on-surface-variant text-[0.6875rem]">
                    STRICTLY NON-GATEWAY (LEDGER RECORDING)
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5 font-mono-data">
                  {(["cash", "upi", "card", "neft", "cheque"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDrawerMode(mode)}
                      className={`py-2 px-1 text-center font-label-sm uppercase font-semibold text-[0.75rem] transition-colors ${
                        drawerMode === mode
                          ? "bg-primary-container text-on-primary font-bold"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Conditional Fields */}
                <div className="p-space-sm bg-surface-container-low space-y-space-sm border border-outline-variant/20">
                  {drawerMode === "cash" && (
                    <div className="flex items-center justify-between font-mono-data text-body-sm text-on-surface">
                      <span>Physical Cash Deposit at Bursar Counter</span>
                      <span className="text-secondary font-bold">REGISTER DRAWER: #01</span>
                    </div>
                  )}
                  {drawerMode === "upi" && (
                    <div className="space-y-space-xs font-mono-data">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                        Bank UPI Transaction ID (UTR)
                      </label>
                      <input
                        type="text"
                        defaultValue="429188201948"
                        className="w-full bg-surface-container-lowest px-space-sm py-1.5 font-mono-data text-body-sm shadow-inner focus:outline-none border border-outline-variant/40"
                      />
                    </div>
                  )}
                  {drawerMode === "card" && (
                    <div className="grid grid-cols-2 gap-space-sm font-mono-data">
                      <div>
                        <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                          POS Slip No
                        </label>
                        <input
                          type="text"
                          defaultValue="POS-TX-9901"
                          className="w-full bg-surface-container-lowest px-space-sm py-1.5 font-mono-data text-body-sm shadow-inner focus:outline-none border border-outline-variant/40"
                        />
                      </div>
                      <div>
                        <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                          Card Last 4
                        </label>
                        <input
                          type="text"
                          maxLength={4}
                          defaultValue="4821"
                          className="w-full bg-surface-container-lowest px-space-sm py-1.5 font-mono-data text-body-sm shadow-inner focus:outline-none border border-outline-variant/40"
                        />
                      </div>
                    </div>
                  )}
                  {drawerMode === "cheque" && (
                    <div className="grid grid-cols-3 gap-space-sm font-mono-data">
                      <div>
                        <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                          Cheque No
                        </label>
                        <input
                          type="text"
                          defaultValue="649281"
                          className="w-full bg-surface-container-lowest px-space-sm py-1.5 font-mono-data text-body-sm border border-outline-variant/40"
                        />
                      </div>
                      <div>
                        <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                          Issuing Bank
                        </label>
                        <input
                          type="text"
                          defaultValue="Chase"
                          className="w-full bg-surface-container-lowest px-space-sm py-1.5 font-mono-data text-body-sm border border-outline-variant/40"
                        />
                      </div>
                      <div>
                        <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                          Clearance Date
                        </label>
                        <input
                          type="date"
                          defaultValue="2024-10-28"
                          className="w-full bg-surface-container-lowest px-space-sm py-1.5 font-mono-data text-body-sm border border-outline-variant/40"
                        />
                      </div>
                    </div>
                  )}
                  {drawerMode === "neft" && (
                    <div className="space-y-space-xs font-mono-data">
                      <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                        Bank Transfer / IMPS Reference Number
                      </label>
                      <input
                        type="text"
                        defaultValue="CMS29481029471"
                        className="w-full bg-surface-container-lowest px-space-sm py-1.5 font-mono-data text-body-sm border border-outline-variant/40"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 4. Computation, Discounts & Approvals */}
              <div className="bg-surface-container-lowest p-space-md shadow-sm space-y-space-md border border-outline-variant/30">
                <label className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  4. Fiscal Breakdown &amp; Bursar Waivers
                </label>
                <div className="grid grid-cols-2 gap-space-md font-mono-data">
                  <div>
                    <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                      Discount / Scholarship Waiver ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low px-space-sm py-2 font-mono-data text-body-md text-primary font-bold shadow-inner focus:outline-none border border-outline-variant/40"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                      Late Fine / Penalty Charge ($)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={fine}
                      onChange={(e) => setFine(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low px-space-sm py-2 font-mono-data text-body-md text-primary font-bold shadow-inner focus:outline-none border border-outline-variant/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm uppercase text-on-surface-variant block text-[0.75rem]">
                    Administrative Remarks / Reference Notes
                  </label>
                  <textarea
                    rows={2}
                    defaultValue="Approved under Institutional Merit Category. Installment 1 of 2."
                    className="w-full bg-surface-container-low p-space-sm font-body-sm text-on-surface shadow-inner focus:outline-none resize-none border border-outline-variant/40"
                  ></textarea>
                </div>

                <div className="bg-surface-container-low p-space-md flex items-center justify-between border border-outline-variant/30">
                  <div className="flex items-center gap-space-sm">
                    <input
                      type="checkbox"
                      id="receipt-print-toggle"
                      checked={autoOpenReceipt}
                      onChange={(e) => setAutoOpenReceipt(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <label
                      htmlFor="receipt-print-toggle"
                      className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-primary cursor-pointer text-[0.75rem]"
                    >
                      Instantly Open Printable Official Receipt Slip
                    </label>
                  </div>
                  <div className="text-right">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant text-[0.6875rem]">
                      Net Collected Amount
                    </span>
                    <div className="font-headline-xl text-headline-xl text-primary font-bold leading-none tabular-nums">
                      ${calculateTotal().toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="px-gutter-desktop py-space-md bg-surface-container-lowest shadow-md flex items-center justify-between gap-space-md border-t border-outline-variant/30 font-mono-data">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-space-md py-2.5 bg-surface text-on-surface-variant hover:text-on-surface font-label-md uppercase tracking-wider border border-outline-variant/40"
              >
                Cancel Slip
              </button>
              <button
                onClick={handleCommitPayment}
                className="px-space-xl py-2.5 bg-primary-container text-on-primary font-label-md uppercase tracking-wider font-bold hover:bg-primary shadow-md flex items-center gap-space-xs"
              >
                <Check className="w-4 h-4" />
                <span>Commit To Institutional Ledger</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* MODAL: Official Institutional Fee Receipt Preview */}
      {isReceiptModalOpen && activeReceipt && (
        <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-xl w-full shadow-2xl relative flex flex-col max-h-[92vh] border border-outline-variant/40">
            {/* Header */}
            <div className="p-space-sm bg-surface-container flex items-center justify-between border-b border-outline-variant/30">
              <div className="flex items-center gap-space-xs font-mono-data text-label-sm text-primary font-semibold">
                <Printer className="w-4 h-4 text-secondary" />
                <span>OFFICIAL COUNTER RECEIPT PREVIEW</span>
              </div>
              <div className="flex items-center gap-space-xs font-mono-data">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") window.print();
                  }}
                  className="px-space-sm py-1 bg-primary-container text-on-primary font-label-sm uppercase font-semibold hover:bg-primary inline-flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Standard</span>
                </button>
                <button
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="p-1 hover:bg-surface-container-high text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Voucher Canvas */}
            <div className="overflow-y-auto p-space-lg bg-surface-container-lowest relative font-mono-data">
              {/* Background Watermark */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none">
                <span className="font-headline-xl text-[9rem] font-bold text-primary rotate-[-25deg]">
                  APEX
                </span>
              </div>

              {/* Receipt Header */}
              <div className="text-center pb-space-md border-b-2 border-primary/20 space-y-1">
                <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-primary font-bold">
                  Apex Institute of Technology &amp; Management
                </h2>
                <p className="text-label-sm uppercase text-on-surface-variant font-mono-data text-[0.6875rem]">
                  Campus Grid #01 North • Bursar Financial Division
                </p>
                <div className="inline-block px-space-sm py-0.5 bg-primary text-on-primary font-label-sm uppercase font-bold tracking-widest mt-1 text-[0.6875rem]">
                  Official Fee Receipt (Student Copy)
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-space-sm py-space-sm text-body-sm border-b border-outline-variant/30 text-[0.75rem]">
                <div>
                  <div className="text-on-surface-variant text-label-sm text-[0.6875rem]">
                    RECEIPT NUMBER:
                  </div>
                  <div className="font-bold text-primary">#{activeReceipt.receiptNo}</div>
                </div>
                <div className="text-right">
                  <div className="text-on-surface-variant text-label-sm text-[0.6875rem]">
                    TIMESTAMP:
                  </div>
                  <div className="font-bold text-primary">
                    {activeReceipt.date} {activeReceipt.time} EST
                  </div>
                </div>
                <div>
                  <div className="text-on-surface-variant text-label-sm text-[0.6875rem]">
                    STUDENT NAME:
                  </div>
                  <div className="font-bold text-primary">{activeReceipt.studentName}</div>
                </div>
                <div className="text-right">
                  <div className="text-on-surface-variant text-label-sm text-[0.6875rem]">
                    ROLL IDENTIFIER:
                  </div>
                  <div className="font-bold text-primary">{activeReceipt.rollId}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-on-surface-variant text-label-sm text-[0.6875rem]">
                    PROGRAM / BATCH:
                  </div>
                  <div className="font-bold text-primary">
                    {activeReceipt.course} ({activeReceipt.batch})
                  </div>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="py-space-sm text-[0.8125rem]">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-label-sm uppercase text-on-surface-variant border-b border-outline-variant/30 text-[0.6875rem]">
                      <th className="py-1">Description / Head</th>
                      <th className="py-1 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 text-[0.75rem]">
                    <tr>
                      <td className="py-1.5 text-primary">{activeReceipt.feeHead}</td>
                      <td className="py-1.5 text-right font-bold text-primary">
                        ${activeReceipt.amount.toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-primary">
                        Autonomous Exam &amp; Laboratory Charge
                      </td>
                      <td className="py-1.5 text-right font-bold text-primary">$0.00</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 text-on-surface-variant">
                        Scholarship / Institutional Waiver
                      </td>
                      <td className="py-1.5 text-right font-bold text-secondary">-$0.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-primary/20 text-body-md font-bold">
                      <td className="pt-2 text-primary uppercase">Total Settled</td>
                      <td className="pt-2 text-right text-primary text-headline-sm">
                        ${activeReceipt.amount.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mode & Official Stamp */}
              <div className="pt-space-sm border-t border-outline-variant/30 grid grid-cols-2 gap-space-sm items-end text-[0.75rem]">
                <div className="space-y-1">
                  <div className="text-label-sm text-on-surface-variant uppercase text-[0.6875rem]">
                    Settlement Mode:
                  </div>
                  <div className="font-bold text-primary uppercase">{activeReceipt.mode}</div>
                  <div className="text-label-sm text-on-surface-variant uppercase mt-2 text-[0.6875rem]">
                    Cashier / Staff:
                  </div>
                  <div className="font-bold text-primary">{activeReceipt.collector}</div>
                </div>

                <div className="flex flex-col items-center justify-center p-2 bg-surface-container-high/40 text-center border border-dashed border-secondary/30">
                  <span className="font-headline-sm uppercase font-black text-secondary tracking-widest leading-none">
                    PAID &amp; CLEARED
                  </span>
                  <span className="font-label-sm text-on-surface-variant mt-1 text-[0.625rem]">
                    TREASURY SEAL • APEX IMS
                  </span>
                  <div className="w-full border-t border-dashed border-outline-variant/50 mt-4 pt-1 font-label-sm text-on-surface-variant uppercase text-[0.625rem]">
                    Authorized Signatory
                  </div>
                </div>
              </div>

              <div className="mt-space-md pt-space-xs text-center text-label-sm text-on-surface-variant/80 border-t border-outline-variant/20 uppercase tracking-widest text-[0.625rem]">
                Computer generated official transaction voucher • Apex Institute Bursar Division
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Fee Structure Settings */}
      {isStructureModalOpen && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest max-w-2xl w-full shadow-2xl p-gutter-desktop space-y-space-md border border-outline-variant/40 font-mono-data">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-sm">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary uppercase font-bold">
                  Institutional Fee Structures &amp; Heads
                </h3>
                <p className="font-label-sm text-on-surface-variant uppercase tracking-wider text-[0.75rem]">
                  AY 2024-25 Master Catalogs
                </p>
              </div>
              <button
                onClick={() => setIsStructureModalOpen(false)}
                className="p-1 hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-space-sm">
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low border border-outline-variant/30">
                <div>
                  <div className="font-headline-sm text-body-md font-bold text-primary">
                    B.Tech Engineering Programs
                  </div>
                  <div className="font-label-sm text-on-surface-variant text-[0.75rem]">
                    8 Semesters • $3,800 Base Tuition / Sem + $450 Labs
                  </div>
                </div>
                <span className="font-mono-data text-label-sm px-2 py-0.5 bg-surface-container text-secondary font-bold">
                  LOCKED
                </span>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface-container-low border border-outline-variant/30">
                <div>
                  <div className="font-headline-sm text-body-md font-bold text-primary">
                    MBA Master of Management
                  </div>
                  <div className="font-label-sm text-on-surface-variant text-[0.75rem]">
                    4 Semesters • $5,200 Base Tuition / Sem + $300 Library
                  </div>
                </div>
                <span className="font-mono-data text-label-sm px-2 py-0.5 bg-surface-container text-secondary font-bold">
                  LOCKED
                </span>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface-container-low border border-outline-variant/30">
                <div>
                  <div className="font-headline-sm text-body-md font-bold text-primary">
                    B.Des Design &amp; Architecture
                  </div>
                  <div className="font-label-sm text-on-surface-variant text-[0.75rem]">
                    8 Semesters • $4,100 Base Tuition / Sem + $650 Studio
                  </div>
                </div>
                <span className="font-mono-data text-label-sm px-2 py-0.5 bg-surface-container text-secondary font-bold">
                  LOCKED
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-space-sm pt-space-sm border-t border-outline-variant/20">
              <button
                onClick={() => setIsStructureModalOpen(false)}
                className="px-space-md py-1.5 bg-surface-container text-primary font-label-md uppercase font-bold"
              >
                Close Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic SMS / Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-primary text-on-primary px-space-md py-space-sm shadow-xl flex items-center gap-space-sm z-50 border border-outline-variant/40">
          <CheckCircle2 className="w-5 h-5 text-secondary-container" />
          <span className="font-mono-data text-body-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

