"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  GraduationCap,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Download,
  Edit3,
  BookOpen,
  Award,
  Users,
  Clock,
  X,
  Upload,
  Send,
  FileText
} from "lucide-react";

export default function StudentProfilePage() {
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for update request
  const [targetField, setTargetField] = useState("Phone Number");
  const [newDetails, setNewDetails] = useState("");
  const [reason, setReason] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDetails.trim()) {
      triggerToast("Please enter the updated details before submitting.");
      return;
    }
    setShowCorrectionModal(false);
    triggerToast(`Update request for "${targetField}" submitted successfully.`);
    setNewDetails("");
    setReason("");
  };

  const currentCourses = [
    { code: "CS-401", title: "Database Management Systems", credits: 4, type: "Core Theory" },
    { code: "CS-402", title: "Operating Systems", credits: 4, type: "Core Theory" },
    { code: "CS-403", title: "Design & Analysis of Algorithms", credits: 4, type: "Core Theory" },
    { code: "CS-404", title: "Automata & Formal Languages", credits: 4, type: "Core Theory" },
    { code: "CS-405L", title: "Systems Engineering Laboratory", credits: 2, type: "Practical / Lab" },
  ];

  return (
    <div className="p-5 md:p-8 space-y-6 max-w-[1600px] w-full mx-auto font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#3D405B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 text-sm font-medium animate-in slide-in-from-bottom">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
            Student Profile
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal, academic, and contact details
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowCorrectionModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#3D405B] text-xs font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Request Update</span>
          </button>
          <button
            onClick={() => triggerToast("Downloading Student Profile Summary (PDF)...")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Profile PDF</span>
          </button>
        </div>
      </div>

      {/* 1. Main Student Identity Hero Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Candidate Photograph */}
          <div className="relative shrink-0">
            <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden border-2 border-slate-200 shadow-xs bg-slate-50">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
                alt="Rahul Sharma"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-xs"
              title="Verified Student Identity"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Core Info */}
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl md:text-2xl font-bold text-[#3D405B] tracking-tight">
                Rahul Sharma
              </h2>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                Active Student
              </span>
            </div>

            <p className="text-xs font-medium text-slate-600 mt-1">
              B.Tech Computer Science &amp; Engineering &bull; Semester IV (Batch 2023–27)
            </p>

            <div className="mt-2.5 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>
                Roll No: <strong className="font-mono text-[#355C7D]">23CS042</strong>
              </span>
              <span>&bull;</span>
              <span>
                Reg No: <strong className="font-mono text-slate-700">APX-2023-CS-042</strong>
              </span>
              <span>&bull;</span>
              <span>
                Department: <strong className="text-slate-700">Computer Science</strong>
              </span>
            </div>

            <div className="mt-3 flex items-center justify-center sm:justify-start gap-2">
              <Link
                href="/student"
                className="text-xs text-violet-700 hover:underline font-medium"
              >
                &larr; Back to Dashboard
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/student/id-card"
                className="text-xs text-violet-700 hover:underline font-medium"
              >
                View ID Card &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Quick Performance Highlights */}
        <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200/80 pt-4 lg:pt-0 lg:pl-6">
          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 text-center">
            <span className="text-[11px] font-medium text-slate-500 block">CGPA</span>
            <span className="text-lg font-bold text-[#3D405B] font-mono mt-0.5 block">8.42</span>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200 inline-block">
              First Class
            </span>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 text-center">
            <span className="text-[11px] font-medium text-slate-500 block">Attendance</span>
            <span className="text-lg font-bold text-emerald-600 font-mono mt-0.5 block">88.4%</span>
            <span className="text-[10px] text-slate-500 font-medium block">Regular</span>
          </div>

          <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60 text-center">
            <span className="text-[11px] font-medium text-slate-500 block">Credits</span>
            <span className="text-lg font-bold text-violet-700 font-mono mt-0.5 block">108</span>
            <span className="text-[10px] text-slate-500 font-medium block">of 160 Total</span>
          </div>
        </div>
      </div>

      {/* 2. Structured Information Cards Grid (4 Sections) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Personal Details */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#355C7D]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#3D405B]">
                Personal Information
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Official Record</span>
          </div>

          <div className="p-5 divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Full Name</span>
              <span className="font-semibold text-slate-900">Rahul Sharma</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Date of Birth</span>
              <span className="font-medium text-slate-800">14 August 2004 (Age 20)</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Gender</span>
              <span className="font-medium text-slate-800">Male</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Blood Group</span>
              <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                O+ (Positive)
              </span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Nationality</span>
              <span className="font-medium text-slate-800">Indian</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Admission Category</span>
              <span className="font-medium text-slate-800">General Merit</span>
            </div>
          </div>
        </div>

        {/* Card 2: Academic Program Information */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#355C7D]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#3D405B]">
                Academic Details
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">AY 2024–25</span>
          </div>

          <div className="p-5 divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Program</span>
              <span className="font-semibold text-slate-900">B.Tech (CSE)</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Current Semester</span>
              <span className="font-medium text-slate-800">Semester IV (Even Term)</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Batch / Cohort</span>
              <span className="font-medium text-slate-800">2023 – 2027</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Enrollment Type</span>
              <span className="font-medium text-slate-800">Regular / Full-Time</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Faculty Mentor</span>
              <span className="font-semibold text-slate-900">Dr. Alistair Chen</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Academic Status</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Good Standing
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Contact Details */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#355C7D]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#3D405B]">
                Contact Information
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Verified</span>
          </div>

          <div className="p-5 divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">College Email</span>
              <a
                href="mailto:rahul.sharma23@apex.edu.in"
                className="font-mono text-violet-700 hover:underline"
              >
                rahul.sharma23@apex.edu.in
              </a>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Mobile Number</span>
              <span className="font-mono font-medium text-slate-800">+91 98765 43210</span>
            </div>
            <div className="py-2.5 flex flex-col gap-1">
              <span className="text-slate-500 font-medium">Hostel / Campus Address</span>
              <span className="text-slate-800">
                Room 314, Block C, Campus Hostel, Apex Institute
              </span>
            </div>
            <div className="py-2.5 flex flex-col gap-1">
              <span className="text-slate-500 font-medium">Permanent Address</span>
              <span className="text-slate-800">
                Flat 402, Greenview Heights, Sector 14, Gurugram, Haryana – 122001
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Parent & Guardian Details */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#355C7D]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#3D405B]">
                Parent / Guardian Details
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Primary Contact</span>
          </div>

          <div className="p-5 divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Father / Guardian</span>
              <span className="font-semibold text-slate-900">Mr. Rameshwar Sharma</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Relationship</span>
              <span className="font-medium text-slate-800">Father</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Guardian Phone</span>
              <a
                href="tel:+919811122334"
                className="font-mono font-medium text-violet-700 hover:underline"
              >
                +91 98111 22334
              </a>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Guardian Email</span>
              <a
                href="mailto:rameshwar.sharma@gmail.com"
                className="font-mono text-slate-700 hover:underline"
              >
                rameshwar.sharma@gmail.com
              </a>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Emergency Contact</span>
              <span className="font-mono text-slate-800 font-medium">+91 98111 22334</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Registered Courses (Semester IV) Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-[#355C7D]" />
            <div>
              <h3 className="text-sm font-bold text-[#3D405B]">
                Enrolled Courses &bull; Semester IV
              </h3>
              <p className="text-[11px] text-slate-500">
                5 Active Courses &bull; Total 18 Registered Credits
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
            Enrolled
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200/80 text-[11px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 w-28 font-mono">Course Code</th>
                <th className="py-3 px-4">Subject Title</th>
                <th className="py-3 px-4 w-28 text-center">Credits</th>
                <th className="py-3 px-4 w-36">Course Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentCourses.map((c, i) => (
                <tr key={c.code} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 text-center font-mono text-slate-400">{i + 1}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#355C7D]">{c.code}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{c.title}</td>
                  <td className="py-3 px-4 text-center font-mono font-semibold text-slate-700">
                    {c.credits}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-medium border border-slate-200">
                      {c.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Request Profile Information Update */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 bg-[#3D405B]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#355C7D]" />
                <h3 className="text-base font-bold text-[#3D405B]">
                  Request Profile Information Update
                </h3>
              </div>
              <button
                onClick={() => setShowCorrectionModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="py-4 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Select Field to Update
                </label>
                <select
                  value={targetField}
                  onChange={(e) => setTargetField(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-slate-50 text-slate-800 focus:outline-none focus:border-[#355C7D] focus:bg-white"
                >
                  <option>Mobile Number</option>
                  <option>Permanent Residential Address</option>
                  <option>Hostel / Local Address</option>
                  <option>Guardian Contact Number / Email</option>
                  <option>Blood Group</option>
                  <option>Name Spelling Correction</option>
                  <option>Other Details</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  New / Updated Information
                </label>
                <textarea
                  rows={3}
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  placeholder="Enter the correct and updated information..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#355C7D] resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Reason for Update (Optional)
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Changed address, new phone number..."
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#355C7D]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowCorrectionModal(false)}
                  className="px-4 py-2 border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#355C7D] hover:opacity-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
